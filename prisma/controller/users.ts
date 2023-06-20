import prisma from ".";

export async function createUser(user: any) {
    try {
        const userFromDb = await prisma.user.create({ data: user })
        return { user: userFromDb }
    } catch (error) {
        return error
    }
} 