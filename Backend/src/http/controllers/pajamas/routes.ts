import { FastifyInstance } from "fastify";
import { CreatePajama } from "./create";
import { getPajama } from "./get";
import { deletePajama } from "./delete";
import { UpdatePajama } from "./update";
import { getAllPajama } from "./get-all";

export function pajamaRoutes(app: FastifyInstance) {
    app.post('/pajamas', CreatePajama);
    app.get('/pajamas/:id', getPajama);
    app.get('/pajamas', getAllPajama);
    app.delete('/pajamas/:id', deletePajama);
    app.patch('/pajamas/:id', UpdatePajama);
}
