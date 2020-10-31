import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IconButton, TextInput, Title } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { ITransaction } from '../app/models/models';
import { IRootState } from '../app/store/rootReducer';
import { ITransactionState } from '../features/transaction/transactionReducer';
import TransactionSampleList from '../features/transaction/TransactionSampleList';
import { THEME } from '../theme';

export default function TransactionsScreen() {
    const { transactions } 
        = useSelector<IRootState>(state => state.transaction) as ITransactionState;
    const [searchUsername, setSearchUsername] = React.useState<string>('');
    const [filterDecrease, setFilterDecrease] = React.useState<number>(-1);
    const [toggle, setToggle] = React.useState<boolean>(false);

    let searchedTransactions: ITransaction[] 
        = transactions
            .filter(transaction => 
                transaction.username.toLowerCase().includes(searchUsername.toLowerCase())
            )
            .sort(function(a: ITransaction, b: ITransaction) {   
                const result = filterDecrease === -1 
                    ?  new Date(a.date) - new Date(b.date)
                    :  new Date(a.date) + new Date(b.date)           
                return result;
            });

    const emptyTransactions = (
            <View style={styles.empty}>
                <Title>No transactions found</Title>
            </View>
        );

    return (
        <View style={styles.viewRoot}>
            <View style={styles.row}> 
                <TextInput
                    style={styles.element}
                    mode="outlined"
                    label="User name"
                    placeholder="Enter the recipient"
                    left={<TextInput.Icon name="account" color="grey" />}
                    autoCorrect={false}
                    onChangeText={setSearchUsername}
                    value={searchUsername}
                    autoCapitalize="none"
                />

                <IconButton 
                    onPress={() => {
                        setToggle(!toggle);
                        setFilterDecrease(toggle === false ? 1 : -1);
                    }}
                    icon={filterDecrease === -1 ? "arrow-up-bold" : "arrow-down-bold"}
                    color="green"
                    style={styles.filter}
                />
                
            </View>

            {!searchedTransactions.length &&  emptyTransactions }

            <TransactionSampleList transactions={searchedTransactions} />
        </View>
    );
}

const styles = StyleSheet.create({
    viewRoot: {
        paddingHorizontal: THEME.PADDING_PAGE,
    },
    empty: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15
    },
    row: {
        //borderWidth: 1, borderColor: 'red',
        flexDirection: 'row',
        alignItems: 'center'
    },
    element: {
        marginTop: THEME.MARGIN_TOP_ELEMENT,
        flex: 1,
    },
    filter: {
        borderWidth: 1, 
        borderColor: "green",
        borderRadius: 5
    }
});