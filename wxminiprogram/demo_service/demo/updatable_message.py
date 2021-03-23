import json
import uuid
from tornado.web import RequestHandler

from updatableMessage import createActivityId, setUpdatableMsg


class CreateActivityId(RequestHandler):
    async def get(self):
        openid = self.get_argument('openid', None)

        if not openid:
            return self.write(json.dumps({'code': 1, 'status': False, 'data': None, 'msg': '缺少参数openid'}))

        res = await createActivityId()

        if res:
            return self.write(json.dumps({'code': 0, 'status': True, 'data': res, 'msg': '发送成功'}))

        return self.write(json.dumps({'code': 1, 'status': False, 'data': None, 'msg': '发送失败'}))

class SetUpdatableMsg(RequestHandler):
    async def get(self):
        activity_id = self.get_argument('activity_id', None)
        target_state = self.get_argument('target_state', 0)
        member_count = self.get_argument('member_count', 1)
        room_limit = self.get_argument('room_limit', 1)
        path = self.get_argument('path', 'pages/index/index')
        version_type = self.get_argument('version_type', 'develop')

        if not activity_id:
            return self.write(json.dumps({'code': 1, 'status': False, 'data': None, 'msg': '缺少参数activity_id'}))

        res = await setUpdatableMsg({
            'activity_id': activity_id,
            'target_state': target_state,
            'template_info': {
                'parameter_list': [
                    {
                        'name': 'member_count',
                        'value': member_count,
                    },
                    {
                        'name': 'room_limit',
                        'value': room_limit,
                    },
                    {
                        'name': 'path',
                        'value': path,
                    },
                    {
                        'name': 'version_type',
                        'value': version_type,
                    },
                ]
            }
        })

        if res:
            return self.write(json.dumps({'code': 0, 'status': True, 'data': None, 'msg': '发送成功'}))

        return self.write(json.dumps({'code': 1, 'status': False, 'data': None, 'msg': '发送失败'}))