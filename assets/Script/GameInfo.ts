export default class GameInfo {

    static isConnectServer = false;

    static serverConfig = {
        chat: {
            host: "127.0.0.1",
            port: 6050,
        }
    }

    static userInfo = {
        openId: "",
        nickName: "",
        avatarUrl: "",
        gender: -1,
        chip: -1,
        exp: -1,
        city: "",
        country: "",
        province: "",
    }
}