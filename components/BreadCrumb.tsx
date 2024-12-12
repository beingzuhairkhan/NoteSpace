'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const BreadCrumb = () => {
  const path = usePathname();
  const [segments, setSegments] = useState<string[]>([]);

  useEffect(() => {
    if (path) {
      setSegments(path.split("/").filter(Boolean));
    }
  }, [path]);

  return (
    <Breadcrumb className="py-2 px-4 bg-gray-100 rounded-md shadow-sm font-semibold text-gray-900">
      <BreadcrumbList className="flex space-x-2 text-sm text-gray-700 items-center">
        {/* Home Link */}
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/"
            className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-300"
          >
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>

        {/* Dynamic Segments */}
        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;

          return (
            <BreadcrumbItem key={segment}>
              {/* Separator for all except the first segment */}
              {index > 0 && (
                <BreadcrumbSeparator className="mx-2 text-gray-500">
                  &gt; {/* Unicode for greater-than symbol */}
                </BreadcrumbSeparator>
              )}

              {/* Link or Plain Text for Current Segment */}
              {isLast ? (
                <BreadcrumbPage className="text-gray-500">{segment}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink
                  href={href}
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
                >
                  {segment}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumb;
