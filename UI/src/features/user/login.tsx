import { useAppDispatch } from "../../app/hooks"
import { useAuth0 } from "@auth0/auth0-react";

const url = import.meta.env.VITE_REGISTER_URL
export function Login(props: any){
    const { loginWithRedirect } = useAuth0();
    return(
        <div>
            <h2>Welcome to Arrangely</h2>
            <button className="button" onClick={lEvt => loginWithRedirect()}>Login</button>
            <button className="button" onClick={suEvt => window.location.href = url}>Sign Up</button>
        </div>
    )
}