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
  offset: ['default', 'default'], // 0px
  delay: 50, // in milliseconds
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
area: "example-area",
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
### Offset
Offsets the **target and trail** from mouses origin.

```js
offset: ['-10px', '10px'], // [OFFSET X AXIS, OFFSET Y AXIS]
```

### Delay
Delays the particle.

```js
delay: 1000, // 1 sec
```

### color
Color of the trail, default: `white`
```js
color: "#ff0000", // or try "lightblue"
```
Trail can be gradient by passing **colors** as array of arrays<number, string>
```js
color: [[0,"orange"], [30,"white"], [50, "green"]],
```
**Number** represents the percentage of animation and **String** represents the color.

### isnode
Set `false` if you want a trail for a **Text** or **Svg**, default: `true`
```js
isnode: false,
```

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

### trails
If `true` will create trails with multiple particles, currently `2`.

Note: if this creates a lag, use the `effect: "spread"` which will create similar effect with one particle.
```js
trails: true
```
