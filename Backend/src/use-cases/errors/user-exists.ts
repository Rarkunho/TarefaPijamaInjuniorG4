export class UserAlreadyExists extends Error {
    constructor() {
        super('Usuario já registrado')
    }
}