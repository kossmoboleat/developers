(window.webpackJsonp=window.webpackJsonp||[]).push([[27,2],{1133:function(e,t){e.exports={"uport-connect":"MDEwOlJlcG9zaXRvcnk4MDU1NzkxOQ==","uport-credentials":"MDEwOlJlcG9zaXRvcnk3ODEzNzA3Nw==","uport-mobile":"MDEwOlJlcG9zaXRvcnkxNTUzNTcxMjE="}},721:function(e,t,n){"use strict";n.r(t),n.d(t,"query",function(){return M});var a=n(135),i=n.n(a),o=n(2),r=n.n(o),l=n(743),c=n.n(l),s=n(973),d=n.n(s),p=n(1076),m=n.n(p),g=n(790),u=n.n(g),h=(n(748),n(747)),f=n(750),x=(n(769),n(740)),E=(n(1133),n(770)),b=n(774),w=n(741);n(753);const v=x.c.div.withConfig({displayName:"releases__BodyGrid",componentId:"awof66-0"})(["height:100vh;display:grid;grid-template-rows:60px 1fr;",""],Object(w.g)("\n    display: flex;\n    flex-direction: column;\n    height: inherit;\n  ")),y=x.c.div.withConfig({displayName:"releases__BodyContainer",componentId:"awof66-1"})(["overflow-y:auto;overflow-x:hidden;justify-self:center;padding:",";padding-left:0;padding-right:0;width:100%;& > h1{color:",";}h2{margin-top:60px;}code{}"],e=>e.theme.sitePadding,e=>e.theme.accentDark),I=x.c.div.withConfig({displayName:"releases__HeaderContainer",componentId:"awof66-2"})(["background:'","';width:100vw;z-index:2;.Grid{width:90vw;margin:0 auto;}"],e=>e.theme.brand),k=x.c.div.withConfig({displayName:"releases__ToCContainer",componentId:"awof66-3"})(["grid-area:1 / 1 / 2 / 4;",""],Object(w.g)("display: none;")),C=(x.c.footer.withConfig({displayName:"releases__FooterContainer",componentId:"awof66-4"})(["background-color:#6c59cf;clear:all;"]),x.c.div.withConfig({displayName:"releases__RepoContainer",componentId:"awof66-5"})(["margin-top:60px;h1{font-size:18px;}h2{margin-top:0;margin-bottom:0;color:#5F5D68;}h3{color:#5F5D68;margin:40px 0 10px;}h2.repoName{font-size:20px;font-weight:800;}p.version{padding-top:20px;font-size:20px;font-weight:bold;color:#5F5D68;}h2 code{font-family:Nunito Sans;font-size:16px;}p{color:#5F5D68;font-size:16px;}ul{list-style:none;margin:10px 0 10px 30px;padding:0;li{margin:0 0 20px;padding-left:20px;position:relative;color:#5F5D68;}li::before{background-image:url(",');background-position:0 2px;background-repeat:no-repeat;background-size:contain;content:"";color:#62b482;height:20px;left:-15px;text-align:center;width:20px;position:absolute;top:0;}}'],u.a)),M="3603588163";t.default=class extends r.a.Component{constructor(...e){super(...e),i()(this,"getContentWindow",()=>this.contentWindow)}render(){let e=[{id:"releases",level:1}],t=[{headingId:"releases",text:"Releases",url:"/releases",isPathMatch:!1,innerLinks:[]}];return this.props.data.allSitePage.edges[0].node.context.tocRepos.map(n=>{let a=[],i=n.name.replace(/\s+/g,"-").toLowerCase().replace("uport-","u-port-");e.push({id:`${i}`,level:2}),n.releases.edges.map(t=>{let n="releases"===this.props.data.allSitePage.edges[0].node.context.slug?`/releases/${i}#${t.node.tag.name.replace(/\s+/g,"-").toLowerCase()}`:`#${t.node.tag.name.replace(/\s+/g,"-").toLowerCase()}`;e.push({id:`${t.node.tag.name.replace(/\s+/g,"-").toLowerCase()}`,level:3}),a.push({headingId:`${t.node.tag.name.replace(/\s+/g,"-").toLowerCase()}`,text:t.node.tag.name,url:n,isPathMatch:!1})}),t.push({headingId:`${i}`,text:`${n.name}`,url:`/releases/${i}`,isPathMatch:!1,innerLinks:a})}),r.a.createElement(h.a,{location:this.props.location},r.a.createElement("div",{className:"index-container"},r.a.createElement(c.a,{title:"Releases"}),r.a.createElement(v,null,r.a.createElement(I,{style:{backgroundColor:"rgb(92, 80, 202)"}},r.a.createElement(f.a,{activeSection:"",location:this.props.location})),r.a.createElement(y,{ref:e=>this.contentWindow=e},r.a.createElement(E.a,{data:this.props.data.annoucement}),r.a.createElement(w.b,null,r.a.createElement(w.c,null,r.a.createElement(k,null,r.a.createElement(b.a,{listItems:t,headings:e,getContentWindow:this.getContentWindow})),r.a.createElement(w.d,{span:1}),r.a.createElement(w.a,{span:7},this.props.data.allSitePage.edges[0].node.context.repositories.map(e=>{let t=`${e.name.replace(/\s+/g,"-").toLowerCase()}`;return t=t.replace("uport-","u-port-"),r.a.createElement(C,{key:t,className:"repository"},r.a.createElement("h2",{id:t,className:"repoName"},r.a.createElement("a",{href:`/releases/#${t}`,"aria-hidden":"true",className:"anchor"}),e.name),e.releases.edges.map(e=>r.a.createElement("div",{key:e.node.name},r.a.createElement("p",{id:e.node.tag.name,className:"version"},r.a.createElement("a",{href:`#${e.node.tag.name}`,"aria-hidden":"true",className:"anchor"}),e.node.name),r.a.createElement("div",{dangerouslySetInnerHTML:{__html:d()().use(m.a).processSync(e.node.description).toString()}}))))}))))))))}}},747:function(e,t,n){"use strict";var a=n(135),i=n.n(a),o=n(2),r=n.n(o),l=n(195),c=n(743),s=n.n(c),d=n(740),p=n(744),m=n.n(p);n(764),n(765),n(766),n(756),n(767);var g={brand:"#5c50ca",secondaryBrand:"#827cff",brandHighlight:"#7958d8",tocAccent:"rgba(230, 224, 248)",accent:"#ADD2EB",accentDark:"#35495E",lightGrey:"#F6F6F6",darkGrey:"#91a2a3",ink:"black",errorRed:"#FF6666",codeEditBlue:"#2973b7",codeEditGreen:"#42b983",themedWhite:"#FFF",contentWidthLaptop:"95ch",contentWidthTablet:"65ch",contentWidthLargePhone:"50vw",sitePadding:"25px",bobbysLeftMarginPreference:"15%",gregsLeftMarginPreference:"5%"};var u=()=>window.getSelection?window.getSelection().toString():document.selection?document.selection.createRange().text:"",h=n(745);t.a=Object(l.b)(void 0,e=>({getFlags(){e({type:"GET_FEATURE_FLAGS"})}}))(class extends r.a.Component{constructor(...e){super(...e),i()(this,"trackTextSelection",()=>{const e=e=>{if(e&&e.target&&e.target.getAttribute("data-do-not-track-copy"))return;const t=u();t&&Object(h.a)("Text Selected",{value:t})};document.addEventListener("mouseup",e,!1),document.addEventListener("keyup",e=>{e.keyCode||e.which},!1)})}componentDidMount(){this.props.getFlags(),this.trackTextSelection()}getLocalTitle(){const e=m.a.pathPrefix?m.a.pathPrefix:"/",t=this.props.location.pathname.replace(e,"").replace("/","");let n="";if(""===t)n="Home";else if("categories/"===t)n="Categories";else if("about/"===t)n="About";else if(t.includes("categories/")){const e=t.replace("categories/","").replace("/","").replace("-"," ");n=`${a=e,a.charAt(0).toUpperCase()+a.slice(1)}`}var a;return n}render(){const{children:e}=this.props;return r.a.createElement("div",null,r.a.createElement(s.a,null,r.a.createElement("title",null,`${m.a.siteTitle} |  ${this.getLocalTitle()}`),r.a.createElement("meta",{name:"description",content:m.a.siteDescription}),r.a.createElement("meta",{name:"viewport",content:"width=device-width, initial-scale=1"})),r.a.createElement(d.a,{theme:g},e))}})},748:function(e,t,n){"use strict";var a=n(2),i=n.n(a),o=n(743),r=n.n(o),l=n(744),c=n.n(l);t.a=class extends a.Component{render(){const{postNode:e,postPath:t,postSEO:n}=this.props;let a,o,l,s;if(n){const n=e.frontmatter;a=n.title,o=n.description?n.description:e.excerpt,s=c.a.siteUrl+c.a.pathPrefix+t}else a=c.a.siteTitle,o=c.a.siteDescription,l=c.a.siteLogo;const d="/"===c.a.pathPrefix?"":c.a.pathPrefix;l=c.a.siteUrl+d+l;const p=c.a.siteUrl+c.a.pathPrefix,m=[{"@context":"http://schema.org","@type":"WebSite",url:p,name:a,alternateName:c.a.siteTitleAlt?c.a.siteTitleAlt:""}];return n&&m.push([{"@context":"http://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,item:{"@id":s,name:a,image:l}}]},{"@context":"http://schema.org","@type":"BlogPosting",url:p,name:a,alternateName:c.a.siteTitleAlt?c.a.siteTitleAlt:"",headline:a,image:{"@type":"ImageObject",url:l},description:o}]),i.a.createElement(r.a,null,i.a.createElement("meta",{name:"description",content:o}),i.a.createElement("meta",{name:"image",content:l}),i.a.createElement("script",{type:"application/ld+json"},JSON.stringify(m)),i.a.createElement("meta",{property:"og:url",content:n?s:p}),n?i.a.createElement("meta",{property:"og:type",content:"article"}):null,i.a.createElement("meta",{property:"og:title",content:a}),i.a.createElement("meta",{property:"og:description",content:o}),i.a.createElement("meta",{property:"og:image",content:l}),i.a.createElement("meta",{property:"fb:app_id",content:c.a.siteFBAppID?c.a.siteFBAppID:""}),i.a.createElement("meta",{name:"twitter:card",content:"summary_large_image"}),i.a.createElement("meta",{name:"twitter:creator",content:c.a.userTwitter?c.a.userTwitter:""}),i.a.createElement("meta",{name:"twitter:title",content:a}),i.a.createElement("meta",{name:"twitter:description",content:o}),i.a.createElement("meta",{name:"twitter:image",content:l}))}}},753:function(e,t,n){},764:function(e,t,n){},765:function(e,t,n){},766:function(e,t,n){},767:function(e,t,n){},769:function(e,t,n){"use strict";var a=n(135),i=n.n(a),o=n(2),r=n.n(o),l=n(740),c=n(745),s=n(34);const d=l.c.section.withConfig({displayName:"Footer__FooterContainer",componentId:"c3snhb-0"})(["display:flex;flex-direction:column;padding-bottom:60px;h2{text-align:center;color:#fff;padding:40px 0 20px;}.footer-menu{color:#fff;padding:0 40px;h4{font-size:1.1em;}ul{padding-left:0;}li{padding:5px 0;}h4{text-transform:uppercase;}}.button-wrap .Grid-cell:last-child{margin-left:20px;}"]);t.a=class extends r.a.Component{constructor(...e){super(...e),i()(this,"track",(e,t={})=>()=>{Object(c.a)(e,{source:"Footer",...t})})}render(){return r.a.createElement(d,null,r.a.createElement("div",{className:"Grid Grid--gutters"},r.a.createElement("div",{className:"Grid-cell"},r.a.createElement("h2",null,"Join A Network Of Developers Building on uPort"))),r.a.createElement("div",{className:"Grid Grid--gutters button-wrap"},r.a.createElement("div",{className:"Grid-cell"},r.a.createElement("a",{href:"https://uport.zendesk.com/hc/en-us",onClick:this.track("Join The Community Clicked")},r.a.createElement("button",null,"Join The Community"))),r.a.createElement("div",{className:"Grid-cell"},r.a.createElement("a",{href:"https://github.com/uport-project",onClick:this.track("Github uPort Projects Opened")},r.a.createElement("button",null,"Explore uPort Projects")))),r.a.createElement("div",{className:"footer-menu-wrap Grid"},r.a.createElement("div",{className:"footer-menu Grid-cell"},r.a.createElement("h4",null,"Apps"),r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement("a",{href:"https://itunes.apple.com/us/app/uport-id/id1123434510",onClick:this.track("iTunes Opened")},"Wallet")))),r.a.createElement("div",{className:"footer-menu Grid-cell"},r.a.createElement("h4",null,"Platform"),r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(s.Link,{to:"/overview/index",onClick:this.track("Overview Clicked")},"Overview")),r.a.createElement("li",null,r.a.createElement(s.Link,{to:"/categories/specs",onClick:this.track("Specs Clicked")},"Protocols")))),r.a.createElement("div",{className:"footer-menu Grid-cell"},r.a.createElement("h4",null,"Guides"),r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(s.Link,{to:"/uport-connect/guides/usage",onClick:this.track("Connect Guide Clicked")},"Connect")),r.a.createElement("li",null,r.a.createElement(s.Link,{to:"/uport-credentials/guides/tutorial",onClick:this.track("Credentials Guide Clicked")},"Credentials")),r.a.createElement("li",null,r.a.createElement(s.Link,{to:"/uport-transports/guides/modules",onClick:this.track("Transports Guide Clicked")},"Transports")))),r.a.createElement("div",{className:"footer-menu Grid-cell"},r.a.createElement("h4",null,"About"),r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement("a",{href:"https://www.uport.me/job-listings",onClick:this.track("Job Listing Opened")},"Jobs (We're Hiring)")),r.a.createElement("li",null,r.a.createElement("a",{href:"https://consensys.net",onClick:this.track("ConsenSys Website Opened")},"ConsenSys"))))))}}},770:function(e,t,n){"use strict";var a=n(135),i=n.n(a),o=n(2),r=n.n(o),l=n(751),c=n.n(l),s=n(740),d=n(741);t.a=class extends o.Component{constructor(){super(),i()(this,"init",()=>{const e=this.container.getBoundingClientRect();this.containerHeight=e.bottom-e.top,setTimeout(()=>{this.setState({expanded:!0})},1e3)}),i()(this,"dismiss",()=>{this.setState({expanded:!1}),setTimeout(()=>{this.setState({visible:!1})},200)}),this.state={expanded:!1,visible:!0}}componentDidMount(){this.container&&this.init()}componentDidUpdate(){this.container&&!this.containerHeight&&this.init()}render(){const{data:e={},type:t}=this.props,{visible:n,expanded:a}=this.state,{announcement:i}=e,o=[];return i&&i.edges.forEach((e,t)=>{o.push({content:r.a.createElement("h3",{key:t},r.a.createElement(c.a,{text:`${e.node.frontmatter.announcement}`,linkProps:{target:"_blank"}})),type:e.node.frontmatter.announcementType})}),n&&o.length?r.a.createElement(m,{ref:e=>this.container=e,expanded:a,type:o[o.length-1].type,_height:this.containerHeight},r.a.createElement("div",null,o[o.length-1].content),r.a.createElement(g,{onClick:this.dismiss},"×")):null}};const p={positive:"\n    background-color: #e1ebe7;\n    border-color: #3cba7f;\n    color: #3cba7f;\n  ",negative:"\n    background-color: #fbedf0;\n    border-color: #d63a59;\n    color: #d63a59;\n  "},m=s.c.aside.withConfig({displayName:"Announcement__Container",componentId:"sc-1gijrgp-0"})(["align-self:start;display:grid;grid-template-columns:1fr 50px;margin-top:-60px;overflow:hidden;position:static;text-align:center;transition:margin-top 0.2s,visibility 0.5s;visibility:hidden;width:100vw;z-index:1;"," "," "," h3{padding:0 10px;}"],e=>e.expanded?"\n      margin-top: 0;\n      visibility: visible;\n    ":"",e=>e._height?`\n      ${Object(d.f)(`\n        margin-bottom: ${e._height}px;\n      `)}\n    `:Object(d.f)("margin-bottom: 60px;"),e=>p[e.type]||p.positive),g=s.c.button.withConfig({displayName:"Announcement__Dismiss",componentId:"sc-1gijrgp-1"})(["background-color:transparent;font-size:1.5em;"])},774:function(e,t,n){"use strict";n.d(t,"a",function(){return m});var a=n(135),i=n.n(a),o=n(2),r=n.n(o),l=n(6),c=n.n(l),s=n(34),d=n(740),p=n(741);class m extends r.a.Component{constructor(e){super(e),i()(this,"highlightActiveLink",()=>{const e=this.props.getContentWindow();if(!e)return;let t=this.props.headings.map(e=>({...e,id:e.id&&e.id.replace("uport-","u-port-").replace("--","-")}));for(let i=0;i<t.length;i++){const n=document.getElementById(t[i].id);if(!n)continue;const a=n.getBoundingClientRect();t[i].isInView=a.top>=0&&a.left>=0&&a.bottom<=(window.innerHeight||document.documentElement.clientHeight),t[i].hasScrolledPast=n.offsetTop<e.scrollTop}let n=-1;for(let i=0;i<t.length;i++)if(t[i].isInView){t[i].active=!0,n=i;break}if(-1==n)for(let i=t.length-1;i>=0;i--)if(t[i].hasScrolledPast){t[i].active=!0,n=i;break}if(n>-1){let e=t[n].level;for(let a=n-1;a>=0;a--)t[a].level>=e?t[a].active=!1:(e=t[a].level,t[a].active=!0);for(let a=n+1;a<t.length;a++)t[a].active=!1}const a=t.filter(e=>e.active).map(e=>e.id);this.state.activeHeadings.join("|")!=a.join("|")&&this.setState({activeHeadings:a})}),this.state={activeHeadings:[]}}componentDidMount(){this.container.getBoundingClientRect().width&&(this.intv=setInterval(this.highlightActiveLink,200))}componentWillUnmount(){this.intv&&clearInterval(this.intv)}render(){const{listItems:e}=this.props,{activeHeadings:t}=this.state,n=e[0].text.replace(/u-?port/gi,"uPort"),a=e.map(e=>{const n=e.innerLinks.map(e=>{const n=Boolean(t.find(t=>t==e.headingId));return r.a.createElement("li",{key:e.text},r.a.createElement(f,null,r.a.createElement("a",{href:e.url},r.a.createElement("h6",{className:`${n?"active":""}`},e.text.replace(/u-?port/gi,"uPort")))))}),a=t.find(t=>t===e.headingId)||e.isPathMatch;return r.a.createElement("li",{key:`${e.url}`},r.a.createElement(s.Link,{to:`${e.url}`},r.a.createElement("span",null,r.a.createElement("h5",{className:`tocHeading ${a?"active":""}`},e.text.replace(/u-?port/gi,"uPort")))),n.length?r.a.createElement("ul",{className:"chapterItems"},n):null)});return r.a.createElement(g,{id:"toc",ref:e=>this.container=e},r.a.createElement(u,null,n),r.a.createElement(h,null,r.a.createElement("ul",null,a)))}}m.propTypes={getContentWindow:c.a.func.isRequired,headings:c.a.arrayOf(c.a.shape({id:c.a.string.isRequired,level:c.a.number.isRequired})).isRequired,listItems:c.a.arrayOf(c.a.shape({headingId:c.a.string.isRequired,text:c.a.string.isRequired,url:c.a.string.isRequired,isPathMatch:c.a.bool.isRequired,innerLinks:c.a.arrayOf(c.a.shape({headingId:c.a.string.isRequired,text:c.a.string.isRequired,url:c.a.string.isRequired,isPathMatch:c.a.bool.isRequired}))})).isRequired};const g=d.c.div.withConfig({displayName:"TableOfContentsUI__TableOfContentsContainer",componentId:"sc-14mamby-0"})(["padding:40px 0;position:fixed;ul{list-style:none;margin:0;padding:0;li{margin:0;}li::before{all:initial;background-image:none;list-style:none;}li:first-child .tocHeading{display:none;}}.chapterItems{list-style:none;padding:0;margin-left:40px;}a{text-decoration:none;}p,h6{display:inline-block;font-weight:400;font-size:14px;margin-bottom:8px;}h5{font-size:14px;font-weight:bold;padding-left:20px;}h5.active,.tocHeading.active{background-color:#D3D4F8;border-radius:4px;color:",";font-size:14px;font-weight:bold;padding:15px 20px;}h5:hover{color:",";}h6.active{color:",";}.tocHeading{font-weight:400;color:",";margin-top:25px;font-size:14px;}",""],e=>e.theme.brandHighlight,e=>e.theme.brandHighlight,e=>e.theme.secondaryBrand,e=>e.theme.darkGrey,Object(p.g)("display: none;")),u=d.c.div.withConfig({displayName:"TableOfContentsUI__Title",componentId:"sc-14mamby-1"})(["background-color:#F2F3F9;border-radius:4px 4px 0 0;color:#5C50CA;font-size:20px;font-weight:800;max-width:320px;padding:30px 20px 10px 40px;width:21vw;"]),h=d.c.div.withConfig({displayName:"TableOfContentsUI__Scrollpane",componentId:"sc-14mamby-2"})(["background-color:#F2F3F9;border:solid 4px #F2F3F9;border-radius:0 0 4px 4px;max-height:calc(70vh - 60px);max-width:320px;overflow-x:hidden;overflow-y:auto;padding:10px 20px 30px;width:21vw;::-webkit-scrollbar{width:2px;}::-webkit-scrollbar-thumb{background:",";}"],e=>e.theme.tocAccent),f=d.c.div.withConfig({displayName:"TableOfContentsUI__ContentContainer",componentId:"sc-14mamby-3"})(["h6,p{color:",";}li{margin-left:-10px;}&:hover{li{span{border-bottom:1px solid ",";}}}"],e=>e.theme.darkGrey,e=>e.theme.tocAccent)},790:function(e,t){e.exports="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkiIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxOSAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGxpbmUgeDE9IjQuNTMwMzMiIHkxPSI3LjQ2OTY3IiB4Mj0iOC41OTMyMSIgeTI9IjExLjUzMjYiIHN0cm9rZT0iIzYyYjQ4MiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz4KPGxpbmUgeDE9IjE3LjUzMDMiIHkxPSIxLjUzMDMzIiB4Mj0iNy45NDIzOSIgeTI9IjExLjExODMiIHN0cm9rZT0iIzYyYjQ4MiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNS41IDguNUMxNS41IDEyLjM2NiAxMi4zNjYyIDE1LjUgOC41IDE1LjVDNC42MzM3OSAxNS41IDEuNSAxMi4zNjYgMS41IDguNUMxLjUgNC42MzQwMyA0LjYzMzc5IDEuNSA4LjUgMS41QzkuOTA4NjkgMS41IDExLjIxOTcgMS45MTYwMiAxMi4zMTc5IDIuNjMxODRMMTMuMzk3NSAxLjU1MkMxMi4wMTMyIDAuNTc0MjE5IDEwLjMyMzcgMCA4LjUgMEMzLjgwNTY2IDAgMCAzLjgwNTY2IDAgOC41QzAgMTMuMTk0MyAzLjgwNTY2IDE3IDguNSAxN0MxMy4xOTQzIDE3IDE3IDEzLjE5NDMgMTcgOC41QzE3IDcuODYwODQgMTYuOTI5NyA3LjIzODI4IDE2Ljc5NTkgNi42Mzk0TDE1LjQ3OSA3Ljk1NTgxQzE1LjQ5MjcgOC4xMzUyNSAxNS41IDguMzE2ODkgMTUuNSA4LjVaIiBmaWxsPSIjNjJiNDgyIi8+Cjwvc3ZnPgo="}}]);
//# sourceMappingURL=component---src-templates-releases-jsx-453cf70a3544d247a383.js.map