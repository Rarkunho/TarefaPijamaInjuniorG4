import { hash } from "bcryptjs";
import { env } from "src/env/index";
import { UsersRepository } from "src/repositories/users-repository";
import { UserAlreadyExists } from "../errors/user-already-exists-error";
import { Prisma, User } from "@prisma/client";

interface CreateUserUseCaseRequest
    extends Prisma.UserUncheckedCreateInput {}

interface CreateUserUseCaseResponse {
    user: User;
}

export class CreateUserCase {
    constructor(private readonly usersRepository: UsersRepository) {}

    async execute({ name, email, password }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
        const userWithSameEmail = await this.usersRepository.findByEmail(email);

        if (userWithSameEmail) {
            throw new UserAlreadyExists();
        }

        const passwordHash = await hash(password, env.HASH_NUMBER_TIMES);

        const userCreated = await this.usersRepository.create({
            name,
            email,
            password: passwordHash,
        });

        return { user: userCreated } as CreateUserUseCaseResponse;
    }
}
