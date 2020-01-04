<template>
  <div class="singer">
    <listview :data="singers"></listview>
  </div>
</template>

<script>
import pinyin from "pinyin";
import { getSingerList } from "../../api/singer";
import Singer from "../../assets/js/singer";
import Listview from "../../base/listview/listview";

const HOT_NAME = "热门";
const HOT_SINGER_LENGTH = 10;
export default {
  name: "singer",
  components: {
    Listview
  },
  data() {
    return {
      singers: []
    };
  },
  created() {
    getSingerList().then(singerList => {
      this.singers = this.normalizeSingerList(singerList);
    });
  },
  methods: {
    getEnString(str) {
      return pinyin(str, {
        style: pinyin.STYLE_NORMAL
      })
        .join("")
        .toUpperCase();
    },
    normalizeSingerList(singerList) {
      const map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      };
      singerList.forEach((item, index) => {
        const singer = new Singer(item);
        if (index < HOT_SINGER_LENGTH) {
          map.hot.items.push(singer);
        }

        const key = this.getEnString(singer.singer_name)[0];
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          };
        }
        map[key].items.push(singer);
      });

      let hot = [];
      let rest = [];

      for (let key in map) {
        const val = map[key];
        if (val.title === HOT_NAME) {
          hot.push(val);
        } else if (val.title.match(/[a-zA-Z]/)) {
          rest.push(val);
        }
      }
      rest.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      return hot.concat(rest);
    }
  }
};
</script>

<style lang="scss" scoped>
.singer {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}
</style>
