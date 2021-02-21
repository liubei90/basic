<template>
  <div class="common-main">
    <Header class="common-header"
      @userInit="handleUserInit"></Header>
    <div class="common-body" :class="$style['main']">
      <div :class="$style['main_content']">
        <div :class="$style['main_left']">
          <div :class="$style['stock_list']">
            <div :class="[$style['stock_list_item_tite'], $style['stock_list_item']]"><div>名称</div><div>最新价</div><div>涨跌</div></div>
            <div v-for="item in stockList" 
              :key="item['inxnm']"
              :class="[$style['stock_list_item_stock'], $style['stock_list_item'], item['direction'] == 'up' ? $style['stock_list_item_up'] : $style['stock_list_item_down']]"><div>{{item['inxnm']}}</div><div>{{item['last_price']}}</div><div>{{item['rise_fall_per']}}</div></div>
          </div>
          <div :class="$style['gust_list']">
            <div :class="$style['gust_list_title']"><img :src="imgStar" alt=""> 人气嘉宾 <img :src="imgStar" alt=""></div>
            <div>
              <div v-for="item, index in guestList" 
                :key="item['name'] + index"
                :class="$style['gust_list_item']">
                <span :class="$style['gust_list_item_index']">{{ index + 1 }}</span>
                <span :class="$style['gust_list_item_name']" :title="item['name']">{{ item['name'] }}</span>
                <div :class="$style['gust_list_item_zanpress']"><span><img :src="imgZanPress" alt=""><br>{{ item['like'] }}</span></div>
                <!-- <div :class="$style['gust_list_item_zanpress']"><span><br>{{ item['dislike'] }}</span></div> -->
              </div>
            </div>
          </div>
          <div :class="$style['customer_list']">
            <div :class="$style['customer_list_title']"><img :src="imgMingshi" alt="">当前在线</div>
            <div :class="$style['customer_list_container']">
              <div :class="$style['customer_list_scroll']">
                <div :class="$style['customer_list_item']"
                  v-for="item in onlineCustomers">
                  <img :src="imgMingshi" alt="">
                  <span :class="$style['customer_list_item_name']" :title="item['name']">{{ item['name'] }}</span>
                  <span v-if="item['grade']" :class="[$style['customer_list_item_level'], $style['l0']]">{{ item['grade'] | vipDesc }}</span>
                  <!-- <span :class="[$style['customer_list_item_level'], $style['l' + item['levelIcon']]]"><span style="font-size: 14px;">V</span>{{ item['levelIcon'] }} {{ item['level'] }}</span> -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <div :class="$style['main_middle']">
          <div>
            <div id="id_test_video"></div>
          </div>
          <div ref="carouselContainer">
            <Carousel :height="carouselHeight" width="100%">
              <CarouselItem v-for="item in ads"
                :key="item['image']">
                <a :class="$style['main_middle_ads_link']" 
                  :href="item['url']" 
                  target="_blank"><img :src="item['image']" alt="" srcset=""></a>
              </CarouselItem>
            </Carousel>
          </div>
        </div>
        <div :class="$style['main_right']">
          <div :class="$style['main_right_tabs']">
            <div :class="$style['main_right_tabs_active']"
              >互动({{ messageList.length }})</div>
            <!--<div :class="active == '互动' ? $style['main_right_tabs_active'] : ''"
              @click="active = '互动'">互动({{ messageList.length }})</div>
            <div :class="active == '粉丝榜' ? $style['main_right_tabs_active'] : ''"
              @click="active = '粉丝榜'">粉丝榜</div>
            <div :class="active == '晒单分享' ? $style['main_right_tabs_active'] : ''"
              @click="active = '晒单分享'">晒单分享</div> -->
          </div>
          <div :class="$style['main_right_chatpanel']">
            <div ref="chatpanel_scroll" :class="$style['main_right_chatpanel_scroll']">
              <div v-for="item in messageList"
              :class="$style['chat_message_item']">
                <div v-if="item['type'] === 'tip'">
                  <div :class="$style['chat_message_item_tips']">{{item['message']}}</div>
                </div>
                <div v-else>
                  <!-- 用户名 -->
                  <div>
                    <!-- <span :class="[$style['chat_message_level'], $style['l' + item['levelIcon']]]"><span style="font-size: 14px;">V</span>{{ item['levelIcon'] }} {{ item['level'] }}</span> -->
                    <span v-if="item['grade']" :class="[$style['chat_message_level'], $style['l0']]">{{ item['grade'] | vipDesc }}</span>
                    <span :class="$style['chat_message_user_name']">{{item['name']}}</span>
                    <span :class="$style['chat_message_time']">{{item['time']}}</span>
                  </div>
                  <!-- 用户消息 -->
                  <div>
                    <div :class="[$style['chat_message_text'], item['isSelf'] ? $style['chat_message_text_is_self'] : '']"><span>{{ item['message'] }}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div :class="$style['main_right_input']">
            <div :class="$style['main_right_input_container']">
              <input v-model="message" 
                type="text" 
                placeholder="观望一天不如咨询一遍，输入您的问题"
                @keyup.enter="handleSendMsg">
            </div>
            <div :class="$style['main_right_input_btn']"
              @click="handleSendMsg">发送<br>Enter</div>
          </div>
        </div>
      </div>
      <div :class="$style['bottom_tips']">分析师言论仅是个人观点，仅供参考，投资有风险，入市须谨慎</div>
    </div>
  </div>
