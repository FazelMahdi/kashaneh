import { withMethods } from "@/lib/api-middlewares/with-methods";
import { todaySales } from "@/prisma/repositories/order/filter";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { error, dbRes } = await todaySales();
        if (error) throw new Error(error);
        return res.status(200).json(dbRes)

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
    // res.setHeader('Allow', ['GET', 'POST'])
}

export default withMethods(['GET'], handler)