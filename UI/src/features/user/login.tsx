import { useAppDispatch } from "../../app/hooks"
import { login } from "./userSlice"

const url = import.meta.env.VITE_REGISTER_URL
export function Login(props: any){
    const dispatch = useAppDispatch();

    return(
        <div>
            <h2>Welcome to Arrangely</h2>
            <button className="button" onClick={lEvt => dispatch(login())}>Login</button>
            <button className="button" onClick={suEvt => window.location.href = url}>Sign Up</button>
        </div>
    )
}