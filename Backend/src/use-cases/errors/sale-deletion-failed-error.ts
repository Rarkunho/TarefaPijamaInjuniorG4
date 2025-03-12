export class SaleDeletionFailedError extends Error {
    constructor() {
        super('Failed to Delete the Sale');
    }
}
