import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, TextInput, Title } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { IUserForList } from '../app/models/models';
import { IRootState } from '../app/store/rootReducer';
import { IUserState } from '../features/user/userReducer';
import UsersList from '../features/user/UsersList';
import { THEME } from '../theme';

export default function UsersScreen() {
    const { users } = useSelector<IRootState>(state => state.user) as IUserState;
    const [searchUsername, setSearchUsername] = React.useState<string>('');
    const [filterDecrease, setFilterDecrease] = React.useState<number>(-1);
    const [toggle, setToggle] = React.useState<boolean>(false);

    let searchedUsers: IUserForList[] 
        = users
            .filter((user: IUserForList) => 
                user.username.toLowerCase().includes(searchUsername.toLowerCase())
            )
            .sort(function(a: IUserForList, b: IUserForList) {   
                const result = a.username < b.username 
                        ? filterDecrease : (
                            a.username > b.username 
                                ? filterDecrease * -1
                                : 0
                        )
                return result;
            });

    const emptyUsers = (
            <View style={styles.empty}>
                <Title>No users found</Title>
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
                />

                <IconButton 
                    onPress={() => {
                        setToggle(!toggle);
                        setFilterDecrease(toggle === false ? -1 : 1);
                    }}
                    icon={filterDecrease === -1 ? "arrow-up-bold" : "arrow-down-bold"}
                    color="green"
                    style={styles.filter}
                />
                
            </View>

            {!searchedUsers.length &&  emptyUsers }

            <UsersList users={searchedUsers} />
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