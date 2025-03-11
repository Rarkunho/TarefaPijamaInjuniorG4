import { FastifyInstance } from "fastify";
import { get } from "./get";
import { deleteAddress } from "./delete";
import { createOrGet } from "./createget";

export function addressRoutes (app:FastifyInstance){
    app.get('/address/:id',get)
    app.delete('/address/:id', deleteAddress)
    app.post('/address/:id', createOrGet)
}