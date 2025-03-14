import { User } from "@prisma/client"
import { UsersRepository } from "src/repositories/users-repository"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"


interface GetUserUseCaseRequest {
    id: string
}

interface GetUserUseCaseResponse {
    user: User
}

export class GetUserUseCase {
    constructor(private readonly usersRepository: UsersRepository) {}

    async execute({ id }: GetUserUseCaseRequest): Promise<GetUserUseCaseResponse> {
        const user = await this.usersRepository.findById(id)

        if (!user) {
            throw new ResourceNotFoundError()
        }

        return { user }
    }
}
