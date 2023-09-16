import { NextApiRequest, NextApiResponse } from "next";
import { CustomError } from "../errors/custom-error";

export const GlobalExceptionFilter = (
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error("An error occurred:", e.message);
        res.status(500).json({ error: e.message });
      } else if (e instanceof CustomError) {
        res.status(e.statusCode).json({ error: e.message });
      } else {
        console.error("An unknown error occurred:", e);
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  };
};
