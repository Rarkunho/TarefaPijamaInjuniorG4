import { PajamaSize, PajamaSizes } from "@prisma/client";
import { PajamasSizeRepository } from "src/repositories/pajamas-size-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface UpdatePajamaSizeQuantityUseCaseRequest {
    pajamaId: string;
    size: PajamaSizes;
    updateData: number;
}

interface UpdatePajamaSizeQuantityUseCaseResponse {
    pajamaSize: PajamaSize;
}

export class UpdatePajamaSizeQuantityUseCase {
    constructor(private readonly pajamasSizeRepository: PajamasSizeRepository) {}

    async execute(pajamaSizeUpdateInput: UpdatePajamaSizeQuantityUseCaseRequest): Promise<UpdatePajamaSizeQuantityUseCaseResponse> {
        const existingPajamaSize = await this.pajamasSizeRepository.findPajamaSize(pajamaSizeUpdateInput.pajamaId, pajamaSizeUpdateInput.size);
        
        if (existingPajamaSize === null) {
            throw new ResourceNotFoundError();
        }

        const pajamaSizeUpdated = await this.pajamasSizeRepository.updateStockQuantity(
                                                                    pajamaSizeUpdateInput.pajamaId,
                                                                    pajamaSizeUpdateInput.size,
                                                                    pajamaSizeUpdateInput.updateData
                                                                    );

        return { pajamaSize: pajamaSizeUpdated } as UpdatePajamaSizeQuantityUseCaseResponse;
    }
}
