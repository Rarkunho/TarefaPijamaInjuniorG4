import { PajamaSizes } from "@prisma/client";

export class InsufficientPajamaSizeStockQuantityError extends Error {
    constructor(pajamaSizeId: string, size: PajamaSizes) {
        super(`There is Not Enough Stock of Pajamas with id ${pajamaSizeId} in size ${size} to complete the sale`);
    }
}
