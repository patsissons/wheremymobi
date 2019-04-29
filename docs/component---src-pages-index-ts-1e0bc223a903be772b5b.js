(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{132:function(e,t,n){"use strict";n.r(t);var r=n(236);t.default=r.a},171:function(e,t,n){var r;e.exports=(r=n(225))&&r.default||r},224:function(e){e.exports={data:{site:{siteMetadata:{description:"Find mobi bikes in Vancouver, BC.",logo:"https://www.mobibikes.ca/sites/all/themes/smoove_bootstrap/logo.png",logoUrl:"https://www.mobibikes.ca/en#the-map"}}}}},225:function(e,t,n){"use strict";n.r(t);n(31);var r=n(0),o=n.n(r),a=n(3),i=n.n(a),c=n(55),s=n(2),l=function(e){var t=e.location,n=s.default.getResourcesForPathnameSync(t.pathname);return o.a.createElement(c.a,Object.assign({location:t,pageResources:n},n.json))};l.propTypes={location:i.a.shape({pathname:i.a.string.isRequired}).isRequired},t.default=l},236:function(e,t,n){"use strict";var r=n(0),o=n.n(r),a=n(143),i=n(240),c=n.n(i),s=n(241),l=["double-bounce","chasing-dots","circle","cube-grid"];var u=Object(a.a)(Object(a.h)(function(e){return{name:e.name||l[Math.floor(Math.random()*l.length)]}}))(function(e){var t=e.name;return Boolean(t)&&r.createElement("div",{className:s.LoadingContainer},r.createElement(c.a,{className:s.Loader,name:t}))}),d=(n(157),n(31),n(69)),f=n.n(d),m=(n(70),n(176),n(7)),g=n.n(m),p=n(158),h=n(296),b=n.n(h);var v=function(e){var t=e.color,n=void 0===t?"magenta":t,o=e.coords,a=(e.timestamp,f()(e,["color","coords","timestamp"])),i=o.accuracy,c=o.heading,s=o.latitude,l=o.longitude,u=new google.maps.LatLng(s,l);return r.createElement(r.Fragment,null,r.createElement(p.Circle,{center:u,radius:i,options:{fillColor:n,strokeColor:n,fillOpacity:.25,strokeWeight:1}}),r.createElement(p.Marker,Object.assign({icon:{anchor:new google.maps.Point(0,2.6),path:google.maps.SymbolPath.FORWARD_CLOSED_ARROW,strokeColor:n,fillColor:n,fillOpacity:1,rotation:c,scale:10,strokeWeight:1},position:new google.maps.LatLng(s,l),zIndex:google.maps.Marker.MAX_ZINDEX},a)))};n(297),n(298);var w=function(e){var t=e.fetchedAt,n=e.station;return r.createElement("div",null,r.createElement("ul",null,r.createElement("li",null,`[${n.number.toString().padStart(4,"0")}] ${n.name}${n.operative?"":" (CLOSED)"}`),r.createElement("li",null,`${n.bikes} bikes / ${n.free} slots (${n.total} total)`),r.createElement("li",null,r.createElement("a",{target:"_blank",href:`https://www.google.com/maps/dir/?api=1&travelmode=bicycling&destination=${n.lat},${n.lng}`},`${n.lat}, ${n.lng}`)),r.createElement("li",null,`Last Updated: ${t.fromNow()}`)))},O=(n(34),'\n<svg width="100px" height="100px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">\n  <path id="bg" fill="#ffffff" d="m77.438,31.70225c-0.139,-5.802 -1.797,-10.248 -4.202,-14.012c-2.307,-3.607 -5.341,-6.666 -9.258,-8.958c-4.793,-2.803 -11.556,-4.639 -18.766,-3.553c-8.819,1.33 -15.391,6.39 -19.316,12.561c-2.385,3.752 -4.039,8.341 -4.152,14.062c-0.117,5.854 1.706,10.369 3.954,14.261c1.122,1.948 2.132,3.929 3.302,5.805c3.504,5.621 7.291,10.97 10.559,16.765c4.406,7.812 8.044,16.242 10.108,26.371c2.984,-15.367 9.802,-26.583 17.063,-37.58c2.439,-3.692 4.867,-7.382 6.806,-11.41c0.993,-2.063 2.107,-3.996 2.803,-6.306c0.684,-2.283 1.172,-5.035 1.099,-8.006z"/>\n  <path id="fill" fill="currentColor" d="M77.438,31.834c-0.139-5.802-1.797-10.248-4.202-14.012c-2.307-3.607-5.341-6.666-9.258-8.958   c-4.793-2.803-11.556-4.639-18.766-3.553c-8.819,1.33-15.391,6.39-19.316,12.561c-2.385,3.752-4.039,8.341-4.152,14.062   c-0.117,5.854,1.706,10.369,3.954,14.261C26.82,48.143,27.83,50.124,29,52c3.504,5.621,7.291,10.97,10.559,16.765   c4.406,7.812,8.044,16.242,10.108,26.371c2.984-15.367,9.802-26.583,17.063-37.58c2.439-3.692,4.867-7.382,6.806-11.41   c0.993-2.063,2.107-3.996,2.803-6.306C77.023,37.557,77.511,34.805,77.438,31.834z M49.685,52.47   c-11.004,0-19.923-8.92-19.923-19.923c0-11.002,8.919-19.922,19.923-19.922c11.003,0,19.923,8.92,19.923,19.922   C69.607,43.55,60.688,52.47,49.685,52.47z"/>\n</svg>'.trim());function j(e){return`data:image/svg+xml;charset=UTF-8,${encodeURIComponent(O.replace(/fill="currentColor"/,`fill="${t=e,n=t.bikes,n>10?"forestgreen":n>5?"coral":"crimson"}"`))}`;var t,n}function E(e){return{url:j(e),labelOrigin:new google.maps.Point(49,33)}}var y=Object(a.a)(Object(a.g)({handleOnClick(e){var t=e.showInfo,n=e.node;return function(){return t(n)}}}))(function(e){var t=e.handleOnClick,n=(e.showInfo,e.node.station),o=f()(e,["handleOnClick","showInfo","node"]),a=n.lat,i=n.lng;return r.createElement(p.Marker,Object.assign({onClick:t,icon:E(n),label:{text:`${n.bikes} | ${n.free}`,fontSize:"0.75rem",fontWeight:"bold"},position:new google.maps.LatLng(a,i)},o))}),k=Object(a.b)({mapsApiKey:"AIzaSyBXrYScIU6sWYUWLLlovYhzq-bLzwTgAoc"}),C=n(299),N=function(e){function t(){for(var t,n=arguments.length,o=new Array(n),a=0;a<n;a++)o[a]=arguments[a];return(t=e.call.apply(e,[this].concat(o))||this).renderInfo=function(){var e=t.props,n=e.fetchedAt,o=e.selectedNode;if(!o)return!1;var a=o.station,i=a.lat,c=a.lng;return r.createElement(p.InfoWindow,{position:{lat:i,lng:c},onCloseClick:t.props.hideInfo,options:{pixelOffset:new google.maps.Size(0,-100)}},r.createElement(w,{fetchedAt:n,station:o.station}))},t.renderMarker=function(e){if(!e.isValid)return console.debug("Bad Station Found",e.station),!1;var n=t.props.showInfo;return r.createElement(y,{key:e.station.number,node:e,showInfo:n})},t.renderMarkers=function(e){void 0===e&&(e=!0);var n=Array.from(t.props.nodes.values()).map(t.renderMarker);return e?r.createElement(b.a,{averageCenter:!0,enableRetinaIcons:!0,gridSize:60,maxZoom:17},n):n},t.renderPosition=function(){var e=t.props.position;return!!(e&&e.coords&&e.timestamp)&&r.createElement(v,{coords:e.coords,timestamp:e.timestamp})},t}return g()(t,e),t.prototype.render=function(){var e=this.props,t=e.hideInfo,n=e.defaultCenter,o=e.defaultZoom;return r.createElement(p.GoogleMap,{defaultCenter:n,defaultZoom:o,onClick:t},r.createElement(p.BicyclingLayer,null),this.renderMarkers(),this.renderPosition(),this.renderInfo())},t}(r.PureComponent),S=Object(a.a)(k,Object(a.b)({defaultCenter:{lat:49.279627,lng:-123.121116},defaultZoom:13}),Object(a.i)({},{showInfo:()=>(function(e){return{selectedNode:e}}),hideInfo:()=>(function(){return{selectedNode:void 0}})}),Object(a.h)(function(e){return{googleMapURL:`https://maps.googleapis.com/maps/api/js?key=${e.mapsApiKey}&v=3.exp&libraries=geometry,drawing,places`,loadingElement:r.createElement("div",{className:C.LoadingContainer},"Loading..."),containerElement:r.createElement("div",{className:C.MapContainer}),mapElement:r.createElement("div",{className:C.Map})}}),Object(a.d)(function(e){e.mapsApiKey;var t=e.nodes,n=f()(e,["mapsApiKey","nodes"]);return Object.assign({nodes:t.reduce(function(e,t){return e.set(t.station.number,t)},new Map)},n)}),p.withScriptjs,p.withGoogleMap)(N),$=n(224),x=n(3),L=n.n(x),I=(n(32),n(171),o.a.createContext({})),M=function(e){return o.a.createElement(I.Consumer,null,function(t){return e.data||t[e.query]&&t[e.query].data?(e.render||e.children)(e.data?e.data.data:t[e.query].data):o.a.createElement("div",null,"Loading (StaticQuery)")})};M.propTypes={data:L.a.object,query:L.a.string.isRequired,render:L.a.func,children:L.a.func};var A=n(300);var U=function(e){var t=e.description,n=e.logo,o=e.logoUrl;return r.createElement("div",{className:A.Header},r.createElement("div",{className:A.HeaderLogo},r.createElement("a",{href:o},r.createElement("img",{src:n}))),r.createElement("div",{className:A.HeaderContent},r.createElement("h1",null,t)))},R=n(301);var F="3229557108";var z=Object(a.a)(Object(a.b)({errors:[]}),Object(a.c)(function(e){var t=Object.assign({},e);return r.createElement(M,Object.assign({query:F},t,{data:$}))},function(e){return{site:e.site}}))(function(e){var t=e.errors,n=e.site.siteMetadata,o=n.description,a=n.logo,i=n.logoUrl,c=f()(e,["errors","site"]);return r.createElement("div",{className:R.Container},r.createElement(U,{description:o,logo:a,logoUrl:i}),r.createElement("div",Object.assign({className:R.Content},c)),0!==t.length&&r.createElement("div",null,t))}),B=(n(72),n(324)),q=n(147),P=n(306),_=n(570),D=n(554),W=n(572),T=n(574),V=n(571),J=n(302),Z=n.n(J),H=n(553),K=n(568),Y=n(573),X=n(575),G=n(566),Q=n(567),ee=n(569);n(303);var te=n(304),ne=n.n(te),re=function(){function e(e){this.station=e}return e.prototype.toString=function(){return this.isValid?`[${this.station.number}] ${this.station.name} (${this.station.bikes} | ${this.station.free})`:"INVALID"},ne()(e,[{key:"isValid",get:function(){return[Number.isInteger(this.station.bikes),Number.isInteger(this.station.free),Number.isInteger(this.station.total),Number.isInteger(this.station.number),this.station.number>0,Number.isFinite(this.station.lat),0!==this.station.lat,Number.isFinite(this.station.lng),0!==this.station.lng,/^\w/.test(this.station.name),0===this.station.errors.length].every(function(e){return e})}}]),e}();n(305);function oe(e){var t=function(e){return void 0===e&&(e={}),Object.assign({data:null,errors:[],bikes:0,free:0,lat:0,lng:0,name:"",number:0,operative:!1,total:0},e)}({data:e,bikes:e.avl_bikes,free:e.free_slots,operative:e.operative,total:e.total_slots});return function(e,t){var n=e.name;try{var r=/^(\d+)\s+(.*)$/.exec(n);if(!r)throw new Error(`Unable to parse "number name" from ${n}`);t.number=Number(r[1]),t.name=r[2]}catch(o){t.errors.push(o)}}(e,t),function(e,t){try{var n=/^\s*(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)\s*$/.exec(e);if(!n)throw new Error(`Unable to parse "lat, lng" from ${e}`);t.lat=Number(n[1]),t.lng=Number(n[2])}catch(r){t.errors.push(r)}}(e.coordinates,t),t}var ae,ie=Object(P.a)(function(e){return e.result.map(oe)});!function(e){e[e.Smoove=0]="Smoove"}(ae||(ae={}));var ce=new Map([["test",{location:{lat:49.279627,lng:-123.121116},name:"Test Data",type:"Smoove",uri:"/static_data"}],["vancouver",{location:{lat:49.279627,lng:-123.121116},name:"Mobi Bike Vancouver",type:"Smoove",uri:"http://vancouver-ca.smoove.pro/api-public/stations",cors:!0}]]);var se=function(){function e(e,t,n){void 0===n&&(n=!1),this.config=e,this.transform=t,this.verboseOutput=n}e.create=function(t,n){var r=n.debug,o="string"==typeof t?function(e){var t=ce.get(e.toLowerCase());if(!t)throw new Error(`No station data for source '${e}'`);return t}(t):t;return new e(o,function(e){var t=e.type;switch(t){case"Smoove":return ie;default:throw new Error(`Invalid Configuration '${t}'`)}}(o),r)},e.nearest=function(t,n){return e.create(function(e){return Array.from(ce.values()).map(function(t){return{config:t,distance:google.maps.geometry.spherical.computeDistanceBetween(e,new google.maps.LatLng(t.location.lat,t.location.lng))}}).sort(function(e,t){return e.distance-t.distance})[0].config}(t),n)};var t=e.prototype;return t.getJSON=function(){var e=this.config.cors?`https://cors.io/?${this.config.uri}`:this.config.uri;this.debug(`Fetching stations from '${e}' ...`);var t=this.config.options?this.config.options.headers:void 0;return X.a.getJSON(e,t)},t.getStations=function(e){var t=this;return(e||this.getJSON()).pipe(Object(G.a)(function(e){t.debug("Fetch Response",e)}),this.transform,Object(P.a)(function(e){return t.debug(`Fetched ${e.length} stations`),{config:t.config,nodes:e.map(function(e){return new re(e)}),fetchedAt:Z()()}}),Object(Q.a)(function(e){return void 0===e&&(e={}),t.debug(`Fetch failed: ${e.message||"Unknown Error"}`,e),Object(H.a)({error:e,config:t.config,fetchedAt:Z()(),nodes:[]})}))},t.watchStations=function(e,t,n){var r=this;return void 0===e&&(e=Object(H.a)(!0)),void 0===t&&(t=300),Object(K.a)(Object(Y.a)(0,1e3*t),e).pipe(Object(ee.a)(100),Object(D.a)(function(){return r.getStations(n)}))},t.debug=function(e){if(this.verboseOutput){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];n.length?console.log(e,n):console.log(e)}},e}(),le=n(320);function ue(){if("undefined"==typeof window)return null;var e=new Map;return new URLSearchParams(window.location.search).forEach(function(t,n){e.set(n.toLowerCase(),t)}),e}Object(a.f)({fromESObservable:B.a});var de=Object(a.h)(function(){return{params:ue()}});var fe=Object(a.a)(de,function(e){void 0===e&&(e={enableHighAccuracy:!0});var t=new le.Subject,n=function(){return t.next()};return Object(a.e)(function(t){return t.pipe(Object(P.a)(function(){return"undefined"!=typeof navigator&&navigator.geolocation}),Object(_.a)(function(e){return Boolean(e)}),Object(D.a)(function(t){return new q.a(function(n){t.watchPosition(function(e){n.next(e)},function(e){n.error({error:e})},e)})}),Object(W.a)(void 0),Object(T.a)(t,function(e,t){return console.log("[position]",e,t),Object.assign({},t,{reload:n,position:e})}))})}(),function(e){void 0===e&&(e="vancouver");var t=new le.Subject,n=function(){console.log("reload"),t.next()};return Object(a.e)(function(r){return r.pipe(Object(P.a)(function(e){return e.params}),Object(_.a)(function(e){return null!=e}),Object(P.a)(function(t){return{debug:Boolean(t.get("debug")),source:t.get("source")||t.get("test")&&"test"||e}}),Object(V.a)(function(e,t){return e.debug===t.debug&&e.source===t.source}),Object(D.a)(function(e){var n=e.debug,r=e.source;return console.log("fetch",{source:r,debug:n}),se.create(r,{debug:n}).watchStations(t)}),Object(T.a)(r,function(e,t){return console.log("[stations]",e,t),Object.assign({},t,{reload:n,stations:e})}))})}())(function(e){var t=e.position,n=e.reload,o=e.stations;return r.createElement(z,null,o?r.createElement(S,{fetchedAt:o.fetchedAt,location:o.config.location,nodes:o.nodes,position:t,reload:n}):r.createElement(u,null))});var me=function(){return r.createElement("div",null,r.createElement("h1",null,"NOT FOUND"),r.createElement("p",null,"You just hit a route that doesn't exist... the sadness."))};n.d(t,"a",function(){return fe}),n.d(t,"b",function(){return me})}}]);
//# sourceMappingURL=component---src-pages-index-ts-1e0bc223a903be772b5b.js.map