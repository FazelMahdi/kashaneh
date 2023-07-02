import prisma from "..";

export async function getAllWorkers() {
    try {
        const groupFromDb = await prisma.workerGroup.findMany().catch((err) => err)
        return { dbRes: groupFromDb }

    } catch (error) {
        return error
    }
} 