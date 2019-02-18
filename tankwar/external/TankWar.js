
import 'pixi'
//import 'p2'
import Phaser from 'phaser'

const CONFIGS = {
    enemieNum: 8, //敌机的类型数
    factory: 3, //敌机的工厂
    //主角基本信息
    playerInfo: {
        life: 3, //生命值
        armor: 1, //盔甲，代表坦克可以被打几次
        speed: 1, //速度
        bullet: 1, // 子弹等级
        bulletNum: 1, // 子弹个数
        pos: [
            { x: 9, y: 25},
            { x: 17, y: 25}
        ],
        //god: true //上帝模式
    },
    //关卡
    levelData: {
        current: 6,
        levels: [
            //total： 总数
            //disb： 数量分布
            [1, { total: 20, disb: [6, 2, 4, 1, 2, 2, 2, 1] }, 4], //等级，敌机数量，一次生产数量
            [2, { total: 20, disb: [5, 3, 3, 2, 2, 2, 2, 1] }, 4],
            [3, { total: 20, disb: [5, 3, 3, 2, 2, 2, 2, 1] }, 4],
            [4, { total: 20, disb: [5, 3, 3, 2, 2, 2, 2, 1] }, 4],
            [5, { total: 20, disb: [5, 3, 3, 2, 2, 2, 2, 1] }, 4],
            [6, { total: 20, disb: [5, 3, 3, 2, 2, 2, 2, 1] }, 4],
            [7, { total: 20, disb: [5, 3, 3, 2, 2, 2, 2, 1] }, 4],
            [8, { total: 20, disb: [5, 3, 3, 2, 2, 2, 2, 1] }, 4],
            [9, { total: 20, disb: [5, 3, 3, 2, 2, 2, 2, 1] }, 4]
        ]
    },
    //8种敌机
    enemieData: {
        info: [
            //life: 生命值
            //speed: 速度比例
            //stage: 带有的礼物，-1代表随机, 0代表无，1代表基础礼包，2代表2级礼包，3代表3级礼包
            { life: 1, speed: 1, stage: 0, bullet: 1, score: 10 },
            { life: 1, speed: 1, stage: 1, bullet: 1, score: 10 },
            { life: 1, speed: 1.2, stage: 0, bullet: 1, score: 10 },
            { life: 1, speed: 1.4, stage: 1, bullet: 1, score: 10 },
            { life: 2, speed: 1, stage: 0, bullet: 1, score: 20 },
            { life: 2, speed: 1.4, stage: 0, bullet: 1, score: 20 },
            { life: 2, speed: 1.4, stage: 0, bullet: 1, score: 20 },
            { life: 3, speed: 1.4, stage: 2, bullet: 1.6, score: 20 },
        ]
    },
    //礼包类型
    stageType: {
        num: 4,
        disb: [
            //1级： 暂停,碉堡加固，战甲+1，子弹加速+1。 2级：生命+1，全部爆炸，
            [
                { name: 'pause', imgID: 1, score: 5 },
                //{ name: 'streng', imgID: 2, score: 5 },
                //{ name: 'armor', imgID: 5, score: 5 },
                { name: 'bulletSpeedUp', imgID: 4, score: 5 },
            ],
            [
                { name: 'life', imgID: 0, score: 10 },
                { name: 'explode', imgID: 3, score: 10 }
            ]
        ]
    }
}


