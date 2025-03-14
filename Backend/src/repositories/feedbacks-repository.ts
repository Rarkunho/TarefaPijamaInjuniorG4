import { Feedback, Prisma } from "@prisma/client";

export interface SearchFeedbackFilters
    extends Partial<Prisma.FeedbackUncheckedCreateInput> {}

export interface FeedbackPaginationParams {
    skip?: number;
    take?: number;
}

export interface FeedbacksRepository {
    create(feedbackData: Prisma.FeedbackCreateInput): Promise<Feedback>;
    delete(feedbackId: string): Promise<Feedback>;
    findById(feedbackId: string): Promise<Feedback | null>;
    getAllFeedbacks(searchFilters: SearchFeedbackFilters, paginationParams: FeedbackPaginationParams): Promise<Feedback[]>;
    getAllFeedbacksWithRatingGTE(rating: number, paginationParams: FeedbackPaginationParams): Promise<Feedback[]>;
    getFeedbacksCount(searchFilters: SearchFeedbackFilters): Promise<number>;
    getAllFeedbacksCountWithRatingGTE(rating: number): Promise<number>;
}
