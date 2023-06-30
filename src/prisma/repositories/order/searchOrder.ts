import prisma from "..";

export async function getOrder(id: string) {
    try {
        const orderFromDb = await prisma.order.findFirst({
            where: {
                id
            },

        }).catch((err) => err)
        return { data: orderFromDb }
    } catch (error) {
        return error
    }
} 