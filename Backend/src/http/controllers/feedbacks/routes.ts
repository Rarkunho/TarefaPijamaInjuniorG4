import { FastifyInstance } from "fastify";
import { createFeedback } from "./create";
import { deleteFeedback } from "./delete";
import { getFeedback } from "./get";
import { getAllFeedbacks } from "./get-all";

export function feedbackRoutes(app: FastifyInstance) {
    app.get('/feedbacks/:feedbackId', getFeedback);
    app.get('/feedbacks', getAllFeedbacks);
    app.delete('/feedbacks/:feedbackId', deleteFeedback);
    app.post('/feedbacks', createFeedback);
}
