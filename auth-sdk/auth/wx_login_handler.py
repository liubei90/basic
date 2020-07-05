import uuid
import time
import json
import traceback
from tornado.web import RequestHandler
from tornado.httpclient import AsyncHTTPClient, HTTPRequest, HTTPResponse, HTTPClientError
from tornado.simple_httpclient import HTTPTimeoutError
from basic_common.jwt import create_jwt
# from basic_common.handler_payload import PayloadHandler
from basic_common.base.log import Log
from basic_common.jwt import create_jwt
from config import configs
from auth.wx_util import WXApi, create_wx_user_name, get_appid
from auth.model.m_auth_user import MAuthUserT, MAuthUser
from auth.model.m_auth_wx_auth import MAuthWXAuthT, MAuthWXAuth
from auth.model.m_auth_wx_sessions import MAuthWXSessionsT, MAuthWXSessions


log = Log()

class AuthWXLoginHandler(RequestHandler):
    async def get(self):
        code = self.get_argument('code')
        print('wx code:', code)

        # 获取用户openid
        wx_api = WXApi()
        session = await wx_api.code2session(code)

        # 如果失败，返回失败
        if not session or 'openid' not in session or 'session_key' not in session:
            self.set_status(401)
            return self.write({ 'status': True, 'msg': '用户登录失败', 'data': None })


        openid = session['openid']
        session_key = session['session_key']
        wx_auth = MAuthWXAuth()
        wx_auth_t = await wx_auth.get_wx_auth_by_openid(openid)

        # 如果是新用户，新建用户【auth_user】【auth_wx_auth】
        if not wx_auth_t:
            # 创建用户
            user_t = MAuthUserT()
            user_t.id = str(uuid.uuid1())
            user_t.user_name = create_wx_user_name(code)
            user_t.source = 'wx'

            user = MAuthUser()
            await user.insert_user(user_t)

            # 创建wx用户
            wx_auth_t = MAuthWXAuthT()
            wx_auth_t.id = str(uuid.uuid1())
            wx_auth_t.user_id = user_t.id
            wx_auth_t.app_id = get_appid()
            wx_auth_t.open_id = openid

            wx_auth = MAuthWXAuth()
            await wx_auth.insert(wx_auth_t)


        # 生成jwt, sessionkey【auth_wx_sessions】
        expire_second = configs['wx']['expire_second']
        wx_session_t = MAuthWXSessionsT()
        wx_session_t.id = str(uuid.uuid1())
        wx_session_t.user_id = wx_auth_t.user_id
        wx_session_t.open_id = openid
        wx_session_t.session_key = session_key
        wx_session_t.expire = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time() + expire_second))
        access_token = create_jwt({
            'session_id': wx_session_t.id,
            'user_id': wx_auth_t.user_id,
            'expire_date': wx_session_t.expire,
            'source': 'wx'
        })
        wx_session_t.jwt = access_token

        ws_session = MAuthWXSessions()
        await ws_session.insert(wx_session_t)

        # 返回成功，返回jwt
        return self.write({ 'status': True, 'msg': '用户登录成功', 'data': { 'access_token': access_token, 'expire': expire_second } })
