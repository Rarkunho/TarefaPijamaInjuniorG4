import { Sale } from "@prisma/client";
import { AddressRepository } from "src/repositories/address-repository";
import { PajamasRepository } from "src/repositories/pajamas-repository";
import { PajamasSizeRepository } from "src/repositories/pajamas-size-repository";
import { SalePajamaCreateInput, SalePajamasRepository } from "src/repositories/sale-pajamas-repository";
import { SaleCreateInput, SalesRepository } from "src/repositories/sales-repository";
import { InsufficientPajamaSizeStockQuantityError } from "../errors/insufficient-pajama-size-stock-quantity-error";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

export interface CreateSaleUseCaseRequest
    extends SaleCreateInput {}

interface CreateSaleUseCaseResponse {
    sale: Sale;
}

export class CreateSaleUseCase {
    constructor(private readonly salesRepository: SalesRepository,
                private readonly addressRepository: AddressRepository,
                private readonly pajamasRepository: PajamasRepository,
                private readonly salePajamasRepository: SalePajamasRepository,
                private readonly pajamasSizeRepository: PajamasSizeRepository) {}

    async execute(saleCreateInputData: CreateSaleUseCaseRequest): Promise<CreateSaleUseCaseResponse> {
        // Verificando se existe quantidade em estoque disponível para venda:
        saleCreateInputData.pajamasBought.forEach(async pajamaBought => {
            const pajamaBoughtStockInfo = await this.pajamasSizeRepository.findPajamaSize(pajamaBought.pajamaId, pajamaBought.size);

            if (pajamaBoughtStockInfo === null) {
                throw new ResourceNotFoundError();
            }

            if (pajamaBoughtStockInfo.stockQuantity < pajamaBought.quantity) {
                throw new InsufficientPajamaSizeStockQuantityError(pajamaBought.pajamaId, pajamaBought.size);
            }
        });

        // Verificando se o endereço fornecido já existe:
        const existingAddress = await this.addressRepository.findOrCreate(saleCreateInputData.pajamaSaleAddressData);

        const saleCreateInput = {
            ...saleCreateInputData.pajamaSaleData,
            addressId: existingAddress.id
        }
        
        const createdSale = await this.salesRepository.create(saleCreateInput);

        // Criando o relacionamento N:N entre Sale e Pajama (SalePajama):

        // Extraindo todos os ID's dos respectivos pijamas comprados:
        const pajamasBoughtIds = saleCreateInputData.pajamasBought.map(pajama => pajama.pajamaId);

        // Buscando os pijamas com base nos ID's extraídos:
        const pajamasBoughtInfo = await this.pajamasRepository.findManyById(pajamasBoughtIds);

        // Array associativo para cada id de pijama e seu respectivo preço:
        const pajamasPriceMap = new Map(pajamasBoughtInfo.map(pajama => [pajama.id, pajama.price]));

        // Agrupando os itens da venda por ID de pijama:
        const groupedPajamasObject = saleCreateInputData.pajamasBought.reduce((accumulator, item) => {
            const groupKey = item.pajamaId;
            
            if (!accumulator[groupKey]) {
                accumulator[groupKey] = {
                    saleId: createdSale.id,
                    pajamaId: groupKey,
                    price: pajamasPriceMap.get(groupKey)!,
                    quantity: 0
                };
            }

            accumulator[groupKey].quantity += item.quantity;

            return accumulator;
        }, {} as Record<string, SalePajamaCreateInput>);

        // Criando as relações entre sale e pijama em SalePajama:
        const createSalePajamaPromise = this.salePajamasRepository.createMany(
            Array.from(Object.values(groupedPajamasObject)).map(pajama => ({
                saleId: createdSale.id,
                pajamaId: pajama.pajamaId,
                quantity: pajama.quantity,
                price: pajama.quantity * (pajamasPriceMap.get(pajama.pajamaId)!)
            }))
        );

        // Atualizando/Decrementando a quantidade de
        // pijamas disponíveis em estoque após a compra:
        const decrementPajamaSizePromise = Promise.all(
            saleCreateInputData.pajamasBought.map(pajamaBought => {
                return this.pajamasSizeRepository.decrementStockQuantity(
                    pajamaBought.pajamaId,
                    pajamaBought.size,
                    pajamaBought.quantity
                );
            })
        );

        // Realiza a criação das relações e o decremento das unidades paralelamente:
        await Promise.all([createSalePajamaPromise, decrementPajamaSizePromise]);

        return { sale: createdSale } as CreateSaleUseCaseResponse;
    }
}
