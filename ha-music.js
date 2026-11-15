var zt=globalThis,Tt=zt.ShadowRoot&&(zt.ShadyCSS===void 0||zt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Yt=Symbol(),Ce=new WeakMap,ut=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==Yt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(Tt&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=Ce.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&Ce.set(e,t))}return t}toString(){return this.cssText}},Re=s=>new ut(typeof s=="string"?s:s+"",void 0,Yt),mt=(s,...t)=>{let e=s.length===1?s[0]:t.reduce((i,a,n)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+s[n+1],s[0]);return new ut(e,s,Yt)},ze=(s,t)=>{if(Tt)s.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),a=zt.litNonce;a!==void 0&&i.setAttribute("nonce",a),i.textContent=e.cssText,s.appendChild(i)}},Gt=Tt?s=>s:s=>s instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return Re(e)})(s):s;var{is:Ui,defineProperty:Li,getOwnPropertyDescriptor:Di,getOwnPropertyNames:Ii,getOwnPropertySymbols:Fi,getPrototypeOf:Bi}=Object,I=globalThis,Te=I.trustedTypes,Hi=Te?Te.emptyScript:"",Vi=I.reactiveElementPolyfillSupport,gt=(s,t)=>s,Xt={toAttribute(s,t){switch(t){case Boolean:s=s?Hi:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,t){let e=s;switch(t){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},Oe=(s,t)=>!Ui(s,t),qe={attribute:!0,type:String,converter:Xt,reflect:!1,useDefault:!1,hasChanged:Oe};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),I.litPropertyMetadata??(I.litPropertyMetadata=new WeakMap);var O=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=qe){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),a=this.getPropertyDescriptor(t,i,e);a!==void 0&&Li(this.prototype,t,a)}}static getPropertyDescriptor(t,e,i){let{get:a,set:n}=Di(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get:a,set(r){let o=a?.call(this);n?.call(this,r),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??qe}static _$Ei(){if(this.hasOwnProperty(gt("elementProperties")))return;let t=Bi(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(gt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(gt("properties"))){let e=this.properties,i=[...Ii(e),...Fi(e)];for(let a of i)this.createProperty(a,e[a])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,a]of e)this.elementProperties.set(i,a)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let a=this._$Eu(e,i);a!==void 0&&this._$Eh.set(a,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let a of i)e.unshift(Gt(a))}else t!==void 0&&e.push(Gt(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ze(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),a=this.constructor._$Eu(t,i);if(a!==void 0&&i.reflect===!0){let n=(i.converter?.toAttribute!==void 0?i.converter:Xt).toAttribute(e,i.type);this._$Em=t,n==null?this.removeAttribute(a):this.setAttribute(a,n),this._$Em=null}}_$AK(t,e){let i=this.constructor,a=i._$Eh.get(t);if(a!==void 0&&this._$Em!==a){let n=i.getPropertyOptions(a),r=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:Xt;this._$Em=a;let o=r.fromAttribute(e,n.type);this[a]=o??this._$Ej?.get(a)??o,this._$Em=null}}requestUpdate(t,e,i,a=!1,n){if(t!==void 0){let r=this.constructor;if(a===!1&&(n=this[t]),i??(i=r.getPropertyOptions(t)),!((i.hasChanged??Oe)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:a,wrapped:n},r){i&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,r??e??this[t]),n!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),a===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[a,n]of this._$Ep)this[a]=n;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[a,n]of i){let{wrapped:r}=n,o=this[a];r!==!0||this._$AL.has(a)||o===void 0||this.C(a,void 0,n,o)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};O.elementStyles=[],O.shadowRootOptions={mode:"open"},O[gt("elementProperties")]=new Map,O[gt("finalized")]=new Map,Vi?.({ReactiveElement:O}),(I.reactiveElementVersions??(I.reactiveElementVersions=[])).push("2.1.2");var bt=globalThis,Ne=s=>s,qt=bt.trustedTypes,Ue=qt?qt.createPolicy("lit-html",{createHTML:s=>s}):void 0,He="$lit$",F=`lit$${Math.random().toFixed(9).slice(2)}$`,Ve="?"+F,ji=`<${Ve}>`,Y=document,_t=()=>Y.createComment(""),yt=s=>s===null||typeof s!="object"&&typeof s!="function",ae=Array.isArray,Wi=s=>ae(s)||typeof s?.[Symbol.iterator]=="function",Jt=`[ 	
\f\r]`,ft=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Le=/-->/g,De=/>/g,W=RegExp(`>|${Jt}(?:([^\\s"'>=/]+)(${Jt}*=${Jt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ie=/'/g,Fe=/"/g,je=/^(?:script|style|textarea|title)$/i,se=s=>(t,...e)=>({_$litType$:s,strings:t,values:e}),p=se(1),_=se(2),_a=se(3),N=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),Be=new WeakMap,K=Y.createTreeWalker(Y,129);function We(s,t){if(!ae(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ue!==void 0?Ue.createHTML(t):t}var Ki=(s,t)=>{let e=s.length-1,i=[],a,n=t===2?"<svg>":t===3?"<math>":"",r=ft;for(let o=0;o<e;o++){let l=s[o],h,d,c=-1,g=0;for(;g<l.length&&(r.lastIndex=g,d=r.exec(l),d!==null);)g=r.lastIndex,r===ft?d[1]==="!--"?r=Le:d[1]!==void 0?r=De:d[2]!==void 0?(je.test(d[2])&&(a=RegExp("</"+d[2],"g")),r=W):d[3]!==void 0&&(r=W):r===W?d[0]===">"?(r=a??ft,c=-1):d[1]===void 0?c=-2:(c=r.lastIndex-d[2].length,h=d[1],r=d[3]===void 0?W:d[3]==='"'?Fe:Ie):r===Fe||r===Ie?r=W:r===Le||r===De?r=ft:(r=W,a=void 0);let m=r===W&&s[o+1].startsWith("/>")?" ":"";n+=r===ft?l+ji:c>=0?(i.push(h),l.slice(0,c)+He+l.slice(c)+F+m):l+F+(c===-2?o:m)}return[We(s,n+(s[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},xt=class s{constructor({strings:t,_$litType$:e},i){let a;this.parts=[];let n=0,r=0,o=t.length-1,l=this.parts,[h,d]=Ki(t,e);if(this.el=s.createElement(h,i),K.currentNode=this.el.content,e===2||e===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(a=K.nextNode())!==null&&l.length<o;){if(a.nodeType===1){if(a.hasAttributes())for(let c of a.getAttributeNames())if(c.endsWith(He)){let g=d[r++],m=a.getAttribute(c).split(F),f=/([.?@])?(.*)/.exec(g);l.push({type:1,index:n,name:f[2],strings:m,ctor:f[1]==="."?Zt:f[1]==="?"?te:f[1]==="@"?ee:et}),a.removeAttribute(c)}else c.startsWith(F)&&(l.push({type:6,index:n}),a.removeAttribute(c));if(je.test(a.tagName)){let c=a.textContent.split(F),g=c.length-1;if(g>0){a.textContent=qt?qt.emptyScript:"";for(let m=0;m<g;m++)a.append(c[m],_t()),K.nextNode(),l.push({type:2,index:++n});a.append(c[g],_t())}}}else if(a.nodeType===8)if(a.data===Ve)l.push({type:2,index:n});else{let c=-1;for(;(c=a.data.indexOf(F,c+1))!==-1;)l.push({type:7,index:n}),c+=F.length-1}n++}}static createElement(t,e){let i=Y.createElement("template");return i.innerHTML=t,i}};function tt(s,t,e=s,i){if(t===N)return t;let a=i!==void 0?e._$Co?.[i]:e._$Cl,n=yt(t)?void 0:t._$litDirective$;return a?.constructor!==n&&(a?._$AO?.(!1),n===void 0?a=void 0:(a=new n(s),a._$AT(s,e,i)),i!==void 0?(e._$Co??(e._$Co=[]))[i]=a:e._$Cl=a),a!==void 0&&(t=tt(s,a._$AS(s,t.values),a,i)),t}var Qt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,a=(t?.creationScope??Y).importNode(e,!0);K.currentNode=a;let n=K.nextNode(),r=0,o=0,l=i[0];for(;l!==void 0;){if(r===l.index){let h;l.type===2?h=new vt(n,n.nextSibling,this,t):l.type===1?h=new l.ctor(n,l.name,l.strings,this,t):l.type===6&&(h=new ie(n,this,t)),this._$AV.push(h),l=i[++o]}r!==l?.index&&(n=K.nextNode(),r++)}return K.currentNode=Y,a}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},vt=class s{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,a){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=tt(this,t,e),yt(t)?t===u||t==null||t===""?(this._$AH!==u&&this._$AR(),this._$AH=u):t!==this._$AH&&t!==N&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Wi(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==u&&yt(this._$AH)?this._$AA.nextSibling.data=t:this.T(Y.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,a=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=xt.createElement(We(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===a)this._$AH.p(e);else{let n=new Qt(a,this),r=n.u(this.options);n.p(e),this.T(r),this._$AH=n}}_$AC(t){let e=Be.get(t.strings);return e===void 0&&Be.set(t.strings,e=new xt(t)),e}k(t){ae(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,a=0;for(let n of t)a===e.length?e.push(i=new s(this.O(_t()),this.O(_t()),this,this.options)):i=e[a],i._$AI(n),a++;a<e.length&&(this._$AR(i&&i._$AB.nextSibling,a),e.length=a)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=Ne(t).nextSibling;Ne(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},et=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,a,n){this.type=1,this._$AH=u,this._$AN=void 0,this.element=t,this.name=e,this._$AM=a,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=u}_$AI(t,e=this,i,a){let n=this.strings,r=!1;if(n===void 0)t=tt(this,t,e,0),r=!yt(t)||t!==this._$AH&&t!==N,r&&(this._$AH=t);else{let o=t,l,h;for(t=n[0],l=0;l<n.length-1;l++)h=tt(this,o[i+l],e,l),h===N&&(h=this._$AH[l]),r||(r=!yt(h)||h!==this._$AH[l]),h===u?t=u:t!==u&&(t+=(h??"")+n[l+1]),this._$AH[l]=h}r&&!a&&this.j(t)}j(t){t===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Zt=class extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===u?void 0:t}},te=class extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==u)}},ee=class extends et{constructor(t,e,i,a,n){super(t,e,i,a,n),this.type=5}_$AI(t,e=this){if((t=tt(this,t,e,0)??u)===N)return;let i=this._$AH,a=t===u&&i!==u||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==u&&(i===u||a);a&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ie=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){tt(this,t)}};var Yi=bt.litHtmlPolyfillSupport;Yi?.(xt,vt),(bt.litHtmlVersions??(bt.litHtmlVersions=[])).push("3.3.3");var Ke=(s,t,e)=>{let i=e?.renderBefore??t,a=i._$litPart$;if(a===void 0){let n=e?.renderBefore??null;i._$litPart$=a=new vt(t.insertBefore(_t(),n),n,void 0,e??{})}return a._$AI(s),a};var wt=globalThis,R=class extends O{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ke(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return N}};R._$litElement$=!0,R.finalized=!0,wt.litElementHydrateSupport?.({LitElement:R});var Gi=wt.litElementPolyfillSupport;Gi?.({LitElement:R});(wt.litElementVersions??(wt.litElementVersions=[])).push("4.2.2");var Ye={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ge=s=>(...t)=>({_$litDirective$:s,values:t}),Ot=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var Xe="important",Xi=" !"+Xe,U=Ge(class extends Ot{constructor(s){if(super(s),s.type!==Ye.ATTRIBUTE||s.name!=="style"||s.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(s){return Object.keys(s).reduce((t,e)=>{let i=s[e];return i==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(s,[t]){let{style:e}=s.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let i of this.ft)t[i]==null&&(this.ft.delete(i),i.includes("-")?e.removeProperty(i):e[i]=null);for(let i in t){let a=t[i];if(a!=null){this.ft.add(i);let n=typeof a=="string"&&a.endsWith(Xi);i.includes("-")||n?e.setProperty(i,n?a.slice(0,-11):a,n?Xe:""):e[i]=a}}return N}});var Je=mt`
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
    box-sizing: border-box;
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
    border-radius: 50%;
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
    transform-origin: 50% 50%;
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
    border-radius: 50%;
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
    transition: height 0.45s cubic-bezier(0.22, 0.61, 0.36, 1);
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
    border-width: calc(
      1px + var(--react, 0.5) * var(--drive, 0.5) * 1.2px
    );
    box-shadow:
      0 0 calc(16px + var(--react, 0.5) * var(--drive, 0.5) * 16px) -6px
        rgba(var(--hm-a1-rgb), 0.55),
      inset 0 0 calc(14px + var(--react, 0.5) * var(--drive, 0.5) * 12px)
        -8px rgba(var(--hm-a1-rgb), 0.6);
    animation: hmOrbit 3.4s ease-out infinite;
    animation-play-state: var(--run, running);
    filter: brightness(
      calc(0.72 + var(--react, 0.5) * var(--drive, 0.5) * 0.62)
    );
    transition: filter 0.35s ease;
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

  .hm-list-item[data-empty="true"] {
    opacity: 0.45;
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
    border-radius: 50%;
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
    border-radius: 50%;
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


  /* ---------- 触屏优化 ---------- */
  .hm-card {
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }

  .hm-range {
    touch-action: none;
  }

  .hm-drawer-body {
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
  }

  .hm-list-item:active {
    background: rgba(255, 255, 255, 0.12);
  }

  .hm-entity-chip:active,
  .hm-chip.interactive:active,
  .hm-menu-item:active {
    transform: scale(0.97);
  }

  .hm-btn:active,
  .hm-play:active,
  .hm-icon-btn:active {
    transition-duration: 0.06s;
  }

  @media (pointer: coarse) and (max-width: 600px) {
    .hm-status-player,
    .hm-status .hm-kicker-sep {
      display: none;
    }
  }

  @media (pointer: coarse) {
    .hm-menu {
      max-height: min(78%, 420px);
      overflow-y: auto;
      overscroll-behavior: contain;
    }

    .hm-icon-btn {
      width: 40px;
      height: 40px;
      border-radius: 13px;
    }

    .hm-btn {
      width: 46px;
      height: 46px;
      flex: 0 0 auto;
    }

    .hm-play {
      min-width: 58px;
      min-height: 58px;
    }

    .hm-entity-chip {
      min-height: 38px;
      padding: 5px 12px 5px 5px;
      font-size: 11.5px;
    }

    .hm-entity-dot {
      width: 24px;
      height: 24px;
    }

    .hm-list-item {
      min-height: 60px;
      padding: 10px 8px;
    }

    .hm-list-thumb {
      width: 40px;
      height: 40px;
    }

    .hm-range {
      height: 40px;
    }

    .hm-volume .hm-range {
      height: 40px;
      min-width: 64px;
    }

    .hm-volume .hm-icon-btn {
      width: 40px;
      height: 40px;
    }

    .hm-volume {
      gap: 8px;
      flex: 0 1 186px;
    }

    .hm-volume .hm-range::-webkit-slider-thumb {
      width: 19px;
      height: 19px;
      margin-top: -7px;
    }

    .hm-volume .hm-range::-moz-range-thumb {
      width: 19px;
      height: 19px;
    }

    .hm-card[data-layout="compact"] .hm-volume {
      flex: 0 1 156px;
    }

    .hm-range::-webkit-slider-thumb {
      width: 19px;
      height: 19px;
      margin-top: -7px;
    }

    .hm-range::-moz-range-thumb {
      width: 19px;
      height: 19px;
    }

    .hm-time {
      min-width: 44px;
      min-height: 36px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
    }

    .hm-menu-item {
      min-height: 48px;
      padding: 12px;
      font-size: 13px;
    }

    .hm-chip {
      min-height: 34px;
    }

    .hm-top-actions {
      gap: 8px;
    }

    .hm-card[data-layout="compact"] .hm-btn {
      width: 44px;
      height: 44px;
    }

    .hm-card[data-layout="compact"] .hm-play {
      width: 54px;
      height: 54px;
    }

    .hm-card[data-layout="mini"] .hm-btn {
      width: 36px;
      height: 36px;
    }

    .hm-card[data-layout="mini"] .hm-volume .hm-icon-btn {
      width: 40px;
      height: 40px;
    }

    .hm-card[data-layout="mini"] .hm-play {
      width: 44px;
      height: 44px;
    }
  }

  /* 窄卡片：控制区换行，音量独占一行，避免触屏大按钮把卡片撑破 */
  @container (max-width: 470px) {
    .hm-card[data-layout="full"] .hm-controls,
    .hm-card[data-layout="compact"] .hm-controls {
      flex-wrap: wrap;
      row-gap: 10px;
    }

    .hm-card[data-layout="full"] .hm-volume,
    .hm-card[data-layout="compact"] .hm-volume {
      flex: 1 1 100%;
      margin-left: 0;
      max-width: none;
      width: 100%;
      box-sizing: border-box;
      justify-content: space-between;
    }

    .hm-card[data-layout="full"] .hm-volume .hm-range,
    .hm-card[data-layout="compact"] .hm-volume .hm-range {
      flex: 1 1 auto;
      min-width: 72px;
    }
  }


  /* ---------- 面板视图：自动铺满可用区域 ---------- */
  :host([data-panel="true"]) {
    --hm-panel-height: 100%;
    --hm-panel-cover: calc(100dvh - 440px);
    height: var(--hm-panel-height, 100%);
    min-height: 0;
    max-height: var(--hm-panel-height, 100%);
  }

  .hm-card[data-panel="true"] {
    height: 100%;
    min-height: 0;
    max-height: 100%;
    border-radius: 0;
  }

  .hm-card[data-panel="true"] .hm-body {
    max-width: none;
    min-height: 0;
    overflow: hidden;
    padding: clamp(18px, 2.4vw, 40px);
  }

  /* 主区吃掉剩余高度；封面按主区高度收缩，避免把频谱/进度条压出视口 */
  .hm-card[data-panel="true"] .hm-main {
    flex: 1 1 auto;
    min-height: 0;
    grid-template-columns: minmax(0, var(--hm-panel-cover, 34%)) minmax(0, 1fr);
    gap: clamp(20px, 3.2vw, 46px);
  }

  .hm-card[data-panel="true"] .hm-cover-wrap {
    width: 100%;
    height: 100%;
    min-height: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hm-card[data-panel="true"] .hm-cover {
    width: min(100%, var(--hm-panel-cover, 100%));
    max-height: 100%;
    border-radius: 50%;
  }

  .hm-card[data-panel="true"] .hm-title {
    font-size: clamp(26px, 3.4cqi, 54px);
    -webkit-line-clamp: 3;
  }

  .hm-card[data-panel="true"] .hm-artist {
    font-size: clamp(14px, 1.45cqi, 20px);
  }

  .hm-card[data-panel="true"] .hm-vis {
    height: clamp(30px, 4.2cqi, 62px);
  }

  .hm-card[data-panel="true"] .hm-controls {
    gap: clamp(10px, 1.6cqi, 18px);
  }

  @container (max-width: 620px) {
    .hm-card[data-panel="true"] .hm-body {
      padding: 12px 14px;
      gap: 8px;
    }

    .hm-card[data-panel="true"] .hm-main {
      grid-template-columns: minmax(0, var(--hm-panel-cover, 42%)) minmax(0, 1fr);
      justify-items: stretch;
      text-align: left;
      align-items: center;
      gap: 12px;
    }

    .hm-card[data-panel="true"] .hm-cover {
      width: min(100%, var(--hm-panel-cover, 100%));
      border-radius: 50%;
    }

    .hm-card[data-panel="true"] .hm-meta {
      align-items: flex-start;
      width: 100%;
    }

    .hm-card[data-panel="true"] .hm-tags {
      display: none;
    }

    .hm-card[data-panel="true"] .hm-vis {
      height: 22px;
    }

    .hm-card[data-panel="true"] .hm-controls {
      flex-wrap: nowrap;
      flex-direction: row;
      align-items: center;
      gap: 8px;
    }

    .hm-card[data-panel="true"] .hm-transport {
      justify-content: flex-start;
      gap: 4px;
    }

    .hm-card[data-panel="true"] .hm-volume {
      flex: 0 1 124px;
      width: auto;
      max-width: 124px;
      margin-left: auto;
    }

    .hm-card[data-panel="true"] .hm-btn {
      width: 32px;
      height: 32px;
    }

    .hm-card[data-panel="true"] .hm-play {
      width: 44px;
      height: 44px;
    }
  }

  /* 窄屏/竖屏面板：封面在上、信息在下，占满剩余高度 */
  @container (max-width: 820px) {
    .hm-card[data-panel="true"] .hm-main {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: clamp(10px, 3cqi, 20px);
    }

    .hm-card[data-panel="true"] .hm-cover-wrap {
      width: 100%;
      height: auto;
      flex: 0 0 auto;
    }

    .hm-card[data-panel="true"] .hm-cover {
      width: min(88%, var(--hm-panel-cover, calc(100dvh - 440px)));
      max-height: none;
      margin: 0 auto;
    }

    .hm-card[data-panel="true"] .hm-meta {
      align-items: center;
      text-align: center;
      width: 100%;
    }

    .hm-card[data-panel="true"] .hm-tags {
      justify-content: center;
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
`;var Ji={play:_`<path d="M8.2 5.4c0-.7.8-1.1 1.4-.7l9.1 5.8c.6.4.6 1.3 0 1.7l-9.1 6.1c-.6.4-1.4 0-1.4-.7V5.4z" fill="currentColor"/>`,pause:_`<rect x="7" y="5.6" width="3.6" height="12.8" rx="1.2" fill="currentColor"/><rect x="13.4" y="5.6" width="3.6" height="12.8" rx="1.2" fill="currentColor"/>`,previous:_`<path d="M7 6.2v11.6" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><path d="M17.6 6.6c0-.6-.7-1-1.2-.6l-7.1 5.2c-.5.4-.5 1.2 0 1.6l7.1 5.2c.5.4 1.2 0 1.2-.6V6.6z" fill="currentColor"/>`,next:_`<path d="M17 6.2v11.6" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><path d="M6.4 6.6c0-.6.7-1 1.2-.6l7.1 5.2c.5.4.5 1.2 0 1.6l-7.1 5.2c-.5.4-1.2 0-1.2-.6V6.6z" fill="currentColor"/>`,shuffle:_`<path d="M4.5 7.2h3.2c1 0 1.9.5 2.5 1.3l4 5.4c.6.8 1.5 1.3 2.5 1.3h3.1" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M4.5 16.8h3.2c1 0 1.9-.5 2.5-1.3l4-5.4c.6-.8 1.5-1.3 2.5-1.3h3.1" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M16.2 4.6l3 2.6-3 2.6M16.2 12.6l3 2.6-3 2.6" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/>`,repeat:_`<path d="M6.4 9.1V8.3c0-1.5 1.2-2.7 2.7-2.7h8.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M17.8 5.6l-2.3-2.2M17.8 5.6l-2.3 2.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M17.6 14.9v.8c0 1.5-1.2 2.7-2.7 2.7H6.7" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M6.2 18.4l2.3 2.2M6.2 18.4l2.3-2.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/>`,repeatOne:_`<path d="M6.4 9.1V8.3c0-1.5 1.2-2.7 2.7-2.7h8.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M17.8 5.6l-2.3-2.2M17.8 5.6l-2.3 2.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M17.6 14.9v.8c0 1.5-1.2 2.7-2.7 2.7H6.7" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M6.2 18.4l2.3 2.2M6.2 18.4l2.3-2.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M11.2 9.3l1.1-.8v6.1" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M10.6 14.6h3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>`,volume:_`<path d="M4.6 9.4h2.7l3.4-2.9c.5-.4 1.2 0 1.2.6v9.8c0 .6-.7 1-1.2.6L7.3 14.6H4.6c-.6 0-1-.4-1-1v-3.2c0-.6.4-1 1-1z" fill="currentColor"/><path d="M15.4 8.6c1.6 1 1.6 5.8 0 6.8" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M17.6 6.4c2.9 2 2.9 9.2 0 11.2" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/>`,mute:_`<path d="M4.6 9.4h2.7l3.4-2.9c.5-.4 1.2 0 1.2.6v9.8c0 .6-.7 1-1.2.6L7.3 14.6H4.6c-.6 0-1-.4-1-1v-3.2c0-.6.4-1 1-1z" fill="currentColor"/><path d="M15.2 9.6l4.6 4.8M19.8 9.6l-4.6 4.8" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/>`,power:_`<path d="M12 4.2v7" stroke="currentColor" stroke-width="1.9" fill="none" stroke-linecap="round"/><path d="M7.6 6.6a6.9 6.9 0 1 0 8.8 0" stroke="currentColor" stroke-width="1.9" fill="none" stroke-linecap="round"/>`,more:_`<circle cx="6.4" cy="12" r="1.55" fill="currentColor"/><circle cx="12" cy="12" r="1.55" fill="currentColor"/><circle cx="17.6" cy="12" r="1.55" fill="currentColor"/>`,library:_`<rect x="4.4" y="4.4" width="6.4" height="6.4" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.7"/><rect x="13.2" y="4.4" width="6.4" height="6.4" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.7"/><rect x="4.4" y="13.2" width="6.4" height="6.4" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.7"/><rect x="13.2" y="13.2" width="6.4" height="6.4" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.7"/>`,queue:_`<path d="M5 7.2h10M5 11.4h7.4M5 15.6h5.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M15.6 12.4c0-.5.5-.8.9-.5l4 2.3c.4.2.4.8 0 1l-4 2.6c-.4.3-.9 0-.9-.5v-5.4z" fill="currentColor"/>`,chevronLeft:_`<path d="M14.6 6l-5.4 6 5.4 6" stroke="currentColor" stroke-width="1.9" fill="none" stroke-linecap="round"/>`,close:_`<path d="M7 7l10 10M17 7L7 17" stroke="currentColor" stroke-width="1.9" fill="none" stroke-linecap="round"/>`,music:_`<path d="M14.5 5.2l4.6-1v9.1a3 3 0 1 1-1.8-2.7V7.1l-2.8.6v7.7a3 3 0 1 1-1.8-2.7V5.2z" fill="currentColor"/>`,group:_`<circle cx="9" cy="9.3" r="3.2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3.8 18.4c0-2.7 2.3-4.6 5.2-4.6s5.2 1.9 5.2 4.6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M16.2 6.4a3 3 0 0 1 0 5.9M18.6 18.4c0-2-1-3.6-2.6-4.3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>`,chevronRight:_`<path d="M9.4 6l5.4 6-5.4 6" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>`,playlist:_`<path d="M4 6.6h10.2M4 11h10.2M4 15.4h6.4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M16.4 11.8l4 2.35-4 2.35z" fill="currentColor"/>`,external:_`<path d="M13.2 5.4h5.4v5.4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M18.2 5.8l-7 7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M11 6.6H7.2c-1 0-1.8.8-1.8 1.8v8.4c0 1 .8 1.8 1.8 1.8h8.4c1 0 1.8-.8 1.8-1.8V14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>`,folder:_`<path d="M3.6 7.2c0-1 .8-1.8 1.8-1.8h3.4l1.8 2.2h9.8c1 0 1.8.8 1.8 1.8v7.4c0 1-.8 1.8-1.8 1.8H5.4c-1 0-1.8-.8-1.8-1.8V7.2z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>`,check:_`<path d="M6 12.6l4.2 4.2 7.8-9" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>`};function y(s,t=18){let e=Ji[s];return e?_`<svg viewBox="0 0 24 24" width=${t} height=${t} aria-hidden="true" focusable="false">${e}</svg>`:u}var Ze="1.3.0",ti="ha-music",ei="HA Music",k={PAUSE:1,SEEK:2,VOLUME_SET:4,VOLUME_MUTE:8,PREVIOUS_TRACK:16,NEXT_TRACK:32,TURN_ON:128,TURN_OFF:256,PLAY_MEDIA:512,VOLUME_STEP:1024,SELECT_SOURCE:2048,STOP:4096,CLEAR_PLAYLIST:8192,PLAY:16384,SHUFFLE_SET:32768,SELECT_SOUND_MODE:65536,BROWSE_MEDIA:131072,REPEAT_SET:262144,GROUPING:524288,SELECT:1048576};var re="aurora";var ne={adaptive:{en:"Adaptive",zh:"\u81EA\u9002\u5E94"},full:{en:"Full",zh:"\u5B8C\u6574"},compact:{en:"Compact",zh:"\u7D27\u51D1"},mini:{en:"Mini",zh:"\u8FF7\u4F60"}},oe={ambient:{en:"Ambient blur",zh:"\u73AF\u5883\u6A21\u7CCA"},art:{en:"Cover fill",zh:"\u5C01\u9762\u94FA\u6EE1"},palette:{en:"Palette only",zh:"\u7EAF\u8272\u5F69"},none:{en:"Plain",zh:"\u65E0\u80CC\u666F"}},le={bars:{en:"Bars",zh:"\u67F1\u72B6"},wave:{en:"Wave",zh:"\u6CE2\u5F62"},orbit:{en:"Orbit",zh:"\u5149\u73AF"},none:{en:"Off",zh:"\u5173\u95ED"}},it={aurora:{label:{en:"Aurora",zh:"\u6781\u5149"},accent:["#2ee6c5","#7b5cff"],base:"#050a12",glow:1,grid:!1},cyber:{label:{en:"Cyberpunk",zh:"\u8D5B\u535A\u670B\u514B"},accent:["#ff2fd0","#22e6ff"],base:"#08030f",glow:1.4,grid:!0},liquid:{label:{en:"Liquid Glass",zh:"\u6DB2\u6001\u73BB\u7483"},accent:["#a9d8ff","#cdb6ff"],base:"#090c16",glow:.8,grid:!1,glass:!0},velvet:{label:{en:"Velvet",zh:"\u5929\u9E45\u7ED2"},accent:["#ff7a9c","#a86bff"],base:"#0d050c",glow:1.15,grid:!1},mono:{label:{en:"Monochrome",zh:"\u9ED1\u767D"},accent:["#e9ecf5","#8d95a8"],base:"#08090c",glow:.4,grid:!1}},Qe={play:"Play",pause:"Pause",playing:"Now playing",paused:"Paused",idle:"Standby",off:"Off",buffering:"Buffering",previous:"Previous track",next:"Next track",volume:"Volume",mute:"Mute",unmute:"Unmute",shuffle:"Shuffle",repeat:"Repeat",repeatAll:"Repeat all",repeatOne:"Repeat one",repeatOff:"Repeat off",source:"Source",soundMode:"Sound mode",queue:"Queue",library:"Library",assistant:"Music Assistant",playlists:"Playlists",playlistsEmpty:"No playlists found",playlistEmpty:"This playlist is empty or unavailable in Music Assistant",maPlayerRequired:"Playlists need a Music Assistant player",playlistUnavailable:"Unavailable",playingPlaylist:"Playing",openAssistant:"Open Music Assistant",more:"More info",power:"Power",group:"Group",groupLeave:"Leave group",loading:"Loading\u2026",queueEmpty:"Queue is empty",browseFailed:"Media library is unavailable",noMedia:"Nothing is playing",unknownArtist:"Unknown artist",noTitle:"No title",close:"Close",back:"Back",track:"Track",album:"Album",volumeEntityMissing:"Volume entity unavailable",seek:"Seek",remaining:"Toggle remaining time"},Qi={play:"\u64AD\u653E",pause:"\u6682\u505C",playing:"\u6B63\u5728\u64AD\u653E",paused:"\u5DF2\u6682\u505C",idle:"\u5F85\u673A",off:"\u5DF2\u5173\u95ED",buffering:"\u7F13\u51B2\u4E2D",previous:"\u4E0A\u4E00\u9996",next:"\u4E0B\u4E00\u9996",volume:"\u97F3\u91CF",mute:"\u9759\u97F3",unmute:"\u53D6\u6D88\u9759\u97F3",shuffle:"\u968F\u673A\u64AD\u653E",repeat:"\u5FAA\u73AF",repeatAll:"\u5217\u8868\u5FAA\u73AF",repeatOne:"\u5355\u66F2\u5FAA\u73AF",repeatOff:"\u5173\u95ED\u5FAA\u73AF",source:"\u97F3\u6E90",soundMode:"\u58F0\u97F3\u6A21\u5F0F",queue:"\u64AD\u653E\u961F\u5217",library:"\u5A92\u4F53\u5E93",assistant:"Music Assistant",playlists:"\u64AD\u653E\u5217\u8868",playlistsEmpty:"\u6CA1\u6709\u627E\u5230\u64AD\u653E\u5217\u8868",playlistEmpty:"\u8BE5\u6B4C\u5355\u4E3A\u7A7A\u6216\u66F2\u76EE\u5728 Music Assistant \u4E2D\u4E0D\u53EF\u7528",maPlayerRequired:"\u5F53\u524D\u64AD\u653E\u5668\u4E0D\u662F Music Assistant \u64AD\u653E\u5668\uFF0C\u8BF7\u5148\u5207\u6362\u5230 MA \u64AD\u653E\u5668",playlistUnavailable:"\u4E0D\u53EF\u7528",playingPlaylist:"\u5F00\u59CB\u64AD\u653E",openAssistant:"\u6253\u5F00 Music Assistant",more:"\u66F4\u591A\u4FE1\u606F",power:"\u5F00\u5173",group:"\u5206\u7EC4",groupLeave:"\u9000\u51FA\u5206\u7EC4",loading:"\u52A0\u8F7D\u4E2D\u2026",queueEmpty:"\u64AD\u653E\u961F\u5217\u4E3A\u7A7A",browseFailed:"\u5A92\u4F53\u5E93\u6682\u4E0D\u53EF\u7528",noMedia:"\u5F53\u524D\u6CA1\u6709\u64AD\u653E\u5185\u5BB9",unknownArtist:"\u672A\u77E5\u827A\u672F\u5BB6",noTitle:"\u672A\u77E5\u66F2\u76EE",close:"\u5173\u95ED",back:"\u8FD4\u56DE",track:"\u66F2\u76EE",album:"\u4E13\u8F91",volumeEntityMissing:"\u97F3\u91CF\u5B9E\u4F53\u4E0D\u53EF\u7528",seek:"\u8FDB\u5EA6",remaining:"\u5207\u6362\u5269\u4F59\u65F6\u95F4"};function Nt(s){return/^zh/i.test(s||"")}function C(s){let t=Nt(s)?Qi:Qe;return e=>t[e]??Qe[e]??e}var Zi={playlist:{en:"Playlist",zh:"\u64AD\u653E\u5217\u8868"},album:{en:"Album",zh:"\u4E13\u8F91"},artist:{en:"Artist",zh:"\u827A\u672F\u5BB6"},track:{en:"Track",zh:"\u66F2\u76EE"},music:{en:"Music",zh:"\u97F3\u4E50"},video:{en:"Video",zh:"\u89C6\u9891"},directory:{en:"Folder",zh:"\u6587\u4EF6\u5939"},image:{en:"Image",zh:"\u56FE\u7247"},url:{en:"Link",zh:"\u94FE\u63A5"},app:{en:"App",zh:"\u5E94\u7528"},genre:{en:"Genre",zh:"\u98CE\u683C"}};function he(s,t){if(!s)return"";let e=Zi[String(s).toLowerCase()];return e?Nt(t)?e.zh:e.en:s}var x=(s,t,e)=>Math.min(e,Math.max(t,s));function kt(s,t="--:--"){if(!Number.isFinite(s)||s<0)return t;let e=Math.round(s),i=Math.floor(e/3600),a=Math.floor(e%3600/60),n=e%60;return i>0?`${i}:${String(a).padStart(2,"0")}:${String(n).padStart(2,"0")}`:`${a}:${String(n).padStart(2,"0")}`}function L(s){let t=String(s??""),e=2166136261;for(let i=0;i<t.length;i+=1)e^=t.charCodeAt(i),e=Math.imul(e,16777619);return e>>>0}function ii(s={}){let t=[s.title,s.artist,s.album].filter(Boolean).join("|")||"ha-music",e=L(t),i=1.7+(e>>>8)%90/100,a=e%360/360*Math.PI*2,n=Number.isFinite(s.position)&&s.position>0?s.position:0,r=n/i*Math.PI*2+a;return{seed:t,hash:e,period:i,phase:a,position:n,pulse:.5+.5*Math.sin(r),low:.5+.5*Math.sin(r+.55),energy:.55+(e>>>16)%100/220}}function ta(s){return L(s)%360}function $(s,t){let e=Number(s?.attributes?.supported_features??0);return!Number.isFinite(e)||!t?!1:(e&t)===t}function ea(s,t){if(!(!s||!t))return s.states?s.states[t]:void 0}function Ut(s,t,e=""){return ea(s,t)?.attributes?.friendly_name||t||e}function B(s){let t=s?.attributes??{},e=t.media_metadata??{},i=Number(t.media_duration??e.duration??0),a=Number(t.media_position??0),n=t.media_position_updated_at;if(s?.state==="playing"&&n){let r=(Date.now()-new Date(n).getTime())/1e3;Number.isFinite(r)&&r>0&&(a+=r)}return Number.isFinite(i)&&i>0?a=x(a,0,i):(!Number.isFinite(a)||a<0)&&(a=0),{title:t.media_title||e.title||"",artist:t.media_artist||e.artist||t.media_album_artist||e.album_artist||"",album:t.media_album_name||e.album_name||"",series:t.media_series_title||e.series_title||"",track:t.media_track??e.track_number??"",duration:Number.isFinite(i)?i:0,position:Number.isFinite(a)?a:0,art:e.entity_picture||e.image_url||t.entity_picture||t.media_image_url||"",appName:t.app_name||"",source:t.source||"",soundMode:t.sound_mode||"",shuffle:!!t.shuffle,repeat:t.repeat||"off",volume:Number.isFinite(Number(t.volume_level))?Number(t.volume_level):null,muted:!!t.is_volume_muted,groupMembers:Array.isArray(t.group_members)?t.group_members:[]}}function ce(s,t=60){let e=s?.attributes?.queue;return Array.isArray(e)?e.slice(0,t).map((i,a)=>({index:a,title:i.title||i.name||i.media_title||"",artist:i.artist||i.subtitle||i.media_artist||"",album:i.album||i.album_name||"",duration:Number(i.duration??i.media_duration??0)||0,art:i.entity_picture||i.thumbnail||i.artwork||"",contentId:i.media_content_id||i.content_id||"",contentType:i.media_content_type||i.content_type||"",active:!!(i.active||i.is_active||i.current||i.playing)})):[]}function H(s,t){return t?/^(https?:|data:|blob:)/.test(t)?t:s?.hassUrl?s.hassUrl(t):t:""}function G(s,t,e){let i=t/100,a=e/100,n=(1-Math.abs(2*a-1))*i,r=(s%360+360)%360/60,o=n*(1-Math.abs(r%2-1)),l=[0,0,0];r<1?l=[n,o,0]:r<2?l=[o,n,0]:r<3?l=[0,n,o]:r<4?l=[0,o,n]:r<5?l=[o,0,n]:l=[n,0,o];let h=a-n/2;return l.map(d=>Math.round(x((d+h)*255,0,255)))}function ai(s){let t=ta(s),e=(t+42+L(s+"2")%40)%360,i=G(t,72,58),a=G(e,68,52);return{a1:`hsl(${t} 72% 58%)`,a2:`hsl(${e} 68% 52%)`,rgb1:i.join(","),rgb2:a.join(",")}}function si(s){let t=String(s).replace("#","").trim(),e=t.length===3?t.split("").map(i=>i+i).join(""):t;return/^[0-9a-f]{6}$/i.test(e)?[parseInt(e.slice(0,2),16),parseInt(e.slice(2,4),16),parseInt(e.slice(4,6),16)].join(","):null}function Lt(s,t="255,255,255"){let e=String(s||"").trim();if(/^#[0-9a-f]{3,8}$/i.test(e))return si(e.slice(0,7))||t;let i=e.match(/hsla?\(\s*([\d.]+)[,\s]+([\d.]+)%[,\s]+([\d.]+)%/i);if(i)return G(Number(i[1]),Number(i[2]),Number(i[3])).join(",");let a=e.match(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/i);return a?`${a[1]},${a[2]},${a[3]}`:t}function de(s){let t=si(s);if(!t)return{h:0,s:0,l:50};let[e,i,a]=t.split(",").map(c=>Number(c)/255),n=Math.max(e,i,a),r=Math.min(e,i,a),o=(n+r)/2,l=n-r,h=0,d=0;return l!==0&&(d=l/(1-Math.abs(2*o-1)),n===e?h=(i-a)/l%6:n===i?h=(a-e)/l+2:h=(e-i)/l+4,h=(h*60+360)%360),{h,s:d*100,l:o*100}}function pe(s,t,e=.5){let i=(t.h-s.h+540)%360-180,a=(s.h+i*e+360)%360,n=s.s+(t.s-s.s)*e,r=s.l+(t.l-s.l)*e;return{h:a,s:n,l:r,css:`hsl(${Math.round(a)} ${Math.round(x(n,25,92))}% ${Math.round(x(r,38,72))}%)`,rgb:G(a,x(n,25,92),x(r,38,72)).join(",")}}var $t=new Map,ia=40;function aa(s,t){let i=document.createElement("canvas");i.width=36,i.height=36;let a=i.getContext("2d",{willReadFrequently:!0});if(!a)return null;a.drawImage(s,0,0,36,36);let n=a.getImageData(0,0,36,36).data,r=new Map;for(let b=0;b<n.length;b+=4){if(n[b+3]<180)continue;let A=n[b],S=n[b+1],T=n[b+2],P=Math.max(A,S,T),ht=Math.min(A,S,T),ct=(P+ht)/510,Pt=P===0?0:(P-ht)/P;if(ct<.12||ct>.9||Pt<.14)continue;let q=0,V=P-ht;V!==0&&(P===A?q=(S-T)/V%6:P===S?q=(T-A)/V+2:q=(A-S)/V+4,q=(q*60+360)%360);let dt=Math.floor(q/18),j=r.get(dt)||{count:0,sat:0,light:0};j.count+=1,j.sat+=Pt,j.light+=ct,r.set(dt,j)}if(!r.size)return null;let o=[...r.entries()].map(([b,v])=>({hue:b*18+9,score:v.count*(.45+v.sat/v.count),sat:v.sat/v.count,light:v.light/v.count})).sort((b,v)=>v.score-b.score),l=o[0],h=o.find(b=>{let v=Math.abs(b.hue-l.hue);return Math.min(v,360-v)>28})||{hue:(l.hue+44)%360,sat:l.sat,light:l.light},d=b=>x(Math.round(b*100),42,88),c=Math.round(l.hue),g=Math.round(h.hue),m=d(l.sat+.08),f=d(h.sat+.05),w=x(Math.round(l.light*100)+12,46,66),E=x(Math.round(h.light*100)+8,40,60);return{a1:`hsl(${c} ${m}% ${w}%)`,a2:`hsl(${g} ${f}% ${E}%)`,rgb1:G(c,m,w).join(","),rgb2:G(g,f,E).join(","),h1:c,s1:m,l1:w,h2:g,s2:f,l2:E,seed:L(t||"")}}function ri(s,t=""){if(!s)return Promise.resolve(null);if($t.has(s))return $t.get(s);let e=new Promise(i=>{let a=new Image;a.crossOrigin="anonymous",a.decoding="async",a.onload=()=>{try{i(aa(a,t))}catch{i(null)}},a.onerror=()=>i(null),a.src=s});return $t.size>ia&&$t.clear(),$t.set(s,e),e}var ni=new WeakMap;function sa(){return typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches}function li(s){s.raf&&(window.cancelAnimationFrame(s.raf),s.raf=null),s.last=0}function oi(s,t){if(t.raf)return;s.style.transition="none",s.style.willChange="transform",t.last=0;let e=i=>{if(!s.isConnected){t.raf=null;return}t.last||(t.last=i);let a=Math.min(.1,(i-t.last)/1e3);t.last=i,t.angle=(t.angle+a*360/(16e3/1e3))%360,s.style.transform=`rotate(${t.angle}deg)`,t.raf=window.requestAnimationFrame(e)};t.raf=window.requestAnimationFrame(e)}function ra(s,t){if(li(t),t.resetTimer&&(window.clearTimeout(t.resetTimer),t.resetTimer=null),!s.isConnected)return;if(!t.angle){s.style.transform="rotate(0deg)";return}let e=t.angle;s.style.transition="none",s.style.transform=`rotate(${e}deg)`,window.requestAnimationFrame(()=>{!s.isConnected||t.playing||(s.style.transition="transform 1.15s cubic-bezier(0.22, 1, 0.36, 1)",s.style.transform="rotate(0deg)",t.resetTimer=window.setTimeout(()=>{t.resetTimer=null,t.playing||(s.style.transition="none",s.style.willChange="auto",s.style.transform="rotate(0deg)")},1250))}),t.angle=0}function at(s,t){if(!s)return;let e=ni.get(s);if(e||(e={angle:0,playing:!1,raf:null,last:0,resetTimer:null},ni.set(s,e)),sa()){li(e),s.style.transition="none",s.style.willChange="auto",s.style.transform="rotate(0deg)",e.playing=!1;return}let i=!!t;if(e.playing===i){i&&oi(s,e);return}e.playing=i,i?(e.resetTimer&&(window.clearTimeout(e.resetTimer),e.resetTimer=null),oi(s,e)):ra(s,e)}var X=104,st=36,Dt=st/2,rt=Math.min(2,typeof window>"u"?1:window.devicePixelRatio||1),J=new WeakMap;function na(s,t,e){let i=J.get(s);if(!i?.ctx)return;let{ctx:a}=i;a.setTransform(rt,0,0,rt,0,0),a.clearRect(0,0,X,X);let n=X/2,r=33.5,o=n-r-3;a.lineCap="round",a.shadowBlur=5+e*7;for(let l=0;l<st;l+=1){let h=x(t[l]||0,0,1),d=l/st*Math.PI*2-Math.PI/2,c=2.2+Math.pow(h,1.05)*o,g=Math.cos(d),m=Math.sin(d),f=Math.abs(l-Dt)/Dt,w=264-76*(1-f),E=56+h*23-2*f,b=96-4*f,v=.5+h*.48,A=`hsla(${w.toFixed(0)}, ${b.toFixed(0)}%, ${E.toFixed(0)}%, ${v.toFixed(2)})`;a.strokeStyle=A,a.shadowColor=`hsla(${w.toFixed(0)}, ${b.toFixed(0)}%, ${E.toFixed(0)}%, ${(.12+e*.26).toFixed(2)})`,a.lineWidth=3,a.beginPath(),a.moveTo(n+g*r,n+m*r),a.lineTo(n+g*(r+c),n+m*(r+c)),a.stroke();let S=x((f-.3)/.45,0,1);S>.01&&(a.shadowBlur=0,a.strokeStyle=`hsla(${w.toFixed(0)}, 96%, 96%, ${((.05+h*.24)*S).toFixed(2)})`,a.lineWidth=1.1,a.stroke(),a.shadowBlur=5+e*7)}a.shadowBlur=0,a.shadowColor="transparent"}function hi(s){let t=J.get(s);t?.ctx&&(t.ctx.setTransform(rt,0,0,rt,0,0),t.ctx.clearRect(0,0,X,X))}function ue(s,t,e){if(!s?.style)return;s.style.setProperty("--fab-beat",t.toFixed(4)),s.style.setProperty("--fab-beat-glow",e.toFixed(3));let i=s.querySelector?.(".fab-disc");i&&(i.style.boxShadow=["0 10px 26px rgba(2, 6, 18, 0.46)",`0 0 26px rgba(139, 92, 246, ${(e*.92).toFixed(3)})`,`0 0 52px rgba(124, 58, 237, ${(e*.55).toFixed(3)})`].join(", "))}function ci(s,t){let e=J.get(s);if(!e||(e.raf=0,!e.playing||!e.visible))return;if(!s.isConnected){e.playing=!1;return}let i=e.position+Math.max(0,t-e.since)/1e3,a=i/e.period*Math.PI*2+e.phase,n=.5+.5*Math.sin(a),r=.5+.5*Math.sin(a+.55),o=Math.pow(.5+.5*Math.sin(a*2.15+e.phase*1.7),3),l=[];for(let c=0;c<Dt;c+=1){let g=c/(Dt-1),m=Math.pow(1-g,1.05),f=Math.sin(i*(4.6+e.hash%9*.25)+c*1.1+e.phase),w=Math.sin(i*(11.4+e.hash%5*.4)+c*2.3),E=(.16+.68*m)*(.62+.38*(.5+.5*f)),b=.18*o*Math.pow(1-g,2.2),v=x(E*(.55+.45*(.5+.5*w))+b+.04*e.energy,0,1);l[c]=v,l[st-1-c]=v}for(let c=0;c<st;c+=1){let g=e.smooth[c]||0,m=l[c]||0;e.smooth[c]=m>g?g+(m-g)*.72:g+(m-g)*.24}let h=Math.min(1,r*1.05+o*.4);na(s,e.smooth,h);let d=1+Math.min(.085,r*.05+o*.05);ue(e.root,d,.16+Math.min(.46,r*.5+o*.26)),e.raf=requestAnimationFrame(c=>ci(s,c))}function oa(s,{clearNow:t=!1}={}){let e=J.get(s);if(e){if(e.raf&&(cancelAnimationFrame(e.raf),e.raf=0),ue(e.root,1,0),e.smooth.fill(0),t){hi(s);return}e.clearTimer=window.setTimeout(()=>{let i=J.get(s);i&&!i.playing&&hi(s)},460)}}function di(s,t,e={}){if(!s||typeof s.getContext!="function")return;let i=J.get(s);if(!i){let h=s.getContext("2d");if(!h)return;s.width=Math.round(X*rt),s.height=Math.round(X*rt),i={ctx:h,root:t,playing:!1,visible:!0,position:0,lastPosition:null,since:0,hash:0,period:2,phase:0,energy:.6,smooth:new Array(st).fill(0),raf:0,clearTimer:0},J.set(s,i)}i.clearTimer&&(window.clearTimeout(i.clearTimer),i.clearTimer=0),i.root=t||i.root;let a=!!e.playing,n=e.visible!==!1,r=i.playing,o=Number(e.position);Number.isFinite(o)&&o>=0&&((i.lastPosition==null||Math.abs(o-i.lastPosition)>.25||!r&&a)&&(i.position=o,i.since=performance.now()),i.lastPosition=o);let l=[e.title,e.artist,e.album].filter(Boolean).join("|")||"ha-music";if(i.hash=L(l),i.period=1.7+(i.hash>>>8)%90/100,i.phase=i.hash%360/360*Math.PI*2,i.energy=.55+(i.hash>>>16)%100/220,i.playing=a,i.visible=n,!a||!n){oa(s,{clearNow:!n});return}i.raf||(ue(i.root,1,0),i.since=performance.now(),i.raf=requestAnimationFrame(h=>ci(s,h)))}var Mt="haMusicMiniPlayer",wi="haMusicMiniPositions",At=new Set(["top","sidebar","fab"]);function ge(){try{let s=window.localStorage.getItem(wi);if(!s)return{};let t=JSON.parse(s);return t&&typeof t=="object"&&!Array.isArray(t)?t:{}}catch{return{}}}function me(s,t,e){if(At.has(s))try{let i=ge();i[s]={x:Number(t.toFixed(4)),y:Number(e.toFixed(4))},window.localStorage.setItem(wi,JSON.stringify(i))}catch{}}var pi='<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path d="M14.5 5.2l4.6-1v9.1a3 3 0 1 1-1.8-2.7V7.1l-2.8.6v7.7a3 3 0 1 1-1.8-2.7V5.2z" fill="currentColor"/></svg>',ui='<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" fill="currentColor"/></svg>',mi='<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false"><path d="M16 6h2v12h-2zM6 6l8.5 6L6 18z" fill="currentColor"/></svg>',It='<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>',la='<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false"><path d="M6 5h4v14H6zM14 5h4v14h-4z" fill="currentColor"/></svg>';var gi='<svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true" focusable="false"><path d="M6.7 9.3L12 14.6l5.3-5.3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';var ki=new Set(["HA-SIDEBAR","ASIDE"]);function nt(s,t=1,e=1){return!!(s&&s.width>=t&&s.height>=e&&s.bottom>0&&s.right>0)}function $i(s,t,e,i=0){if(!s||i>8)return;let a=s.querySelectorAll?s.querySelectorAll("*"):[];for(let n of a){try{t(n)&&e.push(n)}catch{}n.shadowRoot&&$i(n.shadowRoot,t,e,i+1)}}function ot(s){let t=[];return $i(document,s,t),t}function ha(s){let t=ot(i=>s.has(i.tagName)),e=null;for(let i of t){let a=i.getBoundingClientRect();nt(a,24,24)&&(!e||a.width*a.height>e.width*e.height)&&(e={left:a.left,top:a.top,width:a.width,height:a.height,right:a.right,bottom:a.bottom})}return e}function fe(){let s=ot(i=>{if(i.tagName==="BODY"||i.tagName==="HTML")return!1;let a=i.getBoundingClientRect();return!nt(a,200,36)||a.top>8||a.height>150?!1:i.classList?.contains("top-app-bar")||i.classList?.contains("app-header")||i.tagName==="HA-TOP-APP-BAR"||i.tagName==="HA-TOP-APP-BAR-FIXED"}),t=null;for(let i of s){let a=i.getBoundingClientRect();a.height>150||(!t||a.width*a.height>t.width*t.height)&&(t={left:a.left,top:a.top,width:a.width,height:a.height,right:a.right,bottom:a.bottom})}if(t)return t;let e=ot(i=>{if(i.tagName==="BODY"||i.tagName==="HTML")return!1;let a=i.getBoundingClientRect();if(!nt(a,240,36)||a.top>8||a.height>92)return!1;let n=`${i.tagName} ${i.id} ${i.className||""}`.toLowerCase();return/top-app-bar|app-header|navbar|\bheader\b/.test(n)});for(let i of e){let a=i.getBoundingClientRect();if(a.height<=92)return{left:a.left,top:a.top,width:a.width,height:a.height,right:a.right,bottom:a.bottom}}return null}function Mi(){let s=ha(ki);if(s)return s;let t=ot(i=>{if(i.tagName==="BODY"||i.tagName==="HTML")return!1;let a=i.getBoundingClientRect();if(!nt(a,40,240)||a.left>8)return!1;let n=`${i.tagName} ${i.id} ${i.className||""}`.toLowerCase();return/sidebar|navigation|nav-drawer/.test(n)}),e=null;for(let i of t){let a=i.getBoundingClientRect();(!e||a.height>e.height)&&(e={left:a.left,top:a.top,width:a.width,height:a.height,right:a.right,bottom:a.bottom})}return e}function fi(){let s=ot(e=>{if(e.tagName==="BODY"||e.tagName==="HTML")return!1;let i=e.getBoundingClientRect();return!nt(i,200,36)||i.top>8||i.height>150?!1:e.classList?.contains("top-app-bar")||e.classList?.contains("app-header")||e.tagName==="HA-TOP-APP-BAR"||e.tagName==="HA-TOP-APP-BAR-FIXED"}),t=null;for(let e of s){let i=e.getBoundingClientRect();i.height>150||(!t||i.width*i.height>t.area)&&(t={node:e,area:i.width*i.height})}return t?.node||null}function bi(){let s=ot(e=>ki.has(e.tagName)),t=null;for(let e of s){let i=e.getBoundingClientRect();nt(i,24,120)&&(!t||i.height>t.height)&&(t={node:e,height:i.height})}return t?.node||null}function _i(s){let t=Math.round(window.innerWidth||0),e=Math.round(window.innerHeight||0);if(s==="top"){let i=fe(),a=i?.height||56,n=i?.top||0;return{left:i?.left||0,top:n,width:i?.width||t,height:Math.max(40,Math.min(72,a)),right:(i?.left||0)+(i?.width||t),bottom:n+Math.max(40,Math.min(72,a))}}if(s==="sidebar"){let i=Mi();if(i)return i;let a=fe()?.height||56;return{left:0,top:a,width:256,height:Math.max(240,e-a),right:256,bottom:e}}return null}var Ft=12;function be(){let s=Math.round(window.innerWidth||0),t=Math.round(window.innerHeight||0),e=fe(),i=Mi(),a=i&&i.height>=t*.4?i.right+Ft:0,n=e&&e.width>=s*.5?e.bottom+Ft:0;return{vw:s,vh:t,minX:a,minY:n}}function yi(s,t,e,i,a=be()){let{vw:n,vh:r,minX:o,minY:l}=a,h=Math.max(o,n-e-Ft),d=Math.max(l,r-i-Ft);return{x:z(s,o,h),y:z(t,l,d)}}function z(s,t,e){return e<t?t:Math.max(t,Math.min(e,s))}function xi(s){return s==="top"||s==="sidebar"?8:24}var vi=`
  :host {
    position: fixed;
    inset: 0;
    z-index: 2147483000;
    pointer-events: none;
    --hm-accent: #2ee6c5;
    --hm-accent-2: #7b5cff;
  }
  * { box-sizing: border-box; }
  .mini {
    pointer-events: auto;
    position: fixed;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 7px 9px 9px;
    border: 1px solid rgba(46, 230, 197, 0.3);
    border-radius: 16px;
    background:
      linear-gradient(135deg, rgba(46, 230, 197, 0.14), rgba(123, 92, 255, 0.14)),
      rgba(7, 11, 19, 0.82);
    box-shadow:
      0 14px 38px rgba(0, 0, 0, 0.4),
      0 0 20px -6px rgba(46, 230, 197, 0.4);
    backdrop-filter: blur(16px) saturate(1.25);
    -webkit-backdrop-filter: blur(16px) saturate(1.25);
    color: #eaf6ff;
    font-family: var(--ha-font-family, "Noto Sans SC", "PingFang SC", system-ui, sans-serif);
    user-select: none;
    -webkit-user-select: none;
    touch-action: none;
    cursor: grab;
    transition: box-shadow 0.18s ease, border-color 0.18s ease;
  }
  .mini:hover {
    border-color: rgba(46, 230, 197, 0.5);
    box-shadow:
      0 16px 40px rgba(0, 0, 0, 0.46),
      0 0 26px -6px rgba(46, 230, 197, 0.5);
  }
  .mini[data-mode="top"] {
    top: 4px;
    left: 8px;
    right: auto;
    height: 44px;
    padding: 4px 7px;
    gap: 6px;
    border-radius: 11px;
    overflow: hidden;
  }
  .mini[data-mode="top"] .art {
    width: 30px;
    height: 30px;
  }
  .mini[data-mode="top"] .title {
    font-size: 11px;
  }
  .mini[data-mode="top"] .sub {
    font-size: 9.5px;
  }
  .mini[data-mode="top"] .controls button {
    width: 24px;
    height: 24px;
    border-radius: 7px;
  }
  .mini[data-mode="top"] .controls .toggle {
    width: 28px;
    height: 28px;
    border-radius: 8px;
  }
  .mini[data-mode="top"] .progress {
    left: 8px;
    right: 8px;
    bottom: 2px;
  }
  .mini[data-mode="sidebar"] {
    left: 8px;
    top: 64px;
    bottom: auto;
    width: 236px;
    max-height: calc(100vh - 72px);
    border-radius: 14px;
  }
  .mini[data-mode="sidebar"][data-compact="true"] {
    width: var(--hm-sidebar-compact-size, 56px) !important;
    height: var(--hm-sidebar-compact-size, 56px);
    padding: 4px;
    gap: 0;
    justify-content: center;
    border-radius: 50%;
  }
  .mini[data-mode="sidebar"][data-compact="true"] .meta,
  .mini[data-mode="sidebar"][data-compact="true"] .controls,
  .mini[data-mode="sidebar"][data-compact="true"] .progress { display: none; }
  .mini[data-mode="sidebar"][data-compact="true"] .art {
    width: calc(var(--hm-sidebar-compact-size, 56px) - 12px);
    height: calc(var(--hm-sidebar-compact-size, 56px) - 12px);
  }
  .mini[data-mode="fab"] {
    right: max(16px, env(safe-area-inset-right, 0px));
    bottom: calc(env(safe-area-inset-bottom, 0px) + 18px);
    width: min(300px, calc(100vw - 32px));
  }
  .art {
    width: 36px;
    height: 36px;
    flex: 0 0 auto;
    border-radius: 50%;
    overflow: hidden;
    clip-path: circle(50% at 50% 50%);
    display: grid;
    place-items: center;
    color: var(--hm-accent);
    background: linear-gradient(135deg, rgba(46, 230, 197, 0.2), rgba(123, 92, 255, 0.26));
  }
  .art img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform-origin: 50% 50%;
    display: none;
    border-radius: 50%;
    clip-path: circle(50% at 50% 50%);
    pointer-events: none;
    -webkit-user-drag: none;
    user-select: none;
  }
  .art img[src] { display: block; }
  .art .fallback { display: grid; place-items: center; }
  .meta {
    min-width: 0;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: 2px;
    line-height: 1.2;
  }
  .title {
    min-width: 0;
    font-size: 12px;
    font-weight: 650;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #f2f9ff;
  }
  .sub {
    min-width: 0;
    font-size: 10px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #9fb3c8;
  }
  .controls {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    gap: 1px;
  }
  .controls button {
    width: 28px;
    height: 28px;
    margin: 0;
    padding: 0;
    border: 0;
    border-radius: 8px;
    display: grid;
    place-items: center;
    background: transparent;
    color: #c9d9e8;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition: background 0.15s ease, color 0.15s ease, transform 0.15s ease;
  }
  .controls button:hover { background: rgba(46, 230, 197, 0.13); color: var(--hm-accent); }
  .controls button:active { transform: scale(0.92); }
  .controls button:focus-visible {
    outline: 2px solid rgba(46, 230, 197, 0.8);
    outline-offset: 2px;
  }
  .controls button[disabled] { opacity: 0.38; cursor: default; }
  .controls .toggle {
    width: 32px;
    height: 32px;
    border-radius: 10px;
    color: var(--hm-accent);
    background: rgba(46, 230, 197, 0.15);
  }
  .controls .toggle:hover { background: rgba(46, 230, 197, 0.24); }
  .progress {
    position: absolute;
    left: 10px;
    right: 10px;
    bottom: 3px;
    height: 2px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.1);
    overflow: hidden;
  }
  .progress span {
    display: block;
    width: 0;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, var(--hm-accent), var(--hm-accent-2));
    transition: width 0.5s linear;
  }
  @media (max-width: 700px) {
    .mini[data-mode="top"] {
      top: 4px;
      left: 8px;
      right: auto;
      width: calc(100vw - 16px);
      height: 44px;
    }
    .mini[data-mode="sidebar"] {
      width: 236px;
      right: auto;
    }
    .mini[data-mode="fab"] {
      right: max(12px, env(safe-area-inset-right, 0px));
      bottom: calc(env(safe-area-inset-bottom, 0px) + 14px);
      width: min(300px, calc(100vw - 24px));
    }
  }
  /* \u53F3\u4E0B\u89D2\u60AC\u6D6E\u64AD\u653E\u5668\uFF1A\u53C2\u8003\u7AD9\u5185\u5DE6\u4E0B\u89D2 APlayer \u7684\u5706\u76D8 + \u73BB\u7483\u9762\u677F */
  .mini[data-mode="fab"] {
    right: max(24px, env(safe-area-inset-right, 0px));
    bottom: calc(env(safe-area-inset-bottom, 0px) + 24px);
    left: auto;
    top: auto;
    cursor: grab;
    touch-action: none;
    width: 64px;
    height: 64px;
    padding: 0;
    gap: 0;
    border: 0;
    border-radius: 50%;
    background: transparent;
    box-shadow: none;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    overflow: visible;
    isolation: isolate;
    transition: width 0.3s cubic-bezier(0.22, 1, 0.36, 1), height 0.3s cubic-bezier(0.22, 1, 0.36, 1), padding 0.3s cubic-bezier(0.22, 1, 0.36, 1), border-radius 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
  }
  .mini[data-mode="fab"][data-open="true"] {
    width: min(356px, calc(100vw - 32px));
    height: auto;
    padding: 10px 12px;
    gap: 12px;
    align-items: center;
    border: 1px solid rgba(139, 92, 246, 0.36);
    border-radius: 18px;
    background:
      linear-gradient(104deg, rgba(7, 10, 20, 0.6) 0%, rgba(10, 14, 28, 0.5) 48%, rgba(22, 12, 40, 0.46) 100%),
      rgba(8, 11, 21, 0.66);
    box-shadow:
      0 16px 40px rgba(2, 6, 18, 0.62),
      0 0 0 1px rgba(255, 255, 255, 0.04) inset,
      0 0 28px rgba(139, 92, 246, 0.2);
    backdrop-filter: blur(26px) saturate(165%);
    -webkit-backdrop-filter: blur(26px) saturate(165%);
    overflow: hidden;
  }
  .mini[data-mode="fab"][data-open="true"]::before {
    content: "";
    position: absolute;
    inset: -12%;
    z-index: -1;
    border-radius: inherit;
    background-image: var(--fab-cover, none);
    background-size: cover;
    background-position: center;
    filter: blur(22px) saturate(160%);
    opacity: 0.35;
    transform: scale(1.06);
    pointer-events: none;
  }
  .fab-orb {
    position: relative;
    z-index: 2;
    flex: 0 0 auto;
    width: 64px;
    height: 64px;
    transition: width 0.3s cubic-bezier(0.22, 1, 0.36, 1), height 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .mini[data-mode="fab"][data-open="true"] .fab-orb {
    width: 52px;
    height: 52px;
  }
  /* rockjesus.cn \u5DE6\u4E0B\u89D2\u64AD\u653E\u5668\u7684\u73AF\u5F62\u97F3\u9891\u5F8B\u52A8\uFF1A36 \u6839\u67F1\u56F4\u7ED5\u5531\u7247\uFF0C12 \u70B9\u4F4E\u9891\u30016 \u70B9\u9AD8\u9891\u3002 */
  .fab-eq {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 4;
    width: 104px;
    height: 104px;
    margin: -52px 0 0 -52px;
    display: none;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.45s ease;
  }
  .mini[data-mode="fab"][data-open="false"] .fab-eq { display: block; }
  .mini[data-mode="fab"][data-open="false"][data-playing="true"] .fab-eq { opacity: 1; }
  .fab-disc {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: rgba(20, 26, 44, 0.9);
    color: var(--hm-accent);
    cursor: pointer;
    overflow: visible;
    transform: scale(var(--fab-beat, 1));
    transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1);
    box-shadow: 0 10px 26px rgba(2, 6, 18, 0.46);
    -webkit-tap-highlight-color: transparent;
  }
  .mini[data-mode="fab"][data-playing="true"] .fab-disc {
    transition: none;
    will-change: transform;
  }
  .fab-disc .art {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    clip-path: circle(50% at 50% 50%);
    box-shadow: 0 10px 26px rgba(2, 6, 18, 0.48), 0 0 0 1px rgba(255, 255, 255, 0.1) inset;
    background: linear-gradient(135deg, rgba(46, 230, 197, 0.2), rgba(123, 92, 255, 0.26));
  }
  .fab-disc .art img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    clip-path: circle(50% at 50% 50%);
    display: none;
  }
  .fab-disc .art img[src] { display: block; }
  .fab-disc .art .fallback { display: grid; place-items: center; }
  .fab-glow {
    position: absolute;
    inset: -5px;
    z-index: -1;
    border-radius: 50%;
    background: conic-gradient(from 30deg, rgba(46, 230, 197, 0.85), rgba(123, 92, 255, 0.9), rgba(236, 72, 153, 0.55), rgba(46, 230, 197, 0.85));
    filter: blur(9px);
    opacity: 0.72;
    animation: fabRingSpin 9s linear infinite;
    pointer-events: none;
  }
  .mini[data-mode="fab"][data-open="true"] .fab-glow {
    opacity: 0.42;
    animation-duration: 16s;
  }
  .fab-disc:hover .fab-glow { opacity: 0.95; }
  .fab-disc:active { transform: scale(0.96); }
  .fab-disc:focus-visible {
    outline: 2px solid rgba(46, 230, 197, 0.8);
    outline-offset: 4px;
  }
  .fab-quick {
    position: absolute;
    right: -2px;
    bottom: -2px;
    z-index: 5;
    width: 24px;
    height: 24px;
    margin: 0;
    padding: 0;
    border: 1px solid rgba(180, 160, 255, 0.5);
    border-radius: 7px;
    display: grid;
    place-items: center;
    background: rgba(7, 10, 20, 0.78);
    color: #d8ccff;
    box-shadow: 0 4px 12px rgba(2, 6, 18, 0.46);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  .fab-quick:hover { background: rgba(123, 92, 255, 0.42); color: #fff; }
  .fab-quick:active { transform: scale(0.92); }
  .fab-quick:focus-visible { outline: 2px solid rgba(46, 230, 197, 0.8); outline-offset: 2px; }
  .fab-quick[disabled] { opacity: 0.42; cursor: default; }
  .mini[data-mode="fab"][data-open="true"] .fab-quick { display: none; }
  .fab-panel {
    display: none;
    min-width: 0;
    flex: 1 1 auto;
    flex-direction: column;
    gap: 7px;
  }
  .mini[data-mode="fab"][data-open="true"] .fab-panel { display: flex; }
  .fab-head {
    display: flex;
    align-items: flex-start;
    gap: 8px;
  }
  .fab-head .meta { flex: 1 1 auto; }
  .fab-collapse {
    flex: 0 0 auto;
    width: 24px;
    height: 24px;
    margin: 0;
    padding: 0;
    border: 1px solid rgba(148, 163, 184, 0.2);
    border-radius: 7px;
    display: grid;
    place-items: center;
    background: rgba(255, 255, 255, 0.05);
    color: #9fb3c8;
    cursor: pointer;
  }
  .fab-collapse:hover { color: var(--hm-accent); background: rgba(46, 230, 197, 0.12); }
  .fab-panel .progress {
    position: relative;
    left: auto;
    right: auto;
    bottom: auto;
    height: 3px;
    margin: 0;
    overflow: visible;
    background: rgba(255, 255, 255, 0.14);
  }
  .fab-panel .progress span { box-shadow: 0 0 8px rgba(46, 230, 197, 0.55); }
  .fab-panel .controls { gap: 3px; }
  .fab-panel .controls .toggle { width: 32px; height: 32px; border-radius: 9px; }
  .fab-panel .title { font-size: 13px; }
  .fab-panel .sub { font-size: 10.5px; }
  .mini[data-dragging="true"] {
    transition: none;
    cursor: grabbing;
  }
  .mini[data-dragging="true"] * { cursor: grabbing; }
  /* \u9876\u90E8 / \u4FA7\u8FB9\u680F\u53CC\u51FB\u6298\u53E0\u6210\u5C0F\u5706\u76D8\uFF0C\u518D\u6B21\u53CC\u51FB\u5C55\u5F00 */
  .mini[data-mode][data-folded="true"] {
    width: 56px !important;
    height: 56px;
    padding: 4px;
    gap: 0;
    border-radius: 50%;
    justify-content: center;
  }
  .mini[data-mode][data-folded="true"] .meta,
  .mini[data-mode][data-folded="true"] .controls,
  .mini[data-mode][data-folded="true"] .progress { display: none; }
  .mini[data-mode][data-folded="true"] .art {
    width: 46px;
    height: 46px;
    border-radius: 50%;
  }
  @keyframes fabRingSpin {
    to { transform: rotate(1turn); }
  }
  @media (prefers-reduced-motion: reduce) {
    .mini, .controls button, .progress span { transition: none; }
  }
`;function D(s){return s===!0||s==="1"?["top"]:Array.isArray(s)?[...new Set(s.map(t=>String(t)).filter(t=>At.has(t)))]:typeof s!="string"||!s||s==="none"?[]:s.includes(",")?[...new Set(s.split(",").map(t=>t.trim()).filter(t=>At.has(t)))]:At.has(s)?[s]:[]}function Ai(s){return D(s)[0]||"none"}function Et(s){return typeof s=="string"&&s.startsWith("media_player.")?s:""}function lt(s){if(!s||typeof s!="object"||Array.isArray(s))return{};let t={};for(let e of At){let i=Et(s[e]);i&&(t[e]=i)}return t}function Bt(){if(typeof document>"u")return null;let s=document.querySelector("home-assistant");if(s?.hass?.states)return s.hass;let t=s?.shadowRoot?.querySelector("home-assistant-main");if(t?.hass?.states)return t.hass;let e=document.querySelector("ha-music");return e?.hass?.states?e.hass:null}function Ei(){try{let s=window.localStorage.getItem(Mt);if(!s)return null;let t=JSON.parse(s),e=D(t?.modes??t?.mode),i=lt(t?.entities),a=Et(t?.entity);a&&e[0]&&!i[e[0]]&&(i[e[0]]=a);let n=e.filter(r=>i[r]);return n.length?{modes:n,entities:i}:null}catch{return null}}function Si(s={}){try{let t=D(s.modes??s.mode),e=lt(s.entities),i=Et(s.entity);i&&t[0]&&!e[t[0]]&&(e[t[0]]=i);let a=t.filter(o=>e[o]);if(!a.length){window.localStorage.removeItem(Mt);return}let n=JSON.stringify({modes:a,entities:e});if(window.localStorage.getItem(Mt)===n)return;window.localStorage.setItem(Mt,n)}catch{}}function Pi(){try{window.localStorage.removeItem(Mt)}catch{}}function ye(s){if(typeof document>"u")return;let t=window.__haMusicDocks;if(t&&typeof t.get=="function"){if(s)t.get(s)?.remove(),t.delete(s);else{for(let e of t.values())e.remove();t.clear()}window.__haMusicDock=t.values().next().value||null;return}window.__haMusicDock?.remove(),window.__haMusicDock=null}function St(s=[]){if(typeof window>"u"||typeof document>"u")return[];let t=[];for(let a of Array.isArray(s)?s:[s]){let n=Ai(a?.mode),r=Et(a?.entity);n==="none"||!r||t.push({mode:n,entity:r,hass:a?.hass||null})}if(!t.length)return ye(),[];if(!document.body)return document.addEventListener("DOMContentLoaded",()=>St(t),{once:!0}),[];let e=window.__haMusicDocks instanceof Map?window.__haMusicDocks:new Map,i=new Map(t.map(a=>[a.mode,a]));for(let[a,n]of e)i.has(a)||(n.remove(),e.delete(a));for(let[a,n]of i){let r=e.get(a);r?r.update(n):(r=document.createElement("ha-music-mini"),r.update(n),document.body.appendChild(r),e.set(a,r))}return window.__haMusicDocks=e,window.__haMusicDock=e.values().next().value||null,[...e.values()]}var _e=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this._mode="top",this._open=!1,this._folded=!1,this._entity="",this._hass=null,this._poll=null,this._press=null,this._pressTimer=null,this._drag=null,this._dragging=!1,this._suppressClick=!1,this._clickTimer=null,this._onClick=t=>this._handleClick(t),this._onRoute=()=>this._sync(),this._onPointerDown=t=>this._handlePointerDown(t),this._onPointerMove=t=>this._handlePointerMove(t),this._onPointerUp=t=>this._handlePointerUp(t),this._onPointerCancel=t=>this._handlePointerCancel(t),this._onContextMenu=t=>this._handleContextMenu(t),this._onDragStart=t=>{t.preventDefault(),t.stopPropagation()},this._onResize=()=>{this._applySavedPosition(),this._watchDockBounds()},this._boundsObserver=null,this._boundsRaf=null,this._boundsNodes=0,this._sync=this._sync.bind(this)}update(t={}){let e=Ai(t.mode),i=Et(t.entity),a=e!==this._mode;this._mode=e,a&&(this._open=!1,this._folded=!1),this._entity=i,t.hass?.states&&(this._hass=t.hass),(!this.shadowRoot.childElementCount||a)&&this._render(),this._sync(),this._applySavedPosition(),this._watchDockBounds()}connectedCallback(){this.shadowRoot.childElementCount||this._render(),this.shadowRoot.addEventListener("click",this._onClick),this.shadowRoot.addEventListener("pointerdown",this._onPointerDown),this.shadowRoot.addEventListener("pointermove",this._onPointerMove),this.shadowRoot.addEventListener("pointerup",this._onPointerUp),this.shadowRoot.addEventListener("pointercancel",this._onPointerCancel),this.shadowRoot.addEventListener("contextmenu",this._onContextMenu),this.shadowRoot.addEventListener("dragstart",this._onDragStart,!0),window.addEventListener("resize",this._onResize),window.addEventListener("location-changed",this._onRoute),this._startPolling(),this._sync(),window.requestAnimationFrame(()=>{this._applySavedPosition(),this._watchDockBounds()})}disconnectedCallback(){this.shadowRoot.removeEventListener("click",this._onClick),this.shadowRoot.removeEventListener("pointerdown",this._onPointerDown),this.shadowRoot.removeEventListener("pointermove",this._onPointerMove),this.shadowRoot.removeEventListener("pointerup",this._onPointerUp),this.shadowRoot.removeEventListener("pointercancel",this._onPointerCancel),this.shadowRoot.removeEventListener("contextmenu",this._onContextMenu),this.shadowRoot.removeEventListener("dragstart",this._onDragStart,!0),window.removeEventListener("resize",this._onResize),window.removeEventListener("location-changed",this._onRoute),this._boundsObserver&&(this._boundsObserver.disconnect(),this._boundsObserver=null),this._boundsRaf&&(cancelAnimationFrame(this._boundsRaf),this._boundsRaf=null),this._boundsNodes=0,this._poll&&clearInterval(this._poll),this._poll=null}_startPolling(){this._poll||(this._poll=window.setInterval(()=>{let t=Bt()||this._hass;t?.states&&(this._hass=t,this._sync()),this._boundsNodes||this._watchDockBounds()},1e3))}_watchDockBounds(){if(typeof ResizeObserver>"u")return;let t=[];if(this._mode==="top"?t=[fi()].filter(Boolean):this._mode==="sidebar"?t=[bi()].filter(Boolean):this._mode==="fab"&&(t=[fi(),bi()].filter(Boolean)),!t.length){this._boundsNodes=0;return}this._boundsObserver&&this._boundsObserver.disconnect(),this._boundsNodes=t.length,this._boundsObserver=new ResizeObserver(()=>{this._dragging||this._boundsRaf||(this._boundsRaf=window.requestAnimationFrame(()=>{this._boundsRaf=null,this._applySavedPosition()}))});for(let e of t)this._boundsObserver.observe(e)}_render(){if(this._eq=null,this._mode==="fab")return this._renderFab();this.shadowRoot.innerHTML=`
      <style>${vi}</style>
      <div class="mini" data-mode="${this._mode}" role="region" aria-label="HA Music \u8FF7\u4F60\u64AD\u653E\u5668">
        <div class="art">
          <img alt="" draggable="false" />
          <span class="fallback">${pi}</span>
        </div>
        <div class="meta">
          <div class="title">\u9009\u62E9\u64AD\u653E\u5668</div>
          <div class="sub">\u5728\u5361\u7247\u7F16\u8F91\u5668\u4E2D\u9009\u62E9\u4F4D\u7F6E</div>
        </div>
        <div class="controls">
          <button data-act="prev" type="button" aria-label="\u4E0A\u4E00\u9996">${ui}</button>
          <button class="toggle" data-act="toggle" type="button" aria-label="\u64AD\u653E">${It}</button>
          <button data-act="next" type="button" aria-label="\u4E0B\u4E00\u9996">${mi}</button>
        </div>
        <div class="progress"><span></span></div>
      </div>
    `,this._mini=this.shadowRoot.querySelector(".mini"),this._art=this.shadowRoot.querySelector(".art img"),this._fallback=this.shadowRoot.querySelector(".fallback"),this._title=this.shadowRoot.querySelector(".title"),this._sub=this.shadowRoot.querySelector(".sub"),this._toggle=this.shadowRoot.querySelector(".toggle"),this._prev=this.shadowRoot.querySelector('[data-act="prev"]'),this._next=this.shadowRoot.querySelector('[data-act="next"]'),this._progress=this.shadowRoot.querySelector(".progress span"),this._disc=null,this._quick=null,this._art.addEventListener("error",()=>{this._art.removeAttribute("src"),this._fallback.style.display="grid"})}_renderFab(){this.shadowRoot.innerHTML=`
      <style>${vi}</style>
      <div class="mini mini-fab" data-mode="fab" data-open="${this._open?"true":"false"}" role="region" aria-label="HA Music \u60AC\u6D6E\u64AD\u653E\u5668">
        <div class="fab-orb">
          <button class="fab-disc" type="button" aria-label="\u5C55\u5F00\u64AD\u653E\u5668" aria-expanded="${this._open?"true":"false"}">
            <div class="art">
              <img alt="" draggable="false" />
              <span class="fallback">${pi}</span>
            </div>
            <span class="fab-glow"></span>
          </button>
          <canvas class="fab-eq" aria-hidden="true"></canvas>
          <button class="fab-quick" data-act="toggle" type="button" aria-label="\u64AD\u653E">${It}</button>
        </div>
        <div class="fab-panel">
          <div class="fab-head">
            <div class="meta">
              <div class="title">\u9009\u62E9\u64AD\u653E\u5668</div>
              <div class="sub">\u5728\u5361\u7247\u7F16\u8F91\u5668\u4E2D\u9009\u62E9\u4F4D\u7F6E</div>
            </div>
            <button class="fab-collapse" data-act="collapse" type="button" aria-label="\u6536\u8D77\u64AD\u653E\u5668">${gi}</button>
          </div>
          <div class="progress"><span></span></div>
          <div class="controls">
            <button data-act="prev" type="button" aria-label="\u4E0A\u4E00\u9996">${ui}</button>
            <button class="toggle" data-act="toggle" type="button" aria-label="\u64AD\u653E">${It}</button>
            <button data-act="next" type="button" aria-label="\u4E0B\u4E00\u9996">${mi}</button>
          </div>
        </div>
      </div>
    `,this._mini=this.shadowRoot.querySelector(".mini"),this._art=this.shadowRoot.querySelector(".art img"),this._fallback=this.shadowRoot.querySelector(".fallback"),this._title=this.shadowRoot.querySelector(".title"),this._sub=this.shadowRoot.querySelector(".sub"),this._toggle=this.shadowRoot.querySelector(".fab-panel .toggle"),this._prev=this.shadowRoot.querySelector('.fab-panel [data-act="prev"]'),this._next=this.shadowRoot.querySelector('.fab-panel [data-act="next"]'),this._progress=this.shadowRoot.querySelector(".fab-panel .progress span"),this._disc=this.shadowRoot.querySelector(".fab-disc"),this._quick=this.shadowRoot.querySelector(".fab-quick"),this._collapse=this.shadowRoot.querySelector(".fab-collapse"),this._eq=this.shadowRoot.querySelector(".fab-eq"),this._art.addEventListener("error",()=>{this._art.removeAttribute("src"),this._fallback.style.display="grid"})}_stateLabel(t){let e=!this._hass?.language||String(this._hass.language).startsWith("zh");return{playing:e?"\u64AD\u653E\u4E2D":"Playing",paused:e?"\u5DF2\u6682\u505C":"Paused",idle:e?"\u7A7A\u95F2":"Idle",off:e?"\u5DF2\u5173\u95ED":"Off",unavailable:e?"\u4E0D\u53EF\u7528":"Unavailable",unknown:e?"\u672A\u77E5":"Unknown"}[t]||t}_clearDockInlineStyles(){if(this._mini){for(let t of["left","top","right","bottom","width","height","max-height"])this._mini.style.removeProperty(t);this._mini.style.removeProperty("--hm-sidebar-compact-size"),delete this._mini.dataset.compact}}_applySavedPosition(){if(!this._mini||!this._mini.isConnected)return;if(this._mode==="fab"){let m=this._mini,f=m.getBoundingClientRect(),w=f.width||64,E=f.height||64,b=be(),A=ge().fab,S=b.vw-w-24,T=b.vh-E-24,P=yi(A&&Number.isFinite(A.x)?A.x*window.innerWidth:S,A&&Number.isFinite(A.y)?A.y*window.innerHeight:T,w,E,b);m.style.left=`${Math.round(P.x)}px`,m.style.top=`${Math.round(P.y)}px`,m.style.right="auto",m.style.bottom="auto";return}let t=_i(this._mode);if(!t)return;let i=ge()[this._mode],a=xi(this._mode),n=this._mini;if(this._mode==="top"){let m=Math.round(Math.min(44,Math.max(38,t.height-8))),f=Math.max(150,t.width-a*2),w=Math.round(Math.min(330,Math.max(220,t.width-140),f));n.style.width=`${w}px`,n.style.height=`${m}px`,n.style.removeProperty("max-height"),delete n.dataset.compact;let E=t.right-w-96,b=z(i&&Number.isFinite(i.x)?i.x*window.innerWidth:E,t.left+a,t.right-w-a);n.style.left=`${Math.round(b)}px`,n.style.top=`${Math.round(t.top+Math.max(2,(t.height-m)/2))}px`,n.style.right="auto",n.style.bottom="auto";return}let r=Math.round(Math.max(56,Math.min(236,t.width-16))),o=r<170,l=Math.round(Math.max(40,Math.min(56,t.width-4)));o?(n.style.setProperty("--hm-sidebar-compact-size",`${l}px`),n.style.width=`${l}px`,n.style.height=`${l}px`,n.dataset.compact="true"):(n.style.removeProperty("--hm-sidebar-compact-size"),n.style.width=`${r}px`,n.style.height="auto",n.dataset.compact="false"),n.style.maxHeight=`${Math.max(56,t.height-16)}px`;let h=Math.round(t.left+(o?4:a));n.style.left=`${h}px`,n.style.right="auto",n.style.bottom="auto";let d=n.getBoundingClientRect().height||58,c=t.bottom-d-12,g=z(i&&Number.isFinite(i.y)?i.y*window.innerHeight:c,t.top+a,t.bottom-d-a);n.style.top=`${Math.round(g)}px`}_saveCurrentPosition(){if(!this._mini)return;let t=this._mini.getBoundingClientRect();if(this._mode==="fab"){me("fab",z(t.left/Math.max(1,window.innerWidth),0,1),z(t.top/Math.max(1,window.innerHeight),0,1));return}if(this._mode==="top"){me(this._mode,z(t.left/Math.max(1,window.innerWidth),0,1),0);return}me(this._mode,0,z(t.top/Math.max(1,window.innerHeight),0,1))}_handlePointerDown(t){!this._mini||t.button!==0||t.isPrimary===!1||(this._clearPress(),this._press={pointerId:t.pointerId,x:t.clientX,y:t.clientY,long:!1,moved:!1},this._dragging=!1,this._suppressClick=!1,this._pressTimer=window.setTimeout(()=>{this._pressTimer=null,this._press&&this._beginDrag()},360))}_beginDrag(){if(!this._press||!this._mini)return;this._press.long=!0,this._dragging=!0;let t=this._mini.getBoundingClientRect();this._drag={left:t.left,top:t.top,width:t.width,height:t.height,x:this._press.x,y:this._press.y,bounds:this._mode==="fab"?be():_i(this._mode)},this._mini.dataset.dragging="true",this._mini.style.left=`${t.left}px`,this._mini.style.top=`${t.top}px`,this._mini.style.right="auto",this._mini.style.bottom="auto";try{this._mini.setPointerCapture(this._press.pointerId)}catch{}}_handlePointerMove(t){if(!this._press)return;let e=t.clientX-this._press.x,i=t.clientY-this._press.y;if(!this._dragging){Math.hypot(e,i)>8&&(this._press.moved=!0,this._pressTimer&&(window.clearTimeout(this._pressTimer),this._pressTimer=null));return}t.preventDefault();let a=this._drag.bounds;if(!a)return;let n=xi(this._mode),r=this._drag.left,o=this._drag.top;if(this._mode==="top")r=z(this._drag.left+e,a.left+n,a.right-this._drag.width-n);else if(this._mode==="sidebar")o=z(this._drag.top+i,a.top+n,a.bottom-this._drag.height-n);else if(this._mode==="fab"){let l=yi(this._drag.left+e,this._drag.top+i,this._drag.width,this._drag.height,a);r=l.x,o=l.y}this._mini.style.left=`${Math.round(r)}px`,this._mini.style.top=`${Math.round(o)}px`,this._mini.style.right="auto",this._mini.style.bottom="auto"}_handlePointerUp(){if(!this._press)return;let t=this._press.long,e=this._press.moved;this._pressTimer&&(window.clearTimeout(this._pressTimer),this._pressTimer=null),this._dragging&&(this._saveCurrentPosition(),this._releasePointer()),(this._dragging||t||e)&&(this._suppressClick=!0,window.setTimeout(()=>{this._suppressClick=!1},560)),this._dragging=!1,this._press=null,this._mini&&delete this._mini.dataset.dragging}_handlePointerCancel(){this._releasePointer(),this._clearPress(),this._dragging=!1,this._mini&&delete this._mini.dataset.dragging}_clearPress(){this._pressTimer&&(window.clearTimeout(this._pressTimer),this._pressTimer=null),this._press=null}_releasePointer(){let t=this._press?.pointerId;if(!(t===void 0||!this._mini))try{this._mini.releasePointerCapture(t)}catch{}}_handleContextMenu(t){(this._press||this._dragging)&&t.preventDefault()}_sync(){if(!this._mini)return;if(this._mini.dataset.mode=this._mode,this._mini.dataset.folded=this._mode!=="fab"&&this._folded?"true":"false",this._mode==="fab"&&(this._mini.dataset.open=this._open?"true":"false"),this._mini.dataset.playing="false",!this._entity){this._title.textContent="\u9009\u62E9\u64AD\u653E\u5668",this._sub.textContent="\u5728\u5361\u7247\u7F16\u8F91\u5668\u4E2D\u9009\u62E9\u4F4D\u7F6E",this._setDisabled(!0),this._progress.style.width="0%",this._setArt(null),at(this._art,!1),this._syncFabEq(!1,{},0);return}let t=Bt()||this._hass;t?.states&&(this._hass=t);let e=this._hass?.states?.[this._entity];if(!e){this._title.textContent=this._entity,this._sub.textContent="\u5B9E\u4F53\u4E0D\u53EF\u7528",this._setDisabled(!0),this._progress.style.width="0%",this._setArt(null),at(this._art,!1),this._syncFabEq(!1,{},0);return}let i=e.attributes||{},a=i.media_title||i.friendly_name||this._entity;this._title.textContent=a;let n=i.media_artist||i.media_album_name||"";n===a&&(n="");let r=this._stateLabel(e.state);this._sub.textContent=n?`${n} \xB7 ${r}`:r,this._setDisabled(!1);let o=e.state==="playing";this._mini.dataset.playing=o?"true":"false";let l=o?la:It;this._toggle.innerHTML=l,this._toggle.setAttribute("aria-label",o?"\u6682\u505C":"\u64AD\u653E"),this._quick&&(this._quick.innerHTML=l,this._quick.setAttribute("aria-label",o?"\u6682\u505C":"\u64AD\u653E")),this._disc&&(this._disc.setAttribute("aria-label",this._open?"\u6536\u8D77\u64AD\u653E\u5668":"\u5C55\u5F00\u64AD\u653E\u5668"),this._disc.setAttribute("aria-expanded",this._open?"true":"false")),this._collapse&&(this._collapse.innerHTML=gi),this._setArt(i.entity_picture),at(this._art,o);let h=Number(i.media_duration||0),d=Number(i.media_position||0);this._syncFabEq(o,i,d);let c=h>0?Math.min(100,Math.max(0,d/h*100)):0;this._progress.style.width=`${c}%`}_syncFabEq(t,e={},i=0){this._eq&&di(this._eq,this._mini,{playing:t,visible:!this._open,position:i,title:e.media_title,artist:e.media_artist,album:e.media_album_name})}_setArt(t){if(this._art)if(t)try{let e=new URL(t,window.location.href).href;this._art.getAttribute("src")!==e&&(this._art.src=e),this._fallback.style.display="none",this._mini?.style.setProperty("--fab-cover",`url(${JSON.stringify(e)})`)}catch{this._art.removeAttribute("src"),this._fallback.style.display="grid",this._mini?.style.removeProperty("--fab-cover")}else this._art.removeAttribute("src"),this._fallback.style.display="grid",this._mini?.style.removeProperty("--fab-cover")}_setDisabled(t){for(let e of[this._prev,this._toggle,this._next,this._quick])e&&(e.disabled=t)}_toggleOpen(){this._mode!=="fab"||!this._mini||(this._open=!this._open,this._mini.dataset.open=this._open?"true":"false",this._sync(),this._disc&&(this._disc.setAttribute("aria-label",this._open?"\u6536\u8D77\u64AD\u653E\u5668":"\u5C55\u5F00\u64AD\u653E\u5668"),this._disc.setAttribute("aria-expanded",this._open?"true":"false")),window.setTimeout(()=>this._applySavedPosition(),340))}_toggleFold(){if(this._mode==="fab"){this._toggleOpen();return}this._folded=!this._folded,this._sync(),window.setTimeout(()=>this._applySavedPosition(),340)}_handleClick(t){let e=t.target.closest?.("button[data-act]");if(e){if(e.disabled)return;t.preventDefault(),t.stopPropagation();let i=e.dataset.act;i==="collapse"?this._toggleOpen():i==="toggle"?this._call("media_play_pause"):i==="prev"?this._call("media_previous_track"):i==="next"&&this._call("media_next_track");return}if(this._suppressClick){this._suppressClick=!1;return}if(t.preventDefault(),this._clickTimer){window.clearTimeout(this._clickTimer),this._clickTimer=null,this._toggleFold();return}this._clickTimer=window.setTimeout(()=>{this._clickTimer=null,this._call("media_play_pause")},280)}_call(t){if(!this._hass||!this._entity)return;let e=this._hass.callService("media_player",t,{entity_id:this._entity});e?.catch&&e.catch(i=>console.warn("ha-music mini player:",i))}};customElements.get("ha-music-mini")||customElements.define("ha-music-mini",_e);var xe=["off","all","one"],ca=260;function da(s,t,e){let i=new CustomEvent(t,{bubbles:!0,composed:!0,cancelable:!1,detail:e});return s.dispatchEvent(i),i}function ve(s,t,e,i,a){let n=[];for(let r=0;r<=s;r+=4){let o=t/2+Math.sin(r/e*Math.PI*2+a)*i+Math.sin(r/(e/2)*Math.PI*2+a*1.7)*(i*.32);n.push(`${r.toFixed(1)},${o.toFixed(2)}`)}return`M${n.join(" L")}`}function pa(s){switch(s){case"playing":return"playing";case"buffering":return"buffering";case"paused":return"paused";case"idle":return"idle";case"off":return"off";default:return"idle"}}var we=class extends R{static get styles(){return Je}static get properties(){return{_config:{state:!0},_width:{state:!1}}}constructor(){super(),this._config={},this._hass=void 0,this._activeEntity="",this._sig="",this._width=0,this._height=0,this._panel=!1,this._fitPanelRaf=null,this._panelHeight=0,this._tickTimer=null,this._toast="",this._toastTimer=null,this._menu=null,this._seekPreview=null,this._volumePreview=null,this._showRemaining=!1,this._drawer=this._emptyDrawer(),this._artUrl="",this._artSlot=0,this._dockOwner=!1,this._palette=null,this._paletteKey="",this._resizeObserver=null}set hass(t){let e=this._hass;if(this._hass=t,!t)return;let i=this._computeSig(t);(i!==this._sig||e===void 0)&&(this._sig=i,this.requestUpdate()),this._syncTimer()}get hass(){return this._hass}setConfig(t){if(!t)throw new Error("ha-music: \u914D\u7F6E\u4E0D\u80FD\u4E3A\u7A7A");let e=Array.isArray(t.entities)&&t.entities.length?t.entities.filter(Boolean):t.entity?[t.entity]:[];if(!e.length)throw new Error("ha-music: \u9700\u8981\u914D\u7F6E entity\uFF08media_player.*\uFF09\u6216 entities \u5217\u8868");this._config={...t},e.includes(this._activeEntity)||(this._activeEntity=e[0],this._palette=null,this._paletteKey="",this._artUrl=""),this._sig="",this._hass&&(this._sig=this._computeSig(this._hass)),this._syncTimer(),this.requestUpdate()}connectedCallback(){super.connectedCallback(),this._onKeyDown=t=>{t.key==="Escape"&&(this._drawer.open?this._closeDrawer():this._menu&&(this._menu=null,this.requestUpdate()))},window.addEventListener("keydown",this._onKeyDown),this._onViewportResize=()=>this._queuePanelFit(),window.addEventListener("resize",this._onViewportResize),window.visualViewport?.addEventListener("resize",this._onViewportResize),typeof ResizeObserver<"u"&&(this._resizeObserver=new ResizeObserver(t=>{let e=t[0]?.contentRect?.width||0,i=t[0]?.contentRect?.height||0,a=Math.abs(e-this._width)>=1,n=Math.abs(i-this._height)>=1;this._width=e,this._height=i,a?(this._config?.layout||"adaptive")==="adaptive"?this.requestUpdate():this._queuePanelFit():n&&this._queuePanelFit()}),this._resizeObserver.observe(this))}disconnectedCallback(){super.disconnectedCallback(),this._onKeyDown&&(window.removeEventListener("keydown",this._onKeyDown),this._onKeyDown=null),this._onViewportResize&&(window.removeEventListener("resize",this._onViewportResize),window.visualViewport?.removeEventListener("resize",this._onViewportResize),this._onViewportResize=null),this._stopTimer(),this._resizeObserver?.disconnect(),this._resizeObserver=null,this._fitPanelRaf&&cancelAnimationFrame(this._fitPanelRaf),this._fitPanelRaf=null,this._toastTimer&&clearTimeout(this._toastTimer)}_entities(){let t=this._config||{};return(Array.isArray(t.entities)&&t.entities.length?t.entities:t.entity?[t.entity]:[]).filter(Boolean)}_eid(){let t=this._entities();return this._activeEntity||t[0]||""}_state(t=this._eid()){return this._hass?.states?.[t]}_computeSig(t){let e=this._eid(),i=t.states?.[e],a=i?.attributes||{},n=["media_title","media_artist","media_album_name","media_series_title","entity_picture","media_duration","media_position","media_position_updated_at","media_metadata","media_content_id","volume_level","is_volume_muted","shuffle","repeat","source","source_list","sound_mode","sound_mode_list","supported_features","group_members","app_name","queue","media_track"],r={};for(let d of n)d in a&&(r[d]=a[d]);let o=this._config?.volume_entity,l=o?t.states?.[o]?.state:null,h=this._entities().map(d=>{let c=t.states?.[d];return[d,c?.state,c?.attributes?.entity_picture]});return JSON.stringify([e,i?.state,r,l,h,t.language,this._config,this._menu,this._drawer.open,this._drawer.mode,this._drawer.cursor,this._drawer.items.length,this._drawer.loading,this._drawer.error,this._showRemaining,this._layoutKey()])}_syncTimer(){let t=this._state()?.state,e=t==="playing"||t==="buffering";e&&!this._tickTimer?this._tickTimer=setInterval(()=>this.requestUpdate(),500):e||this._stopTimer()}_stopTimer(){this._tickTimer&&(clearInterval(this._tickTimer),this._tickTimer=null)}_layoutKey(){let t=this._config?.layout||"adaptive";return t==="adaptive"?this._width&&this._width<430?"compact":"full":["full","compact","mini"].includes(t)?t:"full"}_themeKey(){let t=this._config?.theme;return t&&it[t]?t:re}_themeVars(){let t=it[this._themeKey()],e=this._paletteKey||this._eid()||"ha-music",i=ai(e),a=this._palette,n=this._config?.accent,r=this._config?.palette!==!1,o=t.accent[0],l=t.accent[1],h=Lt(o),d=Lt(l),c=h,g=de(t.accent[1]),m=de(i.a2);if(r){if(a){let f=pe(g,{h:a.h2,s:a.s2,l:a.l2},.5);l=f.css,d=f.rgb,c=a.rgb1}else if(m){let f=pe(g,m,.35);l=f.css,d=f.rgb}}return n&&(o=n,h=Lt(n,h),r||(c=h)),{"--hm-base":t.base,"--hm-a1":o,"--hm-a2":l,"--hm-a1-rgb":h,"--hm-a2-rgb":d,"--hm-glow-rgb":c}}_volumeInfo(t){let e=this._config?.volume_entity,i=e?this._hass?.states?.[e]:void 0;if(i){let r=i.entity_id;if(r.startsWith("media_player."))return{domain:"media_player",entityId:r,level:Number(i.attributes?.volume_level??0),muted:!!i.attributes?.is_volume_muted,supported:!0,external:!0};if(r.startsWith("number.")){let o=Number(i.state);if(Number.isFinite(o))return{domain:"number",entityId:r,level:x(o/(i.attributes?.max||100),0,1),muted:!1,supported:!0,external:!0}}if(r.startsWith("input_number.")){let o=Number(i.state);if(Number.isFinite(o))return{domain:"input_number",entityId:r,level:x(o/(i.attributes?.max||100),0,1),muted:!1,supported:!0,external:!0}}}let a=this._state(),n=Number.isFinite(t.volume)||$(a,k.VOLUME_SET)||$(a,k.VOLUME_MUTE);return{domain:"media_player",entityId:this._eid(),level:Number.isFinite(t.volume)?t.volume:0,muted:t.muted,supported:n,external:!1}}_repeatValue(){let t=this._state()?.attributes?.repeat;return["off","all","one"].includes(t)?t:"off"}_call(t,e,i="media_player",a){let n=this._hass;if(!n?.callService)return Promise.resolve();let r=a??this._eid();try{let o=n.callService(i,t,{entity_id:r,...e});return Promise.resolve(o)}catch(o){return this._notify(o?.message||String(o)),Promise.reject(o)}}_guard(t){Promise.resolve(t).catch(e=>{let i=e?.message||String(e);this._notify(i.length>60?i.slice(0,60):i)})}_notify(t){this._toast=t||"",this.requestUpdate(),this._toastTimer&&clearTimeout(this._toastTimer),t&&(this._toastTimer=setTimeout(()=>{this._toast="",this.requestUpdate()},3600))}_togglePlay(){let t=this._state()?.state,e=t==="playing"||t==="buffering";this._guard(this._call(e?"media_pause":"media_play"))}_power(){let t=this._state()?.state,e=t==="off"||t==="standby";this._guard(this._call(e?"turn_on":"turn_off"))}_shuffle(){let t=!!this._state()?.attributes?.shuffle;this._guard(this._call("shuffle_set",{shuffle:!t}))}_repeat(){let t=this._repeatValue(),e=xe.indexOf(t),i=xe[(e+1)%xe.length];this._guard(this._call("repeat_set",{repeat:i}))}_seekTo(t){Number.isFinite(t)&&this._guard(this._call("media_seek",{seek_position:t}))}_onSeekInput(t){if(!$(this._state(),k.SEEK))return;let e=t.target,i=Number(e.value);this._seekPreview=i;let a=B(this._state()).duration;e.style.setProperty("--pct",`${a?x(i/a*100,0,100):0}%`)}_onSeekCommit(t){if(!$(this._state(),k.SEEK)){this.requestUpdate();return}let e=Number(t.target.value);this._seekPreview=null,this._seekTo(e),this.requestUpdate()}_onVolumeInput(t){let e=Number(t.target.value)/100;this._volumePreview=e,t.target.style.setProperty("--pct",`${e*100}%`)}_onVolumeCommit(t){let e=x(Number(t.target.value)/100,0,1);this._volumePreview=null;let i=this._volumeInfo(B(this._state()));if(i.domain==="media_player")this._guard(this._call("volume_set",{volume_level:e},"media_player",i.entityId));else{let a=this._hass?.states?.[i.entityId],n=Number(a?.attributes?.max??100),r=Number(a?.attributes?.min??0);this._guard(this._call("set_value",{value:Math.round(r+e*(n-r))},i.domain,i.entityId))}this.requestUpdate()}_toggleMute(){let t=B(this._state()),e=this._volumeInfo(t);if(e.external){e.domain==="media_player"?this._guard(this._call("volume_mute",{is_volume_muted:!e.muted},"media_player",e.entityId)):this._notify(C(this._hass?.language)("volumeEntityMissing"));return}this._guard(this._call("volume_mute",{is_volume_muted:!t.muted}))}_selectSource(t){this._menu=null,this._guard(this._call("select_source",{source:t})),this.requestUpdate()}_selectSoundMode(t){this._menu=null,this._guard(this._call("select_sound_mode",{sound_mode:t})),this.requestUpdate()}_leaveGroup(){this._guard(this._call("unjoin"))}_playQueueItem(t){if(!t?.contentId){this._notify(C(this._hass?.language)("queueEmpty"));return}this._guard(this._call("play_media",{media_content_id:t.contentId,media_content_type:t.contentType||"music"}))}_playBrowseItem(t){t?.contentId&&this._guard(this._call("play_media",{media_content_id:t.contentId,media_content_type:t.contentType||"music"}))}_switchEntity(t){t!==this._activeEntity&&(this._activeEntity=t,this._palette=null,this._paletteKey="",this._artUrl="",this._menu=null,this._seekPreview=null,this._syncTimer(),this._sig=this._computeSig(this._hass),this.requestUpdate())}_moreInfo(){da(this,"hass-more-info",{entityId:this._eid()})}_maEnabled(){let t=this._config?.music_assistant;if(t===!1)return!1;if(t===!0||typeof t=="string"&&t.trim()||this._hass?.services?.music_assistant?.play_media||this._entities().some(a=>{let n=this._hass?.states?.[a]?.attributes||{};return Object.keys(n).some(r=>r.startsWith("mass_"))}))return!0;let i=this._hass?.panels||{};return Object.keys(i).some(a=>{let n=i[a]||{};return n.component_name==="music_assistant"||/music[-_ ]?assistant/i.test(n.url_path||a)||/music\s*assistant/i.test(n.title||"")})}_isMaPlayer(t=this._eid()){let e=this._state(t)?.attributes||{};return Object.keys(e).some(i=>i.startsWith("mass_"))}_maUrl(){let t=this._config?.music_assistant;if(t===!1)return"";if(typeof t=="string"&&t.trim())return t.trim();let e=this._hass?.panels||{};for(let a of Object.keys(e)){let n=e[a]||{},r=n.url_path||a;if(n.component_name==="music_assistant"||/music[-_ ]?assistant/i.test(r)||/music\s*assistant/i.test(n.title||""))return`/${r}`}return this._entities().some(a=>{let n=this._hass?.states?.[a]?.attributes||{};return Object.keys(n).some(r=>r.startsWith("mass_"))})||t===!0?"/music-assistant":""}_openAssistant(){this._drawer?.open&&this._closeDrawer();let t=this._maUrl();if(!t)return;if(/^(https?:)?\/\//i.test(t)){window.open(t,"_blank","noopener");return}let e=t.startsWith("/")?t:`/${t}`;try{window.history.pushState(null,"",e),window.dispatchEvent(new Event("location-changed",{bubbles:!0,composed:!0}))}catch{window.location.href=e}}_onCardClick(t){if(!this._menu)return;(t.composedPath?.()||[]).some(a=>a?.classList?.contains?.("hm-menu")||a?.classList?.contains?.("hm-chip"))||(this._menu=null,this.requestUpdate())}_emptyDrawer(){return{open:!1,mode:null,nodes:[],cursor:-1,items:[],title:"",loading:!1,error:""}}_openQueue(){let t=C(this._hass?.language),e=ce(this._state(),this._config?.max_queue??40);this._drawer={open:!0,mode:"queue",nodes:[],cursor:-1,items:e,title:t("queue"),loading:!1,error:""},this.requestUpdate()}_openLibrary(){let t=C(this._hass?.language);this._drawer={open:!0,mode:"library",nodes:[],cursor:-1,items:[],title:t("library"),loading:!0,error:"",t},this.requestUpdate(),this._fetchBrowse()}_openPlaylists(){let t=C(this._hass?.language);if(!this._isMaPlayer()){this._notify(t("maPlayerRequired"));return}this._drawer={open:!0,mode:"playlists",nodes:[],cursor:-1,items:[],title:t("playlists"),loading:!0,error:"",maUrl:this._maUrl()},this.requestUpdate(),this._fetchPlaylists()}async _browseMedia(t,e){let i=this._hass?.connection;if(!i?.sendMessagePromise)throw new Error("unsupported");let a={type:"media_player/browse_media",entity_id:this._eid()};return t&&(a.media_content_id=t,e&&(a.media_content_type=e)),i.sendMessagePromise(a)}async _fetchPlaylists(){let t=C(this._hass?.language);try{let i=(await this._browseMedia())?.children||[],a=i.find(o=>o.can_expand&&(/playlist/i.test(o.media_class||"")||/playlist/i.test(o.media_content_type||"")||/播放列表|playlists?/i.test(o.title||""))||!1),n=[];a&&(n=(await this._browseMedia(a.media_content_id,a.media_content_type))?.children||[]),n.length||(n=i.filter(o=>/playlist/i.test(o.media_class||"")));let r=n.map(o=>({title:o.title||"",subtitle:(()=>{let l=he(o.media_class,this._hass?.language);return l&&l!==t("playlists")?l:""})(),contentId:o.media_content_id||"",contentType:o.media_content_type||"playlist",thumb:o.thumbnail||""})).filter(o=>o.contentId);if(this._drawer.mode!=="playlists")return;this._drawer={...this._drawer,loading:!1,items:r,error:""}}catch(e){if(this._drawer.mode!=="playlists")return;this._drawer={...this._drawer,loading:!1,items:[],error:e?.message?`${t("browseFailed")} \xB7 ${String(e.message).slice(0,40)}`:t("browseFailed")}}this.requestUpdate()}async _playPlaylistItem(t){if(!t?.contentId)return;let e=C(this._hass?.language),i=this._eid();if(!this._isMaPlayer(i)){this._notify(e("maPlayerRequired"));return}let a=t.contentType||"playlist",n=()=>{this._notify(`${e("playingPlaylist")} \xB7 ${t.title||""}`),this._closeDrawer()},r=!!this._hass?.services?.music_assistant?.play_media,o=l=>{let h=l?.message||String(l);return/nothing to play here/i.test(h)?e("playlistEmpty"):h.length>60?h.slice(0,60):h};if(r)try{await this._hass.callService("music_assistant","play_media",{entity_id:i,media_id:t.contentId,media_type:"playlist",enqueue:"play"}),n();return}catch(l){let h=l?.message||String(l);if(/nothing to play here/i.test(h)){this._markPlaylistEmpty(t),this._notify(o(l));return}if(!/match|target|not a valid|does not support|unsupported/i.test(h)){this._notify(o(l));return}}try{await this._call("play_media",{media_content_id:t.contentId,media_content_type:a}),n()}catch(l){/nothing to play here/i.test(l?.message||"")&&this._markPlaylistEmpty(t),this._notify(o(l)||e("browseFailed"))}}_markPlaylistEmpty(t){this._drawer.mode==="playlists"&&(this._drawer={...this._drawer,items:this._drawer.items.map(e=>e.contentId===t.contentId?{...e,empty:!0}:e)},this.requestUpdate())}_closeDrawer(){this._drawer={...this._drawer,open:!1},this.requestUpdate(),setTimeout(()=>{this._drawer.open||(this._drawer=this._emptyDrawer(),this.requestUpdate())},ca)}async _fetchBrowse(){let t=this._hass,e=t?.connection,i=C(t?.language),a=this._drawer.cursor>=0?this._drawer.nodes[this._drawer.cursor]:null,n={type:"media_player/browse_media",entity_id:this._eid()};if(a&&(n.media_content_id=a.contentId,a.contentType&&(n.media_content_type=a.contentType)),this._drawer={...this._drawer,loading:!0,error:""},this.requestUpdate(),!e?.sendMessagePromise){this._drawer={...this._drawer,loading:!1,error:i("browseFailed")},this.requestUpdate();return}try{let r=await e.sendMessagePromise(n),o=(r?.children||[]).map(l=>({title:l.title||"",subtitle:he(l.media_class,this._hass?.language)||l.media_content_type||"",contentId:l.media_content_id||"",contentType:l.media_content_type||"",thumb:l.thumbnail||"",canPlay:!!l.can_play,canExpand:!!l.can_expand,cls:l.media_class||""}));if(this._drawer.mode!=="library")return;this._drawer={...this._drawer,loading:!1,items:o,title:a?.title||r?.title||i("library"),error:""}}catch(r){if(this._drawer.mode!=="library")return;this._drawer={...this._drawer,loading:!1,items:[],error:r?.message?`${i("browseFailed")} \xB7 ${String(r.message).slice(0,40)}`:i("browseFailed")}}this.requestUpdate()}_enterBrowseItem(t){if(!t.canExpand){t.canPlay&&this._playBrowseItem(t);return}let e=this._drawer.nodes.slice(0,this._drawer.cursor+1);e.push({contentId:t.contentId,contentType:t.contentType,title:t.title}),this._drawer={...this._drawer,nodes:e,cursor:e.length-1,title:t.title,items:[]},this.requestUpdate(),this._fetchBrowse()}_browseBack(){this._drawer.cursor<0||(this._drawer={...this._drawer,cursor:this._drawer.cursor-1,items:[]},this.requestUpdate(),this._fetchBrowse())}updated(){let t=this.renderRoot?.querySelector?.(".hm-card");if(!t)return;let e=this._artUrlFor();e!==this._artUrl&&(this._artUrl=e,this._crossFadeArt(t,e)),this._syncRangeValues(),this._syncPanelFlag(),this._queuePanelFit(),this._installDock(),at(this.renderRoot?.querySelector?.(".hm-cover img"),this._state()?.state==="playing")}_queuePanelFit(){if(this._fitPanelRaf&&cancelAnimationFrame(this._fitPanelRaf),typeof requestAnimationFrame>"u"){this._fitPanel();return}this._fitPanelRaf=requestAnimationFrame(()=>{this._fitPanelRaf=null,this._fitPanel()})}_fitPanel(){if(!this._panel){this.style.removeProperty("--hm-panel-cover"),this.style.removeProperty("--hm-panel-height"),this._panelHeight=0;return}let t=this.renderRoot?.querySelector?.(".hm-card");if(!t)return;let e=Math.round(window.visualViewport?.height||window.innerHeight||0);if(e<240)return;let i=t.getBoundingClientRect(),a=Math.max(240,Math.min(e,Math.floor(e-Math.max(0,i.top))));a!==this._panelHeight&&(this._panelHeight=a,this.style.setProperty("--hm-panel-height",`${a}px`));let n=this.renderRoot?.querySelector?.(".hm-main");if(!n)return;let r=Math.round(n.clientHeight||0),o=Math.round(n.clientWidth||0);if(r<80||o<80)return;let l=t.clientWidth<820,h;if(l){let d=Math.min(180,Math.max(96,r*.3));h=Math.max(120,Math.min(o*.88,r-d))}else h=Math.max(120,Math.min(r,o*.34));this.style.setProperty("--hm-panel-cover",`${Math.round(h)}px`)}_isPanelContext(){if(this.closest?.("hui-panel-view"))return!0;let t=this.getRootNode?.();for(;t;){let e=t.host;if(!e)break;if(String(e.tagName||"").toLowerCase()==="hui-panel-view")return!0;t=e.getRootNode?.()}return!1}_syncPanelFlag(){let t=this._isPanelContext();t!==this._panel&&(this._panel=t,this.setAttribute("data-panel",String(t)),this.renderRoot?.querySelector?.(".hm-card")?.setAttribute("data-panel",String(t)))}_isPreviewContext(){let t=this.getRootNode?.();for(;t;){let e=t.host;if(!e)break;let i=String(e.tagName||"").toLowerCase();if(i==="hui-card-preview"||i==="hui-card-options"||i==="hui-dialog-edit-card"||i==="ha-dialog")return!0;t=e.getRootNode?.()}return!!this.closest?.("hui-card-preview, hui-card-options")}_installDock(){let t=D(this._config?.dock),e=lt(this._config?.dock_entities),i=this._eid?.()||this._config?.entity||(Array.isArray(this._config?.entities)?this._config.entities[0]:"");if(!t.length){this._dockOwner&&(Pi(),ye(),this._dockOwner=!1);return}if(!this._hass||!this.isConnected||!i||this._isPreviewContext())return;let a={};for(let r of t){let o=e[r]||i;o&&(a[r]=o)}let n=Object.entries(a).map(([r,o])=>({mode:r,entity:o,hass:this._hass}));St(n),Si({modes:Object.keys(a),entities:a}),this._dockOwner=!0}_artUrlFor(){let t=B(this._state());return H(this._hass,t.art)}_crossFadeArt(t,e){let i=t.querySelectorAll(".hm-bg-art");if(!i.length)return;let a=i.length>1?(this._artSlot+1)%2:0,n=i[a],r=i[this._artSlot];if(!e){i.forEach(l=>{l.classList.remove("on"),l.style.backgroundImage=""}),this._artSlot=0,this._maybePalette("");return}let o=new Image;o.decoding="async",o.onload=()=>{n.style.backgroundImage=`url("${e}")`,n.classList.add("on"),r?.classList.remove("on"),this._artSlot=a,this._maybePalette(e)},o.onerror=()=>{this._maybePalette("")},o.src=e}_maybePalette(t){let e=B(this._state()),i=t||`${e.title}|${e.artist}|${this._eid()}`;if(this._paletteKey!==i){if(this._paletteKey=i,!t){this._palette=null,this.requestUpdate();return}ri(t,i).then(a=>{this._paletteKey===i&&(this._palette=a,this.requestUpdate())})}}_syncRangeValues(){let t=this.renderRoot;if(!t)return;let e=t.querySelector?.('input.hm-range[data-role="seek"]'),i=t.querySelector?.('input.hm-range[data-role="volume"]'),a=B(this._state());if(e&&this._seekPreview===null){let n=a.duration||0,r=x(a.position,0,n||a.position);e.value=String(r),e.max=String(n||0),e.style.setProperty("--pct",`${n?x(r/n*100,0,100):0}%`)}if(i&&this._volumePreview===null){let n=this._volumeInfo(a);i.value=String(Math.round(n.level*100)),i.style.setProperty("--pct",`${n.level*100}%`),i.setAttribute("data-disabled",String(!n.supported))}}getCardSize(){let t=this._layoutKey();return t==="mini"?1:t==="compact"?3:6}render(){let t=this._hass,e=this._config||{},i=C(t?.language),a=this._layoutKey(),n=this._themeKey();if(!t)return p`
        <div class="hm-card" data-layout=${a} data-panel=${this._panel?"true":"false"} data-theme=${n} style=${U(this._themeVars())}>
          <div class="hm-body">
            <div class="hm-empty">${i("loading")}</div>
          </div>
        </div>
      `;let r=this._eid(),o=t.states?.[r];if(!o)return p`
        <div class="hm-card" data-layout=${a} data-panel=${this._panel?"true":"false"} data-theme=${n} style=${U(this._themeVars())}>
          <div class="hm-body">
            <div class="hm-empty">
              ${r?`\u5B9E\u4F53\u672A\u627E\u5230\uFF1A${r}`:"ha-music: entity \u672A\u914D\u7F6E"}
            </div>
          </div>
        </div>
      `;let l=B(o),h=ce(o,e.max_queue??40),d=o.state==="playing"||o.state==="buffering",c=pa(o.state),g=i(c),m=l.album||l.series||l.appName||(c==="playing"?i("playing"):g),f=this._volumeInfo(l),w=e.show_volume!==!1&&f.supported,E=$(o,k.SHUFFLE_SET),b=$(o,k.REPEAT_SET),v=$(o,k.PREVIOUS_TRACK),A=$(o,k.NEXT_TRACK),S=$(o,k.PLAY)||$(o,k.PAUSE),T=o.state==="off"||o.state==="standby",P=T?$(o,k.TURN_ON):$(o,k.TURN_OFF),ht=$(o,k.BROWSE_MEDIA),ct=this._maEnabled()&&this._isMaPlayer(r),Pt=$(o,k.SEEK),q=Array.isArray(o.attributes?.source_list)?o.attributes.source_list:[],V=Array.isArray(o.attributes?.sound_mode_list)?o.attributes.sound_mode_list:[],dt=e.show_source!==!1&&q.length>0&&$(o,k.SELECT_SOURCE),j=V.length>0&&$(o,k.SELECT_SOUND_MODE),Vt=l.groupMembers.filter(M=>M&&M!==r),Ee=e.show_group!==!1&&l.groupMembers.length>1,Ti=e.show_queue!==!1&&h.length>0,qi=e.show_library!==!1&&ht,jt=e.visualizer||"bars",Oi=e.cover||"ambient",Q=l.duration,Ct=this._seekPreview??l.position,Ni=Q?x(Ct/Q*100,0,100):0,Wt=Math.round(f.level*100),Z=this._repeatValue(),Rt=l.title||"",Se=this._entities(),Pe=H(t,l.art);return p`
      <div
        class="hm-card"
        data-theme=${n}
        data-layout=${a}
        data-panel=${this._panel?"true":"false"}
        data-playing=${d?"true":"false"}
        data-cover=${Oi}
        style=${U(this._themeVars())}
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
              <span class="hm-status-text hm-status-player">${e.name||Ut(t,r,r)}</span>
            </div>
            <div class="hm-top-actions">
              ${ct?p`<button
                    class="hm-icon-btn hm-ma"
                    aria-label=${i("playlists")}
                    title=${i("playlists")}
                    @click=${()=>this._openPlaylists()}
                  >
                    ${y("playlist",16)}
                  </button>`:u}
              ${Ti?p`<button
                    class="hm-icon-btn"
                    aria-label=${i("queue")}
                    title=${i("queue")}
                    @click=${()=>this._openQueue()}
                  >
                    ${y("queue",16)}
                  </button>`:u}
              ${qi?p`<button
                    class="hm-icon-btn"
                    aria-label=${i("library")}
                    title=${i("library")}
                    @click=${()=>this._openLibrary()}
                  >
                    ${y("library",16)}
                  </button>`:u}
              ${P?p`<button
                    class="hm-icon-btn"
                    data-role="power"
                    aria-label=${i("power")}
                    title=${i("power")}
                    @click=${()=>this._power()}
                  >
                    ${y("power",16)}
                  </button>`:u}
              <button
                class="hm-icon-btn"
                data-role="more"
                aria-label=${i("more")}
                title=${i("more")}
                @click=${()=>this._moreInfo()}
              >
                ${y("more",16)}
              </button>
            </div>
          </header>

          ${Se.length>1?p`
                <div class="hm-entities">
                  ${Se.map(M=>{let Kt=t.states?.[M],pt=H(t,Kt?.attributes?.entity_picture);return p`<button
                      class="hm-entity-chip"
                      data-active=${M===r?"true":"false"}
                      @click=${()=>this._switchEntity(M)}
                    >
                      <span
                        class="hm-entity-dot"
                        style=${pt?`background-image:url("${pt}")`:""}
                      ></span>
                      <span class="hm-entity-name">${Ut(t,M,M)}</span>
                    </button>`})}
                </div>`:u}

          <section class="hm-main">
            <div class="hm-cover-wrap">
              <button
                class="hm-cover"
                data-playing=${d?"true":"false"}
                aria-label=${i("more")}
                title=${Rt||i("noMedia")}
                @click=${()=>this._moreInfo()}
              >
                ${Pe?p`<img src=${Pe} alt=${Rt||""} />`:p`<span class="hm-cover-ph">${y("music",40)}</span>`}
              </button>
              <div class="hm-cover-halo"></div>
            </div>

            <div class="hm-meta">
              <div class="hm-kicker">
                ${m||i("noMedia")}
                ${l.track?p`<span class="hm-kicker-sep">·</span>
                      <span>${i("track")} ${l.track}</span>`:u}
              </div>
              <h2 class="hm-title ${Rt?"":"placeholder"}">
                ${Rt||i("noTitle")}
              </h2>
              <div class="hm-artist">
                ${l.artist||(l.album?l.album:g)}
              </div>
              ${dt||j||Ee?p`<div class="hm-tags">
                    ${dt?p`<button
                          class="hm-chip interactive"
                          @click=${()=>{this._menu=this._menu==="source"?null:"source",this.requestUpdate()}}
                        >
                          <span class="hm-chip-label">${i("source")}</span>
                          <span class="hm-chip-value">${l.source||"\u2014"}</span>
                        </button>`:u}
                    ${j?p`<button
                          class="hm-chip interactive"
                          @click=${()=>{this._menu=this._menu==="sound"?null:"sound",this.requestUpdate()}}
                        >
                          <span class="hm-chip-label">${i("soundMode")}</span>
                          <span class="hm-chip-value">${l.soundMode||"\u2014"}</span>
                        </button>`:u}
                    ${Ee?p`<span
                          class="hm-chip ${$(o,k.GROUPING)?"interactive":""}"
                          title=${$(o,k.GROUPING)?`${i("group")} \xB7 ${i("groupLeave")}`:i("group")}
                          @click=${()=>{$(o,k.GROUPING)&&this._leaveGroup()}}
                        >
                          ${y("group",13)}
                          <span class="hm-group">
                            ${Vt.slice(0,3).map(M=>{let Kt=t.states?.[M],pt=H(t,Kt?.attributes?.entity_picture);return p`<span
                                class="hm-group-avatar"
                                title=${Ut(t,M,M)}
                                style=${pt?`background-image:url("${pt}")`:""}
                              ></span>`})}
                            ${Vt.length>3?p`<span class="hm-group-more">+${Vt.length-3}</span>`:u}
                          </span>
                        </span>`:u}
                  </div>`:u}
            </div>
          </section>

          ${jt!=="none"?p`<div
                class="hm-vis"
                data-playing=${d?"true":"false"}
                data-style=${jt}
              >
                ${this._renderVisualizer(jt,l)}
              </div>`:u}

          ${Q>0?p`<section class="hm-progress">
                <span class="hm-time">${kt(Ct)}</span>
                <input
                  class="hm-range"
                  data-role="seek"
                  type="range"
                  min="0"
                  max=${Q}
                  step="0.5"
                  .value=${String(Ct)}
                  data-disabled=${Pt?"false":"true"}
                  style=${U({"--pct":`${Ni}%`})}
                  @input=${this._onSeekInput}
                  @change=${this._onSeekCommit}
                  aria-label=${i("seek")}
                />
                <span
                  class="hm-time end hoverable"
                  title=${i("remaining")}
                  @click=${()=>{this._showRemaining=!this._showRemaining,this.requestUpdate()}}
                >
                  ${this._showRemaining?`-${kt(Math.max(Q-Ct,0))}`:kt(Q)}
                </span>
              </section>`:u}

          <section class="hm-controls">
            <div class="hm-transport">
              ${E?p`<button
                    class="hm-btn"
                    data-role="shuffle"
                    data-on=${l.shuffle?"true":"false"}
                    aria-label=${i("shuffle")}
                    title=${i("shuffle")}
                    @click=${()=>this._shuffle()}
                  >
                    ${y("shuffle",18)}
                  </button>`:u}
              ${v?p`<button
                    class="hm-btn"
                    data-role="previous"
                    aria-label=${i("previous")}
                    title=${i("previous")}
                    @click=${()=>this._guard(this._call("media_previous_track"))}
                  >
                    ${y("previous",18)}
                  </button>`:u}
              ${S?p`<button
                    class="hm-play ${d?"is-playing":""}"
                    aria-label=${i(d?"pause":"play")}
                    title=${i(d?"pause":"play")}
                    @click=${()=>this._togglePlay()}
                  >
                    ${d?y("pause",26):y("play",26)}
                  </button>`:u}
              ${A?p`<button
                    class="hm-btn"
                    aria-label=${i("next")}
                    title=${i("next")}
                    @click=${()=>this._guard(this._call("media_next_track"))}
                  >
                    ${y("next",18)}
                  </button>`:u}
              ${b?p`<button
                    class="hm-btn"
                    data-role="repeat"
                    data-on=${Z!=="off"?"true":"false"}
                    aria-label=${i(Z==="one"?"repeatOne":Z==="all"?"repeatAll":"repeatOff")}
                    title=${i(Z==="one"?"repeatOne":Z==="all"?"repeatAll":"repeatOff")}
                    @click=${()=>this._repeat()}
                  >
                    ${y(Z==="one"?"repeatOne":"repeat",18)}
                  </button>`:u}
            </div>

            ${w?p`<div class="hm-volume">
                  <button
                    class="hm-icon-btn"
                    aria-label=${f.muted?i("unmute"):i("mute")}
                    title=${f.muted?i("unmute"):i("mute")}
                    @click=${()=>this._toggleMute()}
                  >
                    ${y(f.muted?"mute":"volume",16)}
                  </button>
                  <input
                    class="hm-range"
                    data-role="volume"
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    .value=${String(Wt)}
                    style=${U({"--pct":`${Wt}%`})}
                    @input=${this._onVolumeInput}
                    @change=${this._onVolumeCommit}
                    aria-label=${i("volume")}
                  />
                  <span class="hm-vol-pct">${Wt}%</span>
                </div>`:u}
          </section>
        </div>

        ${this._menu?p`<div class="hm-menu">
              <div class="hm-menu-head">
                ${this._menu==="source"?i("source"):i("soundMode")}
              </div>
              ${(this._menu==="source"?q:V).map(M=>p`<button
                  class="hm-menu-item"
                  data-active=${(this._menu==="source"?l.source:l.soundMode)===M?"true":"false"}
                  @click=${()=>this._menu==="source"?this._selectSource(M):this._selectSoundMode(M)}
                >
                  <span>${M}</span>
                  <span class="hm-menu-check">${y("check",13)}</span>
                </button>`)}
            </div>`:u}

        ${this._renderDrawer()}

        <div class="hm-toast ${this._toast?"show":""}">${this._toast}</div>
      </div>
    `}_renderVisualizer(t,e){let i=ii(e);if(t==="wave"){let n=7+i.energy*6+i.low*7,r=4.5+i.pulse*5.5,o=2.2+i.pulse*3.2,l=i.phase,h=`${(i.period*2.4).toFixed(2)}s`;return p`<div class="hm-wave-wrap">
        <svg
          viewBox="0 0 600 40"
          preserveAspectRatio="none"
          aria-hidden="true"
          style=${U({animationDuration:h})}
        >
          <path
            d=${ve(600,40,150,n,l)}
            fill="none"
            stroke="rgba(var(--hm-a1-rgb), 0.85)"
            stroke-width="1.4"
          ></path>
          <path
            d=${ve(600,40,150,r,l*1.35+1.9)}
            fill="none"
            stroke="rgba(var(--hm-a2-rgb), 0.6)"
            stroke-width="1.2"
          ></path>
          <path
            d=${ve(600,40,75,o,l*1.7+3.2)}
            fill="none"
            stroke="rgba(var(--hm-a1-rgb), 0.35)"
            stroke-width="0.9"
          ></path>
        </svg>
      </div>`}return t==="orbit"?p`<div class="hm-orbit-wrap">
        ${[1,.58,.34].map((r,o)=>{let l=o===0?i.low:i.pulse;return p`<span
            class="hm-orbit-ring"
            style=${U({"--react":String(r),"--drive":l.toFixed(3),animationDuration:`${(i.period*(1.8+o*.25)).toFixed(2)}s`,animationDelay:`${(o*i.period*.55).toFixed(2)}s`})}
          ></span>`})}
      </div>`:p`<div class="hm-bars">
      ${Array.from({length:36},(n,r)=>{let o=L(`${i.seed}#${r}`),l=.14+o%100/135,h=r<12?0:r<24?1:2,d=[1,.62,.34][h],c=h===0?i.low:i.pulse,g=h===0?1+.12*c:1,m=x(l*(.55+d*.55*c)*g,.08,1),f=.9+(o>>8)%100/90,w=-((o>>16)%100/45);return p`<span
          class="hm-bar"
          style=${U({"--h":m.toFixed(3),"--dur":`${f.toFixed(2)}s`,"--delay":`${w.toFixed(2)}s`})}
        ></span>`})}
    </div>`}_renderDrawer(){let t=this._drawer,e=C(this._hass?.language),i=t.mode==="library",a=t.mode==="playlists";return p`
      <div
        class="hm-drawer ${t.open?"open":""}"
        role="dialog"
        aria-hidden=${t.open?"false":"true"}
      >
        <div class="hm-drawer-head">
          ${i&&t.cursor>=0?p`<button
                class="hm-icon-btn"
                aria-label=${e("back")}
                title=${e("back")}
                @click=${()=>this._browseBack()}
              >
                ${y("chevronLeft",16)}
              </button>`:u}
          <div class="hm-drawer-title">${t.title||(i?e("library"):"")}</div>
          ${a&&t.maUrl?p`<button
                class="hm-icon-btn hm-ma"
                aria-label=${e("openAssistant")}
                title=${e("openAssistant")}
                @click=${()=>this._openAssistant()}
              >
                ${y("external",15)}
              </button>`:u}
          <button
            class="hm-icon-btn"
            aria-label=${e("close")}
            title=${e("close")}
            @click=${()=>this._closeDrawer()}
          >
            ${y("close",16)}
          </button>
        </div>
        <div class="hm-drawer-body">
          ${t.loading?p`<div class="hm-empty"><span class="hm-spinner"></span></div>`:t.error?p`<div class="hm-empty">${t.error}</div>`:t.items.length?this._renderDrawerItems(t.items,t.mode):p`<div class="hm-empty">
                    ${e(i?"browseFailed":a?"playlistsEmpty":"queueEmpty")}
                  </div>`}
        </div>
      </div>
    `}_renderDrawerItems(t,e){let i=C(this._hass?.language),a=e==="library",n=e==="playlists";return t.map(r=>{if(n){let l=H(this._hass,r.thumb);return p`<button
          class="hm-list-item"
          data-empty=${r.empty?"true":"false"}
          @click=${()=>this._playPlaylistItem(r)}
        >
          <span
            class="hm-list-thumb"
            style=${l?`background-image:url("${l}")`:""}
          >
            ${l?u:y("playlist",16)}
          </span>
          <span class="hm-list-text">
            <span class="hm-list-name">${r.title||"\u2014"}</span>
            <span class="hm-list-sub">${r.empty?i("playlistUnavailable"):r.subtitle}</span>
          </span>
          <span class="hm-list-tail">${y("play",14)}</span>
        </button>`}if(a){let l=H(this._hass,r.thumb);return p`<button
          class="hm-list-item"
          @click=${()=>this._enterBrowseItem(r)}
        >
          <span
            class="hm-list-thumb"
            style=${l?`background-image:url("${l}")`:""}
          >
            ${l?u:y(r.canExpand?"library":"music",16)}
          </span>
          <span class="hm-list-text">
            <span class="hm-list-name">${r.title||"\u2014"}</span>
            <span class="hm-list-sub">${r.subtitle}</span>
          </span>
          <span class="hm-list-tail">
            ${r.canExpand?y("chevronRight",14):u}
          </span>
        </button>`}let o=H(this._hass,r.art);return p`<button
        class="hm-list-item"
        data-active=${r.active?"true":"false"}
        @click=${()=>this._playQueueItem(r)}
      >
        <span
          class="hm-list-thumb"
          style=${o?`background-image:url("${o}")`:""}
        >
          ${o?u:y("music",16)}
        </span>
        <span class="hm-list-text">
          <span class="hm-list-name">${r.title||i("noTitle")}</span>
          <span class="hm-list-sub">${r.artist||r.album||""}</span>
        </span>
        <span class="hm-list-tail">${r.duration?kt(r.duration):""}</span>
      </button>`})}static getStubConfig(t){let e=t?.states||{};return{entity:Object.keys(e).find(a=>a.startsWith("media_player.")&&e[a]?.attributes?.supported_features!==void 0)||"",theme:re}}static getConfigElement(){return document.createElement("ha-music-editor")}};customElements.get("ha-music")||(customElements.define("ha-music",we),window.customCards=window.customCards||[],window.customCards.push({type:ti,name:ei,description:"\u73B0\u4EE3\u70AB\u9177\u914D\u8272\u7684\u5168\u529F\u80FD\u97F3\u4E50\u64AD\u653E\u5668\u5361\u7247\uFF1A\u5C01\u9762\u53D6\u8272\u3001\u9891\u8C31\u53EF\u89C6\u5316\u3001\u5A92\u4F53\u5E93\u6D4F\u89C8\u3001\u64AD\u653E\u961F\u5217\u3001\u591A\u8BBE\u5907\u5207\u6362\u3002",preview:!0,documentationURL:"https://github.com/RockJesus/ha-music"}),console.info(`%c HA-MUSIC %c v${Ze} `,"background:#2ee6c5;color:#04121a;font-weight:700;border-radius:4px 0 0 4px","background:#7b5cff;color:#fff;border-radius:0 4px 4px 0"));function ua(s,t){s.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}var ke=class extends R{static get properties(){return{hass:{attribute:!1},_config:{state:!0}}}static get styles(){return mt`
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
        min-height: 40px;
        padding: 4px 0;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
      }
      .entity-row {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .dock-row {
        display: grid;
        grid-template-columns: 112px minmax(0, 1fr);
        align-items: center;
        gap: 8px;
      }
      .dock-row .check {
        min-height: 36px;
      }
      .dock-row ha-entity-picker {
        min-width: 0;
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
        width: 20px;
        height: 20px;
        margin: 0;
        accent-color: var(--primary-color, #2ee6c5);
      }
      .mini-btn {
        min-height: 36px;
      }
      select,
      input[type="text"],
      input[type="color"] {
        min-height: 40px;
      }
      @media (pointer: coarse) {
        .mini-btn {
          min-height: 44px;
          padding: 8px 14px;
        }
        select,
        input[type="text"] {
          min-height: 46px;
        }
        .switch-row {
          min-height: 48px;
        }
        input[type="checkbox"] {
          width: 24px;
          height: 24px;
        }
      }
    `}constructor(){super(),this._config={},this._lang="en"}setConfig(t){this._config={...t},typeof t?.music_assistant=="string"&&(this._maUrlDraft=t.music_assistant)}get _zh(){return Nt(this._lang||this.hass?.language)}_update(t){let e={...this._config,...t};Object.keys(e).forEach(i=>{e[i]===void 0&&delete e[i]}),this._config=e,ua(this,e)}_optionLabel(t){return this._zh?t.zh:t.en}_dockModes(){return D(this._config?.dock)}_dockEntities(){return lt(this._config?.dock_entities)}_mainEntity(){return this._entities()[0]||this._config?.entity||""}_toggleDock(t,e){let i=this._dockModes(),a=this._dockEntities(),n;e?(n=i.includes(t)?i:[...i,t],!a[t]&&this._mainEntity()&&(a[t]=this._mainEntity())):n=i.filter(r=>r!==t),this._update({dock:n.length?n:"none",dock_entities:a})}_setDockEntity(t,e){let i={...this._dockEntities(),[t]:e||""};i[t]||delete i[t],this._update({dock_entities:i})}_entities(){return Array.isArray(this._config.entities)&&this._config.entities.length?this._config.entities:[]}_setEntity(t,e){let i=this._entities();if(!i.length){this._update({entity:e||void 0});return}let a=[...i];a[t]=e,this._update({entities:a})}_addEntity(){let t=this._entities();if(t.length){this._update({entities:[...t,""]});return}let e=this._config.entity?[this._config.entity,""]:["",""];this._update({entities:e,entity:void 0})}_removeEntity(t){let e=this._entities().filter((i,a)=>a!==t);if(e.length<=1){this._update({entity:e[0]||void 0,entities:void 0});return}this._update({entities:e})}updated(){this._lang=this.hass?.language||this._lang}render(){let t=this._config||{},e=this._entities(),i=this._dockModes(),a=this._dockEntities(),n=(r,o,l)=>p`
      <ha-entity-picker
        .hass=${this.hass}
        .value=${r||""}
        .includeDomains=${["media_player"]}
        .allowCustomEntity=${!1}
        .label=${l}
        @value-changed=${h=>{h.stopPropagation(),this._setEntity(o,h.detail?.value??"")}}
      ></ha-entity-picker>
    `;return p`
      <div class="wrap">
        <div class="section">
          <div class="section-title">${this._zh?"\u64AD\u653E\u5668":"Player"}</div>
          ${e.length?e.map((r,o)=>p`
                  <div class="entity-row">
                    ${n(r,o,o===0?this._zh?"\u64AD\u653E\u5668":"Player":this._zh?"\u8BBE\u5907":"Player")}
                    <button
                      class="mini-btn"
                      @click=${()=>this._removeEntity(o)}
                      title=${this._zh?"\u79FB\u9664":"Remove"}
                    >
                      ${this._zh?"\u79FB\u9664":"Remove"}
                    </button>
                  </div>
                `):p`<div class="entity-row">
                ${n(t.entity||"",0,this._zh?"\u64AD\u653E\u5668":"Player")}
              </div>`}
          <button class="mini-btn add" @click=${()=>this._addEntity()}>
            ${this._zh?"\uFF0B \u6DFB\u52A0\u64AD\u653E\u5668":"\uFF0B Add player"}
          </button>
          ${e.length?p`<div class="hint">
                ${this._zh?"\u591A\u8BBE\u5907\u6A21\u5F0F\uFF1A\u5361\u7247\u9876\u90E8\u4F1A\u51FA\u73B0\u8BBE\u5907\u5207\u6362\u6807\u7B7E\u3002":"Multi-player mode adds switching chips on top of the card."}
              </div>`:u}
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
                ${Object.keys(ne).map(r=>p`<option value=${r} ?selected=${t.layout===r}>
                      ${this._optionLabel(ne[r])}
                    </option>`)}
              </select>
            </label>
            <label class="field">
              <span class="label">${this._zh?"\u4E3B\u9898":"Theme"}</span>
              <select
                .value=${t.theme||"aurora"}
                @change=${r=>this._update({theme:r.target.value})}
              >
                ${Object.keys(it).map(r=>p`<option value=${r} ?selected=${t.theme===r}>
                      ${this._optionLabel(it[r].label)}
                    </option>`)}
              </select>
            </label>
            <label class="field">
              <span class="label">${this._zh?"\u80CC\u666F":"Background"}</span>
              <select
                .value=${t.cover||"ambient"}
                @change=${r=>this._update({cover:r.target.value})}
              >
                ${Object.keys(oe).map(r=>p`<option value=${r} ?selected=${t.cover===r}>
                      ${this._optionLabel(oe[r])}
                    </option>`)}
              </select>
            </label>
            <label class="field">
              <span class="label">${this._zh?"\u9891\u8C31\u52A8\u6548":"Visualizer"}</span>
              <select
                .value=${t.visualizer||"bars"}
                @change=${r=>this._update({visualizer:r.target.value})}
              >
                ${Object.keys(le).map(r=>p`<option value=${r} ?selected=${t.visualizer===r}>
                      ${this._optionLabel(le[r])}
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
          ${this._switch(this._zh?"\u663E\u793A Music Assistant \u6B4C\u5355\u5165\u53E3":"Show Music Assistant playlists",t.music_assistant!==!1,r=>this._update({music_assistant:r?typeof t.music_assistant=="string"?t.music_assistant:this._maUrlDraft||!0:!1}))}
          <label class="field">
            <span class="label">
              ${this._zh?"MA \u9762\u677F\u5730\u5740\uFF08\u7559\u7A7A\u81EA\u52A8\uFF0C\u4EC5\u4F9B\u62BD\u5C49\u5185\u8DF3\u8F6C\uFF09":"MA panel URL (optional)"}
            </span>
            <input
              type="text"
              .value=${typeof t.music_assistant=="string"?t.music_assistant:""}
              placeholder="/music-assistant"
              @input=${r=>{this._maUrlDraft=r.target.value.trim()}}
              @change=${r=>this._update({music_assistant:r.target.value.trim()||!0})}
            />
            <span class="hint">
              ${this._zh?"\u7559\u7A7A\u81EA\u52A8\u8BFB\u53D6 HA \u9762\u677F\u8DEF\u5F84\uFF1B\u6B4C\u5355\u5165\u53E3\u672C\u8EAB\u4E0D\u4F9D\u8D56\u6B64\u9879":"Leave empty to auto-detect the HA panel path"}
            </span>
          </label>
          <div class="section-title">${this._zh?"\u5168\u5C40\u8FF7\u4F60\u64AD\u653E\u5668":"Global mini players"}</div>
          <div class="hint">
            ${this._zh?"\u4E09\u4E2A\u4F4D\u7F6E\u53EF\u4EE5\u540C\u65F6\u542F\u7528\uFF0C\u4E5F\u53EF\u4EE5\u5206\u522B\u9009\u62E9\u5404\u81EA\u7684\u64AD\u653E\u5668\u5B9E\u4F53\uFF1B\u5355\u51FB\u64AD\u653E/\u6682\u505C\uFF0C\u53CC\u51FB\u6298\u53E0\u6216\u5C55\u5F00\u3002\u9876\u90E8\u53EA\u53EF\u5DE6\u53F3\u79FB\u52A8\u3001\u4FA7\u8FB9\u680F\u53EA\u53EF\u4E0A\u4E0B\u79FB\u52A8\uFF1B\u53F3\u4E0B\u89D2\u957F\u6309\u540E\u53EF\u4EFB\u610F\u62D6\u52A8\uFF0C\u4F46\u4E0D\u80FD\u8FDB\u5165\u4FA7\u8FB9\u680F\u548C\u9876\u680F\u3002":"Each position can use its own entity; click to play/pause, double-click to fold, long-press to drag."}
          </div>
          ${[["top",this._zh?"\u9876\u90E8\u64AD\u653E\u5668":"Top bar"],["sidebar",this._zh?"\u4FA7\u8FB9\u680F\u64AD\u653E\u5668":"Sidebar"],["fab",this._zh?"\u53F3\u4E0B\u89D2\u64AD\u653E\u5668":"Bottom-right"]].map(([r,o])=>{let l=i.includes(r),h=a[r]||this._mainEntity();return p`
              <div class="dock-row">
                <label class="check">
                  <input
                    type="checkbox"
                    .checked=${l}
                    @change=${d=>this._toggleDock(r,d.target.checked)}
                  />
                  <span>${o}</span>
                </label>
                <ha-entity-picker
                  .hass=${this.hass}
                  .value=${h||""}
                  .includeDomains=${["media_player"]}
                  .allowCustomEntity=${!1}
                  .label=${this._zh?"\u64AD\u653E\u5668\u5B9E\u4F53":"Player entity"}
                  @value-changed=${d=>{d.stopPropagation(),this._setDockEntity(r,d.detail?.value??"")}}
                ></ha-entity-picker>
              </div>
            `})}
        </div>
      </div>
    `}_switch(t,e,i){return p`<label class="switch-row">
      <span class="label">${t}</span>
      <input
        type="checkbox"
        .checked=${e}
        @change=${a=>i(a.target.checked)}
      />
    </label>`}};customElements.get("ha-music-editor")||customElements.define("ha-music-editor",ke);var Me=new URL(import.meta.url),$e=Me.searchParams.get("dock"),zi=Ei(),Ht=$e?D($e==="1"?"top":$e):zi?.modes||[],Ae={...zi?.entities||{}},Ci=Me.searchParams.get("dock_entity");Ci&&Ht[0]&&(Ae[Ht[0]]=Ci);for(let s of Ht){let t=Me.searchParams.get(`dock_entity_${s}`);t&&(Ae[s]=t)}var Ri=Ht.map(s=>({mode:s,entity:Ae[s]})).filter(s=>s.entity);Ri.length&&St(Ri.map(s=>({...s,hass:Bt()})));
