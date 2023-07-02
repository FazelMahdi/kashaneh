import prisma from "..";

export async function getOrders(state) {
    try {
        const orderFromDb = await prisma.order.findMany({
            where: {
                state
            }
        }).catch((err) => err)
        return { dbRes: orderFromDb }

    } catch (error) {
        return error
    }
} 