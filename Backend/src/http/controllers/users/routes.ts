import { FastifyInstance } from "fastify";
import { createUser } from "./create";
import { deleteUser } from "./delete";
import { get } from "./get";
import { getEmail } from "./get-email";
import { update } from "./update";
import { authenticate } from "./authenticate";

export function userRoutes(app:FastifyInstance) {
    app.post('/users/', createUser)
    app.post('/users/login', authenticate)
    app.delete('/users/:id', deleteUser)
    app.get('/users/id/:id', get)
    app.get('/users/email/:email', getEmail)
    app.patch('/users/:id', update)
}
