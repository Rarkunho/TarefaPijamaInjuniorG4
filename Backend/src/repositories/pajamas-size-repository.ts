import { PajamaSize, PajamaSizes, Prisma, PrismaPromise } from "@prisma/client";

export interface PajamasSizeRepository {
    create(pajamaSizeData: Prisma.PajamaSizeUncheckedCreateInput): Promise<PajamaSize>;
    asyncCreate(pajamaSizeData: Prisma.PajamaSizeUncheckedCreateInput): PrismaPromise<PajamaSize>;
    findAllPajamasSize(pajamaId: string): Promise<PajamaSize[]>;
    
    // TODO: Assegurar que quantity seja inteiro positivo:
    updateStockQuantity(pajamaId: string, size: PajamaSizes, newQuantity: number): Promise<PajamaSize>;
    updateManyStockQuantity(pajamaId: string, sizeQuantityMap: Map<PajamaSizes, number>): Promise<PajamaSize[]>;

    // TODO: Criar update stock quantity e update many stock quantity
}
