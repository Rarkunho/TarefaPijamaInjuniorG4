import { Feedback } from "@prisma/client";
import { FeedbackPaginationParams, FeedbacksRepository } from "src/repositories/feedbacks-repository";

export interface GetAllFeedbacksUseCaseRequest {
    skipQuantity?: number;
    itemsPerPage?: number;
    
    rating?: number;
    "rating-gte"?: number;
}

interface GetAllFeedbacksUseCaseResponseMetaData {
    totalItems: number;
    totalPages: number;
}

interface GetAllFeedbacksUseCaseResponse {
    feedbacks: Feedback[];
    meta?: GetAllFeedbacksUseCaseResponseMetaData;
}

export class GetAllFeedbacksUseCase {
    constructor(private readonly feedbackRepository: FeedbacksRepository) {}

    async execute(getAllFeedbacksInput: GetAllFeedbacksUseCaseRequest): Promise<GetAllFeedbacksUseCaseResponse> {
        const { skipQuantity, itemsPerPage } = getAllFeedbacksInput;
        
        const paginationFilters = {
            skip: skipQuantity,
            take: itemsPerPage
        } as FeedbackPaginationParams;

        let allFeedbacks: Feedback[], totalItems: number;

        switch (true) {
            case getAllFeedbacksInput["rating-gte"] !== undefined:
                [allFeedbacks, totalItems] = await Promise.all([
                    this.feedbackRepository.getAllFeedbacksWithRatingGTE(
                        getAllFeedbacksInput["rating-gte"],
                        paginationFilters
                    ),

                    this.feedbackRepository.getAllFeedbacksCountWithRatingGTE(
                        getAllFeedbacksInput["rating-gte"]
                    )
                ]);
                
                break;
                
                case getAllFeedbacksInput.rating !== undefined:
                    [allFeedbacks, totalItems] = await Promise.all([
                        this.feedbackRepository.getAllFeedbacks(
                            { rating: getAllFeedbacksInput.rating },
                            paginationFilters
                        ),

                        this.feedbackRepository.getFeedbacksCount({})
                    ]);

                    break;
                    
                default:
                    [allFeedbacks, totalItems] = await Promise.all([
                        this.feedbackRepository.getAllFeedbacks(
                            {},
                            paginationFilters
                        ),
                        this.feedbackRepository.getFeedbacksCount({})
                    ]);

                    break;
        }
                    
        if (itemsPerPage !== undefined && skipQuantity !== undefined) {
            return {
                feedbacks: allFeedbacks,
                meta: {
                    totalItems: totalItems,
                    totalPages: Math.ceil(totalItems / itemsPerPage)
                }
            };
        }

        return { feedbacks: allFeedbacks } as GetAllFeedbacksUseCaseResponse;
    }
}
