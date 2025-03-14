import { Feedback } from "@prisma/client"
import { FeedbacksRepository } from "src/repositories/feedbacks-repository"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"

interface DeleteFeedbackUseCaseRequest {
    id : string
}

interface DeleteFeedbackUseCaseResponse {
    feedback : Feedback
}

export class DeleteFeedbackUseCase{
    constructor(private feedbackRepository : FeedbacksRepository){
        
    }

    async execute( { id } : DeleteFeedbackUseCaseRequest): Promise<DeleteFeedbackUseCaseResponse>{
        const feedback = await this.feedbackRepository.delete(id)

        if(!feedback) { 
            throw new ResourceNotFoundError()
        }

        return { feedback }
    }
}
