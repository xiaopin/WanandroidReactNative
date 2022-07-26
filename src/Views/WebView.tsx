import { NavigationProp, ParamListBase, Route, RouteProp } from '@react-navigation/native'
import React, { PropsWithChildren, useLayoutEffect, useState } from 'react'
import { Button, TouchableOpacity, View } from 'react-native'
import { WebView as NativeWebView, WebViewNavigation } from 'react-native-webview'
import Ionicons from 'react-native-vector-icons/Ionicons'

export type WebViewRouteParams = {
    uri: string
    title?: string
}

const WebView: React.FC<
    PropsWithChildren & {
        navigation: NavigationProp<ParamListBase>
        route: Route<string, WebViewRouteParams>
    }
> = props => {
    const { navigation, route } = props
    const { uri, title } = props.route.params
    let webViewRef: NativeWebView | null = null
    let canGoBack = false

    useLayoutEffect(() => {
        // https://reactnavigation.org/docs/navigation-prop#setoptions
        navigation.setOptions({
            headerTitle: title || '',
            headerLeft: () => (
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => (canGoBack && webViewRef ? webViewRef.goBack() : navigation.goBack())}>
                        <Ionicons name="chevron-back" color="white" size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 12 }} onPress={() => navigation.goBack()}>
                        <Ionicons name="close" color="white" size={24} />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation, route])

    const onHandleNavigationStateChange = (event: WebViewNavigation): void => {
        canGoBack = event.canGoBack
        if (!event.loading) {
            navigation.setOptions({
                headerTitle: event.title || title || ''
            })
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <NativeWebView ref={v => (webViewRef = v)} style={{ flex: 1 }} source={{ uri: uri }} onNavigationStateChange={onHandleNavigationStateChange} />
        </View>
    )
}

export default WebView
