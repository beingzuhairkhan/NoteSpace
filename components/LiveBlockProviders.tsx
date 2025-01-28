'use client';

import { LiveblocksProvider } from "@liveblocks/react/suspense";

function LiveBlockProviders({ children }: { children: React.ReactNode }) {
  const liveBlockKey =process.env.NEXT_PUBLIC_LIVE_BLOCK_KEY

  // console.log("Liveblocks Key:", liveBlockKey);

  // if (!liveBlockKey) {
    if (!liveBlockKey) {
      throw new Error("Missing required environment variable: NEXT_PUBLIC_LIVE_BLOCK_KEY");
    }
  
  // }
  // const authEndpoint =
  // process.env.NODE_ENV === "development"
  //   ? "http://localhost:3000/api/auth-endpoint" // Localhost URL for development
  //   : "https://note-space-luy6.vercel.app/api/auth-endpoint";

  return (
    <LiveblocksProvider throttle={16} authEndpoint={"/auth-endpoint"}>
      {children}
    </LiveblocksProvider>
  );
}

export default LiveBlockProviders;
