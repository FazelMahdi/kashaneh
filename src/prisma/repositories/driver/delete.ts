import prisma from "..";

export async function deleteDriver(id: string) {
    try {
        const deleteDriver = await prisma.driver.delete({
            where:
            {
                id
            },

        }).catch((err) => err)
        return { dbRes: deleteDriver }
    } catch (error) {
        return error
    }
} 