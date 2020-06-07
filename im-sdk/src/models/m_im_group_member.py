from typing import List, Dict, Optional
from base.utils import dict2class
from config import configs
from .m_dao import MDao

class MImGroupMemberT():
    id: str
    group_id: str
    member_id: str
    member_nickname: str
    create_on: str
    update_on: str
    is_deleted: int


class MImGroupMember():
    def __init__(self):
        self._db = MDao(configs['db']['sdk'])

    async def insert_members(self, members: List[MImGroupMemberT]):
        if len(members) < 1:
            return 0

        sql = '''
        insert into im_group_member (id, group_id, member_id, member_nickname) values
        (%s, %s, %s, %s);
        '''
        params = [(m.id, m.group_id, m.member_id, m.member_nickname) for m in members]
        return await self._db.dml(sql, params, many=True)

    async def update_member(self, member: MImGroupMemberT):
        sql = '''
        update im_group_member 
        set group_id = %s,
            member_id = %s,
            member_nickname = %s,
            is_deleted = %s
        where id = %s;
        '''
        params = (member.group_id, member.member_id, member.member_nickname, member.is_deleted, member.id)
        return await self._db.dml(sql, params)

    async def get_member_by_member_id_in_group(self, group_id: str, member_id: str) -> Optional[MImGroupMemberT]:
        sql = '''
        select * from im_group_member where group_id = %s and member_id = %s and is_deleted = 0;
        '''
        params = (group_id, member_id)
        res = await self._db.query(sql, params)

        if len(res) > 0:
            return dict2class(MImGroupMemberT, res[0])

    async def get_members_by_group_id(self, group_id: str) -> List[MImGroupMemberT]:
        sql = '''
        select * from im_group_member where group_id = %s and is_deleted = 0;
        '''
        params = (group_id, )
        res = await self._db.query(sql, params)
        return [dict2class(MImGroupMemberT, r) for r in res]

    async def get_members_by_group_ids(self, group_ids: List[str]) -> Dict[str, List[MImGroupMemberT]]:
        if len(group_ids) < 1:
            return []

        ph = ','.join(['%s' for _ in group_ids])
        sql = f'''
        select * from im_group_member where group_id in ({ph}) and is_deleted = 0;
        '''
        res = await self._db.query(sql, group_ids)
        res = [dict2class(MImGroupMemberT, r) for r in res]

        mres = {}

        for r in res:
            if r.group_id not in mres:
                mres[r.group_id] = []

            mres[r.group_id].append(r)
        
        return mres

    async def get_group_ids_by_member_id(self, user_id: str) -> List[str]:
        sql = '''
        select distinct group_id from im_group_member where member_id = %s and is_deleted = 0;
        '''
        params = (user_id, )
        res = await self._db.query(sql, params)
        return [r['group_id'] for r in res]
