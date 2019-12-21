<template>
  <div class="m-header">
    <div class="icon"></div>
    <div class="title">Chicken Music</div>
    <router-link tag="div" class="mine" to="/user">
      <i class="icon-mine"></i>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "m-header"
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/mixin.scss";
@import "../../assets/styles/variable.scss";
.m-header {
  position: relative;
  display: flex;
  height: 44px;
  font-size: $font-size-large;
  color: $color-theme;
  justify-content: center;
  align-items: center;
  .icon {
    width: 30px;
    height: 32px;
    margin-right: 9px;
    @include bg-image("./logo");
    background-size: cover;
  }
  .mine {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    font-size: 20px;
  }
}
</style>
