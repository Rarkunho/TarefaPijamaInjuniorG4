import { Feedback } from "@prisma/client"
import { FeedbacksRepository } from "src/repositories/feedbacks-repository"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"

interface DeleteFeedbackUseCaseRequest {
    feedbackId: string;
}

interface DeleteFeedbackUseCaseResponse {
    feedback: Feedback;
}

export class DeleteFeedbackUseCase {
    constructor(private readonly feedbackRepository: FeedbacksRepository) {}

    async execute({ feedbackId }: DeleteFeedbackUseCaseRequest): Promise<DeleteFeedbackUseCaseResponse> {
        const feedback = await this.feedbackRepository.delete(feedbackId)

        if (!feedback) {
            throw new ResourceNotFoundError()
        }

        return { feedback }
    }
}
