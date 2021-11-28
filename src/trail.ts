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
  color?: string | Map<number, string>;
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
  #target:string;node:HTMLElement;#particle:string;#color:string|Map<number, string>;#effect:string;#isnode:boolean;#trails:boolean;#styles:string;#area?:string;#bounds:DOMRect;#offset:string[];#delay:number;
  constructor(props:itrail){
    this.#target = props.target;
    this.node = document.querySelector('.'+this.#target)!;
    this.#bounds = this.node.getBoundingClientRect();
    this.#isnode = props.isnode === false ? props.isnode : true;
    this.#area = props.area;
    this.#color = props.color ? typeof(props.color) === "function"? new Map(props.color) : props.color: "";
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
      this.#styles += "." + this.#target + `_trail{background: ${this.#color};color:${this.#color};` //this.#particle !== "triangle" ? `_trail{background: ${this.#color};color:${this.#color};` : `_trail{border-color: ${this.#color};color:${this.#color};`;
    }
    else if(typeof(this.#color) === "object"){
      let grad = ""
      this.#color.forEach((value):void => {
        grad += `${value[1]}%{background-color:${value[0]}}`
      });
      this.#styles += `@keyframes grad{${grad}}`
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

  #createParticle(rand={"x": 0,"y": 0}):void{
      const randV:{"x": number, "y": number} = rand;
      if(this.#effect === "spread"){
        randV.x = Math.floor(Math.random()*12-6);
        randV.y = Math.floor(Math.random()*12-6);
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
        newP.style.left = (Number(this.node.style.left.replace("px", ""))+randV.x - this.#bounds.width/2 + 2.4)+"px";
        newP.style.top = (Number(this.node.style.top.replace("px", ""))+randV.y - this.#bounds.height/2 + 2.4)+"px";
      }
      else{
        newP.style.left = (Number(this.node.style.left.replace("px", ""))+randV.x)+"px";
        newP.style.top = (Number(this.node.style.top.replace("px", ""))+randV.y)+"px";
      }
      newP.style.zIndex = "0";
      document.body.appendChild(newP);

      setTimeout(function () {
        newP.addEventListener("animationend", newP.parentNode.removeChild(newP));
      }, 1000);
  }

  #createParticles():void{
    for(let i=0;i<2;i++){
      const randV = {"x": Math.floor(Math.random()*12-6),"y": Math.floor(Math.random()*12-6)};
      this.#createParticle(randV);
    }
  }
}


// canvas particles
interface particle{
  x:number,
  y:number,
  size:number,
  range:number,
  color:string,
  weight:number,
  ctx:CanvasRenderingContext2D
  mouse:mouse
}
// types: Paint, Web, Line, Default
class Particle{
  x:number;y:number;size:number;range:number;color:string;weight:number;ctx:CanvasRenderingContext2D;mouse:mouse;
  #srink=0.1;
  constructor(props:particle){
    this.x = props.x;
    this.y = props.y;
    this.size = props.size;
    this.range = props.range;
    this.color = props.color;
    this.weight = props.weight;
    this.ctx = props.ctx;
    this.mouse = props.mouse;
  }
  draw():void{
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  update(effect="default"):void{
    this.size -= this.#srink;
    if (this.size < 0){
      if (effect === "default"){
        this.x = this.mouse.x!;
        this.y = this.mouse.y!;
        this.size = (Math.random() * this.range) + this.range;
        this.weight = 1;
      }
      else if(effect==="paint"){
        this.x = (this.mouse.x! + ((Math.random() * 20) - 10));
        this.y = (this.mouse.y! + ((Math.random() * 20) - 10));
        this.size = (Math.random() * this.range) + this.range;
        this.weight = (Math.random() * 2) - 0.5;
      }
      else if(effect==="web"){
        this.x = (this.mouse.x! + ((Math.random() * 20) - 10));
        this.y = (this.mouse.y! + ((Math.random() * 20) - 10));
        this.size = (Math.random() * 3) + 2;
        this.weight = 1;
      }
      else if (effect==="line"){
        this.x = this.mouse.x!;
        this.y = this.mouse.y!;
        this.size = (Math.random() * 2) + 1;
        this.weight = 1;
      }
    }
  }
}


interface mouse{
  x:number | undefined;
  y:number | undefined;
}

interface ctrail{
  area: string,
  particle?: string,
  color?: string,
  effect?: string,
  size?: number
}


class CanvasTrail{
  #ctx:CanvasRenderingContext2D;canvas:HTMLCanvasElement;noOfParticles=80;particleArray:Particle[]=[];
  particle:string;color:string;effect:string;area:string;size:number;//offset:string[];delay:number;

