import http from './http';


// 获取股票指数
export const getFinance = async function() {
  try {
    const res = await http.post(
      'http://qd.fakabei.com/api/room/finance'
      );

    if (res && res['data']) {
      return res['data'];
    }
  } catch (error) {}
}


// 获取首页接口
export const getHome = async function({ userId, name }) {
  try {
    const res = await http.post(
      'http://qd.fakabei.com/api/room/home',
      null,
      {
        params: {
          userId,
          name,
        }
      });

    if (res && res['data']) {
      return res['data'];
    }
  } catch (error) {}
}

// 获取聊天室地址
export const requestAdd = async function({ chatroomId, customerId }) {
  try {
    const res = await http.post(
      'http://qd.fakabei.com/api/room/requestAdd',
      {
        chatRoomId: chatroomId,
        customerId,
      },
      );

    if (res && res['data']) {
      return res['data'];
    }
  } catch (error) {}
}
