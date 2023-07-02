import { withMethods } from "@/lib/api-middlewares/with-methods";
import { createOrder } from "@/prisma/repositories/order/create";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const data = req.body;
            const { error, dbRes } = await createOrder(data);
            if (error) throw new Error(error);
            return res.status(200).json(dbRes)

        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    // res.setHeader('Allow', ['GET', 'POST'])
}

export default withMethods(['POST'], handler)