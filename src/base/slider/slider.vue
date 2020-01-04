<template>
  <div ref="slider" class="slider">
    <div ref="sliderGroup" class="slider-group">
      <slot></slot>
    </div>
    <div class="dots">
      <span
        class="dot"
        v-for="dot in dots"
        :key="dot"
        :class="{ active: currentPageIndex === dot }"
        @click="() => goToPage(dot)"
      ></span>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import Slide from "@better-scroll/slide";
import { addClass } from "assets/js/dom";
BScroll.use(Slide);

export default {
  name: "slider",
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    autoInterval: {
      type: Number,
      default: 4000
    }
  },
  data() {
    return {
      slide: null,
      currentPageIndex: 0,
      playTimer: 0,
      sliderTimer: 0,
      dots: [],
      children: []
    };
  },
  mounted() {
    this.sliderTimer = setTimeout(() => {
      this.init();
    }, 20);

    window.addEventListener("resize", () => {
      this._setSlideWidth();
      console.log("shuaxin", this.slide.refresh);
      this.refresh();
    });
  },
  destroyed() {
    clearTimeout(this.sliderTimer);
    clearTimeout(this.playTimer);
  },
  methods: {
    init() {
      this._setClassName();
      clearTimeout(this.playTimer);
      this.slide = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        slide: {
          loop: this.loop,
          threshold: 100
        },
        useTransition: true,
        momentum: false,
        bounce: false,
        stopPropagation: true,
        probeType: 2,
        click: true
      });
      this._bindEvents();
      this.autoGoNext();
      this._initDots();
    },
    _setClassName() {
      this.children = this.$refs.sliderGroup.children;
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children[i];
        addClass(child, "slide-item");
      }
    },
    _setSlideWidth() {
      if (!this.$refs.sliderGroup) {
        return;
      }
      const sliders = this.$refs.sliderGroup.children;
      for (let i = 0; i < sliders.length; i++) {
        sliders[i].style.width = this.$refs.slider.clientWidth + "px";
      }
      this.$refs.sliderGroup.style.width =
        this.$refs.slider.clientWidth * sliders.length + "px";
    },
    _bindEvents() {
      this.slide.on("scrollEnd", this._onScrollEnd);
      // user touches the slide area
      this.slide.on("beforeScrollStart", () => {
        clearTimeout(this.playTimer);
      });
      // user touched the slide done
      this.slide.on("scrollEnd", () => {
        this.autoGoNext();
      });
      this.slide.on("slideWillChange", page => {
        this.currentPageIndex = page.pageX;
      });
    },
    _initDots() {
      const dotsLength = this.$refs.sliderGroup.children.length - 2;
      this.dots = Array.from({ length: dotsLength }, (el, index) => index);
    },
    _onScrollEnd() {
      if (this.autoScroll) {
        this.autoGoNext();
      }
    },
    autoGoNext() {
      clearTimeout(this.playTimer);
      this.playTimer = setTimeout(() => {
        this.nextPage();
      }, this.autoInterval);
    },
    nextPage() {
      this.slide.next();
    },
    prePage() {
      this.slide.prev();
    },
    goToPage(pageNumber) {
      this.slide.goToPage(pageNumber);
    },
    refresh() {
      this.slide.refresh();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variable.scss";
.slider {
  min-height: 1px;
  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    .slide-item {
      display: inline-block;
      width: 100%;
      overflow: hidden;
      text-align: center;
      a {
        display: block;
        width: 100%;
        overflow: hidden;
        text-decoration: none;
      }
      img {
        display: block;
        width: 100%;
      }
    }
  }
  .dots {
    width: 100%;
    position: absolute;
    bottom: 12px;
    transform: translateZ(1px);
    text-align: center;
    .dot {
      display: inline-block;
      width: 8px;
      height: 8px;
      margin: 0 4px;
      border-radius: 4px;
      background-color: $color-text-l;
      &.active {
        background-color: $color-text-ll;
        width: 20px;
      }
    }
  }
}
</style>
