// pages/detail-search/index.js
import { getSearchHot,getSearchSuggest,getSearchResult} from '../../../service/api_search'
import debounce from '../../../utils/debounce'
import {stringToNodes} from '../../../utils/string2nodes'

const debounceGetSearchSuggest = debounce(getSearchSuggest,300)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotKeywords:[],
    suggestSongs:[],
    suggestSongsNodes:[],
    resultSongs:[],
    searchValue:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取页面的数据
    this.getPageData()
  },
//网络请求
  getPageData: function() {
    getSearchHot().then(res =>{
      this.setData({hotKeywords:res.result.hots})
    })
  },

  //事件处理
  handleSearchChange: function(event) {
    //获取输入关键字
    const searchValue= event.detail
    //保存关键字
    this.setData({searchValue})
    //判断输入的关键字为空字符的处理逻辑
    if(!searchValue.length) {
      this.setData({suggestSongs:[],resultSongs:[]})
      //当输入为空时，把防抖延迟发出的函数取消掉
      debounceGetSearchSuggest.cancel()
      return
    }
    //根据关键字进行搜索
    debounceGetSearchSuggest(searchValue).then(res =>{
      //1.获取建议的关键字歌曲
      const suggestSongs = res.result.allMatch
      this.setData({suggestSongs})
      if(!suggestSongs) return

      //2.转成nodes节点
      const suggestKeywords = suggestSongs.map(item => item.keyword)
      const suggestSongsNodes = []
      for(const keyword of suggestKeywords){
        const nodes = stringToNodes(keyword,searchValue)
        suggestSongsNodes.push(nodes)
      }
      this.setData({suggestSongsNodes})
    })
  },
  handleSearchAction: function(){
    const searchValue = this.data.searchValue
    getSearchResult(searchValue).then(res =>{
      this.setData({resultSongs:res.result.songs})
    })
  },
  handleSuggestItemClick: function(event) {
    //1.获取点击的关键字
    const index = event.currentTarget.dataset.index
    const keyword = this.data.suggestSongs[index].keyword

    //2.讲关键字设置到searchValue
    this.setData({ searchValue : keyword})

    //3.发送网络请求
    this.handleSearchAction()
  },

  handleTagItemClick: function(event) {
    //1.获取点击的关键字
    const searchValue = event.currentTarget.dataset.keyword

    //2.讲关键字设置到searchValue
    this.setData({ searchValue})

    //3.发送网络请求
    this.handleSearchAction()
  }

})