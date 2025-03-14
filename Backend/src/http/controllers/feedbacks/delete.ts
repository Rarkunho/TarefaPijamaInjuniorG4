import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaFeedbacksRepository } from "src/repositories/prisma/prisma-feedbacks-repository";
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error";
import { DeleteFeedbackUseCase } from "src/use-cases/feedbacks/delete-feedback-use-case";
import { z } from "zod";

export async function deleteFeedback(request: FastifyRequest, reply: FastifyReply) {
    const deleteParamsSchema = z.object({
        feedbackId: z.string()
            .nonempty("Feedback ID cannot be empty")
            .uuid("Feedback ID must be a valid UUID")
    });

    const { feedbackId } = deleteParamsSchema.parse(request.params);

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const deleteFeedbackUseCase = new DeleteFeedbackUseCase(prismaFeedbacksRepository);

    try {
        await deleteFeedbackUseCase.execute({
            feedbackId
        });

        return reply.status(204).send();

    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message });
        }

        throw error;
    }
}
