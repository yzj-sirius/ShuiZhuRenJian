const app = getApp()
Page({
    data: {
        userInfo: {},
        myBody: true,
        home1:'../../images/home_image1.jpg',
        home2:'../../images/home_image2.jpg',
        home3:'../../images/home_image3.jpg',
        menu1:'../../images/menu1.jpg',
        menu2:'../../images/menu2.jpg',
        menu3:'../../images/menu3.jpg',
        menu4:'../../images/menu4.jpg',
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
