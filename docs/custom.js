var parrot = new Sprite({
    src: 'img/papuga.png',
    id: 'canvas',
    width: 160,
    height: 156,
    image_width: 1280,
    err: true
});

var parrot2 = new Sprite({
    src: 'img/papuga.png',
    id: 'canvas2',
    width: 160,
    height: 156,
    image_width: 1280,
    err: true
});

var parrot3 = new Sprite({
    src: 'img/papuga.png',
    id: 'canvas3',
    width: 160,
    height: 156,
    image_width: 1280,
    err: true
});

var parrot4 = new Sprite({
    src: 'img/papuga.png',
    id: 'canvas4',
    width: 160,
    height: 156,
    image_width: 1280
});

var parrot6 = new Sprite({
    src: 'img/papuga.png',
    id: 'canvas6',
    width: 160,
    height: 156,
    image_width: 1280
});

var parrot7 = new Sprite({
    src: 'img/papuga.png',
    id: 'canvas7',
    width: 160,
    height: 156,
    image_width: 1280
});

var parrot8 = new Sprite({
    src: 'img/papuga.png',
    id: 'canvas8',
    width: 160,
    height: 156,
    image_width: 1280
});
//parrot;
parrot.loop(10);
parrot2.loop(5, "backward");
parrot3.loop(8, null, 3);
parrot8.reset(3);
parrot6.loop(15);
parrot7.loop(15, "backward");

document.getElementById('play').onclick = function() {
    parrot4.play(5, 8, 5, 3);
}


document.getElementById('loop').onclick = function() {
    parrot6.loop(15);
}

document.getElementById('pause').onclick = function() {
    parrot6.pause();
}


document.getElementById('loop2').onclick = function() {
    parrot7.loop(15, "backward");
}

document.getElementById('reset').onclick = function() {
    parrot7.reset(5);
}

document.getElementById('frame').onclick = function() {
    alert(parrot8.frame());
}