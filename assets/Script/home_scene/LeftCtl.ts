import ViewGroup from "../common/ViewGroup"
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(ViewGroup)
    viewGroup: ViewGroup = null;

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
