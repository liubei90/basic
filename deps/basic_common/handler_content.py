import asyncio
from tornado.web import RequestHandler


class HandlerContent(RequestHandler):
    user_id: str
    access_token: str
    user_detail: dict

    async def prepare(self):
        fut = super().prepare()

        if asyncio.coroutines.iscoroutine(fut):
            await fut

        verifyed = await self.verify_user()

        if not verifyed:
            self.set_status(401)
            return self.finish()

    def get_access_token(self) -> str:
        '''
        获取用户token
        '''
        return self.get_argument('access_token')

    async def verify_user(self) -> bool:
        self.access_token = self.get_access_token()
        print(self.access_token)
        if not self.access_token:
            return False

        # 获取用户详情
        self.user_detail = await self.get_user_detail()

        if not self.user_detail:
            return False

        return True

    async def get_user_detail(self) -> dict:
        self.user_id = self.access_token
        return {'user_id': self.user_id}
