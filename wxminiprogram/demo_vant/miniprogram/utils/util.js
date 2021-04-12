const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

// 限频，每delay的时间执行一次 
function throttle(fn, delay, ctx) {
  let isAvail = true
  return function() {
      let args = arguments;
      
      // 开关打开时，执行任务
      if (isAvail) {
          isAvail = false;

          // delay时间之后，任务开关打开
          setTimeout(function() {
              isAvail = true;
              fn.apply(ctx, args);
          }, delay)
      }
  }
}

module.exports = {
  formatTime,
  throttle,
  // baseDomain: 'http://localhost:8001',
  baseDomain: 'https://wx-dev.lbliubei.cn',
}
