import { Address } from "@prisma/client"
import { AddressRepository } from "src/repositories/address-repository"
import { ResourceNotFoundError } from "../errors/resource-not-found"


interface DeleteAddressUseCaseRequest {
    id: string
}

interface DeleteAddressUseCaseResponse {
    address : Address
}

export class DeleteAddressUseCase {
    constructor (private addressRepository : AddressRepository){}

    async execute( { id } : DeleteAddressUseCaseRequest): Promise<DeleteAddressUseCaseResponse>{
        const address = await this.addressRepository.delete(id)

        if(!address){
            throw new ResourceNotFoundError()
        }

        return {address}
    }

}