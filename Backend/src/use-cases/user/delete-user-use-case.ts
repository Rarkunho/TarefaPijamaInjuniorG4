import { User } from "@prisma/client"
import { UsersRepository } from "src/repositories/users-repository"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"


interface DeleteUserUseCaseRequest {
    userId: string;
}

interface DeleteUserUseCaseResponse {
    user: User;
}

export class DeleteUserUseCase {
    constructor(private readonly usersRepository: UsersRepository) {}

    async execute({ userId }: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {
        const deletedUser = await this.usersRepository.delete(userId);

        if (!deletedUser) {
            throw new ResourceNotFoundError();
        }

        return { user: deletedUser } as DeleteUserUseCaseResponse;
    }
}
