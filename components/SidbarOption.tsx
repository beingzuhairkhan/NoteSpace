import Link from "next/link";
import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "@/firebase";
import { usePathname } from "next/navigation";

function SidbarOption({ href, id }: { href: string; id: string }) {
  const [data] = useDocumentData(doc(db, "documents", id));
  const pathname = usePathname();
  const isActive = href.includes(pathname) && pathname !== "/";

  if (!data) return null;

  return (
    <div className="p-2">
      <Link
        href={href}
        className={`relative flex items-center justify-between px-4 py-2 border rounded-md shadow-sm transition-all duration-200 
          ${
            isActive
              ? "bg-gray-100 font-bold border-black text-black"
              : "border-gray-400 hover:bg-gray-100 text-gray-700"
          }`}
      >
        <p className="truncate">{data.title}</p>
      </Link>
    </div>
  );
}

export default SidbarOption;
