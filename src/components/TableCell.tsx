import React, { PropsWithChildren } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

export type TableCellProps = {
    /** 标题 */
    title?: string
    /** 消息描述 */
    message?: string
    /** 标题和消息的布局方式, 默认`column` */
    layout?: 'row' | 'column'
    /** Ionicons 图标名称 */
    iconName?: string
    /** 自定义图标 */
    icon?: React.ReactNode
    /** 是否显示箭头, 默认`true` */
    arrow?: boolean
    /** 角标 */
    badge?: number
    /** 是否需要显示顶部边框, 默认`false` */
    borderTop?: boolean
}

const TableCell: React.FC<PropsWithChildren & TableCellProps> = props => {
    const isRowLayout = props.layout === 'row'
    return (
        <View style={[styles.cell, props.borderTop ? styles.borderTop : null]}>
            {props.icon ? props.icon : props.iconName ? <Ionicons name={props.iconName} color={'#333'} size={22} style={{ marginRight: 10 }} /> : null}
            <View style={isRowLayout ? styles.rowLayout : styles.columnLayout}>
                <Text style={styles.title} numberOfLines={1}>
                    {props.title}
                </Text>
                {props.message && (
                    <Text style={[styles.message, isRowLayout ? styles.messageRow : null]} numberOfLines={2}>
                        {props.message}
                    </Text>
                )}
            </View>
            {props.badge && props.badge > 0 && (
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{props.badge > 99 ? '99+' : props.badge}</Text>
                </View>
            )}
            {props.arrow !== false && <Ionicons name="chevron-forward" color={'#999'} size={16} />}
        </View>
    )
}

const styles = StyleSheet.create({
    cell: {
        minHeight: 50,
        paddingVertical: 10,
        paddingHorizontal: 16,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#F2F3F5'
    },
    borderTop: {
        borderTopWidth: 1,
        borderTopColor: '#F2F3F5'
    },
    rowLayout: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    columnLayout: {
        flex: 1,
        flexDirection: 'column'
    },
    title: {
        fontSize: 16,
        color: '#333'
    },
    message: {
        fontSize: 14,
        color: '#999',
        marginTop: 6
    },
    messageRow: {
        marginTop: 0,
        marginLeft: 10,
        flex: 1,
        textAlign: 'right'
    },
    badge: {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginHorizontal: 10,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center'
    },
    badgeText: {
        fontSize: 12,
        color: 'white'
    }
})

export default TableCell
