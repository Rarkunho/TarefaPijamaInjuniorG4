import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository";
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found";
import { UpdateUserUseCase } from "src/use-cases/user/update";
import { z } from "zod";

export async function update(request: FastifyRequest, reply: FastifyReply){
    const updateParamsSchema = z.object({
        id: z.string().uuid()
    })
    const updateBodySchema = z.object({
        name : z.string().optional(),
        email : z.string().email().optional(),
        password : z.string().min(6).optional()
    })

    const {id} = updateParamsSchema.parse(request.params)
    const {name, email, password} = updateBodySchema.parse(request.body)

    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const updateUserUseCase = new UpdateUserUseCase(prismaUsersRepository)
        const user = await updateUserUseCase.execute({
            id,
            data : {
                name,
                email,
                password
            }
        })
        return reply.status(200).send(user)
    } catch (error) {
        if (error instanceof(ResourceNotFoundError)){
            return reply.status(404).send({message : error.message})
        }
        throw error
    }
}