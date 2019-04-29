(window.webpackJsonp=window.webpackJsonp||[]).push([[1,6],{139:function(e,t,n){"use strict";n.r(t);var o=n(0),r=n(158),a=(n(167),n(342)),i=n.n(a),s=n(375),c=["double-bounce","chasing-dots","circle","cube-grid"];var u=Object(r.compose)(Object(r.withProps)(function(e){return{name:e.name||c[Math.floor(Math.random()*c.length)]}}))(function(e){var t=e.name;return Boolean(t)&&o.createElement("div",{className:s.LoadingContainer},o.createElement(i.a,{className:s.Loader,name:t}))}),l=(n(178),n(56),n(34),n(179)),d=n.n(l),f=(n(77),n(50),n(76),n(210),n(49),n(10)),m=n.n(f),p=n(211),g=n(575),h=n.n(g);var b=function(e){var t=e.coords,n=(e.timestamp,d()(e,["coords","timestamp"])),r=t.accuracy,a=t.heading,i=t.latitude,s=t.longitude,c=new google.maps.LatLng(i,s);return o.createElement(o.Fragment,null,o.createElement(p.Circle,{center:c,radius:r,options:{fillColor:"blue",strokeColor:"blue",fillOpacity:.25,strokeWeight:1}}),o.createElement(p.Marker,Object.assign({icon:{anchor:new google.maps.Point(0,2.6),path:google.maps.SymbolPath.FORWARD_CLOSED_ARROW,strokeColor:"blue",fillColor:"blue",fillOpacity:1,rotation:a,scale:6,strokeWeight:1},position:new google.maps.LatLng(i,s)},n)))};n(577),n(579),n(580);var v=function(e){var t=e.fetchedAt,n=e.station;return o.createElement("div",null,o.createElement("ul",null,o.createElement("li",null,"["+n.number.toString().padStart(4,"0")+"] "+n.name+(n.operative?"":" (CLOSED)")),o.createElement("li",null,n.bikes+" bikes / "+n.free+" slots ("+n.total+" total)"),o.createElement("li",null,o.createElement("a",{target:"_blank",href:"https://www.google.com/maps/dir/?api=1&travelmode=bicycling&destination="+n.lat+","+n.lng},n.lat+", "+n.lng)),o.createElement("li",null,"Last Updated: "+t.fromNow())))},w=(n(583),'\n<svg width="100px" height="100px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">\n  <path id="bg" fill="#ffffff" d="m77.438,31.70225c-0.139,-5.802 -1.797,-10.248 -4.202,-14.012c-2.307,-3.607 -5.341,-6.666 -9.258,-8.958c-4.793,-2.803 -11.556,-4.639 -18.766,-3.553c-8.819,1.33 -15.391,6.39 -19.316,12.561c-2.385,3.752 -4.039,8.341 -4.152,14.062c-0.117,5.854 1.706,10.369 3.954,14.261c1.122,1.948 2.132,3.929 3.302,5.805c3.504,5.621 7.291,10.97 10.559,16.765c4.406,7.812 8.044,16.242 10.108,26.371c2.984,-15.367 9.802,-26.583 17.063,-37.58c2.439,-3.692 4.867,-7.382 6.806,-11.41c0.993,-2.063 2.107,-3.996 2.803,-6.306c0.684,-2.283 1.172,-5.035 1.099,-8.006z"/>\n  <path id="fill" fill="currentColor" d="M77.438,31.834c-0.139-5.802-1.797-10.248-4.202-14.012c-2.307-3.607-5.341-6.666-9.258-8.958   c-4.793-2.803-11.556-4.639-18.766-3.553c-8.819,1.33-15.391,6.39-19.316,12.561c-2.385,3.752-4.039,8.341-4.152,14.062   c-0.117,5.854,1.706,10.369,3.954,14.261C26.82,48.143,27.83,50.124,29,52c3.504,5.621,7.291,10.97,10.559,16.765   c4.406,7.812,8.044,16.242,10.108,26.371c2.984-15.367,9.802-26.583,17.063-37.58c2.439-3.692,4.867-7.382,6.806-11.41   c0.993-2.063,2.107-3.996,2.803-6.306C77.023,37.557,77.511,34.805,77.438,31.834z M49.685,52.47   c-11.004,0-19.923-8.92-19.923-19.923c0-11.002,8.919-19.922,19.923-19.922c11.003,0,19.923,8.92,19.923,19.922   C69.607,43.55,60.688,52.47,49.685,52.47z"/>\n</svg>'.trim());function O(e){return{url:function(e){return"data:image/svg+xml;utf8,"+w.replace(/fill="currentColor"/,'fill="'+((t=e.bikes)>10?"forestgreen":t>5?"coral":"crimson")+'"');var t}(e),labelOrigin:new google.maps.Point(49,33)}}var y=Object(r.compose)(Object(r.withHandlers)({handleOnClick:function(e){var t=e.showInfo,n=e.node;return function(){return t(n)}}}))(function(e){var t=e.handleOnClick,n=(e.showInfo,e.node.station),r=d()(e,["handleOnClick","showInfo","node"]),a=n.lat,i=n.lng;return o.createElement(p.Marker,Object.assign({onClick:t,icon:O(n),label:{text:n.bikes+" | "+n.free,fontSize:"0.75rem",fontWeight:"bold"},position:new google.maps.LatLng(a,i)},r))}),E=Object(r.defaultProps)({mapsApiKey:"AIzaSyBXrYScIU6sWYUWLLlovYhzq-bLzwTgAoc"}),j=n(585),C=function(e){function t(){for(var t,n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];return(t=e.call.apply(e,[this].concat(r))||this).renderInfo=function(){var e=t.props,n=e.fetchedAt,r=e.location,a=e.selectedNode;return a&&o.createElement(p.InfoWindow,{position:r,onCloseClick:t.props.hideInfo,options:{pixelOffset:new google.maps.Size(0,-100)}},o.createElement(v,{fetchedAt:n,station:a.station}))||!1},t.renderMarker=function(e){if(!e.isValid)return console.debug("Bad Station Found",e.station),!1;var n=t.props.showInfo;return o.createElement(y,{key:e.station.number,node:e,showInfo:n})},t.renderMarkers=function(e){void 0===e&&(e=!0);var n=Array.from(t.props.nodes.values()).map(t.renderMarker);return e?o.createElement(h.a,{averageCenter:!0,enableRetinaIcons:!0,gridSize:50,maxZoom:17},n):n},t.renderPosition=function(){var e=t.props.position;return!!(e&&e.coords&&e.timestamp)&&o.createElement(b,{coords:e.coords,timestamp:e.timestamp})},t}return m()(t,e),t.prototype.render=function(){var e=this.props,t=e.hideInfo,n=e.defaultCenter,r=e.defaultZoom;return o.createElement(p.GoogleMap,{defaultCenter:n,defaultZoom:r,onClick:t},o.createElement(p.BicyclingLayer,null),this.renderPosition(),this.renderInfo(),this.renderMarkers())},t}(o.PureComponent),k=Object(r.compose)(E,Object(r.defaultProps)({defaultCenter:{lat:49.279627,lng:-123.121116},defaultZoom:13}),Object(r.withStateHandlers)({},{showInfo:function(){return function(e){return{selectedNode:e}}},hideInfo:function(){return function(){return{selectedNode:void 0}}}}),Object(r.withProps)(function(e){return{googleMapURL:"https://maps.googleapis.com/maps/api/js?key="+e.mapsApiKey+"&v=3.exp&libraries=geometry,drawing,places",loadingElement:o.createElement("div",{className:j.LoadingContainer},"Loading..."),containerElement:o.createElement("div",{className:j.MapContainer}),mapElement:o.createElement("div",{className:j.Map})}}),Object(r.mapProps)(function(e){e.mapsApiKey;var t=e.nodes,n=d()(e,["mapsApiKey","nodes"]);return Object.assign({nodes:t.reduce(function(e,t){return e.set(t.station.number,t)},new Map)},n)}),p.withScriptjs,p.withGoogleMap)(C),S=n(587),L=n(306),x=n(590);var M=function(e){var t=e.description,n=e.logo,r=e.logoUrl;return o.createElement("div",{className:x.Header},o.createElement("div",{className:x.HeaderLogo},o.createElement("a",{href:r},o.createElement("img",{src:n}))),o.createElement("div",{className:x.HeaderContent},o.createElement("h1",null,t)))},P=n(592);var N="3229557108";var I=Object(r.compose)(Object(r.defaultProps)({errors:[]}),Object(r.fromRenderProps)(function(e){var t=Object.assign({},e);return o.createElement(L.StaticQuery,Object.assign({query:N},t,{data:S}))},function(e){return{site:e.site}}))(function(e){var t=e.errors,n=e.site.siteMetadata,r=n.description,a=n.logo,i=n.logoUrl,s=d()(e,["errors","site"]);return o.createElement("div",{className:P.Container},o.createElement(M,{description:r,logo:a,logoUrl:i}),o.createElement("div",Object.assign({className:P.Content},s)),0!==t.length&&o.createElement("div",null,t))}),A=n(140);function U(e){var t=e.params,n=e.position,r=e.reload,a=e.stations;return console.log("reload",r),o.createElement(I,null,t&&a?o.createElement(k,{fetchedAt:a.fetchedAt,location:a.config.location,nodes:a.nodes,position:n}):o.createElement(u,null))}n.d(t,"IndexPage",function(){return U});t.default=Object(r.compose)(A.withQueryParams,Object(A.withPosition)(),Object(A.withStations)())(U)},140:function(e,t,n){"use strict";n.r(t);n(34),n(51),n(83),n(77),n(50),n(76),n(178);var o=n(158),r=n(333),a=n(9),i=n(615),s=n(618),c=n(616),u=n(314),l=n(617),d=n(598),f=(n(49),n(308)),m=n.n(f),p=n(597),g=n(613),h=n(619),b=n(620),v=n(611),w=n(612),O=n(614);n(174);n(309),n(310),n(311),n(167);var y=n(312),E=n.n(y),j=function(){function e(e){this.station=void 0,this.station=e}return e.prototype.toString=function(){return this.isValid?"["+this.station.number+"] "+this.station.name+" ("+this.station.bikes+" | "+this.station.free+")":"INVALID"},E()(e,[{key:"isValid",get:function(){return[Number.isInteger(this.station.bikes),Number.isInteger(this.station.free),Number.isInteger(this.station.total),Number.isInteger(this.station.number),this.station.number>0,Number.isFinite(this.station.lat),0!==this.station.lat,Number.isFinite(this.station.lng),0!==this.station.lng,/^\w/.test(this.station.name),0===this.station.errors.length].every(function(e){return e})}}]),e}();n(210),n(313);function C(e){var t=function(e){return void 0===e&&(e={}),Object.assign({data:null,errors:[],bikes:0,free:0,lat:0,lng:0,name:"",number:0,operative:!1,total:0},e)}({data:e,bikes:e.avl_bikes,free:e.free_slots,operative:e.operative,total:e.total_slots});return function(e,t){var n=e.name;try{var o=/^(\d+)\s+(.*)$/.exec(n);if(!o)throw new Error('Unable to parse "number name" from '+n);t.number=Number(o[1]),t.name=o[2]}catch(e){t.errors.push(e)}}(e,t),function(e,t){try{var n=/^\s*(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)\s*$/.exec(e);if(!n)throw new Error('Unable to parse "lat, lng" from '+e);t.lat=Number(n[1]),t.lng=Number(n[2])}catch(e){t.errors.push(e)}}(e.coordinates,t),t}var k,S=Object(u.a)(function(e){return e.result.map(C)});!function(e){e[e.Smoove=0]="Smoove"}(k||(k={}));var L=new Map([["test",{location:{lat:49.279627,lng:-123.121116},name:"Test Data",type:"Smoove",uri:"/static_data"}],["vancouver",{location:{lat:49.279627,lng:-123.121116},name:"Mobi Bike Vancouver",type:"Smoove",uri:"http://vancouver-ca.smoove.pro/api-public/stations",cors:!0}]]);var x=function(){function e(e,t,n){void 0===n&&(n=!1),this.config=void 0,this.verboseOutput=void 0,this.transform=void 0,this.config=e,this.transform=t,this.verboseOutput=n}e.create=function(t,n){var o=n.debug,r="string"==typeof t?function(e){var t=L.get(e.toLowerCase());if(!t)throw new Error("No station data for source '"+e+"'");return t}(t):t;return new e(r,function(e){var t=e.type;switch(t){case"Smoove":return S;default:throw new Error("Invalid Configuration '"+t+"'")}}(r),o)},e.nearest=function(t,n){return e.create(function(e){return Array.from(L.values()).map(function(t){return{config:t,distance:google.maps.geometry.spherical.computeDistanceBetween(e,new google.maps.LatLng(t.location.lat,t.location.lng))}}).sort(function(e,t){return e.distance-t.distance})[0].config}(t),n)};var t=e.prototype;return t.getJSON=function(){var e=this.config.cors?"https://cors.io/?"+this.config.uri:this.config.uri;this.debug("Fetching stations from '"+e+"' ...");var t=this.config.options?this.config.options.headers:void 0;return b.a.getJSON(e,t)},t.getStations=function(e){var t=this;return(e||this.getJSON()).pipe(Object(v.a)(function(e){t.debug("Fetch Response",e)}),this.transform,Object(u.a)(function(e){return t.debug("Fetched "+e.length+" stations"),{config:t.config,nodes:e.map(function(e){return new j(e)}),fetchedAt:m()()}}),Object(w.a)(function(e){return void 0===e&&(e={}),t.debug("Fetch failed: "+(e.message||"Unknown Error"),e),Object(p.a)({error:e,config:t.config,fetchedAt:m()(),nodes:[]})}))},t.watchStations=function(e,t,n){var o=this;return void 0===e&&(e=Object(p.a)(!0)),void 0===t&&(t=300),Object(g.a)(Object(h.a)(0,1e3*t),e).pipe(Object(O.a)(100),Object(d.a)(function(){return o.getStations(n)}))},t.debug=function(e){if(this.verboseOutput){for(var t=arguments.length,n=new Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];n.length?console.log(e,n):console.log(e)}},e}(),M=n(328);n.d(t,"withQueryParams",function(){return N}),n.d(t,"withPosition",function(){return I}),n.d(t,"withStations",function(){return A}),Object(o.setObservableConfig)({fromESObservable:r.a});var P,N=Object(o.withProps)({params:(P=new Map,new URLSearchParams(window.location.search).forEach(function(e,t){P.set(t.toLowerCase(),e)}),P)});function I(e){void 0===e&&(e={enableHighAccuracy:!0});var t=new a.a(function(t){navigator.geolocation.watchPosition(function(e){t.next(e)},function(e){t.error({error:e})},e)});return Object(o.mapPropsStream)(function(e){return Object(i.a)(t.pipe(Object(s.a)(void 0)),e,function(e,t){return console.log("[position]",e,t),Object.assign({},t,{position:e})})})}function A(e){void 0===e&&(e="vancouver");var t=new M.Subject;return Object(o.mapPropsStream)(function(n){var o=n.pipe(Object(c.a)(function(e){var t=e.params;return Boolean(t)}),Object(u.a)(function(t){var n=t.params;return{debug:Boolean(n.get("debug")),source:n.get("source")||(n.get("test")?"test":e)}}),Object(l.a)(function(e,t){return e.debug===t.debug&&e.source===t.source}),Object(d.a)(function(e){var n=e.debug,o=e.source;return console.log("fetch",{source:o,debug:n}),x.create(o,{debug:n}).watchStations(t)}));return Object(i.a)(o,n,function(e,n){return console.log("[stations]",e,n),Object.assign({},n,{stations:e,reload:function(){console.log("reload"),t.next()}})})})}},306:function(e,t,n){"use strict";n.r(t),n.d(t,"graphql",function(){return p}),n.d(t,"StaticQueryContext",function(){return f}),n.d(t,"StaticQuery",function(){return m});var o=n(0),r=n.n(o),a=n(4),i=n.n(a),s=n(166),c=n.n(s);n.d(t,"Link",function(){return c.a}),n.d(t,"withPrefix",function(){return s.withPrefix}),n.d(t,"navigate",function(){return s.navigate}),n.d(t,"push",function(){return s.push}),n.d(t,"replace",function(){return s.replace}),n.d(t,"navigateTo",function(){return s.navigateTo});var u=n(307),l=n.n(u);n.d(t,"PageRenderer",function(){return l.a});var d=n(47);n.d(t,"parsePath",function(){return d.a});var f=r.a.createContext({}),m=function(e){return r.a.createElement(f.Consumer,null,function(t){return e.data||t[e.query]&&t[e.query].data?(e.render||e.children)(e.data?e.data.data:t[e.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})};function p(){throw new Error("It appears like Gatsby is misconfigured. Gatsby related `graphql` calls are supposed to only be evaluated at compile time, and then compiled away,. Unfortunately, something went wrong and the query was left in the compiled code.\n\n.Unless your site has a complex or custom babel/Gatsby configuration this is likely a bug in Gatsby.")}m.propTypes={data:i.a.object,query:i.a.string.isRequired,render:i.a.func,children:i.a.func}},307:function(e,t,n){var o;e.exports=(o=n(589))&&o.default||o},375:function(e,t,n){e.exports={LoadingContainer:"Loader-module--LoadingContainer--1fcG7",Loader:"Loader-module--Loader--3Q9b5"}},585:function(e,t,n){e.exports={LoadingContainer:"StationMap-module--LoadingContainer--3ziae",MapContainer:"StationMap-module--MapContainer--3ypYa",Map:"StationMap-module--Map--foP4U"}},587:function(e){e.exports={data:{site:{siteMetadata:{description:"Find mobi bikes in Vancouver, BC.",logo:"https://www.mobibikes.ca/sites/all/themes/smoove_bootstrap/logo.png",logoUrl:"https://www.mobibikes.ca/en#the-map"}}}}},589:function(e,t,n){"use strict";n.r(t);n(34);var o=n(0),r=n.n(o),a=n(4),i=n.n(a),s=n(72),c=n(2),u=function(e){var t=e.location,n=c.default.getResourcesForPathnameSync(t.pathname);return r.a.createElement(s.a,Object.assign({location:t,pageResources:n},n.json))};u.propTypes={location:i.a.shape({pathname:i.a.string.isRequired}).isRequired},t.default=u},590:function(e,t,n){e.exports={Header:"Header-module--Header--umzWI",HeaderLogo:"Header-module--HeaderLogo--2YUir",HeaderContent:"Header-module--HeaderContent--1J1nM"}},592:function(e,t,n){e.exports={Container:"DefaultLayout-module--Container--1-A96",Content:"DefaultLayout-module--Content--2xYut"}}}]);
//# sourceMappingURL=component---src-pages-components-index-page-index-page-tsx-7c26f6827a5cf1aac874.js.map