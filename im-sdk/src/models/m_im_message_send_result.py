from typing import List
from base.utils import dict2class
from config import configs
from .m_dao import MDao


class MImMessageSendResultT():
    id: str = None
    message_id: str = None
    owner_group: str = None
    owner_member: str = None
    receiver_member: str = None
    create_on: str = None
    update_on: str = None
    is_deleted: int = None


class MImMessageSendResult():
    def __init__(self):
        self._db = MDao(configs['db']['sdk'])

    async def insert_message_send_result(self, args: MImMessageSendResultT):
        sql = '''
        insert into im_message_send_result (id, message_id, owner_group, owner_member, receiver_member) values
        (%s, %s, %s, %s, %s);
        '''
        return await self._db.dml(sql, [
            args.id,
            args.message_id,
            args.owner_group,
            args.owner_member,
            args.receiver_member,
        ])

    async def query_message_send_results(self, args):
        pass
