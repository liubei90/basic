import time
from basic_common.handler_internal import InternalHandler
from basic_common.handler_payload import PayloadHandler
from basic_common.base.log import Log
from basic_common.base.utils import class2dict
from auth.model.m_auth_user import MAuthUser, MAuthUserT


alog = Log()

class UserDetailHandler(InternalHandler, PayloadHandler):
    '''
    这是一个内部接口
    '''
    async def post(self):
        user_id = self.payload.get('user_id')

        mau = MAuthUser()
        user_detail = await mau.get_user_by('id', user_id)

        if not user_detail:
            return self.write({'status': False, 'msg': '用户未登录', 'data': None})

        return self.write({'status': True, 'msg': 'ok', 'data': class2dict(user_detail)})
