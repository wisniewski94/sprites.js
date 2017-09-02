//ERRORS
/* jshint browser: true, devel: true*/

var is_playing_err = new Error('Animation is already playing. Please stop current animation.');
var is_not_playing_err = new Error("Cannot stop this animation because it's not running");
var is_too_high = new Error('Not enough frames. Please enter lower amount in "to" parameter');
var is_too_little = new Error('Please enter higher "from" parameter');
function Sprite(opt) {
    "use strict";
    var frameIndex = 0,
        frame = -1,
        time = null,
        fps, delay, direction, raf, raf2, from, to, cnt, err, lastFrame, paused;
    var that = {};
    this.canvas = document.getElementById(opt.id);
    this.canvas.width = opt.width;
    err = opt.err;
    this.canvas.height = opt.height;
    var ctx = this.ctx = this.canvas.getContext("2d");
    var img = this.img = new Image();
    this.img.src = opt.src;
    ctx.drawImage(this.img, frameIndex * opt.width, 0, opt.width, opt.height, 0, 0, opt.width, opt.height);
    var frames = this.frames = opt.image_width ? (opt.image_width / opt.width) : console.log("err");
    var isPlaying = false;

    var anim = function (n, timestamp) {
        raf = requestAnimationFrame(anim.bind(null, n));
        if (time === null) time = timestamp;
        var current = Math.floor((timestamp - time) / delay);
        if (current > frame) {
            if (frameIndex == frames - 1) cnt++;
            frame = current;
            ctx.clearRect(0, 0, opt.width, opt.height);
            ctx.drawImage(img, frameIndex * opt.width, 0, opt.width, opt.height, 0, 0, opt.width, opt.height);
            if (direction == "backward") {
                if (frameIndex <= 0) {
                    frameIndex = frames;
                }
                frameIndex -= 1;
            } else {
                if (frameIndex >= frames - 1) {
                    frameIndex = 0;
                } else {
                    frameIndex++;
                }
            }
        }

        if (typeof n !=="undefined" && n > 0) {
            if (cnt == n && frameIndex == 1 && direction !== "backward") {
                isPlaying = false;
                paused = false;
                cancelAnimationFrame(raf);
            }
            if (cnt == n && frameIndex == frames - 1 && direction == "backward") {
                isPlaying = false;
                paused = false;
                cancelAnimationFrame(raf);
            }
        }

    }; //anim

    var play = function (t, f, l, timestamp) {
        raf2 = requestAnimationFrame(play.bind(null, t, f, l));
        if (time === null) time = timestamp;
        var current = Math.floor((timestamp - time) / delay);
        if (current > frame) {
            frame = current;
            if (cnt >= l && frameIndex == lastFrame && l !== 0) {
                cancelAnimationFrame(raf2);
                isPlaying = false;
                paused = false;
            }
            ctx.clearRect(0, 0, opt.width, opt.height);
            ctx.drawImage(img, frameIndex * opt.width, 0, opt.width, opt.height, 0, 0, opt.width, opt.height);
            if (t > f) {
                if (frameIndex >= t) {
                    frameIndex = f;
                } else {
                    frameIndex++;
                }
                lastFrame = t;
                if (frameIndex == t) cnt++;
            } else if (f > t) {
                if (frameIndex <= t) {
                    frameIndex = f;
                } else {
                    frameIndex--;
                }
                lastFrame = t;
                if (frameIndex == f) cnt++;
            }

        } //current > frame
    };

    this.loop = function (tfps, dir, n) {
        if (isPlaying && err) throw is_playing_err;
        fps = tfps;
        if (typeof tfps ==="undefined" || tfps === null) fps = 60;
        direction = dir;
        delay = 1000 / fps;
        if (typeof n !=="undefined" || n === null) cnt = 0;
        raf = requestAnimationFrame(anim.bind(null, n));
        isPlaying = true;
        return;
    };

    this.play = function (tfps, f, t, l) {
        if (isPlaying && err) throw is_playing_err;
        if (t > frames && err) throw is_too_high;
        if (f < 1 && err) throw is_too_little;
        if (paused ==="undefined" || !paused || cnt !== cnt || cnt ==="undefined") {
            if (t > f) cnt = 0;
            if (f > t) cnt = 1;
        }
        fps = tfps;
        frameIndex = f - 1;
        f--;
        t--;
        if (typeof tfps === "undefined" || tfps === null) fps = 60;
        if (typeof f === "undefined" || f === null) f = 0;
        if (typeof t === "undefined" || t === null) t = frames - 1;
        if (typeof l === "undefined" || l === null) l = 1;
        
        isPlaying = true;
        delay = 1000 / fps;
        raf2 = requestAnimationFrame(play.bind(null, t, f, l));
    };

    this.frame = function () {
        return frameIndex + 1;
    };

    this.pause = function () {
        if (!isPlaying && err) throw is_not_playing_err;
        isPlaying = false;
        paused = true;
        cancelAnimationFrame(raf);
        cancelAnimationFrame(raf2);
        frame = -1;
    };
    
    this.render = function (f) {
        f--;
        frameIndex = f;
        ctx.clearRect(0, 0, opt.width, opt.height);
        ctx.drawImage(img, f * opt.width, 0, opt.width, opt.height, 0, 0, opt.width, opt.height);
    }

    this.reset = function (to) {
        frameIndex = 0;
        cancelAnimationFrame(raf);
        cancelAnimationFrame(raf2);
        if (typeof to !=="undefined") frameIndex = to;
        frame = -1;
        isPlaying = false;
        ctx.clearRect(0, 0, opt.width, opt.height);
        ctx.drawImage(img, frameIndex * opt.width, 0, opt.width, opt.height, 0, 0, opt.width, opt.height);
    };
}
