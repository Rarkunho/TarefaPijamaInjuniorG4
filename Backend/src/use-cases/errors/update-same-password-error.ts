export class UpdateSamePasswordError extends Error {
    constructor() {
        super('New Password must be Different from your Current Password');
    }
}
