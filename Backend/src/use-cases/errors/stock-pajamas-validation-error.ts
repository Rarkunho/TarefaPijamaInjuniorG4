import { InsufficientPajamaSizeStockQuantityError } from "./insufficient-pajama-size-stock-quantity-error";
import { PurchaseNotAllowedError } from "./purchase-not-allowed-error";
import { ResourceNotFoundError } from "./resource-not-found-error";

export type StockValidationError = ResourceNotFoundError | InsufficientPajamaSizeStockQuantityError | PurchaseNotAllowedError;

export class StockPajamasValidationError extends Error {
    public readonly stockValidationErrors: StockValidationError[];

    constructor(stockValidationErrors: StockValidationError[]) {
        super();
        this.stockValidationErrors = stockValidationErrors;
    }
}
