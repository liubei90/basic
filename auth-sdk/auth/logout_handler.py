from basic_common.handler_user_detail import AuthorizationHandler
from basic_common.base.log import Log
from auth.model.m_auth_sessions import MAuthSessions, MAuthSessionsT


alog = Log()

class AuthLogoutHandler(AuthorizationHandler):
    async def get(self):
        session_id = self.authorization.get('session_id')
        mas = MAuthSessions()
        session = await mas.get_session_by_id(session_id)

        print('session', session)

        if session:
            session.is_deleted = 1
            await mas.update_session(session)

        return self.write({'status': True, 'msg': 'ok', 'data': []})