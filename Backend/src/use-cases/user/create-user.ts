import { hash } from "bcryptjs";
import { UsersRepository } from "src/repositories/users-repository";
import { UserAlreadyExists } from "../errors/user-exists";

interface CreateUserCaseRequest {
    name: string;
    email: string;
    password: string;
}

export class CreateUserCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ name, email, password }: CreateUserCaseRequest) {
        const userWithSameEmail = await this.usersRepository.findByEmail(email);

        if (userWithSameEmail) {
            throw new UserAlreadyExists();
        }

        const passwordHash = await hash(password, 6);

        await this.usersRepository.create({
            name,
            email,
            password: passwordHash,
        });
    }
}