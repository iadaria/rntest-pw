import React, { Dispatch, useState } from 'react';
import { connect } from 'react-redux';

import { ITransaction, ITransactionFormValues, IUserForList, IUserInfo } from '../app/models/models';
import {  TouchableWithoutFeedback, View } from 'react-native';
import { updateCurrentUser } from '../features/auth/authReducer';
import AppCard from '../features/transaction/AppCard';
import TransactionList from '../features/transaction/TransactionList';
import { createTransaction } from '../features/transaction/transactionReducer';
import { IRootState } from '../app/store/rootReducer';

interface IProps {
    currentUser: IUserInfo;
    transactions: ITransaction[];
    users: IUserForList[];
    addTransaction: (transaction: ITransaction) => void;
    updateCurrentUserInfo: (userInfo: IUserInfo) => void,
    navigation: any;
}

function NewTransactionScreen({
    currentUser, transactions, addTransaction, navigation, updateCurrentUserInfo, users }: IProps
) {
    const [initialTransaction, setInitialTransaction] = useState<ITransactionFormValues>({
        username: "", amount: NaN 
    });
    const [visibleUsersList, setVisibleUsersList] = useState(false);

    return (
        <TouchableWithoutFeedback onPress={() => setVisibleUsersList(false)}>
            <View>
                <AppCard 
                    initialTransaction={initialTransaction}
                    newTransaction={addTransaction}
                    updateCurrentUserInfo={updateCurrentUserInfo} 
                    currentUser={currentUser} 
                    users={users}
                    visibleUsersList={visibleUsersList}
                    setVisibleUsersList={setVisibleUsersList}
                    setInitialTransaction={setInitialTransaction}
                />

                <TransactionList 
                    setInitialTransaction={setInitialTransaction}
                    title="The recently transactions"
                    transactions={transactions} 
                />
            </View>
        </TouchableWithoutFeedback>
    );
}

const mapStateToProps = (state: IRootState, ownProps: any) => ({
    users: state.user.users,
    transactions: state.transaction.transactions,
    currentUser: state.auth.currentUser!
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    addTransaction: (transaction: ITransaction) => dispatch(createTransaction(transaction)),
    updateCurrentUserInfo: (userInfo: IUserInfo) => dispatch(updateCurrentUser(userInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTransactionScreen);
