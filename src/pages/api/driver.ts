import { createDriver } from "@/prisma/service/driver/post";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            console.log(req)
            const data = req.body;
            const { driver, error } = await createDriver(data);
            if (error) throw new Error(error);
            return res.status(200).json({ driver })

        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
    // res.setHeader('Allow', ['GET', 'POST'])
}

export default handler