  constructor(props:ctrail){
    this.area = props.area;
    this.canvas = <HTMLCanvasElement> document.getElementById(this.area)!;
    this.#ctx = this.canvas.getContext("2d")!;
    this.color = props.color ? props.color : "black";
    this.effect = props.effect ? props.effect : "default";
    this.particle = props.particle ? props.particle : 'self';
    // this.delay = props.delay ? props.delay : 50;
    this.particle = props.particle ? props.particle : "default";
    this.size = props.size ? props.size>0 && props.size < 10? props.size: 5 : 5;
    this.#setUpStyles();
  }

  #setUpStyles():void{
    this.canvas.style.position = 'absolute';
    // this.canvas.style.transform = `translate(calc(-100% + ${this.offset[0]}), calc(-100% - ${this.offset[1]}))`;
    this.canvas.style.zIndex = `-100`;
    this.canvas.style.pointerEvents = "none";
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  #setUpParticles(mouse:mouse):particle{
    const _particle = {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.width,
      size: 0.2, // (Math.random() * 5) + 2,
      color: this.color,
      range: this.size,
      weight: 0,
      mouse:mouse,
      ctx:this.#ctx
    }
    return _particle;
  }

  followMouse():void{
    const mouse:mouse={x:0, y:0};
    window.addEventListener("mousemove",(event)=>{
      mouse.x = event.x;
      mouse.y = event.y;
    });
    setInterval(function(){
      mouse.x = undefined;
      mouse.y = undefined;
    }, 200);

    this.animate();
    this.generateParticles(this.#setUpParticles(mouse));
  }
  generateParticles(particle:particle):void{
    this.particleArray = [];
    for(let i=0; i<this.noOfParticles; i++){
      this.particleArray.push(new Particle(particle));
    }
  }
  animate():void{
    this.#ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for(let i=0; i<this.particleArray.length; i++){
      this.particleArray[i].update(this.particle);
      this.particleArray[i].draw();
    }
    if(this.particle==="web"){
      this.#connectWeb();
    }
    else if(this.particle==="line"){
      this.#connectLine();
    }
    requestAnimationFrame(this.animate.bind(this));
  }
  #connectWeb():void{
    // let opacityValue=1;
    for(let i=0; i<this.particleArray.length; i++){
      for(let j=i; j<this.particleArray.length; j++){
        const distance = ((this.particleArray[i].x - this.particleArray[j].x) * (this.particleArray[i].x - this.particleArray[j].x)) + ((this.particleArray[i].y - this.particleArray[j].y) * (this.particleArray[i].y - this.particleArray[j].y));
        if(distance < 400){
          // opacityValue = 1 - (distance/10000);
          this.#ctx.strokeStyle = this.color;
          this.#ctx.beginPath();
          this.#ctx.lineWidth = 1;
          this.#ctx.moveTo(this.particleArray[i].x, this.particleArray[i].y);
          this.#ctx.lineTo(this.particleArray[j].x, this.particleArray[j].y);
          this.#ctx.stroke();
        }
      }
    }
  }
  #connectLine():void{
    // let opacityValue=1;
    for(let i=0; i<this.particleArray.length-1; i++){
      // const distance = ((this.particleArray[i].x - this.particleArray[i+1].x) * (this.particleArray[i].x - this.particleArray[i+1].x)) + ((this.particleArray[i].y - this.particleArray[i+1].y) * (this.particleArray[i].y - this.particleArray[i+1].y));
      // opacityValue = 1 - (distance/10000);
      this.#ctx.strokeStyle = this.color;
      this.#ctx.beginPath();
      this.#ctx.lineWidth = 1.5;
      this.#ctx.moveTo(this.particleArray[i].x, this.particleArray[i].y);
      this.#ctx.lineTo(this.particleArray[i+1].x, this.particleArray[i+1].y);
      this.#ctx.stroke();
    }
  }
}
