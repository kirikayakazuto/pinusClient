import HomeScene from "./HomeScene";
import ViewGroup from "../common/ViewGroup"
import pinusUtil from "../common/pinusUtil";
import RES from "../RES";
import HomeInfo from "./HomeInfo";

const {ccclass, property} = cc._decorator;
/**
 * 左侧的功能
 * 1, 签到
 * 作者: 邓朗
 * 时间: 2019年4月7日12:51:50
 */
@ccclass
export default class NewClass extends cc.Component {

    @property(ViewGroup)
    viewGroup: ViewGroup = null;

    homeScene: HomeScene = null;
    init(homeScene: HomeScene) {
        this.homeScene = homeScene;
    }

    /**
     * 判断是否需要签到
     */
    getLoginBonuesInfo() {
        let route = "chat.chatHandler.getLoginBonuesInfo";
        console.log(route);
        pinusUtil.request(route, {} ,(data: {code: number, msg: any}) => {
            HomeInfo.LoginBonues = data.msg;
            if(!HomeInfo.LoginBonues.isSign) {
                this.viewGroup.loadAndPushPrefab("checkInPanel", null);
            }
        });
    }

    // onLoad () {}
    

    start () {

    }

    rankButtonClick() {
        console.log("排行榜");
    }

    activeButtonClick() {
        console.log("活动");
    }

    checkInButtonClick() {
        this.viewGroup.loadAndPushPrefab("checkInPanel", null);
    }

    // update (dt) {}
}
