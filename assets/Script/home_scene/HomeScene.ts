import pinusUtil from "../common/pinusUtil";
import LeftTopCtl from "./LeftTopCtl"
import CenterCtl from "./CenterCtl"
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    @property(LeftTopCtl)
    leftTopCtl: LeftTopCtl = null;
    @property(CenterCtl)
    centerCtl: CenterCtl = null;

    onLoad () {
        
    }
    init() {
        this.leftTopCtl.init(this);
        this.centerCtl.init(this);
    }
    

    start () {
        this.enterAreaServer();   
    }

    syncPlayerInfo() {
        
    }

    /**
     * 进入游戏服务器
     */
    enterAreaServer() {
        let route = "chat.chatHandler.entryArea";
        pinusUtil.request(route, {areaId: 1}, (data) => {
            console.log(data);
        });
    }

    // update (dt) {}
}
 