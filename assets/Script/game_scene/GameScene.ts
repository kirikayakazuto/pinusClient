import pinusUtil from "../common/pinusUtil";
import CtlButton from "./CtlButton"
import playerSeats from "./PlayerSeats"
import { UserInfo } from "../GameInterface";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    @property(CtlButton)
    CtlButton: CtlButton = null;
    @property(playerSeats)
    playerSeats: playerSeats = null;

    @property(cc.Prefab)
    gameOverPanel: cc.Prefab = null;


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.addServerListen();
        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
    }

    start () {
        this.CtlButton.init(this);
        // 场景加载完毕后, 想服务器发送通知表示游戏可以开始了
        this.sendGameCanStart();
    }
    /**
     * 发送消息, 游戏可以开始了
     */
    sendGameCanStart() {
        let route = "chat.chatHandler.enterGameScene";
        pinusUtil.request(route, {press: 1},  () => {
            
        });
    }
    /**
     * 添加监听事件
     */
    addServerListen() {
        pinusUtil.once("onWaitGameStart", (data: {waitTime: number, playerInfoList: [{seatId: number, playerInfo: UserInfo}]}) => {
            console.log("onWaitGameStart", data);
            this.playerSeats.initPlayerList(data.playerInfoList);
        });

        pinusUtil.once("onGameStart", (data: {waitTime: number}) => {
            console.log("onGameStart", data);
            this.node.getComponent("FrameManager").run();
        });
        /**
         * {openId: player.openId, seatId: player.seatId, isWin: player.isWin}
         */
        pinusUtil.once("onGameOver", (data: Array<any>) => {
            // 取消事件的监听
            this.node.getComponent("FrameManager").stop();

            let selfSeatId = this.playerSeats.selfSeatId;
            let node = cc.instantiate(this.gameOverPanel);
            let str = "";
            if(data[selfSeatId].isWin == 1) {
                str = "你赢了!";
            }else if(data[selfSeatId].isWin == -1) {
                str = "你输了!";
            }
            node.getComponent("gameOverPanelCtl").setTips(str);
            node.parent = this.node;
        });

        
    }

    // update (dt) {}
}
