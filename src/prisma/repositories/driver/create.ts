import { fixChars } from "@/core/util/number";
import prisma from "..";

export async function createDriver(driver: any) {

    try {
        const response = await prisma.driver.create({ data: { ...driver, mobile: fixChars(driver.mobile) } }).then((response) => {
        }).catch((err) => err)
        return {response }

    } catch (error) {
        return error
    }
} 