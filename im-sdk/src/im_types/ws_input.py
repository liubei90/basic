import abc
from .im_handler_content import ImHandlerContent
from .ws_output import WsOutput

class WsInput(abc.ABC):
    @abc.abstractmethod
    def verify_message(self):
        '''
        验证不通过，直接抛异常
        '''
        ...

    @abc.abstractmethod
    def get_output(self) -> WsOutput:
        ...

    @abc.abstractmethod
    async def process_message(self):
        '''
        异步处理消息
        '''
        ...
