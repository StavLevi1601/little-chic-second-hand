import { useEffect } from "react"
import { Navigate } from "react-router-dom";
import { isTokenValid } from "../../utils/auth";
import useAuthStore from "../../store/useAuthState";

type ProtectedRouteProps = {
    children: React.ReactNode;
  }
  
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {

    const {isAuthenticated,setIsAuthenticated} = useAuthStore();

    console.log("isAuthenticatedisAuthenticatedisAuthenticated",isAuthenticated);
    
    useEffect(()=> {
        const checkTokenValidity = async () => {
            const valid = await isTokenValid();
            console.log("the valid is",valid);
            
            setIsAuthenticated(valid);
          };

        checkTokenValidity();

    },[setIsAuthenticated])

    useEffect(()=> {
        const checkTokenValidity = async () => {
            const valid = await isTokenValid();
            console.log("the valid is 'ןאיםוא מםאיןמע",valid);
            
            setIsAuthenticated(valid);
          };

        checkTokenValidity();

    },[])

    console.log("isAuthenticated ProtectedRouteProps",isAuthenticated);
    
    return (
        
        isAuthenticated ? <>{children}</> : <Navigate to="/login"/>
    )
}