import { Pajama } from "@prisma/client"
import { PajamasRepository } from "src/repositories/pajamas-repository"
import { ResourceNotFoundError } from "../errors/resource-not-found"

interface DeletePajamaUseCaseRequest {
    id: string
}

interface DeletePajamaUseCaseResponse {
    pajama: Pajama
}

export class DeletePajamaUseCase {
    constructor(private pajamaRepository: PajamasRepository) {}

    async execute({ id }: DeletePajamaUseCaseRequest): Promise<DeletePajamaUseCaseResponse> {
        const pajama = await this.pajamaRepository.delete(id);

        if (!pajama) {
            throw new ResourceNotFoundError();
        }

        return { pajama } as DeletePajamaUseCaseResponse;
    }

}
