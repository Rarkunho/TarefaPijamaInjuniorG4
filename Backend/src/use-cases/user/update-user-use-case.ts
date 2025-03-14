import { User } from "@prisma/client";
import { compare, hash } from "bcryptjs";
import { env } from "src/env/index";
import { UsersRepository, UserUpdateInput } from "src/repositories/users-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { UpdateSamePasswordError } from "../errors/update-same-password-error";

interface UpdateUserUseCaseRequest {
    userId: string;
    updateData: UserUpdateInput;
}

interface UpdateUserUseCaseResponse {
    user: User;
}


export class UpdateUserUseCase {
    constructor(private readonly usersRepository: UsersRepository) {}

    async execute({ userId, updateData }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
        const existingUser = await this.usersRepository.findById(userId);

        if (!existingUser) {
            throw new ResourceNotFoundError();
        }

        if (updateData.password) {
            const isSamePassword = await compare(updateData.password, existingUser.password);

            if (isSamePassword) {
                throw new UpdateSamePasswordError();
            }

            updateData.password = await hash(updateData.password, env.HASH_NUMBER_TIMES);
        }

        const userUpdated = await this.usersRepository.update(userId, updateData);

        return { user: userUpdated } as UpdateUserUseCaseResponse;
    }
}
