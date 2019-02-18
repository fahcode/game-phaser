<style lang="less">
    .result {
        margin-top: -0.3rem;
    }
    .winning-award {
        width: 2.77rem;
        // margin: 0.333333rem 0 0;
    }
    .tips {
        opacity: .5;
        text-align: center;
        width: 104%;
        margin-left: -0.17rem;
    }
    .dialog__body {
        max-height: 6.5rem!important;
        padding-bottom: 0!important;
    }
</style>
<template>
    <div class="result">
        <div class="winning-petal"></div>
        <p>获得1次抽奖机会</p>
        <p>额外获得签到礼包</p>
        <img class="winning-award" :src="realImg"> 
    </div>
</template>
<script>
    import Enum from 'common/enum';
    import util from 'common/util';
    export default {
        name: 'BoxLotteryResult',
        props: {
            awardImg: {
                type: Object,
                default: ()=> ({'url': require('../../assets/images/activity-wzry/box-award.png')}),
                $rule: {
                    name: '背景图片',
                    clazz: Enum.CLAZZ.IMAGE
                }
            }
        },
        computed: {
            realImg() {
                return util.getImgUrl(this.awardImg);
            },
        }
    }
</script>