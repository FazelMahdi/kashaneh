import prisma from "..";

export async function getDriver(search: string) {
    try {
        const driverFromDb = await prisma.driver.findUnique({
            where: {
                OR: [
                    {
                        mobile: {
                            contains: search
                        }

                    },
                    {
                        pelak: {
                            contains: search
                        }
                    },
                ],
            },

        })
        console.log(driverFromDb)
        return { data: driverFromDb }
    } catch (error) {
        return error
    }
} 