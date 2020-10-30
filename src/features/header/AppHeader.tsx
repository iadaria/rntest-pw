import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from './AppHederIcon';
import { THEME} from '../../theme';
import { IUserInfo } from '../../app/models/models';
import { useDispatch, useSelector } from 'react-redux';
import { IAuthState, signOutUser } from '../auth/authReducer';
import AsyncStorage from '@react-native-community/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import { IRootState } from '../../app/store/rootReducer';

interface IProps {
    currentUser?: IUserInfo;
}

export function AppHeader() {
    const { currentUser } = useSelector<IRootState>(state => state.auth) as IAuthState;

    return (
        <View style={styles.line}>
            <Text style={styles.header}>
                Welcome: {currentUser?.username},
            </Text>

            <Text style={styles.header}>
                balance: {currentUser?.balance}
            </Text>
        </View>
    );
}

export function AppHeaderRight({ navigation } : { navigation: StackNavigationProp<ParamListBase> }) {
    const dispatch = useDispatch();
    return (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            {/* <Text style={styles.label}>Logout</Text> */}
            <Item
                title="title"
                iconName="logout"
                onPress={async () => {
                    dispatch(signOutUser());
                    await AsyncStorage.removeItem('id_token');
                    navigation.navigate("Authenticate");
                }}
            />
        </HeaderButtons>
    );
}


const styles = StyleSheet.create({
    label: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: THEME.DEFAULT_FONT_SIZE
    },
    line: {
        flexDirection: 'row'
    },
    header: {
        color: THEME.LIGHT_PRIMARY, 
        fontSize: THEME.DEFAULT_FONT_SIZE,
        marginLeft: 15
    }
});
