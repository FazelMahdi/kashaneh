import prisma from "..";

export async function createDriver(driver: any) {
    try {
        const driverFromDb = await prisma.driver.create({ data: driver })
        return { driver: driverFromDb }

    } catch (error) {
        return error
    }
} 