App({

  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'env-3g1wnc4e6f356a05',
        traceUser: true,
      });
    }
    const db = wx.cloud.database() //设置数据库
    const userCollection = db.collection('test_user') //选择数据库集合（'集合名'）
    const getOpenid = wx.cloud.callFunction({
      name: 'quickstartFunctions',
      data: {
        type: 'getOpenId'
      },
    })
    // 获取用户openid
    getOpenid.then(res => {
      this.globalData.openid = res.result.openid
      // 查找是否有这个用户记录
      userCollection.where({
        _openid: this.globalData.openid
      }).get().then(res => {
        if (res.data.length == 0) {
          console.log('db is empty',res)
        } else {
          console.log('lookup openid success')
          this.globalData.userInfo = res.data[0]
          // 缓存用户信息
          try {
            wx.setStorageSync('userInfo', this.globalData.userInfo)
            if ('userInfo') {
              console.log('cache user success')
            }
          } catch (err) {
            console.log('cache user fail', err)
          }
        }
      }).catch(err => {
        console.log('lookup openid fail', err)
      })
    }).catch(err => {
      console.log('lookup openid fail', err)
    })
  },

  globalData: {
    userInfo: null,
    bodyInfo: null,
    openid: null,
    hasUserInfo: false,
  }
});