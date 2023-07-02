import { withMethods } from "@/lib/api-middlewares/with-methods";
import { getOrders } from "@/prisma/repositories/order/search";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const { state } = req.query as any

            const { error, dbRes } = await getOrders(+state);
            if (error) throw new Error(error);
            return res.status(200).json(dbRes)

        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    // res.setHeader('Allow', ['GET', 'POST'])
}

export default withMethods(['GET'], handler)