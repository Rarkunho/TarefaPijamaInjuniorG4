import { Prisma, Sales } from "@prisma/client";

interface SalesRepository {
    create(saleData: Prisma.SalesUncheckedCreateInput): Promise<Sales>;
}
