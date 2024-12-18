'use client';
import Document from '@/components/Document'
import React from 'react';
interface DocumentPageProps {
  params: {
    id: string;
  };
}

const DocumentPage = ({ params }: DocumentPageProps) => {

  const id = React.use(params)?.id;
  if (!id) {
    return <div>Loading...</div>; 
  }
  return (
    <div className="flex flex-col flex-1 min-h-screen">
        <Document id={id}/>
    
      {/* <p className="mt-2 text-gray-700">Document ID: {id}</p> */}
    </div>
  );
};

export default DocumentPage;
