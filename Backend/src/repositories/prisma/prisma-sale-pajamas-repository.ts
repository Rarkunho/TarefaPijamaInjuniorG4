import { Prisma, PrismaPromise, SalePajama } from "@prisma/client";
import { SalePajamaSearchDataInput, SalePajamasRepository } from "../sale-pajamas-repository";
import { prismaClient } from "src/lib/prisma";

export class PrismaSalePajamasRepository implements SalePajamasRepository {
    async create(salePajamaData: Prisma.SalePajamaUncheckedCreateInput): Promise<SalePajama> {
        const salePajama = await prismaClient.salePajama.create({
            data: salePajamaData
        });

        return salePajama;
    }

    asyncCreate(salePajamaData: Prisma.SalePajamaUncheckedCreateInput): PrismaPromise<SalePajama> {
        const salePajama = prismaClient.salePajama.create({
            data: salePajamaData
        });

        return salePajama;
    }

    async findMany(salePajamaSearchData: SalePajamaSearchDataInput): Promise<SalePajama[]> {
        const salePajamas = await prismaClient.salePajama.findMany({
            where: salePajamaSearchData
        });

        return salePajamas;
    }
}
