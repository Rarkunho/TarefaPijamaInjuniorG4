import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaFeedbacksRepository } from "src/repositories/prisma/prisma-feedbacks-repository";
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found";
import { DeleteFeedbackUseCase } from "src/use-cases/feedbacks/delete";
import { z } from "zod";

export async function deleteFeedback(request : FastifyRequest, reply : FastifyReply){
    const getParamsSchema = z.object({
        id: z.string().uuid()
    })

    const { id } = getParamsSchema.parse(request.params)
    
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