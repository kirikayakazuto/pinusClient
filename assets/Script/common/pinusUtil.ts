const pinus = window["pinus"];
export default class pinusUtil {

    static init(host: string, port: number, hascallback: boolean, route?: string, body?: any, callback?: Function) {
        pinus.init({
            host: host,
            port: port,
            log: true
        }, () => {
            if(hascallback) {
                this.request(route, body, callback);
            }
        });
    }

    static request(route: string, body: any, callback: Function) {
        pinus.request(route, body, (data: any) => {
            console.log(route, data);
            let res = data;
            
            if(callback) {
                callback(res);
            }
        });
    }

    static on(event: string, callBack: Function) {
        console.log(event);
        pinus.on(event, callBack);
    }

    static once(event: string, callBack: Function) {
        pinus.once(event, callBack);
    }

    static off(event: string, callBack: Function) {
        pinus.off(event, callBack);
    }

}