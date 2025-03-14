import { hash } from "bcryptjs";
import { env } from "src/env/index";
import { UsersRepository } from "src/repositories/users-repository";
import { UserAlreadyExists } from "../errors/user-already-exists-error";

interface CreateUserCaseRequest {
    name: string;
    email: string;
    password: string;
}

export class CreateUserCase {
    constructor(private readonly usersRepository: UsersRepository) {}

    async execute({ name, email, password }: CreateUserCaseRequest) {
        const userWithSameEmail = await this.usersRepository.findByEmail(email);

        if (userWithSameEmail) {
            throw new UserAlreadyExists();
        }

        const passwordHash = await hash(password, env.HASH_NUMBER_TIMES);

        await this.usersRepository.create({
            name,
            email,
            password: passwordHash,
        });
    }
}
