'use server';

import { auth } from "@clerk/nextjs/server";
import { adminDB } from "@/firebase-admin";
import liveblocks from '@/lib/liveblock';

export async function createNewDocument() {
    try {
        console.log("Starting createNewDocument function...");

        // Get the session details
        const { sessionClaims } = await auth();
        console.log("Session claims:", sessionClaims);

        if (!sessionClaims?.email) {
            console.error("Unauthorized: Email not found in session.");
            throw new Error("Unauthorized: Email not found in session.");
        }

        // Reference the documents collection
        const docCollectionRef = adminDB.collection("documents");
        console.log("Reference to 'documents' collection acquired.");

        // Add a new document
        const docRef = await docCollectionRef.add({
            title: "New Document",
            createdAt: new Date(),
        });
        console.log("New document added with ID:", docRef.id);

        // Associate the document with the user in the users collection
        const userRef = adminDB
            .collection("users")
            .doc(sessionClaims.email)
            .collection("rooms")
            .doc(docRef.id);
        console.log("Reference to user room document acquired.");

        await userRef.set({
            userId: sessionClaims.email,
            role: "owner",
            createdAt: new Date(),
            roomId: docRef.id,
        });
        console.log("User room document created for user:", sessionClaims.email);

        // Return the new document ID
        console.log("Document creation successful. Returning document ID.");
        return { docid: docRef.id };
    } catch (error) {
        console.error("Error in createNewDocument:", error);
        throw error; // Rethrow the error after logging
    }
};


export async function deleteDocument(roomId : string){
    auth.protect();
     console.log("Room deleted id" , roomId)
     try{

        await adminDB.collection("documents").doc(roomId).delete();
        const query = await adminDB.collectionGroup("rooms").where("roomId" , "==" , roomId).get()

        const batch = adminDB.batch();

        query.docs.forEach((doc)=>{
            batch.delete(doc.ref);
        })
      
        await batch.commit()
        await liveblocks.deleteRoom(roomId) ;


     }catch(error){
     
            console.error("Error occurred during document deletion:", error);
            return { success: false, message: error.message || "An unknown error occurred" };
        
        
     }
}

export async function inviteUserToRoom(roomId:string , email:string){
    auth.protect();
    console.log("Room id & email" , roomId , email)
    try{
        await adminDB.collection("users").doc(email).collection("rooms").doc(roomId).set({
            userId:email , role : "editor" , createdAt : new Date() , roomId
        });
        return {success:true}

    }catch(error){
        console.error("Error occurred during Inviting user:", error);
        return { success: false, message: error.message || "An unknown error occurred" };
    }
}
export async function RemoveUserFromDocument(roomId : string , email:string){
    auth.protect();
    console.log("Room id & email" , roomId )

    try{

        await adminDB.collection("users").doc(email).collection("rooms").doc(roomId).delete();
        return {success:true}


    }catch(error){
        console.error("Error occurred during Removing user from document:", error);
        return { success: false, message: error.message || "An unknown error occurred" };
    }
}