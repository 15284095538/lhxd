
      !(function(){
        var uniAppViewReadyCallback = function(){
          setCssToHead(["body { background-color: #f5f5f5; }\n.",[1],"list { margin-top: ",[0,25],"; }\n.",[1],"tabbar { height: ",[0,88],"; width: 100%; background-color: #fff; }\n.",[1],"tabbar .",[1],"active { color: #ff792a; }\n.",[1],"tabbar .",[1],"li { height: ",[0,88],"; line-height: ",[0,88],"; display: inline-block; font-size: ",[0,26],"; width: ",[0,250],"; text-align: center; position: relative; }\n.",[1],"tabbar .",[1],"li .",[1],"imgOne { width: ",[0,16],"; height: ",[0,7],"; position: absolute; left: 75%; top: 50%; margin-top: ",[0,-3.5],"; }\n.",[1],"tabbar .",[1],"li .",[1],"imgTwo { width: ",[0,17],"; height: ",[0,19],"; position: absolute; left: 75%; top: 50%; margin-top: ",[0,-9.5],"; }\n.",[1],"tabbar .",[1],"li:last-child .",[1],"imgOne { left: 85%; }\n.",[1],"layerFixed { width: 100%; height: 100%; background-color: red; position: fixed; left: 0; top: ",[0,179],"; overflow: hidden; background-color: rgba(0, 0, 0, 0.5); }\n.",[1],"layerFixed .",[1],"region { background-color: #fff; padding: 0 ",[0,25]," ",[0,25],"; overflow: hidden; }\n.",[1],"layerFixed .",[1],"region .",[1],"li { height: ",[0,75],"; font-size: ",[0,26],"; line-height: ",[0,75],"; border-bottom: ",[0,1]," solid #e2e2e2; }\n.",[1],"layerFixed .",[1],"time { background-color: #fff; padding: ",[0,25],"; overflow: hidden; }\n.",[1],"layerFixed .",[1],"time .",[1],"li { display: inline-block; width: ",[0,140],"; height: ",[0,55],"; line-height: ",[0,55],"; text-align: center; font-size: ",[0,26],"; color: #ff792a; border: ",[0,1]," solid #ff792a; margin-right: ",[0,25],"; border-radius: 5px; overflow: hidden; }\n.",[1],"layerFixed .",[1],"time .",[1],"active { background-color: #ff792a; color: #fff; }\n.",[1],"fadeIn { -webkit-animation: FadeIn 0.3s; animation: FadeIn 0.3s; }\n@-webkit-keyframes FadeIn { from { opacity: 0; -webkit-transform: translateY(-100%); transform: translateY(-100%) }\nto { opacity: 1; -webkit-transform: translateY(0); transform: translateY(0) }\n}@keyframes FadeIn { from { opacity: 0; -webkit-transform: translateY(-100%); transform: translateY(-100%) }\nto { opacity: 1; -webkit-transform: translateY(0); transform: translateY(0) }\n}",],undefined,{path:"./pages/index/list/list.wxss"})();
document.dispatchEvent(new CustomEvent("generateFuncReady", { detail: { generateFunc: $gwx('./pages/index/list/list.wxml') } }));
        }
        if(window.__uniAppViewReady__){
          uniAppViewReadyCallback()
        }else{
          document.addEventListener('uniAppViewReady',uniAppViewReadyCallback)
        }
      })();
      