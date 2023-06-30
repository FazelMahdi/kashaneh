import { fixChars } from "@/core/util/number";
import prisma from "..";

export async function createDriver(driver: any) {

    try {
        const driverFromDb = await prisma.driver.create({ data: { ...driver, mobile: fixChars(driver.mobile) } }).catch((err) => err)
        return { driver: driverFromDb }

    } catch (error) {
        return error
    }
} 