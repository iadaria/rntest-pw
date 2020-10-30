import React from 'react'
import { FlatList } from 'react-native'
import { List } from 'react-native-paper';
import { ITransaction } from '../../app/models/models';
import { format } from 'date-fns';

interface IProps {
    transactions: ITransaction[];
}

export default function TransactionSampleList({ transactions }: IProps) {
    return (
        <FlatList
            data={transactions}
            keyExtractor={(transaction: ITransaction) => transaction.id}
            renderItem={({ item: transaction }) => (
                <List.Item
                    title={`to ${transaction.username}, amount: ${transaction.amount}`}
                    description={format(new Date(transaction.date), 'MMMM d, yyyy h:mm:ss')}
                    left={props => <List.Icon {...props} icon="credit-card-check-outline" color="green" />}
                />
            )}
        />
    );
}