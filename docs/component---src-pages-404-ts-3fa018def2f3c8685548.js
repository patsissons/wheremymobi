(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{137:function(e,t,n){"use strict";n.r(t);var a=n(224);t.default=a.b},168:function(e,t,n){var a;e.exports=(a=n(196))&&a.default||a},173:function(e,t,n){"use strict";n.r(t),n.d(t,"graphql",function(){return g}),n.d(t,"StaticQueryContext",function(){return f}),n.d(t,"StaticQuery",function(){return m});var a=n(0),r=n.n(a),o=n(4),i=n.n(o),l=n(148),c=n.n(l);n.d(t,"Link",function(){return c.a}),n.d(t,"withPrefix",function(){return l.withPrefix}),n.d(t,"navigate",function(){return l.navigate}),n.d(t,"push",function(){return l.push}),n.d(t,"replace",function(){return l.replace}),n.d(t,"navigateTo",function(){return l.navigateTo});var s=n(32);n.d(t,"waitForRouteChange",function(){return s.c});var u=n(168),d=n.n(u);n.d(t,"PageRenderer",function(){return d.a});var p=n(39);n.d(t,"parsePath",function(){return p.a});var f=r.a.createContext({}),m=function(e){return r.a.createElement(f.Consumer,null,function(t){return e.data||t[e.query]&&t[e.query].data?(e.render||e.children)(e.data?e.data.data:t[e.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})};function g(){throw new Error("It appears like Gatsby is misconfigured. Gatsby related `graphql` calls are supposed to only be evaluated at compile time, and then compiled away,. Unfortunately, something went wrong and the query was left in the compiled code.\n\n.Unless your site has a complex or custom babel/Gatsby configuration this is likely a bug in Gatsby.")}m.propTypes={data:i.a.object,query:i.a.string.isRequired,render:i.a.func,children:i.a.func}},195:function(e){e.exports={data:{site:{siteMetadata:{description:"Find mobi bikes in Vancouver, BC.",logo:"https://www.mobibikes.ca/sites/all/themes/smoove_bootstrap/logo.png",logoUrl:"https://www.mobibikes.ca/en#the-map"}}}}},196:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(4),i=n.n(o),l=n(61),c=n(1),s=function(e){var t=e.location,n=c.default.getResourcesForPathname(t.pathname);return r.a.createElement(l.a,{location:t,pageResources:n})};s.propTypes={location:i.a.shape({pathname:i.a.string.isRequired}).isRequired},t.default=s},197:function(e,t,n){e.exports={Container:"DefaultLayout-module--Container--3gsXm",Content:"DefaultLayout-module--Content--s5QCN",Header:"DefaultLayout-module--Header--3j_Vz",HeaderLogo:"DefaultLayout-module--HeaderLogo--2R2pt",HeaderContent:"DefaultLayout-module--HeaderContent--NWecx"}},222:function(e,t,n){e.exports={LoadingContainer:"StationMap-module--LoadingContainer--3ziae",MapContainer:"StationMap-module--MapContainer--3ypYa",Map:"StationMap-module--Map--foP4U"}},224:function(e,t,n){"use strict";var a=n(0),r=(n(38),n(167)),o=n.n(r),i=n(195),l=n(173),c=n(156),s=n(197);function u(e){var t=e.description,n=e.logo,r=e.logoUrl;return a.createElement("div",{className:s.Header},a.createElement("div",{className:s.HeaderLogo},a.createElement("a",{href:r},a.createElement("img",{src:n}))),a.createElement("div",{className:s.HeaderContent},a.createElement("h1",null,t)))}var d="3229557108";var p=Object(c.compose)(Object(c.fromRenderProps)(function(e){var t=Object.assign({},e);return a.createElement(l.StaticQuery,Object.assign({query:d},t,{data:i}))},function(e){return{site:e.site}}))(function(e){var t=e.site.siteMetadata,n=t.description,r=t.logo,i=t.logoUrl,l=o()(e,["site"]);return a.createElement("div",{className:s.Container},a.createElement(u,{description:n,logo:r,logoUrl:i}),a.createElement("div",Object.assign({className:s.Content},l)))}),f=(n(227),n(53),n(83),n(55),n(82),n(230),n(54),n(9)),m=n.n(f),g=n(174),h=n(283),v=n.n(h);n(284),n(285),n(287),n(288);var w=function(e){var t=e.station;return a.createElement("div",null,a.createElement("ul",null,a.createElement("li",null,"["+t.number.toString().padStart(4,"0")+"] "+t.name+(t.operative?"":" (CLOSED)")),a.createElement("li",null,t.bikes+" bikes / "+t.free+" slots ("+t.total+" total)"),a.createElement("li",null,a.createElement("a",{target:"_blank",href:"https://www.google.com/maps/@"+t.lat+","+t.lng+",15z"},t.lat+", "+t.lng))))};var b=Object(c.compose)(Object(c.withHandlers)({handleOnClick:function(e){var t=e.showInfo,n=e.station;return function(){return t(n)}}}))(function(e){var t=e.handleOnClick,n=(e.showInfo,e.station),r=o()(e,["handleOnClick","showInfo","station"]),i='data:image/svg+xml;utf-8,<svg width="100px" height="100px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve" fill="'+(n.bikes>10?"forestgreen":n.bikes>5?"coral":"crimson")+'">\n  <path id="bg" fill="#ffffff" d="m77.438,31.70225c-0.139,-5.802 -1.797,-10.248 -4.202,-14.012c-2.307,-3.607 -5.341,-6.666 -9.258,-8.958c-4.793,-2.803 -11.556,-4.639 -18.766,-3.553c-8.819,1.33 -15.391,6.39 -19.316,12.561c-2.385,3.752 -4.039,8.341 -4.152,14.062c-0.117,5.854 1.706,10.369 3.954,14.261c1.122,1.948 2.132,3.929 3.302,5.805c3.504,5.621 7.291,10.97 10.559,16.765c4.406,7.812 8.044,16.242 10.108,26.371c2.984,-15.367 9.802,-26.583 17.063,-37.58c2.439,-3.692 4.867,-7.382 6.806,-11.41c0.993,-2.063 2.107,-3.996 2.803,-6.306c0.684,-2.283 1.172,-5.035 1.099,-8.006z"/>\n  <path id="fill" d="M77.438,31.834c-0.139-5.802-1.797-10.248-4.202-14.012c-2.307-3.607-5.341-6.666-9.258-8.958   c-4.793-2.803-11.556-4.639-18.766-3.553c-8.819,1.33-15.391,6.39-19.316,12.561c-2.385,3.752-4.039,8.341-4.152,14.062   c-0.117,5.854,1.706,10.369,3.954,14.261C26.82,48.143,27.83,50.124,29,52c3.504,5.621,7.291,10.97,10.559,16.765   c4.406,7.812,8.044,16.242,10.108,26.371c2.984-15.367,9.802-26.583,17.063-37.58c2.439-3.692,4.867-7.382,6.806-11.41   c0.993-2.063,2.107-3.996,2.803-6.306C77.023,37.557,77.511,34.805,77.438,31.834z M49.685,52.47   c-11.004,0-19.923-8.92-19.923-19.923c0-11.002,8.919-19.922,19.923-19.922c11.003,0,19.923,8.92,19.923,19.922   C69.607,43.55,60.688,52.47,49.685,52.47z"/>\n</svg>';return a.createElement(g.Marker,Object.assign({onClick:t,icon:{url:i,labelOrigin:{x:49,y:33}},label:{text:n.bikes+" | "+n.free,fontSize:"0.75rem",fontWeight:"bold"}},r))}),y=n(222),E=function(e){function t(){for(var t,n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(t=e.call.apply(e,[this].concat(r))||this).renderInfo=function(){var e=t.props.selectedStation;return e&&a.createElement(g.InfoWindow,{position:{lat:e.lat,lng:e.lng},onCloseClick:t.props.hideInfo},a.createElement(w,{station:e}))||!1},t.renderMarker=function(e){return a.createElement(b,{key:e.id,station:e,showInfo:t.props.showInfo,position:{lat:e.lat,lng:e.lng}})},t.renderMarkers=function(e){void 0===e&&(e=!0);var n=Array.from(t.props.stations.values()).map(t.renderMarker);return e?a.createElement(v.a,{averageCenter:!0,enableRetinaIcons:!0,gridSize:30},n):n},t}return m()(t,e),t.prototype.render=function(){return a.createElement(g.GoogleMap,{defaultZoom:13,defaultCenter:{lat:49.279627,lng:-123.121116},onClick:this.props.hideInfo},a.createElement(g.BicyclingLayer,null),this.renderInfo(),this.renderMarkers())},t}(a.PureComponent),C=Object(c.compose)(Object(c.mapProps)(function(e){return{stations:e.stations.edges.reduce(function(e,t){var n=t.node;return e.set(n.id,n)},new Map)}}),Object(c.withProps)({googleMapURL:"https://maps.googleapis.com/maps/api/js?key=AIzaSyBXrYScIU6sWYUWLLlovYhzq-bLzwTgAoc&v=3.exp&libraries=geometry,drawing,places",loadingElement:a.createElement("div",{className:y.LoadingContainer}),containerElement:a.createElement("div",{className:y.MapContainer}),mapElement:a.createElement("div",{className:y.Map})}),Object(c.withStateHandlers)({},{showInfo:function(){return function(e){return{selectedStation:e}}},hideInfo:function(){return function(){return{selectedStation:void 0}}}}),g.withScriptjs,g.withGoogleMap)(E);var k=function(e){var t=e.data.allStation;return a.createElement(p,null,a.createElement(C,{stations:t}))};var x=function(){return a.createElement("div",null,a.createElement("h1",null,"NOT FOUND"),a.createElement("p",null,"You just hit a route that doesn't exist... the sadness."))};n.d(t,"a",function(){return k}),n.d(t,"b",function(){return x})}}]);
//# sourceMappingURL=component---src-pages-404-ts-3fa018def2f3c8685548.js.map