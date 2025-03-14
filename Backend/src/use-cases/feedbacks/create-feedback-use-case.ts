import { FeedbacksRepository } from "src/repositories/feedbacks-repository";

interface CreateFeedbackUseCaseRequest {
    name: string;
    description: string;
    rating: number;
}

export class CreateFeedbackCase {
    constructor(private feedbackRepository: FeedbacksRepository) {}

    async execute({ name, description, rating }: CreateFeedbackUseCaseRequest) {
        const feedbackCreated = await this.feedbackRepository.create({
            name,
            description,
            rating
        });
    }
}
