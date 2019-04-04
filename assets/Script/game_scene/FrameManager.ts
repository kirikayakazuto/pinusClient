import pinusUtil from "../common/pinusUtil";
import Action from "../common/Action";
import FrameData from "../common/FrameData";
import playerSeats from "./PlayerSeats"
import { Cmd } from "../RES";
import acc from "../utils/acc";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    @property(playerSeats)
    playerSeats: playerSeats = null;
    isRunning = false;
    stepInterval = 100;       // 帧间隔
    receiveFrameData: Array<FrameData> = []; // 收到的帧数据
    curFrameCount = 0;
    isFastRunning = false;
    runningFrameData: FrameData = null;
    restRunningSecond = 0;              // 当前帧执行速度

    // onLoad () {}

    start () {

    }

    /**
     * 开始接收帧数据
     */
    run() {
        pinusUtil.on("onFrameEvent", this.receivedFrameData.bind(this));
    }

    stop() {
        pinusUtil.off("onFrameEvent", this.receivedFrameData.bind(this));
        this.isRunning = false;
        this.receiveFrameData = [];
        this.curFrameCount = 0;
        this.isFastRunning = false;
        this.runningFrameData = null;
        this.restRunningSecond = 0;
    }
    /**
     * 收到命令
     * @param data 
     */
    receivedFrameData(data: FrameData) {
        
        this.curFrameCount = data.curFrame;
        this.receiveFrameData.push(data);
    }

    update (dt: number) {
        if(this.receiveFrameData && this.receiveFrameData.length > 0) {
            let scale = this.receiveFrameData.length;
            if(scale > 10) scale = 10;
            this.isFastRunning = scale > 1;

            let ms = acc.accMul(dt, scale);                // 步长, 帧间隔

            if(this.runningFrameData == null) {     // 当前没有帧在执行
                this.runningFrameData = this.receiveFrameData[0];
                this.restRunningSecond = acc.accDiv(this.stepInterval, 1000);
            }
            if(ms > this.restRunningSecond) {
                ms = this.restRunningSecond;
            }
            if(this.isRunning != true) {
                this.isRunning = true;
                for(let action of this.runningFrameData.actionList) {
                    this.playerSeats.dealWithFrameData(action);   
                }
            }

            this.playerSeats.frameUpdate(ms);
            
            this.restRunningSecond = acc.accSub(this.restRunningSecond, ms);
            if(this.restRunningSecond <= 0) {
                this.isRunning = false;
                this.runningFrameData = null;
                this.receiveFrameData.shift();
            }
        }
    }
}
