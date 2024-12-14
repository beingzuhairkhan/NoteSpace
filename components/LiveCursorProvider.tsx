'use client';

import { useMyPresence, useOthers } from '@liveblocks/react/suspense';
import React, { PointerEvent } from 'react';


type LiveCursorProviderProps = {
  children: React.ReactNode;
};

function LiveCursorProvider({ children }: LiveCursorProviderProps) {
  const [, updateMyPresence] = useMyPresence();
  const others = useOthers();

  // Handle pointer movement to update cursor position
  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    const cursor = { x: Math.floor(e.pageX), y: Math.floor(e.pageY) };
    // console.log('Cursor Position:', cursor); // Debug output
    updateMyPresence({ cursor });
  }

  // Handle pointer leave to clear cursor
  function handlePointerLeave() {
    updateMyPresence({ cursor: null });
  }

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full h-full overflow-hidden"
    >
      {/* Render cursors for other users */}
      {others
        .filter((other) => other.presence?.cursor !== null)
        .map(({ info, connectionId, presence }) => (
          <div
            key={connectionId}
            style={{
              position: 'absolute',
              top: presence.cursor?.y,
              left: presence.cursor?.x,
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none', // Prevent the cursor from blocking interactions
            }}
          >
            {/* Custom cursor icon */}
            <div
              className="w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-white font-bold"
            >
              {info.name ? info.name[0] : '?'}
            </div>
          </div>
        ))}
      {children}
    </div>
  );
}

export default LiveCursorProvider;
