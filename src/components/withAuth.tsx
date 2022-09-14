import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from 'utils/hooks/useIsAuthPages'

const PrivateRoutes = () => {
    let auth = useAuth()
    
    return(
        auth ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes