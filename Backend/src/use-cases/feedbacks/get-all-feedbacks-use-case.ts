import { Feedback } from "@prisma/client";
import { FeedbacksRepository } from "src/repositories/feedbacks-repository";

interface GetAllFeedbacksUseCaseRequest {
    rating?: number;
    "rating-gte"?: number;
}

interface GetAllFeedbacksUseCaseResponse {
    feedbacks: Feedback[];
}

export class GetAllFeedbacksUseCase {
    constructor(private readonly feedbackRepository: FeedbacksRepository) {}

    async execute(getAllFeedbacksInput: GetAllFeedbacksUseCaseRequest): Promise<GetAllFeedbacksUseCaseResponse> {
        let allFeedbacks: Feedback[];

        switch (true) {
            case getAllFeedbacksInput["rating-gte"] !== undefined:
                allFeedbacks = await this.feedbackRepository.getAllFeedbacksWithRatingGTE(getAllFeedbacksInput["rating-gte"]);
                break;
            
            case getAllFeedbacksInput.rating !== undefined:
                allFeedbacks = await this.feedbackRepository.getAllFeedbacks({ rating: getAllFeedbacksInput.rating });
                break;
            
            default:
                allFeedbacks = await this.feedbackRepository.getAllFeedbacks({});
                break;
        }

        return { feedbacks: allFeedbacks } as GetAllFeedbacksUseCaseResponse;
    }
}
