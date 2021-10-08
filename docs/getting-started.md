## Getting Started
Place the following `<script>` near the end of your pages, right before the closing `</body>` tag.

```html
<script src="https://cdn.jsdelivr.net/npm/@dinoly/trail@0.3.6/trail.min.js" crossorigin="anonymous"></script>
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

### Sample code
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
  <script src="https://cdn.jsdelivr.net/npm/@dinoly/trail@0.3.6/trail.min.js" crossorigin="anonymous"></script>
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
