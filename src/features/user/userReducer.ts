import { IUserForList } from "../../app/models/models";

/********************* Constants ***********************/
export const FETCH_USERS = 'FETCH_USERS';
export const CLEAR_USERS = 'CLEAR_USERS';
export const SET_FILTER = 'SET_FILTER';

/********************* Actions *************************/

export function fetchUsers(users: IUserForList[]) {
    return {
        type: FETCH_USERS,
        payload: users
    };
}

export function createTransaction() {
    return {
        type: CLEAR_USERS
    };
}
/********************* Reducer *************************/
export interface IUserState {
    users: IUserForList[];
    filter: string;
}

const initialState: IUserState  = {
    users: [],
    filter: 'all'
};

export default function userReducer(
    state: IUserState = initialState,
    { type, payload }: { type: string, payload: IUserForList[]}
): IUserState {
    switch(type) {
        case FETCH_USERS: 
            return {
                ...state,
                users: payload
            };
        case CLEAR_USERS:
            return {
                ...state,
                users: []
            };
        default: return state;
    }
}