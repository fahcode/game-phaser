<template>
    <div ref="bullet" id="bullet" class="bullet clearfix">
        <i class="bullet__horn"></i>
        <div ref="inner" class="bullet__inner">
            <div class="bullet__list-layer clearfix" :style="bulletStyle">
                <ul class="bullet__list clearfix" 
                    :class="classname"
                    ref="list" v-bind:style="{ 
                        '-webkit-animation-duration': time + 's!important', 
                        'animation-duration': time + 's!important',
                        '-webkit-animation-delay': delay + 's!important', 
                        'animation-delay': delay + 's!important'  
                    }">
                    <slot></slot>
                </ul>
            </div>
        </div>     
    </div>
</template>
<script>
    export default {
        props:{
            'totalList':{
                default:function(){
                    return []
                }
            },
            'list': {
                default:[]
            },
            'direction':{
                default:'horizontal'  // 默认水平运动
            },
            'speed':{
                default:0
            },
            'col':{
                default:1
            },
            'delay':{
                default:0
            }
        },
        data(){
            return {
                time:100,
                classname:'',
                twiceWidth:9999999,
                actualList:[]
            }
        },
        computed:{
            bulletStyle(){
                if(this.direction == 'horizontal'){
                    return {
                        width:this.twiceWidth+'px'
                    }
                }else {
                    return {
                        height:this.twiceWidth+'px'
                    }
                }
            }
        },
        watch:{
            list:function(n,o){
                this.$nextTick(function () {
                    let list = this.$refs['list'],
                        length = list.children.length,
                        width = list.clientWidth || list.offsetWidth,
                        height = list.clientHeight || list.offsetHeight,
                        actual = 0,
                        iv = 0
                    if(this.direction == 'horizontal'){
                        actual = width
                        iv = Math.floor(Math.random() * 80)+120
                    }else {
                        actual = height
                        iv = 80
                    }
                    if(this.speed){
                        iv = this.speed
                    }
                    this.time = ~~(actual ? actual / iv : 100)
                    if(length > n.length){
                        this.twiceWidth = actual * 2 + 100
                        this.classname = 'yh-bullet-'+this.direction+'-half'
                    }else {
                        this.twiceWidth = actual + 50
                        this.classname = 'yh-bullet-'+this.direction+'-all'
                    }
                    // this.$nextTick(function () {
                    //     console.log(list.style.cssText)
                    // })
                })
            },
        },
        mounted(){
            
        },
        methods:{
            
        }
    }
</script>
<style lang="less">
/* ##remfixer: 1080 */
    .clearfix:after{
        content: "020";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }

    .clearfix {
        zoom: 1;
    }
    .bullet {
        position: relative;
	    width: 1010px;
        height: 109px;
		background-image: url('~assets/images/activity-anniversary-tankwar-2018/msg_bg.png');
		
	    background-repeat: no-repeat;
	    background-size: 100%;
	    overflow: hidden;
	    white-space: nowrap;
	    border-radius: .15rem;
		margin: 0 auto;
		margin-top: 60px;
		white-space: nowrap;
        &__horn {
            /* position: absolute;
            top: 50%;
            transform: translate3d(0, -50%, 0);
            left: 3.5%;
            width: .425926rem;
            height: .416667rem;
            background-image: url(~assets/images/activity-ticket/horn.png);
            background-size: 100% 100%;
			display:inline-block; */
			display: none;
        }
        &__inner {
            /* overflow: hidden;
            margin-left: .93rem;
			display:inline-block; */
			position: absolute;
	    	width: 852px;
	    	height: 109px;
	    	line-height: 109px;
	    	top: 0rem;
	        overflow: hidden;
			margin:0 0 0 120px;
			font-size: 35px;
        }
        &__list-layer {
            width:9999999px;
            transform: translate3d(0, 0, 0);
        }
        &__list {
            // animation: winner-scroll 5s linear infinite;
            float:left;
            > li {
                margin-right: .5rem;
                color:#282828;
                font-weight: 500;
				float:left;
				.name{}
                .aw {
                    color: #f5443d;
                } 
            }
        }
        .yh-bullet-horizontal-all {
            animation: winner-scroll 50s linear infinite;
        }
        .yh-bullet-horizontal-half {
            animation: winner-scroll-half 50s linear infinite;
        }
        .yh-bullet-vertical-all {
            animation: winner-vertical-scroll 50s linear infinite;
        }
        .yh-bullet-vertical-half {
            animation: winner-vertical-scroll-half 50s linear infinite;
        }
        @keyframes winner-scroll {
            100% {
                transform: translate3d(-100%, 0, 0);
            }
        }
        @keyframes winner-scroll-half {
            100% {
                transform: translate3d(-50%, 0, 0);
            }
        }
        @keyframes winner-vertical-scroll {
            100% {
                transform: translate3d(0, -100%, 0);
            }
        }
        @keyframes winner-vertical-scroll-half {
            100% {
                transform: translate3d(0, -50%, 0);
            }
        }
    }
</style>