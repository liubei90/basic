from typing import List, Dict, Optional
from config import configs
from basic_common.m_dao import MDao
from basic_common.base.utils import dict2class


class MAuthSessionsT():
    id: str
    user_id: str
    expire: str
    jwt: str
    create_on: str
    update_on: str
    is_deleted: int


class MAuthSessions():
    def __init__(self):
        self._db = MDao(configs['db']['auth'])

    async def insert_session(self, session: MAuthSessionsT):
        sql = '''
        insert into auth_sessions (id, user_id, expire, jwt) values
        (%s, %s, %s, %a)
        '''
        params = (session.id, session.user_id, session.expire, session.jwt)
        return await self._db.dml(sql, params)

    async def update_session(self, session: MAuthSessionsT):
        sql = '''
        update auth_sessions
        set user_id = %s,
            expire = %s,
            jwt = %s,
            is_deleted = %s
        where id = %s;
        '''
        params = (session.user_id, session.expire, session.jwt, session.is_deleted, session.id)
        return await self._db.dml(sql, params)

    async def get_session_by_id(self, id) -> Optional[MAuthSessionsT]:
        sql = '''
        select * from auth_sessions where id = %s and is_deleted = 0;
        '''
        params = (id, )
        res = await self._db.query(sql, params)

        if len(res) > 0:
            return dict2class(MAuthSessionsT, res[0])
