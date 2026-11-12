var _t=globalThis,vt=_t.ShadowRoot&&(_t.ShadyCSS===void 0||_t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ct=Symbol(),te=new WeakMap,rt=class{constructor(t,e,a){if(this._$cssResult$=!0,a!==Ct)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(vt&&t===void 0){let a=e!==void 0&&e.length===1;a&&(t=te.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),a&&te.set(e,t))}return t}toString(){return this.cssText}},ee=i=>new rt(typeof i=="string"?i:i+"",void 0,Ct),it=(i,...t)=>{let e=i.length===1?i[0]:t.reduce((a,r,s)=>a+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+i[s+1],i[0]);return new rt(e,i,Ct)},ae=(i,t)=>{if(vt)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let a=document.createElement("style"),r=_t.litNonce;r!==void 0&&a.setAttribute("nonce",r),a.textContent=e.cssText,i.appendChild(a)}},zt=vt?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(let a of t.cssRules)e+=a.cssText;return ee(e)})(i):i;var{is:Re,defineProperty:Oe,getOwnPropertyDescriptor:Ne,getOwnPropertyNames:Le,getOwnPropertySymbols:Ie,getPrototypeOf:qe}=Object,T=globalThis,re=T.trustedTypes,De=re?re.emptyScript:"",Fe=T.reactiveElementPolyfillSupport,st=(i,t)=>i,Tt={toAttribute(i,t){switch(t){case Boolean:i=i?De:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},se=(i,t)=>!Re(i,t),ie={attribute:!0,type:String,converter:Tt,reflect:!1,useDefault:!1,hasChanged:se};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),T.litPropertyMetadata??(T.litPropertyMetadata=new WeakMap);var M=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=ie){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let a=Symbol(),r=this.getPropertyDescriptor(t,a,e);r!==void 0&&Oe(this.prototype,t,r)}}static getPropertyDescriptor(t,e,a){let{get:r,set:s}=Ne(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:r,set(n){let l=r?.call(this);s?.call(this,n),this.requestUpdate(t,l,a)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ie}static _$Ei(){if(this.hasOwnProperty(st("elementProperties")))return;let t=qe(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(st("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(st("properties"))){let e=this.properties,a=[...Le(e),...Ie(e)];for(let r of a)this.createProperty(r,e[r])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[a,r]of e)this.elementProperties.set(a,r)}this._$Eh=new Map;for(let[e,a]of this.elementProperties){let r=this._$Eu(e,a);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let a=new Set(t.flat(1/0).reverse());for(let r of a)e.unshift(zt(r))}else t!==void 0&&e.push(zt(t));return e}static _$Eu(t,e){let a=e.attribute;return a===!1?void 0:typeof a=="string"?a:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let a of e.keys())this.hasOwnProperty(a)&&(t.set(a,this[a]),delete this[a]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ae(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,a){this._$AK(t,a)}_$ET(t,e){let a=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,a);if(r!==void 0&&a.reflect===!0){let s=(a.converter?.toAttribute!==void 0?a.converter:Tt).toAttribute(e,a.type);this._$Em=t,s==null?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(t,e){let a=this.constructor,r=a._$Eh.get(t);if(r!==void 0&&this._$Em!==r){let s=a.getPropertyOptions(r),n=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:Tt;this._$Em=r;let l=n.fromAttribute(e,s.type);this[r]=l??this._$Ej?.get(r)??l,this._$Em=null}}requestUpdate(t,e,a,r=!1,s){if(t!==void 0){let n=this.constructor;if(r===!1&&(s=this[t]),a??(a=n.getPropertyOptions(t)),!((a.hasChanged??se)(s,e)||a.useDefault&&a.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,a))))return;this.C(t,e,a)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:a,reflect:r,wrapped:s},n){a&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,n??e??this[t]),s!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||a||(e=void 0),this._$AL.set(t,e)),r===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[r,s]of this._$Ep)this[r]=s;this._$Ep=void 0}let a=this.constructor.elementProperties;if(a.size>0)for(let[r,s]of a){let{wrapped:n}=s,l=this[r];n!==!0||this._$AL.has(r)||l===void 0||this.C(r,void 0,s,l)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(a=>a.hostUpdate?.()),this.update(e)):this._$EM()}catch(a){throw t=!1,this._$EM(),a}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};M.elementStyles=[],M.shadowRootOptions={mode:"open"},M[st("elementProperties")]=new Map,M[st("finalized")]=new Map,Fe?.({ReactiveElement:M}),(T.reactiveElementVersions??(T.reactiveElementVersions=[])).push("2.1.2");var ot=globalThis,ne=i=>i,yt=ot.trustedTypes,oe=yt?yt.createPolicy("lit-html",{createHTML:i=>i}):void 0,ue="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,me="?"+P,Ve=`<${me}>`,F=document,lt=()=>F.createComment(""),ht=i=>i===null||typeof i!="object"&&typeof i!="function",It=Array.isArray,He=i=>It(i)||typeof i?.[Symbol.iterator]=="function",Pt=`[ 	
\f\r]`,nt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,le=/-->/g,he=/>/g,q=RegExp(`>|${Pt}(?:([^\\s"'>=/]+)(${Pt}*=${Pt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ce=/'/g,de=/"/g,ge=/^(?:script|style|textarea|title)$/i,qt=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),h=qt(1),m=qt(2),ha=qt(3),C=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),pe=new WeakMap,D=F.createTreeWalker(F,129);function be(i,t){if(!It(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return oe!==void 0?oe.createHTML(t):t}var Be=(i,t)=>{let e=i.length-1,a=[],r,s=t===2?"<svg>":t===3?"<math>":"",n=nt;for(let l=0;l<e;l++){let o=i[l],p,d,u=-1,g=0;for(;g<o.length&&(n.lastIndex=g,d=n.exec(o),d!==null);)g=n.lastIndex,n===nt?d[1]==="!--"?n=le:d[1]!==void 0?n=he:d[2]!==void 0?(ge.test(d[2])&&(r=RegExp("</"+d[2],"g")),n=q):d[3]!==void 0&&(n=q):n===q?d[0]===">"?(n=r??nt,u=-1):d[1]===void 0?u=-2:(u=n.lastIndex-d[2].length,p=d[1],n=d[3]===void 0?q:d[3]==='"'?de:ce):n===de||n===ce?n=q:n===le||n===he?n=nt:(n=q,r=void 0);let x=n===q&&i[l+1].startsWith("/>")?" ":"";s+=n===nt?o+Ve:u>=0?(a.push(p),o.slice(0,u)+ue+o.slice(u)+P+x):o+P+(u===-2?l:x)}return[be(i,s+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),a]},ct=class i{constructor({strings:t,_$litType$:e},a){let r;this.parts=[];let s=0,n=0,l=t.length-1,o=this.parts,[p,d]=Be(t,e);if(this.el=i.createElement(p,a),D.currentNode=this.el.content,e===2||e===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(r=D.nextNode())!==null&&o.length<l;){if(r.nodeType===1){if(r.hasAttributes())for(let u of r.getAttributeNames())if(u.endsWith(ue)){let g=d[n++],x=r.getAttribute(u).split(P),b=/([.?@])?(.*)/.exec(g);o.push({type:1,index:s,name:b[2],strings:x,ctor:b[1]==="."?Rt:b[1]==="?"?Ot:b[1]==="@"?Nt:Y}),r.removeAttribute(u)}else u.startsWith(P)&&(o.push({type:6,index:s}),r.removeAttribute(u));if(ge.test(r.tagName)){let u=r.textContent.split(P),g=u.length-1;if(g>0){r.textContent=yt?yt.emptyScript:"";for(let x=0;x<g;x++)r.append(u[x],lt()),D.nextNode(),o.push({type:2,index:++s});r.append(u[g],lt())}}}else if(r.nodeType===8)if(r.data===me)o.push({type:2,index:s});else{let u=-1;for(;(u=r.data.indexOf(P,u+1))!==-1;)o.push({type:7,index:s}),u+=P.length-1}s++}}static createElement(t,e){let a=F.createElement("template");return a.innerHTML=t,a}};function W(i,t,e=i,a){if(t===C)return t;let r=a!==void 0?e._$Co?.[a]:e._$Cl,s=ht(t)?void 0:t._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),s===void 0?r=void 0:(r=new s(i),r._$AT(i,e,a)),a!==void 0?(e._$Co??(e._$Co=[]))[a]=r:e._$Cl=r),r!==void 0&&(t=W(i,r._$AS(i,t.values),r,a)),t}var Ut=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:a}=this._$AD,r=(t?.creationScope??F).importNode(e,!0);D.currentNode=r;let s=D.nextNode(),n=0,l=0,o=a[0];for(;o!==void 0;){if(n===o.index){let p;o.type===2?p=new dt(s,s.nextSibling,this,t):o.type===1?p=new o.ctor(s,o.name,o.strings,this,t):o.type===6&&(p=new Lt(s,this,t)),this._$AV.push(p),o=a[++l]}n!==o?.index&&(s=D.nextNode(),n++)}return D.currentNode=F,r}p(t){let e=0;for(let a of this._$AV)a!==void 0&&(a.strings!==void 0?(a._$AI(t,a,e),e+=a.strings.length-2):a._$AI(t[e])),e++}},dt=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,a,r){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=a,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=W(this,t,e),ht(t)?t===c||t==null||t===""?(this._$AH!==c&&this._$AR(),this._$AH=c):t!==this._$AH&&t!==C&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):He(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==c&&ht(this._$AH)?this._$AA.nextSibling.data=t:this.T(F.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:a}=t,r=typeof a=="number"?this._$AC(t):(a.el===void 0&&(a.el=ct.createElement(be(a.h,a.h[0]),this.options)),a);if(this._$AH?._$AD===r)this._$AH.p(e);else{let s=new Ut(r,this),n=s.u(this.options);s.p(e),this.T(n),this._$AH=s}}_$AC(t){let e=pe.get(t.strings);return e===void 0&&pe.set(t.strings,e=new ct(t)),e}k(t){It(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,a,r=0;for(let s of t)r===e.length?e.push(a=new i(this.O(lt()),this.O(lt()),this,this.options)):a=e[r],a._$AI(s),r++;r<e.length&&(this._$AR(a&&a._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let a=ne(t).nextSibling;ne(t).remove(),t=a}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Y=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,a,r,s){this.type=1,this._$AH=c,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=s,a.length>2||a[0]!==""||a[1]!==""?(this._$AH=Array(a.length-1).fill(new String),this.strings=a):this._$AH=c}_$AI(t,e=this,a,r){let s=this.strings,n=!1;if(s===void 0)t=W(this,t,e,0),n=!ht(t)||t!==this._$AH&&t!==C,n&&(this._$AH=t);else{let l=t,o,p;for(t=s[0],o=0;o<s.length-1;o++)p=W(this,l[a+o],e,o),p===C&&(p=this._$AH[o]),n||(n=!ht(p)||p!==this._$AH[o]),p===c?t=c:t!==c&&(t+=(p??"")+s[o+1]),this._$AH[o]=p}n&&!r&&this.j(t)}j(t){t===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Rt=class extends Y{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===c?void 0:t}},Ot=class extends Y{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==c)}},Nt=class extends Y{constructor(t,e,a,r,s){super(t,e,a,r,s),this.type=5}_$AI(t,e=this){if((t=W(this,t,e,0)??c)===C)return;let a=this._$AH,r=t===c&&a!==c||t.capture!==a.capture||t.once!==a.once||t.passive!==a.passive,s=t!==c&&(a===c||r);r&&this.element.removeEventListener(this.name,this,a),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Lt=class{constructor(t,e,a){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=a}get _$AU(){return this._$AM._$AU}_$AI(t){W(this,t)}};var je=ot.litHtmlPolyfillSupport;je?.(ct,dt),(ot.litHtmlVersions??(ot.litHtmlVersions=[])).push("3.3.3");var fe=(i,t,e)=>{let a=e?.renderBefore??t,r=a._$litPart$;if(r===void 0){let s=e?.renderBefore??null;a._$litPart$=r=new dt(t.insertBefore(lt(),s),s,void 0,e??{})}return r._$AI(i),r};var pt=globalThis,A=class extends M{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=fe(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return C}};A._$litElement$=!0,A.finalized=!0,pt.litElementHydrateSupport?.({LitElement:A});var Ke=pt.litElementPolyfillSupport;Ke?.({LitElement:A});(pt.litElementVersions??(pt.litElementVersions=[])).push("4.2.2");var _e={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ve=i=>(...t)=>({_$litDirective$:i,values:t}),xt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,a){this._$Ct=t,this._$AM=e,this._$Ci=a}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var ye="important",We=" !"+ye,V=ve(class extends xt{constructor(i){if(super(i),i.type!==_e.ATTRIBUTE||i.name!=="style"||i.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(i){return Object.keys(i).reduce((t,e)=>{let a=i[e];return a==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${a};`},"")}update(i,[t]){let{style:e}=i.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let a of this.ft)t[a]==null&&(this.ft.delete(a),a.includes("-")?e.removeProperty(a):e[a]=null);for(let a in t){let r=t[a];if(r!=null){this.ft.add(a);let s=typeof r=="string"&&r.endsWith(We);a.includes("-")||s?e.setProperty(a,s?r.slice(0,-11):r,s?ye:""):e[a]=r}}return C}});var xe=it`
  :host {
    display: block;
    --hm-radius: 26px;
    --hm-a1: #2ee6c5;
    --hm-a2: #7b5cff;
    --hm-a1-rgb: 46, 230, 197;
    --hm-a2-rgb: 123, 92, 255;
    --hm-glow-rgb: 46, 230, 197;
    color-scheme: dark;
  }

  .hm-card {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    border-radius: var(--hm-radius);
    container-type: inline-size;
    color: #f6f8ff;
    background: var(--hm-base, #050a12);
    border: 1px solid rgba(255, 255, 255, 0.09);
    box-shadow:
      0 26px 60px -24px rgba(0, 0, 0, 0.85),
      0 2px 0 rgba(255, 255, 255, 0.04) inset,
      0 0 0 1px rgba(0, 0, 0, 0.35);
    font-family: var(
      --hm-font,
      "SF Pro Display",
      "PingFang SC",
      "HarmonyOS Sans SC",
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      "Helvetica Neue",
      Arial,
      "Noto Sans SC",
      sans-serif
    );
    -webkit-tap-highlight-color: transparent;
    transition: box-shadow 0.3s ease;
  }

  .hm-card:hover {
    box-shadow:
      0 30px 70px -24px rgba(0, 0, 0, 0.9),
      0 2px 0 rgba(255, 255, 255, 0.05) inset,
      0 0 40px -16px rgba(var(--hm-a1-rgb), 0.45);
  }

  /* ---------- 背景层 ---------- */
  .hm-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    overflow: hidden;
    pointer-events: none;
  }

  .hm-bg-art {
    position: absolute;
    inset: -18%;
    background-size: cover;
    background-position: center;
    filter: blur(42px) saturate(1.65) brightness(0.55);
    opacity: 0;
    transform: scale(1.12);
    transition: opacity 0.8s ease;
  }

  .hm-bg-art.on {
    opacity: 0.62;
  }

  .hm-bg-grad {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(
        72% 62% at 16% 4%,
        rgba(var(--hm-glow-rgb), 0.34),
        transparent 64%
      ),
      radial-gradient(
        70% 66% at 94% 98%,
        rgba(var(--hm-a2-rgb), 0.26),
        transparent 62%
      ),
      linear-gradient(
        180deg,
        rgba(5, 7, 12, 0.16) 0%,
        rgba(5, 7, 12, 0.62) 58%,
        rgba(3, 4, 8, 0.92) 100%
      );
  }

  .hm-grid {
    position: absolute;
    inset: 0;
    opacity: 0;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.085) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.085) 1px, transparent 1px);
    background-size: 34px 34px;
    mask-image: radial-gradient(
      80% 72% at 48% 38%,
      #000 0%,
      rgba(0, 0, 0, 0.5) 46%,
      transparent 80%
    );
    transition: opacity 0.4s ease;
  }

  .hm-card[data-theme="cyber"] .hm-grid {
    opacity: 0.55;
    animation: hmGridDrift 14s linear infinite;
  }

  .hm-noise {
    position: absolute;
    inset: 0;
    opacity: 0.09;
    mix-blend-mode: overlay;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
  }

  .hm-sheen {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(
        110% 62% at 22% -18%,
        rgba(255, 255, 255, 0.2),
        transparent 58%
      ),
      linear-gradient(
        120deg,
        rgba(255, 255, 255, 0.06) 0%,
        transparent 32%
      );
    opacity: 0.85;
  }

  /* ---------- 内容骨架 ---------- */
  .hm-body {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: clamp(8px, 2.4cqi, 16px);
    padding: clamp(12px, 3.2cqi, 20px);
    height: 100%;
    box-sizing: border-box;
    max-width: 760px;
    margin: 0 auto;
    width: 100%;
  }

  .hm-card[data-layout="mini"] .hm-body {
    padding: 10px 12px;
    gap: 8px;
    max-width: none;
  }

  /* ---------- 顶栏 ---------- */
  .hm-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    min-height: 26px;
  }

  .hm-status {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(246, 248, 255, 0.56);
    white-space: nowrap;
  }

  .hm-dot {
    flex: 0 0 auto;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(246, 248, 255, 0.32);
    transition: background 0.3s ease, box-shadow 0.3s ease;
  }

  .hm-card[data-playing="true"] .hm-dot {
    background: var(--hm-a1);
    box-shadow: 0 0 12px rgba(var(--hm-a1-rgb), 0.95);
    animation: hmPulse 2s ease-in-out infinite;
  }

  .hm-status-text {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .hm-top-actions {
    display: flex;
    align-items: center;
    gap: 6px;
    flex: 0 0 auto;
  }

  .hm-icon-btn {
    display: grid;
    place-items: center;
    width: 30px;
    height: 30px;
    padding: 0;
    border-radius: 11px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.055);
    color: rgba(246, 248, 255, 0.78);
    cursor: pointer;
    transition:
      background 0.18s ease,
      color 0.18s ease,
      border-color 0.18s ease,
      transform 0.18s ease;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  .hm-ma {
    font-size: 9.5px;
    font-weight: 800;
    letter-spacing: 0.04em;
    color: rgb(var(--hm-a1-rgb));
    border-color: rgba(var(--hm-a1-rgb), 0.4);
    background: rgba(var(--hm-a1-rgb), 0.1);
    box-shadow: 0 0 10px -4px rgba(var(--hm-a1-rgb), 0.6);
  }

  .hm-icon-btn:hover {
    background: rgba(255, 255, 255, 0.13);
    border-color: rgba(255, 255, 255, 0.18);
    color: #fff;
    transform: translateY(-1px);
  }

  .hm-icon-btn:active {
    transform: scale(0.94);
  }

  .hm-icon-btn:focus-visible,
  .hm-play:focus-visible,
  .hm-btn:focus-visible,
  .hm-range:focus-visible {
    outline: 2px solid rgba(var(--hm-a1-rgb), 0.85);
    outline-offset: 2px;
  }

  .hm-icon-btn[data-on="true"] {
    color: var(--hm-a1);
    border-color: rgba(var(--hm-a1-rgb), 0.4);
    background: rgba(var(--hm-a1-rgb), 0.12);
  }

  /* ---------- 主区 ---------- */
  .hm-main {
    display: grid;
    grid-template-columns: clamp(104px, 31cqi, 178px) minmax(0, 1fr);
    align-items: center;
    gap: clamp(12px, 3.4cqi, 22px);
    min-height: 0;
  }

  .hm-cover {
    position: relative;
    display: block;
    width: 100%;
    aspect-ratio: 1 / 1;
    padding: 0;
    border: 1px solid rgba(255, 255, 255, 0.16);
    border-radius: 20px;
    overflow: hidden;
    background:
      linear-gradient(
        150deg,
        rgba(var(--hm-a2-rgb), 0.55),
        rgba(var(--hm-a1-rgb), 0.26) 60%,
        rgba(10, 12, 20, 0.9)
      );
    box-shadow:
      0 18px 38px -14px rgba(0, 0, 0, 0.9),
      inset 0 1px 0 rgba(255, 255, 255, 0.22);
    cursor: pointer;
    transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .hm-cover:hover {
    transform: translateY(-2px) scale(1.008);
  }

  .hm-cover img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .hm-cover .hm-cover-ph {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    color: rgba(255, 255, 255, 0.72);
  }

  .hm-cover .hm-cover-ph svg {
    width: 34%;
    height: 34%;
    opacity: 0.9;
    filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.4));
  }

  .hm-cover::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.18) 0%,
      transparent 26%,
      transparent 68%,
      rgba(0, 0, 0, 0.4) 100%
    );
    pointer-events: none;
  }

  .hm-cover-halo {
    position: absolute;
    left: 50%;
    bottom: -30px;
    width: 76%;
    height: 56px;
    translate: -50% 0;
    background: radial-gradient(
      50% 100% at 50% 0%,
      rgba(var(--hm-a1-rgb), 0.42),
      transparent 72%
    );
    filter: blur(14px);
    pointer-events: none;
  }

  .hm-cover[data-playing="true"]::before {
    content: "";
    position: absolute;
    inset: -1px;
    border-radius: 20px;
    padding: 1px;
    background: conic-gradient(
      from 0deg,
      rgba(var(--hm-a1-rgb), 0),
      rgba(var(--hm-a1-rgb), 0.9),
      rgba(var(--hm-a2-rgb), 0.9),
      rgba(var(--hm-a1-rgb), 0)
    );
    -webkit-mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    animation: hmSpin 8s linear infinite;
    pointer-events: none;
  }

  .hm-meta {
    display: flex;
    flex-direction: column;
    gap: 5px;
    min-width: 0;
  }

  .hm-kicker {
    display: flex;
    align-items: center;
    gap: 6px;
    min-height: 14px;
    font-size: 10.5px;
    font-weight: 650;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(var(--hm-a1-rgb), 0.95);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-shadow: 0 0 18px rgba(var(--hm-a1-rgb), 0.35);
  }

  .hm-kicker .hm-kicker-sep {
    color: rgba(255, 255, 255, 0.3);
    letter-spacing: 0;
  }

  .hm-title {
    margin: 0;
    font-size: clamp(18px, 5.1cqi, 27px);
    line-height: 1.18;
    font-weight: 680;
    letter-spacing: -0.012em;
    color: #fbfcff;
    text-shadow: 0 2px 18px rgba(0, 0, 0, 0.45);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-break: break-word;
  }

  .hm-title.placeholder {
    opacity: 0.55;
    font-weight: 500;
  }

  .hm-artist {
    font-size: clamp(11.5px, 3cqi, 14px);
    line-height: 1.35;
    color: rgba(246, 248, 255, 0.64);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .hm-tags {
    display: flex;
    flex-wrap: nowrap;
    gap: 6px;
    margin-top: 2px;
    overflow: hidden;
  }

  .hm-chip {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    max-width: 100%;
    padding: 4px 9px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.055);
    color: rgba(246, 248, 255, 0.72);
    font-size: 10.5px;
    font-weight: 550;
    letter-spacing: 0.02em;
    cursor: default;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  .hm-chip.interactive {
    cursor: pointer;
    transition: background 0.18s ease, color 0.18s ease;
  }

  .hm-chip.interactive:hover {
    background: rgba(var(--hm-a1-rgb), 0.16);
    color: #fff;
    border-color: rgba(var(--hm-a1-rgb), 0.35);
  }

  .hm-chip .hm-chip-label {
    color: rgba(255, 255, 255, 0.4);
    font-size: 9.5px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .hm-chip span.hm-chip-value {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 130px;
  }

  /* ---------- 频谱 ---------- */
  .hm-vis {
    position: relative;
    height: clamp(22px, 5.6cqi, 38px);
    overflow: hidden;
    mask-image: linear-gradient(
      90deg,
      transparent 0%,
      #000 7%,
      #000 93%,
      transparent 100%
    );
    opacity: 0.9;
    transition: opacity 0.3s ease;
  }

  .hm-vis[data-playing="false"] {
    opacity: 0.34;
  }

  .hm-bars {
    display: flex;
    align-items: flex-end;
    gap: 3px;
    height: 100%;
  }

  .hm-bar {
    flex: 1 1 0;
    min-width: 2.5px;
    height: calc(var(--h) * 100%);
    border-radius: 2px 2px 1px 1px;
    background: linear-gradient(
      180deg,
      rgba(var(--hm-a1-rgb), 0.95),
      rgba(var(--hm-a2-rgb), 0.45)
    );
    transform-origin: bottom center;
    animation: hmBar var(--dur) ease-in-out var(--delay) infinite alternate;
    animation-play-state: var(--run, running);
    box-shadow: 0 0 10px -2px rgba(var(--hm-a1-rgb), 0.55);
  }

  .hm-vis[data-playing="false"] .hm-bar {
    --run: paused;
  }

  .hm-wave-wrap {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  .hm-wave-wrap svg {
    height: 100%;
    width: 200%;
    display: block;
    animation: hmWave 6s linear infinite;
    animation-play-state: var(--run, running);
  }

  .hm-vis[data-playing="false"] .hm-wave-wrap svg {
    --run: paused;
  }

  .hm-vis[data-style="orbit"] {
    height: clamp(38px, 9.5cqi, 60px);
  }

  .hm-orbit-wrap {
    position: relative;
    height: 100%;
    width: 100%;
  }

  .hm-orbit-wrap::before {
    content: "";
    position: absolute;
    left: 12%;
    right: 12%;
    top: 50%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(var(--hm-a1-rgb), 0.22) 22%,
      rgba(var(--hm-a2-rgb), 0.22) 78%,
      transparent
    );
  }

  .hm-orbit-ring {
    position: absolute;
    left: 50%;
    top: 50%;
    translate: -50% -50%;
    height: 88%;
    aspect-ratio: 1;
    border-radius: 50%;
    border: 1px solid rgba(var(--hm-a1-rgb), 0.65);
    box-shadow:
      0 0 20px -6px rgba(var(--hm-a1-rgb), 0.55),
      inset 0 0 18px -8px rgba(var(--hm-a1-rgb), 0.6);
    animation: hmOrbit 3.4s ease-out infinite;
    animation-play-state: var(--run, running);
  }

  .hm-orbit-ring:nth-child(1) {
    height: 96%;
  }

  .hm-orbit-ring:nth-child(2) {
    height: 68%;
    border-color: rgba(var(--hm-a2-rgb), 0.6);
    animation-delay: 1.1s;
  }

  .hm-orbit-ring:nth-child(3) {
    height: 42%;
    border-color: rgba(var(--hm-a1-rgb), 0.45);
    animation-delay: 2.2s;
  }

  .hm-vis[data-playing="false"] .hm-orbit-ring {
    --run: paused;
  }

  /* ---------- 进度 ---------- */
  .hm-progress {
    display: flex;
    align-items: center;
    gap: 9px;
  }

  .hm-time {
    flex: 0 0 auto;
    min-width: 36px;
    font-size: 11px;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.02em;
    color: rgba(246, 248, 255, 0.52);
    transition: color 0.2s ease;
  }

  .hm-time.end {
    text-align: right;
  }

  .hm-time.hoverable {
    cursor: pointer;
  }

  .hm-time.hoverable:hover {
    color: rgba(246, 248, 255, 0.9);
  }

  .hm-range {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 24px;
    margin: 0;
    padding: 0;
    background: transparent;
    cursor: pointer;
    --pct: 0%;
  }

  .hm-range::-webkit-slider-runnable-track {
    height: 5px;
    border-radius: 999px;
    background: linear-gradient(
      90deg,
      rgba(var(--hm-a1-rgb), 1) 0%,
      rgba(var(--hm-a2-rgb), 1) var(--pct),
      rgba(255, 255, 255, 0.13) var(--pct),
      rgba(255, 255, 255, 0.13) 100%
    );
    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.05) inset;
  }

  .hm-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 13px;
    height: 13px;
    margin-top: -4px;
    border: none;
    border-radius: 50%;
    background: #fff;
    box-shadow:
      0 0 0 3px rgba(var(--hm-a1-rgb), 0.22),
      0 0 16px rgba(var(--hm-a1-rgb), 0.85);
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }

  .hm-range:hover::-webkit-slider-thumb {
    transform: scale(1.12);
  }

  .hm-range:active::-webkit-slider-thumb {
    transform: scale(1.24);
  }

  .hm-range::-moz-range-track {
    height: 5px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.13);
  }

  .hm-range::-moz-range-progress {
    height: 5px;
    border-radius: 999px;
    background: linear-gradient(
      90deg,
      rgba(var(--hm-a1-rgb), 1),
      rgba(var(--hm-a2-rgb), 1)
    );
  }

  .hm-range::-moz-range-thumb {
    width: 13px;
    height: 13px;
    border: none;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 0 12px rgba(var(--hm-a1-rgb), 0.8);
  }

  .hm-range[data-disabled="true"] {
    opacity: 0.4;
    cursor: not-allowed;
  }

  /* ---------- 控制区 ---------- */
  .hm-controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: clamp(8px, 2.6cqi, 18px);
  }

  .hm-transport {
    display: flex;
    align-items: center;
    gap: clamp(4px, 1.6cqi, 12px);
    flex: 0 0 auto;
  }

  .hm-btn {
    display: grid;
    place-items: center;
    width: clamp(34px, 9cqi, 44px);
    height: clamp(34px, 9cqi, 44px);
    padding: 0;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.09);
    background: rgba(255, 255, 255, 0.06);
    color: rgba(246, 248, 255, 0.82);
    cursor: pointer;
    transition:
      background 0.18s ease,
      color 0.18s ease,
      transform 0.16s ease,
      border-color 0.18s ease;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  .hm-btn:hover {
    background: rgba(255, 255, 255, 0.14);
    color: #fff;
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }

  .hm-btn:active {
    transform: scale(0.94);
  }

  .hm-btn[data-on="true"] {
    color: var(--hm-a1);
    border-color: rgba(var(--hm-a1-rgb), 0.44);
    background: rgba(var(--hm-a1-rgb), 0.13);
    box-shadow: 0 0 18px -6px rgba(var(--hm-a1-rgb), 0.85);
  }

  .hm-btn[hidden] {
    display: none;
  }

  .hm-play {
    position: relative;
    display: grid;
    place-items: center;
    width: clamp(50px, 14cqi, 68px);
    height: clamp(50px, 14cqi, 68px);
    padding: 0;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    color: #fff;
    background: linear-gradient(
      135deg,
      rgba(var(--hm-a1-rgb), 1) 0%,
      rgba(var(--hm-a2-rgb), 1) 100%
    );
    box-shadow:
      0 14px 30px -10px rgba(var(--hm-a1-rgb), 0.85),
      0 4px 14px -6px rgba(var(--hm-a2-rgb), 0.9),
      inset 0 1px 0 rgba(255, 255, 255, 0.4),
      inset 0 -1px 2px rgba(0, 0, 0, 0.25);
    transition: transform 0.16s ease, box-shadow 0.22s ease;
  }

  .hm-play svg {
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.35));
  }

  .hm-play:hover {
    transform: translateY(-1px) scale(1.02);
    box-shadow:
      0 18px 36px -10px rgba(var(--hm-a1-rgb), 0.95),
      0 6px 18px -6px rgba(var(--hm-a2-rgb), 1),
      inset 0 1px 0 rgba(255, 255, 255, 0.45);
  }

  .hm-play:active {
    transform: scale(0.95);
  }

  .hm-play.is-playing::after {
    content: "";
    position: absolute;
    inset: -6px;
    border-radius: 50%;
    border: 1px solid rgba(var(--hm-a1-rgb), 0.45);
    animation: hmRing 2.4s ease-out infinite;
    pointer-events: none;
  }

  .hm-play[hidden] {
    display: none;
  }

  .hm-volume {
    display: flex;
    align-items: center;
    gap: 7px;
    flex: 0 1 168px;
    min-width: 0;
    padding: 3px 10px 3px 3px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.07);
    background: rgba(255, 255, 255, 0.045);
  }

  .hm-volume .hm-icon-btn {
    border: none;
    background: transparent;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    flex: 0 0 auto;
  }

  .hm-volume .hm-icon-btn:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .hm-volume .hm-range {
    height: 20px;
    flex: 1 1 auto;
    min-width: 40px;
  }

  .hm-volume .hm-range::-webkit-slider-thumb {
    width: 11px;
    height: 11px;
    margin-top: -3px;
  }

  .hm-vol-pct {
    flex: 0 0 auto;
    min-width: 26px;
    text-align: right;
    font-size: 10.5px;
    font-variant-numeric: tabular-nums;
    color: rgba(246, 248, 255, 0.5);
  }

  .hm-volume[hidden] {
    display: none;
  }

  /* ---------- 分组 ---------- */
  .hm-group {
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
  }

  .hm-group-avatar {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.16);
    background-size: cover;
    background-position: center;
    background-color: rgba(var(--hm-a2-rgb), 0.4);
    flex: 0 0 auto;
  }

  .hm-group-more {
    font-size: 10px;
    color: rgba(246, 248, 255, 0.45);
  }

  .hm-group-leave {
    border: none;
    background: transparent;
    color: rgba(246, 248, 255, 0.5);
    font-size: 10px;
    cursor: pointer;
    padding: 2px 4px;
    border-radius: 6px;
  }

  .hm-group-leave:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
  }

  /* ---------- 菜单 ---------- */
  .hm-menu {
    position: absolute;
    z-index: 6;
    left: 14px;
    bottom: 72px;
    min-width: 168px;
    max-width: min(260px, 78%);
    max-height: 220px;
    overflow-y: auto;
    padding: 6px;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(12, 15, 24, 0.82);
    box-shadow: 0 22px 44px -18px rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(22px) saturate(1.3);
    -webkit-backdrop-filter: blur(22px) saturate(1.3);
  }

  .hm-menu-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    width: 100%;
    padding: 8px 10px;
    border: none;
    border-radius: 10px;
    background: transparent;
    color: rgba(246, 248, 255, 0.8);
    font-size: 12px;
    text-align: left;
    cursor: pointer;
    font-family: inherit;
  }

  .hm-menu-item:hover {
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
  }

  .hm-menu-item[data-active="true"] {
    color: var(--hm-a1);
    background: rgba(var(--hm-a1-rgb), 0.12);
  }

  .hm-menu-check {
    opacity: 0;
  }

  .hm-menu-item[data-active="true"] .hm-menu-check {
    opacity: 1;
  }

  .hm-menu-head {
    padding: 6px 10px 4px;
    font-size: 9.5px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.4);
  }

  /* ---------- 抽屉（队列 / 媒体库） ---------- */
  .hm-drawer {
    position: absolute;
    inset: 0;
    z-index: 7;
    display: flex;
    flex-direction: column;
    padding: 12px 12px 10px;
    background: rgba(7, 9, 15, 0.86);
    backdrop-filter: blur(26px) saturate(1.35);
    -webkit-backdrop-filter: blur(26px) saturate(1.35);
    opacity: 0;
    transform: translateY(10px);
    pointer-events: none;
    transition: opacity 0.26s ease, transform 0.26s ease;
  }

  .hm-drawer.open {
    opacity: 1;
    transform: none;
    pointer-events: auto;
  }

  .hm-drawer-head {
    display: flex;
    align-items: center;
    gap: 8px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .hm-drawer-title {
    flex: 1 1 auto;
    min-width: 0;
    font-size: 12px;
    font-weight: 650;
    letter-spacing: 0.02em;
    color: rgba(246, 248, 255, 0.92);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .hm-drawer-body {
    flex: 1 1 auto;
    min-height: 0;
    overflow-y: auto;
    margin-top: 6px;
    scrollbar-width: thin;
  }

  .hm-list-item {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 7px 6px;
    border: none;
    border-radius: 10px;
    background: transparent;
    color: inherit;
    font-family: inherit;
    text-align: left;
    cursor: pointer;
  }

  .hm-list-item:hover {
    background: rgba(255, 255, 255, 0.07);
  }

  .hm-list-item[data-active="true"] {
    background: rgba(var(--hm-a1-rgb), 0.12);
  }

  .hm-list-thumb {
    flex: 0 0 auto;
    width: 34px;
    height: 34px;
    border-radius: 9px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background-color: rgba(var(--hm-a2-rgb), 0.3);
    background-size: cover;
    background-position: center;
    display: grid;
    place-items: center;
    color: rgba(255, 255, 255, 0.6);
  }

  .hm-list-thumb svg {
    width: 16px;
    height: 16px;
  }

  .hm-list-text {
    flex: 1 1 auto;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  .hm-list-name {
    font-size: 12px;
    color: rgba(246, 248, 255, 0.9);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .hm-list-sub {
    font-size: 10px;
    color: rgba(246, 248, 255, 0.45);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .hm-list-tail {
    flex: 0 0 auto;
    font-size: 10px;
    font-variant-numeric: tabular-nums;
    color: rgba(246, 248, 255, 0.42);
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .hm-list-item[data-active="true"] .hm-list-name {
    color: var(--hm-a1);
  }

  .hm-empty {
    display: grid;
    place-items: center;
    height: 100%;
    min-height: 90px;
    font-size: 11px;
    color: rgba(246, 248, 255, 0.45);
    text-align: center;
    padding: 0 12px;
  }

  .hm-spinner {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.16);
    border-top-color: var(--hm-a1);
    animation: hmSpin 0.9s linear infinite;
  }

  /* ---------- 轻提示 ---------- */
  .hm-toast {
    position: absolute;
    left: 50%;
    bottom: 14px;
    z-index: 8;
    translate: -50% 0;
    max-width: 84%;
    padding: 7px 12px;
    border-radius: 999px;
    font-size: 11px;
    color: rgba(255, 255, 255, 0.9);
    background: rgba(20, 12, 18, 0.9);
    border: 1px solid rgba(255, 120, 150, 0.35);
    box-shadow: 0 10px 24px -12px rgba(0, 0, 0, 0.9);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s ease;
    text-align: center;
  }

  .hm-toast.show {
    opacity: 1;
  }

  /* ---------- 布局：紧凑 ---------- */
  .hm-card[data-layout="compact"] .hm-main {
    grid-template-columns: clamp(62px, 17cqi, 88px) minmax(0, 1fr) auto;
    align-items: center;
    gap: 12px;
  }

  .hm-card[data-layout="compact"] .hm-cover {
    border-radius: 14px;
  }

  .hm-card[data-layout="compact"] .hm-title {
    font-size: clamp(15px, 4.2cqi, 19px);
    -webkit-line-clamp: 1;
  }

  .hm-card[data-layout="compact"] .hm-kicker,
  .hm-card[data-layout="compact"] .hm-tags {
    display: none;
  }

  .hm-card[data-layout="compact"] .hm-vis {
    height: 16px;
    opacity: 0.75;
  }

  .hm-card[data-layout="compact"] .hm-vis[data-style="orbit"] {
    display: none;
  }

  .hm-card[data-layout="compact"] .hm-controls {
    justify-content: flex-start;
    gap: 12px;
  }

  .hm-card[data-layout="compact"] .hm-volume {
    margin-left: auto;
    flex: 0 1 132px;
  }

  .hm-card[data-layout="compact"] .hm-btn {
    width: 34px;
    height: 34px;
  }

  .hm-card[data-layout="compact"] .hm-play {
    width: 48px;
    height: 48px;
  }

  .hm-card[data-layout="compact"] .hm-transport {
    gap: 6px;
  }

  /* ---------- 布局：迷你 ---------- */
  .hm-card[data-layout="mini"] .hm-top,
  .hm-card[data-layout="mini"] .hm-vis,
  .hm-card[data-layout="mini"] .hm-tags,
  .hm-card[data-layout="mini"] .hm-kicker {
    display: none;
  }

  .hm-card[data-layout="mini"] .hm-body {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: 10px;
    padding: 9px 12px;
  }

  .hm-card[data-layout="mini"] .hm-main {
    grid-column: 1;
    grid-template-columns: 44px minmax(0, 1fr);
    gap: 11px;
  }

  .hm-card[data-layout="mini"] .hm-controls {
    grid-column: 2;
    gap: 6px;
  }

  .hm-card[data-layout="mini"] .hm-transport {
    gap: 4px;
  }

  .hm-card[data-layout="mini"] .hm-transport .hm-btn[data-role="shuffle"],
  .hm-card[data-layout="mini"] .hm-transport .hm-btn[data-role="repeat"],
  .hm-card[data-layout="mini"] .hm-transport .hm-btn[data-role="previous"] {
    display: none;
  }

  .hm-card[data-layout="mini"] .hm-cover {
    width: 44px;
    border-radius: 11px;
  }

  .hm-card[data-layout="mini"] .hm-title {
    font-size: 14px;
    -webkit-line-clamp: 1;
  }

  .hm-card[data-layout="mini"] .hm-artist {
    font-size: 10.5px;
  }

  .hm-card[data-layout="mini"] .hm-progress {
    display: none;
  }

  .hm-card[data-layout="mini"] .hm-btn,
  .hm-card[data-layout="mini"] .hm-icon-btn {
    width: 30px;
    height: 30px;
  }

  .hm-card[data-layout="mini"] .hm-play {
    width: 38px;
    height: 38px;
  }

  .hm-card[data-layout="mini"] .hm-volume {
    flex: 0 0 auto;
    padding: 0;
    border: none;
    background: transparent;
  }

  .hm-card[data-layout="mini"] .hm-volume .hm-range,
  .hm-card[data-layout="mini"] .hm-vol-pct {
    display: none;
  }

  .hm-card[data-layout="mini"] .hm-cover-halo {
    display: none;
  }

  /* ---------- 窄卡片适配 ---------- */
  @container (max-width: 380px) {
    .hm-status-player,
    .hm-status + .hm-kicker-sep,
    .hm-status .hm-kicker-sep {
      display: none;
    }

    .hm-card[data-layout="full"] .hm-main {
      grid-template-columns: 1fr;
      justify-items: center;
      text-align: center;
      gap: 10px;
    }

    .hm-card[data-layout="full"] .hm-cover {
      width: min(62%, 150px);
    }

    .hm-card[data-layout="full"] .hm-meta {
      align-items: center;
      width: 100%;
    }

    .hm-card[data-layout="full"] .hm-tags {
      justify-content: center;
    }

    .hm-card[data-layout="full"] .hm-vis {
      display: none;
    }

    .hm-card[data-layout="full"] .hm-controls {
      flex-direction: column;
      gap: 10px;
      align-items: stretch;
    }

    .hm-card[data-layout="full"] .hm-transport {
      justify-content: center;
    }

    .hm-card[data-layout="full"] .hm-volume {
      flex: 1 1 auto;
      margin: 0 auto;
      width: min(100%, 240px);
    }
  }

  @container (max-width: 300px) {
    .hm-card[data-layout="compact"] .hm-main {
      grid-template-columns: 52px minmax(0, 1fr) auto;
    }

    .hm-card[data-layout="compact"] .hm-volume {
      display: none;
    }
  }


  /* ---------- 封面容器与多设备切换 ---------- */
  .hm-cover-wrap {
    position: relative;
    min-width: 0;
  }

  .hm-cover-halo {
    pointer-events: none;
  }

  .hm-entities {
    display: flex;
    align-items: center;
    gap: 6px;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 1px 0;
    margin: -2px 0 -2px;
    scrollbar-width: none;
  }

  .hm-entities::-webkit-scrollbar {
    display: none;
  }

  .hm-entity-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    flex: 0 0 auto;
    max-width: 46%;
    padding: 3px 10px 3px 3px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.05);
    color: rgba(246, 248, 255, 0.58);
    font-family: inherit;
    font-size: 10.5px;
    cursor: pointer;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    transition: color 0.18s ease, background 0.18s ease, border-color 0.18s ease;
  }

  .hm-entity-chip:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
  }

  .hm-entity-chip[data-active="true"] {
    color: #fff;
    border-color: rgba(var(--hm-a1-rgb), 0.42);
    background: rgba(var(--hm-a1-rgb), 0.14);
    box-shadow: 0 0 16px -6px rgba(var(--hm-a1-rgb), 0.9);
  }

  .hm-entity-dot {
    flex: 0 0 auto;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.18);
    background-color: rgba(var(--hm-a2-rgb), 0.45);
    background-size: cover;
    background-position: center;
  }

  .hm-entity-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* ---------- 背景模式 ---------- */
  .hm-card[data-cover="art"] .hm-bg-art {
    filter: blur(3px) brightness(0.42) saturate(1.25);
    opacity: 0.92;
  }

  .hm-card[data-cover="palette"] .hm-bg-art,
  .hm-card[data-cover="none"] .hm-bg-art {
    opacity: 0;
  }

  .hm-card[data-cover="none"] .hm-grid {
    opacity: 0;
  }

  .hm-card[data-cover="none"] .hm-bg-grad {
    background:
      radial-gradient(70% 60% at 18% 4%, rgba(var(--hm-glow-rgb), 0.3), transparent 62%),
      linear-gradient(180deg, rgba(5, 7, 12, 0.1) 0%, rgba(4, 5, 9, 0.9) 100%);
  }

  /* ---------- 顶部状态文本自适应 ---------- */
  .hm-status-text {
    min-width: 0;
    flex: 0 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .hm-status .hm-kicker-sep {
    color: rgba(255, 255, 255, 0.3);
    letter-spacing: 0;
  }


  /* ---------- 主题个性 ---------- */
  .hm-card[data-theme="liquid"] {
    --hm-radius: 30px;
    border-color: rgba(255, 255, 255, 0.17);
    box-shadow:
      0 30px 70px -30px rgba(0, 0, 0, 0.9),
      inset 0 1px 0 rgba(255, 255, 255, 0.22),
      inset 0 0 70px rgba(180, 210, 255, 0.06);
  }

  .hm-card[data-theme="liquid"] .hm-sheen {
    opacity: 1;
    background:
      radial-gradient(115% 70% at 26% -12%, rgba(255, 255, 255, 0.35), transparent 58%),
      radial-gradient(90% 65% at 84% 112%, rgba(190, 170, 255, 0.18), transparent 62%);
  }

  .hm-card[data-theme="velvet"] .hm-bg-grad {
    background:
      radial-gradient(75% 62% at 14% 2%, rgba(255, 122, 156, 0.28), transparent 62%),
      radial-gradient(72% 66% at 96% 100%, rgba(168, 107, 255, 0.3), transparent 60%),
      linear-gradient(180deg, rgba(8, 3, 9, 0.18) 0%, rgba(7, 3, 8, 0.78) 62%, rgba(4, 2, 6, 0.94) 100%);
  }

  .hm-card[data-theme="mono"] .hm-bg-grad {
    background:
      radial-gradient(70% 60% at 18% 2%, rgba(233, 236, 245, 0.12), transparent 62%),
      radial-gradient(60% 55% at 92% 100%, rgba(141, 149, 168, 0.14), transparent 60%),
      linear-gradient(180deg, rgba(4, 5, 8, 0.2) 0%, rgba(5, 6, 9, 0.88) 100%);
  }

  .hm-card[data-theme="mono"] .hm-sheen {
    opacity: 0.35;
  }

  .hm-card[data-theme="cyber"] .hm-bg-grad {
    background:
      radial-gradient(75% 60% at 12% 0%, rgba(255, 47, 208, 0.3), transparent 60%),
      radial-gradient(70% 62% at 96% 100%, rgba(34, 230, 255, 0.24), transparent 58%),
      linear-gradient(180deg, rgba(6, 2, 12, 0.16) 0%, rgba(6, 2, 12, 0.76) 60%, rgba(3, 1, 7, 0.94) 100%);
  }

  /* ---------- 动画 ---------- */
  @keyframes hmPulse {
    0%,
    100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.55;
      transform: scale(0.82);
    }
  }

  @keyframes hmBar {
    0% {
      transform: scaleY(0.42);
      filter: brightness(0.85);
    }
    100% {
      transform: scaleY(1.06);
      filter: brightness(1.15);
    }
  }

  @keyframes hmWave {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-25%);
    }
  }

  @keyframes hmSpin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes hmGridDrift {
    from {
      background-position: 0 0, 0 0;
    }
    to {
      background-position: 34px 34px, 34px 34px;
    }
  }

  @keyframes hmOrbit {
    0% {
      transform: scale(0.62);
      opacity: 0;
    }
    35% {
      opacity: 0.95;
    }
    85% {
      opacity: 0.18;
    }
    100% {
      transform: scale(1.18);
      opacity: 0;
    }
  }

  @keyframes hmRing {
    0% {
      transform: scale(1);
      opacity: 0.7;
    }
    100% {
      transform: scale(1.28);
      opacity: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .hm-bar,
    .hm-wave-wrap svg,
    .hm-orbit-ring,
    .hm-grid,
    .hm-cover::before,
    .hm-play.is-playing::after,
    .hm-dot {
      animation: none !important;
    }

    .hm-cover,
    .hm-play,
    .hm-btn,
    .hm-icon-btn {
      transition: none;
    }
  }
`;var Ye={play:m`<path d="M8.2 5.4c0-.7.8-1.1 1.4-.7l9.1 5.8c.6.4.6 1.3 0 1.7l-9.1 6.1c-.6.4-1.4 0-1.4-.7V5.4z" fill="currentColor"/>`,pause:m`<rect x="7" y="5.6" width="3.6" height="12.8" rx="1.2" fill="currentColor"/><rect x="13.4" y="5.6" width="3.6" height="12.8" rx="1.2" fill="currentColor"/>`,previous:m`<path d="M7 6.2v11.6" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><path d="M17.6 6.6c0-.6-.7-1-1.2-.6l-7.1 5.2c-.5.4-.5 1.2 0 1.6l7.1 5.2c.5.4 1.2 0 1.2-.6V6.6z" fill="currentColor"/>`,next:m`<path d="M17 6.2v11.6" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><path d="M6.4 6.6c0-.6.7-1 1.2-.6l7.1 5.2c.5.4.5 1.2 0 1.6l-7.1 5.2c-.5.4-1.2 0-1.2-.6V6.6z" fill="currentColor"/>`,shuffle:m`<path d="M4.5 7.2h3.2c1 0 1.9.5 2.5 1.3l4 5.4c.6.8 1.5 1.3 2.5 1.3h3.1" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M4.5 16.8h3.2c1 0 1.9-.5 2.5-1.3l4-5.4c.6-.8 1.5-1.3 2.5-1.3h3.1" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M16.2 4.6l3 2.6-3 2.6M16.2 12.6l3 2.6-3 2.6" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/>`,repeat:m`<path d="M6.4 9.1V8.3c0-1.5 1.2-2.7 2.7-2.7h8.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M17.8 5.6l-2.3-2.2M17.8 5.6l-2.3 2.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M17.6 14.9v.8c0 1.5-1.2 2.7-2.7 2.7H6.7" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M6.2 18.4l2.3 2.2M6.2 18.4l2.3-2.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/>`,repeatOne:m`<path d="M6.4 9.1V8.3c0-1.5 1.2-2.7 2.7-2.7h8.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M17.8 5.6l-2.3-2.2M17.8 5.6l-2.3 2.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M17.6 14.9v.8c0 1.5-1.2 2.7-2.7 2.7H6.7" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M6.2 18.4l2.3 2.2M6.2 18.4l2.3-2.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M11.2 9.3l1.1-.8v6.1" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M10.6 14.6h3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>`,volume:m`<path d="M4.6 9.4h2.7l3.4-2.9c.5-.4 1.2 0 1.2.6v9.8c0 .6-.7 1-1.2.6L7.3 14.6H4.6c-.6 0-1-.4-1-1v-3.2c0-.6.4-1 1-1z" fill="currentColor"/><path d="M15.4 8.6c1.6 1 1.6 5.8 0 6.8" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M17.6 6.4c2.9 2 2.9 9.2 0 11.2" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/>`,mute:m`<path d="M4.6 9.4h2.7l3.4-2.9c.5-.4 1.2 0 1.2.6v9.8c0 .6-.7 1-1.2.6L7.3 14.6H4.6c-.6 0-1-.4-1-1v-3.2c0-.6.4-1 1-1z" fill="currentColor"/><path d="M15.2 9.6l4.6 4.8M19.8 9.6l-4.6 4.8" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/>`,power:m`<path d="M12 4.2v7" stroke="currentColor" stroke-width="1.9" fill="none" stroke-linecap="round"/><path d="M7.6 6.6a6.9 6.9 0 1 0 8.8 0" stroke="currentColor" stroke-width="1.9" fill="none" stroke-linecap="round"/>`,more:m`<circle cx="6.4" cy="12" r="1.55" fill="currentColor"/><circle cx="12" cy="12" r="1.55" fill="currentColor"/><circle cx="17.6" cy="12" r="1.55" fill="currentColor"/>`,library:m`<rect x="4.4" y="4.4" width="6.4" height="6.4" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.7"/><rect x="13.2" y="4.4" width="6.4" height="6.4" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.7"/><rect x="4.4" y="13.2" width="6.4" height="6.4" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.7"/><rect x="13.2" y="13.2" width="6.4" height="6.4" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.7"/>`,queue:m`<path d="M5 7.2h10M5 11.4h7.4M5 15.6h5.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M15.6 12.4c0-.5.5-.8.9-.5l4 2.3c.4.2.4.8 0 1l-4 2.6c-.4.3-.9 0-.9-.5v-5.4z" fill="currentColor"/>`,chevronLeft:m`<path d="M14.6 6l-5.4 6 5.4 6" stroke="currentColor" stroke-width="1.9" fill="none" stroke-linecap="round"/>`,close:m`<path d="M7 7l10 10M17 7L7 17" stroke="currentColor" stroke-width="1.9" fill="none" stroke-linecap="round"/>`,music:m`<path d="M14.5 5.2l4.6-1v9.1a3 3 0 1 1-1.8-2.7V7.1l-2.8.6v7.7a3 3 0 1 1-1.8-2.7V5.2z" fill="currentColor"/>`,group:m`<circle cx="9" cy="9.3" r="3.2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3.8 18.4c0-2.7 2.3-4.6 5.2-4.6s5.2 1.9 5.2 4.6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M16.2 6.4a3 3 0 0 1 0 5.9M18.6 18.4c0-2-1-3.6-2.6-4.3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>`,chevronRight:m`<path d="M9.4 6l5.4 6-5.4 6" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>`,folder:m`<path d="M3.6 7.2c0-1 .8-1.8 1.8-1.8h3.4l1.8 2.2h9.8c1 0 1.8.8 1.8 1.8v7.4c0 1-.8 1.8-1.8 1.8H5.4c-1 0-1.8-.8-1.8-1.8V7.2z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>`,check:m`<path d="M6 12.6l4.2 4.2 7.8-9" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>`};function f(i,t=18){let e=Ye[i];return e?m`<svg viewBox="0 0 24 24" width=${t} height=${t} aria-hidden="true" focusable="false">${e}</svg>`:c}var we="1.0.2",ke="ha-music",Ae="HA Music",_={PAUSE:1,SEEK:2,VOLUME_SET:4,VOLUME_MUTE:8,PREVIOUS_TRACK:16,NEXT_TRACK:32,TURN_ON:128,TURN_OFF:256,PLAY_MEDIA:512,VOLUME_STEP:1024,SELECT_SOURCE:2048,STOP:4096,CLEAR_PLAYLIST:8192,PLAY:16384,SHUFFLE_SET:32768,SELECT_SOUND_MODE:65536,BROWSE_MEDIA:131072,REPEAT_SET:262144,GROUPING:524288,SELECT:1048576};var Dt="aurora";var Ft={adaptive:{en:"Adaptive",zh:"\u81EA\u9002\u5E94"},full:{en:"Full",zh:"\u5B8C\u6574"},compact:{en:"Compact",zh:"\u7D27\u51D1"},mini:{en:"Mini",zh:"\u8FF7\u4F60"}},Vt={ambient:{en:"Ambient blur",zh:"\u73AF\u5883\u6A21\u7CCA"},art:{en:"Cover fill",zh:"\u5C01\u9762\u94FA\u6EE1"},palette:{en:"Palette only",zh:"\u7EAF\u8272\u5F69"},none:{en:"Plain",zh:"\u65E0\u80CC\u666F"}},Ht={bars:{en:"Bars",zh:"\u67F1\u72B6"},wave:{en:"Wave",zh:"\u6CE2\u5F62"},orbit:{en:"Orbit",zh:"\u5149\u73AF"},none:{en:"Off",zh:"\u5173\u95ED"}},G={aurora:{label:{en:"Aurora",zh:"\u6781\u5149"},accent:["#2ee6c5","#7b5cff"],base:"#050a12",glow:1,grid:!1},cyber:{label:{en:"Cyberpunk",zh:"\u8D5B\u535A\u670B\u514B"},accent:["#ff2fd0","#22e6ff"],base:"#08030f",glow:1.4,grid:!0},liquid:{label:{en:"Liquid Glass",zh:"\u6DB2\u6001\u73BB\u7483"},accent:["#a9d8ff","#cdb6ff"],base:"#090c16",glow:.8,grid:!1,glass:!0},velvet:{label:{en:"Velvet",zh:"\u5929\u9E45\u7ED2"},accent:["#ff7a9c","#a86bff"],base:"#0d050c",glow:1.15,grid:!1},mono:{label:{en:"Monochrome",zh:"\u9ED1\u767D"},accent:["#e9ecf5","#8d95a8"],base:"#08090c",glow:.4,grid:!1}},$e={play:"Play",pause:"Pause",playing:"Now playing",paused:"Paused",idle:"Standby",off:"Off",buffering:"Buffering",previous:"Previous track",next:"Next track",volume:"Volume",mute:"Mute",unmute:"Unmute",shuffle:"Shuffle",repeat:"Repeat",repeatAll:"Repeat all",repeatOne:"Repeat one",repeatOff:"Repeat off",source:"Source",soundMode:"Sound mode",queue:"Queue",library:"Library",assistant:"Music Assistant",more:"More info",power:"Power",group:"Group",groupLeave:"Leave group",loading:"Loading\u2026",queueEmpty:"Queue is empty",browseFailed:"Media library is unavailable",noMedia:"Nothing is playing",unknownArtist:"Unknown artist",noTitle:"No title",close:"Close",back:"Back",track:"Track",album:"Album",volumeEntityMissing:"Volume entity unavailable",seek:"Seek",remaining:"Toggle remaining time"},Ge={play:"\u64AD\u653E",pause:"\u6682\u505C",playing:"\u6B63\u5728\u64AD\u653E",paused:"\u5DF2\u6682\u505C",idle:"\u5F85\u673A",off:"\u5DF2\u5173\u95ED",buffering:"\u7F13\u51B2\u4E2D",previous:"\u4E0A\u4E00\u9996",next:"\u4E0B\u4E00\u9996",volume:"\u97F3\u91CF",mute:"\u9759\u97F3",unmute:"\u53D6\u6D88\u9759\u97F3",shuffle:"\u968F\u673A\u64AD\u653E",repeat:"\u5FAA\u73AF",repeatAll:"\u5217\u8868\u5FAA\u73AF",repeatOne:"\u5355\u66F2\u5FAA\u73AF",repeatOff:"\u5173\u95ED\u5FAA\u73AF",source:"\u97F3\u6E90",soundMode:"\u58F0\u97F3\u6A21\u5F0F",queue:"\u64AD\u653E\u961F\u5217",library:"\u5A92\u4F53\u5E93",assistant:"Music Assistant",more:"\u66F4\u591A\u4FE1\u606F",power:"\u5F00\u5173",group:"\u5206\u7EC4",groupLeave:"\u9000\u51FA\u5206\u7EC4",loading:"\u52A0\u8F7D\u4E2D\u2026",queueEmpty:"\u64AD\u653E\u961F\u5217\u4E3A\u7A7A",browseFailed:"\u5A92\u4F53\u5E93\u6682\u4E0D\u53EF\u7528",noMedia:"\u5F53\u524D\u6CA1\u6709\u64AD\u653E\u5185\u5BB9",unknownArtist:"\u672A\u77E5\u827A\u672F\u5BB6",noTitle:"\u672A\u77E5\u66F2\u76EE",close:"\u5173\u95ED",back:"\u8FD4\u56DE",track:"\u66F2\u76EE",album:"\u4E13\u8F91",volumeEntityMissing:"\u97F3\u91CF\u5B9E\u4F53\u4E0D\u53EF\u7528",seek:"\u8FDB\u5EA6",remaining:"\u5207\u6362\u5269\u4F59\u65F6\u95F4"};function $t(i){return/^zh/i.test(i||"")}function z(i){let t=$t(i)?Ge:$e;return e=>t[e]??$e[e]??e}var Qe={playlist:{en:"Playlist",zh:"\u64AD\u653E\u5217\u8868"},album:{en:"Album",zh:"\u4E13\u8F91"},artist:{en:"Artist",zh:"\u827A\u672F\u5BB6"},track:{en:"Track",zh:"\u66F2\u76EE"},music:{en:"Music",zh:"\u97F3\u4E50"},video:{en:"Video",zh:"\u89C6\u9891"},directory:{en:"Folder",zh:"\u6587\u4EF6\u5939"},image:{en:"Image",zh:"\u56FE\u7247"},url:{en:"Link",zh:"\u94FE\u63A5"},app:{en:"App",zh:"\u5E94\u7528"},genre:{en:"Genre",zh:"\u98CE\u683C"}};function Ee(i,t){if(!i)return"";let e=Qe[String(i).toLowerCase()];return e?$t(t)?e.zh:e.en:i}var v=(i,t,e)=>Math.min(e,Math.max(t,i));function ut(i,t="--:--"){if(!Number.isFinite(i)||i<0)return t;let e=Math.round(i),a=Math.floor(e/3600),r=Math.floor(e%3600/60),s=e%60;return a>0?`${a}:${String(r).padStart(2,"0")}:${String(s).padStart(2,"0")}`:`${r}:${String(s).padStart(2,"0")}`}function Q(i){let t=String(i??""),e=2166136261;for(let a=0;a<t.length;a+=1)e^=t.charCodeAt(a),e=Math.imul(e,16777619);return e>>>0}function Ze(i){return Q(i)%360}function y(i,t){let e=Number(i?.attributes?.supported_features??0);return!Number.isFinite(e)||!t?!1:(e&t)===t}function Xe(i,t){if(!(!i||!t))return i.states?i.states[t]:void 0}function wt(i,t,e=""){return Xe(i,t)?.attributes?.friendly_name||t||e}function U(i){let t=i?.attributes??{},e=t.media_metadata??{},a=Number(t.media_duration??e.duration??0),r=Number(t.media_position??0),s=t.media_position_updated_at;if(i?.state==="playing"&&s){let n=(Date.now()-new Date(s).getTime())/1e3;Number.isFinite(n)&&n>0&&(r+=n)}return Number.isFinite(a)&&a>0?r=v(r,0,a):(!Number.isFinite(r)||r<0)&&(r=0),{title:t.media_title||e.title||"",artist:t.media_artist||e.artist||t.media_album_artist||e.album_artist||"",album:t.media_album_name||e.album_name||"",series:t.media_series_title||e.series_title||"",track:t.media_track??e.track_number??"",duration:Number.isFinite(a)?a:0,position:Number.isFinite(r)?r:0,art:e.entity_picture||e.image_url||t.entity_picture||t.media_image_url||"",appName:t.app_name||"",source:t.source||"",soundMode:t.sound_mode||"",shuffle:!!t.shuffle,repeat:t.repeat||"off",volume:Number.isFinite(Number(t.volume_level))?Number(t.volume_level):null,muted:!!t.is_volume_muted,groupMembers:Array.isArray(t.group_members)?t.group_members:[]}}function Bt(i,t=60){let e=i?.attributes?.queue;return Array.isArray(e)?e.slice(0,t).map((a,r)=>({index:r,title:a.title||a.name||a.media_title||"",artist:a.artist||a.subtitle||a.media_artist||"",album:a.album||a.album_name||"",duration:Number(a.duration??a.media_duration??0)||0,art:a.entity_picture||a.thumbnail||a.artwork||"",contentId:a.media_content_id||a.content_id||"",contentType:a.media_content_type||a.content_type||"",active:!!(a.active||a.is_active||a.current||a.playing)})):[]}function B(i,t){return t?/^(https?:|data:|blob:)/.test(t)?t:i?.hassUrl?i.hassUrl(t):t:""}function H(i,t,e){let a=t/100,r=e/100,s=(1-Math.abs(2*r-1))*a,n=(i%360+360)%360/60,l=s*(1-Math.abs(n%2-1)),o=[0,0,0];n<1?o=[s,l,0]:n<2?o=[l,s,0]:n<3?o=[0,s,l]:n<4?o=[0,l,s]:n<5?o=[l,0,s]:o=[s,0,l];let p=r-s/2;return o.map(d=>Math.round(v((d+p)*255,0,255)))}function Se(i){let t=Ze(i),e=(t+42+Q(i+"2")%40)%360,a=H(t,72,58),r=H(e,68,52);return{a1:`hsl(${t} 72% 58%)`,a2:`hsl(${e} 68% 52%)`,rgb1:a.join(","),rgb2:r.join(",")}}function Me(i){let t=String(i).replace("#","").trim(),e=t.length===3?t.split("").map(a=>a+a).join(""):t;return/^[0-9a-f]{6}$/i.test(e)?[parseInt(e.slice(0,2),16),parseInt(e.slice(2,4),16),parseInt(e.slice(4,6),16)].join(","):null}function kt(i,t="255,255,255"){let e=String(i||"").trim();if(/^#[0-9a-f]{3,8}$/i.test(e))return Me(e.slice(0,7))||t;let a=e.match(/hsla?\(\s*([\d.]+)[,\s]+([\d.]+)%[,\s]+([\d.]+)%/i);if(a)return H(Number(a[1]),Number(a[2]),Number(a[3])).join(",");let r=e.match(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/i);return r?`${r[1]},${r[2]},${r[3]}`:t}function jt(i){let t=Me(i);if(!t)return{h:0,s:0,l:50};let[e,a,r]=t.split(",").map(u=>Number(u)/255),s=Math.max(e,a,r),n=Math.min(e,a,r),l=(s+n)/2,o=s-n,p=0,d=0;return o!==0&&(d=o/(1-Math.abs(2*l-1)),s===e?p=(a-r)/o%6:s===a?p=(r-e)/o+2:p=(e-a)/o+4,p=(p*60+360)%360),{h:p,s:d*100,l:l*100}}function Kt(i,t,e=.5){let a=(t.h-i.h+540)%360-180,r=(i.h+a*e+360)%360,s=i.s+(t.s-i.s)*e,n=i.l+(t.l-i.l)*e;return{h:r,s,l:n,css:`hsl(${Math.round(r)} ${Math.round(v(s,25,92))}% ${Math.round(v(n,38,72))}%)`,rgb:H(r,v(s,25,92),v(n,38,72)).join(",")}}var mt=new Map,Je=40;function ta(i,t){let a=document.createElement("canvas");a.width=36,a.height=36;let r=a.getContext("2d",{willReadFrequently:!0});if(!r)return null;r.drawImage(i,0,0,36,36);let s=r.getImageData(0,0,36,36).data,n=new Map;for(let w=0;w<s.length;w+=4){if(s[w+3]<180)continue;let R=s[w],O=s[w+1],N=s[w+2],E=Math.max(R,O,N),J=Math.min(R,O,N),tt=(E+J)/510,gt=E===0?0:(E-J)/E;if(tt<.12||tt>.9||gt<.14)continue;let S=0,L=E-J;L!==0&&(E===R?S=(O-N)/L%6:E===O?S=(N-R)/L+2:S=(R-O)/L+4,S=(S*60+360)%360);let et=Math.floor(S/18),I=n.get(et)||{count:0,sat:0,light:0};I.count+=1,I.sat+=gt,I.light+=tt,n.set(et,I)}if(!n.size)return null;let l=[...n.entries()].map(([w,k])=>({hue:w*18+9,score:k.count*(.45+k.sat/k.count),sat:k.sat/k.count,light:k.light/k.count})).sort((w,k)=>k.score-w.score),o=l[0],p=l.find(w=>{let k=Math.abs(w.hue-o.hue);return Math.min(k,360-k)>28})||{hue:(o.hue+44)%360,sat:o.sat,light:o.light},d=w=>v(Math.round(w*100),42,88),u=Math.round(o.hue),g=Math.round(p.hue),x=d(o.sat+.08),b=d(p.sat+.05),Z=v(Math.round(o.light*100)+12,46,66),X=v(Math.round(p.light*100)+8,40,60);return{a1:`hsl(${u} ${x}% ${Z}%)`,a2:`hsl(${g} ${b}% ${X}%)`,rgb1:H(u,x,Z).join(","),rgb2:H(g,b,X).join(","),h1:u,s1:x,l1:Z,h2:g,s2:b,l2:X,seed:Q(t||"")}}function Ce(i,t=""){if(!i)return Promise.resolve(null);if(mt.has(i))return mt.get(i);let e=new Promise(a=>{let r=new Image;r.crossOrigin="anonymous",r.decoding="async",r.onload=()=>{try{a(ta(r,t))}catch{a(null)}},r.onerror=()=>a(null),r.src=i});return mt.size>Je&&mt.clear(),mt.set(i,e),e}var Wt=["off","all","one"],ea=260;function aa(i,t,e){let a=new CustomEvent(t,{bubbles:!0,composed:!0,cancelable:!1,detail:e});return i.dispatchEvent(a),a}function Yt(i,t,e,a,r){let s=[];for(let n=0;n<=i;n+=4){let l=t/2+Math.sin(n/e*Math.PI*2+r)*a+Math.sin(n/(e/2)*Math.PI*2+r*1.7)*(a*.32);s.push(`${n.toFixed(1)},${l.toFixed(2)}`)}return`M${s.join(" L")}`}function ra(i){switch(i){case"playing":return"playing";case"buffering":return"buffering";case"paused":return"paused";case"idle":return"idle";case"off":return"off";default:return"idle"}}var Gt=class extends A{static get styles(){return xe}static get properties(){return{_config:{state:!0},_width:{state:!1}}}constructor(){super(),this._config={},this._hass=void 0,this._activeEntity="",this._sig="",this._width=0,this._tickTimer=null,this._toast="",this._toastTimer=null,this._menu=null,this._seekPreview=null,this._volumePreview=null,this._showRemaining=!1,this._drawer=this._emptyDrawer(),this._artUrl="",this._artSlot=0,this._palette=null,this._paletteKey="",this._resizeObserver=null}set hass(t){let e=this._hass;if(this._hass=t,!t)return;let a=this._computeSig(t);(a!==this._sig||e===void 0)&&(this._sig=a,this.requestUpdate()),this._syncTimer()}get hass(){return this._hass}setConfig(t){if(!t)throw new Error("ha-music: \u914D\u7F6E\u4E0D\u80FD\u4E3A\u7A7A");let e=Array.isArray(t.entities)&&t.entities.length?t.entities.filter(Boolean):t.entity?[t.entity]:[];if(!e.length)throw new Error("ha-music: \u9700\u8981\u914D\u7F6E entity\uFF08media_player.*\uFF09\u6216 entities \u5217\u8868");this._config={...t},e.includes(this._activeEntity)||(this._activeEntity=e[0],this._palette=null,this._paletteKey="",this._artUrl=""),this._sig="",this._hass&&(this._sig=this._computeSig(this._hass)),this.requestUpdate()}connectedCallback(){super.connectedCallback(),typeof ResizeObserver<"u"&&(this._resizeObserver=new ResizeObserver(t=>{let e=t[0]?.contentRect?.width||0;if(Math.abs(e-this._width)<1)return;this._width=e,(this._config?.layout||"adaptive")==="adaptive"&&this.requestUpdate()}),this._resizeObserver.observe(this))}disconnectedCallback(){super.disconnectedCallback(),this._stopTimer(),this._resizeObserver?.disconnect(),this._resizeObserver=null,this._toastTimer&&clearTimeout(this._toastTimer)}_entities(){let t=this._config||{};return(Array.isArray(t.entities)&&t.entities.length?t.entities:t.entity?[t.entity]:[]).filter(Boolean)}_eid(){let t=this._entities();return this._activeEntity||t[0]||""}_state(t=this._eid()){return this._hass?.states?.[t]}_computeSig(t){let e=this._eid(),a=t.states?.[e],r=a?.attributes||{},s=["media_title","media_artist","media_album_name","media_series_title","entity_picture","media_duration","media_position","media_position_updated_at","media_metadata","media_content_id","volume_level","is_volume_muted","shuffle","repeat","source","source_list","sound_mode","sound_mode_list","supported_features","group_members","app_name","queue","media_track"],n={};for(let d of s)d in r&&(n[d]=r[d]);let l=this._config?.volume_entity,o=l?t.states?.[l]?.state:null,p=this._entities().map(d=>{let u=t.states?.[d];return[d,u?.state,u?.attributes?.entity_picture]});return JSON.stringify([e,a?.state,n,o,p,t.language,this._config,this._menu,this._drawer.open,this._drawer.mode,this._drawer.cursor,this._drawer.items.length,this._drawer.loading,this._drawer.error,this._showRemaining,this._layoutKey()])}_syncTimer(){let t=this._state()?.state,e=t==="playing"||t==="buffering";e&&!this._tickTimer?this._tickTimer=setInterval(()=>this.requestUpdate(),1e3):e||this._stopTimer()}_stopTimer(){this._tickTimer&&(clearInterval(this._tickTimer),this._tickTimer=null)}_layoutKey(){let t=this._config?.layout||"adaptive";return t==="adaptive"?this._width&&this._width<430?"compact":"full":["full","compact","mini"].includes(t)?t:"full"}_themeKey(){let t=this._config?.theme;return t&&G[t]?t:Dt}_themeVars(){let t=G[this._themeKey()],e=this._paletteKey||this._eid()||"ha-music",a=Se(e),r=this._palette,s=this._config?.accent,n=this._config?.palette!==!1,l=t.accent[0],o=t.accent[1],p=kt(l),d=kt(o),u=p,g=jt(t.accent[1]),x=jt(a.a2);if(n){if(r){let b=Kt(g,{h:r.h2,s:r.s2,l:r.l2},.5);o=b.css,d=b.rgb,u=r.rgb1}else if(x){let b=Kt(g,x,.35);o=b.css,d=b.rgb}}return s&&(l=s,p=kt(s,p),n||(u=p)),{"--hm-base":t.base,"--hm-a1":l,"--hm-a2":o,"--hm-a1-rgb":p,"--hm-a2-rgb":d,"--hm-glow-rgb":u}}_volumeInfo(t){let e=this._config?.volume_entity,a=e?this._hass?.states?.[e]:void 0;if(a){let n=a.entity_id;if(n.startsWith("media_player."))return{domain:"media_player",entityId:n,level:Number(a.attributes?.volume_level??0),muted:!!a.attributes?.is_volume_muted,supported:!0,external:!0};if(n.startsWith("number.")){let l=Number(a.state);if(Number.isFinite(l))return{domain:"number",entityId:n,level:v(l/(a.attributes?.max||100),0,1),muted:!1,supported:!0,external:!0}}if(n.startsWith("input_number.")){let l=Number(a.state);if(Number.isFinite(l))return{domain:"input_number",entityId:n,level:v(l/(a.attributes?.max||100),0,1),muted:!1,supported:!0,external:!0}}}let r=this._state(),s=Number.isFinite(t.volume)||y(r,_.VOLUME_SET)||y(r,_.VOLUME_MUTE);return{domain:"media_player",entityId:this._eid(),level:Number.isFinite(t.volume)?t.volume:0,muted:t.muted,supported:s,external:!1}}_repeatValue(){let t=this._state()?.attributes?.repeat;return["off","all","one"].includes(t)?t:"off"}_call(t,e,a="media_player",r){let s=this._hass;if(!s?.callService)return Promise.resolve();let n=r??this._eid();try{let l=s.callService(a,t,{entity_id:n,...e});return Promise.resolve(l)}catch(l){return this._notify(l?.message||String(l)),Promise.reject(l)}}_guard(t){Promise.resolve(t).catch(e=>{let a=e?.message||String(e);this._notify(a.length>60?a.slice(0,60):a)})}_notify(t){this._toast=t||"",this.requestUpdate(),this._toastTimer&&clearTimeout(this._toastTimer),t&&(this._toastTimer=setTimeout(()=>{this._toast="",this.requestUpdate()},3600))}_togglePlay(){let t=this._state()?.state,e=t==="playing"||t==="buffering";this._guard(this._call(e?"media_pause":"media_play"))}_power(){let t=this._state()?.state,e=t==="off"||t==="standby";this._guard(this._call(e?"turn_on":"turn_off"))}_shuffle(){let t=!!this._state()?.attributes?.shuffle;this._guard(this._call("shuffle_set",{shuffle:!t}))}_repeat(){let t=this._repeatValue(),e=Wt.indexOf(t),a=Wt[(e+1)%Wt.length];this._guard(this._call("repeat_set",{repeat:a}))}_seekTo(t){Number.isFinite(t)&&this._guard(this._call("media_seek",{seek_position:t}))}_onSeekInput(t){let e=t.target,a=Number(e.value);this._seekPreview=a;let r=U(this._state()).duration;e.style.setProperty("--pct",`${r?v(a/r*100,0,100):0}%`)}_onSeekCommit(t){let e=Number(t.target.value);this._seekPreview=null,this._seekTo(e),this.requestUpdate()}_onVolumeInput(t){let e=Number(t.target.value)/100;this._volumePreview=e,t.target.style.setProperty("--pct",`${e*100}%`)}_onVolumeCommit(t){let e=v(Number(t.target.value)/100,0,1);this._volumePreview=null;let a=this._volumeInfo(U(this._state()));if(a.domain==="media_player")this._guard(this._call("volume_set",{volume_level:e},"media_player",a.entityId));else{let r=this._hass?.states?.[a.entityId],s=Number(r?.attributes?.max??100),n=Number(r?.attributes?.min??0);this._guard(this._call("set_value",{value:Math.round(n+e*(s-n))},a.domain,a.entityId))}this.requestUpdate()}_toggleMute(){let t=U(this._state()),e=this._volumeInfo(t);if(e.external){e.domain==="media_player"?this._guard(this._call("volume_mute",{is_volume_muted:!e.muted},"media_player",e.entityId)):this._notify(z(this._hass?.language)("volumeEntityMissing"));return}this._guard(this._call("volume_mute",{is_volume_muted:!t.muted}))}_selectSource(t){this._menu=null,this._guard(this._call("select_source",{source:t})),this.requestUpdate()}_selectSoundMode(t){this._menu=null,this._guard(this._call("select_sound_mode",{sound_mode:t})),this.requestUpdate()}_leaveGroup(){this._guard(this._call("unjoin"))}_playQueueItem(t){if(!t?.contentId){this._notify(z(this._hass?.language)("queueEmpty"));return}this._guard(this._call("play_media",{media_content_id:t.contentId,media_content_type:t.contentType||"music"}))}_playBrowseItem(t){t?.contentId&&this._guard(this._call("play_media",{media_content_id:t.contentId,media_content_type:t.contentType||"music"}))}_switchEntity(t){t!==this._activeEntity&&(this._activeEntity=t,this._palette=null,this._paletteKey="",this._artUrl="",this._menu=null,this._seekPreview=null,this._syncTimer(),this._sig=this._computeSig(this._hass),this.requestUpdate())}_moreInfo(){aa(this,"hass-more-info",{entityId:this._eid()})}_maUrl(){let t=this._config?.music_assistant;if(t===!1)return"";if(typeof t=="string"&&t.trim())return t.trim();let e=this._hass?.panels||{};for(let r of Object.keys(e)){let s=e[r]||{},n=s.url_path||r;if(s.component_name==="music_assistant"||/music[-_ ]?assistant/i.test(n)||/music\s*assistant/i.test(s.title||""))return`/${n}`}return this._entities().some(r=>{let s=this._hass?.states?.[r]?.attributes||{};return Object.keys(s).some(n=>n.startsWith("mass_"))})||t===!0?"/music-assistant":""}_openAssistant(){let t=this._maUrl();if(!t)return;if(/^(https?:)?\/\//i.test(t)){window.open(t,"_blank","noopener");return}let e=t.startsWith("/")?t:`/${t}`;try{window.history.pushState(null,"",e),window.dispatchEvent(new Event("location-changed",{bubbles:!0,composed:!0}))}catch{window.location.href=e}}_onCardClick(t){if(!this._menu)return;(t.composedPath?.()||[]).some(r=>r?.classList?.contains?.("hm-menu"))||(this._menu=null,this.requestUpdate())}_emptyDrawer(){return{open:!1,mode:null,nodes:[],cursor:-1,items:[],title:"",loading:!1,error:""}}_openQueue(){let t=z(this._hass?.language),e=Bt(this._state(),this._config?.max_queue??40);this._drawer={open:!0,mode:"queue",nodes:[],cursor:-1,items:e,title:t("queue"),loading:!1,error:""},this.requestUpdate()}_openLibrary(){let t=z(this._hass?.language);this._drawer={open:!0,mode:"library",nodes:[],cursor:-1,items:[],title:t("library"),loading:!0,error:"",t},this.requestUpdate(),this._fetchBrowse()}_closeDrawer(){this._drawer={...this._drawer,open:!1},this.requestUpdate(),setTimeout(()=>{this._drawer.open||(this._drawer=this._emptyDrawer(),this.requestUpdate())},ea)}async _fetchBrowse(){let t=this._hass,e=t?.connection,a=z(t?.language),r=this._drawer.cursor>=0?this._drawer.nodes[this._drawer.cursor]:null,s={type:"media_player/browse_media",entity_id:this._eid()};if(r&&(s.media_content_id=r.contentId,r.contentType&&(s.media_content_type=r.contentType)),this._drawer={...this._drawer,loading:!0,error:""},this.requestUpdate(),!e?.sendMessagePromise){this._drawer={...this._drawer,loading:!1,error:a("browseFailed")},this.requestUpdate();return}try{let n=await e.sendMessagePromise(s),l=(n?.children||[]).map(o=>({title:o.title||"",subtitle:Ee(o.media_class,this._hass?.language)||o.media_content_type||"",contentId:o.media_content_id||"",contentType:o.media_content_type||"",thumb:o.thumbnail||"",canPlay:!!o.can_play,canExpand:!!o.can_expand,cls:o.media_class||""}));if(this._drawer.mode!=="library")return;this._drawer={...this._drawer,loading:!1,items:l,title:r?.title||n?.title||a("library"),error:""}}catch(n){if(this._drawer.mode!=="library")return;this._drawer={...this._drawer,loading:!1,items:[],error:n?.message?`${a("browseFailed")} \xB7 ${String(n.message).slice(0,40)}`:a("browseFailed")}}this.requestUpdate()}_enterBrowseItem(t){if(!t.canExpand){t.canPlay&&this._playBrowseItem(t);return}let e=this._drawer.nodes.slice(0,this._drawer.cursor+1);e.push({contentId:t.contentId,contentType:t.contentType,title:t.title}),this._drawer={...this._drawer,nodes:e,cursor:e.length-1,title:t.title,items:[]},this.requestUpdate(),this._fetchBrowse()}_browseBack(){this._drawer.cursor<0||(this._drawer={...this._drawer,cursor:this._drawer.cursor-1,items:[]},this.requestUpdate(),this._fetchBrowse())}updated(){let t=this.renderRoot?.querySelector?.(".hm-card");if(!t)return;let e=this._artUrlFor();e!==this._artUrl&&(this._artUrl=e,this._crossFadeArt(t,e)),this._syncRangeValues()}_artUrlFor(){let t=U(this._state());return B(this._hass,t.art)}_crossFadeArt(t,e){let a=t.querySelectorAll(".hm-bg-art");if(!a.length)return;let r=a.length>1?(this._artSlot+1)%2:0,s=a[r],n=a[this._artSlot];if(!e){a.forEach(o=>{o.classList.remove("on"),o.style.backgroundImage=""}),this._artSlot=0,this._maybePalette("");return}let l=new Image;l.decoding="async",l.onload=()=>{s.style.backgroundImage=`url("${e}")`,s.classList.add("on"),n?.classList.remove("on"),this._artSlot=r,this._maybePalette(e)},l.onerror=()=>{this._maybePalette("")},l.src=e}_maybePalette(t){let e=U(this._state()),a=t||`${e.title}|${e.artist}|${this._eid()}`;if(this._paletteKey!==a){if(this._paletteKey=a,!t){this._palette=null,this.requestUpdate();return}Ce(t,a).then(r=>{this._paletteKey===a&&(this._palette=r,this.requestUpdate())})}}_syncRangeValues(){let t=this.renderRoot;if(!t)return;let e=t.querySelector?.('input.hm-range[data-role="seek"]'),a=t.querySelector?.('input.hm-range[data-role="volume"]'),r=U(this._state());if(e&&this._seekPreview===null){let s=r.duration||0,n=v(r.position,0,s||r.position);e.value=String(n),e.max=String(s||0),e.style.setProperty("--pct",`${s?v(n/s*100,0,100):0}%`)}if(a&&this._volumePreview===null){let s=this._volumeInfo(r);a.value=String(Math.round(s.level*100)),a.style.setProperty("--pct",`${s.level*100}%`),a.setAttribute("data-disabled",String(!s.supported))}}getCardSize(){let t=this._layoutKey();return t==="mini"?1:t==="compact"?3:6}render(){let t=this._hass,e=this._config||{},a=z(t?.language),r=this._layoutKey(),s=this._themeKey();if(!t)return h`
        <div class="hm-card" data-layout=${r} data-theme=${s} style=${V(this._themeVars())}>
          <div class="hm-body">
            <div class="hm-empty">${a("loading")}</div>
          </div>
        </div>
      `;let n=this._eid(),l=t.states?.[n];if(!l)return h`
        <div class="hm-card" data-layout=${r} data-theme=${s} style=${V(this._themeVars())}>
          <div class="hm-body">
            <div class="hm-empty">
              ${n?`\u5B9E\u4F53\u672A\u627E\u5230\uFF1A${n}`:"ha-music: entity \u672A\u914D\u7F6E"}
            </div>
          </div>
        </div>
      `;let o=U(l),p=Bt(l,e.max_queue??40),d=l.state==="playing"||l.state==="buffering",u=ra(l.state),g=a(u),x=o.album||o.series||o.appName||(u==="playing"?a("playing"):g),b=this._volumeInfo(o),Z=e.show_volume!==!1&&b.supported,X=y(l,_.SHUFFLE_SET),w=y(l,_.REPEAT_SET),k=y(l,_.PREVIOUS_TRACK),R=y(l,_.NEXT_TRACK),O=y(l,_.PLAY)||y(l,_.PAUSE),N=l.state==="off"||l.state==="standby",E=N?y(l,_.TURN_ON):y(l,_.TURN_OFF),J=y(l,_.BROWSE_MEDIA),tt=this._maUrl(),gt=y(l,_.SEEK),S=Array.isArray(l.attributes?.source_list)?l.attributes.source_list:[],L=Array.isArray(l.attributes?.sound_mode_list)?l.attributes.sound_mode_list:[],et=e.show_source!==!1&&S.length>0&&y(l,_.SELECT_SOURCE),I=L.length>0&&y(l,_.SELECT_SOUND_MODE),At=o.groupMembers.filter($=>$&&$!==n),Zt=e.show_group!==!1&&o.groupMembers.length>1,ze=e.show_queue!==!1&&p.length>0,Te=e.show_library!==!1&&J,Et=e.visualizer||"bars",Pe=e.cover||"ambient",j=o.duration,bt=this._seekPreview??o.position,Ue=j?v(bt/j*100,0,100):0,St=Math.round(b.level*100),K=this._repeatValue(),ft=o.title||"",Xt=this._entities(),Jt=B(t,o.art);return h`
      <div
        class="hm-card"
        data-theme=${s}
        data-layout=${r}
        data-playing=${d?"true":"false"}
        data-cover=${Pe}
        style=${V(this._themeVars())}
        @click=${this._onCardClick}
      >
        <div class="hm-bg">
          <div class="hm-bg-art"></div>
          <div class="hm-bg-art"></div>
          <div class="hm-bg-grad"></div>
          <div class="hm-grid"></div>
          <div class="hm-noise"></div>
          <div class="hm-sheen"></div>
        </div>

        <div class="hm-body">
          <header class="hm-top">
            <div class="hm-status">
              <span class="hm-dot"></span>
              <span class="hm-status-text">${g}</span>
              <span class="hm-kicker-sep">·</span>
              <span class="hm-status-text hm-status-player">${e.name||wt(t,n,n)}</span>
            </div>
            <div class="hm-top-actions">
              ${tt?h`<button
                    class="hm-icon-btn hm-ma"
                    aria-label=${a("assistant")}
                    title=${a("assistant")}
                    @click=${()=>this._openAssistant()}
                  >
                    MA
                  </button>`:c}
              ${ze?h`<button
                    class="hm-icon-btn"
                    aria-label=${a("queue")}
                    title=${a("queue")}
                    @click=${()=>this._openQueue()}
                  >
                    ${f("queue",16)}
                  </button>`:c}
              ${Te?h`<button
                    class="hm-icon-btn"
                    aria-label=${a("library")}
                    title=${a("library")}
                    @click=${()=>this._openLibrary()}
                  >
                    ${f("library",16)}
                  </button>`:c}
              ${E?h`<button
                    class="hm-icon-btn"
                    aria-label=${a("power")}
                    title=${a("power")}
                    @click=${()=>this._power()}
                  >
                    ${f("power",16)}
                  </button>`:c}
              <button
                class="hm-icon-btn"
                aria-label=${a("more")}
                title=${a("more")}
                @click=${()=>this._moreInfo()}
              >
                ${f("more",16)}
              </button>
            </div>
          </header>

          ${Xt.length>1?h`
                <div class="hm-entities">
                  ${Xt.map($=>{let Mt=t.states?.[$],at=B(t,Mt?.attributes?.entity_picture);return h`<button
                      class="hm-entity-chip"
                      data-active=${$===n?"true":"false"}
                      @click=${()=>this._switchEntity($)}
                    >
                      <span
                        class="hm-entity-dot"
                        style=${at?`background-image:url("${at}")`:""}
                      ></span>
                      <span class="hm-entity-name">${wt(t,$,$)}</span>
                    </button>`})}
                </div>`:c}

          <section class="hm-main">
            <div class="hm-cover-wrap">
              <button
                class="hm-cover"
                data-playing=${d?"true":"false"}
                aria-label=${a("more")}
                title=${ft||a("noMedia")}
                @click=${()=>this._moreInfo()}
              >
                ${Jt?h`<img src=${Jt} alt=${ft||""} />`:h`<span class="hm-cover-ph">${f("music",40)}</span>`}
              </button>
              <div class="hm-cover-halo"></div>
            </div>

            <div class="hm-meta">
              <div class="hm-kicker">
                ${x||a("noMedia")}
                ${o.track?h`<span class="hm-kicker-sep">·</span>
                      <span>${a("track")} ${o.track}</span>`:c}
              </div>
              <h2 class="hm-title ${ft?"":"placeholder"}">
                ${ft||a("noTitle")}
              </h2>
              <div class="hm-artist">
                ${o.artist||(o.album?o.album:g)}
              </div>
              ${et||I||Zt?h`<div class="hm-tags">
                    ${et?h`<button
                          class="hm-chip interactive"
                          @click=${()=>{this._menu=this._menu==="source"?null:"source",this.requestUpdate()}}
                        >
                          <span class="hm-chip-label">${a("source")}</span>
                          <span class="hm-chip-value">${o.source||"\u2014"}</span>
                        </button>`:c}
                    ${I?h`<button
                          class="hm-chip interactive"
                          @click=${()=>{this._menu=this._menu==="sound"?null:"sound",this.requestUpdate()}}
                        >
                          <span class="hm-chip-label">${a("soundMode")}</span>
                          <span class="hm-chip-value">${o.soundMode||"\u2014"}</span>
                        </button>`:c}
                    ${Zt?h`<span
                          class="hm-chip ${y(l,_.GROUPING)?"interactive":""}"
                          title=${y(l,_.GROUPING)?`${a("group")} \xB7 ${a("groupLeave")}`:a("group")}
                          @click=${()=>{y(l,_.GROUPING)&&this._leaveGroup()}}
                        >
                          ${f("group",13)}
                          <span class="hm-group">
                            ${At.slice(0,3).map($=>{let Mt=t.states?.[$],at=B(t,Mt?.attributes?.entity_picture);return h`<span
                                class="hm-group-avatar"
                                title=${wt(t,$,$)}
                                style=${at?`background-image:url("${at}")`:""}
                              ></span>`})}
                            ${At.length>3?h`<span class="hm-group-more">+${At.length-3}</span>`:c}
                          </span>
                        </span>`:c}
                  </div>`:c}
            </div>
          </section>

          ${Et!=="none"?h`<div
                class="hm-vis"
                data-playing=${d?"true":"false"}
                data-style=${Et}
              >
                ${this._renderVisualizer(Et,o)}
              </div>`:c}

          ${j>0?h`<section class="hm-progress">
                <span class="hm-time">${ut(bt)}</span>
                <input
                  class="hm-range"
                  data-role="seek"
                  type="range"
                  min="0"
                  max=${j}
                  step="0.5"
                  .value=${String(bt)}
                  data-disabled=${gt?"false":"true"}
                  style=${V({"--pct":`${Ue}%`})}
                  @input=${this._onSeekInput}
                  @change=${this._onSeekCommit}
                  aria-label=${a("seek")}
                />
                <span
                  class="hm-time end hoverable"
                  title=${a("remaining")}
                  @click=${()=>{this._showRemaining=!this._showRemaining,this.requestUpdate()}}
                >
                  ${this._showRemaining?`-${ut(Math.max(j-bt,0))}`:ut(j)}
                </span>
              </section>`:c}

          <section class="hm-controls">
            <div class="hm-transport">
              ${X?h`<button
                    class="hm-btn"
                    data-role="shuffle"
                    data-on=${o.shuffle?"true":"false"}
                    aria-label=${a("shuffle")}
                    title=${a("shuffle")}
                    @click=${()=>this._shuffle()}
                  >
                    ${f("shuffle",18)}
                  </button>`:c}
              ${k?h`<button
                    class="hm-btn"
                    data-role="previous"
                    aria-label=${a("previous")}
                    title=${a("previous")}
                    @click=${()=>this._guard(this._call("media_previous_track"))}
                  >
                    ${f("previous",18)}
                  </button>`:c}
              ${O?h`<button
                    class="hm-play ${d?"is-playing":""}"
                    aria-label=${a(d?"pause":"play")}
                    title=${a(d?"pause":"play")}
                    @click=${()=>this._togglePlay()}
                  >
                    ${d?f("pause",26):f("play",26)}
                  </button>`:c}
              ${R?h`<button
                    class="hm-btn"
                    aria-label=${a("next")}
                    title=${a("next")}
                    @click=${()=>this._guard(this._call("media_next_track"))}
                  >
                    ${f("next",18)}
                  </button>`:c}
              ${w?h`<button
                    class="hm-btn"
                    data-role="repeat"
                    data-on=${K!=="off"?"true":"false"}
                    aria-label=${a(K==="one"?"repeatOne":K==="all"?"repeatAll":"repeatOff")}
                    title=${a(K==="one"?"repeatOne":K==="all"?"repeatAll":"repeatOff")}
                    @click=${()=>this._repeat()}
                  >
                    ${f(K==="one"?"repeatOne":"repeat",18)}
                  </button>`:c}
            </div>

            ${Z?h`<div class="hm-volume">
                  <button
                    class="hm-icon-btn"
                    aria-label=${b.muted?a("unmute"):a("mute")}
                    title=${b.muted?a("unmute"):a("mute")}
                    @click=${()=>this._toggleMute()}
                  >
                    ${f(b.muted?"mute":"volume",16)}
                  </button>
                  <input
                    class="hm-range"
                    data-role="volume"
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    .value=${String(St)}
                    style=${V({"--pct":`${St}%`})}
                    @input=${this._onVolumeInput}
                    @change=${this._onVolumeCommit}
                    aria-label=${a("volume")}
                  />
                  <span class="hm-vol-pct">${St}%</span>
                </div>`:c}
          </section>
        </div>

        ${this._menu?h`<div class="hm-menu">
              <div class="hm-menu-head">
                ${this._menu==="source"?a("source"):a("soundMode")}
              </div>
              ${(this._menu==="source"?S:L).map($=>h`<button
                  class="hm-menu-item"
                  data-active=${(this._menu==="source"?o.source:o.soundMode)===$?"true":"false"}
                  @click=${()=>this._menu==="source"?this._selectSource($):this._selectSoundMode($)}
                >
                  <span>${$}</span>
                  <span class="hm-menu-check">${f("check",13)}</span>
                </button>`)}
            </div>`:c}

        ${this._renderDrawer()}

        <div class="hm-toast ${this._toast?"show":""}">${this._toast}</div>
      </div>
    `}_renderVisualizer(t,e){if(t==="wave")return h`<div class="hm-wave-wrap">
        <svg viewBox="0 0 600 40" preserveAspectRatio="none" aria-hidden="true">
          <path
            d=${Yt(600,40,150,14,0)}
            fill="none"
            stroke="rgba(var(--hm-a1-rgb), 0.85)"
            stroke-width="1.4"
          ></path>
          <path
            d=${Yt(600,40,150,9,1.9)}
            fill="none"
            stroke="rgba(var(--hm-a2-rgb), 0.6)"
            stroke-width="1.2"
          ></path>
          <path
            d=${Yt(600,40,75,5,3.2)}
            fill="none"
            stroke="rgba(var(--hm-a1-rgb), 0.35)"
            stroke-width="0.9"
          ></path>
        </svg>
      </div>`;if(t==="orbit")return h`<div class="hm-orbit-wrap">
        <span class="hm-orbit-ring"></span>
        <span class="hm-orbit-ring"></span>
        <span class="hm-orbit-ring"></span>
      </div>`;let a=`${e.title}|${e.artist}`;return h`<div class="hm-bars">
      ${Array.from({length:36},(s,n)=>{let l=Q(`${a}#${n}`),o=.16+l%100/130,p=.9+(l>>8)%100/90,d=-((l>>16)%100/45);return h`<span
          class="hm-bar"
          style=${V({"--h":String(Math.min(o,1)),"--dur":`${p.toFixed(2)}s`,"--delay":`${d.toFixed(2)}s`})}
        ></span>`})}
    </div>`}_renderDrawer(){let t=this._drawer,e=z(this._hass?.language),a=t.mode==="library";return h`
      <div
        class="hm-drawer ${t.open?"open":""}"
        role="dialog"
        aria-hidden=${t.open?"false":"true"}
      >
        <div class="hm-drawer-head">
          ${a&&t.cursor>=0?h`<button
                class="hm-icon-btn"
                aria-label=${e("back")}
                title=${e("back")}
                @click=${()=>this._browseBack()}
              >
                ${f("chevronLeft",16)}
              </button>`:c}
          <div class="hm-drawer-title">${t.title||(a?e("library"):"")}</div>
          <button
            class="hm-icon-btn"
            aria-label=${e("close")}
            title=${e("close")}
            @click=${()=>this._closeDrawer()}
          >
            ${f("close",16)}
          </button>
        </div>
        <div class="hm-drawer-body">
          ${t.loading?h`<div class="hm-empty"><span class="hm-spinner"></span></div>`:t.error?h`<div class="hm-empty">${t.error}</div>`:t.items.length?this._renderDrawerItems(t.items,a):h`<div class="hm-empty">
                    ${e(a?"browseFailed":"queueEmpty")}
                  </div>`}
        </div>
      </div>
    `}_renderDrawerItems(t,e){let a=z(this._hass?.language);return t.map(r=>{if(e){let n=B(this._hass,r.thumb);return h`<button
          class="hm-list-item"
          @click=${()=>this._enterBrowseItem(r)}
        >
          <span
            class="hm-list-thumb"
            style=${n?`background-image:url("${n}")`:""}
          >
            ${n?c:f(r.canExpand?"library":"music",16)}
          </span>
          <span class="hm-list-text">
            <span class="hm-list-name">${r.title||"\u2014"}</span>
            <span class="hm-list-sub">${r.subtitle}</span>
          </span>
          <span class="hm-list-tail">
            ${r.canExpand?f("chevronRight",14):c}
          </span>
        </button>`}let s=B(this._hass,r.art);return h`<button
        class="hm-list-item"
        data-active=${r.active?"true":"false"}
        @click=${()=>this._playQueueItem(r)}
      >
        <span
          class="hm-list-thumb"
          style=${s?`background-image:url("${s}")`:""}
        >
          ${s?c:f("music",16)}
        </span>
        <span class="hm-list-text">
          <span class="hm-list-name">${r.title||a("noTitle")}</span>
          <span class="hm-list-sub">${r.artist||r.album||""}</span>
        </span>
        <span class="hm-list-tail">${r.duration?ut(r.duration):""}</span>
      </button>`})}static getStubConfig(t){let e=t?.states||{};return{entity:Object.keys(e).find(r=>r.startsWith("media_player.")&&e[r]?.attributes?.supported_features!==void 0)||"",theme:Dt}}static getConfigElement(){return document.createElement("ha-music-editor")}};customElements.define("ha-music",Gt);window.customCards=window.customCards||[];window.customCards.push({type:ke,name:Ae,description:"\u73B0\u4EE3\u70AB\u9177\u914D\u8272\u7684\u5168\u529F\u80FD\u97F3\u4E50\u64AD\u653E\u5668\u5361\u7247\uFF1A\u5C01\u9762\u53D6\u8272\u3001\u9891\u8C31\u53EF\u89C6\u5316\u3001\u5A92\u4F53\u5E93\u6D4F\u89C8\u3001\u64AD\u653E\u961F\u5217\u3001\u591A\u8BBE\u5907\u5207\u6362\u3002",preview:!0,documentationURL:"https://github.com/RockJesus/ha-music"});console.info(`%c HA-MUSIC %c v${we} `,"background:#2ee6c5;color:#04121a;font-weight:700;border-radius:4px 0 0 4px","background:#7b5cff;color:#fff;border-radius:0 4px 4px 0");function ia(i,t){i.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}var Qt=class extends A{static get properties(){return{hass:{attribute:!1},_config:{state:!0}}}static get styles(){return it`
      :host {
        display: block;
      }
      .wrap {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 4px 0 10px;
        font-family: var(
          --paper-font-common-base_-_font-family,
          "PingFang SC",
          -apple-system,
          "Segoe UI",
          Roboto,
          sans-serif
        );
      }
      .section {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .section-title {
        font-size: 11px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--secondary-text-color);
      }
      .field {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .label {
        font-size: 12px;
        color: var(--primary-text-color);
      }
      .hint {
        font-size: 11px;
        color: var(--secondary-text-color);
        line-height: 1.45;
      }
      select,
      input[type="text"],
      input[type="color"] {
        width: 100%;
        box-sizing: border-box;
        padding: 8px 10px;
        border-radius: 8px;
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color);
        font-size: 13px;
        font-family: inherit;
      }
      input[type="color"] {
        padding: 2px;
        height: 36px;
      }
      .switch-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        padding: 3px 0;
      }
      .entity-row {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .entity-row ha-entity-picker {
        flex: 1 1 auto;
        min-width: 0;
      }
      .mini-btn {
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        background: transparent;
        color: var(--primary-text-color);
        border-radius: 8px;
        padding: 6px 10px;
        font-size: 12px;
        cursor: pointer;
        font-family: inherit;
        white-space: nowrap;
      }
      .mini-btn:hover {
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
      }
      .add {
        align-self: flex-start;
      }
      .grid2 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
      }
      .check {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 12px;
        color: var(--primary-text-color);
      }
      input[type="checkbox"] {
        width: 16px;
        height: 16px;
        accent-color: var(--primary-color, #2ee6c5);
      }
    `}constructor(){super(),this._config={},this._lang="en"}setConfig(t){this._config={...t}}get _zh(){return $t(this._lang||this.hass?.language)}_update(t){let e={...this._config,...t};Object.keys(e).forEach(a=>{e[a]===void 0&&delete e[a]}),this._config=e,ia(this,e)}_optionLabel(t){return this._zh?t.zh:t.en}_entities(){return Array.isArray(this._config.entities)&&this._config.entities.length?this._config.entities:[]}_setEntity(t,e){let a=this._entities();if(!a.length){this._update({entity:e||void 0});return}let r=[...a];r[t]=e,this._update({entities:r})}_addEntity(){let t=this._entities();if(t.length){this._update({entities:[...t,""]});return}let e=this._config.entity?[this._config.entity,""]:["",""];this._update({entities:e,entity:void 0})}_removeEntity(t){let e=this._entities().filter((a,r)=>r!==t);if(e.length<=1){this._update({entity:e[0]||void 0,entities:void 0});return}this._update({entities:e})}updated(){this._lang=this.hass?.language||this._lang}render(){let t=this._config||{},e=this._entities(),a=(r,s,n)=>h`
      <ha-entity-picker
        .hass=${this.hass}
        .value=${r||""}
        .includeDomains=${["media_player"]}
        .allowCustomEntity=${!1}
        .label=${n}
        @value-changed=${l=>{l.stopPropagation(),this._setEntity(s,l.detail?.value??"")}}
      ></ha-entity-picker>
    `;return h`
      <div class="wrap">
        <div class="section">
          <div class="section-title">${this._zh?"\u64AD\u653E\u5668":"Player"}</div>
          ${e.length?e.map((r,s)=>h`
                  <div class="entity-row">
                    ${a(r,s,s===0?this._zh?"\u64AD\u653E\u5668":"Player":this._zh?"\u8BBE\u5907":"Player")}
                    <button
                      class="mini-btn"
                      @click=${()=>this._removeEntity(s)}
                      title=${this._zh?"\u79FB\u9664":"Remove"}
                    >
                      ${this._zh?"\u79FB\u9664":"Remove"}
                    </button>
                  </div>
                `):h`<div class="entity-row">
                ${a(t.entity||"",0,this._zh?"\u64AD\u653E\u5668":"Player")}
              </div>`}
          <button class="mini-btn add" @click=${()=>this._addEntity()}>
            ${this._zh?"\uFF0B \u6DFB\u52A0\u64AD\u653E\u5668":"\uFF0B Add player"}
          </button>
          ${e.length?h`<div class="hint">
                ${this._zh?"\u591A\u8BBE\u5907\u6A21\u5F0F\uFF1A\u5361\u7247\u9876\u90E8\u4F1A\u51FA\u73B0\u8BBE\u5907\u5207\u6362\u6807\u7B7E\u3002":"Multi-player mode adds switching chips on top of the card."}
              </div>`:c}
        </div>

        <div class="section">
          <div class="section-title">${this._zh?"\u5916\u89C2":"Appearance"}</div>
          <div class="grid2">
            <label class="field">
              <span class="label">${this._zh?"\u5E03\u5C40":"Layout"}</span>
              <select
                .value=${t.layout||"adaptive"}
                @change=${r=>this._update({layout:r.target.value})}
              >
                ${Object.keys(Ft).map(r=>h`<option value=${r} ?selected=${t.layout===r}>
                      ${this._optionLabel(Ft[r])}
                    </option>`)}
              </select>
            </label>
            <label class="field">
              <span class="label">${this._zh?"\u4E3B\u9898":"Theme"}</span>
              <select
                .value=${t.theme||"aurora"}
                @change=${r=>this._update({theme:r.target.value})}
              >
                ${Object.keys(G).map(r=>h`<option value=${r} ?selected=${t.theme===r}>
                      ${this._optionLabel(G[r].label)}
                    </option>`)}
              </select>
            </label>
            <label class="field">
              <span class="label">${this._zh?"\u80CC\u666F":"Background"}</span>
              <select
                .value=${t.cover||"ambient"}
                @change=${r=>this._update({cover:r.target.value})}
              >
                ${Object.keys(Vt).map(r=>h`<option value=${r} ?selected=${t.cover===r}>
                      ${this._optionLabel(Vt[r])}
                    </option>`)}
              </select>
            </label>
            <label class="field">
              <span class="label">${this._zh?"\u9891\u8C31\u52A8\u6548":"Visualizer"}</span>
              <select
                .value=${t.visualizer||"bars"}
                @change=${r=>this._update({visualizer:r.target.value})}
              >
                ${Object.keys(Ht).map(r=>h`<option value=${r} ?selected=${t.visualizer===r}>
                      ${this._optionLabel(Ht[r])}
                    </option>`)}
              </select>
            </label>
          </div>
          <label class="field">
            <span class="label">${this._zh?"\u6807\u9898\uFF08\u7559\u7A7A\u7528\u5B9E\u4F53\u540D\u79F0\uFF09":"Title (optional)"}</span>
            <input
              type="text"
              .value=${t.name||""}
              @input=${r=>this._update({name:r.target.value||void 0})}
            />
          </label>
          <label class="field">
            <span class="label">${this._zh?"\u5F3A\u8C03\u8272\u8986\u76D6\uFF08\u53EF\u9009\uFF09":"Accent override (optional)"}</span>
            <input
              type="color"
              .value=${t.accent||"#2ee6c5"}
              @input=${r=>this._update({accent:r.target.value})}
            />
          </label>
          <div class="check">
            <input
              type="checkbox"
              id="ha-music-palette"
              .checked=${t.palette!==!1}
              @change=${r=>this._update({palette:r.target.checked})}
            />
            <label for="ha-music-palette">
              ${this._zh?"\u4ECE\u5C01\u9762\u81EA\u52A8\u53D6\u8272":"Extract colors from cover art"}
            </label>
          </div>
        </div>

        <div class="section">
          <div class="section-title">${this._zh?"\u663E\u793A\u5185\u5BB9":"Visible elements"}</div>
          <label class="field">
            <span class="label">
              ${this._zh?"\u97F3\u91CF\u5B9E\u4F53\uFF08\u53EF\u9009\uFF0C\u7528\u4E8E\u65E0\u97F3\u91CF\u80FD\u529B\u7684\u64AD\u653E\u5668\uFF09":"Volume entity (optional)"}
            </span>
            <input
              type="text"
              .value=${t.volume_entity||""}
              placeholder="number.volume / media_player.amp"
              @change=${r=>this._update({volume_entity:r.target.value||void 0})}
            />
          </label>
          ${this._switch(this._zh?"\u663E\u793A\u97F3\u91CF\u6761":"Show volume",t.show_volume!==!1,r=>this._update({show_volume:r}))}
          ${this._switch(this._zh?"\u663E\u793A\u97F3\u6E90\u9009\u62E9":"Show source picker",t.show_source!==!1,r=>this._update({show_source:r}))}
          ${this._switch(this._zh?"\u663E\u793A\u64AD\u653E\u961F\u5217":"Show queue",t.show_queue!==!1,r=>this._update({show_queue:r}))}
          ${this._switch(this._zh?"\u663E\u793A\u5A92\u4F53\u5E93\u6D4F\u89C8":"Show media browser",t.show_library!==!1,r=>this._update({show_library:r}))}
          ${this._switch(this._zh?"\u663E\u793A\u5206\u7EC4\u4FE1\u606F":"Show group info",t.show_group!==!1,r=>this._update({show_group:r}))}
          ${this._switch(this._zh?"\u663E\u793A Music Assistant \u5165\u53E3":"Show Music Assistant shortcut",t.music_assistant!==!1,r=>this._update({music_assistant:r?typeof t.music_assistant=="string"?t.music_assistant:!0:!1}))}
          <label class="field">
            <span class="label">
              ${this._zh?"Music Assistant \u5730\u5740\uFF08\u7559\u7A7A\u81EA\u52A8\uFF09":"Music Assistant URL (optional)"}
            </span>
            <input
              type="text"
              .value=${typeof t.music_assistant=="string"?t.music_assistant:""}
              placeholder="/music-assistant"
              @change=${r=>this._update({music_assistant:r.target.value.trim()||!0})}
            />
            <span class="hint">
              ${this._zh?"\u7559\u7A7A\u4F7F\u7528 /music-assistant\uFF1B\u4E5F\u53EF\u586B https:// \u5916\u90E8\u5730\u5740\u6216\u52A0\u8F7D\u9879 ingress \u8DEF\u5F84":"Leave empty for /music-assistant; absolute URLs open in a new tab"}
            </span>
          </label>
        </div>
      </div>
    `}_switch(t,e,a){return h`<div class="switch-row">
      <span class="label">${t}</span>
      <input
        type="checkbox"
        .checked=${e}
        @change=${r=>a(r.target.checked)}
      />
    </div>`}};customElements.define("ha-music-editor",Qt);
