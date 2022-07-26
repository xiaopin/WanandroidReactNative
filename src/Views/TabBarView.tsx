import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AntDesign from 'react-native-vector-icons/AntDesign'
import React from 'react'
import HomeView from '@/Views/HomeView'
import ProfileView from '@/Views/ProfileView'
import AppTheme from '@/utils/theme'

const Tab = createBottomTabNavigator()

const TabBarView: React.FC<{}> = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: AppTheme.colors.primary
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold'
                }
            }}>
            <Tab.Screen
                name="Home"
                component={HomeView}
                options={{ title: '首页', tabBarLabel: '首页', tabBarIcon: ({ color, size }) => <AntDesign name="home" color={color} size={size} /> }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileView}
                options={{ headerShown: false, tabBarLabel: '我的', tabBarIcon: ({ color, size }) => <AntDesign name="user" color={color} size={size} /> }}
            />
        </Tab.Navigator>
    )
}

export default TabBarView
