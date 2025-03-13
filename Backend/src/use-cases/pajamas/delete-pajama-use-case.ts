import { Pajama } from "@prisma/client";
import { PajamasRepository } from "src/repositories/pajamas-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface DeletePajamaUseCaseRequest {
    pajamaId: string;
}

interface DeletePajamaUseCaseResponse {
    pajama: Pajama;
}

export class DeletePajamaUseCase {
    constructor(private readonly pajamaRepository: PajamasRepository) {}

    async execute({ pajamaId }: DeletePajamaUseCaseRequest): Promise<DeletePajamaUseCaseResponse> {
        const existingPajama = await this.pajamaRepository.findById(pajamaId);

        if (existingPajama === null) {
            throw new ResourceNotFoundError();
        }
        
        const deletedPajama = await this.pajamaRepository.delete(pajamaId);

        return { pajama: deletedPajama } as DeletePajamaUseCaseResponse;
    }

}
