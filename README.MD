![logo](docs/img/sprites.js.png)


JavaScript lightweight and simple in usage library that helps animating canvas sprites. What makes sprite.js so special is ability to controll frame rate without using `setTimeout()` or `setInterval()`. Visit [Demo page](https://wisniewski94.github.io/sprites.js/).

## Getting Started
### 1. Download
You can fork or download the plugin from GitHub, or you can install it through npm or bower.

```
$ npm install sprites.js 
```

```
$ bower install sprites.js
```

### 2. Insert required files
In the page's footer, just before `</body>`, include Javascript files:
```html
<script src="sprites.min.js"></script>
<script src="custom.js"></script>
```
### 3. Create the HTML markup
Inside page's body place canvas with custom id. Ex.:

```
<div>
    <canvas id="my-sprite"></canvas>
</div>
```

## Usage
Inside your custom .js file create new object which will represent your sprite:

```javascript
var example = new Sprite({
    src: 'img/papuga.png',
    id: 'my-sprite',
    width: 160,
    height: 156,
    image_width: 1280,
    err: true
});
```
Some properties are optionall. **Below you can find a table with all available properties and methods. **

After object is created you can render it:

```javascript
example.render(1);
```
Or play animation loop:
```javascript
example.loop();
```

To see more examples please visit [demo page.](https://wisniewski94.github.io/sprites.js/)

## Browser Support
Sprite.js is based on HTML5 Canvas API and requestAnimationFrame which are partially/not supported in Opera Mini Browsers at the moment. These functionalities are the core of this library and cannot be replaced in order to work with older browsers or Opera Mini.

![Browser Support](https://s9.postimg.org/wul7k2nov/support.png)

## Options
These options can be used only on sprite initialization:
|property|default|optional|type|description|
|---|---|---|---|---|
|src|undefined|no|string|Path to image|
|id|undefined|no|string|Selects canvas tag which is going to be used for animation|
|width|undefined|no|number|Single frame width|
|height|undefined|no|number|Single frame height|
|image_width|src width|yes|number|You can use this option to crop or extend image on right side. Keep in mind that this property is used to calculate amount of frames.|
|err|false|yes|boolean|Errors will print in developers tools console|

## Methods
```javascript
// In order to skip parameter type null or undefined. Instead of specific parameter default value will be used.

/**
 * Loop sprite
 * @param {number} fps -> recommended fps < 60. Default 60.
 * @param {string} direction -> "backward". Default null.
 * @param {number} n -> amount of loops. By default set to 0 which equals infinity.
 */
this.loop(fps, direction, n);

/**
 * Play animation. You can set range of animation, fps, and number of passes (loop).
 * @param {number} fps -> Default 60.
 * @param {number} from -> Animation start frame. If higher than "to" parameter then it will be played backwards.
 * Default 1.
 * @param {number} to -> End frame. Default is last frame.
 * @param {number} n -> amount of passes. If 0 then play indefinitely. Default 1.
 */
this.play(fps, from, to, n);

/**
 * Return current frame.
 * @return {number} -> frameIndex.
 */
this.frame();

/**
 * Pause animation.
 */
this.pause();

/**
 * Reset animation and optionally jump to specific frame.
 * @param {number} to -> Default 1.
 */
this.reset(to);
```

## Contribute
This plugin is made by community for community. If you want to help develop this project you can do it by:

[Report a bug](https://github.com/wisniewski94/sprites.js/issues)
[Ask for a feature](https://github.com/wisniewski94/sprites.js/issues)
[Submit a pull request](https://github.com/wisniewski94/sprites.js/pulls)

### Donate
<a href='https://pledgie.com/campaigns/34691'><img alt='Click here to lend your support to: Open Source Projects - wisniewski94 and make a donation at pledgie.com !' src='https://pledgie.com/campaigns/34691.png?skin_name=chrome' border='0' ></a>

If you find this project useful you can also consider buying me a small coffee ;)
