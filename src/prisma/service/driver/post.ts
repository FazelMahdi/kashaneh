import prisma from "..";

export async function createDriver(driver: any) {
    try {
        console.log('11111',driver)
        const driverFromDb = await prisma.driver.create({ data: driver })
        console.log('hii',driverFromDb)
        return { driver: driverFromDb }
    } catch (error) {
        return error
    }
} 