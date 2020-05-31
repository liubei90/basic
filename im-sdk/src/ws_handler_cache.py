from typing import Any, List

_ws_caches = {}

def _get_keyname(stream_type: str, user_id:str) -> str:
    return f'{stream_type}:{user_id}'

def cache_ws_handler(stream_type: str, user_id:str, wshandler: Any) -> bool:
    assert stream_type and user_id
    keyname = _get_keyname(stream_type, user_id)

    if keyname not in _ws_caches:
        _ws_caches[keyname] = []

    cache = _ws_caches[keyname]

    if wshandler not in cache:
        cache.append(wshandler)

def get_ws_handler(stream_type: str, user_id:str) -> List[Any]:
    assert stream_type and user_id
    keyname = _get_keyname(stream_type, user_id)
    cache = _ws_caches.get(keyname, [])
    return cache

def remove_ws_handler(stream_type: str, user_id:str, wshandler: Any) -> bool:
    assert stream_type and user_id
    keyname = _get_keyname(stream_type, user_id)

    if keyname in _ws_caches:
        _ws_caches[keyname] = [c for c in _ws_caches[keyname] if c != wshandler]
