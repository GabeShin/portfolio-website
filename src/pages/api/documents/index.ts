import type { NextApiRequest, NextApiResponse } from "next";
import { GlobalExceptionFilter } from "@/lib/middleware/exception-filters";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { limit, offset } = req.query;

  if (req.method === "POST") {
    // Add document to collection
    // Your logic here
    return res.status(201).json({ message: "Document added" });
  }

  if (req.method === "DELETE") {
    // Delete documents with ids from collection
    const { ids } = req.query;
    // Your logic here
    return res.status(200).json({ message: "Documents deleted" });
  }

  if (req.method === "GET") {
    // Get documents from collection
    // Your logic here
    return res.status(200).json({ documents: [] });
  }

  res.status(405).end(); // Method Not Allowed
};

export default GlobalExceptionFilter(handler);
