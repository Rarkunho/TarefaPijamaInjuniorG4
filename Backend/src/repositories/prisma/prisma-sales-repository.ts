import { Sale } from "@prisma/client";
import { SaleCreateInput, SaleInfoResponse, SalesRepository, SaleUpdateInput } from "../sales-repository";
import { prismaClient } from "src/lib/prisma";
import { PrismaAddressRepository } from "./prisma-address-repository";
import { PrismaSalePajamasRepository } from "./prisma-sale-pajamas-repository";
import { PrismaPajamasSizeRepository } from "./prisma-pajama-size-repository";

export class PrismaSalesRepository implements SalesRepository {
    async countAddressQuantity(addressId: string): Promise<number> {
        return prismaClient.sale.count({
            where: {
                addressId: addressId
            }
        });
    }

    async create(saleData: SaleCreateInput): Promise<Sale> {
        // Verificando se o endereço fornecido já existe:
        const addressRepository = new PrismaAddressRepository();
        const existingAddress = await addressRepository.findOrCreate(saleData.pajamaSaleAddressData);

        const sale = await prismaClient.sale.create({
            data: {
                ...saleData.pajamaSaleData,                
                addressId: existingAddress.id
            }
        });


        // Criando o relacionamento N:N entre Sale e Pajama (SalePajama):

        // Extraindo todos os ID's dos respectivos pijamas comprados:
        const pajamasBoughtIds = saleData.pajamasBought.map(pajama => pajama.pajamaId);

        // Buscando os pijamas com base nos ID's extraídos:
        const pajamasBoughtInfo = await prismaClient.pajama.findMany({
            where: {
                id: { in: pajamasBoughtIds }
            }
        });
        
        // Array associativo para cada id de pijama e seu respectivo preço:
        const pajamasPriceMap = new Map(pajamasBoughtInfo.map(pajama => [pajama.id, pajama.price]));

        const salePajamasRepository = new PrismaSalePajamasRepository();
        await salePajamasRepository.createMany(saleData.pajamasBought.map(pajama => ({
                saleId: sale.id,
                pajamaId: pajama.pajamaId,
                quantity: pajama.quantity,
                price: pajama.quantity * (pajamasPriceMap.get(pajama.pajamaId) || 0)
            })
        ));

        // Atualizando a quantidade de pijamas disponíveis em estoque após a compra:
        const sizePajamasRepository = new PrismaPajamasSizeRepository();
        

        // TODO: PROMISE AWAIT ALL
        return sale;
    }

    async findById(saleId: string): Promise<Sale | null> {
        const sale = await prismaClient.sale.findUnique({
            where: {
                id: saleId
            }
        });

        return sale;
    }

    async delete(saleId: string): Promise<Sale | null> {
        const sale = await prismaClient.sale.findUnique({
            where: {
                id: saleId
            }
        });

        if (sale === null) {
            throw new Error('Sale not Found in \'delete\' Sale Method');
        }

        // Contagem de Vendas com o Endereço Referenciado:
        const addressCount = await this.countAddressQuantity(sale.addressId);

        const deletedSale = await prismaClient.sale.delete({
            where: {
                id: saleId
            }
        });

        // Requisito: Remover endereço que estava sendo
        // referenciado unicamente pela venda recém removida:
        if (addressCount <= 1) {
            const addressRepository = new PrismaAddressRepository();
            await addressRepository.delete(sale.addressId);
        }

        return deletedSale;
    }

    async getSaleInfo(saleId: string): Promise<SaleInfoResponse | null> {
        const sale = await prismaClient.sale.findUnique({
            where: {
                id: saleId
            }
        });

        if (sale === null) {
            throw new Error('Sale not Found in \'getSaleInfo\' Sale Method');
        }

        const addressRepository = new PrismaAddressRepository();
        const address = await addressRepository.findById(sale.addressId);

        if (address === null) {
            throw new Error('Address not Found in \'getSaleInfo\' Sale Method');
        }

        const salePajamasRepository = new PrismaSalePajamasRepository();
        const pajamasBought = await salePajamasRepository.findMany({
            saleId: sale.id
        });

        const amountPajamasPurchased = pajamasBought.reduce((qtyAccum, currentPajama) => {
            return qtyAccum + currentPajama.quantity
        }, 0);

        const { id: addressID, ...addressInfoFiltered } = address;
        const { id: saleID, ...saleInfoFiltered } = sale;

        const saleInfoResponse: SaleInfoResponse = {
            // Propriedades do endereço:
            ...addressInfoFiltered,

            // Propriedades da venda:
            saleId: sale.id,
            ...saleInfoFiltered,

            // Quantidade comprada:
            quantity: amountPajamasPurchased,
        };

        return saleInfoResponse;
    }

    async update(saleId: string, updateData: SaleUpdateInput): Promise<Sale | null> {
        const updatedSale = await prismaClient.sale.update({
            where: { id: saleId },
            data: updateData
        });

        return updatedSale;
    }
}
