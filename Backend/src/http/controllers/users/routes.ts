import { FastifyInstance } from "fastify";
import { createUser } from "./create";
import { deleteUser } from "./delete";
import { get } from "./get";
import { getEmail } from "./get-email";

export function userRoutes (app:FastifyInstance){
    app.post('/users/create', createUser)
    app.delete('/users/delete/:id', deleteUser)
    app.get('/users/find/id/:id', get)
    app.get('/users/find/email/:email', getEmail)
}