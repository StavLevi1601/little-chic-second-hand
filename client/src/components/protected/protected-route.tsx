import { useEffect } from "react"
import { Navigate } from "react-router-dom";
import { isTokenValid } from "../../utils/auth";
import useAuthStore from "../../store/useAuthState";

type ProtectedRouteProps = {
    children: React.ReactNode;
  }
  
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {

    const {isAuthenticated,setIsAuthenticated, user,setUserFromToken} = useAuthStore();

    console.log("isAuthenticatedisAuthenticatedisAuthenticated",isAuthenticated);
    
    useEffect(()=> {
        const checkTokenValidity = async () => {
            const valid = await isTokenValid();
            console.log("the valid is",valid);
            
            setIsAuthenticated(valid);
            if (isAuthenticated) {
              await setUserFromToken()
            }
          };

        checkTokenValidity();

    },[setIsAuthenticated])

    console.log("isAuthenticated ProtectedRouteProps",isAuthenticated);
    console.log("user stav",user);
    
    return (
        
        isAuthenticated ? <>{children}</> : <Navigate to="/login"/>
    )
}