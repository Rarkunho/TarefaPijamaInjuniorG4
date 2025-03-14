import { Prisma, PrismaPromise, SalePajama } from "@prisma/client";

export interface SalePajamaCreateInput
    extends Omit<Prisma.SalePajamaUncheckedCreateInput, 'saleId' | 'pajamaId'> {
    pajamaId: string;
    saleId: string;
}

export interface SalePajamaSearchInput
    extends Partial<Prisma.SalePajamaUncheckedCreateInput> {}


export interface SalePajamasRepository {
    create(salePajamaData: SalePajamaCreateInput): Promise<SalePajama>;
    createMany(salePajamaDataArray: SalePajamaCreateInput[]): Promise<void>;
    findMany(salePajamaSearchData: SalePajamaSearchInput): Promise<SalePajama[]>;
}
