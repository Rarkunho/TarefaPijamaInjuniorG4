import { PajamasSizeRepository } from "src/repositories/pajamas-size-repository";
import { PajamaSize } from "@prisma/client";

interface GetAllPajamaSizeByPajamaIdUseCaseRequest {
    pajamaId: string;
}

interface GetAllPajamaSizeByPajamaIdUseCaseResponse {
    pajamaSize: PajamaSize[];
}

export class GetAllPajamaSizeByPajamaIdUseCaseUseCase {
    constructor(private readonly pajamasSizeRepository: PajamasSizeRepository) {}

    async execute(getPajamaSizeData: GetAllPajamaSizeByPajamaIdUseCaseRequest): Promise<GetAllPajamaSizeByPajamaIdUseCaseResponse> {
        const pajamaSizeArray = await this.pajamasSizeRepository.findAllPajamasSize(getPajamaSizeData.pajamaId);

        return { pajamaSize: pajamaSizeArray } as GetAllPajamaSizeByPajamaIdUseCaseResponse;
    }
}