</template>

<script>
  import { getPageParamsInSearch, randomString, getImageUrl } from '@/utils';
  import Header from '@/components/header';
  import Mingshi from '@/images/mingshi.png';
  import Star from '@/images/star.png';
  import ZanPress from '@/images/zanpress.png';
  import { getLecturerList, getCourseList } from '@/models/lecturer';
  import { getFinance, getHome } from '@/models/room';
  import { getAnonymousInstance, getInstance } from '@/models/chartRoom/chartRoom';
  import { getUserInfo } from '@/models/login';
  import { getAdList } from '@/models/ad';
  import Message from '@/components/message/message.js';
  import Carousel from '@/components/carousel/carousel.vue';
  import CarouselItem from '@/components/carousel/carouselItem.vue';

  export default {
    components: {
      Header,
      Carousel,
      CarouselItem,
    },
    filters: {
      vipDesc: function (value) {
        if (!value) return ''
        const vipMap = {
          'PT': '普通',
          'VIP': 'VIP',
          'SVIP': 'SVIP',
          'MANG': '管理者',
        };

        return vipMap[value] || value;
      }
    },
    data() {
      const searchParams = getPageParamsInSearch();
      return {
        userId: searchParams['userId'],
        name: searchParams['name'],
        chatroomId: searchParams['chatroomId'],
        userInfo: getUserInfo(),
        imgStar: Star,
        imgZanPress: ZanPress,
        imgMingshi: Mingshi,
        stockList: [
          // { 'inxnm': '上证指数', 'last_price': 3386.64, 'rise_fall_per': '3.6%', 'direction': 'up' },
        ],
        guestList: [
          // { 'name': '王老师', 'dislike': 0, 'like': 3600 },
        ],
        onlineCustomers: [
          // { 'name': '用户1', 'level': '游客', 'levelIcon': '0', },
        ],

        active: '互动',
        message: '',
        messageList: [
        // { 'name': '用户8', 'level': '白银', 'levelIcon': '0', 'message': '赚了钱带我们飞', 'time': '12:01' },
        ],
        pullSrc: '',

        ads: [
          // { image: '', adId: '', name: '', url: '' }
        ],
        carouselHeight: '200px',
      };
    },
    created() {
      this.getLecturerList();
      // this.getCourseList();
      this.getFinance();
      this.getHome();
      this.getAdList();
    },
    mounted() {
      console.log('mouted');
      const carouselContainer = this.$refs['carouselContainer'];

      if (carouselContainer) {
        const rect = carouselContainer.getBoundingClientRect();
        this.carouselHeight = rect.width * 0.2 + 'px';
      }
    },
    watch: {
      messageList() {
        const chatpanelScroll = this.$refs['chatpanel_scroll'];

        if (chatpanelScroll) {
          setTimeout(() => {
            chatpanelScroll.scrollTop = chatpanelScroll.scrollHeight - chatpanelScroll.clientHeight;
          }, 30);
        }
      }
    },
    methods: {
      handleChangeMenu(item) {
        this.activeItem = item;
      },
      handleSendMsg() {
        console.log(this.message);
        if (this.message && this.chartRoom) {
          this.chartRoom.sendText(this.message).then((msg) => {
            console.log(msg);
            this.messageList.push(Object.assign({}, this.createMsg(msg), {isSelf: true}));
            this.message = '';
          }).catch((error) => {
            console.error(error);
            Message({
              message: (error && error['message']) || '未知错误',
              type: 'warning',
            });
          });
        }
      },
      createMsg(msg) {
        // {chatroomId: "235163984"
        // flow: "in"
        // from: "6423345469579663423"
        // fromAvatar: ""
        // fromClientType: "Web"
        // fromCustom: ""
        // fromNick: "测试123"
        // idClient: "20683c1daa355359155bd49bb0322b64"
        // resend: false
        // status: "success"
        // text: "qweqweqwe"
        // time: 1602142903235
        // tip: "欢迎测试123进入聊天室"
        // type: "text" / type: "tip"
        // userUpdateTime: 1602142860273}
        const time = new Date(Number(msg['time']));
        let custom = {};
        try {
          custom = JSON.parse(msg['fromCustom']);
        } catch (error) { }

        return {
              'name': msg['fromNick'],
              'level': '无',
              'levelIcon': '0',
              'message': msg['text'] || msg['tip'],
              'time': time.getHours() + ':' + time.getMinutes(),
              'type': msg['type'],
              'grade': custom['grade'] || '',
              'originMsg': msg,
            }
      },
      async getLecturerList() {
        if (!this.userId) {
          return;
        }

        const res = await getLecturerList({ userId: this.userId });
        console.log(res);

        if (Array.isArray(res)) {
          this.guestList = [];
          res.forEach((item) => {
            this.guestList.push(this.createLecturer(item));
          })
        }
      },
      createLecturer(item) {
        // {
        //     "introduce": "232323",
        //     "sex": "1",
        //     "popularity": 1,
        //     "name": "tes1234",
        //     "avatar": ""
        // }
        return {
          'name': item['name'],
          'like': item['popularity'],
        };
      },
      async getCourseList() {
        if (!this.userId) {
          return;
        }

        const res = await getCourseList({ userId: this.userId });
        console.log(res);
      },
      async getFinance() {
        // {
        //   "1013":{
        //     "rise_fall_per":"0.44%",
        //     "high_price":"2601.8",
        //     "inxnm":"\u521B\u4E1A\u677F\u6307",
        //     "inxno":"399006",
        //     "uptime":"2020-09-30 15:34:03",
        //     "rise_fall":"11.3801",
        //     "inxid":"1013",
        //     "yesy_price":"2563.3799",
        //     "typeid":"asia",
        //     "open_price":"2575.46",
        //     "low_price":"2561.05",
        //     "amplitude_price_per":"1.58%",
        //     "last_price":"2574.76"
        //   }
        // }
        const res = await getFinance();
        console.log(res);

        if (res) {
          const keys = Object.keys(res);

          this.stockList = keys.map(k => {
            res[k]['last_price'] = parseFloat(res[k]['last_price']).toFixed(2);
            if (res[k]['rise_fall_per'][0] === '-') {
              res[k]['direction'] = 'down';
            } else {
              res[k]['direction'] = 'up';
            }
            return res[k];
          });
        }
      },
      handleUserInit() {
        this.userInfo = getUserInfo();

        if (this.userInfo) {
          this.initChartRoom();
        }
      },
      onconnect({ chatroom, member }) {
        // console.log('onconnect', chatroom, member);
        this.getChartroomMembers();
        // 进入聊天室后，发送欢迎提示
        this.sendWelcomeTips();
      },
      onwillreconnect() {
        console.log('onwillreconnect', arguments);
      },
      ondisconnect() {
        console.log('ondisconnect', arguments);
      },
      onerror() {
        console.log('onerror', arguments);
      },
      onmsgs(msgs) {
        console.log('onmsgs', msgs);
        if (Array.isArray(msgs)) {
          msgs.forEach((msg) => {
            this.messageList.push(this.createMsg(msg));
          });
        }
      },
      async initChartRoom() {
        const type = this.userInfo['type'];
        const token = this.userInfo['token'];
        const name = this.userInfo['name'];
        const customerId = this.userInfo['customerId'];
        const grade = this.userInfo['grade'];

        // 已经登录过，实名登录聊天室
        // 游客，匿名登录聊天室
        try {
          if (type === 'Y') {
            // this.chartRoom = await getAnonymousInstance(customerId, name, token, this.chatroomId);
            this.chartRoom = await getInstance(customerId, name, token, this.chatroomId, JSON.stringify({ grade }));
          } else {
            this.chartRoom = await getInstance(customerId, name, token, this.chatroomId, JSON.stringify({ grade }));
          }
        } catch (error) {
          console.error(error);
          Message({
              message: (error && error['message']) || '创建聊天室失败',
              type: 'error',
            });
        }

        if (this.chartRoom) {
          this.chartRoom.addProxy('onconnect', this.onconnect);
          this.chartRoom.addProxy('onwillreconnect', this.onwillreconnect);
          this.chartRoom.addProxy('ondisconnect', this.ondisconnect);
          this.chartRoom.addProxy('onerror', this.onerror);
          this.chartRoom.addProxy('onmsgs', this.onmsgs);
        }
      },
      getChartroomMembers() {
        if (!this.chartRoom) {
          return;
        }
        this.chartRoom.getChatroomMembers().then((res) => {
          console.log(res);
          if (Array.isArray(res) && res.length === 2) {
            const unguest = res[0];
            const guest = res[1];

            this.onlineCustomers = [];

            if (unguest) {
              unguest['members'].forEach((m) => {
                this.onlineCustomers.push(this.createOnlineCustomer(m, unguest['guest']));
              });
            }

            if (guest) {
              guest['members'].forEach((m) => {
                this.onlineCustomers.push(this.createOnlineCustomer(m, guest['guest']));
              });
            }
          }
        })
      },
      createOnlineCustomer(customer, guest) {
        //   {
        //     account: "3883206462965800310"
        //     blacked: false
        //     chatroomId: "235163984"
        //     custom: ""
        //     gaged: false
        //     nick: "2322323"
        //     online: false
        //     tempMuteDuration: 0
        //     tempMuted: false
        //     type: "owner"
        //     updateTime: 1601394939157
        //     valid: true
        //   }

        let custom = {};
        try {
          custom = JSON.parse(customer['custom']);
        } catch (error) { }

        return {
          'name': customer['nick'],
          'level': guest ? '游客' : '无',
          'levelIcon': guest ? '0' : '0',
          'grade': custom['grade'] || '',
          'originCustomer': customer,
        }
      },
      sendWelcomeTips() {
        const name = this.userInfo['name'];

        this.chartRoom.sendTipMsg('欢迎' + name + '进入聊天室').then((msg) => {
          this.messageList.push(Object.assign({}, this.createMsg(msg), {isSelf: true}));
        });
      },
      async getHome() {
        // {
        //   announcement: "10月7号直播间好物直播间"
        //   chatName: "10月7号直播间好物直播间"
        //   chatRoomId: 238689152
        //   cid: "5bcf08894a7449e692a9230f45cb07d1"
        //   hlsPullUrl: "http://pullhls09b39e1d.live.126.net/live/5bcf08894a7449e692a9230f45cb07d1/playlist.m3u8"
        //   httpPullUrl: "http://pullhls09b39e1d.live.126.net/live/5bcf08894a7449e692a9230f45cb07d1/playlist.m3u8"
        //   muted: true
        //   name: "10月7号直播间"
        //   roomId: "1313845071624941570"
        //   rtmpPullUrl: "rtmp://v09b39e1d.live.126.net/live/5bcf08894a7449e692a9230f45cb07d1"
        //   status: "FREE"
        //   valid: true
        // }
        const res = await getHome({ userId: this.userId, name: this.name });
        console.log(res);

        if (res) {
          var player =  new TcPlayer('id_test_video', {
            "controls": "none",
            "m3u8": res['hlsPullUrl'],
            "width" :  '100%',//视频的显示宽度，请尽量使用视频分辨率宽度
            "height" : '100%',//视频的显示高度，请尽量使用视频分辨率高度
            });
          // this.pullSrc = res['httpPullUrl'];
        }
      },
      async getAdList() {
        const res = await getAdList({ userId: this.userId });

        if (res) {
          this.ads = [];
          res.forEach((item) => {
            this.ads.push(Object.assign({}, item, {
              image: getImageUrl(item['image']),
            }));
          });
        }
      },
    }
  }
