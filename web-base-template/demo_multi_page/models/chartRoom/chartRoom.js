import { randomString } from '@/utils';
import { requestAdd } from '@/models/room';

const Chatroom = window.Chatroom;
const defaultOptions = {
  appKey: '21de0a2e8f73d39164a3012e3789ba51',
  // account: '',
  // token: '',
  // chatroomId: '',
  // chatroomAddresses: [],

  // onconnect: () => {},
  // onwillreconnect: () => {},
  // onmsgs: () => {},
  // onerror: () => {},
  // ondisconnect: () => {}, 
}


// http://qd.fakabei.com/api/room/requestAdd
export const getChatroomAddress = function(chatroomId) {
  if (Chatroom) {
    Chatroom.getChatroomAddress();
  }

  throw new Error('没有找到聊天室sdk');
}

// http://localhost:8088/page2.html?userId=1187199892951678977&chatroomId=235163984

// 获取聊天室实例
export const getInstance = async function (customerId, name, token, chatroomId, chatroomCustom) {
  console.log(customerId, name, token, chatroomId);
  if (Chatroom) {
    const res = await requestAdd({ chatroomId, customerId });

    if (!res) {
      console.error('获取聊天室地址失败');
      return;
    }

    const options = Object.assign({}, defaultOptions, {
      account: customerId,
      token,
      chatroomId,
      chatroomNick: name,
      chatroomAddresses: res,
      chatroomCustom,
    });
    return getChartroomInstance(options);
  }

  throw new Error('没有找到聊天室sdk');
}


// 获取匿名聊天室实例
export const getAnonymousInstance = async function(customerId, name, token, chatroomId, chatroomCustom) {
  if (Chatroom) {
    const res = await requestAdd({ chatroomId, customerId });

    if (!res) {
      console.error('获取聊天室地址失败');
      return;
    }

    const options = Object.assign({}, defaultOptions, {
      account: customerId,
      chatroomId,
      isAnonymous: true,
      chatroomNick: name,
      chatroomAddresses: res,
      chatroomCustom,
    });
    return getChartroomInstance(options);
  }

  throw new Error('没有找到聊天室sdk');
}

function getChartroomInstance(options) {
  const cbsName = ['onconnect', 'onwillreconnect', 'ondisconnect', 'onerror', 'onmsgs'];
  const cbsMap = {};
  // 回调函数代理
  const proxy = {};

  cbsName.forEach(function(name) {
    const cbs = cbsMap[name] = [];
    proxy[name] = function() {
      const args = Array.prototype.slice.apply(arguments);
      console.log('name:', name, args);

      for (let i = 0; i < cbs.length; i++) {
        const cb = cbs[i];
        if (typeof cb === 'function') {
          cb(...args);
        }
      }
    }
  });

  function addProxy(name, cb) {
    const cbs = cbsMap[name];

    if (Array.isArray(cbs) && 
      typeof cb === 'function' &&
      cbs.indexOf(cb) < 0) {
      cbs.push(cb);
    }
  }

  function removeProxy(name, cb) {
    const cbs = cbsMap[name];

    if (Array.isArray(cbs) && 
      cbs.indexOf(cb) > -1) {
      cbs.splice(cbs.indexOf(cb), 1);
    }
  }

  const instance = Chatroom.getInstance(Object.assign({}, options, proxy));

  // connect 进入聊天室
  function connect() {
    if (!instance) {
      return;
    }

    return instance.connect();
  }

  // disconnect 退出聊天室
  function disconnect() {
    if (!instance) {
      return;
    }

    return instance.disconnect();
  }

  // drop 清除聊天室队列
  // getChatroom 获取聊天室信息
  function getChatroom() {
    // done;
  }

  // getChatroomMembers 获取聊天室成员列表
  function getChatroomMembers(options) {
    if (!instance) {
      return;
    }

    return Promise.all(
      [new Promise(function(resolve, reject) {
        instance.getChatroomMembers(Object.assign({
          guest: false
        }, {
          done: (error, obj) => {
            if (error) {
              // reject(error);
              resolve();
            } else {
              resolve(obj);
            }
          }
        }));
      }),
      new Promise(function(resolve, reject) {
        instance.getChatroomMembers(Object.assign({
          guest: true
        }, {
          done: (error, obj) => {
            // resolve();
            if (error) {
              // reject(error);
              resolve();
            } else {
              resolve(obj);
            }
          }
        }));
      })]);
  }

  // getChatroomMembersInfo 获取聊天室成员信息
  function getChatroomMembersInfo(options) {
    // done;
  }

  // getHistoryMsgs 获取聊天室历史消息
  function getHistoryMsgs(options) {
    // done;
  }
  // kickChatroomMember 踢聊天室成员
  // markChatroomBlacklist 设置聊天室黑名单
  // markChatroomCommonMember 设置聊天室普通成员
  // markChatroomGaglist 设置聊天室禁言名单
  // markChatroomIdentity 设置聊天室成员身份
  // markChatroomManager 设置聊天室管理员
  // peak 获取聊天室队列中第一个元素
  // queueChange 批量更新聊天室队列
  // queueList 获取聊天室队列列表
  // queueOffer 新加(更新)队列元素
  // queuePoll 删除队列元素
  // sendCustomMsg 发送自定义消息
  // sendFile 发送文件消息
  // sendGeo 发送地理位置消息
  // sendText 发送文本消息
  function sendText(text) {
    if (!instance) {
      return;
    }

    const options = {
      text
    }

    return new Promise(function(resolve, reject) {
      instance.sendText(Object.assign({}, options, {
        done: function(error, msg) {
          if (error) {
            reject(error);
          } else {
            resolve(msg);
          }
        }
      }));
    })
  }
  // sendTipMsg 发送提醒消息
  function sendTipMsg(tip) {
    if (!instance) {
      return;
    }

    const options = {
      tip
    }

    return new Promise(function(resolve, reject) {
      instance.sendTipMsg(Object.assign({}, options, {
        done: function(error, msg) {
          if (error) {
            reject(error);
          } else {
            resolve(msg);
          }
        }
      }));
    })
  }
  // setOptions 更新聊天室配置, 参数格式跟 Chatroom.getInstance 保持一致
  // updateChatroom 更新聊天室信息
  // updateChatroomMemberTempMute 设置聊天室临时禁言
  // updateMyChatroomMemberInfo 更新自己在聊天室内的信息
  // 



  return {
    addProxy,
    removeProxy,
    connect,
    disconnect,
    getChatroom,
    getChatroomMembers,
    getChatroomMembersInfo,
    getHistoryMsgs,
    sendText,
    sendTipMsg,
  }
}