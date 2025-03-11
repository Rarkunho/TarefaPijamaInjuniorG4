import { Prisma, PrismaPromise, SalePajama } from "@prisma/client";

export interface SalePajamaCreateInput
    extends Omit<Prisma.SalePajamaUncheckedCreateInput, 'saleId' | 'pajamaId'>,
            Required<Pick<Prisma.SalePajamaUncheckedCreateInput, 'saleId' | 'pajamaId'>> {}

export interface SalePajamaSearchInput
    extends Partial<Prisma.SalePajamaUncheckedCreateInput> {}


export interface SalePajamasRepository {
    create(salePajamaData: SalePajamaCreateInput): Promise<SalePajama>;
    asyncCreate(salePajamaData: Prisma.SalePajamaUncheckedCreateInput): PrismaPromise<SalePajama>;
    findMany(salePajamaSearchData: SalePajamaSearchInput): Promise<SalePajama[]>;
}
