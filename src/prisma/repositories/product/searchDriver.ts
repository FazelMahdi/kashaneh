import prisma from "..";

export async function getDriver(search: string) {
    try {
        const driverFromDb = await prisma.driver.findFirst({
            where: {
                OR: [
                    {
                        mobile: search
                    },
                    {
                        pelak: search
                    },
                ],
            },

        })
        return { data: driverFromDb }
    } catch (error) {
        return error
    }
} 