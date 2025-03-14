import { Feedback } from "@prisma/client"
import { FeedbacksRepository } from "src/repositories/feedbacks-repository"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"


interface GetFeedbackUseCaseRequest {
    id: string
}

interface GetFeedbackUseCaseResponse {
    feedback: Feedback
}

export class GetFeedbackUseCase {
    constructor(private readonly feedbackRepository: FeedbacksRepository) {}
    
    async execute({ id }: GetFeedbackUseCaseRequest): Promise<GetFeedbackUseCaseResponse> {
        const feedback = await this.feedbackRepository.getById(id)

        if (!feedback) {
            throw new ResourceNotFoundError()
        }

        return { feedback }
    }

}
