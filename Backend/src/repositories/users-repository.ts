import { Prisma, User } from "@prisma/client";

export interface UserUpdateInput
    extends Partial<Prisma.UserCreateInput> {}

export interface UsersRepository {
    create(userData: Prisma.UserCreateInput): Promise<User>;
    delete(userId: string): Promise<User>;
    findById(userId: string): Promise<User | null>;
    findByEmail(userEmail: string): Promise<User | null>;
    update(userId: string, updateData: UserUpdateInput): Promise<User>;
}
