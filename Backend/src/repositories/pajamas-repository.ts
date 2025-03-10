import { Pajama, Prisma } from "@prisma/client";

interface PajamaUpdateInput {
    name?: string;
    description?: string;
    image?: string;
    price?: number;
    season?: string;
    type?: string;
    gender?: string;
    favorite?: boolean;
    onSale?: boolean;
    salePercent?: number;
}

export interface PajamasRepository {
    create(pajamaData: Prisma.PajamaCreateInput): Promise<Pajama>;
    // update(pajamaId: string, updateData: PajamaUpdateInput): Promise<Pajamas>;

    // TODO: Solicitar monitoria para sanar dúvidas referentes ao update
    // TODO: Perguntar sobre o armazenamento de informações entre a transição de formulários no front
    // TODO: Como vamos capturar o userID no back?

}
