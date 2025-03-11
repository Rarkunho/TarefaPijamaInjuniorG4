import { PajamaSize, PajamaSizes, Prisma, PrismaPromise } from "@prisma/client";

export interface PajamasSizeRepository {
    create(pajamaSizeData: Prisma.PajamaSizeUncheckedCreateInput): Promise<PajamaSize>;
    findPajamaSize(pajamaId: string, size: PajamaSizes): Promise<PajamaSize | null>;
    findAllPajamasSize(pajamaId: string): Promise<PajamaSize[]>;
    
    // TODO: Assegurar que quantity seja inteiro positivo:
    updateStockQuantity(pajamaId: string, size: PajamaSizes, newQuantity: number): Promise<PajamaSize>;
    updateManyStockQuantity(pajamaId: string, sizeQuantityMap: Map<PajamaSizes, number>): Promise<PajamaSize[]>;
}

export interface PajamasSizeAsyncRepository extends PajamasSizeRepository {
    asyncCreate(pajamaSizeData: Prisma.PajamaSizeUncheckedCreateInput): PrismaPromise<PajamaSize>;    
}
