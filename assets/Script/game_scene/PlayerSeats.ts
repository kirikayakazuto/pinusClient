import PlayerCtl from "./PlayerCtl"
import GameInfo from "../GameInfo";
import Action from "../common/Action";
import { Cmd, ArmsStatus } from "../RES";
import CtlButton from "./CtlButton"
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(PlayerCtl)
    playerA: PlayerCtl = null;
    @property(PlayerCtl)
    playerB: PlayerCtl = null;
    // LIFE-CYCLE CALLBACKS:

    selfSeatId = -1;
    playerList: Array<PlayerCtl> = new Array<PlayerCtl>(2);

    ctlButton:  CtlButton = null;

    // onLoad () {}

    start () {
        
    }

    initButtonCtl(ctlButton: CtlButton) {
        this.ctlButton = ctlButton;
    }

    getCtlButton() {
        return this.ctlButton;
    }

    getSelfPlayer() {
        return this.playerList[this.selfSeatId];
    }
    
    /**
     * 初始化玩家座位
     * @param playerList 
     */
    initPlayerList(playerList) {
        this.playerList[playerList[0].seatId] = this.playerA;
        this.playerList[playerList[1].seatId] = this.playerB;

        for(let i=0; i<playerList.length; i++) {
            if(playerList[i].playerInfo.openId == GameInfo.userInfo.openId) {
                this.playerList[i].showSelfFlag();
                this.selfSeatId = i;
            }
            this.playerList[i].init(this);
        }
    }
    /**
     * 处理帧数据
     */
    dealWithFrameData(action: Action) {
        switch (action.cmd) {
            case Cmd.Move:
               this.movePlayer(action.seatId, action.data);    
            break;
        
            case Cmd.ArrowRitationSwitch:           // 是否开启旋转
                this.switchArrowRitation(action.seatId, action.data);
            break;
            
            case Cmd.switchArmsStatus:              // 是否发出斧头
                this.switchArmsStatus(action.seatId, action.data);
            break;

            case Cmd.Jump:
                this.playerJump(action.seatId, action.data);
            break;


        }

    }
    /**
     * 玩家移动
     * @param seatId 
     * @param data 
     */
    movePlayer(seatId: number, data: {turn?: number, speed?: number}) {
        this.playerList[seatId].setDirection(data.turn, data.speed);
    }

    /**
     * 切换旋转
     */
    switchArrowRitation(seatId: number, data: {isStop?: boolean}) {
        this.playerList[seatId].setSwitchArrowRotation(data.isStop);
    }

    switchArmsStatus(seatId: number, data: any) {
        if(data.armsStatus == ArmsStatus.Runing) {
            this.playerList[seatId].thowArms(data.playerPos, data.shootSpeed, data.turnFace);
        }else if(data.armsStatus == ArmsStatus.Recycling) {
            this.playerList[seatId].recoveryArms();
        }
        
    }

    playerJump(seatId: number, data: any) {
        this.playerList[seatId].setJumping();
    }



    frameUpdate(dt: number) {
        for(let i=0; i<this.playerList.length; i++) {
            this.playerList[i].frameUpdate(dt);
        }        
    }

    

    // update (dt) {}
}
