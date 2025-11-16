export const ALLOWED_IPS = ["15.165.139.61", "127.0.0.1", "::1"];

export function getClientIpFromHeaders(requestHeaders: Headers) {
  const forwardedFor = requestHeaders.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "";
  }
  const realIp = requestHeaders.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return requestHeaders.get("remote-addr") ?? "";
}

export function isAllowedIp(requestHeaders: Headers) {
  if (process.env.NODE_ENV !== "production") {
    return true;
  }
  const ip = getClientIpFromHeaders(requestHeaders);
  if (!ip) {
    return false;
  }
  return ALLOWED_IPS.includes(ip);
}
