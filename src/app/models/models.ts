import { string } from "yup";

export interface IUserInfo {
    id: string,
    username: string,
    email: string,
    balance: number
}

export interface IUserForList {
    id: string,
    username: string,
}

export interface IUserFormValues {
    email: string;
    password: string;
    username?: string;
}


export interface IAuthResult {
    id_token?: string;
    success: boolean;
    error?: string;
}

export interface ITransactionFormValues {
    username: string;
    amount: number;
}

export interface ITransaction {
    id: string;
    date: Date;
    username: string;
    amount: string;
    balance: string;
}

export interface ICreatedTransaction {
    trans_token: ITransaction;
}

export interface ITransactions {
    trans_token: ITransaction [];
}

export interface IFilter {
    username: string;
}
