"use strict";
/*!
  Dinoly v0.3.1 (https://www.npmjs.com/package/@dinoly/trail)
  Licensed under MIT (https://github.com/dinoly/trail/blob/main/LICENSE)
*/
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Trail_instances, _Trail_target, _Trail_particle, _Trail_color, _Trail_effect, _Trail_isnode, _Trail_trails, _Trail_styles, _Trail_area, _Trail_bounds, _Trail_offset, _Trail_delay, _Trail_setUpStyles, _Trail_setUpParticles, _Trail_createParticle, _Trail_createParticles, _Particle_srink, _CanvasTrail_instances, _CanvasTrail_ctx, _CanvasTrail_setUpStyles, _CanvasTrail_setUpParticles, _CanvasTrail_connectWeb, _CanvasTrail_connectLine;
const circle = "_trail{background-color:white;width:0.3rem;height:0.3rem;border-radius:50%}";
const triangle = "_trail{width:0;height:0;background-color:transparent;border-left:0.25rem solid transparent;border-right:0.25rem solid transparent;border-bottom:0.25rem solid white}";
const square = '_trail{background-color:white;width:0.3rem;height:0.3rem;border-radius:0}';
const singleT = '.anim{animation:disappear 1s ease-out forwards, grad 1s ease-out forwards}@keyframes disappear{0%{opacity:1}100%{opacity:0}}';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Trail {
    constructor(props) {
        _Trail_instances.add(this);
        _Trail_target.set(this, void 0);
        _Trail_particle.set(this, void 0);
        _Trail_color.set(this, void 0);
        _Trail_effect.set(this, void 0);
        _Trail_isnode.set(this, void 0);
        _Trail_trails.set(this, void 0);
        _Trail_styles.set(this, void 0);
        _Trail_area.set(this, void 0);
        _Trail_bounds.set(this, void 0);
        _Trail_offset.set(this, void 0);
        _Trail_delay.set(this, void 0);
        __classPrivateFieldSet(this, _Trail_target, props.target, "f");
        this.node = document.querySelector('.' + __classPrivateFieldGet(this, _Trail_target, "f"));
        __classPrivateFieldSet(this, _Trail_bounds, this.node.getBoundingClientRect(), "f");
        __classPrivateFieldSet(this, _Trail_isnode, props.isnode === false ? props.isnode : true, "f");
        __classPrivateFieldSet(this, _Trail_area, props.area, "f");
        __classPrivateFieldSet(this, _Trail_color, props.color ? typeof (props.color) === "function" ? new Map(props.color) : props.color : "", "f");
        __classPrivateFieldSet(this, _Trail_offset, props.offset ? props.offset : ['0px', '0px'], "f");
        __classPrivateFieldSet(this, _Trail_particle, props.particle ? props.particle : 'self', "f");
        __classPrivateFieldSet(this, _Trail_delay, props.delay ? props.delay : 50, "f");
        __classPrivateFieldSet(this, _Trail_styles, props.styles ? props.styles : singleT, "f");
        __classPrivateFieldSet(this, _Trail_effect, props.effect ? props.effect : "straight", "f");
        __classPrivateFieldSet(this, _Trail_trails, props.trails === true ? props.trails : false, "f");
        __classPrivateFieldGet(this, _Trail_instances, "m", _Trail_setUpStyles).call(this);
        __classPrivateFieldGet(this, _Trail_instances, "m", _Trail_setUpParticles).call(this);
    }
    followMouse() {
        document.addEventListener("mousemove", (pos) => {
            this.node.style.left = (pos.clientX + __classPrivateFieldGet(this, _Trail_bounds, "f").width / 2) + 'px';
            this.node.style.top = (pos.clientY + __classPrivateFieldGet(this, _Trail_bounds, "f").height / 2) + 'px';
        });
        setInterval(() => {
            __classPrivateFieldGet(this, _Trail_trails, "f") ? __classPrivateFieldGet(this, _Trail_instances, "m", _Trail_createParticles).call(this) : __classPrivateFieldGet(this, _Trail_instances, "m", _Trail_createParticle).call(this);
        }, __classPrivateFieldGet(this, _Trail_delay, "f"));
    }
    followNode() {
        setInterval(() => {
            const pos = this.node.getBoundingClientRect();
            this.node.style.left = (pos.left + __classPrivateFieldGet(this, _Trail_bounds, "f").width) + 'px';
            this.node.style.top = (pos.top + __classPrivateFieldGet(this, _Trail_bounds, "f").height) + 'px';
            __classPrivateFieldGet(this, _Trail_trails, "f") ? __classPrivateFieldGet(this, _Trail_instances, "m", _Trail_createParticles).call(this) : __classPrivateFieldGet(this, _Trail_instances, "m", _Trail_createParticle).call(this);
        }, __classPrivateFieldGet(this, _Trail_delay, "f"));
    }
    activeArea() {
        const _area = document.querySelector('.' + __classPrivateFieldGet(this, _Trail_area, "f"));
        _area.addEventListener('mouseover', () => {
            _area.addEventListener("mousemove", ((pos) => {
                this.node.style.left = (pos.clientX + __classPrivateFieldGet(this, _Trail_bounds, "f").width / 2) + 'px';
                this.node.style.top = (pos.clientY + __classPrivateFieldGet(this, _Trail_bounds, "f").height / 2) + 'px';
                setTimeout(() => {
                    __classPrivateFieldGet(this, _Trail_trails, "f") ? __classPrivateFieldGet(this, _Trail_instances, "m", _Trail_createParticles).call(this) : __classPrivateFieldGet(this, _Trail_instances, "m", _Trail_createParticle).call(this);
                }, 5000);
            }));
        });
        _area.addEventListener('mouseout', () => {
            _area.removeEventListener("mousemove", () => { });
        });
    }
}
_Trail_target = new WeakMap(), _Trail_particle = new WeakMap(), _Trail_color = new WeakMap(), _Trail_effect = new WeakMap(), _Trail_isnode = new WeakMap(), _Trail_trails = new WeakMap(), _Trail_styles = new WeakMap(), _Trail_area = new WeakMap(), _Trail_bounds = new WeakMap(), _Trail_offset = new WeakMap(), _Trail_delay = new WeakMap(), _Trail_instances = new WeakSet(), _Trail_setUpStyles = function _Trail_setUpStyles() {
    this.node.style.position = 'fixed';
    this.node.style.transform = `translate(calc(-100% + ${__classPrivateFieldGet(this, _Trail_offset, "f")[0]}), calc(-100% - ${__classPrivateFieldGet(this, _Trail_offset, "f")[1]}))`;
    this.node.style.zIndex = `10000`;
    this.node.style.pointerEvents = "none";
    this.node.style.margin = "0";
}, _Trail_setUpParticles = function _Trail_setUpParticles() {
    if (__classPrivateFieldGet(this, _Trail_particle, "f") === 'circle') {
        __classPrivateFieldSet(this, _Trail_styles, __classPrivateFieldGet(this, _Trail_styles, "f") + ("." + __classPrivateFieldGet(this, _Trail_target, "f") + circle), "f");
    }
    else if (__classPrivateFieldGet(this, _Trail_particle, "f") === 'triangle') {
        __classPrivateFieldSet(this, _Trail_styles, __classPrivateFieldGet(this, _Trail_styles, "f") + ("." + __classPrivateFieldGet(this, _Trail_target, "f") + triangle), "f");
    }
    else if (__classPrivateFieldGet(this, _Trail_particle, "f") === 'square') {
        __classPrivateFieldSet(this, _Trail_styles, __classPrivateFieldGet(this, _Trail_styles, "f") + ("." + __classPrivateFieldGet(this, _Trail_target, "f") + square), "f");
    }
    else {
        __classPrivateFieldSet(this, _Trail_styles, __classPrivateFieldGet(this, _Trail_styles, "f") + ("." + __classPrivateFieldGet(this, _Trail_target, "f") + `_trail{${__classPrivateFieldGet(this, _Trail_particle, "f")}}`), "f");
    }
    if (typeof (__classPrivateFieldGet(this, _Trail_color, "f")) === "string") {
        __classPrivateFieldSet(this, _Trail_styles, __classPrivateFieldGet(this, _Trail_styles, "f") + ("." + __classPrivateFieldGet(this, _Trail_target, "f") + `_trail{background: ${__classPrivateFieldGet(this, _Trail_color, "f")};color:${__classPrivateFieldGet(this, _Trail_color, "f")};`), "f"); //this.#particle !== "triangle" ? `_trail{background: ${this.#color};color:${this.#color};` : `_trail{border-color: ${this.#color};color:${this.#color};`;
    }
    else if (typeof (__classPrivateFieldGet(this, _Trail_color, "f")) === "object") {
        let grad = "";
        __classPrivateFieldGet(this, _Trail_color, "f").forEach((value) => {
            grad += `${value[1]}%{background-color:${value[0]}}`;
        });
        __classPrivateFieldSet(this, _Trail_styles, __classPrivateFieldGet(this, _Trail_styles, "f") + `@keyframes grad{${grad}}`, "f");
    }
    const stylesheet = document.createElement('style');
    // stylesheet.type = 'text/css';
    stylesheet.innerHTML = __classPrivateFieldGet(this, _Trail_styles, "f");
    document.head.appendChild(stylesheet);
}, _Trail_createParticle = function _Trail_createParticle(rand = { "x": 0, "y": 0 }) {
    const randV = rand;
    if (__classPrivateFieldGet(this, _Trail_effect, "f") === "spread") {
        randV.x = Math.floor(Math.random() * 12 - 6);
        randV.y = Math.floor(Math.random() * 12 - 6);
    }
    let newP;
    if (__classPrivateFieldGet(this, _Trail_isnode, "f") === false) {
        newP = this.node.cloneNode(true);
    }
    else {
        newP = this.node.cloneNode(false);
    }
    if (__classPrivateFieldGet(this, _Trail_effect, "f") === "rotate") {
        const randA = Math.floor(Math.random() * 120 + 30).toString() + "deg";
        newP.style.transform += `rotate(${randA})`;
    }
    if (__classPrivateFieldGet(this, _Trail_particle, "f") !== "self") {
        newP.classList.remove(__classPrivateFieldGet(this, _Trail_target, "f"));
    }
    newP.classList.add("anim", `${__classPrivateFieldGet(this, _Trail_target, "f")}_trail`);
    if (__classPrivateFieldGet(this, _Trail_particle, "f") !== "self") {
        newP.style.left = (Number(this.node.style.left.replace("px", "")) + randV.x - __classPrivateFieldGet(this, _Trail_bounds, "f").width / 2 + 2.4) + "px";
        newP.style.top = (Number(this.node.style.top.replace("px", "")) + randV.y - __classPrivateFieldGet(this, _Trail_bounds, "f").height / 2 + 2.4) + "px";
    }
    else {
        newP.style.left = (Number(this.node.style.left.replace("px", "")) + randV.x) + "px";
        newP.style.top = (Number(this.node.style.top.replace("px", "")) + randV.y) + "px";
    }
    newP.style.zIndex = "0";
    document.body.appendChild(newP);
    setTimeout(function () {
        newP.addEventListener("animationend", newP.parentNode.removeChild(newP));
    }, 1000);
}, _Trail_createParticles = function _Trail_createParticles() {
    for (let i = 0; i < 2; i++) {
        const randV = { "x": Math.floor(Math.random() * 12 - 6), "y": Math.floor(Math.random() * 12 - 6) };
        __classPrivateFieldGet(this, _Trail_instances, "m", _Trail_createParticle).call(this, randV);
    }
};
// types: Paint, Web, Line, Default
class Particle {
    constructor(props) {
        _Particle_srink.set(this, 0.1);
        this.x = props.x;
        this.y = props.y;
        this.size = props.size;
        this.range = props.range;
        this.color = props.color;
        this.weight = props.weight;
        this.ctx = props.ctx;
        this.mouse = props.mouse;
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
    update(effect = "default") {
        this.size -= __classPrivateFieldGet(this, _Particle_srink, "f");
        if (this.size < 0) {
            if (effect === "default") {
                this.x = this.mouse.x;
                this.y = this.mouse.y;
                this.size = (Math.random() * this.range) + this.range;
                this.weight = 1;
            }
            else if (effect === "paint") {
                this.x = (this.mouse.x + ((Math.random() * 20) - 10));
                this.y = (this.mouse.y + ((Math.random() * 20) - 10));
                this.size = (Math.random() * this.range) + this.range;
                this.weight = (Math.random() * 2) - 0.5;
            }
            else if (effect === "web") {
                this.x = (this.mouse.x + ((Math.random() * 20) - 10));
                this.y = (this.mouse.y + ((Math.random() * 20) - 10));
                this.size = (Math.random() * 3) + 2;
                this.weight = 1;
            }
            else if (effect === "line") {
                this.x = this.mouse.x;
                this.y = this.mouse.y;
                this.size = (Math.random() * 2) + 1;
                this.weight = 1;
            }
        }
    }
}
_Particle_srink = new WeakMap();
class CanvasTrail {
    constructor(props) {
        _CanvasTrail_instances.add(this);
        _CanvasTrail_ctx.set(this, void 0);
        this.noOfParticles = 80;
        this.particleArray = [];
        this.area = props.area;
        this.canvas = document.getElementById(this.area);
        __classPrivateFieldSet(this, _CanvasTrail_ctx, this.canvas.getContext("2d"), "f");
        this.color = props.color ? props.color : "black";
        this.effect = props.effect ? props.effect : "default";
        this.particle = props.particle ? props.particle : 'self';
        // this.delay = props.delay ? props.delay : 50;
        this.particle = props.particle ? props.particle : "default";
        this.size = props.size ? props.size > 0 && props.size < 10 ? props.size : 5 : 5;
        __classPrivateFieldGet(this, _CanvasTrail_instances, "m", _CanvasTrail_setUpStyles).call(this);
    }
    followMouse() {
        const mouse = { x: 0, y: 0 };
        window.addEventListener("mousemove", (event) => {
            mouse.x = event.x;
            mouse.y = event.y;
        });
        setInterval(function () {
            mouse.x = undefined;
            mouse.y = undefined;
        }, 200);
        this.animate();
        this.generateParticles(__classPrivateFieldGet(this, _CanvasTrail_instances, "m", _CanvasTrail_setUpParticles).call(this, mouse));
    }
    generateParticles(particle) {
        this.particleArray = [];
        for (let i = 0; i < this.noOfParticles; i++) {
            this.particleArray.push(new Particle(particle));
        }
    }
    animate() {
        __classPrivateFieldGet(this, _CanvasTrail_ctx, "f").clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.particleArray.length; i++) {
            this.particleArray[i].update(this.particle);
            this.particleArray[i].draw();
        }
        if (this.particle === "web") {
            __classPrivateFieldGet(this, _CanvasTrail_instances, "m", _CanvasTrail_connectWeb).call(this);
        }
        else if (this.particle === "line") {
            __classPrivateFieldGet(this, _CanvasTrail_instances, "m", _CanvasTrail_connectLine).call(this);
        }
        requestAnimationFrame(this.animate.bind(this));
    }
}
_CanvasTrail_ctx = new WeakMap(), _CanvasTrail_instances = new WeakSet(), _CanvasTrail_setUpStyles = function _CanvasTrail_setUpStyles() {
    this.canvas.style.position = 'absolute';
    // this.canvas.style.transform = `translate(calc(-100% + ${this.offset[0]}), calc(-100% - ${this.offset[1]}))`;
    this.canvas.style.zIndex = `-100`;
    this.canvas.style.pointerEvents = "none";
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
}, _CanvasTrail_setUpParticles = function _CanvasTrail_setUpParticles(mouse) {
    const _particle = {
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.width,
        size: 0.2,
        color: this.color,
        range: this.size,
        weight: 0,
        mouse: mouse,
        ctx: __classPrivateFieldGet(this, _CanvasTrail_ctx, "f")
    };
    return _particle;
}, _CanvasTrail_connectWeb = function _CanvasTrail_connectWeb() {
    // let opacityValue=1;
    for (let i = 0; i < this.particleArray.length; i++) {
        for (let j = i; j < this.particleArray.length; j++) {
            const distance = ((this.particleArray[i].x - this.particleArray[j].x) * (this.particleArray[i].x - this.particleArray[j].x)) + ((this.particleArray[i].y - this.particleArray[j].y) * (this.particleArray[i].y - this.particleArray[j].y));
            if (distance < 400) {
                // opacityValue = 1 - (distance/10000);
                __classPrivateFieldGet(this, _CanvasTrail_ctx, "f").strokeStyle = this.color;
                __classPrivateFieldGet(this, _CanvasTrail_ctx, "f").beginPath();
                __classPrivateFieldGet(this, _CanvasTrail_ctx, "f").lineWidth = 1;
                __classPrivateFieldGet(this, _CanvasTrail_ctx, "f").moveTo(this.particleArray[i].x, this.particleArray[i].y);
                __classPrivateFieldGet(this, _CanvasTrail_ctx, "f").lineTo(this.particleArray[j].x, this.particleArray[j].y);
                __classPrivateFieldGet(this, _CanvasTrail_ctx, "f").stroke();
            }
        }
    }
}, _CanvasTrail_connectLine = function _CanvasTrail_connectLine() {
    // let opacityValue=1;
    for (let i = 0; i < this.particleArray.length - 1; i++) {
        // const distance = ((this.particleArray[i].x - this.particleArray[i+1].x) * (this.particleArray[i].x - this.particleArray[i+1].x)) + ((this.particleArray[i].y - this.particleArray[i+1].y) * (this.particleArray[i].y - this.particleArray[i+1].y));
        // opacityValue = 1 - (distance/10000);
        __classPrivateFieldGet(this, _CanvasTrail_ctx, "f").strokeStyle = this.color;
        __classPrivateFieldGet(this, _CanvasTrail_ctx, "f").beginPath();
        __classPrivateFieldGet(this, _CanvasTrail_ctx, "f").lineWidth = 1.5;
        __classPrivateFieldGet(this, _CanvasTrail_ctx, "f").moveTo(this.particleArray[i].x, this.particleArray[i].y);
        __classPrivateFieldGet(this, _CanvasTrail_ctx, "f").lineTo(this.particleArray[i + 1].x, this.particleArray[i + 1].y);
        __classPrivateFieldGet(this, _CanvasTrail_ctx, "f").stroke();
    }
};
//# sourceMappingURL=trail.js.map