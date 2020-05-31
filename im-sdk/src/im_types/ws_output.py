import abc

class WsOutput(abc.ABC):
    @abc.abstractmethod
    def output(self) -> str:
        ...