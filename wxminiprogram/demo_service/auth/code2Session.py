import json
import uuid
from tornado.web import RequestHandler
from tornado.httpclient import AsyncHTTPClient, HTTPRequest, HTTPResponse

from setting import APPID, APPSECRET
from auth.getAccessToken import getAccessToken
from mem_cache import user_cache

class Code2Session(RequestHandler):
    async def get(self):
        self.set_header('content_type', 'application/json')
        code = self.get_argument('code', None)

        if not code:
            return self.write(json.dumps({ 'code': 1, 'status': False, 'data': None, 'msg': '缺少参数code' }))

        # GET https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
        client = AsyncHTTPClient()
        res = await client.fetch(HTTPRequest(
            url=f'https://api.weixin.qq.com/sns/jscode2session?appid={APPID}&secret={APPSECRET}&js_code={code}&grant_type=authorization_code'
        ))

        errmsg = '调用auth.code2Session失败'

        if res.code == 200:
            user_info = json.loads(res.body)
            print(user_info)
            sk = user_info.get('session_key', None)
            uid = user_info.get('unionid', None)
            oid = user_info.get('openid', None)
            errcode = user_info.get('errcode', None)
            errmsg = user_info.get('errmsg', None)

            if sk:
                user_cache.set(sk, user_info)
                return self.write(json.dumps({ 'code': 0, 'status': True, 'msg': '',
                    'data': { 'session_key': sk, 'openid': oid, 'unionid': uid }, }))

        return self.write(json.dumps({ 'code': 1, 'status': False, 'msg': errmsg, 'data': None }))

