import GameScene from "./GameScene"
import pinusUtil from "../common/pinusUtil";
import RES, { Cmd } from "../RES";
import Action from "../common/Action";
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    moveButton: cc.Node = null;
    @property(cc.Node)
    shootButton: cc.Node = null;

    scaleNum = 0.2;
    // LIFE-CYCLE CALLBACKS:

    GameScene: GameScene = null;
    action: Action = new Action();
    init(GameScene: GameScene) {
        this.GameScene = GameScene;
    }

    onLoad () {
        this.add_touch_listen();
    }

    start () {

    }

    /**
     * -----------------------  发送帧数据  ----------------------
     * @param data 
     */
    sendFrameData(data: Action) {
        let route = "chat.chatHandler.ReceivedPlayerCommand";
        pinusUtil.request(route, data, (data) => {
            if(data.code != RES.OK) {
                console.log("err: ", data);
            }
        });
    }
    /**
     * 
     * @param data 移动命令发出
     */
    sendPlayerMove(data) {
        data = parseInt(data);
        this.action.setCmdAndData(Cmd.Move, {turn: data, speed: 100});
        this.sendFrameData(this.action);
        
    }

    arrowButtonFlag = false;
    isStop = false;
    sendArrowRitationSwitch() {
        if(this.arrowButtonFlag) {
            return ;
        }
        this.arrowButtonFlag = true;

        this.isStop = !this.isStop;
        this.action.setCmdAndData(Cmd.ArrowRitationSwitch, {isStop: this.isStop});
        
        this.sendFrameData(this.action);

        this.scheduleOnce(() => {
            this.arrowButtonFlag = false;
        }, 1);
    }

    add_touch_listen() {
        this.moveButton.getChildByName("left").on(cc.Node.EventType.TOUCH_START, () => {
            this.sendPlayerMove(-1);
            this.moveButton.getChildByName("left").scale += this.scaleNum;
            
        }, this);

        this.moveButton.getChildByName("right").on(cc.Node.EventType.TOUCH_START, () => {    
            this.sendPlayerMove(1);
            this.moveButton.getChildByName("right").scale += this.scaleNum;
        }, this);


        this.moveButton.getChildByName("left").on(cc.Node.EventType.TOUCH_END, () => {
            this.sendPlayerMove(0);
            this.moveButton.getChildByName("left").scale -= this.scaleNum;    
        }, this);

        this.moveButton.getChildByName("right").on(cc.Node.EventType.TOUCH_END, () => {
            this.sendPlayerMove(0);
            this.moveButton.getChildByName("right").scale -= this.scaleNum;    
        }, this);
       
        

        this.moveButton.getChildByName("left").on(cc.Node.EventType.TOUCH_CANCEL, () => {
            this.sendPlayerMove(0);
            this.moveButton.getChildByName("left").scale -= this.scaleNum;
        }, this);
        this.moveButton.getChildByName("right").on(cc.Node.EventType.TOUCH_CANCEL, () => {
            this.sendPlayerMove(0);
            this.moveButton.getChildByName("right").scale -= this.scaleNum;
        }, this);
    }

    // update (dt) {}
}
