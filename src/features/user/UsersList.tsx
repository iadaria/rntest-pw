import React from 'react'
import { FlatList } from 'react-native'
import { List } from 'react-native-paper';
import { ITransaction, IUserForList } from '../../app/models/models';
import { format } from 'date-fns';

interface IProps {
    users: IUserForList[];
}

export default function UsersList({ users }: IProps) {
    return (
        <FlatList
            data={users}
            keyExtractor={(user: IUserForList) => user.id}
            renderItem={({ item: user }) => (
                <List.Item
                    title={`${user.username}`}
                    left={props => <List.Icon {...props} icon="account" color="#512da8" />}
                />
            )}
        />
    );
}