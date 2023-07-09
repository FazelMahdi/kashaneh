import { withMethods } from "@/lib/api-middlewares/with-methods";
import { deleteOrder } from "@/prisma/repositories/order/delete";
import { NextApiRequest, NextApiResponse } from "next";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const { id } = req.query as any

            const { error, dbRes } = await deleteOrder(id)
            if (error) throw new Error(error);
            return res.status(200).json(dbRes)

        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    // res.setHeader('Allow', ['GET', 'POST'])
}

export default withMethods(['DELETE'], handler)