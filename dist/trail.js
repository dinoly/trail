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
var _Trail_instances, _Trail_target, _Trail_particle, _Trail_color, _Trail_effect, _Trail_isnode, _Trail_trails, _Trail_styles, _Trail_area, _Trail_bounds, _Trail_setUpStyles, _Trail_setUpParticles, _Trail_createParticle, _Trail_createParticles;
var circle = '_trail{background-color:white;width:0.3rem;height:0.3rem;border-radius:50%}';
var triangle = '_trail{width:0;height:0;background-color:transparent;border-left:0.25rem solid transparent;border-right:0.25rem solid transparent;border-bottom:0.25rem solid white}';
var square = '_trail{background-color:white;width:0.3rem;height:0.3rem;border-radius:0}';
var singleT = '.anim{animation:disappear 1s ease-out forwards}@keyframes disappear{0%{opacity:1}100%{opacity:0}}';
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
        __classPrivateFieldSet(this, _Trail_target, props.target, "f");
        this.node = document.querySelector('.' + __classPrivateFieldGet(this, _Trail_target, "f"));
        __classPrivateFieldSet(this, _Trail_bounds, this.node.getBoundingClientRect(), "f");
        __classPrivateFieldSet(this, _Trail_isnode, props.isnode === false ? props.isnode : true, "f");
        __classPrivateFieldSet(this, _Trail_area, props.area, "f");
        __classPrivateFieldSet(this, _Trail_color, props.color, "f");
        this.margin = props.margin ? props.margin : '0px';
        __classPrivateFieldSet(this, _Trail_particle, props.particle ? props.particle : 'self', "f");
        this.tick = props.tick ? props.tick * 1000 : 5000;
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
            __classPrivateFieldGet(this, _Trail_trails, "f") ? __classPrivateFieldGet(this, _Trail_instances, "m", _Trail_createParticles).call(this) : __classPrivateFieldGet(this, _Trail_instances, "m", _Trail_createParticle).call(this);
        });
    }
    followNode() {
        let that = this;
        setInterval(function () {
            let pos = that.node.getBoundingClientRect();
            that.node.style.left = (pos.left + __classPrivateFieldGet(that, _Trail_bounds, "f").width) + 'px';
            that.node.style.top = (pos.top + __classPrivateFieldGet(that, _Trail_bounds, "f").height) + 'px';
            __classPrivateFieldGet(that, _Trail_trails, "f") ? __classPrivateFieldGet(that, _Trail_instances, "m", _Trail_createParticles).call(that) : __classPrivateFieldGet(that, _Trail_instances, "m", _Trail_createParticle).call(that);
        }, 100);
    }
    activeArea() {
        let _area = document.querySelector('.' + __classPrivateFieldGet(this, _Trail_area, "f"));
        _area.addEventListener('mouseover', () => {
            _area.addEventListener("mousemove", (pos) => {
                this.node.style.left = (pos.clientX + __classPrivateFieldGet(this, _Trail_bounds, "f").width / 2) + 'px';
                this.node.style.top = (pos.clientY + __classPrivateFieldGet(this, _Trail_bounds, "f").height / 2) + 'px';
                __classPrivateFieldGet(this, _Trail_trails, "f") ? __classPrivateFieldGet(this, _Trail_instances, "m", _Trail_createParticles).call(this) : __classPrivateFieldGet(this, _Trail_instances, "m", _Trail_createParticle).call(this);
            });
        });
        _area.addEventListener('mouseout', () => {
            _area.removeEventListener("mousemove", () => { });
        });
    }
}
_Trail_target = new WeakMap(), _Trail_particle = new WeakMap(), _Trail_color = new WeakMap(), _Trail_effect = new WeakMap(), _Trail_isnode = new WeakMap(), _Trail_trails = new WeakMap(), _Trail_styles = new WeakMap(), _Trail_area = new WeakMap(), _Trail_bounds = new WeakMap(), _Trail_instances = new WeakSet(), _Trail_setUpStyles = function _Trail_setUpStyles() {
    this.node.style.position = 'absolute';
    this.node.style.transform = `translate(calc(-100% - ${this.margin}), calc(-100% - ${this.margin}))`;
    this.node.style.zIndex = `10000`;
    this.node.style.pointerEvents = "none";
    this.node.style.margin = "0";
}, _Trail_setUpParticles = function _Trail_setUpParticles() {
    if (__classPrivateFieldGet(this, _Trail_particle, "f") === 'circle') {
        __classPrivateFieldSet(this, _Trail_styles, __classPrivateFieldGet(this, _Trail_styles, "f") + ("." + __classPrivateFieldGet(this, _Trail_target, "f") + circle), "f");
        if (__classPrivateFieldGet(this, _Trail_color, "f")) {
            __classPrivateFieldSet(this, _Trail_styles, __classPrivateFieldGet(this, _Trail_styles, "f") + ("." + __classPrivateFieldGet(this, _Trail_target, "f") + `_trail{background: ${__classPrivateFieldGet(this, _Trail_color, "f")};color:${__classPrivateFieldGet(this, _Trail_color, "f")};`), "f");
        }
    }
    else if (__classPrivateFieldGet(this, _Trail_particle, "f") === 'triangle') {
        __classPrivateFieldSet(this, _Trail_styles, __classPrivateFieldGet(this, _Trail_styles, "f") + ("." + __classPrivateFieldGet(this, _Trail_target, "f") + triangle), "f");
        if (__classPrivateFieldGet(this, _Trail_color, "f")) {
            __classPrivateFieldSet(this, _Trail_styles, __classPrivateFieldGet(this, _Trail_styles, "f") + ("." + __classPrivateFieldGet(this, _Trail_target, "f") + `_trail{border-bottom:0.25rem solid ${__classPrivateFieldGet(this, _Trail_color, "f")};color:${__classPrivateFieldGet(this, _Trail_color, "f")};`), "f");
        }
    }
    else if (__classPrivateFieldGet(this, _Trail_particle, "f") === 'square') {
        __classPrivateFieldSet(this, _Trail_styles, __classPrivateFieldGet(this, _Trail_styles, "f") + ("." + __classPrivateFieldGet(this, _Trail_target, "f") + square), "f");
        if (__classPrivateFieldGet(this, _Trail_color, "f")) {
            __classPrivateFieldSet(this, _Trail_styles, __classPrivateFieldGet(this, _Trail_styles, "f") + ("." + __classPrivateFieldGet(this, _Trail_target, "f") + `_trail{background: ${__classPrivateFieldGet(this, _Trail_color, "f")};color:${__classPrivateFieldGet(this, _Trail_color, "f")};`), "f");
        }
    }
    let stylesheet = document.createElement('style');
    stylesheet.type = 'text/css';
    stylesheet.innerHTML = __classPrivateFieldGet(this, _Trail_styles, "f");
    document.head.appendChild(stylesheet);
}, _Trail_createParticle = function _Trail_createParticle(rand = 0) {
    let randV;
    if (__classPrivateFieldGet(this, _Trail_effect, "f") === "spread") {
        randV = Math.floor(Math.random() * 12 - 6);
    }
    else {
        randV = rand;
    }
    let fy;
    if (__classPrivateFieldGet(this, _Trail_isnode, "f") === false) {
        fy = this.node.cloneNode(true);
    }
    else {
        fy = this.node.cloneNode(false);
    }
    if (__classPrivateFieldGet(this, _Trail_effect, "f") === "rotate") {
        let randA = Math.floor(Math.random() * 120 + 30).toString() + "deg";
        fy.style.transform += `rotate(${randA})`;
    }
    if (__classPrivateFieldGet(this, _Trail_particle, "f") !== "self") {
        fy.classList.remove(__classPrivateFieldGet(this, _Trail_target, "f"));
    }
    fy.classList.add("anim", `${__classPrivateFieldGet(this, _Trail_target, "f")}_trail`);
    fy.style.left = (Number(this.node.style.left.replace("px", "")) + randV) + "px";
    fy.style.top = (Number(this.node.style.top.replace("px", "")) + randV) + "px";
    if (__classPrivateFieldGet(this, _Trail_particle, "f") !== "self") {
        fy.style.left = (Number(this.node.style.left.replace("px", "")) + randV - __classPrivateFieldGet(this, _Trail_bounds, "f").width / 3) + "px";
        fy.style.top = (Number(this.node.style.top.replace("px", "")) + randV - __classPrivateFieldGet(this, _Trail_bounds, "f").height / 3) + "px";
    }
    fy.style.zIndex = "0";
    document.body.appendChild(fy);
    setTimeout(function () {
        fy.addEventListener("animationend", fy.parentNode.removeChild(fy));
    }, 1000);
}, _Trail_createParticles = function _Trail_createParticles() {
    for (let i = 0; i < 2; i++) {
        let randV = Math.floor(Math.random() * 12 - 6);
        __classPrivateFieldGet(this, _Trail_instances, "m", _Trail_createParticle).call(this, randV);
    }
};
