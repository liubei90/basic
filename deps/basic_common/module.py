from typing import Optional
import abc
import json
import furl
from tornado.httpclient import AsyncHTTPClient, HTTPRequest, HTTPResponse, HTTPClientError
from tornado.simple_httpclient import HTTPTimeoutError
from .model.m_module import MModuleT
from .model.m_module_data_sources import MModuleDataSourcesT
from .module_cache import get_data_source, get_module
from .bc_exceptions import UnavailableDataSourceTypeException, NoDataSourceException, NoModuleException


class DataSource():
    _mmdst: MModuleDataSourcesT

    def __init__(self, mmdst: MModuleDataSourcesT):
        self._mmdst = mmdst

    @abc.abstractmethod
    async def fetch_data(self, access_token: str, method: str='GET', querys=None, body=None, **kvargs) -> dict:
        ...


class RawDataSource(DataSource):
    def __init__(self, mmdst: MModuleDataSourcesT):
        super().__init__(mmdst)

    async def fetch_data(self, access_token: str, method: str='GET', querys=None, body=None, **kvargs) -> dict:
        return self._mmdst.raw_data


class ApiDataSource(DataSource):
    def __init__(self, mt: MModuleT, mmdst: MModuleDataSourcesT):
        super().__init__(mmdst)
        self._mt = mt

    async def fetch_data(self, access_token: str, method: str='GET', querys=None, body=None, **kvargs) -> dict:
        domain = self._mt.domain
        # domain_pub = self._mt.domain_pub
        port = self._mt.port
        prefix = self._mmdst.prefix
        api_path = self._mmdst.api_path
        url = furl.furl(f'http://{domain}{prefix}{api_path}').add({'access_token': access_token, **(querys if querys else {})})
        headers = {}

        if method.lower() != 'get':
            headers = { 'Content-Type': 'application/json' }

        req = HTTPRequest(url.url, method=method, headers=headers, body=body)

        try:
            client = AsyncHTTPClient()
            res = await client.fetch(req)
            
            if res and res.code == 200:
                return json.loads(res.body.decode())

        except HTTPClientError as err:
            pass


def _getDataSource(mt: MModuleT, mmdst: MModuleDataSourcesT) -> Optional[DataSource]:
    if mmdst.type == 'raw':
        return RawDataSource(mmdst)
    elif mmdst.type == 'api':
        return ApiDataSource(mt, mmdst)

    raise UnavailableDataSourceTypeException(f'不支持的数据源{mmdst.type}类型')



class Module():
    def __init__(self, mt: MModuleT):
        self._mt = mt

    async def fetch_data(self, data_name: str, access_token: str, method: str='GET', querys=None, body=None, **kvargs):
        dst = await get_data_source(self._mt.id, data_name)

        if not dst:
            raise NoDataSourceException(f'数据源{self._mt.name}({data_name})不存在')

        ds = _getDataSource(self._mt, dst)
        return await ds.fetch_data(access_token, method=method, querys=querys, body=body, **kvargs)


async def get_module(module_name: str) -> Optional[Module]:
    mt = await get_module(module_name)

    if not mt:
        raise NoModuleException(f'模块{module_name}不存在')

    return Module(mt)
