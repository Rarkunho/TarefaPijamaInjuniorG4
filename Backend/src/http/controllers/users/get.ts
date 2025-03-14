import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository";
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error";
import { GetUserUseCase } from "src/use-cases/user/get-user-use-case";
import { z } from "zod";

export async function getUser(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        userId: z.string().uuid()
    });

    const { userId } = getParamsSchema.parse(request.params);

    const prismaUsersRepository = new PrismaUsersRepository();
    const getUserUseCase = new GetUserUseCase(prismaUsersRepository);

    try {
        const getUserResponse = await getUserUseCase.execute({
            userId
        });

        // Removendo a password da response:
        const { password: userPassword, ...filteredUserResponse } = getUserResponse.user;

        return reply.status(200).send(filteredUserResponse);

    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message });
        }

        throw error;
    }

}
