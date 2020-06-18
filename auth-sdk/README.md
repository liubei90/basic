# auth-sdk
提供基础的用户登陆能力

## 功能
1. 基础的用户名、密码登陆方式
2. 用户手机号登陆
3. 第三方登陆

## 使用方法
接口方式接入

### 注册接口
POST /auth/regist
{
  "user_name": "用户名/手机号",
  "password": "密码",
  "phone": "",
  "email": "",
  "sex": 1,
}

### 验证用户是否存在
POST /user/isexists
{
  "name": ""
}

### 登录接口
POST /auth/login
{
  "name": "用户名/手机号",
  "password": "密码"
}


### 通过access_token获取用户信息
GET /auth/verification?access_token=123

### 退出接口
GET /auth/logout?access_token=123


AppID(小程序ID)wx97bc158106e9d0a6
AppSecret(小程序密钥)f1c94eeaf6d8df47685c1d4c439d1973