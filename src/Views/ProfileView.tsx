import AppTheme from '@/utils/theme'
import React, { PropsWithChildren } from 'react'
import { ParamListBase } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import TableCell, { TableCellProps } from '@/components/TableCell'

type ConfigType = 'message' | 'collection' | 'setting' | 'upgrade'
type ConfigItem = TableCellProps & { type: ConfigType }

/** 我的页面 */
const ProfileView: React.FC<PropsWithChildren & NativeStackScreenProps<ParamListBase>> = props => {
    const { navigation, route } = props

    const configs: ConfigItem[] = [
        { title: '消息', iconName: 'ios-notifications', layout: 'row', borderTop: true, badge: 999, type: 'message' },
        { title: '收藏', iconName: 'ios-heart-half-outline', type: 'collection' },
        { title: '设置', iconName: 'ios-settings', type: 'setting' },
        { title: '版本更新', iconName: 'ios-arrow-up-circle-sharp', type: 'upgrade' }
    ]

    const onHandleCellClick = (item: ConfigItem, index: number): void => {
        if (item.type == 'upgrade') {
            navigation.navigate('Upgrade')
            return
        }
        console.log('==>', index, item.type)
    }

    const onHandleUserClick = (): void => {
        console.log('==> Login')
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <SafeAreaView style={{ height: 260, marginBottom: 20, backgroundColor: AppTheme.colors.primary }} edges={['top']}>
                <View style={{ flex: 1, paddingHorizontal: 16, alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    <TouchableOpacity onPress={onHandleUserClick}>
                        <FontAwesome5 name="user-circle" color={'white'} size={50} />
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: '700', marginTop: 16, maxWidth: '100%' }} numberOfLines={1}>
                            请登录
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            {configs.map((item, index) => (
                <TouchableOpacity onPress={() => onHandleCellClick(item, index)} key={item.iconName}>
                    <TableCell {...item} />
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

export default ProfileView
