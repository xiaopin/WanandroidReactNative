import React, { PropsWithChildren, useEffect, useState } from 'react'
import { Text, View, Image, Dimensions, ScaledSize, TouchableOpacity, RefreshControl, FlatList } from 'react-native'
import { ParamListBase } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Carousel from 'react-native-snap-carousel'
import Api from '@/api'
import ArticleCell from '@/components/ArticleCell'
import AppTheme from '@/utils/theme'

const window = Dimensions.get('window')
const screen = Dimensions.get('screen')

/** 首页的轮播图 */
const CarouselRenderItem: React.FC<{
    item: ApiResp.HomeBannerModel
    index: number
    width: number
    height: number
    click?: (item: ApiResp.HomeBannerModel, index: number) => void
}> = props => {
    const { item, index, width, height } = props

    return (
        <TouchableOpacity activeOpacity={1.0} onPress={() => props.click?.call(undefined, item, index)} key={item.id}>
            <Image style={{ width, height }} source={{ uri: item.imagePath }} resizeMode="cover" />
        </TouchableOpacity>
    )
}

/** 首页页面 */
const HomeView: React.FC<PropsWithChildren & NativeStackScreenProps<ParamListBase>> = props => {
    const { navigation, route } = props
    /** 轮播数据 */
    const [banners, setBanners] = useState<ApiResp.HomeBannerModel[]>([])
    /** 文章列表数据 */
    const [articles, setArticles] = useState<ApiResp.ArticleModel[]>([])
    /** 当前页码 */
    const [pageIndex, setPageIndex] = useState(0)
    const [isLoading, setLoading] = useState(false)
    const [dimensions, setDimensions] = useState({ window, screen })
    /** 轮播图组件 */
    let carouselRef: Carousel<ApiResp.HomeBannerModel> | null

    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', ({ window, screen }: { window: ScaledSize; screen: ScaledSize }): void => {
            setDimensions({ window, screen })
        })
        return () => subscription.remove()
    })

    useEffect(() => requestData(pageIndex), [])

    /** 下拉刷新 */
    const onHandleHeaderRefresh = (): void => {
        const page = 0
        setPageIndex(page)
        requestData(page)
    }

    /** 上拉加载更多 */
    const onHandleFooterRefresh = (info: { distanceFromEnd: number }): void => {
        if (isLoading) return
        setPageIndex(value => {
            const ret = value + 1
            requestData(ret)
            return ret
        })
    }

    /** 请求数据 */
    const requestData = (pageIndex: number): void => {
        if (pageIndex == 0) {
            Api.banner()
                .then(res => {
                    setBanners(res.data || [])
                })
                .catch((e: Error) => {})
        }
        setLoading(true)
        new Promise<void>((resolve, reject) => {
            if (pageIndex != 0) return resolve()
            Api.homeTopArticles()
                .then(res => {
                    const items = res.data || []
                    setArticles(items)
                    resolve()
                })
                .catch(e => reject(e))
        })
            .then(() => Api.homeArticles(pageIndex))
            .then(res => {
                const items = res.data.datas || []
                setArticles(oldItems => oldItems.concat(items))
            })
            .catch((e: Error) => {})
            .finally(() => setLoading(false))
    }

    /** 轮播点击事件 */
    const onHandleCarouselClick = (item: ApiResp.HomeBannerModel, index: number): void => {
        navigation.push('H5', { uri: item.url, title: item.title })
    }

    return (
        <FlatList
            style={{ flex: 1 }}
            data={articles}
            renderItem={data => <ArticleCell item={data.item} />}
            keyExtractor={(item, index) => String(item.id)}
            ListHeaderComponent={
                banners.length > 0 ? (
                    <Carousel
                        ref={carousel => (carouselRef = carousel)}
                        data={banners}
                        renderItem={item =>
                            CarouselRenderItem({
                                ...item,
                                width: dimensions.screen.width,
                                height: (dimensions.screen.width * 9) / 16,
                                click: onHandleCarouselClick
                            })
                        }
                        sliderWidth={dimensions.screen.width}
                        itemWidth={dimensions.screen.width}
                    />
                ) : null
            }
            ListFooterComponent={
                pageIndex > 0 && isLoading ? (
                    <Text style={{ width: '100%', paddingVertical: 16, textAlign: 'center', color: '#999999', fontSize: 12 }}>正在拼命加载中...</Text>
                ) : null
            }
            refreshControl={
                <RefreshControl
                    enabled={true}
                    refreshing={pageIndex == 0 && isLoading}
                    onRefresh={onHandleHeaderRefresh}
                    colors={[AppTheme.colors.primary]}
                    tintColor={AppTheme.colors.primary}
                />
            }
            // refreshControl 和 onRefresh 指定一个即可
            // 如果需要自定义刷新控件的样式则使用 refreshControl, 使用默认样式则采用 onRefresh
            // onRefresh={onHandleHeaderRefresh}
            refreshing={isLoading}
            onEndReached={onHandleFooterRefresh}
            onEndReachedThreshold={0.2}
            keyboardDismissMode="on-drag"
        />
    )
}

export default HomeView
