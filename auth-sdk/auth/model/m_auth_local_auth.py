from typing import List, Dict, Optional
import hashlib
from config import configs
from basic_common.m_dao import MDao
from basic_common.base.utils import dict2class


class MAuthLocalAuthT():
    id: str
    user_id: str
    password: str
    slat: str
    create_on: str = None
    update_on: str = None
    is_deleted: int = None


class MAuthLocalAuth():
    def __init__(self):
        self._db = MDao(configs['db']['auth'])

    async def insert_auth(self, local_auth: MAuthLocalAuthT):
        sql = '''
        insert into auth_local_auth (id, user_id, password, slat) values 
        (%s, %s, %s, %s);
        '''
        params = (local_auth.id, local_auth.user_id, local_auth.password, local_auth.slat)
        return await self._db.dml(sql, params)

    async def update_auth(self, local_auth: MAuthLocalAuthT):
        sql = '''
        update auth_local_auth 
        set user_id = %s,
            password = %s,
            slat = %s,
            is_deleted = %s
        where id = %s;
        '''
        params = (local_auth.user_id, local_auth.password, local_auth.slat, local_auth.is_deleted, local_auth.id)
        return await self._db.dml(sql, params)

    async def get_auth_by_user_id(self, user_id: str) -> Optional[MAuthLocalAuthT]:
        sql = '''
        select * from auth_local_auth where user_id = %s and is_deleted = 0;
        '''
        params = (user_id, )
        res = await self._db.query(sql, params)

        if len(res) > 0:
            return dict2class(MAuthLocalAuthT, res[0])

def hash_code(s: str, slat: str):
    h = hashlib.sha256()
    s += slat
    h.update(s.encode(encoding='utf-8'))
    return h.hexdigest()
