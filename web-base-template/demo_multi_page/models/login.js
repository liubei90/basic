import { randomString, readCookie, setCookie, delCookie } from '@/utils';
import http from './http';

export const doLogin = async function ({ account, password }) {
  try {
    const res = await http.post(
    'http://qd.fakabei.com/api/customer/login',
    {
      account,
      password,
    });

    if (res && res['data']) {
      return res['data'];
    }
  } catch (error) {}
}

// account	是	string	用户名
// password	是	string	密码
// name	否	string	昵称
// type
// 创建临时用户
export const createYUser = function() {
  const account = randomString(6);

  return {
    account,
    password: randomString(8),
    name: '游客' + account,
    // name: account,
    type: 'Y',
  };
};

// "customerId": "4263461173511547424",
// "name": "232332",
// "token": "61aea3d2ef03bac2e92d0b14ca1d0f5a"
// "type": "Y"
// 获取用户信息
export const getUserInfo = function() {
  const customerId = readCookie('customerId');
  const name = readCookie('name');
  const token = readCookie('token');
  const type = readCookie('type');
  const grade = readCookie('grade');

  if (!customerId || !name || !token || !type || !grade) {
    return;
  }

  return { customerId, name, token, type, grade };
}

// 设置用户信息
export const setUserInfo = function(info) {
  const customerId = info['customerId'];
  const name = info['name'];
  const token = info['token'];
  const type = info['type'];
  const grade = info['grade'];

  if (!customerId || !name || !token || !type || !grade) {
    return;
  }

  setCookie('customerId', customerId);
  setCookie('name', name);
  setCookie('token', token);
  setCookie('type', type);
  setCookie('grade', grade);
}

// 删除用户信息
export const delUserInfo = function() {
  delCookie('customerId');
  delCookie('name');
  delCookie('token');
  delCookie('type');
  delCookie('grade');
}
