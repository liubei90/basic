import json
import uuid
from tornado.web import RequestHandler

import subscribeMessage


class SendSubscribe(RequestHandler):
    async def get(self):
        openid = self.get_argument('openid', None)

        if not openid:
            return self.write(json.dumps({'code': 1, 'status': False, 'data': None, 'msg': '缺少参数code'}))

        # 活动开始提醒 PAboCNd3LLUGIPKqZC_zNipWZRXTKK_VhWSWOF5ceMc
        res = await subscribeMessage.send({
            "touser": openid,
            "template_id": "PAboCNd3LLUGIPKqZC_zNipWZRXTKK_VhWSWOF5ceMc",
            "page": "pages/index/index",
            "miniprogram_state": "developer",
            "lang": "zh_CN",
            "data": {
                "thing2": {
                    "value": "春游活动"
                },
                "date3": {
                    "value": "2015年01月05日"
                },
                "thing6": {
                    "value": "郑州绿博园"
                },
                "thing1": {
                    "value": "请带好装备"
                }
            }
        })

        if res:
            return self.write(json.dumps({ 'code': 0, 'status': True, 'data': None, 'msg': '发送成功' }))

        return self.write(json.dumps({'code': 1, 'status': False, 'data': None, 'msg': '发送失败'}))
