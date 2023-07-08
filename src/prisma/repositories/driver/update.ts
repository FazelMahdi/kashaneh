import { fixChars } from "@/core/util/number";
import prisma from "..";

export async function updateDriver(id: string, driver: any) {

    try {
        const driverFromDb = await prisma.driver.update({
            where: {
                id
            },
            data: {
                ...driver, mobile: fixChars(driver.mobile)
            }
        }).catch((err) => err)
        return { dbRes: driverFromDb }

    } catch (error) {
        return error
    }
} 