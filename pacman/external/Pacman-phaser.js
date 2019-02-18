
import 'pixi'
//import 'p2'
import Phaser from 'phaser'
import DialogBuilder from "base/DialogBuilder.js";

const CONFIGS = {
    enemys: [
        {
            width: 1,
            height: 1,
            speed: 1, //速度
            pos: { x: 12, y: 14 }
        },
        {
            width: 1,
            height: 1,
            speed: 1, //速度
            pos: { x: 13, y: 14 }
        },
        {
            width: 1,
            height: 1,
            speed: 1, //速度
            pos: { x: 14, y: 14 }
        },
        {
            width: 1,
            height: 1,
            speed: 1, //速度
            pos: { x: 15, y: 14 }
        }
    ],
    //主角基本信息
    player: {
        width: 1,
        height: 1,
        life: 3, //生命值
        speed: 1, //速度
        pos: { x: 14, y: 17 },
        god: true //上帝模式
    },
    //关卡
    levelData: {
        levels: [
            //total： 总数
            //disb： 数量分布
            [1, { total: 20, disb: [5, 3, 3, 2, 2, 2, 2, 1] }, 4], //等级，敌机数量，一次生产数量
        ]
    },
    map: {
        topx: 36,
        topy: 36,
        width: 28,
        height: 31
    }
}


