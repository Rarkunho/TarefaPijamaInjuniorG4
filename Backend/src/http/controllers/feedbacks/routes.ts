import { FastifyInstance } from "fastify";
import { createFeedback } from "./create";
import { deleteFeedback } from "./delete";
import { getFeedback } from "./get";

export function feedbackRoutes(app : FastifyInstance){
    app.post('/feedback/', createFeedback)
    app.delete('/feedback/:id', deleteFeedback)
    app.get('/feedback/:id', getFeedback)
}