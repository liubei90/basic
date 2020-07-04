import uuid
import time
from basic_common.jwt import create_jwt
from basic_common.handler_payload import PayloadHandler
# from basic_common.handler_user_detail import AuthorizationHandler
from basic_common.base.log import Log
from config import configs
from auth.model.m_auth_user import MAuthUserT, MAuthUser
from auth.model.m_auth_local_auth import MAuthLocalAuthT, MAuthLocalAuth, hash_code
from auth.model.m_auth_sessions import MAuthSessionsT, MAuthSessions


alog = Log()

class AuthLoginHandler(PayloadHandler):
    async def post(self):
        # 参数校验

        # 查询用户
        name = self.payload.get('name')
        mau = MAuthUser()
        user_detail = await mau.get_user_by('user_name', name)

        if not user_detail:
            user_detail = await mau.get_user_by('phone', name)

            if not user_detail:
                user_detail = await mau.get_user_by('email', name)
        
        if not user_detail:
            return self.write({'status': False, 'msg': '用户不存在', 'data': []})

        mala = MAuthLocalAuth()
        auth_detail = await mala.get_auth_by_user_id(user_detail.id)

        if not auth_detail:
            return self.write({'status': False, 'msg': '用户授权信息异常', 'data': []})

        if hash_code(self.payload.get('password'), auth_detail.slat) != auth_detail.password:
            return self.write({'status': False, 'msg': '用户名密码不正确', 'data': []})

        expire_second = configs['expire_second']
        mast = MAuthSessionsT()
        mast.id = str(uuid.uuid1())
        mast.user_id = user_detail.id
        mast.expire = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time() + expire_second))
        access_token = create_jwt({
            'session_id': mast.id,
            'expire_date': mast.expire,
            'user_id': mast.user_id,
        })
        mast.jwt = access_token

        mas = MAuthSessions()
        await mas.insert_session(mast)
        return self.write({'status': True, 'msg': 'ok', 'data': {'access_token': access_token, 'expire': expire_second}})
