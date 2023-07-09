import prisma from "..";

export async function getOrders(state) {
    // const isRemove = state === 1 ? false : null
    let where: any = null;
    if (state === 1) {
        where = {
            AND: [
                {
                    state
                },
                {
                    isRemove: false
                }
            ]
        }

    } else {
        where = {
            state: {
                lt: 20 // show all orders
            }
        }
    }
    try {
        const orderFromDb = await prisma.order.findMany({ where }).catch((err) => err)
        return { dbRes: orderFromDb }

    } catch (error) {
        return error
    }
} 