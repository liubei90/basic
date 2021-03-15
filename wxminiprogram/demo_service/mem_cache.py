import time

class memCache():
    def __init__(self):
        self.cache_dict = {}

    def get(self, key):
        res = self.cache_dict[key] if key in self.cache_dict else None
        
        if res and res['ex'] and res['ex'] < time.time():
            res = None
            del self.cache_dict[key]

        return res['val'] if res else None

    def set(self, key, val, ex = None):
        self.cache_dict[key] = {
            'val': val,
            'ex': ex + time.time() if ex else None
        }

access_token_cache = memCache()
user_cache = memCache()
