from typing import cast
import json
from tornado.websocket import WebSocketHandler, WebSocketError, WebSocketClosedError
from base.log import Log
from const import ws_prefix, stream_type_im
from im_exceptions import WSInvalidMessageException, WSRuntimeException
from ws import get_ws_input, WsInput, WsOutput
from im_types.im_handler_content import ImHandlerContent
from im_types.ws_handler_writer import WsHandlerWriter
from ws.receive_common import ReceiveCommon
from ws_handler_cache import get_ws_handler, cache_ws_handler, remove_ws_handler


wslog = Log()

class WsHandler(WebSocketHandler, ImHandlerContent, WsHandlerWriter):
    def check_origin(self, origin):
        return True

    def open(self):
        wslog.print('on open')
        user_id = self._get_user_id()
        access_token = self._get_access_token()
        wslog.print(user_id, access_token)

        # 验证用户有效性和token信息
        if not user_id or not access_token:
            return self.close()

        self.user_id = user_id
        self.access_token = access_token
        self.stream_type = stream_type_im
        cache_ws_handler(self.stream_type, self.user_id, self)

    async def on_message(self, message):
        wslog.print('get message')
        wslog.print(message)
        ipt = None

        try:
            ipt = get_ws_input(message, cast(ImHandlerContent, self))
        except WSInvalidMessageException as err:
            return self.write_message(cast(WsOutput, ReceiveCommon(str(err))))

        try:
            await ipt.process_message()
            opt = ipt.get_output()
            if opt:
                return self.write_message(opt)
        except WSRuntimeException as err:
            return self.write_message(cast(WsOutput, ReceiveCommon(str(err))))

    def on_close(self):
        wslog.print('on close')
        remove_ws_handler(self.stream_type, self.user_id, self)

    def write_message(self, msg: WsOutput):
        chunk = msg.output()
        return super().write_message(chunk)

    def _get_user_id(self):
        return self.request.path.replace(f'{ws_prefix}/{stream_type_im}/', '')

    def _get_access_token(self):
        return self.request.query_arguments.get('access_token')
