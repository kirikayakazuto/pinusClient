import pinusUtil from "../common/pinusUtil";
import RES from "../RES";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    onlineMasterPanel: cc.Prefab = null;


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
