/*!
  Dinoly v0.3.1 (https://www.npmjs.com/package/@dinoly/trail)
  Licensed under MIT (https://github.com/dinoly/trail/blob/main/LICENSE)
*/

const circle = "_trail{background-color:white;width:0.3rem;height:0.3rem;border-radius:50%}";
const triangle ="_trail{width:0;height:0;background-color:transparent;border-left:0.25rem solid transparent;border-right:0.25rem solid transparent;border-bottom:0.25rem solid white}";
const square = '_trail{background-color:white;width:0.3rem;height:0.3rem;border-radius:0}';
const singleT = '.anim{animation:disappear 1s ease-out forwards, grad 1s ease-out forwards}@keyframes disappear{0%{opacity:1}100%{opacity:0}}';

interface itrail{
  target: string;
  particle?: string;
  color?: string | string[];
  effect?: string;
  isnode?: boolean;
  trails?: boolean;
  styles: string;
  area?: string;
  bounds:DOMRect;
  node:HTMLElement;
  offset?: string[];
  delay?: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Trail {
  #target:string;node:HTMLElement;#particle:string;#color:string|string[];#effect:string;#isnode:boolean;#trails:boolean;#styles:string;#area?:string;#bounds:DOMRect;#offset:string[];#delay:number;
  constructor(props:itrail){
    this.#target = props.target;
    this.node = document.querySelector('.'+this.#target)!;
    this.#bounds = this.node.getBoundingClientRect();
    this.#isnode = props.isnode === false ? props.isnode : true;
    this.#area = props.area;
    this.#color = props.color ? props.color : "#000000";
    this.#offset = props.offset ? props.offset : ['0px', '0px'];
    this.#particle = props.particle ? props.particle : 'self';
    this.#delay = props.delay ? props.delay : 50;
    this.#styles = props.styles ? props.styles : singleT;
    this.#effect = props.effect ? props.effect : "straight";
    this.#trails = props.trails === true ? props.trails : false;
    this.#setUpStyles();
    this.#setUpParticles();
  }

  #setUpStyles():void{
    this.node.style.position = 'fixed';
    this.node.style.transform = `translate(calc(-100% + ${this.#offset[0]}), calc(-100% - ${this.#offset[1]}))`;
    this.node.style.zIndex = `10000`;
    this.node.style.pointerEvents = "none";
    this.node.style.margin = "0";
  }

  #setUpParticles():void{
    if(this.#particle === 'circle'){
      this.#styles += "." + this.#target + circle;
    }
    else if(this.#particle === 'triangle'){
      this.#styles += "." + this.#target + triangle;
    }
    else if(this.#particle === 'square'){
      this.#styles += "." + this.#target + square;
    }
    else{
      this.#styles += "." + this.#target + `_trail{${this.#particle}}`;
    }
    if(typeof(this.#color) === "string"){
      console.log("yes")
      this.#styles += "." + this.#target + `_trail{background: ${this.#color};color:${this.#color};` //this.#particle !== "triangle" ? `_trail{background: ${this.#color};color:${this.#color};` : `_trail{border-color: ${this.#color};color:${this.#color};`;
    }
    else{
      this.#styles += "." + this.#target + `_trail{background: ${this.#color};color:${this.#color};`
      let grads = this.#color.map((i:any, c:any)=>{
        let m = 100/this.#color.length;
        return i * m + `{background-color:${c}}`
      })
      this.#styles += `@keyframes grad{${grads}}`
    }

    const stylesheet = document.createElement('style');
    // stylesheet.type = 'text/css';
    stylesheet.innerHTML = this.#styles;
    document.head.appendChild(stylesheet);
  }

  followMouse():void{
    document.addEventListener("mousemove",(pos) =>{
      this.node.style.left = (pos.clientX + this.#bounds.width/2) + 'px';
      this.node.style.top = (pos.clientY + this.#bounds.height/2) + 'px';
      // this.#trails ? this.#createParticles() : this.#createParticle();
    })
    setInterval(() => {
      this.#trails ? this.#createParticles() : this.#createParticle();
    }, this.#delay)
  }

  followNode():void{
    setInterval(() => {
      const pos = this.node.getBoundingClientRect();
      this.node.style.left = (pos.left + this.#bounds.width) + 'px';
      this.node.style.top = (pos.top + this.#bounds.height) + 'px';
      this.#trails ? this.#createParticles() : this.#createParticle();
    }, this.#delay)
  }

  activeArea():void{
    const _area = document.querySelector('.'+this.#area)!;
      _area.addEventListener('mouseover', ()=>{
          _area.addEventListener("mousemove",((pos:MouseEvent) =>{
            this.node.style.left = (pos.clientX + this.#bounds.width/2) + 'px';
            this.node.style.top = (pos.clientY + this.#bounds.height/2) + 'px';
            setTimeout(() => {
            this.#trails ?  this.#createParticles() : this.#createParticle();
            }, 5000);
          }) as EventListener);
      })

      _area.addEventListener('mouseout', ()=>{
          _area.removeEventListener("mousemove",()=>{});
      })
  }

  #createParticle(rand=0):void{
    // setTimeout(() => {
      let randV:number;
      if(this.#effect === "spread"){
        randV = Math.floor(Math.random()*12-6);
      }else{
        randV = rand;
      }
      let newP:any;
      if(this.#isnode === false){
        newP = this.node.cloneNode(true);
      }
      else{
        newP = this.node.cloneNode(false);
      }
      if(this.#effect === "rotate"){
        const randA = Math.floor(Math.random()*120+30).toString()+"deg";
        newP.style.transform += `rotate(${randA})`;
      }
      if(this.#particle !== "self"){
        newP.classList.remove(this.#target);
      }
      newP.classList.add("anim", `${this.#target}_trail`);
      if(this.#particle !== "self"){
        newP.style.left = (Number(this.node.style.left.replace("px", ""))+randV - this.#bounds.width/2 + 2.4)+"px";
        newP.style.top = (Number(this.node.style.top.replace("px", ""))+randV - this.#bounds.height/2 + 2.4)+"px";
      }
      else{
        newP.style.left = (Number(this.node.style.left.replace("px", ""))+randV)+"px";
        newP.style.top = (Number(this.node.style.top.replace("px", ""))+randV)+"px";
      }
      newP.style.zIndex = "0";
      document.body.appendChild(newP);

      setTimeout(function () {
        newP.addEventListener("animationend", newP.parentNode.removeChild(newP));
      }, 1000);
    // }, 1000);
  }

  #createParticles():void{
    for(let i=0;i<2;i++){
      const randV = Math.floor(Math.random()*12-6);
      this.#createParticle(randV);
    }
  }
}
