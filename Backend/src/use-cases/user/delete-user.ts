import { User } from "@prisma/client"
import { UsersRepository } from "src/repositories/users-repository"
import { ResourceNotFoundError } from "../errors/resource-not-found"


interface DeleteUserUseCaseRequest {
    id: string  
}

interface DeleteUserUseCaseResponse {
    user: User
}

export class DeleteUserUseCase {
    constructor(private readonly usersRepository: UsersRepository) {}

    async execute({ id }: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {
        const user = await this.usersRepository.delete(id)

        if (!user) {
            throw new ResourceNotFoundError()
        }

        return { user }
    }
}
