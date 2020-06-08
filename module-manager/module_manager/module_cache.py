from typing import Any, Optional
from .model.module import ModuleT
from .model.module_data_sources import ModuleDataSourcesT

_cache = {}

def _get_keyname(module_name: str) -> str:
    return module_name

def get_module(module_name: str) -> Optional[ModuleT]:
    keyname = _get_keyname(module_name)
    return _cache.get(keyname)

def set_mdoule(module_name: str, module: ModuleT):
    keyname = _get_keyname(module_name)

    if keyname not in _cache:
        _cache[keyname] = module


_data_source_cache = {}

def _get_ds_keyname(module_name: str, data_name: str) -> str:
    return f'{module_name}:{data_name}'

def get_data_source(module_name: str, data_name: str) -> Optional[ModuleDataSourcesT]:
    keyname = _get_ds_keyname(module_name, data_name)
    return _data_source_cache.get(keyname)

def set_data_source(module_name: str, data_name: str, ds: ModuleDataSourcesT):
    keyname = _get_ds_keyname(module_name, data_name)

    if keyname not in _data_source_cache:
        _data_source_cache[keyname] = ds
