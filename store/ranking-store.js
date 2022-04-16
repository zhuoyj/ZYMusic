import {HYEventStore} from 'hy-event-store'
import {getRankings} from '../service/api_music'

const rankingMap = {0:"newRanking",1:"hotRanking",2:"originRanking",3:"upRanking"}
const rankingStore = new HYEventStore({
  state: {
    newRanking:{},//0:新歌榜
    hotRanking: {},//1：热歌榜
    originRanking:{},//2:原创榜
    upRanking:{}//3：飙升榜
  },
  actions: {
    //ctx相当于vue上下文context
    
    getRankingDataAction(ctx) {
      //0:新歌榜   1：热歌榜  2:原创榜： 3：飙升榜
      for(let i=0; i<4; i++){
        getRankings(i).then(res => {
          const rankingName = rankingMap[i]
          ctx[rankingName] = res.playlist
          // switch(i) {
          //   case 0:
          //     ctx.newRanking = res.playlist
          //     break;
          //   case 1:
          //     ctx.hotRanking = res.playlist
          //     break;
          //   case 2:
          //     ctx.originRanking = res.playlist
          //     break;
          //   case 3:
          //     ctx.upRanking = res.playlist
          //     break;
          // }
        })
      }
    }
  }
})

export {
  rankingStore,
  rankingMap
}