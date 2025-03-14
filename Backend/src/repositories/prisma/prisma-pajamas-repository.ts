import { Pajama, PajamaSizes, Prisma } from "@prisma/client";
import { PajamaInfoResponse, PajamasPaginationParams, PajamasRepository, PajamaUpdateInput, SearchPajamaFilters } from "../pajamas-repository";
import { prismaClient } from "src/lib/prisma";
import { PrismaPajamasSizeRepository } from "./prisma-pajama-size-repository";
import { GetAllPajamasUseCaseRequest } from "src/use-cases/pajamas/get-all-pajamas-use-case";

export class PrismaPajamasRepository implements PajamasRepository {
    async create(pajamaData: Prisma.PajamaCreateInput): Promise<Pajama> {
        const pajama = await prismaClient.pajama.create({
            data: pajamaData
        });

        // Criando sizes na tabela pajamaSize:
        const pajamaSizeRepository = new PrismaPajamasSizeRepository();
        await pajamaSizeRepository.createMany(
            Object.values(PajamaSizes).map(size => ({
                pajamaId: pajama.id,
                size: size
            }))
        );

        return pajama;
    }

    async findById(pajamaId: string): Promise<Pajama | null> {
        const pajama = await prismaClient.pajama.findUnique({
            where: {
                id: pajamaId
            }
        });

        return pajama;
    }

    async delete(pajamaId: string): Promise<Pajama> {
        // { onDelete: Cascade } assegura a deleção automática dos tamanhos em pajamaSize:
        const deletedPajama = await prismaClient.pajama.delete({
            where: {
                id: pajamaId
            }
        });

        return deletedPajama;
    }

    async getAllPajamas(searchFilters: SearchPajamaFilters, paginationParams: PajamasPaginationParams): Promise<Pajama[]> {
        const allPajamas = await prismaClient.pajama.findMany({
            ...paginationParams,
            where: {
                ...searchFilters
            }
        });

        return allPajamas;
    }

    async update(pajamaId: string, updateData: PajamaUpdateInput): Promise<Pajama> {
        const updatedPajama = await prismaClient.pajama.update({
            where: { id: pajamaId },
            data: updateData
        });

        return updatedPajama;
    }

    async findManyById(pajamaIdArray: string[]): Promise<Pajama[]> {
        const pajamaArray = await prismaClient.pajama.findMany({
            where: {
                id: { in: pajamaIdArray }
            }
        });

        return pajamaArray;
    }

    async getPajamasCount(searchFilters: SearchPajamaFilters): Promise<number> {
        const pajamasCount = await prismaClient.pajama.count({
            where: {
                ...searchFilters
            }
        });

        return pajamasCount;
    }
}
