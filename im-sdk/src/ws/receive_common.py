import json
from im_types.ws_output import WsOutput

class ReceiveCommon(WsOutput):
    def __init__(self, message):
        self._message = message

    def output(self):
        return json.dumps({
            'info_type': 'receive_common',
            'message': self._message
        })