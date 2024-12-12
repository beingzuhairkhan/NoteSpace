'use client';

import * as Y from 'yjs';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from './ui/button';
import { useState, useTransition, FormEvent } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { BotIcon, LanguagesIcon } from 'lucide-react';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';

type Language =
    | "english"
    | "spanish"
    | "portuguese"
    | "french"
    | "german"
    | "chinese"
    | "arabic"
    | "hindi"
    | "russian"
    | "japanese";

const languages: Language[] = [
    "english",
    "spanish",
    "portuguese",
    "french",
    "german",
    "chinese",
    "arabic",
    "hindi",
    "russian",
    "japanese",
];

const TranslateDocument = ({ doc }: { doc: Y.Doc }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [language, setLanguage] = useState<Language | string>("");
    const [isPending, startTransition] = useTransition();
    const [summary, setSummary] = useState("");

    const handleAskQuestion = async (e: FormEvent) => {
        e.preventDefault();

        startTransition(async () => {
            const documentData = doc.get("document-store").toJSON();
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/translateDocument`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        documentData,
                        targetLang: language,
                    }),
                });

                if (res.ok) {
                    const { translated_text } = await res.json();
                    console.log("translated_text" , translated_text)
                    setSummary(translated_text); // Set the summary state
                    toast.success("Translated Summary Successfully");
                } else {
                    throw new Error('Failed to translate the document');
                }
            } catch (error) {
                console.error(error);
                toast.error("An error occurred while translating the document");
            }
        });
    };

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <Button asChild variant="outline">
                    <DialogTrigger>
                        <LanguagesIcon />
                        Translate
                    </DialogTrigger>
                </Button>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Translate the document</DialogTitle>
                        <DialogDescription>
                            Select a language, and AI will translate a summary of the document in the selected language
                        </DialogDescription>
                        <hr className="mt-5" />
                      
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
                    </DialogHeader>
                    <form className="flex gap-2" onSubmit={handleAskQuestion}>
                        <Select value={language} onValueChange={(value) => setLanguage(value)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Theme" />
                            </SelectTrigger>
                            <SelectContent>
                                {languages.map((lang) => (
                                    <SelectItem key={lang} value={lang}>
                                        {lang.charAt(0).toUpperCase() + lang.slice(1)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button type="submit" disabled={!language || isPending}>
                            {isPending ? "Translating..." : "Translate"}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default TranslateDocument;
