(this.webpackJsonpDatabase_backup=this.webpackJsonpDatabase_backup||[]).push([[0],{444:function(e,t,a){},445:function(e,t,a){},537:function(e,t,a){"use strict";a.r(t);var r=a(0),o=a.n(r),i=a(22),n=a.n(i),c=a(39),l=a(424),b=(a(443),a(444),a(445),a(11)),s=a(598),u=a(599),d=a(604),j=a(602),f=a(600),O=a(606),h=a(607),v=a(100),p=a.n(v),g="http://localhost:8383/api/v1/",x="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNjkyNjcyMjAzfQ.7Yh2xoPn0bLQCDJ6S48b2pd2qXWlP2oihHwkAeVKE0Zcm6UCtE0Of9TpzpLm5m9Liv_koIJm0x732nxfj8wIpA",y=a(610),m=a(366),w=a(403),S=a.n(w),_=a(6),B=function(e){var t=Object(r.useState)(!1),a=Object(b.a)(t,2),o=a[0],i=a[1],n=Object(r.useState)(!1),c=Object(b.a)(n,2),l=(c[0],c[1]),s=Object(r.useState)(!1),u=Object(b.a)(s,2),d=(u[0],u[1]);return Object(_.jsx)("div",{children:Object(_.jsx)(m.a,{variant:"contained",startIcon:Object(_.jsx)(S.a,{}),onClick:function(){i(!0);try{console.log("backup Db.."),p.a.get("".concat(g,"database/backup"),{headers:{Authorization:"Bearer ".concat(x)}}).then((function(t){console.log(t),e.pullDatabaseBackup()})),l(!0)}catch(t){d(!0)}finally{i(!1)}},disabled:o,style:{backgroundColor:"#014d88",color:"#fff",float:"right"},children:o?Object(_.jsx)(y.a,{size:24}):"Backup Database"})})},A=a(603),k=(a(601),a(223)),P=a.n(k),z=a(24),C=a(280),R=a.n(C),L=a(385),I=a(421),F=a.n(I),D=a(408),W=a.n(D),E=a(418),H=a.n(E),N=a(409),J=a.n(N),T=a(416),M=a.n(T),V=a(289),X=a.n(V),Z=a(288),q=a.n(Z),K=a(410),U=a.n(K),Y=a(411),G=a.n(Y),Q=a(413),$=a.n(Q),ee=a(414),te=a.n(ee),ae=a(415),re=a.n(ae),oe=a(419),ie=a.n(oe),ne=a(412),ce=a.n(ne),le=a(417),be=a.n(le),se=a(420),ue=a.n(se),de={Add:Object(r.forwardRef)((function(e,t){return Object(_.jsx)(W.a,Object(z.a)(Object(z.a)({},e),{},{ref:t}))})),Check:Object(r.forwardRef)((function(e,t){return Object(_.jsx)(J.a,Object(z.a)(Object(z.a)({},e),{},{ref:t}))})),Clear:Object(r.forwardRef)((function(e,t){return Object(_.jsx)(q.a,Object(z.a)(Object(z.a)({},e),{},{ref:t}))})),Delete:Object(r.forwardRef)((function(e,t){return Object(_.jsx)(U.a,Object(z.a)(Object(z.a)({},e),{},{ref:t}))})),DetailPanel:Object(r.forwardRef)((function(e,t){return Object(_.jsx)(X.a,Object(z.a)(Object(z.a)({},e),{},{ref:t}))})),Edit:Object(r.forwardRef)((function(e,t){return Object(_.jsx)(G.a,Object(z.a)(Object(z.a)({},e),{},{ref:t}))})),Export:Object(r.forwardRef)((function(e,t){return Object(_.jsx)(ce.a,Object(z.a)(Object(z.a)({},e),{},{ref:t}))})),Filter:Object(r.forwardRef)((function(e,t){return Object(_.jsx)($.a,Object(z.a)(Object(z.a)({},e),{},{ref:t}))})),FirstPage:Object(r.forwardRef)((function(e,t){return Object(_.jsx)(te.a,Object(z.a)(Object(z.a)({},e),{},{ref:t}))})),LastPage:Object(r.forwardRef)((function(e,t){return Object(_.jsx)(re.a,Object(z.a)(Object(z.a)({},e),{},{ref:t}))})),NextPage:Object(r.forwardRef)((function(e,t){return Object(_.jsx)(X.a,Object(z.a)(Object(z.a)({},e),{},{ref:t}))})),PreviousPage:Object(r.forwardRef)((function(e,t){return Object(_.jsx)(M.a,Object(z.a)(Object(z.a)({},e),{},{ref:t}))})),ResetSearch:Object(r.forwardRef)((function(e,t){return Object(_.jsx)(q.a,Object(z.a)(Object(z.a)({},e),{},{ref:t}))})),Search:Object(r.forwardRef)((function(e,t){return Object(_.jsx)(be.a,Object(z.a)(Object(z.a)({},e),{},{ref:t}))})),SortArrow:Object(r.forwardRef)((function(e,t){return Object(_.jsx)(H.a,Object(z.a)(Object(z.a)({},e),{},{ref:t}))})),ThirdStateCheck:Object(r.forwardRef)((function(e,t){return Object(_.jsx)(ie.a,Object(z.a)(Object(z.a)({},e),{},{ref:t}))})),ViewColumn:Object(r.forwardRef)((function(e,t){return Object(_.jsx)(ue.a,Object(z.a)(Object(z.a)({},e),{},{ref:t}))}))},je=Object(L.a)((function(e){return{card:{margin:e.spacing(20),display:"flex",flexDirection:"column",alignItems:"center"},form:{width:"100%",marginTop:e.spacing(3)},submit:{margin:e.spacing(3,0,2)},cardBottom:{marginBottom:20},Select:{height:45,width:350},button:{margin:e.spacing(1)},root:{"& > *":{margin:e.spacing(1)}},input:{display:"none"},error:{color:"#f85032",fontSize:"11px"},success:{color:"#4BB543 ",fontSize:"11px"}}})),fe=function(e){je();var t=Object(r.useState)(""),a=Object(b.a)(t,2),o=a[0];a[1];console.log(e);return Object(_.jsxs)("div",{children:[" ",Object(_.jsx)(R.a,{icons:de,title:"Database Backup History",columns:[{title:"File Name",field:"filename"},{title:"Action",field:"actions"}],isLoading:o,data:e.databaseBackup.map((function(e){return{filename:e,actions:Object(_.jsxs)(_.Fragment,{children:[Object(_.jsx)(A.a,{variant:"contained",startIcon:Object(_.jsx)(F.a,{size:"22"}),style:{backgroundColor:"rgb(153, 46, 98)",height:"30px",width:"130px"},onClick:function(){return function(e){console.log("download",e),p.a.get("".concat(g,"database/download/").concat(e),{headers:{Authorization:"Bearer ".concat(x)}}).then((function(e){return e})).catch((function(e){return console.log(e)}))}(e)},children:"Download"})," ",Object(_.jsx)(A.a,{variant:"contained",endIcon:Object(_.jsx)(P.a,{size:"22"}),style:{backgroundColor:"rgb(153, 46, 98)",height:"30px",width:"130px"},onClick:function(){return function(e){console.log("restore",e),p.a.get("".concat(g,"database/restore/").concat(e),{headers:{Authorization:"Bearer ".concat(x)}}).then((function(e){return e})).catch((function(e){return console.log(e)}))}(e)},children:"Restore"})]})}})),options:{headerStyle:{backgroundColor:"#014d88",color:"#fff",fontSize:"16px",padding:"10px"},searchFieldStyle:{width:"200%",margingLeft:"250px"},selection:!1,filtering:!1,exportButton:!1,searchFieldAlignment:"left",pageSizeOptions:[10,20,100],pageSize:10,debounceInterval:400}})]})},Oe=function(){var e=Object(r.useState)([]),t=Object(b.a)(e,2),a=t[0],o=t[1],i=function(){p.a.get("".concat(g,"database/backup-available"),{headers:{Authorization:"Bearer ".concat(x)}}).then((function(e){return o(e.data)}))};return Object(r.useEffect)((function(){i()}),[]),Object(_.jsx)(O.a,{maxWidth:"xl",children:Object(_.jsxs)(h.a,{container:!0,spacing:1,children:[Object(_.jsx)("br",{}),Object(_.jsx)(h.a,{item:!0,xs:12,md:12,children:Object(_.jsx)(B,{pullDatabaseBackup:i})}),Object(_.jsxs)(h.a,{item:!0,xs:12,md:12,children:[Object(_.jsx)("br",{}),Object(_.jsx)(fe,{databaseBackup:a})]})]})})},he={borderRadius:"2px",fontSize:14},ve=function(e){var t=Object(r.useState)("manifest-list"),a=Object(b.a)(t,2),o=a[0],i=a[1],n=Object(r.useState)({}),c=Object(b.a)(n,2),l=(c[0],c[1],e.location&&e.location.state?e.location.state:null),O=Object(r.useState)([]),h=Object(b.a)(O,2),v=(h[0],h[1]);return Object(r.useEffect)((function(){return p.a.get("".concat(g,"account"),{headers:{Authorization:"Bearer ".concat(x)}}).then((function(e){v(e.data.permissions)})).catch((function(e){})),i("backup")}),[l]),Object(_.jsx)(r.Fragment,{children:Object(_.jsx)(s.a,{children:Object(_.jsx)(u.a,{xl:12,children:Object(_.jsx)(d.a,{style:he,children:Object(_.jsx)(d.a.Body,{children:Object(_.jsx)("div",{className:"custom-tab-1",children:Object(_.jsx)(j.a,{id:"controlled-tab-example",activeKey:o,onSelect:function(e){return i(e)},className:"mb-3",children:Object(_.jsx)(f.a,{eventKey:"backup",title:"Database backup",children:Object(_.jsx)(Oe,{})})})})})})})})})};function pe(){return Object(_.jsxs)("div",{children:[Object(_.jsx)(l.a,{}),Object(_.jsx)(c.c,{children:Object(_.jsx)(c.a,{path:"/",children:Object(_.jsx)(ve,{})})})]})}var ge=a(286),xe=a(425),ye="ltr",me=[{typography:"poppins",version:"light",layout:"vertical",headerBg:"color_1",navheaderBg:"color_1",sidebarBg:"color_1",sidebarStyle:"full",sidebarPosition:"fixed",headerPosition:"fixed",containerLayout:"full",direction:ye},{typography:"poppins",version:"light",layout:"vertical",primary:"color_5",headerBg:"color_5",navheaderBg:"color_1",sidebarBg:"color_1",sidebarStyle:"full",sidebarPosition:"fixed",headerPosition:"fixed",containerLayout:"wide",direction:ye},{typography:"poppins",version:"light",layout:"vertical",navheaderBg:"color_11",headerBg:"color_1",sidebarBg:"color_11",sidebarStyle:"full",sidebarPosition:"fixed",headerPosition:"fixed",containerLayout:"wide",primary:"color_11",direction:ye},{typography:"poppins",version:"dark",layout:"vertical",headerBg:"color_3",navheaderBg:"color_3",sidebarBg:"color_1",sidebarStyle:"full",sidebarPosition:"fixed",headerPosition:"fixed",containerLayout:"wide",primary:"color_1",direction:ye},{typography:"poppins",version:"light",layout:"vertical",navheaderBg:"color_15",headerBg:"color_1",sidebarStyle:"full",sidebarBg:"color_1",sidebarPosition:"fixed",headerPosition:"fixed",containerLayout:"wide",primary:"color_15",direction:ye},{typography:"poppins",version:"light",layout:"horizontal",navheaderBg:"color_1",headerBg:"color_1",sidebarBg:"color_9",sidebarStyle:"modern",sidebarPosition:"static",headerPosition:"fixed",containerLayout:"wide",primary:"color_9",direction:ye}],we=Object(r.createContext)(),Se=function(e){var t=Object(r.useState)({value:"full",label:"Full"}),a=Object(b.a)(t,2),o=a[0],i=a[1],n=Object(r.useState)({value:"fixed",label:"Fixed"}),c=Object(b.a)(n,2),l=c[0],s=c[1],u=Object(r.useState)({value:"fixed",label:"Fixed"}),d=Object(b.a)(u,2),j=d[0],f=d[1],O=Object(r.useState)({value:"vertical",label:"Vertical"}),h=Object(b.a)(O,2),v=h[0],p=h[1],g=Object(r.useState)({value:"ltr",label:"LTR"}),x=Object(b.a)(g,2),y=x[0],m=x[1],w=Object(r.useState)("color_1"),S=Object(b.a)(w,2),B=S[0],A=S[1],k=Object(r.useState)("color_1"),P=Object(b.a)(k,2),z=P[0],C=P[1],R=Object(r.useState)("color_1"),L=Object(b.a)(R,2),I=L[0],F=L[1],D=Object(r.useState)("color_1"),W=Object(b.a)(D,2),E=W[0],H=W[1],N=Object(r.useState)(!1),J=Object(b.a)(N,2),T=J[0],M=J[1],V=Object(r.useState)(!1),X=Object(b.a)(V,2),Z=X[0],q=X[1],K=Object(r.useState)({value:"light",label:"Light"}),U=Object(b.a)(K,2),Y=U[0],G=U[1],Q=Object(r.useState)({value:"wide-boxed",label:"Wide Boxed"}),$=Object(b.a)(Q,2),ee=$[0],te=$[1],ae=document.querySelector("body"),re=Object(r.useState)(0),oe=Object(b.a)(re,2),ie=oe[0],ne=oe[1],ce=Object(r.useState)(0),le=Object(b.a)(ce,2),be=le[0],se=le[1],ue=function(e){A(e),ae.setAttribute("data-primary",e)},de=function(e){C(e),ae.setAttribute("data-nav-headerbg",e)},je=function(e){F(e),ae.setAttribute("data-headerbg",e)},fe=function(e){H(e),ae.setAttribute("data-sibebarbg",e)},Oe=function(e){s(e),ae.setAttribute("data-sidebar-position",e.value)},he=function(e){m(e),ae.setAttribute("direction",e.value);var t=document.querySelector("html");t.setAttribute("dir",e.value),t.className=e.value},ve=function(e){"horizontal"===e.value&&"overlay"===o.value?(p(e),ae.setAttribute("data-layout",e.value),i({value:"full",label:"Full"}),ae.setAttribute("data-sidebar-style","full")):(p(e),ae.setAttribute("data-layout",e.value))},pe=function(e){"horizontal"===v.value&&"overlay"===e.value?alert("Sorry! Overlay is not possible in Horizontal layout."):(i(e),M("icon-hover"===e.value?"_i-hover":""),ae.setAttribute("data-sidebar-style",e.value))},ge=function(e){f(e),ae.setAttribute("data-header-position",e.value)},xe=function(e){ae.setAttribute("data-theme-version",e.value),G(e)},ye=function(e){te(e),ae.setAttribute("data-container",e.value),"boxed"===e.value&&pe({value:"overlay",label:"Overlay"})};return Object(r.useEffect)((function(){var e=document.querySelector("body");e.setAttribute("data-typography","poppins"),e.setAttribute("data-theme-version","light"),e.setAttribute("data-layout","vertical"),e.setAttribute("data-primary","color_1"),e.setAttribute("data-nav-headerbg","color_1"),e.setAttribute("data-headerbg","color_1"),e.setAttribute("data-sidebar-style","overlay"),e.setAttribute("data-sibebarbg","color_1"),e.setAttribute("data-primary","color_1"),e.setAttribute("data-sidebar-position","fixed"),e.setAttribute("data-header-position","fixed"),e.setAttribute("data-container","wide"),e.setAttribute("direction","ltr");var t=function(){ne(window.innerWidth),se(window.innerHeight),window.innerWidth>=768&&window.innerWidth<1024?e.setAttribute("data-sidebar-style","mini"):window.innerWidth<=768?e.setAttribute("data-sidebar-style","overlay"):e.setAttribute("data-sidebar-style","full")};return t(),window.addEventListener("resize",t),function(){return window.removeEventListener("resize",t)}}),[]),Object(_.jsx)(we.Provider,{value:{body:ae,sideBarOption:[{value:"compact",label:"Compact"},{value:"full",label:"Full"},{value:"mini",label:"Mini"},{value:"modern",label:"Modern"},{value:"overlay",label:"Overlay"},{value:"icon-hover",label:"Icon-hover"}],layoutOption:[{value:"vertical",label:"Vertical"},{value:"horizontal",label:"Horizontal"}],backgroundOption:[{value:"light",label:"Light"},{value:"dark",label:"Dark"}],sidebarposition:l,headerPositions:[{value:"fixed",label:"Fixed"},{value:"static",label:"Static"}],containerPosition:[{value:"wide-boxed",label:"Wide Boxed"},{value:"boxed",label:"Boxed"},{value:"wide",label:"Wide"}],directionPosition:[{value:"ltr",label:"LTR"},{value:"rtl",label:"RTL"}],fontFamily:[{value:"poppins",label:"Poppins"},{value:"roboto",label:"Roboto"},{value:"cairo",label:"Cairo"},{value:"opensans",label:"Open Sans"},{value:"HelveticaNeue",label:"HelveticaNeue"}],primaryColor:B,navigationHader:z,windowWidth:ie,windowHeight:be,changePrimaryColor:ue,changeNavigationHader:de,changeSideBarStyle:pe,sideBarStyle:o,changeSideBarPostion:Oe,sidebarpositions:[{value:"fixed",label:"Fixed"},{value:"static",label:"Static"}],changeHeaderPostion:ge,headerposition:j,changeSideBarLayout:ve,sidebarLayout:v,changeDirectionLayout:he,changeContainerPosition:ye,direction:y,colors:["color_1","color_2","color_3","color_4","color_5","color_6","color_7","color_8","color_9","color_10","color_11","color_12","color_13","color_14","color_15"],haderColor:I,chnageHaderColor:je,chnageSidebarColor:fe,sidebarColor:E,iconHover:T,menuToggle:Z,openMenuToggle:function(){"overly"===o.value?q(!0):q(!1)},changeBackground:xe,background:Y,containerPosition_:ee,setDemoTheme:function(e,t){var a={},r=me[e];ae.setAttribute("data-typography",r.typography),a.value=r.version,xe(a),a.value=r.layout,ve(a),ue(r.primary),de(r.navheaderBg),je(r.headerBg),a.value=r.sidebarStyle,pe(a),fe(r.sidebarBg),a.value=r.sidebarPosition,Oe(a),a.value=r.headerPosition,ge(a),a.value=r.containerLayout,ye(a),a.value=t,he(a)}},children:e.children})};n.a.render(Object(_.jsx)(o.a.StrictMode,{children:Object(_.jsx)(xe.a,{children:Object(_.jsx)(ge.a,{basename:"/",children:Object(_.jsx)(Se,{children:Object(_.jsx)(pe,{})})})})}),document.getElementById("root"))}},[[537,1,2]]]);
//# sourceMappingURL=main.22684a17.chunk.js.map