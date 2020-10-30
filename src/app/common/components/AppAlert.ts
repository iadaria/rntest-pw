import React from 'react'
import { Alert, StyleSheet } from 'react-native'

export default function AppAlert(title: string, text: string, func: () => void) {
    return (
        Alert.alert(
            `${title}`,
            `${text}`,
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Done",
                    onPress: async () => {
                        //changeScreen(null);
                        func();
                        //dispatch({ type: REMOVE_TODO, id });
                    },
                    style: "default"
                },
            ],
            { cancelable: true }//false }
        )
    )
}

const styles = StyleSheet.create({})
