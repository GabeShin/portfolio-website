import { GlobalExceptionFilter } from "@/lib/middleware/exception-filters";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name } = req.query;

  if (req.method === "GET") {
    // Get collection with name
    // Your logic here
    return res.status(200).json({ collection: {} });
  }

  res.status(405).end(); // Method Not Allowed
};

export default GlobalExceptionFilter(handler);
