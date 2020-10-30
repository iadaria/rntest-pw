
import React from 'react'
import { Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'

export default function AppModal() {
    return (
        {/* <TouchableWithoutFeedback onPress={() => this.setState({ visible: false })}>
            <Modal isVisible={this.state.visible} >
            <TouchableWithoutFeedback onPress={() => {}}>
                    ... your custom view
            </TouchableWithoutFeedback
            </Modal>
        </TouchableWithoutFeedback> */}
    )
}

const styles = StyleSheet.create({})


{/* <View
    style={styles.viewUsersList}
>
    <FlatList
        scrollEnabled={true}
        style={styles.listUsers}
        data={users}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (

            <TouchableHighlight
                key={item.id}
                onPress={() => console.info("was pressed", item)}
                underlayColor={THEME.UNDERLINE_COLOR}
            >
                <View style={{ backgroundColor: 'white' }}>
                    <Text style={styles.itemUser}>
                        {item.username}
                    </Text>
                </View>

            </TouchableHighlight>
        )}
    />
</View> */}