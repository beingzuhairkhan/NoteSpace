'use client';

import { LiveblocksProvider } from "@liveblocks/react/suspense";

function LiveBlockProviders({ children }: { children: React.ReactNode }) {
  const liveBlockKey =process.env.NEXT_PUBLIC_LIVE_BLOCK_KEY

  // console.log("Liveblocks Key:", liveBlockKey);

  if (!liveBlockKey) {
    if (process.env.NODE_ENV !== "production") {
      console.error("NEXT_PUBLIC_LIVE_BLOCK_KEY is not defined.");
    }
    throw new Error("Missing required environment variable: NEXT_PUBLIC_LIVE_BLOCK_KEY");
  }

  return (
    <LiveblocksProvider throttle={16} authEndpoint={"/auth-endpoint"}>
      {children}
    </LiveblocksProvider>
  );
}

export default LiveBlockProviders;
