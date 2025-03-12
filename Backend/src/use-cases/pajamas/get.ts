import { PajamaInfoResponse, PajamasRepository } from "src/repositories/pajamas-repository"
import { ResourceNotFoundError } from "../errors/resource-not-found"

interface GetPajamaUseCaseRequest {
    id: string;
}

interface GetPajamaUseCaseResponse {
    pajama: PajamaInfoResponse;
}

export class GetPajamaUseCase {
    constructor(private readonly pajamaRepository: PajamasRepository) {}

    async execute({ id }: GetPajamaUseCaseRequest): Promise<GetPajamaUseCaseResponse> {
        const pajama = await this.pajamaRepository.getPajamaInfo(id);

        if (!pajama) {
            throw new ResourceNotFoundError();
        }

        return { pajama } as GetPajamaUseCaseResponse;

    }
} 
