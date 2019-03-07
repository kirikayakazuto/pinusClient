
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property([cc.SpriteFrame])
    sprite_frames: Array<cc.SpriteFrame> = [];

    @property(Number)
    duration = 0.1; // 帧的时间间隔
    @property(Boolean)
    loop = false; // 是否循环播放;
    @property(Boolean)
    play_onload = false; // 是否在加载的时候就开始播放;

    // LIFE-CYCLE CALLBACKS:

    end_func = null;
    is_playing = false;
    play_time = 0;

    sprite: cc.Sprite = null;

    onLoad () {
        // 获得了精灵组件
        this.sprite = this.getComponent(cc.Sprite);
        if (!this.sprite) {
            this.sprite = this.addComponent(cc.Sprite);
        }
        // end

        if (this.play_onload) { // 如果在加载的时候开始播放
            if (this.loop) { // 循环播放
                this.play_loop();
            }
            else { // 播放一次
                this.play_once(null);
            }
        } 
    }
    start () {

    }

    play_loop() {
        if (this.sprite_frames.length <= 0) {
            return;
        }

        this.loop = true;
        this.end_func = null;

        this.is_playing = true; // 正在播放
        this.play_time = 0; // 播放的时间

        this.sprite.spriteFrame = this.sprite_frames[0];
    }
    /**
     * 不在循环播放
     */
    no_play_loop() {
        this.loop = false;
    }

    // 需要播放结束以后的回掉, end_func
    play_once(end_func) {
        if (this.sprite_frames.length <= 0) {
            return;
        }
        
        this.end_func = end_func;
        this.loop = false;
        this.is_playing = true; // 正在播放
        this.play_time = 0; // 播放的时间

        this.sprite.spriteFrame = this.sprite_frames[0];
    }

    // 停止播放动画
    no_play_anim() {
        this.is_playing = false;
    }

    

    update (dt) {
        if(!this.is_playing) {
            return;
        }

        this.play_time += dt; // 当前我们过去了这么多时间;
        var index = Math.floor(this.play_time / this.duration);

        // 非循环播放
        if (!this.loop) {
            if (index >= this.sprite_frames.length)  { // 如果超过了，播放结束
                this.is_playing = false;
                if (this.end_func) {
                    this.end_func();
                }
            }
            else {
                this.sprite.spriteFrame = this.sprite_frames[index]; // 修改当前时刻显示的正确图片;
            }
        }
        else { // 循环播放
            while(index >= this.sprite_frames.length) {
                index -= this.sprite_frames.length;
                this.play_time -= (this.sprite_frames.length * this.duration);
            }
            this.sprite.spriteFrame = this.sprite_frames[index];
        }
    }
}
