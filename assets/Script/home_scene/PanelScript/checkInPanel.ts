import ViewCtrl from "../../common/ViewCtrl";
import utils from "../../utils/utils";
import HomeInfo from "../HomeInfo";
import pinusUtil from "../../common/pinusUtil";
import RES from "../../RES";

const {ccclass, property} = cc._decorator;

/**
 * 签到页面
 */
@ccclass
export default class checkInPanel extends ViewCtrl {

    @property(cc.Label)
    title: cc.Label = null;

    @property(cc.Node)
    list: cc.Node = null;

    public hasMask: boolean = false;
    public touchOutClose: boolean = true;
    public viewTitle = "checkInPanel";
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        
    }

    public initView(obj: any) {
        this.initLoginBonuesList();
    }

    public initLoginBonuesList() {
        let allItem = this.list.children;
        let i=0;
        for(i=0; i<allItem.length; i++) {
            allItem[i].getChildByName("str").getComponent(cc.Label).string = utils.getStrByNumber(i);
            let boneusNum = HomeInfo.LoginBonues.allBonues[i] ? HomeInfo.LoginBonues.allBonues[i] : HomeInfo.LoginBonues.allBonues[HomeInfo.LoginBonues.allBonues.length-1];
            allItem[i].getChildByName("bonues").getComponent(cc.Label).string = boneusNum + "金币";
            let str = "";
            let flag = false;
            if(i == HomeInfo.LoginBonues.days-1) {
                if(HomeInfo.LoginBonues.isSign) {
                    str = "已签到";
                    flag = false;
                }else {
                    str = "签到";
                    flag = true;
                }
            }else {
                if(i < HomeInfo.LoginBonues.days-1) {
                    str = "已签到";
                    flag = false;
                }else {
                    str = "未签到";
                    flag = false;
                }
            }
            allItem[i].getChildByName("checkIn").getComponent(cc.Button).interactable = flag;
            allItem[i].getChildByName("checkIn").getChildByName("str").getComponent(cc.Label).string = str;
            let clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点
            clickEventHandler.component = "checkInPanel";//这个是代码文件名
            clickEventHandler.handler = "buttonCallback";
            clickEventHandler.customEventData = "" + i;

            let button = allItem[i].getChildByName("checkIn").getComponent(cc.Button);
            button.clickEvents.push(clickEventHandler);
        }
    }

    buttonCallback(event, customEventData) {
        let route = "chat.chatHandler.getLoginBonuesResult"
        pinusUtil.request(route, {} , (data) => {
            if(data.code != RES.OK) return ;
            this.list.children[customEventData].getChildByName("checkIn").getComponent(cc.Button).interactable = false;
        })
    }

    public onAddToStack(obj: any, parent: cc.Node, zIndex: number) {
        this.initView(obj);
        this.node.parent = parent;
        console.log(this.node.x , this.node.y);
        this.node.zIndex = zIndex;
        this.onPlayShowAni();
    }

    public onRemoveFromStack() {
        this.node.removeFromParent();
    }
    /**
     * 动画
     */
    public onPlayShowAni() {
        console.log("播放入场动画");
    }

    public onPlayHideAni() {
        console.log("播放隐藏动画");
        this.onRemoveFromStack();
    }

    public closeButtonClick() {
        let viewGroup = this.node.parent.getComponent("ViewGroup");
        if(viewGroup && viewGroup.removeView(this)) {
            // 成功
        }
        // 失败
    }





    // update (dt) {}
}
