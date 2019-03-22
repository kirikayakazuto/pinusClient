import { ArmsStatus } from "../RES";
import frame_anim from "../common/frame_anim"
import PlayerCtl from "./PlayerCtl"

const {ccclass, property} = cc._decorator;
/**
 * 武器控制系统
 * 作者: 邓朗
 * 时间: 2019年3月22日18:34:11
 */
@ccclass
export default class NewClass extends cc.Component {

    @property([cc.SpriteFrame])
    armsOnHand: Array<cc.SpriteFrame> = []; 
    @property([cc.SpriteFrame])
    armsOnGround: Array<cc.SpriteFrame> = [];

    /**
     * ------------------
     */
    collisionX = 0;         // 碰撞方向
    collisionY = 0;
    touchingNumber = 0;     // 是否在碰撞中

    prePosition = cc.v2();
    preStep = cc.v2();

    armsSpeed = cc.v2(0, 0);    // 武器的速度

    armsStatus = ArmsStatus.OnHand; // 武器的状态   0表示武器在玩家手上, 1表示武器扔出去, 2表示武器在地上, 3表示武器收回来

    armsFrameAnim: frame_anim = null;

    canCollision = false;       // 是否开始碰撞

    playerCtl: PlayerCtl = null;
    posCha = -25;
    recoverySpeed = 800;

    onLoad () {
        this.armsFrameAnim = this.node.getComponent(frame_anim);
    }

    start () {

    }

    init(playerCtl: PlayerCtl) {
        this.playerCtl = playerCtl;
    }

    /**
     * 改变武器的状态
     */
    setArmsStatus(status: ArmsStatus, whichOne?: number) {
        this.armsStatus = status;
        this.armsFrameAnim.no_play_anim();      // 停止播放动画

        if(this.armsStatus == ArmsStatus.OnHand) {
            this.node.getComponent(cc.Sprite).spriteFrame = this.armsOnHand[whichOne];
            this.canCollision = false;
            return ;
        }
        if(this.armsStatus == ArmsStatus.onGround){
            this.node.getComponent(cc.Sprite).spriteFrame = this.armsOnGround[whichOne];
            this.canCollision = true;
            return ;
        }
        // 飞行中
        this.armsFrameAnim.play_loop();
        this.canCollision = true;
        return ;
    }


    /**
     * 扔出斧头
     * @param curPos 
     * @param speed 
     * @param turnFace 
     */
    thowArms(curPos: cc.Vec2, speed: cc.Vec2, turnFace: number) {
        if(this.armsStatus != ArmsStatus.OnHand) {
            return ;
        }
        this.setArmsStatus(ArmsStatus.Runing);
        this.node.x = curPos.x + this.posCha * turnFace;
        this.node.y = curPos.y;

        speed.x *= turnFace;

        speed.x *= 500;
        speed.y *= 500;
        this.armsSpeed = speed;
    }
    /**
     * 回收斧头
     */
    recoveryArms() {
        if(this.armsStatus != ArmsStatus.onGround) {
            return ;
        }
        this.setArmsStatus(ArmsStatus.Recycling);
    }




    /**
     * ------------------ 碰撞回调 ------------------
     * 
     * 实现功能
     * 选择中的斧头击中石块后, 
     * step1, 隐藏旋转的斧头
     * step2, 计算击中位置, 以及需要替换的停止斧头
     * step3, 
     * @param other 
     * @param self 
     */
    onCollisionEnter(other: cc.BoxCollider, self: cc.BoxCollider) {
        if(!this.canCollision) {
            return ;
        }
        this.touchingNumber ++;
        let otherAabb = other["world"].aabb;
        let otherPreAabb = other["world"].preAabb.clone();  // 上一帧的包围盒

        let selfAabb = self["world"].aabb;
        let selfPreAabb = self["world"].preAabb.clone();    // 上一帧的包围盒, 因为碰撞会导致两个包围盒层叠

        selfPreAabb.x = selfAabb.x;
        otherPreAabb.x = otherAabb.x;

        if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
            if (this.armsSpeed.x < 0 && (selfPreAabb.xMax > otherPreAabb.xMax)) {
                this.node.x = this.node.parent.convertToNodeSpaceAR(cc.v2(otherPreAabb.xMax+selfPreAabb.width/2, 0)).x;
                this.collisionX = -1;
            }
            else if (this.armsSpeed.x > 0 && (selfPreAabb.xMin < otherPreAabb.xMin)) {
                this.node.x = this.node.parent.convertToNodeSpaceAR(cc.v2(otherPreAabb.xMin-selfPreAabb.width/2, 0)).x;
                this.collisionX = 1;
            }
            this.armsSpeed = cc.v2(0, 0);
            other["touchingX"] = true;
            this.setArmsStatus(ArmsStatus.onGround, 0);
            return;
        }

        selfPreAabb.y = selfAabb.y;
        otherPreAabb.y = otherAabb.y;

        if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
            if (this.armsSpeed.y < 0 && (selfPreAabb.yMax > otherPreAabb.yMax)) {
                this.node.y = this.node.parent.convertToNodeSpaceAR(cc.v2(0, otherPreAabb.yMax)).y;
                this.collisionY = -1;
                this.setArmsStatus(ArmsStatus.onGround, 1);
            }
            else if (this.armsSpeed.y > 0 && (selfPreAabb.yMin < otherPreAabb.yMin)) {
                this.node.y = this.node.parent.convertToNodeSpaceAR(cc.v2(0, otherPreAabb.yMin - selfPreAabb.height)).y;
                this.collisionY = 1;
                this.setArmsStatus(ArmsStatus.onGround, 2);
            }
            this.armsSpeed = cc.v2(0, 0);
            other["touchingY"] = true;
        }    
    }

    onCollisionStay(other: cc.BoxCollider, self: cc.BoxCollider) {
        if(!this.canCollision) {
            return ;
        }

    }

    onCollisionExit(other: cc.BoxCollider, self: cc.BoxCollider) {
        if(!this.canCollision) {
            return ;
        }
        this.touchingNumber --;         // 减去一次碰撞

        if (this.touchingNumber === 0) {
            
        }

        if (other["touchingX"]) {
            this.collisionX = 0;
            other["touchingX"] = false;
        }
        else if (other["touchingY"]) {
            other["touchingY"] = false;
            this.collisionY = 0;
        }
    }

    /**
     * 由帧同步 操作的
     * @param dt 
     */
    updateArmsPosition(dt: number) {
        if(this.armsStatus == ArmsStatus.Runing || this.armsStatus == ArmsStatus.Recycling) {
            this.node.x += this.armsSpeed.x * dt;
            this.node.y += this.armsSpeed.y * dt;
        }
    }
    updateRecoveryArms(dt: number) {
        if(this.armsStatus != ArmsStatus.Recycling) {
            return ;
        }
        let psub = cc.pSub(this.node.position, this.playerCtl.node.position);
        let len = Math.sqrt(psub.x * psub.x + psub.y * psub.y);
        if(Math.abs(psub.x) < 30 && Math.abs(psub.y) < 30) {
            this.setArmsStatus(ArmsStatus.OnHand, 0)
            return ;
        }
        this.node.x += -psub.x/len * this.recoverySpeed * dt;
        this.node.y += -psub.y/len * this.recoverySpeed * dt;
    }

    update (dt) {
        if(this.armsStatus == ArmsStatus.OnHand) {
            this.node.x = this.playerCtl.turnFace  * this.posCha + this.playerCtl.node.x;
            this.node.y = this.playerCtl.node.y;
            this.node.scaleX = this.playerCtl.turnFace;
        }
    }
}
