from typing import List, Dict, Optional
from config import configs
from basic_common.m_dao import MDao
from basic_common.base.utils import dict2class


class MAuthWXAuthT():
    id: str
    user_id: str
    app_id: str
    open_id: str
    union_id: str = None
    create_on: str = None
    update_on: str = None
    is_deleted: str = None


class MAuthWXAuth():
    def __init__(self):
        self._db = MDao(configs['db']['auth'])

    async def insert(self, wx_auth_t: MAuthWXAuthT):
        sql = '''
        insert into auth_wx_auth (id, user_id, app_id, open_id, union_id) values
        (%s, %s, %s, %s, %s);
        '''
        params = (wx_auth_t.id, wx_auth_t.user_id, wx_auth_t.app_id, wx_auth_t.open_id, wx_auth_t.union_id)

        return await self._db.dml(sql, params)

    async def get_wx_auth_by_openid(self, openid: str) -> MAuthWXAuthT:
        sql = '''
        select * from auth_wx_auth where open_id = %s and is_deleted = 0;
        '''
        params = (openid, )
        res = await self._db.query(sql, params)

        if len(res) > 0:
            return dict2class(MAuthWXAuthT, res[0])
