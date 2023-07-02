import prisma from "..";

export async function createDestination(destination: any) {
    try {
        const destinationFromDb = await prisma.destination.create({ data: destination }).catch((err) => err)
        return { dbRes: destinationFromDb }
    } catch (error) {
        return error
    }
} 