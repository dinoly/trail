var circle = `
.trail {
  background-color: white;
  width: .3rem;
  height: .3rem;
  border-radius: 50%;
}`
var triangle = `
.trail {
  width: 0;
  height: 0;
  background-color:transparent;
  border-left: .2rem solid transparent;
  border-right: .2rem solid transparent;
  border-bottom: .2rem solid white;
}`
var square = `
.trail {
  background-color: white;
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
