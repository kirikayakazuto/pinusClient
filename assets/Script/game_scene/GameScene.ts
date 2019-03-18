import pinusUtil from "../common/pinusUtil";
import RES from "../RES";
import CtlButton from "./CtlButton"
import playerSeats from "./PlayerSeats"
import Action from "../common/Action";
import { UserInfo } from "../GameInterface";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    @property(CtlButton)
    CtlButton: CtlButton = null;
    @property(playerSeats)
    playerSeats: playerSeats = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.addServerListen();
    }

    start () {
        this.CtlButton.init(this);
        // 场景加载完毕后, 想服务器发送通知表示游戏可以开始了
        this.sendGameCanStart();
    }

    sendPlayerMove(direction: number) {
        let route = "chat.chatHandler.playerMove";
        pinusUtil.request(route, {type: "move", data: {
            turn: direction,
            speed: 100,
        }}, (data) => {
            if(data.code != RES.OK) {
                console.log("err: ", data);
            }
        });
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
        pinusUtil.on("onWaitGameStart", (data: {waitTime: number, playerInfoList: [{seatId: number, playerInfo: UserInfo}]}) => {
            console.log("onWaitGameStart", data);   
            this.playerSeats.initPlayerList(data.playerInfoList);
        });

        pinusUtil.on("onGameStart", (data: {waitTime: number}) => {
            console.log("onGameStart", data);
            this.node.getComponent("FrameManager").run();
        });
    }

    
    /**
     * 发送命令给服务器
     */
    sendEventToServer() {

    }

    // update (dt) {}
}
