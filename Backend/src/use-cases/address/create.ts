
import { AddressRepository } from "src/repositories/address-repository"

interface CreateGetAddressUseCaseRequest{
    zipCode: string
    state: string
    city: string
    neighborhood: string
    address: string
    number: string

}

export class CreateAddressUseCase{
    constructor (private addressRepository : AddressRepository) {

    }

    async execute({ zipCode, state, city, neighborhood, address, number } : CreateGetAddressUseCaseRequest){
        await this.addressRepository.Create({
            zipCode,
            state,
            city,
            neighborhood,
            address,
            number
        })

    }
}