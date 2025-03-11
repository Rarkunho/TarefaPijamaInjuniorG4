import { User } from "@prisma/client";
import { UsersRepository, UserUpdateInput } from "src/repositories/users-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found";
import { compare, hash } from "bcryptjs";
import { env } from "src/env/index";

interface UpdateUserUseCaseRequest {
    id: string,
    data: UserUpdateInput
}

interface UpdateUserUseCaseResponse {
    user: User
}


export class UpdateUserUseCase {
    constructor(private readonly usersRepository: UsersRepository) {}

    async execute({ id, data }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
        const user = await this.usersRepository.update(id, data)

        if (!user) {
            throw new ResourceNotFoundError()
        }

        if (data.password) {
            const isSamePassword = await compare(data.password, user.password)
            if (isSamePassword) {
                throw new Error('Mesma senha')
            }
            data.password = await hash(data.password, env.HASH_NUMBER_TIMES)
        }
        const userUpdated = await this.usersRepository.update(id, data)
        if (!userUpdated) {
            throw new Error('Usuario Nao Atualizado')
        }

        return { user }
    }
}
