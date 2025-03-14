import { FastifyReply, FastifyRequest } from "fastify"
import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository"
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error"
import { DeleteUserUseCase } from "src/use-cases/user/delete-user-use-case"
import { z } from 'zod'

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        userId: z.string().uuid()
    });

    const { userId } = getParamsSchema.parse(request.params);

    const prismaUsersRepository = new PrismaUsersRepository();
    const deleteUserUseCase = new DeleteUserUseCase(prismaUsersRepository);

    try {
        await deleteUserUseCase.execute({
            userId
        });

        return reply.status(204).send();

    } catch (error) {
        if (error instanceof (ResourceNotFoundError)) {
            return reply.status(404).send({ message: error.message });
        }

        throw error;
    }

}
