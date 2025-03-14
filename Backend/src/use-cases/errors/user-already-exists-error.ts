export class UserAlreadyExists extends Error {
    constructor() {
        super('User Email Already Exists');
    }
}
