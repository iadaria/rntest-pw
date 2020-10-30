import { applyMiddleware, createStore, compose } from "redux";
import devTools from 'remote-redux-devtools';
import thunk from "redux-thunk";
//import { verifyAuth } from "../../features/auth/authActions";
import rootReducer from "./rootReducer";
import { Platform } from "react-native";

export function configureStore() {
    const enhancer = compose(
        applyMiddleware(thunk),
        devTools({
            name: Platform.OS,
            hostname: 'localhost',
            port: 8000
        })
    );

    const store = createStore(
        rootReducer,
        enhancer
    );

    //store.dispatch(verifyAuth());

    return store;
}