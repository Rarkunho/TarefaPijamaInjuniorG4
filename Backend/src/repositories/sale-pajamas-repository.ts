import { Prisma, PrismaPromise, SalePajama } from "@prisma/client";

export interface SalePajamaSearchDataInput {
    saleId?: string;
    pajamaId?: string;
    quantity?: number;
    price?: number;
}

export interface SalePajamasRepository {
    create(salePajamaData: Prisma.SalePajamaUncheckedCreateInput): Promise<SalePajama>;
    asyncCreate(salePajamaData: Prisma.SalePajamaUncheckedCreateInput): PrismaPromise<SalePajama>;
    findMany(salePajamaSearchData: SalePajamaSearchDataInput): Promise<SalePajama[]>;
}
