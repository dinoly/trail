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
var _Trail_instances, _Trail_target, _Trail_particle, _Trail_color, _Trail_effect, _Trail_isnode, _Trail_trails, _Trail_styles, _Trail_area, _Trail_bounds, _Trail_offset, _Trail_delay, _Trail_setUpStyles, _Trail_setUpParticles, _Trail_createParticle, _Trail_createParticles;
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
        __classPrivateFieldSet(this, _Trail_color, props.color ? typeof (props.color) === "function" ? new Map(props.color) : props.color : "#000000", "f");
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
//# sourceMappingURL=trail.js.map