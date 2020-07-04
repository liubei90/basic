from typing import Optional
import abc
import json
import traceback
import furl
from tornado.httpclient import AsyncHTTPClient, HTTPRequest, HTTPResponse, HTTPClientError
from tornado.simple_httpclient import HTTPTimeoutError
from .base.log import Log
from .model.m_module import MModuleT
from .model.m_module_data_sources import MModuleDataSourcesT
from .module_cache import get_data_source_cache, get_module_cahce
from .bc_exceptions import UnavailableDataSourceTypeException, NoDataSourceException, NoModuleException

log = Log()

class DataSource():
    _mmdst: MModuleDataSourcesT

    def __init__(self, mmdst: MModuleDataSourcesT):
        self._mmdst = mmdst

    @abc.abstractmethod
    async def fetch_data(self, params: dict=None) -> dict:
        ...


class RawDataSource(DataSource):
    def __init__(self, mmdst: MModuleDataSourcesT):
        super().__init__(mmdst)

    async def fetch_data(self, params: dict=None) -> dict:
        return self._mmdst.raw_data


class ApiDataSource(DataSource):
    def __init__(self, mt: MModuleT, mmdst: MModuleDataSourcesT):
        super().__init__(mmdst)
        self._mt = mt

    async def fetch_data(self, params: dict=None) -> dict:
        domain = self._mt.domain
        # domain_pub = self._mt.domain_pub
        port = self._mt.port
        prefix = self._mmdst.prefix
        api_path = self._mmdst.api_path
        method = self._mmdst.method or 'GET'
        query = {}
        body = None
        headers = {}

        if method.lower() != 'get':
            headers = { 'Content-Type': 'application/json' }
            body = json.dumps(params) if params else None
        else:
            query = params or {}

        url = furl.furl(f'http://{domain}{(":" + port) if port else ""}{prefix}{api_path}').add(query)
        print(f'fetch ({method}): {url.url}')
        req = HTTPRequest(url.url, method=method.upper(), headers=headers, body=body)

        try:
            client = AsyncHTTPClient()
            res = await client.fetch(req)

            if res and res.code == 200:
                print(res.body)
                return json.loads(res.body.decode('utf-8'))

        except Exception as err:
            log.print('网络请求异常：', traceback.format_exc())


def _getDataSource(mt: MModuleT, mmdst: MModuleDataSourcesT) -> Optional[DataSource]:
    if mmdst.type == 'raw':
        return RawDataSource(mmdst)
    elif mmdst.type == 'api':
        return ApiDataSource(mt, mmdst)

    raise UnavailableDataSourceTypeException(f'不支持的数据源{mmdst.type}类型')



class Module():
    def __init__(self, mt: MModuleT):
        self._mt = mt

    async def fetch_data(self, data_name: str, params: dict=None):
        dst = await get_data_source_cache(self._mt.id, data_name)

        if not dst:
            raise NoDataSourceException(f'数据源{self._mt.name}({data_name})不存在')

        ds = _getDataSource(self._mt, dst)
        return await ds.fetch_data(params)


async def get_module(module_name: str) -> Optional[Module]:
    mt = await get_module_cahce(module_name)

    if not mt:
        raise NoModuleException(f'模块{module_name}不存在')

    return Module(mt)
