import json
from im_types.ws_output import WsOutput

class ResultImSend(WsOutput):
    info_type = 'result_im_send'

    def __init__(self, id, session_flag):
        self._id = id
        self._session_flag = session_flag

    def output(self) -> str:
        return json.dumps({
            'info_type': self.info_type,
            'id': self._id,
            'session_flag': self._session_flag,
        })
