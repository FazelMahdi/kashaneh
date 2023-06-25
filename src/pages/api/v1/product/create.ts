import { withMethods } from "@/lib/api-middlewares/with-methods";
import { createDriver } from "@/prisma/repositories/driver/create";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const data = req.body;
            const { driver, error } = await createDriver(data);
            if (error) throw new Error(error);
            return res.status(200).json({ driver })

        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    // res.setHeader('Allow', ['GET', 'POST'])
}

export default withMethods(['POST'], handler)