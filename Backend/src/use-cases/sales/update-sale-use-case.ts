import { Sale } from "@prisma/client";
import { SalesRepository, SaleUpdateInput } from "src/repositories/sales-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface UpdateSaleUseCaseRequest {
    id: string;
    updateData: SaleUpdateInput;
}

interface UpdateSaleUseCaseResponse {
    sale: Sale;
}

export class UpdateSaleUseCase {
    constructor(private readonly salesRepository: SalesRepository) {}

    async execute(saleUpdateInput: UpdateSaleUseCaseRequest): Promise<UpdateSaleUseCaseResponse> {
        const existingSale = await this.salesRepository.findById(saleUpdateInput.id);
        
        if (existingSale === null) {
            throw new ResourceNotFoundError();
        }

        const saleUpdated = await this.salesRepository.update(saleUpdateInput.id, saleUpdateInput.updateData);

        return { sale: saleUpdated } as UpdateSaleUseCaseResponse;
    }
}
