(()=>{var e={983:()=>{const e=document.querySelector("#load");e.style.height=document.documentElement.clientHeight,window.addEventListener("load",(function(){try{setTimeout((()=>{e.getAttribute("class","fadeOut")||(e.style.animation="fadeOut .6s ease-in-out forwards")}),2e3)}catch(e){}}))},985:()=>{const e=document.getElementById("adminLoginForm"),t=document.getElementById("adminIDInput"),n=document.getElementById("adminPWInput");e.addEventListener("submit",(function(o){"최지훈"!==t.value?(o.preventDefault(),document.getElementById("adminLoginCheck").innerHTML="관리자 아이디가 일치하지 않습니다."):"777"!==n.value?(o.preventDefault(),document.getElementById("adminLoginCheck").innerHTML="관리자 비밀번호가 일치하지 않습니다."):e.setAttribute("action","./src/templates/driverList.html")}))}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var d=t[o]={exports:{}};return e[o](d,d.exports,n),d.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";n(983),n(985)})()})();
//# sourceMappingURL=index.js.map