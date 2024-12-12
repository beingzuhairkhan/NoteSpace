'use client'
import {Button} from './ui/button'
import {useTransition } from 'react'
import { useRouter } from 'next/navigation';
import {createNewDocument} from '@/actions/actions'

function NewDocumentButton(){

    const [isPending, startTransition] = useTransition();
    const router = useRouter()

    function handleCreateNewDocument(){
        startTransition(async ()=>{

            const {docid} = await createNewDocument()
            router.push(`/doc/${docid}`)

        })
    }
    return  <center>
        <Button  onClick={handleCreateNewDocument}
          disabled={isPending} 
    >{isPending ? "Creating..." : "New Document"}</Button>
    </center>
}

export default NewDocumentButton