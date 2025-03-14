import { PajamaSize, PajamaSizes } from "@prisma/client";
import { PajamasSizeRepository } from "src/repositories/pajamas-size-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

export interface GetPajamaSizeByPajamaIdUseCaseRequest {
    pajamaId: string;
    size: PajamaSizes;
}

interface GetPajamaSizeByPajamaIdUseCaseResponse {
    pajamaSize: PajamaSize;
}

export class GetPajamaSizeByPajamaIdUseCaseUseCase {
    constructor(private readonly pajamasSizeRepository: PajamasSizeRepository) {}

    async execute(getPajamaSizeData: GetPajamaSizeByPajamaIdUseCaseRequest): Promise<GetPajamaSizeByPajamaIdUseCaseResponse> {
        const pajamaSize = await this.pajamasSizeRepository.findPajamaSize(getPajamaSizeData.pajamaId, getPajamaSizeData.size);

        if (pajamaSize === null) {
            throw new ResourceNotFoundError();
        }

        return { pajamaSize: pajamaSize } as GetPajamaSizeByPajamaIdUseCaseResponse;
    }
}
