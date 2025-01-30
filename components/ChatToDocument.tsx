"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import * as Y from 'yjs';
import { useState, useTransition , FormEvent } from 'react'
import { Button } from "./ui/button"
import { toast } from "sonner"
import ReactMarkdown from 'react-markdown';
import { BotIcon } from 'lucide-react';
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";


const ChatToDocument = ({ doc }: { doc: Y.Doc }) => {
    const [input, setInput] = useState("")
    const [isOpen , setIsOpen] = useState(false)
    const [isPending, startTransition] = useTransition()
    const [summary, setSummary] = useState("");
    const [question ,setQuestion] = useState("")


    const handleAskQuestion = async (e:FormEvent) => {
        e.preventDefault()
        setQuestion(input);

        startTransition(async () => {
            const documentData = doc.get("document-store").toJSON();
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/chatToDocument`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        documentData,
                        question: input,
                    }),
                });
                 console.log("res" , res.body)
        
                if (res.ok) {
                    const jsonResponse = await res.json();
                     console.log("jsonResponse:", jsonResponse); // Log the full response
                    // const { message } = jsonResponse; 
                    setInput("");
                    // console.log("message", jsonResponse);
                    setSummary(jsonResponse); // Set the summary state
                    toast.success("Question added successfully");
                } else {
                    throw new Error('Failed to translate the document');
                }
            } catch (error) {
                // Use a single string argument for `toast.error`
                console.log("chat" , error)
                toast.error(`An error occurred while translating the document: ${error}`);
            }
        });
        

        
    }
    return (
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <Button asChild variant="outline" >
                    <DialogTrigger>
                    <IoChatbubbleEllipsesOutline/>
                        Chat to Document
                        </DialogTrigger>

                </Button>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Chat to document !</DialogTitle>
                        <DialogDescription>
                          Ask a question and chat to the document with AI
                        </DialogDescription>
                    <hr className="mt-5" />
                    {question && <p className="mt-5 text-gray-500" >Q: {question}</p>}
                    </DialogHeader>
                        {summary && (
                            <div className="flex flex-col ite max-h-96 overflow-y-scroll gap-2 p-5 bg-gray-100">
                                <div className="flex">
                                    <BotIcon className="w-10 flex-shrink-0" />
                                    <p className="font-bold">
                                        GPT {isPending ? "is thinking" : "Says"}
                                    </p>
                                </div>
                                <ReactMarkdown>{isPending ? "Thinking..." : summary}</ReactMarkdown>
                            </div>
                        )}
                <form className="flex gap-2 " onSubmit={handleAskQuestion}>
             <Input type="text" placeholder="Enter your question" 
             className="w-full" value={input} onChange={(e)=> setInput(e.target.value)}
             />
             <Button type="submit" disabled={!input || isPending} >
                {isPending ? "Asking..." : "Ask"}

             </Button>

                </form>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default ChatToDocument