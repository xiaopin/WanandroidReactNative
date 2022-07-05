import React, { PropsWithChildren, useLayoutEffect } from 'react'
import { StatusBar, Text, View } from 'react-native'
import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native'

/** 首页页面 */
const HomeView: React.FC<PropsWithChildren & { navigation: NavigationProp<ParamListBase>; route: RouteProp<ParamListBase> }> = props => {
    const { navigation, route } = props

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: '首页' + Math.random().toString(),
            headerStyle: {
                backgroundColor: '#f4511e'
            }
        })
    }, [navigation, route])

    return (
        <>
            <StatusBar barStyle={'light-content'} />
            <Text>首页</Text>
        </>
    )
}

export default HomeView
