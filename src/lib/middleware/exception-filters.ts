import { NextApiRequest, NextApiResponse } from "next";
import { CustomError } from "../errors/custom-error";
import { apiResponse } from "../dto/common.dto";
import { z } from "zod";

export const GlobalExceptionFilter = (
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res);
    } catch (e: unknown) {
      if (e instanceof CustomError) {
        res.status(e.statusCode).json({ message: e.message, error: e });
      } else if (e instanceof z.ZodError) {
        res.status(400).json({ message: e.errors, error: e });
      } else if (e instanceof Error) {
        res.status(500).json({ message: e.message, error: e });
      } else {
        console.error("An unknown error occurred:", e);
        res
          .status(500)
          .json({ message: "An unknown error occurred", error: e });
      }
    }
  };
};
