<style lang="less">
/* ##remfixer: 1080 */
@import "~components/style/import.less";
@font-face{
    font-family: number1;
    src: url('./external/font/DINAlternateBold.ttf');
}
@font-face{
    font-family: number2;
    src: url('./external/font/Mouse.ttf');
    //src: url('./external/font/DINAlternateBold.ttf');
}

.app{
    background-color: #0c1146;
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
.header{
    height: 842px;
    background-image: url('~assets/images/activity-anniversary-pacman-2018/row_bg_001.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    &_slogan{
        width: 745px;
        height: 363px;
        margin: 130px auto 0;
        background-image: url('~assets/images/activity-anniversary-pacman-2018/slogan.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
}
.game_play-btn{
    width: 540px;
    height: 183px;
    margin: 40px auto 0;
    background-image: url('~assets/images/activity-anniversary-pacman-2018/play_btn.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    cursor: pointer;
}
.info{
    height: 678px;
    background-image: url('~assets/images/activity-anniversary-pacman-2018/row_bg_02.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
.buy{
    height: 690px;
    background-image: url('~assets/images/activity-anniversary-pacman-2018/row_bg_03.png');
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-position: center top;
    &_gift{
        width: 413px;
        height: 375px;
        margin: 36px auto 0;
        background-image: url('~assets/images/activity-anniversary-pacman-2018/gift.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
    &_tips{
        line-height: 40px;
        margin: 50px 0 0;
        text-align: center;
        font-size: 36px;
        color: #fff;
    }
    &_btn{
        display: block;
        width: 361px;
        height: 83px;
        line-height: 83px;
        margin: 30px auto 0;
        background-image: url('~assets/images/activity-anniversary-pacman-2018/buy_btn.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-color: transparent;
        font-size: 38px;
        color: #0c1146;
        text-align: center;
        font-weight: bold;
    }
}
.rank{
    .title{
        width: 543px;
        height: 58px;
        margin: 0 auto;
        background-image: url('~assets/images/activity-anniversary-pacman-2018/title1.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
    &_box{
        width: 1000px;
        margin: 86px auto 0;
        border: 4px solid #1f37a1;
        border-radius: 30px;
        padding:16px;
        background-color: #000;
    }
    &_hot{
        display: flex;
        width: 100%;
        overflow: hidden;
        justify-content: space-between;
        
        li{
            width: 280px;
            flex-shrink: 0;
        }
        &_head{
            position: relative;
            width: 202px;
            height: 198px;
            margin: 86px auto 0;
            background-size: 100% 100%;
            background-repeat: no-repeat;
        }
        &_img{
            position: absolute;
            width: 154px;
            height: 154px;
            bottom: 26px;
            left: 50%;
            transform: translate(-53%, 0);
            border-radius: 100%;
            border: 6px solid #fff;
            overflow: hidden;
            img{width: 100%;height: 100%;}
        }
        &_num{
            position: absolute;
            width: 60px;
            height: 60px;
            line-height: 60px;
            font-size: 40px;
            color: #ffdd22;
            text-align: center;
            background-color: #fff;
            border-radius: 100%;
            bottom: 8px;
            left: 50%;
            transform: translate(-50%, 0);
            font-family: number1;
        }
        &-1{
            .rank_hot_head{
                background-image: url('~assets/images/activity-anniversary-pacman-2018/rank_2.png');
            }
        }
        &-2{
            width: 340px;
            .rank_hot_head{
                height: 224px;
                margin-top: 20px;
                background-image: url('~assets/images/activity-anniversary-pacman-2018/rank_1.png');
            }
            .rank_hot_info{
                height: 240px;
            }
        }
        &-3{
            width: 340px;
            .rank_hot_head{
                background-image: url('~assets/images/activity-anniversary-pacman-2018/rank_3.png');
            }
        }
        &_info{
            width: 100%;
            height: 200px;
            margin-top: 30px;
            padding: 20px 10px;
            border: 3px dashed #fff;
            border-radius: 10px;
            text-align: center;
        }
        &_name{
            width: 100%;
            font-size: 40px;
            color: #fff;
            line-height: 60px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap
        }
        &_score{
            width: 160px;
            height: 50px;
            line-height: 50px;
            font-size: 28px;
            margin: 20px auto;
            background-image: url('~assets/images/activity-anniversary-pacman-2018/rank_txt_bg.png');
            background-size: 100% 100%;
            background-repeat: no-repeat;
            color: #000;
            p{
                .one-line();
                .text-vertical-Align(160, 50, 28, 0 0);
                text-align: center;
                line-height: 102px;
                
            }
            span{font-family: number2;}
        }
    }
    &_list{
        width: 100%;
        margin: 30px auto 0;
        padding: 0 22px;
        border: 4px solid #1f37a1;
        border-radius: 20px;
        background-color: #182d84;
        li{
            display: flex;
            position: relative;
            width: 100%;
            line-height: 0;
            padding: 24px 0;
            border-bottom: 2px dashed #05091a;
            overflow: hidden;
            align-content: center;
            align-items: center;
            &:last-child{border: none;}
        }
        &_num{
            display: block;
            width: 60px;
            line-height: 50px;
            font-size: 40px;
            font-family: number1;
            color: #f9f733;
            font-weight: bold;
        }
        &_img{
            width: 100px;
            height: 100px;
            margin-right: 40px;
            border: 3px solid #fff;
            border-radius: 100%;
            overflow: hidden;
            img{width: 100%;height: 100%;}
        }
        &_name{
            width: 500px;
            line-height: 50px;
            font-size: 40px;
            color: #fff;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap
        }
        &_score{
            position: absolute;
            line-height: 50px;
            top: 50%;
            right: 0;
            font-size: 40px;
            color: #fff;
            transform: translate(0, -50%);
            span{font-family: number2;}
        }
    }
}
.role{
    width: 1000px;
    height: 626px;
    margin: 60px auto 0px;
    background-image: url('~assets/images/activity-anniversary-pacman-2018/info_bg.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-color: #000;
    &_head{
        width: 240px;
        height: 240px;
        margin: 40px auto 0;
        border-radius: 100%;
        overflow: hidden;
    }
    &_name{
        line-height: 80px;
        font-size: 56px;
        color: #fff;
        margin: 24px auto;
        text-align: center;
    }
    &_info{
        display: flex;
        width: 900px;
        padding: 30px 20px;
        border: 4px solid #1f37a1;
        border-radius: 10px;
        background-color: #1a1a1a;
        margin: 0 auto;
        justify-content: center;
        align-content: center;
        align-items: center;
        &>div{
            width: 33.33%;
            border-right: 2px dashed #fff;
            text-align: center;
            &:last-child{border: none;}
        }
        &_num{
            font-size: 61px;
            color: #f9f733;
            font-family: number2;
        }
        &_txt{
            font-size: 36px;
            color: #fff;
        }
    }
}

.goTop{
    position: fixed;
    width: 150px;
    height: 156px;
    background-image: url('~assets/images/activity-anniversary-pacman-2018/gotop.png');
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
        width: 1000px;
        height: 330px;
        /* background-image: url('~assets/images/activity-anniversary-pacman-2018/qr-code.png');
        background-size: 100% 100%;
        background-repeat: no-repeat; */
        margin: 30px auto 0;
    }
    .rule-text{
        margin-top: 80px;
        background-color: transparent !important;
        color: #fac381;
    }
    .dialog, .dialog__body, .bottom-dialog{
        background-color: #182d84 !important;
        color: #fff !important;
    }
    .address-btn, .issues__submit-btn, .address__submit-btn, .dialog__confirm-btn{background-color: #f3694e !important;color: #fff !important;}
    .my-awards__info .get-btn{background-color: #f9b410 !important;color: #fff !important;}
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
          <div class="header_slogan"></div>
          <div class="game_play-btn" :style="'background-image:url('+ gameBtnStyle +')'" @click="openGame()" title="开始游戏"></div>
        </div>
        <div class="row info"></div>
        <div class="row buy">
            <div class="buy_gift"></div>
            <p class="buy_tips">每天中午12点开始抢购</p>
            <button class="buy_btn" :class="!!robBuyInfo.clickStatus?'active':'disabled'" @click="click_buy(robBuyInfo.userChance)" :style="'background-image:url('+ buyBtnStyle +')'">{{robBuyInfo.couponHtml}}</button>
        </div>
        <div class="row rank">
            <p class="title"></p>
            <div class="rank_box">
                <ul class="rank_hot" v-if="hotRanks.length>0">
                    <li v-for="(item, index) in hotRanks" :class="'rank_hot-' + (index+1)">
                        <div class="rank_hot_head">
                            <div class="rank_hot_img"><img :src="item.icon || df_head_img" :alt="item.nickname" ></div>
                            <p class="rank_hot_num">{{item.rank}}</p>
                        </div>
                        <div class="rank_hot_info">
                            <p class="rank_hot_name" :uid="item.uid">{{item.nickname || ("用户"+item.uid)}}</p>
                            <div class="rank_hot_score"><p><span>{{item.score}}</span>分</p></div>
                        </div>
                    </li>
                </ul>
                <ul class="rank_list" v-if="ranks.length>0">
                    <li v-for="(item, index) in ranks">
                        <span class="rank_list_num">{{item.rank}}</span>
                        <div class="rank_list_img"><img :src="item.icon || df_head_img" :alt="item.nickname"></div>
                        <p class="rank_list_name">{{item.nickname || ("用户"+item.uid)}}</p>
                        <p class="rank_list_score"><span>{{item.score}}</span>积分</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="row role">
            <div class="role_head"><img :src="userInfo.icon || df_head_img" :alt="userInfo.nickname"></div>
            <div class="role_name">{{userInfo.nickname}}</div>
            <div class="role_info">
                <div class="role_info_score">
                    <p class="role_info_num">{{userInfo.score || 0}}</p>
                    <p class="role_info_txt">积分</p>
                </div>
                <div class="role_info_gap">
                    <p class="role_info_num">{{rankGap}}</p>
                    <p class="role_info_txt">距离上榜</p>
                </div>
                <div class="role_info_rank">
                    <p class="role_info_num">{{userInfo.rank>0? userInfo.rank: 0}}</p>
                    <p class="role_info_txt">排名</p>
                </div>
            </div>
        </div>
        <div class="row bottom">
          <QrCode :qrImg="qrImg"></QrCode>
          <RuleText 
              fontColor="#f9f733"
              gapColor="#1f37a1"
              :ruleTextMotion = "{type: ruleText.type, 'params': ['活动说明', ruleText.text]}"
              :showList="showList"></RuleText>
        </div>
        <div class="goTop" title="返回顶部" v-show="gotop" @click="clickGoTop()"></div>
        <Game
            v-show="showGame"
            :play="showGame"
            v-on:closeGame="closeGame($event)"></Game>
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
import XTitle from "business/XTitle/index.vue";
import QrCode from "business/QrCode/index.vue";
import RuleText from "business/RuleText/index.vue";
import LotteryMixin from "base/LotteryMixin.js";
import ActivityDesc from "../activity-individual-compatiable-games2/FlowTips.vue";
import DialogBuilder from "base/DialogBuilder.js";
import BigTitle from 'littles/BigTitle.vue';
import LotteryResult from 'littles/LotteryResult.vue';

import { request, oauthRequest, createSilentParams} from 'common/request';
//import Game from './Game.vue';

if (process.env.NODE_ENV != "production") {
  window.__ACTIVITY_ID__ = 2015;
  window.__ACTIVITY_CONFIG__ = {
    __INFO__: { startTime: 1512979323000, endTime: 1514707323000 },
    __AWARDS__: [
        {
            "activityId": 2105,
            "countLimit": 1010,
            "countSent": 0,
            "extValue1": "eyJsb3R0ZXJ5Q291bnQiOjAsImF3YXJkTWluTW9uZXkiOjAsInBheU1pbiI6bnVsbCwicGF5TWF4IjpudWxsLCJjbGVhblR5cGUiOiIwIn0=",
            "goodsId": 1,
            "icon": "http://game.res.meizu.com/gamecenter/fileserver/activity/image/63/15368202013954vyY43ba_gif.png",
            "id": 11958,
            "name": "抢购付费礼包",
            "type": "GIFT",
            "value": 1
        },
        {
            "activityId": 2105,
            "countLimit": 1000,
            "countSent": 0,
            "extValue1": "eyJsb3R0ZXJ5Q291bnQiOjAsImF3YXJkTWluTW9uZXkiOjAsInBheU1pbiI6bnVsbCwicGF5TWF4IjpudWxsLCJjbGVhblR5cGUiOiIwIn0=",
            "goodsId": 1,
            "icon": "http://game.res.meizu.com/gamecenter/fileserver/activity/image/63/1536820198569Z3IP7JSn_gif.png",
            "id": 11975,
            "name": "免费游戏积分",
            "type": "INTEGRATION",
            "value": 1
        },
        {
            "activityId": 2105,
            "countLimit": 1000,
            "countSent": 0,
            "extValue1": "eyJsb3R0ZXJ5Q291bnQiOjAsImF3YXJkTWluTW9uZXkiOjAsInBheU1pbiI6bnVsbCwicGF5TWF4IjpudWxsLCJjbGVhblR5cGUiOiIxIn0=",
            "goodsId": 1,
            "icon": "http://game.res.meizu.com/gamecenter/fileserver/activity/image/64/1536829624894gFLEUuLo_gif.png",
            "id": 11976,
            "name": "抢购积分",
            "type": "INTEGRATION",
            "value": 1
        }
    ],
    __TASKS__: [
        {
            "activityId": 2105,
            "content": {"awardCount":1,"awardId":"11975","desc":"获取免费次数","limitDay":1,"limitEveryDay":1,"limitIMEI":true,"taskNo":""},
            "id": 10447,
            "type": "FREE"
        },
        {
            "activityId": 2105,
            "content": {"awardCount":1,"awardId":"11976","limitDay":1,"limitEveryDay":1,"limitIMEI":true,"time":"10:00","total":100},
            "id": 10461,
            "type": "SECKILL"
        }
    ],
    __APPS__: [],
    __ZIPPOS__: [
        {
            "activityId": 2105,
            "content": {"conditions":{"awardCount":1,"awardId":"11975"}},
            "createTime": null,
            "id": 2419,
            "type": "SCORERANK"
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
  //mixins: [LotteryTipsMixin],
  data: function() {
    return {
        df_head_img: require("assets/images/public/head_04.png"),

        qrImg: {
            url: require("assets/images/activity-anniversary-pacman-2018/qr-code.png")
        },
        showList: ['我的奖品', '活动说明', '问题反馈'],
        ruleText: {
            fontColor: "#fff",
            text:
            "1. 购买礼包的用户至少可以收到价值99元的游戏周边一份，最高可开出价值500元的游戏周边大礼包<br>" +
            "2. 周边礼包每天限量供应100份，活动期间每个用户仅可购买一次<br>" +
            "3. 活动结束后游戏积分排名前10的⽤⼾可额外获得游戏周边⼤礼包⼀份<br>" +
            "4. 礼包购买仅支持7.3.4以上版本的游戏中心，低版本用户请前往应用商店升级<br>" +
            "5. 若游戏中心版本高于7.3.4依然无法购买礼包，请重新登录账号再尝试<br>" +
            "6. 奖品将在活动结束后20个工作日内发放，请正确填写收奖信息<br>" +
            "7. 若领奖信息未填写或不完整，默认放弃领奖资格<br>" +
            "8. 为公平起见，恶意刷奖用户将取消获奖资格<br>" +
            "9. 魅族游戏中心客服QQ：3001420726，热线：400-7883-332",
            type: Enum.MOTION.RULE_TXT
        },
        zippos: [],
        tokenLose: false,
        showGame: false,
        gotop: false,

        userInfo: {
            rank: '',
            score: 0,
            icon: '',
            nickname: ''
        },
        rankGap: 0,
        hotRanks: [],
        ranks: [],
        
        times: 0,
        times1: 0, //游戏的免费次数

        robBuyInfo: {
            couponStatus: false,
            clickStatus: false,
            couponHtml: '',
            used: 0,
            total: 0,
            userChance: 0
        },

        scorerankZip: util.isInBrowser() && window.__ACTIVITY_CONFIG__ ? window.__ACTIVITY_CONFIG__.__ZIPPOS__[0] : {}, //积分排行

        buySeckillAward: util.isInBrowser() && window.__ACTIVITY_CONFIG__ ? window.__ACTIVITY_CONFIG__.__AWARDS__[0] : {}, //抢购付费礼包
        seckillTask: util.isInBrowser() && window.__ACTIVITY_CONFIG__ ? window.__ACTIVITY_CONFIG__.__TASKS__[1] : {}, //抢购任务
        exchangeZip: util.isInBrowser() && window.__ACTIVITY_CONFIG__ ? window.__ACTIVITY_CONFIG__.__ZIPPOS__[1] : {}, //抢购后兑换
        
    };
  },
  beforeMount() {
    var self = this;
    if (process.env.NODE_ENV == "production") {
        logger.makeActivityLog("activity_page_skim");
        N.on(Enum.INTERFACE_EVENT.LOGIN, () => {
            window.location.reload();
        });
        N.on(Enum.INTERFACE_EVENT.LOGOUT, () => {
            window.location.reload();
        });
        //支付事件
        N.on(Enum.INTERFACE_EVENT.PAY_SUCCESS, ()=> {
            logger.makeActivityLog('activity_pay_success');
            //添加缓存
            util.setStorage('seckill_buy', 1);
            util.setStorage('seckill_chance', 0);//次数已使用
            //alert("支付成功！");

            //调起填写地址弹窗
            self.addRess();
            self.getRobBuyInfo(); //更新购买状态
        });
        N.on(Enum.INTERFACE_EVENT.PAY_ERROR, ()=> {
            logger.makeActivityLog('activity_pay_error');
            alert("支付失败！");
        });
    }
    // 只会在浏览器执行, 动态加载模块
    this.$options.components.Game = () => import("./Game-phaser.vue");
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
    this.zippos = util.getZippos();

    //获取免费次数
    //if (!!N.getUserId()) {
        this.getFreeChance();
        //this.getRobBuyInfo();//获取购买抢购活动信息
      
        //this.getScoreRank(); //获取积分排行版
    //};

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
    },
    gameBtnStyle(){
        if(this.times1>0){
            return require('assets/images/activity-anniversary-pacman-2018/play_btn.png')
        }else{
            return require('assets/images/activity-anniversary-pacman-2018/play_btn-dis.png')
        }
    },
    buyBtnStyle(){
        if(this.robBuyInfo.clickStatus){
            return require('assets/images/activity-anniversary-pacman-2018/buy_btn.png')
        }else{
            return require('assets/images/activity-anniversary-pacman-2018/buy_btn-dis.png')
        }
    }
  },
  methods: {
    $updateLotteryTimes() {
        var self = this;
        let p = new Promise((resolve, rejected)=> {
            if(N.getUserId()) {
                let zippoIds = this.zippos.map((item)=> item.id);
                this.$store.dispatch('fetchLotteryTimes', {context: this, params: {zippo_ids: zippoIds.join(',')}}).then((val)=> {
                    resolve(val);
                }).catch((err) => {
                    logger.makeActivityLog('activity_prizebadtime_juge');//获取次数接口异常埋点
                    if(err.code == 401) {
                        logger.makeActivityLog('activity_signbad_juge', {message: err.message});//登录账号异常
                        self.tokenLose = true;//token丢失了
                    }
                    this.$handleReqErr(err);
                    rejected(err);
                });
            } else {
                this.$store.commit('setLotteryTimes', 0);
            }
        });
        return p;
    },
    doTask(task_ids, callBack, errCallBack){
        var self = this;
        if (!this.$checkVersion()) {
            return;
        }
        logger.makeActivityLog('activity_dotask_num');
      /* let freetask = this.$store.dispatch('postTask', {context: this, params: {task_ids: freeTaskId, content: {status:2}}});
                console.log(freetask) */
      this.$store
        .dispatch("postTask", {
            context: this,
            params: { task_ids: task_ids, content: { status: 2 } }
        })
        .then(val => {
            this.$updateLotteryTimes().then((times)=>{
                if(typeof callBack == 'function') callBack(val, times);
            })
            //NativeInterface.emit(Enum.INTERFACE_EVENT.UPDATE_TIMES);
            logger.makeActivityLog('activity_dotask_success');
        })
        .catch(err => {
            //DialogBuilder.of(this).alert('获取抽奖机会失败', '请刷新重试');
            logger.makeActivityLog('activity_dotask_failed');
            if(typeof errCallBack == 'function') errCallBack(err);
            if(err.code == 401) self.tokenLose = true;//token丢失了
        });
    },
    getFreeChance() {
        var self = this;
        let freeTask = this.freeTask;
        let freeTaskId = freeTask.id;

        this.doTask(freeTaskId, function(val, times) {
            let zippoTimes = times.zippoTimes || [];
            zippoTimes.map((val, index)=>{
                if(val.zippo_id == self.scorerankZip.id){
                    self.times1 = val.times;
                    console.log(self.times1)
                }
            });
        });
    },
    //获取购买状态
    getRobBuyInfo(){
        var self = this;
        //如果本地已缓存购买记录
        if(util.getStorage('seckill_buy')){
            self.setSeckill({status: 1});//已经购买
            return false;
        };
        //查询购买状态
        self.doAjax('/oauth/activity/user/material/bought/', {awardId: self.buySeckillAward.id}).then((val)=>{
            if(val){
                //判断当前是否未购买
                if(val.status==0){
                    self.getSeckillInfo();//查询抢购状态
                }else{
                    self.setSeckill(val);
                };
            }else{
                self.setSeckill({status: 2}); //为查到数据，设置为已卖完
            }
        }).catch((err)=>{
            DialogBuilder.of(this).alert('出错了', '请刷新重试～');
            self.robBuyInfo.couponHtml = '请登录';
        });
    },
    getSeckillInfo(){
        var self = this;
        this.doAjax('/oauth/activity/seckill/task/', {task_ids: self.seckillTask.id, __silent__: true}).then((val)=> {
            if(val){
                self.setSeckill(null, val[0]);
            }
        }).catch((err)=>{
            if(err.code == 113002){
                DialogBuilder.of(this).alert('', '活动已结束');
            }else if(err.code == 401) {
                logger.makeActivityLog('activity_signbad_juge');//登录账号异常
            }else {
                this.$handleReqErr(err);
                // DialogBuilder.of(this).alert('出错了', '请刷新重试～');
            };
        })
    },
    setSeckill(buyState, robState, callback){
        var buyTemp = buyState || null;
        var robTemp = robState || null;

        this.robBuyInfo.couponHtml = '9.9元购买'
        this.robBuyInfo.nonStart = false;
        this.robBuyInfo.userChance = 0;

        //判断整个的购买状态,如果不是未购买
        //0未购买;1:已购买;2:已卖完
        if(!!buyTemp && !buyTemp.status==0){
            this.robBuyInfo.couponStatus = false;
            this.robBuyInfo.clickStatus = false;
            if(buyTemp.status==1){
                this.robBuyInfo.couponHtml = "已购买";
                
            }else{
                this.robBuyInfo.couponHtml = "已卖完"
            };
            return false;
        };
        //判断抢购状态
        if(!!robTemp){
            var start = new Date(robTemp.startTime*1000),
                hour = start.getHours(),
                mins = start.getMinutes()
            mins = mins<0? ('0'+mins): mins;
            hour = hour<0? ('0'+hour): hour;
            if(mins && mins != '00'){
                this.robBuyInfo.startTime = hour+":"+mins
            }else{
                this.robBuyInfo.startTime = hour+"点"
            }
            if(robTemp.userUsed){
                this.robBuyInfo.couponStatus = true
                this.robBuyInfo.couponHtml = "已购买"
                this.robBuyInfo.clickStatus = false
            }/* else if(robTemp.userChance){  // 有机会，但是没有用过，需判断是一进页面，还是执行抢购任务时

            } */else if(robTemp.userChance<=0 && robTemp.used == robTemp.total){
                this.robBuyInfo.used = robTemp.used
                this.robBuyInfo.total = robTemp.total
                this.robBuyInfo.couponStatus = false
                this.robBuyInfo.couponHtml = "已抢光"
                this.robBuyInfo.clickStatus = false
            }else if(robTemp.nowTime < robTemp.startTime){
                this.robBuyInfo.couponStatus = false
                this.robBuyInfo.nonStart = true
                this.robBuyInfo.couponHtml = "未开始"
                this.robBuyInfo.nowTime = robTemp.nowTime
                this.robBuyInfo.start = robTemp.startTime
                this.robBuyInfo.clickStatus = false
            }else {
                this.robBuyInfo.couponStatus = false
                this.robBuyInfo.nonStart = false
                this.robBuyInfo.couponHtml = "9.9元购买"
                this.robBuyInfo.clickStatus = true;
                this.robBuyInfo.userChance = robTemp.userChance;
            };
        };
        if(typeof callback == 'function') callback(buyState, robState);
    },
    payEvent(awardId){
        N.pay(awardId);
    },
    click_buy(userChance){
        var self = this;
        logger.makeActivityLog("activity_clickbuy_num");
        if (this.tokenLose || !N.getUserId()) {
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
        if (!this.$checkVersion(7003004)) {
            return;
        };
        //不可以点击，不可进入逻辑
        if(!self.robBuyInfo.clickStatus){
            return false;
        }

        if(userChance>0){
        //if(false){
            //有次数，直接调起支付接口
            self.payEvent(this.buySeckillAward.id);
        }else{
            //发起抢购task
            this.doTask(this.seckillTask.id, function(val, times){
                if(val){
                    //查询抢购状态
                    self.doAjax('/oauth/activity/seckill/task/', {task_ids: self.seckillTask.id, __silent__: true}).then((val)=> {
                        let result = val[0];
                        self.setSeckill(null, result); //重置按钮状态

                        //有次数，未领取过，领取还有次数，活动已经开始了
                        if(result.userChance>0 && !result.userUsed && result.used < result.total && result.nowTime >= result.startTime){
                            self.payEvent(self.buySeckillAward.id); //调起支付
                            util.setStorage('seckill_chance', 1); //记录有抢购次数
                        }else{
                            DialogBuilder.of(this).alert('提示', '已经抢完，请明天再来！');
                        }
                    });
                }
            }, function(err){
                if(err.code == 113004){
                    DialogBuilder.of(this).alert('提示', '一台手机只能参与一次！');
                }else{
                    DialogBuilder.of(this).alert('提示', '已经抢完，请明天再来！');
                }
            });
        };
    },
    //获取个人的积分信息和积分排行版
    getScoreRank(){
        var self = this;
        this.doAjax('/oauth/activity/score/rank/', {top: 10, nd: new Date().getTime()}).then((val)=> {
            console.log(val);
            if(val){
                let userInfo = val.user || {},
                    ranks = val.ranks || [];
                ranks.sort(function(a, b){
                    return a.rank>b.rank;
                });

                let hotRanks = ranks.slice(0, 3);
                    hotRanks.splice(1 - 1, 1, ...hotRanks.splice(2 - 1, 1, hotRanks[1-1]));

                self.userInfo = userInfo;
                self.hotRanks = hotRanks;
                self.ranks = ranks.slice(3, ranks.length);
                
                var lastScore = ranks.length>0? ranks[ranks.length-1].score: 0;
                if(userInfo.score>=0 && (userInfo.rank>10 || userInfo.rank==-1)){
                    self.rankGap =  Math.abs(userInfo.score-lastScore);
                }else{
                    self.rankGap = 0;
                }
            };
        })
    },
    openGame() {
        logger.makeActivityLog("activity_startgm_clicks"); //点击开始游戏的次数和人数

        if (this.tokenLose || !N.getUserId()) {
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
        };

        if (this.times1 > 0) {
            
            this.showGame = true;
            //this.$refs.game_pop.classList.add('open');
        } else {
            DialogBuilder.of(this).alert('暂无游戏机会', '请明天再来吧！');
        }
    },
    closeGame(){
      this.showGame = false;
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
    doAjax(url, params) {
        ///oauth/worksheet/add
        return oauthRequest.call(this, `${Vue.__REQ_ENV__}${url}${window.__ACTIVITY_ID__}`, params);
        //return this.$http.get(`${url}${window.__ACTIVITY_ID__}`, {params: params});
    },
    addRess(){
        this.$doMotion({type: Enum.MOTION.ADDRESS, params: []});
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
  watch: {
    '$store.state.zippoTimes': {
        handler: function(newVal) {
            var self = this;
            let times = 0;
                     
            newVal.forEach(function(zippoTime) {
                if(process.env.NODE_ENV == 'production') {
                    //更新游戏的次数
                    if(zippoTime.zippo_id == self.scorerankZip.id){
                        self.times1 = zippoTime.times;
                    };
                    if(str.indexOf(String(zippoTime.zippo_id)) >= 0) {
                        times += zippoTime.times;
                    }
                } else {
                    times += zippoTime.times;
                    self.times1 = 1;
                }
            });
            this.$store.commit('setLotteryTimes', times);
            this.times = times;
            if(times > 0) {
                logger.makeActivityLog('activity_prize_num');
            };
        },
        immediate: true
    }
},
  components: {
    ActivityTitle,
    QrCode,
    RuleText,
    XTitle,
  }
};
</script>

