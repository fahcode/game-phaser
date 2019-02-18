<style lang="less">
/* ##remfixer: 1080 */
@import "~components/style/import.less";
.app{
    background-color: #1e1323;
}
.row{
    position: relative;
    width: 100%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center top;
    overflow: hidden;
    img{
        display: block;
        width: 100%;
        height: auto;
    }
}
.gameinfo{
    height: 591px;
    background-image: url('~assets/images/activity-anniversary-tankwar-2018/row_bg_03.png');
    &_play{
        width: 1010px;
        height: 311px;
        padding: 45px;
        margin: 0 auto;
        background-image: url('~assets/images/activity-anniversary-tankwar-2018/war_border.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center top;
        text-align: center;
        &-btn{
            display: inline-block;
            width: auto;
            padding-left: 112px;
            font-size: 60px;
            color: #e9d372;
            height: 100px;
            line-height: 105px;
            margin-top: 20px;
            font-weight: bold;
            background-image: url('~assets/images/activity-anniversary-tankwar-2018/tank.png');
            background-size: 50px 50px;
            background-repeat: no-repeat;
            background-position: left center;
        }
        &-times{
            font-size: 40px;
            color: #e9d372;
            line-height: 80px;
            letter-spacing: 20px;
        }
    }
    &_tips{
        width: 100%;
        margin-top: 60px;
        line-height: 50px;
        font-size: 32px;
        color: #fac381;
        text-align: center;
    }
}
.awards{
    height: 586px;
    background-image: url('~assets/images/activity-anniversary-tankwar-2018/row_bg_04.png');
}
.applist{
    height: 1190px;
    background-image: url('~assets/images/activity-anniversary-tankwar-2018/row_bg_05.png');
    overflow: hidden;

    .title{
        width: 648px;
        height: 146px;
        background-image: url('~assets/images/activity-anniversary-tankwar-2018/title1.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        margin: 0 auto 100px;
    }
}
.bottom{
    height: 515px;
    background-image: url('~assets/images/activity-anniversary-tankwar-2018/row_bg_06.png');
    overflow: hidden;
}
.goTop{
    position: fixed;
    width: 150px;
    height: 156px;
    background-image: url('~assets/images/activity-anniversary-tankwar-2018/gotop.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    bottom: 90px;
    right: 20px;
    z-index: 100;
}

//覆盖样式
body{
    .carousel{
        background: none !important;
        padding: 0;
        &__inner{padding: 0 36px;}
        &__item{
            img{/* width: 166px !important;height: 236px !important; */}
        }
    }
    .qr-container{
        width: 1008px;
        height: 301px;
        /* background-image: url('~assets/images/activity-anniversary-tankwar-2018/qr-code.png');
        background-size: 100% 100%;
        background-repeat: no-repeat; */
        margin: 0 auto;
    }
    .rule-text{
        margin-top: 120px;
        background-color: transparent !important;
        color: #fac381;
    }
    .app-list{
        margin: 0;
        padding: 0 36px;
        background: none !important;
        &__row{
            margin-top: 96px !important;
            &:first-child{margin-top: 0;}
        }
        &__app{
            width: 207px;
            height: 315px;
            background-image: url('~assets/images/activity-anniversary-tankwar-2018/app_bg.png');
            background-size: 100% 100%;
            background-repeat: no-repeat;
            img{width: 150px;height: 150px;margin: 34px 30px 20px;}
            &-name{
                height: 60px;
                line-height: 60px;
                font-size: 34px;
                color: #251e12;
            }
            &-btn{
                height: 64px;
                line-height: 64px;
                margin-top: 20px;
                font-size: 34px;
                border: none;
            }
        }
    }
    .dialog, .dialog__body, .bottom-dialog{
        background-color: #1f1423 !important;
        color: #fff !important;
    }
    .address-btn, .issues__submit-btn, .address__submit-btn, .dialog__confirm-btn{background-color: #f3694e !important;color: #fff !important;}
    .my-awards__info .get-btn{background-color: #f3694e !important;color: #fff !important;}
    .my-awards__info .cp-btn{border-color: #f3694e !important;color: #fff !important;}

    .address, .issues{color: #fff !important;}
    .issues__divider{background-color: rgba(255, 255, 255, 0.1) !important;}
}

@media screen and (orientation: landscape) {
    body{
        //弹窗
        .dialog{
            transform: scale(0.6, 0.6) translate3d(-82%, -82%, 0);
            &__cancel-btn, &__confirm-btn{font-size: 38px !important;}
        }
        .loading{transform: scale(0.6, 0.6) translate3d(-82%, -82%, 0); }
    }
}
</style>
<template>
    <div id="app" class="app" ref="app">
        <ActivityTitle :titleType="0" v-show="titleStatus"></ActivityTitle>
        <div class="row header">
          <img :src="head_slogan1" alt="slogan1">
          <img :src="head_slogan2" alt="slogan2">
        </div>
        <div class="row gameinfo">
          <div class="gameinfo_play">
            <a href="javascript:;" class="gameinfo_play-btn" @click="openGame()" title="开始游戏">开始游戏</a>
            <p class="gameinfo_play-times">剩余次数： <span>{{this.$store.state.lotteryTimes}}</span> 次</p>
          </div>
          <div class="gameinfo_tips">
            <p>每日访问页面即可获得一次游戏机会</p>
            <p>每日首次下载打开游戏额外获得一次游戏机会</p>
            <p>每次完成游戏均有概率中奖喔</p>
          </div>
        </div>
        <div class="row awards">
          <Carousel :imgs="imgs" :margin="44"></Carousel>
            <yh-bullet 
                :speed="120"
                :list="winnerList">
                <li v-for="item in winnerList2">
                    恭喜 <span class="name">{{item.nickname}}</span> 获得 <span class="aw">{{item.award_name}}</span>
                </li>
            </yh-bullet>
        </div>
        <div class="row applist">
          <div class="title" title="获得机会"></div>
          <AppList
              :tokenAbnormal="tokenAbnormal"
              fontColor="#fff"
              unInstallBgColor="#f9b410"
              unInstallFontColor="#fff"
              gotBgColor="#f3694e"
              gotBorderColor="rgba(255,255,255,0.3)"
              gotFontColor="#ffffff"></AppList>
        </div>
        <div class="row bottom">
          <QrCode :qrImg="qrImg"></QrCode>
          <RuleText 
              fontColor="#fac381" 
              :ruleTextMotion = "{type: ruleText.type, 'params': ['活动说明', ruleText.text]}"
              :showList="showList"></RuleText>
        </div>
        <div class="goTop" title="返回顶部" v-show="gotop" @click="clickGoTop()"></div>
        <Game
            v-show="showGame"
            :play="showGame"
            
            v-on:tokenStatusChanged="getTokenStatus($event)"
            :tokenAbnormal="tokenAbnormal"></Game>
    </div>
</template>
<script>
import Vue from "vue";
import "style/common.less";
//import "./index.less";

import logger from "common/logger";
import util from "common/util";
import util2 from "common/util2";
import N from "common/nativeinterface";
import Enum from "common/enum";
import ActivityTitle from "./ActivityTitle.vue";
import AppList from "./_AppList.vue";
import XTitle from "business/XTitle/index.vue";
import QrCode from "business/QrCode/index.vue";
import RuleText from "business/RuleText/index.vue";
import LotteryMixin from "base/LotteryMixin.js";
import ActivityDesc from "../activity-individual-compatiable-games2/FlowTips.vue";
import DialogBuilder from "base/DialogBuilder.js";
import Carousel from "business/Carousel/index.vue";
//import Horse from "./Horse.vue";
import YHBullet from './bullet.vue'
//import Game from './Game.vue';

if (process.env.NODE_ENV != "production") {
  window.__ACTIVITY_ID__ = 2021;
  window.__ACTIVITY_CONFIG__ = {
    __INFO__: { startTime: 1512979323000, endTime: 1514707323000 },
    __AWARDS__: [
        {
            "activityId": 2103,
            "countLimit": 1000,
            "countSent": 0,
            "extValue1": "eyJsb3R0ZXJ5Q291bnQiOjAsImF3YXJkTWluTW9uZXkiOjAsInBheU1pbiI6MCwicGF5TWF4IjowLCJjbGVhblR5cGUiOiIwIn0=",
            "goodsId": 1,
            "icon": "http://game.res.meizu.com/gamecenter/fileserver/activity/image/57/15365718001253xSLIzbx_16th-Plus.png",
            "id": 11937,
            "name": "16th-Plus",
            "type": "MATERIAL",
            "value": 1
        },
        {
            "activityId": 2103,
            "countLimit": 100,
            "countSent": 0,
            "extValue1": "eyJsb3R0ZXJ5Q291bnQiOjAsImF3YXJkTWluTW9uZXkiOjAsInBheU1pbiI6MCwicGF5TWF4IjowLCJjbGVhblR5cGUiOiIwIn0=",
            "goodsId": 1,
            "icon": "http://game.res.meizu.com/gamecenter/fileserver/activity/image/57/1536571862859zApTlUHN_30元话费.png",
            "id": 11938,
            "name": "30元话费",
            "type": "TELCHARGE",
            "value": 1
        },
        {
            "activityId": 2103,
            "countLimit": 100,
            "countSent": 0,
            "extValue1": "eyJsb3R0ZXJ5Q291bnQiOjAsImF3YXJkTWluTW9uZXkiOjAsInBheU1pbiI6MCwicGF5TWF4IjowLCJjbGVhblR5cGUiOiIwIn0=",
            "goodsId": 1,
            "icon": "http://game.res.meizu.com/gamecenter/fileserver/activity/image/57/1536571873824ywzQBnWd_flow耳机.png",
            "id": 11939,
            "name": "flow耳机",
            "type": "MATERIAL",
            "value": 1
        },
        {
            "activityId": 2103,
            "countLimit": 100,
            "countSent": 1,
            "extValue1": "eyJsb3R0ZXJ5Q291bnQiOjAsImF3YXJkTWluTW9uZXkiOjAsInBheU1pbiI6MCwicGF5TWF4IjowLCJjbGVhblR5cGUiOiIwIn0=",
            "goodsId": 1,
            "icon": "http://game.res.meizu.com/gamecenter/fileserver/activity/image/57/1536571882450hXxABxVV_XBOX.png",
            "id": 11940,
            "name": "XBOX",
            "type": "MATERIAL",
            "value": 1
        },
        {
            "activityId": 2103,
            "countLimit": 100,
            "countSent": 0,
            "extValue1": "eyJsb3R0ZXJ5Q291bnQiOjAsImF3YXJkTWluTW9uZXkiOjAsInBheU1pbiI6MCwicGF5TWF4IjowLCJjbGVhblR5cGUiOiIwIn0=",
            "goodsId": 1,
            "icon": "http://game.res.meizu.com/gamecenter/fileserver/activity/image/57/1536571892448MBr0rqQQ_魅族背包.png",
            "id": 11941,
            "name": "魅族背包",
            "type": "MATERIAL",
            "value": 1
        },
        {
            "activityId": 2103,
            "countLimit": 100,
            "countSent": 0,
            "extValue1": "eyJsb3R0ZXJ5Q291bnQiOjAsImF3YXJkTWluTW9uZXkiOjAsInBheU1pbiI6MCwicGF5TWF4IjowLCJjbGVhblR5cGUiOiIwIn0=",
            "goodsId": 1,
            "icon": "http://game.res.meizu.com/gamecenter/fileserver/activity/image/57/1536571900421lBeKBE2T_魅族手环.png",
            "id": 11942,
            "name": "魅族手环",
            "type": "MATERIAL",
            "value": 1
        },
        {
            "activityId": 2103,
            "countLimit": 100,
            "countSent": 0,
            "extValue1": "eyJsb3R0ZXJ5Q291bnQiOjAsImF3YXJkTWluTW9uZXkiOjAsInBheU1pbiI6MCwicGF5TWF4IjowLCJjbGVhblR5cGUiOiIwIn0=",
            "goodsId": 1,
            "icon": "http://game.res.meizu.com/gamecenter/fileserver/activity/image/57/1536571910735h1Zwb080_阳澄湖大闸蟹.png",
            "id": 11943,
            "name": "阳澄湖大闸蟹",
            "type": "MATERIAL",
            "value": 1
        },
        {
            "activityId": 2103,
            "countLimit": 10,
            "countSent": 0,
            "extValue1": "eyJsb3R0ZXJ5Q291bnQiOjAsImF3YXJkTWluTW9uZXkiOjAsInBheU1pbiI6MCwicGF5TWF4IjowLCJjbGVhblR5cGUiOiIwIn0=",
            "goodsId": 1,
            "icon": "http://game.res.meizu.com/gamecenter/fileserver/activity/image/57/1536571931596pySf453J_10元话费.png",
            "id": 11944,
            "name": "10元话费",
            "type": "TELCHARGE",
            "value": 1
        },
        {
            "activityId": 2103,
            "countLimit": 10000,
            "countSent": 0,
            "extValue1": "eyJsb3R0ZXJ5Q291bnQiOjAsImF3YXJkTWluTW9uZXkiOjAsInBheU1pbiI6MCwicGF5TWF4IjowLCJjbGVhblR5cGUiOiIwIn0=",
            "goodsId": 1,
            "icon": "http://game.res.meizu.com/gamecenter/fileserver/activity/image/57/1536572205908knXfR5uH_gif.png",
            "id": 11945,
            "name": "消耗积分",
            "type": "INTEGRATION",
            "value": 1
        }
    ],
    __TASKS__: [
      {
            "activityId": 2103,
            "content":
            {
                "awardCount": 1,
                "awardId": "11945",
                "desc": "每天进页面获取一次",
                "limitDay": 1,
                "limitEveryDay": 1,
                "limitIMEI": true,
                "taskNo": ""
            },
            "id": 10442,
            "type": "FREE"
        },
        {
            "activityId": 2103,
            "content":
            {
                "appId": "3103040,3107537,2913929,2913859,2913971,2913939,3047014,2913970",
                "appStatus": "50",
                "awardCount": 1,
                "awardId": "11945",
                "desc": "打开应用获取机会",
                "index": 1,
                "limitDay": 1,
                "limitEveryDay": 1,
                "limitIMEI": true
            },
            "id": 10443,
            "type": "OPEN"
        }
    ],
    __APPS__: [
      {
        appId: 3132505,
        category_name: "休闲益智",
        evaluate_count: 31,
        icon:
          "http://game.res.meizu.com/fileserver/app_icon/2892/0713714b8ee244509b9d598e35020d64.png",
        images: [],
        name: "部落冲突",
        packageName: "com.tuijianyu.test.mz",
        size: 246741,
        star: 50,
        taskId: 9574,
        type: "OPEN",
        desc: "test",
        limitDay: 3
      },
      {
        appId: 3047405,
        category_name: "不好玩",
        evaluate_count: 356,
        icon:
          "http://game.res.meizu.com/fileserver/app_icon/2185/284f15e2e71d4284a98801ae20067c5d.png",
        images: [],
        name: "元气骑士",
        packageName: "com.test.luo",
        size: 246948,
        star: 47,
        taskId: 9575,
        type: "OPEN",
        desc: "test",
        limitDay: 3
      },
      {
        appId: 2684832,
        category_name: "不好玩",
        evaluate_count: 356,
        icon:
          "http://game.res.meizu.com/fileserver/app_icon/2185/284f15e2e71d4284a98801ae20067c5d.png",
        images: [],
        name: "超级马力欧",
        packageName: "com.test.luo",
        size: 246948,
        star: 47,
        taskId: 9576,
        type: "OPEN",
        desc: "test",
        limitDay: 3
      },
      {
        appId: 36482978,
        category_name: "不好玩",
        evaluate_count: 356,
        icon:
          "http://game.res.meizu.com/fileserver/app_icon/2185/284f15e2e71d4284a98801ae20067c5d.png",
        images: [],
        name: "超级幻影猫",
        packageName: "com.test.luo",
        size: 246948,
        star: 47,
        taskId: 9577,
        type: "OPEN",
        desc: "test",
        limitDay: 3
      },
      {
        appId: 3132505,
        category_name: "休闲益智",
        evaluate_count: 31,
        icon:
          "http://game.res.meizu.com/fileserver/app_icon/2892/0713714b8ee244509b9d598e35020d64.png",
        images: [],
        name: "部落冲突",
        packageName: "com.tuijianyu.test.mz",
        size: 246741,
        star: 50,
        taskId: 9574,
        type: "OPEN",
        desc: "test",
        limitDay: 3
      },
      {
        appId: 3047405,
        category_name: "不好玩",
        evaluate_count: 356,
        icon:
          "http://game.res.meizu.com/fileserver/app_icon/2185/284f15e2e71d4284a98801ae20067c5d.png",
        images: [],
        name: "元气骑士",
        packageName: "com.test.luo",
        size: 246948,
        star: 47,
        taskId: 9575,
        type: "OPEN",
        desc: "test",
        limitDay: 3
      },
      {
        appId: 2684832,
        category_name: "不好玩",
        evaluate_count: 356,
        icon:
          "http://game.res.meizu.com/fileserver/app_icon/2185/284f15e2e71d4284a98801ae20067c5d.png",
        images: [],
        name: "超级马力欧",
        packageName: "com.test.luo",
        size: 246948,
        star: 47,
        taskId: 9576,
        type: "OPEN",
        desc: "test",
        limitDay: 3
      },
      {
        appId: 36482978,
        category_name: "不好玩",
        evaluate_count: 356,
        icon:
          "http://game.res.meizu.com/fileserver/app_icon/2185/284f15e2e71d4284a98801ae20067c5d.png",
        images: [],
        name: "超级幻影猫",
        packageName: "com.test.luo",
        size: 246948,
        star: 47,
        taskId: 9577,
        type: "OPEN",
        desc: "test",
        limitDay: 3
      }
    ],
    __ZIPPOS__: [
        {
            "activityId": 2103,
            "content":
            {
                "conditions":
                {
                    "awardCondiction": 0,
                    "awardCount": 1,
                    "awardId": "11945",
                    "defaultAwardId": "",
                    "expId": "",
                    "globalZippo": "0",
                    "lotteryDay": "-1"
                },
                "probabilitys": [
                {
                    "awardId": 0,
                    "count": 0,
                    "weight": 1
                },
                {
                    "awardId": "11937",
                    "count": 1,
                    "weight": 1
                },
                {
                    "awardId": "11938",
                    "count": 1,
                    "weight": 1
                },
                {
                    "awardId": "11939",
                    "count": 1,
                    "weight": 1
                },
                {
                    "awardId": "11940",
                    "count": 1,
                    "weight": 1
                },
                {
                    "awardId": "11941",
                    "count": 1,
                    "weight": 1
                },
                {
                    "awardId": "11942",
                    "count": 1,
                    "weight": 1
                },
                {
                    "awardId": "11943",
                    "count": 1,
                    "weight": 1
                },
                {
                    "awardId": "11944",
                    "count": 1,
                    "weight": 1
                }]
            },
            "createTime": null,
            "id": 2415,
            "type": "LOTTERY"
        },
        {
            "activityId": 2103,
            "content":
            {
                "conditions":
                {
                    "awardCondiction": 0,
                    "awardCount": 1,
                    "awardId": "11945",
                    "defaultAwardId": "11944",
                    "expId": "",
                    "globalZippo": "0",
                    "lotteryDay": "1"
                },
                "probabilitys": [
                {
                    "awardId": 0,
                    "count": 0,
                    "weight": 1
                },
                {
                    "awardId": "11937",
                    "count": 1,
                    "weight": 1
                },
                {
                    "awardId": "11938",
                    "count": 1,
                    "weight": 2
                },
                {
                    "awardId": "11939",
                    "count": 1,
                    "weight": 1
                },
                {
                    "awardId": "11940",
                    "count": 1,
                    "weight": 1
                },
                {
                    "awardId": "11941",
                    "count": 1,
                    "weight": 1
                },
                {
                    "awardId": "11942",
                    "count": 1,
                    "weight": 1
                },
                {
                    "awardId": "11943",
                    "count": 1,
                    "weight": 1
                },
                {
                    "awardId": "11944",
                    "count": 1,
                    "weight": 2
                }]
            },
            "createTime": null,
            "id": 2416,
            "type": "LOTTERY"
        }
    ]
  };
}

Vue.use({
  install(vue) {
    vue.__STORE__ = {};
    vue.__META__ = {};
    vue.__REQ_ENV__ = process.env.NODE_ENV != "production" ? "/mock" : "";
  }
});
export default {
  name: "App",
  $global: true,
  //mixins: [LotteryMixin],
  data: function() {
    return {
      head_slogan1: require("assets/images/activity-anniversary-tankwar-2018/row_bg_01.png"),
      head_slogan2: require("assets/images/activity-anniversary-tankwar-2018/row_bg_02.png"),

      imgs: [
        {
          width: 206,
          height: 237,
          url: require("assets/images/activity-anniversary-tankwar-2018/awards/award1.png")
        },
        {
          width: 206,
          height: 248,
          url: require("assets/images/activity-anniversary-tankwar-2018/awards/award2.png")
        },
        {
          width: 206,
          height: 256,
          url: require("assets/images/activity-anniversary-tankwar-2018/awards/award3.png")
        },
        {
          width: 206,
          height: 240,
          url: require("assets/images/activity-anniversary-tankwar-2018/awards/award4.png")
        },
        {
          width: 206,
          height: 234,
          url: require("assets/images/activity-anniversary-tankwar-2018/awards/award5.png")
        },
        {
          width: 206,
          height: 203,
          url: require("assets/images/activity-anniversary-tankwar-2018/awards/award6.png")
        },
        {
          width: 206,
          height: 194,
          url: require("assets/images/activity-anniversary-tankwar-2018/awards/award7.png")
        },
        {
          width: 206,
          height: 195,
          url: require("assets/images/activity-anniversary-tankwar-2018/awards/award8.png")
        }
      ],
      qrImg: {
        url: require("assets/images/activity-anniversary-tankwar-2018/qr-code.png")
      },
      showList: ['我的奖品', '活动说明', '问题反馈'],
      ruleText: {
        fontColor: "#fff",
        text:
          "1. 通关游戏后中奖几率翻倍，请加油！<br>" +
          "2. 奖品将在活动结束后20个工作日内发放，请正确填写收奖信息<br>" +
          "3. 若领奖信息未填写或不完整，将默认放弃领奖资格<br>" +
          "4. 为公平起见，恶意刷奖用户将取消获奖资格<br>" +
          "5. 魅族游戏中心客服QQ：3001420726，热线：400-7883-332",
        type: Enum.MOTION.RULE_TXT
      },
      zippos: [],
      tokenAbnormal: false,
      showGame: false,
      gotop: false,

      winnerList: null,  //todo
      winnerList2: null,
    };
  },
  beforeMount() {
    if (
      process.env.NODE_ENV == "production" &&
      !(parent && parent._is_preview)
    ) {
      logger.makeActivityLog("activity_page_skim");
      N.on(Enum.INTERFACE_EVENT.LOGIN, () => {
        window.location.reload();
      });
      N.on(Enum.INTERFACE_EVENT.LOGOUT, () => {
        window.location.reload();
      });
    }
    // 只会在浏览器执行, 动态加载模块
    this.$options.components.Game = () => import("./Game.vue");
  },
  created() {},
  mounted() {
    var self = this;
    //活动时间判断
    let deadlines = util2.getUrlParam("deadlines"); // || new Date('2018-01-31 23:59:59').getTime(),
    if (deadlines && Date.now() > deadlines) {
      this.btnStatus = false;
      DialogBuilder.of(this).alert("活动已结束", "", function() {
        this.dismiss();
      });
      return;
    };
    //登陆状态判断
    if (!N.getUserId()) {
      logger.makeActivityLog("activity_not_login");
      DialogBuilder.of(this).alert(
        "登录后才可以抽奖哦~",
        function() {
          this.dismiss();
          N.login();
        },
        { confirmBtnTxt: "登录" }
      );
      return;
    };

    //获取免费次数
    if (!!N.getUserId()) {
      this.getFreeChance();
      this.getWinnerList();
    };

    this.addScroll();
  },
  computed: {
    titleStatus() {
      return N.getVersionCode("", "com.meizu.flyme.gamecenter") >= 7001005;
    },
    isBrowser() {
      return util2.isInBrowser();
    },
    freeTask() {
      if (util2.isInBrowser() && window.__ACTIVITY_CONFIG__) {
        return window.__ACTIVITY_CONFIG__.__TASKS__[0];
      }
    }
  },
  methods: {
    getTokenStatus(code) {
      if (code == 401) {
        this.tokenAbnormal = true;
      } else {
        this.tokenAbnormal = false;
      }
    },
    closeGame(){
      this.showGame = false;
    },
    getFreeChance() {
      let freeTask = this.freeTask;
      let freeTaskId = freeTask.id;
      if (!this.$checkVersion()) {
        return;
      }
      logger.makeActivityLog('activity_dotask_num');
      /* let freetask = this.$store.dispatch('postTask', {context: this, params: {task_ids: freeTaskId, content: {status:2}}});
                console.log(freetask) */
      this.$store
        .dispatch("postTask", {
          context: this,
          params: { task_ids: freeTaskId, content: { status: 2 } }
        })
        .then(val => {
          NativeInterface.emit(Enum.INTERFACE_EVENT.UPDATE_TIMES);
          logger.makeActivityLog('activity_dotask_success');
        })
        .catch(err => {
          //DialogBuilder.of(this).alert('获取抽奖机会失败', '请刷新重试');
          logger.makeActivityLog('activity_dotask_failed');
        });
    },
    getWinnerList() {
        logger.makeActivityLog('activity_pagein_winnerlist_times');
        this.$store.dispatch('fetchWinnerList', {context: this, params: { __silent__: true}}).then((response) => {
            logger.makeActivityLog('activity_pagein_winnerlist_success_times');
            if(response && response.length > 0){
                let list = response,
                    time = 0,
                    j = 0
                if(list.length < 5){
                    time = Math.ceil(5 / list.length) - 1
                    for(j = 0; j < time; j++){
                        list = list.concat(response)
                    }
                }
                this.winnerList = list;
                this.winnerList2 = list.concat(list);
            }else {
                this.winnerList = []
                this.winnerList2 = []
            }
        }).catch((err) => {
            logger.makeActivityLog('activity_pagein_winnerlist_bad_times');
        })
    },
    openGame() {
        logger.makeActivityLog("activity_startgm_clicks"); //点击开始游戏的次数和人数
        
        if (this.tokenAbnormal || !N.getUserId()) {
          DialogBuilder.of(this).alert(
            "登录后才可以抽奖哦~",
            function() {
              this.dismiss();
              N.login();
            },
            { confirmBtnTxt: "登录" }
          );
          return;
        };
        if (!this.$checkVersion()) {
            return;
        }
        if (this.$store.state.lotteryTimes > 0) {
            
            this.showGame = true;
            //this.$refs.game_pop.classList.add('open');
        } else {
            DialogBuilder.of(this).alert('暂无抽奖机会', '请下载安装游戏获取抽奖机会');
        }
    },
    clickGoTop(){
        var timer = null;
        let app = this.$refs.app;
        var scrolltop=app.scrollTop;

        timer = setInterval(function(){
            scrolltop = scrolltop-50;
            app.scrollTop = scrolltop;
            if(scrolltop<=10) clearInterval(timer);
        }, 16);
        
    },
    addScroll(){
        var self = this;
        let app = this.$refs.app;
        if (util2.isInBrowser()){
            app.addEventListener('scroll', function(e){
                //var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
                var scrolltop = app.scrollTop;
                if(scrolltop> 300){
                    self.gotop = true;
                }else self.gotop = false;
            });
        }
    }
  },
  
  components: {
    ActivityTitle,
    AppList,
    QrCode,
    RuleText,
    XTitle,
    Carousel,
    //Horse,
    'yh-bullet':YHBullet
  }
};
</script>

