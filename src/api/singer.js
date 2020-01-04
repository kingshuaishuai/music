import { commonParams } from "./config";
import axios from "axios";

const dev = process.env.NODE_ENV !== "production";

export function getSingerList() {
  const url = dev ? "/api/getSingerList" : "";
  const data = Object.assign({}, commonParams, {
    "-": `recom${Math.random()
      .toString()
      .replace("0.", "")}`,
    platform: "yqq.json",
    data: {
      comm: {
        ct: 24,
        cv: 0
      },
      singerList: {
        module: "Music.SingerListServer",
        method: "get_singer_list",
        param: {
          area: -100,
          sex: -100,
          genre: -100,
          index: -100,
          sin: 0,
          cur_page: 1
        }
      }
    }
  });
  return axios
    .get(url, {
      params: data
    })
    .then(res => {
      return res.data;
    });
}
