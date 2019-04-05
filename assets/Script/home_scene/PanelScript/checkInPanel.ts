import ViewCtrl from "../../common/ViewCtrl";
const {ccclass, property} = cc._decorator;

@ccclass
export default class checkInPanel extends ViewCtrl {

    @property(cc.Label)
    title: cc.Label = null;

    public hasMask: boolean = false;
    public touchOutClose: boolean = true;
    public viewTitle = "checkInPanel";
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    public initView(obj: any) {
        if(obj) {
            this.viewTitle = obj.title;
        }
    }

    public onAddToStack(obj: any, parent: cc.Node, zIndex: number) {
        this.initView(obj);
        this.node.parent = parent;
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
