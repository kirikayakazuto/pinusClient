import http = require("../utils/http.js");
import GameInfo from "../GameInfo";

const pinus = window["pinus"]; 
const {ccclass, property} = cc._decorator;

@ccclass
export default class net_connect extends cc.Component {

    @property(Number)
    is_proto_json: boolean = true;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        // this.getServerInfo();
    }

    getServerInfo() {
        let url = "http://127.0.0.1:3001";
        // let url = "http://106.13.53.55:10002";
        http.get(url, "/serverInfo", null, (err, ret) => {
            if(err) {
                console.log(err);
                this.scheduleOnce(this.getServerInfo.bind(this), 3);
                return ;
            }
 
            let data = JSON.parse(ret);

            this.connectToServer(data);
        });
    }

    connectToServer(data) {
        pinus.init({ 
            host: data.host, 
            port: data.port, 
            log: true 
        }, function () { 
            GameInfo.isConnectServer = true;
        }); 
    }

    // update (dt) {}
}
