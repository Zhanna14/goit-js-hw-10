import"./assets/modulepreload-polyfill-3cfb730f.js";import"./assets/vendor-77e16229.js";function a(t,e){return new Promise((o,n)=>{setTimeout(()=>{e==="fulfilled"?o(t):n("Notification creation failed")},t)})}function c(t){console.log(`Notification created after ${t} ms`)}const r=document.querySelector(".form");r.addEventListener("submit",t=>{t.preventDefault();const e=new FormData(r),i=e.get("delay"),o=e.get("state");a(i,o).then(c).catch(n=>console.error(n))});
//# sourceMappingURL=commonHelpers2.js.map