import prisma from "..";

export async function deleteProduct(id: string) {
    try {
        const deleteProd = await prisma.product.delete({
            where:
            {
                id
            },

        }).catch((err) => err)
        return { data: deleteProd }
    } catch (error) {
        return error
    }
} 