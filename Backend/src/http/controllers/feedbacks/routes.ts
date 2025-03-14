import { FastifyInstance } from "fastify";
import { createFeedback } from "./create";
import { deleteFeedback } from "./delete";
import { getFeedback } from "./get";

export function feedbackRoutes(app : FastifyInstance){
    app.post('/feedbacks', createFeedback)
    app.delete('/feedbacks/:feedbackId', deleteFeedback)
    app.get('/feedbacks/:feebackId', getFeedback)
}
