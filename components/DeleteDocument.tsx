"use client"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState, useTransition } from 'react'
import { Button } from "./ui/button"
import { usePathname  } from "next/navigation"
import { deleteDocument } from "../actions/actions"
import { toast } from "sonner"
// import { useRouter } from 'next/router';
const DeleteDocument = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isPending, startTransition] = useTransition()
    const pathname = usePathname()
    const handleDelete = async () => {
        const roomId = pathname.split("/").pop()
        if (!roomId) return;
        startTransition(async () => {
            const  result  = await deleteDocument(roomId)
            const { success } = result ?? { success: false };
            if (success || result) {
                setIsOpen(false);
                 window.location.href = "/";
                // await router.push("/doc")
                toast.success("Room Deleted SuccessFully")
            } else {
                window.location.href = "/";
                toast.success("Room Deleted SuccessFully")
            }

        })
    }
    return (
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <Button asChild variant="destructive" >
                    <DialogTrigger>Delete</DialogTrigger>

                </Button>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure you want to delete ?</DialogTitle>
                        <DialogDescription>
                            This will delete the document and all its contents , removing all users from the document
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-end gap-2" >
                        <Button type="button" variant="destructive" onClick={handleDelete} disabled={isPending} >
                            {isPending ? "Deleting..." : "Delete"}
                        </Button>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Close
                            </Button>
                        </DialogClose>


                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default DeleteDocument