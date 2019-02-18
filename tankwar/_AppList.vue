<template>
	<div class="app-list" v-bind:style="{color: fontColor}">
        <template v-for="apps in normalizeApps">
            <div class="app-list__row">
                <div v-for="app in apps" :key="app.appId" class="app-list__app" v-bind:style="{'visibility': app.appId ? 'visible': 'hidden'}">
                    <!-- <img class="app-list__app-icon" :src="app.icon" @click="goAppInfo(app)"> -->
                    <LazyImg class="app-list__app-icon" :src="app.icon || ''" @click.native="goAppInfo(app)"></LazyImg>
                    <h4 class="app-list__app-name" @click="goAppInfo(app)">{{ app.name || '' }}</h4>
                    <button class="app-list__app-btn" :class="getBtnClass(app._status)" v-bind:style="{'background-color': getBtnBgColor(app._status),'color': getBtnFontColor(app._status), 'border-color': getBtnBorderColor(app._status)}" @click="handleClick(app)">{{ app._txt || '' }}</button>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
    import Enum from 'common/enum';
    import util from 'common/util';
    import NativeInterface from 'common/nativeinterface';
    import DialogBuilder from 'base/DialogBuilder';
    import logger from 'common/logger';
    import LazyImg from 'base/LazyImage.vue'
    import AppList from 'business/AppList/index.vue';
	export default {
		name: 'AppList',
        extends: AppList,
        props: {
            unOpenBgColor: {
                type: String,
                default: '#f59037',
                $rule: {
                    name: '(未打开状态)的背景颜色',
                    clazz: Enum.CLAZZ.COLOR
                }
            },
            unOpenFontColor: {
                type: String,
                default: '#fff',
                $rule: {
                    name: '(未打开状态)的文字颜色',
                    clazz: Enum.CLAZZ.COLOR
                }
            },
            tokenAbnormal: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
            }
        },
        mounted() {
            
        },
        computed: {},
        methods: {
            getBtnClass(status){
                let className = '';
                switch(status) {
                    case Enum.APP_STATUS.INSTALLED:
                        className = 'btn_open';
                        break;
                    case Enum.APP_STATUS.GOT:
                        className = "btn_got";
                        break;
                    case Enum.APP_STATUS.UNINSTALL:
                        className = "btn_unins";
                        break;
                }
                return className;
            },
            getBtnBgColor(status) {
                let color = '';
                console.log(status)
                switch(status) {
                    case Enum.APP_STATUS.INSTALLED:
                        color = this.unOpenBgColor;
                        break;
                    case Enum.APP_STATUS.GOT:
                        color = this.gotBgColor;
                        break;
                    case Enum.APP_STATUS.UNINSTALL:
                        color = this.unInstallBgColor;
                        break;
                }
                return color;
            },
            getBtnFontColor(status) {
                let color = '';
                switch(status) {
                    case Enum.APP_STATUS.INSTALLED:
                        color = this.unOpenFontColor;
                        break;
                    case Enum.APP_STATUS.GOT:
                        color = this.gotFontColor;
                        break;
                    case Enum.APP_STATUS.UNINSTALL:
                        color = this.unInstallFontColor;
                        break;
                }
                return color;
            },
            handleClick(app) {
                if(this.tokenAbnormal || !NativeInterface.getUserId()) {
                    DialogBuilder.of(this).confirm('需登录后才能抽奖哦~', function() {
                        this.dismiss();
                        NativeInterface.login();
                    }, {confirmBtnTxt: '登录'});
                    return;
                }
                if(!NativeInterface.isAppInstalled(app.packageName)) {
                    this.$doMotion({type: Enum.MOTION.INSTALL_APP, params: [app.appId, app.packageName]});
                } else {//已经安装
                    if(app._status == Enum.APP_STATUS.GOT) { //已经获取抽奖机会
                        return;
                    } else {
                        if(!this.$checkVersion()) return;
                        if(NativeInterface.launchApp(app.packageName)) {
                            if(app.type == 'OPEN' && app._status != Enum.APP_STATUS.GOT) { //打开类型 且 未获取抽奖机会
                                util.setStorage('open_' + app.appId, Date.now());
                                this.postTask(app);
                                logger.makeActivityLog('activity_open_app');
                            }
                        } else {
                            DialogBuilder.of(this).alert('打开失败', '');
                        }
                    }
                }
            }
        },
        components: {
            LazyImg
        }
	}
</script>