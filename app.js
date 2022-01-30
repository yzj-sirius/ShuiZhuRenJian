require('./utils/service');

const {authRequest} = require('./utils/api');
const imageRoot = 'http://deac.medclass.cn';
const user = {
    username: 'louisGan',
    name: '小王',
    sex: '女',
    email: '123456789@qq.com',
    phone: '13893221214',
    province: '北京',
    city: '北京'
};

App({
    onLaunch() {
        const that = this;
        authRequest()
            .then((data) => {
                console.log(data);
            }).catch((err) => {
                console.log(err);
            })

        wx.pro.setStorage('user', user).then((user) => {
            console.log('success:');
        }).catch((err) => {
            console.log(err);
        });
        wx.pro.getSystemInfo().then((res) => {
            that.globalData.systemInfo = res;
        }).catch((err) => {
            console.log(err);
        });
    },
    globalData: {
        userInfo: null,
        imageRoot,
        systemInfo: null
    }
});