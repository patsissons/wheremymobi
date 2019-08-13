(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{11:function(e,t,n){e.exports={Header:"Header_Header__1XO4R",HeaderLogo:"Header_HeaderLogo__1dLj0",HeaderContent:"Header_HeaderContent__3wHIB"}},14:function(e,t,n){e.exports={LoadingContainer:"Loader_LoadingContainer__1zHC6",Loader:"Loader_Loader__3w7V8"}},17:function(e,t,n){e.exports={Container:"App_Container__Sk-T4",Content:"App_Content__2YSLD"}},18:function(e,t,n){"use strict";(function(e){var t=n(26);n.n(t).a.config();("undefined"===typeof e?{}:e).env}).call(this,n(12))},19:function(e){e.exports={name:"wheremymobi",description:"Find mobi bikes in Vancouver, BC.",version:"1.0.0",private:!0,author:{name:"Pat Sissons",email:"patricksissons@gmail.com",url:"https://github.com/patsissons"},repository:{type:"git",url:"git+https://github.com/patsissons/wheremymobi.git"},bugs:{url:"https://github.com/patsissons/wheremymobi/issues"},homepage:"https://wheremymobi.com",keywords:["mobi","bike"],license:"MIT",dependencies:{"@google/markerclustererplus":"^2.0.0","@googlemap-react/core":"^0.1.0","@shopify/react-graphql":"^3.0.0","@shopify/react-hooks":"^1.0.0","@shopify/react-i18n":"^1.0.0","@shopify/useful-types":"^1.0.0","apollo-server-express":"^2.0.0",classnames:"^2.0.0",graphql:"^14.0.0","graphql-tag":"^2.0.0","isomorphic-fetch":"^2.0.0",moment:"^2.0.0","node-sass":"^4.0.0",react:"~16.9.0-alpha","react-dom":"~16.9.0-alpha","react-spinkit":"^3.0.0",scriptjs:"^2.0.0",typescript:"~3.5.0"},devDependencies:{"@shopify/react-testing":"^1.0.0","@types/classnames":"^2.0.0","@types/dotenv":"^6.0.0","@types/fs-extra":"^7.0.0","@types/googlemaps":"^3.0.0","@types/graphql":"^14.0.0","@types/isomorphic-fetch":"^0.0.35","@types/jest":"^24.0.0","@types/node":"^12.0.0","@types/react":"~16.8.0","@types/react-dom":"~16.8.0","@types/react-spinkit":"^3.0.0","del-cli":"^2.0.0",dotenv:"^8.0.0",eslint:"^5.0.0","eslint-plugin-shopify":"^28.0.0","eslint-stats":"^1.0.0",express:"^4.0.0","fs-extra":"^8.0.0",husky:"^2.0.0",ncp:"^2.0.0",prettier:"^1.0.0","pretty-quick":"^1.0.0","react-scripts":"^3.0.0",serve:"^11.0.0"},resolutions:{"eslint-plugin-import":"2.17.2"},scripts:{start:"react-scripts start",build:"react-scripts build",test:"react-scripts test",eject:"react-scripts eject",clean:"del build docs .cache",deploy:"yarn clean && yarn build && ncp build docs",lint:"yarn lint:ts","lint:stats":"yarn lint:ts --format node_modules/eslint-stats/byError.js","lint:ts":"eslint . --ext .ts --ext .tsx --max-warnings 0 --format codeframe",pretty:"prettier --write '**/*.{css,scss,js,json,md,ts,tsx,yml}'",server:"serve -s build",validate:"tsc --noEmit"},engines:{node:">=11.0.0"},eslintConfig:{extends:["plugin:shopify/react","plugin:shopify/typescript","plugin:shopify/jest","plugin:shopify/prettier"],settings:{react:{version:"16.9"}},rules:{"eslint-comments/no-unlimited-disable":"off","no-empty-pattern":"off","no-redeclare":"off","no-restricted-globals":"off","shopify/images-no-direct-imports":"off","shopify/strict-component-boundaries":"off"},overrides:[{parserOptions:{project:"./tsconfig.json"},files:["*.ts","*.tsx"]}]},eslintIgnore:["/.cache","/build","/docs","/public"],husky:{hooks:{"pre-commit":"pretty-quick --staged"}},browserslist:{production:[">0.2%","not dead","not op_mini all"],development:["last 1 chrome version","last 1 firefox version","last 1 safari version"]}}},20:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAb1BMVEUAAAD//////////////////v724uL+/f3////99/f//////////////////////////v7//v7////////////67e3////NXFz////gmprnr6/swsLQZmbvzMz56+vy19fahYXXe3vjpKTTcXHy1tYWZQtuAAAAF3RSTlMAEKBg0PL+0yD8j0DPUMBw4uGwgDD9bxWtl28AAAFSSURBVEjHpdTrjoMgEIZhUKBqteddPhTUHu7/Gne72aQUikPT9/+TiRMcFsfLpsVfbVNyRlcVEphc/5ubAFlUBOAN4IzV/1njgGZxUifhrvqpq8O+S4tvqFlHzQplShRQVr/IKhQpMehEA46vROmL2HSxWEPpdFbJKtquHK1e6Fy3ITli1otdwrVVctJE4z7c1pUiJhgjnSYb2+d1GZr08JfWwNLkjK1HNkpnNG48ApdDJumTPof0eAieS7i3sEseWX8yJf9bPDLkkMEnYspasvDIoc4hdeGREjMt5qenXKF/91kyMdLkSwTnxbz7i7EdOWbcRVfM0EOCVvV5+SgJFnaSyi6evhOL6nBLkxvW7EXbpTO+JU5/LArGCEOIwNAiNpSITXgG+rugjPGFuQuqDYwvDoyOC5iHEJxlmljQJhC0WcHcxSoQlAkFbepI0CYpfgA+aX5ABt3FBwAAAABJRU5ErkJggg=="},21:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAbFBMVEUAAAD////////////////+9e3////97+L/+/j//v3///7////////////////////97+P//////v7//v7////////////////0pGD////5x5z60rH73cT1qmr86Nj74873u4j2tX75zKb2sHQRU6flAAAAGHRSTlMA0RCgYP0g/vzz8Z+PQHBQ/sDi4bCAXzBKHBbEAAABTElEQVRIx6XU626DMAyG4QTGmULPzRcIoe393+OmaZJDIdjS3v+PDFYStS65txq/6faeKL68qYHJDz/5CaibnAFJC3jrzF/OeqDdndTX8G+z6O1x6eOiw3E2q+YjvmKiQeHMRq5AExOjiTTitiW+SGyZfi0OKEw8d6zy1XbrzJmdnqX+JDfMZrfX59ryajJM2WVJUrw5Yj/GVN6wZXq5LsuTAeHSWjiePNEF5FQYQdkpIPASMtUhGSRkAIlESpJgYS8ZOfxnivxfKIwSMoZETxIy6YBcSwkp08UlnnkxL45yjkF4LCmdiQ8/fZkVXjHqnLFDzgtAY/ghlC6fskeJelSFiwtXVA+1qscUJxMOaqNu7xnv1GYpxphIlWIMIxhDgjW8IPNaioFE3NhQWBLxTrChuCq+RMOS0IkSGxJSQ0JuSMgNCakpSYhNVHwD4ZOC/xT12P4AAAAASUVORK5CYII="},22:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAclBMVEUAAAD////////////////9/v3p9+/////9/v3+//7////1+/jd8ub////////////////2+/j9/v79/v7///////////////88s3H///+G0Ke24sqe2bhIuHrP7NzD59Pb8eVtxpVhwYyS1bBVvYOq3sHWwgC0AAAAGHRSTlMAEKDQYNP9IPPxQPz8j3BQwPzi4bCAMJDZnGXvAAABVUlEQVRIx6XV2W6DMBCFYYwJSwhp9voYbANJ3/8Vu6jSmMV4qv73n0aMsJ0sE1kj8ZNsMpHEK9IKsK77ylmgSosIEA3gtFG/Ge2AZnPSWwX3UpNeDte3sDjiMKhFwwFZSKTojVrJ9EhDolWBWtzXREZizax8zx69CmcOZbHYbpUbtdF4lnNyx6A2e87XVpRWRcqv8229YkTPxpRORcvldF06Tjr4S3uHiZMRR4+cesUoP3kEjkNs5ZOOQzqQEFwivIU9eWT/nyn8b6HQckjrE2lZS5YeudUcck4nh3iIiwGZRwrO939gcpZlzvz5qQyaecSoSx4dclncYpo5hNrV45YYa5nMe5S92bz6HisPBWyYWOxXn4qta/z4x6u/pccibkjwDYm4iQsyz6noSISN9oUmEe4E7YtbEk9IaBJSJGxDgmtIMM0O+lvsSLAMCa6pSbBNUHwCmd6DeH76KRIAAAAASUVORK5CYII="},23:function(e,t){e.exports="data:image/png;base64,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"},27:function(e,t,n){e.exports={CustomButton:"CustomButton_CustomButton__2nL-I"}},32:function(e,t,n){e.exports=n(65)},4:function(e,t,n){e.exports={MapContainer:"StationMap_MapContainer__2mxHY",ButtonImage:"StationMap_ButtonImage__1ypMu"}},64:function(e,t,n){},65:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(5),i=n.n(o),c=n(2),s=n(25),l=n.n(s),u=n(14),f=n.n(u),p=["double-bounce","chasing-dots","circle","cube-grid"];function m(e){var t=e.name,n=void 0===t?p[Math.floor(Math.random()*p.length)]:t;return n?a.a.createElement("div",{className:f.a.LoadingContainer},a.a.createElement(l.a,{className:f.a.Loader,name:n})):null}n(18);var g=n(19),d=n(11),v=n.n(d);function b(){return a.a.createElement("div",{className:v.a.Header},a.a.createElement("div",{className:v.a.HeaderLogo},a.a.createElement("a",{href:"https://www.mobibikes.ca/en#the-map"},a.a.createElement("img",{alt:"logo",src:"https://www.mobibikes.ca/sites/all/themes/smoove_bootstrap/logo.png"}))),a.a.createElement("div",{className:v.a.HeaderContent},a.a.createElement("h1",null,g.description)))}var h=n(1),O={maps:{}};function A(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];if(window.google)return window.google;if(e)return O;throw new Error("google.maps API has not yet loaded")}function y(){return[A(),A]}var E=n(31),j=n(13),w=n.n(j),S=n(27),C=n.n(S);function k(e){var t=e.className,n=Object(E.a)(e,["className"]);return a.a.createElement("button",Object.assign({className:w()(C.a.CustomButton,t),type:"button"},n))}function x(e){var t=e.bindingPosition,n=void 0===t?"RIGHT_TOP":t,a=e.children,o=e.onMounted,s=void 0===o?M:o,l=Object(r.useContext)(c.c).state,u=Object(r.useState)(!1),f=Object(h.a)(u,2),p=f[0],m=f[1],g=Object(r.useState)(document.createElement("div")),d=Object(h.a)(g,1)[0],v=y(),b=Object(h.a)(v,1)[0];return Object(r.useLayoutEffect)(function(){l&&l.map&&!p&&(l.map.controls[b.maps.ControlPosition[n]].push(d),s(d),m(!0))},[n,d,b.maps.ControlPosition,p,s,l,l.map]),"undefined"===typeof document?null:i.a.createPortal(a,d)}function M(e){e.style.margin="10px 10px 23px"}function B(e){var t=e.color,n=void 0===t?"magenta":t,r=e.coords,o=(e.timestamp,y()),i=Object(h.a)(o,1)[0],s=r.accuracy,l=r.heading,u={lat:r.latitude,lng:r.longitude};return a.a.createElement(a.a.Fragment,null,a.a.createElement(c.b,{opts:{center:u,radius:s,fillColor:n,strokeColor:n,fillOpacity:.25,strokeWeight:1}}),a.a.createElement(c.g,{opts:{icon:{anchor:new i.maps.Point(0,2.6),path:i.maps.SymbolPath.FORWARD_CLOSED_ARROW,strokeColor:n,fillColor:n,fillOpacity:1,rotation:l||0,scale:10,strokeWeight:1},position:u,zIndex:i.maps.Marker.MAX_ZINDEX}}))}function R(e){var t=e.fetchedAt,n=e.station;return a.a.createElement("ul",null,a.a.createElement("li",null,"[".concat(n.number.toString().padStart(4,"0"),"] ").concat(n.name).concat(n.operative?"":" (CLOSED)")),a.a.createElement("li",null,"".concat(n.bikes," bikes / ").concat(n.free," slots (").concat(n.total," total)")),a.a.createElement("li",null,a.a.createElement("a",{rel:"noopener noreferrer",target:"_blank",href:"https://www.google.com/maps/dir/?api=".concat(1,"&travelmode=bicycling&destination=",n.lat,",").concat(n.lng)},"".concat(n.lat,", ").concat(n.lng))),a.a.createElement("li",null,"Last Updated: ".concat(t.fromNow())))}var I=n(20),P=n.n(I),N=n(21),L=n.n(N),H=n(22),z=n.n(H),D=n(23),T=n.n(D);function V(e){var t=e.bikes,n=e.free,o=e.number,i=e.onClick,s=e.lat,l=e.lng,u=e.preferBikes,f=e.showLabel,p=e.total,m=Object(r.useState)(),g=Object(h.a)(m,2),d=g[0],v=g[1];return Object(r.useEffect)(function(){v(function(e,t,n,r,a,o,i){var c=A();return{icon:{url:F(a?e:t,i),size:new c.maps.Size(50,50),labelOrigin:new c.maps.Point(25,21)},label:o?{color:"white",text:"".concat(e," | ").concat(t),fontSize:"0.75rem",fontWeight:"bold"}:void 0,position:{lat:n,lng:r}}}(t,n,s,l,u,f,p))},[t,n,s,l,u,f,p]),a.a.createElement(c.g,{key:o,id:"station-".concat(o),onClick:i,opts:d})}function F(e,t){if(e<=0)return T.a;var n=e/t;return n>=.5?z.a:n>=.25?L.a:P.a}var q=n(6),Y=n(28),U=n.n(Y),W={averageCenter:!0,gridSize:90,maxZoom:17,enableRetinaIcons:!1};function X(){return(X=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function Q(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var Z=a.a.createElement("path",{d:"M408,132.6c25.5,0,45.9-20.4,45.9-45.9S433.5,40.8,408,40.8s-45.9,20.4-45.9,45.9S382.5,132.6,408,132.6z M484.5,316.2 c-71.4,0-127.5,56.1-127.5,127.5s56.1,127.5,127.5,127.5S612,515.101,612,443.7S555.9,316.2,484.5,316.2z M484.5,532.95 c-48.45,0-89.25-40.801-89.25-89.25c0-48.451,40.8-89.25,89.25-89.25s89.25,40.799,89.25,89.25 C573.75,492.149,532.95,532.95,484.5,532.95z M377.4,265.2h107.1v-45.9h-81.6l-48.45-84.15c-7.65-12.75-20.4-20.4-38.25-20.4 c-12.75,0-22.95,5.1-30.6,12.75l-94.35,94.35c-7.65,7.65-12.75,17.85-12.75,30.6c0,15.3,7.65,30.6,20.4,38.25l86.7,51v127.5h45.9 V303.45l-56.1-43.35l58.65-58.65L377.4,265.2z M127.5,316.2C56.1,316.2,0,372.3,0,443.7s56.1,127.5,127.5,127.5 S255,515.101,255,443.7S198.9,316.2,127.5,316.2z M127.5,532.95c-48.45,0-89.25-40.801-89.25-89.25 c0-48.451,40.8-89.25,89.25-89.25s89.25,40.799,89.25,89.25C216.75,492.149,175.95,532.95,127.5,532.95z"}),G=function(e){var t=e.svgRef,n=Q(e,["svgRef"]);return a.a.createElement("svg",X({viewBox:"0 0 612 612",ref:t},n),Z)},J=a.a.forwardRef(function(e,t){return a.a.createElement(G,X({svgRef:t},e))});n.p;function K(){return(K=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function _(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var $=a.a.createElement("path",{fill:"#637381",d:"M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0m0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m4-9H6a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2"}),ee=function(e){var t=e.svgRef,n=_(e,["svgRef"]);return a.a.createElement("svg",K({viewBox:"0 0 20 20",ref:t},n),$)},te=a.a.forwardRef(function(e,t){return a.a.createElement(ee,K({svgRef:t},e))});n.p;function ne(){return(ne=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function re(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var ae=a.a.createElement("path",{d:"M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z",fill:"#637381"}),oe=a.a.createElement("path",{d:"M8.996 8.996V7.008c.001-.043 0-.054.004-.097.044-.449.423-.845.879-.9.094-.011.115-.007.145-.007.043.002.054.002.097.007.448.054.834.442.879.9.004.043.003.054.004.097v1.988h1.992c.016 0 .032 0 .048.001.49.035.918.441.954.93.039.545-.424 1.063-1.002 1.077h-1.992V13c-.01.411-.272.797-.648.939-.584.221-1.327-.217-1.359-.891-.001-.016-.001-.032-.001-.048v-1.996H7.004c-.511-.012-.966-.435-1.002-.931-.038-.53.396-1.049.954-1.076.016-.001.032-.001.048-.001h1.992z",fill:"#637381"}),ie=function(e){var t=e.svgRef,n=re(e,["svgRef"]);return a.a.createElement("svg",ne({viewBox:"0 0 20 20",ref:t},n),ae,oe)},ce=a.a.forwardRef(function(e,t){return a.a.createElement(ie,ne({svgRef:t},e))});n.p;function se(){return(se=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function le(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var ue=a.a.createElement("path",{d:"M280.5,178.5c-56.1,0-102,45.9-102,102c0,56.1,45.9,102,102,102c56.1,0,102-45.9,102-102     C382.5,224.4,336.6,178.5,280.5,178.5z M507.45,255C494.7,147.9,410.55,63.75,306,53.55V0h-51v53.55     C147.9,63.75,63.75,147.9,53.55,255H0v51h53.55C66.3,413.1,150.45,497.25,255,507.45V561h51v-53.55     C413.1,494.7,497.25,410.55,507.45,306H561v-51H507.45z M280.5,459C181.05,459,102,379.95,102,280.5S181.05,102,280.5,102     S459,181.05,459,280.5S379.95,459,280.5,459z"}),fe=function(e){var t=e.svgRef,n=le(e,["svgRef"]);return a.a.createElement("svg",se({viewBox:"0 0 561 561",ref:t},n),ue)},pe=a.a.forwardRef(function(e,t){return a.a.createElement(fe,se({svgRef:t},e))});n.p;function me(){return(me=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function ge(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var de=a.a.createElement("path",{d:"M55.89,262.818c-3-26-0.5-51.1,6.3-74.3c22.6-77.1,93.5-133.8,177.6-134.8v-50.4c0-2.8,3.5-4.3,5.8-2.6l103.7,76.2         c1.7,1.3,1.7,3.9,0,5.1l-103.6,76.2c-2.4,1.7-5.8,0.2-5.8-2.6v-50.3c-55.3,0.9-102.5,35-122.8,83.2c-7.7,18.2-11.6,38.3-10.5,59.4         c1.5,29,12.4,55.7,29.6,77.3c9.2,11.5,7,28.3-4.9,37c-11.3,8.3-27.1,6-35.8-5C74.19,330.618,59.99,298.218,55.89,262.818z         M355.29,166.018c17.3,21.5,28.2,48.3,29.6,77.3c1.1,21.2-2.9,41.3-10.5,59.4c-20.3,48.2-67.5,82.4-122.8,83.2v-50.3         c0-2.8-3.5-4.3-5.8-2.6l-103.7,76.2c-1.7,1.3-1.7,3.9,0,5.1l103.6,76.2c2.4,1.7,5.8,0.2,5.8-2.6v-50.4         c84.1-0.9,155.1-57.6,177.6-134.8c6.8-23.2,9.2-48.3,6.3-74.3c-4-35.4-18.2-67.8-39.5-94.4c-8.8-11-24.5-13.3-35.8-5         C348.29,137.718,346.09,154.518,355.29,166.018z"}),ve=function(e){var t=e.svgRef,n=ge(e,["svgRef"]);return a.a.createElement("svg",me({viewBox:"0 0 491.236 491.236",ref:t},n),de)},be=a.a.forwardRef(function(e,t){return a.a.createElement(ve,me({svgRef:t},e))});n.p;function he(){return(he=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function Oe(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var Ae=a.a.createElement("g",null,a.a.createElement("path",{d:"M408,0H51C22.95,0,0,22.95,0,51v357c0,28.05,22.95,51,51,51h357c28.05,0,51-22.95,51-51V51C459,22.95,436.05,0,408,0z  M173.4,265.2V357h-45.9V102h109.65c38.25,0,56.1,7.65,71.399,22.95c17.851,15.3,22.95,35.7,22.95,58.65 c0,25.5-7.65,45.9-22.95,58.65s-33.149,20.4-71.399,20.4H173.4V265.2z"}),a.a.createElement("path",{d:"M173.4,229.5v-91.8h58.65c17.851,0,30.601,5.1,38.25,15.3c7.65,10.2,12.75,17.85,12.75,30.6c0,15.3-5.1,22.95-12.75,33.15 c-7.649,7.65-17.85,12.75-35.7,12.75H173.4z"})),ye=function(e){var t=e.svgRef,n=Oe(e,["svgRef"]);return a.a.createElement("svg",he({viewBox:"0 0 459 459",ref:t},n),Ae)},Ee=a.a.forwardRef(function(e,t){return a.a.createElement(ye,he({svgRef:t},e))}),je=(n.p,n(4)),we=n.n(je),Se=13,Ce=17;function ke(e){var t=e.fetchedAt,n=e.location,o=e.stations,i=e.updateStations,s=e.position,l=Object(r.useContext)(c.c).state,u=(l=void 0===l?{}:l).map,f=void 0===u?void 0:u,p=Object(r.useState)(!0),g=Object(h.a)(p,2),d=g[0],v=g[1],b=Object(r.useState)(!1),O=Object(h.a)(b,2),E=O[0],j=O[1],w=Object(r.useState)([]),S=Object(h.a)(w,2),C=S[0],M=S[1],I=Object(r.useState)(),P=Object(h.a)(I,2),N=P[0],L=P[1],H=Object(r.useState)(!0),z=Object(h.a)(H,2),D=z[0],T=z[1],F=Object(r.useState)(!1),Y=Object(h.a)(F,2),X=Y[0],Q=Y[1],Z=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=Object(r.useContext)(c.c),n=t.dispatch,o=t.state,i=Object(r.useState)(),s=Object(h.a)(i,2),l=s[0],u=s[1],f=Object(r.useState)(),p=Object(h.a)(f,2),m=p[0],g=p[1],d=Object(r.useCallback)(function(e){return m?a.a.createElement(c.c.Provider,Object.assign({value:m},e)):null},[m]),v=y(),b=Object(h.a)(v,1)[0];return Object(r.useEffect)(function(){!l&&o&&o.map&&u(new U.a(o.map,[],Object(q.a)({},W,e))),!m&&l&&o&&g({dispatch:function(e){var t=e.type,r=e.id,a=e.object;if(l&&o&&o.objects)switch(t){case"add_object":a&&a instanceof b.maps.Marker&&l.addMarker(a);break;case"remove_object":if(r){var i=o.objects.get(r);i&&i instanceof b.maps.Marker&&l.removeMarker(i)}}n(e)},state:o})},[l,m,n,b.maps.Marker,e,o]),d}(),G=Object(r.useCallback)(function(){if(f){var e=Me(s)&&xe(s),t=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Ce;if(e){var n=e.coords.accuracy;return Math.min(t,Math.max(1,Math.log2(591657550/n)-6))}return}(s);e&&f.setCenter(e),t&&f.setZoom(t),E||j(!0)}},[E,f,s]);return Object(r.useEffect)(function(){var e=[];o.forEach(function(t){t.valid||console.debug("Bad Station Found",t),e.push(t)}),function(e,t){if(e.length!==t.length)return!1;var n=e.sort(function(e,t){var n=e.number,r=void 0===n?0:n,a=t.number,o=void 0===a?0:a;return r-o}),r=t.sort(function(e,t){var n=e.number,r=void 0===n?0:n,a=t.number,o=void 0===a?0:a;return r-o});return n.every(function(e,t){return function(e,t){return e.number===t.number&&e.valid===t.valid&&JSON.stringify(e.data)===JSON.stringify(t.data)}(e,r[t])})}(C,e)||M(e)},[o,C]),Object(r.useEffect)(function(){d&&G()},[d,G]),a.a.createElement("div",{className:we.a.MapContainer},a.a.createElement(c.f,{apiKey:"AIzaSyBXrYScIU6sWYUWLLlovYhzq-bLzwTgAoc",opts:{center:n,zoom:Se,maxZoom:Ce},onClick:function(){return L(void 0)},onDragStart:function(){d&&v(!1),E&&j(!1)},LoadingComponent:a.a.createElement(m,null)}),a.a.createElement(c.a,null),a.a.createElement(x,{bindingPosition:"BOTTOM_CENTER"},a.a.createElement(k,{onClick:i},a.a.createElement(be,{className:we.a.ButtonImage}))),a.a.createElement(x,{bindingPosition:"BOTTOM_CENTER"},a.a.createElement(k,{disabled:!Me(s),onClick:function(){d?E?(d&&v(!1),E&&j(!1)):G():d||v(!0)}},a.a.createElement(pe,{className:we.a.ButtonImage,style:{fill:d?"#008ABF":"#000",fillOpacity:Me(s)?1:.25},focusable:"false","aria-hidden":"true"}))),a.a.createElement(x,{bindingPosition:"BOTTOM_CENTER"},a.a.createElement(k,{onClick:function(){if(f){var e=function(e,t,n){var r=A();return t.map(function(t){return{station:t,distance:r.maps.geometry.spherical.computeDistanceBetween(e,new r.maps.LatLng(t.lat,t.lng))}}).filter(function(e){var t=e.station,r=t.bikes,a=t.errors,o=t.free,i=t.operative;return null==n||(!a||!a.length)&&i&&(n?r>0:o>0)}).sort(function(e,t){return e.distance-t.distance})[0].station}(d&&Me(s)&&xe(s)||f.getCenter(),C,D);e===N?(f.panTo(e),f.setZoom(Ce)):(d&&v(!1),L(e))}}},D?a.a.createElement(J,{className:we.a.ButtonImage}):a.a.createElement(Ee,{className:we.a.ButtonImage,style:{fill:"#008ABF"}}))),a.a.createElement(x,{bindingPosition:"RIGHT_TOP"},a.a.createElement(k,{onClick:function(){return T(function(e){return!e})}},D?a.a.createElement(J,{className:we.a.ButtonImage}):a.a.createElement(Ee,{className:we.a.ButtonImage,style:{fill:"#008ABF"}}))),a.a.createElement(x,{bindingPosition:"RIGHT_TOP"},a.a.createElement(k,{onClick:function(){return Q(function(e){return!e})}},X?a.a.createElement(te,{className:we.a.ButtonImage}):a.a.createElement(ce,{className:we.a.ButtonImage}))),f&&C.length>0&&a.a.createElement(Z,null,C.map(function(e){var t=e.bikes,n=e.free,r=e.lat,o=e.lng,i=e.number,c=e.total;return a.a.createElement(V,{key:i,bikes:t,free:n,lat:r,lng:o,number:i,onClick:function(){return L(C.filter(function(e){return e.number===i}).shift())},preferBikes:D,showLabel:X,total:c})})),f&&s&&s.coords&&s.timestamp&&a.a.createElement(B,{coords:s.coords,timestamp:s.timestamp}),f&&N&&a.a.createElement(c.e,{anchorId:"station-".concat(N.number),onCloseClick:function(){return L(void 0)},visible:!0},a.a.createElement(R,{fetchedAt:t,station:N})))}function xe(e){var t=e.coords,n=t.latitude,r=t.longitude;return new(A().maps.LatLng)(n,r)}function Me(e){return Boolean(e&&0!==e.coords.latitude&&0!==e.coords.longitude)}var Be=n(7),Re=n.n(Be),Ie={enableHighAccuracy:!0};var Pe,Ne=n(9),Le=n.n(Ne),He=n(15),ze=n(29),De=n(16),Te=n(30),Ve=n.n(Te);function Fe(e){var t=function(e){var t=e.name;try{var n=/^(\d+)\s+(.*)$/.exec(t);if(!n)throw new Error('Unable to parse "number name" from '.concat(t));return{name:n[2],number:Number(n[1])}}catch(r){return{nameNumberError:r}}}(e),n=t.nameNumberError,r=t.name,a=t.number,o=function(e){var t=e.coordinates;try{var n=/^\s*(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)\s*$/.exec(t);if(!n)throw new Error('Unable to parse "lat, lng" from '.concat(t));return{lat:Number(n[1]),lng:Number(n[2])}}catch(r){return{latLngError:r}}}(e),i=o.lat,c=o.latLngError,s=o.lng,l=Object(q.a)({},e,{bikes:e.avl_bikes,free:e.free_slots,lat:i,lng:s,name:r,number:a,operative:e.operative,total:e.total_slots,errors:[]});return n&&l.errors.push(n),c&&l.errors.push(c),function(e){return Object(q.a)({data:e,valid:[Number.isInteger(e.bikes),Number.isInteger(e.free),Number.isInteger(e.total),null!=e.number&&Number.isInteger(e.number)&&e.number>0,null!=e.lat&&Number.isFinite(e.lat)&&0!==e.lat,null!=e.lng&&Number.isFinite(e.lng)&&0!==e.lng,null!=e.name&&/^\w/.test(e.name),0===e.errors.length].every(function(e){return e})},e)}(l)}function qe(e){return e.result.map(Fe)}!function(e){e[e.Smoove=0]="Smoove"}(Pe||(Pe={}));var Ye=new Map([["test",{location:{lat:49.279627,lng:-123.121116},name:"Test Data",type:"Smoove",uri:"/test_data"}],["vancouver",{location:{lat:49.279627,lng:-123.121116},name:"Mobi Bike Vancouver",type:"Smoove",uri:"http://vancouver-ca.smoove.pro/api-public/stations",cors:!0}]]);var Ue=function(){function e(t,n){var r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];Object(ze.a)(this,e),this.config=void 0,this.verboseOutput=void 0,this.transform=void 0,this.config=t,this.transform=n,this.verboseOutput=r}return Object(De.a)(e,null,[{key:"create",value:function(t,n){var r=n.debug,a="string"===typeof t?function(e){var t=Ye.get(e);if(!t)throw new Error("No station data for source '".concat(e,"'"));return t}(t):t;return new e(a,function(e){var t=e.type;switch(t){case"Smoove":return qe;default:throw new Error("Invalid Configuration '".concat(t,"'"))}}(a),r)}},{key:"nearest",value:function(t,n){return e.create(function(e){var t=A(!1);return Array.from(Ye.values()).map(function(n){return{config:n,distance:t.maps.geometry.spherical.computeDistanceBetween(new t.maps.LatLng(e),new t.maps.LatLng(n.location.lat,n.location.lng))}}).sort(function(e,t){return e.distance-t.distance})[0].config}(t),n)}}]),Object(De.a)(e,[{key:"getJSON",value:function(){var e=Object(He.a)(Le.a.mark(function e(){var t,n,r;return Le.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.config.cors?"https://cors-anywhere.herokuapp.com/".concat(this.config.uri):this.config.uri,this.debug("Fetching stations from '".concat(t,"' ...")),e.next=4,Ve()(t,{headers:this.config.options?this.config.options.headers:void 0});case 4:return n=e.sent,r=n.json(),this.debug("Fetch Response",r),e.abrupt("return",r);case 8:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"getStations",value:function(){var e=Object(He.a)(Le.a.mark(function e(){var t,n;return Le.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this.getJSON();case 3:return t=e.sent,n=this.transform(t),this.debug("Fetched ".concat(n.length," stations")),e.abrupt("return",{config:this.config,fetchedAt:Re()(),stations:n});case 9:return e.prev=9,e.t0=e.catch(0),this.debug("Fetch failed: ".concat(e.t0.message||"Unknown Error"),e.t0),e.abrupt("return",{config:this.config,error:e.t0,fetchedAt:Re()(),stations:[]});case 13:case"end":return e.stop()}},e,this,[[0,9]])}));return function(){return e.apply(this,arguments)}}()},{key:"debug",value:function(e){if(this.verboseOutput){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];console.log(e,n)}}}]),e}(),We="vancouver";function Xe(e){var t=function(e){return e?{debug:Boolean(e.get("debug")),sourceName:e.get("source")||e.get("test")&&"test"||We}:{}}(e.params),n=t.debug,a=t.sourceName,o=Object(r.useState)(),i=Object(h.a)(o,2),c=i[0],s=i[1],l=Object(r.useMemo)(function(){return a?Ue.create(a,{debug:n}):null},[n,a]),u=Object(r.useCallback)(function(){if(l)return l.getStations().then(s)},[l]);return Object(r.useEffect)(function(){l&&u()},[l,u]),Object(r.useDebugValue)(c?"".concat(c.stations.length," stations loaded (").concat(c.fetchedAt.fromNow(),")"):"Loading..."),{stationSourceResult:c,updateStations:u}}var Qe=n(17),Ze=n.n(Qe);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(64);i.a.render(a.a.createElement(function(){var e=function(){var e=Object(r.useState)(),t=Object(h.a)(e,2),n=t[0],a=t[1];return Object(r.useEffect)(function(){if("undefined"!==typeof window&&!n){var e=new Map;new URLSearchParams(window.location.search).forEach(function(t,n){e.set(n.toLowerCase(),t)}),a(e)}},[n]),Object(r.useDebugValue)("undefined"===typeof window?"Loading...":window.location.search),{params:n}}().params,t=function(e){var t=e.options,n=Object(r.useState)(),a=Object(h.a)(n,2),o=a[0],i=a[1],c=Object(r.useState)(),s=Object(h.a)(c,2),l=s[0],u=s[1],f=Object(r.useState)(),p=Object(h.a)(f,2),m=p[0],g=p[1],d=Object(r.useCallback)(function(){"undefined"!==typeof navigator&&navigator.geolocation.getCurrentPosition(u,g,t||Ie)},[t]);return Object(r.useEffect)(function(){if(!o&&"undefined"!==typeof navigator){var e=navigator.geolocation.watchPosition(u,g,t||Ie);return i(e),function(){o&&(navigator.geolocation.clearWatch(o),i(void 0))}}},[t,o]),Object(r.useDebugValue)(l?"[".concat(l.coords.latitude,", ").concat(l.coords.longitude,"] @ ").concat(Re()(l.timestamp).fromNow()):"Loading..."),{error:m,position:l,updatePosition:d}}({params:e}).position,n=Xe({params:e}),o=n.stationSourceResult,i=n.updateStations;return a.a.createElement("div",{className:Ze.a.Container},a.a.createElement(b,null),a.a.createElement("div",{className:Ze.a.Content},o?a.a.createElement(c.d,null,a.a.createElement(ke,{fetchedAt:o.fetchedAt,location:o.config.location,stations:o.stations,position:t,updateStations:i})):a.a.createElement(m,null)))},null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[32,1,2]]]);
//# sourceMappingURL=main.21c91c54.chunk.js.map