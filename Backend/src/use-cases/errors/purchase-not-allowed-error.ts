export class PurchaseNotAllowedError extends Error {
    constructor(pajamaId: string) {
        super(`Purchase cannot be completed because the pajama with id ${pajamaId} is not on sale`);
    }
}
