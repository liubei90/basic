from typing import List
from base.utils import dict2class
from config import configs
from .m_dao import MDao

class MImMessageT():
    id: str = None
    owner_group: str = None
    owner_member: str = None
    tmessage: str = None
    bmessage: bytes = None
    message_meta: str = None
    message_type: str = None
    status: int = None
    create_on: str = None
    update_on: str = None
    is_deleted: int = None


class MImMessage():
    def __init__(self):
        self._db = MDao(configs['db']['sdk'])

    async def insert_message(self, args:MImMessageT):
        sql = '''
        insert into im_message (id, owner_group, owner_member, tmessage, bmessage, message_meta, message_type, status) values
        (%s, %s, %s, %s, %s, %s, %s, %s);
        '''
        dtype = args.message_type
        return await self._db.dml(sql, [
            args.id,
            args.owner_group,
            args.owner_member,
            args.tmessage,
            args.bmessage,
            args.message_meta,
            args.message_type,
            args.status,
        ])

    async def query_message_by_id(self, ids: List[str]) -> List[MImMessageT]:
        ph = ','.join(['%s' for _ in ids])
        sql = f'''
        select * from im_message where id in ({ph});
        '''
        res = await self._db.query(sql, ids)
        return [dict2class(MImMessageT, i) for i in res]

    async def update_message_status(self, id, status):
        sql = '''
        update im_message set status = %s where id = %s;
        '''
        return await self._db.dml(sql, [id, status])
