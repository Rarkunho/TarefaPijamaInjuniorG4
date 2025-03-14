export class ResourceNotFoundError extends Error {
    constructor(message: string = 'Resource not Found') {
        super(message);
    }
}
