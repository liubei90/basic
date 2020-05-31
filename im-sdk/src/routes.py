from tornado.routing import Rule, PathMatches
from im_handler import IMHandler
from const import ws_prefix, stream_type_im

routes = [
    Rule(PathMatches(f'{ws_prefix}/{stream_type_im}/.*'), IMHandler)
]