import zyRequest  from './index'

export function getSongDetail(ids){
  return zyRequest.get("/song/detail",{
    ids
  })
}

export function getSongLyric(id) {
  return zyRequest.get("/lyric", {
    id
  })
}