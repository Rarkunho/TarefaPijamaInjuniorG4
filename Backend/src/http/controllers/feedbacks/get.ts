import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaFeedbacksRepository } from "src/repositories/prisma/prisma-feedbacks-repository";
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error";
import { GetFeedbackUseCase } from "src/use-cases/feedbacks/get-feedback-use-case";
import { z } from "zod";

export async function getFeedback(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        feedbackId: z.string()
            .nonempty("Feedback ID cannot be empty")
            .uuid("Feedback ID must be a valid UUID")
    });

    const { feedbackId } = getParamsSchema.parse(request.params);
    
    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const getFeedbackUseCase = new GetFeedbackUseCase(prismaFeedbacksRepository);

    try {
        const getFeedbackResponse = await getFeedbackUseCase.execute({
            feedbackId
        });

        return reply.status(200).send(getFeedbackResponse.feedback);

    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }

        throw error;
    }
}
