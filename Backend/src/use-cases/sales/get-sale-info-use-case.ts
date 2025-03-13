import { AddressRepository } from "src/repositories/address-repository";
import { SalePajamasRepository } from "src/repositories/sale-pajamas-repository";
import { SaleInfoResponse, SalesRepository } from "src/repositories/sales-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetSaleInfoSaleUseCaseRequest {
    id: string;
}

interface GetSaleInfoSaleUseCaseResponse {
    saleInfo: SaleInfoResponse;
}

export class GetSaleInfoUseCase {
    constructor(private readonly salesRepository: SalesRepository,
                private readonly addressRepository: AddressRepository,
                private readonly salePajamasRepository: SalePajamasRepository
    ) {}

    async execute({ id }: GetSaleInfoSaleUseCaseRequest): Promise<GetSaleInfoSaleUseCaseResponse> {
        const currentSale = await this.salesRepository.findById(id);
        
        if (currentSale === null) {
            throw new ResourceNotFoundError();
        }

        const currentAddress = await this.addressRepository.findById(currentSale.addressId);

        if (currentAddress === null) {
            throw new ResourceNotFoundError();
        }

        const pajamasBought = await this.salePajamasRepository.findMany({ saleId: id });

        const amountPajamasPurchased = pajamasBought.reduce((qtyAccum, currentPajama) => {
            return qtyAccum + currentPajama.quantity
        }, 0);

        const { id: saleID, ...saleInfoFiltered } = currentSale;
        const { id: addressID, ...addressInfoFiltered } = currentAddress;

        const saleInfo = {
            // Propriedades do endereço:
            ...addressInfoFiltered,

            // Propriedades da venda:
            saleId: currentSale.id,
            ...saleInfoFiltered,

            // Quantidade comprada:
            quantity: amountPajamasPurchased,
        };

        return { saleInfo: saleInfo } as GetSaleInfoSaleUseCaseResponse;
    }
}
