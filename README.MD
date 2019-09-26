![logo](docs/img/sprites.js.png)


JavaScript lightweight and simple in usage library that helps animating canvas sprites. What makes sprite.js so special is ability to controll frame rate without using `setTimeout()` or `setInterval()`. Visit [Demo page](https://wisniewski94.github.io/sprites.js/).

**774 bytes** gzipped. **1,56KB** minified.

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

|IE 10+|Edge 12+|Firefox 11+|
|:---:|:---:|:---:|
|Chrome 22+|Safari 6+|Opera 15+|

## Options
These options can be used only on sprite initialization:

|function|property|default|optional|type|description|
|---|---|---|---|---|---|
|new Sprite|src|undefined|no|string|Path to image|
|new Sprite|id|undefined|no|string|Selects canvas tag which is going to be used for animation|
|new Sprite|width|undefined|no|number|Single frame width|
|new Sprite|height|undefined|no|number|Single frame height|
|new Sprite|image_width|src width|yes|number|You can use this option to crop or extend image on right side. Keep in mind that this property is used to calculate amount of frames.|
|new Sprite|err|false|yes|boolean|Errors will print in developers tools console|
|.play()|from|1|yes|number|First frame of the sequence.|
|.play()|to|last frame|yes|number|Last frame of sequence.|
|.play()|fps|60|yes|number|Frames per second.|
|.play()|n|1|yes|number|Amount of loops. By default sequence is played once. If set to 0 then loop is going to be infinite.
|.play()|step|none|yes|function|Returns a number of current frame in callback.|
|.play()|loop|none|yes|function|Returns a number of current loop (fires at last frame) in callback.|
## Methods
```javascript
// In order to skip parameter type null or undefined. Instead of specific parameter default value will be used.

/**
 * Play animation. You can set range of animation, fps, and number of passes (loops). Two callbacks available in object parameter.
 * @param {object} 
 */
this.play({
//Check settings table
});

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
