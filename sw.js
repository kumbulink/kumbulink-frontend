if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let o={};const f=e=>s(e,t),l={module:{uri:t},exports:o,require:f};i[t]=Promise.all(n.map((e=>l[e]||f(e)))).then((e=>(r(...e),o)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-CUm5AX6N.css",revision:null},{url:"assets/index-DcfXRkhi.js",revision:null},{url:"index.html",revision:"4a5b992363612c3c970fdf928179b4a8"},{url:"registerSW.js",revision:"ee10f52f8911b76a73c43d2ea6525b8b"},{url:"manifest.webmanifest",revision:"f5ecfa58dff918f2bb240e30075605e6"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("/Kumbulink/index.html")))}));
