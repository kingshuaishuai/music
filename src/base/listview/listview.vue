<template>
  <scroll class="listview" :data="data">
    <div class="scroll-wrapper">
      <ul class="list-group" v-for="group in data" :key="group.title">
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
      </ul>
    </div>
  </scroll>
</template>

<script>
import Scroll from "../scroll/scroll";
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
  }
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
</style>
