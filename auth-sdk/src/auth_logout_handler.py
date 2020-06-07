from basic_common.handler_payload import HandlerPayload
from basic_common.base.log import Log
from model.m_auth_sessions import MAuthSessions, MAuthSessionsT


alog = Log()

class AuthLogoutHandler(HandlerPayload):
    async def post(self):
        access_token = self.get_query_argument('access_token')
        mas = MAuthSessions()
        session = await mas.get_session_by_id(access_token)

        if session:
            session.is_deleted = 1
            await mas.update_session(session)

        return self.write({'status': True, 'msg': 'ok', 'data': []})