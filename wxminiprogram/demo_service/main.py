import json
from tornado.httpclient import AsyncHTTPClient, HTTPRequest, HTTPResponse
from tornado.web import Application, RequestHandler
from tornado.ioloop import IOLoop
APPID = 'wx97bc158106e9d0a6'
APPSECRET = 'cffddd0b7d3d62a2a250aab0dbbb2fa5'

class AuthGetAccessToken(RequestHandler):
    async def get(self):
        # https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
        client = AsyncHTTPClient()
        res = await client.fetch(HTTPRequest(
            url=f'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={APPID}&secret={APPSECRET}'
        ))

        self.set_header('content-type', 'application/json')

        if res.code == 200:
            return self.write(res.body)
        else:
            return self.write(json.dumps({ "code": 1, "status": "fail"  }))

def main():
    application = Application([
            (r"/auth.getAccessToken", AuthGetAccessToken),
        ], debug=True)

    application.listen(8011)
    IOLoop.current().start()

if __name__ == "__main__":
    main()
