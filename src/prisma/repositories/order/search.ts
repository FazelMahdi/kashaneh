import prisma from "..";

export async function getOrders(state) {
    try {
        const orderFromDb = await prisma.order.findMany({
            where: {
                state
            }
        }).catch((err) => err)
        return { orders: orderFromDb }

    } catch (error) {
        return error
    }
} 