import { Address } from "@prisma/client"
import { AddressRepository } from "src/repositories/address-repository"
import { ResourceNotFoundError } from "../errors/resource-not-found"

interface CreateGetAddressUseCaseRequest{
    id: string,
    create : {
        zipCode: string
        state: string
        city: string
        neighborhood: string
        address: string
        number: string
    }
}

interface CreateGetAddressUseCaseResponse{
    address: Address
}

export class CreateGetAddressUseCase{
    constructor (private addressRepository : AddressRepository) {

    }

    async execute({ id , create } : CreateGetAddressUseCaseRequest): Promise<CreateGetAddressUseCaseResponse>{
        let address = await this.addressRepository.findById(id)

        if (!address){
            address = await this.addressRepository.findOrCreate(id, create)
        } else {
            address = await this.addressRepository.findById(id)
        }
        if(!address){
            throw new ResourceNotFoundError
        }

        return { address }
    }
}