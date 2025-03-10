import { User } from "@prisma/client"
import { ResourceNotFoundError } from "../errors/resource-not-found"
import { UsersRepository } from "src/repositories/users-repository"


interface GetUserEmailUseCaseRequest {
    email: string  
}

interface GetUserEmailUseCaseResponse {
    user: User
}

export class GetUserEmailUseCase {
    constructor(private usersRepository: UsersRepository) {

    }

    async execute({ email }: GetUserEmailUseCaseRequest): Promise<GetUserEmailUseCaseResponse> {
        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new ResourceNotFoundError
        }

        return { user }
    }
}