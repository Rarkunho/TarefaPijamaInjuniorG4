import { Feedback } from "@prisma/client";
import { FeedbacksRepository } from "src/repositories/feedbacks-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface DeleteFeedbackUseCaseRequest {
    feedbackId: string;
}

interface DeleteFeedbackUseCaseResponse {
    feedback: Feedback;
}

export class DeleteFeedbackUseCase {
    constructor(private readonly feedbackRepository: FeedbacksRepository) {}

    async execute({ feedbackId }: DeleteFeedbackUseCaseRequest): Promise<DeleteFeedbackUseCaseResponse> {
        const existingFeedback = await this.feedbackRepository.findById(feedbackId);

        if (existingFeedback === null) {
            throw new ResourceNotFoundError();
        }

        const deletedFeedback = await this.feedbackRepository.delete(feedbackId);

        return { feedback: deletedFeedback } as DeleteFeedbackUseCaseResponse;
    }
}
