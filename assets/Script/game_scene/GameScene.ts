import pinusUtil from "../common/pinusUtil";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        // 场景加载完毕后, 想服务器发送通知表示游戏可以开始了
    }
    /**
     * 发送消息, 游戏可以开始了
     */
    sendGameCanStart() {
        pinusUtil.request('', {},  () => {

        });
    }

    // update (dt) {}
}
