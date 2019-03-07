const pinus = window["pinus"]; 
export default class pinusUtil {

    static init(host: string, port: string, hascallback: boolean, route?: string, body?: any, callback?: Function) {
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

}