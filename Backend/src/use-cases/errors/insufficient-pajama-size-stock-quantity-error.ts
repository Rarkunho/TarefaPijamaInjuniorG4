import { PajamaSizes } from "@prisma/client";

export class InsufficientPajamaSizeStockQuantityError extends Error {
    constructor(pajamaSizeId: string, size: PajamaSizes, desiredQuantity: number, availableQuantity: number) {
        super(`There is Not Enough Stock of Pajamas with id ${pajamaSizeId} in size ${size} to complete the sale. (desired quantity: ${desiredQuantity} // available quantity: ${availableQuantity})`);
    }
}
