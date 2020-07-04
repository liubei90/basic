from tornado.routing import PathMatches, Rule
from auth.verification_handler import AuthVerificationHandler
from auth.user_detail_handler import UserDetailHandler


internal_routes = [
    Rule(PathMatches(r'/verify-authorization'), AuthVerificationHandler),
    Rule(PathMatches(r'/user-detail'), UserDetailHandler),
]
