import { FastifyInstance } from "fastify";
import { get } from "./get";
import { deleteAddress } from "./delete";
import { create } from "./create";

export function addressRoutes (app:FastifyInstance){
    app.post('/address/:id', create)
    app.get('/address/:id',get)
    app.delete('/address/:id', deleteAddress)
}