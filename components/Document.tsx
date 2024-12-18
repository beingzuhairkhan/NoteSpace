'use client';
import { Input } from "@/components/ui/input";
import { useState, useTransition , useEffect , FormEvent} from "react"; // Corrected `useTransition` import
import { Button } from "./ui/button"; // Fixed typo in `form` → `from`
import {updateDoc , doc} from 'firebase/firestore'
import { useDocumentData } from 'react-firebase-hooks/firestore';
import {db} from '@/firebase'
import Editor from './Editor'
import useOwner from "../lib/useOwner";
import DeleteDocument from "./DeleteDocument";
import InviteUser from './InviteUser'
import ManageUser from './ManageUser'
import Avatars from './Avatars'
const Document = ({ id }: { id: string }) => {
    const [data ] = useDocumentData(doc(db , "documents" , id)) ; //useDocumentData read the contents of a specific Firestore document in real time.
  
    const [input, setInput] = useState("");
    const [isUpdating, startTransition] = useTransition(); // add transtion while updating the input ex : updating...
   
    const isOwner = useOwner()

    useEffect(()=>{
        if(data){
            setInput(data.title)
        }
    },[data])

    const updateTitle = (e:FormEvent) => {
        e.preventDefault();

        if(input.trim()){ //.trim used for remove whitespace from both side
            startTransition(async ()=>{
                const documentRef = doc(db, "documents", id); // Create a document reference
                await updateDoc(documentRef, {
                    title:input,
                }
                )})
        }
    }
    return (
        <div className="flex-1 h-full bg-white p-5">
            <div className="flex max-w-6xl mx-auto justify-between pb-5" >
                <form className="flex space-x-4 flex-1  " action="" onSubmit={updateTitle}>
                    {/* Update title */}
                    <Input value={input} onChange={(e) => setInput(e.target.value)} />
                    <Button disabled={isUpdating} type="submit"  >{isUpdating ? "Updating..." : "Update"}</Button>

                    {/* if */}
                    {
                        isOwner && (
                            <>
                           <InviteUser/>
                       
                            <DeleteDocument/>
                                </>
                        )
                    }
                  
                </form>
            </div>
            <div className="flex max-w-6xl mx-auto justify-between items-center mb-5 " >
                <ManageUser/>
               
               <Avatars/>
            </div>
            <hr className="p-10" />
            <Editor/>
          
        </div>
    );
};

export default Document;
