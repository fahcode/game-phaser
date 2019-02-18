
<style lang="less">
    .activity-title {
        &__panel {
            position: fixed;
            width: 100%;
            z-index: 10;
            top: 0;
            font-size: 0.444444rem;
            display: flex;
            align-items: center;
            height: 1.222222rem;
            padding-left: 0.648148rem;
            line-height: 1;
                &:before {
                    display: inline-block;
                    content: '';
                    width: 0.277778rem;
                    height: .277778rem;
                    transform: rotate(45deg);
                    -webkit-transform: rotate(45deg);
                    border-left: 0.092593rem solid;
                    border-bottom: 0.092593rem solid;
                    margin-right: 0.416667rem;
            }
        }
        &__pos {
            width: 100%;
            height: 1.2rem;
        }
        &__circle {
            position: fixed;
            z-index: 10;
            // top: 0.444444rem;
            top:.666667rem;  // 72px
            left: 0.444444rem;  // 48px
            display: block;
            width: 0.75rem; // 81px
            height: 0.75rem;
            background-image: url('~assets/images/public/title-circle.png');
            background-size: 100% 100%; 
        }
        &__circle--full {
            top:.888889rem;  // 96px
        }
    }
</style>
<template>
    <div class="activity-title" v-show="showTitle">
        <div v-show="titleType" class="activity-title__panel" @click="goBack" :style="{'color': titleFontColor, 'background-color': titleBgColor}">{{ title }}</div>
        <div v-show="titleType" class="activity-title__pos"></div>
        <i v-show="!titleType" class="activity-title__circle" :class="{'activity-title__circle--full':fullStatus}" @click="goBack"></i>
    </div>
</template>
<script>
    import Enum from 'common/enum';
    import util from 'common/util';
    import util2 from 'common/util2';
    import NativeInterface from 'common/nativeinterface';
    import logger from "common/logger";

    export default {
        name: 'ActivityTitle',
        props: {
            titleType: {
                type: Number,
                default: 0,
                $rule: {
                    name: '标题栏类型',
                    options: [
                        {
                            value: 1,
                            label: '标题顶部栏'
                        },
                        {
                            value: 0,
                            label: '标题浮动栏'
                        }
                    ],
                    clazz: Enum.CLAZZ.SELECT
                }
            },
            title: {
                type: String,
                default: '活动标题',
                $rule: {
                    name: '活动标题'
                }
            },
            titleBgColor: {
                type: String,
                default: '#efefef',
                $rule: {
                    name: '活动标题栏背景颜色',
                    clazz: Enum.CLAZZ.COLOR
                }
            },
            titleFontColor: {
                type: String,
                default: '#000',
                $rule: {
                    name: '活动标题栏字体颜色',
                    clazz: Enum.CLAZZ.COLOR
                }
            }
        },
        data: ()=> {
            return {
            }
        },
        watch: {
            titleType(newVal) {
                this.$store.state['activity-title'].titleType = newVal;
            }
        },
        computed: {
            showTitle() {
                let show = false;
                if(NativeInterface.getVersionCode('', 'com.meizu.flyme.gamecenter') >= 7000000 || process.env.NODE_ENV != 'production') {
                    let from = util2.isInBrowser() ? util2.getUrlParam("client") : false
                    if(from != 'gamesdk'){
                        show = true;
                    }
                }
                return show;
            },
            fullStatus(){
                if(process.env.NODE_ENV != 'production') {
                    return true
                }
                if(NativeInterface.isFringeDevice() || NativeInterface.isFullScreenDevice()){
                    return true
                }
                return false
            },
        },
        methods: {
            goBack() {
                if(util2.getUrlParam("fromsources") == "main"){
                    logger.makeActivityLog("activity_backmain_pacman");
                    window.history.go(-1);
                    return;
                }
                NativeInterface.goBackDirectly();
            }
        },
        mounted() {
            /* util2.isInBrowser() && window.addEventListener("popstate", function(e) {
                logger.makeActivityLog("activity_backmain_pacman");
            }, false); */
        }
    }
</script>