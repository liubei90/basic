from tornado.routing import PathMatches, Rule
from wx.wx_handler import WXHandler

routes = [
    Rule(PathMatches(r'/wx'), WXHandler),
]