import prisma from "..";

export async function getAllDestinations() {
    try {
        const destinationFromDb = await prisma.destination.findMany().catch((err) => err)
        return { destinations: destinationFromDb }

    } catch (error) {
        return error
    }
} 