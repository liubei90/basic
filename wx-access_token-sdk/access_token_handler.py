from typing import cast
import uuid
import json
import time
import traceback
from tornado.web import RequestHandler
from tornado.httpclient import AsyncHTTPClient, HTTPRequest, HTTPResponse
from basic_common.base.log import Log
from m_wx_access_token import MWXAccessTokenT, MWXAccessToken


class AccessTokenHandler(RequestHandler):
    async def get(self):
        appid = self.get_argument('appid', None)
        secret = self.get_argument('secret', None)
        # self.set_header('Content-Type', 'application/json;charset=utf-8')

        if not appid or not secret:
            return self.write({ 'status': False, 'msg': '缺少参数', 'data': None })

        access_token = MWXAccessToken()

        token = await access_token.get_access_token(appid)

        if token:
            exp = time.mktime(time.strptime(token.expires_date, '%Y-%m-%d %H:%M:%S'))

            # 提前5分钟刷新token
            if exp < (time.time() - (5 * 60)):
                token = None

        if not token:
            res, body = await self.fetch_access_token(appid, secret)

            if not res or ('errcode' in res and res['errcode'] != 0) or 'access_token' not in res:
                return self.write({ 'status': False, 'msg': res or '获取失败', 'data': None })

            token = MWXAccessTokenT()
            token.id = str(uuid.uuid1())
            token.appid = appid
            token.grant_type = 'client_credential'
            token.access_token = res.get('access_token')
            token.expires_in = int(res.get('expires_in'))
            token.expires_date = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time() + token.expires_in))
            token.content = body

            await access_token.insert_access_token(token)

        return self.write({ 'status': True, 'msg': 'token获取成功', 'data': token.access_token })


    async def fetch_access_token(self, appid, secret):
        url = f'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={appid}&secret={secret}'
        req = HTTPRequest(url, method='GET')
        client = AsyncHTTPClient()
        res = await client.fetch(req)
        res = cast(HTTPResponse, res)

        if res.code != 200:
            return None, None

        return json.loads(res.body.decode('utf-8')), res.body
