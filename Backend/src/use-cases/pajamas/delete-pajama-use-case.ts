import { Pajama } from "@prisma/client";
import { PajamasRepository } from "src/repositories/pajamas-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found";

interface DeletePajamaUseCaseRequest {
    id: string;
}

interface DeletePajamaUseCaseResponse {
    pajama: Pajama;
}

export class DeletePajamaUseCase {
    constructor(private readonly pajamaRepository: PajamasRepository) {}

    async execute({ id }: DeletePajamaUseCaseRequest): Promise<DeletePajamaUseCaseResponse> {
        const existingPajama = await this.pajamaRepository.findById(id);

        if (existingPajama === null) {
            throw new ResourceNotFoundError();
        }
        
        const deletedPajama = await this.pajamaRepository.delete(id);

        return { pajama: deletedPajama } as DeletePajamaUseCaseResponse;
    }

}
