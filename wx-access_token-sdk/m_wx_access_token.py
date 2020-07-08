from typing import Optional, List
from config import configs
from basic_common.m_dao import MDao
from basic_common.base.utils import dict2class


class MWXAccessTokenT():
    id: str
    appid: str
    grant_type: str
    access_token: str
    expires_in: int
    expires_date: str
    content: str
    create_on: str
    update_on: str
    is_deleted: int


class MWXAccessToken():
    def __init__(self) -> None:
        self._db = MDao(configs['db']['wx'])

    async def get_access_token(self, appid: str) -> Optional[MWXAccessTokenT]:
        '''
        获取最新更新的一条token
        '''
        sql = '''
        select * from wx_access_token where appid = %s and is_deleted = 0 order by create_on limit 1;
        '''
        params = (appid, )
        res = await self._db.query(sql, params)

        if res and len(res) > 0:
            return dict2class(MWXAccessTokenT, res[0])

    async def insert_access_token(self, token_t: MWXAccessTokenT) -> None:
        sql = '''
        insert into wx_access_token (id, appid, grant_type, access_token, expires_in, expires_date, content) values
        (%s, %s, %s, %s, %s, %s, %s);
        '''
        params = (token_t.id, token_t.appid, token_t.grant_type, token_t.access_token, token_t.expires_in, token_t.expires_date, token_t.content)
        return await self._db.dml(sql, params)
