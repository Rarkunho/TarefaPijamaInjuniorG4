import { Prisma, User } from "@prisma/client";

interface UserUpdateInput {
    name?: string,
    email?: string,
    password?: string
}

interface UsersRepository {
    create(userData: Prisma.UserCreateInput): Promise<User>;
    delete(userId: string): Promise<User | null>;
    findById(userId: string): Promise<User | null>;
    findByEmail(userEmail: string): Promise<User | null>;
    update(userId: string, updateData: UserUpdateInput): Promise<User | null>;
}
