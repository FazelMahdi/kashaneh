import prisma from "..";

export async function deleteWorker(id: string) {
    try {
        const deleteGroup = await prisma.workerGroup.delete({
            where:
            {
                id
            },

        }).catch((err) => err)
        return { data: deleteGroup }
    } catch (error) {
        return error
    }
} 