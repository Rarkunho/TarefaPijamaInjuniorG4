import { Pajama } from "@prisma/client"
import { PajamasRepository, PajamaUpdateInput } from "src/repositories/pajamas-repository"
import { ResourceNotFoundError } from "../errors/resource-not-found"


interface UpdatePajamaUseCaseRequest {
    id: string,
    data : PajamaUpdateInput
}

interface UpdatePajamaUseCaseResponse {
    pajama : Pajama
}

export class UpdatePajamaUseCase{

    constructor(private pajamaRepository : PajamasRepository){}

    async execute ({ id , data} : UpdatePajamaUseCaseRequest): Promise<UpdatePajamaUseCaseResponse> {
        const pajamaUpdated = await this.pajamaRepository.update(id , data)

        if(!pajamaUpdated){
            throw new Error('Falha ao atualizar')
        }

        return { pajama : pajamaUpdated }

    }
} 
