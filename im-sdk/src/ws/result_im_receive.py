import uuid
from im_types.im_handler_content import ImHandlerContent
from im_types.ws_input import WsInput
from models.m_im_message_send_result import MImMessageSendResult, MImMessageSendResultT
from models.m_im_message import MImMessage, MImMessageT


class ResultImReceive(WsInput):
    info_type = 'result_im_receive'
    _msg_t: MImMessageSendResultT = None

    def __init__(self, msg: dict, content: ImHandlerContent):
        self._msg = msg
        self._content = content
    
    def verify_message(self):
        pass

    async def process_message(self):
        msg_detail = await self._get_message_detail()

        if msg_detail:
            self._create_message_send_result(msg_detail)
            await self._insert_result()
            await self._update_message_detail_status()

    def get_output(self):
        return None

    async def _insert_result(self):
        mres = MImMessageSendResult()
        await mres.insert_message_send_result(self._msg_t)

    async def _get_message_detail(self) -> MImMessageT:
        mmsg = MImMessage()
        res = await mmsg.query_message_by_id([self._msg_t.message_id])
        return res[0] if len(res) > 0 else None

    async def _update_message_detail_status(self):
        pass
        # mmsg = MImMessage()
        # await mmsg.update_message_status(self._msg_t.message_id)

    def _create_message_send_result(self, msg_detail: MImMessageT) -> MImMessageSendResultT:
        self._msg_t = MImMessageSendResultT()
        msg_t = self._msg_t
        msg_t.id = str(uuid.uuid1())
        msg_t.message_id = self._msg.get('id')
        msg_t.owner_group = msg_detail.owner_group
        msg_t.owner_member = msg_detail.owner_member
        msg_t.receiver_member = self._content.user_id
