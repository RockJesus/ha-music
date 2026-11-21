var Yt=globalThis,Xt=Yt.ShadowRoot&&(Yt.ShadyCSS===void 0||Yt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ye=Symbol(),pi=new WeakMap,Ct=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==ye)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(Xt&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=pi.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&pi.set(e,t))}return t}toString(){return this.cssText}},mi=n=>new Ct(typeof n=="string"?n:n+"",void 0,ye),Et=(n,...t)=>{let e=n.length===1?n[0]:t.reduce((i,s,a)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[a+1],n[0]);return new Ct(e,n,ye)},fi=(n,t)=>{if(Xt)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),s=Yt.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,n.appendChild(i)}},xe=Xt?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return mi(e)})(n):n;var{is:vs,defineProperty:ws,getOwnPropertyDescriptor:ks,getOwnPropertyNames:$s,getOwnPropertySymbols:Ss,getPrototypeOf:Ms}=Object,Z=globalThis,gi=Z.trustedTypes,As=gi?gi.emptyScript:"",Ps=Z.reactiveElementPolyfillSupport,qt=(n,t)=>n,ve={toAttribute(n,t){switch(t){case Boolean:n=n?As:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},bi=(n,t)=>!vs(n,t),_i={attribute:!0,type:String,converter:ve,reflect:!1,useDefault:!1,hasChanged:bi};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),Z.litPropertyMetadata??(Z.litPropertyMetadata=new WeakMap);var Q=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=_i){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&ws(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){let{get:s,set:a}=ks(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get:s,set(r){let o=s?.call(this);a?.call(this,r),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??_i}static _$Ei(){if(this.hasOwnProperty(qt("elementProperties")))return;let t=Ms(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(qt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(qt("properties"))){let e=this.properties,i=[...$s(e),...Ss(e)];for(let s of i)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let s of i)e.unshift(xe(s))}else t!==void 0&&e.push(xe(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return fi(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){let a=(i.converter?.toAttribute!==void 0?i.converter:ve).toAttribute(e,i.type);this._$Em=t,a==null?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(t,e){let i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let a=i.getPropertyOptions(s),r=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:ve;this._$Em=s;let o=r.fromAttribute(e,a.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,a){if(t!==void 0){let r=this.constructor;if(s===!1&&(a=this[t]),i??(i=r.getPropertyOptions(t)),!((i.hasChanged??bi)(a,e)||i.useDefault&&i.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:a},r){i&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,r??e??this[t]),a!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[s,a]of this._$Ep)this[s]=a;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,a]of i){let{wrapped:r}=a,o=this[s];r!==!0||this._$AL.has(s)||o===void 0||this.C(s,void 0,a,o)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};Q.elementStyles=[],Q.shadowRootOptions={mode:"open"},Q[qt("elementProperties")]=new Map,Q[qt("finalized")]=new Map,Ps?.({ReactiveElement:Q}),(Z.reactiveElementVersions??(Z.reactiveElementVersions=[])).push("2.1.2");var Rt=globalThis,yi=n=>n,Jt=Rt.trustedTypes,xi=Jt?Jt.createPolicy("lit-html",{createHTML:n=>n}):void 0,Mi="$lit$",tt=`lit$${Math.random().toFixed(9).slice(2)}$`,Ai="?"+tt,Cs=`<${Ai}>`,ut=document,zt=()=>ut.createComment(""),Lt=n=>n===null||typeof n!="object"&&typeof n!="function",Pe=Array.isArray,Es=n=>Pe(n)||typeof n?.[Symbol.iterator]=="function",we=`[ 	
\f\r]`,Tt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,vi=/-->/g,wi=/>/g,ct=RegExp(`>|${we}(?:([^\\s"'>=/]+)(${we}*=${we}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ki=/'/g,$i=/"/g,Pi=/^(?:script|style|textarea|title)$/i,Ce=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),g=Ce(1),M=Ce(2),ga=Ce(3),Y=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),Si=new WeakMap,dt=ut.createTreeWalker(ut,129);function Ci(n,t){if(!Pe(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return xi!==void 0?xi.createHTML(t):t}var qs=(n,t)=>{let e=n.length-1,i=[],s,a=t===2?"<svg>":t===3?"<math>":"",r=Tt;for(let o=0;o<e;o++){let l=n[o],h,c,d=-1,p=0;for(;p<l.length&&(r.lastIndex=p,c=r.exec(l),c!==null);)p=r.lastIndex,r===Tt?c[1]==="!--"?r=vi:c[1]!==void 0?r=wi:c[2]!==void 0?(Pi.test(c[2])&&(s=RegExp("</"+c[2],"g")),r=ct):c[3]!==void 0&&(r=ct):r===ct?c[0]===">"?(r=s??Tt,d=-1):c[1]===void 0?d=-2:(d=r.lastIndex-c[2].length,h=c[1],r=c[3]===void 0?ct:c[3]==='"'?$i:ki):r===$i||r===ki?r=ct:r===vi||r===wi?r=Tt:(r=ct,s=void 0);let f=r===ct&&n[o+1].startsWith("/>")?" ":"";a+=r===Tt?l+Cs:d>=0?(i.push(h),l.slice(0,d)+Mi+l.slice(d)+tt+f):l+tt+(d===-2?o:f)}return[Ci(n,a+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},Ot=class n{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let a=0,r=0,o=t.length-1,l=this.parts,[h,c]=qs(t,e);if(this.el=n.createElement(h,i),dt.currentNode=this.el.content,e===2||e===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(s=dt.nextNode())!==null&&l.length<o;){if(s.nodeType===1){if(s.hasAttributes())for(let d of s.getAttributeNames())if(d.endsWith(Mi)){let p=c[r++],f=s.getAttribute(d).split(tt),u=/([.?@])?(.*)/.exec(p);l.push({type:1,index:a,name:u[2],strings:f,ctor:u[1]==="."?$e:u[1]==="?"?Se:u[1]==="@"?Me:yt}),s.removeAttribute(d)}else d.startsWith(tt)&&(l.push({type:6,index:a}),s.removeAttribute(d));if(Pi.test(s.tagName)){let d=s.textContent.split(tt),p=d.length-1;if(p>0){s.textContent=Jt?Jt.emptyScript:"";for(let f=0;f<p;f++)s.append(d[f],zt()),dt.nextNode(),l.push({type:2,index:++a});s.append(d[p],zt())}}}else if(s.nodeType===8)if(s.data===Ai)l.push({type:2,index:a});else{let d=-1;for(;(d=s.data.indexOf(tt,d+1))!==-1;)l.push({type:7,index:a}),d+=tt.length-1}a++}}static createElement(t,e){let i=ut.createElement("template");return i.innerHTML=t,i}};function bt(n,t,e=n,i){if(t===Y)return t;let s=i!==void 0?e._$Co?.[i]:e._$Cl,a=Lt(t)?void 0:t._$litDirective$;return s?.constructor!==a&&(s?._$AO?.(!1),a===void 0?s=void 0:(s=new a(n),s._$AT(n,e,i)),i!==void 0?(e._$Co??(e._$Co=[]))[i]=s:e._$Cl=s),s!==void 0&&(t=bt(n,s._$AS(n,t.values),s,i)),t}var ke=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??ut).importNode(e,!0);dt.currentNode=s;let a=dt.nextNode(),r=0,o=0,l=i[0];for(;l!==void 0;){if(r===l.index){let h;l.type===2?h=new Ut(a,a.nextSibling,this,t):l.type===1?h=new l.ctor(a,l.name,l.strings,this,t):l.type===6&&(h=new Ae(a,this,t)),this._$AV.push(h),l=i[++o]}r!==l?.index&&(a=dt.nextNode(),r++)}return dt.currentNode=ut,s}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},Ut=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=bt(this,t,e),Lt(t)?t===b||t==null||t===""?(this._$AH!==b&&this._$AR(),this._$AH=b):t!==this._$AH&&t!==Y&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Es(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==b&&Lt(this._$AH)?this._$AA.nextSibling.data=t:this.T(ut.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=Ot.createElement(Ci(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{let a=new ke(s,this),r=a.u(this.options);a.p(e),this.T(r),this._$AH=a}}_$AC(t){let e=Si.get(t.strings);return e===void 0&&Si.set(t.strings,e=new Ot(t)),e}k(t){Pe(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,s=0;for(let a of t)s===e.length?e.push(i=new n(this.O(zt()),this.O(zt()),this,this.options)):i=e[s],i._$AI(a),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=yi(t).nextSibling;yi(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},yt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,a){this.type=1,this._$AH=b,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=a,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=b}_$AI(t,e=this,i,s){let a=this.strings,r=!1;if(a===void 0)t=bt(this,t,e,0),r=!Lt(t)||t!==this._$AH&&t!==Y,r&&(this._$AH=t);else{let o=t,l,h;for(t=a[0],l=0;l<a.length-1;l++)h=bt(this,o[i+l],e,l),h===Y&&(h=this._$AH[l]),r||(r=!Lt(h)||h!==this._$AH[l]),h===b?t=b:t!==b&&(t+=(h??"")+a[l+1]),this._$AH[l]=h}r&&!s&&this.j(t)}j(t){t===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},$e=class extends yt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===b?void 0:t}},Se=class extends yt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==b)}},Me=class extends yt{constructor(t,e,i,s,a){super(t,e,i,s,a),this.type=5}_$AI(t,e=this){if((t=bt(this,t,e,0)??b)===Y)return;let i=this._$AH,s=t===b&&i!==b||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==b&&(i===b||s);s&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Ae=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){bt(this,t)}};var Ts=Rt.litHtmlPolyfillSupport;Ts?.(Ot,Ut),(Rt.litHtmlVersions??(Rt.litHtmlVersions=[])).push("3.3.3");var Ei=(n,t,e)=>{let i=e?.renderBefore??t,s=i._$litPart$;if(s===void 0){let a=e?.renderBefore??null;i._$litPart$=s=new Ut(t.insertBefore(zt(),a),a,void 0,e??{})}return s._$AI(n),s};var Nt=globalThis,H=class extends Q{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ei(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Y}};H._$litElement$=!0,H.finalized=!0,Nt.litElementHydrateSupport?.({LitElement:H});var Rs=Nt.litElementPolyfillSupport;Rs?.({LitElement:H});(Nt.litElementVersions??(Nt.litElementVersions=[])).push("4.2.2");var qi={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ti=n=>(...t)=>({_$litDirective$:n,values:t}),Zt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var Ri="important",zs=" !"+Ri,X=Ti(class extends Zt{constructor(n){if(super(n),n.type!==qi.ATTRIBUTE||n.name!=="style"||n.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(n){return Object.keys(n).reduce((t,e)=>{let i=n[e];return i==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(n,[t]){let{style:e}=n.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let i of this.ft)t[i]==null&&(this.ft.delete(i),i.includes("-")?e.removeProperty(i):e[i]=null);for(let i in t){let s=t[i];if(s!=null){this.ft.add(i);let a=typeof s=="string"&&s.endsWith(zs);i.includes("-")||a?e.setProperty(i,a?s.slice(0,-11):s,a?Ri:""):e[i]=s}}return Y}});var zi=Et`
  :host {
    display: block;
    height: 100%;
    min-height: 0;
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
    height: 100%;
    min-height: 0;
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
    flex: 0 0 auto;
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
    width: 32px;
    height: 32px;
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
    grid-template-columns: var(--hm-cover-size, 168px) minmax(0, 1fr);
    align-items: center;
    gap: clamp(12px, 3.4cqi, 22px);
    min-height: 0;
    flex: 0 0 auto;
  }

  .hm-cover {
    position: relative;
    z-index: 2;
    display: block;
    width: var(--hm-cover-size, 168px);
    height: var(--hm-cover-size, 168px);
    max-width: 100%;
    aspect-ratio: 1 / 1;
    padding: 0;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 50%;
    overflow: hidden;
    background: rgba(9, 11, 18, 0.92);
    box-shadow: 0 18px 38px -14px rgba(0, 0, 0, 0.9);
    cursor: pointer;
    touch-action: pan-y;
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
    will-change: transform;
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
    pointer-events: none;
    user-select: none;
    -webkit-user-drag: none;
  }

  .hm-cover .hm-cover-ph {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    overflow: hidden;
    color: rgba(255, 255, 255, 0.78);
    background:
      radial-gradient(circle at 50% 42%, rgba(var(--hm-a1-rgb), 0.5) 0 8%, rgba(var(--hm-a2-rgb), 0.18) 24%, transparent 52%),
      conic-gradient(from 215deg at 50% 50%, rgba(var(--hm-a2-rgb), 0.34), rgba(7, 11, 21, 0.72) 31%, rgba(var(--hm-a1-rgb), 0.28) 62%, rgba(7, 11, 21, 0.8));
  }

  .hm-cover .hm-cover-ph::before,
  .hm-cover .hm-cover-ph::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
  }

  .hm-cover .hm-cover-ph::before {
    inset: 13%;
    border: 1px solid rgba(255, 255, 255, 0.17);
    box-shadow:
      0 0 0 10px rgba(255, 255, 255, 0.025),
      inset 0 0 26px rgba(var(--hm-a1-rgb), 0.22);
  }

  .hm-cover .hm-cover-ph::after {
    inset: 32%;
    border: 1px solid rgba(var(--hm-a2-rgb), 0.38);
    background: rgba(6, 10, 19, 0.18);
  }

  .hm-cover .hm-cover-ph svg {
    position: relative;
    z-index: 1;
    width: 34%;
    height: 34%;
    opacity: 0.92;
    filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.42));
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


  /* 主封面环形音频律动：与右下角悬浮唱片同源，围绕封面外圈展开 */

  .hm-cover-wrap[data-eq="true"] .hm-cover-eq-glow {
    opacity: 0.5;
  }

  .hm-cover-eq {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 1;
    width: calc(var(--hm-cover-size, 168px) + var(--hm-ring-pad, 48px));
    height: calc(var(--hm-cover-size, 168px) + var(--hm-ring-pad, 48px));
    translate: -50% -50%;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.45s ease;
  }

  .hm-cover-wrap[data-eq="true"] .hm-cover-eq {
    opacity: 1;
  }


  .hm-cover[data-gesture="next"] {
    animation: hmCoverNext 0.42s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .hm-cover[data-gesture="prev"] {
    animation: hmCoverPrev 0.42s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .hm-cover[data-gesture="tap"] {
    animation: hmCoverTap 0.3s ease-out;
  }

  @keyframes hmCoverNext {
    0% {
      transform: translateX(0) scale(1);
      opacity: 1;
    }
    34% {
      transform: translateX(-15%) rotate(-2.5deg) scale(0.94);
      opacity: 0.82;
    }
    70% {
      transform: translateX(3%) rotate(0.6deg) scale(1.01);
      opacity: 1;
    }
    100% {
      transform: translateX(0) scale(1);
      opacity: 1;
    }
  }

  @keyframes hmCoverPrev {
    0% {
      transform: translateX(0) scale(1);
      opacity: 1;
    }
    34% {
      transform: translateX(15%) rotate(2.5deg) scale(0.94);
      opacity: 0.82;
    }
    70% {
      transform: translateX(-3%) rotate(-0.6deg) scale(1.01);
      opacity: 1;
    }
    100% {
      transform: translateX(0) scale(1);
      opacity: 1;
    }
  }

  @keyframes hmCoverTap {
    0% {
      transform: scale(1);
    }
    38% {
      transform: scale(0.93);
    }
    72% {
      transform: scale(1.025);
    }
    100% {
      transform: scale(1);
    }
  }

  .hm-info {
    display: flex;
    flex-direction: column;
    gap: 5px;
    min-width: 0;
  }

  .hm-info[data-side-lyrics="true"] .hm-meta {
    min-width: 0;
  }

  .hm-meta {
    display: flex;
    flex-direction: column;
    gap: 5px;
    min-width: 0;
  }

  .hm-kicker {
    display: block;
    max-width: 100%;
    line-height: 1.35;
    overflow: hidden;
    text-overflow: ellipsis;
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

  .hm-spec {
    font-size: clamp(10px, 2.4cqi, 11.5px);
    line-height: 1.3;
    letter-spacing: 0.04em;
    color: rgba(226, 232, 255, 0.46);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .hm-spec-short {
    display: none;
  }

  @container (max-width: 520px) {
    .hm-spec-full {
      display: none;
    }

    .hm-spec-short {
      display: inline;
    }
  }

  .hm-card[data-layout="mini"] .hm-spec,
  .hm-card[data-micro="true"] .hm-spec,
  .hm-card[data-thumb="sm"] .hm-spec {
    display: none;
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
    flex: 0 0 auto;
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

  .hm-spectrum {
    display: block;
    width: 100%;
    height: 100%;
  }

  /* 缩略预览的静态柱条：纯 CSS，不占画布内存 */
  .hm-spectrum-flat {
    background-image:
      repeating-linear-gradient(
        90deg,
        rgba(var(--hm-a1-rgb), 0.62) 0 2px,
        transparent 2px 5px
      );
    background-size: 100% 100%;
    border-radius: 3px;
    opacity: 0.5;
    -webkit-mask-image: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.95) 0%,
      rgba(0, 0, 0, 0.55) 55%,
      rgba(0, 0, 0, 0.25) 100%
    );
    mask-image: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.95) 0%,
      rgba(0, 0, 0, 0.55) 55%,
      rgba(0, 0, 0, 0.25) 100%
    );
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
    flex: 0 0 auto;
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
    height: 30px;
    margin: 0;
    padding: 0;
    background: transparent;
    cursor: pointer;
    --pct: 0%;
  }

  .hm-range::-webkit-slider-runnable-track {
    height: 7px;
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
    width: 18px;
    height: 18px;
    margin-top: -5.5px;
    border: none;
    border-radius: 50%;
    background: transparent;
    box-shadow: none;
    transition: none;
  }

  .hm-range:hover::-webkit-slider-thumb {
    transform: scale(1.12);
  }

  .hm-range:active::-webkit-slider-thumb {
    transform: scale(1.24);
  }

  .hm-range::-moz-range-track {
    height: 7px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.13);
  }

  .hm-range::-moz-range-progress {
    height: 7px;
    border-radius: 999px;
    background: linear-gradient(
      90deg,
      rgba(var(--hm-a1-rgb), 1),
      rgba(var(--hm-a2-rgb), 1)
    );
  }

  .hm-range::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border: none;
    border-radius: 50%;
    background: transparent;
    box-shadow: none;
  }

  .hm-range[data-disabled="true"] {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .hm-wave {
    position: relative;
    display: flex;
    flex: 1 1 auto;
    align-items: center;
    gap: 1px;
    height: 42px;
    margin: 0;
    padding: 0 2px;
    cursor: pointer;
    overflow: hidden;
  }

  .hm-wave[data-disabled="true"] {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .hm-wave-bar {
    flex: 1 1 0;
    min-width: 1px;
    height: var(--h, 20%);
    border-radius: 1px;
    background: rgba(255, 255, 255, 0.2);
    transition: background 0.15s ease;
  }

  .hm-wave-bar[data-past="true"] {
    background: linear-gradient(
      180deg,
      rgba(var(--hm-a1-rgb), 0.95),
      rgba(var(--hm-a2-rgb), 0.95)
    );
  }

  .hm-modes {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 8px;
  }

  .hm-mode {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 4px 9px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.05);
    color: rgba(246, 248, 255, 0.6);
    font: inherit;
    font-size: 10.5px;
    letter-spacing: 0.02em;
    cursor: pointer;
    transition: background 0.18s ease, color 0.18s ease, border-color 0.18s ease;
  }

  .hm-mode[data-on="true"] {
    color: #fff;
    border-color: rgba(var(--hm-a1-rgb), 0.62);
    background: rgba(var(--hm-a1-rgb), 0.2);
  }

  .hm-mode:hover {
    color: #fff;
    border-color: rgba(var(--hm-a1-rgb), 0.75);
  }

  .hm-favorite[data-on="true"] {
    color: #ff5f87;
    border-color: rgba(255, 95, 135, 0.5);
    background: rgba(255, 95, 135, 0.12);
  }

  .hm-players {
    position: absolute;
    z-index: 8;
    left: 10px;
    right: 10px;
    bottom: 10px;
    max-height: min(62%, 430px);
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 18px;
    background: rgba(10, 12, 26, 0.92);
    box-shadow: 0 18px 48px rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(18px);
    overflow: hidden;
  }

  .hm-players-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 11px 12px 9px 16px;
    font-size: 12px;
    letter-spacing: 0.05em;
    color: rgba(246, 248, 255, 0.88);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .hm-players-body {
    overflow: auto;
    padding: 6px 8px 9px;
  }

  .hm-player-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 9px 8px;
    border-radius: 12px;
  }

  .hm-player-row[data-current="true"] {
    background: rgba(var(--hm-a1-rgb), 0.14);
  }

  .hm-player-main {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }

  .hm-player-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.25);
    flex: 0 0 auto;
  }

  .hm-player-dot[data-playing="true"] {
    background: rgb(var(--hm-a1-rgb));
    box-shadow: 0 0 8px rgba(var(--hm-a1-rgb), 0.75);
  }

  .hm-player-text {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .hm-player-name {
    font-size: 13px;
    color: #f6f8ff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .hm-player-sub {
    font-size: 10.5px;
    color: rgba(246, 248, 255, 0.5);
  }

  .hm-player-actions {
    display: flex;
    align-items: center;
    gap: 5px;
    flex: 0 0 auto;
  }

  .hm-player-btn {
    padding: 5px 9px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.14);
    background: rgba(255, 255, 255, 0.05);
    color: rgba(246, 248, 255, 0.78);
    font: inherit;
    font-size: 10.5px;
    cursor: pointer;
  }

  .hm-player-btn[data-disabled="true"] {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .hm-player-btn[data-on="true"] {
    border-color: rgba(var(--hm-a1-rgb), 0.55);
    background: rgba(var(--hm-a1-rgb), 0.18);
    color: #fff;
  }

  .hm-player-badge {
    font-size: 10px;
    padding: 3px 7px;
    border-radius: 999px;
    color: rgba(255, 255, 255, 0.75);
    border: 1px solid rgba(255, 255, 255, 0.18);
  }

  .hm-players-empty {
    padding: 24px 12px;
    text-align: center;
    font-size: 12px;
    color: rgba(246, 248, 255, 0.5);
  }

  /* ---------- 控制区 ---------- */
  .hm-controls {
    display: flex;
    flex: 0 0 auto;
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
    width: clamp(42px, 10.5cqi, 52px);
    height: clamp(42px, 10.5cqi, 52px);
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
    width: clamp(60px, 15cqi, 78px);
    height: clamp(60px, 15cqi, 78px);
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
    gap: 8px;
    flex: 0 1 clamp(250px, 30cqi, 380px);
    min-width: 0;
    max-width: 100%;
    box-sizing: border-box;
    padding: 4px 12px 4px 4px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.07);
    background: rgba(255, 255, 255, 0.045);
  }

  .hm-volume .hm-vol-step {
    width: 30px;
    height: 30px;
  }

  .hm-volume .hm-icon-btn {
    border: none;
    background: transparent;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    flex: 0 0 auto;
  }

  .hm-volume .hm-icon-btn:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  /* 音量/静音两枚图标常驻 DOM，只切换显示，避免状态回传时图标停在旧图。 */
  .hm-volume .hm-volume-mute .hm-vol-ico {
    grid-area: 1 / 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    line-height: 0;
  }

  .hm-volume .hm-volume-mute .hm-vol-ico-muted {
    display: none;
  }

  .hm-volume .hm-volume-mute[data-muted="true"] .hm-vol-ico-on {
    display: none;
  }

  .hm-volume .hm-volume-mute[data-muted="true"] .hm-vol-ico-muted {
    display: inline-flex;
  }

  .hm-volume .hm-range {
    height: 36px;
    flex: 1 1 auto;
    min-width: 40px;
  }

  .hm-volume .hm-range::-webkit-slider-runnable-track {
    height: 13px;
  }

  .hm-volume .hm-range::-moz-range-track,
  .hm-volume .hm-range::-moz-range-progress {
    height: 13px;
  }

  .hm-volume .hm-range::-webkit-slider-thumb {
    width: 26px;
    height: 26px;
    margin-top: -6.5px;
  }

  .hm-vol-pct {
    flex: 0 0 auto;
    min-width: 26px;
    text-align: right;
    font-size: 11px;
    font-variant-numeric: tabular-nums;
    color: rgba(246, 248, 255, 0.5);
  }

  .hm-volume[hidden] {
    display: none;
  }

  /* 手机 App / 窄卡片：音量独占一行，位于播放控件下方 */
  .hm-controls.is-stacked {
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    gap: 10px;
  }

  .hm-controls.is-stacked .hm-transport {
    justify-content: center;
    width: 100%;
  }

  .hm-controls.is-stacked .hm-volume {
    flex: 0 0 auto;
    width: 100%;
    max-width: 100%;
    margin-left: 0;
  }

  .hm-card:not([data-layout="mini"]) .hm-controls.is-stacked .hm-volume .hm-vol-step,
  .hm-card:not([data-layout="mini"]) .hm-controls.is-stacked .hm-volume .hm-vol-pct {
    display: inline-flex;
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

  .hm-drawer-note {
    padding: 7px 8px;
    margin-bottom: 4px;
    border: 1px solid rgba(var(--hm-a1-rgb), 0.18);
    border-radius: 9px;
    background: rgba(var(--hm-a1-rgb), 0.07);
    color: rgba(246, 248, 255, 0.56);
    font-size: 10px;
    line-height: 1.45;
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
    grid-template-columns: var(--hm-cover-size, 64px) minmax(0, 1fr) auto;
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
    flex: 0 1 150px;
  }

  .hm-card[data-layout="compact"] .hm-controls.is-stacked .hm-volume {
    flex: 0 0 auto;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    margin-left: 0;
  }

  .hm-card[data-layout="compact"] .hm-volume .hm-vol-pct,
  .hm-card[data-layout="compact"] .hm-volume .hm-vol-step {
    display: none;
  }

  .hm-card[data-layout="compact"] .hm-btn {
    width: 38px;
    height: 38px;
  }

  .hm-card[data-layout="compact"] .hm-play {
    width: 54px;
    height: 54px;
  }

  /* 紧凑且偏矮（<420px）：收紧留白、控制键与音量行，给内容腾出底部空间 */
  .hm-card[data-short="true"] .hm-body {
    padding: clamp(8px, 1.5cqi, 12px);
    gap: clamp(6px, 1.2cqi, 9px);
  }

  .hm-card[data-short="true"] .hm-btn {
    width: 34px;
    height: 34px;
  }

  .hm-card[data-short="true"] .hm-play {
    width: 48px;
    height: 48px;
  }

  .hm-card[data-short="true"] .hm-transport {
    gap: 6px;
  }

  .hm-card[data-short="true"] .hm-volume,
  .hm-card[data-short="true"] .hm-controls.is-stacked .hm-volume {
    min-height: 28px;
  }

  .hm-card[data-short="true"] .hm-controls.is-stacked {
    gap: 4px;
  }

  .hm-card[data-short="true"] .hm-vis {
    height: 12px;
  }

  .hm-card[data-layout="compact"] .hm-transport {
    gap: 7px;
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
    width: 34px;
    height: 34px;
  }

  .hm-card[data-layout="mini"] .hm-play {
    width: 44px;
    height: 44px;
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

    /* 280px 这类窄宽完整卡：状态与操作按钮分两行，避免状态文字被挤成单字 */
    .hm-card[data-layout="full"] .hm-top {
      flex-wrap: wrap;
      row-gap: 8px;
    }

    .hm-card[data-layout="full"] .hm-status {
      flex: 1 1 100%;
    }

    .hm-card[data-layout="full"] .hm-top-actions {
      width: 100%;
      justify-content: flex-end;
    }

    .hm-card[data-layout="full"] .hm-main {
      grid-template-columns: 1fr;
      justify-items: center;
      text-align: center;
      gap: 10px;
    }

    .hm-card[data-layout="full"] .hm-cover {
      width: var(--hm-cover-size);
      height: var(--hm-cover-size);
      border-radius: 50%;
    }

    .hm-card[data-layout="full"] .hm-meta {
      align-items: center;
      width: 100%;
    }

    /* 窄高预览里标签会被挤成竖排，直接隐藏；完整卡片仍保留 */
    .hm-card[data-layout="full"] .hm-tags {
      display: none;
    }

    /* 极窄卡也保留音柱，只是压成一条细柱 */
    .hm-card[data-layout="full"] .hm-vis {
      display: flex;
      height: 14px;
      opacity: 0.8;
    }

  }

  @container (max-width: 470px) {
    .hm-card[data-layout="full"] .hm-controls {
      flex-direction: column;
      gap: 10px;
      align-items: stretch;
    }

    .hm-card[data-layout="full"] .hm-transport {
      justify-content: center;
    }

    .hm-card[data-layout="full"] .hm-volume {
      flex: 0 0 auto;
      margin: 0 auto;
      width: min(100%, 320px);
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
    isolation: isolate;
    min-width: 0;
    height: var(--hm-cover-size, 168px);
    min-height: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
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
    border: 1px solid rgba(255, 255, 255, 0.07);
    background: rgba(255, 255, 255, 0.035);
    color: rgba(246, 248, 255, 0.46);
    font-family: inherit;
    font-size: 10.5px;
    cursor: pointer;
    opacity: 0.62;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    transition:
      color 0.18s ease,
      background 0.18s ease,
      border-color 0.18s ease,
      box-shadow 0.18s ease,
      opacity 0.18s ease,
      transform 0.18s ease;
  }

  .hm-entity-chip:hover {
    color: #fff;
    opacity: 0.94;
    background: rgba(255, 255, 255, 0.09);
  }

  /* 选中项：实心主题底 + 高亮描边 + 外发光，和未选中项拉开明显层级 */
  .hm-entity-chip[data-active="true"] {
    color: #fff;
    opacity: 1;
    font-weight: 700;
    border-color: rgba(var(--hm-a1-rgb), 0.98);
    background:
      linear-gradient(
        112deg,
        rgba(8, 12, 20, 0.96) 0%,
        rgba(var(--hm-a1-rgb), 0.38) 52%,
        rgba(var(--hm-a2-rgb), 0.3) 100%
      );
    box-shadow:
      0 0 0 2px rgba(var(--hm-a1-rgb), 0.16),
      0 0 24px -5px rgba(var(--hm-a1-rgb), 0.95),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }

  .hm-entity-chip[data-playing="true"] {
    position: relative;
    color: rgba(246, 248, 255, 0.72);
    opacity: 0.78;
    border-color: rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.05);
  }

  .hm-entity-chip[data-playing="true"]::after {
    content: "";
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    pointer-events: none;
    border: 1px solid rgba(255, 255, 255, 0.1);
    opacity: 0;
  }

  .hm-entity-chip[data-playing="true"][data-active="true"] {
    color: #fff;
    opacity: 1;
    border-color: rgba(var(--hm-a1-rgb), 1);
    background:
      linear-gradient(
        112deg,
        rgba(8, 12, 20, 0.96) 0%,
        rgba(var(--hm-a1-rgb), 0.42) 52%,
        rgba(var(--hm-a2-rgb), 0.32) 100%
      );
    box-shadow:
      0 0 0 2px rgba(var(--hm-a1-rgb), 0.2),
      0 0 26px -4px rgba(var(--hm-a1-rgb), 1),
      inset 0 1px 0 rgba(255, 255, 255, 0.24);
    transform: translateY(-1px);
  }

  .hm-entity-chip[data-playing="true"][data-active="true"]::after {
    border-color: rgba(var(--hm-a1-rgb), 0.55);
    animation: hm-entity-glow 2.4s ease-in-out infinite;
  }

  .hm-entity-eq {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: flex-end;
    justify-content: center;
    gap: 1px;
    width: 10px;
    height: 12px;
    margin-left: 1px;
    opacity: 0.92;
  }

  .hm-entity-eq i {
    width: 2px;
    height: 9px;
    border-radius: 1px;
    transform-origin: 50% 100%;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.95),
      rgba(var(--hm-a1-rgb), 0.9)
    );
    animation: hm-entity-eq 0.9s ease-in-out infinite;
  }

  .hm-entity-eq i:nth-child(1) {
    animation-delay: -0.55s;
    animation-duration: 1.05s;
  }

  .hm-entity-eq i:nth-child(2) {
    animation-delay: -0.2s;
    animation-duration: 0.78s;
  }

  .hm-entity-eq i:nth-child(3) {
    animation-delay: -0.7s;
    animation-duration: 0.96s;
  }

  .hm-entity-chip[data-active="true"] .hm-entity-dot {
    box-shadow:
      0 0 0 2px rgba(var(--hm-a1-rgb), 0.95),
      0 0 14px rgba(var(--hm-a1-rgb), 0.55);
  }

  .hm-entity-chip:not([data-active="true"]) .hm-entity-dot {
    opacity: 0.72;
    filter: saturate(0.8);
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

  @keyframes hm-entity-eq {
    0%,
    100% {
      transform: scaleY(0.3);
      opacity: 0.6;
    }
    50% {
      transform: scaleY(1);
      opacity: 1;
    }
  }

  @keyframes hm-entity-glow {
    0%,
    100% {
      opacity: 0;
    }
    50% {
      opacity: 0.72;
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
      width: 44px;
      height: 44px;
      border-radius: 14px;
    }

    .hm-btn {
      width: 52px;
      height: 52px;
      flex: 0 0 auto;
    }

    .hm-play {
      min-width: 68px;
      min-height: 68px;
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
      height: 44px;
    }

    .hm-volume .hm-range {
      height: 44px;
      min-width: 64px;
    }

    .hm-volume .hm-icon-btn {
      width: 46px;
      height: 46px;
    }

    .hm-volume .hm-vol-step {
      width: 38px;
      height: 38px;
    }

    .hm-volume {
      gap: 8px;
      flex: 0 1 clamp(250px, 30cqi, 380px);
    }

    .hm-volume .hm-range::-webkit-slider-runnable-track {
      height: 16px;
    }

    .hm-volume .hm-range::-moz-range-track,
    .hm-volume .hm-range::-moz-range-progress {
      height: 16px;
    }

    .hm-volume .hm-range::-webkit-slider-thumb {
      width: 32px;
      height: 32px;
      margin-top: -8px;
    }

    .hm-volume .hm-range::-moz-range-thumb {
      width: 32px;
      height: 32px;
    }

    .hm-card[data-layout="compact"] .hm-volume {
      flex: 0 1 150px;
    }

    .hm-range::-webkit-slider-thumb {
      width: 22px;
      height: 22px;
      margin-top: -8px;
    }

    .hm-range::-moz-range-thumb {
      width: 22px;
      height: 22px;
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
      width: 56px;
      height: 56px;
      min-width: 56px;
      min-height: 56px;
    }

    .hm-card[data-layout="mini"] .hm-btn {
      width: 38px;
      height: 38px;
    }

    .hm-card[data-layout="mini"] .hm-volume .hm-icon-btn {
      width: 42px;
      height: 42px;
    }

    .hm-card[data-layout="mini"] .hm-play {
      width: 48px;
      height: 48px;
      min-width: 48px;
      min-height: 48px;
    }
  }

  /* 窄卡片：控制区保持单行，避免音量换行把矮格子撑破；紧凑布局下音量收窄 */
  @container (max-width: 470px) {
    .hm-card[data-layout="full"] .hm-controls,
    .hm-card[data-layout="compact"] .hm-controls {
      flex-wrap: nowrap;
      row-gap: 0;
    }

    .hm-card[data-layout="compact"] .hm-volume {
      flex: 0 1 96px;
      max-width: 96px;
      margin-left: auto;
      box-sizing: border-box;
    }

    .hm-card[data-layout="compact"] .hm-vol-pct {
      display: none;
    }
  }

  .hm-card[data-tight="true"] .hm-vis {
    display: none;
  }

  .hm-card[data-tight="true"] .hm-body {
    padding: clamp(7px, 1.4cqi, 11px);
    padding-bottom: 6px;
    gap: clamp(5px, 1cqi, 7px);
  }

  /* 超矮卡（<230 高）再收紧一圈内边距与间距 */
  .hm-card[data-micro="true"] .hm-body {
    padding: 6px 6px 5px;
    gap: 4px;
  }

  .hm-card[data-micro="true"] .hm-controls {
    gap: 6px;
  }

  .hm-card[data-micro="true"] .hm-play {
    width: 40px;
    height: 40px;
  }

  .hm-card[data-micro="true"] .hm-btn {
    width: 30px;
    height: 30px;
  }

  /* 超矮卡（<230 高）优先保主体，隐藏顶部状态行，避免控制条被裁 */
  .hm-card[data-micro="true"] .hm-top {
    display: none;
  }

  .hm-card[data-micro="true"] .hm-vis {
    display: none;
  }

  .hm-card[data-micro="true"] .hm-volume {
    display: none;
  }

  .hm-card[data-tight="true"] .hm-play {
    width: 42px;
    height: 42px;
  }

  .hm-card[data-tight="true"] .hm-btn {
    width: 30px;
    height: 30px;
  }

  .hm-card[data-tight="true"] .hm-transport {
    gap: 5px;
  }

  .hm-card[data-tight="true"] .hm-controls.is-stacked .hm-volume {
    min-height: 28px;
  }

  .hm-card[data-tight="true"] .hm-cover-halo {
    display: none;
  }


  /* ---------- 歌词 ---------- */
  .hm-lyrics {
    flex: 1 1 auto;
    min-height: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 2px 2px 4px;
    overflow: hidden;
  }

  .hm-lyrics-inline {
    flex: 0 1 auto;
    max-height: clamp(110px, 26vh, 320px);
    padding: 4px 2px 2px;
  }

  .hm-lyrics-inline .hm-lyrics-head {
    display: none;
  }

  .hm-lyrics-inline .hm-lyrics-line {
    margin-bottom: 2px;
    padding: 5px 9px;
    border-radius: 10px;
    font-size: clamp(13px, 1.35cqi, 18px);
    line-height: 1.35;
  }

  .hm-lyrics-inline .hm-lyrics-scroll {
    padding: 2px 0 10px;
    mask-image: linear-gradient(
      to bottom,
      transparent 0,
      #000 14px,
      #000 calc(100% - 16px),
      transparent 100%
    );
    -webkit-mask-image: linear-gradient(
      to bottom,
      transparent 0,
      #000 14px,
      #000 calc(100% - 16px),
      transparent 100%
    );
  }

  .hm-lyrics-inline .hm-lyrics-empty {
    min-height: 110px;
  }

  @container (min-width: 1120px) {
    .hm-card[data-layout="full"][data-panel="false"][data-thumb="false"]
      .hm-main[data-side-lyrics="false"] {
      width: fit-content;
      max-width: 100%;
      margin-inline: auto;
      grid-template-columns: var(--hm-cover-size) minmax(0, max-content);
    }

    .hm-card[data-layout="full"] .hm-info[data-side-lyrics="true"] {
      display: grid;
      grid-template-columns: minmax(0, 0.95fr) minmax(320px, 1.05fr);
      align-items: center;
      gap: clamp(18px, 2.4vw, 44px);
    }

    .hm-card[data-layout="full"] .hm-info[data-side-lyrics="true"] .hm-meta {
      min-width: 0;
    }

    .hm-lyrics-inline {
      max-height: min(50vh, 420px);
    }
  }

  .hm-lyrics-head {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 8px;
    flex: 0 0 auto;
  }

  .hm-lyrics-title {
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    font-weight: 650;
    color: rgba(246, 248, 255, 0.56);
  }

  .hm-lyrics-source {
    font-size: 9px;
    letter-spacing: 0.06em;
    color: rgba(246, 248, 255, 0.38);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 999px;
    padding: 2px 7px;
  }

  .hm-lyrics-close {
    display: grid;
    place-items: center;
    width: 26px;
    height: 26px;
    margin-left: 0;
    padding: 0;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.05);
    color: rgba(246, 248, 255, 0.7);
    cursor: pointer;
  }

  .hm-lyrics-close:hover {
    background: rgba(255, 255, 255, 0.13);
    color: #fff;
  }

  .hm-lyrics-offset {
    display: flex;
    align-items: center;
    gap: 3px;
    flex: 0 0 auto;
    margin-left: auto;
    padding: 2px 4px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.04);
  }

  .hm-lyrics-offset button {
    display: grid;
    place-items: center;
    width: 22px;
    height: 22px;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: transparent;
    color: rgba(246, 248, 255, 0.7);
    font-size: 14px;
    line-height: 1;
    cursor: pointer;
  }

  .hm-lyrics-offset button:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
  }

  .hm-lyrics-offset span {
    min-width: 35px;
    text-align: center;
    font-size: 9px;
    letter-spacing: 0.02em;
    color: rgba(246, 248, 255, 0.5);
    font-variant-numeric: tabular-nums;
  }

  .hm-lyrics-scroll {
    flex: 1 1 auto;
    min-height: 0;
    overflow-y: auto;
    overscroll-behavior: contain;
    scrollbar-width: none;
    padding: 4px 2px 18px;
    mask-image: linear-gradient(
      to bottom,
      transparent 0,
      #000 20px,
      #000 calc(100% - 26px),
      transparent 100%
    );
    -webkit-mask-image: linear-gradient(
      to bottom,
      transparent 0,
      #000 20px,
      #000 calc(100% - 26px),
      transparent 100%
    );
  }

  .hm-lyrics-scroll::-webkit-scrollbar {
    display: none;
  }

  .hm-lyrics-line {
    position: relative;
    isolation: isolate;
    display: block;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    margin: 0 0 3px;
    padding: 7px 12px;
    border: 0;
    border-radius: 12px;
    background: transparent;
    color: rgba(246, 248, 255, 0.48);
    font: inherit;
    font-size: clamp(14px, 2.5cqi, 21px);
    line-height: 1.38;
    text-align: center;
    cursor: pointer;
    transition:
      color 0.25s ease,
      background 0.25s ease,
      transform 0.25s ease;
  }

  .hm-lyrics-line:hover {
    color: rgba(246, 248, 255, 0.82);
    background: rgba(255, 255, 255, 0.055);
  }

  .hm-lyrics-line[data-active="true"] {
    color: #fff;
    font-weight: 650;
    background: radial-gradient(
      120% 140% at 50% 50%,
      rgba(var(--hm-a1-rgb), 0.2),
      rgba(var(--hm-a2-rgb), 0.07) 62%,
      transparent
    );
    box-shadow: 0 0 0 1px rgba(var(--hm-a1-rgb), 0.22);
  }

  /* 进度条改成居中向两侧展开，跟居中的文字对齐 */
  .hm-lyrics-line[data-active="true"]::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    z-index: 0;
    width: calc(var(--hm-line-progress, 0%) * 0.5);
    border-radius: inherit;
    background: linear-gradient(
      90deg,
      rgba(var(--hm-a2-rgb), 0.16),
      rgba(var(--hm-a1-rgb), 0.28)
    );
    transform: translateX(-50%);
    pointer-events: none;
    transition: width 0.36s linear;
  }

  .hm-lyrics-text {
    position: relative;
    z-index: 1;
    display: block;
  }

  .hm-lyrics-line[data-static="true"] {
    cursor: default;
    color: rgba(246, 248, 255, 0.66);
  }

  .hm-lyrics-line[data-static="true"]:hover {
    background: transparent;
  }

  .hm-lyrics-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 84px;
    padding: 18px;
    border-radius: 14px;
    border: 1px dashed rgba(255, 255, 255, 0.1);
    color: rgba(246, 248, 255, 0.5);
    font-size: 12px;
    letter-spacing: 0.04em;
  }

  .hm-lyrics-loading {
    gap: 8px;
  }

  .hm-lyrics-error {
    flex-direction: column;
    gap: 10px;
  }

  .hm-lyrics-retry {
    height: 28px;
    padding: 0 12px;
    border-radius: 999px;
    border: 1px solid rgba(var(--hm-a1-rgb), 0.45);
    background: rgba(var(--hm-a1-rgb), 0.14);
    color: var(--hm-a1);
    font-size: 12px;
    cursor: pointer;
  }

  .hm-lyrics-pulse {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--hm-a1);
    box-shadow: 0 0 0 0 rgba(var(--hm-a1-rgb), 0.45);
    animation: hmLyricPulse 1.2s ease-out infinite;
  }

  @keyframes hmLyricPulse {
    0% {
      box-shadow: 0 0 0 0 rgba(var(--hm-a1-rgb), 0.45);
    }
    70% {
      box-shadow: 0 0 0 7px rgba(var(--hm-a1-rgb), 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(var(--hm-a1-rgb), 0);
    }
  }

  .hm-card[data-layout="compact"] .hm-lyrics-line {
    font-size: 14px;
    padding: 5px 9px;
  }

  .hm-card[data-layout="compact"] .hm-lyrics-source {
    display: none;
  }


  .hm-now-lyric {
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
    margin-top: 6px;
    color: rgba(246, 248, 255, 0.5);
    font-size: 12px;
    line-height: 1.35;
    letter-spacing: 0.01em;
  }

  .hm-now-lyric-mark {
    display: inline-grid;
    place-items: center;
    flex: 0 0 auto;
    color: var(--hm-a1);
    opacity: 0.8;
  }

  .hm-now-lyric span:last-child {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .hm-icon-btn[data-active="true"] {
    color: var(--hm-a1);
    border-color: rgba(var(--hm-a1-rgb), 0.42);
    background: rgba(var(--hm-a1-rgb), 0.12);
  }

  /* ---------- 面板视图：自动铺满可用区域 ---------- */
  :host([data-panel="true"]) {
    --hm-panel-height: 100%;
    --hm-panel-cover: min(600px, calc(100dvh - 440px));
    height: var(--hm-panel-height, 100%);
    min-height: 0;
    max-height: var(--hm-panel-height, 100%);
  }

  .hm-card[data-panel="true"] {
    height: 100%;
    min-height: 0;
    max-height: 100%;
    border-radius: var(--hm-radius);
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
    height: auto;
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

  /* 宽屏整体按比例收一档：标题、歌手、主区间距随封面一起缩小，避免头重脚轻。 */
  @container (min-width: 821px) {
    /* 左侧预留“封面 + 外圈音柱 + 安全边”，让封面在自己的左侧区域水平/垂直居中，
       不再贴住卡片边缘或标题。 */
    .hm-card[data-panel="true"] .hm-main {
      grid-template-columns:
        minmax(0, calc(var(--hm-panel-cover, 34%) + 136px))
        minmax(0, 1fr);
      /* 锁死单行高度，歌词再长也不能把封面容器撑出主区域。 */
      grid-template-rows: minmax(0, 1fr);
      overflow: hidden;
      gap: clamp(18px, 2.8vw, 40px);
    }

    .hm-card[data-panel="true"] .hm-title {
      font-size: clamp(26px, 3cqi, 46px);
    }

    .hm-card[data-panel="true"] .hm-artist {
      font-size: clamp(13px, 1.3cqi, 18px);
    }
  }

  /* 面板视图要真「占满」：没有歌词分栏时整组水平居中，别把封面和标题堆在左上角。 */
  .hm-card[data-panel="true"]:not(.hm-short-landscape):not(.hm-panel-stack) .hm-main[data-side-lyrics="false"] {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: clamp(24px, 3.4cqi, 72px);
    overflow: hidden;
  }

  .hm-card[data-panel="true"]:not(.hm-short-landscape):not(.hm-panel-stack) .hm-main[data-side-lyrics="false"] .hm-cover-wrap {
    flex: 0 0 auto;
    width: calc(var(--hm-panel-cover, 420px) + 96px);
    height: 100%;
  }

  .hm-card[data-panel="true"]:not(.hm-short-landscape):not(.hm-panel-stack) .hm-main[data-side-lyrics="false"] .hm-cover {
    width: var(--hm-panel-cover, 420px);
    height: var(--hm-panel-cover, 420px);
    max-height: 100%;
  }

  .hm-card[data-panel="true"]:not(.hm-short-landscape):not(.hm-panel-stack) .hm-main[data-side-lyrics="false"] .hm-info {
    flex: 0 1 auto;
    width: min(48%, 760px);
    max-width: min(48%, 760px);
    min-width: 0;
  }

  /* 平板竖屏（宽度 >820 但明显更高）：面板里也竖排，封面按整卡高度放大并整体居中。 */
  .hm-card.hm-panel-stack[data-panel="true"] .hm-main {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    justify-content: center;
    align-items: center;
    gap: clamp(16px, 3cqi, 28px);
    overflow: hidden;
  }

  .hm-card.hm-panel-stack[data-panel="true"] .hm-cover-wrap {
    width: 100%;
    height: auto;
    flex: 0 0 auto;
  }

  .hm-card.hm-panel-stack[data-panel="true"] .hm-cover {
    width: min(92%, var(--hm-panel-cover, 420px));
    height: auto;
    max-height: none;
    margin: 0 auto;
  }

  .hm-card.hm-panel-stack[data-panel="true"] .hm-info {
    width: min(92%, 760px);
    min-width: 0;
  }

  .hm-card.hm-panel-stack[data-panel="true"] .hm-meta {
    align-items: center;
    text-align: center;
  }

  .hm-card.hm-panel-stack[data-panel="true"] .hm-tags {
    justify-content: center;
  }

  @container (max-width: 620px) {
    .hm-card[data-panel="true"] .hm-body {
      padding: 12px 14px;
      gap: 8px;
    }

    /* 手机上状态和操作按钮分两行，避免状态文字被挤成“正…” */
    .hm-card[data-panel="true"] .hm-status-player,
    .hm-card[data-panel="true"] .hm-status .hm-kicker-sep {
      display: none;
    }

    .hm-card[data-panel="true"] .hm-top {
      flex-wrap: wrap;
      row-gap: 8px;
    }

    .hm-card[data-panel="true"] .hm-status {
      flex: 1 1 100%;
    }

    .hm-card[data-panel="true"] .hm-top-actions {
      width: 100%;
      justify-content: flex-end;
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
      flex: 0 1 128px;
      width: auto;
      max-width: 128px;
      margin-left: auto;
    }

    .hm-card[data-panel="true"] .hm-btn {
      width: 38px;
      height: 38px;
    }

    .hm-card[data-panel="true"] .hm-play {
      width: 52px;
      height: 52px;
      min-width: 52px;
      min-height: 52px;
    }
  }

  /* 宽屏：音量紧跟在播放控件之后，长度随卡片宽度自适应，不再独占一整行。 */
  @container (min-width: 680px) {
    /* 宽屏：播放控件与音量作为一组，整排在卡片里水平居中。 */
    .hm-card[data-panel="true"] .hm-controls {
      flex-wrap: nowrap;
      justify-content: center;
      align-items: center;
      gap: clamp(10px, 2.2cqi, 24px);
    }

    .hm-card[data-panel="true"] .hm-controls .hm-transport,
    .hm-card[data-panel="true"] .hm-controls .hm-volume {
      margin-left: 0;
      margin-right: 0;
    }

    .hm-card[data-panel="true"] .hm-volume {
      flex: 0 1 clamp(280px, 40cqi, 400px);
      width: clamp(280px, 40cqi, 400px);
      max-width: 400px;
      min-width: 280px;
      min-height: 36px;
      margin: 0;
      padding: 4px 12px 4px 4px;
      border: 1px solid rgba(255, 255, 255, 0.07);
      background: rgba(255, 255, 255, 0.045);
      box-sizing: border-box;
    }

    .hm-card[data-panel="true"] .hm-volume .hm-icon-btn {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .hm-card[data-panel="true"] .hm-volume .hm-vol-step {
      width: 32px;
      height: 32px;
    }

    .hm-card[data-panel="true"] .hm-volume .hm-range {
      height: 36px;
      min-width: 64px;
    }

    .hm-card[data-panel="true"] .hm-volume .hm-range::-webkit-slider-runnable-track {
      height: 9px;
      box-shadow:
        inset 0 2px 4px rgba(0, 0, 0, 0.45),
        0 0 14px rgba(var(--hm-a1-rgb), 0.18);
    }

    .hm-card[data-panel="true"] .hm-volume .hm-range::-moz-range-track,
    .hm-card[data-panel="true"] .hm-volume .hm-range::-moz-range-progress {
      height: 9px;
      box-shadow:
        inset 0 2px 4px rgba(0, 0, 0, 0.45),
        0 0 14px rgba(var(--hm-a1-rgb), 0.18);
    }

    .hm-card[data-panel="true"] .hm-volume .hm-range::-webkit-slider-thumb {
      width: 22px;
      height: 22px;
      margin-top: -6.5px;
      background: radial-gradient(circle at 34% 28%, #ffffff 0%, #e9f8ff 58%, #cfe8ff 100%);
      box-shadow:
        0 0 0 3px rgba(var(--hm-a1-rgb), 0.2),
        0 0 20px rgba(var(--hm-a1-rgb), 0.9),
        inset 0 1px 0 #ffffff;
    }

    .hm-card[data-panel="true"] .hm-volume .hm-range::-moz-range-thumb {
      width: 22px;
      height: 22px;
      background: radial-gradient(circle at 34% 28%, #ffffff 0%, #e9f8ff 58%, #cfe8ff 100%);
      box-shadow:
        0 0 0 3px rgba(var(--hm-a1-rgb), 0.2),
        0 0 20px rgba(var(--hm-a1-rgb), 0.9),
        inset 0 1px 0 #ffffff;
    }
  }

  @container (max-width: 520px) {
    /* 手机面板底部：无矩形触控框，图标/播放球自带主题立体光效 */
    .hm-card[data-panel="true"] .hm-controls {
      flex-direction: column;
      align-items: stretch;
      gap: 10px;
      width: 100%;
      max-width: 360px;
      box-sizing: border-box;
      margin: 0 auto;
      padding: 0 4px;
      border: none;
      background: transparent;
      box-shadow: none;
    }

    .hm-card[data-panel="true"] .hm-transport {
      width: 100%;
      justify-content: center;
      gap: clamp(5px, 2.8cqi, 11px);
    }

    .hm-card[data-panel="true"] .hm-volume {
      flex: 1 1 auto;
      width: 100%;
      max-width: 100%;
      min-height: 36px;
      margin: 0;
      padding: 0 2px 0 0;
      border: none;
      background: transparent;
    }

    /* 次要播控：触控热区完全透明，只让图标悬浮发光 */
    .hm-card[data-panel="true"] .hm-transport .hm-btn,
    .hm-card[data-panel="true"] .hm-transport .hm-btn[data-on="true"] {
      position: relative;
      isolation: isolate;
      width: clamp(42px, 14.5cqi, 58px);
      height: clamp(42px, 14.5cqi, 58px);
      border: none;
      border-radius: 50%;
      background: transparent;
      box-shadow: none;
      color: rgba(248, 250, 255, 0.9);
    }

    .hm-card[data-panel="true"] .hm-transport .hm-btn::before {
      content: "";
      position: absolute;
      inset: 8%;
      z-index: 0;
      border-radius: 50%;
      background:
        radial-gradient(circle at 32% 24%, rgba(255, 255, 255, 0.16), transparent 40%),
        radial-gradient(circle at 50% 52%, rgba(var(--hm-a1-rgb), 0.22), transparent 72%);
      filter: blur(4px);
      opacity: 0.6;
      transition: opacity 0.2s ease, transform 0.2s ease;
      pointer-events: none;
    }

    .hm-card[data-panel="true"] .hm-transport .hm-btn svg {
      position: relative;
      z-index: 1;
      width: clamp(22px, 8.2cqi, 32px);
      height: clamp(22px, 8.2cqi, 32px);
      filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.55))
        drop-shadow(0 0 9px rgba(var(--hm-a1-rgb), 0.32));
      transition: transform 0.18s ease, filter 0.18s ease;
    }

    .hm-card[data-panel="true"] .hm-transport .hm-btn[data-on="true"] {
      color: var(--hm-a1);
    }

    .hm-card[data-panel="true"] .hm-transport .hm-btn[data-on="true"]::before {
      opacity: 1;
    }

    .hm-card[data-panel="true"] .hm-transport .hm-btn[data-on="true"] svg {
      filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.6))
        drop-shadow(0 0 14px rgba(var(--hm-a1-rgb), 0.9));
    }

    .hm-card[data-panel="true"] .hm-transport .hm-btn:hover::before {
      opacity: 0.9;
      transform: scale(1.08);
    }

    .hm-card[data-panel="true"] .hm-transport .hm-btn:hover svg {
      transform: translateY(-1px);
      filter: drop-shadow(0 3px 3px rgba(0, 0, 0, 0.6))
        drop-shadow(0 0 14px rgba(var(--hm-a1-rgb), 0.65));
    }

    .hm-card[data-panel="true"] .hm-transport .hm-btn:active {
      transform: scale(0.92);
    }

    /* 播放键：主题渐变球体 + 顶部高光 + 底部内阴影 + 呼吸光晕 */
    .hm-card[data-panel="true"] .hm-transport .hm-play {
      position: relative;
      isolation: isolate;
      width: clamp(52px, 18.5cqi, 72px);
      height: clamp(52px, 18.5cqi, 72px);
      min-width: clamp(52px, 18.5cqi, 72px);
      min-height: clamp(52px, 18.5cqi, 72px);
      border: none;
      border-radius: 50%;
      color: #fff;
      background:
        radial-gradient(circle at 30% 22%, rgba(255, 255, 255, 0.58) 0%, rgba(255, 255, 255, 0.12) 27%, transparent 49%),
        linear-gradient(145deg, rgba(var(--hm-a1-rgb), 1) 0%, rgba(var(--hm-a2-rgb), 1) 100%);
      box-shadow:
        0 18px 32px -14px rgba(var(--hm-a1-rgb), 0.95),
        0 8px 18px -8px rgba(var(--hm-a2-rgb), 0.85),
        inset 0 1px 0 rgba(255, 255, 255, 0.55),
        inset 0 -10px 20px rgba(0, 0, 0, 0.28);
      filter: none;
    }

    .hm-card[data-panel="true"] .hm-transport .hm-play::before {
      content: "";
      position: absolute;
      left: 14%;
      right: 14%;
      top: 8%;
      height: 38%;
      z-index: 1;
      border-radius: 50%;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.5), transparent);
      filter: blur(1px);
      opacity: 0.85;
      pointer-events: none;
    }

    .hm-card[data-panel="true"] .hm-transport .hm-play::after {
      content: "";
      position: absolute;
      inset: -12px;
      z-index: -1;
      border: none;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(var(--hm-a1-rgb), 0.3), transparent 68%);
      opacity: 0.45;
      pointer-events: none;
    }

    .hm-card[data-panel="true"] .hm-transport .hm-play.is-playing::after {
      opacity: 1;
      animation: hmPulse 3.2s ease-in-out infinite;
    }

    .hm-card[data-panel="true"] .hm-transport .hm-play svg {
      position: relative;
      z-index: 2;
      width: clamp(30px, 12.3cqi, 48px);
      height: clamp(30px, 12.3cqi, 48px);
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.45));
    }

    /* 音量条同步主题光效：更厚的轨道 + 立体发光滑块 */
    .hm-card[data-panel="true"] .hm-volume .hm-range::-webkit-slider-runnable-track {
      height: 9px;
      box-shadow:
        inset 0 2px 4px rgba(0, 0, 0, 0.45),
        0 0 14px rgba(var(--hm-a1-rgb), 0.18);
    }

    .hm-card[data-panel="true"] .hm-volume .hm-range::-webkit-slider-thumb {
      width: 22px;
      height: 22px;
      margin-top: -6.5px;
      background: radial-gradient(circle at 34% 28%, #ffffff 0%, #e9f8ff 58%, #cfe8ff 100%);
      box-shadow:
        0 0 0 3px rgba(var(--hm-a1-rgb), 0.2),
        0 0 20px rgba(var(--hm-a1-rgb), 0.9),
        inset 0 1px 0 #ffffff;
    }
  }

  /* 窄屏/竖屏面板：封面在上、信息在下，整体居中；不再让主区独占全部剩余高度 */
  @container (max-width: 820px) {
    /* 窄屏面板里封面和信息必须一起装进主区：主区吃剩余高度，
       封面用剩余空间收缩，否则封面把歌手/规格顶出主区被 overflow 裁掉。 */
    .hm-card[data-panel="true"] .hm-main {
      display: flex;
      flex-direction: column;
      flex: 1 1 auto;
      min-height: 0;
      justify-content: center;
      align-items: center;
      gap: clamp(10px, 3cqi, 18px);
    }

    .hm-card[data-panel="true"] .hm-vis {
      height: clamp(36px, 8vh, 76px);
      flex: 0 0 auto;
    }

    .hm-card[data-panel="true"] .hm-cover-wrap {
      width: 100%;
      height: auto;
      min-height: 0;
      flex: 0 1 auto;
      overflow: hidden;
    }

    .hm-card[data-panel="true"] .hm-cover {
      width: min(86%, var(--hm-panel-cover, calc(100dvh - 460px)), 340px);
      height: auto;
      max-height: 100%;
      margin: 0 auto;
    }

    .hm-card[data-panel="true"] .hm-info {
      min-height: 0;
      flex: 0 0 auto;
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

  /* 横屏短卡片（如 1024×768 平板横屏）：宽度落在窄屏断点内，但高度不足以竖排。
     由 _fitPanel 打上 hm-short-landscape 类，改回左右双栏，
     避免底部进度/控制/音量被挤出卡片。 */
  .hm-card.hm-short-landscape[data-panel="true"] .hm-main {
    display: grid;
    grid-template-columns:
      minmax(0, calc(var(--hm-panel-cover, 34%) + 96px))
      minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);
    flex: 1 1 auto;
    justify-content: stretch;
    align-items: center;
    gap: clamp(14px, 2.4cqi, 24px);
    overflow: hidden;
  }

  .hm-card.hm-short-landscape[data-panel="true"] .hm-cover-wrap {
    width: 100%;
    height: 100%;
  }

  .hm-card.hm-short-landscape[data-panel="true"] .hm-cover {
    width: min(100%, var(--hm-panel-cover, 100%));
    max-height: 100%;
    margin: 0 auto;
  }

  .hm-card.hm-short-landscape[data-panel="true"] .hm-meta {
    align-items: flex-start;
    text-align: left;
    width: 100%;
  }

  .hm-card.hm-short-landscape[data-panel="true"] .hm-tags {
    justify-content: flex-start;
  }

  /* 窄面板音量下移后会多占一行高度，封面同步收小，避免底部音量被裁掉 */
  @container (max-width: 620px) {
    .hm-card[data-panel="true"] .hm-cover {
      width: min(100%, 180px);
    }
  }

  /* 583 这类中等窄面板：收紧留白、隐藏单行歌词、压低声谱，保证音量两行完整可见 */
  @container (min-width: 520px) and (max-width: 620px) {
    .hm-card[data-panel="true"]:has(.hm-controls.is-stacked) .hm-body {
      padding: 12px 18px;
    }

    .hm-card[data-panel="true"]:has(.hm-controls.is-stacked) .hm-now-lyric {
      display: none;
    }

    .hm-card[data-panel="true"]:has(.hm-controls.is-stacked) .hm-vis {
      display: none;
    }
  }

  /* 面板里宽而矮的格子按紧凑布局：小封面 + 信息，控制区在下方 */
  .hm-card[data-panel="true"][data-layout="compact"] .hm-main {
    grid-template-columns: 72px minmax(0, 1fr);
    align-items: center;
    gap: 12px;
  }

  .hm-card[data-panel="true"][data-layout="compact"] .hm-cover {
    width: 72px;
    max-height: 72px;
  }

  /* 面板/预览窄宽：音量在播放控件下方，覆盖面板默认的单行布局 */
  .hm-card[data-panel="true"] .hm-controls.is-stacked {
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    gap: 8px;
  }

  .hm-card[data-panel="true"] .hm-controls.is-stacked .hm-transport {
    width: 100%;
    justify-content: center;
  }

  .hm-card[data-panel="true"] .hm-controls.is-stacked .hm-volume {
    flex: 0 0 auto;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    margin-left: 0;
  }

  /* ---------- 卡片选择器缩略预览（独立于仪表盘正常卡片） ---------- */
  .hm-card[data-thumb="lg"],
  .hm-card[data-thumb="md"],
  .hm-card[data-thumb="sm"] {
    --hm-radius: 30px;
    border-radius: 30px;
  }

  .hm-card[data-thumb="lg"] .hm-body {
    padding: clamp(18px, 2.6cqi, 28px);
    gap: clamp(10px, 1.8cqi, 16px);
    max-width: none;
  }

  .hm-card[data-thumb="lg"] .hm-main {
    gap: clamp(18px, 3cqi, 36px);
  }

  .hm-card[data-thumb="lg"] .hm-cover,
  .hm-card[data-thumb="md"] .hm-cover,
  .hm-card[data-thumb="sm"] .hm-cover {
    width: var(--hm-cover-size);
    height: var(--hm-cover-size);
    border-radius: 50%;
    border-color: rgba(var(--hm-a1-rgb), 0.28);
    box-shadow:
      0 22px 46px -18px rgba(0, 0, 0, 0.9),
      0 0 0 1px rgba(var(--hm-a1-rgb), 0.14),
      0 0 32px -10px rgba(var(--hm-a1-rgb), 0.55),
      inset 0 1px 0 rgba(255, 255, 255, 0.24);
  }

  .hm-card[data-thumb="sm"] .hm-cover {
    border-radius: 50%;
  }

  .hm-card[data-thumb="lg"] .hm-cover::before,
  .hm-card[data-thumb="md"] .hm-cover::before,
  .hm-card[data-thumb="sm"] .hm-cover::before,
  .hm-card[data-thumb="lg"] .hm-cover-halo,
  .hm-card[data-thumb="md"] .hm-cover-halo,
  .hm-card[data-thumb="sm"] .hm-cover-halo {
    display: none;
  }

  .hm-card[data-thumb="lg"] .hm-title {
    font-size: clamp(30px, 4.6cqi, 44px);
    -webkit-line-clamp: 1;
    letter-spacing: -0.02em;
  }

  .hm-card[data-thumb="lg"] .hm-artist {
    font-size: clamp(15px, 2.2cqi, 21px);
  }

  .hm-card[data-thumb="lg"] .hm-kicker {
    font-size: 11px;
    letter-spacing: 0.14em;
  }

  .hm-card[data-thumb="lg"] .hm-tags {
    margin-top: 6px;
    gap: 10px;
  }

  .hm-card[data-thumb="lg"] .hm-vis {
    height: clamp(32px, 7cqi, 56px);
  }

  .hm-card[data-thumb="lg"] .hm-play {
    width: clamp(64px, 10cqi, 88px);
    height: clamp(64px, 10cqi, 88px);
  }

  .hm-card[data-thumb="lg"] .hm-btn {
    width: clamp(40px, 6.4cqi, 54px);
    height: clamp(40px, 6.4cqi, 54px);
  }

  .hm-card[data-thumb="lg"] .hm-icon-btn {
    width: 44px;
    height: 44px;
  }

  .hm-card[data-thumb="lg"] .hm-volume {
    flex: 0 1 190px;
  }

  /* 预览卡（卡片选择器/编辑弹窗）：内容块垂直居中，避免高预览框里被拉出大片空隙 */
  .hm-card[data-thumb="lg"] .hm-body,
  .hm-card[data-thumb="md"] .hm-body,
  .hm-card[data-thumb="sm"] .hm-body {
    justify-content: center;
    gap: 12px;
  }

  .hm-card[data-thumb="lg"] .hm-main,
  .hm-card[data-thumb="md"] .hm-main,
  .hm-card[data-thumb="sm"] .hm-main {
    flex: 0 0 auto;
  }

  /* 中等预览：保留主视觉与主要控制，收起标签和次要顶栏按钮 */
  .hm-card[data-thumb="md"] .hm-body {
    padding: 16px 18px;
    gap: 10px;
  }

  .hm-card[data-thumb="md"] .hm-main {
    gap: 16px;
  }

  /* 编辑弹窗/选择器中预览保持单行控制，音量条不再被纵向拉伸成巨幅胶囊 */
  .hm-card[data-thumb="md"] .hm-controls {
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }

  .hm-card[data-thumb="md"] .hm-transport {
    justify-content: flex-start;
  }

  .hm-card[data-thumb="md"] .hm-tags {
    display: none;
  }

  .hm-card[data-thumb="md"] .hm-top-actions .hm-icon-btn:not([data-role="power"]):not([data-role="more"]) {
    display: none;
  }

  .hm-card[data-thumb="md"] .hm-title {
    font-size: clamp(24px, 5cqi, 34px);
    -webkit-line-clamp: 1;
  }

  .hm-card[data-thumb="md"] .hm-artist {
    font-size: clamp(13px, 2.6cqi, 18px);
  }

  .hm-card[data-thumb="md"] .hm-vis {
    height: 24px;
  }

  .hm-card[data-thumb="md"] .hm-play {
    width: 64px;
    height: 64px;
  }

  .hm-card[data-thumb="md"] .hm-btn {
    width: 40px;
    height: 40px;
  }

  .hm-card[data-thumb="md"] .hm-icon-btn {
    width: 38px;
    height: 38px;
  }

  .hm-card[data-thumb="md"] .hm-volume {
    flex: 0 1 148px;
    width: auto;
    height: 44px;
    box-sizing: border-box;
    padding: 3px 10px 3px 3px;
    margin-left: auto;
  }

  /* 小预览：只保留封面、标题、进度和基本控制 */
  .hm-card[data-thumb="sm"] .hm-body {
    padding: 12px;
    gap: 8px;
  }

  .hm-card[data-thumb="sm"] .hm-top {
    min-height: 24px;
  }

  .hm-card[data-thumb="sm"] .hm-status {
    overflow: hidden;
    white-space: nowrap;
  }

  .hm-card[data-thumb="sm"] .hm-top-actions .hm-icon-btn:not([data-role="more"]) {
    display: none;
  }

  .hm-card[data-thumb="sm"] .hm-tags,
  .hm-card[data-thumb="sm"] .hm-kicker,
  .hm-card[data-thumb="sm"] .hm-vis {
    display: none;
  }

  .hm-card[data-thumb="sm"] .hm-main {
    gap: 12px;
  }

  .hm-card[data-thumb="sm"] .hm-controls {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .hm-card[data-thumb="sm"] .hm-title {
    font-size: clamp(19px, 5.6cqi, 26px);
    -webkit-line-clamp: 1;
  }

  .hm-card[data-thumb="sm"] .hm-artist {
    font-size: 12px;
  }

  /* 极小预览（约 300×160）优先保证主体与播放键不被裁，隐藏顶部状态行 */
  .hm-card[data-thumb="sm"] .hm-top {
    display: none;
  }

  .hm-card[data-thumb="sm"] .hm-progress {
    gap: 6px;
  }

  .hm-card[data-thumb="sm"] .hm-time {
    font-size: 10px;
    min-width: 30px;
  }

  .hm-card[data-thumb="sm"] .hm-play {
    width: 46px;
    height: 46px;
  }

  .hm-card[data-thumb="sm"] .hm-btn {
    width: 32px;
    height: 32px;
  }

  .hm-card[data-thumb="sm"] .hm-transport .hm-btn[data-role="shuffle"],
  .hm-card[data-thumb="sm"] .hm-transport .hm-btn[data-role="repeat"] {
    display: none;
  }

  .hm-card[data-thumb="sm"] .hm-volume {
    flex: 0 0 34px;
    width: 34px;
    max-width: 34px;
    padding: 0;
    border: none;
    background: transparent;
  }

  .hm-card[data-thumb="sm"] .hm-volume .hm-range,
  .hm-card[data-thumb="sm"] .hm-vol-pct {
    display: none;
  }

  @container (max-width: 460px) {
    .hm-card[data-thumb="md"] .hm-controls {
      gap: 8px;
    }

    .hm-card[data-thumb="md"] .hm-transport .hm-btn[data-role="shuffle"],
    .hm-card[data-thumb="md"] .hm-transport .hm-btn[data-role="repeat"] {
      display: none;
    }

    .hm-card[data-thumb="md"] .hm-play {
      width: 56px;
      height: 56px;
    }

    .hm-card[data-thumb="md"] .hm-btn {
      width: 36px;
      height: 36px;
    }

    .hm-card[data-thumb="md"] .hm-volume {
      flex: 0 1 90px;
      max-width: 90px;
      margin-left: auto;
    }

    .hm-card[data-thumb="md"] .hm-vol-pct {
      display: none;
    }
  }

  /* 卡片选择器预览：iOS WebView 里多层 backdrop-filter + 大半径 blur 容易把
     GPU 拖死（表现为“点卡片 App 直接崩”）。预览态一律降级为纯色/渐变。 */
  .hm-card[data-thumb="lg"] *,
  .hm-card[data-thumb="md"] *,
  .hm-card[data-thumb="sm"] * {
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
  }

  .hm-card[data-thumb="lg"] .hm-bg-art,
  .hm-card[data-thumb="md"] .hm-bg-art,
  .hm-card[data-thumb="sm"] .hm-bg-art {
    display: none !important;
  }

  /* 缩略预览不要走正常卡片的“窄卡片单列”规则，否则小预览会被竖向堆叠撑破 */
  @container (max-width: 380px) {
    .hm-card[data-thumb="sm"] .hm-main {
      grid-template-columns: var(--hm-cover-size) minmax(0, 1fr);
      justify-items: stretch;
      text-align: left;
      gap: 12px;
    }

    .hm-card[data-thumb="sm"] .hm-meta {
      align-items: flex-start;
      text-align: left;
    }

    .hm-card[data-thumb="sm"] .hm-controls {
      flex-direction: row;
      align-items: center;
      gap: 8px;
    }

    .hm-card[data-thumb="sm"] .hm-transport {
      justify-content: flex-start;
    }

    .hm-card[data-thumb="sm"] .hm-volume {
      flex: 0 0 34px;
      width: 34px;
      margin-left: auto;
    }

    .hm-card[data-thumb="md"] .hm-main {
      grid-template-columns: var(--hm-cover-size) minmax(0, 1fr);
      justify-items: stretch;
      text-align: left;
      gap: 14px;
    }

    .hm-card[data-thumb="md"] .hm-meta {
      align-items: flex-start;
      text-align: left;
    }

    .hm-card[data-thumb="md"] .hm-vis {
      display: block;
    }

    .hm-card[data-thumb="md"] .hm-controls {
      flex-direction: row;
      align-items: center;
      gap: 8px;
    }

    .hm-card[data-thumb="md"] .hm-transport {
      justify-content: flex-start;
    }

    .hm-card[data-thumb="md"] .hm-volume {
      flex: 0 1 90px;
      width: auto;
      margin-left: auto;
    }

    .hm-card[data-thumb="md"] .hm-title {
      font-size: 20px;
    }

    .hm-card[data-thumb="md"] .hm-artist {
      font-size: 12px;
    }

    .hm-card[data-thumb="md"] .hm-kicker {
      font-size: 10px;
      letter-spacing: 0.6px;
    }
  }

  /* 触屏紧凑卡片：控制区拆成两行，保证按钮和音量都有足够触控面积 */
  @media (pointer: coarse) {
    .hm-card[data-layout="compact"] .hm-controls {
      flex-direction: column;
      align-items: stretch;
      gap: 8px;
    }

    .hm-card[data-layout="compact"] .hm-transport {
      justify-content: center;
    }

    .hm-card[data-layout="compact"] .hm-volume {
      flex: 1 1 auto;
      width: min(100%, 280px);
      max-width: none;
      margin: 0 auto;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .hm-wave-wrap svg,
    .hm-orbit-ring,
    .hm-grid,
    .hm-cover::before,
    .hm-cover-eq-glow,
    .hm-play.is-playing::after,
    .hm-entity-eq i,
    .hm-entity-chip[data-playing="true"]::after,
    .hm-dot {
      animation: none !important;
    }

    .hm-cover,
    .hm-play,
    .hm-btn,
    .hm-icon-btn {
      transition: none;
    }

    .hm-cover[data-gesture] {
      animation: none !important;
    }
  }

  /* 手机端性能模式：WebView 上多层 backdrop-filter + 全卡动画网格会逐帧重算合成，
     是手机 HA App 卡顿的主要来源。手机上改为不透明底色、静态网格，保留视觉层次。 */
  @media (max-width: 700px) {
    .hm-grid {
      animation: none !important;
    }

    .hm-noise {
      display: none;
    }

    .hm-bg-art {
      filter: brightness(0.5) saturate(1.35);
    }

    .hm-icon-btn,
    .hm-btn,
    .hm-entity-chip,
    .hm-cover-eq-glow {
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
    }

    .hm-entity-eq i,
    .hm-entity-chip[data-playing="true"]::after,
    .hm-dot {
      animation: none !important;
    }
  }

  /* 单行说明（专辑/来源）在窄列里必须省略，不能横向顶出卡片 */
  .hm-kicker {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* ---------- 宽高比形态（data-shape） ---------- */

  /* 完整布局不再死守 760px：按卡片可用宽度放宽，16:9 大卡也不会缩成中间的窄条 */
  .hm-card[data-layout="full"] .hm-body {
    max-width: min(1180px, 94cqi);
  }

  /* 宽屏：内容不再固定 760px，超宽屏按比例放宽，避免左右大片留白 */
  .hm-card[data-shape="wide"] .hm-body {
    max-width: min(1480px, 94cqi);
  }

  .hm-card[data-shape="wide"] .hm-title {
    font-size: clamp(26px, 2.6cqi, 44px);
  }

  .hm-card[data-shape="wide"] .hm-main {
    gap: clamp(18px, 3cqi, 34px);
  }

  /* 竖长：内容纵向居中，不再被 space-between 拆成上下两截 */
  .hm-card[data-shape="tall"] .hm-body {
    justify-content: center;
    max-width: 560px;
    gap: clamp(12px, 3cqi, 22px);
  }

  /* 竖长卡片改为「封面在上、信息在下」的纵向堆叠，避免左右两栏把歌名挤到裁切 */
  .hm-card[data-shape="tall"] .hm-main {
    grid-template-columns: minmax(0, 1fr);
    justify-items: center;
    text-align: center;
    gap: 14px;
  }

  .hm-card[data-shape="tall"] .hm-info,
  .hm-card[data-shape="tall"] .hm-meta {
    justify-items: center;
    min-width: 0;
    width: 100%;
  }

  .hm-card[data-shape="tall"] .hm-title,
  .hm-card[data-shape="tall"] .hm-artist,
  .hm-card[data-shape="tall"] .hm-kicker,
  .hm-card[data-shape="tall"] .hm-now-lyric {
    text-align: center;
    justify-content: center;
  }

  .hm-card[data-shape="tall"] .hm-tags {
    justify-content: center;
  }

  .hm-card[data-shape="tall"] .hm-kicker {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* 极小卡片：只保留必要按钮，收紧控件，避免顶栏与播放键溢出 */
  /* 窄竖卡片：随机/循环键会让播放键挤出卡边，先隐藏这两个次要键 */
  @container (max-width: 380px) {
    .hm-transport .hm-btn[data-role="shuffle"],
    .hm-transport .hm-btn[data-role="repeat"] {
      display: none;
    }
  }

  @container (max-width: 330px) {
    .hm-card[data-layout="compact"] .hm-top .hm-status-text,
    .hm-card[data-layout="compact"] .hm-top .hm-kicker-sep {
      display: none;
    }

    .hm-top-actions .hm-lyrics-btn,
    .hm-top-actions .hm-ma,
    .hm-top-actions .hm-icon-btn[data-role="power"] {
      display: none;
    }

    .hm-icon-btn {
      width: 30px;
      height: 30px;
    }

    .hm-btn {
      width: 34px;
      height: 34px;
    }

    .hm-play {
      width: 46px;
      height: 46px;
    }

    .hm-volume .hm-vol-step {
      display: none;
    }
  }

  /* 超宽矮条：单行横排——左封面、中间信息+进度、右侧播放与音量 */
  .hm-card[data-shape="banner"] .hm-body {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    grid-template-areas:
      "top top top"
      "main main ctrl"
      "prog prog ctrl";
    align-content: center;
    gap: 8px 20px;
    max-width: 2400px;
    padding: 12px 24px;
  }

  .hm-card[data-shape="banner"] .hm-top {
    grid-area: top;
    min-height: 0;
  }

  .hm-card[data-shape="banner"] .hm-entities {
    display: none;
  }

  .hm-card[data-shape="banner"] .hm-main {
    grid-area: main;
    grid-template-columns: var(--hm-cover-size, 84px) minmax(0, 1fr);
    gap: 14px;
  }

  .hm-card[data-shape="banner"] .hm-progress {
    grid-area: prog;
  }

  .hm-card[data-shape="banner"] .hm-controls {
    grid-area: ctrl;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    gap: 8px;
    min-width: min(300px, 34vw);
  }

  .hm-card[data-shape="banner"] .hm-controls .hm-transport {
    justify-content: flex-end;
  }

  .hm-card[data-shape="banner"] .hm-controls .hm-volume {
    width: 100%;
  }

  /* 横条高度太矮，音柱会挤掉歌名与进度，这里不显示；竖屏/桌面/小卡仍保留 */
  .hm-card[data-shape="banner"] .hm-vis,
  .hm-card[data-shape="banner"] .hm-tags,
  .hm-card[data-shape="banner"] .hm-kicker,
  .hm-card[data-shape="banner"] .hm-now-lyric {
    display: none;
  }

  .hm-card[data-shape="banner"] .hm-title {
    font-size: clamp(18px, 2.2cqi, 30px);
    -webkit-line-clamp: 1;
  }

  /* ---------- 面板视图：整块内容铺满卡片 ----------
     full/wide 形态的 .hm-body 有 1180/1480 的 max-width，面板视图（一个卡片占满整个
     视口）里这条上限会让内容缩成中间一条、左右留出大片空白，这里统一解除。 */
  .hm-card[data-panel="true"] .hm-body {
    max-width: none;
  }

  .hm-card[data-panel="true"] .hm-top,
  .hm-card[data-panel="true"] .hm-controls {
    max-width: none;
  }

  /* ---------- 窄屏/竖屏面板：封面与信息一起装进主区 ----------
     主区吃剩余高度，封面按剩余高度收缩；否则封面占满主区后，歌手名与
     规格行会被 .hm-main 的 overflow 裁掉，又被频谱画布压住。
     用 hm-narrow-panel 显式类（JS 在 _fitPanel 里加）而不是容器查询，
     避免被后置的面板规则盖回 height:100%。 */
  .hm-card.hm-narrow-panel[data-panel="true"] .hm-main {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    min-height: 0;
    justify-content: center;
    align-items: center;
    gap: clamp(10px, 3cqi, 18px);
  }

  .hm-card.hm-narrow-panel[data-panel="true"] {
    --hm-ring-pad: 10px;
  }

  .hm-card.hm-narrow-panel[data-panel="true"] .hm-cover-wrap {
    width: 100%;
    height: auto;
    min-height: 0;
    flex: 0 1 auto;
    overflow: hidden;
  }

  .hm-card.hm-narrow-panel[data-panel="true"] .hm-cover {
    width: min(86%, var(--hm-panel-cover, calc(100dvh - 460px)), 340px);
    height: auto;
    max-height: 100%;
    margin: 0 auto;
  }

  .hm-card.hm-narrow-panel[data-panel="true"] .hm-info {
    width: 100%;
    max-width: min(92%, 560px);
    min-height: 0;
    flex: 0 0 auto;
    align-items: center;
    text-align: center;
  }

  .hm-card.hm-narrow-panel.hm-panel-compact[data-panel="true"] .hm-main[data-side-lyrics] .hm-info {
    width: min(92%, 560px);
    max-width: min(92%, 560px);
  }

  .hm-card.hm-narrow-panel[data-panel="true"] .hm-meta {
    width: 100%;
    align-items: stretch;
    text-align: center;
  }

  /* 矮屏竖排面板：优先保住标题/歌手/规格，隐藏标签与当前歌词行。 */
  .hm-card.hm-narrow-panel[data-panel="true"].hm-panel-tight .hm-tags,
  .hm-card.hm-narrow-panel[data-panel="true"].hm-panel-tight .hm-now-lyric {
    display: none;
  }

  .hm-card.hm-narrow-panel[data-panel="true"].hm-panel-tight .hm-title {
    font-size: clamp(18px, 5.4cqi, 26px);
  }
`;var Ls={play:M`<path d="M8.2 5.4c0-.7.8-1.1 1.4-.7l9.1 5.8c.6.4.6 1.3 0 1.7l-9.1 6.1c-.6.4-1.4 0-1.4-.7V5.4z" fill="currentColor"/>`,pause:M`<rect x="7" y="5.6" width="3.6" height="12.8" rx="1.2" fill="currentColor"/><rect x="13.4" y="5.6" width="3.6" height="12.8" rx="1.2" fill="currentColor"/>`,previous:M`<path d="M7 6.2v11.6" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><path d="M17.6 6.6c0-.6-.7-1-1.2-.6l-7.1 5.2c-.5.4-.5 1.2 0 1.6l7.1 5.2c.5.4 1.2 0 1.2-.6V6.6z" fill="currentColor"/>`,next:M`<path d="M17 6.2v11.6" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><path d="M6.4 6.6c0-.6.7-1 1.2-.6l7.1 5.2c.5.4.5 1.2 0 1.6l-7.1 5.2c-.5.4-1.2 0-1.2-.6V6.6z" fill="currentColor"/>`,shuffle:M`<path d="M4.5 7.2h3.2c1 0 1.9.5 2.5 1.3l4 5.4c.6.8 1.5 1.3 2.5 1.3h3.1" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M4.5 16.8h3.2c1 0 1.9-.5 2.5-1.3l4-5.4c.6-.8 1.5-1.3 2.5-1.3h3.1" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M16.2 4.6l3 2.6-3 2.6M16.2 12.6l3 2.6-3 2.6" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/>`,repeat:M`<path d="M6.4 9.1V8.3c0-1.5 1.2-2.7 2.7-2.7h8.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M17.8 5.6l-2.3-2.2M17.8 5.6l-2.3 2.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M17.6 14.9v.8c0 1.5-1.2 2.7-2.7 2.7H6.7" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M6.2 18.4l2.3 2.2M6.2 18.4l2.3-2.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/>`,repeatOne:M`<path d="M6.4 9.1V8.3c0-1.5 1.2-2.7 2.7-2.7h8.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M17.8 5.6l-2.3-2.2M17.8 5.6l-2.3 2.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M17.6 14.9v.8c0 1.5-1.2 2.7-2.7 2.7H6.7" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M6.2 18.4l2.3 2.2M6.2 18.4l2.3-2.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M11.2 9.3l1.1-.8v6.1" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M10.6 14.6h3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>`,volume:M`<path d="M4.6 9.4h2.7l3.4-2.9c.5-.4 1.2 0 1.2.6v9.8c0 .6-.7 1-1.2.6L7.3 14.6H4.6c-.6 0-1-.4-1-1v-3.2c0-.6.4-1 1-1z" fill="currentColor"/><path d="M15.4 8.6c1.6 1 1.6 5.8 0 6.8" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M17.6 6.4c2.9 2 2.9 9.2 0 11.2" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/>`,mute:M`<path d="M4.6 9.4h2.7l3.4-2.9c.5-.4 1.2 0 1.2.6v9.8c0 .6-.7 1-1.2.6L7.3 14.6H4.6c-.6 0-1-.4-1-1v-3.2c0-.6.4-1 1-1z" fill="currentColor"/><path d="M15.2 9.6l4.6 4.8M19.8 9.6l-4.6 4.8" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/>`,power:M`<path d="M12 4.2v7" stroke="currentColor" stroke-width="1.9" fill="none" stroke-linecap="round"/><path d="M7.6 6.6a6.9 6.9 0 1 0 8.8 0" stroke="currentColor" stroke-width="1.9" fill="none" stroke-linecap="round"/>`,more:M`<circle cx="6.4" cy="12" r="1.55" fill="currentColor"/><circle cx="12" cy="12" r="1.55" fill="currentColor"/><circle cx="17.6" cy="12" r="1.55" fill="currentColor"/>`,library:M`<rect x="4.4" y="4.4" width="6.4" height="6.4" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.7"/><rect x="13.2" y="4.4" width="6.4" height="6.4" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.7"/><rect x="4.4" y="13.2" width="6.4" height="6.4" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.7"/><rect x="13.2" y="13.2" width="6.4" height="6.4" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.7"/>`,queue:M`<path d="M5 7.2h10M5 11.4h7.4M5 15.6h5.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M15.6 12.4c0-.5.5-.8.9-.5l4 2.3c.4.2.4.8 0 1l-4 2.6c-.4.3-.9 0-.9-.5v-5.4z" fill="currentColor"/>`,chevronLeft:M`<path d="M14.6 6l-5.4 6 5.4 6" stroke="currentColor" stroke-width="1.9" fill="none" stroke-linecap="round"/>`,close:M`<path d="M7 7l10 10M17 7L7 17" stroke="currentColor" stroke-width="1.9" fill="none" stroke-linecap="round"/>`,plus:M`<path d="M12 5.4v13.2M5.4 12h13.2" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>`,minus:M`<path d="M5.4 12h13.2" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>`,speaker:M`<rect x="4.4" y="6.2" width="6.2" height="11.6" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="7.5" cy="9.4" r="1.5" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M13.2 8.8c1.7.8 2.7 2.6 2.7 4.6 0 2-1 3.8-2.7 4.6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M15.9 5.9c2.7 1.4 4.2 4.2 4.2 7.5 0 3.3-1.5 6.1-4.2 7.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`,heart:M`<path d="M12 19.2c-.4 0-.8-.1-1.1-.4-1.3-1.1-2.6-2.1-3.7-3.1C5.6 14.3 4.4 12.9 4.4 10.9c0-2.4 1.8-4.2 4.1-4.2 1.5 0 2.8.7 3.5 1.9.7-1.2 2-1.9 3.5-1.9 2.3 0 4.1 1.8 4.1 4.2 0 2-1.2 3.4-2.8 4.8-1.1 1-2.4 2-3.7 3.1-.3.3-.7.4-1.1.4z" fill="none" stroke="currentColor" stroke-width="1.7"/>`,heartFill:M`<path d="M12 19.2c-.4 0-.8-.1-1.1-.4-1.3-1.1-2.6-2.1-3.7-3.1C5.6 14.3 4.4 12.9 4.4 10.9c0-2.4 1.8-4.2 4.1-4.2 1.5 0 2.8.7 3.5 1.9.7-1.2 2-1.9 3.5-1.9 2.3 0 4.1 1.8 4.1 4.2 0 2-1.2 3.4-2.8 4.8-1.1 1-2.4 2-3.7 3.1-.3.3-.7.4-1.1.4z" fill="currentColor"/>`,autoplay:M`<path d="M4.7 12c0-2.7 1.9-4.1 4-4.1 2.6 0 3.6 2.9 6.4 4.1 1.6.7 2.9.4 3.4-.4 1-1.5 1-4.4 0-5.9-.5-.8-1.8-1.1-3.4-.4-2.8 1.2-3.8 4.1-6.4 4.1-2.1 0-4-1.4-4-4.1" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>`,crossfade:M`<path d="M3.8 8.2c2.6 0 4.1 2.4 5.8 4.2 1.7 1.8 3.2 4.2 5.8 4.2" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M3.8 16.6c2.6 0 4.1-2.4 5.8-4.2 1.7-1.8 3.2-4.2 5.8-4.2" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M18.2 6.4l2 2-2 2M18.2 13.6l2 2-2 2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`,music:M`<path d="M14.5 5.2l4.6-1v9.1a3 3 0 1 1-1.8-2.7V7.1l-2.8.6v7.7a3 3 0 1 1-1.8-2.7V5.2z" fill="currentColor"/>`,group:M`<circle cx="9" cy="9.3" r="3.2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3.8 18.4c0-2.7 2.3-4.6 5.2-4.6s5.2 1.9 5.2 4.6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M16.2 6.4a3 3 0 0 1 0 5.9M18.6 18.4c0-2-1-3.6-2.6-4.3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>`,chevronRight:M`<path d="M9.4 6l5.4 6-5.4 6" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>`,playlist:M`<path d="M4 6.6h10.2M4 11h10.2M4 15.4h6.4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M16.4 11.8l4 2.35-4 2.35z" fill="currentColor"/>`,ma:M`<rect x="2.9" y="4.8" width="2.35" height="14.4" rx=".3" fill="currentColor"/><rect x="7.5" y="4.8" width="2.35" height="14.4" rx=".3" fill="currentColor"/><rect x="12.1" y="4.8" width="2.35" height="14.4" rx=".3" fill="currentColor"/><path d="M16.5 19.2L19.35 4.8M19.35 4.8L22.2 19.2" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="butt"/>`,external:M`<path d="M13.2 5.4h5.4v5.4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M18.2 5.8l-7 7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M11 6.6H7.2c-1 0-1.8.8-1.8 1.8v8.4c0 1 .8 1.8 1.8 1.8h8.4c1 0 1.8-.8 1.8-1.8V14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>`,folder:M`<path d="M3.6 7.2c0-1 .8-1.8 1.8-1.8h3.4l1.8 2.2h9.8c1 0 1.8.8 1.8 1.8v7.4c0 1-.8 1.8-1.8 1.8H5.4c-1 0-1.8-.8-1.8-1.8V7.2z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>`,check:M`<path d="M6 12.6l4.2 4.2 7.8-9" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>`,lyrics:M`<path d="M4.5 6.4h8.4M4.5 10.2h6.2M4.5 14h7.2" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/><circle cx="16.2" cy="14.2" r="2.2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M18.4 14.2V7.1l2.4-.6v7.7" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>`};function $(n,t=18){let e=Ls[n];return e?M`<svg viewBox="0 0 24 24" width=${t} height=${t} aria-hidden="true" focusable="false">${e}</svg>`:b}var Oi="2.15.5",Ui="ha-music",Ni="HA Music",C={PAUSE:1,SEEK:2,VOLUME_SET:4,VOLUME_MUTE:8,PREVIOUS_TRACK:16,NEXT_TRACK:32,TURN_ON:128,TURN_OFF:256,PLAY_MEDIA:512,VOLUME_STEP:1024,SELECT_SOURCE:2048,STOP:4096,CLEAR_PLAYLIST:8192,PLAY:16384,SHUFFLE_SET:32768,SELECT_SOUND_MODE:65536,BROWSE_MEDIA:131072,REPEAT_SET:262144,GROUPING:524288,SELECT:1048576};var N="cyber";var Ee={adaptive:{en:"Adaptive",zh:"\u81EA\u9002\u5E94"},full:{en:"Full",zh:"\u5B8C\u6574"},compact:{en:"Compact",zh:"\u7D27\u51D1"},mini:{en:"Mini",zh:"\u8FF7\u4F60"}},qe={ambient:{en:"Ambient blur",zh:"\u73AF\u5883\u6A21\u7CCA"},art:{en:"Cover fill",zh:"\u5C01\u9762\u94FA\u6EE1"},palette:{en:"Palette only",zh:"\u7EAF\u8272\u5F69"},none:{en:"Plain",zh:"\u65E0\u80CC\u666F"}},Te={bars:{en:"Live spectrum",zh:"\u5B9E\u65F6\u9891\u8C31"},wave:{en:"Wave",zh:"\u6CE2\u5F62"},orbit:{en:"Orbit",zh:"\u5149\u73AF"},none:{en:"Off",zh:"\u5173\u95ED"}},L={aurora:{label:{en:"Aurora",zh:"\u6781\u5149"},accent:["#2ee6c5","#7b5cff"],base:"#050a12",glow:1,grid:!1},cyber:{label:{en:"Cyberpunk",zh:"\u8D5B\u535A\u670B\u514B"},accent:["#ff2fd0","#22e6ff"],base:"#08030f",glow:1.4,grid:!0},liquid:{label:{en:"Liquid Glass",zh:"\u6DB2\u6001\u73BB\u7483"},accent:["#a9d8ff","#cdb6ff"],base:"#090c16",glow:.8,grid:!1,glass:!0},velvet:{label:{en:"Velvet",zh:"\u5929\u9E45\u7ED2"},accent:["#ff7a9c","#a86bff"],base:"#0d050c",glow:1.15,grid:!1},mono:{label:{en:"Monochrome",zh:"\u9ED1\u767D"},accent:["#e9ecf5","#8d95a8"],base:"#08090c",glow:.4,grid:!1},sunset:{label:{en:"Sunset",zh:"\u65E5\u843D"},accent:["#ffa45c","#ff4d8d"],base:"#120806",glow:1.1,grid:!1},ocean:{label:{en:"Ocean",zh:"\u6D77\u6D0B"},accent:["#39d0ff","#2f7bff"],base:"#04101c",glow:.9,grid:!1}},Li={play:"Play",pause:"Pause",playing:"Now playing",paused:"Paused",idle:"Standby",off:"Off",buffering:"Buffering",previous:"Previous track",next:"Next track",volume:"Volume",volumeUp:"Volume up",volumeDown:"Volume down",mute:"Mute",unmute:"Unmute",shuffle:"Shuffle",repeat:"Repeat",repeatAll:"Repeat all",repeatOne:"Repeat one",repeatOff:"Repeat off",source:"Source",soundMode:"Sound mode",queue:"Current playlist",library:"Library",assistant:"Music Assistant",playlists:"Playlists",playlistsEmpty:"No playlists found",playlistEmpty:"This playlist is empty or unavailable in Music Assistant",maPlayerRequired:"Playlists need a Music Assistant player",playlistUnavailable:"Unavailable",playingPlaylist:"Playing",openAssistant:"Open Music Assistant",more:"More info",power:"Power",group:"Group",groupLeave:"Leave group",loading:"Loading\u2026",queueEmpty:"Queue is empty",queueWindow:"Showing nearby tracks only; open Music Assistant for the full queue",queueLimited:"Could not load the full queue. Install the Music Assistant add-on (or Mass Queue integration), or open Music Assistant for every track.",browseFailed:"Media library is unavailable",noMedia:"Nothing is playing",unknownArtist:"Unknown artist",noTitle:"No title",close:"Close",back:"Back",track:"Track",album:"Album",volumeEntityMissing:"Volume entity unavailable",seek:"Seek",remaining:"Toggle remaining time",lyrics:"Lyrics",lyricsLoading:"Matching lyrics\u2026",lyricsNone:"No lyrics found",lyricsError:"Lyrics unavailable",lyricsRetry:"Retry",lyricsOffset:"Lyric timing offset",lyricsInstrumental:"Instrumental \xB7 no lyrics",favorite:"Favorite",favoriteOn:"Remove from favorites",favoriteUnavailable:"Favorites need a track with a source URI",autoplay:"Autoplay",crossfade:"Crossfade",devices:"Devices & grouping",selectDevice:"Switch",joinGroup:"Join group",leaveGroup:"Leave group",groupLeader:"Leader",groupMember:"In group",groupUnits:"devices",groupLeaderMissing:"Select a Music Assistant player first",deviceUnavailable:"No Home Assistant entity for this player",playersEmpty:"No players available"},Os={play:"\u64AD\u653E",pause:"\u6682\u505C",playing:"\u6B63\u5728\u64AD\u653E",paused:"\u5DF2\u6682\u505C",idle:"\u5F85\u673A",off:"\u5DF2\u5173\u95ED",buffering:"\u7F13\u51B2\u4E2D",previous:"\u4E0A\u4E00\u9996",next:"\u4E0B\u4E00\u9996",volume:"\u97F3\u91CF",volumeUp:"\u589E\u5927\u97F3\u91CF",volumeDown:"\u51CF\u5C0F\u97F3\u91CF",mute:"\u9759\u97F3",unmute:"\u53D6\u6D88\u9759\u97F3",shuffle:"\u968F\u673A\u64AD\u653E",repeat:"\u5FAA\u73AF",repeatAll:"\u5217\u8868\u5FAA\u73AF",repeatOne:"\u5355\u66F2\u5FAA\u73AF",repeatOff:"\u5173\u95ED\u5FAA\u73AF",source:"\u97F3\u6E90",soundMode:"\u58F0\u97F3\u6A21\u5F0F",queue:"\u5F53\u524D\u64AD\u653E\u5217\u8868",library:"\u5A92\u4F53\u5E93",assistant:"Music Assistant",playlists:"\u64AD\u653E\u5217\u8868",playlistsEmpty:"\u6CA1\u6709\u627E\u5230\u64AD\u653E\u5217\u8868",playlistEmpty:"\u8BE5\u6B4C\u5355\u4E3A\u7A7A\u6216\u66F2\u76EE\u5728 Music Assistant \u4E2D\u4E0D\u53EF\u7528",maPlayerRequired:"\u5F53\u524D\u64AD\u653E\u5668\u4E0D\u662F Music Assistant \u64AD\u653E\u5668\uFF0C\u8BF7\u5148\u5207\u6362\u5230 MA \u64AD\u653E\u5668",playlistUnavailable:"\u4E0D\u53EF\u7528",playingPlaylist:"\u5F00\u59CB\u64AD\u653E",openAssistant:"\u6253\u5F00 Music Assistant",more:"\u66F4\u591A\u4FE1\u606F",power:"\u5F00\u5173",group:"\u5206\u7EC4",groupLeave:"\u9000\u51FA\u5206\u7EC4",loading:"\u52A0\u8F7D\u4E2D\u2026",queueEmpty:"\u64AD\u653E\u961F\u5217\u4E3A\u7A7A",queueWindow:"\u4EC5\u663E\u793A\u5F53\u524D\u66F2\u76EE\u9644\u8FD1\uFF1B\u5B8C\u6574\u961F\u5217\u8BF7\u6253\u5F00 Music Assistant",queueLimited:"\u672A\u80FD\u8BFB\u53D6\u5B8C\u6574\u961F\u5217\uFF1B\u9700\u5B89\u88C5 Music Assistant \u52A0\u8F7D\u9879\uFF08\u6216 Mass Queue \u96C6\u6210\uFF09\uFF0C\u6216\u70B9\u53F3\u4E0A\u89D2\u5728 Music Assistant \u67E5\u770B\u5168\u90E8\u66F2\u76EE\u3002",browseFailed:"\u5A92\u4F53\u5E93\u6682\u4E0D\u53EF\u7528",noMedia:"\u5F53\u524D\u6CA1\u6709\u64AD\u653E\u5185\u5BB9",unknownArtist:"\u672A\u77E5\u827A\u672F\u5BB6",noTitle:"\u672A\u77E5\u66F2\u76EE",close:"\u5173\u95ED",back:"\u8FD4\u56DE",track:"\u66F2\u76EE",album:"\u4E13\u8F91",volumeEntityMissing:"\u97F3\u91CF\u5B9E\u4F53\u4E0D\u53EF\u7528",seek:"\u8FDB\u5EA6",remaining:"\u5207\u6362\u5269\u4F59\u65F6\u95F4",lyrics:"\u6B4C\u8BCD",lyricsLoading:"\u6B63\u5728\u5339\u914D\u6B4C\u8BCD\u2026",lyricsNone:"\u672A\u627E\u5230\u6B4C\u8BCD",lyricsError:"\u6B4C\u8BCD\u6682\u4E0D\u53EF\u7528",lyricsRetry:"\u91CD\u8BD5",lyricsOffset:"\u6B4C\u8BCD\u65F6\u95F4\u504F\u79FB",lyricsInstrumental:"\u7EAF\u97F3\u4E50 \xB7 \u65E0\u6B4C\u8BCD",favorite:"\u6536\u85CF",favoriteOn:"\u53D6\u6D88\u6536\u85CF",favoriteUnavailable:"\u5F53\u524D\u66F2\u76EE\u7F3A\u5C11\u6765\u6E90\u5730\u5740\uFF0C\u65E0\u6CD5\u6536\u85CF",autoplay:"\u81EA\u52A8\u64AD\u653E",crossfade:"\u6DE1\u5165\u6DE1\u51FA",devices:"\u8BBE\u5907\u4E0E\u5206\u7EC4",selectDevice:"\u5207\u6362",joinGroup:"\u52A0\u5165\u5206\u7EC4",leaveGroup:"\u79FB\u51FA\u5206\u7EC4",groupLeader:"\u4E3B\u8BBE\u5907",groupMember:"\u5DF2\u52A0\u5165",groupUnits:"\u53F0\u8BBE\u5907",groupLeaderMissing:"\u8BF7\u5148\u9009\u62E9 Music Assistant \u64AD\u653E\u5668",deviceUnavailable:"\u8BE5\u64AD\u653E\u5668\u6CA1\u6709\u5BF9\u5E94\u7684 Home Assistant \u5B9E\u4F53",playersEmpty:"\u6CA1\u6709\u53EF\u7528\u64AD\u653E\u5668"};function te(n){return/^zh/i.test(n||"")}function E(n){let t=te(n)?Os:Li;return e=>t[e]??Li[e]??e}var Us={playlist:{en:"Playlist",zh:"\u64AD\u653E\u5217\u8868"},album:{en:"Album",zh:"\u4E13\u8F91"},artist:{en:"Artist",zh:"\u827A\u672F\u5BB6"},track:{en:"Track",zh:"\u66F2\u76EE"},music:{en:"Music",zh:"\u97F3\u4E50"},video:{en:"Video",zh:"\u89C6\u9891"},directory:{en:"Folder",zh:"\u6587\u4EF6\u5939"},image:{en:"Image",zh:"\u56FE\u7247"},url:{en:"Link",zh:"\u94FE\u63A5"},app:{en:"App",zh:"\u5E94\u7528"},genre:{en:"Genre",zh:"\u98CE\u683C"}};function Re(n,t){if(!n)return"";let e=Us[String(n).toLowerCase()];return e?te(t)?e.zh:e.en:n}function xt(n){return Number(n?.protocol)===1}function vt(n){return String(n||"").toLowerCase().startsWith("zh")?"\u540E\u7AEF\u534F\u8BAE\u4E0D\u5339\u914D\uFF0C\u8BF7\u66F4\u65B0 HA Music Studio":"Backend protocol mismatch. Update HA Music Studio."}var w=(n,t,e)=>Math.min(e,Math.max(t,n));function et(n,t="--:--"){if(!Number.isFinite(n)||n<0)return t;let e=Math.round(n),i=Math.floor(e/3600),s=Math.floor(e%3600/60),a=e%60;return i>0?`${i}:${String(s).padStart(2,"0")}:${String(a).padStart(2,"0")}`:`${s}:${String(a).padStart(2,"0")}`}function j(n){let t=String(n??""),e=2166136261;for(let i=0;i<t.length;i+=1)e^=t.charCodeAt(i),e=Math.imul(e,16777619);return e>>>0}function ee(n={}){let t=[n.title,n.artist,n.album].filter(Boolean).join("|")||"ha-music",e=j(t),i=1.7+(e>>>8)%90/100,s=e%360/360*Math.PI*2,a=Number.isFinite(n.position)&&n.position>0?n.position:0,r=a/i*Math.PI*2+s;return{seed:t,hash:e,period:i,phase:s,position:a,pulse:.5+.5*Math.sin(r),low:.5+.5*Math.sin(r+.55),energy:.55+(e>>>16)%100/220}}function Ns(n){return j(n)%360}function q(n,t){let e=Number(n?.attributes?.supported_features??0);return!Number.isFinite(e)||!t?!1:(e&t)===t}function Ds(n,t){if(!(!n||!t))return n.states?n.states[t]:void 0}function Is(n,t=[],e=""){let i=Array.isArray(t)?t.filter(Boolean):[];if(!i.length)return"";let s=i.includes(e),a=s?e:"",r=c=>{let d=n?.states?.[c]?.state;return d==="playing"?2:d==="buffering"?1:0};if(s&&r(a)===2)return a;let o=a||i[0],l=a?r(a):0,h=-1/0;for(let c of i){let d=r(c);if(d<=0)continue;let p=Date.parse(n?.states?.[c]?.attributes?.media_position_updated_at||""),f=Number.isFinite(p)?p:0;(d>l||d===l&&f>h)&&(o=c,l=d,h=f)}return l>0?o:a}function Di(n,t=[],e="",i=null){let s=Array.isArray(t)?t.filter(Boolean):[];if(s.length<2)return"";let a=Is(n,s,e);if(!a||a===e)return"";let r=n?.states?.[a]?.state;return r!=="playing"&&r!=="buffering"||i&&i[a]===r?"":a}function mt(n,t,e=""){return Ds(n,t)?.attributes?.friendly_name||t||e}function Le(n){let t=n?.attributes??{},e=t.media_metadata??{},i=Number(t.media_duration??0),s=Number(e.duration??0),a=i>0?i:s,r=Number(t.media_position??0),o=t.media_position_updated_at;if(n?.state==="playing"&&o){let l=(Date.now()-new Date(o).getTime())/1e3;Number.isFinite(l)&&l>0&&(r+=l)}return Number.isFinite(a)&&a>0?r=w(r,0,a):(!Number.isFinite(r)||r<0)&&(r=0),{title:e.title||t.media_title||"",artist:e.artist||t.media_artist||e.album_artist||t.media_album_artist||"",album:e.album_name||t.media_album_name||"",series:e.series_title||t.media_series_title||"",track:e.track_number??t.media_track??"",duration:Number.isFinite(a)?a:0,position:Number.isFinite(r)?r:0,art:t.entity_picture||e.entity_picture||e.image_url||t.media_image_url||"",appName:t.app_name||"",source:t.source||"",soundMode:t.sound_mode||"",shuffle:!!t.shuffle,repeat:t.repeat||"off",volume:Number.isFinite(Number(t.volume_level))?Number(t.volume_level):null,muted:!!t.is_volume_muted,groupMembers:Array.isArray(t.group_members)?t.group_members:[]}}function Oe(n,t=60){let e=n?.attributes?.queue;return Array.isArray(e)?e.slice(0,t).map((i,s)=>({index:s,title:i.title||i.name||i.media_title||"",artist:i.artist||i.subtitle||i.media_artist||"",album:i.album||i.album_name||"",duration:Number(i.duration??i.media_duration??0)||0,art:i.entity_picture||i.thumbnail||i.artwork||"",contentId:i.media_content_id||i.content_id||"",contentType:i.media_content_type||i.content_type||"",queueItemId:i.queue_item_id||i.queueItemId||"",active:!!(i.active||i.is_active||i.current||i.playing)})):[]}function Fs(n={},t={}){let e=a=>typeof a=="string"?a:a&&typeof a=="object"&&(a.url||a.path)||"",i=e(n.image)||e(t.media_image)||e(t.art)||e(t.entity_picture);if(i)return i;let s=n.metadata?.images;if(Array.isArray(s)){let a=s.find(r=>r&&r.remotely_accessible!==!1)||s[0];return e(a)}return""}function Ii(n,t="",e=""){return Array.isArray(n)?n.map((i,s)=>{let a=i?.media_item||{},r=a.uri||i?.media_content_id||i?.contentId||i?.uri||"",o=i?.queue_item_id||i?.queueItemId||"",l=!!(i?.active||i?.is_active||i?.current||i?.playing)||!!(t&&o===t)||!!(!t&&e&&r===e),h=Array.isArray(a.artists)?a.artists.map(c=>c?.name).filter(Boolean).join(", "):"";return{index:s,title:i?.media_title||i?.title||a.name||o&&i?.name||"",artist:i?.media_artist||h||i?.artist||"",album:i?.media_album_name||a.album?.name||i?.album||"",duration:Number(i?.media_duration??i?.duration??0)||0,art:i?.local_image_encoded||Fs(a,i),contentId:r,contentType:a.media_type||i?.media_content_type||i?.contentType||"music",queueItemId:o,active:l}}):[]}function it(n,t){return t?/^(https?:|data:|blob:)/.test(t)?t:n?.hassUrl?n.hassUrl(t):t:""}var ze=new Map;async function ie(n,t,e){if(!t)return"";let i=/^http:\/\//i.test(t),s=typeof window<"u"&&window.location?.protocol==="https:";if(!i||!s||!e||!n?.fetchWithAuth)return it(n,t);let a=`/api/media_player_proxy/${encodeURIComponent(e)}?v=${j(t)}`;if(ze.has(a))return ze.get(a);try{let r=await n.fetchWithAuth(a);if(!r?.ok)throw new Error(`cover proxy ${r?.status}`);let o=await r.blob(),l=URL.createObjectURL(o);return ze.set(a,l),l}catch{return""}}function pt(n,t,e){let i=t/100,s=e/100,a=(1-Math.abs(2*s-1))*i,r=(n%360+360)%360/60,o=a*(1-Math.abs(r%2-1)),l=[0,0,0];r<1?l=[a,o,0]:r<2?l=[o,a,0]:r<3?l=[0,a,o]:r<4?l=[0,o,a]:r<5?l=[o,0,a]:l=[a,0,o];let h=s-a/2;return l.map(c=>Math.round(w((c+h)*255,0,255)))}function Fi(n){let t=Ns(n),e=(t+42+j(n+"2")%40)%360,i=pt(t,72,58),s=pt(e,68,52);return{a1:`hsl(${t} 72% 58%)`,a2:`hsl(${e} 68% 52%)`,rgb1:i.join(","),rgb2:s.join(",")}}function Bi(n){let t=String(n).replace("#","").trim(),e=t.length===3?t.split("").map(i=>i+i).join(""):t;return/^[0-9a-f]{6}$/i.test(e)?[parseInt(e.slice(0,2),16),parseInt(e.slice(2,4),16),parseInt(e.slice(4,6),16)].join(","):null}function I(n,t="255,255,255"){let e=String(n||"").trim();if(/^#[0-9a-f]{3,8}$/i.test(e))return Bi(e.slice(0,7))||t;let i=e.match(/hsla?\(\s*([\d.]+)[,\s]+([\d.]+)%[,\s]+([\d.]+)%/i);if(i)return pt(Number(i[1]),Number(i[2]),Number(i[3])).join(",");let s=e.match(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/i);return s?`${s[1]},${s[2]},${s[3]}`:t}function Ue(n){let t=Bi(n);if(!t)return{h:0,s:0,l:50};let[e,i,s]=t.split(",").map(d=>Number(d)/255),a=Math.max(e,i,s),r=Math.min(e,i,s),o=(a+r)/2,l=a-r,h=0,c=0;return l!==0&&(c=l/(1-Math.abs(2*o-1)),a===e?h=(i-s)/l%6:a===i?h=(s-e)/l+2:h=(e-i)/l+4,h=(h*60+360)%360),{h,s:c*100,l:o*100}}function Ne(n,t,e=.5){let i=(t.h-n.h+540)%360-180,s=(n.h+i*e+360)%360,a=n.s+(t.s-n.s)*e,r=n.l+(t.l-n.l)*e;return{h:s,s:a,l:r,css:`hsl(${Math.round(s)} ${Math.round(w(a,25,92))}% ${Math.round(w(r,38,72))}%)`,rgb:pt(s,w(a,25,92),w(r,38,72)).join(",")}}var Dt=new Map,Bs=40;function Hs(n,t){let i=document.createElement("canvas");i.width=36,i.height=36;let s=i.getContext("2d",{willReadFrequently:!0});if(!s)return null;s.drawImage(n,0,0,36,36);let a=s.getImageData(0,0,36,36).data,r=new Map;for(let y=0;y<a.length;y+=4){if(a[y+3]<180)continue;let k=a[y],A=a[y+1],P=a[y+2],S=Math.max(k,A,P),T=Math.min(k,A,P),R=(S+T)/510,z=S===0?0:(S-T)/S;if(R<.12||R>.9||z<.14)continue;let O=0,U=S-T;U!==0&&(S===k?O=(A-P)/U%6:S===A?O=(P-k)/U+2:O=(k-A)/U+4,O=(O*60+360)%360);let W=Math.floor(O/18),nt=r.get(W)||{count:0,sat:0,light:0};nt.count+=1,nt.sat+=z,nt.light+=R,r.set(W,nt)}if(!r.size)return null;let o=[...r.entries()].map(([y,x])=>({hue:y*18+9,score:x.count*(.45+x.sat/x.count),sat:x.sat/x.count,light:x.light/x.count})).sort((y,x)=>x.score-y.score),l=o[0],h=o.find(y=>{let x=Math.abs(y.hue-l.hue);return Math.min(x,360-x)>28})||{hue:(l.hue+44)%360,sat:l.sat,light:l.light},c=y=>w(Math.round(y*100),42,88),d=Math.round(l.hue),p=Math.round(h.hue),f=c(l.sat+.08),u=c(h.sat+.05),m=w(Math.round(l.light*100)+12,46,66),_=w(Math.round(h.light*100)+8,40,60);return{a1:`hsl(${d} ${f}% ${m}%)`,a2:`hsl(${p} ${u}% ${_}%)`,rgb1:pt(d,f,m).join(","),rgb2:pt(p,u,_).join(","),h1:d,s1:f,l1:m,h2:p,s2:u,l2:_,seed:j(t||"")}}function Hi(n,t=""){if(!n)return Promise.resolve(null);if(Dt.has(n))return Dt.get(n);let e=new Promise(i=>{let s=new Image;s.crossOrigin="anonymous",s.decoding="async",s.onload=()=>{try{i(Hs(s,t))}catch{i(null)}},s.onerror=()=>i(null),s.src=n});return Dt.size>Bs&&Dt.clear(),Dt.set(n,e),e}var ji=new WeakMap;function js(){return typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches}function Vi(n){n.raf&&(window.cancelAnimationFrame(n.raf),n.raf=null),n.last=0}function Ki(n,t){if(t.raf)return;n.style.transition="none",n.style.willChange="transform",t.last=0;let e=i=>{if(!n.isConnected){t.raf=null;return}let s=window.innerWidth<=700?32:0;if(s&&t.lastPaint&&i-t.lastPaint<s){t.raf=window.requestAnimationFrame(e);return}t.lastPaint=i,t.last||(t.last=i);let a=Math.min(.1,(i-t.last)/1e3);t.last=i,t.angle=(t.angle+a*360/(16e3/1e3))%360,n.style.transform=`rotate(${t.angle}deg)`,t.raf=window.requestAnimationFrame(e)};t.raf=window.requestAnimationFrame(e)}function Ks(n,t){if(Vi(t),t.resetTimer&&(window.clearTimeout(t.resetTimer),t.resetTimer=null),!n.isConnected)return;if(!t.angle){n.style.transform="rotate(0deg)";return}let e=t.angle;n.style.transition="none",n.style.transform=`rotate(${e}deg)`,window.requestAnimationFrame(()=>{!n.isConnected||t.playing||(n.style.transition="transform 1.15s cubic-bezier(0.22, 1, 0.36, 1)",n.style.transform="rotate(0deg)",t.resetTimer=window.setTimeout(()=>{t.resetTimer=null,t.playing||(n.style.transition="none",n.style.willChange="auto",n.style.transform="rotate(0deg)")},1250))}),t.angle=0}function wt(n,t){if(!n)return;let e=ji.get(n);if(e||(e={angle:0,playing:!1,raf:null,last:0,lastPaint:0,resetTimer:null},ji.set(n,e)),js()){Vi(e),n.style.transition="none",n.style.willChange="auto",n.style.transform="rotate(0deg)",e.playing=!1;return}let i=!!t;if(e.playing===i){i&&Ki(n,e);return}e.playing=i,i?(e.resetTimer&&(window.clearTimeout(e.resetTimer),e.resetTimer=null),Ki(n,e)):Ks(n,e)}var kt=104,se=36,Wi=192,$t=Math.min(2,typeof window>"u"?1:window.devicePixelRatio||1),ft=new WeakMap,ae=["#7b5cff","#2ee6c5"];function re(n){let t=String(n||"").replace("#","");return t.length===3?[0,1,2].map(e=>parseInt(t[e]+t[e],16)):t.length===6?[0,2,4].map(e=>parseInt(t.slice(e,e+2),16)):[123,92,255]}function Vs(n,t,e){let i=re(n),s=re(t);return i.map((a,r)=>Math.round(a+(s[r]-a)*e))}function It(n,t){let[e,i,s]=n;return`rgba(${e}, ${i}, ${s}, ${t})`}function Ws(n,t,e){let i=ft.get(n);if(!i?.ctx)return;let{ctx:s}=i,a=i.size||kt,r=i.r0||33.5,o=i.dpr||$t;s.setTransform(o,0,0,o,0,0),s.clearRect(0,0,a,a);let l=a/2,h=Math.max(4,l-r-3),c=i.accent||ae,d=i.barCount||se,p=d/2,f=i.applyShadow!==!1;s.lineCap=i.cap||"round",s.shadowBlur=f?5+e*7:0;for(let u=0;u<d;u+=1){let m=w(t[u]||0,0,1),_=u/d*Math.PI*2-Math.PI/2,y=2.2+Math.pow(m,1.05)*h,x=Math.cos(_),k=Math.sin(_),A=Math.abs(u-p)/p,P=Vs(c[0],c[1],A),S=.5+m*.48,T=l+x*r,R=l+k*r,z=l+x*(r+y),O=l+k*(r+y),U=s.createLinearGradient(T,R,z,O);U.addColorStop(0,It(P,0)),U.addColorStop(.18,It(P,0)),U.addColorStop(.46,It(P,S*.52)),U.addColorStop(1,It(P,S)),s.strokeStyle=U,s.shadowColor=It(P,.12+e*.26),s.lineWidth=i.lineWidth||3,s.beginPath(),s.moveTo(T,R),s.lineTo(z,O),s.stroke();let W=w((A-.3)/.45,0,1);W>.01&&(s.shadowBlur=0,s.strokeStyle=`rgba(255, 255, 255, ${((.05+m*.24)*W).toFixed(2)})`,s.lineWidth=1.1,s.stroke(),s.shadowBlur=f?5+e*7:0)}s.shadowBlur=0,s.shadowColor="transparent"}function Gi(n){let t=ft.get(n);if(!t?.ctx)return;let e=t.size||kt,i=t.dpr||$t;t.ctx.setTransform(i,0,0,i,0,0),t.ctx.clearRect(0,0,e,e)}function Ie(n,t,e,i,s,a=!0){if(!n?.style)return;n.style.setProperty("--fab-beat",t.toFixed(4)),n.style.setProperty("--fab-beat-glow",e.toFixed(3));let r=s||n.querySelector?.(".fab-disc");if(r&&a){let o=i||ae,[l,h,c]=re(o[0]),[d,p,f]=re(o[1]);r.style.boxShadow=["0 10px 26px rgba(2, 6, 18, 0.46)",`0 0 26px rgba(${l}, ${h}, ${c}, ${(e*.92).toFixed(3)})`,`0 0 52px rgba(${d}, ${p}, ${f}, ${(e*.55).toFixed(3)})`].join(", ")}}function De(n,t){let e=ft.get(n);if(!e||(e.raf=0,!e.playing||!e.visible))return;if(!n.isConnected){e.playing=!1;return}let i=e.maxFps?1e3/e.maxFps:0;if(i&&e.lastPaint&&t-e.lastPaint<i){e.raf=requestAnimationFrame(u=>De(n,u));return}e.lastPaint=t;let s=e.position+Math.max(0,t-e.since)/1e3,a=s/e.period*Math.PI*2+e.phase,r=.5+.5*Math.sin(a),o=.5+.5*Math.sin(a+.55),l=Math.pow(.5+.5*Math.sin(a*2.15+e.phase*1.7),3),h=[],c=e.barCount||se,d=c/2;for(let u=0;u<d;u+=1){let m=u/(d-1),_=Math.sin(s*(4.6+e.hash%9*.25)+u*1.1+e.phase),y=Math.sin(s*(11.4+e.hash%5*.4)+u*2.3),x=.18*l*Math.pow(1-m,2.2),k;if(e.bands?.length&&e.bands.live){let P=m<.28?0:m<.55?1:2;k=(.1+.86*w(e.bands[P]||0,0,1))*(.58+.42*(.5+.5*_))*(.62+.38*(.5+.5*y))}else k=(.16+.68*Math.pow(1-m,1.05))*(.62+.38*(.5+.5*_)),k*=.55+.45*(.5+.5*y);let A=w(k+x+.04*e.energy,0,1);h[u]=A,h[c-1-u]=A}for(let u=0;u<c;u+=1){let m=e.smooth[u]||0,_=h[u]||0;e.smooth[u]=_>m?m+(_-m)*.72:m+(_-m)*.24}let p=Math.min(1,o*1.05+l*.4);Ws(n,e.smooth,p);let f=1+Math.min(.085,o*.05+l*.05);Ie(e.root,f,.16+Math.min(.46,o*.5+l*.26),e.accent,e.target,e.applyShadow),e.raf=requestAnimationFrame(u=>De(n,u))}function Gs(n,{clearNow:t=!1}={}){let e=ft.get(n);if(e){if(e.raf&&(cancelAnimationFrame(e.raf),e.raf=0),Ie(e.root,1,0,e.accent,e.target,e.applyShadow),e.smooth.fill(0),t){Gi(n);return}e.clearTimer=window.setTimeout(()=>{let i=ft.get(n);i&&!i.playing&&Gi(n)},460)}}function ne(n,t,e={}){if(!n||typeof n.getContext!="function")return;let i=ft.get(n);if(!i){let y=n.getContext("2d");if(!y)return;n.width=Math.round(kt*$t),n.height=Math.round(kt*$t),i={ctx:y,root:t,size:kt,r0:33.5,lineWidth:3,cap:"round",dpr:$t,maxFps:0,lastPaint:0,target:null,applyShadow:!0,playing:!1,visible:!0,position:0,lastPosition:null,since:0,hash:0,period:2,phase:0,energy:.6,bands:null,accent:ae,smooth:new Array(Wi).fill(0),barCount:se,raf:0,clearTimer:0},ft.set(n,i)}let s=Array.isArray(e.accent)&&e.accent.length>=2?[e.accent[0],e.accent[1]]:ae,a=Math.max(104,Number(e.maxSize)||360),r=Math.max(72,Math.min(a,Math.round(Number(e.size)||kt))),o=Number(e.innerRadius);i.accent=s,i.root=t,i.size=r,i.r0=Number.isFinite(o)?o:r*.322,i.lineWidth=Math.max(1.6,Math.min(5,Number(e.lineWidth)||3)),i.cap=e.cap==="butt"?"butt":"round";let l=Math.round(Number(e.bars)||se),h=Math.max(24,Math.min(Wi,l-l%2));i.barCount!==h&&(i.barCount=h,i.smooth.fill(0)),i.target=e.target||null,i.bands=Array.isArray(e.bands)&&e.bands.length?e.bands:null,i.applyShadow=e.applyShadow!==!1,i.maxFps=Math.max(0,Number(e.maxFps)||0);let c=Math.min(2,Math.max(1,Number(e.dpr)||$t));i.dpr=c,n.width!==Math.round(r*c)&&(n.width=Math.round(r*c),n.height=Math.round(r*c)),i.clearTimer&&(window.clearTimeout(i.clearTimer),i.clearTimer=0),i.root=t||i.root;let d=!!e.playing,p=typeof n.getClientRects=="function"?n.getClientRects().length>0:!0,f=e.visible!==!1&&p,u=i.playing,m=Number(e.position);Number.isFinite(m)&&m>=0&&((i.lastPosition==null||Math.abs(m-i.lastPosition)>.25||!u&&d)&&(i.position=m,i.since=performance.now()),i.lastPosition=m);let _=[e.title,e.artist,e.album].filter(Boolean).join("|")||"ha-music";if(i.hash=j(_),i.period=1.7+(i.hash>>>8)%90/100,i.phase=i.hash%360/360*Math.PI*2,i.energy=.55+(i.hash>>>16)%100/220,i.playing=d,i.visible=f,!d||!f){Gs(n,{clearNow:!f});return}i.raf||(Ie(i.root,1,0,i.accent,i.target,i.applyShadow),i.since=performance.now(),i.lastPaint=0,i.raf=requestAnimationFrame(y=>De(n,y)))}var le="haMusicMiniPlayer",rs="haMusicMiniPositions",St=new Set(["top","sidebar","fab"]),Be="ha-music-dock-pref-changed";function Mt(n){return typeof n=="string"&&L[n]?n:N}function V(n){if(!n||typeof n!="object"||Array.isArray(n))return{};let t={};for(let e of St)L[n[e]]&&(t[e]=n[e]);return t}function Qs(n,t){if(!n)return;let e=Mt(t);if(n.dataset.theme===e&&n.dataset.hmThemeReady==="1")return;let i=L[e];n.dataset.theme=e,n.style.setProperty("--hm-accent",i.accent[0]),n.style.setProperty("--hm-accent-2",i.accent[1]),n.style.setProperty("--hm-accent-rgb",I(i.accent[0],"46,230,197")),n.style.setProperty("--hm-accent-2-rgb",I(i.accent[1],"123,92,255")),n.style.setProperty("--hm-base-rgb",I(i.base,"5,10,18")),n.style.setProperty("--hm-glow",String(i.glow??1)),n.dataset.hmThemeReady="1"}function He(){try{let n=window.localStorage.getItem(rs);if(!n)return{};let t=JSON.parse(n);return t&&typeof t=="object"&&!Array.isArray(t)?t:{}}catch{return{}}}function Fe(n,t,e){if(St.has(n))try{let i=He();i[n]={x:Number(t.toFixed(4)),y:Number(e.toFixed(4))},window.localStorage.setItem(rs,JSON.stringify(i))}catch{}}var Qi='<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path d="M14.5 5.2l4.6-1v9.1a3 3 0 1 1-1.8-2.7V7.1l-2.8.6v7.7a3 3 0 1 1-1.8-2.7V5.2z" fill="currentColor"/></svg>',Yi='<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" fill="currentColor"/></svg>',Xi='<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false"><path d="M16 6h2v12h-2zM6 6l8.5 6L6 18z" fill="currentColor"/></svg>',oe='<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>',Ys='<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false"><path d="M6 5h4v14H6zM14 5h4v14h-4z" fill="currentColor"/></svg>';var Xs='<svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true" focusable="false"><path d="M6.7 9.3L12 14.6l5.3-5.3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';var ns=new Set(["HA-SIDEBAR","ASIDE"]);function st(n,t=1,e=1){return!!(n&&n.width>=t&&n.height>=e&&n.bottom>0&&n.right>0)}function os(n,t,e,i=0){if(!n||i>8)return;let s=n.querySelectorAll?n.querySelectorAll("*"):[];for(let a of s){try{t(a)&&e.push(a)}catch{}a.shadowRoot&&os(a.shadowRoot,t,e,i+1)}}function at(n){let t=[];return os(document,n,t),t}function Js(n){let t=at(i=>n.has(i.tagName)),e=null;for(let i of t){let s=i.getBoundingClientRect();st(s,24,24)&&(!e||s.width*s.height>e.width*e.height)&&(e={left:s.left,top:s.top,width:s.width,height:s.height,right:s.right,bottom:s.bottom})}return e}function Ft(){let n=at(i=>{if(i.tagName==="BODY"||i.tagName==="HTML")return!1;let s=i.getBoundingClientRect();return!st(s,200,36)||s.top>8||s.height>150?!1:i.classList?.contains("top-app-bar")||i.classList?.contains("app-header")||i.tagName==="HA-TOP-APP-BAR"||i.tagName==="HA-TOP-APP-BAR-FIXED"}),t=null;for(let i of n){let s=i.getBoundingClientRect();s.height>150||(!t||s.width*s.height>t.width*t.height)&&(t={left:s.left,top:s.top,width:s.width,height:s.height,right:s.right,bottom:s.bottom})}if(t)return t;let e=at(i=>{if(i.tagName==="BODY"||i.tagName==="HTML")return!1;let s=i.getBoundingClientRect();if(!st(s,240,36)||s.top>8||s.height>92)return!1;let a=`${i.tagName} ${i.id} ${i.className||""}`.toLowerCase();return/top-app-bar|app-header|navbar|\bheader\b/.test(a)});for(let i of e){let s=i.getBoundingClientRect();if(s.height<=92)return{left:s.left,top:s.top,width:s.width,height:s.height,right:s.right,bottom:s.bottom}}return null}function he(n){if(!n)return null;let t=at(i=>{if(i.tagName==="BODY"||i.tagName==="HTML"||typeof i.getBoundingClientRect!="function")return!1;let s=i.getBoundingClientRect();if(!st(s,16,16)||s.width>88||s.height>64||s.left<n.left-2||s.right>n.right+2||s.top<n.top-4||s.bottom>n.bottom+4)return!1;let a=[i.getAttribute?.("aria-label"),i.getAttribute?.("title"),i.getAttribute?.("icon"),i.id,i.className].filter(Boolean).join(" ").toLowerCase();return/remove|delete|close|unpin|关闭|删除/.test(a)?!1:/(mdi:(plus|add)|plus|add|create|添加|新增|新建)/.test(a)}),e=null;for(let i of t){let s=i.getBoundingClientRect(),a=s.width*s.height;(!e||a>e.area||a===e.area&&s.right>e.rect.right)&&(e={rect:s,area:a})}return e?.rect||null}function Zs(n){if(!n)return null;let t=at(i=>{if(i.tagName==="BODY"||i.tagName==="HTML"||typeof i.getBoundingClientRect!="function")return!1;let s=i.getBoundingClientRect();if(!st(s,16,16)||s.height>72||s.width>n.width+2||s.left<n.left-2||s.right>n.right+2||s.top<n.top||s.bottom>n.bottom+2||s.top<n.top+n.height*.45)return!1;let a=[i.getAttribute?.("aria-label"),i.getAttribute?.("title"),i.getAttribute?.("icon"),i.id,i.className].filter(Boolean).join(" ").toLowerCase();return/remove|delete|close|关闭|删除/.test(a)?!1:/(settings|设置|cog|gear)/.test(a)}),e=null;for(let i of t){let s=i.getBoundingClientRect();(!e||s.top>e.top)&&(e={top:s.top,rect:s})}return e?.rect||null}function ls(){let n=Js(ns);if(n)return n;let t=at(i=>{if(i.tagName==="BODY"||i.tagName==="HTML")return!1;let s=i.getBoundingClientRect();if(!st(s,40,240)||s.left>8)return!1;let a=`${i.tagName} ${i.id} ${i.className||""}`.toLowerCase();return/sidebar|navigation|nav-drawer/.test(a)}),e=null;for(let i of t){let s=i.getBoundingClientRect();(!e||s.height>e.height)&&(e={left:s.left,top:s.top,width:s.width,height:s.height,right:s.right,bottom:s.bottom})}return e}function Ji(){let n=at(e=>{if(e.tagName==="BODY"||e.tagName==="HTML")return!1;let i=e.getBoundingClientRect();return!st(i,200,36)||i.top>8||i.height>150?!1:e.classList?.contains("top-app-bar")||e.classList?.contains("app-header")||e.tagName==="HA-TOP-APP-BAR"||e.tagName==="HA-TOP-APP-BAR-FIXED"}),t=null;for(let e of n){let i=e.getBoundingClientRect();i.height>150||(!t||i.width*i.height>t.area)&&(t={node:e,area:i.width*i.height})}return t?.node||null}function Zi(){let n=at(e=>ns.has(e.tagName)),t=null;for(let e of n){let i=e.getBoundingClientRect();st(i,24,120)&&(!t||i.height>t.height)&&(t={node:e,height:i.height})}return t?.node||null}function ts(n){let t=Math.round(window.innerWidth||0),e=Math.round(window.innerHeight||0);if(n==="top"){let i=Ft(),s=i?.height||56,a=i?.top||0;return{left:i?.left||0,top:a,width:i?.width||t,height:Math.max(40,Math.min(72,s)),right:(i?.left||0)+(i?.width||t),bottom:a+Math.max(40,Math.min(72,s))}}if(n==="sidebar"){let i=ls();if(i)return i;let s=Ft()?.height||56;return{left:0,top:s,width:256,height:Math.max(240,e-s),right:256,bottom:e}}return null}var ce=12;function je(){let n=Math.round(window.innerWidth||0),t=Math.round(window.innerHeight||0),e=Ft(),i=ls(),s=i&&i.height>=t*.4?i.right+ce:0,a=e&&e.width>=n*.5?e.bottom+ce:0;return{vw:n,vh:t,minX:s,minY:a}}function es(n,t,e,i,s=je()){let{vw:a,vh:r,minX:o,minY:l}=s,h=Math.max(o,a-e-ce),c=Math.max(l,r-i-ce);return{x:F(n,o,h),y:F(t,l,c)}}function F(n,t,e){return e<t?t:Math.max(t,Math.min(e,n))}function is(n){return n==="top"||n==="sidebar"?8:24}var ss=`
  :host {
    position: fixed;
    inset: 0;
    z-index: 2147483000;
    pointer-events: none;
    --hm-accent: #2ee6c5;
    --hm-accent-2: #7b5cff;
    --hm-accent-rgb: 46,230,197;
    --hm-accent-2-rgb: 123,92,255;
    --hm-base-rgb: 5,10,18;
    --hm-glow: 1;
  }
  * { box-sizing: border-box; }
  .mini {
    pointer-events: auto;
    position: fixed;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 7px 9px 9px;
    border: 1px solid rgba(var(--hm-accent-rgb), 0.3);
    border-radius: 16px;
    background:
      linear-gradient(135deg, rgba(var(--hm-accent-rgb), 0.14), rgba(var(--hm-accent-2-rgb), 0.14)),
      rgba(var(--hm-base-rgb), 0.82);
    box-shadow:
      0 14px 38px rgba(0, 0, 0, 0.4),
      0 0 20px -6px rgba(var(--hm-accent-rgb), 0.4);
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
    border-color: rgba(var(--hm-accent-rgb), 0.5);
    box-shadow:
      0 16px 40px rgba(0, 0, 0, 0.46),
      0 0 26px -6px rgba(var(--hm-accent-rgb), 0.5);
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
    width: var(--hm-sidebar-compact-size, 56px);
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
  .mini[data-theme="liquid"] {
    backdrop-filter: blur(22px) saturate(1.45);
    -webkit-backdrop-filter: blur(22px) saturate(1.45);
  }
  .mini[data-theme="cyber"] {
    border-style: double;
    border-width: 2px;
  }
  .mini[data-theme="mono"] {
    filter: saturate(0.35);
  }
  .mini[data-theme="sunset"] .progress span {
    background: linear-gradient(90deg, #ffa45c, #ff4d8d);
  }
  .mini[data-theme="ocean"] .progress span {
    background: linear-gradient(90deg, #39d0ff, #2f7bff);
  }
  .mini[data-mode="fab"] {
    right: max(16px, env(safe-area-inset-right, 0px));
    bottom: calc(env(safe-area-inset-bottom, 0px) + 18px);
    width: min(300px, calc(100vw - 32px));
  }
  .art {
    position: relative;
    width: 36px;
    height: 36px;
    flex: 0 0 auto;
    border-radius: 50%;
    overflow: hidden;
    clip-path: circle(50% at 50% 50%);
    display: grid;
    place-items: center;
    color: var(--hm-accent);
    background: linear-gradient(135deg, rgba(var(--hm-accent-rgb), 0.2), rgba(var(--hm-accent-2-rgb), 0.26));
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
  .art .fallback {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    overflow: hidden;
    border-radius: 50%;
    background:
      radial-gradient(circle at 50% 42%, rgba(var(--hm-accent-rgb), 0.58) 0 7%, rgba(var(--hm-accent-rgb), 0.18) 21%, transparent 46%),
      conic-gradient(from 215deg at 50% 50%, rgba(var(--hm-accent-2-rgb), 0.48), rgba(7, 11, 21, 0.94) 29%, rgba(var(--hm-accent-rgb), 0.36) 62%, rgba(7, 11, 21, 0.96));
    color: rgba(255, 255, 255, 0.9);
  }
  .art .fallback::before,
  .art .fallback::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
  }
  .art .fallback::before {
    inset: 13%;
    border: 1px solid rgba(255, 255, 255, 0.16);
    box-shadow:
      0 0 0 7px rgba(255, 255, 255, 0.025),
      inset 0 0 18px rgba(var(--hm-accent-rgb), 0.24);
  }
  .art .fallback::after {
    inset: 31%;
    border: 1px solid rgba(var(--hm-accent-2-rgb), 0.42);
    background: rgba(5, 9, 18, 0.2);
  }
  .art .fallback svg {
    position: relative;
    z-index: 1;
    width: 34%;
    height: 34%;
    opacity: 0.92;
    filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.48));
  }
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
  .controls button:hover { background: rgba(var(--hm-accent-rgb), 0.13); color: var(--hm-accent); }
  .controls button:active { transform: scale(0.92); }
  .controls button:focus-visible {
    outline: 2px solid rgba(var(--hm-accent-rgb), 0.8);
    outline-offset: 2px;
  }
  .controls button[disabled] { opacity: 0.38; cursor: default; }
  .controls .toggle {
    width: 32px;
    height: 32px;
    border-radius: 10px;
    color: var(--hm-accent);
    background: rgba(var(--hm-accent-rgb), 0.15);
  }
  .controls .toggle:hover { background: rgba(var(--hm-accent-rgb), 0.24); }
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
    border: 1px solid rgba(var(--hm-accent-2-rgb), 0.36);
    border-radius: 18px;
    background:
      linear-gradient(104deg, rgba(var(--hm-base-rgb), 0.6) 0%, rgba(var(--hm-base-rgb), 0.5) 48%, rgba(var(--hm-accent-2-rgb), 0.16) 100%),
      rgba(var(--hm-base-rgb), 0.66);
    box-shadow:
      0 16px 40px rgba(2, 6, 18, 0.62),
      0 0 0 1px rgba(255, 255, 255, 0.04) inset,
      0 0 28px rgba(var(--hm-accent-2-rgb), 0.2);
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
  /* \u5531\u7247\u73AF\u5F62\u97F3\u9891\u5F8B\u52A8\u53C2\u8003\u5B9E\u73B0\uFF1A36 \u6839\u67F1\u56F4\u7ED5\u5531\u7247\uFF0C12 \u70B9\u4F4E\u9891\u30016 \u70B9\u9AD8\u9891\u3002 */
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
    background: rgba(var(--hm-base-rgb), 0.9);
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
    background: conic-gradient(from 30deg, rgba(var(--hm-accent-rgb), 0.85), rgba(var(--hm-accent-2-rgb), 0.9), rgba(var(--hm-accent-rgb), 0.55), rgba(var(--hm-accent-rgb), 0.85));
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
    outline: 2px solid rgba(var(--hm-accent-rgb), 0.8);
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
    border: 1px solid rgba(var(--hm-accent-2-rgb), 0.5);
    border-radius: 7px;
    display: grid;
    place-items: center;
    background: rgba(var(--hm-base-rgb), 0.78);
    color: var(--hm-accent-2);
    box-shadow: 0 4px 12px rgba(2, 6, 18, 0.46);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  .fab-quick:hover { background: rgba(var(--hm-accent-2-rgb), 0.42); color: #fff; }
  .fab-quick:active { transform: scale(0.92); }
  .fab-quick:focus-visible { outline: 2px solid rgba(var(--hm-accent-rgb), 0.8); outline-offset: 2px; }
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
  .fab-collapse:hover { color: var(--hm-accent); background: rgba(var(--hm-accent-rgb), 0.12); }
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
  .fab-panel .progress span { box-shadow: 0 0 8px rgba(var(--hm-accent-rgb), 0.55); }
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
    width: 56px;
    height: 56px;
    min-width: 0;
    min-height: 0;
    padding: 2px;
    gap: 0;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    justify-content: center;
    overflow: hidden;
  }
  .mini[data-mode][data-folded="true"] .meta,
  .mini[data-mode][data-folded="true"] .controls,
  .mini[data-mode][data-folded="true"] .progress { display: none; }
  .mini[data-mode][data-folded="true"] .art {
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    max-width: none;
    max-height: none;
    border-radius: 50%;
    flex: 0 0 auto;
  }
  @keyframes fabRingSpin {
    to { transform: rotate(1turn); }
  }
  @media (prefers-reduced-motion: reduce) {
    .mini, .controls button, .progress span { transition: none; }
  }
`;function B(n){return n===!0||n==="1"?["top"]:Array.isArray(n)?[...new Set(n.map(t=>String(t)).filter(t=>St.has(t)))]:typeof n!="string"||!n||n==="none"?[]:n.includes(",")?[...new Set(n.split(",").map(t=>t.trim()).filter(t=>St.has(t)))]:St.has(n)?[n]:[]}function hs(n){return B(n)[0]||"none"}function Bt(n){return typeof n=="string"&&n.startsWith("media_player.")?n:""}function rt(n){if(!n||typeof n!="object"||Array.isArray(n))return{};let t={};for(let e of St){let i=Bt(n[e]);i&&(t[e]=i)}return t}function gt(){if(typeof document>"u")return null;let n=document.querySelector("home-assistant");if(n?.hass?.states)return n.hass;let t=n?.shadowRoot?.querySelector("home-assistant-main");if(t?.hass?.states)return t.hass;let e=document.querySelector("ha-music");return e?.hass?.states?e.hass:null}function K(){try{let n=window.localStorage.getItem(le);if(!n)return null;let t=JSON.parse(n),e=B(t?.modes??t?.mode),i=rt(t?.entities),s=V(t?.themes),a=Number(t?.updated)||0,r=t?.disabled===!0,o=Bt(t?.entity);o&&e[0]&&!i[e[0]]&&(i[e[0]]=o);let l=e.filter(h=>i[h]);return l.length?{modes:l,entities:i,themes:s,disabled:!1,updated:a}:r?{modes:[],entities:i,themes:s,disabled:!0,updated:a}:null}catch{return null}}function as(n){let t=B(n?.modes??n?.mode),e=rt(n?.entities),i=V(n?.themes),s={};for(let r of Object.keys(e).sort())s[r]=e[r];let a={};for(let r of Object.keys(i).sort())a[r]=i[r];return JSON.stringify({modes:t,entities:s,themes:a,disabled:n?.disabled===!0})}function ta(n){if(!(typeof window>"u"))try{window.dispatchEvent(new CustomEvent(Be,{detail:n}))}catch{}}function de(n={}){try{let t=B(n.modes??n.mode),e=rt(n.entities),i=V(n.themes),s=Number(n.updated)||Date.now(),a=Bt(n.entity);a&&t[0]&&!e[t[0]]&&(e[t[0]]=a);let r=t.filter(c=>e[c]),o=r.length>0?{modes:r,entities:e,themes:i,disabled:!1,updated:s}:{modes:[],entities:e,themes:i,disabled:!0,updated:s},l=window.localStorage.getItem(le),h=l?JSON.parse(l):null;if(h&&as(h)===as(o))return;window.localStorage.setItem(le,JSON.stringify(o)),ta(o)}catch{}}function cs(n){if(typeof window>"u")return()=>{};let t=i=>{try{n(i.detail||K())}catch{}},e=i=>{if(i.key===le)try{n(K())}catch{}};return window.addEventListener(Be,t),window.addEventListener("storage",e),()=>{window.removeEventListener(Be,t),window.removeEventListener("storage",e)}}function ue(n){if(typeof document>"u")return;let t=window.__haMusicDocks;if(t&&typeof t.get=="function"){if(n)t.get(n)?.remove(),t.delete(n);else{for(let e of t.values())e.remove();t.clear()}window.__haMusicDock=t.values().next().value||null;return}window.__haMusicDock?.remove(),window.__haMusicDock=null}function Ht(n=[]){if(typeof window>"u"||typeof document>"u")return[];let t=[];for(let s of Array.isArray(n)?n:[n]){let a=hs(s?.mode),r=Bt(s?.entity);a==="none"||!r||t.push({mode:a,entity:r,hass:s?.hass||null,theme:Mt(s?.theme)})}if(!t.length)return ue(),[];if(!document.body)return document.addEventListener("DOMContentLoaded",()=>Ht(t),{once:!0}),[];let e=window.__haMusicDocks instanceof Map?window.__haMusicDocks:new Map,i=new Map(t.map(s=>[s.mode,s]));for(let[s,a]of e)i.has(s)||(a.remove(),e.delete(s));for(let[s,a]of i){let r=e.get(s);r?r.update(a):(r=document.createElement("ha-music-mini"),r.update(a),document.body.appendChild(r),e.set(s,r))}return window.__haMusicDocks=e,window.__haMusicDock=e.values().next().value||null,[...e.values()]}var Ke=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this._mode="top",this._theme=N,this._open=!1,this._folded=!1,this._entity="",this._artSource="",this._artAppliedSource=null,this._artSeq=0,this._iconState="",this._disabledState=null,this._clockKey="",this._clockAt=0,this._clockBase=0,this._clockStamp="",this._hass=null,this._poll=null,this._press=null,this._pressTimer=null,this._drag=null,this._dragging=!1,this._suppressClick=!1,this._clickTimer=null,this._onClick=t=>this._handleClick(t),this._onRoute=()=>this._sync(),this._onPointerDown=t=>this._handlePointerDown(t),this._onPointerMove=t=>this._handlePointerMove(t),this._onPointerUp=t=>this._handlePointerUp(t),this._onPointerCancel=t=>this._handlePointerCancel(t),this._onContextMenu=t=>this._handleContextMenu(t),this._onDragStart=t=>{t.preventDefault(),t.stopPropagation()},this._onResize=()=>{this._applySavedPosition(),this._watchDockBounds()},this._boundsObserver=null,this._boundsRaf=null,this._boundsNodes=0,this._sync=this._sync.bind(this)}update(t={}){let e=hs(t.mode),i=Bt(t.entity),s=Mt(t.theme),a=e!==this._mode,r=a||i!==this._entity||s!==this._theme;this._mode=e,this._theme=s,a&&(this._open=!1,this._folded=!1),this._entity=i,t.hass?.states&&(this._hass=t.hass),r&&(this._artAppliedSource=null,this._iconState="",this._disabledState=null),(!this.shadowRoot.childElementCount||a)&&this._render(),this._sync(),r&&(this._applySavedPosition(),this._watchDockBounds())}connectedCallback(){this.shadowRoot.childElementCount||this._render(),this.shadowRoot.addEventListener("click",this._onClick),this.shadowRoot.addEventListener("pointerdown",this._onPointerDown),this.shadowRoot.addEventListener("pointermove",this._onPointerMove),this.shadowRoot.addEventListener("pointerup",this._onPointerUp),this.shadowRoot.addEventListener("pointercancel",this._onPointerCancel),this.shadowRoot.addEventListener("contextmenu",this._onContextMenu),this.shadowRoot.addEventListener("dragstart",this._onDragStart,!0),window.addEventListener("resize",this._onResize),window.addEventListener("location-changed",this._onRoute),this._startPolling(),this._sync(),window.requestAnimationFrame(()=>{this._applySavedPosition(),this._watchDockBounds()})}disconnectedCallback(){this.shadowRoot.removeEventListener("click",this._onClick),this.shadowRoot.removeEventListener("pointerdown",this._onPointerDown),this.shadowRoot.removeEventListener("pointermove",this._onPointerMove),this.shadowRoot.removeEventListener("pointerup",this._onPointerUp),this.shadowRoot.removeEventListener("pointercancel",this._onPointerCancel),this.shadowRoot.removeEventListener("contextmenu",this._onContextMenu),this.shadowRoot.removeEventListener("dragstart",this._onDragStart,!0),window.removeEventListener("resize",this._onResize),window.removeEventListener("location-changed",this._onRoute),this._boundsObserver&&(this._boundsObserver.disconnect(),this._boundsObserver=null),this._boundsRaf&&(cancelAnimationFrame(this._boundsRaf),this._boundsRaf=null),this._boundsNodes=0,this._poll&&clearInterval(this._poll),this._poll=null}_startPolling(){this._poll||(this._poll=window.setInterval(()=>{let t=gt()||this._hass;t?.states&&(this._hass=t,this._sync()),this._boundsNodes||this._watchDockBounds()},500))}_watchDockBounds(){if(typeof ResizeObserver>"u")return;let t=[];if(this._mode==="top"?t=[Ji()].filter(Boolean):this._mode==="sidebar"?t=[Zi()].filter(Boolean):this._mode==="fab"&&(t=[Ji(),Zi()].filter(Boolean)),!t.length){this._boundsNodes=0;return}this._boundsObserver&&this._boundsObserver.disconnect(),this._boundsNodes=t.length,this._boundsObserver=new ResizeObserver(()=>{this._dragging||this._boundsRaf||(this._boundsRaf=window.requestAnimationFrame(()=>{this._boundsRaf=null,this._applySavedPosition()}))});for(let e of t)this._boundsObserver.observe(e)}_render(){if(this._eq=null,this._mode==="fab")return this._renderFab();this.shadowRoot.innerHTML=`
      <style>${ss}</style>
      <div class="mini" data-mode="${this._mode}" role="region" aria-label="HA Music \u8FF7\u4F60\u64AD\u653E\u5668">
        <div class="art">
          <img alt="" draggable="false" />
          <span class="fallback">${Qi}</span>
        </div>
        <div class="meta">
          <div class="title">\u9009\u62E9\u64AD\u653E\u5668</div>
          <div class="sub">\u5728\u5361\u7247\u7F16\u8F91\u5668\u4E2D\u9009\u62E9\u4F4D\u7F6E</div>
        </div>
        <div class="controls">
          <button data-act="prev" type="button" aria-label="\u4E0A\u4E00\u9996">${Yi}</button>
          <button class="toggle" data-act="toggle" type="button" aria-label="\u64AD\u653E">${oe}</button>
          <button data-act="next" type="button" aria-label="\u4E0B\u4E00\u9996">${Xi}</button>
        </div>
        <div class="progress"><span></span></div>
      </div>
    `,this._mini=this.shadowRoot.querySelector(".mini"),this._art=this.shadowRoot.querySelector(".art img"),this._fallback=this.shadowRoot.querySelector(".fallback"),this._title=this.shadowRoot.querySelector(".title"),this._sub=this.shadowRoot.querySelector(".sub"),this._toggle=this.shadowRoot.querySelector(".toggle"),this._prev=this.shadowRoot.querySelector('[data-act="prev"]'),this._next=this.shadowRoot.querySelector('[data-act="next"]'),this._progress=this.shadowRoot.querySelector(".progress span"),this._disc=null,this._quick=null,this._art.addEventListener("error",()=>{this._art.removeAttribute("src"),this._fallback&&(this._fallback.style.display="grid"),this._mini?.style.removeProperty("--fab-cover")})}_renderFab(){this.shadowRoot.innerHTML=`
      <style>${ss}</style>
      <div class="mini mini-fab" data-mode="fab" data-open="${this._open?"true":"false"}" role="region" aria-label="HA Music \u60AC\u6D6E\u64AD\u653E\u5668">
        <div class="fab-orb">
          <button class="fab-disc" type="button" aria-label="\u5C55\u5F00\u64AD\u653E\u5668" aria-expanded="${this._open?"true":"false"}">
            <div class="art">
              <img alt="" draggable="false" />
              <span class="fallback">${Qi}</span>
            </div>
            <span class="fab-glow"></span>
          </button>
          <canvas class="fab-eq" aria-hidden="true"></canvas>
          <button class="fab-quick" data-act="toggle" type="button" aria-label="\u64AD\u653E">${oe}</button>
        </div>
        <div class="fab-panel">
          <div class="fab-head">
            <div class="meta">
              <div class="title">\u9009\u62E9\u64AD\u653E\u5668</div>
              <div class="sub">\u5728\u5361\u7247\u7F16\u8F91\u5668\u4E2D\u9009\u62E9\u4F4D\u7F6E</div>
            </div>
            <button class="fab-collapse" data-act="collapse" type="button" aria-label="\u6536\u8D77\u64AD\u653E\u5668">${Xs}</button>
          </div>
          <div class="progress"><span></span></div>
          <div class="controls">
            <button data-act="prev" type="button" aria-label="\u4E0A\u4E00\u9996">${Yi}</button>
            <button class="toggle" data-act="toggle" type="button" aria-label="\u64AD\u653E">${oe}</button>
            <button data-act="next" type="button" aria-label="\u4E0B\u4E00\u9996">${Xi}</button>
          </div>
        </div>
      </div>
    `,this._mini=this.shadowRoot.querySelector(".mini"),this._art=this.shadowRoot.querySelector(".art img"),this._fallback=this.shadowRoot.querySelector(".fallback"),this._title=this.shadowRoot.querySelector(".title"),this._sub=this.shadowRoot.querySelector(".sub"),this._toggle=this.shadowRoot.querySelector(".fab-panel .toggle"),this._prev=this.shadowRoot.querySelector('.fab-panel [data-act="prev"]'),this._next=this.shadowRoot.querySelector('.fab-panel [data-act="next"]'),this._progress=this.shadowRoot.querySelector(".fab-panel .progress span"),this._disc=this.shadowRoot.querySelector(".fab-disc"),this._quick=this.shadowRoot.querySelector(".fab-quick"),this._collapse=this.shadowRoot.querySelector(".fab-collapse"),this._eq=this.shadowRoot.querySelector(".fab-eq"),this._art.addEventListener("error",()=>{this._art.removeAttribute("src"),this._fallback&&(this._fallback.style.display="grid"),this._mini?.style.removeProperty("--fab-cover")})}_stateLabel(t){let e=!this._hass?.language||String(this._hass.language).startsWith("zh");return{playing:e?"\u64AD\u653E\u4E2D":"Playing",paused:e?"\u5DF2\u6682\u505C":"Paused",idle:e?"\u7A7A\u95F2":"Idle",off:e?"\u5DF2\u5173\u95ED":"Off",unavailable:e?"\u4E0D\u53EF\u7528":"Unavailable",unknown:e?"\u672A\u77E5":"Unknown"}[t]||t}_clearDockInlineStyles(){if(this._mini){for(let t of["left","top","right","bottom","width","height","max-height"])this._mini.style.removeProperty(t);this._mini.style.removeProperty("--hm-sidebar-compact-size"),delete this._mini.dataset.compact}}_applySavedPosition(){if(!this._mini||!this._mini.isConnected||this._dragging)return;let t=window.innerWidth<=700;if(this._mini.style.removeProperty("display"),this._mode==="sidebar"&&t){this._mini.style.display="none";return}if(this._mode==="fab"&&t){this._mini.style.display="none";return}if(this._mode==="fab"){let _=this._mini,y=_.getBoundingClientRect(),x=y.width||64,k=y.height||64,A=je(),P=He(),S=t?null:P.fab,T=A.vw-x-(t?12:24),R=A.vh-k-(t?14:24),z=es(S&&Number.isFinite(S.x)?S.x*window.innerWidth:T,S&&Number.isFinite(S.y)?S.y*window.innerHeight:R,x,k,A);_.style.left=`${Math.round(z.x)}px`,_.style.top=`${Math.round(z.y)}px`,_.style.right="auto",_.style.bottom="auto";return}let e=ts(this._mode);if(!e)return;let s=He()[this._mode],a=is(this._mode),r=this._mini;if(this._mode==="top"){if(this._folded){let S=Math.round(Math.min(44,Math.max(36,e.height-8)));r.style.width=`${S}px`,r.style.height=`${S}px`,r.style.removeProperty("max-height"),delete r.dataset.compact;let T=he(e),R=T?T.left-8-S:e.right-S-80,z=t?e.left+a:F(s&&Number.isFinite(s.x)?s.x*window.innerWidth:R,e.left+a,e.right-S-a);r.style.left=`${Math.round(z)}px`,r.style.top=`${Math.round(e.top+Math.max(2,(e.height-S)/2))}px`,r.style.right="auto",r.style.bottom="auto";return}let _=Math.round(Math.min(44,Math.max(38,e.height-8))),y=Math.max(150,e.width-a*2),x=t?Math.max(150,Math.min(374,window.innerWidth-16)):Math.round(Math.min(300,Math.max(200,e.width-140),y));r.style.width=`${x}px`,r.style.height=`${_}px`,r.style.removeProperty("max-height"),delete r.dataset.compact;let k=he(e),A=k?k.left-8-x:e.right-x-80,P=t?e.left+a:F(s&&Number.isFinite(s.x)?s.x*window.innerWidth:A,e.left+a,e.right-x-a);r.style.left=`${Math.round(P)}px`,r.style.top=`${Math.round(e.top+Math.max(2,(e.height-_)/2))}px`,r.style.right="auto",r.style.bottom="auto";return}let o=Math.round(Math.max(56,Math.min(236,e.width-16))),l=o<170,h=Math.round(Math.max(40,Math.min(56,e.width-4))),c=l?h:56;this._folded?(r.style.width=`${c}px`,r.style.height=`${c}px`,delete r.dataset.compact):l?(r.style.setProperty("--hm-sidebar-compact-size",`${h}px`),r.style.width=`${h}px`,r.style.height=`${h}px`,r.dataset.compact="true"):(r.style.removeProperty("--hm-sidebar-compact-size"),r.style.width=`${o}px`,r.style.height="auto",r.dataset.compact="false"),r.style.maxHeight=this._folded?`${c}px`:`${Math.max(56,e.height-16)}px`;let d=Math.round(e.left+(l?4:a));r.style.left=`${d}px`,r.style.right="auto",r.style.bottom="auto";let p=this._folded?c:r.getBoundingClientRect().height||58,f=Zs(e),u=f?f.top-8-p:e.bottom-p-148,m=F(s&&Number.isFinite(s.y)?s.y*window.innerHeight:u,e.top+a,e.bottom-p-a);r.style.top=`${Math.round(m)}px`}_saveCurrentPosition(){if(!this._mini)return;let t=this._mini.getBoundingClientRect();if(this._mode==="fab"){Fe("fab",F(t.left/Math.max(1,window.innerWidth),0,1),F(t.top/Math.max(1,window.innerHeight),0,1));return}if(this._mode==="top"){Fe(this._mode,F(t.left/Math.max(1,window.innerWidth),0,1),0);return}Fe(this._mode,0,F(t.top/Math.max(1,window.innerHeight),0,1))}_handlePointerDown(t){!this._mini||t.button!==0||t.isPrimary===!1||(this._clearPress(),this._press={pointerId:t.pointerId,x:t.clientX,y:t.clientY,long:!1,moved:!1},this._dragging=!1,this._suppressClick=!1,this._pressTimer=window.setTimeout(()=>{this._pressTimer=null,this._press&&this._beginDrag()},360))}_beginDrag(){if(!this._press||!this._mini)return;this._press.long=!0,this._dragging=!0;let t=this._mini.getBoundingClientRect();this._drag={left:t.left,top:t.top,width:t.width,height:t.height,x:this._press.x,y:this._press.y,bounds:this._mode==="fab"?je():ts(this._mode)},this._mini.dataset.dragging="true",this._mini.style.left=`${t.left}px`,this._mini.style.top=`${t.top}px`,this._mini.style.right="auto",this._mini.style.bottom="auto";try{this._mini.setPointerCapture(this._press.pointerId)}catch{}}_handlePointerMove(t){if(!this._press)return;let e=t.clientX-this._press.x,i=t.clientY-this._press.y;if(!this._dragging){Math.hypot(e,i)>8&&(this._press.moved=!0,this._pressTimer&&(window.clearTimeout(this._pressTimer),this._pressTimer=null));return}t.preventDefault();let s=this._drag.bounds;if(!s)return;let a=is(this._mode),r=this._drag.left,o=this._drag.top;if(this._mode==="top")r=F(this._drag.left+e,s.left+a,s.right-this._drag.width-a);else if(this._mode==="sidebar")o=F(this._drag.top+i,s.top+a,s.bottom-this._drag.height-a);else if(this._mode==="fab"){let l=es(this._drag.left+e,this._drag.top+i,this._drag.width,this._drag.height,s);r=l.x,o=l.y}this._mini.style.left=`${Math.round(r)}px`,this._mini.style.top=`${Math.round(o)}px`,this._mini.style.right="auto",this._mini.style.bottom="auto"}_handlePointerUp(){if(!this._press)return;let t=this._press.long,e=this._press.moved;this._pressTimer&&(window.clearTimeout(this._pressTimer),this._pressTimer=null),this._dragging&&(this._saveCurrentPosition(),this._releasePointer()),(this._dragging||t||e)&&(this._suppressClick=!0,window.setTimeout(()=>{this._suppressClick=!1},560)),this._dragging=!1,this._press=null,this._mini&&delete this._mini.dataset.dragging}_handlePointerCancel(){this._releasePointer(),this._clearPress(),this._dragging=!1,this._mini&&delete this._mini.dataset.dragging}_clearPress(){this._pressTimer&&(window.clearTimeout(this._pressTimer),this._pressTimer=null),this._press=null}_releasePointer(){let t=this._press?.pointerId;if(!(t===void 0||!this._mini))try{this._mini.releasePointerCapture(t)}catch{}}_handleContextMenu(t){(this._press||this._dragging)&&t.preventDefault()}_sync(){if(!this._mini)return;Qs(this._mini,this._theme),this._mini.dataset.mode!==this._mode&&(this._mini.dataset.mode=this._mode);let t=this._mode!=="fab"&&this._folded?"true":"false";if(this._mini.dataset.folded!==t&&(this._mini.dataset.folded=t),this._mode==="fab"){let _=this._open?"true":"false";this._mini.dataset.open!==_&&(this._mini.dataset.open=_)}if(!this._entity){this._clockKey="",this._clockAt=0,this._clockBase=0,this._mini.dataset.playing!=="false"&&(this._mini.dataset.playing="false"),this._title.textContent!=="\u9009\u62E9\u64AD\u653E\u5668"&&(this._title.textContent="\u9009\u62E9\u64AD\u653E\u5668"),this._sub.textContent!=="\u5728\u5361\u7247\u7F16\u8F91\u5668\u4E2D\u9009\u62E9\u4F4D\u7F6E"&&(this._sub.textContent="\u5728\u5361\u7247\u7F16\u8F91\u5668\u4E2D\u9009\u62E9\u4F4D\u7F6E"),this._setDisabled(!0),this._progress.style.width="0%",this._setArt(null),wt(this._art,!1),this._syncFabEq(!1,{},0);return}let e=gt()||this._hass;e?.states&&(this._hass=e);let i=this._hass?.states?.[this._entity];if(!i||i.state==="unavailable"||i.state==="unknown"){let _=i?.attributes?.friendly_name||this._entity;this._mini.dataset.playing!=="false"&&(this._mini.dataset.playing="false"),this._title.textContent!==_&&(this._title.textContent=_),this._sub.textContent!=="\u5B9E\u4F53\u4E0D\u53EF\u7528"&&(this._sub.textContent="\u5B9E\u4F53\u4E0D\u53EF\u7528"),this._setDisabled(!0),this._progress.style.width="0%",this._setArt(null),wt(this._art,!1),this._syncFabEq(!1,{},0);return}let a=i.attributes||{},r=a.media_title||a.friendly_name||this._entity;this._title.textContent!==r&&(this._title.textContent=r);let o=a.media_artist||a.media_album_name||"";o===r&&(o="");let l=this._stateLabel(i.state),h=o?`${o} \xB7 ${l}`:l;this._sub.textContent!==h&&(this._sub.textContent=h),this._setDisabled(!1);let c=i.state==="playing",d=c?"true":"false";this._mini.dataset.playing!==d&&(this._mini.dataset.playing=d);let p=c?"pause":"play";if(this._iconState!==p){this._iconState=p;let _=c?Ys:oe;this._toggle.innerHTML=_,this._toggle.setAttribute("aria-label",c?"\u6682\u505C":"\u64AD\u653E"),this._quick&&(this._quick.innerHTML=_,this._quick.setAttribute("aria-label",c?"\u6682\u505C":"\u64AD\u653E"))}if(this._disc){let _=this._open?"true":"false";this._disc.getAttribute("aria-expanded")!==_&&(this._disc.setAttribute("aria-label",this._open?"\u6536\u8D77\u64AD\u653E\u5668":"\u5C55\u5F00\u64AD\u653E\u5668"),this._disc.setAttribute("aria-expanded",_))}this._setArt(a.entity_picture),wt(this._art,c);let f=Number(a.media_duration||0),u=this._displayPosition(c,a,f);this._syncFabEq(c,a,u);let m=f>0?Math.min(100,Math.max(0,u/f*100)):0;this._progress.style.width=`${m}%`}_displayPosition(t,e={},i=0){let s=Number(e.media_position)||0,a=String(e.media_position_updated_at||""),r=a?Date.parse(a):NaN,o=[this._entity,e.media_title||"",e.media_artist||"",e.media_album_name||"",e.media_duration||0,e.media_content_id||""].join("|"),l=Date.now(),h=!!(this._clockKey&&this._clockKey!==o);h||!this._clockKey?(this._clockKey=o,this._clockAt=l,this._clockBase=h?0:s,this._clockStamp=a):Number.isFinite(r)?a!==this._clockStamp&&(this._clockBase=s,this._clockAt=Math.min(r,l),this._clockStamp=a):Math.abs(s-this._clockBase)>.05&&(this._clockBase=s,this._clockAt=l);let c=s;if(t){let d=Number.isFinite(r)?Math.min(r,l):this._clockAt||l;c=(Number.isFinite(r)?s:this._clockBase)+Math.max(0,(l-d)/1e3)}return i>0&&(c=Math.min(i,Math.max(0,c))),Math.max(0,c)}_syncFabEq(t,e={},i=0){this._eq&&ne(this._eq,this._mini,{playing:t,visible:!this._open,position:i,title:e.media_title,artist:e.media_artist,album:e.media_album_name,accent:L[this._theme]?.accent})}_setArt(t){if(!this._art)return;let e=t||"";if(this._artAppliedSource===e)return;this._artAppliedSource=e;let i=++this._artSeq;if(this._artSource=e,!e){this._clearArt();return}ie(this._hass,e,this._entity).then(s=>{if(!(i!==this._artSeq||this._artSource!==e)){if(!s){this._clearArt();return}try{let a=new URL(s,window.location.href).href;this._art.getAttribute("src")!==a&&(this._art.src=a),this._fallback&&(this._fallback.style.display="none"),this._mini?.style.setProperty("--fab-cover",`url(${JSON.stringify(a)})`)}catch{this._clearArt()}}})}_clearArt(){this._art?.removeAttribute("src"),this._fallback&&(this._fallback.style.display="grid"),this._mini?.style.removeProperty("--fab-cover")}_setDisabled(t){if(this._disabledState!==t){this._disabledState=t;for(let e of[this._prev,this._toggle,this._next,this._quick])e&&(e.disabled=t)}}_toggleOpen(){this._mode!=="fab"||!this._mini||(this._open=!this._open,this._mini.dataset.open=this._open?"true":"false",this._sync(),this._disc&&(this._disc.setAttribute("aria-label",this._open?"\u6536\u8D77\u64AD\u653E\u5668":"\u5C55\u5F00\u64AD\u653E\u5668"),this._disc.setAttribute("aria-expanded",this._open?"true":"false")),window.setTimeout(()=>this._applySavedPosition(),340))}_toggleFold(){if(this._mode==="fab"){this._toggleOpen();return}this._folded=!this._folded,this._sync(),window.setTimeout(()=>this._applySavedPosition(),340)}_handleClick(t){let e=t.target.closest?.("button[data-act]");if(e){if(e.disabled)return;t.preventDefault(),t.stopPropagation();let i=e.dataset.act;i==="collapse"?this._toggleOpen():i==="toggle"?this._call("media_play_pause"):i==="prev"?this._call("media_previous_track"):i==="next"&&this._call("media_next_track");return}if(this._suppressClick){this._suppressClick=!1;return}if(t.preventDefault(),this._clickTimer){window.clearTimeout(this._clickTimer),this._clickTimer=null,this._toggleFold();return}this._clickTimer=window.setTimeout(()=>{this._clickTimer=null,this._call("media_play_pause")},280)}_call(t){if(!this._hass||!this._entity)return;let e=this._hass.callService("media_player",t,{entity_id:this._entity});e?.catch&&e.catch(i=>console.warn("ha-music mini player:",i))}};customElements.get("ha-music-mini")||customElements.define("ha-music-mini",Ke);var Ve="haMusicLyricDock",ds="haMusicLyricDockPos",ea=360;function J(n,t,e){return e<t?t:Math.min(e,Math.max(t,n))}function ia(n,t=""){let e=n?.states||{},i="",s=-1/0;for(let[a,r]of Object.entries(e)){if(!a.startsWith("media_player.")||!r||["unavailable","unknown","off"].includes(r.state))continue;let o=r.attributes||{},l=String(o.media_title||o.friendly_name||""),h=0;r.state==="playing"?h+=100:r.state==="paused"?h+=60:r.state==="buffering"&&(h+=40),a===t&&(h+=30),l&&(h+=10),h>s&&(i=a,s=h)}return i||(t&&e[t]&&e[t].attributes?.media_title?t:"")}function us(){try{let n=window.localStorage.getItem(ds);if(!n)return{};let t=JSON.parse(n);return t&&typeof t=="object"&&!Array.isArray(t)?t:{}}catch{return{}}}function sa(n,t){try{let e=us();e.lyric={x:Number(J(n,0,1).toFixed(4)),y:Number(J(t,0,1).toFixed(4))},window.localStorage.setItem(ds,JSON.stringify(e))}catch{}}function pe(){try{let n=window.localStorage.getItem(Ve);if(!n)return null;let t=JSON.parse(n);return!t||typeof t!="object"||Array.isArray(t)?null:{enabled:t.enabled===!0,entity:typeof t.entity=="string"?t.entity:"",updated:Number(t.updated)||0}}catch{return null}}function Ge(n={}){try{let t=JSON.stringify({enabled:n.enabled===!0,entity:typeof n.entity=="string"?n.entity:"",updated:Number(n.updated)||Date.now()});if(window.localStorage.getItem(Ve)===t)return;window.localStorage.setItem(Ve,t)}catch{}}function me(){typeof document>"u"||(window.__haMusicLyricDock?.remove(),window.__haMusicLyricDock=null)}function jt(n={}){if(typeof window>"u"||typeof document>"u")return null;if(n.enabled===!1)return me(),null;if(!document.body)return document.addEventListener("DOMContentLoaded",()=>jt(n),{once:!0}),null;let t=window.__haMusicLyricDock;return(!t||!t.isConnected)&&(t=document.createElement("ha-music-lyric"),document.body.appendChild(t),window.__haMusicLyricDock=t),t.update(n),t}var aa=`
  :host {
    position: fixed;
    inset: 0;
    z-index: 2147483002;
    pointer-events: none;
    --hm-accent: #2ee6c5;
    --hm-accent-2: #7b5cff;
    --hm-accent-rgb: 46,230,197;
    --hm-accent-2-rgb: 123,92,255;
    --hm-base-rgb: 5,10,18;
    --hm-glow: 1;
  }
  * { box-sizing: border-box; }
  .lyric {
    pointer-events: auto;
    position: fixed;
    display: flex;
    align-items: center;
    gap: 9px;
    max-width: min(760px, calc(100vw - 32px));
    min-width: 0;
    padding: 10px 18px 10px 14px;
    border: 1px solid rgba(var(--hm-accent-rgb), 0.42);
    border-radius: 999px;
    overflow: hidden;
    color: #f5fbff;
    background:
      linear-gradient(112deg, rgba(var(--hm-accent-rgb), 0.22), rgba(var(--hm-accent-2-rgb), 0.22)),
      rgba(var(--hm-base-rgb), 0.82);
    box-shadow:
      0 14px 38px rgba(0, 0, 0, 0.42),
      0 0 26px -6px rgba(var(--hm-accent-rgb), 0.48),
      inset 0 0 0 1px rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(18px) saturate(1.3);
    -webkit-backdrop-filter: blur(18px) saturate(1.3);
    font-family: var(--ha-font-family, "Noto Sans SC", "PingFang SC", system-ui, sans-serif);
    font-size: clamp(13px, 1.25vw, 17px);
    font-weight: 600;
    line-height: 1.35;
    letter-spacing: 0.01em;
    user-select: none;
    -webkit-user-select: none;
    touch-action: none;
    cursor: grab;
    will-change: left, top;
  }
  .lyric::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(120deg, var(--hm-accent), var(--hm-accent-2));
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    mask-composite: exclude;
    opacity: 0.48;
    pointer-events: none;
  }
  .lyric::after {
    content: "";
    position: absolute;
    inset: -40% auto -40% -30%;
    width: 38%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.16), transparent);
    transform: rotate(12deg);
    pointer-events: none;
    opacity: 0.5;
  }
  .mark {
    flex: 0 0 auto;
    width: 3px;
    height: 16px;
    border-radius: 999px;
    background: linear-gradient(180deg, var(--hm-accent), var(--hm-accent-2));
    box-shadow: 0 0 10px rgba(var(--hm-accent-rgb), 0.7);
  }
  .text {
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-shadow: 0 0 16px rgba(var(--hm-accent-rgb), 0.28);
  }
  .lyric[data-empty="true"] {
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
  }
  .lyric[data-dragging="true"] {
    cursor: grabbing;
    box-shadow:
      0 18px 44px rgba(0, 0, 0, 0.52),
      0 0 34px -4px rgba(var(--hm-accent-rgb), 0.7);
  }
  .lyric[data-theme="liquid"] {
    background:
      linear-gradient(112deg, rgba(var(--hm-accent-rgb), 0.18), rgba(var(--hm-accent-2-rgb), 0.2)),
      rgba(var(--hm-base-rgb), 0.72);
  }
  .lyric[data-theme="cyber"] {
    border-style: double;
    border-width: 2px;
  }
  @media (max-width: 700px) {
    .lyric {
      max-width: calc(100vw - 24px);
      font-size: 13px;
    }
  }
  /* \u624B\u673A\u4E3B\u5361\u7247\u81EA\u5E26\u6B4C\u8BCD\u884C\uFF0C\u60AC\u6D6E\u6B4C\u8BCD\u5C42\u4F1A\u538B\u4F4F\u9876\u680F mini\uFF0C\u76F4\u63A5\u9690\u85CF\u3002 */
  @media (max-width: 700px) {
    .lyric { display: none !important; }
  }
  /* \u4E0D\u8981\u80F6\u56CA\u548C\u5E95\u677F\uFF1A\u53EA\u4FDD\u7559\u4E3B\u9898\u6E10\u53D8\u6B4C\u8BCD\u6587\u5B57\u3002 */
  .lyric[data-theme] {
    gap: 0;
    padding: 6px 10px;
    border: 0;
    border-radius: 0;
    background: none;
    box-shadow: none;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    overflow: visible;
  }
  .lyric[data-theme]::before,
  .lyric[data-theme]::after,
  .lyric[data-theme] .mark {
    display: none;
  }
  .lyric[data-theme][data-dragging="true"] {
    box-shadow: none;
  }
  .lyric[data-theme] .text {
    color: var(--hm-accent);
    font-weight: 700;
    letter-spacing: 0.02em;
    text-shadow: none;
    filter: drop-shadow(0 2px 5px rgba(var(--hm-base-rgb), 0.92));
  }
  @supports ((-webkit-background-clip: text) or (background-clip: text)) {
    .lyric[data-theme] .text {
      background-image: linear-gradient(100deg, var(--hm-accent), var(--hm-accent-2));
      background-size: 100% 100%;
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      -webkit-text-fill-color: transparent;
    }
  }
`,We=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this._theme=N,this._entity="",this._preferred="",this._auto=!0,this._source="auto",this._status="idle",this._hass=null,this._lines=[],this._plain=[],this._linesKey="",this._lyricsUnsub=null,this._lyricsPending=!1,this._lyricsSubKey="",this._lyricsIndex=-1,this._lyricsProgress=0,this._offset=0,this._poll=null,this._press=null,this._pressTimer=null,this._drag=null,this._dragging=!1,this._onPointerDown=t=>this._handlePointerDown(t),this._onPointerMove=t=>this._handlePointerMove(t),this._onPointerUp=()=>this._handlePointerUp(),this._onPointerCancel=()=>this._handlePointerCancel(),this._onContextMenu=t=>{(this._press||this._dragging)&&t.preventDefault()},this._onResize=()=>this._applyPosition(),this.shadowRoot.innerHTML=`
      <style>${aa}</style>
      <div class="lyric" data-empty="true" role="region" aria-label="\u5F53\u524D\u6B4C\u8BCD">
        <span class="text"></span>
      </div>
    `,this._pill=this.shadowRoot.querySelector(".lyric"),this._text=this.shadowRoot.querySelector(".text"),this.shadowRoot.addEventListener("pointerdown",this._onPointerDown),this.shadowRoot.addEventListener("pointermove",this._onPointerMove),this.shadowRoot.addEventListener("pointerup",this._onPointerUp),this.shadowRoot.addEventListener("pointercancel",this._onPointerCancel),this.shadowRoot.addEventListener("contextmenu",this._onContextMenu),this.shadowRoot.addEventListener("dragstart",t=>t.preventDefault())}update(t={}){if(t.enabled===!1){this.remove();return}t.auto!==void 0&&(this._auto=t.auto!==!1),t.source&&(this._source=String(t.source)),t.entity&&(this._preferred=t.entity,(!this._entity||!this._auto)&&(this._entity=t.entity)),Array.isArray(t.lines)&&(!this._auto||!t.entity||t.entity===this._entity)&&this._setLines(t.lines,t.trackKey,t.status,t.plain),t.status&&(!t.entity||t.entity===this._entity)&&(this._status=t.status),t.offset!==void 0&&(this._offset=Number(t.offset)||0),t.hass?.states&&(this._hass=t.hass);let e=Mt(t.theme);e!==this._theme&&(this._theme=e,this._applyTheme()),this._applyTheme(),this._sync(),this._dragging||this._applyPosition()}_setLines(t,e,i,s){Array.isArray(t)&&(this._lines=t),Array.isArray(s)&&(this._plain=s),e!==void 0&&(this._linesKey=String(e||"")),i&&(this._status=i)}connectedCallback(){window.addEventListener("resize",this._onResize),this._startPolling(),this._applyTheme(),this._sync(),window.requestAnimationFrame(()=>this._applyPosition())}disconnectedCallback(){window.removeEventListener("resize",this._onResize),this._poll&&clearInterval(this._poll),this._poll=null,this._teardownLyrics()}_startPolling(){this._poll||(this._poll=window.setInterval(()=>this._sync(),500))}_applyTheme(){let t=Mt(this._theme),e=L[t]||L[N];this._theme=t,this.style.setProperty("--hm-accent",e.accent[0]),this.style.setProperty("--hm-accent-2",e.accent[1]),this.style.setProperty("--hm-accent-rgb",I(e.accent[0],"46,230,197")),this.style.setProperty("--hm-accent-2-rgb",I(e.accent[1],"123,92,255")),this.style.setProperty("--hm-base-rgb",I(e.base,"5,10,18")),this.style.setProperty("--hm-glow",String(e.glow??1)),this._pill.dataset.theme=t}_sync(){if(!this._pill)return;let t=gt()||this._hass;t?.states&&(this._hass=t);let e=this._preferred||this._entity;if(this._auto){let a=ia(t,e);a&&a!==this._entity&&this._selectEntity(a)}if(!this._entity){this._setText("");return}let i=this._hass?.states?.[this._entity];if(!i){this._setText("");return}this._ensureLyrics(i);let s="";this._lyricsIndex>=0&&this._lyricsIndex<this._lines.length?s=this._lines[this._lyricsIndex]?.text||"":this._plain.length&&(s=this._plain[0]||""),this._setText(s)}_selectEntity(t){!t||t===this._entity||(this._teardownLyrics(),this._entity=t,this._lines=[],this._plain=[],this._linesKey="",this._status="idle",this._lyricsIndex=-1)}_teardownLyrics(){let t=this._lyricsUnsub;if(this._lyricsUnsub=null,this._lyricsPending=!1,this._lyricsSubKey="",typeof t=="function")try{t()}catch{}else t&&typeof t.then=="function"&&t.then(e=>e?.()).catch(()=>{})}_ensureLyrics(t){if(!t||!this._entity)return;let e=this._hass?.connection;if(!e||typeof e.subscribeMessage!="function"){this._status="error";return}let i=`${this._entity}|${this._offset}`;if(i===this._lyricsSubKey&&(this._lyricsUnsub||this._lyricsPending))return;this._teardownLyrics(),this._lyricsSubKey=i,this._lyricsPending=!0;let s=r=>{if(this._lyricsPending=!1,this._lyricsSubKey!==i){try{r?.()}catch{}return}this._lyricsUnsub=r},a=()=>{this._lyricsPending=!1,this._lyricsSubKey===i&&(this._status="error")};try{Promise.resolve(e.subscribeMessage(r=>this._onLyrics(r,i),{type:"ha_music_studio/subscribe_lyrics",entity_id:this._entity,offset:this._offset},{resubscribe:!0})).then(s).catch(a)}catch{a()}}_onLyrics(t,e){if(!(!t||e!==this._lyricsSubKey)){if(!xt(t)){this._lines=[],this._plain=[vt(this._hass?.language)],this._linesKey="",this._status="error",this._lyricsIndex=-1,this._sync();return}if(t.type==="lyrics_error"){this._status="error",this._sync();return}if(t.type==="lyrics"){if(t.status==="loading"||t.status==="idle"){this._status=t.status==="loading"?"loading":"idle",this._lines=[],this._plain=[],this._linesKey="",this._lyricsIndex=-1,this._sync();return}if(t.status==="error"){this._status="error",this._sync();return}this._lines=Array.isArray(t.lines)?t.lines.map(i=>({time:Number(i.time)||0,text:String(i.text||"")})):[],this._plain=Array.isArray(t.plain)?t.plain.map(String):[],this._status=t.status==="ready"&&(this._lines.length||this._plain.length)?"ready":"none",this._linesKey=String(t.track_id||""),this._lyricsIndex=Number.isInteger(t.index)?t.index:-1,this._lyricsProgress=Number(t.progress)||0,this._sync()}}}_setText(t){let e=String(t||"").trim();if(!this._pill)return;let i=!e;this._pill.dataset.empty=i?"true":"false",this._text.textContent!==e&&(this._text.textContent=e,!i&&!this._dragging&&window.requestAnimationFrame(()=>this._applyPosition()))}_applyPosition(){if(!this._pill?.isConnected||this._dragging)return;let t=this._pill.getBoundingClientRect(),e=t.width||240,i=t.height||42,s=us(),a=s.lyric&&Number.isFinite(s.lyric.x)&&Number.isFinite(s.lyric.y)?s.lyric:Number.isFinite(s.x)&&Number.isFinite(s.y)?s:null,r=window.innerWidth||1,o=window.innerHeight||1,l=Ft(),h,c;if(l){let f=he(l);h=f?f.left-e-8:l.left+(l.width-e)/2,c=l.top+(l.height-i)/2}else h=r-e-16,c=16;let d,p;a&&Number.isFinite(a.x)&&Number.isFinite(a.y)?(d=J(a.x*r,8,Math.max(8,r-e-8)),p=J(a.y*o,8,Math.max(8,o-i-8))):l?(d=J(h,l.left+8,Math.max(l.left+8,l.right-e-8)),p=J(c,l.top+2,Math.max(l.top+2,l.bottom-i-2))):(d=J(h,8,Math.max(8,r-e-8)),p=16),this._pill.style.left=`${Math.round(d)}px`,this._pill.style.top=`${Math.round(p)}px`}_savePosition(){if(!this._pill)return;let t=this._pill.getBoundingClientRect();sa(t.left/Math.max(1,window.innerWidth),t.top/Math.max(1,window.innerHeight))}_handlePointerDown(t){!this._pill||t.button!==0||t.isPrimary===!1||(this._clearPress(),this._press={pointerId:t.pointerId,x:t.clientX,y:t.clientY,long:!1,moved:!1},this._dragging=!1,this._pressTimer=window.setTimeout(()=>{this._pressTimer=null,this._press&&this._beginDrag()},ea))}_beginDrag(){if(!this._press||!this._pill)return;this._press.long=!0,this._dragging=!0;let t=this._pill.getBoundingClientRect();this._drag={left:t.left,top:t.top,width:t.width,height:t.height,x:this._press.x,y:this._press.y},this._pill.dataset.dragging="true",this._pill.style.left=`${t.left}px`,this._pill.style.top=`${t.top}px`;try{this._pill.setPointerCapture(this._press.pointerId)}catch{}}_handlePointerMove(t){if(!this._press)return;let e=t.clientX-this._press.x,i=t.clientY-this._press.y;if(!this._dragging){Math.hypot(e,i)>8&&(this._press.moved=!0,this._clearPress());return}t.preventDefault();let s=window.innerWidth||1,a=window.innerHeight||1,r=J(this._drag.left+e,8,Math.max(8,s-this._drag.width-8)),o=J(this._drag.top+i,8,Math.max(8,a-this._drag.height-8));this._pill.style.left=`${Math.round(r)}px`,this._pill.style.top=`${Math.round(o)}px`}_handlePointerUp(){this._press&&(this._pressTimer&&(clearTimeout(this._pressTimer),this._pressTimer=null),this._dragging&&(this._savePosition(),this._releasePointer()),this._dragging=!1,this._press=null,this._pill&&delete this._pill.dataset.dragging)}_handlePointerCancel(){this._releasePointer(),this._clearPress(),this._dragging=!1,this._pill&&delete this._pill.dataset.dragging}_clearPress(){this._pressTimer&&(clearTimeout(this._pressTimer),this._pressTimer=null),this._press=null}_releasePointer(){let t=this._press?.pointerId;if(!(t===void 0||!this._pill))try{this._pill.releasePointerCapture(t)}catch{}}};typeof customElements<"u"&&!customElements.get("ha-music-lyric")&&customElements.define("ha-music-lyric",We);var ps="(pointer: coarse) and (max-width: 600px), (pointer: coarse) and (max-height: 500px)";function na(){return typeof window>"u"||typeof window.matchMedia!="function"?!1:!!window.matchMedia(ps).matches}function oa(n,t=Date.now()){let e=typeof n=="number"?n:Date.parse(String(n||""));return Number.isFinite(e)?Math.min(e,t):t}function Kt(n,t){if(!n)return;let e=String(t),i=null;for(let s=n.firstChild;s;s=s.nextSibling)if(s.nodeType===8){i=s;break}if(i){let s=i.nextSibling;for(;s&&s.nodeType===8;)s=s.nextSibling;if(s&&s.nodeType===3){s.data!==e&&(s.data=e);return}return}n.querySelector?.("*")||(n.textContent=e)}var Qe=["off","all","one"],la=260;function ha(n,t,e){let i=new CustomEvent(t,{bubbles:!0,composed:!0,cancelable:!1,detail:e});return n.dispatchEvent(i),i}function Ye(n,t,e,i,s){let a=[];for(let r=0;r<=n;r+=4){let o=t/2+Math.sin(r/e*Math.PI*2+s)*i+Math.sin(r/(e/2)*Math.PI*2+s*1.7)*(i*.32);a.push(`${r.toFixed(1)},${o.toFixed(2)}`)}return`M${a.join(" L")}`}function ca(n){switch(n){case"playing":return"playing";case"buffering":return"buffering";case"paused":return"paused";case"idle":return"idle";case"off":return"off";default:return"idle"}}var Xe=class extends H{static get styles(){return zi}static get properties(){return{_config:{state:!0},_width:{state:!1},preview:{type:Boolean,attribute:!1},editMode:{type:Boolean,attribute:!1}}}constructor(){super(),this._config={},this._hass=void 0,this._activeEntity="",this._sig="",this._width=0,this._height=0,this._panel=!1,this._autoPrevStates=null,this._manualSwitchAt=0,this._fitPanelRaf=null,this._panelHeight=0,this._tickTimer=null,this._toast="",this._toastTimer=null,this._menu=null,this._seekPreview=null,this._seekPending=null,this._seekSettleTimer=null,this._volumePreview=null,this._volumeCommitAt=0,this._mutedOverride=null,this._muteSettleTimer=null,this._volumeSettleTimer=null,this._volumeSettleTicks=0,this._showRemaining=!1,this._drawer=this._emptyDrawer(),this._queueLoadToken=0,this._queueUnsub=null,this._queueSubscriptionKey="",this._queueFirst=null,this._queueSnapshot=null,this._studioQueueKey="",this._studioFavorite=null,this._studioAutoplay=!1,this._studioCrossfade=!1,this._studioBusy=!1,this._waveform=null,this._waveformKey="",this._playersOpen=!1,this._maPlayers=[],this._playersBusy=!1,this._artUrl="",this._artSource="",this._artApplied="",this._artLoading="",this._artFailedSource="",this._audioSpec=null,this._audioSpecKey="",this._audioSpecAt=0,this._artSeq=0,this._artSlot=0,this._dockOwner=!1,this._unsubscribeDockPref=null,this._lyricDockOwner=!1,this._palette=null,this._paletteKey="",this._resizeObserver=null,this._thumbPreview=!1,this.preview=!1,this.editMode=!1,this._lyricsOpen=!1,this._lyricsKey="",this._lyrics={status:"idle",lines:[],plain:[],instrumental:!1,source:""},this._lyricsActive=-1,this._lyricsScrolled=-2,this._lyricsScrollObserver=null,this._lyricsScrollObserved=null,this._lyricsOffset=this._loadLyricsOffset(),this._lyricsUnsub=null,this._lyricsPending=!1,this._lyricsSubKey="",this._lyricsTrackId="",this._coverPress=null,this._coverGesture="",this._coverGestureTimer=null,this._coverSuppressClick=!1,this._coverSuppressTimer=null,this._progressRaf=null,this._progressLastSecond=-1,this._spectrumRaf=null,this._spectrumCanvas=null,this._spectrumCtx=null,this._spectrumCount=0,this._spectrumCssW=0,this._spectrumCssH=0,this._spectrumDpr=1,this._spectrumLevels=[],this._bandLevels=Object.assign([.18,.14,.1],{live:!1}),this._spectrumLast=0,this._spectrumKey="",this._audioShape=null,this._positionClock=null,this._studioBands=null,this._studioPeak=0,this._studioRms=0,this._studioFrames=0,this._studioAt=0,this._studioKey="",this._studioUnsub=null,this._studioPending=!1,this._studioFailedAt=0}set hass(t){let e=this._hass;if(this._hass=t,!t)return;this._autoSwitchToPlaying(t);let i=this._eid(),s=t.states?.[i],a=s?.attributes||{},r=this._trackKey(s),o=this._positionClock,l=!!(o&&o.trackKey!==r),h=l?0:Number(a.media_position)||0,c=a.media_position_updated_at||"",d=Date.now(),p=!!(o&&o.state!==s?.state),f=l||p||!c?d:oa(c,d);(!o||l||o.entityId!==i||o.state!==s?.state||o.base!==h||o.stamp!==c)&&(this._positionClock={entityId:i,state:s?.state,trackKey:r,base:h,stamp:c,at:f}),this._settleSeekPending(s,a,l)&&this.requestUpdate(),l&&this.requestUpdate(),(l||!o||!this._audioSpec)&&this._loadAudioSpec(r),this._syncArt(Le(s),i),this._safeEffect("cover-spin",()=>this._syncCoverSpinEffect()),this._mutedOverride!==null&&!!a.is_volume_muted===this._mutedOverride&&(this._mutedOverride=null,this._muteSettleTimer&&clearTimeout(this._muteSettleTimer),this._muteSettleTimer=null),queueMicrotask(()=>this._syncRangeValues());let u=this._computeSig(t);(u!==this._sig||e===void 0)&&(this._sig=u,this.requestUpdate()),this._syncTimer()}get hass(){return this._hass}setConfig(t){if(!t)throw new Error("ha-music: \u914D\u7F6E\u4E0D\u80FD\u4E3A\u7A7A");let e=Array.isArray(t.entities)&&t.entities.length?t.entities.filter(Boolean):t.entity?[t.entity]:[];if(!e.length)throw new Error("ha-music: \u9700\u8981\u914D\u7F6E entity\uFF08media_player.*\uFF09\u6216 entities \u5217\u8868");if(this._config={...t},e.includes(this._activeEntity)||(this._activeEntity=e[0],this._palette=null,this._paletteKey="",this._artUrl="",this._artSource="",this._artFailedSource="",this._resetLyrics()),this._config.show_lyrics===!1&&(this._lyricsOpen=!1),this._sig="",this._hass&&(this._sig=this._computeSig(this._hass)),this._syncTimer(),this.requestUpdate(),this._hass){let i=this._state(this._eid());this._audioSpecKey="",this._audioSpecAt=0,this._loadAudioSpec(this._trackKey(i))}}connectedCallback(){super.connectedCallback(),this._thumbPreview=this._isThumbnailPreview(),this._onKeyDown=t=>{t.key==="Escape"&&(this._drawer.open?this._closeDrawer():this._menu&&(this._menu=null,this.requestUpdate()))},window.addEventListener("keydown",this._onKeyDown),this._mobileMq=typeof window.matchMedia=="function"?window.matchMedia(ps):null,this._onMobileChange=()=>{this._installDock(),this._installLyricDock()},this._mobileMq?.addEventListener?this._mobileMq.addEventListener("change",this._onMobileChange):this._mobileMq?.addListener?.(this._onMobileChange),this._unsubscribeDockPref?.(),this._unsubscribeDockPref=cs(()=>{this._dockOwner=!1,this._installDock(),this.requestUpdate()}),this._onViewportResize=()=>this._queuePanelFit(),window.addEventListener("resize",this._onViewportResize),window.visualViewport?.addEventListener("resize",this._onViewportResize),typeof ResizeObserver<"u"&&(this._resizeObserver=new ResizeObserver(t=>{let e=t[0]?.contentRect?.width||0,i=t[0]?.contentRect?.height||0,s=Math.abs(e-this._width)>=1,a=Math.abs(i-this._height)>=1;this._width=e,this._height=i;let r=this._config?.layout||"adaptive";s||a&&r==="adaptive"?r==="adaptive"?this.requestUpdate():this._queuePanelFit():a&&this._queuePanelFit()}),this._resizeObserver.observe(this))}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribeDockPref?.(),this._unsubscribeDockPref=null,this._seekSettleTimer&&clearTimeout(this._seekSettleTimer),this._seekSettleTimer=null,this._volumeSettleTimer&&clearInterval(this._volumeSettleTimer),this._volumeSettleTimer=null,this._volumeSettleTicks=0,this._muteSettleTimer&&clearTimeout(this._muteSettleTimer),this._muteSettleTimer=null,this._mutedOverride=null,this._onMobileChange&&(this._mobileMq?.removeEventListener?this._mobileMq.removeEventListener("change",this._onMobileChange):this._mobileMq?.removeListener?.(this._onMobileChange),this._onMobileChange=null,this._mobileMq=null),this._onKeyDown&&(window.removeEventListener("keydown",this._onKeyDown),this._onKeyDown=null),this._onViewportResize&&(window.removeEventListener("resize",this._onViewportResize),window.visualViewport?.removeEventListener("resize",this._onViewportResize),this._onViewportResize=null),this._onSpectrumGesture&&(this.removeEventListener("pointerdown",this._onSpectrumGesture),this._onSpectrumGesture=null),this._stopTimer(),this._stopProgressTicker(),this._coverGestureTimer&&clearTimeout(this._coverGestureTimer),this._coverSuppressTimer&&clearTimeout(this._coverSuppressTimer),this._stopSpectrum(),this._coverGestureTimer=null,this._coverSuppressTimer=null,this._coverPress=null,this._resizeObserver?.disconnect(),this._resizeObserver=null,this._lyricsScrollObserver?.disconnect(),this._lyricsScrollObserver=null,this._lyricsScrollObserved=null,this._fitPanelRaf&&cancelAnimationFrame(this._fitPanelRaf),this._fitPanelRaf=null,this._toastTimer&&clearTimeout(this._toastTimer),this._teardownStudioLyrics()}_entities(){let t=this._config||{};return(Array.isArray(t.entities)&&t.entities.length?t.entities:t.entity?[t.entity]:[]).filter(Boolean)}_eid(){let t=this._entities();return this._activeEntity||t[0]||""}_state(t=this._eid()){return this._hass?.states?.[t]}_trackKey(t){let e=t?.attributes||{},i=e.media_metadata||{};return[this._eid(),i.title||e.media_title||"",i.artist||e.media_artist||"",i.album_name||e.media_album_name||"",i.duration??e.media_duration??0,e.media_content_id||""].map(s=>String(s)).join("|")}_readMedia(){let t=this._state(),e=Le(t);if(t?.state==="playing"){let i=this._positionClock;if(i&&i.entityId===this._eid()){let s=Math.max(0,(Date.now()-i.at)/1e3),a=i.base+s;e.position=e.duration?w(a,0,e.duration):Math.max(0,a)}}return e}_computeSig(t){let e=this._eid(),i=t.states?.[e],s=i?.attributes||{},a=["media_title","media_artist","media_album_name","media_series_title","entity_picture","media_duration","media_position","media_position_updated_at","media_metadata","media_content_id","volume_level","is_volume_muted","shuffle","repeat","source","source_list","sound_mode","sound_mode_list","supported_features","group_members","app_name","queue","media_track"],r={};for(let d of a)d in s&&(r[d]=s[d]);let o=this._config?.volume_entity,l=o?t.states?.[o]:null,h=l?[l.state,l.attributes?.volume_level,l.attributes?.is_volume_muted,l.attributes?.min,l.attributes?.max]:null,c=this._entities().map(d=>{let p=t.states?.[d];return[d,p?.state,p?.attributes?.entity_picture]});return JSON.stringify([e,i?.state,r,h,c,t.language,this._config,this._menu,this._drawer.open,this._drawer.mode,this._drawer.cursor,this._drawer.items.length,this._drawer.loading,this._drawer.error,this._showRemaining,this._layoutKey()])}_syncTimer(){let t=this._state()?.state,e=t==="playing"||t==="buffering";e&&!this._tickTimer?this._tickTimer=setInterval(()=>this.requestUpdate(),500):e||this._stopTimer()}_stopTimer(){this._tickTimer&&(clearInterval(this._tickTimer),this._tickTimer=null)}_lyricsEnabled(){return this._config?.show_lyrics!==!1}_resetLyrics(){this._teardownStudioLyrics(),this._lyricsKey="",this._lyricsTrackId="",this._lyricsOpen=!1,this._lyricsActive=-1,this._lyricsScrolled=-2,this._lyrics={status:"idle",lines:[],plain:[],instrumental:!1,source:""}}_loadLyricsOffset(){try{let t=localStorage.getItem("ha-music-lyrics-offset"),e=Number(t);return Number.isFinite(e)?w(e,-5,5):0}catch{return 0}}_saveLyricsOffset(){try{localStorage.setItem("ha-music-lyrics-offset",String(Number(this._lyricsOffset.toFixed(1))))}catch{}}_bumpLyricsOffset(t){this._lyricsOffset=w(Math.round((this._lyricsOffset+t)*10)/10,-5,5),this._saveLyricsOffset(),this._lyricsScrolled=-2,this._lyricsKey="",this._ensureStudioLyrics(!0),this.requestUpdate()}_lyricsPosition(t){return Math.max(0,(Number(t)||0)+this._lyricsOffset)}_teardownStudioLyrics(){let t=this._lyricsUnsub;if(this._lyricsUnsub=null,this._lyricsPending=!1,this._lyricsSubKey="",typeof t=="function")try{t()}catch{}else t&&typeof t.then=="function"&&t.then(e=>e?.()).catch(()=>{})}_ensureStudioLyrics(t=!1){if(!this._lyricsEnabled()||this._thumbMode())return;let e=this._hass?.connection;if(!e||typeof e.subscribeMessage!="function"){this._lyrics={status:"error",lines:[],plain:[],instrumental:!1,source:"Music Assistant"};return}let i=this._eid(),s=`${i}|${this._lyricsOffset}`;if(!t&&s===this._lyricsSubKey&&(this._lyricsUnsub||this._lyricsPending))return;this._lyricsSubKey&&this._lyricsSubKey!==s&&this._teardownStudioLyrics(),this._lyricsSubKey=s,this._lyricsPending=!0;let a=o=>{if(this._lyricsPending=!1,this._lyricsSubKey!==s){try{o?.()}catch{}return}this._lyricsUnsub=o},r=o=>{this._lyricsPending=!1,this._lyricsSubKey===s&&(this._lyrics={status:"error",lines:[],plain:[],instrumental:!1,source:"Music Assistant"},this.requestUpdate())};try{Promise.resolve(e.subscribeMessage(o=>this._onStudioLyrics(o,s),{type:"ha_music_studio/subscribe_lyrics",entity_id:i,offset:this._lyricsOffset},{resubscribe:!0})).then(a).catch(r)}catch(o){r(o)}}_onStudioLyrics(t,e){if(!t||e!==this._lyricsSubKey||!this.isConnected)return;if(!xt(t)){this._lyrics={status:"error",protocol:!1,message:vt(this._hass?.language),lines:[],plain:[],instrumental:!1,source:"Music Assistant"},this._lyricsActive=-1,this._lyricsScrolled=-2,this.requestUpdate();return}if(t.type==="lyrics_error"){this._lyrics={status:"error",lines:[],plain:[],instrumental:!1,source:"Music Assistant"},this.requestUpdate();return}if(t.type!=="lyrics")return;if(t.status==="idle"){this._lyrics={status:"none",lines:[],plain:[],instrumental:!1,source:"Music Assistant"},this._lyricsActive=-1,this._lyricsScrolled=-2,this.requestUpdate();return}if(t.status==="loading"){this._lyrics={status:"loading",lines:[],plain:[],instrumental:!1,source:"Music Assistant"},this._lyricsActive=-1,this._lyricsScrolled=-2,this.requestUpdate();return}if(t.status==="error"){this._lyrics={status:"error",lines:[],plain:[],instrumental:!1,source:"Music Assistant"},this.requestUpdate();return}let i=Array.isArray(t.lines)?t.lines.map(r=>({time:Number(r.time)||0,text:String(r.text||"")})):[],s=Array.isArray(t.plain)?t.plain.map(r=>String(r)):[],a=t.status==="ready"&&(i.length||s.length);t.track_id&&t.track_id!==this._lyricsTrackId&&(this._lyricsTrackId=t.track_id,this._lyricsScrolled=-2,this._lyricsActive=-1),this._lyrics={status:a?"ready":"none",lines:i,plain:s,instrumental:!!t.instrumental,source:"Music Assistant",index:Number.isInteger(t.index)?t.index:-1,progress:Number(t.progress)||0},a&&Number.isInteger(t.index)&&t.index>=0?t.index!==this._lyricsActive&&(this._lyricsActive=t.index,this._lyricsScrolled=t.index,this._centerActiveLyric()):a&&(this._lyricsActive=-1),this.requestUpdate()}_syncCoverEq(){if(this._thumbMode())return;let t=this.renderRoot?.querySelector?.(".hm-cover-eq"),e=this.renderRoot?.querySelector?.(".hm-cover");if(!t||!e)return;let i=this._state(),s=this._readMedia(),a=Math.max(72,Math.round(e.getBoundingClientRect().width||this._coverPx(this._layoutKey()))),o=!!this._panel&&!!this.renderRoot?.querySelector?.(".hm-card")?.classList?.contains("hm-narrow-panel")?10:a>=300?88:48,l=Math.min(1200,a+o);t.style.width!==`${l}px`&&(t.style.width=`${l}px`),t.style.height!==`${l}px`&&(t.style.height=`${l}px`);let h=L[this._themeKey()],c=String(this._config?.accent||""),d=[/^#[0-9a-f]{3,8}$/i.test(c)?c:h.accent[0],h.accent[1]],p=typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,f=_=>Array.isArray(_)?_[0]||"":_||"",u=i?.state==="playing"&&!p,m=e.parentElement;m&&(m.dataset.eq=u?"true":"false"),ne(t,m,{playing:u,visible:!0,position:this._seekPreview??s.position,size:l,innerRadius:a/2+8,lineWidth:a>=300?Math.max(1.8,Math.min(2.6,a/210)):Math.max(2.2,Math.min(4.8,a/130)),bars:a>=300?192:a>=150?64:48,cap:a>=300?"butt":"round",maxSize:1200,target:e,applyShadow:!1,maxFps:this._isMobileUi()?30:0,dpr:this._isMobileUi()?1.5:2,accent:d,title:f(s.title),artist:f(s.artist),album:f(s.album),bands:this._bandLevels})}_maybeLoadLyrics(){if(!this._lyricsEnabled()||this._thumbMode()){this._teardownStudioLyrics();return}if(!this._readMedia().title){this._teardownStudioLyrics(),this._lyricsKey="",this._lyricsTrackId="",this._lyrics.status!=="idle"&&(this._lyrics={status:"idle",lines:[],plain:[],instrumental:!1,source:""},this._lyricsActive=-1,this._lyricsScrolled=-2,this.requestUpdate());return}let e=this._eid();this._lyricsKey===e&&(this._lyricsUnsub||this._lyricsPending)||(this._lyricsKey=e,this._lyrics={status:"loading",lines:[],plain:[],instrumental:!1,source:"Music Assistant"},this.requestUpdate(),this._ensureStudioLyrics())}_sideLyricsVisible(){return!this._lyricsEnabled()||this._thumbMode()||this._lyricsOpen||this._layoutKey()!=="full"?!1:(this._width||0)>=640&&(this._height||0)>=480}_toggleLyrics(){this._lyricsOpen=!this._lyricsOpen,this._lyricsScrolled=-2,this._lyricsOpen&&(this._lyricsActive=-1,this._maybeLoadLyrics()),this.requestUpdate()}_retryLyrics(){this._lyricsKey="",this._teardownStudioLyrics(),this._lyricsOpen=!0,this._maybeLoadLyrics(),this.requestUpdate()}_shape(){if(this._thumbMode())return"normal";let t=this._width||0,e=this._height||0;if(!t||!e)return"normal";let i=t/e;if(!this._panel){if(t>=720&&e<=320&&i>=2.6||t>=560&&e<=280&&i>=2.2)return"banner";if(t>=760&&e>=340&&i>=2.1)return"wide";if(i<=.62&&e>=480)return"tall";if(i>=.8&&i<=1.25&&t>=320&&e>=320)return"square"}return"normal"}_layoutKey(){if(this._thumbMode())return"full";if(this._panel)return this._width&&this._height&&this._width<620&&this._height<460?"compact":"full";let t=this._config?.layout||"adaptive";if(t==="adaptive"){let e=this._width,i=this._height;if(!e)return"full";let s=i?e/i:0,a=this._shape();return a==="banner"?"compact":a==="wide"?i&&i<470?"compact":"full":e<300&&(s>=1.5||!i||i<180)?"mini":a==="tall"?"full":a==="square"?e<520||i&&i<440?"compact":"full":i&&i<330&&e<900?"compact":e>=240&&i>=520&&e<620?"full":e<340&&(!i||i<190)?"mini":e<620&&i&&i<460||i&&e/i>=2&&i<460||e<460||i&&i<300?"compact":"full"}return["full","compact","mini"].includes(t)?t:"full"}_coverPx(t){let e=this._height||0;if(this._thumbMode()){let s=this._thumbTier();if(s==="lg")return Math.round(Math.min(260,Math.max(160,e*.34)));if(s==="md"){let a=this._width||0;return Math.round(Math.min(180,a?a*.45:180,Math.max(96,e*.32)))}return Math.round(Math.min(120,Math.max(64,e*.3)))}let i=this._shape();if(i==="banner")return Math.round(Math.min(150,Math.max(56,(this._height||0)*.5)));if(i==="wide"){let s=this._height||0;return Math.round(Math.min(210,Math.max(88,s*(s<460?.24:.3))))}if(i==="tall"){let s=this._width||0;return Math.round(Math.min(260,Math.max(140,Math.min(s*.6,(this._height||0)*.3))))}if(t==="mini")return 44;if(t==="compact"){let s=Math.min(88,Math.max(52,e*.26));return this._tight()?Math.round(Math.min(64,Math.max(40,s*.72))):Math.round(s)}return Math.round(Math.min(178,Math.max(76,e*.22)))}_tight(){return this._thumbMode()?!1:this._layoutKey()==="compact"&&(this._height||0)<270}_short(){return this._thumbMode()?!1:this._layoutKey()==="compact"&&(this._height||0)<420}_micro(){return this._thumbMode()?!1:this._layoutKey()==="compact"&&(this._height||0)<230}_styleVars(){return{...this._themeVars(),"--hm-cover-size":`${this._coverPx(this._layoutKey())}px`}}_themeKey(){let t=this._config?.theme;return t&&L[t]?t:N}_themeVars(){let t=L[this._themeKey()],e=this._paletteKey||this._eid()||"ha-music",i=Fi(e),s=this._palette,a=this._config?.accent,r=this._config?.palette!==!1,o=t.accent[0],l=t.accent[1],h=I(o),c=I(l),d=h,p=Ue(t.accent[1]),f=Ue(i.a2);if(r){if(s){let u=Ne(p,{h:s.h2,s:s.s2,l:s.l2},.5);l=u.css,c=u.rgb,d=s.rgb1}else if(f){let u=Ne(p,f,.35);l=u.css,c=u.rgb}}return a&&(o=a,h=I(a,h),r||(d=h)),{"--hm-base":t.base,"--hm-a1":o,"--hm-a2":l,"--hm-spec-a1":o,"--hm-spec-a2":t.accent[1],"--hm-a1-rgb":h,"--hm-a2-rgb":c,"--hm-glow-rgb":d}}_volumeInfo(t){let e=this._config?.volume_entity,i=e?this._hass?.states?.[e]:void 0;if(i){let r=i.entity_id;if(r.startsWith("media_player."))return{domain:"media_player",entityId:r,level:Number(i.attributes?.volume_level??0),muted:!!i.attributes?.is_volume_muted,supported:!0,external:!0};if(r.startsWith("number.")){let o=Number(i.state);if(Number.isFinite(o))return{domain:"number",entityId:r,level:w(o/(i.attributes?.max||100),0,1),muted:!1,supported:!0,external:!0}}if(r.startsWith("input_number.")){let o=Number(i.state);if(Number.isFinite(o))return{domain:"input_number",entityId:r,level:w(o/(i.attributes?.max||100),0,1),muted:!1,supported:!0,external:!0}}}let s=this._state(),a=Number.isFinite(t.volume)||q(s,C.VOLUME_SET)||q(s,C.VOLUME_MUTE);return{domain:"media_player",entityId:this._eid(),level:Number.isFinite(t.volume)?t.volume:0,muted:t.muted,supported:a,external:!1}}_repeatValue(){let t=this._state()?.attributes?.repeat;return["off","all","one"].includes(t)?t:"off"}_call(t,e,i="media_player",s){let a=this._hass;if(!a?.callService)return Promise.resolve();let r=s??this._eid();try{let o=a.callService(i,t,{entity_id:r,...e});return Promise.resolve(o)}catch(o){return this._notify(o?.message||String(o)),Promise.reject(o)}}_guard(t){Promise.resolve(t).catch(e=>{let i=e?.message||String(e);this._notify(i.length>60?i.slice(0,60):i)})}_notify(t){this._toast=t||"",this.requestUpdate(),this._toastTimer&&clearTimeout(this._toastTimer),t&&(this._toastTimer=setTimeout(()=>{this._toast="",this.requestUpdate()},3600))}_togglePlay(){let t=this._state()?.state,e=t==="playing"||t==="buffering";this._guard(this._call(e?"media_pause":"media_play"))}_skip(t){this._guard(this._call(t==="next"?"media_next_track":"media_previous_track"))}_coverCue(t){this._coverGesture=t,this._coverGestureTimer&&clearTimeout(this._coverGestureTimer),this._coverGestureTimer=setTimeout(()=>{this._coverGesture===t&&(this._coverGesture="",this.requestUpdate())},420),this.requestUpdate()}_coverSwipe(t){this._coverCue(t),this._skip(t)}_onCoverPointerDown(t){this._thumbMode()||t.pointerType==="mouse"&&t.button!==0||(this._coverSuppressClick=!1,this._coverSuppressTimer&&clearTimeout(this._coverSuppressTimer),this._coverPress={id:t.pointerId,x:t.clientX,y:t.clientY,at:Date.now(),moved:!1,captured:!1})}_onCoverPointerMove(t){let e=this._coverPress;if(!e||e.id!==t.pointerId)return;let i=t.clientX-e.x,s=t.clientY-e.y;if(Math.abs(i)>10&&Math.abs(i)>Math.abs(s)*1.2){if(e.moved=!0,!e.captured){e.captured=!0;try{t.currentTarget.setPointerCapture(t.pointerId)}catch{}}t.cancelable&&t.preventDefault()}}_onCoverPointerUp(t){let e=this._coverPress;if(!e||e.id!==t.pointerId)return;this._coverPress=null;let i=t.clientX-e.x,s=t.clientY-e.y;if(Math.abs(i)>=48&&Math.abs(i)>Math.abs(s)*1.25){this._coverSuppressClick=!0,this._coverSuppressTimer&&clearTimeout(this._coverSuppressTimer),this._coverSuppressTimer=setTimeout(()=>{this._coverSuppressClick=!1},450),this._coverSwipe(i<0?"next":"prev");return}(e.moved||Math.hypot(i,s)>12)&&(this._coverSuppressClick=!0,this._coverSuppressTimer&&clearTimeout(this._coverSuppressTimer),this._coverSuppressTimer=setTimeout(()=>{this._coverSuppressClick=!1},450))}_onCoverPointerCancel(){this._coverPress=null}_onCoverClick(){if(!this._thumbMode()){if(this._coverSuppressClick){this._coverSuppressClick=!1;return}this._coverCue("tap"),this._togglePlay()}}_power(){let t=this._state()?.state,e=t==="off"||t==="standby";this._guard(this._call(e?"turn_on":"turn_off"))}_shuffle(){let t=!!this._state()?.attributes?.shuffle;this._guard(this._call("shuffle_set",{shuffle:!t}))}_repeat(){let t=this._repeatValue(),e=Qe.indexOf(t),i=Qe[(e+1)%Qe.length];this._guard(this._call("repeat_set",{repeat:i}))}_seekTo(t){if(!Number.isFinite(t))return Promise.resolve(!1);let e=this._call("media_seek",{seek_position:t});return this._guard(e),e}_settleSeekPending(t,e,i){let s=this._seekPending;if(!s)return!1;let a=Number(e?.media_position),r=String(e?.media_position_updated_at||"")!==s.stamp,o=Number.isFinite(a)&&Math.abs(a-s.from)>1,l=Number.isFinite(a)&&Math.abs(a-s.value)<=2,h=Date.now()-s.at>8e3;return!t||i||h||l&&(r||o)?(this._seekSettleTimer&&clearTimeout(this._seekSettleTimer),this._seekSettleTimer=null,this._seekPending=null,this._seekPreview=null,this._syncRangeValues(),this._syncProgressTicker(),!0):!1}_onSeekInput(t){if(!q(this._state(),C.SEEK))return;let e=t.target,i=Number(e.value);this._seekPreview=i,this._stopProgressTicker();let s=this._readMedia().duration;e.style.setProperty("--pct",`${s?w(i/s*100,0,100):0}%`)}_onSeekCommit(t){if(!q(this._state(),C.SEEK)){this.requestUpdate();return}let e=Number(t.target.value),i=this._state(),s=i?.attributes||{};this._seekPreview=e,this._stopProgressTicker(),this._seekPending={value:e,from:Number(s.media_position)||0,stamp:String(s.media_position_updated_at||""),trackKey:this._trackKey(i),at:Date.now()};let a=this._seekPending;this._seekSettleTimer&&clearTimeout(this._seekSettleTimer);let r=()=>{this._seekPreview===e&&(this._seekSettleTimer=null,this._seekPending=null,this._seekPreview=null,this._syncRangeValues(),this._syncProgressTicker(),this.requestUpdate())};this._seekSettleTimer=setTimeout(r,4e3),this._seekTo(e).catch(()=>{this._seekPending===a&&(this._seekSettleTimer&&clearTimeout(this._seekSettleTimer),r())}),this.requestUpdate()}_onVolumeInput(t){if(Date.now()-this._volumeCommitAt<300)return;let e=Number(t.target.value)/100;this._volumePreview=e,t.target.style.setProperty("--pct",`${e*100}%`),Kt(this.renderRoot?.querySelector?.(".hm-vol-pct"),String(Math.round(e*100)))}_onVolumeCommit(t){let e=w(Number(t.target.value)/100,0,1);this._volumeCommitAt=Date.now(),this._volumePreview=e,t.target.style.setProperty("--pct",`${e*100}%`),Kt(this.renderRoot?.querySelector?.(".hm-vol-pct"),String(Math.round(e*100))),this._volumeSettleTimer&&clearInterval(this._volumeSettleTimer),this._volumeSettleTicks=0,setTimeout(()=>{this._volumeCommitAt&&this._volumePreview!==null&&(this._volumePreview=null,this._syncRangeValues(),this.requestUpdate())},1200),this._volumeSettleTimer=setInterval(()=>{this._volumeSettleTicks+=1,this._volumePreview===null&&(this._syncRangeValues(),this.requestUpdate()),this._volumeSettleTicks>=6&&(clearInterval(this._volumeSettleTimer),this._volumeSettleTimer=null)},1500),this.requestUpdate();let i=this._volumeInfo(this._readMedia());if(i.domain==="media_player")this._guard(this._call("volume_set",{volume_level:e},"media_player",i.entityId));else{let s=this._hass?.states?.[i.entityId],a=Number(s?.attributes?.max??100),r=Number(s?.attributes?.min??0);this._guard(this._call("set_value",{value:Math.round(r+e*(a-r))},i.domain,i.entityId))}this.requestUpdate()}_toggleMute(){let t=this._readMedia(),e=this._volumeInfo(t),i=!e.muted;if(this._mutedOverride=i,this._muteSettleTimer&&clearTimeout(this._muteSettleTimer),this._muteSettleTimer=setTimeout(()=>{this._mutedOverride===i&&(this._mutedOverride=null,this._syncRangeValues(),this.requestUpdate())},3e3),this._syncRangeValues(),this.requestUpdate(),e.external){e.domain==="media_player"?this._guard(this._call("volume_mute",{is_volume_muted:i},"media_player",e.entityId)):this._notify(E(this._hass?.language)("volumeEntityMissing"));return}this._guard(this._call("volume_mute",{is_volume_muted:i}))}_volumeStep(t){let e=this._volumeInfo(this._readMedia());if(!e.supported){this._notify(E(this._hass?.language)("volumeEntityMissing"));return}let i=this._volumePreview??e.level,s=w(Number(i)+t,0,1);if(this._volumeCommitAt=Date.now(),this._volumePreview=s,this._volumeSettleTimer&&clearInterval(this._volumeSettleTimer),this._volumeSettleTimer=null,this.requestUpdate(),this._syncRangeValues(),setTimeout(()=>{this._volumePreview===s&&(this._volumePreview=null,this._syncRangeValues(),this.requestUpdate())},1200),e.domain==="media_player")this._guard(this._call("volume_set",{volume_level:s},"media_player",e.entityId));else{let a=this._hass?.states?.[e.entityId],r=Number(a?.attributes?.max??100),o=Number(a?.attributes?.min??0);this._guard(this._call("set_value",{value:Math.round(o+s*(r-o))},e.domain,e.entityId))}}_selectSource(t){this._menu=null,this._guard(this._call("select_source",{source:t})),this.requestUpdate()}_selectSoundMode(t){this._menu=null,this._guard(this._call("select_sound_mode",{sound_mode:t})),this.requestUpdate()}_leaveGroup(){this._guard(this._call("unjoin"))}async _openPlayers(){this._playersOpen=!0,this.requestUpdate(),await this._loadPlayers()}_closePlayers(){this._playersOpen=!1,this.requestUpdate()}async _loadPlayers(){if(this._hass?.connection){try{let t=await this._hass.connection.sendMessagePromise({type:"ha_music_studio/player_group",action:"players"});this._maPlayers=Array.isArray(t?.players)?t.players:[]}catch(t){this._notify(t?.message||String(t)),this._maPlayers=[]}this.requestUpdate()}}_playersForPanel(){let t=this._currentMaPlayer()?.player_id||"";return[...this._maPlayers].sort((e,i)=>{let s=e.player_id===t?1:0,a=i.player_id===t?1:0;if(s!==a)return a-s;let r=e.available?1:0;return(i.available?1:0)-r})}_currentMaPlayer(){let t=this._studioQueue(),e=this._maPlayers.find(s=>s.active_source===t||s.active_queue===t)||this._maPlayers.find(s=>s.player_id===this._state()?.attributes?.ma_player_id)||null;if(!e)return null;let i=e.active_group||e.synced_to;if(i){let s=this._maPlayers.find(a=>a.player_id===i);if(s)return s}return e}_entityForMaPlayer(t){let e=this._hass?.states||{},i=t?.active_source||t?.active_queue||"";for(let[a,r]of Object.entries(e))if(a.startsWith("media_player.")&&i&&r?.attributes?.active_queue===i)return a;let s=String(t?.name||"").toLowerCase();if(!s)return"";for(let[a,r]of Object.entries(e))if(a.startsWith("media_player.")&&mt(this._hass,a,a).toLowerCase()===s)return a;return""}_selectMaPlayer(t){let e=this._entityForMaPlayer(t);if(!e){this._notify(E(this._hass?.language)("deviceUnavailable"));return}this._switchEntity(e,!0),this._closePlayers()}async _toggleMaGroup(t){if(this._playersBusy)return;let e=this._currentMaPlayer();if(!e){this._notify(E(this._hass?.language)("groupLeaderMissing"));return}if(t.player_id===e.player_id)return;let i=(e.group_members||[]).includes(t.player_id),s=i?(e.group_members||[]).filter(a=>a!==t.player_id):[...e.group_members||[],t.player_id];this._maPlayers=this._maPlayers.map(a=>a.player_id===e.player_id?{...a,group_members:s}:a),this._playersBusy=!0,this.requestUpdate();try{await this._hass.connection.sendMessagePromise({type:"ha_music_studio/player_group",action:"set_members",target_player:e.player_id,add:i?[]:[t.player_id],remove:i?[t.player_id]:[]}),await new Promise(a=>setTimeout(a,700)),await this._loadPlayers()}catch(a){this._notify(a?.message||String(a)),await this._loadPlayers()}finally{this._playersBusy=!1,this.requestUpdate()}}_studioReady(){return!!(this._isMaPlayer()&&this._hass?.services?.ha_music_studio)}_studioQueue(){return this._queueQueueId||this._state()?.attributes?.active_queue||this._state()?.attributes?.queue_id||""}_syncStudioQueue(){if(!this._studioReady()||this._thumbMode())return;let t=this._studioQueue();if(!t)return;let e=this._readMedia(),i=[t,this._state()?.attributes?.media_content_id||"",e.title,e.duration].join("|");i!==this._studioQueueKey&&(this._studioQueueKey=i,this._queueQueueId=t,this._loadStudioQueue(t,i).catch(()=>{}))}async _loadStudioQueue(t,e){if(!this._studioReady())return;let i=await this._queueCommand("snapshot"),s=i?.result?.queue||i?.queue;if(!s||this._studioQueueKey!==e)return;let a=(s.items||[]).find(r=>r.active);this._studioFavorite=a?!!a.favorite:null,this._studioAutoplay=!!s.autoplay_enabled,this._studioCrossfade=!!s.crossfade_enabled,this._queueSnapshot=s,this.requestUpdate(),this._loadWaveform(t,e).catch(()=>{})}async _loadWaveform(t,e){if(this._waveformKey!==e){this._waveformKey=e;try{let s=(await this._queueCommand("waveform",{queue_id:t}))?.result?.bins;if(this._studioQueueKey!==e)return;this._waveform=Array.isArray(s)&&s.length?s:null}catch{this._waveform=null}this.requestUpdate()}}_waveBars(t=96){let e=this._waveform;if(!Array.isArray(e)||!e.length)return[];let i=Math.min(t,e.length),s=e.length/i,a=[];for(let r=0;r<i;r++){let o=Math.floor(r*s),l=Math.max(o+1,Math.floor((r+1)*s)),h=0;for(let c=o;c<l&&c<e.length;c++)h=Math.max(h,Number(e[c])||0);a.push(w(h,0,1))}return a}async _toggleStudioFavorite(){if(!this._studioReady()||this._studioBusy)return;let t=this._state()?.attributes||{},e=String(t.media_content_id||"");if(!e){this._notify(E(this._hass?.language)("favoriteUnavailable"));return}let i=!this._studioFavorite;this._studioBusy=!0,this._studioFavorite=i,this.requestUpdate();try{await this._queueCommand("favorite",{item_uri:e,favorite:i})}catch(s){this._studioFavorite=!i,this._notify(s?.message||String(s))}finally{this._studioBusy=!1,this.requestUpdate()}}async _toggleStudioAutoplay(){if(!this._studioReady()||this._studioBusy)return;let t=!this._studioAutoplay;this._studioBusy=!0,this._studioAutoplay=t,this.requestUpdate();try{await this._queueCommand("autoplay",{autoplay:t})}catch(e){this._studioAutoplay=!t,this._notify(e?.message||String(e))}finally{this._studioBusy=!1,this.requestUpdate()}}async _toggleStudioCrossfade(){if(!this._studioReady()||this._studioBusy)return;let t=!this._studioCrossfade;this._studioBusy=!0,this._studioCrossfade=t,this.requestUpdate();try{await this._queueCommand("crossfade",{crossfade:t})}catch(e){this._studioCrossfade=!t,this._notify(e?.message||String(e))}finally{this._studioBusy=!1,this.requestUpdate()}}_onWaveformClick(t){if(!this._canSeekNow())return;let e=t.currentTarget.getBoundingClientRect(),i=w((t.clientX-e.left)/Math.max(e.width,1),0,1),s=this._readMedia();s.duration&&this._seekTo(s.duration*i)}_canSeekNow(){return q(this._state(),C.SEEK)}async _queueCommand(t,e={}){let i=this._hass?.connection;if(!i?.sendMessagePromise)throw new Error("Home Assistant WebSocket unavailable");let s=this._queueQueueId||this._state()?.attributes?.active_queue||"";return i.sendMessagePromise({type:"ha_music_studio/queue_command",action:t,entity_id:this._eid(),queue_id:s,...e})}async _playQueueItem(t){if(!t?.queueItemId){this._notify(E(this._hass?.language)("queueEmpty"));return}try{await this._queueCommand("play_item",{item_id:t.queueItemId}),this._drawer={...this._drawer,items:(this._drawer?.items||[]).map(e=>({...e,active:e.queueItemId===t.queueItemId}))},this.requestUpdate()}catch(e){this._notify(e?.message||String(e)),this._loadQueue(++this._queueLoadToken).catch(()=>{})}}_playBrowseItem(t){t?.contentId&&this._guard(this._call("play_media",{media_content_id:t.contentId,media_content_type:t.contentType||"music"}))}_autoSwitchToPlaying(t){let e=this._entities();if(e.length<2)return;let i=!this._autoPrevStates,s={};for(let r of e)s[r]=t?.states?.[r]?.state||"";let a=Di(t,e,this._eid(),this._autoPrevStates);this._autoPrevStates=s,a&&(!i&&Date.now()-this._manualSwitchAt<15e3||this._switchEntity(a,!1))}_switchEntity(t,e=!1){t!==this._activeEntity&&(e&&(this._manualSwitchAt=Date.now()),this._activeEntity=t,this._palette=null,this._paletteKey="",this._artUrl="",this._artSource="",this._artFailedSource="",this._menu=null,this._seekPreview=null,this._seekPending=null,this._resetLyrics(),this._syncTimer(),this._sig=this._computeSig(this._hass),this.requestUpdate())}_moreInfo(){ha(this,"hass-more-info",{entityId:this._eid()})}_maEnabled(){let t=this._config?.music_assistant;if(t===!1)return!1;if(t===!0||typeof t=="string"&&t.trim()||this._hass?.services?.music_assistant?.play_media||this._entities().some(s=>{let a=this._hass?.states?.[s]?.attributes||{};return Object.keys(a).some(r=>r.startsWith("mass_"))}))return!0;let i=this._hass?.panels||{};return Object.keys(i).some(s=>{let a=i[s]||{};return a.component_name==="music_assistant"||/music[-_ ]?assistant/i.test(a.url_path||s)||/music\s*assistant/i.test(a.title||"")})}_isMaPlayer(t=this._eid()){let e=this._state(t)?.attributes||{};return Object.keys(e).some(i=>i.startsWith("mass_"))}_maUrl(){let t=this._config?.music_assistant;if(t===!1)return"";if(typeof t=="string"&&t.trim())return t.trim();let e=this._hass?.panels||{};for(let s of Object.keys(e)){let a=e[s]||{},r=a.url_path||s;if(a.component_name==="music_assistant"||/music[-_ ]?assistant/i.test(r)||/music\s*assistant/i.test(a.title||""))return`/${r}`}return this._entities().some(s=>{let a=this._hass?.states?.[s]?.attributes||{};return Object.keys(a).some(r=>r.startsWith("mass_"))})||t===!0?"/music-assistant":""}_onAssistantButton(){if(this._maUrl()){this._openAssistant();return}this._openPlaylists()}_openAssistant(){this._drawer?.open&&this._closeDrawer();let t=this._maUrl();if(!t)return;if(/^(https?:)?\/\//i.test(t)){window.open(t,"_blank","noopener");return}let e=t.startsWith("/")?t:`/${t}`;try{window.history.pushState(null,"",e),window.dispatchEvent(new Event("location-changed",{bubbles:!0,composed:!0}))}catch{window.location.href=e}}_onCardClick(t){if(!this._menu)return;(t.composedPath?.()||[]).some(s=>s?.classList?.contains?.("hm-menu")||s?.classList?.contains?.("hm-chip"))||(this._menu=null,this.requestUpdate())}_emptyDrawer(){return{open:!1,mode:null,nodes:[],cursor:-1,items:[],title:"",loading:!1,error:""}}_scrollQueueToActive(){let t=this.shadowRoot,e=t?.querySelector(".hm-drawer-body"),i=t?.querySelector('.hm-list-item[data-active="true"]');if(!e||!i)return;let s=i.offsetTop-e.offsetTop;e.scrollTop=Math.max(0,s-e.clientHeight/2+i.offsetHeight/2)}_pickQueueResponse(t){if(!t)return null;if(Array.isArray(t))return t;let e=t[this._eid()]??t.entity??t;return Array.isArray(e)||e&&typeof e=="object"?e:null}async _serviceResponse(t,e,i){let s=this._hass,a={type:"call_service",domain:t,service:e,service_data:i,return_response:!0};if(s?.connection?.sendMessagePromise)try{let o=await s.connection.sendMessagePromise(a);if(o?.response!==void 0)return o.response}catch(o){this._callWsError=String(o?.message||o||"")}if(s?.callWS)return(await s.callWS(a))?.response??null;let r=s?.auth?.data?.access_token;if(r&&typeof fetch=="function"){let o=await fetch(`/api/services/${t}/${e}?return_response`,{method:"POST",headers:{Authorization:`Bearer ${r}`,"Content-Type":"application/json"},body:JSON.stringify(i||{})});if(!o.ok)throw new Error(`REST ${o.status}`);let l=await o.json();return l?.response??l??null}throw new Error("Service response unavailable")}async _loadAudioSpec(t){let e=this._hass,i=this._eid();if(!e||!i||this._config?.show_spec===!1||!this._isMaPlayer(i))return;let s=t||"",a=!!s&&s===this._audioSpecKey;if(a&&this._audioSpec)return;let r=Date.now();if(!(r-this._audioSpecAt<(a?5e3:1e3))){this._audioSpecAt=r;try{let o=await this._serviceResponse("music_assistant","get_queue",{entity_id:i}),h=this._pickQueueResponse(o)?.current_item||null,c=h?.stream_details||h?.media_item?.stream_details||null,d=Number(c?.sample_rate)||0,p=Number(c?.bit_depth)||0,f=Number(c?.bit_rate)||0,u=Number(c?.channels)||0,m=String(c?.content_type||"").trim();!m&&!d&&!p&&!f?this._audioSpec=null:(this._audioSpec={codec:m,sampleRate:d,bitDepth:p,bitRate:f,channels:u},this._audioSpecKey=s)}catch(o){this._audioSpec=null,this._specError=String(o?.message||o||"")}this.requestUpdate()}}_audioSpecText(t=!1){let e=this._audioSpec;if(!e)return"";let i=[];if(e.codec&&i.push(this._codecLabel(e.codec)),t)e.bitDepth&&e.sampleRate?i.push(`${e.bitDepth}/${Math.round(e.sampleRate/1e3)}k`):e.sampleRate&&i.push(`${Math.round(e.sampleRate/1e3)}kHz`);else{if(e.bitDepth&&i.push(`${e.bitDepth}-bit`),e.sampleRate){let s=e.sampleRate/1e3;i.push(`${Number.isInteger(s)?s:s.toFixed(1)} kHz`)}e.channels===2?i.push("\u7ACB\u4F53\u58F0"):e.channels>2&&i.push(`${e.channels}ch`),e.bitRate>0&&i.push(e.bitRate>=1e3?`${(e.bitRate/1e3).toFixed(1)} Mb/s`:`${Math.round(e.bitRate)} kb/s`)}return i.join(" \xB7 ")}_codecLabel(t){let e=String(t||"").trim().toLowerCase();return{mpeg:"MP3",mp3:"MP3",mp4a:"AAC",m4a:"AAC",aac:"AAC",flac:"FLAC",alac:"ALAC",opus:"Opus",vorbis:"Vorbis",ogg:"Vorbis",pcm:"PCM",wav:"WAV",alac_ima4:"ALAC",wma:"WMA"}[e]||e.toUpperCase()}async _subscribeQueue(t){let e=`${this._eid()}|${t}`;if(this._queueSubscriptionKey===e&&this._queueUnsub)return this._queueSnapshot;this._teardownQueueSubscription();let i=this._hass?.connection;if(!i?.subscribeMessage)throw new Error("Home Assistant WebSocket unavailable");let s=new Promise((a,r)=>{let o=setTimeout(()=>{this._queueFirst?.reject===r&&(this._queueFirst=null),r(new Error(E(this._hass?.language)("queueEmpty")))},1e4);this._queueFirst={resolve:l=>{clearTimeout(o),a(l)},reject:l=>{clearTimeout(o),r(l)}}});this._queueSubscriptionKey=e;try{this._queueUnsub=await i.subscribeMessage(a=>this._onQueueEvent(a,e),{type:"ha_music_studio/subscribe_queue",entity_id:this._eid(),queue_id:t})}catch(a){throw this._teardownQueueSubscription(),this._queueFirst?.reject?.(a),this._queueFirst=null,a}return s}_teardownQueueSubscription(){let t=this._queueUnsub;if(this._queueUnsub=null,this._queueSubscriptionKey="",this._queueFirst=null,this._queueSnapshot=null,this._studioQueueKey="",this._studioFavorite=null,this._studioAutoplay=!1,this._studioCrossfade=!1,this._studioBusy=!1,this._waveform=null,this._waveformKey="",this._playersOpen=!1,this._maPlayers=[],this._playersBusy=!1,typeof t=="function")try{t()}catch{}}_onQueueEvent(t,e){if(!t||t.type!=="queue"||e!==this._queueSubscriptionKey)return;if(!xt(t.protocol)){this._notify(vt(this._hass?.language)),this._teardownQueueSubscription();return}this._queueSnapshot=t;let i=this._queueFirst;this._queueFirst=null,i?.resolve?.(t),this._drawer?.open&&this._drawer.mode==="queue"&&this._applyQueueSnapshot(t)}_applyQueueSnapshot(t){let e=E(this._hass?.language),i=this._state()?.attributes||{},s=t.queue_id||this._queueQueueId;this._queueQueueId=s;let a=Number(t.offset)||0,r=Ii(t.items||[],t.current_item_id||"",i.media_content_id||"");a>0&&(r=r.map((p,f)=>({...p,index:a+f})));let o=Number(t.total)||0,l=Number(t.current_index),h=!t.windowed&&r.length>0,c=[e("queue")];o>0&&c.push(`${Number.isFinite(l)&&l>=0?l+1:"?"}/${o}`);let d=!h&&r.length?e("queueLimited"):"";t.windowed&&r.length&&(d=`${e("queueWindow")} \xB7 ${a+1}\u2013${a+r.length}/${o}`),this._drawer={...this._drawer,items:r,loading:!1,error:t.error||"",title:c.join(" \xB7 "),note:d,maUrl:this._maUrl(),fullQueue:h},this.requestUpdate(),this.updateComplete.then(()=>this._scrollQueueToActive())}async _loadQueue(t){let e=this._queueQueueId||this._state()?.attributes?.active_queue||"";if(!e)throw new Error(E(this._hass?.language)("queueEmpty"));let i=null;try{i=await this._subscribeQueue(e)}catch(s){let a=await this._queueCommand("snapshot");if(i=a?.result?.queue||a?.queue||null,!i)throw s;this._queueSnapshot=i,this._applyQueueSnapshot(i)}if(!(t!==this._queueLoadToken||!this._drawer?.open||this._drawer.mode!=="queue")&&!i)throw new Error(E(this._hass?.language)("queueEmpty"))}_openQueue(){let t=E(this._hass?.language),e=this._state(),i=Oe(e,this._config?.max_queue??40),s=this._isMaPlayer(),a=++this._queueLoadToken;this._queueQueueId=s&&e?.attributes?.active_queue||"",this._drawer={open:!0,mode:"queue",nodes:[],cursor:-1,items:i,title:t("queue"),loading:!i.length&&s,error:"",note:"",maUrl:s?this._maUrl():"",fullQueue:i.length>0},this.requestUpdate(),i.length&&this.updateComplete.then(()=>this._scrollQueueToActive()),s&&this._loadQueue(a).catch(r=>{a===this._queueLoadToken&&(this._drawer={...this._drawer,loading:!1,error:r?.message||t("queueEmpty")},this.requestUpdate())})}_openLibrary(){let t=E(this._hass?.language);this._drawer={open:!0,mode:"library",nodes:[],cursor:-1,items:[],title:t("library"),loading:!0,error:"",t},this.requestUpdate(),this._fetchBrowse()}_openPlaylists(){let t=E(this._hass?.language);if(!this._isMaPlayer()){if(this._maUrl()){this._openAssistant();return}this._notify(t("maPlayerRequired"));return}this._drawer={open:!0,mode:"playlists",nodes:[],cursor:-1,items:[],title:t("playlists"),loading:!0,error:"",maUrl:this._maUrl()},this.requestUpdate(),this._fetchPlaylists()}async _browseMedia(t,e){let i=this._hass?.connection;if(!i?.sendMessagePromise)throw new Error("unsupported");let s={type:"media_player/browse_media",entity_id:this._eid()};return t&&(s.media_content_id=t,e&&(s.media_content_type=e)),i.sendMessagePromise(s)}async _fetchPlaylists(){let t=E(this._hass?.language);try{let i=(await this._browseMedia())?.children||[],s=i.find(o=>o.can_expand&&(/playlist/i.test(o.media_class||"")||/playlist/i.test(o.media_content_type||"")||/播放列表|playlists?/i.test(o.title||""))||!1),a=[];s&&(a=(await this._browseMedia(s.media_content_id,s.media_content_type))?.children||[]),a.length||(a=i.filter(o=>/playlist/i.test(o.media_class||"")));let r=a.map(o=>({title:o.title||"",subtitle:(()=>{let l=Re(o.media_class,this._hass?.language);return l&&l!==t("playlists")?l:""})(),contentId:o.media_content_id||"",contentType:o.media_content_type||"playlist",thumb:o.thumbnail||""})).filter(o=>o.contentId);if(this._drawer.mode!=="playlists")return;this._drawer={...this._drawer,loading:!1,items:r,error:""}}catch(e){if(this._drawer.mode!=="playlists")return;this._drawer={...this._drawer,loading:!1,items:[],error:e?.message?`${t("browseFailed")} \xB7 ${String(e.message).slice(0,40)}`:t("browseFailed")}}this.requestUpdate()}async _playPlaylistItem(t){if(!t?.contentId)return;let e=E(this._hass?.language),i=this._eid();if(!this._isMaPlayer(i)){this._notify(e("maPlayerRequired"));return}let s=t.contentType||"playlist",a=()=>{this._notify(`${e("playingPlaylist")} \xB7 ${t.title||""}`),this._closeDrawer()},r=!!this._hass?.services?.music_assistant?.play_media,o=l=>{let h=l?.message||String(l);return/nothing to play here/i.test(h)?e("playlistEmpty"):h.length>60?h.slice(0,60):h};if(r)try{await this._hass.callService("music_assistant","play_media",{entity_id:i,media_id:t.contentId,media_type:"playlist",enqueue:"play"}),a();return}catch(l){let h=l?.message||String(l);if(/nothing to play here/i.test(h)){this._markPlaylistEmpty(t),this._notify(o(l));return}if(!/match|target|not a valid|does not support|unsupported/i.test(h)){this._notify(o(l));return}}try{await this._call("play_media",{media_content_id:t.contentId,media_content_type:s}),a()}catch(l){/nothing to play here/i.test(l?.message||"")&&this._markPlaylistEmpty(t),this._notify(o(l)||e("browseFailed"))}}_markPlaylistEmpty(t){this._drawer.mode==="playlists"&&(this._drawer={...this._drawer,items:this._drawer.items.map(e=>e.contentId===t.contentId?{...e,empty:!0}:e)},this.requestUpdate())}_closeDrawer(){this._teardownQueueSubscription(),this._drawer={...this._drawer,open:!1},this.requestUpdate(),setTimeout(()=>{this._drawer.open||(this._drawer=this._emptyDrawer(),this._queueLoadToken+=1,this.requestUpdate())},la)}async _fetchBrowse(){let t=this._hass,e=t?.connection,i=E(t?.language),s=this._drawer.cursor>=0?this._drawer.nodes[this._drawer.cursor]:null,a={type:"media_player/browse_media",entity_id:this._eid()};if(s&&(a.media_content_id=s.contentId,s.contentType&&(a.media_content_type=s.contentType)),this._drawer={...this._drawer,loading:!0,error:""},this.requestUpdate(),!e?.sendMessagePromise){this._drawer={...this._drawer,loading:!1,error:i("browseFailed")},this.requestUpdate();return}try{let r=await e.sendMessagePromise(a),o=(r?.children||[]).map(l=>({title:l.title||"",subtitle:Re(l.media_class,this._hass?.language)||l.media_content_type||"",contentId:l.media_content_id||"",contentType:l.media_content_type||"",thumb:l.thumbnail||"",canPlay:!!l.can_play,canExpand:!!l.can_expand,cls:l.media_class||""}));if(this._drawer.mode!=="library")return;this._drawer={...this._drawer,loading:!1,items:o,title:s?.title||r?.title||i("library"),error:""}}catch(r){if(this._drawer.mode!=="library")return;this._drawer={...this._drawer,loading:!1,items:[],error:r?.message?`${i("browseFailed")} \xB7 ${String(r.message).slice(0,40)}`:i("browseFailed")}}this.requestUpdate()}_enterBrowseItem(t){if(!t.canExpand){t.canPlay&&this._playBrowseItem(t);return}let e=this._drawer.nodes.slice(0,this._drawer.cursor+1);e.push({contentId:t.contentId,contentType:t.contentType,title:t.title}),this._drawer={...this._drawer,nodes:e,cursor:e.length-1,title:t.title,items:[]},this.requestUpdate(),this._fetchBrowse()}_browseBack(){this._drawer.cursor<0||(this._drawer={...this._drawer,cursor:this._drawer.cursor-1,items:[]},this.requestUpdate(),this._fetchBrowse())}updated(){let t=this.renderRoot?.querySelector?.(".hm-card");if(!t)return;this._thumbMode()&&t.querySelectorAll(".hm-bg-art").forEach(s=>{s.style.backgroundImage&&(s.style.backgroundImage=""),s.classList.remove("on")});let e=this._readMedia(),i=this._eid();this._safeEffect("art",()=>{this._syncArt(e,i),this._artUrl!==this._artApplied&&this._crossFadeArt(t,this._artUrl)}),this._safeEffect("range",()=>this._syncRangeValues()),this._safeEffect("studio",()=>this._syncStudioQueue()),this._safeEffect("panel",()=>{this._syncPanelFlag(),this._queuePanelFit()}),this._safeEffect("dock",()=>{this._installDock(),this._installLyricDock()}),this._safeEffect("cover-spin",()=>this._syncCoverSpinEffect()),this._safeEffect("cover-eq",()=>this._syncCoverEq()),this._safeEffect("lyrics",()=>{this._maybeLoadLyrics(),(this._lyricsOpen||this._sideLyricsVisible())&&this._lyricsActive!==this._lyricsScrolled&&(this._lyricsScrolled=this._lyricsActive,this._centerActiveLyric()),this._observeLyricsScroll()}),this._safeEffect("spectrum",()=>this._syncSpectrum()),this._safeEffect("ticker",()=>this._syncProgressTicker())}_safeEffect(t,e){try{e()}catch(i){if(this._effectErrors||(this._effectErrors=new Set),this._effectErrors.has(t))return;this._effectErrors.add(t),console.error(`ha-music: ${t} \u540C\u6B65\u5931\u8D25`,i)}}_syncCoverSpinEffect(){let t=this.renderRoot?.querySelector?.(".hm-cover img");t&&wt(t,this._state()?.state==="playing")}_queuePanelFit(){if(this._fitPanelRaf&&cancelAnimationFrame(this._fitPanelRaf),typeof requestAnimationFrame>"u"){this._fitPanel(),this._layoutWideCluster();return}this._fitPanelRaf=requestAnimationFrame(()=>{this._fitPanelRaf=null,this._fitPanel(),this._layoutWideCluster()})}_fitPanel(){if(!this._panel){this.style.removeProperty("--hm-panel-cover"),this.style.removeProperty("--hm-panel-height"),this._panelHeight=0,this.renderRoot?.querySelector?.(".hm-card")?.classList.remove("hm-short-landscape");return}let t=this.renderRoot?.querySelector?.(".hm-card");if(!t)return;let e=Math.round(window.visualViewport?.height||window.innerHeight||0);if(e<240)return;let i=t.getBoundingClientRect(),s=Math.max(240,Math.min(e,Math.floor(e-Math.max(0,i.top))));s!==this._panelHeight&&(this._panelHeight=s,this.style.setProperty("--hm-panel-height",`${s}px`));let a=this.renderRoot?.querySelector?.(".hm-main");if(!a)return;let r=Math.round(a.clientHeight||0),o=Math.round(a.clientWidth||0);if(r<80||o<80)return;let l=Math.round(t.clientWidth||0),h=Math.round(t.clientHeight||0),c=l<820||h>l*1.15,d=l>=700&&l<=821&&h<=820&&l>=h*1.02;t.classList.toggle("hm-short-landscape",d);let p=c&&!d&&l>=821;t.classList.toggle("hm-panel-stack",p),t.classList.toggle("hm-narrow-panel",c&&!d),t.classList.toggle("hm-panel-compact",c&&!d&&o<560),t.classList.toggle("hm-panel-tight",c&&!d&&h<760);let f;if(d)f=Math.max(120,Math.min(r-96,o*.3,460));else if(c){let y=o<560,x=y?.66:.78,k=h*(y?.34:.42),A=y?120:96;f=Math.max(120,Math.min(o*x,k,r*.62,620,r-A))}else f=Math.max(120,Math.min(r-40,o*.36,680));let u=this.renderRoot?.querySelector?.(".hm-cover-wrap"),m=this.renderRoot?.querySelector?.(".hm-info"),_=10;if(c&&!d&&m){let y=Math.round(m.offsetHeight||0),x=Math.round(parseFloat(getComputedStyle(a).rowGap)||0),k=r-y-x-2;k>90&&(f=Math.min(f,Math.max(84,k-_)))}this.style.setProperty("--hm-panel-cover",`${Math.round(f)}px`),c&&!d?(this.style.setProperty("--hm-cover-size",`${Math.round(f)}px`),this.style.setProperty("--hm-ring-pad",`${_}px`),u&&(u.style.height=`${Math.round(f)+_}px`),m&&(m.style.flex="0 0 auto",m.style.minHeight="0")):u&&(this.style.setProperty("--hm-cover-size",`${this._coverPx(this._layoutKey())}px`),this.style.removeProperty("--hm-ring-pad"),u.style.removeProperty("height"),m&&(m.style.removeProperty("flex"),m.style.removeProperty("min-height")))}_layoutWideCluster(){let t=this.renderRoot,e=t?.querySelector?.(".hm-cover-wrap"),i=t?.querySelector?.(".hm-meta"),s=t?.querySelector?.(".hm-lyrics-inline"),a=t?.querySelector?.(".hm-main"),r=t?.querySelector?.(".hm-info");if(!e||!i||(e.style.removeProperty("transform"),i.style.removeProperty("transform"),!s||!a||!r))return;let o=getComputedStyle(r).gridTemplateColumns;if(!o||o==="none"||o.trim().split(/\s+/).length<2)return;let l=t.querySelector(".hm-cover-eq"),h=a.getBoundingClientRect(),c=s.getBoundingClientRect(),d=e.getBoundingClientRect(),p=l?.getBoundingClientRect?.(),f=p&&p.width>0?p.left:d.left,u=i.getBoundingClientRect(),m=u.left;for(let T of i.children){let R=document.createRange();R.selectNodeContents(T);let z=R.getBoundingClientRect();z.width>0&&(m=Math.max(m,z.right))}m<=u.left&&(m=u.right);let _=h.left,y=c.left-Math.max(16,h.width*.012),x=(f+m)/2,k=(_+y)/2,A=Math.max(0,y-m),P=Math.max(0,Math.min(k-x,A));if(P<1)return;let S=`translateX(${P.toFixed(1)}px)`;e.style.transform=S,i.style.transform=S}_isPanelContext(){if(this.closest?.("hui-panel-view"))return!0;let t=this.getRootNode?.();for(;t;){let e=t.host;if(!e)break;if(String(e.tagName||"").toLowerCase()==="hui-panel-view")return!0;t=e.getRootNode?.()}return!1}_syncPanelFlag(){let t=this._isPanelContext();t!==this._panel&&(this._panel=t,this.setAttribute("data-panel",String(t)),this.renderRoot?.querySelector?.(".hm-card")?.setAttribute("data-panel",String(t)))}_isThumbnailPreview(){let t=this.getRootNode?.();for(;t;){let e=t.host;if(!e)break;let i=String(e.tagName||"").toLowerCase();if(i==="hui-card-preview"||i==="hui-suggestion-card"||i==="hui-card"&&e.preview===!0)return!0;t=e.getRootNode?.()}return!!this.closest?.("hui-card-preview, hui-suggestion-card")}_thumbMode(){return this.preview===!0||this.editMode===!0||this._thumbPreview}_thumbTier(){let t=this._width||0,e=this._height||0;return t>=700&&e>=500?"lg":t>=440||e>=520?"md":"sm"}_isPreviewContext(){let t=this.getRootNode?.();for(;t;){let e=t.host;if(!e)break;let i=String(e.tagName||"").toLowerCase();if(i==="hui-card-preview"||i==="hui-card-options"||i==="hui-dialog-edit-card"||i==="ha-dialog")return!0;t=e.getRootNode?.()}return!!this.closest?.("hui-card-preview, hui-card-options")}_isMobileUi(){return this._mobileMq?!!this._mobileMq.matches:na()}_installDock(){if(this._isPreviewContext())return;if(this._isMobileUi()&&this._config?.mobile_hide_dock!==!1){ue(),this._dockOwner=!1;return}let t=this._config?.dock,e=rt(this._config?.dock_entities),i=V(this._config?.dock_themes),s=K(),a=s?s.modes:B(t),r=s?s.entities:e,o=s?s.themes:i,l=this._eid?.()||this._config?.entity||(Array.isArray(this._config?.entities)?this._config.entities[0]:"");if(!a.length){s&&!this._isPreviewContext()&&(ue(),this._dockOwner=!1);return}if(!this._hass||!this.isConnected||!l)return;let h={};for(let d of a){let p=r[d]||l;p&&(h[d]=p)}let c=Object.entries(h).map(([d,p])=>({mode:d,entity:p,hass:this._hass,theme:o[d]||this._themeKey()}));Ht(c),s||de({modes:Object.keys(h),entities:h,themes:Object.fromEntries(Object.keys(h).map(d=>[d,o[d]||this._themeKey()]))}),this._dockOwner=!0}_lyricsSource(){return this._lyrics?.source||"Music Assistant"}_installLyricDock(){if(this._isPreviewContext())return;if(this._isMobileUi()&&this._config?.mobile_hide_lyrics!==!1){me(),this._lyricDockOwner=!1;return}let t=this._config?.floating_lyrics!==!1,e=Number(this._config?.floating_lyrics_edited)||0,i=pe(),s=e>0&&e>=(i?.updated||0),a=s?t:i?i.enabled:t,r=this._eid?.()||this._config?.entity||(Array.isArray(this._config?.entities)?this._config.entities[0]:"");if(!a){!this._isPreviewContext()&&(s||this._lyricDockOwner)&&(Ge({enabled:!1,entity:r,updated:e||Date.now()}),me(),this._lyricDockOwner=!1);return}if(!this._hass||!this.isConnected||!r||this._isPreviewContext())return;let o=this._state(r),l=this._trackKeyFor(r,o),h=this._lyrics.status==="ready"?this._lyrics.lines:[];jt({enabled:!0,entity:r,preferredEntity:r,auto:this._config?.floating_lyrics_auto!==!1,source:this._lyricsSource(),theme:this._themeKey(),hass:this._hass,lines:h,plain:this._lyrics.plain,trackKey:l,status:this._lyrics.status,offset:this._lyricsOffset}),Ge({enabled:!0,entity:r,updated:e||i?.updated||Date.now()}),this._lyricDockOwner=!0}_trackKeyFor(t,e){let i=e?.attributes||{},s=i.media_metadata||{};return[t,s.title||i.media_title||"",s.artist||i.media_artist||"",s.album_name||i.media_album_name||"",s.duration??i.media_duration??0,i.media_content_id||""].map(a=>String(a)).join("|")}_syncArt(t,e){let i=this._state(),a=!i||i.state==="unavailable"||i.state==="unknown"?"":t?.art||"";if(a===this._artSource)return;this._artSource=a,this._artFailedSource="";let r=++this._artSeq;if(this._artLoading="",!a){this._artUrl="",this._artApplied="",this.requestUpdate();return}ie(this._hass,a,e).then(o=>{if(r!==this._artSeq||o===this._artUrl)return;this._artUrl=o,this.requestUpdate();let l=this.renderRoot?.querySelector?.(".hm-card");l&&this._crossFadeArt(l,o)})}_artUrlFor(){let t=this._readMedia();return it(this._hass,t.art)}_onArtError(){if(!this._artSource)return;this._artFailedSource=this._artSource,this._artUrl="",this._artApplied="",this._artLoading="",(this.renderRoot?.querySelector?.(".hm-card")?.querySelectorAll?.(".hm-bg-art")||[]).forEach(i=>{i.classList.remove("on"),i.style.backgroundImage=""}),this._artSlot=0,this._maybePalette(""),this.requestUpdate()}_crossFadeArt(t,e){let i=t.querySelectorAll(".hm-bg-art");if(!i.length)return;if(this._thumbMode()){this._artLoading="",this._artApplied="",i.forEach(l=>{l.classList.remove("on"),l.style.backgroundImage=""});return}if(!e){this._artLoading="",this._artApplied="",i.forEach(l=>{l.classList.remove("on"),l.style.backgroundImage=""}),this._artSlot=0,this._maybePalette("");return}if(e===this._artApplied||e===this._artLoading)return;this._artLoading=e;let s=i.length>1?(this._artSlot+1)%2:0,a=i[s],r=i[this._artSlot],o=new Image;o.decoding="async",o.onload=()=>{if(!(this._artLoading!==e||this._artUrl!==e)){if(this._thumbMode()){this._artLoading="",i.forEach(l=>{l.classList.remove("on"),l.style.backgroundImage=""});return}this._artLoading="",this._artApplied=e,a.style.backgroundImage=`url("${e}")`,a.classList.add("on"),r?.classList.remove("on"),this._artSlot=s,this._maybePalette(e)}},o.onerror=()=>{this._artLoading===e&&(this._artLoading=""),this._onArtError()},o.src=e}_maybePalette(t){let e=this._readMedia(),i=t||`${e.title}|${e.artist}|${this._eid()}`;if(this._paletteKey!==i){if(this._paletteKey=i,!t){this._palette=null,this.requestUpdate();return}Hi(t,i).then(s=>{this._paletteKey===i&&(this._palette=s,this.requestUpdate())})}}_stopProgressTicker(){this._progressRaf&&cancelAnimationFrame(this._progressRaf),this._progressRaf=null,this._progressLastSecond=-1,this._progressPaintAt=0}_syncProgressTicker(){if(this._seekPreview!==null||this._state()?.state!=="playing"){this._stopProgressTicker();return}let e=this.renderRoot?.querySelector?.('input.hm-range[data-role="seek"]'),i=this._readMedia();if(!e||!i.duration){this._stopProgressTicker();return}this._progressRaf||(this._progressLastSecond=-1,this._progressRaf=requestAnimationFrame(()=>this._progressTick()))}_progressTick(){if(this._progressRaf=null,this._seekPreview!==null||this._state()?.state!=="playing"){this._progressLastSecond=-1;return}let t=this.renderRoot?.querySelector?.('input.hm-range[data-role="seek"]');if(!t){this._progressLastSecond=-1;return}let e=this._readMedia(),i=Number(e.duration)||0;if(!i){this._progressLastSecond=-1;return}let s=w(Number(e.position)||0,0,i),a=w(s/i*100,0,100),r=performance.now();if(this._isMobileUi()&&this._progressPaintAt&&r-this._progressPaintAt<32){this._progressRaf=requestAnimationFrame(()=>this._progressTick());return}this._progressPaintAt=r,t.value=String(s),t.style.setProperty("--pct",`${a}%`);let o=Math.floor(s);o!==this._progressLastSecond&&(this._progressLastSecond=o,Kt(this.renderRoot?.querySelector?.(".hm-time"),et(s)),Kt(this.renderRoot?.querySelector?.(".hm-time.end"),this._showRemaining?`-${et(Math.max(i-s,0))}`:et(i))),this._progressRaf=requestAnimationFrame(()=>this._progressTick())}_syncRangeValues(){let t=this.renderRoot;if(!t)return;let e=t.querySelector?.('input.hm-range[data-role="seek"]'),i=t.querySelector?.('input.hm-range[data-role="volume"]'),s=this._readMedia(),a=this._volumeInfo(s);if(e&&this._seekPreview===null){let o=s.duration||0,l=w(s.position,0,o||s.position);e.value=String(l),e.max=String(o||0),e.style.setProperty("--pct",`${o?w(l/o*100,0,100):0}%`)}if(i){let o=this._volumePreview===null?a.level:w(this._volumePreview,0,1),l=Math.round(o*100);i.value=String(l),i.style.setProperty("--pct",`${o*100}%`),i.setAttribute("data-disabled",String(!a.supported)),Kt(t.querySelector?.(".hm-vol-pct"),String(l))}let r=t.querySelector?.(".hm-volume .hm-volume-mute");if(r){let o=this._mutedOverride===null?a.muted:this._mutedOverride,l=E(this._hass?.language);r.setAttribute("data-muted",o?"true":"false"),r.setAttribute("data-on",o?"true":"false"),r.setAttribute("aria-label",l(o?"unmute":"mute")),r.setAttribute("title",l(o?"unmute":"mute"))}}getCardSize(){let t=this._shape();if(t==="banner")return 2;if(t==="wide")return 5;let e=this._layoutKey();return e==="mini"?1:e==="compact"?3:6}getGridOptions(){if(this._panel)return{columns:"full",rows:Math.max(6,this.getCardSize()),min_columns:12,min_rows:4,max_columns:24,max_rows:24};let t=this._width||0,e=this._height||0,i;return e?i=Math.ceil((e+8)/64):i=t>=760?7:6,i=Math.min(24,Math.max(4,i)),{columns:12,rows:i,min_columns:4,max_columns:24,min_rows:i,max_rows:24}}getLayoutOptions(){let t=this.getGridOptions();return{grid_columns:t.columns==="full"?12:t.columns,grid_rows:typeof t.rows=="number"?t.rows:this.getCardSize(),grid_min_columns:t.min_columns,grid_max_columns:t.max_columns,grid_min_rows:t.min_rows,grid_max_rows:t.max_rows}}_observeLyricsScroll(){if(typeof ResizeObserver>"u")return;let t=this.renderRoot?.querySelector?.(".hm-lyrics-scroll");!t||t===this._lyricsScrollObserved||(this._lyricsScrollObserver?.disconnect(),this._lyricsScrollObserved=t,this._lyricsScrollObserver=new ResizeObserver(()=>{this._lyricsActive>=0&&t.isConnected&&this._centerActiveLyric()}),this._lyricsScrollObserver.observe(t))}_centerActiveLyric(){if(typeof requestAnimationFrame>"u")return;let t=(e=0)=>{requestAnimationFrame(()=>{let i=this.renderRoot?.querySelector?.(".hm-lyrics-scroll"),s=this.renderRoot?.querySelector?.('.hm-lyrics-line[data-active="true"]');if(!i||!s)return;let a=i.clientHeight;if(a<24){e<4&&t(e+1);return}let o=`${Math.max(0,Math.round((a-s.offsetHeight)/2))}px`;i.style.paddingTop!==o&&(i.style.paddingTop=o,i.style.paddingBottom=o),i.offsetHeight;let l=()=>{let c=i.getBoundingClientRect(),d=s.getBoundingClientRect(),p=i.scrollTop+d.top-c.top-c.height/2+d.height/2;return Math.max(0,p)};i.scrollTo({top:l(),behavior:"smooth"});let h=()=>{this.renderRoot?.querySelector?.(".hm-lyrics-scroll")!==i||this.renderRoot?.querySelector?.('.hm-lyrics-line[data-active="true"]')!==s||(i.scrollTop=l())};"onscrollend"in i?i.addEventListener("scrollend",h,{once:!0}):setTimeout(h,420)})};t()}_renderLyrics(t,e,i=!1){let s=E(this._hass?.language),a=this._lyrics,r=a.lines.length>0,o=a.plain||[],l=Number.isInteger(a.index)?a.index:-1,h=r?{index:l,progress:Number(a.progress)||0}:{index:-1,progress:0},c=r?Math.max(0,h.index):-1,d=c>=0?h.progress:0,p=c!==this._lyricsActive;this._lyricsActive=c,p&&c>=0&&(this._lyricsScrolled=c,this._centerActiveLyric());let f=q(this._state(),C.SEEK),u=`${this._lyricsOffset>0?"+":""}${this._lyricsOffset.toFixed(1)}s`,m=b;if(a.protocol===!1)m=g`<div class="hm-lyrics-empty">
        ${a.message||vt(this._hass?.language)}
      </div>`;else if(a.status==="loading")m=b;else{if(a.status==="none"||a.status==="error")return b;if(a.instrumental)m=g`<div class="hm-lyrics-empty">${s("lyricsInstrumental")}</div>`;else if(r)m=a.lines.map((_,y)=>g`<button
          class="hm-lyrics-line"
          data-active=${y===c?"true":"false"}
          data-time=${_.time}
          style=${`--hm-line-progress:${y===c?Math.round(d*100):0}%`}
          @click=${()=>{f&&this._seekTo(Math.max(0,_.time-this._lyricsOffset))}}
        >
          <span class="hm-lyrics-text">${_.text}</span>
        </button>`);else if(o.length)m=o.map(_=>g`<div class="hm-lyrics-line" data-static="true">${_}</div>`);else return b}return g`<section class="hm-lyrics ${i?"hm-lyrics-inline":""}" data-status=${a.status}>
      <div class="hm-lyrics-head">
        <span class="hm-lyrics-title">${s("lyrics")}</span>
        ${a.source?g`<span class="hm-lyrics-source">${a.source}</span>`:b}
        <div class="hm-lyrics-offset" title=${s("lyricsOffset")}>
          <button
            type="button"
            aria-label="-0.5s"
            @click=${_=>{_.stopPropagation(),this._bumpLyricsOffset(-.5)}}
          >−</button>
          <span>${u}</span>
          <button
            type="button"
            aria-label="+0.5s"
            @click=${_=>{_.stopPropagation(),this._bumpLyricsOffset(.5)}}
          >+</button>
        </div>
        ${i?b:g`<button
              class="hm-lyrics-close"
              aria-label=${s("close")}
              title=${s("close")}
              @click=${_=>{_.stopPropagation(),this._toggleLyrics()}}
            >
              ${$("close",14)}
            </button>`}
      </div>
      <div class="hm-lyrics-scroll">${m}</div>
    </section>`}render(){let t=this._hass,e=this._config||{},i=E(t?.language),s=this._layoutKey(),a=this._themeKey();if(!t)return g`
        <div class="hm-card" data-layout=${s}
        data-shape=${this._shape()} data-panel=${this._panel?"true":"false"} data-thumb=${this._thumbMode()?this._thumbTier():"false"} data-theme=${a} style=${X(this._styleVars())}>
          <div class="hm-body">
            <div class="hm-empty">${i("loading")}</div>
          </div>
        </div>
      `;let r=this._eid(),o=t.states?.[r];if(!o)return g`
        <div class="hm-card" data-layout=${s}
        data-shape=${this._shape()} data-panel=${this._panel?"true":"false"} data-thumb=${this._thumbMode()?this._thumbTier():"false"} data-theme=${a} style=${X(this._styleVars())}>
          <div class="hm-body">
            <div class="hm-empty">
              ${r?`\u5B9E\u4F53\u672A\u627E\u5230\uFF1A${r}`:"ha-music: entity \u672A\u914D\u7F6E"}
            </div>
          </div>
        </div>
      `;let l=this._readMedia(),h=Oe(o,e.max_queue??40),c=o.state==="playing"||o.state==="buffering",d=ca(o.state),p=i(d),f=l.album||l.series||l.appName||(d==="playing"?i("playing"):p),u=this._volumeInfo(l),m=this._mutedOverride===null?u.muted:!!this._mutedOverride,_=e.show_volume!==!1&&(u.supported||this.preview===!0),y=_&&!this._thumbMode()&&s!=="mini"&&(this._isMobileUi()||s==="compact"||(this._width||0)<620),x=this.preview===!0&&this._thumbTier()!=="sm",k=x||q(o,C.SHUFFLE_SET),A=x||q(o,C.REPEAT_SET),P=x||q(o,C.PREVIOUS_TRACK),S=x||q(o,C.NEXT_TRACK),T=this.preview===!0||q(o,C.PLAY)||q(o,C.PAUSE),R=o.state==="off"||o.state==="standby",z=R?q(o,C.TURN_ON):q(o,C.TURN_OFF),O=q(o,C.BROWSE_MEDIA),U=this._isMaPlayer(r),W=this._maEnabled(),nt=q(o,C.SEEK),si=Array.isArray(o.attributes?.source_list)?o.attributes.source_list:[],ai=Array.isArray(o.attributes?.sound_mode_list)?o.attributes.sound_mode_list:[],ri=e.show_source!==!1&&si.length>0&&q(o,C.SELECT_SOURCE),ni=ai.length>0&&q(o,C.SELECT_SOUND_MODE),fe=l.groupMembers.filter(v=>v&&v!==r),oi=e.show_group!==!1&&l.groupMembers.length>1,Wt=!!t.services?.ha_music_studio,bs=e.show_queue!==!1&&(h.length>0||U&&(!!o.attributes?.active_queue||Wt)),ys=e.show_library!==!1&&O,ge=e.visualizer||"bars",xs=e.cover||"ambient",ot=l.duration,lt=this._seekPreview??l.position,li=ot?w(lt/ot*100,0,100):0,_e=this._waveBars(),be=Math.round((this._volumePreview??u.level)*100),_t=this._repeatValue(),Gt=l.title||"",hi=this._entities(),ci=this._lyricsEnabled()&&!this._thumbMode()&&s!=="mini"&&(this._lyrics.status==="ready"||this._lyrics.status==="loading"||this._lyrics.status==="error"||this._lyricsOpen),Pt=ci&&!this._lyricsOpen&&this._lyrics.status==="ready"&&this._sideLyricsVisible(),di=this._lyrics.status==="ready"&&this._lyrics.lines.length&&Number.isInteger(this._lyrics.index)&&this._lyrics.index>=0&&this._lyrics.lines[this._lyrics.index]?.text||"",ui=o.state==="unavailable"||o.state==="unknown"?"":this._artUrl;return g`
      <div
        class="hm-card"
        data-theme=${a}
        data-layout=${s}
        data-shape=${this._shape()}
        data-panel=${this._panel?"true":"false"}
        data-thumb=${this._thumbMode()?this._thumbTier():"false"}
        data-playing=${c?"true":"false"}
        data-cover=${xs}
        data-tight=${this._tight()?"true":"false"}
        data-short=${this._short()?"true":"false"}
        data-micro=${this._micro()?"true":"false"}
        data-spec=${this._audioSpec?"ok":this._callWsError?"err":"none"}
        style=${X(this._styleVars())}
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
              <span class="hm-status-text">${p}</span>
              <span class="hm-kicker-sep">·</span>
              <span class="hm-status-text hm-status-player">${e.name||mt(t,r,r)}</span>
            </div>
            <div class="hm-top-actions">
              ${ci?g`<button
                    class="hm-icon-btn hm-lyrics-btn"
                    data-role="lyrics"
                    data-active=${this._lyricsOpen||Pt?"true":"false"}
                    aria-label=${i("lyrics")}
                    title=${i("lyrics")}
                    @click=${()=>this._toggleLyrics()}
                  >
                    ${$("lyrics",16)}
                  </button>`:b}
              ${W?g`<button
                    class="hm-icon-btn hm-ma"
                    aria-label=${i("openAssistant")}
                    title=${i("openAssistant")}
                    @click=${()=>this._onAssistantButton()}
                  >
                    ${$("ma",16)}
                  </button>`:b}
              ${Wt?g`<button
                    class="hm-icon-btn hm-players-btn"
                    data-role="players"
                    aria-label=${i("devices")}
                    title=${i("devices")}
                    @click=${()=>this._openPlayers()}
                  >
                    ${$("speaker",16)}
                  </button>`:b}
              ${bs?g`<button
                    class="hm-icon-btn"
                    aria-label=${i("queue")}
                    title=${i("queue")}
                    @click=${()=>this._openQueue()}
                  >
                    ${$("queue",16)}
                  </button>`:b}
              ${ys?g`<button
                    class="hm-icon-btn"
                    aria-label=${i("library")}
                    title=${i("library")}
                    @click=${()=>this._openLibrary()}
                  >
                    ${$("library",16)}
                  </button>`:b}
              ${z?g`<button
                    class="hm-icon-btn"
                    data-role="power"
                    aria-label=${i("power")}
                    title=${i("power")}
                    @click=${()=>this._power()}
                  >
                    ${$("power",16)}
                  </button>`:b}
              <button
                class="hm-icon-btn"
                data-role="more"
                aria-label=${i("more")}
                title=${i("more")}
                @click=${()=>this._moreInfo()}
              >
                ${$("more",16)}
              </button>
            </div>
          </header>

          ${hi.length>1?g`
                <div class="hm-entities">
                  ${hi.map(v=>{let D=t.states?.[v],G=v===r&&this._artUrl?this._artUrl:it(t,D?.attributes?.entity_picture),ht=D?.state==="playing"||D?.state==="buffering";return g`<button
                      class="hm-entity-chip"
                      data-active=${v===r?"true":"false"}
                      data-playing=${ht?"true":"false"}
                      aria-label=${ht?`${mt(t,v,v)} ${i("playing")}`:mt(t,v,v)}
                      @click=${()=>this._switchEntity(v,!0)}
                    >
                      <span
                        class="hm-entity-dot"
                        style=${G?`background-image:url("${G}")`:""}
                      ></span>
                      <span class="hm-entity-name">${mt(t,v,v)}</span>
                      ${ht?g`<span class="hm-entity-eq" aria-hidden="true">
                            <i></i><i></i><i></i>
                          </span>`:b}
                    </button>`})}
                </div>`:b}

          ${this._lyricsOpen?this._renderLyrics(l,lt):g`<section class="hm-main" data-side-lyrics=${Pt?"true":"false"}>
            <div class="hm-cover-wrap">
              ${this._thumbMode()?b:g`<canvas class="hm-cover-eq" aria-hidden="true"></canvas>`}
              <button
                class="hm-cover"
                data-playing=${c?"true":"false"}
                data-gesture=${this._coverGesture||""}
                aria-label=${i(c?"pause":"play")}
                title=${Gt||i("noMedia")}
                @pointerdown=${v=>this._onCoverPointerDown(v)}
                @pointermove=${v=>this._onCoverPointerMove(v)}
                @pointerup=${v=>this._onCoverPointerUp(v)}
                @pointercancel=${()=>this._onCoverPointerCancel()}
                @dragstart=${v=>v.preventDefault()}
                @click=${()=>this._onCoverClick()}
              >
                ${ui?g`<img
                      src=${ui}
                      alt=${Gt||""}
                      draggable="false"
                      @error=${()=>this._onArtError()}
                    />`:g`<span class="hm-cover-ph">${$("music",40)}</span>`}
              </button>
            </div>

            <div class="hm-info" data-side-lyrics=${Pt?"true":"false"}>
            <div class="hm-meta">
              <div class="hm-kicker">
                ${f||i("noMedia")}
                ${l.track?g`<span class="hm-kicker-sep">·</span>
                      <span>${i("track")} ${l.track}</span>`:b}
              </div>
              <h2 class="hm-title ${Gt?"":"placeholder"}">
                ${Gt||(x?"Music Assistant":this.preview===!0?"HA Music":i("noTitle"))}
              </h2>
              <div class="hm-artist">
                ${l.artist||(l.album?l.album:x?"\u64AD\u653E\u5668\u9884\u89C8 \xB7 \u9009\u4E2D\u64AD\u653E\u5668\u540E\u663E\u793A\u66F2\u76EE":p)}
              </div>
              ${this._audioSpecText()&&!x?g`<div class="hm-spec" title=${this._audioSpecText()}>
                    <span class="hm-spec-full">${this._audioSpecText()}</span>
                    <span class="hm-spec-short">${this._audioSpecText(!0)}</span>
                  </div>`:this._config?.debug?g`<div class="hm-spec">
                      ${`\u89C4\u683C\u672A\u8BFB\u53D6 \xB7 spec=${this._audioSpec?"set":"null"} \xB7 ma=${this._isMaPlayer()?"y":"n"} \xB7 ${this._specError||this._callWsError||"no-error"}`}
                    </div>`:b}
              ${ri||ni||oi?g`<div class="hm-tags">
                    ${ri?g`<button
                          class="hm-chip interactive"
                          @click=${()=>{this._menu=this._menu==="source"?null:"source",this.requestUpdate()}}
                        >
                          <span class="hm-chip-label">${i("source")}</span>
                          <span class="hm-chip-value">${l.source||"\u2014"}</span>
                        </button>`:b}
                    ${ni?g`<button
                          class="hm-chip interactive"
                          @click=${()=>{this._menu=this._menu==="sound"?null:"sound",this.requestUpdate()}}
                        >
                          <span class="hm-chip-label">${i("soundMode")}</span>
                          <span class="hm-chip-value">${l.soundMode||"\u2014"}</span>
                        </button>`:b}
                    ${oi?g`<span
                          class="hm-chip ${q(o,C.GROUPING)?"interactive":""}"
                          title=${q(o,C.GROUPING)?`${i("group")} \xB7 ${i("groupLeave")}`:i("group")}
                          @click=${()=>{q(o,C.GROUPING)&&this._leaveGroup()}}
                        >
                          ${$("group",13)}
                          <span class="hm-group">
                            ${fe.slice(0,3).map(v=>{let D=t.states?.[v],G=it(t,D?.attributes?.entity_picture);return g`<span
                                class="hm-group-avatar"
                                title=${mt(t,v,v)}
                                style=${G?`background-image:url("${G}")`:""}
                              ></span>`})}
                            ${fe.length>3?g`<span class="hm-group-more">+${fe.length-3}</span>`:b}
                          </span>
                        </span>`:b}
                  </div>`:b}
              ${Wt&&!this._thumbMode()&&s!=="mini"?g`<div class="hm-modes">
                    <button
                      class="hm-mode"
                      data-role="autoplay"
                      data-on=${this._studioAutoplay?"true":"false"}
                      aria-pressed=${this._studioAutoplay?"true":"false"}
                      title=${i("autoplay")}
                      @click=${()=>this._toggleStudioAutoplay()}
                    >
                      ${$("autoplay",14)}<span>${i("autoplay")}</span>
                    </button>
                    <button
                      class="hm-mode"
                      data-role="crossfade"
                      data-on=${this._studioCrossfade?"true":"false"}
                      aria-pressed=${this._studioCrossfade?"true":"false"}
                      title=${i("crossfade")}
                      @click=${()=>this._toggleStudioCrossfade()}
                    >
                      ${$("crossfade",14)}<span>${i("crossfade")}</span>
                    </button>
                  </div>`:b}
              ${di&&!Pt&&s==="full"&&!this._thumbMode()&&(this._panel||this._height>=360)?g`<div class="hm-now-lyric">
                    <span class="hm-now-lyric-mark">${$("lyrics",12)}</span>
                    <span>${di}</span>
                  </div>`:b}
            </div>
            ${Pt?this._renderLyrics(l,lt,!0):b}
            </div>
          </section>`}

          ${ge!=="none"&&!this._lyricsOpen?g`<div
                class="hm-vis"
                data-playing=${c?"true":"false"}
                data-style=${ge}
              >
                ${this._renderVisualizer(ge,l)}
              </div>`:b}

          ${ot>0||x?g`<section class="hm-progress">
                <span class="hm-time">${et(lt)}</span>
                ${_e.length?g`<div
                      class="hm-wave"
                      data-role="seek"
                      data-disabled=${nt?"false":"true"}
                      role="slider"
                      tabindex="0"
                      aria-label=${i("seek")}
                      aria-valuemin="0"
                      aria-valuemax=${ot}
                      aria-valuenow=${lt}
                      @click=${v=>this._onWaveformClick(v)}
                    >
                      ${_e.map((v,D)=>g`<span
                          class="hm-wave-bar"
                          data-past=${D/_e.length<=li/100?"true":"false"}
                          style=${X({"--h":`${Math.round(6+v*94)}%`})}
                        ></span>`)}
                    </div>`:g`<input
                      class="hm-range"
                      data-role="seek"
                      type="range"
                      min="0"
                      max=${ot}
                      step="0.01"
                      .value=${String(lt)}
                      data-disabled=${nt?"false":"true"}
                      style=${X({"--pct":`${li}%`})}
                      @input=${this._onSeekInput}
                      @change=${this._onSeekCommit}
                      aria-label=${i("seek")}
                    />`}
                <span
                  class="hm-time end hoverable"
                  title=${i("remaining")}
                  @click=${()=>{this._showRemaining=!this._showRemaining,this.requestUpdate()}}
                >
                  ${this._showRemaining?`-${et(Math.max(ot-lt,0))}`:et(ot)}
                </span>
              </section>`:b}

          <section
            class="hm-controls ${y?"is-stacked":""}"
            data-volume-below=${y?"true":"false"}
          >
            <div class="hm-transport">
              ${Wt?g`<button
                    class="hm-btn hm-favorite"
                    data-role="favorite"
                    data-on=${this._studioFavorite?"true":"false"}
                    aria-label=${this._studioFavorite?i("favoriteOn"):i("favorite")}
                    title=${this._studioFavorite?i("favoriteOn"):i("favorite")}
                    @click=${()=>this._toggleStudioFavorite()}
                  >
                    ${$(this._studioFavorite?"heartFill":"heart",18)}
                  </button>`:b}
              ${k?g`<button
                    class="hm-btn"
                    data-role="shuffle"
                    data-on=${l.shuffle?"true":"false"}
                    aria-label=${i("shuffle")}
                    title=${i("shuffle")}
                    @click=${()=>this._shuffle()}
                  >
                    ${$("shuffle",18)}
                  </button>`:b}
              ${P?g`<button
                    class="hm-btn"
                    data-role="previous"
                    aria-label=${i("previous")}
                    title=${i("previous")}
                    @click=${()=>this._skip("prev")}
                  >
                    ${$("previous",18)}
                  </button>`:b}
              ${T?g`<button
                    class="hm-play ${c?"is-playing":""}"
                    aria-label=${i(c?"pause":"play")}
                    title=${i(c?"pause":"play")}
                    @click=${()=>this._togglePlay()}
                  >
                    ${c?$("pause",26):$("play",26)}
                  </button>`:b}
              ${S?g`<button
                    class="hm-btn"
                    aria-label=${i("next")}
                    title=${i("next")}
                    @click=${()=>this._skip("next")}
                  >
                    ${$("next",18)}
                  </button>`:b}
              ${A?g`<button
                    class="hm-btn"
                    data-role="repeat"
                    data-on=${_t!=="off"?"true":"false"}
                    aria-label=${i(_t==="one"?"repeatOne":_t==="all"?"repeatAll":"repeatOff")}
                    title=${i(_t==="one"?"repeatOne":_t==="all"?"repeatAll":"repeatOff")}
                    @click=${()=>this._repeat()}
                  >
                    ${$(_t==="one"?"repeatOne":"repeat",18)}
                  </button>`:b}
            </div>

            ${_?g`<div class="hm-volume">
                  <button
                    class="hm-icon-btn hm-volume-mute"
                    data-muted=${m?"true":"false"}
                    data-on=${m?"true":"false"}
                    aria-label=${i(m?"unmute":"mute")}
                    title=${i(m?"unmute":"mute")}
                    @click=${()=>this._toggleMute()}
                  >
                    <span class="hm-vol-ico hm-vol-ico-on">${$("volume",16)}</span>
                    <span class="hm-vol-ico hm-vol-ico-muted">${$("mute",16)}</span>
                  </button>
                  <button
                    class="hm-icon-btn hm-vol-step"
                    aria-label=${i("volumeDown")}
                    title=${i("volumeDown")}
                    @click=${()=>this._volumeStep(-.05)}
                  >
                    ${$("minus",16)}
                  </button>
                  <input
                    class="hm-range"
                    data-role="volume"
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    .value=${String(be)}
                    style=${X({"--pct":`${be}%`})}
                    @input=${this._onVolumeInput}
                    @change=${this._onVolumeCommit}
                    aria-label=${i("volume")}
                  />
                  <button
                    class="hm-icon-btn hm-vol-step"
                    aria-label=${i("volumeUp")}
                    title=${i("volumeUp")}
                    @click=${()=>this._volumeStep(.05)}
                  >
                    ${$("plus",16)}
                  </button>
                  <span class="hm-vol-pct">${be}%</span>
                </div>`:b}
          </section>
        </div>

        ${this._menu?g`<div class="hm-menu">
              <div class="hm-menu-head">
                ${this._menu==="source"?i("source"):i("soundMode")}
              </div>
              ${(this._menu==="source"?si:ai).map(v=>g`<button
                  class="hm-menu-item"
                  data-active=${(this._menu==="source"?l.source:l.soundMode)===v?"true":"false"}
                  @click=${()=>this._menu==="source"?this._selectSource(v):this._selectSoundMode(v)}
                >
                  <span>${v}</span>
                  <span class="hm-menu-check">${$("check",13)}</span>
                </button>`)}
            </div>`:b}

        ${this._renderDrawer()}

        ${this._playersOpen?g`<div class="hm-players">
              <div class="hm-players-head">
                <span>${i("devices")}</span>
                <button
                  class="hm-icon-btn"
                  aria-label=${i("close")}
                  title=${i("close")}
                  @click=${()=>this._closePlayers()}
                >
                  ${$("close",15)}
                </button>
              </div>
              <div class="hm-players-body">
                ${this._maPlayers.length?this._playersForPanel().map(v=>{let D=this._currentMaPlayer(),G=D?.player_id===v.player_id,ht=(D?.group_members||[]).includes(v.player_id),Qt=this._entityForMaPlayer(v);return g`<div class="hm-player-row" data-current=${G?"true":"false"}>
                        <div class="hm-player-main">
                          <span class="hm-player-dot" data-playing=${v.state==="playing"?"true":"false"}></span>
                          <div class="hm-player-text">
                            <span class="hm-player-name">${v.name}</span>
                            <span class="hm-player-sub">
                              ${ht?i("groupMember"):v.state||i("idle")}
                              ${v.group_members?.length?` \xB7 ${v.group_members.length} ${i("groupUnits")}`:""}
                            </span>
                          </div>
                        </div>
                        <div class="hm-player-actions">
                          ${G?g`<span class="hm-player-badge">${i("groupLeader")}</span>`:g`<button
                                class="hm-player-btn"
                                data-disabled=${!Qt||!v.available?"true":"false"}
                                title=${Qt?"":i("deviceUnavailable")}
                                ?disabled=${!Qt||!v.available}
                                @click=${()=>this._selectMaPlayer(v)}
                              >
                                ${i("selectDevice")}
                              </button>`}
                          ${!G&&Qt&&v.can_group_with?.length!==0?g`<button
                                class="hm-player-btn"
                                data-role="group"
                                data-on=${ht?"true":"false"}
                                data-disabled=${D?"false":"true"}
                                title=${D?"":i("groupLeaderMissing")}
                                ?disabled=${!D}
                                @click=${()=>this._toggleMaGroup(v)}
                              >
                                ${i(ht?"leaveGroup":"joinGroup")}
                              </button>`:b}
                        </div>
                      </div>`}):g`<div class="hm-players-empty">${i("playersEmpty")}</div>`}
              </div>
            </div>`:b}

        <div class="hm-toast ${this._toast?"show":""}">${this._toast}</div>
      </div>
    `}_renderVisualizer(t,e){let i=ee(e);if(t==="wave"){let s=7+i.energy*6+i.low*7,a=4.5+i.pulse*5.5,r=2.2+i.pulse*3.2,o=i.phase,l=`${(i.period*2.4).toFixed(2)}s`;return g`<div class="hm-wave-wrap">
        <svg
          viewBox="0 0 600 40"
          preserveAspectRatio="none"
          aria-hidden="true"
          style=${X({animationDuration:l})}
        >
          <path
            d=${Ye(600,40,150,s,o)}
            fill="none"
            stroke="rgba(var(--hm-a1-rgb), 0.85)"
            stroke-width="1.4"
          ></path>
          <path
            d=${Ye(600,40,150,a,o*1.35+1.9)}
            fill="none"
            stroke="rgba(var(--hm-a2-rgb), 0.6)"
            stroke-width="1.2"
          ></path>
          <path
            d=${Ye(600,40,75,r,o*1.7+3.2)}
            fill="none"
            stroke="rgba(var(--hm-a1-rgb), 0.35)"
            stroke-width="0.9"
          ></path>
        </svg>
      </div>`}return t==="orbit"?g`<div class="hm-orbit-wrap">
        ${[1,.58,.34].map((a,r)=>{let o=r===0?i.low:i.pulse;return g`<span
            class="hm-orbit-ring"
            style=${X({"--react":String(a),"--drive":o.toFixed(3),animationDuration:`${(i.period*(1.8+r*.25)).toFixed(2)}s`,animationDelay:`${(r*i.period*.55).toFixed(2)}s`})}
          ></span>`})}
      </div>`:this._thumbMode()?g`<div class="hm-spectrum hm-spectrum-flat" aria-hidden="true"></div>`:g`<canvas class="hm-spectrum" aria-hidden="true"></canvas>`}_stopSpectrum(){this._spectrumRaf&&cancelAnimationFrame(this._spectrumRaf),this._spectrumRaf=null,this._spectrumLast=0,this._spectrumPaintAt=0}_spectrumPlaying(){let t=this._state()?.state;return t==="playing"||t==="buffering"}_resetAudioShape(){this._bandLevels=Object.assign([.18,.14,.1],{live:!1}),this._bandPeaks=[0,0,0],this._audioShape={bars:[],mean:[],prev:[],peak:0,lowFast:0,lowSlow:0,fluxMean:.02,beatEnv:0,punch:0,low:0}}_ensureAudioShape(t){this._audioShape||this._resetAudioShape();let e=this._audioShape;return e.mean.length!==t&&(e.mean=new Array(t).fill(0),e.prev=new Array(t).fill(0),e.bars=new Array(t).fill(0),e.peak=0,e.lowFast=0,e.lowSlow=0,e.fluxMean=.02,e.beatEnv=0),e}_studioAvailable(){return!!this._hass?.services?.ha_music_studio}_studioSpectrumReady(){return!!(this._studioBands?.length&&Date.now()-this._studioAt<1600)}_resampleStudioBands(t){let e=this._studioBands;if(!e?.length)return null;if(t===e.length)return e.slice();let i=new Array(t);for(let s=0;s<t;s+=1){let a=t>1?s/(t-1)*(e.length-1):0,r=Math.floor(a),o=Math.min(e.length-1,r+1),l=a-r,h=Number(e[r])||0,c=Number(e[o])||0;i[s]=h+(c-h)*l}return i}_studioBandTriplet(){let t=this._studioBands;if(!t?.length)return null;let e=t.length/3;return[0,1,2].map(i=>{let s=Math.floor(i*e),a=Math.max(s+1,Math.round((i+1)*e)),r=0,o=0;for(let l=s;l<Math.min(t.length,a);l+=1)r+=Number(t[l])||0,o+=1;return o?r/o:0})}_ensureStudioSpectrum(){if(!this._studioAvailable()||!this._eid())return;let t=this._eid();if(this._studioKey===t&&(this._studioUnsub||this._studioPending)||this._studioFailedAt&&Date.now()-this._studioFailedAt<60*1e3)return;this._studioUnsub?.(),this._studioUnsub=null,this._studioKey=t,this._studioPending=!0;let e=this._hass?.connection;if(!e?.subscribeMessage){this._studioPending=!1;return}let i;try{i=e.subscribeMessage(s=>{if(!(!s||s.type!=="spectrum"||!Array.isArray(s.bands))){if(!xt(s)){this._studioBands=[],this._studioProtocolError=!0,this._studioProtocolWarned||(this._studioProtocolWarned=!0,console.warn(`[ha-music] ha_music_studio protocol ${s.protocol} != ${1}; spectrum disabled`));return}this._studioProtocolError=!1,this._studioBands=s.bands.map(a=>w(Number(a)||0,0,1.6)),this._studioPeak=Number(s.peak)||0,this._studioRms=Number(s.rms)||0,this._studioFrames=Number(s.frames)||0,this._studioAt=Date.now()}},{type:"ha_music_studio/subscribe",entity_id:t})}catch{this._studioPending=!1,this._studioFailedAt=Date.now();return}Promise.resolve(i).then(s=>{if(this._studioKey!==t){s?.();return}this._studioUnsub=s}).catch(()=>{this._studioFailedAt=Date.now()}).finally(()=>{this._studioKey===t&&(this._studioPending=!1)})}_shapeAudioBars(t){let e=t.length,i=this._ensureAudioShape(e),s=0,a=0,r=0;for(let f=0;f<e;f+=1){let u=t[f]||0;u>s&&(s=u),f<Math.max(3,Math.floor(e/12))&&(a+=u,r+=1)}let o=Math.max(s,i.peak*.978,.05);i.peak=o;let l=r?a/r:0;i.lowFast+=(l-i.lowFast)*.42,i.lowSlow+=(l-i.lowSlow)*.052;let h=i.lowSlow>.001?(i.lowFast-i.lowSlow)/i.lowSlow:0;h=w(h,0,1.6);let c=0;for(let f=0;f<e;f+=1){let u=t[f]-(i.prev[f]||0);u>0&&(c+=u),i.prev[f]=t[f]||0}i.fluxMean+=(c-i.fluxMean)*.04;let d=i.fluxMean>.004?c/(i.fluxMean*2.6)-.4:0;d=w(d,0,1),i.beatEnv=d>i.beatEnv?d:i.beatEnv*.86;let p=new Array(e);for(let f=0;f<e;f+=1){let u=t[f]||0,m=e>1?f/(e-1):0,_=Math.min(.6,u/o),y=i.mean[f]||(u>0?u:.02),x=u/Math.max(.015,y);i.mean[f]=y+(u-y)*.035;let k=Math.pow(m,.6),A=.12+(1.45-.12)*k,P=.94+(.45-.94)*k,S=w((x-P)/A,0,1),T=.72+.22*m,R=_*(1-T)+S*T,z=1.35+.42*(1-m),O=Math.pow(1-m,2),U=R*(1-.28*O*(1-i.beatEnv))+.65*i.beatEnv*O;p[f]=w(U*z*(1+.12*h),0,1)}return i.punch=h,i.low=w((p[0]+p[1]+p[2])/3,0,1),{bars:p,punch:h,low:i.low}}_spectrumAccent(){let t=L[this._themeKey()]||L[N],e=String(this._config?.accent||"");return[/^#[0-9a-f]{3,8}$/i.test(e)?e:t.accent[0],t.accent[1]]}_syncSpectrumCanvas(){if(this._thumbMode())return!1;let t=this.renderRoot?.querySelector?.(".hm-spectrum");if(!t)return this._spectrumCanvas=null,this._spectrumCtx=null,this._spectrumCount=0,!1;let i=(t.parentElement||t).getBoundingClientRect(),s=Math.max(1,Math.round(t.getBoundingClientRect().height||i.height)),a=Math.max(1,Math.round(i.width)),r=s;if(!a||!r)return!1;let o=Math.min(this._isMobileUi()?1.5:2,Math.max(1,Number(window.devicePixelRatio)||1)),l=Math.min(4096,Math.round(a*o)),h=Math.min(1024,Math.round(r*o));t.width!==l&&(t.width=l),t.height!==h&&(t.height=h),t.style.width!=="100%"&&(t.style.width="100%");let c=`${r}px`;t.style.height!==c&&(t.style.height=c),this._spectrumCanvas=t;let d=null;try{d=t.getContext("2d")}catch{d=null}d!==this._spectrumCtx&&(this._spectrumGrad=null),this._spectrumCtx=d,this._spectrumCssW=a,this._spectrumCssH=r,this._spectrumDpr=o;let p=w(Math.round(a/7),48,300);return p!==this._spectrumCount&&(this._spectrumCount=p,this._spectrumLevels=new Array(p).fill(.12)),!0}_drawSpectrum(t,e=!1){let i=this._spectrumCtx,s=this._spectrumCssW,a=this._spectrumCssH,r=this._spectrumDpr,o=t?.length||0;if(!i||!s||!a||!o)return;i.setTransform(r,0,0,r,0,0),i.clearRect(0,0,s,a);let l=s/o,h=Math.min(2.4,Math.max(1.2,l*.34)),c=Math.max(1,l-h),d=Math.min(1.5,c/2),p=this._spectrumAccent(),f=this._isMobileUi(),u=`${p[0]}|${p[1]}|${s}`;if(!this._spectrumGrad||this._spectrumGradKey!==u){let m=i.createLinearGradient(0,0,s,0);m.addColorStop(0,p[0]),m.addColorStop(1,p[1]),this._spectrumGrad=m,this._spectrumGradKey=u}i.fillStyle=this._spectrumGrad,f&&(i.globalAlpha=e?.5:.84);for(let m=0;m<o;m+=1){let _=w(Number(t[m])||0,.02,1),y=Math.max(2,_*a),x=m*l+(l-c)/2,k=a-y;f||(i.globalAlpha=e?.5:.58+_*.36),!f&&typeof i.roundRect=="function"&&c>=3?(i.beginPath(),i.roundRect(x,k,c,y,[d,d,0,0]),i.fill()):i.fillRect(x,k,c,y)}i.globalAlpha=1}_syncSpectrum(){if(!this.renderRoot?.querySelector?.(".hm-spectrum")||this._thumbPreview||(this._config?.visualizer||"bars")!=="bars"){this._spectrumCanvas=null,this._spectrumCtx=null,this._spectrumCount=0,this._stopSpectrum();return}if(!this._syncSpectrumCanvas())return;this._observeSpectrumResize();let e=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches;if(!this._spectrumPlaying()||e){this._stopSpectrum(),this._applySpectrumIdle();return}this._ensureStudioSpectrum(),!this._spectrumRaf&&(this._spectrumLast=0,this._spectrumRaf=requestAnimationFrame(i=>this._spectrumTick(i)))}_observeSpectrumResize(){if(typeof ResizeObserver>"u"||!this._spectrumCanvas?.parentElement)return;let e=this;this._spectrumResizeObserved!==e&&(this._spectrumResizeObserver?.disconnect(),this._spectrumResizeObserved=e,this._spectrumResizeObserver=new ResizeObserver(()=>{this._spectrumResizeRaf||(this._spectrumResizeRaf=requestAnimationFrame(()=>{this._spectrumResizeRaf=0,this._syncSpectrumCanvas()&&(this._spectrumPlaying()||this._applySpectrumIdle())}))}),this._spectrumResizeObserver.observe(e))}_applySpectrumIdle(){let t=ee(this._readMedia()),e=this._spectrumCount;if(!e)return;this._spectrumLevels.length!==e&&(this._spectrumLevels=new Array(e).fill(.12));let i=this._spectrumLevels,s=e/3;for(let a=0;a<e;a+=1){let r=a<s?0:a<s*2?1:2,o=.12+[.1,.06,.03][r],l=Math.min(.24,o+t.energy*.04);i[a]=l}this._drawSpectrum(i,!0)}_spectrumTick(t){if(!this._spectrumCanvas||!this._spectrumCount){this._stopSpectrum();return}if(!this._spectrumPlaying()){this._applySpectrumIdle(),this._stopSpectrum();return}if(t-(this._spectrumSizeAt||0)>500&&(this._spectrumSizeAt=t,!this._syncSpectrumCanvas())){this._stopSpectrum();return}if(this._isMobileUi()&&this._spectrumPaintAt&&t-this._spectrumPaintAt<32){this._spectrumRaf=requestAnimationFrame(u=>this._spectrumTick(u));return}this._spectrumPaintAt=t;let e=this._spectrumLast?Math.min(.05,Math.max(.001,(t-this._spectrumLast)/1e3)):.016;this._spectrumLast=t;let i=this._readMedia(),s=ee(i),a=this._trackKey(this._state());a!==this._spectrumKey&&(this._spectrumKey=a,this._spectrumLevels=new Array(this._spectrumCount).fill(.12)),this._ensureStudioSpectrum();let r=t/1e3,o=this._spectrumLevels,l=this._spectrumCount,h=this._studioSpectrumReady(),c=h?this._resampleStudioBands(l):null,p=(c?this._shapeAudioBars(c):null)?.bars||null,f=h?this._studioBandTriplet():null;if(f){this._bandLevels.live=!0;for(let u=0;u<this._bandLevels.length;u+=1){let m=this._bandLevels[u]||0,_=f[u]||0,y=_>m?.42:.16;this._bandLevels[u]=m+(_-m)*y}}else{this._bandLevels.live=!1;for(let u=0;u<this._bandLevels.length;u+=1)this._bandLevels[u]=Math.max(.06,this._bandLevels[u]*.9)}for(let u=0;u<l;u+=1){let m;if(p){m=p[u];let k=u<l/3?0:u<l*2/3?1:2,A=this._bandLevels[k]||0;m=w(m*(.58+A*.48),.03,1)}else{let k=u<l/3?0:u<l*2/3?1:2,A=j(`${s.seed}#${u}`),P=A%360/360*Math.PI*2,T=1.02-u/Math.max(1,l-1)*.5+Math.sin(u*1.7+P)*.1,R=.5+.5*Math.sin(r*2.35+P+u*.28),z=.5+.5*Math.sin(r*7.6+P*1.7+u*.62),O=.5+.5*Math.sin(i.position/(1.65+s.hash%45/100)*Math.PI*2+P),U=k===0?s.low:k===1?s.pulse:.45,W=Math.sin(r*3.3+A*7e-4)>.88?1.16:1;m=w(T*(.52+R*.54)*(.76+z*.34)*(.8+O*.4)*(.86+U*.24)*W,.1,1)}m=w(.07+Math.pow(w(m,0,1),1.32)*.84,.06,.9),this._isMobileUi()&&(m=w(m*1.3+.02,.08,.94));let _=Number.isFinite(o[u])?o[u]:.12,y=m>_?p?.72:.52:p?.22:.24,x=_+(m-_)*(1-Math.exp(-y*e*60));o[u]=x}this._drawSpectrum(o),this._spectrumRaf=requestAnimationFrame(u=>this._spectrumTick(u))}_renderDrawer(){let t=this._drawer,e=E(this._hass?.language),i=t.mode==="library",s=t.mode==="playlists",a=t.mode==="queue";return g`
      <div
        class="hm-drawer ${t.open?"open":""}"
        role="dialog"
        aria-hidden=${t.open?"false":"true"}
      >
        <div class="hm-drawer-head">
          ${i&&t.cursor>=0?g`<button
                class="hm-icon-btn"
                aria-label=${e("back")}
                title=${e("back")}
                @click=${()=>this._browseBack()}
              >
                ${$("chevronLeft",16)}
              </button>`:b}
          <div class="hm-drawer-title">${t.title||(i?e("library"):"")}</div>
          ${(s||a&&t.maUrl)&&t.maUrl?g`<button
                class="hm-icon-btn hm-ma"
                aria-label=${e("openAssistant")}
                title=${e("openAssistant")}
                @click=${()=>this._openAssistant()}
              >
                ${$("external",15)}
              </button>`:b}
          <button
            class="hm-icon-btn"
            aria-label=${e("close")}
            title=${e("close")}
            @click=${()=>this._closeDrawer()}
          >
            ${$("close",16)}
          </button>
        </div>
        <div class="hm-drawer-body">
          ${a&&t.note?g`<div class="hm-drawer-note">${t.note}</div>`:b}
          ${t.loading?g`<div class="hm-empty"><span class="hm-spinner"></span></div>`:t.error?g`<div class="hm-empty">${t.error}</div>`:t.items.length?this._renderDrawerItems(t.items,t.mode):g`<div class="hm-empty">
                    ${e(i?"browseFailed":s?"playlistsEmpty":"queueEmpty")}
                  </div>`}
        </div>
      </div>
    `}_renderDrawerItems(t,e){let i=E(this._hass?.language),s=e==="library",a=e==="playlists";return t.map(r=>{if(a){let l=it(this._hass,r.thumb);return g`<button
          class="hm-list-item"
          data-empty=${r.empty?"true":"false"}
          @click=${()=>this._playPlaylistItem(r)}
        >
          <span
            class="hm-list-thumb"
            style=${l?`background-image:url("${l}")`:""}
          >
            ${l?b:$("playlist",16)}
          </span>
          <span class="hm-list-text">
            <span class="hm-list-name">${r.title||"\u2014"}</span>
            <span class="hm-list-sub">${r.empty?i("playlistUnavailable"):r.subtitle}</span>
          </span>
          <span class="hm-list-tail">${$("play",14)}</span>
        </button>`}if(s){let l=it(this._hass,r.thumb);return g`<button
          class="hm-list-item"
          @click=${()=>this._enterBrowseItem(r)}
        >
          <span
            class="hm-list-thumb"
            style=${l?`background-image:url("${l}")`:""}
          >
            ${l?b:$(r.canExpand?"library":"music",16)}
          </span>
          <span class="hm-list-text">
            <span class="hm-list-name">${r.title||"\u2014"}</span>
            <span class="hm-list-sub">${r.subtitle}</span>
          </span>
          <span class="hm-list-tail">
            ${r.canExpand?$("chevronRight",14):b}
          </span>
        </button>`}let o=it(this._hass,r.art);return g`<button
        class="hm-list-item"
        data-active=${r.active?"true":"false"}
        @click=${()=>this._playQueueItem(r)}
      >
        <span
          class="hm-list-thumb"
          style=${o?`background-image:url("${o}")`:""}
        >
          ${o?b:$("music",16)}
        </span>
        <span class="hm-list-text">
          <span class="hm-list-name">${r.title||i("noTitle")}</span>
          <span class="hm-list-sub">${r.artist||r.album||""}</span>
        </span>
        <span class="hm-list-tail">${r.duration?et(r.duration):""}</span>
      </button>`})}static getStubConfig(t){let e=t?.states||{};return{entity:Object.keys(e).find(s=>s.startsWith("media_player.")&&e[s]?.attributes?.supported_features!==void 0)||"",theme:N}}static getConfigElement(){return document.createElement("ha-music-editor")}};customElements.get("ha-music")||(customElements.define("ha-music",Xe),window.customCards=window.customCards||[],window.customCards.push({type:Ui,name:Ni,description:"\u73B0\u4EE3\u70AB\u9177\u914D\u8272\u7684\u5168\u529F\u80FD\u97F3\u4E50\u64AD\u653E\u5668\u5361\u7247\uFF1A\u5C01\u9762\u53D6\u8272\u3001\u9891\u8C31\u53EF\u89C6\u5316\u3001\u5A92\u4F53\u5E93\u6D4F\u89C8\u3001\u64AD\u653E\u961F\u5217\u3001\u591A\u8BBE\u5907\u5207\u6362\u3002",preview:!0,documentationURL:"https://github.com/RockJesus/ha-music"}),console.info(`%c HA-MUSIC %c v${Oi} `,"background:#2ee6c5;color:#04121a;font-weight:700;border-radius:4px 0 0 4px","background:#7b5cff;color:#fff;border-radius:0 4px 4px 0"));function da(n,t){n.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}var Je=class extends H{static get properties(){return{hass:{attribute:!1},_config:{state:!0}}}static get styles(){return Et`
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
      .dock-right {
        display: flex;
        align-items: center;
        gap: 6px;
        min-width: 0;
      }
      .dock-theme {
        flex: 0 0 105px;
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
    `}constructor(){super(),this._config={},this._lang="en",this._pendingEntity=!1}setConfig(t){let e=Array.isArray(t?.entities)?t.entities.filter(i=>typeof i=="string"&&i.trim()):void 0;this._config={...t,...e?{entities:e}:{}}}willUpdate(){let t=this.hass?.language||this._lang;t!==this._lang&&(this._lang=t)}get _zh(){return te(this._lang||this.hass?.language)}_update(t){let e={...this._config,...t};Object.keys(e).forEach(i=>{e[i]===void 0&&delete e[i]}),this._config=e,da(this,e)}_optionLabel(t){return this._zh?t.zh:t.en}_dockModes(){let t=K();return t?t.modes:B(this._config?.dock)}_dockEntities(){let t=K();return t?t.entities:rt(this._config?.dock_entities)}_dockThemes(){let t=K();return t?t.themes:V(this._config?.dock_themes)}_syncDockGlobal(t={}){let e=B(t.dock??this._dockModes()),i=rt(t.dock_entities??this._dockEntities()),s=V(t.dock_themes??this._dockThemes());de({modes:e,entities:i,themes:s})}_setDockTheme(t,e){let i={...this._dockThemes()};e?i[t]=e:delete i[t],this._update({dock_themes:i,dock_edited:Date.now()}),this._syncDockGlobal({dock_themes:i})}_mainEntity(){return this._entities()[0]||this._config?.entity||""}_toggleDock(t,e){let i=this._dockModes(),s=this._dockEntities(),a;e?(a=i.includes(t)?i:[...i,t],!s[t]&&this._mainEntity()&&(s[t]=this._mainEntity())):a=i.filter(r=>r!==t),this._update({dock:a.length?a:"none",dock_entities:s,dock_edited:Date.now()}),this._syncDockGlobal({dock:a.length?a:"none",dock_entities:s})}_setDockEntity(t,e){let i={...this._dockEntities(),[t]:e||""},s=this._dockModes();!i[t]&&s.includes(t)&&this._mainEntity()&&(i[t]=this._mainEntity()),i[t]||delete i[t],this._update({dock_entities:i,dock_edited:Date.now()}),this._syncDockGlobal({dock_entities:i})}_entities(){return Array.isArray(this._config.entities)&&this._config.entities.length?this._config.entities:[]}_setEntity(t,e){let i=this._entities();if(!i.length){this._update({entity:e||void 0});return}let s=[...i];s[t]=e,this._update({entities:s})}_addEntity(){this._pendingEntity||(this._pendingEntity=!0,this.requestUpdate())}_commitPendingEntity(t){let e=String(t||"").trim();if(this._pendingEntity=!1,!e){this.requestUpdate();return}let i=this._entities();if(i.length){this._update({entities:[...i,e]});return}let s=String(this._config?.entity||"").trim();this._update({entity:void 0,entities:s?[s,e]:[e]})}_cancelPendingEntity(){this._pendingEntity=!1,this.requestUpdate()}_removeEntity(t){let e=this._entities().filter((i,s)=>s!==t);if(e.length<=1){this._update({entity:e[0]||void 0,entities:void 0});return}this._update({entities:e})}render(){let t=this._config||{},e=this._entities(),i=this._dockModes(),s=this._dockEntities(),a=(r,o,l)=>g`
      <ha-entity-picker
        .hass=${this.hass}
        .value=${r||""}
        .includeDomains=${["media_player"]}
        .allowCustomEntity=${!1}
        .label=${l}
        @value-changed=${h=>{h.stopPropagation(),o(h.detail?.value??"")}}
      ></ha-entity-picker>
    `;return g`
      <div class="wrap">
        <div class="section">
          <div class="section-title">${this._zh?"\u64AD\u653E\u5668":"Player"}</div>
          ${e.length?e.map((r,o)=>g`
                  <div class="entity-row">
                    ${a(r,l=>this._setEntity(o,l),o===0?this._zh?"\u64AD\u653E\u5668":"Player":this._zh?"\u8BBE\u5907":"Player")}
                    <button
                      class="mini-btn"
                      @click=${()=>this._removeEntity(o)}
                      title=${this._zh?"\u79FB\u9664":"Remove"}
                    >
                      ${this._zh?"\u79FB\u9664":"Remove"}
                    </button>
                  </div>
                `):g`<div class="entity-row">
                ${a(t.entity||"",r=>this._setEntity(0,r),this._zh?"\u64AD\u653E\u5668":"Player")}
              </div>`}
          ${this._pendingEntity?g`<div class="entity-row">
                ${a("",r=>this._commitPendingEntity(r),this._zh?"\u9009\u62E9\u8981\u6DFB\u52A0\u7684\u64AD\u653E\u5668":"Pick a player to add")}
                <button class="mini-btn" @click=${()=>this._cancelPendingEntity()}>
                  ${this._zh?"\u53D6\u6D88":"Cancel"}
                </button>
              </div>`:b}
          <button class="mini-btn add" @click=${()=>this._addEntity()}>
            ${this._zh?"\uFF0B \u6DFB\u52A0\u64AD\u653E\u5668":"\uFF0B Add player"}
          </button>
          ${e.length?g`<div class="hint">
                ${this._zh?"\u591A\u8BBE\u5907\u6A21\u5F0F\uFF1A\u5361\u7247\u9876\u90E8\u4F1A\u51FA\u73B0\u8BBE\u5907\u5207\u6362\u6807\u7B7E\u3002":"Multi-player mode adds switching chips on top of the card."}
              </div>`:b}
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
                ${Object.keys(Ee).map(r=>g`<option value=${r} ?selected=${t.layout===r}>
                      ${this._optionLabel(Ee[r])}
                    </option>`)}
              </select>
            </label>
            <label class="field">
              <span class="label">${this._zh?"\u4E3B\u9898":"Theme"}</span>
              <select
                .value=${t.theme||N}
                @change=${r=>this._update({theme:r.target.value})}
              >
                ${Object.keys(L).map(r=>g`<option value=${r} ?selected=${t.theme===r}>
                      ${this._optionLabel(L[r].label)}
                    </option>`)}
              </select>
            </label>
            <label class="field">
              <span class="label">${this._zh?"\u80CC\u666F":"Background"}</span>
              <select
                .value=${t.cover||"ambient"}
                @change=${r=>this._update({cover:r.target.value})}
              >
                ${Object.keys(qe).map(r=>g`<option value=${r} ?selected=${t.cover===r}>
                      ${this._optionLabel(qe[r])}
                    </option>`)}
              </select>
            </label>
            <label class="field">
              <span class="label">${this._zh?"\u9891\u8C31\u52A8\u6548":"Visualizer"}</span>
              <select
                .value=${t.visualizer||"bars"}
                @change=${r=>this._update({visualizer:r.target.value})}
              >
                ${Object.keys(Te).map(r=>g`<option value=${r} ?selected=${t.visualizer===r}>
                      ${this._optionLabel(Te[r])}
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
          ${this._switch(this._zh?"\u81EA\u52A8\u8BC6\u522B\u6B4C\u8BCD":"Auto lyrics",t.show_lyrics!==!1,r=>this._update({show_lyrics:r}))}
          ${this._switch(this._zh?"\u5168\u5C40\u6B4C\u8BCD\u60AC\u6D6E\u7A97\uFF08\u5355\u884C / \u957F\u6309\u62D6\u52A8\uFF09":"Global floating lyric (one line, long-press drag)",t.floating_lyrics!==!1,r=>this._update({floating_lyrics:r,floating_lyrics_edited:Date.now()}))}
          ${this._switch(this._zh?"\u6B4C\u8BCD\u81EA\u52A8\u8DDF\u968F\u6B63\u5728\u64AD\u653E\u7684\u64AD\u653E\u5668":"Auto-follow the playing player",t.floating_lyrics_auto!==!1,r=>this._update({floating_lyrics_auto:r}))}
          ${this._switch(this._zh?"\u79FB\u52A8\u7AEF\u81EA\u52A8\u9690\u85CF\u60AC\u6D6E\u64AD\u653E\u5668":"Hide floating player on mobile",t.mobile_hide_dock!==!1,r=>this._update({mobile_hide_dock:r}))}
          ${this._switch(this._zh?"\u79FB\u52A8\u7AEF\u81EA\u52A8\u9690\u85CF\u60AC\u6D6E\u6B4C\u8BCD":"Hide floating lyrics on mobile",t.mobile_hide_lyrics!==!1,r=>this._update({mobile_hide_lyrics:r}))}
          <span class="hint">
            ${this._zh?"\u4EC5\u624B\u673A\uFF08\u7C97\u6307\u9488\u7A84\u5C4F / \u6A2A\u5C4F\u77EE\u5C4F\uFF09\u751F\u6548\uFF1B\u684C\u9762\u548C\u5E73\u677F\u4E0D\u53D7\u5F71\u54CD\u3002":"Phone only (coarse pointer narrow screen / short landscape); desktop and tablet are unaffected."}
          </span>
          ${this._switch(this._zh?"\u663E\u793A\u5206\u7EC4\u4FE1\u606F":"Show group info",t.show_group!==!1,r=>this._update({show_group:r}))}
          ${this._switch(this._zh?"\u663E\u793A Music Assistant \u6B4C\u5355\u5165\u53E3":"Show Music Assistant playlists",t.music_assistant!==!1,r=>this._update({music_assistant:r?typeof t.music_assistant=="string"?t.music_assistant:!0:!1}))}
          <label class="field">
            <span class="label">
              ${this._zh?"MA \u9762\u677F\u5730\u5740\uFF08\u7559\u7A7A\u81EA\u52A8\uFF0C\u4EC5\u4F9B\u62BD\u5C49\u5185\u8DF3\u8F6C\uFF09":"MA panel URL (optional)"}
            </span>
            <input
              type="text"
              .value=${typeof t.music_assistant=="string"?t.music_assistant:""}
              .disabled=${t.music_assistant===!1}
              placeholder="/music-assistant"
              @input=${r=>this._update({music_assistant:r.target.value.trim()||!0})}
            />
            <span class="hint">
              ${this._zh?"\u7559\u7A7A\u81EA\u52A8\u8BFB\u53D6 HA \u9762\u677F\u8DEF\u5F84\uFF1B\u6B4C\u5355\u5165\u53E3\u672C\u8EAB\u4E0D\u4F9D\u8D56\u6B64\u9879":"Leave empty to auto-detect the HA panel path"}
            </span>
          </label>
          <div class="section-title">${this._zh?"\u5168\u5C40\u8FF7\u4F60\u64AD\u653E\u5668":"Global mini players"}</div>
          <div class="hint">
            ${this._zh?"\u4E09\u4E2A\u4F4D\u7F6E\u53EF\u4EE5\u540C\u65F6\u542F\u7528\uFF0C\u4E5F\u53EF\u4EE5\u5206\u522B\u9009\u62E9\u5404\u81EA\u7684\u64AD\u653E\u5668\u5B9E\u4F53\uFF1B\u5355\u51FB\u64AD\u653E/\u6682\u505C\uFF0C\u53CC\u51FB\u6298\u53E0\u6216\u5C55\u5F00\u3002\u9876\u90E8\u53EA\u53EF\u5DE6\u53F3\u79FB\u52A8\u3001\u4FA7\u8FB9\u680F\u53EA\u53EF\u4E0A\u4E0B\u79FB\u52A8\uFF1B\u53F3\u4E0B\u89D2\u957F\u6309\u540E\u53EF\u4EFB\u610F\u62D6\u52A8\uFF0C\u4F46\u4E0D\u80FD\u8FDB\u5165\u4FA7\u8FB9\u680F\u548C\u9876\u680F\u3002":"Each position can use its own entity; click to play/pause, double-click to fold, long-press to drag."}
          </div>
          ${(()=>{let r=this._dockThemes();return[["top",this._zh?"\u9876\u90E8\u64AD\u653E\u5668":"Top bar"],["sidebar",this._zh?"\u4FA7\u8FB9\u680F\u64AD\u653E\u5668":"Sidebar"],["fab",this._zh?"\u53F3\u4E0B\u89D2\u64AD\u653E\u5668":"Bottom-right"]].map(([o,l])=>{let h=i.includes(o),c=s[o]||this._mainEntity(),d=r[o]||this._config.theme||N;return g`
              <div class="dock-row">
                <label class="check">
                  <input
                    type="checkbox"
                    .checked=${h}
                    @change=${p=>this._toggleDock(o,p.target.checked)}
                  />
                  <span>${l}</span>
                </label>
                <div class="dock-right">
                  <ha-entity-picker
                    .hass=${this.hass}
                    .value=${c||""}
                    .includeDomains=${["media_player"]}
                    .allowCustomEntity=${!1}
                    .label=${this._zh?"\u64AD\u653E\u5668\u5B9E\u4F53":"Player entity"}
                    @value-changed=${p=>{p.stopPropagation(),this._setDockEntity(o,p.detail?.value??"")}}
                  ></ha-entity-picker>
                  ${h?g`<select
                        class="dock-theme"
                        .value=${d}
                        @change=${p=>this._setDockTheme(o,p.target.value)}
                        title=${this._zh?"\u64AD\u653E\u5668\u4E3B\u9898":"Player theme"}
                      >
                        ${Object.keys(L).map(p=>g`<option value=${p} ?selected=${d===p}>
                              ${this._optionLabel(L[p].label)}
                            </option>`)}
                      </select>`:b}
                </div>
              </div>
            `})})()}
        </div>
      </div>
    `}_switch(t,e,i){return g`<label class="switch-row">
      <span class="label">${t}</span>
      <input
        type="checkbox"
        .checked=${e}
        @change=${s=>i(s.target.checked)}
      />
    </label>`}};customElements.get("ha-music-editor")||customElements.define("ha-music-editor",Je);var Vt=new URL(import.meta.url),Ze=Vt.searchParams.get("dock"),ti=K(),At=Ze?B(Ze==="1"?"top":Ze):ti?.modes||[],ei={...ti?.entities||{}},ii=V(ti?.themes),ms=Vt.searchParams.get("dock_entity");ms&&At[0]&&(ei[At[0]]=ms);var fs=Vt.searchParams.get("dock_theme");fs&&At[0]&&(ii[At[0]]=fs);for(let n of At){let t=Vt.searchParams.get(`dock_entity_${n}`);t&&(ei[n]=t);let e=Vt.searchParams.get(`dock_theme_${n}`);e&&(ii[n]=e)}var gs=At.map(n=>({mode:n,entity:ei[n],theme:ii[n]})).filter(n=>n.entity);gs.length&&Ht(gs.map(n=>({...n,hass:gt()})));function _s(){let n=pe();n?.enabled!==!1&&jt({enabled:!0,entity:n?.entity||"",preferredEntity:n?.entity||"",auto:!0,source:"auto",theme:N,hass:gt(),lines:[],trackKey:"",status:"idle"})}typeof document<"u"&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",_s,{once:!0}):window.setTimeout(_s,0));
