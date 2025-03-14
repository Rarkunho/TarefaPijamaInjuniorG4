import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository";
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error";
import { UpdateUserUseCase } from "src/use-cases/user/update-user-use-case";
import { z } from "zod";

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
    const updateParamsSchema = z.object({
        userId: z.string().uuid()
    });

    const updateBodySchema = z.object({
        name: z.string()
            .nonempty("Name cannot be empty")
            .min(6, "Name is too small, it must be at least 6 characters long")
            .max(75, "Name is too big, it must be no longer than 75 characters")
            .refine(name => /^[A-Za-z\s]+$/.test(name), {
                message: "Name must contain only alphabetic characters and spaces",
            }),

        email: z.string()
            .email("Invalid email format")
            .min(15, "Email is too small, it must be at least 15 characters long")
            .max(75, "Email is too big, it must be no longer than 75 characters"),

        password: z.string()
            .min(6, "Password is too small, it must be at least 6 characters long")
            .max(100, "Password is too big, it must be no longer than 100 characters"),
    })

    const { userId } = updateParamsSchema.parse(request.params);
    const updateUserData = updateBodySchema.parse(request.body);
    
    const prismaUsersRepository = new PrismaUsersRepository();
    const updateUserUseCase = new UpdateUserUseCase(prismaUsersRepository);

    try {
        const updatedUser = await updateUserUseCase.execute({
            userId,
            data: updateUserData
        });

        return reply.status(200).send(user)
    } catch (error) {
        if (error instanceof (ResourceNotFoundError)) {
            return reply.status(404).send({ message: error.message })
        }
        throw error
    }
}
