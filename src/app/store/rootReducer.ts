import { combineReducers } from "redux";
import asyncReducer, { IAsyncState } from "../../features/async/asyncReducer";
import authReducer, { IAuthState } from "../../features/auth/authReducer";
import transactionReducer, { ITransactionState } from "../../features/transaction/transactionReducer";
import userReducer, { IUserState } from "../../features/user/userReducer";

export interface IRootState {
    auth: IAuthState;
    async: IAsyncState;
    user: IUserState,
    transaction: ITransactionState;
}

const rootReducer = combineReducers<IRootState>({
    auth: authReducer,
    async: asyncReducer,
    user: userReducer,
    transaction: transactionReducer,
});

export default (state: IRootState, action: any) =>
    rootReducer(action.type === 'SIGN_OUT_USER' ? undefined : state, action);

//export default rootReducer;
