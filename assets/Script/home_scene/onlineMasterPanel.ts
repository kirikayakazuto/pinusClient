import { UserInfo } from "../GameInterface";
import GameInfo from "../GameInfo";
import pinusUtil from "../common/pinusUtil";
import RES from "../RES";

const {ccclass, property} = cc._decorator;
/**
 * 匹配面板
 */
@ccclass
export default class NewClass extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    @property(cc.Node)
    selfHead: cc.Node = null;
    @property(cc.Node)
    otherHead: cc.Node = null;

    @property(cc.Node)
    button: cc.Node = null;
    @property(cc.Label)
    title: cc.Label = null;

    onLoad () {
    }

    start () {
        this.showSelfInfo();
    }
    /**
     * 显示自己的信息
     */
    showSelfInfo() {
        this.selfHead.getChildByName("nickName").getComponent(cc.Label).string = GameInfo.userInfo.nickName;
        this.selfHead.getChildByName("gender").getComponent(cc.Label).string = GameInfo.userInfo.gender+"";

        cc.loader.load({url: GameInfo.userInfo.avatarUrl, type: 'jpg'}, (err, texture) => {
            if(err) {
                console.log(err);
                return ;
            }
            var sprite  = new cc.SpriteFrame(texture);
            this.selfHead.getChildByName("img").getComponent(cc.Sprite).spriteFrame = sprite;
        });
    }
    /**
     * 显示玩家信息
     */
    showOtherInfo(userInfo: UserInfo) {
        this.otherHead.getChildByName("nickName").getComponent(cc.Label).string = userInfo.nickName;
        this.otherHead.getChildByName("gender").getComponent(cc.Label).string = userInfo.gender+"";

        cc.loader.load({url: userInfo.avatarUrl, type: 'jpg'}, (err, texture) => {
            if(err) {
                console.log(err);
                return ;
            }
            var sprite  = new cc.SpriteFrame(texture);
            this.otherHead.getChildByName("img").getComponent(cc.Sprite).spriteFrame = sprite;
        });
    }

    startOrStopFlag = false;       // 防止多次点击
    startOrStopState = false;      // false表示未开始匹配
    startOrStopOnline() {
        if(this.startOrStopFlag) {
            return ;
        }
        this.startOrStopFlag = true;
        let route = "";
        if(this.startOrStopState) {
            route = "connector.entryHandler.removeMatchOnlinePlayer";
        }else {
            route = "connector.entryHandler.addMatchOnlinePlayer";
        }
        // 发送信息到服务器, 取消或开始排队
        pinusUtil.request(route, {roomType: 1}, (data) => {
            if(data.code != RES.OK) {
                console.log("err: ", data);
                return ;
            }else {
                if(data.msg.MatchPlayer == true) {
                    this.startOrStopState = true;
                    this.button.getChildByName("str").getComponent(cc.Label).string = "正在匹配中!";
                }else {
                    this.startOrStopState = false;
                    this.button.getChildByName("str").getComponent(cc.Label).string = "开始匹配";
                }
            }
            this.startOrStopFlag = false;
        });
    }
    /**
     * 关闭这个按钮
     */
    closeButtonClick(e: cc.Event.EventTouch, data) {
        /* let node: cc.Node = e.target;
        node.getComponent(cc.Button).interactable = false; */
        if(this.startOrStopState) {
            this.showTitle("正在匹配中, 请勿退出!");
        }else {
            this.node.removeFromParent();
        }
    }
    /**
     * 显示title 并在3s或隐藏
     * @param str 
     */
    showTitle(str: string) {
        this.title.string = str;
        this.title.node.active = true;
        this.unschedule(this.hideTitle);
        this.scheduleOnce(this.hideTitle, 3);
    }

    hideTitle() {
        this.title.node.active = false;
    }

    // update (dt) {}
}
