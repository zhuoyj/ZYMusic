import zyRequest from './index'

export function getBanners() {
  return zyRequest.get('/banner',{
    type:2
  })
}

export function getRankings(idx) {
  return zyRequest.get("/top/list", {
    idx
  })
}

export function getSongMenu(cat="全部",limit=6,offset=0) {
  return zyRequest.get("/top/playlist",{
    cat,
    limit,
    offset
  })
}

export function getSongMenuDetail(id) {
  return zyRequest.get("/playlist/detail/dynamic",{
    id
  })
}