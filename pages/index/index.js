//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
   
    latitude :0,
    longitude:0
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindcontroltap : function(e){
    console.log(e);
    switch(e.controlId){
      case 1 : 
        this.movetoCenter();
        break;
      case 2 : 
        if(this.timer){
          //如果定时器存在的话，就进行跳转
          wx.navigateBack({
            delta : 1 // delta 属性
          })
        }else{
          //如果定时器不存在的话，点击立即用车可弹出扫码界面
          wx.scanCode({

            success: () => {
              wx.showLoading({
                title: '正在获取密码',
              })
              console.log(111);
              wx.request({
                url: 'https://www.easy-mock.com/mock/5b51b06692ac475521cc7f54/example/password',
                success: (res) => {
                  console.log(res);
                  wx.hideLoading(); // 获取密码成功后取消密码加载页面
                  //重定向
                  wx.redirectTo({
                    url: '../scanResult/index?password=' + res.data.data.password + '&number=' + res.data.data.number,
                    success: () => {
                      wx.showToast({
                        title: '获取密码成功',
                        duration: 1000
                      })
                    }
                  })
                }
              })
            },
            fail: () => {
              console.log(222)
            }
          })
        }
        break;
      case 3 :
        wx.navigateTo({
          url: '../warn/index',
        })
        break;
      case 4:
        wx.navigateTo({
          url: '../my/index',
        })
        

    }
  },
  onLoad: function (options) {
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
    this.timer = options.timer  ;

    var self = this;
    wx.getLocation({
      type : 'wgs84', // 默认为 wgs84返回gps坐标,gcj02 返回k而用于wx.openLocation的坐标。
      success: (res) =>{
        // console.log(res);
        // console.log(this);
        this.setData({
          longitude : res.longitude,
          latitude : res.latitude
        });
      },
    }),
    wx.getSystemInfo({
      success: (res) => {
        console.log(res);
        this.setData({
          controls : [{
            id : 1,
            iconPath : '/images/location.png',
            position : {
              width : 50,
              height : 50,
              top : res.windowHeight -80
            },
            clickable : true
          },{
            id : 2,
            iconPath : '/images/use.png',
            position : {
              width : 90,
              height : 90,
              left : res.windowWidth/2 - 45,
              top : res.windowHeight - 100
            },
            clickable : true
          },
          {
            id : 3,
            iconPath : '/images/warn.png',
            position : {
              width:50,
              height : 50,
              left : res.windowWidth - 70,
              top : res.windowHeight - 100
            },
            clickable : true
          },
          {
            id : 4,
            iconPath : '/images/avatar.png',
            position : {
              width : 50,
              height : 50,
              left : res.windowWidth - 70,
              top : res.windowHeight - 155
            },
            clickable : true
          },
          {
            id : 5,
            iconPath : '/images/marker.png',
            position : {
              width : 30,
              height : 50,
              top : res.windowHeight / 2 - 50,
              left : res.windowWidth /2- 15
            }
          }]
        })
      },
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //生命周期函数--监听页面初次渲染完成
  onReady: function(){
    console.log('onready');
  },
  //生命周期函数--监听页面显示
  onShow : function(){
    //创建map的上下文
    this.mapctx = wx.createMapContext('ofo-map');
    this.movetoCenter();
  },
  //生命周期函数--监听也页面隐藏
  onHide : function (){
    console.log('onhide')
  },
  //生命周期函数--监听页面卸载
  onUnload : function (){
    console.log('onunload')
  },
  movetoCenter : function (){
    this.mapctx.moveToLocation()
  }
})
