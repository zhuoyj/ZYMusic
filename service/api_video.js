import zyRequest from './index'

export function getTopMV(offset,limit = 10) {
  return zyRequest.get("/top/mv",{
    offset,
    limit
  })
}

/**
 * 请求MV的播放地址
 * @param {number} id MV的id
 */

export function getMVURL(id) {
  return zyRequest.get("/mv/url",{
    id
  })
}
/**
 * 请求MV的详情
 * @param {number} mvid MV的id
 */
export function getMVDetail(mvid) {
  return zyRequest.get("/mv/detail",{
    mvid
  })
}

export function getRelatedVideo(id) {
  return zyRequest.get("/related/allvideo",{
    id
  })
}