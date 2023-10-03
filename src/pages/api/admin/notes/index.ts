import type { NextApiRequest, NextApiResponse } from "next";
import { GlobalExceptionFilter } from "@/lib/middleware/exception-filters";
import HttpStatusCode from "@/lib/constants/http-status-codes";
import { getDatabaseServiceInstance } from "@/lib/services/init";
import { z } from "zod";
import { apiResponse } from "@/lib/dto/common.dto";

const addNoteSchema = z.object({
  collectionName: z.string().min(2),
  text: z.string(),
  source: z.string(),
});

const deleteNoteSchema = z.object({
  collectionName: z.string(),
  ids: z.array(z.string()),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const service = await getDatabaseServiceInstance();

  if (req.method === "POST") {
    // Add note to collection
    const validatedBody = addNoteSchema.parse(req.body);
    const { collectionName, text, source } = validatedBody;
    const data = await service.addNote(collectionName, text, source);
    return res
      .status(HttpStatusCode.CREATED)
      .json(apiResponse({ message: "note added", data }));
  }

  if (req.method === "DELETE") {
    // Delete note with ids from collection
    const { collectionName, ids } = deleteNoteSchema.parse(req.body);
    const data = await service.deleteNote(collectionName, ids);
    return res
      .status(HttpStatusCode.OK)
      .json({ message: "note deleted", data });
  }

  res.status(HttpStatusCode.METHOD_NOT_ALLOWED).end();
};

export default GlobalExceptionFilter(handler);
