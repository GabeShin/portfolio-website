import { GlobalExceptionFilter } from "@/lib/middleware/exception-filters";
import { getCollectionServiceInstance } from "@/lib/services/init";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const service = await getCollectionServiceInstance();
    const response = await service.healthCheck();
    return res.status(200).json({ ok: response, message: "Healthcheck" });
  }

  res.status(405).end(); // Method Not Allowed
};

export default GlobalExceptionFilter(handler);
