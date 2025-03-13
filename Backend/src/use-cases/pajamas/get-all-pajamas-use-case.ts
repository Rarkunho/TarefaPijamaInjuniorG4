import { PajamasRepository } from "src/repositories/pajamas-repository";
import { Pajama } from "@prisma/client";

interface GetAllPajamasUseCaseRequest {}

interface GetAllPajamasUseCaseResponse {
    pajamas: Pajama[];
}

export class GetAllPajamasUseCase {
    constructor(private readonly pajamasRepository: PajamasRepository) {}

    async execute(): Promise<GetAllPajamasUseCaseResponse> {
        const allPajamas = await this.pajamasRepository.getAllPajamas();

        return { pajamas: allPajamas } as GetAllPajamasUseCaseResponse;
    }
} 
