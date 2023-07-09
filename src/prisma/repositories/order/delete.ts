import prisma from "..";

export async function deleteOrder(id: string) {
    try {
        const orderFromDb = await prisma.order.update({
            where: {
                id
            },
            data: {
                isRemove: true
            }
        }).catch((err) => err)
        return { dbRes: orderFromDb }

    } catch (error) {
        return error
    }
} 