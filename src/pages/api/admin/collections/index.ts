import HttpStatusCode from "@/lib/constants/http-status-codes";
import { apiResponse } from "@/lib/dto/common.dto";
import { GlobalExceptionFilter } from "@/lib/middleware/exception-filters";
import { getDatabaseServiceInstance } from "@/lib/services/init"; // import the getCollectionServiceInstance method
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const bodySchema = z.object({
  name: z.string().min(1),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const service = await getDatabaseServiceInstance(); // Get the singleton service instance

  if (req.method === "POST") {
    // Use the collectionService to create collection
    const validatedBody = bodySchema.parse(req.body);
    const { name } = validatedBody;

    await service.createCollection(name);
    return res
      .status(HttpStatusCode.CREATED)
      .json(apiResponse({ message: "Collection created" }));
  }

  if (req.method === "DELETE") {
    // Use the collectionService to delete collection
    const validatedBody = bodySchema.parse(req.body);
    const { name } = validatedBody;

    await service.deleteCollection(name);
    return res
      .status(HttpStatusCode.OK)
      .json(apiResponse({ message: "Collection deleted" }));
  }

  if (req.method === "GET") {
    // Use the collectionService to list collections
    const collections = await service.listCollections();
    return res
      .status(HttpStatusCode.OK)
      .json(
        apiResponse({ message: "return collection list", data: collections })
      );
  }

  res.status(HttpStatusCode.METHOD_NOT_ALLOWED).end(); // Method Not Allowed
};

export default GlobalExceptionFilter(handler);
