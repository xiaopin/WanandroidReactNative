import React, { PropsWithChildren, useEffect, useLayoutEffect, useState } from 'react'
import { Button, Text, View, Image, Dimensions, ScaledSize, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native'
import Carousel from 'react-native-snap-carousel'
import Api from '@/api'
import ArticleCell from '@/components/ArticleCell'

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
const HomeView: React.FC<
    PropsWithChildren & {
        navigation: NavigationProp<ParamListBase>
        route: RouteProp<ParamListBase>
    }
> = props => {
    const { navigation, route } = props
    /** 轮播数据 */
    const [banners, setBanners] = useState<ApiResp.HomeBannerModel[]>([])
    /** 文章列表数据 */
    const [articles, setArticles] = useState<ApiResp.ArticleModel[]>([])
    /** 当前页码 */
    const [pageIndex, setPageIndex] = useState(0)
    const [dimensions, setDimensions] = useState({ window, screen })
    /** 轮播图组件 */
    let carouselRef: Carousel<ApiResp.HomeBannerModel> | null

    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', ({ window, screen }: { window: ScaledSize; screen: ScaledSize }): void => {
            setDimensions({ window, screen })
        })
        return () => subscription.remove()
    })

    useEffect(() => requestData(), [])

    /** 请求数据 */
    const requestData = (): void => {
        Api.banner()
            .then(res => {
                setBanners(res.data || [])
            })
            .catch((e: Error) => {})
        Api.homeArticles(pageIndex)
            .then(res => {
                setArticles(res.data.datas || [])
            })
            .catch((e: Error) => {})
    }

    /** 轮播点击事件 */
    const onHandleCarouselClick = (item: ApiResp.HomeBannerModel, index: number): void => {}

    return (
        <ScrollView style={{ flex: 1 }}>
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
            {articles.map(item => (
                <ArticleCell item={item} key={item.id} />
            ))}
            <Button title="Hello World" onPress={() => navigation.navigate('HelloWorld')} />
        </ScrollView>
    )
}

export default HomeView
