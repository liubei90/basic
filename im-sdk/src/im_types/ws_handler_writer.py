import abc
from .ws_output import WsOutput

class WsHandlerWriter(abc.ABC):
    @abc.abstractmethod
    def write_message(self, msg: WsOutput):
        ...