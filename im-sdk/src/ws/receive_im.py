import json
from im_types.ws_output import WsOutput

class ReceiveIM(WsOutput):
    info_type = 'receive_im'

    def __init__(self, id: str, group: str, owner: str, dtype: str, message: str, meta: str):
        self._id = id
        self._group = group
        self._owner = owner
        self._type = dtype
        self._message = message
        self._meta = meta

    def output(self) -> str:
        return json.dumps({
            'info_type': self.info_type,
            'id': self._id,
            'group': self._group,
            'owner': self._owner,
            'type': self._type,
            'message': self._message,
            'meta': self._meta,
        })