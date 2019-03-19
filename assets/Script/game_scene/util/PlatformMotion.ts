
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(Number)
    speed: number = 10;

    @property(Number)
    distance: number = 200;


    _movedDistance = 0;
    _direction = 1;
    _movedDiff = 0;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._movedDistance = this.distance / 2;
    }

    start () {

    }

    update (dt) {
        var d = this.speed * this._direction * dt;
        
        var movedDistance = this._movedDistance + Math.abs(d);
        this._movedDistance += Math.abs(d);
        
        if (movedDistance > this.distance) {
            d = this.distance - this._movedDistance;
            this._movedDistance = 0;
            this._direction *= -1;
        }
        else {
            this._movedDistance = movedDistance;
        }
        
        this.node.x += d;
        this._movedDiff = d;
    }
}
