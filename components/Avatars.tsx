'use client'

import { useOthers, useSelf } from "@liveblocks/react/suspense"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Avatars = () => {
    const others = useOthers()
    const self = useSelf()

    const all = [
        { id: self?.id, info: self?.info },
        ...others.map((other) => ({ id: other.id, info: other.info })),
    ]
    console.log("other" , others , all)

    return (
        <div className="flex items-center">
            <p className="font-md text-md mr-2">
                Currently editing this page
            </p>
            <div className="flex space-x-[-10px]">
                {all.map((other, i) => {
                    console.log("Avatar data:", other) 
                    return (
                        <TooltipProvider key={other.id + i}>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Avatar className="border-2 hover:z-50">
                                        <AvatarImage src={other.info?.avatar} alt={other.info?.name} />
                                        <AvatarFallback>{other.info?.name || "?"}</AvatarFallback>
                                    </Avatar>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{self?.id === other.id ? "You" : other.info?.name || "Anonymous"}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )
                })}
            </div>
        </div>
    )
}

export default Avatars
