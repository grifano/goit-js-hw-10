import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{i as a}from"./assets/vendor-77e16229.js";const t={form:document.querySelector(".form"),inputDelay:document.querySelector("input[name=delay]"),inputsState:document.querySelectorAll("input[name=state]")};a.settings({timeout:5e3,titleColor:"#fff",position:"topRight",messageColor:"#fff",icon:"",close:!1});t.form.addEventListener("submit",u);function u(o){o.preventDefault(),new Promise((e,r)=>{const i=t.inputDelay.value;let l;t.inputsState.forEach(c=>{c.checked&&(l=c.value)}),setTimeout(()=>{if(l==="fulfilled")e({delay:i,status:"fulfilled"});else if(l==="rejected")r({delay:i,status:"rejected"});else return},i)}).then(e=>n(e)).catch(e=>{n(e)})}function n(o){const{delay:s,status:e}=o;t.inputsState.forEach(r=>{if(r.checked)switch(e){case"fulfilled":a.success({message:`✅ Fulfilled promise in ${s}ms`,backgroundColor:"#6ED171",progressBarColor:"#00BF00"});break;case"rejected":a.error({message:`❌ Rejected promise in ${s}ms`,backgroundColor:"#F67474",progressBarColor:"#F00000"})}})}
//# sourceMappingURL=commonHelpers2.js.map