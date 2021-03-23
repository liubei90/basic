import json
from wxrequest import wxrequest

async def createActivityId():
    status, result, _  = await wxrequest(
        url = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/activityid/create',
        method = 'GET',
    )

    if status and result['errcode'] == 0 and 'activity_id' in result:
        return result['activity_id']

    return None


async def setUpdatableMsg(data):
    status, result, _ = await wxrequest(
        url = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/updatablemsg/send',
        data = data
    )

    if status and result['errcode'] == 0:
        return True

    return False
