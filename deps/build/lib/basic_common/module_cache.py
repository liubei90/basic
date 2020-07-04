from typing import Any, Optional
import asyncio
from .model.m_module import MModuleT, MModule
from .model.m_module_data_sources import MModuleDataSourcesT, MModuleDataSources

async def _get_module_by_name(module_name: str) -> Optional[MModuleT]:
    m = MModule()
    return await m.get_module_by_name(module_name)

_cache = {}

def _get_keyname(module_name: str) -> str:
    return module_name

async def get_module_cahce(module_name: str) -> Optional[MModuleT]:
    keyname = _get_keyname(module_name)

    if keyname not in _cache:
        _cache[keyname] = asyncio.create_task(_get_module_by_name(module_name))

    res = _cache[keyname]

    if isinstance(res, asyncio.Task):
        _cache[keyname] = await res

    return _cache.get(keyname)



_data_source_cache = {}

async def _get_data_source_by_name_in_module(module_id: str, data_name: str) -> Optional[MModuleDataSourcesT]:
    mds = MModuleDataSources()
    return await mds.get_data_source_by_name_in_module(module_id, data_name)

def _get_ds_keyname(module_id: str, data_name: str) -> str:
    return f'{module_id}:{data_name}'

async def get_data_source_cache(module_id: str, data_name: str) -> Optional[MModuleDataSourcesT]:
    keyname = _get_ds_keyname(module_id, data_name)

    if keyname not in _data_source_cache:
        _data_source_cache[keyname] = asyncio.create_task(_get_data_source_by_name_in_module(module_id, data_name))

    res = _data_source_cache[keyname]

    if isinstance(res, asyncio.Task):
        _data_source_cache[keyname] = await res

    return _data_source_cache.get(keyname)
