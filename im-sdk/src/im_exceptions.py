class WSInvalidMessageException(Exception):
    def __init__(self, value):
        self.value = value

    def __str__(self):
        return repr(self.value)
    
    def __repr__(self):
        return self.__str__()

class WSRuntimeException(WSInvalidMessageException):
    pass