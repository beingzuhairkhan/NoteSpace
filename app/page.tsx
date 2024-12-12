// import Image from "next/image";
// import { Button } from "@/components/ui/button"
import { SlArrowLeftCircle } from "react-icons/sl";
export default function Home() {
  return (
    <main className="flex space-x-6 animate-pulse" >
      <SlArrowLeftCircle className="w-10 h-10" />
      <h1 className="font-semibold  mt-1"> Get started with creating a New Document </h1>
    </main>
  );
}
