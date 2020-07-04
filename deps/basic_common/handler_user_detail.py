import asyncio
from tornado.web import RequestHandler
from .base.utils import get_module_data_error, get_mdoule_data
from .module import get_module, Module
from .jwt import parse_jwt

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
            self.write({ 'status': False, 'msg': '登录信息有误', 'data': None })
            return self.finish()

        verify_res = await self.verify_authorization()
        err_msg = get_module_data_error(verify_res, '登录信息有误')

        if err_msg:
            self.set_status(401)
            self.write({ 'status': False, 'msg': err_msg, 'data': None })
            return self.finish()

    async def verify_authorization(self):
        auth = await get_module('auth-sdk')
        return await auth.fetch_data('verify-authorization', self.authorization)

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

        user_detail_res = await self.get_user_detail(payload)
        err_msg = get_module_data_error(user_detail_res, '获取用户详细信息失败')
        self.user_detail = get_mdoule_data(user_detail_res)

        # 获取用户详情失败
        if err_msg or not self.user_detail:
            self.set_status(401)
            self.write({ 'status': False, 'msg': err_msg, 'data': None })
            return self.finish()


    async def get_user_detail(self, payload: dict) -> dict:
        auth_sdk = await get_module('auth-sdk')
        return await auth_sdk.fetch_data('user-detail', payload)

