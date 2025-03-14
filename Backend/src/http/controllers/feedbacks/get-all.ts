import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaFeedbacksRepository } from "src/repositories/prisma/prisma-feedbacks-repository";
import { GetAllFeedbacksUseCase } from "src/use-cases/feedbacks/get-all-feedbacks-use-case";

export async function getAllFeedbacks(request: FastifyRequest, reply: FastifyReply) {
    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const getAllFeedbacksUseCase = new GetAllFeedbacksUseCase(prismaFeedbacksRepository);

    try {
        const getAllFeedbacksResponse = await getAllFeedbacksUseCase.execute({});

        return reply.status(200).send(getAllFeedbacksResponse.feedbacks);
    } catch (error) {
        throw error;
    }
}
