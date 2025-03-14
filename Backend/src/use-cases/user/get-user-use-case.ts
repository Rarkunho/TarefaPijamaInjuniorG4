import { User } from "@prisma/client"
import { UsersRepository } from "src/repositories/users-repository"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"


interface GetUserUseCaseRequest {
    userId: string;
}

interface GetUserUseCaseResponse {
    user: User;
}

export class GetUserUseCase {
    constructor(private readonly usersRepository: UsersRepository) {}

    async execute({ userId }: GetUserUseCaseRequest): Promise<GetUserUseCaseResponse> {
        const userFound = await this.usersRepository.findById(userId);

        if (!userFound) {
            throw new ResourceNotFoundError();
        }

        return { user: userFound } as GetUserUseCaseResponse;
    }
}
