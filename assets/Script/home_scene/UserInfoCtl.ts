import GameInfo from "../GameInfo";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Sprite)
    headImg: cc.Sprite = null;
    @property(cc.Label)
    nickName: cc.Label = null;

    @property(cc.Label)
    playerLevel: cc.Label = null;
    @property(cc.Label)
    playerChip: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }
    /**
     * 同步用户信息
     */
    syncPlayerInfo() {
         cc.loader.load({url: GameInfo.userInfo.avatarUrl, type: 'jpg'}, (err, texture) => {
            if(err) {
                console.log(err);
                return ;
            }
            var sprite  = new cc.SpriteFrame(texture);
            this.headImg.getComponent(cc.Sprite).spriteFrame = sprite;
        });

        this.nickName.string = GameInfo.userInfo.nickName;
        this.playerChip.string = "金币:" + GameInfo.userInfo.chip;
        this.playerLevel.string = GameInfo.userInfo.exp + "";
    }

    syncPlayerGameInfo() {
        this.playerChip.string = "金币:" + GameInfo.userInfo.chip;
        this.playerLevel.string =  "" + GameInfo.userInfo.exp;
    }
 
    // update (dt) {}
}
