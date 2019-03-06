
      !(function(){
        var uniAppViewReadyCallback = function(){
          setCssToHead(["body { background-color: #f5f5f5; }\n.",[1],"newsList .",[1],"li { width: ",[0,630],"; padding: ",[0,30],"; overflow: hidden; background-color: #fff; margin: ",[0,30]," auto 0; border-radius: ",[0,30],"; }\n.",[1],"newsList .",[1],"li .",[1],"tit { height: ",[0,40],"; line-height: ",[0,40],"; font-size: ",[0,28],"; }\n.",[1],"newsList .",[1],"li .",[1],"tit .",[1],"spot { width: ",[0,10],"; height: ",[0,10],"; background-color: #f36501; float: left; border-radius: 50%; margin: ",[0,18]," ",[0,30]," 0 0; }\n.",[1],"newsList .",[1],"li .",[1],"describe { height: ",[0,40],"; line-height: ",[0,40],"; font-size: ",[0,24],"; color: #8b8b8b; margin: ",[0,10]," auto 0; overflow: hidden; -o-text-overflow: ellipsis; text-overflow: ellipsis; white-space: nowrap; }\n.",[1],"newsList .",[1],"li .",[1],"time { height: ",[0,40],"; line-height: ",[0,40],"; font-size: ",[0,24],"; color: #8b8b8b; margin: ",[0,10]," auto 0; text-align: right; }\n",],undefined,{path:"./pages/news/home/home.wxss"})();
document.dispatchEvent(new CustomEvent("generateFuncReady", { detail: { generateFunc: $gwx('./pages/news/home/home.wxml') } }));
        }
        if(window.__uniAppViewReady__){
          uniAppViewReadyCallback()
        }else{
          document.addEventListener('uniAppViewReady',uniAppViewReadyCallback)
        }
      })();
      