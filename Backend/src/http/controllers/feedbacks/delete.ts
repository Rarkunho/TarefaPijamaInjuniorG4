import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaFeedbacksRepository } from "src/repositories/prisma/prisma-feedbacks-repository";
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error";
import { DeleteFeedbackUseCase } from "src/use-cases/feedbacks/delete-feedback-use-case";
import { z } from "zod";

export async function deleteFeedback(request : FastifyRequest, reply : FastifyReply){
    const deleteParamsSchema = z.object({
        feedbackId: z.string()
            .nonempty("Feedback ID cannot be empty")
            .uuid("Feedback ID must be a valid UUID")
    });

    const { id } = deleteParamsSchema.parse(request.params)
    
    try {
        const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
        const deleteFeedbackCase = new DeleteFeedbackUseCase(prismaFeedbacksRepository)
        const feedback = await deleteFeedbackCase.execute({
            id
        })
        return reply.status(204).send(feedback)
    } catch (error) {
        if ( error instanceof ( ResourceNotFoundError )){
            return reply.status(404).send({message : error.message})
        }
        throw error
    }

    
}
