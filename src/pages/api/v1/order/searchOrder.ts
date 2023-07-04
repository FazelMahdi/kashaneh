import { withMethods } from "@/lib/api-middlewares/with-methods";
import { getOrder } from "@/prisma/repositories/order/searchOrder";
import { NextApiRequest, NextApiResponse } from "next";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const { orderId } = req.query as any
            const { error, dbRes } = await getOrder(orderId)
            if (error) throw new Error(error);
            return res.status(200).json(dbRes)

        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
}

export default withMethods(['GET'], handler)