from tornado.routing import PathMatches, Rule
from auth.regist_handler import AuthRegistHandler
from auth.login_handler import AuthLoginHandler
from auth.logout_handler import AuthLogoutHandler


routes = [
    Rule(PathMatches(r'/auth/regist'), AuthRegistHandler),
    Rule(PathMatches(r'/auth/login'), AuthLoginHandler),
    Rule(PathMatches(r'/auth/logout'), AuthLogoutHandler),
]