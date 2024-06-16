import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { UserManager, User } from "oidc-client";

const loginUrl = import.meta.env.VITE_LOGIN_URL;
const siteUrl = import.meta.env.VITE_SITE_URL;

export interface ICurrentUser {
    access_token: string,
    expires: number,
    storage: string
}
export interface IUserState {
    isLoggedIn: boolean,
    isCallBack: boolean,
    readState: "reading" | "idle",
    currentUser: ICurrentUser
}

const createInitialState = (): IUserState =>{
    
    if(window.location.pathname.indexOf("callback") > -1){
        return {
            isLoggedIn: false,
            isCallBack: true,
            readState: "idle",
            currentUser: { access_token: "", expires:0, storage: ""}
        }
    }

    return {
        isLoggedIn: false,
        isCallBack: false,
        readState: "idle",
        currentUser: { access_token: "", expires:0, storage: ""}
    }
  
}
const initialState = createInitialState();

export const readUserAsync = createAsyncThunk("user/read",
async ():Promise<ICurrentUser> => {
        
        let mgr = new UserManager({response_mode: "query"});
        let user = await mgr.signinRedirectCallback();
        return {
            access_token: user.access_token,
            expires: user.expires_at,
            storage: user.toStorageString()
        };
    },
    {
        condition:(arg, api) => {
            const userState = api.getState() as { user: IUserState}
            if( userState.user.readState === "reading"){
                return false;
            }
            return true;
        }
    }
)


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        login: (state) => {
            var config = {
                authority: loginUrl,
                client_id: "arrangely",
                redirect_uri: siteUrl+"/callback",
                response_type: "code",
                scope: "openid profile arrangely",
                post_logout_redirect_uri: loginUrl+"/logout",
            };
            let mgr = new UserManager(config);
            mgr.signinRedirect();
        }
    },
    extraReducers(builder) {
        builder.addCase(readUserAsync.pending, (state) => {
            state.readState = "reading";
        })
        .addCase(readUserAsync.fulfilled,(state, action) => {
            state.readState = "idle";
            state.isCallBack = false;
            state.isLoggedIn = true;
            state.currentUser = action.payload;
            let win: Window = window;
            win.history.replaceState({},'/callback','/');
        })
        .addCase(readUserAsync.rejected, (state) => {
            state.readState = "idle";
        });
    },

})

export const { login }  = userSlice.actions;
export const getUserState = (state:RootState) => state.user;
export default userSlice.reducer;