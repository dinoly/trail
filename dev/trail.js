var circle = '.trail{background-color:white;width:0.3rem;height:0.3rem;border-radius:50%}';
var triangle ='.trail{width:0;height:0;border-left:0.2rem solid transparent;border-right:0.2rem solid transparent;border-bottom:0.2rem solid white}';
var square = '.trail{background-color:white;width:0.3rem;height:0.3rem;border-radius:0}';
var singleT = '.anim{animation:disappear 1s ease-out forwards}@keyframes disappear{0%{opacity:1}100%{opacity:0}}';

class Trail {
  constructor(props){
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
    this.setUpStyles();
    this.setUpParticles();
  }

  setUpStyles(){
    this.node.style.position = 'absolute';
    this.node.style.transform = `translate(calc(-50% - ${this.margin}), calc(-50% - ${this.margin}))`;
    this.node.style.zIndex = `10000`;
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
    if(this.color){
      this.styles += `.trail{background: ${this.color};color:${this.color}border-color:${this.color}};`
    }
    let stylesheet = document.createElement('style');
    stylesheet.type = 'text/css';
    stylesheet.innerHTML = this.styles;
    document.head.appendChild(stylesheet);
  }

  followMouse(){
    document.addEventListener("mousemove",(pos) =>{
      this.node.style.left = pos.clientX + 'px';
      this.node.style.top = pos.clientY + 'px';
      this.trails ? this.createParticles() : this.createParticle();
    })
  }

  followNode(){
    var that = this;
    var w = Number(window.getComputedStyle(this.node).getPropertyValue('width').replace("px", ""));
    var h = Number(window.getComputedStyle(this.node).getPropertyValue('height').replace("px", ""));
    setInterval(function(){
      let pos = that.node.getBoundingClientRect();
      that.node.style.left = (pos.left + w/2) + 'px';
      that.node.style.top = (pos.top + h/2) + 'px';
      that.trails ? that.createParticles() : that.createParticle();
    }, 100)
  }

  // non working function
  trail(){
    setInterval(this.createParticle(this) , this.tick);
  }

  createParticle(){
    let randV
    if(this.effect === "spread"){
      randV = Math.floor(Math.random()*6-6);
    }else{
      randV = 0
    }
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
    fy.style.left = (Number(this.node.style.left.replace("px", ""))+randV)+"px";
    fy.style.top = (Number(this.node.style.top.replace("px", ""))+randV)+"px";
    fy.style.zIndex = "0";
    document.body.appendChild(fy);

    setTimeout(function () {
      fy.addEventListener("animationend", fy.parentNode.removeChild(fy));
    }, 1000);
  }
  
  createParticles(){
    for(let i=0;i<2;i++){
      let randV = Math.floor(Math.random()*6-6);
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
      fy.style.left = (Number(this.node.style.left.replace("px", ""))+randV)+"px";
      fy.style.top = (Number(this.node.style.top.replace("px", ""))+randV)+"px";
      fy.style.zIndex = "0";
      document.body.appendChild(fy);

      setTimeout(function () {
        fy.addEventListener("animationend", fy.parentNode.removeChild(fy));
      }, 1000);
    }
  }
}