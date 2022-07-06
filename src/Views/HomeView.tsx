import React, { PropsWithChildren, useLayoutEffect } from 'react'
import { Button, Text, View } from 'react-native'
import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native'

/** 首页页面 */
const HomeView: React.FC<
    PropsWithChildren & {
        navigation: NavigationProp<ParamListBase>
        route: RouteProp<ParamListBase>
    }
> = props => {
    const { navigation, route } = props

    return (
        <View>
            <Button title="Hello World" onPress={() => navigation.navigate('HelloWorld')} />
        </View>
    )
}

export default HomeView
