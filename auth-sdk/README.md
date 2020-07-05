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

curl -X POST  -H "Content-type:application/json" -d '{\"user_name\": \"lb90123\",\"password\": \"123123\",\"sex\": 1}' http://127.0.0.1:8001/auth/regist

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

curl -X POST  -H "Content-type:application/json" -d '{\"name\": \"lb90123\",\"password\": \"123123\"}' http://127.0.0.1:8001/auth/login


### 通过access_token获取用户信息
GET /auth/verification?access_token=123

### 退出接口
GET /auth/logout?access_token=123

curl -X GET  -H "Authorization:Bearer eyJhbGciOiAiSFMyNTYifQ==.eyJzZXNzaW9uX2lkIjogIjBkZDFlNmUyLWJlMDMtMTFlYS1hZjc2LTU0ZTFhZDc3YzNkZSIsICJleHBpcmVfZGF0ZSI6ICIyMDIwLTA3LTA0IDIzOjMxOjMxIiwgInVzZXJfaWQiOiAiNmViNTNjM2EtYmUwMi0xMWVhLWJiNzAtNTRlMWFkNzdjM2RlIn0=.6tC99L3ke0FAyDvYmcvPGNLiACRnL1oRnHtN_K8prcI=" http://127.0.0.1:8001/auth/logout


# 微信登录接口

GET /auth/wx-login?code=123345

# 内部接口

## 通过token中的payload获取用户详细信息
POST /user-detail
{
  payload
}

curl -X POST  -H "Content-type:application/json" -d '{\"user_id\": \"6eb53c3a-be02-11ea-bb70-54e1ad77c3de\"}' http://127.0.0.1:10010/user-detail

## 验证jwt是否有效
POST /verify-authorization
{
  payload
}
