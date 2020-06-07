import asyncio
import json
from tornado.web import RequestHandler

class HandlerPayload(RequestHandler):
    payload: dict = {}

    async def prepare(self):
        fut = super().prepare()

        if asyncio.coroutines.iscoroutine(fut):
            await fut

        if 'application/json' in self.request.headers.get('Content-type', '') and self.request.body:
            res = '{}'
            print(self.request.body)
            try:
                res = self.request.body.decode('utf-8')
            except:
                res = self.request.body.decode('gbk')

            print(res)
            self.payload = json.loads(res) or {}
