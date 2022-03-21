const app = getApp()
const db = wx.cloud.database()
const bodyCollection = db.collection('bodyInfo')
Page({

    data: {
        bodyInfo: {},
        number: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        peoNum: 1,
        hasTaboos: false,
    },

    onLoad: function (options) {
        this.init()
    },

    //初始化数据库
    init: function () {
        bodyCollection.where({
            _openid: app.globalData.open
        }).get().then(res => {
            if (res.data.length == 0) {
                console.log('bodyInfo db is empty,creating...')
                bodyCollection.add({
                    data: {
                        peoNum: 1,
                        purine: '',
                        soup: '',
                        like: [],
                        hasTaboos: false,
                        hasBody: false,
                    }
                })
                console.log('bodyInfo db created')
            } else {
                this.setData({
                    bodyInfo: res.data[0]
                })
                console.log('bodyInfo db init success')
            }

        }).catch(err => {
            console.log('bodyInfo db init fail', err)
        })
    },
    //是否有忌口
    taboos: function (e) {
        let hasTaboos = e.detail.value
        if (hasTaboos == '是') {
            hasTaboos = true
        } else {
            hasTaboos = false
        }
        console.log(this.data.hasTaboos)
        this.setData({
            hasTaboos: hasTaboos
        })
    },
    // 保存form内数据
    submit: function (e) {
        console.log(e)

    },
    cancel: function (e) {
        this.setData({
            peoNum: 1
        })
    },
    bindPickerChange: function (e) {
        this.setData({
            peoNum: e.detail.value
        })
    },

})