!function(e){var t=window.webpackHotUpdate;window.webpackHotUpdate=function(e,n){!function(e,t){if(!x[e]||!w[e])return;for(var n in w[e]=!1,t)Object.prototype.hasOwnProperty.call(t,n)&&(y[n]=t[n]);0==--v&&0===b&&j()}(e,n),t&&t(e,n)};var n,r=!0,o="e9302d6592d0c04fbd1e",a=1e4,i={},c=[],l=[];function s(e){var t=k[e];if(!t)return E;var r=function(r){return t.hot.active?(k[r]?-1===k[r].parents.indexOf(e)&&k[r].parents.push(e):(c=[e],n=r),-1===t.children.indexOf(r)&&t.children.push(r)):(console.warn("[HMR] unexpected require("+r+") from disposed module "+e),c=[]),E(r)},o=function(e){return{configurable:!0,enumerable:!0,get:function(){return E[e]},set:function(t){E[e]=t}}};for(var a in E)Object.prototype.hasOwnProperty.call(E,a)&&"e"!==a&&"t"!==a&&Object.defineProperty(r,a,o(a));return r.e=function(e){return"ready"===p&&f("prepare"),b++,E.e(e).then(t,function(e){throw t(),e});function t(){b--,"prepare"===p&&(g[e]||O(e),0===b&&0===v&&j())}},r.t=function(e,t){return 1&t&&(e=r(e)),E.t(e,-2&t)},r}function d(e){var t={_acceptedDependencies:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_disposeHandlers:[],_main:n!==e,active:!0,accept:function(e,n){if(void 0===e)t._selfAccepted=!0;else if("function"==typeof e)t._selfAccepted=e;else if("object"==typeof e)for(var r=0;r<e.length;r++)t._acceptedDependencies[e[r]]=n||function(){};else t._acceptedDependencies[e]=n||function(){}},decline:function(e){if(void 0===e)t._selfDeclined=!0;else if("object"==typeof e)for(var n=0;n<e.length;n++)t._declinedDependencies[e[n]]=!0;else t._declinedDependencies[e]=!0},dispose:function(e){t._disposeHandlers.push(e)},addDisposeHandler:function(e){t._disposeHandlers.push(e)},removeDisposeHandler:function(e){var n=t._disposeHandlers.indexOf(e);n>=0&&t._disposeHandlers.splice(n,1)},check:M,apply:_,status:function(e){if(!e)return p;u.push(e)},addStatusHandler:function(e){u.push(e)},removeStatusHandler:function(e){var t=u.indexOf(e);t>=0&&u.splice(t,1)},data:i[e]};return n=void 0,t}var u=[],p="idle";function f(e){p=e;for(var t=0;t<u.length;t++)u[t].call(null,e)}var h,y,m,v=0,b=0,g={},w={},x={};function D(e){return+e+""===e?+e:e}function M(e){if("idle"!==p)throw new Error("check() is only allowed in idle status");return r=e,f("check"),(t=a,t=t||1e4,new Promise(function(e,n){if("undefined"==typeof XMLHttpRequest)return n(new Error("No browser support"));try{var r=new XMLHttpRequest,a=E.p+""+o+".hot-update.json";r.open("GET",a,!0),r.timeout=t,r.send(null)}catch(e){return n(e)}r.onreadystatechange=function(){if(4===r.readyState)if(0===r.status)n(new Error("Manifest request to "+a+" timed out."));else if(404===r.status)e();else if(200!==r.status&&304!==r.status)n(new Error("Manifest request to "+a+" failed."));else{try{var t=JSON.parse(r.responseText)}catch(e){return void n(e)}e(t)}}})).then(function(e){if(!e)return f("idle"),null;w={},g={},x=e.c,m=e.h,f("prepare");var t=new Promise(function(e,t){h={resolve:e,reject:t}});y={};return O(0),"prepare"===p&&0===b&&0===v&&j(),t});var t}function O(e){x[e]?(w[e]=!0,v++,function(e){var t=document.createElement("script");t.charset="utf-8",t.src=E.p+""+e+"."+o+".hot-update.js",document.head.appendChild(t)}(e)):g[e]=!0}function j(){f("ready");var e=h;if(h=null,e)if(r)Promise.resolve().then(function(){return _(r)}).then(function(t){e.resolve(t)},function(t){e.reject(t)});else{var t=[];for(var n in y)Object.prototype.hasOwnProperty.call(y,n)&&t.push(D(n));e.resolve(t)}}function _(t){if("ready"!==p)throw new Error("apply() is only allowed in ready status");var n,r,a,l,s;function d(e){for(var t=[e],n={},r=t.slice().map(function(e){return{chain:[e],id:e}});r.length>0;){var o=r.pop(),a=o.id,i=o.chain;if((l=k[a])&&!l.hot._selfAccepted){if(l.hot._selfDeclined)return{type:"self-declined",chain:i,moduleId:a};if(l.hot._main)return{type:"unaccepted",chain:i,moduleId:a};for(var c=0;c<l.parents.length;c++){var s=l.parents[c],d=k[s];if(d){if(d.hot._declinedDependencies[a])return{type:"declined",chain:i.concat([s]),moduleId:a,parentId:s};-1===t.indexOf(s)&&(d.hot._acceptedDependencies[a]?(n[s]||(n[s]=[]),u(n[s],[a])):(delete n[s],t.push(s),r.push({chain:i.concat([s]),id:s})))}}}}return{type:"accepted",moduleId:e,outdatedModules:t,outdatedDependencies:n}}function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];-1===e.indexOf(r)&&e.push(r)}}t=t||{};var h={},v=[],b={},g=function(){console.warn("[HMR] unexpected require("+M.moduleId+") to disposed module")};for(var w in y)if(Object.prototype.hasOwnProperty.call(y,w)){var M;s=D(w);var O=!1,j=!1,_=!1,P="";switch((M=y[w]?d(s):{type:"disposed",moduleId:w}).chain&&(P="\nUpdate propagation: "+M.chain.join(" -> ")),M.type){case"self-declined":t.onDeclined&&t.onDeclined(M),t.ignoreDeclined||(O=new Error("Aborted because of self decline: "+M.moduleId+P));break;case"declined":t.onDeclined&&t.onDeclined(M),t.ignoreDeclined||(O=new Error("Aborted because of declined dependency: "+M.moduleId+" in "+M.parentId+P));break;case"unaccepted":t.onUnaccepted&&t.onUnaccepted(M),t.ignoreUnaccepted||(O=new Error("Aborted because "+s+" is not accepted"+P));break;case"accepted":t.onAccepted&&t.onAccepted(M),j=!0;break;case"disposed":t.onDisposed&&t.onDisposed(M),_=!0;break;default:throw new Error("Unexception type "+M.type)}if(O)return f("abort"),Promise.reject(O);if(j)for(s in b[s]=y[s],u(v,M.outdatedModules),M.outdatedDependencies)Object.prototype.hasOwnProperty.call(M.outdatedDependencies,s)&&(h[s]||(h[s]=[]),u(h[s],M.outdatedDependencies[s]));_&&(u(v,[M.moduleId]),b[s]=g)}var S,A=[];for(r=0;r<v.length;r++)s=v[r],k[s]&&k[s].hot._selfAccepted&&A.push({module:s,errorHandler:k[s].hot._selfAccepted});f("dispose"),Object.keys(x).forEach(function(e){!1===x[e]&&function(e){delete installedChunks[e]}(e)});for(var H,I,T=v.slice();T.length>0;)if(s=T.pop(),l=k[s]){var F={},L=l.hot._disposeHandlers;for(a=0;a<L.length;a++)(n=L[a])(F);for(i[s]=F,l.hot.active=!1,delete k[s],delete h[s],a=0;a<l.children.length;a++){var C=k[l.children[a]];C&&((S=C.parents.indexOf(s))>=0&&C.parents.splice(S,1))}}for(s in h)if(Object.prototype.hasOwnProperty.call(h,s)&&(l=k[s]))for(I=h[s],a=0;a<I.length;a++)H=I[a],(S=l.children.indexOf(H))>=0&&l.children.splice(S,1);for(s in f("apply"),o=m,b)Object.prototype.hasOwnProperty.call(b,s)&&(e[s]=b[s]);var U=null;for(s in h)if(Object.prototype.hasOwnProperty.call(h,s)&&(l=k[s])){I=h[s];var q=[];for(r=0;r<I.length;r++)if(H=I[r],n=l.hot._acceptedDependencies[H]){if(-1!==q.indexOf(n))continue;q.push(n)}for(r=0;r<q.length;r++){n=q[r];try{n(I)}catch(e){t.onErrored&&t.onErrored({type:"accept-errored",moduleId:s,dependencyId:I[r],error:e}),t.ignoreErrored||U||(U=e)}}}for(r=0;r<A.length;r++){var R=A[r];s=R.module,c=[s];try{E(s)}catch(e){if("function"==typeof R.errorHandler)try{R.errorHandler(e)}catch(n){t.onErrored&&t.onErrored({type:"self-accept-error-handler-errored",moduleId:s,error:n,originalError:e}),t.ignoreErrored||U||(U=n),U||(U=e)}else t.onErrored&&t.onErrored({type:"self-accept-errored",moduleId:s,error:e}),t.ignoreErrored||U||(U=e)}}return U?(f("fail"),Promise.reject(U)):(f("idle"),new Promise(function(e){e(v)}))}var k={};function E(t){if(k[t])return k[t].exports;var n=k[t]={i:t,l:!1,exports:{},hot:d(t),parents:(l=c,c=[],l),children:[]};return e[t].call(n.exports,n,n.exports,s(t)),n.l=!0,n.exports}E.m=e,E.c=k,E.d=function(e,t,n){E.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},E.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},E.t=function(e,t){if(1&t&&(e=E(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(E.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)E.d(n,r,function(t){return e[t]}.bind(null,r));return n},E.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return E.d(t,"a",t),t},E.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},E.p="",E.h=function(){return o},s("./src/app.js")(E.s="./src/app.js")}({"./data.json":function(e){e.exports=[["2019/1/15","在家测的",79],["2019/2/27","大兴测的",77],["2019/3/12",76.15,76],["2019/3/14",75.65,76],["2019/3/15",75.4,75.4],["2019/3/19",75.1,75],["2019/3/20",74.9,74.9],["2019/3/22",74.9,75],["2019/3/23",74.75,74.75],["2019/3/26",74.4,74.1],["2019/3/27",73.75,73.75],["2019/3/29",73.5,73.5],["2019/4/3",73.3,73.3],["2019/4/5",73.15,73.15],["2019/4/9",72.8,72.6],["2019/4/10",72.3,72.9],["2019/4/11",72.25,72.6],["2019/4/12",71.95,72.6],["2019/4/13",72.2,73.2],["2019/4/14","烧烤",72.3,72.7],["2019/4/15",72.3,72.8],["2019/4/16",72.4,72.4],["2019/4/17",72,72.1],["2019/4/18",71.7,72],["2019/4/19",71.5]]},"./src/app.css":function(e,t,n){},"./src/app.js":function(e,t,n){"use strict";n.r(t);n("./src/app.css");var r=window.echarts,o=window.jQuery,a="production",i=n("./data.json");function c(e){return"".concat(e.getFullYear(),"/").concat(e.getMonth()+1,"/").concat(e.getDate())}function l(e){var t=[];e=e.map(function(e){for(var t=e.filter(function(e){return"string"==typeof e}),n=e.filter(function(e){return"number"==typeof e});t.length<2;)t.push(void 0);for(;n.length<2;)n.push(n[n.length-1]);return[new Date(t[0]).getTime(),t[1],n[0],n[1]]});var n=null;e.forEach(function(e){if(n)for(var r=e[0],o=n[0],a=o;a<r;a+=864e5)t.push([c(new Date(a)),a,a===o?n[1]:void 0,n[2],n[3]]);n=e});var r=e.length-1;t.push([c(new Date(e[r][0])),e[r][0],e[r][1],e[r][2],e[r][3]]);var a=parseFloat(((80-e[r][2])/15*100).toFixed(1));return o("#progress-container").fadeIn(),setTimeout(function(){o("#progress").attr("aria-valuenow",a).css("width",a+"%").text(a+"%")},0),t}function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var d=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.data=this.process(t)}var t,n,o;return t=e,(n=[{key:"process",value:function(e){for(var t=[],n=0;n<e.length;++n){var o=0;o=0===(o=n===e.length-1?0:Math.min(e[n+1][3],e[n+1][4])-Math.min(e[n][3],e[n][4]))?void 0:o.toFixed(2);var a=new Date(e[n][0]).getTime();t.push([r.format.formatTime("yyyy-MM-dd",a),o]),(!this.begin||a<this.begin)&&(this.begin=a),(!this.end||a>this.end)&&(this.end=a),(!this.absDiffMax||Math.abs(o)>this.absDiffMax)&&(this.absDiffMax=Math.abs(o))}return t}},{key:"init",value:function(e){r.init(e).setOption({title:{top:30,left:"center",text:""},tooltip:{},visualMap:{show:!1,min:-this.absDiffMax,max:0,type:"piecewise",orient:"horizontal",left:"center",top:65,textStyle:{color:"#000"},inRange:{color:["#254e77","#acd5f2"]},outOfRange:{color:["red","red"]}},calendar:{top:20,left:30,right:30,cellSize:17,range:"2019",splitLine:{show:!0,lineStyle:{color:"#fff",width:2,type:"solid"}},itemStyle:{normal:{color:"#ededed",borderWidth:2,borderColor:"#fff"}},yearLabel:{show:!1}},series:{type:"heatmap",coordinateSystem:"calendar",data:this.data,tooltip:{formatter:function(e){return"".concat(e.value[0],'<br/><span class="tip-arrow glyphicon glyphicon-arrow-').concat(e.value[1]>0?"up":"down",'" aria-hidden="true"></span>').concat(Math.abs(e.value[1]),"kg")},textStyle:{fontWeight:"bold"},extraCssText:"text-align: right;"}}})}}])&&s(t.prototype,n),o&&s(t,o),e}();function u(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,o=!1,a=void 0;try{for(var i,c=e[Symbol.iterator]();!(r=(i=c.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){o=!0,a=e}finally{try{r||null==c.return||c.return()}finally{if(o)throw a}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function p(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var f=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.data0=this.splitData(t)}var t,n,o;return t=e,(n=[{key:"splitData",value:function(e){for(var t=[],n=[],r=[],o=[],a=0;a<e.length;a++){var i=u(e[a],5),c=i[0],l=i[1],s=i[2],d=i[3],p=i[4];o.push(l),n.push(c);var f=Math.max(d,p),h=Math.min(d,p);0===a?r.push([d,p,h,f]):(r.push([d,d,h,f]),r[a-1][1]=d,r[a-1][2]=Math.min(r[a-1][0],r[a-1][1],r[a-1][2],r[a-1][3]),r[a-1][3]=Math.max(r[a-1][0],r[a-1][1],r[a-1][2],r[a-1][3])),s&&t.push({name:s,coord:[c,p],value:p,itemStyle:{normal:{color:"rgb(41,60,85)"}}})}var y=r.map(function(e){return e.map(function(e){return e.toFixed(1)})});return{categoryData:n,values:r,values_fixed:y,days:o,markPoints:t}}},{key:"daily",value:function(e){return(this.data0.values[e][0]+this.data0.values[e][1])/2}},{key:"calculateDaily",value:function(){for(var e=[],t=0,n=this.data0.values.length;t<n;t++)e.push(this.daily(t).toFixed(1));return e}},{key:"calculateMA",value:function(e){for(var t=[],n=86400*(e/2).toFixed(0)*1e3,r=0,o=this.data0.values.length;r<o;r++){for(var a=this.data0.days[r],i=a-n,c=a+n,l=1,s=this.daily(r),d=r-1;d>=0&&this.data0.days[d]>i;--d)s+=this.daily(d),++l;for(var u=r+1;u<o&&this.data0.days[u]<c;++u)s+=this.daily(u),++l;t.push((s/l).toFixed(1))}return t}},{key:"init",value:function(e){r.init(e).setOption({title:{text:"",left:0},tooltip:{trigger:"axis",axisPointer:{type:"cross"}},legend:{data:["Kline","Daily","MA5","MA10"]},grid:{left:"3",right:"40",bottom:"10%",containLabel:!0},xAxis:{type:"category",data:this.data0.categoryData,scale:!0,boundaryGap:!1,axisLine:{onZero:!1},splitLine:{show:!1},splitNumber:20,min:"dataMin",max:"dataMax"},yAxis:{scale:!0,splitArea:{show:!0},axisLabel:{formatter:"{value}kg",rotate:30}},dataZoom:[{type:"inside",start:50,end:100},{show:!0,type:"slider",y:"90%",start:50,end:100}],series:[{name:"Kline",type:"candlestick",data:this.data0.values_fixed,itemStyle:{normal:{color:"#ec0000",color0:"#00da3c",borderColor:"#8A0000",borderColor0:"#008F28"}},markPoint:{label:{normal:{formatter:function(e){return e.name+"\n"+Math.round(e.value)}}},data:this.data0.markPoints.concat([{name:"Max",type:"max",valueDim:"highest"},{name:"Min",type:"min",valueDim:"lowest"},{name:"Avg",type:"average",valueDim:"close"}])},markLine:{symbol:["none","none"],data:[[{name:"from lowest to highest",type:"min",valueDim:"lowest",symbol:"circle",symbolSize:10,label:{normal:{show:!1},emphasis:{show:!1}}},{type:"max",valueDim:"highest",symbol:"circle",symbolSize:10,label:{normal:{show:!1},emphasis:{show:!1}}}],{name:"min line on close",type:"min",valueDim:"close"},{name:"max line on close",type:"max",valueDim:"close"}]}},{name:"Daily",type:"line",data:this.calculateDaily(),smooth:!0,showSymbol:!1,lineStyle:{normal:{opacity:.5}}},{name:"MA5",type:"line",data:this.calculateMA(5),smooth:!0,showSymbol:!1,lineStyle:{normal:{opacity:.5}}},{name:"MA10",type:"line",data:this.calculateMA(10),smooth:!0,showSymbol:!1,lineStyle:{normal:{opacity:.5}}}]})}}])&&p(t.prototype,n),o&&p(t,o),e}();o(function(){var e;e=function(e){new f(e).init(o("#chart")[0]),new d(e).init(o("#heat-map")[0])},"development"===a?e(l(i)):fetch("../data.json?_="+Math.random()).then(function(e){return e.json()}).then(function(t){e(l(t))})})}});