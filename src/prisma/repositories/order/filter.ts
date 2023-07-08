import pastDays, { pastHours } from "@/core/util/past-dates";
import prisma from "..";

interface OrderFilter {
    destination?: {
        title?: string
    };
    address?: string;
    workerGroup?: {
        id?: string
    };
    state?: number;
    emptyWeight?: number;
    amount?: number;
    needsOfAmount?: number;
    preOrder?: number;
    createdAt?: DateFilter;
}
interface DateFilter {
    gte?: Date;
    lte?: Date;
}

export async function todaySales() {
    try {
        const orderFromDb = await prisma.order.findMany({
            where: {
                updatedAt: {
                    gte: pastHours(1440, 'minus'),
                    lt: pastHours(1, 'minus'),
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
                    lt: pastDays(0, 'minus'),
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
    const page = parseInt(params.page) || 1;
    const pageSize = 50;

    const skipCount = (page - 1) * pageSize;

    try {
        const orderFromDb = await prisma.order.findMany({
            skip: skipCount,
            take: pageSize,
            where: {
                createdAt: {
                    gte: params.fromDate,
                    lte: params.toDate
                }
            }
        }).catch((err) => err)
        return { dbRes: orderFromDb }

    } catch (error) {
        return error
    }
} 