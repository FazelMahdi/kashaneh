import prisma from "..";

export async function getOrder(id: string) {
    try {
        const orderFromDb = await prisma.order.findUniqueOrThrow({
            where: {
                id: id
            },

        }).catch((err) => err)
        return { dbRes: orderFromDb }
    } catch (error) {
        return error
    }
} 