const TankWar = function (box, params) {
    var _ = this;
    var settings = {
        width: 640,						//画布宽度
        height: 1136,                   //画布高度
        GAME: null,
        SCENE: {},
        isloading: false,
        runing: false,
        soundStart: null,
        isWin: false,
        resultTxt: '',
        direction: {
            touchUp: false,
            touchRight: false,
            touchDown: false,
            touchLeft: false,
        },
        events: {
            gameStart: function(){}, //创建敌人, 创建的坦克
            createEnemy: function(target){}, //创建敌人, 创建的坦克
            killEnemy: function(target, way){}, //杀死敌人, 死的坦克/原因
            killWar: function(war, origin){}, //打墙， 墙/发射子弹的来源
            addScore: function (val, way, origin){}, //增加分数， 值/方法/分数来源
            createStage: function(stage, origin){}, //创建道具， 道具/来源
            eatStage: function(stage, origin){}, //吃到道具， 道具/来源
            playerDie: function(life, target, way){}, //主角死亡， 主角/死的方式
            addLife: function(life, target, way){}, //主角添加生命值
            createExplode: function(){}, //创建爆炸物， 
            gameOver: function (score, level){}, //游戏结束
            gameWin: function (score, level){} //游戏通关
        }
    };
    var _extend = function (target, settings, params) {
        params = params || {};
        for (var i in settings) {
            target[i] = params[i] || settings[i];
        }
        return target;
    };
    _extend(_, settings, params);
    //创建游戏对象
    var GAME = _.GAME = new Phaser.Game(_.width, _.height, Phaser.AUTO, box, null, false);
    //创建场景对象
    var SCENE = {
        /* Boot: {
            init: function () {
                //Phaser.Canvas.setTouchAction(GAME.canvas, "pan-y");
                GAME.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT; //显示模式
                GAME.scale.pageAlignHorizontally = true; //垂直居中对齐
                GAME.scale.pageAlignVertically = true;  //水平居中对齐
            },
            preload: function () {
                //加载loading图
                GAME.load.spritesheet("loading", require("assets/images/activity-anniversary-tankwar-2018/game/images/preloader.gif"), 220, 19);
            },
            create: function () {
                GAME.state.start("Loading");
            }
        }, */
        Loading: {
            preload: function () {
                /* var loading = GAME.add.sprite(GAME.world.centerX, GAME.world.centerY, "loading");
                loading.anchor.setTo(0, 0.5);
                loading.x = loading.x - loading.width / 2;
                GAME.load.setPreloadSprite(loading); */

                GAME.load.audio("sound-start", require("assets/images/activity-anniversary-tankwar-2018/game/audio/sound-start.mp3"));
                GAME.load.audio("sound-fire", require("assets/images/activity-anniversary-tankwar-2018/game/audio/sound-fire2.mp3"));
                GAME.load.audio("sound-hit", require("assets/images/activity-anniversary-tankwar-2018/game/audio/sound-fire.mp3"));
                GAME.load.audio("sound-boom1", require("assets/images/activity-anniversary-tankwar-2018/game/audio/sound-boom1.mp3"));
                GAME.load.audio("sound-boom2", require("assets/images/activity-anniversary-tankwar-2018/game/audio/sound-boom2.mp3"));
                GAME.load.audio("sound-win", require("assets/images/activity-anniversary-tankwar-2018/game/audio/sound-win.mp3"));
                GAME.load.audio("sound-over", require("assets/images/activity-anniversary-tankwar-2018/game/audio/sound-over.mp3"));
                //GAME.load.audio("sound-over", require("assets/images/activity-anniversary-tankwar-2018/game/audio/ready-go.mp3"));

                GAME.load.image("title", require("assets/images/activity-anniversary-tankwar-2018/game/images/logo.png"));
                GAME.load.image("over", require("assets/images/activity-anniversary-tankwar-2018/game/images/gameover.png"));
                GAME.load.image("over-2", require("assets/images/activity-anniversary-tankwar-2018/game/images/gameover2.png"));

                GAME.load.spritesheet("tank", require("assets/images/activity-anniversary-tankwar-2018/game/images/player1.png"), 28, 28);
                GAME.load.spritesheet("tank2", require("assets/images/activity-anniversary-tankwar-2018/game/images/player2.png"), 28, 28);
                GAME.load.spritesheet("enemy", require("assets/images/activity-anniversary-tankwar-2018/game/images/enemy.png"), 28, 28);
                GAME.load.spritesheet("button-arrow", require("assets/images/activity-anniversary-tankwar-2018/game/images/button-arrow.png"), 32, 32);
                GAME.load.spritesheet("button-a", require("assets/images/activity-anniversary-tankwar-2018/game/images/button-a.png"), 48, 48);

                GAME.load.spritesheet("bonus", require("assets/images/activity-anniversary-tankwar-2018/game/images/bonus.png"), 30, 28);
                GAME.load.spritesheet("bore", require("assets/images/activity-anniversary-tankwar-2018/game/images/bore.png"), 32, 32);
                GAME.load.spritesheet("bullet", require("assets/images/activity-anniversary-tankwar-2018/game/images/bullet.png"), 12, 12);
                GAME.load.image("explode1", require("assets/images/activity-anniversary-tankwar-2018/game/images/explode1.png"));
                GAME.load.image("explode2", require("assets/images/activity-anniversary-tankwar-2018/game/images/explode2.png"));

                GAME.load.tilemap("levels", require("assets/images/activity-anniversary-tankwar-2018/game/levels/levels.json"), null, Phaser.Tilemap.TILED_JSON);
                GAME.load.image("tile", require("assets/images/activity-anniversary-tankwar-2018/game/images/map_tile40.png"));
                GAME.load.image("nests", require("assets/images/activity-anniversary-tankwar-2018/game/images/nestsl.png"));
                GAME.load.spritesheet("shield", require("assets/images/activity-anniversary-tankwar-2018/game/images/shield.png"), 32, 32);

                /* // 监听加载完一个文件的事件
                GAME.load.onFileComplete.add(function (progress) {
                    progressText.text = progress + '%';
                });
                // 监听加载完毕事件
                GAME.load.onLoadComplete.add(onLoadComplete);
                //最小展示时间，1.5s
                var deadLine = true;
                setTimeout(() => {
                    deadLine = true;
                }, 1500);
    
                function onLoadComplete() {
                    if (deadLine) {
                        // 已到达最小展示时间，可以进入下一个场景
                        GAME.state.start("Menu");
                    } else {
                        // 还没有到最小展示时间，0.5秒后重试
                        setTimeout(onLoadComplete, 500);
                    }
                }; */
            },
            create: function () {
                //GAME.stage.backgroundColor = '#000000';
                _.isloading = true;
                _.soundStart = GAME.add.audio("sound-start");

                _.startScore();//开始播放音效和派发开始事件
                //GAME.add.audio("ready-go").play();
                GAME.state.start("Play");
            }
        },
        /* Menu: {
            init: function () { },
            preload: function () { },
            create: function () {
                //添加title
                var title = GAME.add.sprite(GAME.world.centerX, GAME.world.centerY - 100, "title");
                title.anchor.setTo(0.5, 0.5);
                title.scale.setTo(3.5, 3.5);

                //添加关卡和选择
                var selectLevel = GAME.add.group();
                selectLevel.x = GAME.world.centerX;
                selectLevel.y = GAME.world.centerY + 120;

                //添加文字
                var style = { font: "bold 40px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" },
                    player1 = GAME.add.text(0, 0, "1   P L A Y E R", style),
                    player2 = GAME.add.text(0, 0, "2   P L A Y E R S", style),
                    tank = GAME.add.sprite(0, 0, 'tank', 8);

                selectLevel.addAt(player1);
                selectLevel.addAt(player2);
                selectLevel.addAt(tank);
                player1.anchor.setTo(0, 0.5);
                player2.anchor.setTo(0, 0.5);
                tank.anchor.setTo(1, 0.5);
                player1.x = player2.x = -80;
                player1.y = -40;
                player2.y = 40;
                tank.x = -150;
                tank.y = -42;
                tank.scale.setTo(4, 4);

                tank.animations.add('run', [8, 9], 15, true);
                tank.animations.play("run");

                player1.inputEnabled = true;
                player2.inputEnabled = true;
                player1.events.onInputDown.add(function (params) {
                    tank.y = -42;
                })
                player1.events.onInputUp.add(function (params) {
                    GAME.state.start("Play");
                })
                player2.events.onInputDown.add(function (params) {
                    tank.y = 38;
                })
                player2.events.onInputUp.add(function (params) {
                    GAME.state.start("Play");
                    CONFIGS.levelData.current = 1;//两个人
                })
            }
        }, */
        Play: function () {
            var isSetTps = false,
                FpsTestEnd = false,
                fpsCount = 0;

            var levelInfo,

                enemyNums = 0, //敌人数量, 包括类型
                activeEnemyNum = 0, //存活的敌人数量
                enemyCount = 0, //计数器
                inMake = false, //是否在制造中
                facing = 0, //当前主角的方向上0/右1/下2/左3
                score = 0,
                isOver = false,   //是否游戏结束

                enemyPauseTime = 0, //吃暂停道具，的暂停时间,
                homeStrengTime = 0, //加固碉堡
                playerArmor = 1, //主角护甲
                playerBullet = 1, //主角子弹等级
                playerLife = 1, //主角生命
                enemyExplode = false, //是否全部存活的敌人爆炸

                bk = 26, //地图横分割块数，正方形
                block = 40,
                playSize = {
                    width: 1040,
                    height: 1040
                };

            var map, //地图
                levelLayer, //地图层
                dwall = null; //碉堡周围的

            var enemies,    //敌人
                homeBase,     //主角基地
                playerGroup,    //主角组
                player1 = null,     //主角
                player2 = null,     //主角
                shield1 = null,
                shield2 = null,
                stages, //道具
                myFires,    //主角的子弹
                enemyFires,    //敌人的子弹
                explodes,   //爆炸效果
                bores,  //敌机生产工厂，上面的三个点

                //s速度
                speed = 0, //主角移动速度
                enemieSpeed = 0, //敌人移动速度
                fireSpeed = 0, //主角子弹速度
                enemieFireSpeed = 0, //敌人子弹速度
                fireClock = false, //主角发射的子弹锁

                cursors,
                actKey,

                scoreText,
                score,

                //音频
                soundWin,
                soundOver,
                soundFire,
                soundHit,
                soundBoom1,
                soundBoom2;
            //方向
            var touchLeft = false,
                touchRight = false,
                touchUp = false,
                touchDown = false;

            this.init = function () {
                /* GAME.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT; //显示模式
                GAME.scale.pageAlignHorizontally = true; //垂直居中对齐
                GAME.scale.pageAlignVertically = true;  //水平居中对齐 */
                //GAME.time.advancedTiming = true;
                GAME.physics.startSystem(Phaser.Physics.ARCADE);    //使用ARCADE物理引擎
                GAME.stage.backgroundColor = '#000';
                //随机关卡
                var rd = parseInt(Math.random() * (CONFIGS.levelData.current+1)); //0-5
                //var rd = 0;
                if (Math.random() > 0.6) rd = 6;
                console.log('当前关卡：' + rd);

                levelInfo = CONFIGS.levelData.levels[rd];
                enemyNums = JSON.parse( JSON.stringify(levelInfo[1]) ); //敌人分布数
                activeEnemyNum = levelInfo[2]; //存活的
                facing = 0;
                score = 0;
                enemyCount = 0;
                isOver = false; //重新配置为未结束
                enemyPauseTime = 0;
                inMake = false

                //自动设置帧率
                //GAME.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);
            }
            //更新fps
            this.AutoSetFps = function () {
                if (isSetTps) return;
                if (FpsTestEnd && FpsTestEnd == true) {
                    if (fpsCount >= 30) {
                        GAME.time.desiredFps = 60;
                    } else {
                        GAME.time.desiredFps = fpsCount+5;
                    }
                    console.log(fpsCount)
                    isSetTps = true;
                } else {
                    fpsCount++;
                }
            }
            //更新判断
            this.updateCounter = function () {
                console.log(1)
                FpsTestEnd = true;
            }
            this.preload = function () {}
            this.userReadyCreate = function (callback) {
                var self = this;

                //创建主角1,2
                this.homeBaseMake(1); //创建工厂来创建主角
                //this.playerMake(player2);
                //从组创建一个主角
                /* player1 = GAME.add.sprite(0, 0, "tank", 0);
                //player1 = players.create(pos.x * block, pos.y * block, "tank", 0); 
                GAME.physics.arcade.enable(player1, Phaser.Physics.ARCADE);//开启物理引擎
                player1.body.collideWorldBounds = true; //反弹
                this.playerAttr(player1);//设置属性 */

                //创建并返回一个包含4个热键的对象，分别为Up，Down，Left和Right。
                cursors = GAME.input.keyboard.createCursorKeys();

                //监听空格键.发射子弹
                actKey = GAME.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                actKey.onDown.add(function(){
                    self.shootFire(player1)
                }, this);

                /* if (!GAME.device.desktop) {
                    this.addTouchKey(); //移动端显示虚拟按键
                } */

                !!callback && callback.call(this);
            };
            this.create = function () {
                block = parseInt(playSize.height / bk);
                speed = block/2; //主角速度
                enemieSpeed = block/2-8; //敌人速度
                fireSpeed = block;
                enemieFireSpeed = block;
                console.log(block)
                console.log(GAME.height)

                //GAME.debug.text(GAME.time.fps, 2, 14, "#00ff00");
                //添加音频
                soundFire = GAME.add.audio("sound-fire");
                soundHit = GAME.add.audio("sound-hit");
                soundBoom1 = GAME.add.audio("sound-boom1");
                soundBoom2 = GAME.add.audio("sound-boom2");
                soundWin = GAME.add.audio("sound-win");
                soundOver = GAME.add.audio("sound-over");

                //创建主角制造工厂
                homeBase = GAME.add.group();
                homeBase.createMultiple(1, 'bore');  //工厂数量
                homeBase.forEach((obstacle) => { obstacle.kill(); })
                //this.homeBaseMake(1); //创建工厂来创建主角

                //主角组
                playerGroup = GAME.add.group();
                playerGroup.enableBody = true;
                //playerGroup.setAll('body.immovable', true);
                //GAME.world.setChildIndex(playerGroup, 3);

                //敌机工厂
                bores = GAME.add.group();
                bores.createMultiple(CONFIGS.factory, 'bore');  //工厂数量
                bores.forEach((obstacle) => { obstacle.kill(); })
                //bores.create(0, 0, "bore", 0).kill();

                //创建敌人，有8种敌人
                enemies = GAME.add.group();
                enemies.enableBody = true;
                //预先创建4个精灵对象
                enemies.createMultiple(activeEnemyNum, 'enemy'); //这里代表每次活着的敌人数量
                enemies.forEach((obstacle) => { obstacle.kill(); })
                //enemies.setAll('body.immovable', true);
                
                //创建子弹
                myFires = GAME.add.group();
                //全组开启body
                myFires.enableBody = true;
                //预先创建4个精灵对象
                myFires.createMultiple(CONFIGS.playerInfo.bulletNum, 'bullet'); //这里限制发弹数量
                //红包组全体添加边界检测和边界销毁
                myFires.setAll('outOfBoundsKill', true);
                myFires.setAll('checkWorldBounds', true);
                myFires.forEach((obstacle) => { obstacle.kill(); })
                /* for (var i = 0; i < 4; i++) {  //这里限制发弹数量
                    var fire = myFires.create(0, 0, "bullet", 0).kill();
                    fire.checkWorldBounds = true;
                    fire.outOfBoundsKill = true;
                } */

                //创建敌人的子弹
                enemyFires = GAME.add.group();
                enemyFires.enableBody = true;
                //预先创建10个精灵对象
                enemyFires.createMultiple(4, 'bullet'); //这里限制发弹数量
                //红包组全体添加边界检测和边界销毁
                enemyFires.setAll('outOfBoundsKill', true);
                enemyFires.setAll('checkWorldBounds', true);
                enemyFires.forEach((obstacle) => { obstacle.kill(); })

                //创建地图
                map = GAME.add.tilemap("levels");
                map.addTilesetImage("tile", 'tile', block, block);
                map.addTilesetImage("nests", 'nests', block, block);
                map.playTimer = 0;
                map.playIndex = 0;
                levelLayer = map.createLayer("level-" + levelInfo[0], playSize.height, playSize.height);
                //碉堡周围的点
                //dwall = GAME.add.physicsGroup();
                //map.createFromTiles(5, 1, 'tile', levelLayer, dwall);
                //dwall.setAll('life', 2);//单独设置生命值为2

                //13, 14, 15, 16, 17, 18, 19, 20
                map.setCollisionByExclusion([0,3,5], true, levelLayer);
                levelLayer.resizeWorld();


                //创建道具礼包
                stages = GAME.add.group();
                //全组开启body
                stages.enableBody = true;
                //预先创建
                stages.createMultiple(CONFIGS.stageType.num, 'bonus'); //这里重复利用道具
                stages.forEach((obstacle) => { obstacle.kill(); })

                //爆炸效果
                explodes = GAME.add.group();
                explodes.enableBody = true;

                

                //创建并返回一个包含4个热键的对象，分别为Up，Down，Left和Right。
                //cursors = GAME.input.keyboard.createCursorKeys();
                //监听空格键.发射子弹
                // actKey = GAME.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                // actKey.onDown.add(function () {
                //     self.shootFire(player1)
                // }, this);
                //scoreText = GAME.add.text(16, 16, "Enemy: " + score, { fontSize: "16px", fill: "#fff" });
                //scoreText.fixedToCamera = true;
            };
            
            this.update = function () {
                //this.AutoSetFps();
                if (_.runing) {
                    
                    //敌人跟墙壁
                    GAME.physics.arcade.collide(enemies, levelLayer, this.wayCheck, null, this);
                    //敌人子弹墙壁
                    GAME.physics.arcade.overlap(enemyFires, levelLayer, this.rmWallCheck, null, this);

                    //游戏未结束
                    if (!isOver) {
                        //主角跟墙壁的碰撞检测
                        GAME.physics.arcade.collide(playerGroup, levelLayer, this.wayCheck, null, this);

                        //主角跟敌人
                        //enemies.setAll('body.immovable', true);
                        //GAME.physics.arcade.collide(player1, enemies , this.tankCheck , null, this );
                        //enemies.setAll('body.immovable', false);
                        //GAME.physics.arcade.collide(enemies);

                        //主角跟敌人子弹，被杀
                        GAME.physics.arcade.overlap(playerGroup, enemyFires, this.fireCheck, null, this);
                        //敌机跟主角子弹，打死
                        GAME.physics.arcade.overlap(enemies, myFires, this.fireCheck, null, this);
                        //主角发射的子弹跟墙壁
                        GAME.physics.arcade.overlap(myFires, levelLayer, this.rmWallCheck, null, this);
                        //主角跟道具
                        GAME.physics.arcade.overlap(playerGroup, stages, this.eatStageCheck, null, this);
                        //主角子弹跟子弹
                        GAME.physics.arcade.overlap(myFires, enemyFires, this.fireToFireCheck, null, this);

                        /////方向和各种状态判断
                        if (playerGroup.countLiving() > 0){
                            /* playerGroup.forEachAlive((org)=>{

                            }) */
                            //暂时只有一个主角
                            player1.body.velocity.setTo(0, 0);//每一帧主角速度重置

                            //检查当前控制的状态
                            if (cursors.right.isDown || _.direction.touchRight) {
                                this.doMove(player1, speed, 0, speed);
                                player1.animations.play("right");
                                facing = 1;
                            } else if (cursors.left.isDown || _.direction.touchLeft) {
                                this.doMove(player1, -speed, 0, speed);
                                player1.animations.play("left");
                                facing = 3;
                            } else if (cursors.up.isDown || _.direction.touchUp) {
                                this.doMove(player1, 0, -speed, speed);
                                player1.animations.play("up");
                                facing = 0;
                            } else if (cursors.down.isDown || _.direction.touchDown) {
                                this.doMove(player1, 0, speed, speed);
                                player1.animations.play("down");
                                facing = 2;
                            } else {
                                player1.animations.stop();
                            };
                            //检查游戏的状态
                            this.checkGameState();

                            //设置无敌遮罩的位置
                            if (shield1 && shield1.alive){
                                shield1.x = player1.x;
                                shield1.y = player1.y;
                            }
                            if (shield2 && shield2.alive) {
                                shield2.x = player2.x;
                                shield2.y = player2.y;
                            }
                        }
                    }
                };
                //游戏结束 停止物理动作
                if(isOver){
                    if(playerGroup.countLiving()>0){
                        playerGroup.forEachAlive((org) => {
                            org.body.moves = false;
                            //org.body.velocity.setTo(0, 0);
                        });
                        enemies.forEachAlive((org) => {
                            org.body.moves = false;
                            //org.body.velocity.setTo(0, 0);
                        });
                    };
                }
            };
            //移动对象, 对象，x轴位移，y轴位移, 速度
            this.doMove = function (origin, x, y, speed) {
                var sp = origin.speed * speed; //自身速度*基础速度
                origin.x = (y != 0) ? Math.round(origin.x / sp) * sp : origin.x;
                origin.y = (x != 0) ? Math.round(origin.y / sp) * sp : origin.y;
                origin.body.velocity.setTo(x * sp, y * sp);
            };
            //创建生产工厂
            this.factoryMake = function () {
                var self = this;
                if (enemyNums.total == 0) { return; }
                if (!inMake && this.util.getEnemieAllNum() > 0 && enemies.countDead() > 0 && bores.countDead() > 0) {
                    inMake = true;

                    var n = CONFIGS.factory - 1;//工厂减一 用来计算一个间隔是多少
                    //var rd = parseInt(Math.random() * GAME.factory); //随机工厂位置
                    var rd = enemyCount;//工厂位置
                    var xx = rd * playSize.width / n + (rd == n ? -block : (rd == 0 ? block : 0)); //0， 1， 2三个工厂
                    //产生工厂
                    var bore = bores.getFirstDead(false, xx, block, "bore", 0); //工厂的位置要注意跟敌机对应
                    bore.width = bore.height = block;
                    bore.anchor.setTo(0.5, 0.5);
                    var anim = bore.animations.add("go", [0, 1, 2, 3, 2, 1, 0, 1, 2, 3, 2, 1, 0]);
                    anim.onComplete.add(function (sprite) {
                        self.enemieMake(sprite);//动画结束后创建同一位置的敌机
                        sprite.kill();
                        //处理下次工厂的位置
                        if (enemyCount < n) {
                            enemyCount++;
                        } else enemyCount = 0;
                    }, this);
                    anim.play(10, false);//开始动画
                }
            };
            //敌机创建
            this.enemieMake = function (factory) {
                var enemyIndex = this.util.getEnemieType.call(this);
                var imgID = parseInt(enemyIndex / 4) * 32 + (enemyIndex % 4) * 2; //0,2,4,6,32,34,36,38
                //var enemy = enemies.create(0, 0, "enemy", imgID).kill(); //创建一个杀死的对象
                var enemy = enemies.getFirstDead(false, factory.x, factory.y, "enemy", imgID); //创建一个敌机对象
                enemy.width = enemy.height = block * 2;
                enemy.anchor.setTo(0.5, 0.5);
                GAME.physics.arcade.enable(enemy, Phaser.Physics.ARCADE);//开启物理引擎
                enemy.body.collideWorldBounds = true; //个物体可以被设置为与世界范围的碰撞和反弹回这个世界。
                //enemy.body.immovable = true; //不可被碰撞移动
                enemy.animations.add("up", [imgID, imgID + 1], 5, true);
                enemy.animations.add("right", [imgID + 8, imgID + 9], 5, true);
                enemy.animations.add("down", [imgID + 16, imgID + 17], 5, true);
                enemy.animations.add("left", [imgID + 24, imgID + 25], 5, true);
                enemy.timeToMove = 0;
                //添加属性
                var attrs = CONFIGS.enemieData.info[enemyIndex];
                enemy.life = attrs.life;
                enemy.speed = attrs.speed;
                enemy.stage = attrs.stage;
                enemy.score = attrs.score;
                enemy.bullet = attrs.bullet;
                enemy.tankType = 'enemy';

                this.util.useEnemieNumById(enemyIndex);//消耗当前的敌机
                _.addEvent('createEnemy', enemy);
                inMake = false;
            };
            this.util = {
                //获取当前要制造的敌机,
                getEnemieType: function () {
                    var arr = enemyNums.disb; //获取分布
                    var index = 0; //敌机索引

                    var splitv = [
                        { index: 4, s: 0, e: 3 },
                        { index: 13, s: 0, e: 7 }
                    ]; //随机产生的分割位置
                    var rd = 0;

                    //获取当前有值的位置
                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i] > 0) {
                            index = i;
                            break;
                        };
                    };

                    //获取随机值
                    for (var j = 0; j < splitv.length; j++) {
                        if (this.util.getEnemieAllNum() < (enemyNums.total - splitv[j].index)) {
                            var start = index > splitv[j].s ? index : splitv[j].s;
                            rd = parseInt(Math.random() * (splitv[j].e - start + 1) + start);//parseInt(Math.random() * splitv[j].e) + e; //s-e
                            break;
                        }
                    };

                    //获取
                    if (arr[rd] > 0) {
                        index = rd;
                    }

                    return index;
                },
                getEnemieAllNum: function () {
                    var arr = enemyNums.disb; //获取分布
                    var num = 0;
                    for (let index = 0; index < arr.length; index++) {
                        num += arr[index];

                    }
                    return num;
                },
                useEnemieNumById: function (index) {
                    var arr = enemyNums.disb; //获取分布
                    /* for (let index = 0; index < arr.length; index++) {
                        //只要有靠前的数组有，减完就退出
                        if(arr[index]>0){
                            arr[index]--;
                            break;
                        };
                    } */
                    arr[index]--;
                },
                getStagePos: function(){
                    var pos = {},
                        xx = 0,
                        yy = 0,
                        tile = null;

                    do{
                        xx = parseInt(Math.random() * bk),
                        yy = parseInt(Math.random() * bk);
                        tile = map.getTile(xx, yy, levelLayer);
                    //在0-end内的位置，判断点是否在地图上,并且不能等于头尾。 并且不等于2，4，5
                    } while ( !(xx > 0 && xx < (bk - 1) && yy > 0 && yy < (bk - 1) && !!tile && tile.index != 2 && tile.index != 4 && tile.index != 5) );

                    pos.x = xx;
                    pos.y = yy;
                    return pos
                }
            };
            //给敌人动作
            this.enemyMove = function (enemy) {
                //判断当前的执行时间是否已经过了记录的时间，控制多长时间分配一次移动
                if (GAME.time.now >= enemy.timeToMove) {
                    var go = parseInt(Math.random() * 4); //0， 1， 2， 3
                    go = go == 0 ? (Math.random() > 0.5 ? 0 : 2) : go; // 随机方向，减少几率往上,增大机会往下
                    //移动的位置
                    var x = go == 1 ? enemieSpeed : (go == 3 ? -enemieSpeed : 0),
                        y = go == 2 ? enemieSpeed : (go == 0 ? -enemieSpeed : 0);
                    this.doMove(enemy, x, y, enemieSpeed);
                    //enemy.body.velocity.setTo((go == 1 ? 8 : go == 3 ? -8 : 0) * 5, (go == 0 ? -8 : go == 2 ? 8 : 0) * 5);
                    enemy.animations.play(["up", "right", "down", "left"][go]);
                    enemy.timeToMove = GAME.time.now + parseInt(Math.random() * (2000 - 500 + 1) + 500);//0.5s-2s的移动时间

                    if (Math.random() < 0.5) {  // 随机开炮...
                        this.playShootFire(enemyFires, enemy, go, enemieFireSpeed, soundFire);
                    }
                }
            };
            //主角生产工厂
            this.homeBaseMake = function (index, life, oorg){
                var self = this;
                var idx = index || 1;
                var pos = CONFIGS.playerInfo.pos[idx-1];

                var base = homeBase.getFirstDead(false, pos.x * block, pos.y *block, "bore", 0); //工厂的位置要注意跟敌机对应
                base.width = base.height = block;
                base.anchor.setTo(0.5, 0.5);
                var anim = base.animations.add("go", [0, 1, 2, 3, 2, 1, 0, 1, 2, 3, 2, 1, 0]);
                anim.onComplete.add(function (sprite) {
                    self.playerMake(sprite, idx, life, oorg);//动画结束后创建同一位置的敌机
                    sprite.kill();
                }, this);
                anim.play(10, false);//开始动画
            };
            this.playerMake = function (base, index, life, oorg){
                let idx = index-1;
                //创建闪烁动画
                var shd = GAME.add.sprite(base.x, base.y, "shield", 0);
                shd.width = shd.height = block * 2.5;
                shd.anchor.setTo(0.5, 0.5);
                GAME.world.setChildIndex(shd, 1);
                let anim = shd.animations.add("shield", [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]);

                //创建主角
                if (!oorg){
                    var org = playerGroup.getFirstDead(true, base.x, base.y, "tank", 0);
                    GAME.physics.arcade.enable(org, Phaser.Physics.ARCADE);//开启物理引擎
                    org.body.collideWorldBounds = true; //反弹
                }else{
                    oorg.reset(base.x, base.y);//重置
                    var org = oorg;
                }
                //org.body.immovable = true; //不可被碰撞移动
                //org.body.mass = 10000; //不可被碰撞移动
                org.god = true; //出生无敌
                this.playerAttr(org, life);//设置属性 */
                
                anim.onComplete.add(function (sprite) {
                    //去掉无敌状态
                    if(!CONFIGS.playerInfo.god) org.god = false;
                    sprite.destroy();
                });
                //闪烁5次
                anim.play(10, false)

                //判断创建的是哪个主角
                if (index == 1) {
                    player1 = org;
                    shield1 = shd;
                } else {
                    player2 = org;
                    shield2 = shd;
                };
            };
            this.revivePlayer = function (isReset, origin, pos, life, armor, bullet){
                var pos = pos || { x: CONFIGS.playerInfo.pos[0].x * block, y: CONFIGS.playerInfo.pos[0].y * block };
                if (isReset) {
                    origin.reset(pos.x, pos.y);//重置
                };

            }
            //配置主角属性, 生命值是设置，后面的是累加, //isReset or origin, pos, life, armor, bullet
            this.playerAttr = function (origin, life, armor, bullet) {
                /* var pos = pos || { x: CONFIGS.playerInfo.pos[0].x * block, y: CONFIGS.playerInfo.pos[0].y * block };
                if (isReset){
                    origin.reset(pos.x, pos.y);//重置
                }; */
                //从组创建一个主角
                //origin = GAME.add.sprite(pos.x * block, pos.y * block, "tank", 0);
                //origin = players.create(pos.x * block, pos.y * block, "tank", 0); 
                origin.width = origin.height = block * 2;
                origin.anchor.setTo(0.5, 0.5);

                var i = !!armor ? (armor - 1) : 0;
                origin.animations.add("up", [0 + i * 2, 1 + i * 2], 5, true);
                origin.animations.add("right", [8 + i * 2, 9 + i * 2], 5, true);
                origin.animations.add("down", [16 + i * 2, 17 + i * 2], 5, true);
                origin.animations.add("left", [24 + i * 2, 25 + i * 2], 5, true);

                playerBullet = origin.bullet = origin.oldBullet = !!bullet ? bullet : CONFIGS.playerInfo.bullet; //子弹等级
                playerLife = origin.life = origin.oldLife = !!life ? life : CONFIGS.playerInfo.life; //生命值, 如果是重置的，那就是消耗生命值
                playerArmor = origin.armor = origin.oldArmor = !!armor ? armor : CONFIGS.playerInfo.armor; //盔甲

                
                origin.fireClock = false; //控制发射子弹

                origin.speed = CONFIGS.playerInfo.speed; //速度
            };
            //创建道具
            this.stageMake = function (clas, origin) {
                var types = CONFIGS.stageType.disb[clas || 0];
                var typeIndex = parseInt(Math.random() * types.length),
                    stateInfo = types[typeIndex];

                //var enemy = enemies.create(0, 0, "enemy", imgID).kill(); //创建一个杀死的对象
                var spos = this.util.getStagePos(); //随机获取可以放道具的地图点
                var xx = spos.x * block,
                    yy = spos.y * block;
                //使用地址池
                //var stage = stages.getFirstDead(false, xx, yy, "bonus", stateInfo.imgID); //创建一个敌机对象
                var stage = GAME.add.sprite(xx, yy, "bonus", stateInfo.imgID); //创建一个敌机对象
                stages.add(stage);
                stage.width = stage.height = 2 * block;
                stage.anchor.setTo(0.5, 0.5);
                stage.stageType = stateInfo.name;//当前的道具名
                stage.score = stateInfo.score;//score
                stage.imgID = stateInfo.imgID;//imgID
                GAME.physics.arcade.enable(stage, Phaser.Physics.ARCADE);//开启物理引擎
                //停留10s后，做5次0.4s一次的闪烁
                GAME.add.tween(stage).to({ alpha: [1, 0.5, 1] }, 400, Phaser.Easing.Linear.None, true, 10000, 5, false).onComplete.add(function (sprite) {
                    sprite.destroy();//使用销毁
                    //sprite.kill();//使用销毁
                });//Phaser.Easing.Bounce.Out
                
                _.addEvent('createStage', stateInfo, origin);//创建道具事件
            };
            //创建发射的子弹
            this.playShootFire = function (fireGound, origin, facing, spped, voice, isPool) {
                var isPool = isPool == undefined ? true : isPool;
                //getFirstDead false代表使用地址池, true不使用
                //发射子弹
                var wid2 = parseInt(origin.width / 2),
                    hei2 = parseInt(origin.height / 2);

                var fire = fireGound.getFirstDead(!isPool, origin.x + (facing == 3 ? -wid2 : (facing == 1 ? wid2 : 0)), origin.y + (facing == 0 ? -hei2 : (facing == 2 ? hei2 / 2 : 0)), "bullet", facing);

                if (fire != null) {
                    fire.anchor.setTo(0.5, 0.5);
                    fire.bullet = origin.bullet; //保存子弹等级
                    fire.originType = origin.tankType; //保存子弹来源的坦克类型
                    fire.direction = (facing == 1 || facing==3)? 'H': 'v'; //保存子弹的方向
                    if (!!voice) voice.play();//子弹发射声音
                    var useSpeed = spped * origin.bullet;//基础速度*自身比例 =实际的子弹速度
                    fire.body.velocity.setTo((facing == 1 ? useSpeed : facing == 3 ? -useSpeed : 0) * 20, (facing == 2 ? useSpeed : facing == 0 ? -useSpeed : 0) * 20);
                }
            };
            //创建不同类型的爆炸物,包括拆墙，打中敌人，子弹碰到子弹
            this.explodePlay = function (xx, yy, imageKey, soundKey, timer) {
                if (timer == undefined) { timer = 100; }
                if (soundKey == "hit") {
                    soundHit.play();
                } else if (soundKey == "boom1") {
                    soundBoom1.play();
                } else if (soundKey == "boom2") {
                    soundBoom2.play();
                }
                var boom = explodes.getFirstDead(true, xx, yy, imageKey);
                boom.anchor.setTo(0.5, 0.5);
                boom.scale.setTo(1);
                _.addEvent('createExplode', boom);

                //创建放大动画，再删除自己
                GAME.add.tween(boom.scale).to({ x: 1.5, y: 1.5 }, timer, "Linear", true).onComplete.add(function () { boom.kill(); }, this);
            };
            
            //移动检测
            this.wayCheck = function (tank, tile) {
                //console.log(tank)
                //console.log(tile)
                /* if ([11, 12, 25, 26].indexOf(tile.index) > -1) {
                    map.swap(11, 13, tile.x - 1, tile.y - 1, 3, 3);
                    map.swap(12, 14, tile.x - 1, tile.y - 1, 3, 3);
                    map.swap(25, 27, tile.x - 1, tile.y - 1, 3, 3);
                    map.swap(26, 28, tile.x - 1, tile.y - 1, 3, 3);
                    this.explodePlay(tile.worldx, tile.worldy, "explode2", "boom2", 300);
                    player.kill();
                    this.gameOver();
                } */
            };
            //拆墙检测
            this.rmWallCheck = function (fire, tile) {
                var self = this;
                //碰到的墙壁，可以打掉的地图块
                if ([1, 2].indexOf(tile.index) > -1) {
                    if (tile.life == undefined) {
                        tile.life = (tile.index == 2) ? 2 : 1; //地图块生命：铁块2、砖块1
                        tile.score = (tile.index == 2) ? 2 : 1; //地图块生命：铁块10、砖块5
                        //如果打的是碉堡周围的 11,25 11,24 11,23 12,23 13,23 14,23  14,25 14,24
                        if(
                            (tile.x == 11 && tile.y==25) ||
                            (tile.x == 11 && tile.y==24) ||
                            (tile.x == 11 && tile.y==23) ||
                            (tile.x == 14 && tile.y==25) ||
                            (tile.x == 14 && tile.y==24) ||
                            (tile.x == 14 && tile.y==23) ||

                            (tile.x == 12 && tile.y==23) ||
                            (tile.x == 13 && tile.y==23)
                        ){
                            tile.life =  2; //都等于2
                        };
                    };
                    if (tile.index == 2) {
                        //3级以上的子弹才可以打掉
                        if (fire.bullet >= 3) {
                            tile.life--; // 消耗生命
                            if (tile.life <= 0) {
                                map.removeTile(tile.x, tile.y, levelLayer);
                                if (fire.originType != "enemy") this.addScore(tile.score, 'eatWar', tile);
                                _.addEvent('killWar', tile, fire);
                            }
                        } else {
                            //打铁声音
                        }
                    } else if (tile.index == 1) {
                        tile.life--;
                        if ((tile.life <= 0)) {
                            map.removeTile(tile.x, tile.y, levelLayer);
                            if (fire.originType != "enemy") this.addScore(tile.score, 'eatWar', tile);
                            _.addEvent('killWar', tile, fire);
                        }
                    };

                    //创建爆炸物
                    this.explodePlay(fire.x + (fire.frame == 3 ? 0 : fire.frame == 1 ? 6 : 3), fire.y + (fire.frame == 0 ? 0 : fire.frame == 2 ? 6 : 3), "explode1", "hit");
                    fire.kill();
                } else if ([4].indexOf(tile.index) > -1){
                    //子弹可以竖向过,不可以横向过
                    if (fire.direction=='H') fire.kill();
                    //fire.body.immovable = false;
                } else if ([5].indexOf(tile.index) > -1){
                    //子弹可以横向过,不可以竖向过
                    if (fire.direction == 'V') fire.kill();
                };

                //打到Boss
                if ([13, 14, 17, 18].indexOf(tile.index) > -1) {
                    /* map.swap(13, 15, tile.x - 1, tile.y - 1, 1, 1, levelLayer);
                    map.swap(14, 16, tile.x - 1, tile.y - 1, 1, 1, levelLayer);
                    map.swap(17, 19, tile.x - 1, tile.y - 1, 1, 1, levelLayer);
                    map.swap(18, 20, tile.x - 1, tile.y - 1, 1, 1, levelLayer); */
                    map.fill(15, 12, 24, 1, 1, levelLayer);
                    map.fill(16, 13, 24, 1, 1, levelLayer);
                    map.fill(19, 12, 25, 1, 1, levelLayer);
                    map.fill(20, 13, 25, 1, 1, levelLayer);

                    this.explodePlay(fire.x + (fire.frame == 3 ? 0 : fire.frame == 1 ? 6 : 3), fire.y + (fire.frame == 0 ? 0 : fire.frame == 2 ? 6 : 3), "explode2", "boom2", 300);
                    fire.kill();
                    playerGroup.forEach((obstacle) => { 
                        obstacle.kill();
                        _.addEvent('playerDie', 0, obstacle, 'killHome');
                     });    //杀死全部的主角
                    this.gameOver();
                }
            }
            //主角跟敌人。追尾
            this.tankCheck = function (tank, tank2) {
                var self = this;
                //碰撞不动
                //tank.body.immovable = true;
                //tank2.body.immovable = true;
                tank.body.moves = false; //不可被碰撞移动;
                //tank2.body.moves = false;
                return false;
                tank2.kill();
                this.explodePlay(tank.x, tank.y, "explode2", "boom1");
                _.addEvent('killEnemy', tank2, 'rear-end');
                if (tank.god) return this;//无敌

                //不判断的盔甲
                let life = --tank.life;

                tank.kill();
                _.addEvent('playerDie', life, tank, 'rear-end');

                //判断还有多少生命值
                if (life <= 0) {
                    this.gameOver();
                } else {
                    //重新生成,1s
                    setTimeout(() => {
                        //重新生产
                        self.homeBaseMake(1, life, tank);
                        //self.playerAttr(tank, life);
                    }, 1000);
                };
            };
            //子弹和主角或者敌人
            this.fireCheck = function (origin, fire) {
                var self = this;
                //判断跟谁碰撞
                if (origin.key == 'enemy') {//敌机
                    fire.kill();

                    if (origin.life <= 1) {
                        origin.kill();
                        //爆炸效果
                        this.explodePlay(origin.x, origin.y, "explode2", "boom1");
                        //加分阿
                        this.addScore(origin.score, 'fire', origin);

                        //产生奖励,随机的
                        if (origin.stage != undefined && origin.stage > 0) {
                            self.stageMake(origin.stage - 1, origin);
                        };

                        _.addEvent('killEnemy', origin, 'fire');
                    } else {
                        origin.life--;
                    }
                } else {//被打
                    fire.kill();
                    if (origin.god) return this;//无敌

                    origin.armor--; //本身的盔甲
                    if (origin.armor <= 0) {
                        let life = --origin.life;
                        origin.kill();
                        fire.kill();
                        //爆炸效果
                        this.explodePlay(origin.x, origin.y, "explode2", "boom1");
                        //判断还有多少生命值
                        if (life <= 0) {
                            this.gameOver();
                        } else {
                            //重新生成,1s
                            setTimeout(() => {
                                //重新生产
                                self.homeBaseMake(1, life, origin);
                                //self.playerAttr(true, origin, null, life);
                            }, 1000);
                        };

                        _.addEvent('playerDie', life, origin, 'fire');
                    }
                }

            };
            //子弹跟子弹
            this.fireToFireCheck = function (fire1, fire2) {
                fire1.kill();
                fire2.kill();
            };
            //吃道具检测
            this.eatStageCheck = function (origin, stage) {
                var self = this;
                var stageType = stage.stageType;
                switch (stageType) {
                    case "pause":
                        enemyPauseTime = 8000;//暂停，5s后恢复
                        break;
                    case "streng":
                        homeStrengTime = 10000;//加固碉堡5000
                        break;
                    case "armor":
                        origin.armor += 1; //主角护甲+1
                        break;
                    case "bulletSpeedUp":
                        origin.bullet = 1.6; //主角子弹等级+1
                        break;
                    case "life":
                        origin.life += 1;//主角生命+1
                        //添加事件
                        _.addEvent('addLife', origin.life, origin, 'eat');
                        break;
                    case "explode":
                        enemyExplode = true;//全部存活的敌人爆炸
                        break;
                    default:
                        console.log('未找到');
                        break;
                };
                stage.kill();
                this.addScore(stage.score, 'eatStage', stage);
                _.addEvent('eatStage', stage, origin);
            };
            
            ///检查游戏的全局状态
            this.checkGameState = function () {
                /* if(!player1.body.moves){
                    player1.body.moves = true;
                }; */

                //判断当前是否敌机暂停
                if (enemyPauseTime > 0) {
                    //速度全部为0
                    enemies.forEachAlive(function (enemy) {
                        enemy.body.velocity.setTo(0, 0);
                    })
                    enemyPauseTime -= 16;//每一帧减16毫秒
                } else {
                    //生产敌人
                    this.factoryMake();
                    //检查活着的敌机，并且分配动作
                    enemies.forEachAlive(this.enemyMove, this);
                    //this.mapTilePlay(); // 水的动画效果 
                };
                //判断当前碉堡是否需要加固
                if (homeStrengTime > 0 && !!levelLayer) {
                    homeStrengTime -= 16;//每一帧减16毫秒
                    if (homeStrengTime < 5000) {
                        var a = parseInt(homeStrengTime / 500) % 2 == 0 ? 1 : 2,
                            b = a == 1 ? 2 : 1;
                        console.log(a)
                        //开始闪烁, 确保最后一次为瓦片
                        map.fill(a, 11, 25, 1, 1, levelLayer);
                        map.fill(a, 11, 24, 1, 1, levelLayer);
                        map.fill(a, 11, 23, 1, 1, levelLayer);
                        map.fill(a, 14, 25, 1, 1, levelLayer);
                        map.fill(a, 14, 24, 1, 1, levelLayer);
                        map.fill(a, 14, 23, 1, 1, levelLayer);

                        map.fill(a, 12, 23, 1, 1, levelLayer);
                        map.fill(a, 13, 23, 1, 1, levelLayer);
                    } else {
                        //不是铁块的时候
                        if (map.getTile(11, 25).index != 2){
                            map.fill(2, 11, 25, 1, 1, levelLayer);
                            map.fill(2, 11, 24, 1, 1, levelLayer);
                            map.fill(2, 11, 23, 1, 1, levelLayer);
                            map.fill(2, 14, 25, 1, 1, levelLayer);
                            map.fill(2, 14, 24, 1, 1, levelLayer);
                            map.fill(2, 14, 23, 1, 1, levelLayer);

                            map.fill(2, 12, 23, 1, 1, levelLayer);
                            map.fill(2, 13, 23, 1, 1, levelLayer);
                        }
                    }
                };

                if (playerGroup.countLiving()>0){
                    playerGroup.forEachAlive((org)=>{
                        if (org.oldArmor != org.armor && org.armor>=1){
                            //重新配置主角动画
                            let i = org.armor-1;
                            org.animations.add("up", [0 + i * 2, 1 + i * 2], 5, true);
                            org.animations.add("right", [8 + i * 2, 9 + i * 2], 5, true);
                            org.animations.add("down", [16 + i * 2, 17 + i * 2], 5, true);
                            org.animations.add("left", [24 + i * 2, 25 + i * 2], 5, true);
                        }
                    });
                };
                //全部存活的敌人爆炸
                if (!!enemyExplode) {
                    enemyExplode = false;
                    //全部爆炸
                    enemies.forEachAlive(function (enemy) {
                        this.explodePlay(enemy.x, enemy.y, "explode2", "boom1");
                        enemy.kill();
                        _.addEvent('killEnemy', enemy, 'allExplode');
                    }, this);
                };

                /* 判断游戏是否通关 */
                //是否还有需要生产的敌机，是否还有存活的敌机
                if (this.util.getEnemieAllNum() <= 0 && enemies.countLiving() <= 0){
                    this.gameWin();
                }
            };
            this.addScore = function(addv, way, origin){
                score += addv;
                _.addEvent('addScore', score, way, origin);//被杀事件
            };
            
            this.shootFire = function (origin) {
                let self = this;
                let timer1 = null;
                var origin = origin || player1;

                if (!isOver && !!origin && origin.alive && !origin.fireClock) {
                    origin.fireClock = true;
                    self.playShootFire(myFires, origin, facing, fireSpeed, soundFire);
                    timer1 = setTimeout(() => {
                        origin.fireClock = false;
                    }, 500);
                }
            };
            this.gameOver = function () {
                //显示game over状态
                if (!isOver){
                    soundOver.play();
                    isOver = true;
                    _.resultTxt = "game over";
                    _.addEvent('gameOver', score);
                }
            };
            this.gameWin = function(){
                if (!isOver) {
                    soundWin.play();
                    isOver = true;
                    _.resultTxt = "game win";
                    _.isWin = true;
                    _.addEvent('gameWin', score, levelInfo[0]);
                }
            };
            this.addTouchKey = function () {
                var self = this;
                var buttonfire = GAME.add.button(GAME.width - 50, playSize.height - 50, 'button-a', null, this, 0, 1, 0, 1);
                buttonfire.fixedToCamera = true;
                buttonfire.events.onInputDown.add(function(){
                    self.shootFire(player1)
                }, this);

                var buttonleft = GAME.add.button(0, playSize.height - 55, 'button-arrow', null, this, 0, 1, 0, 1);
                buttonleft.fixedToCamera = true;
                buttonleft.events.onInputOver.add(function () { _.direction.touchLeft = true; });
                buttonleft.events.onInputDown.add(function () { _.direction.touchLeft = true; });
                buttonleft.events.onInputOut.add(function () { _.direction.touchLeft = isPool; });
                buttonleft.events.onInputUp.add(function () { _.direction.touchLeft = false; });

                var buttonright = GAME.add.button(98, playSize.height - 55, 'button-arrow', null, this, 0, 1, 0, 1);
                buttonright.fixedToCamera = true;
                buttonright.scale.setTo(-1, 1);
                buttonright.events.onInputOver.add(function () { _.direction.touchRight = true; });
                buttonright.events.onInputDown.add(function () { _.direction.touchRight = true; });
                buttonright.events.onInputOut.add(function () { _.direction.touchRight = false; });
                buttonright.events.onInputUp.add(function () { _.direction.touchRight = false; });

                var buttonup = GAME.add.button(65, playSize.height - 65 - 14, 'button-arrow', null, this, 0, 1, 0, 1);
                buttonup.angle = 90;
                buttonup.scale.x = 1.2;
                buttonup.fixedToCamera = true;
                buttonup.events.onInputOver.add(function () { _.direction.touchUp = true; });
                buttonup.events.onInputDown.add(function () { _.direction.touchUp = true; });
                buttonup.events.onInputOut.add(function () { _.direction.touchUp = false; });
                buttonup.events.onInputUp.add(function () { _.direction.touchUp = false; });

                var buttondown = GAME.add.button(33, playSize.height, 'button-arrow', null, this, 0, 1, 0, 1);
                buttondown.angle = 270;
                buttondown.scale.x = 1.2;
                buttondown.fixedToCamera = true;
                buttondown.events.onInputOver.add(function () { _.direction.touchDown = true; });
                buttondown.events.onInputDown.add(function () { _.direction.touchDown = true; });
                buttondown.events.onInputOut.add(function () { _.direction.touchDown = false; });
                buttondown.events.onInputUp.add(function () { _.direction.touchDown = false; });
            },
            this.reset = function(){
                playerGroup.forEachAlive((org)=>{
                    org.kill();
                });
                enemies.forEachAlive((org) => {
                    org.kill();
                })
            }
        },
        GameOver: {
            create: function () {
                //添加文字
                var titleStyle = { font: "bold 80px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
                var txtStyle = { font: "bold 60px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

                var title = GAME.add.text(GAME.world.centerX, GAME.world.centerY - 200, _.resultTxt, titleStyle);
                var score = GAME.add.text(GAME.world.centerX, GAME.world.centerY + 200, _.score, txtStyle);

                title.anchor.setTo(0.5, 0.5);
                score.anchor.setTo(0.5, 0.5);

                if (_.win) {
                    _.addEvent('gameWin', _.score);
                } else {
                    _.addEvent('gameOver', _.score);
                }
            }
        }
    };

    this.init = function () {
        // 添加场景到游戏示例中
        Object.keys(SCENE).map(function (key) {
            let gameCallBack = (typeof SCENE[key] == 'function') ? new SCENE[key]() : SCENE[key];

            GAME.state.add(key, gameCallBack); //创建实际的场景
            _.SCENE[key] = gameCallBack; //保存对象
        });

        //启动首个页面
        //GAME.state.start("Boot");
        GAME.state.start("Loading");
        return _;
    }
    
    //对外的控制
    this.control = {
        direction: function (key, val) {
            if (_.runing) {
                _.direction.touchUp = key == 'up' ? val : false;
                _.direction.touchRight = key == 'right' ? val : false;
                _.direction.touchDown = key == 'down' ? val : false;
                _.direction.touchLeft = key == 'left' ? val : false;
            }
            return _;
        },
        shooting: function (val) {
            if (_.runing) {
                _.SCENE.Play.shootFire() //发射子弹
            }
            return _;
        }
    }
    this.eon = function (event, callback) {
        //addScore
        /* var events = {
            killEnemy: null, //杀死敌人
            killWar: null, //打墙
            addScore: null, //增加分数
            eatStage: null, //吃到道具
            playerDie: null, //主角死亡
            gameOver: null //游戏结束
        }; */
        var events = _.events;
        //绑定事件
        Object.keys(events).map(function (key) {
            if (!!event && event == key && typeof callback=='function'){
                events[key] = callback;
            }
        })
        return _;
    }
    this.doPlay = function(){
        GAME.state.start("Play");
    }
    this.startPlay = function () {
        _.runing = true;

        //播放开始音效
        this.startScore();
        
        return _;
    }
    this.startScore = function () {
        if (_.isloading && _.runing) {
            _.SCENE.Play.userReadyCreate(); //创建主角和声音，还是有事件
            _.soundStart.play(); //播放开始音乐

            this.addEvent('gameStart'); //添加开始事件
        }
    }
    this.resetGame = function(){
        _.runing = false;
        _.direction = {
            touchUp: false,
            touchRight: false,
            touchDown: false,
            touchLeft: false
        };
        //GAME.state.start("Over");
        GAME.state.restart(); //重置场景，
        //GAME.destroy(); //重置场景，
        //_.SCENE.Play.reset(); //重置数据
    };
    this.pausedGame = function (params) {
        GAME.paused = false;
        return _;
    }
    this.stopGame = function(){
        _.runing = false;
        GAME.paused = false;
        return _;
    };
    this.addEvent = function (eventName) {
        var events = _.events;
        var options = Array.apply(null, arguments);//删除第一个参数
        options.shift();
        typeof events[eventName] == 'function' && events[eventName].call(this, ...options);
        //if (typeof _.events.addScore == 'function') _.events.addScore.call(this, score, way, origin);
    };
}



export default TankWar