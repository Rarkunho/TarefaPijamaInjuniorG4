import { PajamaSize, PajamaSizes, Prisma } from "@prisma/client";
import { PajamasSizeRepository } from "../pajamas-size-repository";
import { prismaClient } from "src/lib/prisma";

export class PrismaPajamasSizeRepository implements PajamasSizeRepository {
    async create(pajamaSizeData: Prisma.PajamaSizeUncheckedCreateInput): Promise<PajamaSize> {
        const pajamaSize = await prismaClient.pajamaSize.create({
            data: pajamaSizeData
        });

        return pajamaSize;
    }

    async createMany(pajamasSizeData: Prisma.PajamaSizeUncheckedCreateInput[]): Promise<void> {
        await prismaClient.pajamaSize.createMany({
            data: pajamasSizeData
        });
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
        const updatePromises = Array.from(sizeQuantityMap.entries()).map(([size, quantity]) => {
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

    async decrementStockQuantity(pajamaId: string, size: PajamaSizes, decrementQuantity: number = 1): Promise<PajamaSize> {
        const decrementedPajamaSize = await prismaClient.pajamaSize.update({
            where: {
                pajamaId_size: {
                    pajamaId: pajamaId,
                    size: size
                },
                stockQuantity: { gte: decrementQuantity }
            },
            data: {
                stockQuantity: {
                    decrement: decrementQuantity
                }
            }
        });

        return decrementedPajamaSize;
    }

    async decrementManyStockQuantity(pajamaId: string, decrementQuantityMap: Map<PajamaSizes, number>): Promise<PajamaSize[]> {
        const decrementedPajamaSizesPromises = Array.from(decrementQuantityMap.keys()).map(size => (
            this.decrementStockQuantity(pajamaId, size, decrementQuantityMap.get(size) ?? 0)
        ));

        const decrementedPajamaSizes = await Promise.all(decrementedPajamaSizesPromises);

        return decrementedPajamaSizes;
    }
}
