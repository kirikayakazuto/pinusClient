class GSceneUtil {
    public static readonly Instance = new GSceneUtil();

    constructor() {

    }

    public loadSceneNormal(sceneName: string, cb?: Function) {
        cc.director.loadScene(sceneName, cb);
    }
    public loadSceneWithProgress(sceneName: string, cb?: Function) {
        this.doLoadSceneWithProgress(sceneName, cb);
    }


    private setLoadingDisplay() {
        if (cc.sys.isNative) {
            return;
        }
        // Loading splash scene
        let splash = document.getElementById('splash');
        let progressBar = splash.querySelector('.progress-bar span');
        (cc.loader as any).onProgress = function (completedCount, totalCount, item) {
            let percent = 100 * completedCount / totalCount;
            if (progressBar) {
                (progressBar as any).style.width = percent.toFixed(2) + '%';
            }
        };
        splash.style.display = 'block';
        (progressBar as any).style.width = '0%';

        cc.director.once(cc.Director.EVENT_AFTER_SCENE_LAUNCH, function () {
            splash.style.display = 'none';
        });
    }

    private doLoadSceneWithProgress(scene: string, cb?: Function) {
        this.setLoadingDisplay();
        cc.director.preloadScene(scene, () => {
            setTimeout(() => {                      // 为什么要等1s
                cc.director.loadScene(scene, cb);
            }, 1000);
        });
    }

    public setResolutionPolicy() {
        let f = function () {
            if (cc.sys.isMobile) {
                cc.log('手机场景适配');
                cc.view.setDesignResolutionSize(720, 1280, cc.ResolutionPolicy.FIXED_WIDTH);
                cc.Canvas.instance['alignWithScreen']();
            } else {
                cc.log('电脑场景适配');
                cc.view.setDesignResolutionSize(720, 1280, cc.ResolutionPolicy.SHOW_ALL);
                cc.Canvas.instance['alignWithScreen']();
            }
        }
        f();
        cc.director.on(cc.Director.EVENT_BEFORE_SCENE_LOADING, f);
    }
}

export default GSceneUtil.Instance;