import ViewGroup from "../../common/ViewGroup"
const {ccclass, property} = cc._decorator;

@ccclass
export default class PanelRootCtl extends cc.Component {

    viewGroup: ViewGroup = null;
    onLoad () {
        this.viewGroup = this.getComponent(ViewGroup);
    }

    start () {

    }

    

    // update (dt) {}
}
