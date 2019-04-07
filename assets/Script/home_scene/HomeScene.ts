import pinusUtil from "../common/pinusUtil";
import LeftTopCtl from "./LeftTopCtl"
import CenterCtl from "./CenterCtl"
import TopCtl from "./TopCtl"
import LeftCtl from "./LeftCtl"
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    @property(LeftTopCtl)
    leftTopCtl: LeftTopCtl = null;
    @property(CenterCtl)
    centerCtl: CenterCtl = null;
    @property(TopCtl)
    topCtl: TopCtl = null;
    @property(LeftCtl)
    leftCtl: LeftCtl = null;

    onLoad () {
    }

    init() {
        this.leftTopCtl.init(this);
        this.centerCtl.init(this);
        this.topCtl.init(this);
        this.leftCtl.init(this);
    }
    
    start () {
        this.enterAreaServer();   

        this.init();
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
            // 进入服务器, 获取签到信息
            this.leftCtl.getLoginBonuesInfo();
        });
    }

    update (dt) {
        this.topCtl.topUpdate(dt);
    }
}
 