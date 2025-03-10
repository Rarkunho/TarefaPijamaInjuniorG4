import { Pajama, PajamaSizes, PaymentMethod, Prisma } from "@prisma/client";
import { PajamaInfoResponse, PajamasRepository, PajamaUpdateInput } from "../pajamas-repository";
import { prismaClient } from "src/lib/prisma";
import { PrismaPajamasSizeRepository } from "./prisma-pajama-size-repository";

export class PrismaPajamasRepository implements PajamasRepository {
    async create(pajamaData: Prisma.PajamaCreateInput): Promise<Pajama> {
        const pajama = await prismaClient.pajama.create({
            data: pajamaData
        });

        // Criando sizes na tabela pajamaSize:
        const pajamaSizeRepository = new PrismaPajamasSizeRepository()
        prismaClient.$transaction(
            Object.values(PajamaSizes).map(size => {
                return pajamaSizeRepository.asyncCreate({
                    size: size,
                    pajamaId: pajama.id
                });
            })

        );

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

    async getPajamaInfo(pajamaId: string): Promise<PajamaInfoResponse> {
        const pajamaType = await prismaClient.pajama.findUnique({
            where: {
                id: pajamaId
            }
        });

        if (pajamaType === null) {
            throw new Error('Pajama not Found in getPajamaInfo Method');
        }

        const pajamasSizeRepository = new PrismaPajamasSizeRepository();
        const allPajamasSize = await pajamasSizeRepository.findAllPajamasSize(pajamaId);

        // Removendo o campo 'pajamaId' de todos os objetos:
        const allPajamasSizeFiltered = allPajamasSize.map(({ pajamaId, ...props }) => props);

        const pajamaInfoResponse: PajamaInfoResponse = {
            ...pajamaType,
            pajamaSizesInfo: allPajamasSizeFiltered,
        }

        return pajamaInfoResponse;

    }

    async update(pajamaId: string, updateData: PajamaUpdateInput): Promise<Pajama | null> {
        const updatedPajama = await prismaClient.pajama.update({
            where: { id: pajamaId },
            data: updateData
        });

        return updatedPajama;
    }
}
