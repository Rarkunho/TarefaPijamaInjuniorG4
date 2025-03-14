import { PajamaInfoResponse, PajamasRepository } from "src/repositories/pajamas-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetPajamaInfoUseCaseRequest {
    pajamaId: string;
}

interface GetPajamaInfoUseCaseResponse {
    pajama: PajamaInfoResponse;
}

export class GetPajamaInfoUseCase {
    constructor(private readonly pajamaRepository: PajamasRepository) {}

    async execute({ pajamaId }: GetPajamaInfoUseCaseRequest): Promise<GetPajamaInfoUseCaseResponse> {
        const existingPajama = await this.pajamaRepository.findById(pajamaId);

        if (existingPajama === null) {
            throw new ResourceNotFoundError();
        }
        
        const pajamaInfo = await this.pajamaRepository.getPajamaInfo(pajamaId);

        return { pajama: pajamaInfo } as GetPajamaInfoUseCaseResponse;
    }
} 
