import GameScene from "./GameScene"
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
    init(GameScene: GameScene) {
        this.GameScene = GameScene;
    }

    onLoad () {
        this.add_touch_listen();
    }

    start () {

    }

    turn_to_direction(data) {
        data = parseInt(data);
        // this.GameScene.turn_to_direction(data);
    }

    add_touch_listen() {
        this.moveButton.getChildByName("left").on(cc.Node.EventType.TOUCH_START, () => {
            
            this.turn_to_direction(-1);
            this.moveButton.getChildByName("left").scale += this.scaleNum;
            
        }, this);
        this.moveButton.getChildByName("right").on(cc.Node.EventType.TOUCH_START, () => {
            
            this.turn_to_direction(1);
            this.moveButton.getChildByName("right").scale += this.scaleNum;
        }, this);


        this.moveButton.getChildByName("left").on(cc.Node.EventType.TOUCH_END, () => {
            this.turn_to_direction(0);
            this.moveButton.getChildByName("left").scale -= this.scaleNum;
            
        }, this);
        this.moveButton.getChildByName("right").on(cc.Node.EventType.TOUCH_END, () => {
            this.turn_to_direction(0);
            this.moveButton.getChildByName("right").scale -= this.scaleNum;
            
        }, this);
       
        

        this.moveButton.getChildByName("left").on(cc.Node.EventType.TOUCH_CANCEL, () => {
            this.turn_to_direction(0);
            this.moveButton.getChildByName("left").scale -= this.scaleNum;
            
        }, this);
        this.moveButton.getChildByName("right").on(cc.Node.EventType.TOUCH_CANCEL, () => {
            this.turn_to_direction(0);
            this.moveButton.getChildByName("right").scale -= this.scaleNum;
            
        }, this);
        
    }

    // update (dt) {}
}