</script>

<style module>
.main {
  display: flex;
  flex-direction: column;
}

.main_content {
  flex: 1;
  display: flex;
}

.bottom_tips {
  flex: 0 0 30px;
  border-top: 2px solid rgb(71, 132, 194);
  text-align: center;
  color: #ffffff;
  font-size: 12px;
  line-height: 2em;
}

.main_left {
  flex: 0 0 150px;
  border-right: 2px solid rgb(71, 132, 194);
  display: flex;
  flex-direction: column;
}

.main_middle {
  flex: 1;
}

.main_right {
  flex: 0 0 350px;
  border-left: 2px solid rgb(71, 132, 194);
  display: flex;
  flex-direction: column;
}

.stock_list {
  flex: 0 0;
}

.gust_list {
  flex: 0 0;
  color: #ffffff;
  font-size: 12px;
}

.customer_list {
  flex: 1 1 1px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.stock_list_item {
  display: flex;
  font-size: 12px;
}

.stock_list_item > div {
  flex: 0 0 33.333%;
  text-align: center;
}

.stock_list_item_tite {
  color: #ffffff;
  padding: 10px 0;
  border-bottom: 1px solid rgb(33, 53, 81);
}

.stock_list_item_stock {
  padding: 10px 0;
  border-bottom: 1px solid rgb(33, 53, 81);
}

.stock_list_item_up {
  color: red;
}

.stock_list_item_down {
  color: green;
}

.gust_list_title {
  color: rgb(255, 231, 99);
  font-size: 14px;
  text-align: center;
  line-height: 2em;
  background-color: rgb(15, 31, 49);
}

.gust_list_item {
  padding: 7px 3px 5px;
  border-bottom: 1px solid rgb(33, 53, 81);
}

.gust_list_item_name {
  line-height: 1.5em;
  display: inline-block;
  width: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.gust_list_item_index {
  background-color: rgb(242, 61, 30);
  border-radius: 50%;
  line-height: 1em;
  text-align: center;
  display: inline-block;
  width: 15px;
  height: 15px;
}

.gust_list_item_zanpress {
  display: inline-block;
  text-align: center;
  float: right;
  margin-left: 5px;
  line-height: 1em;
}

.customer_list_title {
  flex: 0 0 30px;
  color: #ffffff;
  font-size: 14px;
  text-align: center;
  line-height: 2em;
  background-color: rgb(15, 31, 49);
}

.customer_list_container {
  flex: 1;
  overflow: hidden;
}

.customer_list_scroll {
  height: 100%;
  overflow-y: auto;
}

.customer_list_item {
  font-size: 12px;
  color: #ffffff;
  padding: 5px 3px;
  border-bottom: 1px solid rgb(33, 53, 81);
}

.customer_list_item_name {
  display: inline-block;
  width: 70px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.customer_list_item_level,
.chat_message_level {
  line-height: 1em;
  border-radius: 2px;
  padding: 3px;
  font-size: 12px;
}

.customer_list_item_level {
  float: right;
}

.customer_list_item_level.l0,
.chat_message_level.l0 {
  background-color: gray;
}

.customer_list_item_level.l1,
.chat_message_level.l1 {
  background-color: rgb(1, 160, 222);
}

.customer_list_item_level.l2,
.chat_message_level.l2 {
  background-color: rgb(0, 76, 191);
}

.main_right_tabs {
  flex: 0 0;
  font-size: 0;
}

.main_right_tabs > div {
  display: inline-block;
  width: 100%;
  text-align: center;
  color: #ffffff;
  font-size: 12px;
  cursor: pointer;
  padding: 7px;
}

.main_right_tabs_active {
  background-color: rgb(4, 16, 29);
}

.main_right_chatpanel {
  flex: 1 1 1px;
  overflow: hidden;
}

.main_right_input {
  flex: 0 0;
  display: flex;
}

.main_right_chatpanel_scroll {
  height: 100%;
  overflow-y: auto;
}

.main_right_input_container {
  flex: 1;
}

.main_right_input_container input {
  width: 100%;
  height: 80px;
  outline: none;
}

.main_right_input_btn {
  flex: 0 0 80px;
  height: 80px;
  background-color: rgb(254, 11, 6);
  color: #ffffff;
  font-size: 16px;
  text-align: center;
  padding-top: 20px;
  cursor: pointer;
}

.chat_message_item {
  color: #ffffff;
  margin: 20px 0;
}

.chat_message_item_tips {
  font-size: 14px;
  color: gray;
  text-align: center;
}

.chat_message_level {
  margin-left: 10px;
}
.chat_message_user_name {
  font-size: 12px;
  background-color: rgb(253, 163, 58);
  padding: 3px 5px;
  border-radius: 2px;
}

.chat_message_time {
  font-size: 12px;
  color: gray;
}

.chat_message_text {
  display: inline-block;
  margin: 10px 10px 0 35px;
  padding: 10px;
  background-color: #ffffff;
  color: gray;
  border-radius: 4px;
  position: relative;
}

.chat_message_text span {
  word-break: break-all;
}

/* .chat_message_text::after, */
.chat_message_text::before {
  content: " ";
  border-width: 6px;
  top: -6px;
  border-top-width: 0;
  border-bottom-color: #fff;
  border-left-color: transparent;
  border-right-color: transparent;
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-style: solid;
}
/* 
.chat_message_text::after {
  content: " ";
  border-width: 6px;
  top: 7px;
  margin-left: -6px;
  border-top-width: 0;
  border-bottom-color: #fff;
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
  margin-right: 3px;
  border-top-width: 0;
  border-bottom-color: #ebeef5;
} */

.chat_message_text_is_self {
  background-color: rgb(152, 225, 101);
  /* color: #fff; */
}
.chat_message_text_is_self::before {
  border-bottom-color: rgb(152, 225, 101);
}


.main_middle_ads_link img {
  width: 100%;
  height: 100%;
}


</style>