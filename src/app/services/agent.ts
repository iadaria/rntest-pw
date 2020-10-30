import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import * as Toast from "../common/components/AppToast";
import { IAuthResult,  ICreatedTransaction, IFilter, ITransactionFormValues,  ITransactions,  IUserForList,  IUserFormValues, IUserInfo } from "../models/models";
import AsyncStorage from '@react-native-community/async-storage';

axios.defaults.baseURL = 'http://192.168.1.82:3001';
//axios.defaults.baseURL = 'https://rntest.iadaria.best';
axios.defaults.timeout = 5000;
axios.defaults.timeoutErrorMessage = "Network Error";

axios.interceptors.request.use(async (config) => {
    const id_token = await AsyncStorage.getItem('id_token');
    if (id_token) config.headers.Authorization = `Bearer ${id_token}`
    return config;
}, error => {
    return Promise.reject(error);
});

axios.interceptors.response.use(undefined, error => {
    if (error.message === 'Network Error' && !error.response) {
        Toast.ErrorToast('Network error - make sure API is running!');
    }

    const {status, data, config, headers} = error.response;

    if (status === 401 && 
        headers['www-authenticate'] === 'Bearer error="invalid_token", error_description="The token is expired"'
    ) {
        Toast.InfoToast('Your session has expired, please login again');
    }

    if (status === 400 && 
        config.method === 'get' && 
        data.errors.hasOwnProperty('id')) 
    {
        //history.push('/notfound');
    }

    if (status === 500) {
        Toast.InfoToast('Server error - check the terminal for more info!');
    }

    throw error.response;
})

const responseBody = async (response: AxiosResponse) => {
    //console.log("[agent responseBody]", JSON.stringify({response}, null, 4));
    //console.log("[agent responseBody.data]", JSON.stringify(response.data, null, 4));
    
    if (response.data?.data) {
        return response.data?.data;
    }

    return await response.data;
}

const appHeaders: AxiosRequestConfig = {
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Accept': "application/json"
    }
}

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body, appHeaders).then(responseBody)
};

const User = {
    register: (user: IUserFormValues): Promise<IAuthResult> => requests.post(`/users`, user),
    login: (user: IUserFormValues): Promise<IAuthResult> => requests.post(`/sessions/create`, user),
    current: (): Promise<IUserInfo> => requests.get(`/api/protected/user-info`),
    list: (filter: {filter: IFilter} | {}): Promise<IUserForList[]> => requests.post(`/api/protected/users/list`, filter)
};

const Transaction = {
    create: (transaction: ITransactionFormValues): Promise<ICreatedTransaction> => 
        requests.post(`/api/protected/transactions`, transaction),
    list: (): Promise<ITransactions> => requests.get(`/api/protected/transactions`),
}

export { User, Transaction };