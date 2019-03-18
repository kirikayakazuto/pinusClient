
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    // LIFE-CYCLE CALLBACKS:

    isSelf = false;     // 是否是自己
    
    seatId = -1;        // 座位号
    
    moving = 0;         // 0表示没有移动 -1表示正在向左移动, 1表示右
    jumpint = 0;        // 0表示没有跳起, 1表示正在空中
    speed = 0;          // 移动的速度

    @property(cc.Node)
    selfFlag: cc.Node = null;


    // onLoad () {}

    start () {

    }

    init() {

    }

    showSelfFlag() {
        this.isSelf = true;
        this.selfFlag.active = true;
    }
    /**
     * 左右移动
     */
    setMoving(moving: number, speed: number) {
        this.moving = moving;
        this.speed = speed;
    }

    updataMove(dt: number) {
        if(this.moving == 0) {
            return ;
        }
        this.node.x += dt * this.moving * this.speed;
    }
    /**
     * 跳起 
     */
    Jump() {

    }

    frameUpdate(dt: number) {
        this.updataMove(dt);
    }

    // update (dt) {}
}
