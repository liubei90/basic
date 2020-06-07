from tornado.routing import Rule, PathMatches
from const import ws_prefix, stream_type_im
from ws_handler import WsHandler
from group_handler import GroupHandler, GroupItemHandler, GroupMemberHander, GroupMemberItemHander


routes = [
    Rule(PathMatches(f'{ws_prefix}/{stream_type_im}/.*'), WsHandler),
    Rule(PathMatches(r'/im/group'), GroupHandler),
    Rule(PathMatches(r'/im/group/(?P<group_id>[^/]*)'), GroupItemHandler),
    Rule(PathMatches(r'/im/group/(?P<group_id>[^/]*)/member'), GroupMemberHander),
    Rule(PathMatches(r'/im/group/(?P<group_id>[^/]*)/member/(?P<member_id>.*)'), GroupMemberItemHander),
]