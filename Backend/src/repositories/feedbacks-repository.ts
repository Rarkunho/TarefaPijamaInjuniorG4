import { Feedback, Prisma } from "@prisma/client";

export interface SearchFilters
    extends Partial<Prisma.FeedbackUncheckedCreateInput> {}

export interface FeedbacksRepository {
    create(feedbackData: Prisma.FeedbackCreateInput): Promise<Feedback>;
    delete(feedbackId: string): Promise<Feedback>;
    findById(feedbackId: string): Promise<Feedback | null>;
    getAllFeedbacks(searchFilters: SearchFilters): Promise<Feedback[]>;
    getAllFeedbacksWithRatingGTE(rating: number): Promise<Feedback[]>;
}
