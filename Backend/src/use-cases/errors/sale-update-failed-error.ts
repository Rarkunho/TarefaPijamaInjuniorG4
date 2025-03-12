export class SaleUpdateFailedError extends Error {
    constructor() {
        super('Failed to Update the Sale');
    }
}
