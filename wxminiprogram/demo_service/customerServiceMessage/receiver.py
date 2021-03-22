import json
import uuid
import hashlib
from tornado.web import RequestHandler
from tornado.httpclient import AsyncHTTPClient, HTTPRequest, HTTPResponse

token='100861'

def encode_msg(timestamp, nonce):
    arr = [token, timestamp, nonce]
    arr.sort()
    arrstr = ''.join(arr)

    return hashlib.sha1(arrstr.encode('utf8')).hexdigest()


class CustomerServiceMessageReceiver(RequestHandler):
    async def get(self):
        signature = self.get_argument('signature', None)
        timestamp = self.get_argument('timestamp', None)
        nonce = self.get_argument('nonce', None)
        echostr = self.get_argument('echostr', None)

        print(signature)
        print(encode_msg(timestamp, nonce))

        if signature == encode_msg(timestamp, nonce):
            return self.write(echostr)
