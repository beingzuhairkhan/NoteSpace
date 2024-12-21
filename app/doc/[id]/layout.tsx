import { auth } from '@clerk/nextjs/server';
import RoomProvider from '@/components/RoomProvider';
import { ReactNode } from 'react';

// Define the correct type for `params`
interface DocLayoutProps {
  children: ReactNode;
  params: Promise<{ id: string }>; 
}

async  function DocLayout({ children, params }: DocLayoutProps) {
  const  id  = (await params).id;

  auth.protect();  // Ensure authentication

  return (
    <div>
      {/* Optionally show the room id */}
      {/* <p>Authenticated Room ID: {id}</p> */}
      <RoomProvider roomId={id}>
        {children}
      </RoomProvider>
    </div>
  );
}

export default DocLayout;
