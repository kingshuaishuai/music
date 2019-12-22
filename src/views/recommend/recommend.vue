<template>
  <div class="recommend">
    <div v-if="recommends.length" class="slider-wrapper">
      <slider>
        <div v-for="slider in recommends" :key="slider.id" class="slide-item">
          <a :href="slider.linkUrl">
            <img :src="slider.picUrl" alt="" />
          </a>
        </div>
      </slider>
    </div>
    recommend
  </div>
</template>

<script>
import Slider from "base/slider/slider";
import { getRecommend } from "../../api/recommend";
import { ERR_OK } from "../../api/config";

export default {
  name: "recommend",
  components: {
    Slider
  },
  data() {
    return {
      recommends: []
    };
  },
  created() {
    this._getRecommend();
  },
  methods: {
    _getRecommend() {
      getRecommend().then(res => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.sliderList;
        }
      });
    }
  }
};
</script>

<style scoped></style>
