from typing import List
from base.utils import dict2class
from config import configs
from .m_dao import MDao

class MImGroupT():
    id: str
    name: str
    remark: str
    group_owner: str
    create_on: str
    update_on: str
    is_deleted: int


class MImGroup():
    def __init__(self):
        self._db = MDao(configs['db']['sdk'])

    async def insert_group(self, grp: MImGroupT):
        sql = '''
        insert into im_group (id, name, remark, group_owner) values
        (%s, %s, %s, %s);
        '''
        params = (grp.id, grp.name, grp.remark, grp.group_owner)
        return await self._db.dml(sql, params)

    async def get_groups_by_ids(self, ids: List[str]) -> List[MImGroupT]:
        if len(ids) < 1:
            return []

        ph = ','.join(['%s' for _ in ids])
        sql = f'''
        select * from im_group where id in ({ph}) and is_deleted = 0;
        '''
        res = await self._db.query(sql, params=ids)
        return [dict2class(MImGroupT, r) for r in res]

    async def update_group(self, grp:MImGroupT):
        sql = '''
        update im_group
        set name = %s,
        remark = %s,
        group_owner = %s,
        is_deleted = %s
        where id = %s;
        '''
        params = (grp.name, grp.remark, grp.group_owner, grp.is_deleted, grp.id)
        return await self._db.dml(sql, params)
