import { FastifyInstance } from "fastify";
import { createPajama } from "./create";
import { getPajama } from "./get";
import { deletePajama } from "./delete";
import { UpdatePajama } from "./update";
import { getAllPajamas } from "./get-all";

export function pajamaRoutes(app: FastifyInstance) {
    app.post('/pajamas', createPajama);
    app.get('/pajamas/:pajamaId', getPajama);
    app.get('/pajamas', getAllPajamas);
    app.delete('/pajamas/:pajamaId', deletePajama);
    app.patch('/pajamas/:pajamaId', UpdatePajama);
}
