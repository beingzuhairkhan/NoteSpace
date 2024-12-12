import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Protect all routes except static files and Next.js internals
    "/((?!.*\\..*|_next).*)",
    // Always apply middleware to API routes
    "/(api|trpc)(.*)",
  ],
};
