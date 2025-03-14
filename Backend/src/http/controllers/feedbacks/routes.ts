import { FastifyInstance } from "fastify";
import { createFeedback } from "./create";
import { deleteFeedback } from "./delete";
import { getFeedback } from "./get";

export function feedbackRoutes(app : FastifyInstance){
    app.post('/feedbacks', createFeedback)
    app.delete('/feedbacks/:id', deleteFeedback)
    app.get('/feedbacks/:id', getFeedback)
}
