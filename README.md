# trail
[![NPM version](https://img.shields.io/npm/v/@dinoly/trail?color=blue)](https://www.npmjs.com/package/@dinoly/trail)

**NOTE: This is a Work in progress project.**

Trail, Generates a trail behind an Html element.

## Content Outline
- [Introduction](#introduction)
- [Sample Example](#sample-example)
- [Arguments](#arguments)
- [Methods](#methods)

## Introduction
Place the following `<script>` near the end of your pages, right before the closing `</body>` tag.

```html
<script src="https://cdn.jsdelivr.net/npm/@dinoly/trail@0.1.1/trail.min.js" crossorigin="anonymous"></script>
```
After the above script, make a new trail object and pass in the class of the object you want to create a trail behind.
```html
<script>
  const move = new Trail({
    class: "circle"
  });
  move.followMouse();
</script>
```

## Sample example
Html
```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <title>Trail</title>
  <link rel="stylesheet" href="./styles.css" /> <!-- Link to the style sheet with circle's custom styling  -->
</head>

<body>
  <div class="circle"></div>
  <script>
    const move = new Trail({
      class: "circle",
    });
    move.followMouse();
  </script>
  <script src="https://cdn.jsdelivr.net/npm/@dinoly/trail@0.1.1/trail.min.js" crossorigin="anonymous"></script>
</body>

</html>
```
Css
```css
/* styles.css */
body {
  margin: 0;
  padding: 0;
  background: black;
  width: 100vw;
  height: 100vh;
}
* {
  cursor: none;
}
.circle {
  background-color: lightblue;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  pointer-events: none;
  margin: 10px; // will be removed
}
```


## Arguments
```js
{
  class: None,
  particle: None, // self
  color: "default", // white
  isnode: false,
  effect: "default", // straight
  trails: false
}
```

### class
pass the class of the element you want the trail.
```js
class: "example",
```

### particle
Which type of particle trail you want default: `self`
```js
particle: "circle",
```
<details>
<summary>Particles type</summary>

  + "circle"
  + "triangle"
  + "square"
</details>

### color
Color of the trail, default: `white`
```js
color: "#ff0000", // or try "lightblue"
```

### isnode
Set `false` if you want a trail for a **Text** or **Svg**, default: `true`
```js
isnode: false,
```

### margin
value of the margin that is applied on the **html node**.
```js
margin: "2px",
```

### effect
The effect you want particles to have
```js
effect: "spread",
```
<details>
<summary>Effects type</summary>

  + "spread"
</details>

## Methods
### followMouse
Make the Html element follow the **Mouse Pointer** with a trail.
```js
Trail.followMouse();
```

### followNode
Does not make the Html element follow the **Mouse Pointer**, add css to move the element how ever you like.
```js
Trail.followNode();
```
