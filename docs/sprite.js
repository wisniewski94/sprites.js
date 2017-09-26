'use strict';

function Sprite(opt) {
    //private settings
    var cvs     = document.getElementById(opt.id),
        x       = cvs.width = opt.width,
        y       = cvs.height = opt.height,
        ctx     = cvs.getContext('2d'),
        img     = new Image(),
        frames  = opt.image_width ? (opt.image_width / x) : (function (){throw missing}());
    
    //config
    var index   = 0,
        frame   = -1,
        time    = null,
        playing = false,
        err     = opt.err,
        playErr = new Error('Animation is already playing'),
        rangeErr= console.error(new RangeError('Parameter must be between 1 and ' + frames)),
        missing = new Error('Missing property'),
        rAF, count, paused;
    
    img.src = opt.src;
    ctx.drawImage(img, index * x, 0, x, y, 0, 0, x, y);

    this.play = function (e) {
        if (playing && err) throw playErr;
        if (e.to > frames && err) {rangeErr;return 0;};
        if (e.from < 1 && err) throw rangeErr;
        if (e.fps == null) e.fps = 60;
        if (e.from == null) e.from = 1;
        if (e.to == null) e.to = frames;
        if (e.n == null) e.n = 1;
        if (paused == null || !paused || count !== count || count == null) {
            if (e.to > e.from) count = 0;
            if (e.from > e.to) count = 1;
        }
        var delay = 1000 / e.fps;
        index = e.from - 1;
        e.from--;
        e.to--;
        playing = true;
        rAF = requestAnimationFrame(play.bind(null, e.from, e.to, e.n, delay, e.step, e.loop));
    }
    
    this.pause = function () {
        if (!playing && err) throw playErr;
        cancelAnimationFrame(rAF);
        playing = false;
        paused = true;
        frame = -1;
    };
    
    this.reset = function (to) {
        if (to == null) to = 0;
        cancelAnimationFrame(rAF);
        playing = false;
        frame = -1;
        index = to - 1;
        ctx.clearRect(0, 0, x, y);
        ctx.drawImage(img, (--to) * x, 0, x, y, 0, 0, x, y);
    };
    
    this.frame = function() {
        return index + 1;
    };
    
    var play = function (from, to, n, delay, callback1, callback2, timestamp) {
        rAF = requestAnimationFrame(play.bind(null, from, to, n, delay, callback1, callback2));
        if (time === null) time = timestamp;
        var current = Math.floor((timestamp - time) / delay);
        if (current > frame) {
            frame = current;
            if (count >= n && index == to && n !== 0) {
                playing = false;
                paused = false;
            }
            ctx.clearRect(0, 0, x, y);
            ctx.drawImage(img, index * x, 0, x, y, 0, 0, x, y);
            if (to > from) {
                if (index >= to) {
                    typeof callback1 === 'function' && callback1(index + 1);
                    index = from;
                } else {
                    typeof callback1 === 'function' && callback1(index + 1);
                    index++;
                }
                if (index == to) {
                    typeof callback2 === 'function' && callback2(count);
                    count++;
                }
            } else if (from > to) {
                if (index <= to) {
                    typeof callback1 === 'function' && callback1(index + 1);                    
                    index = from;
                } else {
                    typeof callback1 === 'function' && callback1(index + 1);
                    index--;
                }
                if (index == from) {
                    typeof callback2 === 'function' && callback2(count);
                    count++;
                }
            }// else if

        } //current > frame
        
    };
}
