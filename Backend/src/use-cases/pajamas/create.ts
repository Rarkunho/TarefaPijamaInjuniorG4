import { PajamasRepository } from "src/repositories/pajamas-repository";

interface CreatePajamaRequest {
    name: string,
    description: string,
    image: string,
    season: string,
    type: string,
    gender: string,
    favorite: boolean,
    onSale: boolean,
    price: number,
    salePercent?: number
}

export class CreatePajamaUseCase {
    constructor(private pajamaRepository: PajamasRepository) {}

    async execute(pajamaCreateInputData: CreatePajamaRequest) {
        await this.pajamaRepository.create(pajamaCreateInputData);
    }
}

