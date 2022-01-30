const app = getApp()

Page({
    data: {
        imageRoot: app.globalData.imageRoot,
        winWidth: 0,
        winHeight: 0,
        mycourseList: 0,
    },
    onLoad: function(option) {
        const that = this;
        wx.pro.getSystemInfo().then((res) => {
            this.setData({
                winWidth: res.windowWidth,
                winHeight: res.windowHeight,
                mycourseList: res.mycourseList,
            });
        }).catch((err) => {
            console.log(err);
        });
    }
})
