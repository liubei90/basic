import http from './http';

export const doRegist = async function ({ userId, account, password, name, type = 'Z' }) {
  try {
    const res = await http.post('http://qd.fakabei.com/api/customer/register', {
      userId,
      account,
      password,
      name,
      type,
    });

    if (res && res['data']) {
      return res['data'];
    }
  } catch (error) {}
}