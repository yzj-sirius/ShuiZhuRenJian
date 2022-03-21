const app = getApp()
const db = wx.cloud.database() //设置数据库
const userCollection = db.collection('test_user') //选择数据库集合（'集合名'）
Page({

    data: {
        userInfo: null,
        hasUserInfo: false
    },

    onLoad: function (options) {
        this.init()
        this.setData({
            userInfo: app.globalData.userInfo,
            hasUserInfo: app.globalData.hasUserInfo,
        })
    },
    // 初始化数据库
    init() {
        userCollection.get().then(res => {
            console.log('db init success')
        }).catch(err => {
            console.log('db init fail', err)
        })
    },
    // 缓存信息
    cache(key, data) {
        try {
            wx.setStorageSync(key, data)
            console.log('cache seccess')
        } catch (err) {
            console.log('caache fail', err)
        }
    },
    // 用户登录
    login() {
        const that = this;
        wx.getUserProfile({
            desc: '获取用户信息'
        }).then(res => {
            console.log('login success')
            const user = res.userInfo
            app.globalData.userInfo = user
            console.log('login', app.globalData.userInfo)
            app.globalData.hasUserInfo = true
            that.setData({
                userInfo: user,
                hasUserInfo: true
            })
            userCollection.add({
                data: {
                    avatarUrl: user.avatarUrl,
                    language: user.language,
                    nickName: user.nickName,
                    province: '北京市',
                    city: '北京市',
                    area: '东城区',
                    sex: ' ',
                    phoneNumber: ' ',
                    email: ' ',
                }
            }).then(res => {
                console.log('add success')
                wx.showToast({
                    title: '登录成功',
                })
                userCollection.where({
                    _openid: app.globalData.openid
                }).get().then(res => {
                    console.log('get cloud userInfo')
                    app.globalData.userInfo = res.data[0]
                    console.log('get cloud userInfo', app.globalData.userInfo)
                    that.cache('userInfo', res.data[0])
                }).catch(err => {
                    console.log('get cloud userInfo fail', err)
                })
            }).catch(err => {
                console.log('add fail', err)
            })
        })
    }
})