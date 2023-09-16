import { GlobalExceptionFilter } from "@/lib/middleware/exception-filters";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    // Query the collection using embeddings
    // Your logic here
    return res.status(200).json({ results: [] });
  }

  res.status(405).end(); // Method Not Allowed
};

export default GlobalExceptionFilter(handler);
