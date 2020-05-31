import uuid
from typing import cast
from ws_handler_cache import get_ws_handler
from im_types.im_handler_content import ImHandlerContent
from im_types.ws_handler_writer import WsHandlerWriter
from im_types.ws_input import WsInput
from im_types.ws_output import WsOutput
from models.m_im_message import MImMessage, MImMessageT
from models.m_im_message_send_result import MImMessageSendResult, MImMessageSendResultT
from .result_im_send import ResultImSend
from .receive_im import ReceiveIM

class SendIM(WsInput):
    info_type = 'send_im'
    _msg_t: MImMessageT = None
    _msg: dict = None
    _content: ImHandlerContent = None

    def __init__(self, msg: dict, content: ImHandlerContent):
        self._msg = msg
        self._content = content
    
    def verify_message(self):
        pass

    async def process_message(self):
        self._create_msg_t()
        await self._save_message()
        await self._send_im_messages_to_group_members()

    def get_output(self) -> ResultImSend:
        return ResultImSend(self._msg_t.id, self._msg.get('session_flag'))

    async def _save_message(self):
        mmessage = MImMessage()
        return await mmessage.insert_message(self._msg_t)

    async def _send_im_messages_to_group_members(self):
        stream_type = self._content.stream_type
        # user_id = self._content.user_id

        if self._msg_t.message_type == 'text':
            message = self._msg_t.tmessage
        else:
            message = self._msg_t.bmessage.decode('utf-8')

        opt = cast(WsOutput, ReceiveIM(self._msg_t.id, 
                                        self._msg_t.owner_group,
                                        self._msg_t.owner_member,
                                        self._msg_t.message_type,
                                        message,
                                        self._msg_t.meta))

        handlers = get_ws_handler(stream_type, 'yonghu2')
        for h in handlers:
            hw = cast(WsHandlerWriter, h)
            hw.write_message(opt)

    def _create_msg_t(self):
        self._msg_t = MImMessageT()
        msg_t = self._msg_t
        msg_t.id = str(uuid.uuid1())
        msg_t.owner_group = '123'
        msg_t.owner_member = self._content.user_id

        mtype = self._msg.get('type', 'text')
        if mtype == 'text':
            msg_t.tmessage = self._msg.get('message')
        else:
            msg_t.bmessage = str(self._msg.get('message', '')).encode('utf-8')

        msg_t.message_meta = self._msg.get('meta')
        msg_t.message_type = mtype
        msg_t.status = 0
