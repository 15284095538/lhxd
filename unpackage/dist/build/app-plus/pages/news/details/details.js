
      !(function(){
        var uniAppViewReadyCallback = function(){
          setCssToHead(["body { background-color: #F5F5F5; }\n.",[1],"vHtml { padding: ",[0,30],"; font-size: ",[0,28],"; line-height: ",[0,60],"; text-indent: ",[0,20],"; }\n",],undefined,{path:"./pages/news/details/details.wxss"})();
document.dispatchEvent(new CustomEvent("generateFuncReady", { detail: { generateFunc: $gwx('./pages/news/details/details.wxml') } }));
        }
        if(window.__uniAppViewReady__){
          uniAppViewReadyCallback()
        }else{
          document.addEventListener('uniAppViewReady',uniAppViewReadyCallback)
        }
      })();
      