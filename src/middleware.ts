// pages/api/_middleware.ts
import { NextRequest } from "next/server";

// Limit the middleware to paths starting with `/api/admin`
export const config = {
  matcher: "/api/admin/:function*",
};

export function middleware(request: NextRequest) {
  const apiKey = request.headers.get("x-api-key");

  if (apiKey !== process.env.ADMIN_API_KEY) {
    return Response.json({ message: "unauthorized access" }, { status: 401 });
  }
}
