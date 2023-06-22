import { getDriver } from "@/prisma/service/driver/get";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            const search = req.query.search as string;
            const { error, data } = await getDriver(search);
            if (error) throw new Error(error);
            return res.status(200).json({ data })

        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
    // res.setHeader('Allow', ['GET', 'POST'])
}

export default handler