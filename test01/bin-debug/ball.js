var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var ball = (function (_super) {
    __extends(ball, _super);
    function ball() {
        var _this = _super.call(this) || this;
        _this.i = 1;
        return _this;
    }
    ball.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    ball.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
    };
    //点击神棍，足球开始缓动
    ball.prototype.onButtonClick = function (e) {
        switch (this.i) {
            case 1:
                //开始游戏
                this.ballTween();
                this.i++;
                this.btn_start.currentState = "pause";
                break;
            case 2:
                //暂停游戏
                this.tw.setPaused(true);
                this.btn_start.currentState = "resume";
                this.i++;
                break;
            case 3:
                //继续游戏
                this.tw.setPaused(false);
                this.btn_start.currentState = "pause";
                this.i = 2;
                break;
            case 4:
                //点击神棍一下，将win图片设置为不可见
                this.win_Top.visible = false;
                this.win_Buttom.visible = false;
                //将足球图片位置居中
                this.img_ball.x = this.stage.width / 2;
                this.img_ball.y = this.stage.height / 2;
                this.i = 1;
                this.btn_start.currentState = "up";
                break;
        }
    };
    /**
     * 足球缓动
     */
    ball.prototype.ballTween = function () {
        var _this = this;
        this.random = Math.random();
        if (this.random < 0.5) {
            this.tw = egret.Tween.get(this.img_ball);
            this.tw.to({ y: 1000 }, 250).to({ y: 120 }, 500).to({ y: 1000 }, 500)
                .to({ y: 120 }, 500).to({ y: 1000 }, 500).to({ y: 120 }, 500).call(function () {
                _this.win_Buttom.visible = true;
                _this.btn_start.currentState
                    = "reset";
                _this.i = 4;
            });
        }
        else if (this.random > 0.5) {
            this.tw = egret.Tween.get(this.img_ball);
            this.tw.to({ y: 1000 }, 250).to({ y: 120 }, 500).to({ y: 1000 }, 500)
                .to({ y: 120 }, 500).to({ y: 1000 }, 500).call(function () {
                _this.win_Top.
                    visible = true;
                _this.btn_start.currentState = "reset";
                _this.i = 4;
            });
        }
    };
    return ball;
}(eui.Component));
__reflect(ball.prototype, "ball", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=ball.js.map