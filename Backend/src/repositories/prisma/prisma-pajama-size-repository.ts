import { PajamaSize, Prisma, PrismaPromise } from "@prisma/client";
import { PajamasSizeRepository } from "../pajamas-size-repository";
import { prismaClient } from "src/lib/prisma";

export class PrismaPajamasSizeRepository implements PajamasSizeRepository {
    asyncCreate(pajamaSizeData: Prisma.PajamaSizeUncheckedCreateInput): PrismaPromise<PajamaSize> {
        const pajamaSize = prismaClient.pajamaSize.create({
            data: pajamaSizeData
        });

        return pajamaSize;
    }
    
    async create(pajamaSizeData: Prisma.PajamaSizeUncheckedCreateInput): Promise<PajamaSize> {
        const pajamaSize = await prismaClient.pajamaSize.create({
            data: pajamaSizeData
        });

        return pajamaSize;
    }


    async findAllPajamasSize(pajamaId: string): Promise<PajamaSize[]> {
        const pajamasSize = await prismaClient.pajamaSize.findMany({
            where: {
                pajamaId: pajamaId
            }
        });

        return pajamasSize;
    }
}
