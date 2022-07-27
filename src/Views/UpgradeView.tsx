import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Button, TouchableOpacity } from 'react-native'
import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native'
import AppTheme from '@/utils/theme'

enum UpgradeCheckStatue {
    Loading = 0, // 正在检查中
    NewVersion = 1, // 发现新版本
    Latest = 2 // 当前已是最新版本
}

/** 更新弹窗 */
const UpgradeView: React.FC<{
    navigation: NavigationProp<ParamListBase>
    route: RouteProp<ParamListBase>
}> = props => {
    const [status, setStatus] = useState(UpgradeCheckStatue.Loading)

    useEffect(() => {
        const status = Math.ceil(Math.random() * 100) % 2 ? UpgradeCheckStatue.NewVersion : UpgradeCheckStatue.Latest
        setTimeout(() => setStatus(status), 1500)
    }, [])

    return (
        <View style={styles.modal}>
            {status == UpgradeCheckStatue.Loading && (
                <View>
                    <ActivityIndicator size={30} color={AppTheme.colors.primary} animating={true} hidesWhenStopped={true} />
                    <Text style={styles.loadingText}>正在检查更新，请稍等...</Text>
                </View>
            )}
            {status == UpgradeCheckStatue.NewVersion && (
                <View style={styles.container}>
                    <Text style={styles.title}>发现新版本</Text>
                    <ScrollView style={styles.upgradeMessages}>
                        <Text style={{ marginBottom: 5 }}>修复 vue3 项目 onError 生命周期不生效的Bug</Text>
                        <Text style={{ marginBottom: 5 }}>App、Web平台 修复 vue3 项目 uni.setTabBarItem 设置 pagePath 不生效的Bug</Text>
                        <Text style={{ marginBottom: 5 }}>App、Web平台 修复 3.4.14 版本引出的 vue2项目 image 组件 load 事件图像大小信息不准确的Bug</Text>
                        <Text style={{ marginBottom: 5 }}>App平台 优化 video 组件支持 show-mute-btn 配置</Text>
                        <Text style={{ marginBottom: 5 }}>App平台 优化 vue3 项目 rich-text 组件支持服务端渲染</Text>
                        <Text style={{ marginBottom: 5 }}>App平台 修复 vue3 项目 nvue 页面 onPageScroll，onReachBottom 不触发的Bug</Text>
                        <Text style={{ marginBottom: 5 }}>App平台 修复 vue3 项目 uni.getVideoInfo 成功回调不执行Bug</Text>
                        <Text style={{ marginBottom: 5 }}>App-Android平台 修复 nvue web-view 组件 user-agent 不正确导致加载H5页面显示异常的Bug</Text>
                        <Text style={{ marginBottom: 5 }}>App-Android平台 修复 nvue 组件同时设置 box-shadow、elevation 样式在部分特殊场景可能会出现渲染异常的Bug</Text>
                        <Text style={{ marginBottom: 5 }}>App-Android平台 修复 tabbar 启用高斯模糊后获取 windowBottom 错误的Bug</Text>
                        <Text style={{ marginBottom: 5 }}>iOS平台 修复 nvue ad-content-page 组件暂停后展示其它视频类广告，关闭广告可能引起组件后台自动播放的Bug</Text>
                        <Text style={{ marginBottom: 5 }}>Web平台 修复 vue3 项目 pc端 createSelectorQuery 获取 top 错误Bug</Text>
                        <Text style={{ marginBottom: 5 }}>小程序平台 修复 vue3 项目 v-for 嵌套使用 slot 时，渲染不正确的Bug</Text>
                        <Text style={{ marginBottom: 5 }}>微信小程序平台 修复 3.4.14 版本引出的 manifest.json 文件缺少 mp-weixin 节点编译报错的Bug</Text>
                        <Text style={{ marginBottom: 5 }}>百度小程序平台 修复 vue3项目 组件嵌套使用时响应式可能失效的Bug 详情</Text>
                    </ScrollView>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.button, styles.upgradeButton]} onPress={() => {}}>
                            <Text style={{ color: 'white' }}>立即更新</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => props.navigation.goBack()}>
                            <Text>下次再说</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            {status == UpgradeCheckStatue.Latest && (
                <View style={[styles.container, { height: 200 }]}>
                    <Text style={styles.title}>恭喜，当前已是最新版</Text>
                    <Text style={{ color: '#999' }}>棒棒哒！请继续保持哟！！！</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => props.navigation.goBack()}>
                            <Text>知道了</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingText: {
        marginTop: 10,
        color: AppTheme.colors.primary
    },
    container: {
        width: 300,
        height: 420,
        paddingVertical: 20,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        // iOS阴影效果
        shadowColor: '#cccbcb',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.85,
        shadowRadius: 1.5,
        // Android阴影效果
        elevation: 1.5
    },
    title: {
        fontSize: 18,
        fontWeight: '500',
        color: '#333'
    },
    buttonContainer: {
        flexDirection: 'row'
    },
    button: {
        height: 40,
        flex: 1,
        marginHorizontal: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#999',
        alignItems: 'center',
        justifyContent: 'center'
    },
    upgradeButton: {
        backgroundColor: AppTheme.colors.primary,
        borderWidth: 0
    },
    upgradeMessages: {
        flex: 1,
        width: '100%',
        marginVertical: 16
    }
})

export default UpgradeView
