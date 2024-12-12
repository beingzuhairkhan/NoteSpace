import { NextResponse , NextRequest } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import liveblocks from '@/lib/liveblock';
import { adminDB } from '../../firebase-admin';

export async function POST(req: NextRequest) {
  try {
    // Ensure the user is authenticated
    // console.log("Liveblocks Key:", process.env.NEXT_PUBLIC_LIVE_BLOCK_KEY);
    auth.protect()
    const { sessionClaims } = await auth();
    //  console.log("Session Claims:", sessionClaims);

    // Validate that sessionClaims and essential properties are available
    if (!sessionClaims || !sessionClaims.email ) {
      throw new Error("Session claims are missing or incomplete");
    }

    // Parse the request body to get the room name
    const body = await req.json(); // Or req.body, depending on how the body is being parsed
    // console.log("Request Body:", body);
    const { room } = body;
    // console.log("Room:", room);

    if (!room) {
      throw new Error("Room name is required");
    }

    // Prepare the Liveblocks session using user information
    const session = liveblocks.prepareSession(sessionClaims?.email, {
      userInfo: {
         name: sessionClaims?.fullname, // Ensure consistency in property name
        email: sessionClaims?.email,
         avatar: sessionClaims?.image, // Default to empty string if image is missing
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

    // Return token to client
    // return NextResponse.json({ token: body.token }, { status });
    return new Response(body , {status})
    } else {
      throw new Error("User is not authorized to access this room");
    }
  } catch (error) {
    // Log the error for debugging
    console.error("Error in POST handler:", error);

    // Handle errors and return a response
    return NextResponse.json({ error }, { status: 500 });
  }
}
