// pages/warn/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkBoxValues : [],
    itemsValue : [{
      value : '私锁私用',
      checked : false,
      color:'#b9dd08'
    }, {
      value: '车牌缺损',
      checked: false,
      color: '#b9dd08'
      }, {
        value: '轮胎坏了',
        checked: false,
        color: '#b9dd08'
    }, {
      value: '车锁坏了',
      checked: false,
      color: '#b9dd08'
      }, {
        value: '违规乱停',
        checked: false,
        color: '#b9dd08'
    }, {
      value: '密码不对',
      checked: false,
      color: '#b9dd08'
      }, {
        value: '刹车坏了',
        checked: false,
        color: '#b9dd08'
    }, {
      value: '其他故障',
      checked: false,
      color: '#b9dd08'
    }],
    picUrls :[],
    btnColor : '#f2f2f2',
    picCon : '拍摄/相册',
    inputValue : {
      num : 0,
      desc : ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  changeCheckbox : function (e){
    var _value = e.detail.value;
    if(_value.length == 0){
      this.setData({
        btnColor : '#f2f2f2',
        checkBoxValues : []
      })
    }else {
      console.log(111);
   
      this.setData({
        checkBoxValues : _value,

        btnColor: '#b9dd08'
      })
      
      
    }
  },
  clickPhoto : function (){
    //调用相册接口
    wx.chooseImage({
      success: (res)=> {
        var _picUrl = this.data.picUrls;
        var _fileUrl = res.tempFilePaths;
        for(let  temp of _fileUrl){
          _picUrl.push(temp)
        }
        this.setData({
          picUrls : _picUrl,
          picCon : '+'
        })
        var flag = this.data.picUrls;
        // if(flag.length == 0){
        //   this.setData({
        //     picCon: '拍摄/相册'
        //   })
        // }else{
        //   this.setData({
        //     picCon : '+'
        //   })
        // }
      },
    })
  },
  delPic : function (e){
    let index = e.target.dataset.index;
    let _picUrl = this.data.picUrls;
    _picUrl.splice(index,1);
    this.setData({
      picUrls : _picUrl
    })
    if(_picUrl.length == 0){
      this.setData({
        picCon: '拍摄/相册'
      })
    }
  },
  changeNum : function (e){
    this.setData({
      inputValue : {
        num : e.detail.value,
        desc : this.data.inputValue.desc
      }
    })
  },
  changeDesc : function (e){
    this.setData({
      inputValue: {
        num: this.data.inputValue.num,
        desc: e.detail.value  
      }
    })
  },
  submit : function(){
    if (this.data.picUrls.length > 0 && this.data.checkBoxValues.length > 0){
      wx.request({
        url: 'https://www.easy-mock.com/mock/5b51b06692ac475521cc7f54/example/upload',
        success : (res)=>{
          //微信的信息提示框
          wx.showToast({
            title: '提交成功',
            icon :'success'
          })
        }
      })
    }else{
      wx.showModal({
        title: '请填写完整的反馈信息',
        content: '你愁啥，快去填，干你啊',
        confirmText: '认怂',
        cancelText: '劳资不填',
        success : (res)=>{
          if(res.confirm){
            // 如果用户点击的确定的话则不做任何处理
          }else{
            //如果用户拒绝的话，则页面返回到主页，
            wx.navigateBack({
              delta : 1
            })
          }
        }
      })
    }
  }
})