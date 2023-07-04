import pastDays, { pastHours } from "@/core/util/past-dates";
import prisma from "..";

export async function todaySales() {
    try {
        const orderFromDb = await prisma.order.findMany({
            where: {
                updatedAt: {
                    gte: pastHours(1440, 'minus'),
                    lt:  pastHours(1, 'minus'),
                },
                state: 10
            },
        }).catch((err) => err)
        return { dbRes: orderFromDb }

    } catch (error) {
        return error
    }
}
export async function mounthSales() {
    try {
        const orderFromDb = await prisma.order.findMany({
            where: {
                updatedAt: {
                    gte: pastDays(31, 'minus'),
                    lt:  pastDays(0, 'minus'),
                },
                state: 10
            },
        }).catch((err) => err)
        return { dbRes: orderFromDb }

    } catch (error) {
        return error
    }
}
export async function getOrdersReports(params) {
    try {
        const orderFromDb = await prisma.order.findMany({
            where: {
                ...params
            }
        }).catch((err) => err)
        return { dbRes: orderFromDb }

    } catch (error) {
        return error
    }
} 