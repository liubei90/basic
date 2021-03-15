import json
import uuid
from tornado.httpclient import AsyncHTTPClient, HTTPRequest, HTTPResponse

from setting import APPID, APPSECRET
from mem_cache import access_token_cache

async def getAccessToken():
    ak = 'access_token'

    if not ak:
        return None

    cache = access_token_cache.get(ak)

    if cache:
        return cache
    else:
        # https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
        client = AsyncHTTPClient()
        res = await client.fetch(HTTPRequest(
            url=f'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={APPID}&secret={APPSECRET}'
        ))

        if res.code == 200:
            resp = json.loads(res.body)
            access_token = resp['access_token']
            expires = resp['expires_in']
            access_token_cache.set(ak, access_token, ex = expires)
            return access_token
        else:
            return None
