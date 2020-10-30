import { ITransaction } from "../../app/models/models";

/********************* Constants ***********************/
export const CREATE_TRANSACTION = 'CREATE_TRANSACTION';
export const FETCH_TRANSACTIONS = 'FETCH_TRANSACTION';
export const CLEAR_TRANSACTIONS = 'CLEAR_TRANSACTIONS';
export const SET_FILTER = 'SET_FILTER';

/********************* Actions *************************/
export function createTransaction(transaction: ITransaction) {
    return {
        type: CREATE_TRANSACTION,
        payload: transaction
    };
}

export function fetchTransaction(transactions: ITransaction[]) {
    return {
        type: FETCH_TRANSACTIONS,
        payload: transactions
    };
}
/********************* Reducer *************************/
export interface ITransactionState {
    transactions: ITransaction [];
    filter: string;
}

const initialState: ITransactionState = {
    transactions: [],
    filter: 'all',
};

export default function transactionReducer(
    state: ITransactionState = initialState,
    { type, payload}: any
): ITransactionState {
    switch(type) {
        case CREATE_TRANSACTION:
            return {
                ...state,
                transactions: [payload, ...state.transactions]
            };
        case FETCH_TRANSACTIONS:
            return {
                ...state,
                transactions: payload
            };
        case CLEAR_TRANSACTIONS:
            return {
                ...state,
                transactions: []
            };
        default: return state;
    }
}