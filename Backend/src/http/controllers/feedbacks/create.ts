import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaFeedbacksRepository } from "src/repositories/prisma/prisma-feedbacks-repository";
import { CreateFeedbackCase } from "src/use-cases/feedbacks/create-feedback-use-case";
import { z } from "zod";

export async function createFeedback(request: FastifyRequest, reply: FastifyReply) {
    const createBodySchema = z.object({
        name: z.string()
            .nonempty("Name cannot be empty")
            .min(6, "Name is too small, it must be at least 6 characters long")
            .max(75, "Name is too big, it must be no longer than 75 characters")
            .refine(name => /^[A-Za-z\s]+$/.test(name), {
                message: "Name must contain only alphabetic characters and spaces",
            }),
        
        description: z.string()
            .nonempty("Description cannot be empty")
            .min(20, "Description is too small, it must be at least 20 characters long")
            .max(1000, "Description is too big, it must be no longer than 1000 characters"),

        rating: z.number().refine((value) => {
            return /^(0(\.0|\.5)?|[1-4](\.0|\.5)?|5\.0)$/.test(value.toFixed(1)) && /^-?\d+\.\d{1}$/.test(value.toString());
        }, {
            message: "Rating must be a float value from 0.0 to 5.0 in steps of 0.5, with exactly one decimal place",
        }),
    });

    const { name, description, rating } = createBodySchema.parse(request.body);
    
    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const createFeedbackUseCase = new CreateFeedbackCase(prismaFeedbacksRepository);

    try {
        const createfeedbackResponse = await createFeedbackUseCase.execute({
            name,
            rating,
            description
        });

        return reply.status(201).send(createfeedbackResponse.feedback);

    } catch (error) {
        throw error
    }
}
