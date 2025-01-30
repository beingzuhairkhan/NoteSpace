'use client'
import { useTheme } from "next-themes";
import { MagicCard } from "@/components/ui/magic-card";
import { HiUsers, HiTranslate, HiChat, HiDocumentText } from "react-icons/hi"; 
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const { theme } = useTheme();

  const cards = [
    {
      title: "Real-Time Collaboration",
      icon: <HiUsers className="text-5xl mb-2 text-blue-500" />,
      description: "Edit documents together in real time with seamless sync.",
      animation: {
  
        transition: { duration: 1 },
      },
    },
    {
      title: "Translate Any Language",
      icon: <HiTranslate className="text-5xl mb-2 text-green-500" />,
      description: "Instantly translate your documents into multiple languages.",
      animation: {
       
        transition: { duration: 1 },
      },
    },
    {
      title: "Chat to Document",
      icon: <HiChat className="text-5xl mb-2 text-purple-500" />,
      description: "Engage in conversations directly with your documents.",
      animation: {
   
        transition: { duration: 1 },
      },
    },
    {
      title: "Rich Document Editing",
      icon: <HiDocumentText className="text-5xl mb-2 text-yellow-500" />,
      description: "Format, edit, and customize documents with ease.",
      animation: {
    
        transition: { duration: 1 },
      },
    },
  ];

  return (
    <div className="p-4 bg-white relative w-full h-full">
       <div className="">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-20 -left-10 w-48 h-48 md:w-72 md:h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
          <div className="absolute top-40 -right-10 w-48 h-48 md:w-72 md:h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-10 left-1/2 w-48 h-48 md:w-72 md:h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
        </div>
      <center>
        <h1 className="text-4xl font-bold mt-4">
          Welcome to <span className="text-blue-500">Note</span>
          <span className="text-purple-500">Space</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 mb-12">
          A powerful tool for organizing and collaborating on your notes, ideas, and documents.
        </p>
      </center>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-6">
        {cards.map((card, index) => (
          <motion.div
            key={index}
          
            transition={card.animation.transition}
            className="cursor-pointer flex flex-col items-center justify-center p-6 text-center text-lg font-semibold "
          >
            <MagicCard
              className="flex flex-col items-center justify-center p-6 text-center text-lg font-semibold shadow-2xl"
              gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
            >
              {card.icon}
              <h2 className="text-2xl mt-2">{card.title}</h2>
              <p className="text-sm mt-1 text-gray-600 dark:text-gray-300">
                {card.description}
              </p>
            </MagicCard>
          </motion.div>
        ))}
      </div>
      </div>
    </div>
  );
}
