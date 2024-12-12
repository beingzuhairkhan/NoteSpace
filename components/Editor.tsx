'use client';
import { useRoom, useSelf } from "@liveblocks/react/suspense";
import { useEffect, useState } from "react";
import * as Y from 'yjs';
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css"; // Ensure this is imported if needed
import "@blocknote/shadcn/style.css";
import stringToColor from "../lib/stringToColor";
import TranslateDocument from './TranslateDocument'
import ChatToDocument from './ChatToDocument'
// TypeScript types for props
type EditorProps = {
    doc: Y.Doc;
    provider: LiveblocksYjsProvider;
    darkMode: boolean;
};

// Component to render the BlockNote editor with collaboration
function BlockNote({ doc, provider, darkMode }: EditorProps) {
    const userInfo = useSelf((me) => me.info);

    // Ensure userInfo is valid before passing it to the editor
    if (!userInfo) {
        return <div>Loading user data...</div>;
    }

    const editor = useCreateBlockNote({
        collaboration: {
            provider,
            fragment: doc.getXmlFragment("document-store"),
            user: {
                name: userInfo.name || "Anonymous",
                color: stringToColor(userInfo.email || "")
            }
        }
    });

    return (
        <div className="relative max-w-6xl mx-auto">
            <BlockNoteView className="min-h-screen" editor={editor} theme={darkMode ? "dark" : "light"} />
        </div>
    );
}

// Main Editor component
const Editor = () => {
    const room = useRoom();
    const [doc, setDoc] = useState<Y.Doc | null>(null);
    const [provider, setProvider] = useState<LiveblocksYjsProvider | null>(null);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const ydoc = new Y.Doc();
        const yProvider = new LiveblocksYjsProvider(room, ydoc);
        setDoc(ydoc);
        setProvider(yProvider);

        return () => {
            ydoc.destroy();
            yProvider.destroy();
        };
    }, [room]);

    if (!doc || !provider) {
        return <div>Loading...</div>; // Display loading state until initialization is complete
    }

    const buttonStyle = `hover:text-white ${darkMode ? "text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700" : "text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-700"}`;

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-end mb-10 gap-2">
                <TranslateDocument doc={doc} />
                <ChatToDocument doc={doc} />
                <Button className={buttonStyle} onClick={() => setDarkMode(!darkMode)} aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}>
                    {darkMode ? <SunIcon /> : <MoonIcon />}
                </Button>
            </div>

            <BlockNote doc={doc} provider={provider} darkMode={darkMode} />
        </div>
    );
};

export default Editor;
