import { NextResponse , NextRequest } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import liveblocks from '@/lib/liveblock';
import { adminDB } from '../../firebase-admin';

export async function POST(req: NextRequest) {
  try {

    // console.log("Liveblocks Key:", process.env.NEXT_PUBLIC_LIVE_BLOCK_KEY);
    auth.protect()
    const { sessionClaims } = await auth();
    //  console.log("Session Claims:", sessionClaims);

  
    if (!sessionClaims || !sessionClaims.email ) {
      throw new Error("Session claims are missing or incomplete");
    }

  
    const body = await req.json();
    // console.log("Request Body:", body);
    const { room } = body;
    // console.log("Room:", room);

    if (!room) {
      throw new Error("Room name is required");
    }

    
    const session = liveblocks.prepareSession(sessionClaims?.email, {
      userInfo: {
         name: sessionClaims?.fullName, 
        email: sessionClaims?.email,
         avatar: sessionClaims?.image, 
      },
    });
    // console.log("Session" , session)

    // Check if the user already exists in the room in Firebase
    const usersInRoom = await adminDB
      .collectionGroup("rooms")
      .where("userId", "==", sessionClaims?.email)
      .get();

    const userInRoom = usersInRoom.docs.find((doc) => doc.id === room);

    if (userInRoom?.exists) {
      session.allow(room, session.FULL_ACCESS);
      const { body, status } = await session.authorize();
    
    if (!body) {
      throw new Error("Token is missing from Liveblocks session response.");
    }

    // console.log("Liveblocks Authorization Body:", body);

    
    // return NextResponse.json({ token: body.token }, { status });
    return new Response(body , {status})
    } else {
      throw new Error("User is not authorized to access this room");
    }
  } catch (error) {

    return NextResponse.json({ error }, { status: 500 });
  }
}
