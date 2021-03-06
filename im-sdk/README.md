# im-sdk
提供im基础服务

## 功能
1. 提供全双工的通信
2. 当前用户的会话列表，当前会话
3. 支持群会话
4. 消息历史记录
5. 管理历史记录（是否需要？）
6. 支持发送文本、图片、语音，支持输入法的emoji表情
7. 支持聊天消息按时间排序。
8. 消息发送中、发送成功、发送失败的状态


## 使用方法
接口接入

### 权限校验接口
获取权限，使用oauth2.0

暂无实现

### 群管理接口

#### 群列表
GET /im/group

curl -v -X GET http://localhost:8001/im/group?access_token=123

#### 新建群组
POST /im/group
{
  "name": "",
  "remark": "",
  "group_owner": "",
  "members": [
    {"id": "", "nickname": ""},
  ],
}

curl -v -X POST -H 'Content-type:application/json' -d '{\"name\":\"第一个群\",\"remark\":\"昵称\",\"group_owner\":\"123\",\"members\":[{\"id\":\"123\",\"nickname\":\"群主\"},{\"id\":\"123\"}]}' http://localhost:8001/im/group?access_token=123

### 修改群信息
PUT /im/group/{id}
{
  "name": "",
  "remark": "",
  "group_owner": "",
}

curl -v -X PUT -H 'Content-type:application/json' -d '{\"name\": \"修改后的name\"}' http://localhost:8001/im/group/78c8291c-a80d-11ea-84c0-54e1ad77c3de?access_token=123

#### 解散群组
DELETE /im/group/{id}

curl -v -X DELETE -H 'Content-type:application/json'  http://localhost:8001/im/group/78c8291c-a80d-11ea-84c0-54e1ad77c3de?access_token=123

POST /im/groups/_delete
{
  "ids": ["group_id"]
}


#### 群成员列表
GET /im/group/{group_id}/member
curl -v -X GET http://localhost:8001/im/group/97f3a6a4-a807-11ea-abf6-54e1ad77c3de/member?access_token=123


#### 加入群组
POST /im/group/{group_id}/member
{
  "members": [
    {"id", "", "nickname": ""},
  ]
}
curl -v -X POST -H 'Content-type:application/json' -d '{\"members\": [{\"id\":\"456\", \"nickname\": \"昵称2\"}]}' http://localhost:8001/im/group/97f3a6a4-a807-11ea-abf6-54e1ad77c3de/member?access_token=123

#### 修改成员信息
PUT /im/group/{group_id}/member/{member_id}
{
  "nickname": ""
}

curl -v -X PUT -H 'Content-type:application/json' -d '{\"nickname\": \"super mm\"}' http://localhost:8001/im/group/97f3a6a4-a807-11ea-abf6-54e1ad77c3de/member/123?access_token=123

#### 退出群组
DELETE /im/group/{group_id}/member/{member_id}

curl -v -X DELETE http://localhost:8001/im/group/97f3a6a4-a807-11ea-abf6-54e1ad77c3de/member/123?access_token=123

POST /im/group/{group_id}/members/_delete
{
  "ids": ["member_id"]
}



### ws信息管理
实现原理是webscoket, 原则是每个用户创建一个socket, 通过参数判断信息类型


#### 聊天信息
信息类型

#### 连接
/ws/{stream_type}/{user_id}?access_token={access_token}

##### im聊天信息

客户端发送
```
{
  "info_type": "send_common",
  "session_flag": "",
  "message": "",
}
{
  "info_type": "send_im",
  "session_flag": "", // 客户端临时唯一标识, 用来标识一次或多次会话
  "group": "",
  "type": "", // text bin
  "message": "",
  "meta": "",
}

{
  "info_type": "result_im_receive",
  "id": "",
}
```

客户端接收
```
{
  "info_type": "receive_common",
  "session_flag": "",
  "message": "",
}

{
  "info_type": "result_im_send",
  "resule": true,
  "id" : "123",
  "session_flag": "", // 临时标识
}

{
  "info_type": "receive_im",
  "id": "",
  "group": "",
  "owner": "",
  "type": "",
  "message": "",
  "meta": "",
}
```


#### 重发消息
客户端实现


# 遇到的坑

## 服务端如何管理socket连接
1. 单线程情况下使用全局缓存
2. 多线程、多进程、多机器时如何处理？