
const {ccclass, property} = cc._decorator;

/**
 * 弹窗基类
 */
@ccclass
export default class ViewCtrl extends cc.Component {

    public hasMask: boolean = true;
    public touchOutClose: boolean = false;

    public viewTitle = "";


    public initView(obj: any) {

    }

    public onAddToStack(obj: any, parent: cc.Node, zinde: number) {
    }

    public onRemoveFromStack() {
    }
    /**
     * 动画
     */
    public onPlayShowAni() {

    }

    public onPlayHideAni() {
        
    }



    // update (dt) {}
}
