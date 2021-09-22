var circle = '_trail{background-color:white;width:0.3rem;height:0.3rem;border-radius:50%}';
var triangle ='_trail{width:0;height:0;background-color:transparent;border-left:0.25rem solid transparent;border-right:0.25rem solid transparent;border-bottom:0.25rem solid white}';
var square = '_trail{background-color:white;width:0.3rem;height:0.3rem;border-radius:0}';
var singleT = '.anim{animation:disappear 1s ease-out forwards}@keyframes disappear{0%{opacity:1}100%{opacity:0}}';

class Trail {
  #target = "";#particle = "";#color = "";#effect = "";#isnode = "";#trails="";#styles="";#area="";#w="";#h="";
  constructor(props){
    this.#target = props.target;
    this.node = document.querySelector('.'+this.#target);
    this.#w = window.getComputedStyle(this.node).getPropertyValue('width').replace("px", "")
    this.#h = window.getComputedStyle(this.node).getPropertyValue('height').replace("px", "")
    this.#isnode = props.isnode === false ? props.isnode : true;
    this.area = props.area;
    this.#color = props.color;
    this.margin = props.margin ? props.margin : '0px';
    this.#particle = props.particle ? props.particle : 'self';
    this.tick = props.tick ? props.tick * 1000 : 5000;
    this.#styles = props.styles ? props.styles : singleT;
    this.#effect = props.effect ? props.effect : "straight";
    this.#trails = props.trails === true ? props.trails : false;
    this.#setUpStyles();
    this.#setUpParticles();
  }

  #setUpStyles(){
    this.node.style.position = 'absolute';
    this.node.style.transform = `translate(calc(-100% - ${this.margin}), calc(-100% - ${this.margin}))`;
    this.node.style.zIndex = `10000`;
    this.node.style.pointerEvents = "none";
    this.node.style.margin = "0";
  }

  #setUpParticles(){
    if(this.#particle === 'circle'){
      this.#styles += "." + this.#target + circle;
      if(this.#color){
        this.#styles += "." + this.#target + `_trail{background: ${this.#color};color:${this.#color};`
      }
    }
    else if(this.#particle === 'triangle'){
      this.#styles += "." + this.#target + triangle;
      if(this.#color){
        this.#styles += "." + this.#target + `_trail{border-bottom:0.25rem solid ${this.#color};color:${this.#color};`
      }
    }
    else if(this.#particle === 'square'){
      this.#styles += "." + this.#target + square;
      if(this.#color){
        this.#styles += "." + this.#target + `_trail{background: ${this.#color};color:${this.#color};`
      }
    }
    let stylesheet = document.createElement('style');
    stylesheet.type = 'text/css';
    stylesheet.innerHTML = this.#styles;
    document.head.appendChild(stylesheet);
  }

  followMouse(){
    document.addEventListener("mousemove",(pos) =>{
      this.node.style.left = (pos.clientX + this.#w/100*50) + 'px';
      this.node.style.top = (pos.clientY + this.#h/100*50) + 'px';
      this.#trails ? this.#createParticles() : this.#createParticle();
    })
  }

  followNode(){
    var that = this;
    setInterval(function(){
      let pos = that.node.getBoundingClientRect();
      // console.log(pos)
      that.node.style.left = (pos.left + pos.width) + 'px';
      that.node.style.top = (pos.top + pos.height) + 'px';
      that.#trails ? that.#createParticles() : that.#createParticle();
    }, 100)
  }

  activeArea(){
    let _area = document.querySelector('.'+this.area);
    _area.addEventListener('mouseover', ()=>{
      _area.addEventListener("mousemove",(pos) =>{
        this.node.style.left = (pos.clientX + this.#w/100*50) + 'px';
        this.node.style.top = (pos.clientY + this.#h/100*50) + 'px';
        this.#trails ? this.#createParticles() : this.#createParticle();
      })
    })

    _area.addEventListener('mouseout', ()=>{
      _area.removeEventListener("mousemove",()=>{})
    })
  }

  // non working function
  #trail(){
    console.log("private function")
    // setInterval(this.#createParticle(this) , this.tick);
  }

  #createParticle(){
    let randV
    if(this.#effect === "spread"){
      randV = Math.floor(Math.random()*12-6);
    }else{
      randV = 0
    }
    let fy;
    if(this.#isnode === false){
      fy = this.node.cloneNode(true);
    }
    else{
      fy = this.node.cloneNode(false);
    }
    if(this.#effect === "rotate"){
      let randA = Math.floor(Math.random()*120+30).toString()+"deg";
      fy.style.transform += `rotate(${randA})`;
    }
    if(this.#particle !== "self"){
      fy.classList.remove(this.target);
    }
    fy.classList.add("anim", `${this.#target}_trail`);
    fy.style.left = (Number(this.node.style.left.replace("px", ""))+randV)+"px";
    fy.style.top = (Number(this.node.style.top.replace("px", ""))+randV)+"px";
    if(this.#particle !== "self"){
      fy.style.left = (Number(this.node.style.left.replace("px", ""))+randV-this.#w/3)+"px";
      fy.style.top = (Number(this.node.style.top.replace("px", ""))+randV-this.#h/3)+"px";
    }
    fy.style.zIndex = "0";
    document.body.appendChild(fy);

    setTimeout(function () {
      fy.addEventListener("animationend", fy.parentNode.removeChild(fy));
    }, 1000);
  }

  #createParticles(){
    for(let i=0;i<2;i++){
      let randV = Math.floor(Math.random()*12-6);
      let fy;
      if(this.#isnode === false){
        fy = this.node.cloneNode(true);
      }
      else{
        fy = this.node.cloneNode(false);
      }
      if(this.#effect === "rotate"){
        let randA = Math.floor(Math.random()*120+30).toString()+"deg";
        fy.style.transform += `rotate(${randA})`;
      }
      if(this.#particle !== "self"){
        fy.classList.remove(this.target);
      }
      fy.classList.add("anim", `${this.#target}_trail`);
      fy.style.left = (Number(this.node.style.left.replace("px", ""))+randV)+"px";
      fy.style.top = (Number(this.node.style.top.replace("px", ""))+randV)+"px";
      if(this.#particle !== "self"){
        fy.style.left = (Number(this.node.style.left.replace("px", ""))+randV-this.#w/3)+"px";
        fy.style.top = (Number(this.node.style.top.replace("px", ""))+randV-this.#h/3)+"px";
      }
      fy.style.zIndex = "0";
      document.body.appendChild(fy);

      setTimeout(function () {
        fy.addEventListener("animationend", fy.parentNode.removeChild(fy));
      }, 1000);
    }
  }
}
