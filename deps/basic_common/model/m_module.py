from typing import Optional
from ..config import configs
from ..base.utils import dict2class
from .m_dao import MDao


class MModuleT():
    id: str
    name: str
    domain: str
    domain_pub: str
    port: str
    create_on: str
    update_on: str
    is_deleted: int

class MModule():
    def __init__(self):
        self._db = MDao(configs['db']['common'])

    async def get_module_by_name(self, module_name: str) -> Optional[MModuleT]:
        sql = '''
        select * from modules where name = %s and is_deleted = 0;
        '''
        params = (module_name, )
        res = await self._db.query(sql, params)

        if len(res) > 0:
            return dict2class(MModuleT, res[0])
