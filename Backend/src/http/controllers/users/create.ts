import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository";
import { UserAlreadyExists } from "src/use-cases/errors/user-already-exists-error";
import { CreateUserCase } from "src/use-cases/user/create-user";
import { z } from "zod";

export async function createUser(request : FastifyRequest, reply : FastifyReply){
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { name, email, password } = registerBodySchema.parse(request.body)

    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const createUserCase = new CreateUserCase(prismaUsersRepository)
        await createUserCase.execute({
            name,
            email,
            password
        })
    } catch (error) {
        if (error instanceof (UserAlreadyExists)) {
            return reply.status(409).send({ message: error.message })
        }
        throw error
    }

    return reply.status(201).send('Usuario Registrado com sucesso')
}
