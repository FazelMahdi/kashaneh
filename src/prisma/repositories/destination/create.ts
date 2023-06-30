import prisma from "..";

export async function createDestination(destination: any) {
    try {
        const destinationFromDb = await prisma.destination.create({ data: destination })
        return { destination: destinationFromDb }
    } catch (error) {
        return error
    }
} 