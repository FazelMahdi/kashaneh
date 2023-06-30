import { withMethods } from "@/lib/api-middlewares/with-methods";
import { getOrder } from "@/prisma/repositories/order/searchOrder";
import { NextApiRequest, NextApiResponse } from "next";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const { id } = req.query as any

            const { error, data } = await getOrder(id)
            if (error) throw new Error(error);
            return res.status(200).json(data)

        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    // res.setHeader('Allow', ['GET', 'POST'])
}

export default withMethods(['GET'], handler)