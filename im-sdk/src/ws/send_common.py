from im_types.im_handler_content import ImHandlerContent
from im_types.ws_input import WsInput

class SendCommon(WsInput):
    info_type = 'send_common'

    def __init__(self, msg: dict, content: ImHandlerContent):
        self._msg = msg
        self._content = content

    def verify_message(self):
        pass

    async def process_message(self):
        pass