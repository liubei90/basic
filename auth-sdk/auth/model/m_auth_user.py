from typing import List, Dict, Optional
from config import configs
from basic_common.m_dao import MDao
from basic_common.base.utils import dict2class


class MAuthUserT():
    id: str
    user_name: str
    source: str = None
    phone: str = None
    email: str = None
    sex: int = None
    create_on: str = None
    update_on: str = None
    is_deleted: int = None


class MAuthUser():
    def __init__(self):
        self._db = MDao(configs['db']['auth'])

    async def insert_user(self, user: MAuthUserT):
        sql = '''
        insert into auth_user (id, user_name, source, phone, email, sex) values 
        (%s, %s, %s, %s, %s, %s);
        '''
        params = (user.id, user.user_name, user.source, user.phone, user.email, user.sex)
        return await self._db.dml(sql, params)

    async def update_user(self, user: MAuthUserT):
        sql = '''
        update auth_user 
        set user_name = %s,
            phone = %s,
            email = %s,
            sex = %s,
            is_deleted = %s
        where id = %s;
        '''
        params = (user.user_name, user.phone, user.email, user.sex, user.is_deleted, user.id)
        return await self._db.dml(sql, params)

    async def get_user_by(self, column_name: str, column_value: str) -> Optional[MAuthUserT]:
        sql = f'''
        select * from auth_user where {column_name} = %s and is_deleted = 0;
        '''
        params = (column_value, )
        res = await self._db.query(sql, params)

        if len(res) > 0:
            return dict2class(MAuthUserT, res[0])
