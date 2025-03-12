import { FastifyInstance } from "fastify";
import { CreatePajama } from "./create";
import { getPajama } from "./get";
import { deletePajama } from "./delete";
import { UpdatePajama } from "./update";

export function pajamaRoutes(app: FastifyInstance) {
    app.post('/pajama', CreatePajama);
    app.get('/pajama/:id', getPajama);
    app.delete('/pajama/:id', deletePajama);
    app.patch('/pajama/:id', UpdatePajama);
}
