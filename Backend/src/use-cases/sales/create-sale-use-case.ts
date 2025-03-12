import { Sale } from "@prisma/client";
import { SaleCreateInput, SalesRepository } from "src/repositories/sales-repository";

export interface CreateSaleUseCaseRequest {
    createData: Omit<SaleCreateInput, 'addressId'>;
}

interface CreateSaleUseCaseResponse {
    sale: Sale;
}

export class CreateSaleUseCase {
    constructor(private readonly salesRepository: SalesRepository) {}

    async execute(saleCreateInputData: CreateSaleUseCaseRequest): Promise<CreateSaleUseCaseResponse> {
        const sale = await this.salesRepository.create(saleCreateInputData.createData);
        return { sale: sale } as CreateSaleUseCaseResponse;
    }
}
