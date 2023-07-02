import prisma from "..";

export async function createOrder(order: any) {

    try {
        const orderFromDb = await prisma.order.create({ data: order }).catch((err) => err)
        return { dbRes: orderFromDb }

    } catch (error) {
        return error
    }
} 