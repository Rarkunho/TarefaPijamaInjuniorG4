import { SalesRepository } from "src/repositories/sales-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found";
import { Sale } from "@prisma/client";
import { SaleDeletionFailedError } from "../errors/sale-deletion-failed-error";

interface DeleteSaleUseCaseRequest {
    id: string;
}

interface DeleteSaleUseCaseResponse {
    sale: Sale;
}

export class DeleteSaleUseCase {
    constructor(private readonly salesRepository: SalesRepository) {}

    async execute(saleDeleteInputData: DeleteSaleUseCaseRequest): Promise<DeleteSaleUseCaseResponse> {
        const existingSale = await this.salesRepository.findById(saleDeleteInputData.id);

        if (existingSale === null) {
            throw new ResourceNotFoundError();
        }

        const deletedSale = await this.salesRepository.delete(saleDeleteInputData.id);

        if (deletedSale === null) {
            throw new SaleDeletionFailedError();
        }

        return { sale: deletedSale } as DeleteSaleUseCaseResponse;
    }
}
