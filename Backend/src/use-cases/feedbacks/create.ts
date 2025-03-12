import { FeedbacksRepository } from "src/repositories/feedbacks-repository";


interface CreateFeedbackRequest{
    name: string,
    description : string,
    rating : number
}

export class CreateFeedbackCase{
    constructor (private feedbackRepository : FeedbacksRepository){}

    async execute ({name, description, rating} : CreateFeedbackRequest){
        await this.feedbackRepository.create({
            name,
            description,
            rating
        })
    }
}