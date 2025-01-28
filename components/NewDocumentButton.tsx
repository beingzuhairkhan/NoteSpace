'use client'
import {Button} from './ui/button'
import {useTransition } from 'react'
import { useRouter } from 'next/navigation';
import {createNewDocument} from '@/actions/actions'
//import { useUser } from "@clerk/nextjs";
function NewDocumentButton(){

    const [isPending, startTransition] = useTransition();
    const router = useRouter()
   // const { isSignedIn } = useUser();
    function handleCreateNewDocument(){
        // if (!isSignedIn) {
        //     router.push(
        //       "https://useful-tadpole-89.accounts.dev/sign-in?redirect_url=https://notespaces.netlify.app/"
           
        //     );
        //     return;
        //   }



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