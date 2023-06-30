import { withMethods } from "@/lib/api-middlewares/with-methods";
import { createDestination } from "@/prisma/repositories/destination/create";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const data = req.body;
            const { destination, error } = await createDestination(data);
            if (error) throw new Error(error);
            return res.status(200).json({ destination })

        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    // res.setHeader('Allow', ['GET', 'POST'])
}

export default withMethods(['POST'], handler)