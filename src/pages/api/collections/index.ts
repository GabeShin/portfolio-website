import { GlobalExceptionFilter } from "@/lib/middleware/exception-filters";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    // Create collection
    // Your logic here
    return res.status(201).json({ message: "Collection created" });
  }

  if (req.method === "DELETE") {
    // Delete collection
    // Your logic here
    return res.status(200).json({ message: "Collection deleted" });
  }

  if (req.method === "GET") {
    // List collections
    // Your logic here
    return res.status(200).json({ message: "return collection list" });
  }

  res.status(405).end(); // Method Not Allowed
};

export default GlobalExceptionFilter(handler);
