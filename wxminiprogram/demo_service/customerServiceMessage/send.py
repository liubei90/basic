import json
from tornado.httpclient import AsyncHTTPClient, HTTPRequest, HTTPResponse

from auth.getAccessToken import getAccessToken

async def send(data):
    at = await getAccessToken()

    if not at:
        return False

    # https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=ACCESS_TOKEN
    client = AsyncHTTPClient()
    res = await client.fetch(HTTPRequest(
        url=f'https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token={at}',
        method='POST',
        body=json.dumps(data, ensure_ascii=True)
    ))

    print(res.body)
    if res.code == 200:
        return True

    return False