export default function (selector) {
  return new Promise( resolve =>{
    const query = wx.createSelectorQuery()
    query.select(selector).boundingClientRect()
    //query.exec(resolve) 下面的简写
    query.exec( res => {
      resolve(res)//把res回调出去
    })
  })
}