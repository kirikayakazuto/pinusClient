import GameInfo from "../GameInfo";
import pinusUtil from "../common/pinusUtil";
import GSceneUtil from "../common/GSceneUtil";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    startButton: cc.Node = null;
    canStart = false;
    // LIFE-CYCLE CALLBACKS:

    onLoad () { 
        
    }

    start () {

    }
    /**
     * 点击开始游戏
     */
    startButtonClick() {
        if(GameInfo.isConnectServer && this.canStart) {
            let self = this;
            window["wx"].login({
                success: function(res) {
                // res中包含code
                let code = res.code;
                // 获取用户信息
                window["wx"].getUserInfo({
                    withCredentials: true,      // 必须在wx.login之后，这里才能为true
                    success: function(result) {
                        // result中包含encryptedData和iv
                        let encryptedData = result.encryptedData;
                        let iv = result.iv;
                        // 将res.code, result.encryptedData, result.iv发送到服务器
                        self.enterTheGame(code, encryptedData, iv);
                    },
                    fail: function(result) {
                        // 错误处理
                    },
                });
                },
                fail: function(res) {
                    // 错误处理
                },
            });
        }
    }
    /**
     * 进入游戏
     */
    enterTheGame(code: string, encryptedData: string, iv: string) {
        let route = "gate.gateHandler.queryEntry";
        pinusUtil.request(route,  {
            code: code,
            encryptedData: encryptedData,
            iv: iv
        }, (res: any) => {
            if(!res || res.code != 1) {
                console.log("请求网关, 返回值不对", res);
                return ;
            }
            res = res.msg;
            GameInfo.userInfo = res.userInfo;
            let route = "connector.entryHandler.enter";
            pinusUtil.init(res.host, res.port, true, route, {openId: GameInfo.userInfo.openId}, (data: any) => {
                if(data && data.code == 1) {
                    console.log("登录成功!");
                    cc.director.loadScene("home_scene");
                }
            });
        });
    }
    /**
     * 测试用
     */
    quikLoginGame(e, data) {
        if(data == 'kiri') {
            GameInfo.userInfo = {
                openId: "oKH7c4g30VXZxQ5CV3iRQo-QjNo8",
                nickName: "kirigayakazuto",
                avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaELED8YcLTuBpUC279icN0vO8UWSUN7VrYyhPFBzibCWhwOicB7ym5NJaoLZq64KYTyRsF0CVT1zTJVoQ/132",
                gender: 1,
                chip: 1000,
                exp: 0,
                city: "Jiujiang",
                country: "China",
                province: "Jiangxi"
            };
        }else {
            GameInfo.userInfo = {
                openId: "oKH7c4g30VXZxQ5CV3iRQo-QjNo9", 
                nickName: "denglang",
                avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaELED8YcLTuBpUC279icN0vO8UWSUN7VrYyhPFBzibCWhwOicB7ym5NJaoLZq64KYTyRsF0CVT1zTJVoQ/132",
                gender: 1,
                chip: 1000,
                exp: 10,
                city: "Jiujiang",
                country: "China",
                province: "Jiangxi"
            };
        }
        

        let route = "connector.entryHandler.enter";
        pinusUtil.init("127.0.0.1", 3050, true, route, {openId: GameInfo.userInfo.openId}, (data: any) => {
            if(data && data.code == 1) {
                GSceneUtil.loadSceneWithProgress("home_scene")
            }
        });        
    }
    /**
     * 获取用户授权
     */
    getWXUserScope() {
        let self = this;
        window["wx"].getSetting({
            success(res) {
                // 已授权
                if (res.authSetting["scope.userInfo"]){
                    // 进入下一步，点击开始游戏
                    self.canStart = true;
                    self.startButton.active = true;
                } else {                                              // 显示授权按钮
                    let sysInfo = window["wx"].getSystemInfoSync();
                    let button = window["wx"].createUserInfoButton({
                        type: 'text',
                        text: '',
                        style: {
                            left: 0,
                            top: 0,
                            width: sysInfo.screenWidth,
                            height: sysInfo.screenHeight,
                            backgroundColor: '#00000000',//最后两位为透明度
                            color: '#ffffff',
                            fontSize: 20,
                            textAlign: "center",
                            lineHeight: sysInfo.screenHeight,
                        }
                    });
                    button.onTap(function(res)
                    {
                        if (res.userInfo) {
                            button.destroy();
                            // 进入下一步，比如 点击开始游戏
                            self.canStart = true;
                            self.startButton.active = true;
                        }
                        else {
                            window["wx"].showModal({
                                title: "温馨提示",
                                content: "《斧头决胜》是一款在线对战游戏，需要您的用户信息登录游戏.",
                                showCancel: false,
                            });
                        }
                    });
                    button.show();
                }
            }
        });
    }



    // update (dt) {}
}
