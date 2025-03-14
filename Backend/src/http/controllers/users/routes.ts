import { FastifyInstance } from "fastify";
import { createUser } from "./register";
import { deleteUser } from "./delete";
import { authenticateUser } from "./authenticate";
import { getUser } from "./get";
import { updateUser } from "./update";

export function userRoutes(app: FastifyInstance) {
    app.post('/users', createUser);
    app.post('/users/login', authenticateUser);
    app.delete('/users/:userId', deleteUser);
    app.get('/users/:userId', getUser);
    app.patch('/users/:userId', updateUser);
}
