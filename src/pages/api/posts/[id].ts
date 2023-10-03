import { z } from "zod";
import { GlobalExceptionFilter } from "@/lib/middleware/exception-filters";
import { getPostService } from "@/lib/services/init";
import type { NextApiRequest, NextApiResponse } from "next";
import HttpStatusCode from "@/lib/constants/http-status-codes";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const service = await getPostService();

  // api is /api/admin/posts/[id]
  const id = req.query.id as string;

  if (!id) {
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ message: "ID parameter is required" });
  }

  if (req.method === "GET") {
    const post = await service.getPost(id);
    return res
      .status(HttpStatusCode.OK)
      .json({ message: "return collection list", data: post });
  }

  res.status(HttpStatusCode.METHOD_NOT_ALLOWED).end();
};

export default GlobalExceptionFilter(handler);
