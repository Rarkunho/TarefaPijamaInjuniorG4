import { PajamasRepository } from "src/repositories/pajamas-repository";

interface CreatePajamaRequest{
    name : string,
    description : string,
    image : string,
    season : string,
    type : string,
    gender : string,
    favorite : boolean,
    onSale : boolean,
    price : number,
    salePercent : number | undefined
}

export class CreatePajamaUseCase {
    constructor ( private pajamaRepository : PajamasRepository){}

    async execute({name, description, image, season, type, gender, favorite, onSale, price, salePercent} : CreatePajamaRequest){
        await this.pajamaRepository.create({name, description, image, season, type, gender, favorite, onSale, price, salePercent})
    }
}

