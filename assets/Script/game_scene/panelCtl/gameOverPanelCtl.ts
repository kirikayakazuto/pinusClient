
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    @property(cc.Label)
    tips: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    /**
     * ------------- 显示和隐藏 ----------------------
     */
    setTips(str: string) {
        this.tips.string = str;
    }

    skipCheckout() {

    }

    

    closeButtonClick() {
        this.node.removeFromParent();
    }

    // update (dt) {}
}
