import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { RootSiblingParent } from 'react-native-root-siblings';
import { configureStore } from './src/app/store/configureStore';
import { LogBox } from 'react-native';
import { AppNavigation } from './src/app/navigation/containers/AppNavigation';

const store = configureStore();

LogBox.ignoreLogs(["Require cycle:"]);

const App: () => React$Node = () => {

    return (
        <RootSiblingParent>
            <StoreProvider store={store}>
                <PaperProvider>
                    <AppNavigation />
                </PaperProvider>
            </StoreProvider>
        </RootSiblingParent>
    );
}

export default App;