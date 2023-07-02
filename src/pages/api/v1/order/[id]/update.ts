import { withMethods } from "@/lib/api-middlewares/with-methods";
import { updateOrder } from "@/prisma/repositories/order/update";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const data = req.body;
        const { id } = req.query as any

        const { error, dbRes } = await updateOrder(id, { ...data, state: 10 });
        if (error) throw new Error(error);
        return res.status(200).json(dbRes)

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
    // res.setHeader('Allow', ['GET', 'POST'])
}

export default withMethods(['PUT'], handler)