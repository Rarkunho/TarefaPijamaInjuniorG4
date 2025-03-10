import { Prisma, Sale } from "@prisma/client";

interface SalesRepository {
    create(saleData: Prisma.SaleUncheckedCreateInput): Promise<Sale>;
}
