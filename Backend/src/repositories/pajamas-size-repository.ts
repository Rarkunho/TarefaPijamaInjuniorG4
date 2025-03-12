import { PajamaSize, PajamaSizes, Prisma, PrismaPromise } from "@prisma/client";
import { PajamaBoughtInfo } from "./sales-repository";

export interface PajamasSizeRepository {
    create(pajamaSizeData: Prisma.PajamaSizeUncheckedCreateInput): Promise<PajamaSize>;
    createMany(pajamasSizeData: Prisma.PajamaSizeUncheckedCreateInput[]): Promise<void>;
    findPajamaSize(pajamaId: string, size: PajamaSizes): Promise<PajamaSize | null>;
    findAllPajamasSize(pajamaId: string): Promise<PajamaSize[]>;
    
    // TODO: Assegurar que quantity seja inteiro positivo:
    updateStockQuantity(pajamaId: string, size: PajamaSizes, newQuantity: number): Promise<PajamaSize>;
    updateManyStockQuantity(pajamaSizesUpdateData: PajamaBoughtInfo[]): Promise<PajamaSize[]>;
    
    decrementStockQuantity(pajamaId: string, size: PajamaSizes, decrementQuantity: number): Promise<PajamaSize>;
    decrementManyStockQuantity(pajamaSizesDecrementData: PajamaBoughtInfo[]): Promise<PajamaSize[]>;
}

