<template>
  <div ref="scroll" class="scroll">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";

export default {
  name: "scroll",
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    data: {
      type: Array,
      default: null
    },
    listenScroll: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      bs: null
    };
  },
  mounted() {
    setTimeout(() => {
      this.initScroll();
    }, 20);
  },
  methods: {
    initScroll() {
      if (!this.$refs.scroll) {
        return;
      }
      this.bs = new BScroll(this.$refs.scroll, {
        scrollY: true,
        click: true,
        probeType: this.probeType
      });
      if (this.listenScroll) {
        this.bs.on("scroll", pos => {
          this.$emit("scroll", pos);
        });
      }
    },
    refresh() {
      this.bs && this.bs.refresh();
    },
    enable() {
      this.bs && this.bs.enable();
    },
    disabled() {
      this.bs && this.bs.disabled();
    },
    scrollTo() {
      this.bs && this.bs.scrollTo.apply(this.bs, arguments);
    },
    scrollToElement() {
      this.bs && this.bs.scrollToElement.apply(this.bs, arguments);
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.refresh();
      }, 20);
    }
  }
};
</script>

<style lang="scss" scoped></style>
