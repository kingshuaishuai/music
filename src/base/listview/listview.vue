<template>
  <scroll
    ref="listview"
    class="listview"
    :probe-type="probeType"
    :data="data"
    :listen-scroll="listenScroll"
    @scroll="handleScroll"
  >
    <ul class="list-group">
      <li ref="listGroup" v-for="group in data" :key="group.title">
        <h2 class="list-group-title">{{ group.title }}</h2>
        <ul>
          <li
            class="list-group-item"
            v-for="item in group.items"
            :key="item.singer_id"
          >
            <img class="avatar" v-lazy="item.singer_pic" />
            <span class="name">{{ item.singer_name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div
      class="list-shortcut"
      @touchstart.stop.prevent="onShortcutTouchStart"
      @touchmove.stop.prevent="onShortcutTouchMove"
      @touchend.stop
    >
      <ul>
        <li
          class="shortcut-item"
          v-for="(item, index) in shortcutList"
          :data-index="index"
          :key="item"
          :class="{ current: currentIndex === index }"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </scroll>
</template>

<script>
import Scroll from "../scroll/scroll";
import { getData } from "../../assets/js/dom";

const ANCHOR_HEIGHT = 18;
export default {
  name: "listview",
  components: {
    Scroll
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      scrollY: -1,
      currentIndex: 0
    };
  },
  computed: {
    shortcutList() {
      return this.data.map(item => item.title.substr(0, 1));
    }
  },
  created() {
    this.touch = {};
    this.listenScroll = true;
    this.probeType = 3;
    this.listHeight = [];
  },
  methods: {
    onShortcutTouchStart(e) {
      let anchorIndex = getData(e.target, "index");
      let firstTouch = e.touches[0];

      this.touch.y1 = firstTouch.pageY;
      this.touch.anchorIndex = anchorIndex;
      this._scrollTo(anchorIndex);
      console.log("start", anchorIndex);
      console.log("start pageY", firstTouch.pageY);
    },
    onShortcutTouchMove(e) {
      const firstTouch = e.touches[0];
      this.touch.y2 = firstTouch.pageY;
      const delta = parseInt((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT);
      const anchorIndex = parseInt(this.touch.anchorIndex + delta);
      this._scrollTo(anchorIndex);
      console.log("move", anchorIndex);
    },
    _scrollTo(index) {
      if (!index && index !== 0) {
        return;
      }
      if (index < 0) {
        index = 0;
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2;
      }
      this.scrollY = -this.listHeight[index];
      console.log("this.$refs.listGroup[index]", this.$refs.listGroup[index]);
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0);
    },
    _calculateHeight() {
      this.listHeight = [];
      let height = 0;
      this.listHeight.push(height);
      const list = this.$refs.listGroup;

      for (let i = 0; i < list.length; i++) {
        let item = list[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    handleScroll(pos) {
      this.scrollY = pos.y;
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this._calculateHeight();
      }, 20);
    },
    scrollY(newY) {
      const listHeight = this.listHeight;

      // 最顶部下拉
      if (newY > 0) {
        this.currentIndex = 0;
        return;
      }

      // 中间
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i];
        let height2 = listHeight[i + 1];

        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i;
          return;
        }
      }

      // 最底部上拉
      this.currentIndex = listHeight.length - 2;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variable.scss";
.listview {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .list-group {
    padding-bottom: 25px;
    .list-group-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      background-color: $color-highlight-background;
      font-size: $font-size-small;
      color: $color-text-l;
    }
    .list-group-item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .name {
        margin-left: 20px;
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
  }
  .list-shortcut {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background-color: $color-background-d;
    font-family: Helvetica;
    .shortcut-item {
      padding: 3px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;
      &.current {
        color: $color-theme;
      }
    }
  }
}
</style>
