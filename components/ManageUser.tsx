"use client"
import {
    Dialog,

    DialogContent,
    DialogDescription,

    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { useState, useTransition , FormEvent } from 'react'
import { Button } from "./ui/button"
import { RemoveUserFromDocument } from "../actions/actions"
import { toast } from "sonner"
import { useUser } from "@clerk/nextjs"
import { useRoom } from "@liveblocks/react"
import useOwner from "../lib/useOwner"
import { useCollection } from "react-firebase-hooks/firestore"
import { collectionGroup, query, where } from "firebase/firestore"
import { db } from "../firebase"

const ManageUser = () => {
    const user = useUser()
    const room = useRoom()
    const isOwner = useOwner()
    const [isOpen, setIsOpen] = useState(false)
    const [isPending, startTransition] = useTransition()

     const [usersInRoom] = useCollection(
        user && query(collectionGroup(db , "rooms"), where("roomId" , "==" , room.id))
     )
    const handleDelete = async (userId : string) => {
          
        startTransition(async ()=>{
            if(!user){
                return ;
            }
            const {success } = await RemoveUserFromDocument(room.id , userId)
            if (success) {

                toast.success("User Removed from Room SuccessFully")
            } else {
                toast.error("Failed to Remove user from Room ")
            }
        })
    
    }
    return (
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <Button asChild variant="outline" >
                    <DialogTrigger>Users : ({usersInRoom?.docs.length})  </DialogTrigger>

                </Button>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Users with Access</DialogTitle>
                        <DialogDescription>
                          Below is a list of Users who have access to this document.
                        </DialogDescription>
                    </DialogHeader>
                    <hr className="my-2" />
                    <div className="gap-3 flex flex-col " >
                        {
                            usersInRoom?.docs.map((doc)=>(
                                <div key={doc.data().userId} className="flex justify-between items-center" >
                                    
                                        <p className="font-light " >
                                            {
                                                doc.data().userId === user.user?.emailAddresses[0].toString() ?
                                                `you (${doc.data().userId})` : doc.data().userId
                                            }
                                        </p>
                                        <div className="flex items-center gap-2" >
                                            <Button variant="outline" >{doc.data().role}</Button>
                                            {
                                                isOwner && doc.data().userId !== user.user?.emailAddresses[0].toString() && (
                                                    <Button variant="destructive" onClick={()=>handleDelete(doc.data().userId)} disabled={isPending} >
                                                        {isPending ? "Removing" : "X"}
                                                    </Button>
                                                )
                                            }

                                        </div>
                                    
                                </div>
                            ))
                        }
                    </div>
              
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default ManageUser