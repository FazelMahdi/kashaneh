import prisma from "..";

export async function getAllWorkers() {
    try {
        const groupFromDb = await prisma.workerGroup.findMany().catch((err) => err)
        return { groups: groupFromDb }

    } catch (error) {
        return error
    }
} 