import { Feedback, Prisma } from "@prisma/client";

interface FeedbacksRepository {
    create(feedbackData: Prisma.FeedbackCreateInput): Promise<Feedback>;
    delete(feedbackId: string): Promise<Feedback | null>;
    getById(feedbackId: string): Promise<Feedback | null>;
}
