import json
import furl
from tornado.httpclient import AsyncHTTPClient, HTTPRequest, HTTPResponse

from auth.getAccessToken import getAccessToken


async def wxrequest(url, data=None, params=None, method = 'POST'):
    at = await getAccessToken()

    if not at:
        return False, None, None

    nurl = furl.furl(url)
    nurl.add({ 'access_token': at, **(params if params else {}) })

    client = AsyncHTTPClient()
    res = await client.fetch(HTTPRequest(
        url=nurl.url,
        method=method,
        body=json.dumps(data, ensure_ascii=True) if data else None
    ))

    print(res.body)

    if res.code == 200:
        jsonres = None
        try:
            jsonres = json.loads(res.body.decode('utf8'))
        except:
            pass

        return True, jsonres, res.body

    return False, None, None
