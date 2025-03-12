import { PajamaSize, PajamaSizes, Prisma, PrismaPromise } from "@prisma/client";

export interface PajamasSizeRepository {
    create(pajamaSizeData: Prisma.PajamaSizeUncheckedCreateInput): Promise<PajamaSize>;
    createMany(pajamasSizeData: Prisma.PajamaSizeUncheckedCreateInput[]): Promise<void>;
    findPajamaSize(pajamaId: string, size: PajamaSizes): Promise<PajamaSize | null>;
    findAllPajamasSize(pajamaId: string): Promise<PajamaSize[]>;
    
    // TODO: Assegurar que quantity seja inteiro positivo:
    updateStockQuantity(pajamaId: string, size: PajamaSizes, newQuantity: number): Promise<PajamaSize>;
    updateManyStockQuantity(pajamaId: string, sizeQuantityMap: Map<PajamaSizes, number>): Promise<PajamaSize[]>;
    
    decrementStockQuantity(pajamaId: string, size: PajamaSizes, decrementQuantity: number): Promise<PajamaSize>;
    decrementManyStockQuantity(pajamaId: string, decrementQuantityMap: Map<PajamaSizes, number>): Promise<PajamaSize[]>;
}

