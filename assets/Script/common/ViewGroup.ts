import ViewCtrl from "../common/ViewCtrl"
const {ccclass, property} = cc._decorator;

@ccclass
export default class ViewGroup extends cc.Component {
    @property(cc.Node)
    maskLayer: cc.Node = null;

    private viewArr: Array<ViewCtrl> = [];
    private len = 0;


    public loadAndPushPrefab(prefabName: string, obj: any) {
        this.maskLayer.active = true;
        cc.loader.loadRes("prefab/" + prefabName, cc.Prefab, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            let prefab = result as cc.Prefab;
            let view = cc.instantiate(prefab);
            let ctrl = view.getComponent("ViewCtrl");
            if(ctrl) {
                this.pushView(ctrl, false, obj);
            }
        });
    }

    public maskClickAndPopView() {
        if(this.getFirstView() && this.getFirstView().touchOutClose) {
            this.popView(false);
        }
    }

    public pushView(ctrl: ViewCtrl, hideOld: boolean, obj: any): void {
        if(hideOld) {
            this.clear();
        }
        this.viewArr.push(ctrl);
        ctrl.onAddToStack(obj, this.node, this.len);
        this.len ++;
    }

    public popView(cleanup: boolean): void {
        let ctrl = this.viewArr.pop();
        if(!ctrl) return ;
        ctrl.onPlayHideAni();
        this.len --;
        if(this.len == 0) {
            this.maskLayer.active = false;
        }
    }

    public clear() {
        for(let ctrl of this.viewArr) {
            ctrl.onRemoveFromStack();
        }
        this.maskLayer.active = false;
        this.viewArr = [];
        this.len = 0;
    }

    public insertView(ctrl: ViewCtrl, obj: any): void {
        ctrl.onAddToStack(obj, this.node, this.len);
    }

    public removeView(ctrl: ViewCtrl) {
        for(let i=0; i<this.viewArr.length; i++) {
            if(this.viewArr[i].viewTitle == ctrl.viewTitle) {
                this.viewArr[i].onPlayHideAni();
                this.viewArr.splice(i, 1);
                this.len --;
                if(this.len == 0) {
                    this.maskLayer.active = false;
                }
                return true;
            }
        }
        return false;
    }


    public getFirstView() {
        return this.viewArr[this.len -1] != null ? this.viewArr[this.len-1] : null;
    }

    public getLastView(): ViewCtrl {
        return this.viewArr[0] != null ? this.viewArr[0] : null;
    }

    public getViewByTitle(title: string): ViewCtrl {
        for(let i=0; i<this.viewArr.length; i++) {
            if(this.viewArr[i].viewTitle == title) {
                return this.viewArr[i];
            }
        }
        return null;
    }

    public getViewCount(): number {
        return this.viewArr.length;
    }

    public isEmpty(): boolean {
        return this.viewArr.length == 0;
    }
}