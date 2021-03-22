import json
import uuid
import hashlib
from tornado.web import RequestHandler
from tornado.httpclient import AsyncHTTPClient, HTTPRequest, HTTPResponse

from customerServiceMessage.send import send

token='100861'

def encode_msg(timestamp, nonce):
    arr = [token, timestamp, nonce]
    arr.sort()
    arrstr = ''.join(arr)

    return hashlib.sha1(arrstr.encode('utf8')).hexdigest()


class CustomerServiceMessageReceiver(RequestHandler):
    async def get(self):
        print(self.request.arguments)
        print(self.request.body)
        print(self.request.headers)
        signature = self.get_argument('signature', None)
        timestamp = self.get_argument('timestamp', None)
        nonce = self.get_argument('nonce', None)
        echostr = self.get_argument('echostr', None)

        print(signature)
        print(encode_msg(timestamp, nonce))

        if signature == encode_msg(timestamp, nonce):
            return self.write(echostr)

    async def post(self):
        '''
        self.request.arguments:
        {
            'signature': [b'9919a02b210691f8f35ccbec0e001e971037a4ba'], 
            'timestamp': [b'1616423351'], 
            'nonce': [b'1125634863'], 
            'openid': [b'of9Pz5EeQupOq3SnJ_xrGUfDREzA'], 
            'encrypt_type': [b'aes'], 
            'msg_signature': [b'6f07e5d42fe2e53a91922388b66df3d66701dc59']}
        self.request.body:
        b'{"ToUserName":"gh_4fe32b3b8c5f",
            "FromUserName":"of9Pz5EeQupOq3SnJ_xrGUfDREzA",
            "CreateTime":1616423351,
            "MsgType":"text",
            "Content":"\xe5\x8d\x83\xe4\xb8\x87\xe4\xba\xba",
            "MsgId":23141616961824540,
            "Encrypt":"6Bx3cbNswj9DooR8JD3MyHgN5Itkrj1LlBr4CqNonfHlArceD0nfZ+SZdrFHB1XdGqufFQNorXE54d9j4HXKyELcr0CB6hhaz2IPd4ZD+KzEubqyPaFy6udPI28Jg9/h50z3mT0qvWIQ82Mq6ZcdmOLe/EObkwe6E0XT2ih7hPwJPB7kAZoOdFasYy3nKLzkNVVdMABSpSQHYmbNW0xfMQVgfd2ZHVCm2ZjczbgWsukYUM3Y3Cwu/8uJB3DFv0fC+xLhtDoB4QnQn3l3p2zBhOpFheLm3v7Q8GFxL/OAx38="}'
        '''
        signature = self.get_argument('signature', None)
        timestamp = self.get_argument('timestamp', None)
        nonce = self.get_argument('nonce', None)
        openid = self.get_argument('openid', None)

        payload = json.loads(self.request.body.decode('utf8'))

        if signature == encode_msg(timestamp, nonce):
            await send({
                "touser": openid,
                "msgtype": 'text',
                'text': {
                    'content': payload['Content'] if 'Content' in payload else '你说啥？'
                }
            })
            return self.write('ok')



