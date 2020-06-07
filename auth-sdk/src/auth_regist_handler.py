import uuid
from basic_common.handler_payload import HandlerPayload
from basic_common.base.log import Log
from model.m_auth_user import MAuthUserT, MAuthUser
from model.m_auth_local_auth import MAuthLocalAuthT, MAuthLocalAuth, hash_code

alog = Log()

class AuthRegistHandler(HandlerPayload):
    async def post(self):
        # 验证传入参数

        # 创建用户
        maut = MAuthUserT()
        maut.id = str(uuid.uuid1())
        maut.user_name = self.payload.get('user_name')
        maut.phone = self.payload.get('phone')
        maut.email = self.payload.get('email')
        maut.sex = self.payload.get('sex')

        mau = MAuthUser()
        await mau.insert_user(maut)

        # 创建用户登录信息
        malat = MAuthLocalAuthT()
        malat.id = str(uuid.uuid1())
        malat.slat = str(uuid.uuid1())
        malat.password = hash_code(self.payload.get('password'), malat.slat)

        mala = MAuthLocalAuth()
        await mala.insert_auth(mala)

        return self.write({'status': True, 'msg': 'ok', '': []})
