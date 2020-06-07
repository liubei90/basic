import time
from basic_common.handler_payload import HandlerPayload
from basic_common.base.log import Log
from basic_common.base.utils import class2dict
from model.m_auth_sessions import MAuthSessions, MAuthSessionsT
from model.m_auth_user import MAuthUser, MAuthUserT


alog = Log()

class AuthVerificationHandler(HandlerPayload):
    async def get(self):
        access_token = self.get_query_argument('access_token')
        mas = MAuthSessions()
        session = await mas.get_session_by_id(access_token)

        if not session:
            return self.write({'status': False, 'msg': '用户未登录', 'data': []})

        # 验证session有效性
        expire = session.expire
        if expire and time.time() > time.mktime(time.strptime(expire, '%Y-%m-%d %H:%M:%S')):
            return self.write({'status': False, 'msg': '用户登录信息已过期', 'data': []})

        mau = MAuthUser()
        user_detail = await mau.get_user_by('id', session.user_id)

        if not user_detail:
            return self.write({'status': False, 'msg': '用户未登录', 'data': []})

        return self.write({'status': True, 'msg': 'ok', 'data': class2dict(user_detail)})
