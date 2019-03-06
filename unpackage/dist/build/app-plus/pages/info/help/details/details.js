
      !(function(){
        var uniAppViewReadyCallback = function(){
          setCssToHead(["body { background-color: #F5F5F5; }\n.",[1],"html { padding: 0 ",[0,25],"; }\n",],undefined,{path:"./pages/info/help/details/details.wxss"})();
document.dispatchEvent(new CustomEvent("generateFuncReady", { detail: { generateFunc: $gwx('./pages/info/help/details/details.wxml') } }));
        }
        if(window.__uniAppViewReady__){
          uniAppViewReadyCallback()
        }else{
          document.addEventListener('uniAppViewReady',uniAppViewReadyCallback)
        }
      })();
      