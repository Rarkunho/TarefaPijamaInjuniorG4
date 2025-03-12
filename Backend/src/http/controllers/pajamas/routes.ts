import { FastifyInstance } from "fastify";
import { CreatePajama } from "./create";
import { getPajama } from "./get";
import { deletePajama } from "./delete";
import { UpdatePajama } from "./update";
import { getAllPajama } from "./get-all";

export function pajamaRoutes(app: FastifyInstance) {
    app.post('/pajama', CreatePajama);
    app.get('/pajama/:id', getPajama);
    app.get('/pajamas', getAllPajama);
    app.delete('/pajama/:id', deletePajama);
    app.patch('/pajama/:id', UpdatePajama);
}
