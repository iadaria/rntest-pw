import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NewTransactionScreen from "../../screens/NewTransactionScreen";
import TransactionsScreen from "../../screens/TransactionsScreen";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import UsersScreen from "../../screens/UsersScreen";

export default function BottomNavigation() {
    const BottomTab = createBottomTabNavigator();

    return (
        <BottomTab.Navigator
            screenOptions={{
            
            }}
            tabBarOptions={{
                showLabel: false,
                activeTintColor: '#c85a54',
                inactiveTintColor: '#bcaaa4',
                style: {
                    backgroundColor: '#e0e0e0'
                }
            }}
        >
            <BottomTab.Screen
                name="NewTransaction"
                component={NewTransactionScreen}
                
                options={{
                    title: "Transaction",   
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="create-new-folder" size={27} color={color}/>
                    )
                }}
            />

            <BottomTab.Screen
                name="Transactions"
                component={TransactionsScreen}
                options={{
                    title: "History",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="handshake" size={27} color={color}/>
                    )
                }}
            />

            <BottomTab.Screen
                name="Recipents"
                component={UsersScreen}
                options={{
                    title: "Recipients",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account-multiple" size={27} color={color}/>
                    )
                }}
            />
        </BottomTab.Navigator>
    );
}
