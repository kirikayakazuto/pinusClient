import UserInfoCtl from "./UserInfoCtl"
import HomeScene from "./HomeScene"
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(UserInfoCtl)
    UserInfoCtl: UserInfoCtl = null;

    homeScene: HomeScene = null;

    init(homeScene: HomeScene) {
        this.homeScene = homeScene;
        this.syncPlayerInfo();
    }

    onLoad () {
        
    }
    syncPlayerInfo() {
        this.UserInfoCtl.syncPlayerInfo();
    }
    syncGameInfo() {
        this.UserInfoCtl.syncPlayerGameInfo();
    }

    start () {

    }

    // update (dt) {}
}
