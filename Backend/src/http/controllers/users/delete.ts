import { FastifyReply, FastifyRequest } from "fastify"
import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository"
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found"
import { DeleteUserUseCase } from "src/use-cases/user/delete-user"
import { z } from 'zod'

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        id: z.string().uuid()
    })

    const { id } = getParamsSchema.parse(request.params)

    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const deleteUserUseCase = new DeleteUserUseCase(prismaUsersRepository)
        const user = await deleteUserUseCase.execute({
            id
        })
        return reply.status(204).send(user)
    } catch (err) {
        if (err instanceof (ResourceNotFoundError)) {
            return reply.status(404).send({ message: err.message })
        }
        throw err
    }

}