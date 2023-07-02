import prisma from "..";

export async function getAllProducts() {
    try {
        const productFromDb = await prisma.product.findMany().catch((err) => err)
        return { dbRes: productFromDb }

    } catch (error) {
        return error
    }
} 