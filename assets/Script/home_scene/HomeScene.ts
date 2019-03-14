import pinusUtil from "../common/pinusUtil";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    }
    

    start () {
        this.enterAreaServer();   
        // this.addEventListen();
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
 