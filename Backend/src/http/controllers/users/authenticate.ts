import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository";
import { AuthenticateUserUseCase } from "src/use-cases/user/authenticate";

import { z } from "zod";

export async function authenticate(request : FastifyRequest, reply: FastifyReply){
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password : z.string().min(6)
    })

    const {email, password} = authenticateBodySchema.parse(request.body)

    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const authenticateUserUseCase = new AuthenticateUserUseCase(prismaUsersRepository)
        const {user} = await authenticateUserUseCase.execute({
            email,
            password
        })

        return reply.status(200).send("Usuario Autenticado")
    } catch (error) {
        return reply.status(401).send("Erro de Autenticação")
    }
}