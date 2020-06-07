import uuid
from tornado.web import RequestHandler
from base.utils import class2dict
from base.log import Log
from models.m_im_group import MImGroupT, MImGroup
from models.m_im_group_member import MImGroupMemberT, MImGroupMember
from handler_content import HandlerContent
from handler_payload import HandlerPayload


glog = Log()

class PrepareHandler(HandlerContent, HandlerPayload):
    async def prepare(self):
        await super().prepare()


class GroupHandler(PrepareHandler):
    async def get(self):
        # 验证输入参数

        mgm = MImGroupMember()
        gids = await mgm.get_group_ids_by_member_id(self.user_id)

        mg = MImGroup()
        gss = await mg.get_groups_by_ids(gids)

        return self.write({'status': True, 'msg': 'ok', 'data': [class2dict(g) for g in gss]})

    async def post(self):
        # 验证输入参数

        mgt = MImGroupT()
        mgt.id = str(uuid.uuid1())
        mgt.name = self.payload.get('name')
        mgt.remark = self.payload.get('remark')
        mgt.group_owner = self.payload.get('group_owner')

        mg = MImGroup()
        await mg.insert_group(mgt)

        # fixme: 需要去重
        members = self.payload.get('members')
        mgmts = []

        for m in members:
            mgmt = MImGroupMemberT()
            mgmt.id = str(uuid.uuid1())
            mgmt.group_id = mgt.id
            mgmt.member_id = m.get('id')
            mgmt.member_nickname = m.get('nickname')
            mgmts.append(mgmt)

        mgm = MImGroupMember()
        await mgm.insert_members(mgmts)

        return self.write({'status': True, 'msg': 'ok', 'data': mgt.id})


class GroupItemHandler(PrepareHandler):
    async def put(self, group_id):
        mg = MImGroup()
        group_detail = await mg.get_groups_by_ids([group_id])

        if len(group_detail) > 0:
            group_detail = group_detail[0]
            group_detail.name = self.payload.get('name', group_detail.name)
            group_detail.remark = self.payload.get('remark', group_detail.remark)
            group_detail.group_owner = self.payload.get('group_owner', group_detail.group_owner)
            group_detail.is_deleted = self.payload.get('is_deleted', group_detail.is_deleted)
            res = await mg.update_group(group_detail)

        return self.write({'status': True, 'msg': 'ok', 'data': []})

    async def delete(self, group_id):
        mg = MImGroup()
        group_detail = await mg.get_groups_by_ids([group_id])

        if len(group_detail) > 0:
            group_detail = group_detail[0]
            group_detail.is_deleted = 1
            res = await mg.update_group(group_detail)

        return self.write({'status': True, 'msg': 'ok', 'data': []})


class GroupMemberHander(PrepareHandler):
    async def get(self, group_id):
        mgm = MImGroupMember()
        members = await mgm.get_members_by_group_id(group_id)

        return self.write({'status': True, 'msg': 'ok', 'data': [class2dict(m) for m in members]})

    async def post(self, group_id):
        mg = MImGroup()
        group_detail = await mg.get_groups_by_ids([group_id])
        
        if len(group_detail) > 0:
            group_detail = group_detail[0]

        if not group_detail or group_detail.is_deleted == 1:
            return self.write({'status': False, 'msg': '群不存在', 'data': []})

        # fixme: 需要去除已经在群里的成员
        members = self.payload.get('members', [])
        mgmts = []
        for m in members:
            mgmt = MImGroupMemberT()
            mgmt.id = str(uuid.uuid1())
            mgmt.group_id = group_id
            mgmt.member_id = m.get('id')
            mgmt.member_nickname = m.get('nickname')
            mgmts.append(mgmt)
        
        mgm = MImGroupMember()
        res = await mgm.insert_members(mgmts)
        return self.write({'status': True, 'msg': 'ok', 'data': [m.id for m in mgmts]})


class GroupMemberItemHander(PrepareHandler):
    async def put(self, group_id, member_id):
        mgm = MImGroupMember()
        mdetail = await mgm.get_member_by_member_id_in_group(group_id, member_id)

        if not mdetail:
            return self.write({'status': False, 'msg': '成员不存在', 'data': []})

        if mdetail.member_nickname != self.payload.get('nickname'):
            mdetail.member_nickname = self.payload.get('nickname')
            await mgm.update_member(mdetail)

        return self.write({'status': True, 'msg': 'ok', 'data': mdetail.id})

    async def delete(self, group_id, member_id):
        mgm = MImGroupMember()
        mdetail = await mgm.get_member_by_member_id_in_group(group_id, member_id)

        if not mdetail:
            return self.write({'status': False, 'msg': '成员不存在', 'data': []})

        mdetail.is_deleted = 1
        await mgm.update_member(mdetail)
        return self.write({'status': True, 'msg': 'ok', 'data': []})
