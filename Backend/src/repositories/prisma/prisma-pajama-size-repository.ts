import { PajamaSize, PajamaSizes, Prisma, PrismaPromise } from "@prisma/client";
import { PajamasSizeRepository } from "../pajamas-size-repository";
import { prismaClient } from "src/lib/prisma";

export class PrismaPajamasSizeRepository implements PajamasSizeRepository {
    asyncCreate(pajamaSizeData: Prisma.PajamaSizeUncheckedCreateInput): PrismaPromise<PajamaSize> {
        const pajamaSize = prismaClient.pajamaSize.create({
            data: pajamaSizeData
        });

        return pajamaSize;
    }

    async create(pajamaSizeData: Prisma.PajamaSizeUncheckedCreateInput): Promise<PajamaSize> {
        const pajamaSize = await prismaClient.pajamaSize.create({
            data: pajamaSizeData
        });

        return pajamaSize;
    }


    
    async updateStockQuantity(pajamaId: string, size: PajamaSizes, newQuantity: number): Promise<PajamaSize> {
        const updatedPajamaSize = await prismaClient.pajamaSize.update({
            where: {
                pajamaId_size: {
                    pajamaId: pajamaId,
                    size: size
                }
            },
            data: {
                stockQuantity: newQuantity
            }
        });

        return updatedPajamaSize;
    }

    async updateManyStockQuantity(pajamaId: string, sizeQuantityMap: Map<PajamaSizes, number>): Promise<PajamaSize[]> {
        const updatePromises = Array.from(sizeQuantityMap.entries()).map(async ([size, quantity]) => {
            return prismaClient.pajamaSize.update({
                where: {
                    pajamaId_size: {
                        pajamaId: pajamaId,
                        size: size
                    }
                },
                data: {
                    stockQuantity: quantity
                }
            });
        });
        
        // Sincronizando todas as promises para retornar o array:
        const updatedPajamaSizes = await Promise.all(updatePromises);
        
        return updatedPajamaSizes;
    }
    
    async findPajamaSize(pajamaId: string, size: PajamaSizes): Promise<PajamaSize | null> {
        const pajamaSize = await prismaClient.pajamaSize.findUnique({
            where: {
                pajamaId_size: {
                    pajamaId: pajamaId,
                    size: size
                }
            }
        });
        
        return pajamaSize;
    }
    
    async findAllPajamasSize(pajamaId: string): Promise<PajamaSize[]> {
        const pajamasSize = await prismaClient.pajamaSize.findMany({
            where: {
                pajamaId: pajamaId
            }
        });

        return pajamasSize;
    }
}
