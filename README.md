# Trail
[![NPM version](https://img.shields.io/npm/v/@dinoly/trail/latest?color=blue&label=&logo=npm)](https://www.npmjs.com/package/@dinoly/trail)
[![Github action](https://img.shields.io/github/workflow/status/dinoly/trail/Quality?label=CI&logo=github)](https://github.com/dinoly/trail/actions/workflows/main.yml)

[![Milestones](https://img.shields.io/github/milestones/progress/dinoly/trail/1?style=social)](https://github.com/dinoly/trail/milestone/1)

**NOTE: This is a Work In Progress project.**

Trail, Generates a trail behind an Html element.

## Content Outline
- [Introduction](#introduction)
- [Sample code](#sample-code)
- [Arguments](#arguments)
- [Methods](#methods)
- [Gifs](#gifs)
- [Bugs and Future Improvements](#bugs-and-future-improvements)

## Introduction
Place the following `<script>` near the end of your pages, right before the closing `</body>` tag.

```html
<script src="https://cdn.jsdelivr.net/npm/@dinoly/trail@0.3.1/trail.min.js" crossorigin="anonymous"></script>
```
After the above script, make a new trail object and pass in the class of the element you want to create a trail behind.
```html
<script>
  const move = new Trail({
    target: "circle"
  });
  move.followMouse();
</script>
```

## Sample code
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
  <script src="https://cdn.jsdelivr.net/npm/@dinoly/trail@0.3.1/trail.min.js" crossorigin="anonymous"></script>
  <script>
    const move = new Trail({
      target: "circle",
    });
    move.followMouse();
  </script>
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
  margin: 10px; /* will be removed */
}
```


## Arguments
```js
{
  target: None,
  area: None,
  particle: "default", // self
  color: "default", // white
  isnode: true,
  effect: "default", // straight
  trails: false
}
```

### target
Is the class of the element behind which the trail will be generated.
```js
target: "example",
```

### area
Is the class of the element inside which the trail will be generated.
```js
area: "example",
```

### particle
Shape of the particle in trail, default: `self`
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

<!-- ### margin
value of the margin that is applied on the **html node**.
```js
margin: "2px",
``` -->

### effect
The effect you want particles to have
```js
effect: "spread",
```
<details>
<summary>Effects type</summary>

  + "spread"
  + "rotate"
</details>

### trails :wrench:
If `true` will create trails with multiple particles, currently `2`.

Note: if this creates a lag, use the `effect: "spread"` which will create similar effect with one particle.
```js
trails: true
```

## Methods
### followMouse
Make the Html element follow the **Mouse Pointer** with a trail.
```js
Trail.followMouse();
```

### followNode
Does not make the Html element follow the **Mouse Pointer**, add CSS to move the element how ever you like.
```js
Trail.followNode();
```

### activeArea
make the Html element follow the **Mouse Pointer** when mouse hover a certain element, set with `area: <class-of-area>`
```js
Trail.activeArea();
```

### Gifs
![follow mouse](./followMouse.gif)

![follow node](./followNode.gif)

![active area](./activeArea.gif)

### Bugs and Future Improvements
Bugs :bug:
- Text offset.
- Offset of the trail particles.

Improvements
- Resizing the trail.
- Trail behind multiple elements with one `Trail` object.
- More Effects and Particles.
- Support for nested elements.
