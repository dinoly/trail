var circle = `
.trail {
  background-color: lightblue;
  width: .3rem;
  height: .3rem;
  border-radius: 50% ;
}`
var triangle = `
.trail {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid lightblue;
}`
var square = `
.trail {
  background-color: lightblue;
  width: .3rem;
  height: .3rem;
  border-radius: 0;
}`
var singleT = `
.anim {
  animation: disapere 1s ease-out forwards;
}

@keyframes disapere {
0% {
  opacity: 1;
}

100% {
  opacity: 0;
}
}`

class Trail {
  constructor(props){
    this.class = props.class
    this.node = document.querySelector('.'+this.class);
    this.isnode = props.isnode === false ? props.isnode : true;
    this.margin = props.margin ? props.margin : '0px';
    this.particle = props.particle ? props.particle : 'self';
    this.tick = props.tick ? props.tick * 1000 : 5000;
    this.styles = props.styles ? props.styles : singleT;
    this.setUpStyles();
    this.setUpParticles();
  }

  setUpStyles(){
    this.node.style.position = 'absolute';
    this.node.style.transform = `translate(calc(-50% - ${this.margin}), calc(-50% - ${this.margin}))`;
  }

  setUpParticles(){
    if(this.particle === 'circle'){
      this.styles += circle;
    }
    else if(this.particle === 'triangle'){
      this.styles += triangle;
    }
    else if(this.particle === 'square'){
      this.styles += square;
    }
    let stylesheet = document.createElement('style');
    stylesheet.type = 'text/css';
    stylesheet.innerHTML = this.styles;
    document.head.appendChild(stylesheet);
  }

  follow(){
    document.addEventListener("mousemove",(pos) =>{
      this.node.style.left = pos.clientX + 'px';
      this.node.style.top = pos.clientY + 'px';
      this.createParticle();
    })
  }

  // non working function
  trail(){
    setInterval(this.createParticle(this) , this.tick);
  }

  createParticle(){
    let fy;
    if(this.isnode === false){
      fy = this.node.cloneNode(true);
    }
    else{
      fy = this.node.cloneNode(false);
    }
    if(this.particle !== "self"){
      fy.classList.remove(this.class);
    }
    fy.classList.add("anim", "trail");
    fy.style.left = this.node.style.left;
    fy.style.top = this.node.style.top;
    document.body.appendChild(fy);

    setTimeout(function () {
      fy.addEventListener("animationend", fy.parentNode.removeChild(fy));
    }, 1000);
  }
}
