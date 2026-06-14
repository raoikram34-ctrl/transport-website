import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// List of bad bot user-agents and common vulnerability scanners to block
const BLOCKED_USER_AGENTS = [
  "sqlmap",
  "nikto",
  "dirbuster",
  "censys",
  "nmap",
  "masscan",
  "zgrab",
  "python-requests",
  "curl",
  "wget",
  "hydra",
  "mj12bot",
  "semrushbot",
  "dotbot",
  "petalbot",
];

// In-memory rate limiting map for fallback
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const LIMIT = 60; // 60 requests per minute
const WINDOW_MS = 60 * 1000; // 1 minute window

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get("user-agent")?.toLowerCase() || "";
  const ip = (request as any).ip || request.headers.get("x-forwarded-for") || "127.0.0.1";

  // 1. Bot & Scanner Filtering
  const isBlocked = BLOCKED_USER_AGENTS.some((bot) => userAgent.includes(bot));
  if (isBlocked) {
    return new NextResponse(
      JSON.stringify({ error: "Access Denied: Suspicious User-Agent blocked." }),
      {
        status: 403,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // 2. Global Rate Limiting for API routes
  if (request.nextUrl.pathname.startsWith("/api/")) {
    const now = Date.now();
    const rateData = rateLimitMap.get(ip);

    if (!rateData) {
      rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    } else {
      if (now > rateData.resetTime) {
        // Reset window
        rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_MS });
      } else {
        rateData.count++;
        if (rateData.count > LIMIT) {
          return new NextResponse(
            JSON.stringify({ error: "Too many requests. Please try again later." }),
            {
              status: 429,
              headers: {
                "Content-Type": "application/json",
                "Retry-After": Math.ceil((rateData.resetTime - now) / 1000).toString(),
              },
            }
          );
        }
      }
    }
  }

  // 3. Security Headers Double Layer
  const response = NextResponse.next();
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), interest-cohort=()");

  return response;
}

// Match all requests except static files, favicons, and image assets
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images).*)",
  ],
};
