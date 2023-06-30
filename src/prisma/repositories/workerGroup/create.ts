import prisma from "..";

export async function createWorker(worker: any) {
    try {
        const workerFromDb = await prisma.workerGroup.create({ data: worker })
        return { group: workerFromDb }
    } catch (error) {
        return error
    }
} 