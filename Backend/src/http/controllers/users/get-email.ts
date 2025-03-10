import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository";
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found";
import { GetUserEmailUseCase } from "src/use-cases/user/get-email";
import { z } from "zod";

export async function getEmail(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        email : z.string().email()
    })

    const { email } = getParamsSchema.parse(request.params)

    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const getUserEmailUseCase = new GetUserEmailUseCase(prismaUsersRepository)
        const user = await getUserEmailUseCase.execute({
            email 
        })
        return reply.status(200).send(user)
    } catch (error) {
        if (error instanceof (ResourceNotFoundError)) {
            return reply.status(404).send({ message: error.message })
        }
        throw error
    }

}