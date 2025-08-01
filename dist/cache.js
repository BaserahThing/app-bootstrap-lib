'use strict';Object.defineProperty(exports,'__esModule',{value:true});var i=class{constructor(e={}){this.config={cacheName:"app-bootstrap-v1",appVersion:"1.0.0",enableServiceWorker:true,loadingScreen:{theme:"gradient"},...e},this.loadingElement=null;}async init(){console.log("App Cache Manager initializing...");let e=document.getElementById("loading-screen");e?this.loadingElement=e:this.setupLoadingScreen(),await this.loadApp();}setupLoadingScreen(){let e=this.config.loadingScreen?.theme||"gradient",n=this.config.loadingScreen?.customHTML||this.getDefaultLoadingHTML(e);document.body.insertAdjacentHTML("afterbegin",n),this.loadingElement=document.getElementById("loading-screen");}getDefaultLoadingHTML(e){return `
      <div id="loading-screen" style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      z-index: 9999;
     ${e==="gradient"?"background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);":"background: #2c3e50;"}">
        <div style="
          width: 40px;
          height: 40px;
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-top: 4px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        "></div>
        <p id="loading-text">Loading Application...</p>
        <style>
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        </style>
      </div>
    `}updateLoadingText(e){let t=document.getElementById("loading-text");t&&(t.textContent=e);}async loadApp(){this.updateLoadingText("Loading application...");let e=()=>{let n=document.getElementById("root");return n&&n.children.length>0&&n.querySelector(".app, .home-page, .system-config-page, .video-player-page")?(console.log("[CacheManager] App content detected, hiding loading screen"),this.hideLoadingScreen(),true):false};if(e())return;let t=setInterval(()=>{e()&&clearInterval(t);},100);setTimeout(()=>{clearInterval(t),console.log("[CacheManager] Fallback timeout, hiding loading screen"),this.hideLoadingScreen();},3e3);}hideLoadingScreen(){this.loadingElement&&(this.loadingElement.style.opacity="0",this.loadingElement.style.transition="opacity 0.3s ease-out",setTimeout(()=>{this.loadingElement&&this.loadingElement.parentNode&&this.loadingElement.parentNode.removeChild(this.loadingElement);},300));}showError(e){this.loadingElement&&(this.loadingElement.innerHTML=`
        <div style="text-align: center;">
          <h3>Error</h3>
          <p>${e}</p>
          <button onclick="location.reload()" style="
            background: white;
            color: #667eea;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 10px;
          ">Retry</button>
        </div>
      `);}retry(){location.reload();}};function r(o){let e=new i(o);return document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{e.init();}):e.init(),e}var d=i;exports.AppCacheManager=i;exports.default=d;exports.initializeCacheManager=r;//# sourceMappingURL=cache.js.map
//# sourceMappingURL=cache.js.map