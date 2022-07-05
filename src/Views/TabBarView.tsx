import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import HomeView from '@/Views/HomeView'
import ProfileView from '@/Views/ProfileView'

const Tab = createBottomTabNavigator()

const TabBarView: React.FC<{}> = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={HomeView} />
            <Tab.Screen name="Profile" component={ProfileView} />
        </Tab.Navigator>
    )
}

export default TabBarView
