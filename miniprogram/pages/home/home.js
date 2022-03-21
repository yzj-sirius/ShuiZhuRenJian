const app = getApp()

Page({
    data: {
        userInfo: {},
        myBody: true,
    },
    onLoad() {
        wx.getUserProfile({
          desc: '获取用户信息',
          success: (res) => {
            console.log('获取用户信息')
            this.setData({
                userInfo: res.userInfo
            })
          }
        })
    },
    // 跳转到菜单界面
    gotoMenu() {
        wx.switchTab({
            url: "../menu/menu"
        });
    }
})
