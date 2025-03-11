import { FastifyInstance } from "fastify";
import { get } from "./get";

export function addressRoutes (app:FastifyInstance){
    app.get('/address/:id',get)
}