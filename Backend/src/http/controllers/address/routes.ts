import { FastifyInstance } from "fastify";
import { get } from "./get";
import { deleteAddress } from "./delete";

export function addressRoutes (app:FastifyInstance){
    app.get('/address/:id',get)
    app.delete('/address/:id', deleteAddress)
}