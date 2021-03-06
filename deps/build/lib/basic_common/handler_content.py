import asyncio
from tornado.web import RequestHandler
from module import get_module, Module
from jwt import parse_jwt

def get_access_token(request) -> str:
    '''
    获取用户token
    '''
    # return self.get_argument('access_token')
    auth = request.headers.get('Authorization')

    if auth and 'Bearer ' == auth[0:7]:
        return parse_jwt(auth[7:])


class AuthorizationHandler(RequestHandler):
    '''
    拿到Authorization中的payload
    不做过期校验，给模块内部接口使用
    '''
    authorization: dict

    async def prepare(self):
        fut = super().prepare()

        if asyncio.coroutines.iscoroutine(fut):
            await fut
        
        self.authorization = get_access_token(self.request)

        if not self.authorization:
            self.set_status(401)
            return self.finish()

class UserDetailHandler(RequestHandler):
    '''
    拿到Authorization中的payload，请求auth模块，获得用户详情
    '''
    user_detail: dict

    async def prepare(self):
        fut = super().prepare()

        if asyncio.coroutines.iscoroutine(fut):
            await fut

        # 拿到Authorization中的payload
        payload = get_access_token(self.request)

        if not payload:
            self.set_status(401)
            self.write({ 'status': False, 'msg': '登录信息有误', 'data': None })
            return self.finish()

        self.user_detail = await self.get_user_detail(payload)

        # 获取用户详情失败
        if not self.user_detail or '_error' in self.user_detail:
            err = self.user_detail['_error']
            self.set_status(401)
            self.write({ 
                'status': False, 
                'msg': err['msg'] or '获取用户详细信息失败', 
                'data': None })
            return self.finish()

    async def get_user_detail(self, payload: dict) -> dict:
        auth_sdk = await get_module('auth-sdk')
        return await auth_sdk.fetch_data('user-detail', payload)

