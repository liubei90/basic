import json
from tornado.httpclient import AsyncHTTPClient, HTTPRequest, HTTPResponse

from auth.getAccessToken import getAccessToken


async def send(data):
    at = await getAccessToken()

    if not at:
        return False

    # POST https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=ACCESS_TOKEN
    client = AsyncHTTPClient()
    res = await client.fetch(HTTPRequest(
        url=f'https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token={at}',
        method='POST',
        body=json.dumps(data)
    ))

    print(res.body)
    if res.code == 200:
        return True

    return False
