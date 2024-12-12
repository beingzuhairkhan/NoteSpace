'use client'
import NewDocumentButton from "./NewDocumentButton";
import { useCollection } from 'react-firebase-hooks/firestore';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { BiMenuAltLeft } from "react-icons/bi";
import { useUser } from "@clerk/nextjs";
import { collectionGroup, DocumentData , query, where } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { db } from '@/firebase';
import SidbarOption from './SidbarOption'
import { Skeleton } from "@/components/ui/skeleton"

interface RoomDocument extends DocumentData {
    id: string;
    createdAt: string;
    role: "owner" | "editor";
    roomId: string;
    userId: string;
}

const Sidebar = () => {
    const { user } = useUser();
    const [groupedData, setGroupedData] = useState<{
        owner: RoomDocument[];
        editor: RoomDocument[];
    }>({
        owner: [],
        editor: []
    });

    // const emailAddress = user?.emailAddresses?.[0]?.emailAddress.toString();
    // console.log("emailAddress" , emailAddress)

    const [data, loading, error] = useCollection(
        user
            && query(
                collectionGroup(db, "rooms"),
                where("userId", "==", user?.emailAddresses?.[0]?.emailAddress.toString())
            )
         
    );

    useEffect(() => {
        if (!data) return;

        const grouped = data.docs.reduce<{
            owner: RoomDocument[];
            editor: RoomDocument[];
        }>(
            (acc, curr) => {
                const roomData = curr.data() as RoomDocument;
                // console.log("roomData" , roomData)
                if (roomData.role === "owner") {
                    acc.owner.push({ id: curr.id, ...roomData });
                } else  {
                    acc.editor.push({ id: curr.id, ...roomData });
                }
                return acc;
            },
            { owner: [], editor: [] }
        );
        // console.log("grouped", grouped)
        setGroupedData(grouped);
    }, [data]);

    const menuOptions = (
        <div>
        <NewDocumentButton />
        {loading && ( <div className="flex flex-col space-y-6 mt-5">
    
      <div className="space-y-2">
        <Skeleton className="h-10 w-[200px] " />
        <Skeleton className="h-10 w-[150px]" />
        <Skeleton className="h-10 w-[200px]" />
        <Skeleton className="h-10 w-[150px]" />
        <Skeleton className="h-10 w-[200px]" />
        <Skeleton className="h-10 w-[150px]" />
        <Skeleton className="h-10 w-[200px]" />
        <Skeleton className="h-10 w-[150px]" />
        <Skeleton className="h-10 w-[200px]" />
        <Skeleton className="h-10 w-[150px]" />
        <Skeleton className="h-10 w-[200px]" />
      </div>
    </div>)
        }
        {error && <p className="text-red-500">Failed to load documents</p>}
        {!loading && !error && (
            <>
                {groupedData.owner.length > 0 ? (
                    <>
                        <h2 className="text-gray-500 font-semibold text-sm leading-10">
                            My Documents
                        </h2>
                        {groupedData.owner.map((doc) => (
                            <SidbarOption key={doc.id} id={doc.id} href={`/doc/${doc.id}`} />
                        ))}
                    </>
                ) : (
                    <h2 className="text-gray-500 font-semibold text-sm">
                        No Documents Found
                    </h2>
                )}
                {groupedData.editor.length > 0 && (
                    <>
                        <h2 className="text-gray-500 font-semibold text-sm mt-4">
                            Shared with me
                        </h2>
                        {groupedData.editor.map((doc) => (
                            <SidbarOption key={doc.id} id={doc.id} href={`/doc/${doc.id}`} />
                        ))}
                    </>
                )}
            </>
        )}
    </div>
);

    return (
        <div className="p-2 md:p-5 bg-gray-200 relative">
            <div className="md:hidden">
                <Sheet>
                    <SheetTrigger>
                        <BiMenuAltLeft className="p-2 hover:opacity-30 rounded-lg" size={40} />
                    </SheetTrigger>
                    <SheetContent side="left">
                        <SheetHeader>
                            <SheetTitle>Menu</SheetTitle>
                            <div>{menuOptions}</div>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>
            <div className="hidden md:inline">{menuOptions}</div>
        </div>
    );
};

export default Sidebar;
