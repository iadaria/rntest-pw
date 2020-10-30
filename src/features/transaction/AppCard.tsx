import React from 'react';
import { FlatList, StyleSheet, Text, View, TouchableHighlight, TouchableWithoutFeedback  } from 'react-native';
import { Avatar, Button, Card, TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { THEME } from '../../theme';
import { ITransaction, ITransactionFormValues, IUserForList, IUserInfo } from '../../app/models/models';
import TextInputMask from 'react-native-text-input-mask';
import { Transaction } from '../../app/services/agent';
import { ErrorToast, InfoToast } from '../../app/common/components/AppToast';
import { RenderProps } from 'react-native-paper/lib/typescript/src/components/TextInput/types';

interface IError {
    error?: string;
}

const LeftContent = (props: any) =>
    <Avatar.Icon
        {...props}
        icon="credit-card"
        style={{ backgroundColor: THEME.ACCENT }}
    />;

interface IProps {
    currentUser: IUserInfo;
    users: IUserForList[];
    initialTransaction: ITransactionFormValues & IError;
    newTransaction: (transaction: ITransaction) => void;
    updateCurrentUserInfo: (userInfo: IUserInfo) => void;
    setInitialTransaction: (transaction: ITransactionFormValues) => void;
    visibleUsersList: boolean;
    setVisibleUsersList: (visible: boolean) => void;
}

export default function AppCard({
    newTransaction, updateCurrentUserInfo, currentUser, initialTransaction, users, visibleUsersList, setVisibleUsersList, setInitialTransaction
}: IProps) {

    const [searchUser, setSearchUser] = React.useState<string>('');

    const searchedUsers =
        searchUser &&
        searchUser.length > 1 &&
        users.filter(user => user.username.toLowerCase().includes(searchUser)) || [];

    return (
        <Card>
            <Card.Title
                title="Create a transaction"
                subtitle="Mastercard/Tinkoff"
                left={() => <LeftContent size={40} />}
            />

            <Formik
                initialValues={initialTransaction}
                //initialTouched={{ username: true, amount: true}}
                enableReinitialize={true}
                validateOnChange={true}
                validationSchema={Yup.object({
                    username: Yup.string().required(),
                    amount: Yup.number().min(1).required()
                })}

                onSubmit={async (values: ITransactionFormValues & IError, { setSubmitting, setErrors, resetForm }) => {
                    try {
                        const createdTransaction = await Transaction.create(values);
                        newTransaction(createdTransaction.trans_token);
                        InfoToast("Success the transaction");
                        setInitialTransaction({
                            username: "",
                            amount: NaN,
                        });
                        resetForm();
                        updateCurrentUserInfo({
                            ...currentUser,
                            balance: currentUser.balance - values.amount
                        });
                        console.info({ createdTransaction });
                    } catch (error) {
                        if (error.data && error.data.error) {
                            setErrors({ "error": error.data.error });
                            ErrorToast(error.data.error);
                        }
                        console.error('[Formik/submit/login/error]', JSON.stringify(error, null, 4));
                    } finally { setSubmitting(false); }
                }}
            >
                {({
                    handleChange, handleBlur, handleSubmit, isSubmitting, isValid, dirty, errors, values, setFieldValue, resetForm, initialTouched, initialValues
                }) => {
                    const isDisabledSubmit = (!isValid  || !dirty || isSubmitting) && (!initialValues.amount)

                    return (
                        <View>
                            <Card.Content>
                                <TextInput
                                    style={styles.element}
                                    mode="outlined"
                                    label="User name"
                                    placeholder="Enter the recipient"
                                    left={<TextInput.Icon name="account" color="grey" />}
                                    autoCorrect={false}
                                    onChangeText={(text: string) => {
                                        setFieldValue('username', text);
                                        if (text && text.length > 1) {
                                            setSearchUser(text);
                                            setVisibleUsersList(true);
                                        }
                                    }}
                                    onBlur={handleBlur('username')}
                                    value={values.username}
                                />

                                {visibleUsersList && searchedUsers && searchedUsers.length > 0 && (
                                   
                                        <View
                                            style={styles.viewUsersList}
                                        >
                                            <TouchableWithoutFeedback onPress={() => console.log("Touch")}>
                                            <FlatList
                                                scrollEnabled={true}
                                                style={styles.listUsers}
                                                data={searchedUsers}
                                                keyExtractor={item => item.id}
                                                renderItem={({ item }) => (

                                                    <TouchableHighlight
                                                        key={item.id}
                                                        onPress={() => {
                                                            setFieldValue('username', item.username);
                                                            setVisibleUsersList(false);
                                                            console.info("was pressed", item);
                                                        }}
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
                                            </TouchableWithoutFeedback>
                                    
                                        </View>
                                )}

                                <TextInput
                                    mode="outlined"
                                    style={styles.element}
                                    type="number"
                                    label="Amount"
                                    placeholder="Enter the amount"
                                    render={(props: RenderProps) => <TextInputMask
                                        {...props}
                                        mask={"[0000000] PW"}
                                    />}
                                    onChangeText={handleChange('amount')}
                                    //onChangeText={value => setFieldValue('amount', parseFloat(value))}
                                    onBlur={handleBlur('amount')}
                                    keyboardType="decimal-pad"
                                    value={values.amount}
                                />
                                {(errors.error /* || errors.amount */) &&
                                    <Text style={styles.error}>
                                        {errors.error} {/* {errors.amount} */}
                                    </Text>
                                }
                            </Card.Content>
                            <Card.Actions>
                                <Button
                                    onPress={() => {
                                        setInitialTransaction({
                                            username: "",
                                            amount: NaN,
                                        });
                                        resetForm();
                                    }}
                                    disabled={isDisabledSubmit}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    onPress={handleSubmit}
                                    disabled={isDisabledSubmit}
                                    loading={isSubmitting}
                                >
                                    Ok
                                </Button>
                            </Card.Actions>
                        </View>
                    );
                }}
            </Formik>
        </Card>
    )
}

const styles = StyleSheet.create({

    element: {
        marginTop: THEME.MARGIN_TOP_ELEMENT,
        //zIndex: 0
    },
    error: {
        paddingHorizontal: 5,
        textAlign: 'center',
        marginTop: 10,
        alignSelf: 'center',
        minWidth: '50%',
        color: THEME.ERROR_TEXT,
        borderColor: THEME.ERROR_TEXT,
        borderWidth: 1,
        borderRadius: 5
    },
    viewUsersList: {
        height: 90,
        position: 'absolute',
        bottom: -20,
        width: '100%',
    },
    listUsers: {
        width: '100%',
        left: THEME.PADDING_PAGE - 10,
        zIndex: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,

    },
    itemUser: {
        fontSize: 18,
        paddingLeft: 10,
        paddingVertical: 3
    },
});
