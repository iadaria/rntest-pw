import { IUserInfo } from "../../app/models/models";

/**************** Constants **************/
export const SIGN_IN_USER = 'SIGN_IN_USER';
export const SIGN_OUT_USER = 'SIGN_OUT_USER';
export const SET_ID_TOKEN = 'SET_TOKEN';
export const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER';

/**************** Actions **************/
export function signInUser(user: IUserInfo) {
    return {
        type: SIGN_IN_USER,
        payload: user
    };
}

export function signOutUser() {
    return {
        type: SIGN_OUT_USER
    };
}

export function setToken(id_token: string) {
    return {
        type: SET_ID_TOKEN,
        payload: id_token
    };
}

export function updateCurrentUser(user: IUserInfo) {
    return {
        type: UPDATE_CURRENT_USER,
        payload: user
    };
}
/**************** Reducer **************/
export interface IAuthState {
    authenticated: boolean;
    currentUser: IUserInfo | null;
    id_token: string | null;
}

const initialState: IAuthState = {
    authenticated: false,
    currentUser: null,
    id_token: null,
};

export default function authReducer(
    state: IAuthState = initialState, 
    { type, payload } : any
): IAuthState {
    switch(type) {
        case SIGN_IN_USER:
            return {
                ...state,
                authenticated: true,
                currentUser: payload
            };
        case SIGN_OUT_USER:
            return {
                ...state,
                authenticated: false,
                currentUser: null
            };
        case SET_ID_TOKEN:
            return {
                ...state,
                id_token: payload
            };

        case UPDATE_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            };

        default: return state;
    }
}