import pinusUtil from "../common/pinusUtil";
import LeftTopCtl from "./LeftTopCtl"
import CenterCtl from "./CenterCtl"
import TopCtl from "./TopCtl"
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    @property(LeftTopCtl)
    leftTopCtl: LeftTopCtl = null;
    @property(CenterCtl)
    centerCtl: CenterCtl = null;
    @property(TopCtl)
    topCtl: TopCtl = null;

    onLoad () {
        
    }

    init() {
        this.leftTopCtl.init(this);
        this.centerCtl.init(this);
        this.topCtl.init(this);
    }
    
    start () {
        this.enterAreaServer();   
        this.leftTopCtl.syncPlayerInfo();
    }

    syncPlayerInfo() {
        
    }
    /**
     * ------------------------------------- topctl -------------------------
     */
    initNotice(str: string) {
        this.topCtl.initNotice(str);
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

    update (dt) {
        this.topCtl.topUpdate(dt);
    }
}
 