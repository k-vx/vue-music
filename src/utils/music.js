import store from 'store'
import {vueProject} from '@/main.js'
const Music = {
  audioEle: document.getElementById('myAudio'),

  /**
   * 播放上一首 下一首歌曲
   * @param { String }  type 是下一首还是上一首  'next'  和  'prev' 两种
   */
  playNextPrev (type) {
    let playType = store.getters.MUSIC_PLAY_TYPE_GETTERS
    let playIndex = store.getters.PLAY_MUSIC_INDEX_GETTERS
    let listCount = store.getters.PLAY_MUSIC_LISTS_GETTERS.length
    switch (playType) {
      case 'auto':
      case 'loop':
        // 下一曲
        if (type === 'next') {
          if (playIndex >= listCount - 1) {
            this.playIndex(0)
            return
          }
          this.playIndex(playIndex + 1)
        }
        // 上一曲
        if (type === 'prev') {
          if (playIndex <= 0) {
            this.playIndex(listCount - 1)
            return
          }
          this.playIndex(playIndex - 1)
        }
        break
      // 随机不区分上一曲下一曲
      case 'random':
        let index = Math.floor(Math.random() * listCount)
        this.playIndex(index)
        break
    }
  },

  /**
   * 播放对应索引的歌曲
   * @param { Number }  index  是点击第多少个播放
   */
  playIndex (index) {
    store.dispatch('PLAY_MUSIC_INDEX_SETTERS', index)
    vueProject.$nextTick(() => {
      this.play()
    })
  },

  /**
   * 设置音乐的播放类型
   */
  setPlayType () {
    const type = ['auto', 'loop', 'random']
    let playType = store.getters.MUSIC_PLAY_TYPE_GETTERS
    // 获取索引
    let getTypeIndex
    for (let k in type) {
      if (type[k] === playType) {
        getTypeIndex = parseInt(k)
      }
    }

    let index
    if (getTypeIndex >= type.length - 1) {
      index = 0
    } else {
      index = getTypeIndex + 1
    }
    store.dispatch('MUSIC_PLAY_TYPE_SETTERS', type[index])
  },

  /**
   * 设置音频的current时间, 存储在vuex中
   * @param { Number }   time  当前时间
   */
  setCurrentTime (time) {
    store.dispatch('MUSIC_CURRENT_TIME_SETTERS', time)
  },

  /**
   * 播放
   */
  play () {
    this.audioEle.play()
  },

  /**
   * 暂停
   */
  pause () {
    this.audioEle.pause()
  },

  /**
   * 播放暂停
   */
  playPause () {
    if (this.audioEle.paused) {
      this.play()
    } else {
      this.pause()
    }
  },

  /**
   * 音频的事件初始化
   */
  initAudioEvent () {

  }
}

export default Music
