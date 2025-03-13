import { Pajama } from "@prisma/client";
import { PajamasRepository, PajamaUpdateInput } from "src/repositories/pajamas-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";


export interface UpdatePajamaUseCaseRequest {
    pajamaId: string;
    data: PajamaUpdateInput;
}

interface UpdatePajamaUseCaseResponse {
    pajama: Pajama;
}

export class UpdatePajamaUseCase {
    constructor(private readonly pajamaRepository: PajamasRepository) {}

    async execute({ pajamaId, data }: UpdatePajamaUseCaseRequest): Promise<UpdatePajamaUseCaseResponse> {
        const existingPajama = await this.pajamaRepository.findById(pajamaId);
        
        if (existingPajama === null) {
            throw new ResourceNotFoundError();
        }
        
        const pajamaUpdated = await this.pajamaRepository.update(pajamaId, data);

        return { pajama: pajamaUpdated } as UpdatePajamaUseCaseResponse;
    }
} 
