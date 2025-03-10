import { PajamaSize, Prisma, PrismaPromise } from "@prisma/client";

export interface PajamasSizeRepository {
    create(pajamaSizeData: Prisma.PajamaSizeUncheckedCreateInput): Promise<PajamaSize>;
    asyncCreate(pajamaSizeData: Prisma.PajamaSizeUncheckedCreateInput): PrismaPromise<PajamaSize>;
    findAllPajamasSize(pajamaId: string): Promise<PajamaSize[]>;
}
