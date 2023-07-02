import prisma from "..";

export async function getAllDestinations() {
    try {
        const destinationFromDb = await prisma.destination.findMany().catch((err) => err)
        return { dbRes: destinationFromDb }

    } catch (error) {
        return error
    }
} 