from typing import Optional
from ..config import configs
from ..base.utils import dict2class
from .m_dao import MDao


class MModuleDataSourcesT():
    id: str
    name: str
    module_id: str
    type: str
    api_path: str
    prefix: str
    raw_data: str
    create_on: str
    update_on: str
    is_deleted: int

class MModuleDataSources():
    def __init__(self):
        self._db = MDao(configs['db']['common'])

    async def get_data_source_by_name_in_module(self, module_id: str, data_name: str) -> Optional[MModuleDataSourcesT]:
        sql = '''
        select * from module_data_sources where module_id = %s and name = %s and is_deleted = 0;
        '''
        params = (module_id, data_name)
        res = await self._db.query(sql, params)

        if len(res) > 0:
            return dict2class(MModuleDataSourcesT, res[0])
