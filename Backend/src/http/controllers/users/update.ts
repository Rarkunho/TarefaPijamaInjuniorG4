import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository";
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error";
import { UpdateSamePasswordError } from "src/use-cases/errors/update-same-password-error";
import { UpdateUserUseCase } from "src/use-cases/user/update-user-use-case";
import { z } from "zod";

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
    const updateParamsSchema = z.object({
        userId: z.string()
            .nonempty("User ID cannot be empty")
            .uuid("User ID must be a valid UUID"),
    });


    const updateBodySchema = z.object({
        name: z.string()
            .nonempty("Name cannot be empty")
            .min(6, "Name is too small, it must be at least 6 characters long")
            .max(75, "Name is too big, it must be no longer than 75 characters")
            .refine(name => /^[A-Za-z\s]+$/.test(name), {
                message: "Name must contain only alphabetic characters and spaces",
            }).optional(),

        email: z.string()
            .email("Invalid email format")
            .min(15, "Email is too small, it must be at least 15 characters long")
            .max(75, "Email is too big, it must be no longer than 75 characters").optional(),

        password: z.string()
            .min(6, "Password is too small, it must be at least 6 characters long")
            .max(100, "Password is too big, it must be no longer than 100 characters").optional(),
    });

    const { userId } = updateParamsSchema.parse(request.params);
    const updateUserData = updateBodySchema.parse(request.body);

    const prismaUsersRepository = new PrismaUsersRepository();
    const updateUserUseCase = new UpdateUserUseCase(prismaUsersRepository);

    try {
        const updateUserResponse = await updateUserUseCase.execute({
            userId,
            updateData: updateUserData
        });

        // Removendo a password da response:
        const { password: userPassword, ...filteredUserResponse } = updateUserResponse.user;

        return reply.status(200).send(filteredUserResponse);

    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message });
        }

        if (error instanceof UpdateSamePasswordError) {
            return reply.status(422).send({ message: error.message });
        }

        throw error;
    }
}
