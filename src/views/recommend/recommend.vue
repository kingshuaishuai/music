<template>
  <div class="recommend">
    <scroll ref="scroll" :data="discList" class="recommend-content">
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <div class="slider-content">
            <slider ref="slider">
              <div v-for="slider in recommends" :key="slider.id">
                <a :href="slider.linkUrl">
                  <img
                    @load="loadImage"
                    class="slider-img"
                    :src="slider.picUrl"
                  />
                </a>
              </div>
            </slider>
          </div>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li class="item" v-for="item in discList" :key="item.content_id">
              <div class="icon">
                <img
                  class="cover"
                  width="60"
                  height="60"
                  v-lazy="item.cover"
                  alt=""
                />
              </div>
              <div class="text">
                <h2 class="name" v-html="item.username"></h2>
                <p class="desc" v-html="item.title"></p>
                <p class="amount">
                  播放量：{{ (item.listen_num / 10000).toFixed(1) }}万
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Slider from "base/slider/slider";
import Scroll from "base/scroll/scroll";
import { getRecommend, getHotRecommend } from "../../api/recommend";
import { ERR_OK } from "../../api/config";

export default {
  name: "recommend",
  components: {
    Slider,
    Scroll
  },
  data() {
    return {
      recommends: [],
      discList: [],
      scrollRefresh: false
    };
  },
  created() {
    this._getRecommend();
    this._getHotRecommend();
  },
  activated() {
    setTimeout(() => {
      this.$refs.slider && this.$refs.slider.refresh();
      this.$refs.scroll && this.$refs.scroll.refresh();
    }, 2000);
  },
  methods: {
    _getRecommend() {
      getRecommend().then(res => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.sliderList;
        }
      });
    },
    _getHotRecommend() {
      getHotRecommend().then(res => {
        console.log(res.recomPlaylist.data.v_hot);
        this.discList = res.recomPlaylist.data.v_hot;
      });
    },
    loadImage() {
      if (!this.checkLoaded) {
        this.$refs.scroll.refresh();
        this.checkLoaded = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variable.scss";
.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  .recommend-content {
    height: 100%;
    overflow: hidden;
    .slider-wrapper {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 40%;
      overflow: hidden;
      .slider-img {
        vertical-align: top;
      }
      .slider-content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100% !important;
      }
    }
    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }
      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;
        .cover {
          vertical-align: top;
        }
        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }
        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;
          .name {
            color: $color-text;
            margin-bottom: 6px;
          }
          .desc {
            color: $color-text-d;
          }
          .amount {
            color: $color-text-d;
            font-size: $font-size-small-s;
          }
        }
      }
    }
  }
}
</style>
