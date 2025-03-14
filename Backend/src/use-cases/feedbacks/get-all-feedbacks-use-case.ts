import { Feedback } from "@prisma/client";
import { FeedbacksRepository } from "src/repositories/feedbacks-repository";

interface GetAllFeedbacksUseCaseRequest {}

interface GetAllFeedbacksUseCaseResponse {
    feedbacks: Feedback[];
}

export class GetAllFeedbacksUseCase {
    constructor(private readonly feedbackRepository: FeedbacksRepository) {}

    async execute({}: GetAllFeedbacksUseCaseRequest): Promise<GetAllFeedbacksUseCaseResponse> {
        const allFeedbacks = await this.feedbackRepository.getAllFeedbacks();

        return { feedbacks: allFeedbacks } as GetAllFeedbacksUseCaseResponse;
    }
}
