from tornado.routing import PathMatches, Rule
from auth_regist_handler import AuthRegistHandler
from auth_login_handler import AuthLoginHandler
from auth_logout_handler import AuthLogoutHandler
from auth_verification_handler import AuthVerificationHandler



routes = [
    Rule(PathMatches(r'/auth/regist'), AuthRegistHandler),
    Rule(PathMatches(r'/auth/login'), AuthLoginHandler),
    Rule(PathMatches(r'/auth/verification'), AuthVerificationHandler),
    Rule(PathMatches(r'/auth/logout'), AuthLogoutHandler),
]