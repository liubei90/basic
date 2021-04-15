// index.js
const token = 'eyJhbGciOiAiSFMyNTYifQ==.eyJzZXNzaW9uX2lkIjogIjI5YTIyZGZjLTliNDAtMTFlYi05Y2ZmLWZhMTYzZTg0YWFmMiIsICJ1c2VyX2lkIjogImZhNDExMGM0LTlhNjctMTFlYi05Y2ZmLWZhMTYzZTg0YWFmMiIsICJleHBpcmVfZGF0ZSI6ICIyMDIxLTA0LTEyIDEyOjM1OjQ0IiwgInNvdXJjZSI6ICJ3ZWIifQ==.iVLws6nXrB4bQ7VMkhnqOH9zezGTdhD55vuOkjJd4OU=';
const util = require('../../utils/util.js');
// 获取应用实例
const app = getApp()

Page({
  data: {
    subscribe_result: '',
    send_subscribe_result: '',
    send_uniform_message_result: '',

    activity_result: '',
    activity_change_result: '',

    // 上传图片
    fileList: []
  },
  onLoad() {
  },

  handleSubscribe() {
    wx.requestSubscribeMessage({
      tmplIds: ['PAboCNd3LLUGIPKqZC_zNipWZRXTKK_VhWSWOF5ceMc'],
      success: ({ errMsg }) => {
        if (errMsg === 'requestSubscribeMessage:ok') {
          this.setData({
            subscribe_result: '订阅成功',
          });
        } else {
          this.setData({
            subscribe_result: '订阅失败' + errMsg,
          });
        };
      },
      fail: ({ errMsg }) => {
        this.setData({
          subscribe_result: '订阅失败' + errMsg,
        });;
      },
    });
  },

  handleSendSubscribe() {
    let openid = app.globalData.openid;

    if (!openid) return;

    wx.request({
      url: util.baseDomain + '/demo/send_subscribe?openid=' + openid,
      success: (res) => {
        this.setData({
          subscribe_result: '已经消费',
          send_subscribe_result: '发送成功',
        });
      },
      fail: () => {
        this.setData({
          subscribe_result: '已经消费',
          send_subscribe_result: '发送失败',
        });
      },
    });
  },

  /**
   * [渲染层错误] 2020年01月10日起，新发布的小程序将不能使用模板消息，请开发者迁移至订阅消息功能。
   */
  handleSendUniformMessage(event) {
    let formid = event.detail.formId;
    let value = event.detail.value;
    console.log(formid, value);

    return;
    let openid = app.globalData.openid;

    if (!openid) return;

    wx.request({
      url: util.baseDomain + '/demo/send_uniform_message?openid=' + openid,
      success: (res) => {
        console.log(res);
        this.setData({
          send_uniform_message_result: '发送成功',
        });
      },
      fail: () => {
        this.setData({
          send_uniform_message_result: '发送失败',
        });
      },
    });
  },

  handleCreateActivityId() {
    let openid = app.globalData.openid;

    if (!openid) return;

    wx.request({
      url: util.baseDomain + '/demo/create_activity_id?openid=' + openid,
      success: (res) => {
        console.log(res);
        let data = res.data;

        if (data.code == 0) {
          wx.setStorageSync('activity_id', data.data);
          wx.setStorageSync('member_count', 1);
          this.setData({
            activity_result: '发送成功',
          });
          wx.updateShareMenu({
            withShareTicket: true,
            isUpdatableMessage: true,
            activityId: data.data, // 活动 ID
            templateInfo: {
              parameterList: [{
                name: 'member_count',
                value: '1'
              }, {
                name: 'room_limit',
                value: '5'
              }]
            }
          });
          return;
        }
        wx.removeStorageSync('activity_id');
        wx.removeStorageSync('member_count');
        this.setData({
          activity_result: '发送失败',
        });
      },
      fail: () => {
        wx.removeStorageSync('activity_id');
        wx.removeStorageSync('member_count');
        this.setData({
          activity_result: '发送失败',
        });
      },
    });
  },

  handleSetUpdatableMsg() {
    let activity_id = wx.getStorageSync('activity_id');
    let member_count = wx.getStorageSync('member_count') || 1;
    let room_limit = 5;

    if (!activity_id) return;

    wx.setStorageSync('member_count', member_count + 1);
    wx.request({
      url: util.baseDomain + `/demo/set_updatable_msg?activity_id=${activity_id}&member_count=${member_count}&room_limit=${room_limit}&target_state=${member_count >= room_limit? 1 : 0}`, 
      success: (res) => {
        console.log(res);
        let data = res.data;

        if (data.code == 0) {
          this.setData({
            activity_change_result: '发送成功',
          });
          return;
        }
        this.setData({
          activity_change_result: '发送失败',
        });
      },
      fail: () => {
        this.setData({
          activity_change_result: '发送失败',
        });
      },
    });
  },

  // 上传图片
  handleAfterRead(event) {
    const { file } = event.detail;
    console.log(file);
    const index = this.data.fileList.length;
    this.setData({
      ['fileList['+index+']']: { url: file.url, deletable: true, },
    });
  },

  handleUploadFile() {
    const fileList = this.data.fileList;

    for (let i = 0; i < fileList.length; i++) {
      const { url } = fileList[i];
      wx.uploadFile({
        url: 'https://wx-dev.lbliubei.cn/repair-equipment/mm/equipment_repair_file',
        filePath: url,
        name: 'file',
        header: { Authorization: 'Bearer ' + token },
        success: (res) => {
          console.log('success', res);
        },
        fail: (err) => {
          console.log('fail', err);
        },
      })
    }
  },

  handleUserinfo() {
    ;
  },

  onShareAppMessage() {
    return {
      title: '测试动态消息',
      path: 'pages/demo/activity',
    };
  }

})
