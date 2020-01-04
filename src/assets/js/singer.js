export default class Singer {
  constructor({ singer_id, singer_name, singer_mid }) {
    this.singer_id = singer_id;
    this.singer_name = singer_name;
    this.singer_pic = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${singer_mid}.jpg`;
  }
}
