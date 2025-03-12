import { SalePajama } from "@prisma/client";
import { SalePajamaCreateInput, SalePajamaSearchInput, SalePajamasRepository } from "../sale-pajamas-repository";
import { prismaClient } from "src/lib/prisma";

export class PrismaSalePajamasRepository implements SalePajamasRepository {
    async createMany(salePajamaDataArray: SalePajamaCreateInput[]): Promise<void> {
        await prismaClient.salePajama.createMany({
            data: salePajamaDataArray
        });
    }
    
    async create(salePajamaData: SalePajamaCreateInput): Promise<SalePajama> {
        const salePajama = await prismaClient.salePajama.create({
            data: salePajamaData
        });

        return salePajama;
    }


    async findMany(salePajamaSearchData: SalePajamaSearchInput): Promise<SalePajama[]> {
        const salePajamas = await prismaClient.salePajama.findMany({
            where: salePajamaSearchData
        });

        return salePajamas;
    }
}
