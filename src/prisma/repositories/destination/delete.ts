import prisma from "..";

export async function deleteDestination(id: string) {
    try {
        const deleteDestination = await prisma.destination.delete({
            where:
            {
                id
            },

        }).catch((err) => err)
        return { dbRes: deleteDestination }
    } catch (error) {
        return error
    }
} 