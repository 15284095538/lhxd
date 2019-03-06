
      !(function(){
        var uniAppViewReadyCallback = function(){
          setCssToHead(["body { background-color: #f5f5f5; }\n::-webkit-scrollbar { width: 0; height: 0; color: transparent; }\n.",[1],"menu { width: ",[0,170],"; float: left; }\n.",[1],"menu .",[1],"li { width: ",[0,170],"; height: ",[0,100],"; text-align: center; line-height: ",[0,100],"; font-size: ",[0,26],"; background-color: #fff; }\n.",[1],"menu .",[1],"li.",[1],"active { color: #ff792a; border-left: ",[0,1]," solid #ff792a; }\n.",[1],"container { float: right; width: ",[0,560],"; margin-left: ",[0,20],"; overflow: hidden; }\n.",[1],"container .",[1],"ul { overflow: hidden; background-color: #fff; }\n.",[1],"container .",[1],"li { float: left; width: ",[0,186],"; text-align: center; font-size: ",[0,28],"; padding: ",[0,25]," 0; }\n.",[1],"container .",[1],"li .",[1],"text { overflow: hidden; -o-text-overflow: ellipsis; text-overflow: ellipsis; white-space: nowrap; width: ",[0,150],"; margin: 0 auto; }\n.",[1],"container .",[1],"li .",[1],"img { width: ",[0,186],"; height: ",[0,120],"; }\n.",[1],"container .",[1],"li .",[1],"img wx-image { width: ",[0,125],"; height: ",[0,85],"; display: block; margin: ",[0,17.5]," auto 0; }\n",],"Some selectors are not allowed in component wxss, including tag name selectors, ID selectors, and attribute selectors.(./pages/classification/home/home.wxss:4:1)",{path:"./pages/classification/home/home.wxss"})();
document.dispatchEvent(new CustomEvent("generateFuncReady", { detail: { generateFunc: $gwx('./pages/classification/home/home.wxml') } }));
        }
        if(window.__uniAppViewReady__){
          uniAppViewReadyCallback()
        }else{
          document.addEventListener('uniAppViewReady',uniAppViewReadyCallback)
        }
      })();
      