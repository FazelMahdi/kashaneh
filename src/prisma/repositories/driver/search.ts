import prisma from "..";

export async function getAllDrivers() {
    try {
        const driverFromDb = await prisma.driver.findMany().catch((err) => err)
        return { dbRes: driverFromDb }

    } catch (error) {
        return error
    }
} 