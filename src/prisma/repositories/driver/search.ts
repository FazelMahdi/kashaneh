import prisma from "..";

export async function getAllDrivers() {
    try {
        const driverFromDb = await prisma.driver.findMany().catch((err) => err)
        return { drivers: driverFromDb }

    } catch (error) {
        return error
    }
} 