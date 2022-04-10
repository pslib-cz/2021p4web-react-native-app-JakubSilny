import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button } from 'react-native';
import * as React from "react";
import Email from "./screens/Email";
import Sender from "./screens/Sender";
import { NavigationContainer, DefaultTheme, DarkTheme, } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useColorScheme } from 'react-native';
import Home from "./screens/Home";

export const SCREEN_mail = "Mail";
export const SCREEN_SMS = "SMS";

export const SCREEN_HOME = "Home"

const Tab = createBottomTabNavigator();

export default function App() {
  const scheme = useColorScheme();
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              switch (route.name) {
                case SCREEN_mail : iconName = "mail-open-outline"; break;
                case SCREEN_HOME : iconName = "home-sharp"; break;
                case SCREEN_SMS : iconName = "navigate-sharp"; break;
                default: iconName = "information-circle";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "gold",
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name={SCREEN_mail} component={Email} options={{ title: 'Mail', headerStyle: {backgroundColor: '#F06345' } }} />
          <Tab.Screen name={SCREEN_HOME} component={Home} options={{ title: 'Home', headerStyle: {backgroundColor: '#F06342' } }} />
          <Tab.Screen name={SCREEN_SMS} component={Sender} options={{ title: 'SMS', headerStyle: { backgroundColor: '#F06342' } }} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});