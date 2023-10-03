import type { NextApiRequest, NextApiResponse } from "next";
import { GlobalExceptionFilter } from "@/lib/middleware/exception-filters";
import HttpStatusCode from "@/lib/constants/http-status-codes";
import { getPostService } from "@/lib/services/init";
import { apiResponse } from "@/lib/dto/common.dto";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const service = await getPostService();

  if (req.method === "GET") {
    // Get posts
    const data = await service.getPosts();
    return res
      .status(HttpStatusCode.CREATED)
      .json(apiResponse({ message: "get posts", data }));
  }

  res.status(HttpStatusCode.METHOD_NOT_ALLOWED).end();
};

export default GlobalExceptionFilter(handler);
