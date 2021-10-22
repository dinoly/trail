---
title: Arguments
type: page
keywords: trail, npm, dinoly, arguments
---
## Arguments
```js
{
  target: null,
  area: null,
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
Shape of the particle in trail, default: `self`.
```js
particle: "circle",
```
<details>
<summary>Particles type</summary>

  + "circle"
  + "triangle"
  + "square"
</details>

Additionally one can provide the particle style instead of **pre-defined types** like:
```js
particle: "height:.3rem;width:.3rem;background-color:salmon;",
```

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
