import { Feedback, Prisma } from "@prisma/client";
import { FeedbackPaginationParams, FeedbacksRepository, SearchFeedbackFilters } from "../feedbacks-repository";
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

    async findById(feedbackId: string): Promise<Feedback | null> {
        const feedback = await prismaClient.feedback.findUnique({
            where: {
                id: feedbackId
            }
        });

        return feedback;
    }

    async getAllFeedbacks(searchFilters: SearchFeedbackFilters, paginationParams: FeedbackPaginationParams): Promise<Feedback[]> {
        const allFeedbacks = await prismaClient.feedback.findMany({
            ...paginationParams,
            where: {
                ...searchFilters
            }
        });

        return allFeedbacks;
    }

    async getAllFeedbacksWithRatingGTE(rating: number, paginationParams: FeedbackPaginationParams): Promise<Feedback[]> {
        const allFeedbacks = await prismaClient.feedback.findMany({
            ...paginationParams,
            where: {
                rating: {
                    gte: rating
                }
            }
        });

        return allFeedbacks;
    }

    async getFeedbacksCount(searchFilters: SearchFeedbackFilters): Promise<number> {
        const feedbacksCount = await prismaClient.feedback.count({
            where: {
                ...searchFilters
            }
        });

        return feedbacksCount;
    }

    async getAllFeedbacksCountWithRatingGTE(rating: number): Promise<number> {
        const feedbacksGTECount = await prismaClient.feedback.count({
            where: {
                rating: {
                    gte: rating
                }
            }
        });

        return feedbacksGTECount;
    }
}
