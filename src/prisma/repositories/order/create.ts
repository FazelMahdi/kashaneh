import { fixChars } from "@/core/util/number";
import prisma from "..";

export async function createOrder(order: any) {


    const {
        emptyWeight,
        needsOfAmount,
        ...rest
    } = order
    const payload = {
        ...rest,
        emptyWeight: +fixChars(emptyWeight),
        needsOfAmount: +fixChars(needsOfAmount)
    }

    try {
        const orderFromDb = await prisma.order.create({ data: payload }).catch((err) => err)
        return { dbRes: orderFromDb }

    } catch (error) {
        return error
    }
} 