import React from 'react';
import {
    NavigationContainer,
    /* DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
    ParamListBase, */
} from '@react-navigation/native';
import {  useDispatch } from 'react-redux';
/* import {
    DarkTheme as PaperDarkTheme,
    DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import merge from 'deepmerge'; */
import { defaultTheme } from './defaultTheme';
import AsyncStorage from '@react-native-community/async-storage';
import { ITransaction, IUserForList, IUserInfo } from '../models/models';
import { Transaction, User } from '../services/agent';
import MainMenu from './MainMenu';
import useAbortableEffect from '../hooks/useAbortableEffect';

//const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
//const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

interface IProps {
    authenticated: boolean;
    id_token: string | null;
    setToken: (id_token: string) => void;
    //navigation: StackNavigationProp<ParamListBase>,
    signInUser: (user: IUserInfo) => void,
    fetchTransactions: (transactions: ITransaction[]) => void,
    fetchUsers: (users: IUserForList[]) => void,
}

export function AppNavigation( 
    { authenticated, id_token, setToken, signInUser, fetchTransactions, fetchUsers} : IProps
) {
    const dispatch = useDispatch();

    // One - when create App
    useAbortableEffect<string | null>({
        query: () => getToken(),
        data: _id_token => dispatch(setToken(_id_token!)),
        deps: [dispatch]
    });

    // A few - When null, when not null, when id_token changed
    useAbortableEffect<IUserInfo | null>({
        query: () => getUserInfo(),
        data: _user => dispatch(signInUser(_user!)),
        deps: [dispatch, id_token],
        shouldExecute: !!id_token
    });

    useAbortableEffect<ITransaction[]>({
        query: () => loadTransactions(),
        data: _transactions => dispatch(fetchTransactions(_transactions)),
        deps: [dispatch, authenticated],
        shouldExecute: authenticated
    });

    useAbortableEffect<IUserForList[]>({
        query: () => loadUsers(),
        data: _users => dispatch(fetchUsers(_users)),
        deps: [dispatch, authenticated],
        shouldExecute: !!authenticated
    });

    const getToken = async (): Promise<string | null> => 
        await AsyncStorage.getItem('id_token');

    const getUserInfo = async(): Promise<IUserInfo | null> =>
        await User.current();

    const loadTransactions = async(): Promise<ITransaction[]> => {
        const result = await Transaction.list();
        return new Promise((resolve, _) => {resolve(result.trans_token)});
    }

    const loadUsers = async(): Promise<IUserForList[]> =>
        await User.list({});

    return (

        <NavigationContainer theme={defaultTheme}>
            <MainMenu key={Number(authenticated)} authenticated={authenticated} />
        </NavigationContainer>
    );
}