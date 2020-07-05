import json
import traceback
from tornado.httpclient import AsyncHTTPClient, HTTPRequest, HTTPResponse, HTTPClientError
from tornado.simple_httpclient import HTTPTimeoutError
from basic_common.base.log import Log
from config import configs


log = Log()


def get_appid():
    return configs["wx"]["app_id"]

def create_wx_user_name(code):
    return f'wx_{code}'

def get_code2session_url(code):
    return f'{configs["wx"]["code2Session"]}?appid={configs["wx"]["app_id"]}&secret={configs["wx"]["app_secret"]}&js_code={code}&grant_type=authorization_code'


class WXApi():
    async def code2session(self, code):
        try:
            url = get_code2session_url(code)
            log.print('fetch: ', url)
            req = HTTPRequest(url, method='GET')
            client = AsyncHTTPClient()
            res = await client.fetch(req)

            if res and res.code == 200:
                log.print(res.body)
                return json.loads(res.body.decode('utf-8'))
        except Exception as err:
            log.print('网络请求异常：', traceback.format_exc())

    # async def 
