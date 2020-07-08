from typing import Optional
import time
import xml.etree.ElementTree as ET


class Msg():
    def __init__(self, xmlData):
        self.ToUserName = xmlData.find('ToUserName').text
        self.FromUserName = xmlData.find('FromUserName').text
        self.CreateTime = xmlData.find('CreateTime').text
        self.MsgType = xmlData.find('MsgType').text
        self.MsgId = xmlData.find('MsgId').text

    def get_result(self):
        pass


class TextMsg(Msg):
    def __init__(self, xmlData):
        super().__init__(xmlData)
        self.Content = xmlData.find('Content').text

    def get_result(self):
        XmlForm = """
        <xml>
            <ToUserName><![CDATA[{ToUserName}]]></ToUserName>
            <FromUserName><![CDATA[{FromUserName}]]></FromUserName>
            <CreateTime>{CreateTime}</CreateTime>
            <MsgType><![CDATA[text]]></MsgType>
            <Content><![CDATA[{Content}]]></Content>
        </xml>
        """
        return XmlForm.format(**{
            'ToUserName': self.FromUserName,
            'FromUserName': self.ToUserName,
            'CreateTime': int(time.time()),
            'Content': self.Content,
        })


class ImageMsg(Msg):
    def __init__(self, xmlData):
        super().__init__(xmlData)
        self.PicUrl = xmlData.find('PicUrl').text
        self.MediaId = xmlData.find('MediaId').text

    def get_result(self):
        pass


def parse_xml(web_data) -> Optional[Msg]:
    if len(web_data) == 0:
        return None
    xmlData = ET.fromstring(web_data)
    msg_type = xmlData.find('MsgType').text
    if msg_type == 'text':
        return TextMsg(xmlData)
    elif msg_type == 'image':
        return ImageMsg(xmlData)



