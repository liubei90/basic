import http from './http';


// 获取广告列表
export const getAdList = async function({ userId }) {
  try {
    const res = await http.post(
      'http://qd.fakabei.com/api/ad/adList', 
      null,
      {
        params: {
          userId,
        }
      });

    if (res && res['data']) {
      return res['data'];
    }
  } catch (error) {}
}
