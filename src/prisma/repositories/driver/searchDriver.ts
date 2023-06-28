import { fixChars } from "@/core/util/number";
import prisma from "..";

export async function getDriver(search: string) {
    try {
        await prisma.driver.findFirst({
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

        }).then((response) => ({ data: response })).catch((err) => err)
    } catch (error) {
        return error
    }
} 