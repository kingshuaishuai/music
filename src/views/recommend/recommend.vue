<template>
  <div class="recommend">
    <div v-if="recommends.length" class="slider-wrapper">
      <slider>
        <div v-for="slider in recommends" :key="slider.id">
          <a :href="slider.linkUrl">
            <img :src="slider.picUrl" alt="" />
          </a>
        </div>
      </slider>
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
              :src="item.cover"
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
</template>

<script>
import Slider from "base/slider/slider";
import { getRecommend, getHotRecommend } from "../../api/recommend";
import { ERR_OK } from "../../api/config";

export default {
  name: "recommend",
  components: {
    Slider
  },
  data() {
    return {
      recommends: [],
      discList: []
    };
  },
  created() {
    this._getRecommend();
    this._getHotRecommend();
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variable.scss";
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
        font-size: $font-size-small;
      }
      .amount {
        color: $color-text-d;
        font-size: $font-size-small-s;
      }
    }
  }
}
</style>
