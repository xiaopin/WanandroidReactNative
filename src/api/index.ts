import AppConfig from '@/utils/config'
import Http, { HttpResponse } from './http'

export default class Api {
    /**
     * 用户登录
     * @param username 登录用户
     * @param password 登录密码
     */
    static login<T = ApiResp.AccountModel>(username: string, password: string): HttpResponse<T> {
        const parameters = { username, password }
        return Http.post<T>('/user/login', parameters)
    }

    /** 获取登录账号的个人信息 */
    static userInfo<T = ApiResp.UserInfoModel>(): HttpResponse<T> {
        return Http.get('/user/lg/userinfo/json')
    }

    /**
     * 获取收藏文章列表
     * @param pageIndex 页码
     * @param pageSize 分页大小
     */
    static collections<T = ApiResp.ResponseListModel<ApiResp.ArticleModel>>(
        pageIndex: number,
        pageSize: number = AppConfig.pageSize
    ): HttpResponse<T> {
        return Http.get<T>(`/lg/collect/list/${pageIndex}/json?page_size=${pageSize}`)
    }

    /** 获取首页轮播图数据 */
    static banner<T = ApiResp.HomeBannerModel[]>(): HttpResponse<T> {
        return Http.get<T>('/banner/json')
    }

    /** 获取首页文章列表 */
    static homeArticles<T = ApiResp.ResponseListModel<ApiResp.ArticleModel>>(
        pageIndex: number,
        pageSize: number = AppConfig.pageSize
    ): HttpResponse<T> {
        return Http.get<T>(`/article/list/${pageIndex}/json?page_size=${pageSize}`)
    }

    /** 获取首页置顶文章列表 */
    static homeTopArticles<T = ApiResp.ArticleModel[]>(): HttpResponse<T> {
        return Http.get<T>('/article/top/json')
    }

    /** 获取工具列表数据 */
    static tools<T = ApiResp.ToolModel[]>(): HttpResponse<T> {
        return Http.get<T>('/tools/list/json')
    }

    /** 获取项目分类 */
    static projectCategories<T = ApiResp.ProjectCategoryModel[]>(): HttpResponse<T> {
        return Http.get<T>('/project/tree/json')
    }

    /**
     * 获取项目列表
     *
     * @param cid 项目分类id
     * @param pageIndex 页码
     * @param pageSize 分页大小
     * @returns
     */
    static projects<T = ApiResp.ResponseListModel<ApiResp.ArticleModel>>(
        cid: number,
        pageIndex: number,
        pageSize: number = AppConfig.pageSize
    ): HttpResponse<T> {
        return Http.get<T>(`/project/list/${pageIndex}/json?cid=${cid}&page_size=${pageSize}`)
    }

    /** 获取导航数据 */
    static navigations<T = ApiResp.NavigationModel[]>(): HttpResponse<T> {
        return Http.get<T>('/navi/json')
    }

    /** 获取体系分类数据 */
    static seriesCategories<T = ApiResp.SeriesCategoryModel[]>(): HttpResponse<T> {
        return Http.get<T>('/tree/json')
    }

    /**
     * 获取体系下指定分类的文章列表
     *
     * @param cid 分类id
     * @param pageIndex 页码
     * @param pageSize 分页大小
     * @param author 根据作者搜索文章(不支持模糊搜索)
     * @returns
     */
    static seriesArticles<T = ApiResp.ResponseListModel<ApiResp.ArticleModel>>(
        cid: number,
        pageIndex: number,
        pageSize: number = AppConfig.pageSize,
        author: string | undefined = undefined
    ): HttpResponse<T> {
        let url = `/article/list/${pageIndex}/json?cid=${cid}&page_size=${pageSize}`
        if (author !== undefined) {
            url += `&author=${author}`
        }
        return Http.get<T>(url)
    }
}
