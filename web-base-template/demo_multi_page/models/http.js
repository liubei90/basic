import axios from 'axios';
import qs from 'qs';
import Message from '@/components/message/message.js';

// {
//   "code": 200,
//   "data": {
//       "customerId": "4263461173511547424",
//       "name": "232332",
//       "token": "61aea3d2ef03bac2e92d0b14ca1d0f5a"
//   },
//   "message": "请求成功",
//   "success": true
// }

const instance = axios.create({
  unNotify: false,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  }
});

instance.interceptors.request.use(function (config) {
  // console.log(config);
  if (config.data) {
    config.data = qs.stringify(config.data);
  }
  return config;
})

instance.interceptors.response.use(function(resp) {
  const config = resp.config;

  if (config && !config['unNotify']) {
    if (!resp.data || !resp.data['success']) {
      console.log(resp.data['message'] || '请求失败');
      Message({
        message: resp.data['message'] || '请求失败',
        type: 'error',
      });
      // return Promise.reject(resp);
    }
  }

  return resp.data;
}, function(error) {
  const config = error.config;

  if (config && !config['unNotify']) {
    let errmsg = '请求失败';

    if (error.response && error.response['message']) {
      errmsg = error.response['message'];
    }

    console.log(errmsg);
    Message({
      message: errmsg,
      type: 'error',
    });
  }

  return Promise.reject(error);
});

export default instance;