import { fixChars } from "@/core/util/number";
import prisma from "..";

export async function getDriver(search: string) {
    try {
        const driverFromDb = await prisma.driver.findFirst({
            where: {
                OR: [
                    {
                        mobile: fixChars(search)
                    },
                    {
                        fullPelak: fixChars(search)
                    },
                ],
            },

        })
        return { data: driverFromDb }
    } catch (error) {
        return error
    }
} 