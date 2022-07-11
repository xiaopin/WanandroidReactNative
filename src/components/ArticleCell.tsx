import AppTheme from '@/utils/theme'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const ArticleCell: React.FC<{
    item: ApiResp.ArticleModel
    click?: (item: ApiResp.ArticleModel) => void
}> = props => {
    const { item } = props

    return (
        <TouchableOpacity activeOpacity={1.0} onPress={() => props.click?.call(undefined, item)}>
            <View style={styles.cell}>
                <View style={styles.topContent}>
                    <Text style={[styles.greyText, styles.author]} numberOfLines={1}>
                        {item.author ? '作者: ' : '分享者: '}
                        {item.author || item.shareUser}
                    </Text>
                    <Text style={[styles.greyText, styles.time]}>{item.niceDate}</Text>
                </View>
                <Text style={styles.title} numberOfLines={2}>
                    {item.title}
                </Text>
                <View style={styles.bottomContent}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        {item.type == 1 && <Text style={[styles.tag, styles.hotTag]}>置顶</Text>}
                        {Array.isArray(item.tags) &&
                            item.tags.map(tag => (
                                <Text style={styles.tag} key={tag.name}>
                                    {tag.name}
                                </Text>
                            ))}
                        <Text style={styles.chapter}>
                            {item.superChapterName}/{item.chapterName}
                        </Text>
                    </View>
                    <TouchableOpacity activeOpacity={1} style={styles.collection} onPress={() => {}}>
                        <Ionicons name="heart" size={24} color={item.collect ? AppTheme.colors.primary : '#CCCBCB'} />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cell: {
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: 'white',
        borderBottomWidth: 0.5,
        borderBottomColor: '#CCCBCB'
    },
    topContent: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    greyText: {
        fontSize: 14,
        color: '#999999'
    },
    author: {
        flex: 1,
        marginRight: 16
    },
    time: {
        flexShrink: 0
    },
    title: {
        marginVertical: 10,
        fontSize: 16,
        fontWeight: '700',
        color: '#333333'
    },
    bottomContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    collection: {
        width: 30,
        height: 30,
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    chapter: {
        marginRight: 10,
        fontSize: 14,
        color: '#cccbcb'
    },
    tag: {
        height: 20,
        paddingHorizontal: 6,
        borderRadius: 10,
        fontSize: 14,
        color: '#cccbcb',
        marginRight: 10,
        borderColor: '#cccbcb',
        borderWidth: 1,
        overflow: 'hidden'
    },
    hotTag: {
        borderColor: 'red',
        backgroundColor: 'red',
        color: 'white'
    }
})

export default ArticleCell
