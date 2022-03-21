const app = getApp()
const db = wx.cloud.database() //设置数据库
const userCollection = db.collection('test_user') //选择数据库集合（'集合名'）
Page({
    data: {
        userInfo: {},
        genderDialogStatus: false,
        // 性别属性
        genders: [{
                value: '男',
                name: '男',
                checked: false
            },
            {
                value: '女',
                name: '女',
                checked: false
            },
        ],
        //  地址选择器属性
        region: ['', '', ''],
        customItem: '无',
    },
    onLoad(option) {
        let user = wx.getStorageSync('userInfo')
        this.setData({
            userInfo: user,
            province: user.province,
            city: user.city,
            area: user.area,
            sex: user.sex,
            email: user.emsil,
            phoneNymber: user.phoneNumber,
        })
        this.changeGenders(user.sex)
    },
    onHide(){
        this.cache('userInfo',this.data.userInfo)
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
    changeGenders(sex) {
        const that = this;
        const genders = that.data.genders.map((item) => {
            if (item.value === sex) {
                return {
                    name: item.name,
                    value: item.value,
                    checked: true,
                }
            } else {
                return {
                    name: item.name,
                    value: item.value,
                    checked: false,
                }
            }
        });
        that.setData({
            genders
        })
    },
    genderRadioChange: function (e) {
        var sex = e.detail.value;
        this.setData({
            ['userInfo.sex']: sex,
            genderDialogStatus: false,
        })
        if (sex != this.data.sex) {
            userCollection.where({
                _openid: app.globalData.openid
            }).update({
                data: {
                    sex: sex,
                }
            }).then(res => {
                console.log('select sex success',res)
                this.cache('userInfo',this.data.userInfo)
            }).catch(err => {
                console.log('fail', err)
            })
        }
        this.changeGenders(sex)
    },
    showGenderDialog() {
        this.setData({
            genderDialogStatus: true
        });
    },

    bindRegionChange: function (e) {
        var area = e.detail.value[2]
        this.setData({
            ['userInfo.province']: e.detail.value[0],
            ['userInfo.city']: e.detail.value[1],
            ['userInfo.area']: e.detail.value[2],
        })
        if (area != this.data.area) {
            userCollection.where({
                _openid: app.globalData.openid
            }).update({
                data: {
                    province: e.detail.value[0],
                    city: e.detail.value[1],
                    area: e.detail.value[2],
                }
            }).then(res => {
                console.log('address update success',res)
                this.cache('userInfo',this.data.userInfo)
            }).catch(err => {
                console.log('address update fail',err)
            })
        }

    },
})