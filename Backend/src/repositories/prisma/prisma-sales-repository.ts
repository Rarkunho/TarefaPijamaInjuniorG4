import { Prisma, Sale } from "@prisma/client";
import { SalesRepository, SaleUpdateInput } from "../sales-repository";
import { prismaClient } from "src/lib/prisma";

export class PrismaSalesRepository implements SalesRepository {
    async countAddressQuantity(addressId: string): Promise<number> {
        const quantity = await prismaClient.sale.count({
            where: {
                addressId: addressId
            }
        });

        return quantity;
    }

    async create(saleData: Prisma.SaleUncheckedCreateInput): Promise<Sale> {
        const sale = await prismaClient.sale.create({
            data: saleData
        });

        return sale;
    }

    async findById(saleId: string): Promise<Sale | null> {
        const sale = await prismaClient.sale.findUnique({
            where: {
                id: saleId
            }
        });

        return sale;
    }

    async delete(saleId: string): Promise<Sale> {
        const deletedSale = await prismaClient.sale.delete({
            where: {
                id: saleId
            }
        });

        return deletedSale;
    }

    async update(saleId: string, updateData: SaleUpdateInput): Promise<Sale> {
        const updatedSale = await prismaClient.sale.update({
            where: { id: saleId },
            data: updateData
        });

        return updatedSale;
    }
}
