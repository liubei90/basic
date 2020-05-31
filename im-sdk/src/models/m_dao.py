from typing import List, Any
import aiomysql

class MDao():
    def __init__(self, config:dict):
        self._conn = None
        self._config = config

    async def _ensure_connect(self):
        if self._conn is None:
            self._conn = await aiomysql.connect(**self._config)

    async def query(self, sql:str, params=None) -> List[Any]:
        res = []
        await self._ensure_connect()
        async with self._conn.cursor(aiomysql.DictCursor) as c:
            await c.execute(sql, args=params)
            res = await c.fetchall()
            await self._conn.commit()

        return res

    async def dml(self, sql:str, params=None, many=False):
        res = None
        await self._ensure_connect()
        async with self._conn.cursor() as c:
            try:
                if not many:
                    res = await c.execute(sql, args=params)
                else:
                    res = await c.executemany(sql, args=params)

                await self._conn.commit()
            except:
                await self._conn.rollback()

        return res

    def __del__(self):
        if self._conn:
            self._conn.close()
