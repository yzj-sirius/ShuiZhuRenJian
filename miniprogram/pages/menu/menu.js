import menus from './resources/json/menus.js'
Page({
    data: {
        'menus': menus,
        selectedMenuId: 1,
        myhealthNum: 3,
        total: {
            count: 0,
            money: 0
        }
    },
    selectMenu: function (e) {
        let data = e.currentTarget.dataset
        console.log('select', e)
        this.setData({
            //   左菜单栏tag
            toView: data.tag,
            //   左菜单栏id
            selectedMenuId: data.id
        })
    },
    addCount: function (e) {
        let data = e.currentTarget.dataset
        let total = this.data.total
        let menus = this.data.menus
        let menu = menus.find(function (v) {
            return v.id == data.cid
        })
        let dish = menu.dishs.find(function (v) {
            return v.id == data.id
        })
        dish.count += 1;
        total.count += 1
        total.money += dish.price
        this.setData({
            'menus': menus,
            'total': total
        })
        console.log('菜品', this.data.menus)
    },
    minusCount: function (e) {
        let data = e.currentTarget.dataset
        let total = this.data.total
        let menus = this.data.menus
        let menu = menus.find(function (v) {
            return v.id == data.cid
        })
        let dish = menu.dishs.find(function (v) {
            return v.id == data.id
        })
        if (dish.count <= 0)
            return
        dish.count -= 1
        total.count -= 1
        total.money -= dish.price
        this.setData({
            'menus': menus,
            'total': total
        })
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
    },
    onReady: function () {
        // 页面渲染完成
    },
    onShow: function () {
        // 页面显示
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    },
    onScroll: function (e) {
        console.log(e)
    }
})