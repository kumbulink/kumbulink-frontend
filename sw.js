if(!self.define){let e,i={};const n=(n,r)=>(n=new URL(n+".js",r).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,s)=>{const f=e||("document"in self?document.currentScript.src:"")||location.href;if(i[f])return;let o={};const t=e=>n(e,f),c={module:{uri:f},exports:o,require:t};i[f]=Promise.all(r.map((e=>c[e]||t(e)))).then((e=>(s(...e),o)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-DeEAk-ZT.js",revision:null},{url:"assets/index-n_ryQ3BS.css",revision:null},{url:"index.html",revision:"f01658f61f4032d1253df4e382cf0a17"},{url:"registerSW.js",revision:"ee10f52f8911b76a73c43d2ea6525b8b"},{url:"icon/144x144.png",revision:"dcf0199cd9b3e5b92f3c0afb506c5b4e"},{url:"icon/192x192.png",revision:"fa7dbaf79df1857fb985e9c6b34b261c"},{url:"icon/48x48.png",revision:"eb863e0051fe76b2f7ff039ac6eb13a8"},{url:"icon/96x96.png",revision:"3929ae78a46a000259dd5534f34325bc"},{url:"manifest.webmanifest",revision:"9d13d4bb5bfa4302d8692f3c9710f637"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
