export default class Action {

    constructor() {
    }

    seatId: number = 0;             // 谁的动作
    cmd = -1;                       // 动作的类型
    data: {turn: number, speed: number} = null;               // 动作的描述

    setSeatId(seatId: number) {
        this.seatId = seatId;
    }

    setCmdAndData(cmd: number, data: any) {
        this.cmd = cmd;
        this.data = data;
    }
}