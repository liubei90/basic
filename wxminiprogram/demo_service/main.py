import json
import uuid
from tornado.httpclient import AsyncHTTPClient, HTTPRequest, HTTPResponse
from tornado.web import Application, RequestHandler
from tornado.ioloop import IOLoop
from mem_cache import access_token_cache

from auth.code2Session import Code2Session
from customerServiceMessage.receiver import CustomerServiceMessageReceiver
from demo.send_subscribe import SendSubscribe
from demo.send_uniform_message import SendUniformMessage
from demo.updatable_message import CreateActivityId, SetUpdatableMsg


def main():
    application = Application([
            (r"/auth.code2Session", Code2Session),
            (r"/customerServiceMessage.receiver", CustomerServiceMessageReceiver),

            (r"/demo/send_subscribe", SendSubscribe),
            (r"/demo/send_uniform_message", SendUniformMessage),
            (r"/demo/create_activity_id", CreateActivityId),
            (r"/demo/set_updatable_msg", SetUpdatableMsg),
        ], debug=True)

    application.listen(8001)
    IOLoop.current().start()

if __name__ == "__main__":
    main()
