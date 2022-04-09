import * as React from 'react';
import { Text, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

export const Home = props => {
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Vyber si!</Text>
        </SafeAreaView>
    );
}

export default Home;