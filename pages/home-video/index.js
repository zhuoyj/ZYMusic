// pages/home-video/index.js
import {
  getTopMV
} from '../../service/api_video'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topMVs: [],
    hasMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   * async await ，await要放在异步函数中
   */
  onLoad: async function (options) {
    this.getTopMVData(0)

    // const _this = this
    // const res = await getTopMV(0)
    // this.setData({
    //   topMVs: res.data
    // })
    // getTopMV(0).then(res => {
    //   this.setData({topMVs:res.data})
    //   console.log(this.data.topMVs);
    // })
  },
// 封装网络请求方法
getTopMVData: async function(offset){
  if (!this.data.hasMore && offset!== 0) return

  //展示加载动画
  wx.showNavigationBarLoading()
  const res = await getTopMV(offset)
  let newData = this.data.topMVs
  if(offset === 0){
    newData = res.data
  }else{
    newData = newData.concat(res.data)
  }
  this.setData({topMVs:newData})
  this.setData({hasMore:res.hasMore})
  wx.hideNavigationBarLoading()
  if(offset === 0){//数据加载完了就把下拉刷新能够动画停掉
    wx.stopPullDownRefresh()
  }
},

//封装事件处理的方法
handleVideoItemClick:function(event){
  //获取id
  const id = event.currentTarget.dataset.item.id
  //页面跳转
  wx.navigateTo({
    url:`/packageDetail/pages/detail-video/index?id=${id}` 
  })
},

  //其它生命周期回调函数
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: async function(){
    this.getTopMVData(0)

    // const res = await getTopMV(0)
    // this.setData({topMVs:res.data})
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function () {
    
    this.getTopMVData(this.data.topMVs.length)
    // const res = await getTopMV(this.data.topMVs.length)
    //   this.setData({
    //     topMVs: this.data.topMVs.concat(res.data)
    //   })
      
    }
  ,


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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})