const Pacman = function (box, params) {
    var _ = this;
    var settings = {
        width: 1008,
        height: 1116,
        GAME: null,
        SCENE: {},
        score: 0,
        isloading: false,
        win: 0,
        runing: false,
        resultTxt: '',
        soundStart: null,
        direction: {
            touchUp: false,
            touchRight: false,
            touchDown: false,
            touchLeft: false,
        },
        events: {
            gameStart: function () { }, //杀死敌人, 死的坦克/原因
            killEnemy: function (target, way) { }, //杀死敌人, 死的坦克/原因
            addScore: function (val, way, origin) { }, //增加分数， 值/方法/分数来源
            gameOver: function (score, level) { }, //游戏结束
            gameWin: function (score, level) { } //游戏通关
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
        Loading: {
            preload: function () {
                /* var loading = GAME.add.sprite(GAME.world.centerX, GAME.world.centerY, "loading");
                loading.anchor.setTo(0, 0.5);
                loading.x = loading.x - loading.width / 2;
                GAME.load.setPreloadSprite(loading); */

                GAME.load.audio("sound-bg", require("assets/images/activity-anniversary-pacman-2018/game/audio/bg.mp3"));
                GAME.load.audio("sound-dead", require("assets/images/activity-anniversary-pacman-2018/game/audio/dead.mp3"));
                GAME.load.audio("sound-eatBig", require("assets/images/activity-anniversary-pacman-2018/game/audio/eatBig.mp3"));

                GAME.load.image('dot', require('assets/images/activity-anniversary-pacman-2018/game/images/dot.png'));
                GAME.load.image("pill", require("assets/images/activity-anniversary-pacman-2018/game/images/pill.png"));
                GAME.load.image('tiles', require('assets/images/activity-anniversary-pacman-2018/game/images/tiles.png'));
                GAME.load.spritesheet('pacman', require('assets/images/activity-anniversary-pacman-2018/game/images/pacman.png'), 72, 72);
                GAME.load.spritesheet("ghosts", require("assets/images/activity-anniversary-pacman-2018/game/images/ghosts.png"), 72, 72);
                GAME.load.tilemap('levels', require('assets/images/activity-anniversary-pacman-2018/game/levels/levels.json'), null, Phaser.Tilemap.TILED_JSON);

                

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
                _.isloading = true;
                //优先添加背景音效
                _.soundStart = GAME.add.audio("sound-bg", 0.8, true);

                _.startScore();//开始播放音效和派发开始事件

                GAME.state.start("Play");//切换到play
            }
        },

        Play: function () {
            var levelInfo = null;

            var soundDead,
                soundEatBig;

            var block = 38,
                playerSpeed = 260, //主角的速度
                enemySpeed = 180, //敌人的速度
                enemyEatSpeed = 140, //敌人复活的速度
                reviveSpeed = 300; //敌人复活的速度

            var path_map = [],
                map,
                layer;
            var safetile = 14; //需要替换的安全点

            var dots = null;
            var numDots = 0;
            var TOTAL_DOTS = 0;
            var pills = null,
                numPills = 0;

            //主角和敌人
            var player = null;
            var clyde = null;
            var pinky = null;
            var inky = null;
            var blinky = null;
            var isInkyOut = false;
            var isClydeOut = false;
            var ghosts = null;

            var debugText = null;
            var overflowText = null;


            var keyPressTimer = 0; // 按钮时间
            var KEY_COOLING_DOWN_TIME = 450; //按钮延时时间
            var cursors = null; //控制按钮
            var marker = {}; //标记最近点的地图位置
            var turnPoint = {}; //标记最近点的地图位置
            var directions = [null, null, null, null, null];; //标记最近点的上下左右的地图信息
            var opposites = [Phaser.NONE, Phaser.RIGHT, Phaser.LEFT, Phaser.DOWN, Phaser.UP];

            //方向
            var touchLeft = false,
                touchRight = false,
                touchUp = false,
                touchDown = false;

            this.init = function () {
                GAME.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT; //显示模式
                GAME.scale.pageAlignHorizontally = true; //垂直居中对齐
                GAME.scale.pageAlignVertically = true;  //水平居中对齐
                //GAME.time.advancedTiming = true;
                GAME.physics.startSystem(Phaser.Physics.ARCADE);    //使用ARCADE物理引擎
                GAME.stage.backgroundColor = '#000';

                //随机关卡
                //var rd = parseInt(Math.random() * CONFIGS.levelData.current); //0-5
                var rd = 0;
                console.log('当前关卡：' + rd);
                levelInfo = CONFIGS.levelData.levels[rd];

                block = parseInt(_.width / CONFIGS.map.width);
                console.log(block)
            }
            this.preload = function () {
                var self = this;
                //添加音频
                soundDead = GAME.add.audio("sound-dead");
                soundEatBig = GAME.add.audio("sound-eatBig");
            }
            this.create = function () {
                var self = this;

                map = GAME.add.tilemap('levels');
                map.addTilesetImage('tiles', 'tiles', block, block);
                map.playTimer = 0;
                map.playIndex = 0;
                layer = map.createLayer("level-" + levelInfo[0], _.width, _.height);
                path_map = _.getMapPath(map.layers[0].data);

                //普通的小点
                dots = GAME.add.physicsGroup();
                //dots = GAME.add.group();
                //dots.enableBody = true;
                numDots = map.createFromTiles(7, safetile, 'dot', layer, dots);
                dots.setAll('x', 14, false, false, 1);
                dots.setAll('y', 14, false, false, 1);

                //大点
                pills = GAME.add.physicsGroup();
                //pills = GAME.add.group();
                //pills.enableBody = true;
                numPills = map.createFromTiles(40, safetile, "pill", layer, pills);

                //  添加除安全点外的碰撞检测
                map.setCollisionByExclusion([safetile], true, layer);
                layer.resizeWorld();
                
                //创建主角
                player = GAME.add.sprite(CONFIGS.player.pos.x * block + block / 2, CONFIGS.player.pos.y * block + block / 2, "pacman", 0);
                player.anchor.setTo(0.5, 0.5);
                player.scale.x = -1;
                player.coord = CONFIGS.player.pos;
                player.speed = CONFIGS.player.speed;
                player.direction = Phaser.NONE; //默认的方向
                player.turning = Phaser.NONE;
                player.want2go = Phaser.NOEN;
                player.threshold = 6; //因为在高速下你不能转弯,所以使用阈值
                player.isDead = false; //死亡状态
                player.move = false;

                GAME.physics.arcade.enable(player, Phaser.Physics.ARCADE);//开启物理引擎
                //player.body.collideWorldBounds = true; //反弹
                player.body.immovable = true; //不可被碰撞移动
                //相对于地图有18px的偏移,居中
                player.body.setSize(block, block, block/2, block/2);

                player.animations.add('munch', [0, 1, 2, 1], 20, true);
                player.animations.add("death", [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], 10, false);
                player.play('munch');
                //this.playerMove(Phaser.LEFT); //默认左移动

                // 创建敌人
                ghosts = GAME.add.group();
                blinky = this.makeEnemys(0, 'blinky');
                pinky = this.makeEnemys(1, 'pinky', 1000);
                inky = this.makeEnemys(2, 'inky', 2000);
                clyde = this.makeEnemys(3, 'clyde', 3000);
                
                //添加控制监听
                cursors = GAME.input.keyboard.createCursorKeys();
                
            };
            this.makeEnemys = function (index, name, startTime) {
                var einfo = CONFIGS.enemys[index];
                var sprite = ghosts.getFirstDead(true, einfo.pos.x * block + block / 2, einfo.pos.y * block + block / 2, "ghosts", 4 * index);
                sprite.anchor.set(0.5, 0.5);

                sprite.name = name;
                sprite.timeToMove = 0;
                sprite.status = 1; //1-正常状态，2-可以被吃，3-已经被吃
                sprite.speed = einfo.speed;
                sprite.coord = einfo.pos; //当前的地图位置
                sprite.direction = index % 2 == 0 ? 'LEFT' : 'RIGHT';
                sprite.path = [];
                sprite.oldPath = einfo.pos;
                sprite.bu = 0;//记录步数
                sprite.idx = index;//记录索引
                sprite.animTime = 0;//动画的时间
                sprite.startTime = !!startTime ? startTime: 0;//敌人行动开启延时

                sprite.animations.add("LEFT", [4 * index], 0, false);
                sprite.animations.add("UP", [4 * index + 1], 0, false);
                sprite.animations.add("DOWN", [4 * index + 2], 0, false);
                sprite.animations.add("RIGHT", [4 * index + 3], 0, false);

                sprite.animations.add("frightened", [16, 17], 10, true); //可以被吃
                sprite.animations.add("RIGHT20", [20], 0, false); //复活动画
                sprite.animations.add("LEFT20", [21], 0, false);
                sprite.animations.add("UP20", [22], 0, false);
                sprite.animations.add("DOWN20", [23], 0, false);
                sprite.play(sprite.direction);

                GAME.physics.arcade.enable(sprite);
                sprite.body.collideWorldBounds = true;
                sprite.body.setSize(block, block, block / 2, block / 2);
                //sprite.body.velocity.x = index % 2 == 0 ? -1 * sprite.speed * enemySpeed : sprite.speed * enemySpeed; //默认速度

                return sprite;
            };
            this.update = function () {
                if (_.runing && player) {
                    GAME.physics.arcade.collide(player, layer); //主角跟墙壁
                    //GAME.physics.arcade.collide(ghosts, layer); //主角跟墙壁

                    GAME.physics.arcade.overlap(player, dots, this.eatDot, null, this); //吃小点
                    GAME.physics.arcade.overlap(player, pills, this.eatPill, null, this); //吃大点

                    GAME.physics.arcade.overlap(player, ghosts, this.checkResult, null, this); //碰到了敌人

                    //检查主角状态
                    this.checkGameState();
                    //检查当前的方向
                    this.checkKeys();
                }
                //游戏结束，停止全部动作
                if (_.win>0){
                    player.body.moves = false;
                    ghosts.forEach((org) => {
                        org.body.moves = false;
                        //org.body.velocity.setTo(0, 0);
                    });
                }
            };
            this.checkGameState = function(){
                //检查游戏的状态
                if (numDots <= 0 && numPills<=0 && _.score>0){
                    _.runing = false;
                    this.gameWin();
                };
                //判断是不是第一次进来，并且移动
                if (_.runing && !player.move){
                    player.move = true;
                    this.playerMove(Phaser.LEFT); //默认左移动
                };


                this.checkPlayer();//检查主角状态
                this.checkEnemy();
            };
            
            this.checkPlayer = function (){
                if (!player.isDead) {
                    //标记最近的网格位置
                    marker.x = GAME.math.snapToFloor(Math.floor(player.x), block) / block;
                    marker.y = GAME.math.snapToFloor(Math.floor(player.y), block) / block;
                    //移动到边界判断
                    if (marker.x < 0) {
                        player.x = map.widthInPixels - 1;
                    }
                    if (marker.x >= map.width) {
                        player.x = 1;
                    }
                    directions[1] = map.getTileLeft(layer.index, marker.x, marker.y);
                    directions[2] = map.getTileRight(layer.index, marker.x, marker.y);
                    directions[3] = map.getTileAbove(layer.index, marker.x, marker.y);
                    directions[4] = map.getTileBelow(layer.index, marker.x, marker.y);
                    //
                    if (player.turning !== Phaser.NONE) {
                        var cx = Math.floor(player.x);
                        var cy = Math.floor(player.y);

                        //  This needs a threshold, because at high speeds you can't turn because the coordinates skip past
                        if (!GAME.math.fuzzyEqual(cx, turnPoint.x, player.threshold) || !GAME.math.fuzzyEqual(cy, turnPoint.y, player.threshold)) {
                            return false;
                        }

                        //  Grid align before turning
                        player.x = turnPoint.x;
                        player.y = turnPoint.y;

                        player.body.reset(turnPoint.x, turnPoint.y);
                        this.playerMove(player.turning);
                        player.turning = Phaser.NONE;
                    };

                    //更新当前的地图坐标
                    var player_mapPos = this.position2coord(player.x, player.y, player.speed * playerSpeed / 30);//enemySpeed
                    if (player_mapPos.inCenter) player.coord = player_mapPos;
                    //console.log(player_mapPos)

                }else{
                    //死亡
                    this.playerMove(Phaser.NONE);
                    player.play("death");
                }
            };
            this.checkEnemy = function(){
                ghosts.forEach(function(item){
                    //更新敌人的状态
                    //给全部敌人分配行为
                    this.enemyAllot(item);

                }, this);
                //this.enemyAllot(blinky);
            };
            this.playerMove = function (direction) {
                if (direction === Phaser.NONE) {
                    player.body.velocity.x = player.body.velocity.y = 0;
                    return;
                }

                /* player.body.velocity.x = player.body.velocity.y = 0;
                //设置标准的地图点，防止碰撞检测不允许转弯
                player.x = player.coord.x * block + block / 2;
                player.y = player.coord.y * block + block / 2; */
                var speed = player.speed*playerSpeed;

                if (direction === Phaser.LEFT || direction === Phaser.UP) {
                    speed = -speed;
                }

                if (direction === Phaser.LEFT || direction === Phaser.RIGHT) {
                    player.body.velocity.x = speed;
                }
                else {
                    player.body.velocity.y = speed;
                }

                //  Reset the scale and angle (Pacman is facing to the right in the player sheet)
                player.scale.x = 1;
                player.angle = 0;

                if (direction === Phaser.LEFT) {
                    player.scale.x = -1;
                }
                else if (direction === Phaser.UP) {
                    player.angle = 270;
                }
                else if (direction === Phaser.DOWN) {
                    player.angle = 90;
                }
                player.direction = direction;// 记录方向
                //this.current = direction;
            };
            this.enemyAllot = function (enemy) {
                var dfpos = CONFIGS.enemys[enemy.idx].pos;
                var n_path_map = JSON.parse(JSON.stringify(path_map));//深拷贝
                var nextPath = [];
                
                //通过状态判断动画效果,和速度
                var speed = enemySpeed;
                var anim = 1; //默认状态
                if (enemy.status == 2) {
                    anim = 2; //可以被吃
                    speed = enemyEatSpeed;
                } else if (enemy.status == 3) {
                    anim = 3; //复活
                    speed = reviveSpeed;
                };

                enemy.startTime -= 16;

                //获取当前的地图坐标
                var enemy_mapPos = this.position2coord(enemy.x, enemy.y, enemy.speed * speed/30);
                //判断移动的位置是否到达地图点坐标,并且到达了上次分配的path配置，到达了则分配下一步的地图位置
                if ( enemy_mapPos.inCenter && (enemy.oldPath.x == enemy_mapPos.x && enemy.oldPath.y == enemy_mapPos.y) ){
                    enemy.coord = enemy_mapPos; //记录有效的位置
                    //判断复活
                    if (enemy.status == 3 && enemy_mapPos.x == dfpos.x && enemy_mapPos.y == dfpos.y) enemy.status = 1;
                    //判断是否清除被吃状态
                    if (enemy.status == 2 && GAME.time.time > enemy.animTime) enemy.status = 1;

                    //使用等待的动作
                    if (enemy.startTime > 0) {
                        var rdA = Math.random() * 10 > 5 ? "LEFT" : "RIGHT";
                        //this.enemyMove(enemy, { x: dfpos.x + rdn, y: dfpos.y }, anim, speed / 3);
                        enemy.play(rdA);
                        return;
                    };
                    //判断是否有路径
                    if(enemy.path.length<=0){
                        //需要重新计算
                        var new_map = n_path_map.slice(0);
                        //把其它出来了的队友动作墙壁,位置不能重叠，通过位置来判断是否出来11，12 16，15。判断是否走到了两侧通道上
                        ghosts.forEach(function(item){
                            //步数大于3， 是非复活的状态
                            if (
                                item.bu > 3 && 
                                item.name != enemy.name && 
                                item.status == 1 && 
                                //(item.coord.x != enemy_mapPos.x && item.coord.y != enemy_mapPos.y) && 
                                !(item.coord.x >= 11 && item.coord.x <= 16 && item.coord.y >= 12 && item.coord.y <= 15) &&
                                !(item.coord.y == 14 && (item.coord.x <= 5 || item.coord.x>=22))
                                ){
                                new_map[item.coord.y][item.coord.x] = 1;
                            }
                        }, this);

                        var start = enemy_mapPos,
                            end = player.coord,
                            dataLen = 2;    //正常状态只取前三步
                        //远离主角
                        if (enemy.status == 2){
                            //start = player.coord;
                            end = dfpos;//回到复活点
                            dataLen = 0;
                        } else if (enemy.status == 3){
                            end = dfpos;//回到复活点
                            dataLen = 0;
                        };

                        var finder = _.finderA({
                            map: new_map,
                            start: start,//enemy.coord,
                            end: end,
                            safety: [14, 7, 40, 35, 36]
                        });
                        var finderPath = finder.path || []; //路线
                        var finderNext = finder.next || []; //路线
                        if (finderPath.length <= 0 && finderNext.length>0){
                            //获取随机周围可以走的点
                            finderPath = [ finderNext[Math.floor(Math.random() * finderNext.length)] ];
                        };

                        //获取需要的步骤长度
                        var path = finderPath.slice(0, dataLen > 0 ? dataLen: finderPath.length);
                        if (path.length <= 0) path = [enemy.oldPath]; //未取到,则用上一步的动作
                        enemy.path = path;
                    };
                    nextPath = enemy.path[0]; //使用步骤
                    
                    //通过点来判断方向,同时移动
                    this.enemyMove(enemy, nextPath, anim, speed);

                    enemy.oldPath = enemy.path.shift();//删除使用过的第一个path
                    enemy.timeToMove = GAME.time.now + 2000;
                    enemy.bu++; //记录步数
                }
            };
            this.enemyMove = function (enemy, nextPath, anim, speed){
                //enemy.x = enemy.coord.x * block + block / 2;
                //enemy.y = enemy.coord.y * block + block / 2;
                //通过点来判断方向
                if (nextPath.x > enemy.coord.x && enemy.coord.y == nextPath.y) {
                    //右
                    enemy.play(anim == 1 ? "RIGHT" : (anim == 2 ? "frightened" : 'RIGHT20'));
                    enemy.body.velocity.x = enemy.speed * speed;
                    enemy.body.velocity.y = 0;
                    enemy.direction = "RIGHT";
                } else if (nextPath.x < enemy.coord.x && enemy.coord.y == nextPath.y) {
                    //左
                    enemy.play(anim == 1 ? "LEFT" : (anim == 2 ? "frightened" : 'LEFT20'));
                    enemy.direction = "LEFT";
                    enemy.body.velocity.x = -enemy.speed * speed;
                    enemy.body.velocity.y = 0;
                } else if (nextPath.y < enemy.coord.y && enemy.coord.x == nextPath.x) {
                    //上
                    enemy.play(anim == 1 ? "UP" : (anim == 2 ? "frightened" : 'UP20'));
                    enemy.direction = "UP";
                    enemy.body.velocity.y = -enemy.speed * speed;
                    enemy.body.velocity.x = 0;
                } else if (nextPath.y > enemy.coord.y && enemy.coord.x == nextPath.x) {
                    //下
                    enemy.play(anim == 1 ? "DOWN" : (anim == 2 ? "frightened" : 'DOWN20'));
                    enemy.direction = "DOWN";
                    enemy.body.velocity.y = enemy.speed * speed;
                    enemy.body.velocity.x = 0;
                } else {
                    //原地，无路径
                    enemy.body.velocity.x = 0;
                    enemy.body.velocity.y = 0;
                };

                
            };
            this.eatDot = function (org, dot) {
                dot.kill();
                _.addScore(10, 'eatDot', dot);
                numDots--;
            }
            this.eatPill = function (org, dot) {
                dot.kill();
                soundEatBig.play();
                _.addScore(50, 'eatPill', dot);
                numPills--;
                //修改敌人的模式
                ghosts.forEach(function (item) {
                    //有动过的敌人
                    if (item.bu>1){
                        item.status = 2;
                        item.animTime = GAME.time.time + (item.idx*1000 + 3000);//开启4秒的倒计时
                    }
                }, this);
            }
            this.checkResult = function (org, enemy){
                //主角死亡，结束
                if (enemy.status == 1){
                    enemy.kill();
                    player.isDead = true;
                    //停止全部的动作
                    ghosts.forEach(function (item) {
                        item.body.velocity.x = 0;
                        item.body.velocity.y = 0;
                    });
                    this.gameOver();
                    
                } else if (enemy.status == 2){
                //吃敌人
                    enemy.status = 3; //修改敌人状态
                    _.addScore(200, 'eatEnemy', enemy); //加分
                };
                //3,代表敌人去复活，不做处理
            }
            this.gameOver = function (params) {
                _.win = 1;
                _.runing = false;
                if (!_.runing){
                    _.soundStart.stop();
                    soundDead.play();
                    _.resultTxt = "GameOver";
                    //进入游戏结束界面
                    setTimeout(() => {
                        GAME.state.start("GameOver");
                    }, 1000);
                }
            }
            this.gameWin = function (params) {
                _.win = 2;
                _.runing = false;
                if (!_.runing) {
                    _.soundStart.stop();
                    _.resultTxt = "GameWin";
                    //进入游戏结束界面
                    GAME.state.start("GameOver");
                }
            }
            //判断按钮的方向
            this.checkDirection = function (turnTo) {
                if (player.turning === turnTo || directions[turnTo] === null || directions[turnTo].index !== safetile) {
                    //  Invalid direction if they're already set to turn that way
                    //  Or there is no tile there, or the tile isn't index 1 (a floor tile)
                    return;
                }
                //  Check if they want to turn around and can
                if (player.direction === opposites[turnTo]) {
                    this.playerMove(turnTo);
                    keyPressTimer = GAME.time.time;
                }
                else {
                    player.turning = turnTo;

                    turnPoint.x = (marker.x * block) + (block / 2);
                    turnPoint.y = (marker.y * block) + (block / 2);
                    player.want2go = Phaser.NONE;
                }
            };
            //检查按键
            this.checkKeys = function () {
                //记录按下的时间
                if (cursors.left.isDown ||
                    cursors.right.isDown ||
                    cursors.up.isDown ||
                    cursors.down.isDown) {
                    keyPressTimer = GAME.time.time + KEY_COOLING_DOWN_TIME;
                };
                if (_.direction.touchUp || _.direction.touchRight || _.direction.touchDown || _.direction.touchLeft) {
                    keyPressTimer = GAME.time.time + KEY_COOLING_DOWN_TIME;
                };

                if ((cursors.left.isDown && player.direction !== Phaser.LEFT) || _.direction.touchLeft) {
                    player.want2go = Phaser.LEFT;
                }
                else if ((cursors.right.isDown && player.direction !== Phaser.RIGHT) || _.direction.touchRight) {
                    player.want2go = Phaser.RIGHT;
                }
                else if ((cursors.up.isDown && player.direction !== Phaser.UP) || _.direction.touchUp) {
                    player.want2go = Phaser.UP;
                }
                else if ((cursors.down.isDown && player.direction !== Phaser.DOWN) || _.direction.touchDown) {
                    player.want2go = Phaser.DOWN;
                };
                //this.checkDirection(player.want2go);

                //1-left,2-right,4-bottom,3-top
                if (GAME.time.time > keyPressTimer) {
                    //  This forces them to hold the key down to turn the corner
                    player.turning = Phaser.NONE;
                    player.want2go = Phaser.NONE;
                } else {
                    this.checkDirection(player.want2go);
                    _.direction.touchUp = false;
                    _.direction.touchRight = false;
                    _.direction.touchDown = false;
                    _.direction.touchLeft = false;
                };
            };
            //地图坐标转画布坐标
            this.coord2position = function (cx, cy) {
                return {
                    x: cx * block + block / 2, //每个绘制点的size/2
                    y: cy * block + block / 2
                };
            };
            //画布坐标转地图坐标,往前找
            this.position2coord = function (x, y, speed) {
                //当前实际位置减去地图起始坐标位置 % 格子 == 当前位置的地图坐标还剩余位置  刚刚好等于一半
                var fx = Math.abs(x % block - block / 2);
                var fy = Math.abs(y % block - block / 2);
                return {
                    //通过精灵实际位置来计算坐标位置
                    x: Math.floor((x) / block), // - block/2,因为误差 去掉半径
                    y: Math.floor((y) / block),
                    offset: Math.sqrt(fx * fx + fy * fy), //横竖方向的矢量差
                    inCenter: Math.abs(fx) <= speed && Math.abs(fy) <= speed
                };
            };
        },
        GameOver: {
            create: function () {
                //添加文字
                var titleStyle = { font: "bold 80px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
                var txtStyle = { font: "bold 60px Arial", fill: "red", boundsAlignH: "center", boundsAlignV: "middle" };
                var tipsStyle = { font: "bold 36px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

                var title = GAME.add.text(GAME.world.centerX, GAME.world.centerY - 200, _.resultTxt, titleStyle);
                var score = GAME.add.text(GAME.world.centerX, GAME.world.centerY + 50, _.score, txtStyle);
                var tips = GAME.add.text(GAME.world.centerX, GAME.world.centerY + 200, "排行榜可能延时，若积分未累计，请刷新页面", tipsStyle);

                title.anchor.setTo(0.5, 0.5);
                score.anchor.setTo(0.5, 0.5);
                tips.anchor.setTo(0.5, 0.5);

                if (_.win == 2) {
                    _.addEvent('gameWin', _.score);
                //} else if (_.win == 1) {
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
    this.direction = function (key, val) {
        if (_.runing) {
            _.direction.touchUp = key == 'up' ? val : false;
            _.direction.touchRight = key == 'right' ? val : false;
            _.direction.touchDown = key == 'down' ? val : false;
            _.direction.touchLeft = key == 'left' ? val : false;
        }
        return _;
    };
    this.eon = function (event, callback) {
        var events = _.events;
        //绑定事件
        Object.keys(events).map(function (key) {
            if (!!event && event == key && typeof callback == 'function') {
                events[key] = callback;
            }
        })
        return _;
    }
    this.doPlay = function () {
        GAME.state.start("Play");
    }
    this.startPlay = function () {
        _.runing = true;
        //播放开始音效
        this.startScore();

        return _;
    }
    this.startScore= function(){
        if (_.isloading && _.runing) {
            this.addEvent('gameStart'); //添加开始事件
            _.soundStart.play(); //播放开始音乐
        }
    }
    this.resetGame = function () {
        _.runing = false;
        _.direction = {
            touchUp: false,
            touchRight: false,
            touchDown: false,
            touchLeft: false
        };
        //GAME.state.start("Over");
        GAME.destroy(); //重置场景，
        //_.SCENE.Play.reset(); //重置数据
    };
    this.addEvent = function (eventName) {
        var events = _.events;
        var options = Array.apply(null, arguments);//删除第一个参数
        options.shift();
        typeof events[eventName] == 'function' && events[eventName].call(this, ...options);
    }
    this.addScore = function (addv, way, origin){
        _.score += addv;
        this.addEvent('addScore', _.score, way, origin);//加分事件
    };
    this.setGameOver = function(){
        _.runing = false;
        _.win = 1;
        _.soundStart.stop(); 
        _.resultTxt = "GameOver";
        GAME.state.start("GameOver");
    }
    this.getMapPath = function(arr){
        var narr = [],
            zarr = [];
        for (var i = 0; i < arr.length;i++){
            for (var j = 0; j < arr[i].length; j++) {
                zarr.push(arr[i][j].index);
            };
            narr.push(zarr);
            zarr = [];
        };
        return narr;
    };
    //寻址算法
    this.finderA = function (params) {
        var startTime = new Date().getTime();
        var runTimes = 0;
        var defaults = {
            map: null,
            start: {},
            end: {},
            type: 'path'
        };
        var options = Object.assign({}, defaults, params);
        var MAP = options.map,
            x_length = MAP[0].length,
            y_length = MAP.length;
        var steps = MAP.slice(0);     //步骤的映射
        var nextPath = [];
        var ii = 0;
        /* for (var y = y_length; y--;) {
            steps[y] = new Array(x_length).fill(0);//填充数组
        } */

        var openList = [],    //开启列表
            closeList = [],   //关闭列表
            result = [],      //结果数组
            result_index = -1,   //结果数组在开启列表中的序号
            resultPath = []; //最终的路径

        var sMapVal = getMapValue(options.start.x, options.start.y),
            eMapVal = getMapValue(options.end.x, options.end.y);
        if (options.safety.indexOf(sMapVal) == -1 || options.safety.indexOf(eMapVal) == -1){//当起点或终点设置在墙上
            return {};
        };
        //起点或终点设置在一起
        if (options.start.x == options.end.x && options.start.y == options.end.y){
            return {};
        };
        
        openList.push({ x: options.start.x, y: options.start.y, G: 0 });//把当前点加入到开启列表中，并且G是0

        do {
            ii++;
            var currentPoint = openList.pop();  //删除第一个开启列表的位置
            closeList.push(currentPoint);   //保存到关闭列表
            var surroundPoint = SurroundPoint(currentPoint); //获取周边四个点

            for (var i in surroundPoint) {
                var item = surroundPoint[i],
                    mapVal = getMapValue(item.x, item.y);
                if (
                    item.x >= 0 &&                            //判断是否在地图上
                    item.y >= 0 &&
                    item.x < x_length &&
                    item.y < y_length &&
                    options.safety.indexOf(mapVal) != -1 &&         //判断是否是障碍物
                    existList(item, closeList) < 0/*  &&          //判断是否在关闭列表中
            getMapValue(item.x, currentPoint.y) != 1 &&   //判断之间是否有障碍物，如果有障碍物是过不去的
            getMapValue(currentPoint.x, item.y) != 1 */) {
                    //g 到父节点的位置
                    //如果是上下左右位置的则g等于10，斜对角的就是14
                    var g = currentPoint.G + ((currentPoint.x - item.x) * (currentPoint.y - item.y) == 0 ? 10 : 14);
                    //点到了墙壁以外
                    if (getMapValue(item.x, item.y) == -1) {
                        item.x = (item.x + x_length) % x_length;
                        item.y = (item.y + y_length) % y_length;
                        item["change"] = 1;
                    }
                    if (existList(item, openList) < 0) {       //如果不在开启列表中
                        //计算H，通过水平和垂直距离进行确定
                        item['H'] = Math.abs(options.end.x - item.x) * 10 + Math.abs(options.end.y - item.y) * 10;
                        item['G'] = g;
                        item['F'] = item.H + item.G;
                        item['parent'] = currentPoint;
                        openList.push(item);
                    }
                    else {                                  //存在在开启列表中，比较目前的g值和之前的g的大小
                        var index = existList(item, openList);
                        //如果当前点的g更小
                        if (g < openList[index].G) {
                            openList[index].parent = currentPoint;
                            openList[index].G = g;
                            openList[index].F = g + openList[index].H;
                        }

                    };
                    if (ii == 1) nextPath.push(item);
                }
                runTimes++;
            }
            //如果开启列表空了，没有通路，结果为空
            if (openList.length == 0) {
                break;
            }
            //小-大
            openList.sort(sortF);//这一步是为了循环回去的时候，找出 F 值最小的, 将它从 "开启列表" 中移掉

            result_index = existList({ x: options.end.x, y: options.end.y }, openList);
        } while (result_index < 0);

        //拿到最后路径后，整理路径
        if (result_index >= 0) {
            var currentObj = openList[result_index];
            do {
                //把路径节点添加到result当中
                result.unshift({
                    x: currentObj.x,
                    y: currentObj.y
                });
                steps[currentObj.y][currentObj.x] = 'path';//记录当前的位置已经是在路线中了
                currentObj = currentObj.parent;
            } while (currentObj.x != options.start.x || currentObj.y != options.start.y);

        };
        resultPath = result;

        //代表是整体路径的后一步，比如要远离某一个，就是在最优路径的后一步
        if (options.type == 'next' && result.length > 0) {
            var nextPoint = SurroundPoint(result[result.length - 1]); //获取周边四个点
            resultPath = [];
            for (var i in nextPoint) {
                var item = nextPoint[i],
                    mapVal = getMapValue(item.x, item.y);
                if (
                    item.x >= 0 &&                            //判断是否在地图上
                    item.y >= 0 &&
                    item.x < x_length &&
                    item.y < y_length &&
                    options.safety.indexOf(mapVal) > -1 &&         //判断是否是障碍物
                    steps[item.y][item.x] != 'path') {           //判断当前点是否已经存在于路径中了
                    resultPath.push(item);
                }
            }
        }
        //console.log('useTime:' + (startTime - new Date().getTime()) + ";runTimes" + runTimes)
        return {
            path: resultPath,
            next: nextPath
        }

        function getMapValue(x, y) {  //获取地图上的值
            if (MAP[y] && typeof MAP[y][x] != 'undefined') {
                return MAP[y][x];
            }
            return -1;
        };
        //用F值对数组排序
        function sortF(a, b) {
            return b.F - a.F;
        }
        //获取周围八个点的值，不走斜线
        function SurroundPoint(curPoint) {
            var x = curPoint.x, y = curPoint.y;
            return [
                //{ x: x - 1, y: y - 1 }, //左上
                { x: x, y: y - 1 }, //上
                //{ x: x + 1, y: y - 1 }, //右上
                { x: x + 1, y: y }, //右
                //{ x: x + 1, y: y + 1 }, //右下
                { x: x, y: y + 1 }, //下
                //{ x: x - 1, y: y + 1 }, //左下
                { x: x - 1, y: y } //左
            ]
        }
        //判断点是否存在在列表中，是的话返回的是序列号
        function existList(point, list) {
            for (var i in list) {
                if (point.x == list[i].x && point.y == list[i].y) {
                    return i;
                }
            }
            return -1;
        };
    }
    this.finder2 = function (params){
        var startTime = new Date().getTime();
        var runTimes = 0;
        var defaults = {
            map: null,
            start: {},
            end: {},
            type: 'path'
        };
        var options = _extend({}, defaults, params);
        if (options.map[options.start.y][options.start.x] || options.map[options.end.y][options.end.x]) { //当起点或终点设置在墙上
            return [];
        }
        var finded = false;
        var result = [];
        var y_length = options.map.length;
        var x_length = options.map[0].length;
        var steps = [];     //步骤的映射
        for (var y = y_length; y--;) {
            steps[y] = new Array(x_length).fill(0);//填充数组
        }
        var _getValue = function (x, y) {  //获取地图上的值
            if (options.map[y] && typeof options.map[y][x] != 'undefined') {
                return options.map[y][x];
            }
            return -1;
        };
        var _next = function (to) { //判定是否可走,可走放入列表
            var value = _getValue(to.x, to.y);
            if (options.safety.indexOf(value) != -1) {
                if (value == -1) {//超出的位置
                    to.x = (to.x + x_length) % x_length; //右出左进
                    to.y = (to.y + y_length) % y_length;
                    to.change = 1;
                }
                if (!steps[to.y][to.x]) {//映射的数组位置存在
                    result.push(to);
                }
            }
            runTimes++;
        };
        var _render = function (list) {//找线路
            var new_list = [];
            var next = function (from, to) {
                var value = _getValue(to.x, to.y);
                if (options.safety.indexOf(value) != -1) {	//当前点是否可以走
                    if (value == -1) {
                        to.x = (to.x + x_length) % x_length;
                        to.y = (to.y + y_length) % y_length;
                        to.change = 1;
                    }
                    if (to.x == options.end.x && to.y == options.end.y) {
                        steps[to.y][to.x] = from;
                        finded = true;
                    } else if (!steps[to.y][to.x]) {//在数组里
                        steps[to.y][to.x] = from;
                        new_list.push(to);
                    }
                }
                runTimes++;
            };
            list.forEach(function (current) {
                next(current, { y: current.y + 1, x: current.x });//下
                next(current, { y: current.y, x: current.x + 1 });//右
                next(current, { y: current.y - 1, x: current.x });//上
                next(current, { y: current.y, x: current.x - 1 });//左
            });
            if (!finded && new_list.length) {
                _render(new_list);
            }
        };
        _render([options.start]);

        if (finded) {
            var current = options.end;
            if (options.type == 'path') {
                while (current.x != options.start.x || current.y != options.start.y) {
                    result.unshift(current);
                    current = steps[current.y][current.x];
                }
            } else if (options.type == 'next') {
                _next({ x: current.x + 1, y: current.y });
                _next({ x: current.x, y: current.y + 1 });
                _next({ x: current.x - 1, y: current.y });
                _next({ x: current.x, y: current.y - 1 });
            }
        }
        //console.log('useTime:' + (startTime - new Date().getTime()) + ";runTimes" + runTimes )
        return result;
    }
}



export default Pacman