import { FastifyInstance } from "fastify";
import { createUser } from "./create";
import { deleteUser } from "./delete";
import { get } from "./get";
import { getEmail } from "./get-email";
import { update } from "./update";

export function userRoutes(app:FastifyInstance) {
    app.post('/users/', createUser)
    app.delete('/users/:id', deleteUser)
    app.get('/users/id/:id', get)
    app.get('/users/email/:email', getEmail)
    app.patch('/users/:id', update)
}
