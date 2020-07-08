import hashlib
from tornado.web import RequestHandler
from wx.receive import parse_xml, Msg

class WXHandler(RequestHandler):
    async def get(self):
        signature = self.get_argument('signature')
        timestamp = self.get_argument('timestamp')
        nonce = self.get_argument('nonce')
        echostr = self.get_argument('echostr')
        token = '9SBiCr'

        l = [token, timestamp, nonce]
        l.sort()
        l = ''.join(l)

        sha1 = hashlib.sha1()
        sha1.update(l.encode('utf-8'))
        # map(sha1.update, l)
        hashcode = sha1.hexdigest()
        print(hashcode, signature)

        if hashcode == signature:
            return self.write(echostr)
        else:
            return self.write('')

    async def post(self):
        body = self.request.body.decode('utf-8')
        print(body)
        msg = parse_xml(body)

        if msg:
            res = msg.get_result()

            if res:
                return self.write(res)

        return self.write('异常')