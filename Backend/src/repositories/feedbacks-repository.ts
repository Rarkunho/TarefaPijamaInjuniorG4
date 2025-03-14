import { Feedback, Prisma } from "@prisma/client";

export interface FeedbacksRepository {
    create(feedbackData: Prisma.FeedbackCreateInput): Promise<Feedback>;
    delete(feedbackId: string): Promise<Feedback>;
    findById(feedbackId: string): Promise<Feedback | null>;
    getAllFeedbacks(): Promise<Feedback[]>;
}
