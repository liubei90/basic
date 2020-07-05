from typing import List, Dict, Optional
from config import configs
from basic_common.m_dao import MDao
from basic_common.base.utils import dict2class


class MAuthWXSessionsT():
    id: str
    user_id: str
    open_id: str
    session_key: str
    expire: str
    jwt: str
    create_on: str = None
    update_on: str = None
    is_deleted: int = None


class MAuthWXSessions():
    def __init__(self):
        self._db = MDao(configs['db']['auth'])

    async def insert(self, session: MAuthWXSessionsT):
        sql = '''
        insert into auth_wx_sessions (id, user_id, open_id, session_key, expire, jwt) values
        (%s, %s, %s, %s, %s, %s);
        '''
        params = (session.id, session.user_id, session.open_id, session.session_key, session.expire, session.jwt)

        return await self._db.dml(sql, params)

    async def get_session_by_id(self, id: str) -> MAuthWXSessionsT:
        sql = '''
        select * from auth_wx_sessions where id = %s and is_deleted = 0;
        '''
        params = (id, )
        res = await self._db.query(sql, params)

        if len(res) > 0:
            return dict2class(MAuthWXSessionsT, res[0])

