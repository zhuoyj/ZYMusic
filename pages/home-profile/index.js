// pages/home-profile/index.js
import { getUserInfo } from '../../service/api_login'

Page({
  data: {

  },
  handleGetUser: async function(event) {
    const userInfo = await getUserInfo()
    console.log(userInfo)
  },
  handleGetPhoneNumber: function(event) {
    console.log(event)
  }
})