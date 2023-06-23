import prisma from "..";

export async function getDriver(search: string) {
    try {
        console.log(search);
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
        console.log(driverFromDb)
        return { data: driverFromDb }
    } catch (error) {
        return error
    }
} 