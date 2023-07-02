import prisma from "..";

export async function deleteProduct(id: string) {
    try {
        const deleteProd = await prisma.product.delete({
            where:
            {
                id
            },

        }).catch((err) => err)
        return { dbRes: deleteProd }
    } catch (error) {
        return error
    }
} 