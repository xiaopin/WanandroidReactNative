import React, { PropsWithChildren, useEffect, useLayoutEffect, useState } from 'react'
import { Button, Text, View, Image, Dimensions, ScaledSize, TouchableOpacity } from 'react-native'
import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native'
import Carousel from 'react-native-snap-carousel'
import Api from '@/api'

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
        <TouchableOpacity activeOpacity={1.0} onPress={() => props.click?.call(undefined, item, index)}>
            <Image style={{ width, height }} source={{ uri: item.imagePath }} key={item.id} resizeMode="cover" />
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
    const [banners, setBanners] = useState<ApiResp.HomeBannerModel[]>([])
    const [dimensions, setDimensions] = useState({ window, screen })
    let carouselRef: Carousel<ApiResp.HomeBannerModel> | null

    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', ({ window, screen }: { window: ScaledSize; screen: ScaledSize }): void => {
            setDimensions({ window, screen })
        })
        return () => subscription.remove()
    })

    useEffect(() => {
        Api.banner()
            .then(res => {
                setBanners(res.data || [])
            })
            .catch((e: Error) => {})
    }, [])

    /// 轮播点击事件
    const onHandleCarouselClick = (item: ApiResp.HomeBannerModel, index: number): void => {}

    return (
        <View>
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
            <Button title="Hello World" onPress={() => navigation.navigate('HelloWorld')} />
        </View>
    )
}

export default HomeView
