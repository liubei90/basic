from tornado.routing import PathMatches, Rule
from access_token_handler import AccessTokenHandler

routes = [
    Rule(PathMatches(r'/wx_access_token'), AccessTokenHandler),
]