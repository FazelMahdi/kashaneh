import prisma from "..";

export async function getDriver(search: string) {
    try {
        const driverFromDb = await prisma.driver.findUnique({
            where: {
                mobile: search,
            },

        })
        return { data: driverFromDb }
    } catch (error) {
        return error
    }
} 