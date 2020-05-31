from typing import cast, Union
import json
from im_exceptions import WSInvalidMessageException
from im_types.im_handler_content import ImHandlerContent
from im_types.ws_input import WsInput
from im_types.ws_output import WsOutput
from .send_common import SendCommon
from .send_im import SendIM
from .result_im_receive import ResultImReceive

input_arr = [SendCommon, SendIM, ResultImReceive]
inputTMap = { i.info_type: i for i in input_arr }

def get_ws_input(message: Union[str, bytes], content: ImHandlerContent) -> WsInput:
    if not message:
        raise WSInvalidMessageException('消息不能为空')

    msg = None

    try:
        msg = json.loads(message)
    except:
        raise WSInvalidMessageException('不可用的消息格式')

    if 'info_type' not in msg or not msg['info_type']:
        raise WSInvalidMessageException('缺少参数（info_type）')

    info_type = msg['info_type']
    inputT = inputTMap[info_type]

    if not inputT:
        raise WSInvalidMessageException(f'不可用的info_type（{info_type}）')

    input_ins = cast(WsInput, inputT(msg, content))
    input_ins.verify_message()
    return input_ins

