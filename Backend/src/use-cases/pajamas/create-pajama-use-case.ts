import { Pajama, Prisma } from "@prisma/client";
import { PajamasRepository } from "src/repositories/pajamas-repository";

export interface CreatePajamaUseCaseRequest
    extends Prisma.PajamaUncheckedCreateInput {}

interface CreatePajamaUseCaseResponse {
    pajama: Pajama;
}

export class CreatePajamaUseCase {
    constructor(private readonly pajamaRepository: PajamasRepository) {}

    async execute(pajamaCreateInputData: CreatePajamaUseCaseRequest): Promise<CreatePajamaUseCaseResponse> {
        const createdPajama = await this.pajamaRepository.create(pajamaCreateInputData);
        
        return { pajama: createdPajama } as CreatePajamaUseCaseResponse;
    }
}

