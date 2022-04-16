import zyRequest from './index'

export function getSearchHot(){
  return zyRequest.get("/search/hot")
}

export function getSearchSuggest(keywords) {
  return zyRequest.get("/search/suggest",{
    keywords,
    type:"mobile"
  })
}

export function getSearchResult(keywords) {
  return zyRequest.get("/search",{
    keywords
  })
}