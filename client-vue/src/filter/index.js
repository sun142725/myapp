function addZero(val) {
  if (val < 10) {
    return "0" + val;
  } else {
    return val;
  }
};
function formatTime(value, type) {
  let dataTime = "";
  let data = new Date();
  data.setTime(value);
  let year = data.getFullYear();
  let month = addZero(data.getMonth() + 1);
  let day = addZero(data.getDate());
  let hour = addZero(data.getHours());
  let minute = addZero(data.getMinutes());
  let second = addZero(data.getSeconds());
  if (type == "YMD") {
    dataTime = year + "-" + month + "-" + day;
  } else if (type == "YMDHMS") {
    dataTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
  } else if (type == "HMS") {
    dataTime = hour + ":" + minute + ":" + second;
  } else if (type == "YM") {
    dataTime = year + "-" + month;

  }
  return dataTime;//将格式化后的字符串输出到前端显示
}
export default {
  install:function (Vue) {
    Vue.filter('formatTime', formatTime)
  }
}
