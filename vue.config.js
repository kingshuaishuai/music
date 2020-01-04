const path = require("path");
const axios = require("axios");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  devServer: {
    before(app) {
      app.get("/api/getTopBanner", (req, res) => {
        const url = "https://u.y.qq.com/cgi-bin/musicu.fcg";
        const jumpPrefix = "https://y.qq.com/n/yqq/album/";
        axios
          .get(url, {
            headers: {
              referer: "https://y.qq.com/?ADTAG=myqq",
              origin: "https://y.qq.com"
            },
            params: req.query
          })
          .then(response => {
            response = response.data;

            if (response.code === 0) {
              const sliderList = [];
              const content =
                response.focus.data && response.focus.data.content;

              for (let i = 0; i < content.length; i++) {
                const sliderItem = {
                  id: content[i].id,
                  linkUrl: jumpPrefix + content[i].jump_info.url + ".html",
                  picUrl: content[i].pic_info.url
                };
                sliderList.push(sliderItem);
              }
              res.json({
                code: 0,
                data: {
                  sliderList
                }
              });
            } else {
              res.json(response);
            }
          })
          .catch(err => {
            console.log(err);
          });
      });

      app.get("/api/getHotRecommend", (req, res) => {
        const url = "https://u.y.qq.com/cgi-bin/musicu.fcg";
        axios
          .get(url, {
            headers: {
              referer: "https://y.qq.com/?ADTAG=myqq",
              origin: "https://y.qq.com"
            },
            params: req.query
          })
          .then(response => {
            if (response.data.code === 0) {
              res.json(response.data);
            } else {
              res.json(response);
            }
          })
          .catch(err => {
            console.log(err);
          });
      });

      app.get("/api/getSingerList", (req, res) => {
        const url = "https://u.y.qq.com/cgi-bin/musicu.fcg";
        axios
          .get(url, {
            headers: {
              referer: "https://y.qq.com/?ADTAG=myqq",
              origin: "https://y.qq.com"
            },
            params: req.query
          })
          .then(response => {
            if (
              response.data.code === 0 &&
              response.data.singerList &&
              response.data.singerList.code === 0
            ) {
              res.json(response.data.singerList.data.singerlist);
            } else {
              res.json(response);
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
  },
  chainWebpack(config) {
    config.resolve.alias
      .set("components", resolve("src/components"))
      .set("assets", resolve("src/assets"))
      .set("base", resolve("src/base"));
  }
};
