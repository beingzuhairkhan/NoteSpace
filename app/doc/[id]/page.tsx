

import Document from '@/components/Document';
import React from 'react';

interface DocumentPageProps {
  params: Promise<{ id: string }>;
}

export default async function DocumentPage({ params }: DocumentPageProps) {
  // const [id, setId] = React.useState<string | null>(null);

  // React.useEffect(() => {
  //   params.then(({ id }) => {
  //     setId(id);
  //   });
  // }, [params]);
  const id = (await params).id;
  console.log(id)
  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Document id={id} />
      {/* <p className="mt-2 text-gray-700">Document ID: {id}</p> */}
    </div>
  );
}

