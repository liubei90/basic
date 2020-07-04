import time
from basic_common.handler_internal import InternalHandler
from basic_common.handler_payload import PayloadHandler
from basic_common.base.log import Log
from auth.model.m_auth_sessions import MAuthSessions, MAuthSessionsT
from auth.model.m_auth_user import MAuthUser, MAuthUserT


alog = Log()

class AuthVerificationHandler(InternalHandler, PayloadHandler):
    '''
    这是一个内部接口
    '''
    async def post(self):
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
