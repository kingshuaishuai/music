import originJSONP from "jsonp";

export default function jsonp(url, data, option) {
  url += (url.includes("?") ? "&" : "?") + param(data);
  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
}

function param(data) {
  let url = "";

  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      let value = data[key] ? data[key] : "";
      url += `&${key}=${encodeURIComponent(value)}`;
    }
  }
  return url ? url.substring(1) : "";
}
