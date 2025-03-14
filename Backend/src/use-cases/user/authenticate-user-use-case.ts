import { UsersRepository } from "src/repositories/users-repository"
import { InvalidCredentialsError } from "../errors/invalid-credentials-error"
import { compare } from "bcryptjs"
import { User } from "@prisma/client"

interface AuthenticateUserUseCaseRequest {
    email: string,
    password: string
}

interface AuthenticateUserUseCaseResponse {
    user: User
}

export class AuthenticateUserUseCase {
    constructor(private readonly usersRepository: UsersRepository) {}

    async execute({ email, password }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
        const userFound = await this.usersRepository.findByEmail(email);

        if (!userFound) {
            throw new InvalidCredentialsError();
        }

        const doesPasswordMatch = await compare(password, userFound.password)

        if (!doesPasswordMatch) {
            throw new InvalidCredentialsError();
        }

        return { user: userFound } as AuthenticateUserUseCaseResponse;
    }
}
