import { User } from "@prisma/client"
import { UsersRepository } from "src/repositories/users-repository"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"


interface GetUserEmailUseCaseRequest {
    email: string
}

interface GetUserEmailUseCaseResponse {
    user: User
}

export class GetUserEmailUseCase {
    constructor(private readonly usersRepository: UsersRepository) {}

    async execute({ email }: GetUserEmailUseCaseRequest): Promise<GetUserEmailUseCaseResponse> {
        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new ResourceNotFoundError()
        }

        return { user }
    }
}
