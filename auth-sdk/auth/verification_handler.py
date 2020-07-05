import time
from basic_common.handler_internal import InternalHandler
from basic_common.handler_payload import PayloadHandler
from basic_common.base.log import Log
from auth.model.m_auth_sessions import MAuthSessions, MAuthSessionsT
from auth.model.m_auth_user import MAuthUser, MAuthUserT
from auth.model.m_auth_wx_sessions import MAuthWXSessions, MAuthWXSessionsT


alog = Log()

class AuthVerificationHandler(InternalHandler, PayloadHandler):
    '''
    这是一个内部接口
    '''
    async def post(self):
        source = self.payload.get('source')

        if source == 'web':
            return await self.verify_web()
        elif source == 'wx':
            return await self.verify_wx()

    async def verify_web(self):
        session_id = self.payload.get('session_id')
        expire_date = self.payload.get('expire_date')
        user_id = self.payload.get('user_id')
        mas = MAuthSessions()
        session = await mas.get_session_by_id(session_id)

        if not session:
            return self.write({ 'status': False, 'msg': '用户未登录', 'data': None })

        # 验证session有效性
        expire = session.expire
        if expire and time.time() > time.mktime(time.strptime(expire, '%Y-%m-%d %H:%M:%S')):
            return self.write({ 'status': False, 'msg': '用户登录信息已过期', 'data': None })

        return self.write({ 'status': True, 'msg': 'ok', 'data': None })

    async def verify_wx(self):
        session_id = self.payload.get('session_id')
        expire_date = self.payload.get('expire_date')
        wx_session = MAuthWXSessions()
        wx_session_t = await wx_session.get_session_by_id(session_id)

        if not wx_session_t:
            return self.write({ 'status': False, 'msg': '用户未登录', 'data': None })

        # 使用过期时间的方式可能会造成，微信方已经过期，本地session不过期
        # https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/signature.html
        expire = wx_session_t.expire
        if expire and time.time() > time.mktime(time.strptime(expire, '%Y-%m-%d %H:%M:%S')):
            return self.write({ 'status': False, 'msg': '用户登录信息已过期', 'data': None })

        return self.write({ 'status': True, 'msg': 'ok', 'data': None })
