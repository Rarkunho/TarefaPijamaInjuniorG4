import { Address } from "@prisma/client"
import { AddressRepository } from "src/repositories/address-repository"
import { ResourceNotFoundError } from "../errors/resource-not-found"

interface GetAddressUseCaseRequest{
    id : string
}

interface GetAddressUseCaseResponse{
    address : Address
}

export class GetAdressUseCase {
    constructor(private readonly addressRepository : AddressRepository){}

    async execute({ id } : GetAddressUseCaseRequest): Promise<GetAddressUseCaseResponse>{
        const address = await this.addressRepository.findById(id)

        if(!address){
            throw new ResourceNotFoundError()
        }

        return { address }
    }
}