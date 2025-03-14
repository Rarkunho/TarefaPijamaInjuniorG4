import { PajamaInfoResponse, PajamasRepository } from "src/repositories/pajamas-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetPajamaUseCaseRequest {
    pajamaId: string;
}

interface GetPajamaUseCaseResponse {
    pajama: PajamaInfoResponse;
}

export class GetPajamaUseCase {
    constructor(private readonly pajamaRepository: PajamasRepository) {}

    async execute({ pajamaId }: GetPajamaUseCaseRequest): Promise<GetPajamaUseCaseResponse> {
        const pajama = await this.pajamaRepository.findById(pajamaId);

        if (pajama === null) {
            throw new ResourceNotFoundError();
        }

        return { pajama: pajama } as GetPajamaUseCaseResponse;
    }
} 
