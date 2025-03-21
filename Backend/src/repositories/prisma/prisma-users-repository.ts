import { UsersRepository, UserUpdateInput } from "../users-repository";
import { Prisma, User } from "@prisma/client";
import { prismaClient } from "src/lib/prisma";

export class PrismaUsersRepository implements UsersRepository {
    async create(userData: Prisma.UserCreateInput): Promise<User> {
        const user = await prismaClient.user.create({
            data: userData
        });
        
        return user;
    }

    async delete(userId: string): Promise<User> {
        const deletedUser = await prismaClient.user.delete({
            where: {
                id: userId
            }
        });

        return deletedUser;
    }

    async findById(userId: string): Promise<User | null> {
        const user = await prismaClient.user.findUnique({
            where: {
                id: userId
            }
        });

        return user;
    }

    async findByEmail(userEmail: string): Promise<User | null> {
        const user = await prismaClient.user.findUnique({
            where: {
                email: userEmail
            }
        });

        return user;
    }

    async update(userId: string, updateData: UserUpdateInput): Promise<User> {
        const updatedUser = await prismaClient.user.update({
            where: { id: userId },
            data: updateData
        });

        return updatedUser;
    }
}
