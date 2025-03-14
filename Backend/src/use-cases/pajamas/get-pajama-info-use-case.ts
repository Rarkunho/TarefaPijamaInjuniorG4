import { PajamaInfoResponse, PajamasRepository } from "src/repositories/pajamas-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetPajamaInfoUseCaseRequest {
    id: string;
}

interface GetPajamaInfoUseCaseResponse {
    pajama: PajamaInfoResponse;
}

export class GetPajamaInfoUseCase {
    constructor(private readonly pajamaRepository: PajamasRepository) {}

    async execute({ id }: GetPajamaInfoUseCaseRequest): Promise<GetPajamaInfoUseCaseResponse> {
        const existingPajama = await this.pajamaRepository.findById(id);

        if (existingPajama === null) {
            throw new ResourceNotFoundError();
        }
        
        const pajamaInfo = await this.pajamaRepository.getPajamaInfo(id);

        return { pajama: pajamaInfo } as GetPajamaInfoUseCaseResponse;
    }
} 
