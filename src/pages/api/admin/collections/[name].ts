import { z } from "zod";
import { GlobalExceptionFilter } from "@/lib/middleware/exception-filters";
import { getDatabaseServiceInstance } from "@/lib/services/init";
import type { NextApiRequest, NextApiResponse } from "next";
import HttpStatusCode from "@/lib/constants/http-status-codes";

const querySchema = z.object({
  name: z.string().min(2),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const service = await getDatabaseServiceInstance();

  const parsedQuery = querySchema.parse(req.query);

  const { name } = parsedQuery;

  if (req.method === "GET") {
    const collections = await service.getCollection(name);
    return res
      .status(HttpStatusCode.OK)
      .json({ message: "return collection list", data: collections });
  }

  res.status(HttpStatusCode.METHOD_NOT_ALLOWED).end();
};

export default GlobalExceptionFilter(handler);
