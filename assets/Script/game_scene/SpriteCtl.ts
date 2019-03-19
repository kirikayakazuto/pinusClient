import frame_anim from "../common/frame_anim"
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    Arrow: cc.Node = null;
    @property(cc.Node)
    armsSp: cc.Node = null;
    playerSpArray: Array<frame_anim> = [];
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.playerSpArray = this.node.getChildByName("playerSp").getComponents(frame_anim);
    }

    start () {

    }

    hideArmSp() {
        this.armsSp.active = false;
    }
    showArmSp() {
        this.armsSp.active = true;
    }

    getArrowRotation() {
        let v = cc.p(0, 0);
        v.y = Math.sin(-(this.Arrow.rotation - 90) * 0.017453293);
        v.x = Math.cos(-(this.Arrow.rotation - 90) * 0.017453293);
        return v;
    }

    /**
     * 播放一个动画
     * 0 站着不动, 1走动, 2跳跃
     */
    playPlayerAnimByIndex(index: number) {
        if(this.playerSpArray[2].is_playing && index == 1) {
                return ;
        }
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
