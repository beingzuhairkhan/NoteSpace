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

  

    // If self or others are not available, we can return an empty array to prevent errors
    const all = [
        { id: self?.id, name: self?.info?.name || "You", avatar: self?.info?.avatar },
        ...others?.map((other) => ({
            id: other.id,
            name: other.info?.name || "Unknown",
            avatar: other.info?.avatar,
        })) || [],
    ]

   

    return (
        <div className="flex items-center">
            <p className="font-md text-md mr-2">
                Currently editing this page
            </p>
            <div className="flex space-x-[-10px]">
                {all.map((other, i) => {
                    if (!other) return null // Prevent any undefined or null values from being rendered
                    return (
                        <TooltipProvider key={`${other.id}-${i}`}>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Avatar className="border-2 hover:z-50">
                                        <AvatarImage src={other.avatar || "/default-avatar.png"} alt={other.name} />
                                        <AvatarFallback>{other.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{self?.id === other.id ? "You" : other.name}</p>
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
