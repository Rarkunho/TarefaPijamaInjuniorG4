import { Feedback, Prisma } from "@prisma/client";
import { FeedbacksRepository } from "../feedbacks-repository";
import { prismaClient } from "src/lib/prisma";

export class PrismaFeedbacksRepository implements FeedbacksRepository {
    async create(feedbackData: Prisma.FeedbackCreateInput): Promise<Feedback> {
        const feedback = await prismaClient.feedback.create({
            data: feedbackData
        });

        return feedback;
    }

    async delete(feedbackId: string): Promise<Feedback> {
        const deletedFeedback = await prismaClient.feedback.delete({
            where: {
                id: feedbackId
            }
        });

        return deletedFeedback;
    }
    
    async getById(feedbackId: string): Promise<Feedback | null> {
        const feedback = await prismaClient.feedback.findUnique({
            where: {
                id: feedbackId
            }
        });

        return feedback;
    }
}
