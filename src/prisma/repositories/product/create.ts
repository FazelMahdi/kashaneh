import prisma from "..";

export async function createProduct(product: any) {
    try {
        const productFromDb = await prisma.product.create({ data: product }).catch((err) => err)
        return { dbRes: productFromDb }

    } catch (error) {
        return error
    }
} 