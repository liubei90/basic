import json
import uuid
from tornado.web import RequestHandler
from tornado.httpclient import AsyncHTTPClient, HTTPRequest, HTTPResponse

class CustomerServiceMessageReceiver(RequestHandler):
    async def get(self):
        print(self.request.arguments)
        print(self.request.headers)
        print(self.request.body)
