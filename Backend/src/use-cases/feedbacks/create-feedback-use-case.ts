import { Feedback } from "@prisma/client";
import { FeedbacksRepository } from "src/repositories/feedbacks-repository";

interface CreateFeedbackUseCaseRequest {
    name: string;
    description: string;
    rating: number;
}

interface CreateFeedbackUseCaseResponse {
    feedback: Feedback;
}

export class CreateFeedbackCase {
    constructor(private feedbackRepository: FeedbacksRepository) {}

    async execute({ name, description, rating }: CreateFeedbackUseCaseRequest) {
        const feedbackCreated = await this.feedbackRepository.create({
            name,
            description,
            rating
        });

        return { feedback: feedbackCreated } as CreateFeedbackUseCaseResponse;
    }
}
