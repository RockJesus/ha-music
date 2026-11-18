var ae=globalThis,ne=ae.ShadowRoot&&(ae.ShadyCSS===void 0||ae.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,qe=Symbol(),Si=new WeakMap,Nt=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==qe)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(ne&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=Si.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&Si.set(e,t))}return t}toString(){return this.cssText}},Mi=n=>new Nt(typeof n=="string"?n:n+"",void 0,qe),It=(n,...t)=>{let e=n.length===1?n[0]:t.reduce((i,s,r)=>i+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[r+1],n[0]);return new Nt(e,n,qe)},Pi=(n,t)=>{if(ne)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),s=ae.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,n.appendChild(i)}},ze=ne?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return Mi(e)})(n):n;var{is:Us,defineProperty:Ds,getOwnPropertyDescriptor:Os,getOwnPropertyNames:Fs,getOwnPropertySymbols:Bs,getPrototypeOf:Hs}=Object,tt=globalThis,Ci=tt.trustedTypes,Ks=Ci?Ci.emptyScript:"",js=tt.reactiveElementPolyfillSupport,Ut=(n,t)=>n,Ne={toAttribute(n,t){switch(t){case Boolean:n=n?Ks:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},Ti=(n,t)=>!Us(n,t),Ei={attribute:!0,type:String,converter:Ne,reflect:!1,useDefault:!1,hasChanged:Ti};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),tt.litPropertyMetadata??(tt.litPropertyMetadata=new WeakMap);var Y=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Ei){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&Ds(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){let{get:s,set:r}=Os(this.prototype,t)??{get(){return this[e]},set(a){this[e]=a}};return{get:s,set(a){let o=s?.call(this);r?.call(this,a),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Ei}static _$Ei(){if(this.hasOwnProperty(Ut("elementProperties")))return;let t=Hs(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Ut("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Ut("properties"))){let e=this.properties,i=[...Fs(e),...Bs(e)];for(let s of i)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let s of i)e.unshift(ze(s))}else t!==void 0&&e.push(ze(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Pi(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){let r=(i.converter?.toAttribute!==void 0?i.converter:Ne).toAttribute(e,i.type);this._$Em=t,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){let i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let r=i.getPropertyOptions(s),a=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:Ne;this._$Em=s;let o=a.fromAttribute(e,r.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(t!==void 0){let a=this.constructor;if(s===!1&&(r=this[t]),i??(i=a.getPropertyOptions(t)),!((i.hasChanged??Ti)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},a){i&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,a??e??this[t]),r!==!0||a!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[s,r]of this._$Ep)this[s]=r;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,r]of i){let{wrapped:a}=r,o=this[s];a!==!0||this._$AL.has(s)||o===void 0||this.C(s,void 0,r,o)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};Y.elementStyles=[],Y.shadowRootOptions={mode:"open"},Y[Ut("elementProperties")]=new Map,Y[Ut("finalized")]=new Map,js?.({ReactiveElement:Y}),(tt.reactiveElementVersions??(tt.reactiveElementVersions=[])).push("2.1.2");var Ot=globalThis,Li=n=>n,oe=Ot.trustedTypes,Ri=oe?oe.createPolicy("lit-html",{createHTML:n=>n}):void 0,Di="$lit$",et=`lit$${Math.random().toFixed(9).slice(2)}$`,Oi="?"+et,Vs=`<${Oi}>`,ut=document,Ft=()=>ut.createComment(""),Bt=n=>n===null||typeof n!="object"&&typeof n!="function",He=Array.isArray,Ws=n=>He(n)||typeof n?.[Symbol.iterator]=="function",Ie=`[ 	
\f\r]`,Dt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,qi=/-->/g,zi=/>/g,ht=RegExp(`>|${Ie}(?:([^\\s"'>=/]+)(${Ie}*=${Ie}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ni=/'/g,Ii=/"/g,Fi=/^(?:script|style|textarea|title)$/i,Ke=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),_=Ke(1),T=Ke(2),Xr=Ke(3),X=Symbol.for("lit-noChange"),x=Symbol.for("lit-nothing"),Ui=new WeakMap,dt=ut.createTreeWalker(ut,129);function Bi(n,t){if(!He(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ri!==void 0?Ri.createHTML(t):t}var Qs=(n,t)=>{let e=n.length-1,i=[],s,r=t===2?"<svg>":t===3?"<math>":"",a=Dt;for(let o=0;o<e;o++){let l=n[o],c,h,d=-1,p=0;for(;p<l.length&&(a.lastIndex=p,h=a.exec(l),h!==null);)p=a.lastIndex,a===Dt?h[1]==="!--"?a=qi:h[1]!==void 0?a=zi:h[2]!==void 0?(Fi.test(h[2])&&(s=RegExp("</"+h[2],"g")),a=ht):h[3]!==void 0&&(a=ht):a===ht?h[0]===">"?(a=s??Dt,d=-1):h[1]===void 0?d=-2:(d=a.lastIndex-h[2].length,c=h[1],a=h[3]===void 0?ht:h[3]==='"'?Ii:Ni):a===Ii||a===Ni?a=ht:a===qi||a===zi?a=Dt:(a=ht,s=void 0);let u=a===ht&&n[o+1].startsWith("/>")?" ":"";r+=a===Dt?l+Vs:d>=0?(i.push(c),l.slice(0,d)+Di+l.slice(d)+et+u):l+et+(d===-2?o:u)}return[Bi(n,r+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},Ht=class n{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,a=0,o=t.length-1,l=this.parts,[c,h]=Qs(t,e);if(this.el=n.createElement(c,i),dt.currentNode=this.el.content,e===2||e===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(s=dt.nextNode())!==null&&l.length<o;){if(s.nodeType===1){if(s.hasAttributes())for(let d of s.getAttributeNames())if(d.endsWith(Di)){let p=h[a++],u=s.getAttribute(d).split(et),m=/([.?@])?(.*)/.exec(p);l.push({type:1,index:r,name:m[2],strings:u,ctor:m[1]==="."?De:m[1]==="?"?Oe:m[1]==="@"?Fe:xt}),s.removeAttribute(d)}else d.startsWith(et)&&(l.push({type:6,index:r}),s.removeAttribute(d));if(Fi.test(s.tagName)){let d=s.textContent.split(et),p=d.length-1;if(p>0){s.textContent=oe?oe.emptyScript:"";for(let u=0;u<p;u++)s.append(d[u],Ft()),dt.nextNode(),l.push({type:2,index:++r});s.append(d[p],Ft())}}}else if(s.nodeType===8)if(s.data===Oi)l.push({type:2,index:r});else{let d=-1;for(;(d=s.data.indexOf(et,d+1))!==-1;)l.push({type:7,index:r}),d+=et.length-1}r++}}static createElement(t,e){let i=ut.createElement("template");return i.innerHTML=t,i}};function yt(n,t,e=n,i){if(t===X)return t;let s=i!==void 0?e._$Co?.[i]:e._$Cl,r=Bt(t)?void 0:t._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),r===void 0?s=void 0:(s=new r(n),s._$AT(n,e,i)),i!==void 0?(e._$Co??(e._$Co=[]))[i]=s:e._$Cl=s),s!==void 0&&(t=yt(n,s._$AS(n,t.values),s,i)),t}var Ue=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??ut).importNode(e,!0);dt.currentNode=s;let r=dt.nextNode(),a=0,o=0,l=i[0];for(;l!==void 0;){if(a===l.index){let c;l.type===2?c=new Kt(r,r.nextSibling,this,t):l.type===1?c=new l.ctor(r,l.name,l.strings,this,t):l.type===6&&(c=new Be(r,this,t)),this._$AV.push(c),l=i[++o]}a!==l?.index&&(r=dt.nextNode(),a++)}return dt.currentNode=ut,s}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},Kt=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=x,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=yt(this,t,e),Bt(t)?t===x||t==null||t===""?(this._$AH!==x&&this._$AR(),this._$AH=x):t!==this._$AH&&t!==X&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ws(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==x&&Bt(this._$AH)?this._$AA.nextSibling.data=t:this.T(ut.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=Ht.createElement(Bi(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{let r=new Ue(s,this),a=r.u(this.options);r.p(e),this.T(a),this._$AH=r}}_$AC(t){let e=Ui.get(t.strings);return e===void 0&&Ui.set(t.strings,e=new Ht(t)),e}k(t){He(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,s=0;for(let r of t)s===e.length?e.push(i=new n(this.O(Ft()),this.O(Ft()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=Li(t).nextSibling;Li(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},xt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=x,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=x}_$AI(t,e=this,i,s){let r=this.strings,a=!1;if(r===void 0)t=yt(this,t,e,0),a=!Bt(t)||t!==this._$AH&&t!==X,a&&(this._$AH=t);else{let o=t,l,c;for(t=r[0],l=0;l<r.length-1;l++)c=yt(this,o[i+l],e,l),c===X&&(c=this._$AH[l]),a||(a=!Bt(c)||c!==this._$AH[l]),c===x?t=x:t!==x&&(t+=(c??"")+r[l+1]),this._$AH[l]=c}a&&!s&&this.j(t)}j(t){t===x?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},De=class extends xt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===x?void 0:t}},Oe=class extends xt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==x)}},Fe=class extends xt{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=yt(this,t,e,0)??x)===X)return;let i=this._$AH,s=t===x&&i!==x||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==x&&(i===x||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Be=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){yt(this,t)}};var Gs=Ot.litHtmlPolyfillSupport;Gs?.(Ht,Kt),(Ot.litHtmlVersions??(Ot.litHtmlVersions=[])).push("3.3.3");var Hi=(n,t,e)=>{let i=e?.renderBefore??t,s=i._$litPart$;if(s===void 0){let r=e?.renderBefore??null;i._$litPart$=s=new Kt(t.insertBefore(Ft(),r),r,void 0,e??{})}return s._$AI(n),s};var jt=globalThis,j=class extends Y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Hi(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return X}};j._$litElement$=!0,j.finalized=!0,jt.litElementHydrateSupport?.({LitElement:j});var Ys=jt.litElementPolyfillSupport;Ys?.({LitElement:j});(jt.litElementVersions??(jt.litElementVersions=[])).push("4.2.2");var Ki={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ji=n=>(...t)=>({_$litDirective$:n,values:t}),le=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var Vi="important",Xs=" !"+Vi,it=ji(class extends le{constructor(n){if(super(n),n.type!==Ki.ATTRIBUTE||n.name!=="style"||n.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(n){return Object.keys(n).reduce((t,e)=>{let i=n[e];return i==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(n,[t]){let{style:e}=n.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let i of this.ft)t[i]==null&&(this.ft.delete(i),i.includes("-")?e.removeProperty(i):e[i]=null);for(let i in t){let s=t[i];if(s!=null){this.ft.add(i);let r=typeof s=="string"&&s.endsWith(Xs);i.includes("-")||r?e.setProperty(i,r?s.slice(0,-11):s,r?Vi:""):e[i]=s}}return X}});var Wi=It`
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
    width: calc(var(--hm-cover-size, 168px) + 48px);
    height: calc(var(--hm-cover-size, 168px) + 48px);
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

    .hm-card[data-layout="full"] .hm-vis {
      display: none;
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

  .hm-entity-chip[data-playing="true"] {
    position: relative;
    color: rgba(246, 248, 255, 0.92);
    border-color: rgba(var(--hm-a1-rgb), 0.22);
    background:
      linear-gradient(105deg, rgba(var(--hm-a1-rgb), 0.1), rgba(255, 255, 255, 0.05));
  }

  .hm-entity-chip[data-playing="true"]::after {
    content: "";
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    pointer-events: none;
    border: 1px solid rgba(var(--hm-a1-rgb), 0.4);
    opacity: 0;
    animation: hm-entity-glow 2.4s ease-in-out infinite;
  }

  .hm-entity-chip[data-playing="true"][data-active="true"] {
    border-color: rgba(var(--hm-a1-rgb), 0.5);
    background: rgba(var(--hm-a1-rgb), 0.17);
    box-shadow:
      0 0 0 1px rgba(var(--hm-a1-rgb), 0.08),
      0 0 20px -6px rgba(var(--hm-a1-rgb), 0.95);
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
    padding: clamp(8px, 1.6cqi, 12px);
    gap: clamp(6px, 1.2cqi, 8px);
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
    text-align: left;
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
    background: linear-gradient(
      90deg,
      rgba(var(--hm-a1-rgb), 0.18),
      rgba(var(--hm-a2-rgb), 0.06) 62%,
      transparent
    );
    box-shadow: inset 3px 0 0 var(--hm-a1);
    transform: translateX(2px);
  }

  .hm-lyrics-line[data-active="true"]::after {
    content: "";
    position: absolute;
    inset: 0 auto 0 0;
    z-index: 0;
    width: var(--hm-line-progress, 0%);
    border-radius: inherit;
    background: linear-gradient(
      90deg,
      rgba(var(--hm-a1-rgb), 0.3),
      rgba(var(--hm-a2-rgb), 0.16)
    );
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
    .hm-card[data-panel="true"] .hm-controls {
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: center;
      gap: clamp(10px, 2.2cqi, 24px);
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
    .hm-card[data-panel="true"] .hm-main {
      display: flex;
      flex-direction: column;
      flex: 0 0 auto;
      justify-content: center;
      align-items: center;
      gap: clamp(10px, 3cqi, 18px);
    }

    .hm-card[data-panel="true"] .hm-vis {
      height: clamp(36px, 8vh, 76px);
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
`;var Js={play:T`<path d="M8.2 5.4c0-.7.8-1.1 1.4-.7l9.1 5.8c.6.4.6 1.3 0 1.7l-9.1 6.1c-.6.4-1.4 0-1.4-.7V5.4z" fill="currentColor"/>`,pause:T`<rect x="7" y="5.6" width="3.6" height="12.8" rx="1.2" fill="currentColor"/><rect x="13.4" y="5.6" width="3.6" height="12.8" rx="1.2" fill="currentColor"/>`,previous:T`<path d="M7 6.2v11.6" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><path d="M17.6 6.6c0-.6-.7-1-1.2-.6l-7.1 5.2c-.5.4-.5 1.2 0 1.6l7.1 5.2c.5.4 1.2 0 1.2-.6V6.6z" fill="currentColor"/>`,next:T`<path d="M17 6.2v11.6" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><path d="M6.4 6.6c0-.6.7-1 1.2-.6l7.1 5.2c.5.4.5 1.2 0 1.6l-7.1 5.2c-.5.4-1.2 0-1.2-.6V6.6z" fill="currentColor"/>`,shuffle:T`<path d="M4.5 7.2h3.2c1 0 1.9.5 2.5 1.3l4 5.4c.6.8 1.5 1.3 2.5 1.3h3.1" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M4.5 16.8h3.2c1 0 1.9-.5 2.5-1.3l4-5.4c.6-.8 1.5-1.3 2.5-1.3h3.1" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M16.2 4.6l3 2.6-3 2.6M16.2 12.6l3 2.6-3 2.6" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/>`,repeat:T`<path d="M6.4 9.1V8.3c0-1.5 1.2-2.7 2.7-2.7h8.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M17.8 5.6l-2.3-2.2M17.8 5.6l-2.3 2.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M17.6 14.9v.8c0 1.5-1.2 2.7-2.7 2.7H6.7" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M6.2 18.4l2.3 2.2M6.2 18.4l2.3-2.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/>`,repeatOne:T`<path d="M6.4 9.1V8.3c0-1.5 1.2-2.7 2.7-2.7h8.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M17.8 5.6l-2.3-2.2M17.8 5.6l-2.3 2.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M17.6 14.9v.8c0 1.5-1.2 2.7-2.7 2.7H6.7" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M6.2 18.4l2.3 2.2M6.2 18.4l2.3-2.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M11.2 9.3l1.1-.8v6.1" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M10.6 14.6h3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>`,volume:T`<path d="M4.6 9.4h2.7l3.4-2.9c.5-.4 1.2 0 1.2.6v9.8c0 .6-.7 1-1.2.6L7.3 14.6H4.6c-.6 0-1-.4-1-1v-3.2c0-.6.4-1 1-1z" fill="currentColor"/><path d="M15.4 8.6c1.6 1 1.6 5.8 0 6.8" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M17.6 6.4c2.9 2 2.9 9.2 0 11.2" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/>`,mute:T`<path d="M4.6 9.4h2.7l3.4-2.9c.5-.4 1.2 0 1.2.6v9.8c0 .6-.7 1-1.2.6L7.3 14.6H4.6c-.6 0-1-.4-1-1v-3.2c0-.6.4-1 1-1z" fill="currentColor"/><path d="M15.2 9.6l4.6 4.8M19.8 9.6l-4.6 4.8" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/>`,power:T`<path d="M12 4.2v7" stroke="currentColor" stroke-width="1.9" fill="none" stroke-linecap="round"/><path d="M7.6 6.6a6.9 6.9 0 1 0 8.8 0" stroke="currentColor" stroke-width="1.9" fill="none" stroke-linecap="round"/>`,more:T`<circle cx="6.4" cy="12" r="1.55" fill="currentColor"/><circle cx="12" cy="12" r="1.55" fill="currentColor"/><circle cx="17.6" cy="12" r="1.55" fill="currentColor"/>`,library:T`<rect x="4.4" y="4.4" width="6.4" height="6.4" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.7"/><rect x="13.2" y="4.4" width="6.4" height="6.4" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.7"/><rect x="4.4" y="13.2" width="6.4" height="6.4" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.7"/><rect x="13.2" y="13.2" width="6.4" height="6.4" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.7"/>`,queue:T`<path d="M5 7.2h10M5 11.4h7.4M5 15.6h5.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M15.6 12.4c0-.5.5-.8.9-.5l4 2.3c.4.2.4.8 0 1l-4 2.6c-.4.3-.9 0-.9-.5v-5.4z" fill="currentColor"/>`,chevronLeft:T`<path d="M14.6 6l-5.4 6 5.4 6" stroke="currentColor" stroke-width="1.9" fill="none" stroke-linecap="round"/>`,close:T`<path d="M7 7l10 10M17 7L7 17" stroke="currentColor" stroke-width="1.9" fill="none" stroke-linecap="round"/>`,plus:T`<path d="M12 5.4v13.2M5.4 12h13.2" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>`,minus:T`<path d="M5.4 12h13.2" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>`,music:T`<path d="M14.5 5.2l4.6-1v9.1a3 3 0 1 1-1.8-2.7V7.1l-2.8.6v7.7a3 3 0 1 1-1.8-2.7V5.2z" fill="currentColor"/>`,group:T`<circle cx="9" cy="9.3" r="3.2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3.8 18.4c0-2.7 2.3-4.6 5.2-4.6s5.2 1.9 5.2 4.6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M16.2 6.4a3 3 0 0 1 0 5.9M18.6 18.4c0-2-1-3.6-2.6-4.3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>`,chevronRight:T`<path d="M9.4 6l5.4 6-5.4 6" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>`,playlist:T`<path d="M4 6.6h10.2M4 11h10.2M4 15.4h6.4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M16.4 11.8l4 2.35-4 2.35z" fill="currentColor"/>`,ma:T`<rect x="2.9" y="4.8" width="2.35" height="14.4" rx=".3" fill="currentColor"/><rect x="7.5" y="4.8" width="2.35" height="14.4" rx=".3" fill="currentColor"/><rect x="12.1" y="4.8" width="2.35" height="14.4" rx=".3" fill="currentColor"/><path d="M16.5 19.2L19.35 4.8M19.35 4.8L22.2 19.2" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="butt"/>`,external:T`<path d="M13.2 5.4h5.4v5.4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M18.2 5.8l-7 7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M11 6.6H7.2c-1 0-1.8.8-1.8 1.8v8.4c0 1 .8 1.8 1.8 1.8h8.4c1 0 1.8-.8 1.8-1.8V14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>`,folder:T`<path d="M3.6 7.2c0-1 .8-1.8 1.8-1.8h3.4l1.8 2.2h9.8c1 0 1.8.8 1.8 1.8v7.4c0 1-.8 1.8-1.8 1.8H5.4c-1 0-1.8-.8-1.8-1.8V7.2z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>`,check:T`<path d="M6 12.6l4.2 4.2 7.8-9" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>`,lyrics:T`<path d="M4.5 6.4h8.4M4.5 10.2h6.2M4.5 14h7.2" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/><circle cx="16.2" cy="14.2" r="2.2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M18.4 14.2V7.1l2.4-.6v7.7" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>`};function E(n,t=18){let e=Js[n];return e?T`<svg viewBox="0 0 24 24" width=${t} height=${t} aria-hidden="true" focusable="false">${e}</svg>`:x}var Gi="2.3.6",Yi="ha-music",Xi="HA Music",q={PAUSE:1,SEEK:2,VOLUME_SET:4,VOLUME_MUTE:8,PREVIOUS_TRACK:16,NEXT_TRACK:32,TURN_ON:128,TURN_OFF:256,PLAY_MEDIA:512,VOLUME_STEP:1024,SELECT_SOURCE:2048,STOP:4096,CLEAR_PLAYLIST:8192,PLAY:16384,SHUFFLE_SET:32768,SELECT_SOUND_MODE:65536,BROWSE_MEDIA:131072,REPEAT_SET:262144,GROUPING:524288,SELECT:1048576};var O="cyber";var je={auto:{en:"Auto (QQ \u2192 NetEase \u2192 LRCLIB \u2192 Lyrics.ovh)",zh:"\u81EA\u52A8\uFF08QQ/\u7F51\u6613\u4E91 \u2192 LRCLIB \u2192 Lyrics.ovh\uFF09"},qq:{en:"QQ Music",zh:"QQ \u97F3\u4E50"},wy:{en:"NetEase Cloud Music",zh:"\u7F51\u6613\u4E91\u97F3\u4E50"},lrclib:{en:"LRCLIB (online synced lyrics)",zh:"LRCLIB\uFF08\u5728\u7EBF\u540C\u6B65\u6B4C\u8BCD\uFF09"}},Ve="auto",We={adaptive:{en:"Adaptive",zh:"\u81EA\u9002\u5E94"},full:{en:"Full",zh:"\u5B8C\u6574"},compact:{en:"Compact",zh:"\u7D27\u51D1"},mini:{en:"Mini",zh:"\u8FF7\u4F60"}},Qe={ambient:{en:"Ambient blur",zh:"\u73AF\u5883\u6A21\u7CCA"},art:{en:"Cover fill",zh:"\u5C01\u9762\u94FA\u6EE1"},palette:{en:"Palette only",zh:"\u7EAF\u8272\u5F69"},none:{en:"Plain",zh:"\u65E0\u80CC\u666F"}},Ge={bars:{en:"Live spectrum",zh:"\u5B9E\u65F6\u9891\u8C31"},wave:{en:"Wave",zh:"\u6CE2\u5F62"},orbit:{en:"Orbit",zh:"\u5149\u73AF"},none:{en:"Off",zh:"\u5173\u95ED"}},N={aurora:{label:{en:"Aurora",zh:"\u6781\u5149"},accent:["#2ee6c5","#7b5cff"],base:"#050a12",glow:1,grid:!1},cyber:{label:{en:"Cyberpunk",zh:"\u8D5B\u535A\u670B\u514B"},accent:["#ff2fd0","#22e6ff"],base:"#08030f",glow:1.4,grid:!0},liquid:{label:{en:"Liquid Glass",zh:"\u6DB2\u6001\u73BB\u7483"},accent:["#a9d8ff","#cdb6ff"],base:"#090c16",glow:.8,grid:!1,glass:!0},velvet:{label:{en:"Velvet",zh:"\u5929\u9E45\u7ED2"},accent:["#ff7a9c","#a86bff"],base:"#0d050c",glow:1.15,grid:!1},mono:{label:{en:"Monochrome",zh:"\u9ED1\u767D"},accent:["#e9ecf5","#8d95a8"],base:"#08090c",glow:.4,grid:!1},sunset:{label:{en:"Sunset",zh:"\u65E5\u843D"},accent:["#ffa45c","#ff4d8d"],base:"#120806",glow:1.1,grid:!1},ocean:{label:{en:"Ocean",zh:"\u6D77\u6D0B"},accent:["#39d0ff","#2f7bff"],base:"#04101c",glow:.9,grid:!1}},Qi={play:"Play",pause:"Pause",playing:"Now playing",paused:"Paused",idle:"Standby",off:"Off",buffering:"Buffering",previous:"Previous track",next:"Next track",volume:"Volume",volumeUp:"Volume up",volumeDown:"Volume down",mute:"Mute",unmute:"Unmute",shuffle:"Shuffle",repeat:"Repeat",repeatAll:"Repeat all",repeatOne:"Repeat one",repeatOff:"Repeat off",source:"Source",soundMode:"Sound mode",queue:"Current playlist",library:"Library",assistant:"Music Assistant",playlists:"Playlists",playlistsEmpty:"No playlists found",playlistEmpty:"This playlist is empty or unavailable in Music Assistant",maPlayerRequired:"Playlists need a Music Assistant player",playlistUnavailable:"Unavailable",playingPlaylist:"Playing",openAssistant:"Open Music Assistant",more:"More info",power:"Power",group:"Group",groupLeave:"Leave group",loading:"Loading\u2026",queueEmpty:"Queue is empty",queueWindow:"Showing nearby tracks only; open Music Assistant for the full queue",queueLimited:"Could not load the full queue. Install the Music Assistant add-on (or Mass Queue integration), or open Music Assistant for every track.",browseFailed:"Media library is unavailable",noMedia:"Nothing is playing",unknownArtist:"Unknown artist",noTitle:"No title",close:"Close",back:"Back",track:"Track",album:"Album",volumeEntityMissing:"Volume entity unavailable",seek:"Seek",remaining:"Toggle remaining time",lyrics:"Lyrics",lyricsLoading:"Matching lyrics\u2026",lyricsNone:"No lyrics found",lyricsError:"Lyrics unavailable",lyricsRetry:"Retry",lyricsOffset:"Lyric timing offset",lyricsInstrumental:"Instrumental \xB7 no lyrics"},Zs={play:"\u64AD\u653E",pause:"\u6682\u505C",playing:"\u6B63\u5728\u64AD\u653E",paused:"\u5DF2\u6682\u505C",idle:"\u5F85\u673A",off:"\u5DF2\u5173\u95ED",buffering:"\u7F13\u51B2\u4E2D",previous:"\u4E0A\u4E00\u9996",next:"\u4E0B\u4E00\u9996",volume:"\u97F3\u91CF",volumeUp:"\u589E\u5927\u97F3\u91CF",volumeDown:"\u51CF\u5C0F\u97F3\u91CF",mute:"\u9759\u97F3",unmute:"\u53D6\u6D88\u9759\u97F3",shuffle:"\u968F\u673A\u64AD\u653E",repeat:"\u5FAA\u73AF",repeatAll:"\u5217\u8868\u5FAA\u73AF",repeatOne:"\u5355\u66F2\u5FAA\u73AF",repeatOff:"\u5173\u95ED\u5FAA\u73AF",source:"\u97F3\u6E90",soundMode:"\u58F0\u97F3\u6A21\u5F0F",queue:"\u5F53\u524D\u64AD\u653E\u5217\u8868",library:"\u5A92\u4F53\u5E93",assistant:"Music Assistant",playlists:"\u64AD\u653E\u5217\u8868",playlistsEmpty:"\u6CA1\u6709\u627E\u5230\u64AD\u653E\u5217\u8868",playlistEmpty:"\u8BE5\u6B4C\u5355\u4E3A\u7A7A\u6216\u66F2\u76EE\u5728 Music Assistant \u4E2D\u4E0D\u53EF\u7528",maPlayerRequired:"\u5F53\u524D\u64AD\u653E\u5668\u4E0D\u662F Music Assistant \u64AD\u653E\u5668\uFF0C\u8BF7\u5148\u5207\u6362\u5230 MA \u64AD\u653E\u5668",playlistUnavailable:"\u4E0D\u53EF\u7528",playingPlaylist:"\u5F00\u59CB\u64AD\u653E",openAssistant:"\u6253\u5F00 Music Assistant",more:"\u66F4\u591A\u4FE1\u606F",power:"\u5F00\u5173",group:"\u5206\u7EC4",groupLeave:"\u9000\u51FA\u5206\u7EC4",loading:"\u52A0\u8F7D\u4E2D\u2026",queueEmpty:"\u64AD\u653E\u961F\u5217\u4E3A\u7A7A",queueWindow:"\u4EC5\u663E\u793A\u5F53\u524D\u66F2\u76EE\u9644\u8FD1\uFF1B\u5B8C\u6574\u961F\u5217\u8BF7\u6253\u5F00 Music Assistant",queueLimited:"\u672A\u80FD\u8BFB\u53D6\u5B8C\u6574\u961F\u5217\uFF1B\u9700\u5B89\u88C5 Music Assistant \u52A0\u8F7D\u9879\uFF08\u6216 Mass Queue \u96C6\u6210\uFF09\uFF0C\u6216\u70B9\u53F3\u4E0A\u89D2\u5728 Music Assistant \u67E5\u770B\u5168\u90E8\u66F2\u76EE\u3002",browseFailed:"\u5A92\u4F53\u5E93\u6682\u4E0D\u53EF\u7528",noMedia:"\u5F53\u524D\u6CA1\u6709\u64AD\u653E\u5185\u5BB9",unknownArtist:"\u672A\u77E5\u827A\u672F\u5BB6",noTitle:"\u672A\u77E5\u66F2\u76EE",close:"\u5173\u95ED",back:"\u8FD4\u56DE",track:"\u66F2\u76EE",album:"\u4E13\u8F91",volumeEntityMissing:"\u97F3\u91CF\u5B9E\u4F53\u4E0D\u53EF\u7528",seek:"\u8FDB\u5EA6",remaining:"\u5207\u6362\u5269\u4F59\u65F6\u95F4",lyrics:"\u6B4C\u8BCD",lyricsLoading:"\u6B63\u5728\u5339\u914D\u6B4C\u8BCD\u2026",lyricsNone:"\u672A\u627E\u5230\u6B4C\u8BCD",lyricsError:"\u6B4C\u8BCD\u6682\u4E0D\u53EF\u7528",lyricsRetry:"\u91CD\u8BD5",lyricsOffset:"\u6B4C\u8BCD\u65F6\u95F4\u504F\u79FB",lyricsInstrumental:"\u7EAF\u97F3\u4E50 \xB7 \u65E0\u6B4C\u8BCD"};function ce(n){return/^zh/i.test(n||"")}function F(n){let t=ce(n)?Zs:Qi;return e=>t[e]??Qi[e]??e}var tr={playlist:{en:"Playlist",zh:"\u64AD\u653E\u5217\u8868"},album:{en:"Album",zh:"\u4E13\u8F91"},artist:{en:"Artist",zh:"\u827A\u672F\u5BB6"},track:{en:"Track",zh:"\u66F2\u76EE"},music:{en:"Music",zh:"\u97F3\u4E50"},video:{en:"Video",zh:"\u89C6\u9891"},directory:{en:"Folder",zh:"\u6587\u4EF6\u5939"},image:{en:"Image",zh:"\u56FE\u7247"},url:{en:"Link",zh:"\u94FE\u63A5"},app:{en:"App",zh:"\u5E94\u7528"},genre:{en:"Genre",zh:"\u98CE\u683C"}};function Ye(n,t){if(!n)return"";let e=tr[String(n).toLowerCase()];return e?ce(t)?e.zh:e.en:n}var v=(n,t,e)=>Math.min(e,Math.max(t,n));function st(n,t="--:--"){if(!Number.isFinite(n)||n<0)return t;let e=Math.round(n),i=Math.floor(e/3600),s=Math.floor(e%3600/60),r=e%60;return i>0?`${i}:${String(s).padStart(2,"0")}:${String(r).padStart(2,"0")}`:`${s}:${String(r).padStart(2,"0")}`}function V(n){let t=String(n??""),e=2166136261;for(let i=0;i<t.length;i+=1)e^=t.charCodeAt(i),e=Math.imul(e,16777619);return e>>>0}function de(n={}){let t=[n.title,n.artist,n.album].filter(Boolean).join("|")||"ha-music",e=V(t),i=1.7+(e>>>8)%90/100,s=e%360/360*Math.PI*2,r=Number.isFinite(n.position)&&n.position>0?n.position:0,a=r/i*Math.PI*2+s;return{seed:t,hash:e,period:i,phase:s,position:r,pulse:.5+.5*Math.sin(a),low:.5+.5*Math.sin(a+.55),energy:.55+(e>>>16)%100/220}}function er(n){return V(n)%360}var ir=/^([a-z0-9-_.]+\.(stream\.qqmusic\.qq\.com|qqmusic\.qq\.com)|aqqmusic\.tc\.qq\.com|[a-z0-9-_.]+\.music\.126\.net)$/i;function Ji(n,t=""){if(!n)return!1;if(/^(data|blob):/i.test(n))return!0;try{let e=t||(typeof location<"u"?location.href:"http://local/"),i=new URL(e,"http://local/"),s=new URL(n,i.href);return s.protocol!=="http:"&&s.protocol!=="https:"||i.protocol==="https:"&&s.protocol==="http:"?!1:s.origin===i.origin?!0:ir.test(s.hostname)}catch{return!1}}function he(n){return String(n??"").normalize("NFKC").toLowerCase().replace(/\([^)]*\)|\[[^\]]*\]|【[^】]*】|（[^）]*）/g," ").replace(/\b(feat|ft|featuring)\b\.?/g," ").replace(/[^\p{L}\p{N}]+/gu," ").trim().replace(/\s+/g," ")}function Je(n){return(Array.isArray(n)?n:n?.tracks||n?.audios||n?.songs||n?.list||[]).map(e=>{let i=e?.artist??e?.author??e?.singer??"",s=Array.isArray(i)?i.filter(Boolean).join(" "):i;return{mid:String(e?.mid||e?.songmid||e?.songMid||"").trim(),name:String(e?.name||e?.title||"").trim(),artist:String(s).trim(),url:String(e?.url||e?.src||"").trim(),duration:Number(e?.duration??0)||0,cover:String(e?.cover||e?.pic||e?.image||"").trim()}}).filter(e=>e.url)}function sr(n={}){let t=String(n.contentId||n.media_content_id||n.content_id||""),e=t.match(/track\/([0-9A-Za-z]+)/)||t.match(/id=([0-9A-Za-z]+)/);return e?e[1]:""}function rr(n,t={}){if(!n?.url)return 0;let e=sr(t);if(e&&n.mid&&e===n.mid)return 1;let i=he(t.title||t.media_title||""),s=he(t.artist||t.media_artist||""),r=he(n.name||n.title||""),a=he(n.artist||"");if(!r)return 0;let o=0;if(i&&r===i)o=.9;else if(i&&(r.startsWith(i)||i.startsWith(r)))o=.78;else if(i){let l=i.split(" ").filter(Boolean),c=new Set(r.split(" ").filter(Boolean)),h=l.filter(p=>c.has(p)).length,d=l.length?h/l.length:0;d>=.8?o=.68:d>=.5&&(o=.5)}return s&&a&&(s===a?o+=.1:a.includes(s)||s.includes(a)?o+=.06:o-=.08),v(o,0,1)}function Zi(n,t={}){let e=Array.isArray(n)?n:Je(n),i=null,s=0;for(let r of e){let a=rr(r,t);a>s&&(i=r,s=a)}return s>=.66?i:null}function z(n,t){let e=Number(n?.attributes?.supported_features??0);return!Number.isFinite(e)||!t?!1:(e&t)===t}function ar(n,t){if(!(!n||!t))return n.states?n.states[t]:void 0}function nr(n,t=[],e=""){let i=Array.isArray(t)?t.filter(Boolean):[];if(!i.length)return"";let s=i.includes(e),r=s?e:"",a=h=>{let d=n?.states?.[h]?.state;return d==="playing"?2:d==="buffering"?1:0};if(s&&a(r)===2)return r;let o=r||i[0],l=r?a(r):0,c=-1/0;for(let h of i){let d=a(h);if(d<=0)continue;let p=Date.parse(n?.states?.[h]?.attributes?.media_position_updated_at||""),u=Number.isFinite(p)?p:0;(d>l||d===l&&u>c)&&(o=h,l=d,c=u)}return l>0?o:r}function ts(n,t=[],e="",i=null){let s=Array.isArray(t)?t.filter(Boolean):[];if(s.length<2)return"";let r=nr(n,s,e);if(!r||r===e)return"";let a=n?.states?.[r]?.state;return a!=="playing"&&a!=="buffering"||i&&i[r]===a?"":r}function vt(n,t,e=""){return ar(n,t)?.attributes?.friendly_name||t||e}function mt(n){let t=n?.attributes??{},e=t.media_metadata??{},i=Number(t.media_duration??0),s=Number(e.duration??0),r=i>0?i:s,a=Number(t.media_position??0),o=t.media_position_updated_at;if(n?.state==="playing"&&o){let l=(Date.now()-new Date(o).getTime())/1e3;Number.isFinite(l)&&l>0&&(a+=l)}return Number.isFinite(r)&&r>0?a=v(a,0,r):(!Number.isFinite(a)||a<0)&&(a=0),{title:e.title||t.media_title||"",artist:e.artist||t.media_artist||e.album_artist||t.media_album_artist||"",album:e.album_name||t.media_album_name||"",series:e.series_title||t.media_series_title||"",track:e.track_number??t.media_track??"",duration:Number.isFinite(r)?r:0,position:Number.isFinite(a)?a:0,art:t.entity_picture||e.entity_picture||e.image_url||t.media_image_url||"",appName:t.app_name||"",source:t.source||"",soundMode:t.sound_mode||"",shuffle:!!t.shuffle,repeat:t.repeat||"off",volume:Number.isFinite(Number(t.volume_level))?Number(t.volume_level):null,muted:!!t.is_volume_muted,groupMembers:Array.isArray(t.group_members)?t.group_members:[]}}function Ze(n,t=60){let e=n?.attributes?.queue;return Array.isArray(e)?e.slice(0,t).map((i,s)=>({index:s,title:i.title||i.name||i.media_title||"",artist:i.artist||i.subtitle||i.media_artist||"",album:i.album||i.album_name||"",duration:Number(i.duration??i.media_duration??0)||0,art:i.entity_picture||i.thumbnail||i.artwork||"",contentId:i.media_content_id||i.content_id||"",contentType:i.media_content_type||i.content_type||"",queueItemId:i.queue_item_id||i.queueItemId||"",active:!!(i.active||i.is_active||i.current||i.playing)})):[]}function or(n={},t={}){let e=r=>typeof r=="string"?r:r&&typeof r=="object"&&(r.url||r.path)||"",i=e(n.image)||e(t.media_image)||e(t.entity_picture);if(i)return i;let s=n.metadata?.images;if(Array.isArray(s)){let r=s.find(a=>a&&a.remotely_accessible!==!1)||s[0];return e(r)}return""}function ti(n,t="",e=""){return Array.isArray(n)?n.map((i,s)=>{let r=i?.media_item||{},a=r.uri||i?.media_content_id||"",o=i?.queue_item_id||i?.queueItemId||"",l=!!(i?.active||i?.is_active||i?.current||i?.playing)||!!(t&&o===t)||!!(!t&&e&&a===e),c=Array.isArray(r.artists)?r.artists.map(h=>h?.name).filter(Boolean).join(", "):"";return{index:s,title:i?.media_title||i?.title||r.name||o&&i?.name||"",artist:i?.media_artist||c||i?.artist||"",album:i?.media_album_name||r.album?.name||i?.album||"",duration:Number(i?.media_duration??i?.duration??0)||0,art:i?.local_image_encoded||or(r,i),contentId:a,contentType:r.media_type||i?.media_content_type||"music",queueItemId:o,active:l}}):[]}function es(n,t=""){if(!n||typeof n!="object")return[];let e=Number(n.current_index),i=[],s=(r,a)=>{if(!r||typeof r!="object")return;let o=r.media_item||{},l=Array.isArray(o.artists)?o.artists.map(h=>h?.name).filter(Boolean).join(", "):"",c=o.uri||r.media_content_id||"";i.push({index:Number.isFinite(e)?e+a:a,title:o.name||r.media_title||r.name||"",artist:l||r.media_artist||"",album:o.album?.name||r.media_album_name||"",duration:Number(r.duration??o.duration??0)||0,art:o.image||r.media_image||r.entity_picture||"",contentId:c,contentType:o.media_type||"music",queueItemId:r.queue_item_id||"",active:a===0||!!(t&&c===t)})};return s(n.current_item,0),s(n.next_item,1),i}function rt(n,t){return t?/^(https?:|data:|blob:)/.test(t)?t:n?.hassUrl?n.hassUrl(t):t:""}var Xe=new Map;async function ue(n,t,e){if(!t)return"";let i=/^http:\/\//i.test(t),s=typeof window<"u"&&window.location?.protocol==="https:";if(!i||!s||!e||!n?.fetchWithAuth)return rt(n,t);let r=`/api/media_player_proxy/${encodeURIComponent(e)}?v=${V(t)}`;if(Xe.has(r))return Xe.get(r);try{let a=await n.fetchWithAuth(r);if(!a?.ok)throw new Error(`cover proxy ${a?.status}`);let o=await a.blob(),l=URL.createObjectURL(o);return Xe.set(r,l),l}catch{return""}}function pt(n,t,e){let i=t/100,s=e/100,r=(1-Math.abs(2*s-1))*i,a=(n%360+360)%360/60,o=r*(1-Math.abs(a%2-1)),l=[0,0,0];a<1?l=[r,o,0]:a<2?l=[o,r,0]:a<3?l=[0,r,o]:a<4?l=[0,o,r]:a<5?l=[o,0,r]:l=[r,0,o];let c=s-r/2;return l.map(h=>Math.round(v((h+c)*255,0,255)))}function is(n){let t=er(n),e=(t+42+V(n+"2")%40)%360,i=pt(t,72,58),s=pt(e,68,52);return{a1:`hsl(${t} 72% 58%)`,a2:`hsl(${e} 68% 52%)`,rgb1:i.join(","),rgb2:s.join(",")}}function ss(n){let t=String(n).replace("#","").trim(),e=t.length===3?t.split("").map(i=>i+i).join(""):t;return/^[0-9a-f]{6}$/i.test(e)?[parseInt(e.slice(0,2),16),parseInt(e.slice(2,4),16),parseInt(e.slice(4,6),16)].join(","):null}function B(n,t="255,255,255"){let e=String(n||"").trim();if(/^#[0-9a-f]{3,8}$/i.test(e))return ss(e.slice(0,7))||t;let i=e.match(/hsla?\(\s*([\d.]+)[,\s]+([\d.]+)%[,\s]+([\d.]+)%/i);if(i)return pt(Number(i[1]),Number(i[2]),Number(i[3])).join(",");let s=e.match(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/i);return s?`${s[1]},${s[2]},${s[3]}`:t}function ei(n){let t=ss(n);if(!t)return{h:0,s:0,l:50};let[e,i,s]=t.split(",").map(d=>Number(d)/255),r=Math.max(e,i,s),a=Math.min(e,i,s),o=(r+a)/2,l=r-a,c=0,h=0;return l!==0&&(h=l/(1-Math.abs(2*o-1)),r===e?c=(i-s)/l%6:r===i?c=(s-e)/l+2:c=(e-i)/l+4,c=(c*60+360)%360),{h:c,s:h*100,l:o*100}}function ii(n,t,e=.5){let i=(t.h-n.h+540)%360-180,s=(n.h+i*e+360)%360,r=n.s+(t.s-n.s)*e,a=n.l+(t.l-n.l)*e;return{h:s,s:r,l:a,css:`hsl(${Math.round(s)} ${Math.round(v(r,25,92))}% ${Math.round(v(a,38,72))}%)`,rgb:pt(s,v(r,25,92),v(a,38,72)).join(",")}}var Vt=new Map,lr=40;function cr(n,t){let i=document.createElement("canvas");i.width=36,i.height=36;let s=i.getContext("2d",{willReadFrequently:!0});if(!s)return null;s.drawImage(n,0,0,36,36);let r=s.getImageData(0,0,36,36).data,a=new Map;for(let g=0;g<r.length;g+=4){if(r[g+3]<180)continue;let w=r[g],S=r[g+1],A=r[g+2],k=Math.max(w,S,A),M=Math.min(w,S,A),$=(k+M)/510,P=k===0?0:(k-M)/k;if($<.12||$>.9||P<.14)continue;let L=0,R=k-M;R!==0&&(k===w?L=(S-A)/R%6:k===S?L=(A-w)/R+2:L=(w-S)/R+4,L=(L*60+360)%360);let I=Math.floor(L/18),U=a.get(I)||{count:0,sat:0,light:0};U.count+=1,U.sat+=P,U.light+=$,a.set(I,U)}if(!a.size)return null;let o=[...a.entries()].map(([g,y])=>({hue:g*18+9,score:y.count*(.45+y.sat/y.count),sat:y.sat/y.count,light:y.light/y.count})).sort((g,y)=>y.score-g.score),l=o[0],c=o.find(g=>{let y=Math.abs(g.hue-l.hue);return Math.min(y,360-y)>28})||{hue:(l.hue+44)%360,sat:l.sat,light:l.light},h=g=>v(Math.round(g*100),42,88),d=Math.round(l.hue),p=Math.round(c.hue),u=h(l.sat+.08),m=h(c.sat+.05),f=v(Math.round(l.light*100)+12,46,66),b=v(Math.round(c.light*100)+8,40,60);return{a1:`hsl(${d} ${u}% ${f}%)`,a2:`hsl(${p} ${m}% ${b}%)`,rgb1:pt(d,u,f).join(","),rgb2:pt(p,m,b).join(","),h1:d,s1:u,l1:f,h2:p,s2:m,l2:b,seed:V(t||"")}}function rs(n,t=""){if(!n)return Promise.resolve(null);if(Vt.has(n))return Vt.get(n);let e=new Promise(i=>{let s=new Image;s.crossOrigin="anonymous",s.decoding="async",s.onload=()=>{try{i(cr(s,t))}catch{i(null)}},s.onerror=()=>i(null),s.src=n});return Vt.size>lr&&Vt.clear(),Vt.set(n,e),e}var as=new WeakMap;function hr(){return typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches}function os(n){n.raf&&(window.cancelAnimationFrame(n.raf),n.raf=null),n.last=0}function ns(n,t){if(t.raf)return;n.style.transition="none",n.style.willChange="transform",t.last=0;let e=i=>{if(!n.isConnected){t.raf=null;return}let s=window.innerWidth<=700?32:0;if(s&&t.lastPaint&&i-t.lastPaint<s){t.raf=window.requestAnimationFrame(e);return}t.lastPaint=i,t.last||(t.last=i);let r=Math.min(.1,(i-t.last)/1e3);t.last=i,t.angle=(t.angle+r*360/(16e3/1e3))%360,n.style.transform=`rotate(${t.angle}deg)`,t.raf=window.requestAnimationFrame(e)};t.raf=window.requestAnimationFrame(e)}function dr(n,t){if(os(t),t.resetTimer&&(window.clearTimeout(t.resetTimer),t.resetTimer=null),!n.isConnected)return;if(!t.angle){n.style.transform="rotate(0deg)";return}let e=t.angle;n.style.transition="none",n.style.transform=`rotate(${e}deg)`,window.requestAnimationFrame(()=>{!n.isConnected||t.playing||(n.style.transition="transform 1.15s cubic-bezier(0.22, 1, 0.36, 1)",n.style.transform="rotate(0deg)",t.resetTimer=window.setTimeout(()=>{t.resetTimer=null,t.playing||(n.style.transition="none",n.style.willChange="auto",n.style.transform="rotate(0deg)")},1250))}),t.angle=0}function wt(n,t){if(!n)return;let e=as.get(n);if(e||(e={angle:0,playing:!1,raf:null,last:0,lastPaint:0,resetTimer:null},as.set(n,e)),hr()){os(e),n.style.transition="none",n.style.willChange="auto",n.style.transform="rotate(0deg)",e.playing=!1;return}let i=!!t;if(e.playing===i){i&&ns(n,e);return}e.playing=i,i?(e.resetTimer&&(window.clearTimeout(e.resetTimer),e.resetTimer=null),ns(n,e)):dr(n,e)}var kt=104,pe=36,ls=192,At=Math.min(2,typeof window>"u"?1:window.devicePixelRatio||1),ft=new WeakMap,me=["#7b5cff","#2ee6c5"];function fe(n){let t=String(n||"").replace("#","");return t.length===3?[0,1,2].map(e=>parseInt(t[e]+t[e],16)):t.length===6?[0,2,4].map(e=>parseInt(t.slice(e,e+2),16)):[123,92,255]}function ur(n,t,e){let i=fe(n),s=fe(t);return i.map((r,a)=>Math.round(r+(s[a]-r)*e))}function Wt(n,t){let[e,i,s]=n;return`rgba(${e}, ${i}, ${s}, ${t})`}function pr(n,t,e){let i=ft.get(n);if(!i?.ctx)return;let{ctx:s}=i,r=i.size||kt,a=i.r0||33.5,o=i.dpr||At;s.setTransform(o,0,0,o,0,0),s.clearRect(0,0,r,r);let l=r/2,c=Math.max(4,l-a-3),h=i.accent||me,d=i.barCount||pe,p=d/2,u=i.applyShadow!==!1;s.lineCap=i.cap||"round",s.shadowBlur=u?5+e*7:0;for(let m=0;m<d;m+=1){let f=v(t[m]||0,0,1),b=m/d*Math.PI*2-Math.PI/2,g=2.2+Math.pow(f,1.05)*c,y=Math.cos(b),w=Math.sin(b),S=Math.abs(m-p)/p,A=ur(h[0],h[1],S),k=.5+f*.48,M=l+y*a,$=l+w*a,P=l+y*(a+g),L=l+w*(a+g),R=s.createLinearGradient(M,$,P,L);R.addColorStop(0,Wt(A,0)),R.addColorStop(.18,Wt(A,0)),R.addColorStop(.46,Wt(A,k*.52)),R.addColorStop(1,Wt(A,k)),s.strokeStyle=R,s.shadowColor=Wt(A,.12+e*.26),s.lineWidth=i.lineWidth||3,s.beginPath(),s.moveTo(M,$),s.lineTo(P,L),s.stroke();let I=v((S-.3)/.45,0,1);I>.01&&(s.shadowBlur=0,s.strokeStyle=`rgba(255, 255, 255, ${((.05+f*.24)*I).toFixed(2)})`,s.lineWidth=1.1,s.stroke(),s.shadowBlur=u?5+e*7:0)}s.shadowBlur=0,s.shadowColor="transparent"}function cs(n){let t=ft.get(n);if(!t?.ctx)return;let e=t.size||kt,i=t.dpr||At;t.ctx.setTransform(i,0,0,i,0,0),t.ctx.clearRect(0,0,e,e)}function ri(n,t,e,i,s,r=!0){if(!n?.style)return;n.style.setProperty("--fab-beat",t.toFixed(4)),n.style.setProperty("--fab-beat-glow",e.toFixed(3));let a=s||n.querySelector?.(".fab-disc");if(a&&r){let o=i||me,[l,c,h]=fe(o[0]),[d,p,u]=fe(o[1]);a.style.boxShadow=["0 10px 26px rgba(2, 6, 18, 0.46)",`0 0 26px rgba(${l}, ${c}, ${h}, ${(e*.92).toFixed(3)})`,`0 0 52px rgba(${d}, ${p}, ${u}, ${(e*.55).toFixed(3)})`].join(", ")}}function si(n,t){let e=ft.get(n);if(!e||(e.raf=0,!e.playing||!e.visible))return;if(!n.isConnected){e.playing=!1;return}let i=e.maxFps?1e3/e.maxFps:0;if(i&&e.lastPaint&&t-e.lastPaint<i){e.raf=requestAnimationFrame(m=>si(n,m));return}e.lastPaint=t;let s=e.position+Math.max(0,t-e.since)/1e3,r=s/e.period*Math.PI*2+e.phase,a=.5+.5*Math.sin(r),o=.5+.5*Math.sin(r+.55),l=Math.pow(.5+.5*Math.sin(r*2.15+e.phase*1.7),3),c=[],h=e.barCount||pe,d=h/2;for(let m=0;m<d;m+=1){let f=m/(d-1),b=Math.sin(s*(4.6+e.hash%9*.25)+m*1.1+e.phase),g=Math.sin(s*(11.4+e.hash%5*.4)+m*2.3),y=.18*l*Math.pow(1-f,2.2),w;if(e.bands?.length&&e.bands.live){let A=f<.28?0:f<.55?1:2;w=(.1+.86*v(e.bands[A]||0,0,1))*(.58+.42*(.5+.5*b))*(.62+.38*(.5+.5*g))}else w=(.16+.68*Math.pow(1-f,1.05))*(.62+.38*(.5+.5*b)),w*=.55+.45*(.5+.5*g);let S=v(w+y+.04*e.energy,0,1);c[m]=S,c[h-1-m]=S}for(let m=0;m<h;m+=1){let f=e.smooth[m]||0,b=c[m]||0;e.smooth[m]=b>f?f+(b-f)*.72:f+(b-f)*.24}let p=Math.min(1,o*1.05+l*.4);pr(n,e.smooth,p);let u=1+Math.min(.085,o*.05+l*.05);ri(e.root,u,.16+Math.min(.46,o*.5+l*.26),e.accent,e.target,e.applyShadow),e.raf=requestAnimationFrame(m=>si(n,m))}function mr(n,{clearNow:t=!1}={}){let e=ft.get(n);if(e){if(e.raf&&(cancelAnimationFrame(e.raf),e.raf=0),ri(e.root,1,0,e.accent,e.target,e.applyShadow),e.smooth.fill(0),t){cs(n);return}e.clearTimer=window.setTimeout(()=>{let i=ft.get(n);i&&!i.playing&&cs(n)},460)}}function ge(n,t,e={}){if(!n||typeof n.getContext!="function")return;let i=ft.get(n);if(!i){let g=n.getContext("2d");if(!g)return;n.width=Math.round(kt*At),n.height=Math.round(kt*At),i={ctx:g,root:t,size:kt,r0:33.5,lineWidth:3,cap:"round",dpr:At,maxFps:0,lastPaint:0,target:null,applyShadow:!0,playing:!1,visible:!0,position:0,lastPosition:null,since:0,hash:0,period:2,phase:0,energy:.6,bands:null,accent:me,smooth:new Array(ls).fill(0),barCount:pe,raf:0,clearTimer:0},ft.set(n,i)}let s=Array.isArray(e.accent)&&e.accent.length>=2?[e.accent[0],e.accent[1]]:me,r=Math.max(104,Number(e.maxSize)||360),a=Math.max(72,Math.min(r,Math.round(Number(e.size)||kt))),o=Number(e.innerRadius);i.accent=s,i.root=t,i.size=a,i.r0=Number.isFinite(o)?o:a*.322,i.lineWidth=Math.max(1.6,Math.min(5,Number(e.lineWidth)||3)),i.cap=e.cap==="butt"?"butt":"round";let l=Math.round(Number(e.bars)||pe),c=Math.max(24,Math.min(ls,l-l%2));i.barCount!==c&&(i.barCount=c,i.smooth.fill(0)),i.target=e.target||null,i.bands=Array.isArray(e.bands)&&e.bands.length?e.bands:null,i.applyShadow=e.applyShadow!==!1,i.maxFps=Math.max(0,Number(e.maxFps)||0);let h=Math.min(2,Math.max(1,Number(e.dpr)||At));i.dpr=h,n.width!==Math.round(a*h)&&(n.width=Math.round(a*h),n.height=Math.round(a*h)),i.clearTimer&&(window.clearTimeout(i.clearTimer),i.clearTimer=0),i.root=t||i.root;let d=!!e.playing,p=typeof n.getClientRects=="function"?n.getClientRects().length>0:!0,u=e.visible!==!1&&p,m=i.playing,f=Number(e.position);Number.isFinite(f)&&f>=0&&((i.lastPosition==null||Math.abs(f-i.lastPosition)>.25||!m&&d)&&(i.position=f,i.since=performance.now()),i.lastPosition=f);let b=[e.title,e.artist,e.album].filter(Boolean).join("|")||"ha-music";if(i.hash=V(b),i.period=1.7+(i.hash>>>8)%90/100,i.phase=i.hash%360/360*Math.PI*2,i.energy=.55+(i.hash>>>16)%100/220,i.playing=d,i.visible=u,!d||!u){mr(n,{clearNow:!u});return}i.raf||(ri(i.root,1,0,i.accent,i.target,i.applyShadow),i.since=performance.now(),i.lastPaint=0,i.raf=requestAnimationFrame(g=>si(n,g)))}var be="haMusicMiniPlayer",xs="haMusicMiniPositions",$t=new Set(["top","sidebar","fab"]),ni="ha-music-dock-pref-changed";function St(n){return typeof n=="string"&&N[n]?n:O}function Q(n){if(!n||typeof n!="object"||Array.isArray(n))return{};let t={};for(let e of $t)N[n[e]]&&(t[e]=n[e]);return t}function fr(n,t){if(!n)return;let e=St(t);if(n.dataset.theme===e&&n.dataset.hmThemeReady==="1")return;let i=N[e];n.dataset.theme=e,n.style.setProperty("--hm-accent",i.accent[0]),n.style.setProperty("--hm-accent-2",i.accent[1]),n.style.setProperty("--hm-accent-rgb",B(i.accent[0],"46,230,197")),n.style.setProperty("--hm-accent-2-rgb",B(i.accent[1],"123,92,255")),n.style.setProperty("--hm-base-rgb",B(i.base,"5,10,18")),n.style.setProperty("--hm-glow",String(i.glow??1)),n.dataset.hmThemeReady="1"}function oi(){try{let n=window.localStorage.getItem(xs);if(!n)return{};let t=JSON.parse(n);return t&&typeof t=="object"&&!Array.isArray(t)?t:{}}catch{return{}}}function ai(n,t,e){if($t.has(n))try{let i=oi();i[n]={x:Number(t.toFixed(4)),y:Number(e.toFixed(4))},window.localStorage.setItem(xs,JSON.stringify(i))}catch{}}var hs='<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path d="M14.5 5.2l4.6-1v9.1a3 3 0 1 1-1.8-2.7V7.1l-2.8.6v7.7a3 3 0 1 1-1.8-2.7V5.2z" fill="currentColor"/></svg>',ds='<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" fill="currentColor"/></svg>',us='<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false"><path d="M16 6h2v12h-2zM6 6l8.5 6L6 18z" fill="currentColor"/></svg>',_e='<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>',gr='<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false"><path d="M6 5h4v14H6zM14 5h4v14h-4z" fill="currentColor"/></svg>';var _r='<svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true" focusable="false"><path d="M6.7 9.3L12 14.6l5.3-5.3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';var vs=new Set(["HA-SIDEBAR","ASIDE"]);function at(n,t=1,e=1){return!!(n&&n.width>=t&&n.height>=e&&n.bottom>0&&n.right>0)}function ws(n,t,e,i=0){if(!n||i>8)return;let s=n.querySelectorAll?n.querySelectorAll("*"):[];for(let r of s){try{t(r)&&e.push(r)}catch{}r.shadowRoot&&ws(r.shadowRoot,t,e,i+1)}}function nt(n){let t=[];return ws(document,n,t),t}function br(n){let t=nt(i=>n.has(i.tagName)),e=null;for(let i of t){let s=i.getBoundingClientRect();at(s,24,24)&&(!e||s.width*s.height>e.width*e.height)&&(e={left:s.left,top:s.top,width:s.width,height:s.height,right:s.right,bottom:s.bottom})}return e}function Qt(){let n=nt(i=>{if(i.tagName==="BODY"||i.tagName==="HTML")return!1;let s=i.getBoundingClientRect();return!at(s,200,36)||s.top>8||s.height>150?!1:i.classList?.contains("top-app-bar")||i.classList?.contains("app-header")||i.tagName==="HA-TOP-APP-BAR"||i.tagName==="HA-TOP-APP-BAR-FIXED"}),t=null;for(let i of n){let s=i.getBoundingClientRect();s.height>150||(!t||s.width*s.height>t.width*t.height)&&(t={left:s.left,top:s.top,width:s.width,height:s.height,right:s.right,bottom:s.bottom})}if(t)return t;let e=nt(i=>{if(i.tagName==="BODY"||i.tagName==="HTML")return!1;let s=i.getBoundingClientRect();if(!at(s,240,36)||s.top>8||s.height>92)return!1;let r=`${i.tagName} ${i.id} ${i.className||""}`.toLowerCase();return/top-app-bar|app-header|navbar|\bheader\b/.test(r)});for(let i of e){let s=i.getBoundingClientRect();if(s.height<=92)return{left:s.left,top:s.top,width:s.width,height:s.height,right:s.right,bottom:s.bottom}}return null}function ye(n){if(!n)return null;let t=nt(i=>{if(i.tagName==="BODY"||i.tagName==="HTML"||typeof i.getBoundingClientRect!="function")return!1;let s=i.getBoundingClientRect();if(!at(s,16,16)||s.width>88||s.height>64||s.left<n.left-2||s.right>n.right+2||s.top<n.top-4||s.bottom>n.bottom+4)return!1;let r=[i.getAttribute?.("aria-label"),i.getAttribute?.("title"),i.getAttribute?.("icon"),i.id,i.className].filter(Boolean).join(" ").toLowerCase();return/remove|delete|close|unpin|关闭|删除/.test(r)?!1:/(mdi:(plus|add)|plus|add|create|添加|新增|新建)/.test(r)}),e=null;for(let i of t){let s=i.getBoundingClientRect(),r=s.width*s.height;(!e||r>e.area||r===e.area&&s.right>e.rect.right)&&(e={rect:s,area:r})}return e?.rect||null}function yr(n){if(!n)return null;let t=nt(i=>{if(i.tagName==="BODY"||i.tagName==="HTML"||typeof i.getBoundingClientRect!="function")return!1;let s=i.getBoundingClientRect();if(!at(s,16,16)||s.height>72||s.width>n.width+2||s.left<n.left-2||s.right>n.right+2||s.top<n.top||s.bottom>n.bottom+2||s.top<n.top+n.height*.45)return!1;let r=[i.getAttribute?.("aria-label"),i.getAttribute?.("title"),i.getAttribute?.("icon"),i.id,i.className].filter(Boolean).join(" ").toLowerCase();return/remove|delete|close|关闭|删除/.test(r)?!1:/(settings|设置|cog|gear)/.test(r)}),e=null;for(let i of t){let s=i.getBoundingClientRect();(!e||s.top>e.top)&&(e={top:s.top,rect:s})}return e?.rect||null}function ks(){let n=br(vs);if(n)return n;let t=nt(i=>{if(i.tagName==="BODY"||i.tagName==="HTML")return!1;let s=i.getBoundingClientRect();if(!at(s,40,240)||s.left>8)return!1;let r=`${i.tagName} ${i.id} ${i.className||""}`.toLowerCase();return/sidebar|navigation|nav-drawer/.test(r)}),e=null;for(let i of t){let s=i.getBoundingClientRect();(!e||s.height>e.height)&&(e={left:s.left,top:s.top,width:s.width,height:s.height,right:s.right,bottom:s.bottom})}return e}function ps(){let n=nt(e=>{if(e.tagName==="BODY"||e.tagName==="HTML")return!1;let i=e.getBoundingClientRect();return!at(i,200,36)||i.top>8||i.height>150?!1:e.classList?.contains("top-app-bar")||e.classList?.contains("app-header")||e.tagName==="HA-TOP-APP-BAR"||e.tagName==="HA-TOP-APP-BAR-FIXED"}),t=null;for(let e of n){let i=e.getBoundingClientRect();i.height>150||(!t||i.width*i.height>t.area)&&(t={node:e,area:i.width*i.height})}return t?.node||null}function ms(){let n=nt(e=>vs.has(e.tagName)),t=null;for(let e of n){let i=e.getBoundingClientRect();at(i,24,120)&&(!t||i.height>t.height)&&(t={node:e,height:i.height})}return t?.node||null}function fs(n){let t=Math.round(window.innerWidth||0),e=Math.round(window.innerHeight||0);if(n==="top"){let i=Qt(),s=i?.height||56,r=i?.top||0;return{left:i?.left||0,top:r,width:i?.width||t,height:Math.max(40,Math.min(72,s)),right:(i?.left||0)+(i?.width||t),bottom:r+Math.max(40,Math.min(72,s))}}if(n==="sidebar"){let i=ks();if(i)return i;let s=Qt()?.height||56;return{left:0,top:s,width:256,height:Math.max(240,e-s),right:256,bottom:e}}return null}var xe=12;function li(){let n=Math.round(window.innerWidth||0),t=Math.round(window.innerHeight||0),e=Qt(),i=ks(),s=i&&i.height>=t*.4?i.right+xe:0,r=e&&e.width>=n*.5?e.bottom+xe:0;return{vw:n,vh:t,minX:s,minY:r}}function gs(n,t,e,i,s=li()){let{vw:r,vh:a,minX:o,minY:l}=s,c=Math.max(o,r-e-xe),h=Math.max(l,a-i-xe);return{x:H(n,o,c),y:H(t,l,h)}}function H(n,t,e){return e<t?t:Math.max(t,Math.min(e,n))}function _s(n){return n==="top"||n==="sidebar"?8:24}var bs=`
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
`;function K(n){return n===!0||n==="1"?["top"]:Array.isArray(n)?[...new Set(n.map(t=>String(t)).filter(t=>$t.has(t)))]:typeof n!="string"||!n||n==="none"?[]:n.includes(",")?[...new Set(n.split(",").map(t=>t.trim()).filter(t=>$t.has(t)))]:$t.has(n)?[n]:[]}function As(n){return K(n)[0]||"none"}function Gt(n){return typeof n=="string"&&n.startsWith("media_player.")?n:""}function ot(n){if(!n||typeof n!="object"||Array.isArray(n))return{};let t={};for(let e of $t){let i=Gt(n[e]);i&&(t[e]=i)}return t}function gt(){if(typeof document>"u")return null;let n=document.querySelector("home-assistant");if(n?.hass?.states)return n.hass;let t=n?.shadowRoot?.querySelector("home-assistant-main");if(t?.hass?.states)return t.hass;let e=document.querySelector("ha-music");return e?.hass?.states?e.hass:null}function W(){try{let n=window.localStorage.getItem(be);if(!n)return null;let t=JSON.parse(n),e=K(t?.modes??t?.mode),i=ot(t?.entities),s=Q(t?.themes),r=Number(t?.updated)||0,a=t?.disabled===!0,o=Gt(t?.entity);o&&e[0]&&!i[e[0]]&&(i[e[0]]=o);let l=e.filter(c=>i[c]);return l.length?{modes:l,entities:i,themes:s,disabled:!1,updated:r}:a?{modes:[],entities:i,themes:s,disabled:!0,updated:r}:null}catch{return null}}function ys(n){let t=K(n?.modes??n?.mode),e=ot(n?.entities),i=Q(n?.themes),s={};for(let a of Object.keys(e).sort())s[a]=e[a];let r={};for(let a of Object.keys(i).sort())r[a]=i[a];return JSON.stringify({modes:t,entities:s,themes:r,disabled:n?.disabled===!0})}function xr(n){if(!(typeof window>"u"))try{window.dispatchEvent(new CustomEvent(ni,{detail:n}))}catch{}}function ve(n={}){try{let t=K(n.modes??n.mode),e=ot(n.entities),i=Q(n.themes),s=Number(n.updated)||Date.now(),r=Gt(n.entity);r&&t[0]&&!e[t[0]]&&(e[t[0]]=r);let a=t.filter(h=>e[h]),o=a.length>0?{modes:a,entities:e,themes:i,disabled:!1,updated:s}:{modes:[],entities:e,themes:i,disabled:!0,updated:s},l=window.localStorage.getItem(be),c=l?JSON.parse(l):null;if(c&&ys(c)===ys(o))return;window.localStorage.setItem(be,JSON.stringify(o)),xr(o)}catch{}}function $s(n){if(typeof window>"u")return()=>{};let t=i=>{try{n(i.detail||W())}catch{}},e=i=>{if(i.key===be)try{n(W())}catch{}};return window.addEventListener(ni,t),window.addEventListener("storage",e),()=>{window.removeEventListener(ni,t),window.removeEventListener("storage",e)}}function we(n){if(typeof document>"u")return;let t=window.__haMusicDocks;if(t&&typeof t.get=="function"){if(n)t.get(n)?.remove(),t.delete(n);else{for(let e of t.values())e.remove();t.clear()}window.__haMusicDock=t.values().next().value||null;return}window.__haMusicDock?.remove(),window.__haMusicDock=null}function Yt(n=[]){if(typeof window>"u"||typeof document>"u")return[];let t=[];for(let s of Array.isArray(n)?n:[n]){let r=As(s?.mode),a=Gt(s?.entity);r==="none"||!a||t.push({mode:r,entity:a,hass:s?.hass||null,theme:St(s?.theme)})}if(!t.length)return we(),[];if(!document.body)return document.addEventListener("DOMContentLoaded",()=>Yt(t),{once:!0}),[];let e=window.__haMusicDocks instanceof Map?window.__haMusicDocks:new Map,i=new Map(t.map(s=>[s.mode,s]));for(let[s,r]of e)i.has(s)||(r.remove(),e.delete(s));for(let[s,r]of i){let a=e.get(s);a?a.update(r):(a=document.createElement("ha-music-mini"),a.update(r),document.body.appendChild(a),e.set(s,a))}return window.__haMusicDocks=e,window.__haMusicDock=e.values().next().value||null,[...e.values()]}var ci=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this._mode="top",this._theme=O,this._open=!1,this._folded=!1,this._entity="",this._artSource="",this._artAppliedSource=null,this._artSeq=0,this._iconState="",this._disabledState=null,this._clockKey="",this._clockAt=0,this._clockBase=0,this._clockStamp="",this._hass=null,this._poll=null,this._press=null,this._pressTimer=null,this._drag=null,this._dragging=!1,this._suppressClick=!1,this._clickTimer=null,this._onClick=t=>this._handleClick(t),this._onRoute=()=>this._sync(),this._onPointerDown=t=>this._handlePointerDown(t),this._onPointerMove=t=>this._handlePointerMove(t),this._onPointerUp=t=>this._handlePointerUp(t),this._onPointerCancel=t=>this._handlePointerCancel(t),this._onContextMenu=t=>this._handleContextMenu(t),this._onDragStart=t=>{t.preventDefault(),t.stopPropagation()},this._onResize=()=>{this._applySavedPosition(),this._watchDockBounds()},this._boundsObserver=null,this._boundsRaf=null,this._boundsNodes=0,this._sync=this._sync.bind(this)}update(t={}){let e=As(t.mode),i=Gt(t.entity),s=St(t.theme),r=e!==this._mode,a=r||i!==this._entity||s!==this._theme;this._mode=e,this._theme=s,r&&(this._open=!1,this._folded=!1),this._entity=i,t.hass?.states&&(this._hass=t.hass),a&&(this._artAppliedSource=null,this._iconState="",this._disabledState=null),(!this.shadowRoot.childElementCount||r)&&this._render(),this._sync(),a&&(this._applySavedPosition(),this._watchDockBounds())}connectedCallback(){this.shadowRoot.childElementCount||this._render(),this.shadowRoot.addEventListener("click",this._onClick),this.shadowRoot.addEventListener("pointerdown",this._onPointerDown),this.shadowRoot.addEventListener("pointermove",this._onPointerMove),this.shadowRoot.addEventListener("pointerup",this._onPointerUp),this.shadowRoot.addEventListener("pointercancel",this._onPointerCancel),this.shadowRoot.addEventListener("contextmenu",this._onContextMenu),this.shadowRoot.addEventListener("dragstart",this._onDragStart,!0),window.addEventListener("resize",this._onResize),window.addEventListener("location-changed",this._onRoute),this._startPolling(),this._sync(),window.requestAnimationFrame(()=>{this._applySavedPosition(),this._watchDockBounds()})}disconnectedCallback(){this.shadowRoot.removeEventListener("click",this._onClick),this.shadowRoot.removeEventListener("pointerdown",this._onPointerDown),this.shadowRoot.removeEventListener("pointermove",this._onPointerMove),this.shadowRoot.removeEventListener("pointerup",this._onPointerUp),this.shadowRoot.removeEventListener("pointercancel",this._onPointerCancel),this.shadowRoot.removeEventListener("contextmenu",this._onContextMenu),this.shadowRoot.removeEventListener("dragstart",this._onDragStart,!0),window.removeEventListener("resize",this._onResize),window.removeEventListener("location-changed",this._onRoute),this._boundsObserver&&(this._boundsObserver.disconnect(),this._boundsObserver=null),this._boundsRaf&&(cancelAnimationFrame(this._boundsRaf),this._boundsRaf=null),this._boundsNodes=0,this._poll&&clearInterval(this._poll),this._poll=null}_startPolling(){this._poll||(this._poll=window.setInterval(()=>{let t=gt()||this._hass;t?.states&&(this._hass=t,this._sync()),this._boundsNodes||this._watchDockBounds()},500))}_watchDockBounds(){if(typeof ResizeObserver>"u")return;let t=[];if(this._mode==="top"?t=[ps()].filter(Boolean):this._mode==="sidebar"?t=[ms()].filter(Boolean):this._mode==="fab"&&(t=[ps(),ms()].filter(Boolean)),!t.length){this._boundsNodes=0;return}this._boundsObserver&&this._boundsObserver.disconnect(),this._boundsNodes=t.length,this._boundsObserver=new ResizeObserver(()=>{this._dragging||this._boundsRaf||(this._boundsRaf=window.requestAnimationFrame(()=>{this._boundsRaf=null,this._applySavedPosition()}))});for(let e of t)this._boundsObserver.observe(e)}_render(){if(this._eq=null,this._mode==="fab")return this._renderFab();this.shadowRoot.innerHTML=`
      <style>${bs}</style>
      <div class="mini" data-mode="${this._mode}" role="region" aria-label="HA Music \u8FF7\u4F60\u64AD\u653E\u5668">
        <div class="art">
          <img alt="" draggable="false" />
          <span class="fallback">${hs}</span>
        </div>
        <div class="meta">
          <div class="title">\u9009\u62E9\u64AD\u653E\u5668</div>
          <div class="sub">\u5728\u5361\u7247\u7F16\u8F91\u5668\u4E2D\u9009\u62E9\u4F4D\u7F6E</div>
        </div>
        <div class="controls">
          <button data-act="prev" type="button" aria-label="\u4E0A\u4E00\u9996">${ds}</button>
          <button class="toggle" data-act="toggle" type="button" aria-label="\u64AD\u653E">${_e}</button>
          <button data-act="next" type="button" aria-label="\u4E0B\u4E00\u9996">${us}</button>
        </div>
        <div class="progress"><span></span></div>
      </div>
    `,this._mini=this.shadowRoot.querySelector(".mini"),this._art=this.shadowRoot.querySelector(".art img"),this._fallback=this.shadowRoot.querySelector(".fallback"),this._title=this.shadowRoot.querySelector(".title"),this._sub=this.shadowRoot.querySelector(".sub"),this._toggle=this.shadowRoot.querySelector(".toggle"),this._prev=this.shadowRoot.querySelector('[data-act="prev"]'),this._next=this.shadowRoot.querySelector('[data-act="next"]'),this._progress=this.shadowRoot.querySelector(".progress span"),this._disc=null,this._quick=null,this._art.addEventListener("error",()=>{this._art.removeAttribute("src"),this._fallback&&(this._fallback.style.display="grid"),this._mini?.style.removeProperty("--fab-cover")})}_renderFab(){this.shadowRoot.innerHTML=`
      <style>${bs}</style>
      <div class="mini mini-fab" data-mode="fab" data-open="${this._open?"true":"false"}" role="region" aria-label="HA Music \u60AC\u6D6E\u64AD\u653E\u5668">
        <div class="fab-orb">
          <button class="fab-disc" type="button" aria-label="\u5C55\u5F00\u64AD\u653E\u5668" aria-expanded="${this._open?"true":"false"}">
            <div class="art">
              <img alt="" draggable="false" />
              <span class="fallback">${hs}</span>
            </div>
            <span class="fab-glow"></span>
          </button>
          <canvas class="fab-eq" aria-hidden="true"></canvas>
          <button class="fab-quick" data-act="toggle" type="button" aria-label="\u64AD\u653E">${_e}</button>
        </div>
        <div class="fab-panel">
          <div class="fab-head">
            <div class="meta">
              <div class="title">\u9009\u62E9\u64AD\u653E\u5668</div>
              <div class="sub">\u5728\u5361\u7247\u7F16\u8F91\u5668\u4E2D\u9009\u62E9\u4F4D\u7F6E</div>
            </div>
            <button class="fab-collapse" data-act="collapse" type="button" aria-label="\u6536\u8D77\u64AD\u653E\u5668">${_r}</button>
          </div>
          <div class="progress"><span></span></div>
          <div class="controls">
            <button data-act="prev" type="button" aria-label="\u4E0A\u4E00\u9996">${ds}</button>
            <button class="toggle" data-act="toggle" type="button" aria-label="\u64AD\u653E">${_e}</button>
            <button data-act="next" type="button" aria-label="\u4E0B\u4E00\u9996">${us}</button>
          </div>
        </div>
      </div>
    `,this._mini=this.shadowRoot.querySelector(".mini"),this._art=this.shadowRoot.querySelector(".art img"),this._fallback=this.shadowRoot.querySelector(".fallback"),this._title=this.shadowRoot.querySelector(".title"),this._sub=this.shadowRoot.querySelector(".sub"),this._toggle=this.shadowRoot.querySelector(".fab-panel .toggle"),this._prev=this.shadowRoot.querySelector('.fab-panel [data-act="prev"]'),this._next=this.shadowRoot.querySelector('.fab-panel [data-act="next"]'),this._progress=this.shadowRoot.querySelector(".fab-panel .progress span"),this._disc=this.shadowRoot.querySelector(".fab-disc"),this._quick=this.shadowRoot.querySelector(".fab-quick"),this._collapse=this.shadowRoot.querySelector(".fab-collapse"),this._eq=this.shadowRoot.querySelector(".fab-eq"),this._art.addEventListener("error",()=>{this._art.removeAttribute("src"),this._fallback&&(this._fallback.style.display="grid"),this._mini?.style.removeProperty("--fab-cover")})}_stateLabel(t){let e=!this._hass?.language||String(this._hass.language).startsWith("zh");return{playing:e?"\u64AD\u653E\u4E2D":"Playing",paused:e?"\u5DF2\u6682\u505C":"Paused",idle:e?"\u7A7A\u95F2":"Idle",off:e?"\u5DF2\u5173\u95ED":"Off",unavailable:e?"\u4E0D\u53EF\u7528":"Unavailable",unknown:e?"\u672A\u77E5":"Unknown"}[t]||t}_clearDockInlineStyles(){if(this._mini){for(let t of["left","top","right","bottom","width","height","max-height"])this._mini.style.removeProperty(t);this._mini.style.removeProperty("--hm-sidebar-compact-size"),delete this._mini.dataset.compact}}_applySavedPosition(){if(!this._mini||!this._mini.isConnected||this._dragging)return;let t=window.innerWidth<=700;if(this._mini.style.removeProperty("display"),this._mode==="sidebar"&&t){this._mini.style.display="none";return}if(this._mode==="fab"&&t){this._mini.style.display="none";return}if(this._mode==="fab"){let b=this._mini,g=b.getBoundingClientRect(),y=g.width||64,w=g.height||64,S=li(),A=oi(),k=t?null:A.fab,M=S.vw-y-(t?12:24),$=S.vh-w-(t?14:24),P=gs(k&&Number.isFinite(k.x)?k.x*window.innerWidth:M,k&&Number.isFinite(k.y)?k.y*window.innerHeight:$,y,w,S);b.style.left=`${Math.round(P.x)}px`,b.style.top=`${Math.round(P.y)}px`,b.style.right="auto",b.style.bottom="auto";return}let e=fs(this._mode);if(!e)return;let s=oi()[this._mode],r=_s(this._mode),a=this._mini;if(this._mode==="top"){if(this._folded){let k=Math.round(Math.min(44,Math.max(36,e.height-8)));a.style.width=`${k}px`,a.style.height=`${k}px`,a.style.removeProperty("max-height"),delete a.dataset.compact;let M=ye(e),$=M?M.left-8-k:e.right-k-80,P=t?e.left+r:H(s&&Number.isFinite(s.x)?s.x*window.innerWidth:$,e.left+r,e.right-k-r);a.style.left=`${Math.round(P)}px`,a.style.top=`${Math.round(e.top+Math.max(2,(e.height-k)/2))}px`,a.style.right="auto",a.style.bottom="auto";return}let b=Math.round(Math.min(44,Math.max(38,e.height-8))),g=Math.max(150,e.width-r*2),y=t?Math.max(150,Math.min(374,window.innerWidth-16)):Math.round(Math.min(300,Math.max(200,e.width-140),g));a.style.width=`${y}px`,a.style.height=`${b}px`,a.style.removeProperty("max-height"),delete a.dataset.compact;let w=ye(e),S=w?w.left-8-y:e.right-y-80,A=t?e.left+r:H(s&&Number.isFinite(s.x)?s.x*window.innerWidth:S,e.left+r,e.right-y-r);a.style.left=`${Math.round(A)}px`,a.style.top=`${Math.round(e.top+Math.max(2,(e.height-b)/2))}px`,a.style.right="auto",a.style.bottom="auto";return}let o=Math.round(Math.max(56,Math.min(236,e.width-16))),l=o<170,c=Math.round(Math.max(40,Math.min(56,e.width-4))),h=l?c:56;this._folded?(a.style.width=`${h}px`,a.style.height=`${h}px`,delete a.dataset.compact):l?(a.style.setProperty("--hm-sidebar-compact-size",`${c}px`),a.style.width=`${c}px`,a.style.height=`${c}px`,a.dataset.compact="true"):(a.style.removeProperty("--hm-sidebar-compact-size"),a.style.width=`${o}px`,a.style.height="auto",a.dataset.compact="false"),a.style.maxHeight=this._folded?`${h}px`:`${Math.max(56,e.height-16)}px`;let d=Math.round(e.left+(l?4:r));a.style.left=`${d}px`,a.style.right="auto",a.style.bottom="auto";let p=this._folded?h:a.getBoundingClientRect().height||58,u=yr(e),m=u?u.top-8-p:e.bottom-p-148,f=H(s&&Number.isFinite(s.y)?s.y*window.innerHeight:m,e.top+r,e.bottom-p-r);a.style.top=`${Math.round(f)}px`}_saveCurrentPosition(){if(!this._mini)return;let t=this._mini.getBoundingClientRect();if(this._mode==="fab"){ai("fab",H(t.left/Math.max(1,window.innerWidth),0,1),H(t.top/Math.max(1,window.innerHeight),0,1));return}if(this._mode==="top"){ai(this._mode,H(t.left/Math.max(1,window.innerWidth),0,1),0);return}ai(this._mode,0,H(t.top/Math.max(1,window.innerHeight),0,1))}_handlePointerDown(t){!this._mini||t.button!==0||t.isPrimary===!1||(this._clearPress(),this._press={pointerId:t.pointerId,x:t.clientX,y:t.clientY,long:!1,moved:!1},this._dragging=!1,this._suppressClick=!1,this._pressTimer=window.setTimeout(()=>{this._pressTimer=null,this._press&&this._beginDrag()},360))}_beginDrag(){if(!this._press||!this._mini)return;this._press.long=!0,this._dragging=!0;let t=this._mini.getBoundingClientRect();this._drag={left:t.left,top:t.top,width:t.width,height:t.height,x:this._press.x,y:this._press.y,bounds:this._mode==="fab"?li():fs(this._mode)},this._mini.dataset.dragging="true",this._mini.style.left=`${t.left}px`,this._mini.style.top=`${t.top}px`,this._mini.style.right="auto",this._mini.style.bottom="auto";try{this._mini.setPointerCapture(this._press.pointerId)}catch{}}_handlePointerMove(t){if(!this._press)return;let e=t.clientX-this._press.x,i=t.clientY-this._press.y;if(!this._dragging){Math.hypot(e,i)>8&&(this._press.moved=!0,this._pressTimer&&(window.clearTimeout(this._pressTimer),this._pressTimer=null));return}t.preventDefault();let s=this._drag.bounds;if(!s)return;let r=_s(this._mode),a=this._drag.left,o=this._drag.top;if(this._mode==="top")a=H(this._drag.left+e,s.left+r,s.right-this._drag.width-r);else if(this._mode==="sidebar")o=H(this._drag.top+i,s.top+r,s.bottom-this._drag.height-r);else if(this._mode==="fab"){let l=gs(this._drag.left+e,this._drag.top+i,this._drag.width,this._drag.height,s);a=l.x,o=l.y}this._mini.style.left=`${Math.round(a)}px`,this._mini.style.top=`${Math.round(o)}px`,this._mini.style.right="auto",this._mini.style.bottom="auto"}_handlePointerUp(){if(!this._press)return;let t=this._press.long,e=this._press.moved;this._pressTimer&&(window.clearTimeout(this._pressTimer),this._pressTimer=null),this._dragging&&(this._saveCurrentPosition(),this._releasePointer()),(this._dragging||t||e)&&(this._suppressClick=!0,window.setTimeout(()=>{this._suppressClick=!1},560)),this._dragging=!1,this._press=null,this._mini&&delete this._mini.dataset.dragging}_handlePointerCancel(){this._releasePointer(),this._clearPress(),this._dragging=!1,this._mini&&delete this._mini.dataset.dragging}_clearPress(){this._pressTimer&&(window.clearTimeout(this._pressTimer),this._pressTimer=null),this._press=null}_releasePointer(){let t=this._press?.pointerId;if(!(t===void 0||!this._mini))try{this._mini.releasePointerCapture(t)}catch{}}_handleContextMenu(t){(this._press||this._dragging)&&t.preventDefault()}_sync(){if(!this._mini)return;fr(this._mini,this._theme),this._mini.dataset.mode!==this._mode&&(this._mini.dataset.mode=this._mode);let t=this._mode!=="fab"&&this._folded?"true":"false";if(this._mini.dataset.folded!==t&&(this._mini.dataset.folded=t),this._mode==="fab"){let b=this._open?"true":"false";this._mini.dataset.open!==b&&(this._mini.dataset.open=b)}if(!this._entity){this._clockKey="",this._clockAt=0,this._clockBase=0,this._mini.dataset.playing!=="false"&&(this._mini.dataset.playing="false"),this._title.textContent!=="\u9009\u62E9\u64AD\u653E\u5668"&&(this._title.textContent="\u9009\u62E9\u64AD\u653E\u5668"),this._sub.textContent!=="\u5728\u5361\u7247\u7F16\u8F91\u5668\u4E2D\u9009\u62E9\u4F4D\u7F6E"&&(this._sub.textContent="\u5728\u5361\u7247\u7F16\u8F91\u5668\u4E2D\u9009\u62E9\u4F4D\u7F6E"),this._setDisabled(!0),this._progress.style.width="0%",this._setArt(null),wt(this._art,!1),this._syncFabEq(!1,{},0);return}let e=gt()||this._hass;e?.states&&(this._hass=e);let i=this._hass?.states?.[this._entity];if(!i||i.state==="unavailable"||i.state==="unknown"){let b=i?.attributes?.friendly_name||this._entity;this._mini.dataset.playing!=="false"&&(this._mini.dataset.playing="false"),this._title.textContent!==b&&(this._title.textContent=b),this._sub.textContent!=="\u5B9E\u4F53\u4E0D\u53EF\u7528"&&(this._sub.textContent="\u5B9E\u4F53\u4E0D\u53EF\u7528"),this._setDisabled(!0),this._progress.style.width="0%",this._setArt(null),wt(this._art,!1),this._syncFabEq(!1,{},0);return}let r=i.attributes||{},a=r.media_title||r.friendly_name||this._entity;this._title.textContent!==a&&(this._title.textContent=a);let o=r.media_artist||r.media_album_name||"";o===a&&(o="");let l=this._stateLabel(i.state),c=o?`${o} \xB7 ${l}`:l;this._sub.textContent!==c&&(this._sub.textContent=c),this._setDisabled(!1);let h=i.state==="playing",d=h?"true":"false";this._mini.dataset.playing!==d&&(this._mini.dataset.playing=d);let p=h?"pause":"play";if(this._iconState!==p){this._iconState=p;let b=h?gr:_e;this._toggle.innerHTML=b,this._toggle.setAttribute("aria-label",h?"\u6682\u505C":"\u64AD\u653E"),this._quick&&(this._quick.innerHTML=b,this._quick.setAttribute("aria-label",h?"\u6682\u505C":"\u64AD\u653E"))}if(this._disc){let b=this._open?"true":"false";this._disc.getAttribute("aria-expanded")!==b&&(this._disc.setAttribute("aria-label",this._open?"\u6536\u8D77\u64AD\u653E\u5668":"\u5C55\u5F00\u64AD\u653E\u5668"),this._disc.setAttribute("aria-expanded",b))}this._setArt(r.entity_picture),wt(this._art,h);let u=Number(r.media_duration||0),m=this._displayPosition(h,r,u);this._syncFabEq(h,r,m);let f=u>0?Math.min(100,Math.max(0,m/u*100)):0;this._progress.style.width=`${f}%`}_displayPosition(t,e={},i=0){let s=Number(e.media_position)||0,r=String(e.media_position_updated_at||""),a=r?Date.parse(r):NaN,o=[this._entity,e.media_title||"",e.media_artist||"",e.media_album_name||"",e.media_duration||0,e.media_content_id||""].join("|"),l=Date.now(),c=!!(this._clockKey&&this._clockKey!==o);c||!this._clockKey?(this._clockKey=o,this._clockAt=l,this._clockBase=c?0:s,this._clockStamp=r):Number.isFinite(a)?r!==this._clockStamp&&(this._clockBase=s,this._clockAt=Math.min(a,l),this._clockStamp=r):Math.abs(s-this._clockBase)>.05&&(this._clockBase=s,this._clockAt=l);let h=s;if(t){let d=Number.isFinite(a)?Math.min(a,l):this._clockAt||l;h=(Number.isFinite(a)?s:this._clockBase)+Math.max(0,(l-d)/1e3)}return i>0&&(h=Math.min(i,Math.max(0,h))),Math.max(0,h)}_syncFabEq(t,e={},i=0){this._eq&&ge(this._eq,this._mini,{playing:t,visible:!this._open,position:i,title:e.media_title,artist:e.media_artist,album:e.media_album_name,accent:N[this._theme]?.accent})}_setArt(t){if(!this._art)return;let e=t||"";if(this._artAppliedSource===e)return;this._artAppliedSource=e;let i=++this._artSeq;if(this._artSource=e,!e){this._clearArt();return}ue(this._hass,e,this._entity).then(s=>{if(!(i!==this._artSeq||this._artSource!==e)){if(!s){this._clearArt();return}try{let r=new URL(s,window.location.href).href;this._art.getAttribute("src")!==r&&(this._art.src=r),this._fallback&&(this._fallback.style.display="none"),this._mini?.style.setProperty("--fab-cover",`url(${JSON.stringify(r)})`)}catch{this._clearArt()}}})}_clearArt(){this._art?.removeAttribute("src"),this._fallback&&(this._fallback.style.display="grid"),this._mini?.style.removeProperty("--fab-cover")}_setDisabled(t){if(this._disabledState!==t){this._disabledState=t;for(let e of[this._prev,this._toggle,this._next,this._quick])e&&(e.disabled=t)}}_toggleOpen(){this._mode!=="fab"||!this._mini||(this._open=!this._open,this._mini.dataset.open=this._open?"true":"false",this._sync(),this._disc&&(this._disc.setAttribute("aria-label",this._open?"\u6536\u8D77\u64AD\u653E\u5668":"\u5C55\u5F00\u64AD\u653E\u5668"),this._disc.setAttribute("aria-expanded",this._open?"true":"false")),window.setTimeout(()=>this._applySavedPosition(),340))}_toggleFold(){if(this._mode==="fab"){this._toggleOpen();return}this._folded=!this._folded,this._sync(),window.setTimeout(()=>this._applySavedPosition(),340)}_handleClick(t){let e=t.target.closest?.("button[data-act]");if(e){if(e.disabled)return;t.preventDefault(),t.stopPropagation();let i=e.dataset.act;i==="collapse"?this._toggleOpen():i==="toggle"?this._call("media_play_pause"):i==="prev"?this._call("media_previous_track"):i==="next"&&this._call("media_next_track");return}if(this._suppressClick){this._suppressClick=!1;return}if(t.preventDefault(),this._clickTimer){window.clearTimeout(this._clickTimer),this._clickTimer=null,this._toggleFold();return}this._clickTimer=window.setTimeout(()=>{this._clickTimer=null,this._call("media_play_pause")},280)}_call(t){if(!this._hass||!this._entity)return;let e=this._hass.callService("media_player",t,{entity_id:this._entity});e?.catch&&e.catch(i=>console.warn("ha-music mini player:",i))}};customElements.get("ha-music-mini")||customElements.define("ha-music-mini",ci);var vr=/^\[(ar|ti|al|by|offset|re|ve):.*\]$/i,ke=/\[(\d{1,3}):(\d{1,2})(?:[.:](\d{1,3}))?\]/g;function wr(n){if(!n)return 0;let t=Number(n);return Number.isFinite(t)?n.length===1?t/10:n.length===2?t/100:t/1e3:0}function Mt(n){if(!n)return{lines:[],plain:[],instrumental:!1};let t=String(n).replace(/\r\n?/g,`
`),e=[],i=[],s=!1;for(let a of t.split(`
`)){let o=a.trim();if(!o||vr.test(o))continue;if(/^\[instrumental\]$/i.test(o)){s=!0;continue}let l=[];ke.lastIndex=0;let c=ke.exec(o);for(;c;){let d=Number(c[1]),p=Number(c[2]),u=wr(c[3]),m=d*60+p+u;Number.isFinite(m)&&l.push(m),c=ke.exec(o)}let h=o.replace(ke,"").trim();if(h)if(l.length)for(let d of l)e.push({time:d,text:h});else i.push(h)}return e.sort((a,o)=>a.time-o.time),{lines:e.filter((a,o)=>!o||a.time!==e[o-1].time||a.text!==e[o-1].text),plain:i,instrumental:s}}function Xt(n,t){if(!Array.isArray(n)||!n.length)return-1;let e=Math.max(0,Number(t)||0)+.001,i=0,s=n.length-1,r=-1;for(;i<=s;){let a=i+s>>1;n[a].time<=e?(r=a,i=a+1):s=a-1}return r}function Pt(n){return String(n||"").replace(/\([^)]*\)|\[[^\]]*\]|（[^）]*）|【[^】]*】/g," ").replace(/[\s\-_~～|/]+/g," ").trim()}function Ss(n,t,e){let i=Xt(n,t);if(i<0)return{index:-1,progress:0};let s=Number(n[i].time)||0,r=n[i+1]?.time,a=Number.isFinite(r)?r:Number(e)>s?Number(e):s+4,o=Math.max(.05,a-s);return{index:i,progress:Math.max(0,Math.min(1,(Math.max(0,Number(t)||0)-s)/o))}}function Ae(n){return Pt(n).toLowerCase().replace(/[^\p{L}\p{N}]+/gu,"")}function $e(n,t={}){if(!Array.isArray(n)||!n.length)return null;let e=Ae(t.title),i=Ae(t.artist),s=Number(t.duration)||0,r=null,a=-1/0;for(let o of n){if(!o)continue;let l=o.syncedLyrics||o.plainLyrics;if(typeof l!="string"||!l.trim())continue;let c=Ae(o.trackName),h=Ae(o.artistName),d=0;e&&(c===e?d+=120:c&&(c.includes(e)||e.includes(c))?d+=60:d-=35),i&&h&&(h===i?d+=45:h.includes(i)||i.includes(h)?d+=32:d-=8);let p=Number(o.duration)||0;if(s&&p){let u=Math.abs(p-s);u<=2?d+=80:u<=5?d+=35:u<=15?d+=10:d-=Math.min(45,u)}o.syncedLyrics&&(d+=30),d>a&&(a=d,r=o)}return r&&e&&a<40?null:r}var kr="/api/netease_lyrics/lyrics",Ms="https://lrclib.net/api",Ar="https://api.lyrics.ovh/v1",$r=8e3,Jt=new Map,hi=new Map;function lt(n){return String(n||"").trim()}function Sr(n){let t=new Set;return n.filter(e=>{if(!e?.title)return!1;let i=`${e.title}|${e.artist||""}`.toLowerCase();return t.has(i)?!1:(t.add(i),!0)})}function Mr(n={}){let t=lt(n.title),e=lt(n.artist),i=Pt(t),s=Pt(e);return Sr([{title:i||t,artist:s||e,rawTitle:t,rawArtist:e},{title:i||t,artist:"",rawTitle:t,rawArtist:e},{title:t,artist:e,rawTitle:t,rawArtist:e},{title:t,artist:s,rawTitle:t,rawArtist:e}])}function Ps(n,t){let e=t?.attributes||{};return[n,e.media_title||"",e.media_artist||"",e.media_album_name||"",e.media_duration||0,e.media_content_id||""].map(i=>String(i)).join("|")}function Pr(n,t,e){if(!mt(n).title)return-1/0;let s=n.attributes||{},r=n.state,a=0;if(r==="playing")a+=1e3;else if(r==="buffering")a+=650;else if(r==="paused")a+=180;else if(r==="idle")a+=40;else return-1/0;t===e&&(a+=300),(s.mass_player_type||s.active_queue||/music\s*assistant/i.test(s.source||""))&&(a+=35),(s.media_class==="music"||s.media_content_type==="music")&&(a+=12);let o=Date.parse(s.media_position_updated_at||"");return Number.isFinite(o)&&(a+=Math.min(20,Math.max(0,(o-16e11)/1e12))),a}function Cs(n,t=""){let e=n?.states||{},i="",s=-1/0;for(let[r,a]of Object.entries(e)){if(!r.startsWith("media_player.")||!a||["unavailable","unknown","off"].includes(a.state))continue;let o=Pr(a,r,t);o>s&&(i=r,s=o)}return i||(t&&e[t]&&mt(e[t]).title?t:"")}function Cr(n){let t=new AbortController,e=!1,i=setTimeout(()=>{e=!0,t.abort()},$r),s=()=>t.abort();return n&&(n.aborted?t.abort():n.addEventListener("abort",s,{once:!0})),{signal:t.signal,timedOut:()=>e,cleanup(){clearTimeout(i),n&&n.removeEventListener("abort",s)}}}async function Se(n,{signal:t,headers:e}={}){let i=Cr(t);try{let s=await fetch(n,{signal:i.signal,mode:"cors",headers:{Accept:"application/json",...e||{}}});if(s.status===404)return null;if(!s.ok)throw new Error(`lyrics HTTP ${s.status}`);return s.json()}catch(s){if(s?.name==="AbortError"&&i.timedOut()&&!t?.aborted)return null;throw s}finally{i.cleanup()}}function Me(n){if(!n||typeof n!="string")return null;let t=Mt(n);return!t.lines.length&&!t.plain.length&&!t.instrumental?null:t}async function Er(n,t,{hass:e,source:i,signal:s}){let r=e?.auth?.data?.access_token;if(!r)return null;let a=new URL(kr,window.location.origin);a.searchParams.set("title",t.title),a.searchParams.set("artist",t.artist||""),i!=="auto"&&a.searchParams.set("source",i);let o=await Se(a.toString(),{signal:s,headers:{Authorization:`Bearer ${r}`}}),l=Me(o?.lyrics);if(!l)return null;let c=o?.source==="qq"?"QQ\u97F3\u4E50":o?.source==="netease"?"\u7F51\u6613\u4E91":"\u6B4C\u8BCD\u63A5\u53E3";return{parsed:l,source:c}}async function Tr(n,t,e){let i=lt(t.rawTitle||n.title),s=lt(t.rawArtist||n.artist),r=Pt(i)||i,a=Pt(s),o=Math.round(Number(n.duration)||0),l=[{track_name:r,artist_name:a,album_name:n.album,duration:o},{track_name:i,artist_name:s,album_name:n.album,duration:o},{q:[i,a||s].filter(Boolean).join(" ")}].filter(c=>c.track_name||c.q);for(let c of l)try{let h=new URL(`${Ms}/search`);for(let[m,f]of Object.entries(c))f!=null&&String(f).trim()&&h.searchParams.set(m,String(f));let d=await Se(h.toString(),{signal:e});if(!Array.isArray(d))continue;let p=$e(d,{title:r,artist:a||s,duration:n.duration});if(!p)continue;let u=Me(p.syncedLyrics||p.plainLyrics);if(u)return{parsed:u,source:"LRCLIB"}}catch(h){if(h?.name==="AbortError")throw h}if(o&&s)try{let c=new URL(`${Ms}/get`);c.searchParams.set("track_name",r||i),c.searchParams.set("artist_name",a||s),n.album&&c.searchParams.set("album_name",n.album),c.searchParams.set("duration",String(o));let h=await Se(c.toString(),{signal:e}),d=Me(h?.syncedLyrics||h?.plainLyrics);if(d)return{parsed:d,source:"LRCLIB"};if(h?.instrumental)return{parsed:{lines:[],plain:[],instrumental:!0},source:"LRCLIB"}}catch(c){if(c?.name==="AbortError")throw c}return null}async function Lr(n,t,e){let i=lt(t.artist||n.artist),s=lt(t.title||n.title);if(!i||!s)return null;let r=`${Ar}/${encodeURIComponent(i)}/${encodeURIComponent(s)}`,a=await Se(r,{signal:e}),o=Me(a?.lyrics);return o?{parsed:o,source:"Lyrics.ovh"}:null}function Zt(n,t="\u6B4C\u8BCD\u63A5\u53E3"){return{status:n,lines:[],plain:[],instrumental:!1,source:t}}async function Rr(n,t){let{hass:e,source:i="auto",signal:s}=t||{};if(!lt(n.title))return Zt("none");let r=Mr(n),a=r[0];if(!a)return Zt("none");if(i!=="lrclib")try{let o=await Er(n,a,{hass:e,source:i,signal:s});if(o)return{status:"ready",lines:o.parsed.lines||[],plain:o.parsed.plain||[],instrumental:!!o.parsed.instrumental,source:o.source}}catch(o){if(o?.name==="AbortError")throw o}try{for(let o of r.slice(0,2)){let l=await Tr(n,o,s);if(l)return{status:"ready",lines:l.parsed.lines||[],plain:l.parsed.plain||[],instrumental:!!l.parsed.instrumental,source:l.source}}}catch(o){if(o?.name==="AbortError")throw o}if(i!=="lrclib")try{let o=await Lr(n,a,s);if(o)return{status:"ready",lines:o.parsed.lines||[],plain:o.parsed.plain||[],instrumental:!!o.parsed.instrumental,source:o.source}}catch(o){if(o?.name==="AbortError")throw o}return Zt("none")}function Es(n,t={}){let e=mt(n);if(!lt(e.title))return Promise.resolve(Zt("none"));let i=[e.title,e.artist,e.album,e.duration,t.source||"auto"].join("|").toLowerCase(),s=Jt.get(i);if(s)return Promise.resolve(s);let r=hi.get(i);if(r)return r;let a=Rr(e,t).then(o=>(o?.status!=="error"&&(Jt.set(i,o),Jt.size>40&&Jt.delete(Jt.keys().next().value)),o)).catch(o=>{if(o?.name==="AbortError")throw o;return Zt("error")}).finally(()=>{hi.delete(i)});return hi.set(i,a),a}var di="haMusicLyricDock",Ts="haMusicLyricDockPos",qr=360;function J(n,t,e){return e<t?t:Math.min(e,Math.max(t,n))}function zr(n,t=Date.now()){let e=typeof n=="number"?n:Date.parse(String(n||""));return Number.isFinite(e)?Math.min(e,t):t}function Ls(){try{let n=window.localStorage.getItem(Ts);if(!n)return{};let t=JSON.parse(n);return t&&typeof t=="object"&&!Array.isArray(t)?t:{}}catch{return{}}}function Nr(n,t){try{let e=Ls();e.lyric={x:Number(J(n,0,1).toFixed(4)),y:Number(J(t,0,1).toFixed(4))},window.localStorage.setItem(Ts,JSON.stringify(e))}catch{}}function Pe(){try{let n=window.localStorage.getItem(di);if(!n)return null;let t=JSON.parse(n);return!t||typeof t!="object"||Array.isArray(t)?null:{enabled:t.enabled===!0,entity:typeof t.entity=="string"?t.entity:"",updated:Number(t.updated)||0}}catch{return null}}function pi(n={}){try{let t=JSON.stringify({enabled:n.enabled===!0,entity:typeof n.entity=="string"?n.entity:"",updated:Number(n.updated)||Date.now()});if(window.localStorage.getItem(di)===t)return;window.localStorage.setItem(di,t)}catch{}}function Ce(){typeof document>"u"||(window.__haMusicLyricDock?.remove(),window.__haMusicLyricDock=null)}function te(n={}){if(typeof window>"u"||typeof document>"u")return null;if(n.enabled===!1)return Ce(),null;if(!document.body)return document.addEventListener("DOMContentLoaded",()=>te(n),{once:!0}),null;let t=window.__haMusicLyricDock;return(!t||!t.isConnected)&&(t=document.createElement("ha-music-lyric"),document.body.appendChild(t),window.__haMusicLyricDock=t),t.update(n),t}var Ir=`
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
`,ui=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this._theme=O,this._entity="",this._preferred="",this._auto=!0,this._source="auto",this._status="idle",this._hass=null,this._lines=[],this._plain=[],this._linesKey="",this._requestKey="",this._requestController=null,this._retryAt=0,this._offset=0,this._clock=null,this._poll=null,this._press=null,this._pressTimer=null,this._drag=null,this._dragging=!1,this._onPointerDown=t=>this._handlePointerDown(t),this._onPointerMove=t=>this._handlePointerMove(t),this._onPointerUp=()=>this._handlePointerUp(),this._onPointerCancel=()=>this._handlePointerCancel(),this._onContextMenu=t=>{(this._press||this._dragging)&&t.preventDefault()},this._onResize=()=>this._applyPosition(),this.shadowRoot.innerHTML=`
      <style>${Ir}</style>
      <div class="lyric" data-empty="true" role="region" aria-label="\u5F53\u524D\u6B4C\u8BCD">
        <span class="text"></span>
      </div>
    `,this._pill=this.shadowRoot.querySelector(".lyric"),this._text=this.shadowRoot.querySelector(".text"),this.shadowRoot.addEventListener("pointerdown",this._onPointerDown),this.shadowRoot.addEventListener("pointermove",this._onPointerMove),this.shadowRoot.addEventListener("pointerup",this._onPointerUp),this.shadowRoot.addEventListener("pointercancel",this._onPointerCancel),this.shadowRoot.addEventListener("contextmenu",this._onContextMenu),this.shadowRoot.addEventListener("dragstart",t=>t.preventDefault())}update(t={}){if(t.enabled===!1){this.remove();return}t.auto!==void 0&&(this._auto=t.auto!==!1),t.source&&(this._source=String(t.source)),t.entity&&(this._preferred=t.entity,(!this._entity||!this._auto)&&(this._entity=t.entity)),Array.isArray(t.lines)&&(!this._auto||!t.entity||t.entity===this._entity)&&this._setLines(t.lines,t.trackKey,t.status,t.plain),t.status&&(!t.entity||t.entity===this._entity)&&(this._status=t.status),t.offset!==void 0&&(this._offset=Number(t.offset)||0),t.hass?.states&&(this._hass=t.hass);let e=St(t.theme);e!==this._theme&&(this._theme=e,this._applyTheme()),this._applyTheme(),this._sync(),this._dragging||this._applyPosition()}_setLines(t,e,i,s){Array.isArray(t)&&(this._lines=t),Array.isArray(s)&&(this._plain=s),e!==void 0&&(this._linesKey=String(e||"")),i&&(this._status=i)}connectedCallback(){window.addEventListener("resize",this._onResize),this._startPolling(),this._applyTheme(),this._sync(),window.requestAnimationFrame(()=>this._applyPosition())}disconnectedCallback(){window.removeEventListener("resize",this._onResize),this._poll&&clearInterval(this._poll),this._poll=null}_startPolling(){this._poll||(this._poll=window.setInterval(()=>this._sync(),500))}_applyTheme(){let t=St(this._theme),e=N[t]||N[O];this._theme=t,this.style.setProperty("--hm-accent",e.accent[0]),this.style.setProperty("--hm-accent-2",e.accent[1]),this.style.setProperty("--hm-accent-rgb",B(e.accent[0],"46,230,197")),this.style.setProperty("--hm-accent-2-rgb",B(e.accent[1],"123,92,255")),this.style.setProperty("--hm-base-rgb",B(e.base,"5,10,18")),this.style.setProperty("--hm-glow",String(e.glow??1)),this._pill.dataset.theme=t}_sync(){if(!this._pill)return;this._status==="error"&&this._retryAt&&Date.now()>=this._retryAt&&(this._status="idle",this._linesKey="",this._requestKey="",this._retryAt=0);let t=gt()||this._hass;t?.states&&(this._hass=t);let e=this._preferred||this._entity;if(this._auto){let u=Cs(t,e);u&&u!==this._entity&&this._selectEntity(u)}if(!this._entity){this._setText("");return}let i=this._hass?.states?.[this._entity];if(!i){this._setText("");return}let s=i.attributes||{},r=Ps(this._entity,i);r!==this._linesKey&&(this._status!=="loading"||r!==this._requestKey)&&this._ensureLyrics(i,r);let a=s.media_position_updated_at||"",o=Number(s.media_position)||0,l=Date.now(),c=a?zr(a,l):l;(!this._clock||this._clock.key!==r||this._clock.state!==i.state||this._clock.stamp!==a)&&(this._clock={key:r,state:i.state,stamp:a,base:o,at:c});let h=this._clock.base;i.state==="playing"&&(h+=Math.max(0,l-this._clock.at)/1e3);let d=Number(s.media_duration)||0;d>0&&(h=Math.min(d,Math.max(0,h))),h+=this._offset;let p="";if(this._linesKey&&r===this._linesKey)if(this._lines.length){let u=Xt(this._lines,h);p=this._lines[Math.max(0,u)]?.text||""}else this._plain.length&&(p=this._plain[0]||"");this._setText(p)}_selectEntity(t){!t||t===this._entity||(this._abortRequest(),this._entity=t,this._lines=[],this._plain=[],this._linesKey="",this._requestKey="",this._status="idle",this._clock=null)}_abortRequest(){this._requestController&&this._requestController.abort(),this._requestController=null}_ensureLyrics(t,e){if(!t||this._requestKey===e&&this._status==="loading")return;this._abortRequest(),this._requestKey=e,this._status="loading",this._lines=[],this._plain=[],this._linesKey="";let i=this._entity,s=new AbortController;this._requestController=s,Es(t,{hass:this._hass,source:this._source,signal:s.signal}).then(r=>{s.signal.aborted||this._entity!==i||this._requestKey!==e||this._linesKey===e&&(this._lines.length||this._plain.length)||(this._lines=Array.isArray(r.lines)?r.lines:[],this._plain=Array.isArray(r.plain)?r.plain:[],this._linesKey=e,this._status=r.status||"none",this._source=r.source||this._source,this._sync())}).catch(()=>{s.signal.aborted||this._entity!==i||this._requestKey!==e||(this._lines=[],this._plain=[],this._linesKey="",this._status="error",this._retryAt=Date.now()+8e3,this._sync())}).finally(()=>{this._requestController===s&&(this._requestController=null)})}_setText(t){let e=String(t||"").trim();if(!this._pill)return;let i=!e;this._pill.dataset.empty=i?"true":"false",this._text.textContent!==e&&(this._text.textContent=e,!i&&!this._dragging&&window.requestAnimationFrame(()=>this._applyPosition()))}_applyPosition(){if(!this._pill?.isConnected||this._dragging)return;let t=this._pill.getBoundingClientRect(),e=t.width||240,i=t.height||42,s=Ls(),r=s.lyric&&Number.isFinite(s.lyric.x)&&Number.isFinite(s.lyric.y)?s.lyric:Number.isFinite(s.x)&&Number.isFinite(s.y)?s:null,a=window.innerWidth||1,o=window.innerHeight||1,l=Qt(),c,h;if(l){let u=ye(l);c=u?u.left-e-8:l.left+(l.width-e)/2,h=l.top+(l.height-i)/2}else c=a-e-16,h=16;let d,p;r&&Number.isFinite(r.x)&&Number.isFinite(r.y)?(d=J(r.x*a,8,Math.max(8,a-e-8)),p=J(r.y*o,8,Math.max(8,o-i-8))):l?(d=J(c,l.left+8,Math.max(l.left+8,l.right-e-8)),p=J(h,l.top+2,Math.max(l.top+2,l.bottom-i-2))):(d=J(c,8,Math.max(8,a-e-8)),p=16),this._pill.style.left=`${Math.round(d)}px`,this._pill.style.top=`${Math.round(p)}px`}_savePosition(){if(!this._pill)return;let t=this._pill.getBoundingClientRect();Nr(t.left/Math.max(1,window.innerWidth),t.top/Math.max(1,window.innerHeight))}_handlePointerDown(t){!this._pill||t.button!==0||t.isPrimary===!1||(this._clearPress(),this._press={pointerId:t.pointerId,x:t.clientX,y:t.clientY,long:!1,moved:!1},this._dragging=!1,this._pressTimer=window.setTimeout(()=>{this._pressTimer=null,this._press&&this._beginDrag()},qr))}_beginDrag(){if(!this._press||!this._pill)return;this._press.long=!0,this._dragging=!0;let t=this._pill.getBoundingClientRect();this._drag={left:t.left,top:t.top,width:t.width,height:t.height,x:this._press.x,y:this._press.y},this._pill.dataset.dragging="true",this._pill.style.left=`${t.left}px`,this._pill.style.top=`${t.top}px`;try{this._pill.setPointerCapture(this._press.pointerId)}catch{}}_handlePointerMove(t){if(!this._press)return;let e=t.clientX-this._press.x,i=t.clientY-this._press.y;if(!this._dragging){Math.hypot(e,i)>8&&(this._press.moved=!0,this._clearPress());return}t.preventDefault();let s=window.innerWidth||1,r=window.innerHeight||1,a=J(this._drag.left+e,8,Math.max(8,s-this._drag.width-8)),o=J(this._drag.top+i,8,Math.max(8,r-this._drag.height-8));this._pill.style.left=`${Math.round(a)}px`,this._pill.style.top=`${Math.round(o)}px`}_handlePointerUp(){this._press&&(this._pressTimer&&(clearTimeout(this._pressTimer),this._pressTimer=null),this._dragging&&(this._savePosition(),this._releasePointer()),this._dragging=!1,this._press=null,this._pill&&delete this._pill.dataset.dragging)}_handlePointerCancel(){this._releasePointer(),this._clearPress(),this._dragging=!1,this._pill&&delete this._pill.dataset.dragging}_clearPress(){this._pressTimer&&(clearTimeout(this._pressTimer),this._pressTimer=null),this._press=null}_releasePointer(){let t=this._press?.pointerId;if(!(t===void 0||!this._pill))try{this._pill.releasePointerCapture(t)}catch{}}};typeof customElements<"u"&&!customElements.get("ha-music-lyric")&&customElements.define("ha-music-lyric",ui);var Ur="/api/netease_lyrics/lyrics",Dr="https://lrclib.net/api",Rs="(pointer: coarse) and (max-width: 600px), (pointer: coarse) and (max-height: 500px)";function Or(){return typeof window>"u"||typeof window.matchMedia!="function"?!1:!!window.matchMedia(Rs).matches}function Fr(n,t=Date.now()){let e=typeof n=="number"?n:Date.parse(String(n||""));return Number.isFinite(e)?Math.min(e,t):t}var mi=["off","all","one"],Br=260;function Hr(n,t,e){let i=new CustomEvent(t,{bubbles:!0,composed:!0,cancelable:!1,detail:e});return n.dispatchEvent(i),i}function fi(n,t,e,i,s){let r=[];for(let a=0;a<=n;a+=4){let o=t/2+Math.sin(a/e*Math.PI*2+s)*i+Math.sin(a/(e/2)*Math.PI*2+s*1.7)*(i*.32);r.push(`${a.toFixed(1)},${o.toFixed(2)}`)}return`M${r.join(" L")}`}function Kr(n){switch(n){case"playing":return"playing";case"buffering":return"buffering";case"paused":return"paused";case"idle":return"idle";case"off":return"off";default:return"idle"}}var jr=40,Ee=120,gi=class extends j{static get styles(){return Wi}static get properties(){return{_config:{state:!0},_width:{state:!1},preview:{type:Boolean,attribute:!1},editMode:{type:Boolean,attribute:!1}}}constructor(){super(),this._config={},this._hass=void 0,this._activeEntity="",this._sig="",this._width=0,this._height=0,this._panel=!1,this._autoPrevStates=null,this._manualSwitchAt=0,this._fitPanelRaf=null,this._panelHeight=0,this._tickTimer=null,this._toast="",this._toastTimer=null,this._menu=null,this._seekPreview=null,this._seekPending=null,this._seekSettleTimer=null,this._volumePreview=null,this._volumeCommitAt=0,this._volumeSettleTimer=null,this._volumeSettleTicks=0,this._showRemaining=!1,this._drawer=this._emptyDrawer(),this._queueLoadToken=0,this._artUrl="",this._artSource="",this._artApplied="",this._artLoading="",this._artFailedSource="",this._artSeq=0,this._artSlot=0,this._dockOwner=!1,this._unsubscribeDockPref=null,this._lyricDockOwner=!1,this._palette=null,this._paletteKey="",this._resizeObserver=null,this._thumbPreview=!1,this.preview=!1,this.editMode=!1,this._lyricsOpen=!1,this._lyricsKey="",this._lyrics={status:"idle",lines:[],plain:[],instrumental:!1,source:""},this._lyricsActive=-1,this._lyricsScrolled=-2,this._lyricsScrollObserver=null,this._lyricsScrollObserved=null,this._lyricsAbort=null,this._lyricsOffset=this._loadLyricsOffset(),this._lyricsCache=this._loadLyricsCache(),this._lyricsBackendMissingAt=0,this._coverPress=null,this._coverGesture="",this._coverGestureTimer=null,this._coverSuppressClick=!1,this._coverSuppressTimer=null,this._progressRaf=null,this._progressLastSecond=-1,this._spectrumRaf=null,this._spectrumCanvas=null,this._spectrumCtx=null,this._spectrumCount=0,this._spectrumCssW=0,this._spectrumCssH=0,this._spectrumDpr=1,this._spectrumLevels=[],this._bandLevels=Object.assign([.18,.14,.1],{live:!1}),this._spectrumLast=0,this._spectrumKey="",this._spectrumAudioUrl="",this._spectrumPlaylistUrl="",this._spectrumPlaylist=null,this._spectrumPlaylistAt=0,this._spectrumPlaylistLoading=!1,this._spectrumPlaylistAbort=null,this._spectrumPlaylistErrorAt=0,this._spectrumResolvedUrl="",this._spectrumTrack=null,this._audioShape=null,this._audioEl=null,this._audioCtx=null,this._audioAnalyser=null,this._audioSource=null,this._audioMute=null,this._audioBins=null,this._audioFailedUrl="",this._audioZeroFrames=0,this._audioPeak=0,this._audioStartedAt=0,this._audioGestureArmed=!1,this._positionClock=null,this._maAnalysis=null,this._maAnalysisKey="",this._maAnalysisLoadingKey="",this._maAnalysisFailedKey="",this._maAnalysisFailedAt=0,this._maAnalysisAt=0}set hass(t){let e=this._hass;if(this._hass=t,!t)return;this._autoSwitchToPlaying(t);let i=this._eid(),s=t.states?.[i],r=s?.attributes||{},a=this._trackKey(s),o=this._positionClock,l=!!(o&&o.trackKey!==a),c=l?0:Number(r.media_position)||0,h=r.media_position_updated_at||"",d=Date.now(),p=!!(o&&o.state!==s?.state),u=l||p||!h?d:Fr(h,d);(!o||l||o.entityId!==i||o.state!==s?.state||o.base!==c||o.stamp!==h)&&(this._positionClock={entityId:i,state:s?.state,trackKey:a,base:c,stamp:h,at:u}),this._settleSeekPending(s,r,l)&&this.requestUpdate(),l&&this.requestUpdate(),this._syncArt(mt(s),i);let m=this._computeSig(t);(m!==this._sig||e===void 0)&&(this._sig=m,this.requestUpdate()),this._syncTimer()}get hass(){return this._hass}setConfig(t){if(!t)throw new Error("ha-music: \u914D\u7F6E\u4E0D\u80FD\u4E3A\u7A7A");let e=Array.isArray(t.entities)&&t.entities.length?t.entities.filter(Boolean):t.entity?[t.entity]:[];if(!e.length)throw new Error("ha-music: \u9700\u8981\u914D\u7F6E entity\uFF08media_player.*\uFF09\u6216 entities \u5217\u8868");this._config={...t};let i=typeof t.spectrum_audio_url=="string"?t.spectrum_audio_url.trim():"",s=typeof t.spectrum_playlist_url=="string"?t.spectrum_playlist_url.trim():"";(i!==this._spectrumAudioUrl||s!==this._spectrumPlaylistUrl)&&(this._spectrumAudioUrl=i,this._spectrumPlaylistUrl=s,this._spectrumPlaylist=null,this._spectrumPlaylistAt=0,this._spectrumPlaylistErrorAt=0,this._spectrumPlaylistAbort?.abort?.(),this._spectrumPlaylistAbort=null,this._spectrumResolvedUrl="",this._spectrumTrack=null,this._audioFailedUrl="",this._resetAudioShape(),this._teardownAudioSpectrum()),e.includes(this._activeEntity)||(this._activeEntity=e[0],this._palette=null,this._paletteKey="",this._artUrl="",this._artSource="",this._artFailedSource="",this._resetLyrics()),this._config.show_lyrics===!1&&(this._lyricsOpen=!1),this._sig="",this._hass&&(this._sig=this._computeSig(this._hass)),this._syncTimer(),this.requestUpdate()}connectedCallback(){super.connectedCallback(),this._thumbPreview=this._isThumbnailPreview(),this._onKeyDown=t=>{t.key==="Escape"&&(this._drawer.open?this._closeDrawer():this._menu&&(this._menu=null,this.requestUpdate()))},window.addEventListener("keydown",this._onKeyDown),this._mobileMq=typeof window.matchMedia=="function"?window.matchMedia(Rs):null,this._onMobileChange=()=>{this._installDock(),this._installLyricDock()},this._mobileMq?.addEventListener?this._mobileMq.addEventListener("change",this._onMobileChange):this._mobileMq?.addListener?.(this._onMobileChange),this._onSpectrumGesture=()=>{this._spectrumPlaying()&&(this._config?.visualizer||"bars")==="bars"&&this._primeAudioSpectrum()},this.addEventListener("pointerdown",this._onSpectrumGesture,{passive:!0}),this._unsubscribeDockPref?.(),this._unsubscribeDockPref=$s(()=>{this._dockOwner=!1,this._installDock(),this.requestUpdate()}),this._onViewportResize=()=>this._queuePanelFit(),window.addEventListener("resize",this._onViewportResize),window.visualViewport?.addEventListener("resize",this._onViewportResize),typeof ResizeObserver<"u"&&(this._resizeObserver=new ResizeObserver(t=>{let e=t[0]?.contentRect?.width||0,i=t[0]?.contentRect?.height||0,s=Math.abs(e-this._width)>=1,r=Math.abs(i-this._height)>=1;this._width=e,this._height=i;let a=this._config?.layout||"adaptive";s||r&&a==="adaptive"?a==="adaptive"?this.requestUpdate():this._queuePanelFit():r&&this._queuePanelFit()}),this._resizeObserver.observe(this))}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribeDockPref?.(),this._unsubscribeDockPref=null,this._seekSettleTimer&&clearTimeout(this._seekSettleTimer),this._seekSettleTimer=null,this._volumeSettleTimer&&clearInterval(this._volumeSettleTimer),this._volumeSettleTimer=null,this._volumeSettleTicks=0,this._onMobileChange&&(this._mobileMq?.removeEventListener?this._mobileMq.removeEventListener("change",this._onMobileChange):this._mobileMq?.removeListener?.(this._onMobileChange),this._onMobileChange=null,this._mobileMq=null),this._onKeyDown&&(window.removeEventListener("keydown",this._onKeyDown),this._onKeyDown=null),this._onViewportResize&&(window.removeEventListener("resize",this._onViewportResize),window.visualViewport?.removeEventListener("resize",this._onViewportResize),this._onViewportResize=null),this._onSpectrumGesture&&(this.removeEventListener("pointerdown",this._onSpectrumGesture),this._onSpectrumGesture=null),this._stopTimer(),this._stopProgressTicker(),this._coverGestureTimer&&clearTimeout(this._coverGestureTimer),this._coverSuppressTimer&&clearTimeout(this._coverSuppressTimer),this._stopSpectrum(),this._teardownAudioSpectrum(),this._coverGestureTimer=null,this._coverSuppressTimer=null,this._coverPress=null,this._resizeObserver?.disconnect(),this._resizeObserver=null,this._lyricsScrollObserver?.disconnect(),this._lyricsScrollObserver=null,this._lyricsScrollObserved=null,this._fitPanelRaf&&cancelAnimationFrame(this._fitPanelRaf),this._fitPanelRaf=null,this._toastTimer&&clearTimeout(this._toastTimer),this._lyricsAbort&&(this._lyricsAbort.abort(),this._lyricsAbort=null),this._lyricsRetryTimer&&clearTimeout(this._lyricsRetryTimer),this._lyricsRetryTimer=null}_entities(){let t=this._config||{};return(Array.isArray(t.entities)&&t.entities.length?t.entities:t.entity?[t.entity]:[]).filter(Boolean)}_eid(){let t=this._entities();return this._activeEntity||t[0]||""}_state(t=this._eid()){return this._hass?.states?.[t]}_trackKey(t){let e=t?.attributes||{},i=e.media_metadata||{};return[this._eid(),i.title||e.media_title||"",i.artist||e.media_artist||"",i.album_name||e.media_album_name||"",i.duration??e.media_duration??0,e.media_content_id||""].map(s=>String(s)).join("|")}_readMedia(){let t=this._state(),e=mt(t);if(t?.state==="playing"){let i=this._positionClock;if(i&&i.entityId===this._eid()){let s=Math.max(0,(Date.now()-i.at)/1e3),r=i.base+s;e.position=e.duration?v(r,0,e.duration):Math.max(0,r)}}return e}_computeSig(t){let e=this._eid(),i=t.states?.[e],s=i?.attributes||{},r=["media_title","media_artist","media_album_name","media_series_title","entity_picture","media_duration","media_position","media_position_updated_at","media_metadata","media_content_id","volume_level","is_volume_muted","shuffle","repeat","source","source_list","sound_mode","sound_mode_list","supported_features","group_members","app_name","queue","media_track"],a={};for(let h of r)h in s&&(a[h]=s[h]);let o=this._config?.volume_entity,l=o?t.states?.[o]?.state:null,c=this._entities().map(h=>{let d=t.states?.[h];return[h,d?.state,d?.attributes?.entity_picture]});return JSON.stringify([e,i?.state,a,l,c,t.language,this._config,this._menu,this._drawer.open,this._drawer.mode,this._drawer.cursor,this._drawer.items.length,this._drawer.loading,this._drawer.error,this._showRemaining,this._layoutKey()])}_syncTimer(){let t=this._state()?.state,e=t==="playing"||t==="buffering";e&&!this._tickTimer?this._tickTimer=setInterval(()=>this.requestUpdate(),500):e||this._stopTimer()}_stopTimer(){this._tickTimer&&(clearInterval(this._tickTimer),this._tickTimer=null)}_lyricsEnabled(){return this._config?.show_lyrics!==!1}_resetLyrics(){this._lyricsAbort&&(this._lyricsAbort.abort(),this._lyricsAbort=null),this._lyricsKey="",this._lyricsOpen=!1,this._lyricsActive=-1,this._lyricsScrolled=-2,this._lyrics={status:"idle",lines:[],plain:[],instrumental:!1,source:""}}_loadLyricsOffset(){try{let t=localStorage.getItem("ha-music-lyrics-offset"),e=Number(t);return Number.isFinite(e)?v(e,-5,5):0}catch{return 0}}_saveLyricsOffset(){try{localStorage.setItem("ha-music-lyrics-offset",String(Number(this._lyricsOffset.toFixed(1))))}catch{}}_bumpLyricsOffset(t){this._lyricsOffset=v(Math.round((this._lyricsOffset+t)*10)/10,-5,5),this._saveLyricsOffset(),this._lyricsScrolled=-2,this.requestUpdate()}_loadLyricsCache(){let t=new Map;try{localStorage.removeItem("ha-music-lyrics-cache-v3"),localStorage.removeItem("ha-music-lyrics-cache-v4");let e=JSON.parse(localStorage.getItem("ha-music-lyrics-cache-v5")||"[]");if(!Array.isArray(e))return t;for(let i of e){if(!Array.isArray(i)||i.length!==2)continue;let[s,r]=i;typeof s!="string"||!r||r.status!=="ready"||t.set(s,{status:"ready",lines:Array.isArray(r.lines)?r.lines:[],plain:Array.isArray(r.plain)?r.plain:[],instrumental:!!r.instrumental,source:String(r.source||"\u6B4C\u8BCD\u63A5\u53E3")})}}catch{return t}return t}_saveLyricsCache(){try{let t=[...this._lyricsCache.entries()].slice(-24);localStorage.setItem("ha-music-lyrics-cache-v5",JSON.stringify(t))}catch{}}_lyricsPosition(t){return Math.max(0,(Number(t)||0)+this._lyricsOffset)}_cleanLyricsQuery(t){return String(t||"").replace(/\(.*?\)|\[.*?\]|（.*?）/g,"").replace(/[\s\-_～〜]+/g," ").trim()}_lyricsSource(){let t=this._config?.lyrics_source;return t==="qq"||t==="wy"||t==="lrclib"?t:"auto"}_lyricsQueries(t){let e=Array.isArray(t.title)?t.title[0]||"":t.title||"",i=Array.isArray(t.artist)?t.artist[0]||"":t.artist||"",s=this._cleanLyricsQuery(e),r=this._cleanLyricsQuery(i),a=[{title:s||e,artist:r},{title:s||e,artist:""},{title:e,artist:i}],o=new Set;return a.filter(l=>{if(!l.title)return!1;let c=`${l.title}|${l.artist}`.toLowerCase();return o.has(c)?!1:(o.add(c),!0)})}async _refreshLyricsToken(){let t=this._hass?.auth;if(typeof t?.refreshAccessToken=="function")try{await t.refreshAccessToken()}catch{}}async _requestNeteaseLyrics(t,e){let i=null;for(let s=0;s<3;s+=1)try{let r=this._hass?.auth?.data?.access_token;if(!r)throw new Error("\u6B4C\u8BCD\u63A5\u53E3\u672A\u8BA4\u8BC1");let a=new URL(Ur,window.location.origin);a.searchParams.set("title",t.title),a.searchParams.set("artist",t.artist||"");let o=this._lyricsSource();o!=="auto"&&a.searchParams.set("source",o);let l=await fetch(a.toString(),{signal:e,headers:{Accept:"application/json",Authorization:`Bearer ${r}`,"Content-Type":"application/json"},credentials:"same-origin"});if(l.status===401&&s<2){await this._refreshLyricsToken(),await new Promise(u=>setTimeout(u,500));continue}if(l.status===404)return this._lyricsBackendMissingAt=Date.now(),null;if(!l.ok){if(i=new Error(`lyrics HTTP ${l.status}`),s<2){await new Promise(u=>setTimeout(u,500));continue}break}let c=await l.json(),h=c?.lyrics;if(!h||typeof h!="string")return null;let d=Mt(h);if(!d.lines.length&&!d.plain.length&&!d.instrumental)return null;let p=c?.source==="qq"?"QQ\u97F3\u4E50":c?.source==="netease"?"\u7F51\u6613\u4E91":"\u6B4C\u8BCD\u63A5\u53E3";return{parsed:d,source:p}}catch(r){if(r?.name==="AbortError")throw r;i=r,s<2&&await new Promise(a=>setTimeout(a,500))}throw i||new Error("\u6B4C\u8BCD\u63A5\u53E3\u8BF7\u6C42\u5931\u8D25")}async _lrclibJson(t,e,i){let s=new URL(`${Dr}/${t}`);for(let[l,c]of Object.entries(e))c!=null&&String(c).trim()&&s.searchParams.set(l,String(c));let r=new AbortController,a=()=>r.abort();if(i){if(i.aborted)throw new DOMException("Aborted","AbortError");i.addEventListener("abort",a,{once:!0})}let o=setTimeout(()=>r.abort(),8e3);try{let l=await fetch(s.toString(),{signal:r.signal,mode:"cors",headers:{Accept:"application/json"}});if(l.status===404)return null;if(!l.ok)throw new Error(`lrclib HTTP ${l.status}`);return l.json()}catch(l){if(l?.name==="AbortError"){if(i?.aborted)throw l;return null}throw l}finally{clearTimeout(o),i&&i.removeEventListener("abort",a)}}async _requestLrclibLyrics(t,e,i){let s=Array.isArray(t.title)?t.title[0]||"":t.title||"",r=Array.isArray(t.artist)?t.artist[0]||"":t.artist||"",a=this._cleanLyricsQuery(s)||s,o=this._cleanLyricsQuery(r)||r,l=Math.round(Number(t.duration)||0),c=[];l&&o&&(c.push({track_name:a,artist_name:o,...t.album?{album_name:t.album}:{},duration:l}),r!==o&&c.push({track_name:s,artist_name:r,...t.album?{album_name:t.album}:{},duration:l}));let h=[];e.title&&h.push({track_name:e.title,artist_name:e.artist||o}),h.push({q:[s,o||r].filter(Boolean).join(" ")});let d=null;for(let p of h)try{let u=await this._lrclibJson("search",p,i),m=$e(u,{title:e.title||s,artist:e.artist||r,duration:t.duration});if(!m)continue;let f=this._lrclibParsed(m);if(f)return{parsed:f,source:"LRCLIB"}}catch(u){if(u?.name==="AbortError")throw u;d=u}for(let p of c)try{let u=await this._lrclibJson("get",p,i);if(!u)continue;let m=this._lrclibParsed(u);if(m)return{parsed:m,source:"LRCLIB"}}catch(u){if(u?.name==="AbortError")throw u;d=u}if(d)throw d;return null}async _requestLyricsOvh(t,e,i){let s=Array.isArray(t.title)?t.title[0]||"":t.title||"",r=Array.isArray(t.artist)?t.artist[0]||"":t.artist||"",a=this._cleanLyricsQuery(e?.artist||r)||r,o=this._cleanLyricsQuery(e?.title||s)||s;if(!a||!o)return null;let l=new AbortController,c=()=>l.abort();if(i){if(i.aborted)throw new DOMException("Aborted","AbortError");i.addEventListener("abort",c,{once:!0})}let h=setTimeout(()=>l.abort(),8e3);try{let d=await fetch(`https://api.lyrics.ovh/v1/${encodeURIComponent(a)}/${encodeURIComponent(o)}`,{signal:l.signal,mode:"cors",headers:{Accept:"application/json"}});if(d.status===404)return null;if(!d.ok)throw new Error(`lyrics.ovh HTTP ${d.status}`);let p=await d.json(),u=Mt(p?.lyrics||"");return!u.lines.length&&!u.plain.length?null:{parsed:u,source:"Lyrics.ovh"}}catch(d){if(d?.name==="AbortError"){if(i?.aborted)throw d;return null}throw d}finally{clearTimeout(h),i&&i.removeEventListener("abort",c)}}_lrclibParsed(t){if(!t)return null;if(t.instrumental&&!t.syncedLyrics&&!t.plainLyrics)return{lines:[],plain:[],instrumental:!0};let e=t.syncedLyrics||t.plainLyrics;if(typeof e!="string"||!e.trim())return null;let i=Mt(e);return!i.lines.length&&!i.plain.length&&!i.instrumental?null:i}_lyricsKeyFor(t){return[this._cleanLyricsQuery(Array.isArray(t.title)?t.title[0]:t.title),this._cleanLyricsQuery(Array.isArray(t.artist)?t.artist[0]:t.artist),this._lyricsSource()].join("|").toLowerCase()}_setLyrics(t,e,i){t===this._lyricsKey&&(this._lyrics={status:"ready",lines:e.lines||[],plain:e.plain||[],instrumental:!!e.instrumental,source:i},this._lyricsCache.size>32&&this._lyricsCache.delete(this._lyricsCache.keys().next().value),this._lyricsCache.set(t,this._lyrics),this._saveLyricsCache(),this.requestUpdate())}_syncCoverEq(){let t=this.renderRoot?.querySelector?.(".hm-cover-eq"),e=this.renderRoot?.querySelector?.(".hm-cover");if(!t||!e)return;let i=this._state(),s=this._readMedia(),r=Math.max(72,Math.round(e.getBoundingClientRect().width||this._coverPx(this._layoutKey()))),a=r>=300?88:48,o=Math.min(1200,r+a);t.style.width!==`${o}px`&&(t.style.width=`${o}px`),t.style.height!==`${o}px`&&(t.style.height=`${o}px`);let l=N[this._themeKey()],c=String(this._config?.accent||""),h=[/^#[0-9a-f]{3,8}$/i.test(c)?c:l.accent[0],l.accent[1]],d=typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,p=f=>Array.isArray(f)?f[0]||"":f||"",u=i?.state==="playing"&&!d,m=e.parentElement;m&&(m.dataset.eq=u?"true":"false"),ge(t,m,{playing:u,visible:!0,position:this._seekPreview??s.position,size:o,innerRadius:r/2+3,lineWidth:r>=300?Math.max(1.8,Math.min(2.6,r/210)):Math.max(2.2,Math.min(4.8,r/130)),bars:r>=300?192:r>=150?64:48,cap:r>=300?"butt":"round",maxSize:1200,target:e,applyShadow:!1,maxFps:this._isMobileUi()?30:0,dpr:this._isMobileUi()?1.5:2,accent:h,title:p(s.title),artist:p(s.artist),album:p(s.album),bands:this._bandLevels})}_maybeLoadLyrics(){if(!this._lyricsEnabled()||this._thumbMode())return;let t=this._readMedia();if(!t.title){this._lyrics.status!=="idle"&&(this._lyrics={status:"idle",lines:[],plain:[],instrumental:!1,source:""},this._lyricsKey="",this.requestUpdate());return}let e=this._lyricsKeyFor(t);if(e===this._lyricsKey)return;this._lyricsAbort&&(this._lyricsAbort.abort(),this._lyricsAbort=null),this._lyricsKey=e;let i=this._lyricsCache.get(e);if(i){this._lyrics={...i},this.requestUpdate();return}this._lyrics={status:"loading",lines:[],plain:[],instrumental:!1,source:"\u6B4C\u8BCD\u63A5\u53E3"},this.requestUpdate(),this._fetchLyrics(t,e)}async _fetchLyrics(t,e){let i=new AbortController;this._lyricsAbort=i;let s=setTimeout(()=>i.abort(),35e3),r=null;try{let a=this._lyricsSource(),o=this._lyricsBackendMissingAt&&Date.now()-this._lyricsBackendMissingAt<10*60*1e3;if(a!=="lrclib"&&!o)for(let c of this._lyricsQueries(t)){if(i.signal.aborted||e!==this._lyricsKey)return;try{let h=await this._requestNeteaseLyrics(c,i.signal);if(i.signal.aborted||e!==this._lyricsKey)return;if(h){this._setLyrics(e,h.parsed,h.source);return}if(this._lyricsBackendMissingAt)break}catch(h){if(h?.name==="AbortError")throw h;r=h}}let l=this._lyricsQueries(t)[0];if(l)try{let c=await this._requestLrclibLyrics(t,l,i.signal);if(i.signal.aborted||e!==this._lyricsKey)return;if(c){this._setLyrics(e,c.parsed,c.source);return}}catch(c){if(c?.name==="AbortError")throw c;r=c}if(a==="auto"||a==="")try{let c=await this._requestLyricsOvh(t,l,i.signal);if(i.signal.aborted||e!==this._lyricsKey)return;if(c){this._setLyrics(e,c.parsed,c.source);return}}catch(c){if(c?.name==="AbortError")throw c;r=c}if(e!==this._lyricsKey)return;this._lyrics={status:r?"error":"none",lines:[],plain:[],instrumental:!1,source:"\u6B4C\u8BCD\u63A5\u53E3"},r&&this._scheduleLyricsRetry(e),this.requestUpdate()}catch(a){if(e!==this._lyricsKey)return;if(a?.name==="AbortError"){this._lyrics={status:"error",lines:[],plain:[],instrumental:!1,source:"\u6B4C\u8BCD\u63A5\u53E3"},this._scheduleLyricsRetry(e),this.requestUpdate();return}this._lyrics={status:"error",lines:[],plain:[],instrumental:!1,source:"\u6B4C\u8BCD\u63A5\u53E3"},this._scheduleLyricsRetry(e),this.requestUpdate()}finally{clearTimeout(s),this._lyricsAbort===i&&(this._lyricsAbort=null)}}_scheduleLyricsRetry(t){this._lyricsRetryTimer&&clearTimeout(this._lyricsRetryTimer),this._lyricsRetryTimer=setTimeout(()=>{this._lyricsRetryTimer=null,!(!this.isConnected||t!==this._lyricsKey)&&this._lyrics.status==="error"&&(this._lyricsKey="",this._maybeLoadLyrics())},1e4)}_sideLyricsVisible(){return!this._lyricsEnabled()||this._thumbMode()||this._lyricsOpen||this._layoutKey()!=="full"?!1:(this._width||0)>=640&&(this._height||0)>=480}_toggleLyrics(){this._lyricsOpen=!this._lyricsOpen,this._lyricsScrolled=-2,this._lyricsOpen&&(this._lyricsActive=-1,this._maybeLoadLyrics()),this.requestUpdate()}_retryLyrics(){this._lyricsKey="",this._lyricsAbort?.abort(),this._lyricsAbort=null,this._lyricsOpen=!0,this._maybeLoadLyrics(),this.requestUpdate()}_layoutKey(){if(this._thumbMode()||this._panel)return"full";let t=this._config?.layout||"adaptive";if(t==="adaptive"){let e=this._width,i=this._height;return!e||e>=240&&i>=520&&e<520?"full":e<340&&(!i||i<190)?"mini":e<460||i&&i<300?"compact":"full"}return["full","compact","mini"].includes(t)?t:"full"}_coverPx(t){let e=this._height||0;if(this._thumbMode()){let i=this._thumbTier();if(i==="lg")return Math.round(Math.min(260,Math.max(160,e*.34)));if(i==="md"){let s=this._width||0;return Math.round(Math.min(180,s?s*.45:180,Math.max(96,e*.32)))}return Math.round(Math.min(120,Math.max(64,e*.3)))}return t==="mini"?44:Math.round(t==="compact"?Math.min(88,Math.max(52,e*.26)):Math.min(178,Math.max(76,e*.22)))}_tight(){return this._thumbMode()?!1:this._layoutKey()==="compact"&&(this._height||0)<270}_styleVars(){return{...this._themeVars(),"--hm-cover-size":`${this._coverPx(this._layoutKey())}px`}}_themeKey(){let t=this._config?.theme;return t&&N[t]?t:O}_themeVars(){let t=N[this._themeKey()],e=this._paletteKey||this._eid()||"ha-music",i=is(e),s=this._palette,r=this._config?.accent,a=this._config?.palette!==!1,o=t.accent[0],l=t.accent[1],c=B(o),h=B(l),d=c,p=ei(t.accent[1]),u=ei(i.a2);if(a){if(s){let m=ii(p,{h:s.h2,s:s.s2,l:s.l2},.5);l=m.css,h=m.rgb,d=s.rgb1}else if(u){let m=ii(p,u,.35);l=m.css,h=m.rgb}}return r&&(o=r,c=B(r,c),a||(d=c)),{"--hm-base":t.base,"--hm-a1":o,"--hm-a2":l,"--hm-spec-a1":o,"--hm-spec-a2":t.accent[1],"--hm-a1-rgb":c,"--hm-a2-rgb":h,"--hm-glow-rgb":d}}_volumeInfo(t){let e=this._config?.volume_entity,i=e?this._hass?.states?.[e]:void 0;if(i){let a=i.entity_id;if(a.startsWith("media_player."))return{domain:"media_player",entityId:a,level:Number(i.attributes?.volume_level??0),muted:!!i.attributes?.is_volume_muted,supported:!0,external:!0};if(a.startsWith("number.")){let o=Number(i.state);if(Number.isFinite(o))return{domain:"number",entityId:a,level:v(o/(i.attributes?.max||100),0,1),muted:!1,supported:!0,external:!0}}if(a.startsWith("input_number.")){let o=Number(i.state);if(Number.isFinite(o))return{domain:"input_number",entityId:a,level:v(o/(i.attributes?.max||100),0,1),muted:!1,supported:!0,external:!0}}}let s=this._state(),r=Number.isFinite(t.volume)||z(s,q.VOLUME_SET)||z(s,q.VOLUME_MUTE);return{domain:"media_player",entityId:this._eid(),level:Number.isFinite(t.volume)?t.volume:0,muted:t.muted,supported:r,external:!1}}_repeatValue(){let t=this._state()?.attributes?.repeat;return["off","all","one"].includes(t)?t:"off"}_call(t,e,i="media_player",s){let r=this._hass;if(!r?.callService)return Promise.resolve();let a=s??this._eid();try{let o=r.callService(i,t,{entity_id:a,...e});return Promise.resolve(o)}catch(o){return this._notify(o?.message||String(o)),Promise.reject(o)}}_guard(t){Promise.resolve(t).catch(e=>{let i=e?.message||String(e);this._notify(i.length>60?i.slice(0,60):i)})}_notify(t){this._toast=t||"",this.requestUpdate(),this._toastTimer&&clearTimeout(this._toastTimer),t&&(this._toastTimer=setTimeout(()=>{this._toast="",this.requestUpdate()},3600))}_togglePlay(){let t=this._state()?.state,e=t==="playing"||t==="buffering";e?this._pauseAudioSpectrum():this._primeAudioSpectrum(),this._guard(this._call(e?"media_pause":"media_play"))}_skip(t){this._primeAudioSpectrum(),this._guard(this._call(t==="next"?"media_next_track":"media_previous_track"))}_coverCue(t){this._coverGesture=t,this._coverGestureTimer&&clearTimeout(this._coverGestureTimer),this._coverGestureTimer=setTimeout(()=>{this._coverGesture===t&&(this._coverGesture="",this.requestUpdate())},420),this.requestUpdate()}_coverSwipe(t){this._coverCue(t),this._skip(t)}_onCoverPointerDown(t){this._thumbMode()||t.pointerType==="mouse"&&t.button!==0||(this._coverSuppressClick=!1,this._coverSuppressTimer&&clearTimeout(this._coverSuppressTimer),this._coverPress={id:t.pointerId,x:t.clientX,y:t.clientY,at:Date.now(),moved:!1,captured:!1})}_onCoverPointerMove(t){let e=this._coverPress;if(!e||e.id!==t.pointerId)return;let i=t.clientX-e.x,s=t.clientY-e.y;if(Math.abs(i)>10&&Math.abs(i)>Math.abs(s)*1.2){if(e.moved=!0,!e.captured){e.captured=!0;try{t.currentTarget.setPointerCapture(t.pointerId)}catch{}}t.cancelable&&t.preventDefault()}}_onCoverPointerUp(t){let e=this._coverPress;if(!e||e.id!==t.pointerId)return;this._coverPress=null;let i=t.clientX-e.x,s=t.clientY-e.y;if(Math.abs(i)>=48&&Math.abs(i)>Math.abs(s)*1.25){this._coverSuppressClick=!0,this._coverSuppressTimer&&clearTimeout(this._coverSuppressTimer),this._coverSuppressTimer=setTimeout(()=>{this._coverSuppressClick=!1},450),this._coverSwipe(i<0?"next":"prev");return}(e.moved||Math.hypot(i,s)>12)&&(this._coverSuppressClick=!0,this._coverSuppressTimer&&clearTimeout(this._coverSuppressTimer),this._coverSuppressTimer=setTimeout(()=>{this._coverSuppressClick=!1},450))}_onCoverPointerCancel(){this._coverPress=null}_onCoverClick(){if(!this._thumbMode()){if(this._coverSuppressClick){this._coverSuppressClick=!1;return}this._coverCue("tap"),this._togglePlay()}}_power(){let t=this._state()?.state,e=t==="off"||t==="standby";this._guard(this._call(e?"turn_on":"turn_off"))}_shuffle(){let t=!!this._state()?.attributes?.shuffle;this._guard(this._call("shuffle_set",{shuffle:!t}))}_repeat(){let t=this._repeatValue(),e=mi.indexOf(t),i=mi[(e+1)%mi.length];this._guard(this._call("repeat_set",{repeat:i}))}_seekTo(t){if(!Number.isFinite(t))return Promise.resolve(!1);let e=this._call("media_seek",{seek_position:t});return this._guard(e),e}_settleSeekPending(t,e,i){let s=this._seekPending;if(!s)return!1;let r=Number(e?.media_position),a=String(e?.media_position_updated_at||"")!==s.stamp,o=Number.isFinite(r)&&Math.abs(r-s.from)>1,l=Number.isFinite(r)&&Math.abs(r-s.value)<=2,c=Date.now()-s.at>8e3;return!t||i||c||l&&(a||o)?(this._seekSettleTimer&&clearTimeout(this._seekSettleTimer),this._seekSettleTimer=null,this._seekPending=null,this._seekPreview=null,this._syncRangeValues(),this._syncProgressTicker(),!0):!1}_onSeekInput(t){if(!z(this._state(),q.SEEK))return;let e=t.target,i=Number(e.value);this._seekPreview=i,this._stopProgressTicker();let s=this._readMedia().duration;e.style.setProperty("--pct",`${s?v(i/s*100,0,100):0}%`)}_onSeekCommit(t){if(!z(this._state(),q.SEEK)){this.requestUpdate();return}let e=Number(t.target.value),i=this._state(),s=i?.attributes||{};this._seekPreview=e,this._stopProgressTicker(),this._seekPending={value:e,from:Number(s.media_position)||0,stamp:String(s.media_position_updated_at||""),trackKey:this._trackKey(i),at:Date.now()};let r=this._seekPending;this._seekSettleTimer&&clearTimeout(this._seekSettleTimer);let a=()=>{this._seekPreview===e&&(this._seekSettleTimer=null,this._seekPending=null,this._seekPreview=null,this._syncRangeValues(),this._syncProgressTicker(),this.requestUpdate())};this._seekSettleTimer=setTimeout(a,4e3),this._seekTo(e).catch(()=>{this._seekPending===r&&(this._seekSettleTimer&&clearTimeout(this._seekSettleTimer),a())}),this.requestUpdate()}_onVolumeInput(t){if(Date.now()-this._volumeCommitAt<300)return;let e=Number(t.target.value)/100;this._volumePreview=e,t.target.style.setProperty("--pct",`${e*100}%`)}_onVolumeCommit(t){let e=v(Number(t.target.value)/100,0,1);this._volumeCommitAt=Date.now(),this._volumePreview=e,t.target.style.setProperty("--pct",`${e*100}%`);let i=this.renderRoot?.querySelector?.(".hm-vol-pct");i&&(i.textContent=`${Math.round(e*100)}%`),this._volumeSettleTimer&&clearInterval(this._volumeSettleTimer),this._volumeSettleTicks=0,setTimeout(()=>{this._volumeCommitAt&&this._volumePreview!==null&&(this._volumePreview=null,this._syncRangeValues(),this.requestUpdate())},1200),this._volumeSettleTimer=setInterval(()=>{this._volumeSettleTicks+=1,this._volumePreview===null&&(this._syncRangeValues(),this.requestUpdate()),this._volumeSettleTicks>=6&&(clearInterval(this._volumeSettleTimer),this._volumeSettleTimer=null)},1500),this.requestUpdate();let s=this._volumeInfo(this._readMedia());if(s.domain==="media_player")this._guard(this._call("volume_set",{volume_level:e},"media_player",s.entityId));else{let r=this._hass?.states?.[s.entityId],a=Number(r?.attributes?.max??100),o=Number(r?.attributes?.min??0);this._guard(this._call("set_value",{value:Math.round(o+e*(a-o))},s.domain,s.entityId))}this.requestUpdate()}_toggleMute(){let t=this._readMedia(),e=this._volumeInfo(t);if(e.external){e.domain==="media_player"?this._guard(this._call("volume_mute",{is_volume_muted:!e.muted},"media_player",e.entityId)):this._notify(F(this._hass?.language)("volumeEntityMissing"));return}this._guard(this._call("volume_mute",{is_volume_muted:!t.muted}))}_volumeStep(t){let e=this._volumeInfo(this._readMedia());if(!e.supported){this._notify(F(this._hass?.language)("volumeEntityMissing"));return}let i=this._volumePreview??e.level,s=v(Number(i)+t,0,1);if(this._volumeCommitAt=Date.now(),this._volumePreview=s,this._volumeSettleTimer&&clearInterval(this._volumeSettleTimer),this._volumeSettleTimer=null,this.requestUpdate(),setTimeout(()=>{this._volumePreview===s&&(this._volumePreview=null,this._syncRangeValues(),this.requestUpdate())},1200),e.domain==="media_player")this._guard(this._call("volume_set",{volume_level:s},"media_player",e.entityId));else{let r=this._hass?.states?.[e.entityId],a=Number(r?.attributes?.max??100),o=Number(r?.attributes?.min??0);this._guard(this._call("set_value",{value:Math.round(o+s*(a-o))},e.domain,e.entityId))}}_selectSource(t){this._menu=null,this._guard(this._call("select_source",{source:t})),this.requestUpdate()}_selectSoundMode(t){this._menu=null,this._guard(this._call("select_sound_mode",{sound_mode:t})),this.requestUpdate()}_leaveGroup(){this._guard(this._call("unjoin"))}_callMassQueue(t,e){let i=this._hass;if(!i?.callService)return Promise.resolve();try{let s=i.callService("mass_queue",t,{entity:this._eid(),...e});return Promise.resolve(s)}catch(s){return this._notify(s?.message||String(s)),Promise.reject(s)}}async _playQueueItem(t){let e=this._queueQueueId||this._state()?.attributes?.active_queue||"";if(t?.queueItemId&&e&&await this._playMaApiItem(e,t.queueItemId)){this._drawer={...this._drawer,items:(this._drawer?.items||[]).map(r=>({...r,active:r.queueItemId===t.queueItemId}))},this.requestUpdate();return}let i=!!this._hass?.services?.mass_queue?.play_queue_item;if(t?.queueItemId&&i){this._guard(this._callMassQueue("play_queue_item",{queue_item_id:t.queueItemId})),this._drawer={...this._drawer,items:(this._drawer.items||[]).map(s=>({...s,active:s.queueItemId===t.queueItemId}))},this.requestUpdate();return}if(!t?.contentId){this._notify(F(this._hass?.language)("queueEmpty"));return}this._guard(this._call("play_media",{media_content_id:t.contentId,media_content_type:t.contentType||"music"}))}_playBrowseItem(t){t?.contentId&&this._guard(this._call("play_media",{media_content_id:t.contentId,media_content_type:t.contentType||"music"}))}_autoSwitchToPlaying(t){let e=this._entities();if(e.length<2)return;let i=!this._autoPrevStates,s={};for(let a of e)s[a]=t?.states?.[a]?.state||"";let r=ts(t,e,this._eid(),this._autoPrevStates);this._autoPrevStates=s,r&&(!i&&Date.now()-this._manualSwitchAt<15e3||this._switchEntity(r,!1))}_switchEntity(t,e=!1){t!==this._activeEntity&&(e&&(this._manualSwitchAt=Date.now()),this._activeEntity=t,this._palette=null,this._paletteKey="",this._artUrl="",this._artSource="",this._artFailedSource="",this._menu=null,this._seekPreview=null,this._seekPending=null,this._resetLyrics(),this._syncTimer(),this._sig=this._computeSig(this._hass),this.requestUpdate())}_moreInfo(){Hr(this,"hass-more-info",{entityId:this._eid()})}_maEnabled(){let t=this._config?.music_assistant;if(t===!1)return!1;if(t===!0||typeof t=="string"&&t.trim()||this._hass?.services?.music_assistant?.play_media||this._entities().some(s=>{let r=this._hass?.states?.[s]?.attributes||{};return Object.keys(r).some(a=>a.startsWith("mass_"))}))return!0;let i=this._hass?.panels||{};return Object.keys(i).some(s=>{let r=i[s]||{};return r.component_name==="music_assistant"||/music[-_ ]?assistant/i.test(r.url_path||s)||/music\s*assistant/i.test(r.title||"")})}_isMaPlayer(t=this._eid()){let e=this._state(t)?.attributes||{};return Object.keys(e).some(i=>i.startsWith("mass_"))}_maUrl(){let t=this._config?.music_assistant;if(t===!1)return"";if(typeof t=="string"&&t.trim())return t.trim();let e=this._hass?.panels||{};for(let s of Object.keys(e)){let r=e[s]||{},a=r.url_path||s;if(r.component_name==="music_assistant"||/music[-_ ]?assistant/i.test(a)||/music\s*assistant/i.test(r.title||""))return`/${a}`}return this._entities().some(s=>{let r=this._hass?.states?.[s]?.attributes||{};return Object.keys(r).some(a=>a.startsWith("mass_"))})||t===!0?"/music-assistant":""}_openAssistant(){this._drawer?.open&&this._closeDrawer();let t=this._maUrl();if(!t)return;if(/^(https?:)?\/\//i.test(t)){window.open(t,"_blank","noopener");return}let e=t.startsWith("/")?t:`/${t}`;try{window.history.pushState(null,"",e),window.dispatchEvent(new Event("location-changed",{bubbles:!0,composed:!0}))}catch{window.location.href=e}}_onCardClick(t){if(!this._menu)return;(t.composedPath?.()||[]).some(s=>s?.classList?.contains?.("hm-menu")||s?.classList?.contains?.("hm-chip"))||(this._menu=null,this.requestUpdate())}_emptyDrawer(){return{open:!1,mode:null,nodes:[],cursor:-1,items:[],title:"",loading:!1,error:""}}_scrollQueueToActive(){let t=this.shadowRoot,e=t?.querySelector(".hm-drawer-body"),i=t?.querySelector('.hm-list-item[data-active="true"]');if(!e||!i)return;let s=i.offsetTop-e.offsetTop;e.scrollTop=Math.max(0,s-e.clientHeight/2+i.offsetHeight/2)}_pickQueueResponse(t){if(!t)return null;if(Array.isArray(t))return t;let e=t[this._eid()]??t.entity??t;return Array.isArray(e)||e&&typeof e=="object"?e:null}async _serviceResponse(t,e,i){let s=this._hass;if(!s?.callWS)throw new Error("Service response unavailable");return(await s.callWS({type:"call_service",domain:t,service:e,service_data:i,return_response:!0}))?.response??null}async _fetchMassQueueItems(){let t=v(Number(this._config?.max_queue)||60,20,Ee);try{let e=await this._serviceResponse("mass_queue","get_queue_items",{entity:this._eid(),limit:t,limit_before:Math.min(15,t),limit_after:t}),i=this._pickQueueResponse(e);return Array.isArray(i)?i:null}catch{return null}}async _fetchMaQueueDetails(){try{let t=await this._serviceResponse("music_assistant","get_queue",{entity_id:this._eid()});return this._pickQueueResponse(t)}catch{return null}}async _maIngressPath(){if(this._maIngressPathValue)return this._maIngressPathValue;if(this._maIngressPromise)return this._maIngressPromise;this._maIngressPromise=(async()=>{let t=this._hass;if(!t?.callWS)return"";try{let e=await t.callWS({type:"supervisor/api",endpoint:"/addons",method:"get"}),s=(Array.isArray(e?.addons)?e.addons:[]).filter(r=>r&&r.state==="started"&&/music\s*assistant/i.test(`${r.name||""} ${r.slug||""}`));for(let r of s){let a=await t.callWS({type:"supervisor/api",endpoint:`/addons/${encodeURIComponent(r.slug)}/info`,method:"get"});if(a?.ingress_url)return this._maIngressPathValue=String(a.ingress_url),await this._maGrantIngressSession(r.slug,this._maIngressPathValue),this._maIngressPathValue}}catch{}return""})();try{return await this._maIngressPromise}finally{this._maIngressPromise=null}}async _maGrantIngressSession(t,e){if(!(!t||!e||!this._hass?.callWS))try{let i=await this._hass.callWS({type:"supervisor/ingress/session",slug:String(t)}),s=i?.session||i?.ingress_session||"";if(!s||typeof document>"u")return;let r=e.endsWith("/")?e:`${e}/`,a=window.location.protocol==="https:"?"; Secure":"";document.cookie=`ingress_session=${s}; Path=${r}; SameSite=Strict${a}`}catch{}}_maOpenSocket(t){return new Promise((e,i)=>{let s;try{let a=window.location.protocol==="https:"?"wss:":"ws:",o=t.startsWith("/")?t:`/${t}`,l=`${a}//${window.location.host}${o}${o.endsWith("/")?"":"/"}ws`;s=new WebSocket(l)}catch(a){i(a);return}let r=setTimeout(()=>{try{s.close()}catch{}i(new Error("Music Assistant websocket timeout"))},1e4);s.addEventListener("open",()=>{clearTimeout(r),e(s)}),s.addEventListener("error",()=>{clearTimeout(r),i(new Error("Music Assistant websocket failed"))}),s.addEventListener("close",()=>{clearTimeout(r)})})}_maSend(t,e,i={},s=15e3){return new Promise((r,a)=>{let o=`hm${this._maMsgSeq=(this._maMsgSeq||0)+1}`,l=!1,c=()=>{clearTimeout(d),t.removeEventListener("message",p),t.removeEventListener("close",u)},h=m=>{l||(l=!0,c(),a(m))},d=setTimeout(()=>h(new Error("Music Assistant API timeout")),s),p=m=>{let f;try{f=JSON.parse(m.data)}catch{return}if(!(!f||f.message_id!==o)){if(f.error||f.error_code){h(new Error(f.details||f.error?.message||`Music Assistant error ${f.error_code||""}`));return}l=!0,c(),r(f.result)}},u=()=>h(new Error("Music Assistant websocket closed"));t.addEventListener("message",p),t.addEventListener("close",u);try{t.send(JSON.stringify({message_id:o,command:e,args:i}))}catch(m){h(m)}})}async _fetchMaApiQueue(t){if(!t)return null;let e=await this._maIngressPath();if(!e)return null;let i;try{i=await this._maOpenSocket(e);let s=await this._maSend(i,"player_queues/get",{queue_id:t}),r=Number(s?.items)||0,a=s?.current_item?.queue_item_id||"",o=Number(s?.current_index),l=0;Number.isFinite(o)&&o>=0&&(l=Math.max(0,o-jr)),r>0&&(l=Math.min(l,Math.max(0,r-Ee)));let c=r>0?Math.min(Ee,r-l):Ee,h=await this._maSend(i,"player_queues/items",{queue_id:t,limit:c,offset:l});if(!Array.isArray(h)||!h.length)return null;let d=h.length;return{items:h,total:r||d,activeItemId:a,currentIndex:o,offset:l,windowed:r>0&&d<r}}catch{return null}finally{try{i?.close()}catch{}}}async _playMaApiItem(t,e){if(!t||!e)return!1;let i=await this._maIngressPath();if(!i)return!1;let s;try{return s=await this._maOpenSocket(i),await this._maSend(s,"player_queues/play_index",{queue_id:t,index:e}),!0}catch{return!1}finally{try{s?.close()}catch{}}}async _loadQueue(t){let e=this._state()?.attributes||{},i=e.active_queue||"",[s,r]=await Promise.all([this._fetchMassQueueItems(),this._fetchMaQueueDetails()]);if(t!==this._queueLoadToken||!this._drawer?.open||this._drawer.mode!=="queue")return;let a=F(this._hass?.language),o=await this._fetchMaApiQueue(i||r?.queue_id||"");if(t!==this._queueLoadToken||!this._drawer?.open||this._drawer.mode!=="queue")return;this._queueQueueId=i||r?.queue_id||"";let l=o?.activeItemId||r?.current_item?.queue_item_id||"",c=e.media_content_id||"",h=o?ti(o.items,l,c):s?ti(s,l,c):[],d=Number(o?.offset)||0;h.length&&d>0&&(h=h.map((g,y)=>({...g,index:d+y})));let p=!o?.windowed&&h.length>0;!h.length&&r&&(h=es(r,c));let u=Number(o?.total??r?.items),m=Number(o?.currentIndex??r?.current_index),f=[a("queue")];Number.isFinite(u)&&u>0&&f.push(`${Number.isFinite(m)?m+1:"?"}/${u}`);let b=!p&&h.length?a("queueLimited"):"";o?.windowed&&h.length&&(b=`${a("queueWindow")} \xB7 ${d+1}\u2013${d+h.length}/${u}`),this._drawer={...this._drawer,items:h,loading:!1,error:"",title:f.join(" \xB7 "),note:b,maUrl:this._maUrl(),fullQueue:p},this.requestUpdate(),this.updateComplete.then(()=>this._scrollQueueToActive())}_openQueue(){let t=F(this._hass?.language),e=this._state(),i=Ze(e,this._config?.max_queue??40),s=this._isMaPlayer(),r=++this._queueLoadToken;this._queueQueueId=s&&e?.attributes?.active_queue||"",this._drawer={open:!0,mode:"queue",nodes:[],cursor:-1,items:i,title:t("queue"),loading:!i.length&&s,error:"",note:"",maUrl:s?this._maUrl():"",fullQueue:i.length>0},this.requestUpdate(),i.length&&this.updateComplete.then(()=>this._scrollQueueToActive()),!(i.length||!s)&&this._loadQueue(r).catch(a=>{r===this._queueLoadToken&&(this._drawer={...this._drawer,loading:!1,error:a?.message||t("queueEmpty")},this.requestUpdate())})}_openLibrary(){let t=F(this._hass?.language);this._drawer={open:!0,mode:"library",nodes:[],cursor:-1,items:[],title:t("library"),loading:!0,error:"",t},this.requestUpdate(),this._fetchBrowse()}_openPlaylists(){let t=F(this._hass?.language);if(!this._isMaPlayer()){if(this._maUrl()){this._openAssistant();return}this._notify(t("maPlayerRequired"));return}this._drawer={open:!0,mode:"playlists",nodes:[],cursor:-1,items:[],title:t("playlists"),loading:!0,error:"",maUrl:this._maUrl()},this.requestUpdate(),this._fetchPlaylists()}async _browseMedia(t,e){let i=this._hass?.connection;if(!i?.sendMessagePromise)throw new Error("unsupported");let s={type:"media_player/browse_media",entity_id:this._eid()};return t&&(s.media_content_id=t,e&&(s.media_content_type=e)),i.sendMessagePromise(s)}async _fetchPlaylists(){let t=F(this._hass?.language);try{let i=(await this._browseMedia())?.children||[],s=i.find(o=>o.can_expand&&(/playlist/i.test(o.media_class||"")||/playlist/i.test(o.media_content_type||"")||/播放列表|playlists?/i.test(o.title||""))||!1),r=[];s&&(r=(await this._browseMedia(s.media_content_id,s.media_content_type))?.children||[]),r.length||(r=i.filter(o=>/playlist/i.test(o.media_class||"")));let a=r.map(o=>({title:o.title||"",subtitle:(()=>{let l=Ye(o.media_class,this._hass?.language);return l&&l!==t("playlists")?l:""})(),contentId:o.media_content_id||"",contentType:o.media_content_type||"playlist",thumb:o.thumbnail||""})).filter(o=>o.contentId);if(this._drawer.mode!=="playlists")return;this._drawer={...this._drawer,loading:!1,items:a,error:""}}catch(e){if(this._drawer.mode!=="playlists")return;this._drawer={...this._drawer,loading:!1,items:[],error:e?.message?`${t("browseFailed")} \xB7 ${String(e.message).slice(0,40)}`:t("browseFailed")}}this.requestUpdate()}async _playPlaylistItem(t){if(!t?.contentId)return;let e=F(this._hass?.language),i=this._eid();if(!this._isMaPlayer(i)){this._notify(e("maPlayerRequired"));return}let s=t.contentType||"playlist",r=()=>{this._notify(`${e("playingPlaylist")} \xB7 ${t.title||""}`),this._closeDrawer()},a=!!this._hass?.services?.music_assistant?.play_media,o=l=>{let c=l?.message||String(l);return/nothing to play here/i.test(c)?e("playlistEmpty"):c.length>60?c.slice(0,60):c};if(a)try{await this._hass.callService("music_assistant","play_media",{entity_id:i,media_id:t.contentId,media_type:"playlist",enqueue:"play"}),r();return}catch(l){let c=l?.message||String(l);if(/nothing to play here/i.test(c)){this._markPlaylistEmpty(t),this._notify(o(l));return}if(!/match|target|not a valid|does not support|unsupported/i.test(c)){this._notify(o(l));return}}try{await this._call("play_media",{media_content_id:t.contentId,media_content_type:s}),r()}catch(l){/nothing to play here/i.test(l?.message||"")&&this._markPlaylistEmpty(t),this._notify(o(l)||e("browseFailed"))}}_markPlaylistEmpty(t){this._drawer.mode==="playlists"&&(this._drawer={...this._drawer,items:this._drawer.items.map(e=>e.contentId===t.contentId?{...e,empty:!0}:e)},this.requestUpdate())}_closeDrawer(){this._drawer={...this._drawer,open:!1},this.requestUpdate(),setTimeout(()=>{this._drawer.open||(this._drawer=this._emptyDrawer(),this._queueLoadToken+=1,this.requestUpdate())},Br)}async _fetchBrowse(){let t=this._hass,e=t?.connection,i=F(t?.language),s=this._drawer.cursor>=0?this._drawer.nodes[this._drawer.cursor]:null,r={type:"media_player/browse_media",entity_id:this._eid()};if(s&&(r.media_content_id=s.contentId,s.contentType&&(r.media_content_type=s.contentType)),this._drawer={...this._drawer,loading:!0,error:""},this.requestUpdate(),!e?.sendMessagePromise){this._drawer={...this._drawer,loading:!1,error:i("browseFailed")},this.requestUpdate();return}try{let a=await e.sendMessagePromise(r),o=(a?.children||[]).map(l=>({title:l.title||"",subtitle:Ye(l.media_class,this._hass?.language)||l.media_content_type||"",contentId:l.media_content_id||"",contentType:l.media_content_type||"",thumb:l.thumbnail||"",canPlay:!!l.can_play,canExpand:!!l.can_expand,cls:l.media_class||""}));if(this._drawer.mode!=="library")return;this._drawer={...this._drawer,loading:!1,items:o,title:s?.title||a?.title||i("library"),error:""}}catch(a){if(this._drawer.mode!=="library")return;this._drawer={...this._drawer,loading:!1,items:[],error:a?.message?`${i("browseFailed")} \xB7 ${String(a.message).slice(0,40)}`:i("browseFailed")}}this.requestUpdate()}_enterBrowseItem(t){if(!t.canExpand){t.canPlay&&this._playBrowseItem(t);return}let e=this._drawer.nodes.slice(0,this._drawer.cursor+1);e.push({contentId:t.contentId,contentType:t.contentType,title:t.title}),this._drawer={...this._drawer,nodes:e,cursor:e.length-1,title:t.title,items:[]},this.requestUpdate(),this._fetchBrowse()}_browseBack(){this._drawer.cursor<0||(this._drawer={...this._drawer,cursor:this._drawer.cursor-1,items:[]},this.requestUpdate(),this._fetchBrowse())}updated(){let t=this.renderRoot?.querySelector?.(".hm-card");if(!t)return;let e=this._readMedia(),i=this._eid();this._syncArt(e,i),this._artUrl!==this._artApplied&&this._crossFadeArt(t,this._artUrl),this._syncRangeValues(),this._syncPanelFlag(),this._queuePanelFit(),this._installDock(),this._installLyricDock(),wt(this.renderRoot?.querySelector?.(".hm-cover img"),this._state()?.state==="playing"),this._syncCoverEq(),this._maybeLoadLyrics(),(this._lyricsOpen||this._sideLyricsVisible())&&this._lyricsActive!==this._lyricsScrolled&&(this._lyricsScrolled=this._lyricsActive,this._centerActiveLyric()),this._observeLyricsScroll(),this._syncSpectrum(),this._syncProgressTicker()}_queuePanelFit(){if(this._fitPanelRaf&&cancelAnimationFrame(this._fitPanelRaf),typeof requestAnimationFrame>"u"){this._fitPanel(),this._layoutWideCluster();return}this._fitPanelRaf=requestAnimationFrame(()=>{this._fitPanelRaf=null,this._fitPanel(),this._layoutWideCluster()})}_fitPanel(){if(!this._panel){this.style.removeProperty("--hm-panel-cover"),this.style.removeProperty("--hm-panel-height"),this._panelHeight=0,this.renderRoot?.querySelector?.(".hm-card")?.classList.remove("hm-short-landscape");return}let t=this.renderRoot?.querySelector?.(".hm-card");if(!t)return;let e=Math.round(window.visualViewport?.height||window.innerHeight||0);if(e<240)return;let i=t.getBoundingClientRect(),s=Math.max(240,Math.min(e,Math.floor(e-Math.max(0,i.top))));s!==this._panelHeight&&(this._panelHeight=s,this.style.setProperty("--hm-panel-height",`${s}px`));let r=this.renderRoot?.querySelector?.(".hm-main");if(!r)return;let a=Math.round(r.clientHeight||0),o=Math.round(r.clientWidth||0);if(a<80||o<80)return;let l=Math.round(t.clientWidth||0),c=Math.round(t.clientHeight||0),h=l<820||c>l*1.15,d=l>=700&&l<=821&&c<=820&&l>=c*1.02;t.classList.toggle("hm-short-landscape",d);let p;if(d)p=Math.max(120,Math.min(a-96,o*.3,460));else if(h){let m=o<560?.58:.66,f=c*.28;p=Math.max(120,Math.min(o*m,f))}else p=Math.max(120,Math.min(a-96,o*.3,460));this.style.setProperty("--hm-panel-cover",`${Math.round(p)}px`)}_layoutWideCluster(){let t=this.renderRoot,e=t?.querySelector?.(".hm-cover-wrap"),i=t?.querySelector?.(".hm-meta"),s=t?.querySelector?.(".hm-lyrics-inline"),r=t?.querySelector?.(".hm-main"),a=t?.querySelector?.(".hm-info");if(!e||!i||(e.style.removeProperty("transform"),i.style.removeProperty("transform"),!s||!r||!a))return;let o=getComputedStyle(a).gridTemplateColumns;if(!o||o==="none"||o.trim().split(/\s+/).length<2)return;let l=t.querySelector(".hm-cover-eq"),c=r.getBoundingClientRect(),h=s.getBoundingClientRect(),d=e.getBoundingClientRect(),p=l?.getBoundingClientRect?.(),u=p&&p.width>0?p.left:d.left,m=i.getBoundingClientRect(),f=m.left;for(let M of i.children){let $=document.createRange();$.selectNodeContents(M);let P=$.getBoundingClientRect();P.width>0&&(f=Math.max(f,P.right))}f<=m.left&&(f=m.right);let b=c.left,g=h.left-Math.max(16,c.width*.012),y=(u+f)/2,w=(b+g)/2,S=Math.max(0,g-f),A=Math.max(0,Math.min(w-y,S));if(A<1)return;let k=`translateX(${A.toFixed(1)}px)`;e.style.transform=k,i.style.transform=k}_isPanelContext(){if(this.closest?.("hui-panel-view"))return!0;let t=this.getRootNode?.();for(;t;){let e=t.host;if(!e)break;if(String(e.tagName||"").toLowerCase()==="hui-panel-view")return!0;t=e.getRootNode?.()}return!1}_syncPanelFlag(){let t=this._isPanelContext();t!==this._panel&&(this._panel=t,this.setAttribute("data-panel",String(t)),this.renderRoot?.querySelector?.(".hm-card")?.setAttribute("data-panel",String(t)))}_isThumbnailPreview(){let t=this.getRootNode?.();for(;t;){let e=t.host;if(!e)break;let i=String(e.tagName||"").toLowerCase();if(i==="hui-card-preview"||i==="hui-suggestion-card"||i==="hui-card"&&e.preview===!0)return!0;t=e.getRootNode?.()}return!!this.closest?.("hui-card-preview, hui-suggestion-card")}_thumbMode(){return this.preview===!0||this.editMode===!0||this._thumbPreview}_thumbTier(){let t=this._width||0,e=this._height||0;return t>=700&&e>=500?"lg":t>=440||e>=520?"md":"sm"}_isPreviewContext(){let t=this.getRootNode?.();for(;t;){let e=t.host;if(!e)break;let i=String(e.tagName||"").toLowerCase();if(i==="hui-card-preview"||i==="hui-card-options"||i==="hui-dialog-edit-card"||i==="ha-dialog")return!0;t=e.getRootNode?.()}return!!this.closest?.("hui-card-preview, hui-card-options")}_isMobileUi(){return this._mobileMq?!!this._mobileMq.matches:Or()}_installDock(){if(this._isPreviewContext())return;if(this._isMobileUi()&&this._config?.mobile_hide_dock!==!1){we(),this._dockOwner=!1;return}let t=this._config?.dock,e=ot(this._config?.dock_entities),i=Q(this._config?.dock_themes),s=W(),r=s?s.modes:K(t),a=s?s.entities:e,o=s?s.themes:i,l=this._eid?.()||this._config?.entity||(Array.isArray(this._config?.entities)?this._config.entities[0]:"");if(!r.length){s&&!this._isPreviewContext()&&(we(),this._dockOwner=!1);return}if(!this._hass||!this.isConnected||!l)return;let c={};for(let d of r){let p=a[d]||l;p&&(c[d]=p)}let h=Object.entries(c).map(([d,p])=>({mode:d,entity:p,hass:this._hass,theme:o[d]||this._themeKey()}));Yt(h),s||ve({modes:Object.keys(c),entities:c,themes:Object.fromEntries(Object.keys(c).map(d=>[d,o[d]||this._themeKey()]))}),this._dockOwner=!0}_installLyricDock(){if(this._isPreviewContext())return;if(this._isMobileUi()&&this._config?.mobile_hide_lyrics!==!1){Ce(),this._lyricDockOwner=!1;return}let t=this._config?.floating_lyrics!==!1,e=Number(this._config?.floating_lyrics_edited)||0,i=Pe(),s=e>0&&e>=(i?.updated||0),r=s?t:i?i.enabled:t,a=this._eid?.()||this._config?.entity||(Array.isArray(this._config?.entities)?this._config.entities[0]:"");if(!r){!this._isPreviewContext()&&(s||this._lyricDockOwner)&&(pi({enabled:!1,entity:a,updated:e||Date.now()}),Ce(),this._lyricDockOwner=!1);return}if(!this._hass||!this.isConnected||!a||this._isPreviewContext())return;let o=this._state(a),l=this._trackKeyFor(a,o),c=this._lyrics.status==="ready"?this._lyrics.lines:[];te({enabled:!0,entity:a,preferredEntity:a,auto:this._config?.floating_lyrics_auto!==!1,source:this._lyricsSource(),theme:this._themeKey(),hass:this._hass,lines:c,plain:this._lyrics.plain,trackKey:l,status:this._lyrics.status,offset:this._lyricsOffset}),pi({enabled:!0,entity:a,updated:e||i?.updated||Date.now()}),this._lyricDockOwner=!0}_trackKeyFor(t,e){let i=e?.attributes||{},s=i.media_metadata||{};return[t,s.title||i.media_title||"",s.artist||i.media_artist||"",s.album_name||i.media_album_name||"",s.duration??i.media_duration??0,i.media_content_id||""].map(r=>String(r)).join("|")}_syncArt(t,e){let i=this._state(),r=!i||i.state==="unavailable"||i.state==="unknown"?"":t?.art||"";if(r===this._artSource)return;this._artSource=r,this._artFailedSource="";let a=++this._artSeq;if(this._artLoading="",!r){this._artUrl="",this._artApplied="",this.requestUpdate();return}ue(this._hass,r,e).then(o=>{if(a!==this._artSeq||o===this._artUrl)return;this._artUrl=o,this.requestUpdate();let l=this.renderRoot?.querySelector?.(".hm-card");l&&this._crossFadeArt(l,o)})}_artUrlFor(){let t=this._readMedia();return rt(this._hass,t.art)}_onArtError(){if(!this._artSource)return;this._artFailedSource=this._artSource,this._artUrl="",this._artApplied="",this._artLoading="",(this.renderRoot?.querySelector?.(".hm-card")?.querySelectorAll?.(".hm-bg-art")||[]).forEach(i=>{i.classList.remove("on"),i.style.backgroundImage=""}),this._artSlot=0,this._maybePalette(""),this.requestUpdate()}_crossFadeArt(t,e){let i=t.querySelectorAll(".hm-bg-art");if(!i.length)return;if(!e){this._artLoading="",this._artApplied="",i.forEach(l=>{l.classList.remove("on"),l.style.backgroundImage=""}),this._artSlot=0,this._maybePalette("");return}if(e===this._artApplied||e===this._artLoading)return;this._artLoading=e;let s=i.length>1?(this._artSlot+1)%2:0,r=i[s],a=i[this._artSlot],o=new Image;o.decoding="async",o.onload=()=>{this._artLoading!==e||this._artUrl!==e||(this._artLoading="",this._artApplied=e,r.style.backgroundImage=`url("${e}")`,r.classList.add("on"),a?.classList.remove("on"),this._artSlot=s,this._maybePalette(e))},o.onerror=()=>{this._artLoading===e&&(this._artLoading=""),this._onArtError()},o.src=e}_maybePalette(t){let e=this._readMedia(),i=t||`${e.title}|${e.artist}|${this._eid()}`;if(this._paletteKey!==i){if(this._paletteKey=i,!t){this._palette=null,this.requestUpdate();return}rs(t,i).then(s=>{this._paletteKey===i&&(this._palette=s,this.requestUpdate())})}}_stopProgressTicker(){this._progressRaf&&cancelAnimationFrame(this._progressRaf),this._progressRaf=null,this._progressLastSecond=-1,this._progressPaintAt=0}_syncProgressTicker(){if(this._seekPreview!==null||this._state()?.state!=="playing"){this._stopProgressTicker();return}let e=this.renderRoot?.querySelector?.('input.hm-range[data-role="seek"]'),i=this._readMedia();if(!e||!i.duration){this._stopProgressTicker();return}this._progressRaf||(this._progressLastSecond=-1,this._progressRaf=requestAnimationFrame(()=>this._progressTick()))}_progressTick(){if(this._progressRaf=null,this._seekPreview!==null||this._state()?.state!=="playing"){this._progressLastSecond=-1;return}let t=this.renderRoot?.querySelector?.('input.hm-range[data-role="seek"]');if(!t){this._progressLastSecond=-1;return}let e=this._readMedia(),i=Number(e.duration)||0;if(!i){this._progressLastSecond=-1;return}let s=v(Number(e.position)||0,0,i),r=v(s/i*100,0,100),a=performance.now();if(this._isMobileUi()&&this._progressPaintAt&&a-this._progressPaintAt<32){this._progressRaf=requestAnimationFrame(()=>this._progressTick());return}this._progressPaintAt=a,t.value=String(s),t.style.setProperty("--pct",`${r}%`);let o=Math.floor(s);if(o!==this._progressLastSecond){this._progressLastSecond=o;let l=this.renderRoot?.querySelector?.(".hm-time");l&&(l.textContent=st(s));let c=this.renderRoot?.querySelector?.(".hm-time.end");c&&(c.textContent=this._showRemaining?`-${st(Math.max(i-s,0))}`:st(i))}this._progressRaf=requestAnimationFrame(()=>this._progressTick())}_syncRangeValues(){let t=this.renderRoot;if(!t)return;let e=t.querySelector?.('input.hm-range[data-role="seek"]'),i=t.querySelector?.('input.hm-range[data-role="volume"]'),s=this._readMedia();if(e&&this._seekPreview===null){let r=s.duration||0,a=v(s.position,0,r||s.position);e.value=String(a),e.max=String(r||0),e.style.setProperty("--pct",`${r?v(a/r*100,0,100):0}%`)}if(i&&this._volumePreview===null){let r=this._volumeInfo(s),a=Math.round(r.level*100);i.value=String(a),i.style.setProperty("--pct",`${r.level*100}%`),i.setAttribute("data-disabled",String(!r.supported));let o=t.querySelector?.(".hm-vol-pct");o&&(o.textContent=`${a}%`)}}getCardSize(){let t=this._layoutKey();return t==="mini"?1:t==="compact"?3:6}getGridOptions(){let t=this.getCardSize();return{columns:this._panel?"full":12,rows:this._panel?Math.max(6,t):t,min_columns:this._panel?12:4,min_rows:this._panel?4:2,max_columns:24,max_rows:24}}getLayoutOptions(){let t=this.getGridOptions();return{grid_columns:t.columns==="full"?12:t.columns,grid_rows:t.rows,grid_min_columns:t.min_columns,grid_max_columns:t.max_columns,grid_min_rows:t.min_rows,grid_max_rows:t.max_rows}}_observeLyricsScroll(){if(typeof ResizeObserver>"u")return;let t=this.renderRoot?.querySelector?.(".hm-lyrics-scroll");!t||t===this._lyricsScrollObserved||(this._lyricsScrollObserver?.disconnect(),this._lyricsScrollObserved=t,this._lyricsScrollObserver=new ResizeObserver(()=>{this._lyricsActive>=0&&t.isConnected&&this._centerActiveLyric()}),this._lyricsScrollObserver.observe(t))}_centerActiveLyric(){if(typeof requestAnimationFrame>"u")return;let t=(e=0)=>{requestAnimationFrame(()=>{let i=this.renderRoot?.querySelector?.(".hm-lyrics-scroll"),s=this.renderRoot?.querySelector?.('.hm-lyrics-line[data-active="true"]');if(!i||!s)return;let r=i.clientHeight;if(r<24){e<4&&t(e+1);return}let o=`${Math.max(0,Math.round((r-s.offsetHeight)/2))}px`;i.style.paddingTop!==o&&(i.style.paddingTop=o,i.style.paddingBottom=o),i.offsetHeight;let l=()=>{let h=i.getBoundingClientRect(),d=s.getBoundingClientRect(),p=i.scrollTop+d.top-h.top-h.height/2+d.height/2;return Math.max(0,p)};i.scrollTo({top:l(),behavior:"smooth"});let c=()=>{this.renderRoot?.querySelector?.(".hm-lyrics-scroll")!==i||this.renderRoot?.querySelector?.('.hm-lyrics-line[data-active="true"]')!==s||(i.scrollTop=l())};"onscrollend"in i?i.addEventListener("scrollend",c,{once:!0}):setTimeout(c,420)})};t()}_renderLyrics(t,e,i=!1){let s=F(this._hass?.language),r=this._lyrics,a=r.lines.length>0,o=r.plain||[],l=this._lyricsPosition(e),c=a?Ss(r.lines,l,t.duration):{index:-1,progress:0},h=a?Math.max(0,c.index):-1,d=h>=0?c.progress:0,p=h!==this._lyricsActive;this._lyricsActive=h,p&&h>=0&&(this._lyricsScrolled=h,this._centerActiveLyric());let u=z(this._state(),q.SEEK),m=`${this._lyricsOffset>0?"+":""}${this._lyricsOffset.toFixed(1)}s`,f=x;return r.status==="loading"?f=x:r.status==="none"?f=_`<div class="hm-lyrics-empty">${s("lyricsNone")}</div>`:r.status==="error"?f=_`<div class="hm-lyrics-empty hm-lyrics-error">
        <span>${s("lyricsError")}</span>
        <button
          class="hm-lyrics-retry"
          @click=${b=>{b.stopPropagation(),this._retryLyrics()}}
        >
          ${s("lyricsRetry")}
        </button>
      </div>`:r.instrumental?f=_`<div class="hm-lyrics-empty">${s("lyricsInstrumental")}</div>`:a?f=r.lines.map((b,g)=>_`<button
          class="hm-lyrics-line"
          data-active=${g===h?"true":"false"}
          data-time=${b.time}
          style=${`--hm-line-progress:${g===h?Math.round(d*100):0}%`}
          @click=${()=>{u&&this._seekTo(Math.max(0,b.time-this._lyricsOffset))}}
        >
          <span class="hm-lyrics-text">${b.text}</span>
        </button>`):o.length?f=o.map(b=>_`<div class="hm-lyrics-line" data-static="true">${b}</div>`):f=_`<div class="hm-lyrics-empty">${s("lyricsNone")}</div>`,_`<section class="hm-lyrics ${i?"hm-lyrics-inline":""}" data-status=${r.status}>
      <div class="hm-lyrics-head">
        <span class="hm-lyrics-title">${s("lyrics")}</span>
        ${r.source?_`<span class="hm-lyrics-source">${r.source}</span>`:x}
        <div class="hm-lyrics-offset" title=${s("lyricsOffset")}>
          <button
            type="button"
            aria-label="-0.5s"
            @click=${b=>{b.stopPropagation(),this._bumpLyricsOffset(-.5)}}
          >−</button>
          <span>${m}</span>
          <button
            type="button"
            aria-label="+0.5s"
            @click=${b=>{b.stopPropagation(),this._bumpLyricsOffset(.5)}}
          >+</button>
        </div>
        ${i?x:_`<button
              class="hm-lyrics-close"
              aria-label=${s("close")}
              title=${s("close")}
              @click=${b=>{b.stopPropagation(),this._toggleLyrics()}}
            >
              ${E("close",14)}
            </button>`}
      </div>
      <div class="hm-lyrics-scroll">${f}</div>
    </section>`}render(){let t=this._hass,e=this._config||{},i=F(t?.language),s=this._layoutKey(),r=this._themeKey();if(!t)return _`
        <div class="hm-card" data-layout=${s} data-panel=${this._panel?"true":"false"} data-thumb=${this._thumbMode()?this._thumbTier():"false"} data-theme=${r} style=${it(this._styleVars())}>
          <div class="hm-body">
            <div class="hm-empty">${i("loading")}</div>
          </div>
        </div>
      `;let a=this._eid(),o=t.states?.[a];if(!o)return _`
        <div class="hm-card" data-layout=${s} data-panel=${this._panel?"true":"false"} data-thumb=${this._thumbMode()?this._thumbTier():"false"} data-theme=${r} style=${it(this._styleVars())}>
          <div class="hm-body">
            <div class="hm-empty">
              ${a?`\u5B9E\u4F53\u672A\u627E\u5230\uFF1A${a}`:"ha-music: entity \u672A\u914D\u7F6E"}
            </div>
          </div>
        </div>
      `;let l=this._readMedia(),c=Ze(o,e.max_queue??40),h=o.state==="playing"||o.state==="buffering",d=Kr(o.state),p=i(d),u=l.album||l.series||l.appName||(d==="playing"?i("playing"):p),m=this._volumeInfo(l),f=e.show_volume!==!1&&m.supported,b=z(o,q.SHUFFLE_SET),g=z(o,q.REPEAT_SET),y=z(o,q.PREVIOUS_TRACK),w=z(o,q.NEXT_TRACK),S=z(o,q.PLAY)||z(o,q.PAUSE),A=o.state==="off"||o.state==="standby",k=A?z(o,q.TURN_ON):z(o,q.TURN_OFF),M=z(o,q.BROWSE_MEDIA),$=this._isMaPlayer(a),P=this._maEnabled(),L=z(o,q.SEEK),R=Array.isArray(o.attributes?.source_list)?o.attributes.source_list:[],I=Array.isArray(o.attributes?.sound_mode_list)?o.attributes.sound_mode_list:[],U=e.show_source!==!1&&R.length>0&&z(o,q.SELECT_SOURCE),_t=I.length>0&&z(o,q.SELECT_SOUND_MODE),D=l.groupMembers.filter(C=>C&&C!==a),ct=e.show_group!==!1&&l.groupMembers.length>1,ie=!!t.services?.mass_queue?.get_queue_items,Te=e.show_queue!==!1&&(c.length>0||$&&(!!o.attributes?.active_queue||ie)),se=e.show_library!==!1&&M,Et=e.visualizer||"bars",Le=e.cover||"ambient",Z=l.duration,G=this._seekPreview??l.position,Tt=Z?v(G/Z*100,0,100):0,Lt=Math.round((this._volumePreview??m.level)*100),bt=this._repeatValue(),re=l.title||"",wi=this._entities(),ki=this._lyricsEnabled()&&!this._thumbMode()&&s!=="mini"&&(this._lyrics.status==="ready"||this._lyrics.status==="loading"||this._lyrics.status==="error"||this._lyricsOpen),Rt=ki&&!this._lyricsOpen&&this._lyrics.status==="ready"&&this._sideLyricsVisible(),Ai=this._lyrics.status==="ready"&&this._lyrics.lines.length&&this._lyrics.lines[Math.max(0,Xt(this._lyrics.lines,this._lyricsPosition(G)))]?.text||"",$i=o.state==="unavailable"||o.state==="unknown"?"":this._artUrl;return _`
      <div
        class="hm-card"
        data-theme=${r}
        data-layout=${s}
        data-panel=${this._panel?"true":"false"}
        data-thumb=${this._thumbMode()?this._thumbTier():"false"}
        data-playing=${h?"true":"false"}
        data-cover=${Le}
        data-tight=${this._tight()?"true":"false"}
        style=${it(this._styleVars())}
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
              <span class="hm-status-text hm-status-player">${e.name||vt(t,a,a)}</span>
            </div>
            <div class="hm-top-actions">
              ${ki?_`<button
                    class="hm-icon-btn hm-lyrics-btn"
                    data-role="lyrics"
                    data-active=${this._lyricsOpen||Rt?"true":"false"}
                    aria-label=${i("lyrics")}
                    title=${i("lyrics")}
                    @click=${()=>this._toggleLyrics()}
                  >
                    ${E("lyrics",16)}
                  </button>`:x}
              ${P?_`<button
                    class="hm-icon-btn hm-ma"
                    aria-label=${i($?"playlists":"openAssistant")}
                    title=${i($?"playlists":"openAssistant")}
                    @click=${()=>this._openPlaylists()}
                  >
                    ${E("ma",16)}
                  </button>`:x}
              ${Te?_`<button
                    class="hm-icon-btn"
                    aria-label=${i("queue")}
                    title=${i("queue")}
                    @click=${()=>this._openQueue()}
                  >
                    ${E("queue",16)}
                  </button>`:x}
              ${se?_`<button
                    class="hm-icon-btn"
                    aria-label=${i("library")}
                    title=${i("library")}
                    @click=${()=>this._openLibrary()}
                  >
                    ${E("library",16)}
                  </button>`:x}
              ${k?_`<button
                    class="hm-icon-btn"
                    data-role="power"
                    aria-label=${i("power")}
                    title=${i("power")}
                    @click=${()=>this._power()}
                  >
                    ${E("power",16)}
                  </button>`:x}
              <button
                class="hm-icon-btn"
                data-role="more"
                aria-label=${i("more")}
                title=${i("more")}
                @click=${()=>this._moreInfo()}
              >
                ${E("more",16)}
              </button>
            </div>
          </header>

          ${wi.length>1?_`
                <div class="hm-entities">
                  ${wi.map(C=>{let qt=t.states?.[C],zt=rt(t,qt?.attributes?.entity_picture),Re=qt?.state==="playing"||qt?.state==="buffering";return _`<button
                      class="hm-entity-chip"
                      data-active=${C===a?"true":"false"}
                      data-playing=${Re?"true":"false"}
                      aria-label=${Re?`${vt(t,C,C)} ${i("playing")}`:vt(t,C,C)}
                      @click=${()=>this._switchEntity(C,!0)}
                    >
                      <span
                        class="hm-entity-dot"
                        style=${zt?`background-image:url("${zt}")`:""}
                      ></span>
                      <span class="hm-entity-name">${vt(t,C,C)}</span>
                      ${Re?_`<span class="hm-entity-eq" aria-hidden="true">
                            <i></i><i></i><i></i>
                          </span>`:x}
                    </button>`})}
                </div>`:x}

          ${this._lyricsOpen?this._renderLyrics(l,G):_`<section class="hm-main" data-side-lyrics=${Rt?"true":"false"}>
            <div class="hm-cover-wrap">
              <canvas class="hm-cover-eq" aria-hidden="true"></canvas>
              <button
                class="hm-cover"
                data-playing=${h?"true":"false"}
                data-gesture=${this._coverGesture||""}
                aria-label=${i(h?"pause":"play")}
                title=${re||i("noMedia")}
                @pointerdown=${C=>this._onCoverPointerDown(C)}
                @pointermove=${C=>this._onCoverPointerMove(C)}
                @pointerup=${C=>this._onCoverPointerUp(C)}
                @pointercancel=${()=>this._onCoverPointerCancel()}
                @dragstart=${C=>C.preventDefault()}
                @click=${()=>this._onCoverClick()}
              >
                ${$i?_`<img
                      src=${$i}
                      alt=${re||""}
                      draggable="false"
                      @error=${()=>this._onArtError()}
                    />`:_`<span class="hm-cover-ph">${E("music",40)}</span>`}
              </button>
            </div>

            <div class="hm-info" data-side-lyrics=${Rt?"true":"false"}>
            <div class="hm-meta">
              <div class="hm-kicker">
                ${u||i("noMedia")}
                ${l.track?_`<span class="hm-kicker-sep">·</span>
                      <span>${i("track")} ${l.track}</span>`:x}
              </div>
              <h2 class="hm-title ${re?"":"placeholder"}">
                ${re||i("noTitle")}
              </h2>
              <div class="hm-artist">
                ${l.artist||(l.album?l.album:p)}
              </div>
              ${U||_t||ct?_`<div class="hm-tags">
                    ${U?_`<button
                          class="hm-chip interactive"
                          @click=${()=>{this._menu=this._menu==="source"?null:"source",this.requestUpdate()}}
                        >
                          <span class="hm-chip-label">${i("source")}</span>
                          <span class="hm-chip-value">${l.source||"\u2014"}</span>
                        </button>`:x}
                    ${_t?_`<button
                          class="hm-chip interactive"
                          @click=${()=>{this._menu=this._menu==="sound"?null:"sound",this.requestUpdate()}}
                        >
                          <span class="hm-chip-label">${i("soundMode")}</span>
                          <span class="hm-chip-value">${l.soundMode||"\u2014"}</span>
                        </button>`:x}
                    ${ct?_`<span
                          class="hm-chip ${z(o,q.GROUPING)?"interactive":""}"
                          title=${z(o,q.GROUPING)?`${i("group")} \xB7 ${i("groupLeave")}`:i("group")}
                          @click=${()=>{z(o,q.GROUPING)&&this._leaveGroup()}}
                        >
                          ${E("group",13)}
                          <span class="hm-group">
                            ${D.slice(0,3).map(C=>{let qt=t.states?.[C],zt=rt(t,qt?.attributes?.entity_picture);return _`<span
                                class="hm-group-avatar"
                                title=${vt(t,C,C)}
                                style=${zt?`background-image:url("${zt}")`:""}
                              ></span>`})}
                            ${D.length>3?_`<span class="hm-group-more">+${D.length-3}</span>`:x}
                          </span>
                        </span>`:x}
                  </div>`:x}
              ${Ai&&!Rt&&s==="full"&&!this._thumbMode()&&(this._panel||this._height>=360)?_`<div class="hm-now-lyric">
                    <span class="hm-now-lyric-mark">${E("lyrics",12)}</span>
                    <span>${Ai}</span>
                  </div>`:x}
            </div>
            ${Rt?this._renderLyrics(l,G,!0):x}
            </div>
          </section>`}

          ${Et!=="none"&&!this._lyricsOpen?_`<div
                class="hm-vis"
                data-playing=${h?"true":"false"}
                data-style=${Et}
              >
                ${this._renderVisualizer(Et,l)}
              </div>`:x}

          ${Z>0?_`<section class="hm-progress">
                <span class="hm-time">${st(G)}</span>
                <input
                  class="hm-range"
                  data-role="seek"
                  type="range"
                  min="0"
                  max=${Z}
                  step="0.01"
                  .value=${String(G)}
                  data-disabled=${L?"false":"true"}
                  style=${it({"--pct":`${Tt}%`})}
                  @input=${this._onSeekInput}
                  @change=${this._onSeekCommit}
                  aria-label=${i("seek")}
                />
                <span
                  class="hm-time end hoverable"
                  title=${i("remaining")}
                  @click=${()=>{this._showRemaining=!this._showRemaining,this.requestUpdate()}}
                >
                  ${this._showRemaining?`-${st(Math.max(Z-G,0))}`:st(Z)}
                </span>
              </section>`:x}

          <section class="hm-controls">
            <div class="hm-transport">
              ${b?_`<button
                    class="hm-btn"
                    data-role="shuffle"
                    data-on=${l.shuffle?"true":"false"}
                    aria-label=${i("shuffle")}
                    title=${i("shuffle")}
                    @click=${()=>this._shuffle()}
                  >
                    ${E("shuffle",18)}
                  </button>`:x}
              ${y?_`<button
                    class="hm-btn"
                    data-role="previous"
                    aria-label=${i("previous")}
                    title=${i("previous")}
                    @click=${()=>this._skip("prev")}
                  >
                    ${E("previous",18)}
                  </button>`:x}
              ${S?_`<button
                    class="hm-play ${h?"is-playing":""}"
                    aria-label=${i(h?"pause":"play")}
                    title=${i(h?"pause":"play")}
                    @click=${()=>this._togglePlay()}
                  >
                    ${h?E("pause",26):E("play",26)}
                  </button>`:x}
              ${w?_`<button
                    class="hm-btn"
                    aria-label=${i("next")}
                    title=${i("next")}
                    @click=${()=>this._skip("next")}
                  >
                    ${E("next",18)}
                  </button>`:x}
              ${g?_`<button
                    class="hm-btn"
                    data-role="repeat"
                    data-on=${bt!=="off"?"true":"false"}
                    aria-label=${i(bt==="one"?"repeatOne":bt==="all"?"repeatAll":"repeatOff")}
                    title=${i(bt==="one"?"repeatOne":bt==="all"?"repeatAll":"repeatOff")}
                    @click=${()=>this._repeat()}
                  >
                    ${E(bt==="one"?"repeatOne":"repeat",18)}
                  </button>`:x}
            </div>

            ${f?_`<div class="hm-volume">
                  <button
                    class="hm-icon-btn"
                    aria-label=${m.muted?i("unmute"):i("mute")}
                    title=${m.muted?i("unmute"):i("mute")}
                    @click=${()=>this._toggleMute()}
                  >
                    ${E(m.muted?"mute":"volume",16)}
                  </button>
                  <button
                    class="hm-icon-btn hm-vol-step"
                    aria-label=${i("volumeDown")}
                    title=${i("volumeDown")}
                    @click=${()=>this._volumeStep(-.05)}
                  >
                    ${E("minus",16)}
                  </button>
                  <input
                    class="hm-range"
                    data-role="volume"
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    .value=${String(Lt)}
                    style=${it({"--pct":`${Lt}%`})}
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
                    ${E("plus",16)}
                  </button>
                  <span class="hm-vol-pct">${Lt}%</span>
                </div>`:x}
          </section>
        </div>

        ${this._menu?_`<div class="hm-menu">
              <div class="hm-menu-head">
                ${this._menu==="source"?i("source"):i("soundMode")}
              </div>
              ${(this._menu==="source"?R:I).map(C=>_`<button
                  class="hm-menu-item"
                  data-active=${(this._menu==="source"?l.source:l.soundMode)===C?"true":"false"}
                  @click=${()=>this._menu==="source"?this._selectSource(C):this._selectSoundMode(C)}
                >
                  <span>${C}</span>
                  <span class="hm-menu-check">${E("check",13)}</span>
                </button>`)}
            </div>`:x}

        ${this._renderDrawer()}

        <div class="hm-toast ${this._toast?"show":""}">${this._toast}</div>
      </div>
    `}_renderVisualizer(t,e){let i=de(e);if(t==="wave"){let s=7+i.energy*6+i.low*7,r=4.5+i.pulse*5.5,a=2.2+i.pulse*3.2,o=i.phase,l=`${(i.period*2.4).toFixed(2)}s`;return _`<div class="hm-wave-wrap">
        <svg
          viewBox="0 0 600 40"
          preserveAspectRatio="none"
          aria-hidden="true"
          style=${it({animationDuration:l})}
        >
          <path
            d=${fi(600,40,150,s,o)}
            fill="none"
            stroke="rgba(var(--hm-a1-rgb), 0.85)"
            stroke-width="1.4"
          ></path>
          <path
            d=${fi(600,40,150,r,o*1.35+1.9)}
            fill="none"
            stroke="rgba(var(--hm-a2-rgb), 0.6)"
            stroke-width="1.2"
          ></path>
          <path
            d=${fi(600,40,75,a,o*1.7+3.2)}
            fill="none"
            stroke="rgba(var(--hm-a1-rgb), 0.35)"
            stroke-width="0.9"
          ></path>
        </svg>
      </div>`}return t==="orbit"?_`<div class="hm-orbit-wrap">
        ${[1,.58,.34].map((r,a)=>{let o=a===0?i.low:i.pulse;return _`<span
            class="hm-orbit-ring"
            style=${it({"--react":String(r),"--drive":o.toFixed(3),animationDuration:`${(i.period*(1.8+a*.25)).toFixed(2)}s`,animationDelay:`${(a*i.period*.55).toFixed(2)}s`})}
          ></span>`})}
      </div>`:_`<canvas class="hm-spectrum" aria-hidden="true"></canvas>`}_stopSpectrum(){this._spectrumRaf&&cancelAnimationFrame(this._spectrumRaf),this._spectrumRaf=null,this._spectrumLast=0,this._spectrumPaintAt=0}_spectrumPlaying(){let t=this._state()?.state;return t==="playing"||t==="buffering"}_resetAudioShape(){this._bandLevels=Object.assign([.18,.14,.1],{live:!1}),this._bandPeaks=[0,0,0],this._audioShape={bars:[],mean:[],prev:[],peak:0,lowFast:0,lowSlow:0,fluxMean:.02,beatEnv:0,punch:0,low:0}}_ensureAudioShape(t){this._audioShape||this._resetAudioShape();let e=this._audioShape;return e.mean.length!==t&&(e.mean=new Array(t).fill(0),e.prev=new Array(t).fill(0),e.bars=new Array(t).fill(0),e.peak=0,e.lowFast=0,e.lowSlow=0,e.fluxMean=.02,e.beatEnv=0),e}_ensureSpectrumPlaylist(){let t=this._spectrumPlaylistUrl;if(!t||this._spectrumPlaylistLoading)return;let e=Date.now();if(this._spectrumPlaylist&&e-this._spectrumPlaylistAt<10*60*1e3||!this._spectrumPlaylist&&this._spectrumPlaylistErrorAt&&e-this._spectrumPlaylistErrorAt<60*1e3)return;this._spectrumPlaylistLoading=!0;let i=typeof AbortController<"u"?new AbortController:null;this._spectrumPlaylistAbort=i,fetch(t,{cache:"no-store",signal:i?.signal}).then(s=>{if(!s.ok)throw new Error(String(s.status));return s.json()}).then(s=>{let r=Je(s);if(!r.length)throw new Error("empty playlist");this._spectrumPlaylist=r,this._spectrumPlaylistAt=Date.now(),this._spectrumPlaylistErrorAt=0,this._spectrumResolvedUrl="",this._spectrumTrack=null,this._syncSpectrumTrack(this._readMedia()),this._syncSpectrum()}).catch(s=>{s?.name!=="AbortError"&&(this._spectrumPlaylistErrorAt=Date.now())}).finally(()=>{this._spectrumPlaylistAbort===i&&(this._spectrumPlaylistAbort=null),this._spectrumPlaylistLoading=!1})}_syncSpectrumTrack(t=this._readMedia()){let e=this._spectrumAudioUrl,i=null;if(this._spectrumPlaylistUrl&&(this._ensureSpectrumPlaylist(),this._spectrumPlaylist&&(i=Zi(this._spectrumPlaylist,t),i?.url&&(e=i.url))),e===this._spectrumResolvedUrl&&i===this._spectrumTrack)return e;this._spectrumResolvedUrl=e||"",this._spectrumTrack=i,this._audioFailedUrl="";let s=this._audioGestureArmed;return this._resetAudioShape(),this._teardownAudioSpectrum(),s&&this._spectrumResolvedUrl&&(this._audioGestureArmed=!0,this._ensureAudioSpectrum(),this._startAudioElement()),this._spectrumResolvedUrl}_primeAudioSpectrum(){(this._config?.visualizer||"bars")==="bars"&&(this._audioGestureArmed=!0,this._audioFailedUrl="",this._audioZeroFrames=0,this._spectrumResolvedUrl||this._syncSpectrumTrack(this._readMedia()),this._spectrumResolvedUrl&&(this._ensureAudioSpectrum(),this._resumeAudioContext(),this._startAudioElement()))}_ensureAudioSpectrum(){let t=this._spectrumResolvedUrl;if(!t||this._audioFailedUrl===t)return null;if(this._audioEl&&this._audioAnalyser&&this._audioBins)return this._audioAnalyser;this._audioEl&&this._teardownAudioSpectrum();try{let e=window.AudioContext||window.webkitAudioContext;if(!e)return this._failAudioSpectrum(),null;if(!Ji(t,typeof location<"u"?location.href:""))return this._audioFailedUrl=t,null;let i=new Audio;i.crossOrigin="anonymous",i.preload="auto",i.setAttribute("playsinline",""),i.addEventListener("error",()=>this._failAudioSpectrum()),i.src=t,i.load();let s=new e,r=s.createMediaElementSource(i),a=s.createAnalyser();a.fftSize=2048,a.smoothingTimeConstant=.55,a.minDecibels=-84,a.maxDecibels=-30,r.connect(a);let o=s.createGain();return o.gain.value=0,a.connect(o),o.connect(s.destination),this._audioEl=i,this._audioCtx=s,this._audioSource=r,this._audioAnalyser=a,this._audioMute=o,this._audioBins=new Uint8Array(a.frequencyBinCount),this._resetAudioShape(),a}catch{return this._failAudioSpectrum(),null}}_resumeAudioContext(){this._audioCtx?.state==="suspended"&&this._audioCtx.resume().catch(()=>{})}_startAudioElement(){let t=this._audioEl;if(!t||!this._audioGestureArmed)return;this._resumeAudioContext();let e=t.play();e?.catch&&e.catch(()=>{}),this._audioStartedAt=performance.now()}_pauseAudioSpectrum(){this._audioEl?.pause()}_teardownAudioSpectrum(){let t=this._audioEl;if(t)try{t.pause(),t.removeAttribute("src"),t.load()}catch{}try{this._audioSource?.disconnect(),this._audioAnalyser?.disconnect(),this._audioMute?.disconnect()}catch{}this._audioCtx&&this._audioCtx.close().catch(()=>{}),this._audioEl=null,this._audioCtx=null,this._audioSource=null,this._audioAnalyser=null,this._audioMute=null,this._audioBins=null,this._audioZeroFrames=0,this._audioPeak=0,this._audioStartedAt=0,this._audioGestureArmed=!1,this._resetAudioShape()}_failAudioSpectrum(){this._spectrumResolvedUrl&&(this._audioFailedUrl=this._spectrumResolvedUrl,this._teardownAudioSpectrum())}_syncAudioPlayback(t,e){let i=this._audioEl;if(!i)return;if(!t){i.pause();return}this._audioGestureArmed&&i.paused&&this._startAudioElement();let s=i.duration,r=Number(e.duration),a=Number.isFinite(s)&&s>0&&Number.isFinite(r)&&r>0&&Math.abs(s-r)<5,o=!a&&!r&&Number.isFinite(s)&&s>0&&Number.isFinite(e.position)&&e.position>0&&e.position<s-1;if((a||o)&&i.readyState>=1&&Number.isFinite(i.currentTime)&&Number.isFinite(e.position)&&Math.abs(i.currentTime-e.position)>2.5)try{i.currentTime=e.position}catch{}}_audioSpectrumReady(){return!!(this._audioEl&&!this._audioEl.paused&&this._audioEl.readyState>=2&&this._audioAnalyser&&this._audioBins&&this._audioCtx?.state==="running"&&this._audioFailedUrl!==this._spectrumResolvedUrl)}_readAudioLevels(t){let e=this._audioAnalyser,i=this._audioBins,s=this._audioCtx;if(!e||!i||!s)return null;e.getByteFrequencyData(i);let r=s.sampleRate/2,a=100,o=Math.min(6500,r),l=s.sampleRate/e.fftSize,c=Math.max(1,Math.floor(a/l)),h=Math.min(i.length-1,Math.max(c+1,Math.ceil(o/l))),d=h/c,p=new Array(t),u=0;for(let y=0;y<t;y+=1){let w=t>1?y/(t-1):0,S=t>1?(y+1)/(t-1):1,A=v(Math.floor(c*Math.pow(d,Math.pow(w,.6))),c,h),k=v(Math.max(A+1,Math.ceil(c*Math.pow(d,Math.pow(S,.6)))),A,h),M=0,$=0,P=0;for(let I=A;I<=k;I+=1){let U=i[I]||0;U>P&&(P=U),M+=U,$+=1}let L=$?M/$:0,R=.7+3.5*Math.pow(t>1?y/(t-1):0,1.15);p[y]=v(L/255*R,0,1.6),P>u&&(u=P)}let m=s.sampleRate/2,f=[[40,250],[250,1600],[1600,Math.min(8e3,m)]],b=[1.05,1.28,1.6],g=f.map(([y,w],S)=>{let A=v(Math.floor(y/l),0,i.length-1),k=v(Math.ceil(w/l),A,i.length-1),M=0,$=0;for(let L=A;L<=k;L+=1)M+=i[L]||0,$+=1;let P=$?M/$/255:0;return v(P*b[S]*1.75,0,1)});return this._audioPeak=u,{levels:p,bands:g}}_shapeAudioBars(t){let e=t.length,i=this._ensureAudioShape(e),s=0,r=0,a=0;for(let u=0;u<e;u+=1){let m=t[u]||0;m>s&&(s=m),u<Math.max(3,Math.floor(e/12))&&(r+=m,a+=1)}let o=Math.max(s,i.peak*.978,.05);i.peak=o;let l=a?r/a:0;i.lowFast+=(l-i.lowFast)*.42,i.lowSlow+=(l-i.lowSlow)*.052;let c=i.lowSlow>.001?(i.lowFast-i.lowSlow)/i.lowSlow:0;c=v(c,0,1.6);let h=0;for(let u=0;u<e;u+=1){let m=t[u]-(i.prev[u]||0);m>0&&(h+=m),i.prev[u]=t[u]||0}i.fluxMean+=(h-i.fluxMean)*.04;let d=i.fluxMean>.004?h/(i.fluxMean*2.6)-.4:0;d=v(d,0,1),i.beatEnv=d>i.beatEnv?d:i.beatEnv*.86;let p=new Array(e);for(let u=0;u<e;u+=1){let m=t[u]||0,f=e>1?u/(e-1):0,b=Math.min(.6,m/o),g=i.mean[u]||(m>0?m:.02),y=m/Math.max(.015,g);i.mean[u]=g+(m-g)*.035;let w=Math.pow(f,.6),S=.12+(1.45-.12)*w,A=.94+(.45-.94)*w,k=v((y-A)/S,0,1),M=.72+.22*f,$=b*(1-M)+k*M,P=1.35+.42*(1-f),L=Math.pow(1-f,2),R=$*(1-.28*L*(1-i.beatEnv))+.65*i.beatEnv*L;p[u]=v(R*P*(1+.12*c),0,1)}return i.punch=c,i.low=v((p[0]+p[1]+p[2])/3,0,1),{bars:p,punch:c,low:i.low}}_spectrumAccent(){let t=N[this._themeKey()]||N[O],e=String(this._config?.accent||"");return[/^#[0-9a-f]{3,8}$/i.test(e)?e:t.accent[0],t.accent[1]]}_syncSpectrumCanvas(){let t=this.renderRoot?.querySelector?.(".hm-spectrum");if(!t)return this._spectrumCanvas=null,this._spectrumCtx=null,this._spectrumCount=0,!1;let e=t.getBoundingClientRect(),i=Math.max(1,Math.round(e.width)),s=Math.max(1,Math.round(e.height));if(!i||!s)return!1;let r=Math.min(this._isMobileUi()?1.5:2,Math.max(1,Number(window.devicePixelRatio)||1)),a=Math.round(i*r),o=Math.round(s*r);t.width!==a&&(t.width=a),t.height!==o&&(t.height=o),t.style.width=`${i}px`,t.style.height=`${s}px`,this._spectrumCanvas=t;let l=t.getContext("2d");l!==this._spectrumCtx&&(this._spectrumGrad=null),this._spectrumCtx=l,this._spectrumCssW=i,this._spectrumCssH=s,this._spectrumDpr=r;let c=v(Math.round(i/7),48,300);return c!==this._spectrumCount&&(this._spectrumCount=c,this._spectrumLevels=new Array(c).fill(.12)),!0}_drawSpectrum(t,e=!1){let i=this._spectrumCtx,s=this._spectrumCssW,r=this._spectrumCssH,a=this._spectrumDpr,o=t?.length||0;if(!i||!s||!r||!o)return;i.setTransform(a,0,0,a,0,0),i.clearRect(0,0,s,r);let l=s/o,c=Math.min(2.4,Math.max(1.2,l*.34)),h=Math.max(1,l-c),d=Math.min(1.5,h/2),p=this._spectrumAccent(),u=this._isMobileUi(),m=`${p[0]}|${p[1]}|${s}`;if(!this._spectrumGrad||this._spectrumGradKey!==m){let f=i.createLinearGradient(0,0,s,0);f.addColorStop(0,p[0]),f.addColorStop(1,p[1]),this._spectrumGrad=f,this._spectrumGradKey=m}i.fillStyle=this._spectrumGrad,u&&(i.globalAlpha=e?.5:.84);for(let f=0;f<o;f+=1){let b=v(Number(t[f])||0,.02,1),g=Math.max(2,b*r),y=f*l+(l-h)/2,w=r-g;u||(i.globalAlpha=e?.5:.58+b*.36),!u&&typeof i.roundRect=="function"&&h>=3?(i.beginPath(),i.roundRect(y,w,h,g,[d,d,0,0]),i.fill()):i.fillRect(y,w,h,g)}i.globalAlpha=1}_syncSpectrum(){if(!this.renderRoot?.querySelector?.(".hm-spectrum")||this._thumbPreview||(this._config?.visualizer||"bars")!=="bars"){this._spectrumCanvas=null,this._spectrumCtx=null,this._spectrumCount=0,this._stopSpectrum(),this._teardownAudioSpectrum();return}if(!this._syncSpectrumCanvas())return;let e=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches;if(!this._spectrumPlaying()||e){this._stopSpectrum(),this._syncAudioPlayback(!1,this._readMedia()),this._applySpectrumIdle();return}let i=this._readMedia();this._syncSpectrumTrack(i),this._ensureAudioSpectrum(),this._syncAudioPlayback(!0,i),!this._spectrumRaf&&(this._spectrumLast=0,this._spectrumRaf=requestAnimationFrame(s=>this._spectrumTick(s)))}_applySpectrumIdle(){let t=de(this._readMedia()),e=this._spectrumCount;if(!e)return;this._spectrumLevels.length!==e&&(this._spectrumLevels=new Array(e).fill(.12));let i=this._spectrumLevels,s=e/3;for(let r=0;r<e;r+=1){let a=r<s?0:r<s*2?1:2,o=.12+[.1,.06,.03][a],l=Math.min(.24,o+t.energy*.04);i[r]=l}this._drawSpectrum(i,!0)}_maAnalysisAvailable(){let t=this._hass?.services;return!!(t?.ha_music_analysis?.get_track_analysis||t?.ha_music_analysis?.get_track_analysis)}_ensureMaAnalysis(t,e){if(!this._maAnalysisAvailable()||!e||!this._eid()||this._maAnalysis?.key===e||this._maAnalysisLoadingKey===e||this._maAnalysisFailedKey===e&&Date.now()-this._maAnalysisFailedAt<60*1e3)return;this._maAnalysisLoadingKey=e;let i=this._eid(),s;try{s=this._hass.callService("ha_music_analysis","get_track_analysis",{entity_id:i},void 0,!1,!0)}catch{this._maAnalysisLoadingKey="",this._maAnalysisFailedKey=e,this._maAnalysisFailedAt=Date.now();return}Promise.resolve(s).then(r=>{let a=r?.service_response??r?.response??r,o=a?.[i]??a,l=Array.isArray(o?.waveform)?o.waveform:Array.isArray(o)?o:null;if(!l?.length){this._maAnalysisFailedKey=e,this._maAnalysisFailedAt=Date.now();return}this._maAnalysis={key:e,waveform:l,bpm:Number(o?.bpm)||0,energy:Number(o?.energy)||0,duration:Number(o?.duration)||Number(t.duration)||0,title:o?.title||"",artist:o?.artist||"",source:o?.bpm_source||""},this._maAnalysisKey=e,this._maAnalysisAt=Date.now(),this._maAnalysisFailedKey="",this._maAnalysisFailedAt=0,this._resetAudioShape()}).catch(()=>{this._maAnalysisFailedKey=e,this._maAnalysisFailedAt=Date.now()}).finally(()=>{this._maAnalysisLoadingKey===e&&(this._maAnalysisLoadingKey="")})}_maSpectrumShaped(t,e){let i=this._maAnalysis;if(!i||i.key!==this._spectrumKey||!i.waveform?.length)return null;let s=i.waveform,r=i.duration||Number(e.duration)||0,a=Number(e.position)||0,l=(r>0?v(a/r,0,.999):0)*(s.length-1),c=r>0?s.length/Math.max(1,r):s.length/180,h=v(Math.round(c*2.8),8,Math.min(s.length,240)),d=Math.max(1,h/Math.max(1,t-1)),p=Math.max(1,Math.round(c*.14)),u=new Array(t),m=Number(i.bpm)||0,f=m>20?60/m:0;for(let D=0;D<t;D+=1){let ct=t>1?D/(t-1):0,ie=v(Math.round(l-(t-1-D)*d),0,s.length-1),Te=v(ie-p,0,s.length-1),se=Number(s[ie])||0,Et=Number(s[Te])||0,Le=Math.max(0,se-Et),Z=1-.52*Math.pow(ct,.85),G=Math.pow(1-ct,2),Tt=v(Le*4.2,0,1);if(f>0){let Lt=(a%f+f)%f/f;Tt=Math.max(Tt,Math.exp(-Lt*5.2))}u[D]=v(se*(1.42*Z+.2)+Tt*.56*G,0,1.6)}let b=this._shapeAudioBars(u),g=v(Math.round(l),0,s.length-1),y=v(g-p,0,s.length-1),w=Number(s[g])||0,S=Math.max(0,w-(Number(s[y])||0)),A=Math.max(4,Math.round((c||60)*1.2)),k=Math.max(0,Math.round(l-A)),M=0,$=0;for(let D=k;D<=g;D+=1)M+=Number(s[D])||0,$+=1;let P=$?M/$:0,L=f>0?(a%f+f)%f/f:0,R=f>0?Math.exp(-L*4.6):0,I=v(P*1.3+R*.3+.02,0,1),U=v(w+R*.05+.01,0,1),_t=v(S*4.5+Math.max(0,w-P)*1.2+.02,0,1);return{...b,bands:[I,U,_t]}}_spectrumTick(t){if(!this._spectrumCanvas||!this._spectrumCount){this._stopSpectrum();return}if(!this._spectrumPlaying()){this._applySpectrumIdle(),this._syncAudioPlayback(!1,this._readMedia()),this._stopSpectrum();return}if(t-(this._spectrumSizeAt||0)>500&&(this._spectrumSizeAt=t,!this._syncSpectrumCanvas())){this._stopSpectrum();return}if(this._isMobileUi()&&this._spectrumPaintAt&&t-this._spectrumPaintAt<32){this._spectrumRaf=requestAnimationFrame(g=>this._spectrumTick(g));return}this._spectrumPaintAt=t;let e=this._spectrumLast?Math.min(.05,Math.max(.001,(t-this._spectrumLast)/1e3)):.016;this._spectrumLast=t;let i=this._readMedia(),s=de(i),r=this._trackKey(this._state());r!==this._spectrumKey&&(this._spectrumKey=r,this._spectrumLevels=new Array(this._spectrumCount).fill(.12),this._syncSpectrumTrack(i)),this._ensureMaAnalysis(i,r);let a=t/1e3,o=this._spectrumLevels,l=this._spectrumCount,c=this._audioSpectrumReady(),h=c?this._readAudioLevels(l):null,d=h?.levels||null,u=(d?this._shapeAudioBars(d):null)?.bars||null,m=u?null:this._maSpectrumShaped(l,i),f=m?.bars||null,b=h?.bands||m?.bands||null;if(b){this._bandLevels.live=!0;for(let g=0;g<this._bandLevels.length;g+=1){let y=this._bandLevels[g]||0,w=b[g]||0,S=w>y?.42:.16;this._bandLevels[g]=y+(w-y)*S}}else{this._bandLevels.live=!1;for(let g=0;g<this._bandLevels.length;g+=1)this._bandLevels[g]=Math.max(.06,this._bandLevels[g]*.9)}c&&(!this._audioPeak&&t-this._audioStartedAt>1500?(this._audioZeroFrames+=1,this._audioZeroFrames>90&&this._failAudioSpectrum()):this._audioPeak&&(this._audioZeroFrames=0));for(let g=0;g<l;g+=1){let y;if(u||f){y=(u||f)[g];let M=g<l/3?0:g<l*2/3?1:2,$=this._bandLevels[M]||0;y=v(y*(.58+$*.48),.03,1)}else{let M=g<l/3?0:g<l*2/3?1:2,$=V(`${s.seed}#${g}`),P=$%360/360*Math.PI*2,R=1.02-g/Math.max(1,l-1)*.5+Math.sin(g*1.7+P)*.1,I=.5+.5*Math.sin(a*2.35+P+g*.28),U=.5+.5*Math.sin(a*7.6+P*1.7+g*.62),_t=.5+.5*Math.sin(i.position/(1.65+s.hash%45/100)*Math.PI*2+P),D=M===0?s.low:M===1?s.pulse:.45,ct=Math.sin(a*3.3+$*7e-4)>.88?1.16:1;y=v(R*(.52+I*.54)*(.76+U*.34)*(.8+_t*.4)*(.86+D*.24)*ct,.1,1)}y=v(.055+Math.pow(v(y,0,1),1.6)*.76,.045,.82);let w=Number.isFinite(o[g])?o[g]:.12,S=u||f,A=y>w?S?.72:.52:S?.22:.24,k=w+(y-w)*(1-Math.exp(-A*e*60));o[g]=k}this._drawSpectrum(o),this._spectrumRaf=requestAnimationFrame(g=>this._spectrumTick(g))}_renderDrawer(){let t=this._drawer,e=F(this._hass?.language),i=t.mode==="library",s=t.mode==="playlists",r=t.mode==="queue";return _`
      <div
        class="hm-drawer ${t.open?"open":""}"
        role="dialog"
        aria-hidden=${t.open?"false":"true"}
      >
        <div class="hm-drawer-head">
          ${i&&t.cursor>=0?_`<button
                class="hm-icon-btn"
                aria-label=${e("back")}
                title=${e("back")}
                @click=${()=>this._browseBack()}
              >
                ${E("chevronLeft",16)}
              </button>`:x}
          <div class="hm-drawer-title">${t.title||(i?e("library"):"")}</div>
          ${(s||r&&t.maUrl)&&t.maUrl?_`<button
                class="hm-icon-btn hm-ma"
                aria-label=${e("openAssistant")}
                title=${e("openAssistant")}
                @click=${()=>this._openAssistant()}
              >
                ${E("external",15)}
              </button>`:x}
          <button
            class="hm-icon-btn"
            aria-label=${e("close")}
            title=${e("close")}
            @click=${()=>this._closeDrawer()}
          >
            ${E("close",16)}
          </button>
        </div>
        <div class="hm-drawer-body">
          ${r&&t.note?_`<div class="hm-drawer-note">${t.note}</div>`:x}
          ${t.loading?_`<div class="hm-empty"><span class="hm-spinner"></span></div>`:t.error?_`<div class="hm-empty">${t.error}</div>`:t.items.length?this._renderDrawerItems(t.items,t.mode):_`<div class="hm-empty">
                    ${e(i?"browseFailed":s?"playlistsEmpty":"queueEmpty")}
                  </div>`}
        </div>
      </div>
    `}_renderDrawerItems(t,e){let i=F(this._hass?.language),s=e==="library",r=e==="playlists";return t.map(a=>{if(r){let l=rt(this._hass,a.thumb);return _`<button
          class="hm-list-item"
          data-empty=${a.empty?"true":"false"}
          @click=${()=>this._playPlaylistItem(a)}
        >
          <span
            class="hm-list-thumb"
            style=${l?`background-image:url("${l}")`:""}
          >
            ${l?x:E("playlist",16)}
          </span>
          <span class="hm-list-text">
            <span class="hm-list-name">${a.title||"\u2014"}</span>
            <span class="hm-list-sub">${a.empty?i("playlistUnavailable"):a.subtitle}</span>
          </span>
          <span class="hm-list-tail">${E("play",14)}</span>
        </button>`}if(s){let l=rt(this._hass,a.thumb);return _`<button
          class="hm-list-item"
          @click=${()=>this._enterBrowseItem(a)}
        >
          <span
            class="hm-list-thumb"
            style=${l?`background-image:url("${l}")`:""}
          >
            ${l?x:E(a.canExpand?"library":"music",16)}
          </span>
          <span class="hm-list-text">
            <span class="hm-list-name">${a.title||"\u2014"}</span>
            <span class="hm-list-sub">${a.subtitle}</span>
          </span>
          <span class="hm-list-tail">
            ${a.canExpand?E("chevronRight",14):x}
          </span>
        </button>`}let o=rt(this._hass,a.art);return _`<button
        class="hm-list-item"
        data-active=${a.active?"true":"false"}
        @click=${()=>this._playQueueItem(a)}
      >
        <span
          class="hm-list-thumb"
          style=${o?`background-image:url("${o}")`:""}
        >
          ${o?x:E("music",16)}
        </span>
        <span class="hm-list-text">
          <span class="hm-list-name">${a.title||i("noTitle")}</span>
          <span class="hm-list-sub">${a.artist||a.album||""}</span>
        </span>
        <span class="hm-list-tail">${a.duration?st(a.duration):""}</span>
      </button>`})}static getStubConfig(t){let e=t?.states||{};return{entity:Object.keys(e).find(s=>s.startsWith("media_player.")&&e[s]?.attributes?.supported_features!==void 0)||"",theme:O}}static getConfigElement(){return document.createElement("ha-music-editor")}};customElements.get("ha-music")||(customElements.define("ha-music",gi),window.customCards=window.customCards||[],window.customCards.push({type:Yi,name:Xi,description:"\u73B0\u4EE3\u70AB\u9177\u914D\u8272\u7684\u5168\u529F\u80FD\u97F3\u4E50\u64AD\u653E\u5668\u5361\u7247\uFF1A\u5C01\u9762\u53D6\u8272\u3001\u9891\u8C31\u53EF\u89C6\u5316\u3001\u5A92\u4F53\u5E93\u6D4F\u89C8\u3001\u64AD\u653E\u961F\u5217\u3001\u591A\u8BBE\u5907\u5207\u6362\u3002",preview:!0,documentationURL:"https://github.com/RockJesus/ha-music"}),console.info(`%c HA-MUSIC %c v${Gi} `,"background:#2ee6c5;color:#04121a;font-weight:700;border-radius:4px 0 0 4px","background:#7b5cff;color:#fff;border-radius:0 4px 4px 0"));function Vr(n,t){n.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}var _i=class extends j{static get properties(){return{hass:{attribute:!1},_config:{state:!0}}}static get styles(){return It`
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
    `}constructor(){super(),this._config={},this._lang="en",this._pendingEntity=!1}setConfig(t){let e=Array.isArray(t?.entities)?t.entities.filter(i=>typeof i=="string"&&i.trim()):void 0;this._config={...t,...e?{entities:e}:{}}}willUpdate(){let t=this.hass?.language||this._lang;t!==this._lang&&(this._lang=t)}get _zh(){return ce(this._lang||this.hass?.language)}_update(t){let e={...this._config,...t};Object.keys(e).forEach(i=>{e[i]===void 0&&delete e[i]}),this._config=e,Vr(this,e)}_optionLabel(t){return this._zh?t.zh:t.en}_dockModes(){let t=W();return t?t.modes:K(this._config?.dock)}_dockEntities(){let t=W();return t?t.entities:ot(this._config?.dock_entities)}_dockThemes(){let t=W();return t?t.themes:Q(this._config?.dock_themes)}_syncDockGlobal(t={}){let e=K(t.dock??this._dockModes()),i=ot(t.dock_entities??this._dockEntities()),s=Q(t.dock_themes??this._dockThemes());ve({modes:e,entities:i,themes:s})}_setDockTheme(t,e){let i={...this._dockThemes()};e?i[t]=e:delete i[t],this._update({dock_themes:i,dock_edited:Date.now()}),this._syncDockGlobal({dock_themes:i})}_mainEntity(){return this._entities()[0]||this._config?.entity||""}_toggleDock(t,e){let i=this._dockModes(),s=this._dockEntities(),r;e?(r=i.includes(t)?i:[...i,t],!s[t]&&this._mainEntity()&&(s[t]=this._mainEntity())):r=i.filter(a=>a!==t),this._update({dock:r.length?r:"none",dock_entities:s,dock_edited:Date.now()}),this._syncDockGlobal({dock:r.length?r:"none",dock_entities:s})}_setDockEntity(t,e){let i={...this._dockEntities(),[t]:e||""},s=this._dockModes();!i[t]&&s.includes(t)&&this._mainEntity()&&(i[t]=this._mainEntity()),i[t]||delete i[t],this._update({dock_entities:i,dock_edited:Date.now()}),this._syncDockGlobal({dock_entities:i})}_entities(){return Array.isArray(this._config.entities)&&this._config.entities.length?this._config.entities:[]}_setEntity(t,e){let i=this._entities();if(!i.length){this._update({entity:e||void 0});return}let s=[...i];s[t]=e,this._update({entities:s})}_addEntity(){this._pendingEntity||(this._pendingEntity=!0,this.requestUpdate())}_commitPendingEntity(t){let e=String(t||"").trim();if(this._pendingEntity=!1,!e){this.requestUpdate();return}let i=this._entities();if(i.length){this._update({entities:[...i,e]});return}let s=String(this._config?.entity||"").trim();this._update({entity:void 0,entities:s?[s,e]:[e]})}_cancelPendingEntity(){this._pendingEntity=!1,this.requestUpdate()}_removeEntity(t){let e=this._entities().filter((i,s)=>s!==t);if(e.length<=1){this._update({entity:e[0]||void 0,entities:void 0});return}this._update({entities:e})}render(){let t=this._config||{},e=this._entities(),i=this._dockModes(),s=this._dockEntities(),r=(a,o,l)=>_`
      <ha-entity-picker
        .hass=${this.hass}
        .value=${a||""}
        .includeDomains=${["media_player"]}
        .allowCustomEntity=${!1}
        .label=${l}
        @value-changed=${c=>{c.stopPropagation(),o(c.detail?.value??"")}}
      ></ha-entity-picker>
    `;return _`
      <div class="wrap">
        <div class="section">
          <div class="section-title">${this._zh?"\u64AD\u653E\u5668":"Player"}</div>
          ${e.length?e.map((a,o)=>_`
                  <div class="entity-row">
                    ${r(a,l=>this._setEntity(o,l),o===0?this._zh?"\u64AD\u653E\u5668":"Player":this._zh?"\u8BBE\u5907":"Player")}
                    <button
                      class="mini-btn"
                      @click=${()=>this._removeEntity(o)}
                      title=${this._zh?"\u79FB\u9664":"Remove"}
                    >
                      ${this._zh?"\u79FB\u9664":"Remove"}
                    </button>
                  </div>
                `):_`<div class="entity-row">
                ${r(t.entity||"",a=>this._setEntity(0,a),this._zh?"\u64AD\u653E\u5668":"Player")}
              </div>`}
          ${this._pendingEntity?_`<div class="entity-row">
                ${r("",a=>this._commitPendingEntity(a),this._zh?"\u9009\u62E9\u8981\u6DFB\u52A0\u7684\u64AD\u653E\u5668":"Pick a player to add")}
                <button class="mini-btn" @click=${()=>this._cancelPendingEntity()}>
                  ${this._zh?"\u53D6\u6D88":"Cancel"}
                </button>
              </div>`:x}
          <button class="mini-btn add" @click=${()=>this._addEntity()}>
            ${this._zh?"\uFF0B \u6DFB\u52A0\u64AD\u653E\u5668":"\uFF0B Add player"}
          </button>
          ${e.length?_`<div class="hint">
                ${this._zh?"\u591A\u8BBE\u5907\u6A21\u5F0F\uFF1A\u5361\u7247\u9876\u90E8\u4F1A\u51FA\u73B0\u8BBE\u5907\u5207\u6362\u6807\u7B7E\u3002":"Multi-player mode adds switching chips on top of the card."}
              </div>`:x}
        </div>

        <div class="section">
          <div class="section-title">${this._zh?"\u5916\u89C2":"Appearance"}</div>
          <div class="grid2">
            <label class="field">
              <span class="label">${this._zh?"\u5E03\u5C40":"Layout"}</span>
              <select
                .value=${t.layout||"adaptive"}
                @change=${a=>this._update({layout:a.target.value})}
              >
                ${Object.keys(We).map(a=>_`<option value=${a} ?selected=${t.layout===a}>
                      ${this._optionLabel(We[a])}
                    </option>`)}
              </select>
            </label>
            <label class="field">
              <span class="label">${this._zh?"\u4E3B\u9898":"Theme"}</span>
              <select
                .value=${t.theme||O}
                @change=${a=>this._update({theme:a.target.value})}
              >
                ${Object.keys(N).map(a=>_`<option value=${a} ?selected=${t.theme===a}>
                      ${this._optionLabel(N[a].label)}
                    </option>`)}
              </select>
            </label>
            <label class="field">
              <span class="label">${this._zh?"\u80CC\u666F":"Background"}</span>
              <select
                .value=${t.cover||"ambient"}
                @change=${a=>this._update({cover:a.target.value})}
              >
                ${Object.keys(Qe).map(a=>_`<option value=${a} ?selected=${t.cover===a}>
                      ${this._optionLabel(Qe[a])}
                    </option>`)}
              </select>
            </label>
            <label class="field">
              <span class="label">${this._zh?"\u9891\u8C31\u52A8\u6548":"Visualizer"}</span>
              <select
                .value=${t.visualizer||"bars"}
                @change=${a=>this._update({visualizer:a.target.value})}
              >
                ${Object.keys(Ge).map(a=>_`<option value=${a} ?selected=${t.visualizer===a}>
                      ${this._optionLabel(Ge[a])}
                    </option>`)}
              </select>
            </label>
          </div>
          <label class="field">
            <span class="label">
              ${this._zh?"\u9891\u8C31\u6B4C\u5355 JSON\uFF08\u53EF\u9009\uFF09":"Spectrum playlist JSON (optional)"}
            </span>
            <input
              type="url"
              .value=${t.spectrum_playlist_url||""}
              placeholder="/local/community/ha-music/playlist.json"
              @change=${a=>this._update({spectrum_playlist_url:a.target.value.trim()||void 0})}
            />
          </label>
          <label class="field">
            <span class="label">
              ${this._zh?"\u9891\u8C31\u97F3\u9891\u6E90\uFF08\u53EF\u9009\uFF09":"Spectrum audio URL (optional)"}
            </span>
            <input
              type="url"
              .value=${t.spectrum_audio_url||""}
              placeholder="https://…/track.mp3"
              @change=${a=>this._update({spectrum_audio_url:a.target.value.trim()||void 0})}
            />
          </label>
          <div class="hint">
            ${this._zh?"\u6B4C\u5355 JSON \u652F\u6301 tracks/audios \u6570\u7EC4\uFF0C\u5361\u7247\u6309\u5F53\u524D\u66F2\u76EE\u7684 QQ mid\u3001\u6B4C\u540D\u548C\u6B4C\u624B\u5339\u914D url\uFF1B\u5339\u914D\u4E0D\u5230\u518D\u56DE\u9000\u5355\u66F2\u97F3\u9891\u6E90\uFF0C\u6700\u540E\u56DE\u9000\u9010\u5E27\u5F8B\u52A8\u3002\u97F3\u9891\u6E90\u5FC5\u987B\u5141\u8BB8\u8DE8\u57DF\u3002":"Playlist JSON may contain tracks/audios arrays; the card matches the current QQ mid, title and artist to choose its url. If no match, it falls back to the single audio URL, then to procedural motion. Audio sources must allow CORS."}
          </div>
          <label class="field">
            <span class="label">${this._zh?"\u6807\u9898\uFF08\u7559\u7A7A\u7528\u5B9E\u4F53\u540D\u79F0\uFF09":"Title (optional)"}</span>
            <input
              type="text"
              .value=${t.name||""}
              @input=${a=>this._update({name:a.target.value||void 0})}
            />
          </label>
          <label class="field">
            <span class="label">${this._zh?"\u5F3A\u8C03\u8272\u8986\u76D6\uFF08\u53EF\u9009\uFF09":"Accent override (optional)"}</span>
            <input
              type="color"
              .value=${t.accent||"#2ee6c5"}
              @input=${a=>this._update({accent:a.target.value})}
            />
          </label>
          <div class="check">
            <input
              type="checkbox"
              id="ha-music-palette"
              .checked=${t.palette!==!1}
              @change=${a=>this._update({palette:a.target.checked})}
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
              @change=${a=>this._update({volume_entity:a.target.value||void 0})}
            />
          </label>
          ${this._switch(this._zh?"\u663E\u793A\u97F3\u91CF\u6761":"Show volume",t.show_volume!==!1,a=>this._update({show_volume:a}))}
          ${this._switch(this._zh?"\u663E\u793A\u97F3\u6E90\u9009\u62E9":"Show source picker",t.show_source!==!1,a=>this._update({show_source:a}))}
          ${this._switch(this._zh?"\u663E\u793A\u64AD\u653E\u961F\u5217":"Show queue",t.show_queue!==!1,a=>this._update({show_queue:a}))}
          ${this._switch(this._zh?"\u663E\u793A\u5A92\u4F53\u5E93\u6D4F\u89C8":"Show media browser",t.show_library!==!1,a=>this._update({show_library:a}))}
          ${this._switch(this._zh?"\u81EA\u52A8\u8BC6\u522B\u6B4C\u8BCD":"Auto lyrics",t.show_lyrics!==!1,a=>this._update({show_lyrics:a}))}
          <label class="field">
            <span class="label">${this._zh?"\u6B4C\u8BCD\u6E90":"Lyrics source"}</span>
            <select
              .value=${t.lyrics_source||Ve}
              @change=${a=>this._update({lyrics_source:a.target.value})}
            >
              ${Object.keys(je).map(a=>_`<option value=${a} ?selected=${(t.lyrics_source||Ve)===a}>
                    ${this._optionLabel(je[a])}
                  </option>`)}
            </select>
            <span class="hint">
              ${this._zh?"\u81EA\u52A8\uFF1AQQ/\u7F51\u6613\u4E91\u540E\u7AEF\u53EF\u7528\u65F6\u4F18\u5148\uFF0C\u540E\u7AEF\u7F3A\u5931\u6216\u672A\u5339\u914D\u65F6\u81EA\u52A8\u56DE\u9000 LRCLIB \u540C\u6B65\u6B4C\u8BCD\uFF0C\u6700\u540E\u7528 Lyrics.ovh \u7EAF\u6587\u672C\u515C\u5E95\u3002":"Auto: prefer the QQ/NetEase backend when available, then LRCLIB synced lyrics, then Lyrics.ovh plain-text fallback."}
            </span>
          </label>
          ${this._switch(this._zh?"\u5168\u5C40\u6B4C\u8BCD\u60AC\u6D6E\u7A97\uFF08\u5355\u884C / \u957F\u6309\u62D6\u52A8\uFF09":"Global floating lyric (one line, long-press drag)",t.floating_lyrics!==!1,a=>this._update({floating_lyrics:a,floating_lyrics_edited:Date.now()}))}
          ${this._switch(this._zh?"\u6B4C\u8BCD\u81EA\u52A8\u8DDF\u968F\u6B63\u5728\u64AD\u653E\u7684\u64AD\u653E\u5668":"Auto-follow the playing player",t.floating_lyrics_auto!==!1,a=>this._update({floating_lyrics_auto:a}))}
          ${this._switch(this._zh?"\u79FB\u52A8\u7AEF\u81EA\u52A8\u9690\u85CF\u60AC\u6D6E\u64AD\u653E\u5668":"Hide floating player on mobile",t.mobile_hide_dock!==!1,a=>this._update({mobile_hide_dock:a}))}
          ${this._switch(this._zh?"\u79FB\u52A8\u7AEF\u81EA\u52A8\u9690\u85CF\u60AC\u6D6E\u6B4C\u8BCD":"Hide floating lyrics on mobile",t.mobile_hide_lyrics!==!1,a=>this._update({mobile_hide_lyrics:a}))}
          <span class="hint">
            ${this._zh?"\u4EC5\u624B\u673A\uFF08\u7C97\u6307\u9488\u7A84\u5C4F / \u6A2A\u5C4F\u77EE\u5C4F\uFF09\u751F\u6548\uFF1B\u684C\u9762\u548C\u5E73\u677F\u4E0D\u53D7\u5F71\u54CD\u3002":"Phone only (coarse pointer narrow screen / short landscape); desktop and tablet are unaffected."}
          </span>
          ${this._switch(this._zh?"\u663E\u793A\u5206\u7EC4\u4FE1\u606F":"Show group info",t.show_group!==!1,a=>this._update({show_group:a}))}
          ${this._switch(this._zh?"\u663E\u793A Music Assistant \u6B4C\u5355\u5165\u53E3":"Show Music Assistant playlists",t.music_assistant!==!1,a=>this._update({music_assistant:a?typeof t.music_assistant=="string"?t.music_assistant:!0:!1}))}
          <label class="field">
            <span class="label">
              ${this._zh?"MA \u9762\u677F\u5730\u5740\uFF08\u7559\u7A7A\u81EA\u52A8\uFF0C\u4EC5\u4F9B\u62BD\u5C49\u5185\u8DF3\u8F6C\uFF09":"MA panel URL (optional)"}
            </span>
            <input
              type="text"
              .value=${typeof t.music_assistant=="string"?t.music_assistant:""}
              .disabled=${t.music_assistant===!1}
              placeholder="/music-assistant"
              @input=${a=>this._update({music_assistant:a.target.value.trim()||!0})}
            />
            <span class="hint">
              ${this._zh?"\u7559\u7A7A\u81EA\u52A8\u8BFB\u53D6 HA \u9762\u677F\u8DEF\u5F84\uFF1B\u6B4C\u5355\u5165\u53E3\u672C\u8EAB\u4E0D\u4F9D\u8D56\u6B64\u9879":"Leave empty to auto-detect the HA panel path"}
            </span>
          </label>
          <div class="section-title">${this._zh?"\u5168\u5C40\u8FF7\u4F60\u64AD\u653E\u5668":"Global mini players"}</div>
          <div class="hint">
            ${this._zh?"\u4E09\u4E2A\u4F4D\u7F6E\u53EF\u4EE5\u540C\u65F6\u542F\u7528\uFF0C\u4E5F\u53EF\u4EE5\u5206\u522B\u9009\u62E9\u5404\u81EA\u7684\u64AD\u653E\u5668\u5B9E\u4F53\uFF1B\u5355\u51FB\u64AD\u653E/\u6682\u505C\uFF0C\u53CC\u51FB\u6298\u53E0\u6216\u5C55\u5F00\u3002\u9876\u90E8\u53EA\u53EF\u5DE6\u53F3\u79FB\u52A8\u3001\u4FA7\u8FB9\u680F\u53EA\u53EF\u4E0A\u4E0B\u79FB\u52A8\uFF1B\u53F3\u4E0B\u89D2\u957F\u6309\u540E\u53EF\u4EFB\u610F\u62D6\u52A8\uFF0C\u4F46\u4E0D\u80FD\u8FDB\u5165\u4FA7\u8FB9\u680F\u548C\u9876\u680F\u3002":"Each position can use its own entity; click to play/pause, double-click to fold, long-press to drag."}
          </div>
          ${(()=>{let a=this._dockThemes();return[["top",this._zh?"\u9876\u90E8\u64AD\u653E\u5668":"Top bar"],["sidebar",this._zh?"\u4FA7\u8FB9\u680F\u64AD\u653E\u5668":"Sidebar"],["fab",this._zh?"\u53F3\u4E0B\u89D2\u64AD\u653E\u5668":"Bottom-right"]].map(([o,l])=>{let c=i.includes(o),h=s[o]||this._mainEntity(),d=a[o]||this._config.theme||O;return _`
              <div class="dock-row">
                <label class="check">
                  <input
                    type="checkbox"
                    .checked=${c}
                    @change=${p=>this._toggleDock(o,p.target.checked)}
                  />
                  <span>${l}</span>
                </label>
                <div class="dock-right">
                  <ha-entity-picker
                    .hass=${this.hass}
                    .value=${h||""}
                    .includeDomains=${["media_player"]}
                    .allowCustomEntity=${!1}
                    .label=${this._zh?"\u64AD\u653E\u5668\u5B9E\u4F53":"Player entity"}
                    @value-changed=${p=>{p.stopPropagation(),this._setDockEntity(o,p.detail?.value??"")}}
                  ></ha-entity-picker>
                  ${c?_`<select
                        class="dock-theme"
                        .value=${d}
                        @change=${p=>this._setDockTheme(o,p.target.value)}
                        title=${this._zh?"\u64AD\u653E\u5668\u4E3B\u9898":"Player theme"}
                      >
                        ${Object.keys(N).map(p=>_`<option value=${p} ?selected=${d===p}>
                              ${this._optionLabel(N[p].label)}
                            </option>`)}
                      </select>`:x}
                </div>
              </div>
            `})})()}
        </div>
      </div>
    `}_switch(t,e,i){return _`<label class="switch-row">
      <span class="label">${t}</span>
      <input
        type="checkbox"
        .checked=${e}
        @change=${s=>i(s.target.checked)}
      />
    </label>`}};customElements.get("ha-music-editor")||customElements.define("ha-music-editor",_i);var ee=new URL(import.meta.url),bi=ee.searchParams.get("dock"),yi=W(),Ct=bi?K(bi==="1"?"top":bi):yi?.modes||[],xi={...yi?.entities||{}},vi=Q(yi?.themes),qs=ee.searchParams.get("dock_entity");qs&&Ct[0]&&(xi[Ct[0]]=qs);var zs=ee.searchParams.get("dock_theme");zs&&Ct[0]&&(vi[Ct[0]]=zs);for(let n of Ct){let t=ee.searchParams.get(`dock_entity_${n}`);t&&(xi[n]=t);let e=ee.searchParams.get(`dock_theme_${n}`);e&&(vi[n]=e)}var Ns=Ct.map(n=>({mode:n,entity:xi[n],theme:vi[n]})).filter(n=>n.entity);Ns.length&&Yt(Ns.map(n=>({...n,hass:gt()})));function Is(){let n=Pe();n?.enabled!==!1&&te({enabled:!0,entity:n?.entity||"",preferredEntity:n?.entity||"",auto:!0,source:"auto",theme:O,hass:gt(),lines:[],trackKey:"",status:"idle"})}typeof document<"u"&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Is,{once:!0}):window.setTimeout(Is,0));
