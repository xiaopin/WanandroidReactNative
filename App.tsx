/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { type PropsWithChildren } from 'react'
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native'
import { Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions } from 'react-native/Libraries/NewAppScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AppTheme from '@/utils/theme'
import TabBarView from '@/Views/TabBarView'
import HelloWorld from '@/Views/HelloWorld'
import WebView from '@/Views/WebView'

const Stack = createNativeStackNavigator()

const App: React.FC<{}> = () => {
    const isDarkMode = useColorScheme() === 'dark'

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
    }

    return (
        <NavigationContainer theme={AppTheme}>
            <StatusBar barStyle={!isDarkMode ? 'light-content' : 'dark-content'} />
            <Stack.Navigator
                initialRouteName="Tab"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: AppTheme.colors.primary
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold'
                    },
                    headerBackTitle: ''
                }}>
                <Stack.Screen name="Tab" component={TabBarView} options={{ headerShown: false }} />
                <Stack.Screen name="HelloWorld" component={HelloWorld} />
                <Stack.Screen name="H5" component={WebView} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App
