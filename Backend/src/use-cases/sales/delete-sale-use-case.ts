import { Sale } from "@prisma/client";
import { AddressRepository } from "src/repositories/address-repository";
import { SalesRepository } from "src/repositories/sales-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface DeleteSaleUseCaseRequest {
    id: string;
}

interface DeleteSaleUseCaseResponse {
    sale: Sale;
}

export class DeleteSaleUseCase {
    constructor(private readonly salesRepository: SalesRepository,
                private readonly addressRepository: AddressRepository) {}

    async execute(saleDeleteInputData: DeleteSaleUseCaseRequest): Promise<DeleteSaleUseCaseResponse> {
        const existingSale = await this.salesRepository.findById(saleDeleteInputData.id);

        if (existingSale === null) {
            throw new ResourceNotFoundError();
        }

        // Contagem de Vendas com o Endereço Referenciado:
        const addressCount = await this.salesRepository.countAddressQuantity(existingSale.addressId);

        const deletedSale = await this.salesRepository.delete(saleDeleteInputData.id);

        // Requisito: Remover endereço que estava sendo
        // referenciado unicamente pela venda recém removida:
        if (addressCount <= 1) {
            await this.addressRepository.delete(deletedSale.addressId);
        }

        return { sale: deletedSale } as DeleteSaleUseCaseResponse;
    }
}
