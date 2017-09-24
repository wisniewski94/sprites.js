'use strict';

function Sprite(opt) {
    //config
    var index   = 0,
        frame   = -1,
        time    = null,
        playing = false,
        err     = opt.err,
        playErr = new Error('Animation is already playing'),
        rangeErr= new RangeError('Parameter must be between 1 and ' + frames),
        missing = new Error('Missing property'),
        rAF, rAF2, count, last, paused;
    
    //private settings
    var cvs     = document.getElementById(opt.id),
        x       = cvs.width = opt.width,
        y       = cvs.height = opt.height,
        ctx     = cvs.getContext('2d'),
        img     = new Image(),
        frames  = opt.image_width ? (opt.image_width / x) : (function (){throw missing}());
    
    img.src = opt.src;
    ctx.drawImage(img, index * x, 0, x, y, 0, 0, x, y);

    this.loop = function (fps, dir, n) {
        if (playing && err) throw playErr;
        if (fps == null) fps = 60;
        if (n !== null) count = 0;
        var delay = 1000 / fps;
        rAF = requestAnimationFrame(anim.bind(null, n, delay, dir));
        playing = true;
    };

    this.play = function (fps, from, to, n) {
        if (playing && err) throw playErr;
        if (to > frames && err) throw rangeErr;
        if (from < 1 && err) throw rangeErr;
        if (fps == null) fps = 60;
        if (from == null) from = 0;
        if (to == null) to = frames - 1;
        if (n == null) n = 1;
        if (paused == null || !paused || count !== count || count == null) {
            if (to > from) count = 0;
            if (from > to) count = 1;
        }
        var delay = 1000 / fps;
        index = from - 1;
        from--;
        to--;
        playing = true;
        rAF2 = requestAnimationFrame(play.bind(null, from, to, n, delay));
    }
    
    this.pause = function () {
        if (!playing && err) throw playErr;
        cancelAnimationFrame(rAF);
        cancelAnimationFrame(rAF2);
        playing = false;
        paused = true;
        frame = -1;
    };
    
    this.reset = function (to) {
        if (to == null) to = 0;
        cancelAnimationFrame(rAF);
        cancelAnimationFrame(rAF2);
        playing = false;
        frame = -1;
        index = to - 1;
        ctx.clearRect(0, 0, x, y);
        ctx.drawImage(img, (--to) * x, 0, x, y, 0, 0, x, y);
    };
    
    this.frame = function() {
        return index + 1;    
    };
    
    var anim = function (n, delay, dir, timestamp) {
        if (time == null) time = timestamp;
        rAF = requestAnimationFrame(anim.bind(null, n, delay, dir));
        var current = Math.floor((timestamp - time) / delay);
        if (current > frame) {
            if (index == frames - 1) count++;
            frame = current;
            ctx.clearRect(0, 0, x, y);
            ctx.drawImage(img, index * x, 0, x, y, 0, 0, x, y);
            if (dir == 'backward') {
                if (index <= 0) {
                    index = frames;
                }
                index -= 1;
            } else {
                if (index >= frames - 1) {
                    index = 0;
                } else {
                    index++;
                }
            }//if dir backward
        }//if current> frame

        if (typeof n !== null && n > 0) {
            if (count == n && index == 1 && dir !== 'backward') {
                playing = false;
                paused = false;
                cancelAnimationFrame(rAF);
            }//if
            if (count == n && index == frames - 1 && dir == 'backward') {
                playing = false;
                paused = false;
                cancelAnimationFrame(rAF);
            }//if
        }//if typeof

    };//anim
    
    var play = function (from, to, n, delay, timestamp) {
        console.log(from, to, n);
        rAF2 = requestAnimationFrame(play.bind(null, from, to, n, delay));
        if (time === null) time = timestamp;
        var current = Math.floor((timestamp - time) / delay);
        if (current > frame) {
            frame = current;
            console.log(index, last);
            if (count >= n && index == last && n !== 0) {
                cancelAnimationFrame(rAF2);
                playing = false;
                paused = false;
            }
            ctx.clearRect(0, 0, x, y);
            ctx.drawImage(img, index * x, 0, x, y, 0, 0, x, y);
            if (to > from) {
                if (index >= to) {
                    index = from;
                } else {
                    index++;
                }
                last = to;
                if (index == to) count++;
            } else if (from > to) {
                if (index <= to) {
                    index = from;
                } else {
                    index--;
                }
                last = to;
                if (index == from) count++;
            }// else if

        } //current > frame
    };
}
