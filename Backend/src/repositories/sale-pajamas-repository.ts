import { Prisma, PrismaPromise, SalePajama } from "@prisma/client";

export interface SalePajamaSearchDataInput
    extends Partial<Prisma.SalePajamaUncheckedCreateInput> {}

export interface SalePajamasRepository {
    create(salePajamaData: Prisma.SalePajamaUncheckedCreateInput): Promise<SalePajama>;
    asyncCreate(salePajamaData: Prisma.SalePajamaUncheckedCreateInput): PrismaPromise<SalePajama>;
    findMany(salePajamaSearchData: SalePajamaSearchDataInput): Promise<SalePajama[]>;
}
