import pinusUtil from "../common/pinusUtil";
import Action from "../common/Action";
import FrameData from "../common/FrameData";
import playerSeats from "./PlayerSeats"
import { Cmd } from "../RES";

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
        this.isRunning = true;
        pinusUtil.on("onFrameEvent", (data: FrameData) => {
            this.receivedFrameData(data);
        });
    }
    stop() {
        this.isRunning = false;
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

            let ms = dt * scale;                // 步长, 帧间隔

            if(this.runningFrameData == null) {     // 当前没有帧在执行
                this.runningFrameData = this.receiveFrameData[0];
                this.restRunningSecond = this.stepInterval / 1000;
            }
            if(ms > this.restRunningSecond) {
                ms = this.restRunningSecond;
            }
            
            for(let action of this.runningFrameData.actionList) {
                this.playerSeats.dealWithFrameData(action);
                
            }

            this.playerSeats.frameUpdate(ms);

            this.restRunningSecond -= ms;
            if(this.restRunningSecond <= 0) {
                this.runningFrameData = null;
                this.receiveFrameData.shift();
            }
        }
    }
}
