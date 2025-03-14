import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository";
import { InvalidCredentialsError } from "src/use-cases/errors/invalid-credentials-error";
import { AuthenticateUserUseCase } from "src/use-cases/user/authenticate-user-use-case";
import { z } from "zod";

export async function authenticateUser(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.string()
            .email("Invalid email format")
            .min(15, "Email is too small, it must be at least 15 characters long")
            .max(75, "Email is too big, it must be no longer than 75 characters"),

        password: z.string()
            .min(6, "Password is too small, it must be at least 6 characters long")
            .max(100, "Password is too big, it must be no longer than 100 characters"),
    });

    const { email, password } = authenticateBodySchema.parse(request.body);

    const prismaUsersRepository = new PrismaUsersRepository();
    const authenticateUserUseCase = new AuthenticateUserUseCase(prismaUsersRepository);

    try {
        const authenticateResponse = await authenticateUserUseCase.execute({
            email,
            password
        });

        // Removendo a password da response:
        const { password: userPassword, ...filteredUserResponse } = authenticateResponse.user;

        return reply.status(200).send(filteredUserResponse);

    } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            return reply.status(401).send({ message: error.message });
        }

        throw error;
    }
}
