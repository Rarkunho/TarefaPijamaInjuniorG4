import { Prisma, PrismaPromise, SalePajama } from "@prisma/client";

export interface SalePajamaCreateInput
    extends Omit<Prisma.SalePajamaUncheckedCreateInput, 'id' | 'saleId' | 'pajamaId'>,
            Required<Pick<Prisma.SalePajamaUncheckedCreateInput, 'saleId' | 'pajamaId'>> {}

export interface SalePajamaSearchDataInput
    extends Partial<Prisma.SalePajamaUncheckedCreateInput> {}


export interface SalePajamasRepository {
    create(salePajamaData: SalePajamaCreateInput): Promise<SalePajama>;
    asyncCreate(salePajamaData: Prisma.SalePajamaUncheckedCreateInput): PrismaPromise<SalePajama>;
    findMany(salePajamaSearchData: SalePajamaSearchDataInput): Promise<SalePajama[]>;
}
