import { createUser } from "@/prisma/controller/users";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            const data = req.body;
            const { user, error } = await createUser(data);
            if (error) throw new Error(error);
            return res.status(200).json({ user })

        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
    // res.setHeader('Allow', ['GET', 'POST'])
}

export default handler