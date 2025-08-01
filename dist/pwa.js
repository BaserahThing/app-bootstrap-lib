'use strict';Object.defineProperty(exports,'__esModule',{value:true});var n=class{constructor(t={}){this.deferredPrompt=null;this.installPromptElement=null;this.config={enablePWA:true,manifest:{name:"Progressive Web App",display:"standalone",theme_color:"#000000",background_color:"#ffffff"},serviceWorker:{enabled:true,src:"/sw.js",scope:"/",updateStrategy:"all",skipWaiting:true,clientsClaim:true},installPrompt:{enabled:true,text:"Install this app for a better experience",buttonText:"Install",position:"bottom"},...t};}async init(){if(!this.config.enablePWA){console.log("PWA functionality is disabled");return}try{this.config.serviceWorker?.enabled&&await this.registerServiceWorker(),this.config.installPrompt?.enabled&&this.setupInstallPrompt(),console.log("PWA functionality initialized successfully");}catch(t){console.error("Failed to initialize PWA functionality:",t);}}async registerServiceWorker(){if(!("serviceWorker"in navigator)){console.warn("Service Worker not supported");return}try{let t=await navigator.serviceWorker.register(this.config.serviceWorker.src,{scope:this.config.serviceWorker.scope});console.log("Service Worker registered:",t),t.addEventListener("updatefound",()=>{let i=t.installing;i&&i.addEventListener("statechange",()=>{i.state==="installed"&&navigator.serviceWorker.controller&&this.showUpdatePrompt();});});}catch(t){console.error("Service Worker registration failed:",t);}}setupInstallPrompt(){window.addEventListener("beforeinstallprompt",t=>{t.preventDefault(),this.deferredPrompt=t,this.showInstallPrompt();}),window.addEventListener("appinstalled",()=>{console.log("App was installed"),this.hideInstallPrompt();});}showInstallPrompt(){if(!this.deferredPrompt||!this.config.installPrompt?.enabled)return;this.installPromptElement=document.createElement("div"),this.installPromptElement.className="pwa-install-prompt",this.installPromptElement.innerHTML=`
      <div class="pwa-install-content">
        <p>${this.config.installPrompt.text}</p>
        <button class="pwa-install-button">${this.config.installPrompt.buttonText}</button>
        <button class="pwa-install-dismiss">Dismiss</button>
      </div>
    `,this.installPromptElement.style.cssText=`
      position: fixed;
      ${this.config.installPrompt.position}: 20px;
      left: 20px;
      right: 20px;
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;let t=this.installPromptElement.querySelector(".pwa-install-button"),i=this.installPromptElement.querySelector(".pwa-install-dismiss");t?.addEventListener("click",()=>this.installApp()),i?.addEventListener("click",()=>this.hideInstallPrompt()),document.body.appendChild(this.installPromptElement);}hideInstallPrompt(){this.installPromptElement&&(this.installPromptElement.remove(),this.installPromptElement=null);}async installApp(){if(!this.deferredPrompt)return;this.deferredPrompt.prompt();let{outcome:t}=await this.deferredPrompt.userChoice;console.log(t==="accepted"?"User accepted the install prompt":"User dismissed the install prompt"),this.deferredPrompt=null,this.hideInstallPrompt();}showUpdatePrompt(){let t=document.createElement("div");t.className="pwa-update-prompt",t.innerHTML=`
      <div class="pwa-update-content">
        <p>A new version is available!</p>
        <button class="pwa-update-button">Update Now</button>
        <button class="pwa-update-dismiss">Later</button>
      </div>
    `,t.style.cssText=`
      position: fixed;
      top: 20px;
      left: 20px;
      right: 20px;
      background: #4CAF50;
      color: white;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;let i=t.querySelector(".pwa-update-button"),s=t.querySelector(".pwa-update-dismiss");i?.addEventListener("click",()=>{window.location.reload();}),s?.addEventListener("click",()=>{t.remove();}),document.body.appendChild(t);}isInstalled(){return window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===true}getStatus(){return {isInstalled:this.isInstalled(),isOnline:navigator.onLine,hasServiceWorker:"serviceWorker"in navigator}}};function o(e){let t=new n(e);return t.init(),t}function r(e){return e.manifest?{name:e.manifest.name,short_name:e.manifest.short_name||e.manifest.name,description:e.manifest.description,theme_color:e.manifest.theme_color,background_color:e.manifest.background_color,display:e.manifest.display,orientation:e.manifest.orientation,scope:e.manifest.scope||"/",start_url:e.manifest.start_url||"/",icons:e.manifest.icons||[]}:null}var a={PWAManager:n,initializePWA:o,createPWAManifest:r};exports.PWAManager=n;exports.createPWAManifest=r;exports.default=a;exports.initializePWA=o;//# sourceMappingURL=pwa.js.map
//# sourceMappingURL=pwa.js.map