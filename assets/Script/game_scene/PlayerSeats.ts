import PlayerCtl from "./PlayerCtl"
import GameInfo from "../GameInfo";
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(PlayerCtl)
    playerA: PlayerCtl = null;
    @property(PlayerCtl)
    playerB: PlayerCtl = null;
    // LIFE-CYCLE CALLBACKS:

    playerList: Array<PlayerCtl> = new Array<PlayerCtl>(2);

    // onLoad () {}

    start () {

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
                break;
            }
        }
    }
    /**
     * 玩家移动
     * @param seatId 
     * @param data 
     */
    movePlayer(seatId: number, data: {turn: number, speed: number}) {
        this.playerList[seatId].setMoving(data.turn, data.speed);
    }

    frameUpdate(dt: number) {
        for(let i=0; i<this.playerList.length; i++) {
            this.playerList[i].frameUpdate(dt);
        }        
    }

    // update (dt) {}
}
