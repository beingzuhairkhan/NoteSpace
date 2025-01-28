import { auth } from '@clerk/nextjs/server';
import RoomProvider from '@/components/RoomProvider';

type DocLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ id: string }>; // Type for the `params` prop as a Promise
};

export default async function DocLayout({ children, params }: DocLayoutProps) {
  const { id } = await params; // Awaiting `params` as it is now a Promise

  auth.protect();

  return (
    <div>
      <RoomProvider roomId={id}>
        {children}
      </RoomProvider>
    </div>
  );
}


// export default DocLayout;
