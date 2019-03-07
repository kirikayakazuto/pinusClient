import UserInfoCtl from "./UserInfoCtl"
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(UserInfoCtl)
    UserInfoCtl: UserInfoCtl = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.UserInfoCtl.syncPlayerInfo();
    }

    start () {

    }

    // update (dt) {}
}
