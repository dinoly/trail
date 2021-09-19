# trail
Use to generate a trail behind an element.

```js
{
  class: "",
  isnode: "",
  
}
this.class = props.class
this.node = document.querySelector('.'+this.class);
this.isnode = props.isnode === true ? props.isnode : false;
this.color = props.color;
this.margin = props.margin ? props.margin : '0px';
this.particle = props.particle ? props.particle : 'self';
this.tick = props.tick ? props.tick * 1000 : 5000;
this.styles = props.styles ? props.styles : singleT;
this.effect = props.effect ? props.effect : "straight";
this.trails = props.trails === true ? props.trails : false;
```
