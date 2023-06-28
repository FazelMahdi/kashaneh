import { fixChars } from "@/core/util/number";
import prisma from "..";

export async function createDriver(driver: any) {
    try {
        await prisma.driver.create({ data: { ...driver, mobile: fixChars(driver.mobile), fullPelak: fixChars(driver.fullPelak) } }).then((response) => {
            return { driver: response }
        }).catch((err) => err)

    } catch (error) {
        return error
    }
} 