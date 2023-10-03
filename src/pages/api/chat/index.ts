import type { NextApiRequest, NextApiResponse } from "next";
import { GlobalExceptionFilter } from "@/lib/middleware/exception-filters";
import HttpStatusCode from "@/lib/constants/http-status-codes";
import { getChatService } from "@/lib/services/init";
import { z } from "zod";
import { apiResponse } from "@/lib/dto/common.dto";

const bodySchema = z.object({
  message: z.string(),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const service = await getChatService();

  if (req.method === "POST") {
    // Add note to collection
    const validatedBody = bodySchema.parse(req.body);
    const { message } = validatedBody;
    const data = await service.sendMessage(message);
    return res
      .status(HttpStatusCode.CREATED)
      .json(apiResponse({ message: "respond to message", data }));
  }

  res.status(HttpStatusCode.METHOD_NOT_ALLOWED).end();
};

export default GlobalExceptionFilter(handler);
