<style lang="less">
/* ##remfixer: 1080 */

@import "~components/style/import.less";
* {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.game {
    &_close{
        position: absolute;
        width: 100px;
        height: 100px;
        top: 40px;
        right: 40px;
        background-image: url("~assets/images/activity-anniversary-pacman-2018/Close.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        z-index: 10;
    }
    &_layer {
        position: fixed;
        width: 100%;
        height: 100%;
        margin: 0 auto 0;
        top: 0;
        left: 0;
        animation: openGame 0.5s ease 0s 1 both;
        z-index: 100; //background-color: rgba(40, 40, 40, 1);
        background-image: url("~assets/images/activity-anniversary-pacman-2018/game_bg.png");
        background-size: 100% auto;
        background-repeat: repeat-y;
        &.open {
            opacity: 1;
            transform: scale(1, 1);
        }
    }
    /* &__layer:before{
            position: absolute;
            content: "";
            width: 100%;
            height: 7.7rem;
            top: 0;
            left: 0;
            z-index: 5;
        } */
    &_score {
        display: flex;
        width: 100%;
        height: 178px; //justify-content: center;
        justify-content: flex-start;
        align-items: center;
        align-content: center;

        span {
            display: block;
            margin-right: 80px;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            text-align: center;
            font-size: 54px;
            color: #fff;
            transform-origin: 50% 50%;
            &.timeBig{
                animation: timeBig 1s ease 0s infinite both;
            }
        }
        &-score {
            width: 230px;
            height: 107px;
            line-height: 107px;
            padding-left: 102px;
            margin-left: 52px;
            background-image: url("~assets/images/activity-anniversary-pacman-2018/coin.png");
        }
        &-time {
            width: 222px;
            height: 98px;
            line-height: 98px;
            padding-left: 94px;
            background-image: url("~assets/images/activity-anniversary-pacman-2018/time.png");

        }
        &-life {
            width: 173px;
            height: 92px;
            line-height: 92px;
            padding-left: 36px;
            background-image: url("~assets/images/activity-anniversary-pacman-2018/lfie.png");
        }
    }
    &_canvas {
        position: relative;
        width: 100%; //1080,28
        height: 1196px; //31
        background-color: #000;
        overflow: hidden;
        &_box{width: 1008px;height: 1116px;margin: 40px auto;}
        canvas {
            width: 100% !important;
            height: 100% !important;
        }
    }
    &_control {
        position: relative;
        display: flex;
        width: 100%;
        height: 100%; //justify-content: center;
        padding-bottom: 1374px;
        justify-content: center;
        align-items: center;
        align-content: center;
        &_box{
            display: flex;
            width: 950px;
            height: 411px;
            background-image: url("~assets/images/activity-anniversary-pacman-2018/control_bg.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;
            text-align: center;
            justify-content: center;
            align-items: center;
            align-content: center;
        }
        &_direction {
            position: relative;
            width: 358px;
            height: 358px;
            background-image: url("~assets/images/activity-anniversary-pacman-2018/direction.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;
            text-align: center;
        }
        button {
            background-color: transparent;
            background-repeat: no-repeat;
        }
        &_up {
            position: absolute;
            width: 148px;
            height: 170px; //120
            top: -50px;
            left: 50%;
            margin-left: -74px;
            background-size: 120px 105px;
            background-position: center bottom;
            &.down{
                background-image: url("~assets/images/activity-anniversary-pacman-2018/d_up.png");
            }
            
        }
        &_right {
            position: absolute;
            width: 170px;
            height: 148px;
            top: 50%;
            right: -50px;
            margin-top: -74px;
            background-size: 105px 120px;
            background-position: left center;
            &.down{
                background-image: url("~assets/images/activity-anniversary-pacman-2018/d_right.png");
            }
        }
        &_down {
            position: absolute;
            width: 148px;
            height: 170px;
            bottom: -50px;
            left: 50%;
            margin-left: -74px;
            background-size: 120px 105px;
            background-position: center top;
            &.down{
                background-image: url("~assets/images/activity-anniversary-pacman-2018/d_down.png");
            }
        }
        &_left {
            position: absolute;
            width: 170px;
            height: 148px;
            top: 50%;
            left: -50px;
            margin-top: -74px;
            background-size: 105px 120px;
            background-position: right center;
            &.down{
                background-image: url("~assets/images/activity-anniversary-pacman-2018/d_left.png");
            }
        }
        &_shoot {
            width: 243px;
            height: 243px;
            background-image: url("~assets/images/activity-anniversary-pacman-2018/shoot.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-color: transparent;
            &.down {
                background-image: url("~assets/images/activity-anniversary-pacman-2018/shoot_d.png");
            }
        }
    }
    &_ready {
        position: absolute;
        width: 300px;
        height: 300px;
        line-height: 300px;
        top: 50%;
        left: 50%;
        margin: -150px 0 0 -150px;
        background-color: rgba(255, 255, 255, 0.8);
        z-index: 10;
        font-size: 80px;
        color: #d54409;
        text-align: center;
        border-radius: 100%;
    }
    &_over{
        display: none;
        &-pop{
            position: absolute;
            width: 800px;
            height: 455px;
            top: 50%;
            left: 50%;
            margin: -227.5px 0 0 -400px;
            background-image: url("~assets/images/activity-anniversary-pacman-2018/gameover.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-color: transparent;
        }
        &.open{
            display: block;
        }
    }
    &_over.open .game_over-pop{
        animation: fideTop 1s ease 0.1s both;
    }
}

@keyframes openGame {
    0% {
        opacity: 0.1;
        transform: scale(0.5, 0.5);
    }
    100% {
        opacity: 1;
        transform: scale(1, 1);
    }
}
@keyframes fideTop {
    0% {
        opacity: 0.1;
        transform: translate(0, 100%);
    }
    100% {
        opacity: 1;
        transform: translate(0, 0);
    }
}
@keyframes timeBig{
    0% {
        transform: scale(1, 1);
    }
    100% {
        transform: scale(1.3, 1.3);
    }
}
</style>
<template>
    <div class="game_layer">
        <a class="game_close" href="javascript:;" title="关闭" @click="closeGame()"></a>
        <div class="game_score">
            <span class="game_score-score">{{GAME_SOURCE}}</span>
            <span class="game_score-time" :class="{'timeBig': timeBig}">{{GAME_TIME}}s</span>
        </div>
        <div class="game_canvas" >
            <div class="game_ready" v-if="readyText!=''">{{readyText}}</div>
            <div class="game_over" ref="game_over"><div class="game_over-pop"></div></div>
            <div class="game_canvas_box" ref="game" ></div>
        </div>
        <div class="game_control">
            <div class="game_control_box">
                <div class="game_control_direction" ref="control_btns">
                    <button class="game_control_up" ctype="up" title="上"></button>
                    <button class="game_control_right" ctype="right" title="右"></button>
                    <button class="game_control_down" ctype="down" title="下"></button>
                    <button class="game_control_left" ctype="left" title="左"></button>
                </div>
            </div>
        </div>
        <audio :src="readyGo" preload="preload" ref="readyGo"></audio>
        
    </div>
</template>
<script>
import Vue from "vue";
import "style/common.less";
import logger from "common/logger";
import util from "common/util";
import util2 from "common/util2";
import N from "common/nativeinterface";
import Enum from "common/enum";
import DialogBuilder from "base/DialogBuilder.js";
var md5 = require("md5");
var Base64 = require('js-base64').Base64;

import Pacman from './external/Pacman-phaser.js'

var GAME = null;

export default {
    name: "Game",
    $global: true,
    props: {
        play: {
            type: Boolean,
            default: false
        },
    },
    data: function() {
        return {
            zipid: util.isInBrowser() && window.__ACTIVITY_CONFIG__ ? window.__ACTIVITY_CONFIG__.__ZIPPOS__[0] : {},
            
            GAME_SOURCE: 0,
            GAME_TIME: 40,

            readyGo: require("assets/images/activity-anniversary-pacman-2018/game/audio/ready-go.mp3"),

            gameTimer: null,
            timer: null,
            readyText: "READY",
            timeBig: false
        };
    },
    beforeMount() {},
    created() {
        this.readyText = "READY";
    },
    mounted() {
        var self = this;
        //注册父组件的更新次数
        N.on(Enum.INTERFACE_EVENT.UPDATE_TIMES, ()=> {
           self.$parent.$updateLotteryTimes();
        });

        
    },
    computed: {},
    methods: {
        doLottery(zipid, errCallBack) {
            logger.makeActivityLog("activity_prize_draw"); //点击抽奖；抽奖逻辑成功
            if (!this.$checkVersion()) {
                errCallBack();
                return;
            }
            if (this.times > 0) {
                this.startTime = Date.now();
                //let zippoIds = this.zippos.map(zippo => zippo.id).join(",");
                let _zipid = zipid || this.zipid1;
                logger.makeActivityLog("activity_prize_num");
                this.$store
                    .dispatch("doLottery", {
                        context: this,
                        params: { zippo_ids: _zipid }
                    })
                    .then(value => {
                        this.showLotteryResult(value[0]);
                    })
                    .catch(err => {
                        logger.makeActivityLog("activity_prizebad_juge"); //调抽奖接口返回错误、异常埋点
                        this.$handleReqErr(err);
                        errCallBack();
                    });
            } else {
                logger.makeActivityLog("activity_notimes_num"); //登陆后无抽奖机会点击参与抽奖人数
                if (util.canGetMore()) {
                    DialogBuilder.of(this).alert(
                        "暂无抽奖机会",
                        this.$lang.$$noTimesTips
                    );
                    // DialogBuilder.of(this).alert('暂无抽奖机会', '请下载游戏获取抽奖机会');
                } else {
                    DialogBuilder.of(this).alert(
                        "已无抽奖机会",
                        this.$lang.$$reallyNoTimesTips
                    );
                }
                errCallBack();
            }
        },
        showLotteryResult(result) {
            let award = null;
            if (!result) {
                N.emit(Enum.INTERFACE_EVENT.UPDATE_TIMES);
                return;
            }
            if (result.award_id != 0) {
                award = util.findAwardById(result.award_id);
                if (!award) {
                    DialogBuilder.of(this).alert(
                        "出错了！刷新看看~~~",
                        function() {
                            this.dismiss();
                            N.emit(Enum.INTERFACE_EVENT.LOGIN);
                        }, { confirmBtnTxt: "刷新" }
                    );
                    return;
                }
            } else {
                let thanks = util.findAwardsByType(Enum.AWARD_TYPE.INTEGRATION);
                if (thanks.length) {
                    award = util.randomFormArr(thanks);
                } else {
                    DialogBuilder.of(this).alert("出错了！刷新看看~~~");
                }
            }
            logger.makeActivityLog("activity_prize_complete"); //点击抽奖成功次数

            this.$delay(600).then(() => {
                this.$showLotteryResult(award);
            });
        },
        initGame(callBack) {
            var self = this;
            var options = {
                width: 1008, //1014
                height: 1116 //720
            };
            try{
                GAME = new Pacman(self.$refs.game, options); //初始化并执行loding
                GAME.init();
            }catch(err){
                DialogBuilder.of(this).alert(err);
            }

            //方向控制
            this.$refs.control_btns.addEventListener("touchstart", function(e) {
                var target = e.target,
                    ctype = target.getAttribute("ctype");
                target.classList.add("down");
                GAME.direction(ctype, true);
            });
            /* this.$refs.control_btns.addEventListener("touchmove", function(e) {
                var target = e.target,
                    ctype = target.getAttribute("ctype");
                GAME.direction(ctype, true);
            });
            */
            this.$refs.control_btns.addEventListener("touchend", function(e) {
                var target = e.target,
                    ctype = target.getAttribute("ctype");
                target.classList.remove("down");
                //GAME.direction(ctype, false);
            }); 
            //监听到游戏开始
            GAME.eon("gameStart", function(score) {
                console.log('游戏正式开始！');
                self.gameCountDown();
            });
            //绑定事件 //增加分数
            GAME.eon("addScore", function(score) {
                self.GAME_SOURCE = score || 0;
            });
            GAME.eon("killEnemy", function(){
                //播放迟到的声音
            })
            //中途没命或者失败的抽奖
            GAME.eon("gameOver", function(life) {
                console.log('over');
                self.gameEnd();
            });
            //通关游戏的抽奖
            GAME.eon("gameWin", function(life) {
                console.log('win');
                self.gameEnd();
            });

            if(typeof callBack == "function") callBack.call(this);
        },
        gameCountDown(){
            var self = this;
            clearInterval(this.gameTimer);
            this.gameTimer = setInterval(function(){
                  self.GAME_TIME--;
                  //判断时间闪烁
                  if(self.GAME_TIME<10 && self.GAME_TIME>0){
                      self.timeBig = true;
                  }else{
                      self.timeBig = false;
                  }
                  if(self.GAME_TIME<=0){
                      clearInterval(self.gameTimer);
                      GAME.setGameOver();
                      //self.gameEnd();
                  }
            },1000);
        },
        startGame(){
            var self = this;
            //判断当前play状态
            if (this.play) {
                GAME.init();
                this.$refs.readyGo.play();

                //2s后变化为go
                self.timer = setTimeout(() => {
                    self.readyText = "GO";
                    //0.5后开始游戏
                    setTimeout(() => {
                        self.readyText = "";
                        //资源加载完成了
                        //if (GAME.isloading) {
                            GAME.startPlay();
                            //self.gameCountDown(); //倒计时
                        /* } else {
                            DialogBuilder.of(self).alert("资源加载失败，请关闭重试！");
                            self.closeGame();
                        } */
                    }, 500);
                }, 1800);
            } else {
                clearTimeout(self.timer);
            }
        },
        gameEnd(){
            var self = this;
            clearInterval(this.gameTimer);
            //游戏结束，发送zips
            let uid = N.getUserId(),
                time = new Date().getTime();
            var val3 = md5(`score=${self.GAME_SOURCE}&time=${time}&${md5(uid)}`);
            var dataStr = Base64.encode(`{"score": ${self.GAME_SOURCE}, "time": ${time}, "sign": "${val3}"}`);
            console.log(dataStr)
            this.$store
                .dispatch("doLottery", {
                    context: this,
                    params: { zippo_ids: self.zipid.id, data: dataStr}
                })
                .then(value => {
                    if(value[0]){
                        //提交积分成功
                        console.log('提交积分成功');
                        //隐藏游戏, 
                        N.emit(Enum.INTERFACE_EVENT.UPDATE_TIMES);
                        setTimeout(() => {
                            self.$parent.getScoreRank(); //更新积分排行版
                        }, 4000);
                    }
                })
                .catch(err => {
                    logger.makeActivityLog("activity_prizebad_juge"); //调抽奖接口返回错误、异常埋点
                    this.$handleReqErr(err);
                    DialogBuilder.of(this).alert('出错了', '请刷新重试～');
                });
            //定时隐藏游戏
            setTimeout(() => {
                self.closeGame();
            }, 2000);
        },
        gameReset(){
            this.GAME_SOURCE = 0;
            this.GAME_TIME = 40;
            this.GAME_LIFE = 1;
            this.readyText = "READY";
            this.$refs.game_over.classList.remove('open');
            GAME.resetGame(); //重置游戏
        },
        closeGame() {
            this.$emit("closeGame", false);
            this.gameReset();
            //GAME.resetGame();
        }
    },
    watch: {
        "play": function(){
            if(this.play && util2.isInBrowser){
                this.$nextTick(()=>{
                    this.initGame(function(){
                        this.startGame();
                    });  
                }) 
            }
        }
    }
};
</script>