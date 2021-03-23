import json
from wxrequest import wxrequest


async def send(data):
    url = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/uniform_send'

    status, result, _ = await wxrequest(url, data)

    if status:
        result = json.loads(result.decode('utf8'))

        if 'errcode' in result and result['errcode'] != 0:
            return False

    return status
