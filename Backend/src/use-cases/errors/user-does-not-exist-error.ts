export class UserDoesNotExistError extends Error {
    constructor() {
        super('User Does not Exist');
    }
}
