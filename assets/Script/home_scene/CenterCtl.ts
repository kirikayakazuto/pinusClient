import pinusUtil from "../common/pinusUtil";
import RES from "../RES";
import HomeScene from "./HomeScene"

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    onlineMasterPanel: cc.Prefab = null;


    homeScene: HomeScene = null;

    init(homeScene: HomeScene) {
        this.homeScene = homeScene;
    }
    // onLoad () {}

    start () {

    }
    /**
     * 匹配按钮点击
     */
    onlineButtonClick() {
        let node = cc.instantiate(this.onlineMasterPanel);
        node.parent = this.node;
    }

    test_button() {
        // pinusUtil.request();
    }

    // update (dt) {}
}
