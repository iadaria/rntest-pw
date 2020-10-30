
import { Dispatch } from "react";
import { connect } from "react-redux";
import { setToken, signInUser } from "../../../features/auth/authReducer";
import { fetchTransaction } from "../../../features/transaction/transactionReducer";
import { fetchUsers } from "../../../features/user/userReducer";
import { ITransaction, IUserForList, IUserInfo } from "../../models/models";
import { IRootState } from "../../store/rootReducer";
import { AppNavigation } from "../AppNavigation";


const mapStateToProps = (state: IRootState, ownProps: any) => ({
    authenticated: state.auth.authenticated,
    id_token: state.auth.id_token
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setToken: (id_token: string) => dispatch(setToken(id_token)),
    signInUser: (user: IUserInfo) => dispatch(signInUser(user)),
    fetchTransactions: (transactions: ITransaction[]) => dispatch(fetchTransaction(transactions)),
    fetchUsers: (users: IUserForList[]) => dispatch(fetchUsers(users))
});

const AppNavigationConnected = connect(mapStateToProps, mapDispatchToProps)(AppNavigation);

export { AppNavigationConnected as AppNavigation };