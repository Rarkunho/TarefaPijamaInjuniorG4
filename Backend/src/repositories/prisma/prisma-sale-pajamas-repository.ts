import { Prisma, PrismaPromise, SalePajama } from "@prisma/client";
import { SalePajamaCreateInput, SalePajamaSearchInput, SalePajamasRepository } from "../sale-pajamas-repository";
import { prismaClient } from "src/lib/prisma";

export class PrismaSalePajamasRepository implements SalePajamasRepository {
    asyncCreate(salePajamaData: Prisma.SalePajamaUncheckedCreateInput): PrismaPromise<SalePajama> {
        const salePajama = prismaClient.salePajama.create({
            data: salePajamaData
        });

        return salePajama;
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
