import { PajamaInfoResponse, PajamasRepository } from "src/repositories/pajamas-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { PajamasSizeRepository } from "src/repositories/pajamas-size-repository";

interface GetPajamaInfoUseCaseRequest {
    pajamaId: string;
}

interface GetPajamaInfoUseCaseResponse {
    pajama: PajamaInfoResponse;
}

export class GetPajamaInfoUseCase {
    constructor(
        private readonly pajamasRepository: PajamasRepository,
        private readonly pajamaSizeRepository: PajamasSizeRepository
    ) {}

    async execute({ pajamaId }: GetPajamaInfoUseCaseRequest): Promise<GetPajamaInfoUseCaseResponse> {
        const existingPajama = await this.pajamasRepository.findById(pajamaId);

        if (existingPajama === null) {
            throw new ResourceNotFoundError();
        }

        const allPajamasSize = await this.pajamaSizeRepository.findAllPajamasSize(pajamaId);

        // Removendo o campo 'pajamaId' de todos os objetos:
        const allPajamasSizeFiltered = allPajamasSize.map(({ pajamaId, ...props }) => props);

        const pajamaInfoResponse = {
            ...existingPajama,
            pajamaSizesInfo: allPajamasSizeFiltered,
        }

        return { pajama: pajamaInfoResponse } as GetPajamaInfoUseCaseResponse;
    }
} 
