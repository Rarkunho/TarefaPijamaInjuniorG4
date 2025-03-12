import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaFeedbacksRepository } from "src/repositories/prisma/prisma-feedbacks-repository";
import { CreateFeedbackCase } from "src/use-cases/feedbacks/create";
import { z } from "zod";

export async function createFeedback(request : FastifyRequest, reply : FastifyReply){
    const registerBodySchema = z.object({
        name : z.string(),
        description : z.string(),
        rating : z.number()
    })

    const { name, description, rating} = registerBodySchema.parse(request.body)
    
    try {
        const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
        const createFeedbackCase = new CreateFeedbackCase(prismaFeedbacksRepository)
        await createFeedbackCase.execute({
            name,
            rating,
            description
        })
    } catch (error) {
        throw error
    }

    return reply.status(201).send('feedback criado com sucesso')
}