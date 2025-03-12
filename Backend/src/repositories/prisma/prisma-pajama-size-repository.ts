import { PajamaSize, PajamaSizes, Prisma } from "@prisma/client";
import { PajamasSizeRepository } from "../pajamas-size-repository";
import { prismaClient } from "src/lib/prisma";
import { PajamaBoughtInfo } from "../sales-repository";

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

    async updateManyStockQuantity(pajamaSizesUpdateData: PajamaBoughtInfo[]): Promise<PajamaSize[]> {
        const updatePromises = pajamaSizesUpdateData.map(pajamSize => {
            return this.updateStockQuantity(pajamSize.pajamaId, pajamSize.size, pajamSize.quantity);
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

    async decrementManyStockQuantity(pajamaSizesDecrementData: PajamaBoughtInfo[]): Promise<PajamaSize[]> {
        const decrementedPajamaSizesPromises = pajamaSizesDecrementData.map(pajamSize => (
            this.decrementStockQuantity(pajamSize.pajamaId, pajamSize.size, pajamSize.quantity)
        ));

        const decrementedPajamaSizes = await Promise.all(decrementedPajamaSizesPromises);

        return decrementedPajamaSizes;
    }
}
