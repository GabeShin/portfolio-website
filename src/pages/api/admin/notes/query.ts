import HttpStatusCode from "@/lib/constants/http-status-codes";
import { apiResponse } from "@/lib/dto/common.dto";
import { GlobalExceptionFilter } from "@/lib/middleware/exception-filters";
import { getDatabaseServiceInstance } from "@/lib/services/init";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const queryNoteSchema = z.object({
  collectionName: z.string().min(2),
  queryString: z.string(),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const service = await getDatabaseServiceInstance();

  if (req.method === "POST") {
    // Query the collection using embeddings
    const validatedBody = queryNoteSchema.parse(req.body);
    const { collectionName, queryString } = validatedBody;
    const data = await service.queryNotes(collectionName, queryString);
    return res
      .status(200)
      .json(apiResponse({ message: "notes queried", data }));
  }

  res.status(HttpStatusCode.METHOD_NOT_ALLOWED).end();
};

export default GlobalExceptionFilter(handler);
