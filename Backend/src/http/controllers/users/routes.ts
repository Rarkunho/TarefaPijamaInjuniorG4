import { FastifyInstance } from "fastify";
import { createUser } from "./create";

export function userRoutes (app:FastifyInstance){
    app.post('/users/create', createUser)
}