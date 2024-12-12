
import LiveBlockProviders from '@/components/LiveBlockProviders'

const pageLayout = ({children}:{children:React.ReactNode})=>{
    return(
 <LiveBlockProviders>{children}</LiveBlockProviders>
    )
}

export default pageLayout