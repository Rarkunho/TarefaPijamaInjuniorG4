import { Feedback } from "@prisma/client";
import { FeedbacksRepository } from "src/repositories/feedbacks-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetFeedbackUseCaseRequest {
    feedbackId: string;
}

interface GetFeedbackUseCaseResponse {
    feedback: Feedback;
}

export class GetFeedbackUseCase {
    constructor(private readonly feedbackRepository: FeedbacksRepository) {}

    async execute({ feedbackId }: GetFeedbackUseCaseRequest): Promise<GetFeedbackUseCaseResponse> {
        const feedback = await this.feedbackRepository.findById(feedbackId);

        if (feedback === null) {
            throw new ResourceNotFoundError();
        }

        return { feedback: feedback } as GetFeedbackUseCaseResponse;
    }
}
