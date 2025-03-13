import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository";
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error";
import { GetUserUseCase } from "src/use-cases/user/get-id";
import { z } from "zod";

export async function get(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        id: z.string().uuid()
    })

    const { id} = getParamsSchema.parse(request.params)

    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const getUserUseCase = new GetUserUseCase(prismaUsersRepository)
        const user = await getUserUseCase.execute({
            id 
        })
        return reply.status(200).send(user)
    } catch (error) {
        if (error instanceof (ResourceNotFoundError)) {
            return reply.status(404).send({ message: error.message })
        }
        throw error
    }

}
