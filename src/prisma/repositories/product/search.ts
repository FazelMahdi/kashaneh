import prisma from "..";

export async function getAllProducts() {
    try {
        const productFromDb = await prisma.product.findMany().catch((err) => err)
        return { products: productFromDb }

    } catch (error) {
        return error
    }
} 