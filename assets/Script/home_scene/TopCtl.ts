import HomeScene from "./HomeScene"
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    notice: cc.Label = null;

    homeScene: HomeScene = null;



    init(homeScene: HomeScene) {
        this.homeScene = homeScene;
    }

    // onLoad () {}

    start () {

    }

    initNotice(str: string) {
        this.notice.node.x = 400;
        this.notice.string = str;
    }

    /**
     * 移动公告
     */
    moveNotice(dt: number) {
        this.notice.node.x -= dt * 30;
        if(this.notice.node.x < -(400 + this.notice.node.width)) {
            this.notice.node.x = 400;
        }
    }

    topUpdate(dt: number) {
        this.moveNotice(dt)
    }

    // update (dt) {}
}
