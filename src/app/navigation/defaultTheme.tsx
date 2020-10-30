import React from 'react';
import { DefaultTheme, } from '@react-navigation/native';
import { THEME } from '../../theme';
import { AppHeader, AppHeaderRight } from '../../features/header/AppHeader';
import { Header, StackHeaderProps, StackNavigationOptions } from '@react-navigation/stack';


export const defaultScreenOptions: StackNavigationOptions = {
    title: "Parrot Wings",
    headerStyle: {
        backgroundColor: THEME.BACKGROUND_TITLE, 
    },
    headerTitleAlign: "center",
    headerTintColor: THEME.LIGHT_PRIMARY,
    headerLeft: () => null
};

export const defaultTabScreenOptions: StackNavigationOptions = {
    headerTitle: () => <AppHeader />,
    header: (props: StackHeaderProps): React.ReactNode => {
        const { scene, navigation } = props;
        const newScene = {...scene};
        /* newScene.descriptor.options.headerTitle = 
            () => <AppHeader />; */
        newScene.descriptor.options.headerRight = 
            () => <AppHeaderRight navigation={navigation} />;

        return <Header {...props} scene={newScene} />;
    },
    headerLeft: () => null
}

export const defaultTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        card: '#512da8',
        primary: '#eee',       
    }
};