import { auth } from '@clerk/nextjs/server';
import RoomProvider from '@/components/RoomProvider';

async function DocLayout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
  // Await the `params` to ensure it's resolved before accessing `id`
  const { id } = await params;

  auth.protect();

  return (
    <div>
      {/* <p>Authenticated Room ID: {id}</p> */}
      <RoomProvider roomId={id}>
        {children}
      </RoomProvider>
    </div>
  );
}

export default DocLayout;


// interface Params {
//   id: string;
// }

// async function DocLayout({
//   children,
//   params,
// }: {
//   children: React.ReactNode;
//   params: Params ;
// }) {
//   const { id } = params;

//   const { userId } =   await auth.protect();
//   // console.log("UserId" , userId)

//   if (!userId) {
//     // Redirect to sign-in page
//     return (
//       <div>
//         <p>Redirecting to sign-in...</p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       {/* <p>Authenticated Room ID: {id}</p> */}
//     <RoomProvider roomId={id}>
//       {children}
//     </RoomProvider>
//     </div>
//   );
// }

// export default DocLayout;