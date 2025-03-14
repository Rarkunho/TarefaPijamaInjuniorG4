import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository";
import { UserAlreadyExists } from "src/use-cases/errors/user-already-exists-error";
import { CreateUserCase } from "src/use-cases/user/create-user-use-case";
import { z } from "zod";

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
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
    });

    const { name, email, password } = registerBodySchema.parse(request.body);

    const prismaUsersRepository = new PrismaUsersRepository();
    const createUserUseCase = new CreateUserCase(prismaUsersRepository);

    try {
        const createUserResponse = await createUserUseCase.execute({
            name,
            email,
            password
        });

        // Removendo a password da response:
        const { password: userPassword, ...filteredUserResponse } = createUserResponse.user;

        return reply.status(201).send(filteredUserResponse);

    } catch (error) {
        if (error instanceof UserAlreadyExists) {
            return reply.status(409).send({ message: error.message });
        }

        throw error;
    }
}
