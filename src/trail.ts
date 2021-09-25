/*!
  Dinoly v0.3.1 (https://www.npmjs.com/package/@dinoly/trail)
  Licensed under MIT (https://github.com/dinoly/trail/blob/main/LICENSE)
*/

const circle = "_trail{background-color:white;width:0.3rem;height:0.3rem;border-radius:50%}";
const triangle ="_trail{width:0;height:0;background-color:transparent;border-left:0.25rem solid transparent;border-right:0.25rem solid transparent;border-bottom:0.25rem solid white}";
const square = '_trail{background-color:white;width:0.3rem;height:0.3rem;border-radius:0}';
const singleT = '.anim{animation:disappear 1s ease-out forwards}@keyframes disappear{0%{opacity:1}100%{opacity:0}}';

interface itrail{
  target: string;
  particle?: string;
  color?: string;
  effect?: string;
  isnode?: boolean;
  trails?: boolean;
  styles: string;
  area?: string;
  bounds:DOMRect;
  node:HTMLElement;
  margin?: string;
  tick?: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Trail {
  #target:string;node:HTMLElement;#particle?:string;#color?:string;#effect?:string;#isnode?:boolean;#trails?:boolean;#styles:string;#area?:string;#bounds:DOMRect;margin?:string;tick?:number;
  constructor(props:itrail){
    this.#target = props.target;
    this.node = document.querySelector('.'+this.#target)!;
    this.#bounds = this.node.getBoundingClientRect();
    this.#isnode = props.isnode === false ? props.isnode : true;
    this.#area = props.area;
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
    const stylesheet = document.createElement('style');
    // stylesheet.type = 'text/css';
    stylesheet.innerHTML = this.#styles;
    document.head.appendChild(stylesheet);
  }

  followMouse(){
    document.addEventListener("mousemove",(pos) =>{
      this.node.style.left = (pos.clientX + this.#bounds.width/2) + 'px';
      this.node.style.top = (pos.clientY + this.#bounds.height/2) + 'px';
      this.#trails ? this.#createParticles() : this.#createParticle();
    })
  }

  followNode(){
    setInterval(function(this:any){
      const pos = this.node.getBoundingClientRect();
      this.node.style.left = (pos.left + this.#bounds.width) + 'px';
      this.node.style.top = (pos.top + this.#bounds.height) + 'px';
      this.#trails ? this.#createParticles() : this.#createParticle();
    }, 100)
  }

  activeArea(){
    const _area = document.querySelector('.'+this.#area)!;
      _area.addEventListener('mouseover', ()=>{
          _area.addEventListener("mousemove",((pos:MouseEvent) =>{
            this.node.style.left = (pos.clientX + this.#bounds.width/2) + 'px';
            this.node.style.top = (pos.clientY + this.#bounds.height/2) + 'px';
            this.#trails ? this.#createParticles() : this.#createParticle();
          }) as EventListener);
      })

      _area.addEventListener('mouseout', ()=>{
          _area.removeEventListener("mousemove",()=>{});
      })
  }

  #createParticle(rand=0){
    let randV:number;
    if(this.#effect === "spread"){
      randV = Math.floor(Math.random()*12-6);
    }else{
      randV = rand;
    }
    let fy:any;
    if(this.#isnode === false){
      fy = this.node.cloneNode(true);
    }
    else{
      fy = this.node.cloneNode(false);
    }
    if(this.#effect === "rotate"){
      const randA = Math.floor(Math.random()*120+30).toString()+"deg";
      fy.style.transform += `rotate(${randA})`;
    }
    if(this.#particle !== "self"){
      fy.classList.remove(this.#target);
    }
    fy.classList.add("anim", `${this.#target}_trail`);
    fy.style.left = (Number(this.node.style.left.replace("px", ""))+randV)+"px";
    fy.style.top = (Number(this.node.style.top.replace("px", ""))+randV)+"px";
    if(this.#particle !== "self"){
      fy.style.left = (Number(this.node.style.left.replace("px", ""))+randV-this.#bounds.width/3)+"px";
      fy.style.top = (Number(this.node.style.top.replace("px", ""))+randV-this.#bounds.height/3)+"px";
    }
    fy.style.zIndex = "0";
    document.body.appendChild(fy);

    setTimeout(function () {
      fy.addEventListener("animationend", fy.parentNode.removeChild(fy));
    }, 1000);
  }

  #createParticles(){
    for(let i=0;i<2;i++){
      const randV = Math.floor(Math.random()*12-6);
      this.#createParticle(randV);
    }
  }
}
