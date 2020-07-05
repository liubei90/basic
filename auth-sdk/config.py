configs = {
    'expire_second': (1 * 60 * 60),
    'db': {
        'auth': {
            'host': '127.0.0.1',
            'port': 3306,
            'user': 'root',
            'password': '',
            'db': 'sdk',
        }
    },
    'wx': {
        'app_id': 'wx97bc158106e9d0a6',
        'app_secret': 'cffddd0b7d3d62a2a250aab0dbbb2fa5',
        'code2Session': 'https://api.weixin.qq.com/sns/jscode2session',
        'expire_second': (24 * 60 * 60),
    },
}