import { TOKEN_KEY} from '../constants/token-const'

const token = wx.getStorageSync(TOKEN_KEY)

const BASE_URL = "http://123.207.32.32:9001"
// 用已经部署好的
const LOGIN_BASE_URL = "http://123.207.32.32:3000"
// 用我给你的登录服务器代码,自己部署
// const LOGIN_BASE_URL = "http://localhost:3000"

class ZYRequest {
  constructor(baseURL, authHeader={}) {
    this.baseURL = baseURL
    this.baseHeader = authHeader
  }
  request(url,method,params, isAuth= false,header = {}){
    const finalHeader = isAuth ? {...this.authHeader, ...header}: header
    return new Promise((resolve,reject) => {
      wx.request({
        url: this.baseURL  + url,
        method:method,
        header: finalHeader,
        data:params,
        success:function(res){
          resolve(res.data)
        },
        fail:function(err){
          reject(err)
        }
      })
    })
  }

  get(url,params,isAuth= false, header) {
    return this.request(url,"GET",params, isAuth,header)
  }

  post(url, data, isAuth = false, header) {
    return this.request(url, "POST", data, isAuth, header)
  }
}

const zyRequest = new ZYRequest(BASE_URL)

const zyLoginRequest = new ZYRequest(LOGIN_BASE_URL, {
  token
})

export default zyRequest
export {
  zyLoginRequest
}