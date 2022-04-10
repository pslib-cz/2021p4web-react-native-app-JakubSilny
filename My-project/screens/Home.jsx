import * as React from 'react';
import { Text, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

export const Home = props => {
    return (
        <SafeAreaView style={{padding: 16, flex: 1,  alignItems: 'center'  }}>
            <Text>Tato aplikace je vytvořena pro zasílání hromadných emailů a SMS </Text>
        </SafeAreaView>
    );
}

export default Home;