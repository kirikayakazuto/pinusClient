import frame_anim from "../common/frame_anim"
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    Arrow: cc.Node = null;
    playerSpArray: Array<frame_anim> = [];
    // LIFE-CYCLE CALLBACKS:

    arrowRotationDir = 1;       // 箭头旋转方向
    arrowRotationSpeed = 25;       // 箭头旋转的速度
    arrowRotationFlag = false;      // 是否开始旋转


    onLoad () {
        this.playerSpArray = this.node.getChildByName("playerSp").getComponents(frame_anim);
    }

    start () {

    }
    /**
     * 设置旋转速度
     * @param speed 
     */
    setArrowRotationSpeed(speed: number) {
        this.arrowRotationSpeed = speed;
    }
    /**
     * 切换旋转
     */
    switchArrowRotation(isStop: boolean) {
        this.arrowRotationFlag = isStop;
    }

    /**
     * 获取箭头旋转的角度
     */
    getArrowRotation() {
        let v = cc.p(0, 0);
        v.y = Math.sin(-(this.Arrow.rotation - 90) * 0.017453293);
        v.x = Math.cos(-(this.Arrow.rotation - 90) * 0.017453293);
        return v;
    }
    /**
     * 箭头旋转
     * @param dt 
     */
    updateArrowRotation(dt: number) {
        if(this.arrowRotationFlag) {
            return ;
        }
        if(this.Arrow.rotation <= 30) {
            this.arrowRotationDir = 1;
        }else if(this.Arrow.rotation >= 120) {
            this.arrowRotationDir = -1;
        }
        this.Arrow.rotation += dt * this.arrowRotationDir * this.arrowRotationSpeed;
    }

    /**
     * 播放一个动画
     * 0 站着不动, 1走动, 2跳跃
     */
    playPlayerAnimByIndex(index: number) {
        for(let i=0; i<this.playerSpArray.length; i++) {
            if(i == index) {
                continue;
            }
            this.playerSpArray[i].no_play_anim();
        }
        if(!this.playerSpArray[index].is_playing) {
            this.playerSpArray[index].play_loop();
        }
    }

    // update (dt) {}
}
