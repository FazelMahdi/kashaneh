import prisma from "..";

export async function updateOrder(id: string, order: any) {

    try {
        const orderFromDb = await prisma.order.update({
            where: {
                id
            },
            data: {
                ...order,
                updatedAt: new Date(),
            }
        }).catch((err) => err)
        return { dbRes: orderFromDb }

    } catch (error) {
        return error
    }
} 