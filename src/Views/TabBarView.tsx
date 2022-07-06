import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
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
            <Tab.Screen name="Home" component={HomeView} options={{ title: '首页' }} />
            <Tab.Screen name="Profile" component={ProfileView} options={{ title: '我的' }} />
        </Tab.Navigator>
    )
}

export default TabBarView
