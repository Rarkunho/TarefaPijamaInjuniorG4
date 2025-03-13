import { Pajama } from "@prisma/client"
import { PajamasRepository, PajamaUpdateInput } from "src/repositories/pajamas-repository"
import { ResourceNotFoundError } from "../errors/resource-not-found";


export interface UpdatePajamaUseCaseRequest {
    id: string;
    data: PajamaUpdateInput;
}

interface UpdatePajamaUseCaseResponse {
    pajama: Pajama;
}

export class UpdatePajamaUseCase {
    constructor(private readonly pajamaRepository: PajamasRepository) {}

    async execute({ id, data }: UpdatePajamaUseCaseRequest): Promise<UpdatePajamaUseCaseResponse> {
        const existingPajama = await this.pajamaRepository.findById(id);
        
        if (existingPajama === null) {
            throw new ResourceNotFoundError();
        }
        
        const pajamaUpdated = await this.pajamaRepository.update(id, data);

        return { pajama: pajamaUpdated } as UpdatePajamaUseCaseResponse;
    }
} 
