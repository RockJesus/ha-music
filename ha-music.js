var kt=globalThis,$t=kt.ShadowRoot&&(kt.ShadyCSS===void 0||kt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Dt=Symbol(),be=new WeakMap,rt=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==Dt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if($t&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=be.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&be.set(e,t))}return t}toString(){return this.cssText}},fe=r=>new rt(typeof r=="string"?r:r+"",void 0,Dt),nt=(r,...t)=>{let e=r.length===1?r[0]:t.reduce((i,a,n)=>i+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+r[n+1],r[0]);return new rt(e,r,Dt)},_e=(r,t)=>{if($t)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),a=kt.litNonce;a!==void 0&&i.setAttribute("nonce",a),i.textContent=e.cssText,r.appendChild(i)}},It=$t?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return fe(e)})(r):r;var{is:oi,defineProperty:li,getOwnPropertyDescriptor:hi,getOwnPropertyNames:ci,getOwnPropertySymbols:di,getPrototypeOf:pi}=Object,R=globalThis,xe=R.trustedTypes,ui=xe?xe.emptyScript:"",mi=R.reactiveElementPolyfillSupport,ot=(r,t)=>r,Ft={toAttribute(r,t){switch(t){case Boolean:r=r?ui:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},ve=(r,t)=>!oi(r,t),ye={attribute:!0,type:String,converter:Ft,reflect:!1,useDefault:!1,hasChanged:ve};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),R.litPropertyMetadata??(R.litPropertyMetadata=new WeakMap);var C=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=ye){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),a=this.getPropertyDescriptor(t,i,e);a!==void 0&&li(this.prototype,t,a)}}static getPropertyDescriptor(t,e,i){let{get:a,set:n}=hi(this.prototype,t)??{get(){return this[e]},set(s){this[e]=s}};return{get:a,set(s){let o=a?.call(this);n?.call(this,s),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ye}static _$Ei(){if(this.hasOwnProperty(ot("elementProperties")))return;let t=pi(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(ot("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ot("properties"))){let e=this.properties,i=[...ci(e),...di(e)];for(let a of i)this.createProperty(a,e[a])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,a]of e)this.elementProperties.set(i,a)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let a=this._$Eu(e,i);a!==void 0&&this._$Eh.set(a,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let a of i)e.unshift(It(a))}else t!==void 0&&e.push(It(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return _e(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),a=this.constructor._$Eu(t,i);if(a!==void 0&&i.reflect===!0){let n=(i.converter?.toAttribute!==void 0?i.converter:Ft).toAttribute(e,i.type);this._$Em=t,n==null?this.removeAttribute(a):this.setAttribute(a,n),this._$Em=null}}_$AK(t,e){let i=this.constructor,a=i._$Eh.get(t);if(a!==void 0&&this._$Em!==a){let n=i.getPropertyOptions(a),s=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:Ft;this._$Em=a;let o=s.fromAttribute(e,n.type);this[a]=o??this._$Ej?.get(a)??o,this._$Em=null}}requestUpdate(t,e,i,a=!1,n){if(t!==void 0){let s=this.constructor;if(a===!1&&(n=this[t]),i??(i=s.getPropertyOptions(t)),!((i.hasChanged??ve)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:a,wrapped:n},s){i&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,s??e??this[t]),n!==!0||s!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),a===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[a,n]of this._$Ep)this[a]=n;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[a,n]of i){let{wrapped:s}=n,o=this[a];s!==!0||this._$AL.has(a)||o===void 0||this.C(a,void 0,n,o)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};C.elementStyles=[],C.shadowRootOptions={mode:"open"},C[ot("elementProperties")]=new Map,C[ot("finalized")]=new Map,mi?.({ReactiveElement:C}),(R.reactiveElementVersions??(R.reactiveElementVersions=[])).push("2.1.2");var ht=globalThis,we=r=>r,Et=ht.trustedTypes,ke=Et?Et.createPolicy("lit-html",{createHTML:r=>r}):void 0,Ce="$lit$",U=`lit$${Math.random().toFixed(9).slice(2)}$`,ze="?"+U,gi=`<${ze}>`,B=document,ct=()=>B.createComment(""),dt=r=>r===null||typeof r!="object"&&typeof r!="function",Yt=Array.isArray,bi=r=>Yt(r)||typeof r?.[Symbol.iterator]=="function",Ht=`[ 	
\f\r]`,lt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,$e=/-->/g,Ee=/>/g,j=RegExp(`>|${Ht}(?:([^\\s"'>=/]+)(${Ht}*=${Ht}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ae=/'/g,Se=/"/g,Pe=/^(?:script|style|textarea|title)$/i,Gt=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),c=Gt(1),m=Gt(2),Ni=Gt(3),z=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),Me=new WeakMap,V=B.createTreeWalker(B,129);function Te(r,t){if(!Yt(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return ke!==void 0?ke.createHTML(t):t}var fi=(r,t)=>{let e=r.length-1,i=[],a,n=t===2?"<svg>":t===3?"<math>":"",s=lt;for(let o=0;o<e;o++){let l=r[o],h,d,u=-1,b=0;for(;b<l.length&&(s.lastIndex=b,d=s.exec(l),d!==null);)b=s.lastIndex,s===lt?d[1]==="!--"?s=$e:d[1]!==void 0?s=Ee:d[2]!==void 0?(Pe.test(d[2])&&(a=RegExp("</"+d[2],"g")),s=j):d[3]!==void 0&&(s=j):s===j?d[0]===">"?(s=a??lt,u=-1):d[1]===void 0?u=-2:(u=s.lastIndex-d[2].length,h=d[1],s=d[3]===void 0?j:d[3]==='"'?Se:Ae):s===Se||s===Ae?s=j:s===$e||s===Ee?s=lt:(s=j,a=void 0);let y=s===j&&r[o+1].startsWith("/>")?" ":"";n+=s===lt?l+gi:u>=0?(i.push(h),l.slice(0,u)+Ce+l.slice(u)+U+y):l+U+(u===-2?o:y)}return[Te(r,n+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},pt=class r{constructor({strings:t,_$litType$:e},i){let a;this.parts=[];let n=0,s=0,o=t.length-1,l=this.parts,[h,d]=fi(t,e);if(this.el=r.createElement(h,i),V.currentNode=this.el.content,e===2||e===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(a=V.nextNode())!==null&&l.length<o;){if(a.nodeType===1){if(a.hasAttributes())for(let u of a.getAttributeNames())if(u.endsWith(Ce)){let b=d[s++],y=a.getAttribute(u).split(U),f=/([.?@])?(.*)/.exec(b);l.push({type:1,index:n,name:f[2],strings:y,ctor:f[1]==="."?Vt:f[1]==="?"?Bt:f[1]==="@"?Kt:J}),a.removeAttribute(u)}else u.startsWith(U)&&(l.push({type:6,index:n}),a.removeAttribute(u));if(Pe.test(a.tagName)){let u=a.textContent.split(U),b=u.length-1;if(b>0){a.textContent=Et?Et.emptyScript:"";for(let y=0;y<b;y++)a.append(u[y],ct()),V.nextNode(),l.push({type:2,index:++n});a.append(u[b],ct())}}}else if(a.nodeType===8)if(a.data===ze)l.push({type:2,index:n});else{let u=-1;for(;(u=a.data.indexOf(U,u+1))!==-1;)l.push({type:7,index:n}),u+=U.length-1}n++}}static createElement(t,e){let i=B.createElement("template");return i.innerHTML=t,i}};function Q(r,t,e=r,i){if(t===z)return t;let a=i!==void 0?e._$Co?.[i]:e._$Cl,n=dt(t)?void 0:t._$litDirective$;return a?.constructor!==n&&(a?._$AO?.(!1),n===void 0?a=void 0:(a=new n(r),a._$AT(r,e,i)),i!==void 0?(e._$Co??(e._$Co=[]))[i]=a:e._$Cl=a),a!==void 0&&(t=Q(r,a._$AS(r,t.values),a,i)),t}var jt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,a=(t?.creationScope??B).importNode(e,!0);V.currentNode=a;let n=V.nextNode(),s=0,o=0,l=i[0];for(;l!==void 0;){if(s===l.index){let h;l.type===2?h=new ut(n,n.nextSibling,this,t):l.type===1?h=new l.ctor(n,l.name,l.strings,this,t):l.type===6&&(h=new Wt(n,this,t)),this._$AV.push(h),l=i[++o]}s!==l?.index&&(n=V.nextNode(),s++)}return V.currentNode=B,a}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},ut=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,a){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),dt(t)?t===p||t==null||t===""?(this._$AH!==p&&this._$AR(),this._$AH=p):t!==this._$AH&&t!==z&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):bi(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==p&&dt(this._$AH)?this._$AA.nextSibling.data=t:this.T(B.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,a=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=pt.createElement(Te(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===a)this._$AH.p(e);else{let n=new jt(a,this),s=n.u(this.options);n.p(e),this.T(s),this._$AH=n}}_$AC(t){let e=Me.get(t.strings);return e===void 0&&Me.set(t.strings,e=new pt(t)),e}k(t){Yt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,a=0;for(let n of t)a===e.length?e.push(i=new r(this.O(ct()),this.O(ct()),this,this.options)):i=e[a],i._$AI(n),a++;a<e.length&&(this._$AR(i&&i._$AB.nextSibling,a),e.length=a)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=we(t).nextSibling;we(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},J=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,a,n){this.type=1,this._$AH=p,this._$AN=void 0,this.element=t,this.name=e,this._$AM=a,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=p}_$AI(t,e=this,i,a){let n=this.strings,s=!1;if(n===void 0)t=Q(this,t,e,0),s=!dt(t)||t!==this._$AH&&t!==z,s&&(this._$AH=t);else{let o=t,l,h;for(t=n[0],l=0;l<n.length-1;l++)h=Q(this,o[i+l],e,l),h===z&&(h=this._$AH[l]),s||(s=!dt(h)||h!==this._$AH[l]),h===p?t=p:t!==p&&(t+=(h??"")+n[l+1]),this._$AH[l]=h}s&&!a&&this.j(t)}j(t){t===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Vt=class extends J{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===p?void 0:t}},Bt=class extends J{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==p)}},Kt=class extends J{constructor(t,e,i,a,n){super(t,e,i,a,n),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??p)===z)return;let i=this._$AH,a=t===p&&i!==p||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==p&&(i===p||a);a&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Wt=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}};var _i=ht.litHtmlPolyfillSupport;_i?.(pt,ut),(ht.litHtmlVersions??(ht.litHtmlVersions=[])).push("3.3.3");var Re=(r,t,e)=>{let i=e?.renderBefore??t,a=i._$litPart$;if(a===void 0){let n=e?.renderBefore??null;i._$litPart$=a=new ut(t.insertBefore(ct(),n),n,void 0,e??{})}return a._$AI(r),a};var mt=globalThis,A=class extends C{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Re(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return z}};A._$litElement$=!0,A.finalized=!0,mt.litElementHydrateSupport?.({LitElement:A});var xi=mt.litElementPolyfillSupport;xi?.({LitElement:A});(mt.litElementVersions??(mt.litElementVersions=[])).push("4.2.2");var Ue={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Oe=r=>(...t)=>({_$litDirective$:r,values:t}),At=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var qe="important",yi=" !"+qe,P=Oe(class extends At{constructor(r){if(super(r),r.type!==Ue.ATTRIBUTE||r.name!=="style"||r.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(r){return Object.keys(r).reduce((t,e)=>{let i=r[e];return i==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(r,[t]){let{style:e}=r.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let i of this.ft)t[i]==null&&(this.ft.delete(i),i.includes("-")?e.removeProperty(i):e[i]=null);for(let i in t){let a=t[i];if(a!=null){this.ft.add(i);let n=typeof a=="string"&&a.endsWith(yi);i.includes("-")||n?e.setProperty(i,n?a.slice(0,-11):a,n?qe:""):e[i]=a}}return z}});var Ne=nt`
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
    height: 100%;
  }

  .hm-card[data-panel="true"] {
    height: 100%;
    border-radius: 0;
  }

  .hm-card[data-panel="true"] .hm-body {
    max-width: none;
    padding: clamp(18px, 2.4vw, 40px);
  }

  .hm-card[data-panel="true"] .hm-main {
    grid-template-columns: minmax(180px, 34%) minmax(0, 1fr);
    gap: clamp(20px, 3.2vw, 46px);
  }

  .hm-card[data-panel="true"] .hm-cover {
    width: 100%;
    border-radius: 24px;
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
      grid-template-columns: minmax(108px, 42%) minmax(0, 1fr);
      justify-items: stretch;
      text-align: left;
      align-items: center;
      gap: 12px;
    }

    .hm-card[data-panel="true"] .hm-cover {
      width: 100%;
      border-radius: 16px;
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
`;var vi={play:m`<path d="M8.2 5.4c0-.7.8-1.1 1.4-.7l9.1 5.8c.6.4.6 1.3 0 1.7l-9.1 6.1c-.6.4-1.4 0-1.4-.7V5.4z" fill="currentColor"/>`,pause:m`<rect x="7" y="5.6" width="3.6" height="12.8" rx="1.2" fill="currentColor"/><rect x="13.4" y="5.6" width="3.6" height="12.8" rx="1.2" fill="currentColor"/>`,previous:m`<path d="M7 6.2v11.6" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><path d="M17.6 6.6c0-.6-.7-1-1.2-.6l-7.1 5.2c-.5.4-.5 1.2 0 1.6l7.1 5.2c.5.4 1.2 0 1.2-.6V6.6z" fill="currentColor"/>`,next:m`<path d="M17 6.2v11.6" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><path d="M6.4 6.6c0-.6.7-1 1.2-.6l7.1 5.2c.5.4.5 1.2 0 1.6l-7.1 5.2c-.5.4-1.2 0-1.2-.6V6.6z" fill="currentColor"/>`,shuffle:m`<path d="M4.5 7.2h3.2c1 0 1.9.5 2.5 1.3l4 5.4c.6.8 1.5 1.3 2.5 1.3h3.1" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M4.5 16.8h3.2c1 0 1.9-.5 2.5-1.3l4-5.4c.6-.8 1.5-1.3 2.5-1.3h3.1" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M16.2 4.6l3 2.6-3 2.6M16.2 12.6l3 2.6-3 2.6" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/>`,repeat:m`<path d="M6.4 9.1V8.3c0-1.5 1.2-2.7 2.7-2.7h8.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M17.8 5.6l-2.3-2.2M17.8 5.6l-2.3 2.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M17.6 14.9v.8c0 1.5-1.2 2.7-2.7 2.7H6.7" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M6.2 18.4l2.3 2.2M6.2 18.4l2.3-2.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/>`,repeatOne:m`<path d="M6.4 9.1V8.3c0-1.5 1.2-2.7 2.7-2.7h8.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M17.8 5.6l-2.3-2.2M17.8 5.6l-2.3 2.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M17.6 14.9v.8c0 1.5-1.2 2.7-2.7 2.7H6.7" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M6.2 18.4l2.3 2.2M6.2 18.4l2.3-2.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M11.2 9.3l1.1-.8v6.1" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M10.6 14.6h3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>`,volume:m`<path d="M4.6 9.4h2.7l3.4-2.9c.5-.4 1.2 0 1.2.6v9.8c0 .6-.7 1-1.2.6L7.3 14.6H4.6c-.6 0-1-.4-1-1v-3.2c0-.6.4-1 1-1z" fill="currentColor"/><path d="M15.4 8.6c1.6 1 1.6 5.8 0 6.8" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M17.6 6.4c2.9 2 2.9 9.2 0 11.2" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/>`,mute:m`<path d="M4.6 9.4h2.7l3.4-2.9c.5-.4 1.2 0 1.2.6v9.8c0 .6-.7 1-1.2.6L7.3 14.6H4.6c-.6 0-1-.4-1-1v-3.2c0-.6.4-1 1-1z" fill="currentColor"/><path d="M15.2 9.6l4.6 4.8M19.8 9.6l-4.6 4.8" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/>`,power:m`<path d="M12 4.2v7" stroke="currentColor" stroke-width="1.9" fill="none" stroke-linecap="round"/><path d="M7.6 6.6a6.9 6.9 0 1 0 8.8 0" stroke="currentColor" stroke-width="1.9" fill="none" stroke-linecap="round"/>`,more:m`<circle cx="6.4" cy="12" r="1.55" fill="currentColor"/><circle cx="12" cy="12" r="1.55" fill="currentColor"/><circle cx="17.6" cy="12" r="1.55" fill="currentColor"/>`,library:m`<rect x="4.4" y="4.4" width="6.4" height="6.4" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.7"/><rect x="13.2" y="4.4" width="6.4" height="6.4" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.7"/><rect x="4.4" y="13.2" width="6.4" height="6.4" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.7"/><rect x="13.2" y="13.2" width="6.4" height="6.4" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.7"/>`,queue:m`<path d="M5 7.2h10M5 11.4h7.4M5 15.6h5.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M15.6 12.4c0-.5.5-.8.9-.5l4 2.3c.4.2.4.8 0 1l-4 2.6c-.4.3-.9 0-.9-.5v-5.4z" fill="currentColor"/>`,chevronLeft:m`<path d="M14.6 6l-5.4 6 5.4 6" stroke="currentColor" stroke-width="1.9" fill="none" stroke-linecap="round"/>`,close:m`<path d="M7 7l10 10M17 7L7 17" stroke="currentColor" stroke-width="1.9" fill="none" stroke-linecap="round"/>`,music:m`<path d="M14.5 5.2l4.6-1v9.1a3 3 0 1 1-1.8-2.7V7.1l-2.8.6v7.7a3 3 0 1 1-1.8-2.7V5.2z" fill="currentColor"/>`,group:m`<circle cx="9" cy="9.3" r="3.2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3.8 18.4c0-2.7 2.3-4.6 5.2-4.6s5.2 1.9 5.2 4.6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M16.2 6.4a3 3 0 0 1 0 5.9M18.6 18.4c0-2-1-3.6-2.6-4.3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>`,chevronRight:m`<path d="M9.4 6l5.4 6-5.4 6" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>`,playlist:m`<path d="M4 6.6h10.2M4 11h10.2M4 15.4h6.4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M16.4 11.8l4 2.35-4 2.35z" fill="currentColor"/>`,external:m`<path d="M13.2 5.4h5.4v5.4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M18.2 5.8l-7 7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M11 6.6H7.2c-1 0-1.8.8-1.8 1.8v8.4c0 1 .8 1.8 1.8 1.8h8.4c1 0 1.8-.8 1.8-1.8V14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>`,folder:m`<path d="M3.6 7.2c0-1 .8-1.8 1.8-1.8h3.4l1.8 2.2h9.8c1 0 1.8.8 1.8 1.8v7.4c0 1-.8 1.8-1.8 1.8H5.4c-1 0-1.8-.8-1.8-1.8V7.2z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>`,check:m`<path d="M6 12.6l4.2 4.2 7.8-9" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>`};function g(r,t=18){let e=vi[r];return e?m`<svg viewBox="0 0 24 24" width=${t} height=${t} aria-hidden="true" focusable="false">${e}</svg>`:p}var De="1.1.8",Ie="ha-music",Fe="HA Music",_={PAUSE:1,SEEK:2,VOLUME_SET:4,VOLUME_MUTE:8,PREVIOUS_TRACK:16,NEXT_TRACK:32,TURN_ON:128,TURN_OFF:256,PLAY_MEDIA:512,VOLUME_STEP:1024,SELECT_SOURCE:2048,STOP:4096,CLEAR_PLAYLIST:8192,PLAY:16384,SHUFFLE_SET:32768,SELECT_SOUND_MODE:65536,BROWSE_MEDIA:131072,REPEAT_SET:262144,GROUPING:524288,SELECT:1048576};var Qt="aurora";var Jt={adaptive:{en:"Adaptive",zh:"\u81EA\u9002\u5E94"},full:{en:"Full",zh:"\u5B8C\u6574"},compact:{en:"Compact",zh:"\u7D27\u51D1"},mini:{en:"Mini",zh:"\u8FF7\u4F60"}},Xt={ambient:{en:"Ambient blur",zh:"\u73AF\u5883\u6A21\u7CCA"},art:{en:"Cover fill",zh:"\u5C01\u9762\u94FA\u6EE1"},palette:{en:"Palette only",zh:"\u7EAF\u8272\u5F69"},none:{en:"Plain",zh:"\u65E0\u80CC\u666F"}},Zt={bars:{en:"Bars",zh:"\u67F1\u72B6"},wave:{en:"Wave",zh:"\u6CE2\u5F62"},orbit:{en:"Orbit",zh:"\u5149\u73AF"},none:{en:"Off",zh:"\u5173\u95ED"}},X={aurora:{label:{en:"Aurora",zh:"\u6781\u5149"},accent:["#2ee6c5","#7b5cff"],base:"#050a12",glow:1,grid:!1},cyber:{label:{en:"Cyberpunk",zh:"\u8D5B\u535A\u670B\u514B"},accent:["#ff2fd0","#22e6ff"],base:"#08030f",glow:1.4,grid:!0},liquid:{label:{en:"Liquid Glass",zh:"\u6DB2\u6001\u73BB\u7483"},accent:["#a9d8ff","#cdb6ff"],base:"#090c16",glow:.8,grid:!1,glass:!0},velvet:{label:{en:"Velvet",zh:"\u5929\u9E45\u7ED2"},accent:["#ff7a9c","#a86bff"],base:"#0d050c",glow:1.15,grid:!1},mono:{label:{en:"Monochrome",zh:"\u9ED1\u767D"},accent:["#e9ecf5","#8d95a8"],base:"#08090c",glow:.4,grid:!1}},Le={play:"Play",pause:"Pause",playing:"Now playing",paused:"Paused",idle:"Standby",off:"Off",buffering:"Buffering",previous:"Previous track",next:"Next track",volume:"Volume",mute:"Mute",unmute:"Unmute",shuffle:"Shuffle",repeat:"Repeat",repeatAll:"Repeat all",repeatOne:"Repeat one",repeatOff:"Repeat off",source:"Source",soundMode:"Sound mode",queue:"Queue",library:"Library",assistant:"Music Assistant",playlists:"Playlists",playlistsEmpty:"No playlists found",playlistEmpty:"This playlist is empty or unavailable in Music Assistant",maPlayerRequired:"Playlists need a Music Assistant player",playlistUnavailable:"Unavailable",playingPlaylist:"Playing",openAssistant:"Open Music Assistant",more:"More info",power:"Power",group:"Group",groupLeave:"Leave group",loading:"Loading\u2026",queueEmpty:"Queue is empty",browseFailed:"Media library is unavailable",noMedia:"Nothing is playing",unknownArtist:"Unknown artist",noTitle:"No title",close:"Close",back:"Back",track:"Track",album:"Album",volumeEntityMissing:"Volume entity unavailable",seek:"Seek",remaining:"Toggle remaining time"},wi={play:"\u64AD\u653E",pause:"\u6682\u505C",playing:"\u6B63\u5728\u64AD\u653E",paused:"\u5DF2\u6682\u505C",idle:"\u5F85\u673A",off:"\u5DF2\u5173\u95ED",buffering:"\u7F13\u51B2\u4E2D",previous:"\u4E0A\u4E00\u9996",next:"\u4E0B\u4E00\u9996",volume:"\u97F3\u91CF",mute:"\u9759\u97F3",unmute:"\u53D6\u6D88\u9759\u97F3",shuffle:"\u968F\u673A\u64AD\u653E",repeat:"\u5FAA\u73AF",repeatAll:"\u5217\u8868\u5FAA\u73AF",repeatOne:"\u5355\u66F2\u5FAA\u73AF",repeatOff:"\u5173\u95ED\u5FAA\u73AF",source:"\u97F3\u6E90",soundMode:"\u58F0\u97F3\u6A21\u5F0F",queue:"\u64AD\u653E\u961F\u5217",library:"\u5A92\u4F53\u5E93",assistant:"Music Assistant",playlists:"\u64AD\u653E\u5217\u8868",playlistsEmpty:"\u6CA1\u6709\u627E\u5230\u64AD\u653E\u5217\u8868",playlistEmpty:"\u8BE5\u6B4C\u5355\u4E3A\u7A7A\u6216\u66F2\u76EE\u5728 Music Assistant \u4E2D\u4E0D\u53EF\u7528",maPlayerRequired:"\u5F53\u524D\u64AD\u653E\u5668\u4E0D\u662F Music Assistant \u64AD\u653E\u5668\uFF0C\u8BF7\u5148\u5207\u6362\u5230 MA \u64AD\u653E\u5668",playlistUnavailable:"\u4E0D\u53EF\u7528",playingPlaylist:"\u5F00\u59CB\u64AD\u653E",openAssistant:"\u6253\u5F00 Music Assistant",more:"\u66F4\u591A\u4FE1\u606F",power:"\u5F00\u5173",group:"\u5206\u7EC4",groupLeave:"\u9000\u51FA\u5206\u7EC4",loading:"\u52A0\u8F7D\u4E2D\u2026",queueEmpty:"\u64AD\u653E\u961F\u5217\u4E3A\u7A7A",browseFailed:"\u5A92\u4F53\u5E93\u6682\u4E0D\u53EF\u7528",noMedia:"\u5F53\u524D\u6CA1\u6709\u64AD\u653E\u5185\u5BB9",unknownArtist:"\u672A\u77E5\u827A\u672F\u5BB6",noTitle:"\u672A\u77E5\u66F2\u76EE",close:"\u5173\u95ED",back:"\u8FD4\u56DE",track:"\u66F2\u76EE",album:"\u4E13\u8F91",volumeEntityMissing:"\u97F3\u91CF\u5B9E\u4F53\u4E0D\u53EF\u7528",seek:"\u8FDB\u5EA6",remaining:"\u5207\u6362\u5269\u4F59\u65F6\u95F4"};function St(r){return/^zh/i.test(r||"")}function E(r){let t=St(r)?wi:Le;return e=>t[e]??Le[e]??e}var ki={playlist:{en:"Playlist",zh:"\u64AD\u653E\u5217\u8868"},album:{en:"Album",zh:"\u4E13\u8F91"},artist:{en:"Artist",zh:"\u827A\u672F\u5BB6"},track:{en:"Track",zh:"\u66F2\u76EE"},music:{en:"Music",zh:"\u97F3\u4E50"},video:{en:"Video",zh:"\u89C6\u9891"},directory:{en:"Folder",zh:"\u6587\u4EF6\u5939"},image:{en:"Image",zh:"\u56FE\u7247"},url:{en:"Link",zh:"\u94FE\u63A5"},app:{en:"App",zh:"\u5E94\u7528"},genre:{en:"Genre",zh:"\u98CE\u683C"}};function te(r,t){if(!r)return"";let e=ki[String(r).toLowerCase()];return e?St(t)?e.zh:e.en:r}var v=(r,t,e)=>Math.min(e,Math.max(t,r));function gt(r,t="--:--"){if(!Number.isFinite(r)||r<0)return t;let e=Math.round(r),i=Math.floor(e/3600),a=Math.floor(e%3600/60),n=e%60;return i>0?`${i}:${String(a).padStart(2,"0")}:${String(n).padStart(2,"0")}`:`${a}:${String(n).padStart(2,"0")}`}function W(r){let t=String(r??""),e=2166136261;for(let i=0;i<t.length;i+=1)e^=t.charCodeAt(i),e=Math.imul(e,16777619);return e>>>0}function He(r={}){let t=[r.title,r.artist,r.album].filter(Boolean).join("|")||"ha-music",e=W(t),i=1.7+(e>>>8)%90/100,a=e%360/360*Math.PI*2,n=Number.isFinite(r.position)&&r.position>0?r.position:0,s=n/i*Math.PI*2+a;return{seed:t,hash:e,period:i,phase:a,position:n,pulse:.5+.5*Math.sin(s),low:.5+.5*Math.sin(s+.55),energy:.55+(e>>>16)%100/220}}function $i(r){return W(r)%360}function x(r,t){let e=Number(r?.attributes?.supported_features??0);return!Number.isFinite(e)||!t?!1:(e&t)===t}function Ei(r,t){if(!(!r||!t))return r.states?r.states[t]:void 0}function Mt(r,t,e=""){return Ei(r,t)?.attributes?.friendly_name||t||e}function O(r){let t=r?.attributes??{},e=t.media_metadata??{},i=Number(t.media_duration??e.duration??0),a=Number(t.media_position??0),n=t.media_position_updated_at;if(r?.state==="playing"&&n){let s=(Date.now()-new Date(n).getTime())/1e3;Number.isFinite(s)&&s>0&&(a+=s)}return Number.isFinite(i)&&i>0?a=v(a,0,i):(!Number.isFinite(a)||a<0)&&(a=0),{title:t.media_title||e.title||"",artist:t.media_artist||e.artist||t.media_album_artist||e.album_artist||"",album:t.media_album_name||e.album_name||"",series:t.media_series_title||e.series_title||"",track:t.media_track??e.track_number??"",duration:Number.isFinite(i)?i:0,position:Number.isFinite(a)?a:0,art:e.entity_picture||e.image_url||t.entity_picture||t.media_image_url||"",appName:t.app_name||"",source:t.source||"",soundMode:t.sound_mode||"",shuffle:!!t.shuffle,repeat:t.repeat||"off",volume:Number.isFinite(Number(t.volume_level))?Number(t.volume_level):null,muted:!!t.is_volume_muted,groupMembers:Array.isArray(t.group_members)?t.group_members:[]}}function ee(r,t=60){let e=r?.attributes?.queue;return Array.isArray(e)?e.slice(0,t).map((i,a)=>({index:a,title:i.title||i.name||i.media_title||"",artist:i.artist||i.subtitle||i.media_artist||"",album:i.album||i.album_name||"",duration:Number(i.duration??i.media_duration??0)||0,art:i.entity_picture||i.thumbnail||i.artwork||"",contentId:i.media_content_id||i.content_id||"",contentType:i.media_content_type||i.content_type||"",active:!!(i.active||i.is_active||i.current||i.playing)})):[]}function q(r,t){return t?/^(https?:|data:|blob:)/.test(t)?t:r?.hassUrl?r.hassUrl(t):t:""}function K(r,t,e){let i=t/100,a=e/100,n=(1-Math.abs(2*a-1))*i,s=(r%360+360)%360/60,o=n*(1-Math.abs(s%2-1)),l=[0,0,0];s<1?l=[n,o,0]:s<2?l=[o,n,0]:s<3?l=[0,n,o]:s<4?l=[0,o,n]:s<5?l=[o,0,n]:l=[n,0,o];let h=a-n/2;return l.map(d=>Math.round(v((d+h)*255,0,255)))}function je(r){let t=$i(r),e=(t+42+W(r+"2")%40)%360,i=K(t,72,58),a=K(e,68,52);return{a1:`hsl(${t} 72% 58%)`,a2:`hsl(${e} 68% 52%)`,rgb1:i.join(","),rgb2:a.join(",")}}function Ve(r){let t=String(r).replace("#","").trim(),e=t.length===3?t.split("").map(i=>i+i).join(""):t;return/^[0-9a-f]{6}$/i.test(e)?[parseInt(e.slice(0,2),16),parseInt(e.slice(2,4),16),parseInt(e.slice(4,6),16)].join(","):null}function Ct(r,t="255,255,255"){let e=String(r||"").trim();if(/^#[0-9a-f]{3,8}$/i.test(e))return Ve(e.slice(0,7))||t;let i=e.match(/hsla?\(\s*([\d.]+)[,\s]+([\d.]+)%[,\s]+([\d.]+)%/i);if(i)return K(Number(i[1]),Number(i[2]),Number(i[3])).join(",");let a=e.match(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/i);return a?`${a[1]},${a[2]},${a[3]}`:t}function ie(r){let t=Ve(r);if(!t)return{h:0,s:0,l:50};let[e,i,a]=t.split(",").map(u=>Number(u)/255),n=Math.max(e,i,a),s=Math.min(e,i,a),o=(n+s)/2,l=n-s,h=0,d=0;return l!==0&&(d=l/(1-Math.abs(2*o-1)),n===e?h=(i-a)/l%6:n===i?h=(a-e)/l+2:h=(e-i)/l+4,h=(h*60+360)%360),{h,s:d*100,l:o*100}}function ae(r,t,e=.5){let i=(t.h-r.h+540)%360-180,a=(r.h+i*e+360)%360,n=r.s+(t.s-r.s)*e,s=r.l+(t.l-r.l)*e;return{h:a,s:n,l:s,css:`hsl(${Math.round(a)} ${Math.round(v(n,25,92))}% ${Math.round(v(s,38,72))}%)`,rgb:K(a,v(n,25,92),v(s,38,72)).join(",")}}var bt=new Map,Ai=40;function Si(r,t){let i=document.createElement("canvas");i.width=36,i.height=36;let a=i.getContext("2d",{willReadFrequently:!0});if(!a)return null;a.drawImage(r,0,0,36,36);let n=a.getImageData(0,0,36,36).data,s=new Map;for(let k=0;k<n.length;k+=4){if(n[k+3]<180)continue;let L=n[k],D=n[k+1],I=n[k+2],S=Math.max(L,D,I),et=Math.min(L,D,I),it=(S+et)/510,yt=S===0?0:(S-et)/S;if(it<.12||it>.9||yt<.14)continue;let M=0,F=S-et;F!==0&&(S===L?M=(D-I)/F%6:S===D?M=(I-L)/F+2:M=(L-D)/F+4,M=(M*60+360)%360);let at=Math.floor(M/18),H=s.get(at)||{count:0,sat:0,light:0};H.count+=1,H.sat+=yt,H.light+=it,s.set(at,H)}if(!s.size)return null;let o=[...s.entries()].map(([k,$])=>({hue:k*18+9,score:$.count*(.45+$.sat/$.count),sat:$.sat/$.count,light:$.light/$.count})).sort((k,$)=>$.score-k.score),l=o[0],h=o.find(k=>{let $=Math.abs(k.hue-l.hue);return Math.min($,360-$)>28})||{hue:(l.hue+44)%360,sat:l.sat,light:l.light},d=k=>v(Math.round(k*100),42,88),u=Math.round(l.hue),b=Math.round(h.hue),y=d(l.sat+.08),f=d(h.sat+.05),N=v(Math.round(l.light*100)+12,46,66),tt=v(Math.round(h.light*100)+8,40,60);return{a1:`hsl(${u} ${y}% ${N}%)`,a2:`hsl(${b} ${f}% ${tt}%)`,rgb1:K(u,y,N).join(","),rgb2:K(b,f,tt).join(","),h1:u,s1:y,l1:N,h2:b,s2:f,l2:tt,seed:W(t||"")}}function Be(r,t=""){if(!r)return Promise.resolve(null);if(bt.has(r))return bt.get(r);let e=new Promise(i=>{let a=new Image;a.crossOrigin="anonymous",a.decoding="async",a.onload=()=>{try{i(Si(a,t))}catch{i(null)}},a.onerror=()=>i(null),a.src=r});return bt.size>Ai&&bt.clear(),bt.set(r,e),e}var ft="haMusicMiniPlayer",Pt=new Set(["top","sidebar","fab"]),Ke='<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path d="M14.5 5.2l4.6-1v9.1a3 3 0 1 1-1.8-2.7V7.1l-2.8.6v7.7a3 3 0 1 1-1.8-2.7V5.2z" fill="currentColor"/></svg>',We='<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" fill="currentColor"/></svg>',Ye='<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false"><path d="M16 6h2v12h-2zM6 6l8.5 6L6 18z" fill="currentColor"/></svg>',zt='<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>',Mi='<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false"><path d="M6 5h4v14H6zM14 5h4v14h-4z" fill="currentColor"/></svg>';var Ge='<svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true" focusable="false"><path d="M6.7 9.3L12 14.6l5.3-5.3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',Qe=`
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
    transition: box-shadow 0.18s ease, border-color 0.18s ease;
  }
  .mini:hover {
    border-color: rgba(46, 230, 197, 0.5);
    box-shadow:
      0 16px 40px rgba(0, 0, 0, 0.46),
      0 0 26px -6px rgba(46, 230, 197, 0.5);
  }
  .mini[data-mode="top"] {
    top: calc(env(safe-area-inset-top, 0px) + 56px);
    right: max(16px, env(safe-area-inset-right, 0px));
    width: min(420px, calc(100vw - 32px));
  }
  .mini[data-mode="sidebar"] {
    left: max(10px, env(safe-area-inset-left, 0px));
    bottom: calc(env(safe-area-inset-bottom, 0px) + 84px);
    width: 236px;
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
    border-radius: 9px;
    overflow: hidden;
    display: grid;
    place-items: center;
    color: var(--hm-accent);
    background: linear-gradient(135deg, rgba(46, 230, 197, 0.2), rgba(123, 92, 255, 0.26));
  }
  .art img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: none;
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
      top: calc(env(safe-area-inset-top, 0px) + 58px);
      left: max(10px, env(safe-area-inset-left, 0px));
      right: max(10px, env(safe-area-inset-right, 0px));
      width: auto;
    }
    .mini[data-mode="sidebar"] {
      left: max(10px, env(safe-area-inset-left, 0px));
      right: max(10px, env(safe-area-inset-right, 0px));
      bottom: calc(env(safe-area-inset-bottom, 0px) + 78px);
      width: auto;
    }
    .mini[data-mode="fab"] {
      right: max(12px, env(safe-area-inset-right, 0px));
      bottom: calc(env(safe-area-inset-bottom, 0px) + 14px);
      width: min(300px, calc(100vw - 24px));
    }
  }
  /* \u53F3\u4E0B\u89D2\u60AC\u6D6E\u64AD\u653E\u5668\uFF1A\u53C2\u8003\u7AD9\u5185\u5DE6\u4E0B\u89D2 APlayer \u7684\u5706\u76D8 + \u73BB\u7483\u9762\u677F */
  .mini[data-mode="fab"] {
    right: max(18px, env(safe-area-inset-right, 0px));
    bottom: calc(env(safe-area-inset-bottom, 0px) + 18px);
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
    -webkit-tap-highlight-color: transparent;
  }
  .fab-disc .art {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 10px 26px rgba(2, 6, 18, 0.48), 0 0 0 1px rgba(255, 255, 255, 0.1) inset;
    background: linear-gradient(135deg, rgba(46, 230, 197, 0.2), rgba(123, 92, 255, 0.26));
  }
  .fab-disc .art img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
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
  @keyframes fabRingSpin {
    to { transform: rotate(1turn); }
  }
  @media (prefers-reduced-motion: reduce) {
    .mini, .controls button, .progress span { transition: none; }
  }
`;function T(r){return r===!0||r==="1"?["top"]:Array.isArray(r)?[...new Set(r.map(t=>String(t)).filter(t=>Pt.has(t)))]:typeof r!="string"||!r||r==="none"?[]:r.includes(",")?[...new Set(r.split(",").map(t=>t.trim()).filter(t=>Pt.has(t)))]:Pt.has(r)?[r]:[]}function Je(r){return T(r)[0]||"none"}function _t(r){return typeof r=="string"&&r.startsWith("media_player.")?r:""}function Z(r){if(!r||typeof r!="object"||Array.isArray(r))return{};let t={};for(let e of Pt){let i=_t(r[e]);i&&(t[e]=i)}return t}function Tt(){if(typeof document>"u")return null;let r=document.querySelector("home-assistant");if(r?.hass?.states)return r.hass;let t=r?.shadowRoot?.querySelector("home-assistant-main");if(t?.hass?.states)return t.hass;let e=document.querySelector("ha-music");return e?.hass?.states?e.hass:null}function Rt(){try{let r=window.localStorage.getItem(ft);if(!r)return null;let t=JSON.parse(r),e=T(t?.modes??t?.mode),i=Z(t?.entities),a=_t(t?.entity);a&&e[0]&&!i[e[0]]&&(i[e[0]]=a);let n=e.filter(s=>i[s]);return n.length?{modes:n,entities:i}:null}catch{return null}}function Xe(r={}){try{let t=T(r.modes??r.mode),e=Z(r.entities),i=_t(r.entity);i&&t[0]&&!e[t[0]]&&(e[t[0]]=i);let a=t.filter(o=>e[o]);if(!a.length){window.localStorage.removeItem(ft);return}let n=JSON.stringify({modes:a,entities:e});if(window.localStorage.getItem(ft)===n)return;window.localStorage.setItem(ft,n)}catch{}}function Ze(){try{window.localStorage.removeItem(ft)}catch{}}function re(r){if(typeof document>"u")return;let t=window.__haMusicDocks;if(t&&typeof t.get=="function"){if(r)t.get(r)?.remove(),t.delete(r);else{for(let e of t.values())e.remove();t.clear()}window.__haMusicDock=t.values().next().value||null;return}window.__haMusicDock?.remove(),window.__haMusicDock=null}function xt(r=[]){if(typeof window>"u"||typeof document>"u")return[];let t=[];for(let a of Array.isArray(r)?r:[r]){let n=Je(a?.mode),s=_t(a?.entity);n==="none"||!s||t.push({mode:n,entity:s,hass:a?.hass||null})}if(!t.length)return re(),[];if(!document.body)return document.addEventListener("DOMContentLoaded",()=>xt(t),{once:!0}),[];let e=window.__haMusicDocks instanceof Map?window.__haMusicDocks:new Map,i=new Map(t.map(a=>[a.mode,a]));for(let[a,n]of e)i.has(a)||(n.remove(),e.delete(a));for(let[a,n]of i){let s=e.get(a);s?s.update(n):(s=document.createElement("ha-music-mini"),s.update(n),document.body.appendChild(s),e.set(a,s))}return window.__haMusicDocks=e,window.__haMusicDock=e.values().next().value||null,[...e.values()]}var se=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this._mode="top",this._open=!1,this._entity="",this._hass=null,this._poll=null,this._onClick=t=>this._handleClick(t),this._onRoute=()=>this._sync(),this._sync=this._sync.bind(this)}update(t={}){let e=Je(t.mode),i=_t(t.entity),a=e!==this._mode;this._mode=e,a&&(this._open=!1),this._entity=i,t.hass?.states&&(this._hass=t.hass),(!this.shadowRoot.childElementCount||a)&&this._render(),this._sync()}connectedCallback(){this.shadowRoot.childElementCount||this._render(),this.shadowRoot.addEventListener("click",this._onClick),window.addEventListener("location-changed",this._onRoute),this._startPolling(),this._sync()}disconnectedCallback(){this.shadowRoot.removeEventListener("click",this._onClick),window.removeEventListener("location-changed",this._onRoute),this._poll&&clearInterval(this._poll),this._poll=null}_startPolling(){this._poll||(this._poll=window.setInterval(()=>{let t=Tt()||this._hass;t?.states&&(this._hass=t,this._sync())},1e3))}_render(){if(this._mode==="fab")return this._renderFab();this.shadowRoot.innerHTML=`
      <style>${Qe}</style>
      <div class="mini" data-mode="${this._mode}" role="region" aria-label="HA Music \u8FF7\u4F60\u64AD\u653E\u5668">
        <div class="art">
          <img alt="" />
          <span class="fallback">${Ke}</span>
        </div>
        <div class="meta">
          <div class="title">\u9009\u62E9\u64AD\u653E\u5668</div>
          <div class="sub">\u5728\u5361\u7247\u7F16\u8F91\u5668\u4E2D\u9009\u62E9\u4F4D\u7F6E</div>
        </div>
        <div class="controls">
          <button data-act="prev" type="button" aria-label="\u4E0A\u4E00\u9996">${We}</button>
          <button class="toggle" data-act="toggle" type="button" aria-label="\u64AD\u653E">${zt}</button>
          <button data-act="next" type="button" aria-label="\u4E0B\u4E00\u9996">${Ye}</button>
        </div>
        <div class="progress"><span></span></div>
      </div>
    `,this._mini=this.shadowRoot.querySelector(".mini"),this._art=this.shadowRoot.querySelector(".art img"),this._fallback=this.shadowRoot.querySelector(".fallback"),this._title=this.shadowRoot.querySelector(".title"),this._sub=this.shadowRoot.querySelector(".sub"),this._toggle=this.shadowRoot.querySelector(".toggle"),this._prev=this.shadowRoot.querySelector('[data-act="prev"]'),this._next=this.shadowRoot.querySelector('[data-act="next"]'),this._progress=this.shadowRoot.querySelector(".progress span"),this._disc=null,this._quick=null,this._art.addEventListener("error",()=>{this._art.removeAttribute("src"),this._fallback.style.display="grid"})}_renderFab(){this.shadowRoot.innerHTML=`
      <style>${Qe}</style>
      <div class="mini mini-fab" data-mode="fab" data-open="${this._open?"true":"false"}" role="region" aria-label="HA Music \u60AC\u6D6E\u64AD\u653E\u5668">
        <div class="fab-orb">
          <button class="fab-disc" data-act="expand" type="button" aria-label="\u5C55\u5F00\u64AD\u653E\u5668" aria-expanded="${this._open?"true":"false"}">
            <div class="art">
              <img alt="" />
              <span class="fallback">${Ke}</span>
            </div>
            <span class="fab-glow"></span>
          </button>
          <button class="fab-quick" data-act="toggle" type="button" aria-label="\u64AD\u653E">${zt}</button>
        </div>
        <div class="fab-panel">
          <div class="fab-head">
            <div class="meta">
              <div class="title">\u9009\u62E9\u64AD\u653E\u5668</div>
              <div class="sub">\u5728\u5361\u7247\u7F16\u8F91\u5668\u4E2D\u9009\u62E9\u4F4D\u7F6E</div>
            </div>
            <button class="fab-collapse" data-act="expand" type="button" aria-label="\u6536\u8D77\u64AD\u653E\u5668">${Ge}</button>
          </div>
          <div class="progress"><span></span></div>
          <div class="controls">
            <button data-act="prev" type="button" aria-label="\u4E0A\u4E00\u9996">${We}</button>
            <button class="toggle" data-act="toggle" type="button" aria-label="\u64AD\u653E">${zt}</button>
            <button data-act="next" type="button" aria-label="\u4E0B\u4E00\u9996">${Ye}</button>
          </div>
        </div>
      </div>
    `,this._mini=this.shadowRoot.querySelector(".mini"),this._art=this.shadowRoot.querySelector(".art img"),this._fallback=this.shadowRoot.querySelector(".fallback"),this._title=this.shadowRoot.querySelector(".title"),this._sub=this.shadowRoot.querySelector(".sub"),this._toggle=this.shadowRoot.querySelector(".fab-panel .toggle"),this._prev=this.shadowRoot.querySelector('.fab-panel [data-act="prev"]'),this._next=this.shadowRoot.querySelector('.fab-panel [data-act="next"]'),this._progress=this.shadowRoot.querySelector(".fab-panel .progress span"),this._disc=this.shadowRoot.querySelector(".fab-disc"),this._quick=this.shadowRoot.querySelector(".fab-quick"),this._collapse=this.shadowRoot.querySelector(".fab-collapse"),this._art.addEventListener("error",()=>{this._art.removeAttribute("src"),this._fallback.style.display="grid"})}_stateLabel(t){let e=!this._hass?.language||String(this._hass.language).startsWith("zh");return{playing:e?"\u64AD\u653E\u4E2D":"Playing",paused:e?"\u5DF2\u6682\u505C":"Paused",idle:e?"\u7A7A\u95F2":"Idle",off:e?"\u5DF2\u5173\u95ED":"Off",unavailable:e?"\u4E0D\u53EF\u7528":"Unavailable",unknown:e?"\u672A\u77E5":"Unknown"}[t]||t}_sync(){if(!this._mini)return;if(this._mini.dataset.mode=this._mode,this._mode==="fab"&&(this._mini.dataset.open=this._open?"true":"false"),!this._entity){this._title.textContent="\u9009\u62E9\u64AD\u653E\u5668",this._sub.textContent="\u5728\u5361\u7247\u7F16\u8F91\u5668\u4E2D\u9009\u62E9\u4F4D\u7F6E",this._setDisabled(!0),this._progress.style.width="0%",this._setArt(null);return}let t=Tt()||this._hass;t?.states&&(this._hass=t);let e=this._hass?.states?.[this._entity];if(!e){this._title.textContent=this._entity,this._sub.textContent="\u5B9E\u4F53\u4E0D\u53EF\u7528",this._setDisabled(!0),this._progress.style.width="0%",this._setArt(null);return}let i=e.attributes||{},a=i.media_title||i.friendly_name||this._entity;this._title.textContent=a;let n=i.media_artist||i.media_album_name||"";n===a&&(n="");let s=this._stateLabel(e.state);this._sub.textContent=n?`${n} \xB7 ${s}`:s,this._setDisabled(!1);let o=e.state==="playing",l=o?Mi:zt;this._toggle.innerHTML=l,this._toggle.setAttribute("aria-label",o?"\u6682\u505C":"\u64AD\u653E"),this._quick&&(this._quick.innerHTML=l,this._quick.setAttribute("aria-label",o?"\u6682\u505C":"\u64AD\u653E")),this._disc&&(this._disc.setAttribute("aria-label",this._open?"\u6536\u8D77\u64AD\u653E\u5668":"\u5C55\u5F00\u64AD\u653E\u5668"),this._disc.setAttribute("aria-expanded",this._open?"true":"false")),this._collapse&&(this._collapse.innerHTML=Ge),this._setArt(i.entity_picture);let h=Number(i.media_duration||0),d=Number(i.media_position||0),u=h>0?Math.min(100,Math.max(0,d/h*100)):0;this._progress.style.width=`${u}%`}_setArt(t){if(this._art)if(t)try{let e=new URL(t,window.location.href).href;this._art.getAttribute("src")!==e&&(this._art.src=e),this._fallback.style.display="none",this._mini?.style.setProperty("--fab-cover",`url(${JSON.stringify(e)})`)}catch{this._art.removeAttribute("src"),this._fallback.style.display="grid",this._mini?.style.removeProperty("--fab-cover")}else this._art.removeAttribute("src"),this._fallback.style.display="grid",this._mini?.style.removeProperty("--fab-cover")}_setDisabled(t){for(let e of[this._prev,this._toggle,this._next,this._quick])e&&(e.disabled=t)}_toggleOpen(){this._mode!=="fab"||!this._mini||(this._open=!this._open,this._mini.dataset.open=this._open?"true":"false",this._disc&&(this._disc.setAttribute("aria-label",this._open?"\u6536\u8D77\u64AD\u653E\u5668":"\u5C55\u5F00\u64AD\u653E\u5668"),this._disc.setAttribute("aria-expanded",this._open?"true":"false")))}_handleClick(t){let e=t.target.closest?.("button[data-act]");if(!e||e.disabled)return;t.preventDefault(),t.stopPropagation();let i=e.dataset.act;i==="expand"?this._toggleOpen():i==="toggle"?this._call("media_play_pause"):i==="prev"?this._call("media_previous_track"):i==="next"&&this._call("media_next_track")}_call(t){if(!this._hass||!this._entity)return;let e=this._hass.callService("media_player",t,{entity_id:this._entity});e?.catch&&e.catch(i=>console.warn("ha-music mini player:",i))}};customElements.get("ha-music-mini")||customElements.define("ha-music-mini",se);var ne=["off","all","one"],Ci=260;function zi(r,t,e){let i=new CustomEvent(t,{bubbles:!0,composed:!0,cancelable:!1,detail:e});return r.dispatchEvent(i),i}function oe(r,t,e,i,a){let n=[];for(let s=0;s<=r;s+=4){let o=t/2+Math.sin(s/e*Math.PI*2+a)*i+Math.sin(s/(e/2)*Math.PI*2+a*1.7)*(i*.32);n.push(`${s.toFixed(1)},${o.toFixed(2)}`)}return`M${n.join(" L")}`}function Pi(r){switch(r){case"playing":return"playing";case"buffering":return"buffering";case"paused":return"paused";case"idle":return"idle";case"off":return"off";default:return"idle"}}var le=class extends A{static get styles(){return Ne}static get properties(){return{_config:{state:!0},_width:{state:!1}}}constructor(){super(),this._config={},this._hass=void 0,this._activeEntity="",this._sig="",this._width=0,this._panel=!1,this._tickTimer=null,this._toast="",this._toastTimer=null,this._menu=null,this._seekPreview=null,this._volumePreview=null,this._showRemaining=!1,this._drawer=this._emptyDrawer(),this._artUrl="",this._artSlot=0,this._palette=null,this._paletteKey="",this._resizeObserver=null}set hass(t){let e=this._hass;if(this._hass=t,!t)return;let i=this._computeSig(t);(i!==this._sig||e===void 0)&&(this._sig=i,this.requestUpdate()),this._syncTimer()}get hass(){return this._hass}setConfig(t){if(!t)throw new Error("ha-music: \u914D\u7F6E\u4E0D\u80FD\u4E3A\u7A7A");let e=Array.isArray(t.entities)&&t.entities.length?t.entities.filter(Boolean):t.entity?[t.entity]:[];if(!e.length)throw new Error("ha-music: \u9700\u8981\u914D\u7F6E entity\uFF08media_player.*\uFF09\u6216 entities \u5217\u8868");this._config={...t},e.includes(this._activeEntity)||(this._activeEntity=e[0],this._palette=null,this._paletteKey="",this._artUrl=""),this._sig="",this._hass&&(this._sig=this._computeSig(this._hass)),this._syncTimer(),this.requestUpdate()}connectedCallback(){super.connectedCallback(),this._onKeyDown=t=>{t.key==="Escape"&&(this._drawer.open?this._closeDrawer():this._menu&&(this._menu=null,this.requestUpdate()))},window.addEventListener("keydown",this._onKeyDown),typeof ResizeObserver<"u"&&(this._resizeObserver=new ResizeObserver(t=>{let e=t[0]?.contentRect?.width||0;if(Math.abs(e-this._width)<1)return;this._width=e,(this._config?.layout||"adaptive")==="adaptive"&&this.requestUpdate()}),this._resizeObserver.observe(this))}disconnectedCallback(){super.disconnectedCallback(),this._onKeyDown&&(window.removeEventListener("keydown",this._onKeyDown),this._onKeyDown=null),this._stopTimer(),this._resizeObserver?.disconnect(),this._resizeObserver=null,this._toastTimer&&clearTimeout(this._toastTimer)}_entities(){let t=this._config||{};return(Array.isArray(t.entities)&&t.entities.length?t.entities:t.entity?[t.entity]:[]).filter(Boolean)}_eid(){let t=this._entities();return this._activeEntity||t[0]||""}_state(t=this._eid()){return this._hass?.states?.[t]}_computeSig(t){let e=this._eid(),i=t.states?.[e],a=i?.attributes||{},n=["media_title","media_artist","media_album_name","media_series_title","entity_picture","media_duration","media_position","media_position_updated_at","media_metadata","media_content_id","volume_level","is_volume_muted","shuffle","repeat","source","source_list","sound_mode","sound_mode_list","supported_features","group_members","app_name","queue","media_track"],s={};for(let d of n)d in a&&(s[d]=a[d]);let o=this._config?.volume_entity,l=o?t.states?.[o]?.state:null,h=this._entities().map(d=>{let u=t.states?.[d];return[d,u?.state,u?.attributes?.entity_picture]});return JSON.stringify([e,i?.state,s,l,h,t.language,this._config,this._menu,this._drawer.open,this._drawer.mode,this._drawer.cursor,this._drawer.items.length,this._drawer.loading,this._drawer.error,this._showRemaining,this._layoutKey()])}_syncTimer(){let t=this._state()?.state,e=t==="playing"||t==="buffering";e&&!this._tickTimer?this._tickTimer=setInterval(()=>this.requestUpdate(),500):e||this._stopTimer()}_stopTimer(){this._tickTimer&&(clearInterval(this._tickTimer),this._tickTimer=null)}_layoutKey(){let t=this._config?.layout||"adaptive";return t==="adaptive"?this._width&&this._width<430?"compact":"full":["full","compact","mini"].includes(t)?t:"full"}_themeKey(){let t=this._config?.theme;return t&&X[t]?t:Qt}_themeVars(){let t=X[this._themeKey()],e=this._paletteKey||this._eid()||"ha-music",i=je(e),a=this._palette,n=this._config?.accent,s=this._config?.palette!==!1,o=t.accent[0],l=t.accent[1],h=Ct(o),d=Ct(l),u=h,b=ie(t.accent[1]),y=ie(i.a2);if(s){if(a){let f=ae(b,{h:a.h2,s:a.s2,l:a.l2},.5);l=f.css,d=f.rgb,u=a.rgb1}else if(y){let f=ae(b,y,.35);l=f.css,d=f.rgb}}return n&&(o=n,h=Ct(n,h),s||(u=h)),{"--hm-base":t.base,"--hm-a1":o,"--hm-a2":l,"--hm-a1-rgb":h,"--hm-a2-rgb":d,"--hm-glow-rgb":u}}_volumeInfo(t){let e=this._config?.volume_entity,i=e?this._hass?.states?.[e]:void 0;if(i){let s=i.entity_id;if(s.startsWith("media_player."))return{domain:"media_player",entityId:s,level:Number(i.attributes?.volume_level??0),muted:!!i.attributes?.is_volume_muted,supported:!0,external:!0};if(s.startsWith("number.")){let o=Number(i.state);if(Number.isFinite(o))return{domain:"number",entityId:s,level:v(o/(i.attributes?.max||100),0,1),muted:!1,supported:!0,external:!0}}if(s.startsWith("input_number.")){let o=Number(i.state);if(Number.isFinite(o))return{domain:"input_number",entityId:s,level:v(o/(i.attributes?.max||100),0,1),muted:!1,supported:!0,external:!0}}}let a=this._state(),n=Number.isFinite(t.volume)||x(a,_.VOLUME_SET)||x(a,_.VOLUME_MUTE);return{domain:"media_player",entityId:this._eid(),level:Number.isFinite(t.volume)?t.volume:0,muted:t.muted,supported:n,external:!1}}_repeatValue(){let t=this._state()?.attributes?.repeat;return["off","all","one"].includes(t)?t:"off"}_call(t,e,i="media_player",a){let n=this._hass;if(!n?.callService)return Promise.resolve();let s=a??this._eid();try{let o=n.callService(i,t,{entity_id:s,...e});return Promise.resolve(o)}catch(o){return this._notify(o?.message||String(o)),Promise.reject(o)}}_guard(t){Promise.resolve(t).catch(e=>{let i=e?.message||String(e);this._notify(i.length>60?i.slice(0,60):i)})}_notify(t){this._toast=t||"",this.requestUpdate(),this._toastTimer&&clearTimeout(this._toastTimer),t&&(this._toastTimer=setTimeout(()=>{this._toast="",this.requestUpdate()},3600))}_togglePlay(){let t=this._state()?.state,e=t==="playing"||t==="buffering";this._guard(this._call(e?"media_pause":"media_play"))}_power(){let t=this._state()?.state,e=t==="off"||t==="standby";this._guard(this._call(e?"turn_on":"turn_off"))}_shuffle(){let t=!!this._state()?.attributes?.shuffle;this._guard(this._call("shuffle_set",{shuffle:!t}))}_repeat(){let t=this._repeatValue(),e=ne.indexOf(t),i=ne[(e+1)%ne.length];this._guard(this._call("repeat_set",{repeat:i}))}_seekTo(t){Number.isFinite(t)&&this._guard(this._call("media_seek",{seek_position:t}))}_onSeekInput(t){if(!x(this._state(),_.SEEK))return;let e=t.target,i=Number(e.value);this._seekPreview=i;let a=O(this._state()).duration;e.style.setProperty("--pct",`${a?v(i/a*100,0,100):0}%`)}_onSeekCommit(t){if(!x(this._state(),_.SEEK)){this.requestUpdate();return}let e=Number(t.target.value);this._seekPreview=null,this._seekTo(e),this.requestUpdate()}_onVolumeInput(t){let e=Number(t.target.value)/100;this._volumePreview=e,t.target.style.setProperty("--pct",`${e*100}%`)}_onVolumeCommit(t){let e=v(Number(t.target.value)/100,0,1);this._volumePreview=null;let i=this._volumeInfo(O(this._state()));if(i.domain==="media_player")this._guard(this._call("volume_set",{volume_level:e},"media_player",i.entityId));else{let a=this._hass?.states?.[i.entityId],n=Number(a?.attributes?.max??100),s=Number(a?.attributes?.min??0);this._guard(this._call("set_value",{value:Math.round(s+e*(n-s))},i.domain,i.entityId))}this.requestUpdate()}_toggleMute(){let t=O(this._state()),e=this._volumeInfo(t);if(e.external){e.domain==="media_player"?this._guard(this._call("volume_mute",{is_volume_muted:!e.muted},"media_player",e.entityId)):this._notify(E(this._hass?.language)("volumeEntityMissing"));return}this._guard(this._call("volume_mute",{is_volume_muted:!t.muted}))}_selectSource(t){this._menu=null,this._guard(this._call("select_source",{source:t})),this.requestUpdate()}_selectSoundMode(t){this._menu=null,this._guard(this._call("select_sound_mode",{sound_mode:t})),this.requestUpdate()}_leaveGroup(){this._guard(this._call("unjoin"))}_playQueueItem(t){if(!t?.contentId){this._notify(E(this._hass?.language)("queueEmpty"));return}this._guard(this._call("play_media",{media_content_id:t.contentId,media_content_type:t.contentType||"music"}))}_playBrowseItem(t){t?.contentId&&this._guard(this._call("play_media",{media_content_id:t.contentId,media_content_type:t.contentType||"music"}))}_switchEntity(t){t!==this._activeEntity&&(this._activeEntity=t,this._palette=null,this._paletteKey="",this._artUrl="",this._menu=null,this._seekPreview=null,this._syncTimer(),this._sig=this._computeSig(this._hass),this.requestUpdate())}_moreInfo(){zi(this,"hass-more-info",{entityId:this._eid()})}_maEnabled(){let t=this._config?.music_assistant;if(t===!1)return!1;if(t===!0||typeof t=="string"&&t.trim()||this._hass?.services?.music_assistant?.play_media||this._entities().some(a=>{let n=this._hass?.states?.[a]?.attributes||{};return Object.keys(n).some(s=>s.startsWith("mass_"))}))return!0;let i=this._hass?.panels||{};return Object.keys(i).some(a=>{let n=i[a]||{};return n.component_name==="music_assistant"||/music[-_ ]?assistant/i.test(n.url_path||a)||/music\s*assistant/i.test(n.title||"")})}_isMaPlayer(t=this._eid()){let e=this._state(t)?.attributes||{};return Object.keys(e).some(i=>i.startsWith("mass_"))}_maUrl(){let t=this._config?.music_assistant;if(t===!1)return"";if(typeof t=="string"&&t.trim())return t.trim();let e=this._hass?.panels||{};for(let a of Object.keys(e)){let n=e[a]||{},s=n.url_path||a;if(n.component_name==="music_assistant"||/music[-_ ]?assistant/i.test(s)||/music\s*assistant/i.test(n.title||""))return`/${s}`}return this._entities().some(a=>{let n=this._hass?.states?.[a]?.attributes||{};return Object.keys(n).some(s=>s.startsWith("mass_"))})||t===!0?"/music-assistant":""}_openAssistant(){this._drawer?.open&&this._closeDrawer();let t=this._maUrl();if(!t)return;if(/^(https?:)?\/\//i.test(t)){window.open(t,"_blank","noopener");return}let e=t.startsWith("/")?t:`/${t}`;try{window.history.pushState(null,"",e),window.dispatchEvent(new Event("location-changed",{bubbles:!0,composed:!0}))}catch{window.location.href=e}}_onCardClick(t){if(!this._menu)return;(t.composedPath?.()||[]).some(a=>a?.classList?.contains?.("hm-menu")||a?.classList?.contains?.("hm-chip"))||(this._menu=null,this.requestUpdate())}_emptyDrawer(){return{open:!1,mode:null,nodes:[],cursor:-1,items:[],title:"",loading:!1,error:""}}_openQueue(){let t=E(this._hass?.language),e=ee(this._state(),this._config?.max_queue??40);this._drawer={open:!0,mode:"queue",nodes:[],cursor:-1,items:e,title:t("queue"),loading:!1,error:""},this.requestUpdate()}_openLibrary(){let t=E(this._hass?.language);this._drawer={open:!0,mode:"library",nodes:[],cursor:-1,items:[],title:t("library"),loading:!0,error:"",t},this.requestUpdate(),this._fetchBrowse()}_openPlaylists(){let t=E(this._hass?.language);if(!this._isMaPlayer()){this._notify(t("maPlayerRequired"));return}this._drawer={open:!0,mode:"playlists",nodes:[],cursor:-1,items:[],title:t("playlists"),loading:!0,error:"",maUrl:this._maUrl()},this.requestUpdate(),this._fetchPlaylists()}async _browseMedia(t,e){let i=this._hass?.connection;if(!i?.sendMessagePromise)throw new Error("unsupported");let a={type:"media_player/browse_media",entity_id:this._eid()};return t&&(a.media_content_id=t,e&&(a.media_content_type=e)),i.sendMessagePromise(a)}async _fetchPlaylists(){let t=E(this._hass?.language);try{let i=(await this._browseMedia())?.children||[],a=i.find(o=>o.can_expand&&(/playlist/i.test(o.media_class||"")||/playlist/i.test(o.media_content_type||"")||/播放列表|playlists?/i.test(o.title||""))||!1),n=[];a&&(n=(await this._browseMedia(a.media_content_id,a.media_content_type))?.children||[]),n.length||(n=i.filter(o=>/playlist/i.test(o.media_class||"")));let s=n.map(o=>({title:o.title||"",subtitle:(()=>{let l=te(o.media_class,this._hass?.language);return l&&l!==t("playlists")?l:""})(),contentId:o.media_content_id||"",contentType:o.media_content_type||"playlist",thumb:o.thumbnail||""})).filter(o=>o.contentId);if(this._drawer.mode!=="playlists")return;this._drawer={...this._drawer,loading:!1,items:s,error:""}}catch(e){if(this._drawer.mode!=="playlists")return;this._drawer={...this._drawer,loading:!1,items:[],error:e?.message?`${t("browseFailed")} \xB7 ${String(e.message).slice(0,40)}`:t("browseFailed")}}this.requestUpdate()}async _playPlaylistItem(t){if(!t?.contentId)return;let e=E(this._hass?.language),i=this._eid();if(!this._isMaPlayer(i)){this._notify(e("maPlayerRequired"));return}let a=t.contentType||"playlist",n=()=>{this._notify(`${e("playingPlaylist")} \xB7 ${t.title||""}`),this._closeDrawer()},s=!!this._hass?.services?.music_assistant?.play_media,o=l=>{let h=l?.message||String(l);return/nothing to play here/i.test(h)?e("playlistEmpty"):h.length>60?h.slice(0,60):h};if(s)try{await this._hass.callService("music_assistant","play_media",{entity_id:i,media_id:t.contentId,media_type:"playlist",enqueue:"play"}),n();return}catch(l){let h=l?.message||String(l);if(/nothing to play here/i.test(h)){this._markPlaylistEmpty(t),this._notify(o(l));return}if(!/match|target|not a valid|does not support|unsupported/i.test(h)){this._notify(o(l));return}}try{await this._call("play_media",{media_content_id:t.contentId,media_content_type:a}),n()}catch(l){/nothing to play here/i.test(l?.message||"")&&this._markPlaylistEmpty(t),this._notify(o(l)||e("browseFailed"))}}_markPlaylistEmpty(t){this._drawer.mode==="playlists"&&(this._drawer={...this._drawer,items:this._drawer.items.map(e=>e.contentId===t.contentId?{...e,empty:!0}:e)},this.requestUpdate())}_closeDrawer(){this._drawer={...this._drawer,open:!1},this.requestUpdate(),setTimeout(()=>{this._drawer.open||(this._drawer=this._emptyDrawer(),this.requestUpdate())},Ci)}async _fetchBrowse(){let t=this._hass,e=t?.connection,i=E(t?.language),a=this._drawer.cursor>=0?this._drawer.nodes[this._drawer.cursor]:null,n={type:"media_player/browse_media",entity_id:this._eid()};if(a&&(n.media_content_id=a.contentId,a.contentType&&(n.media_content_type=a.contentType)),this._drawer={...this._drawer,loading:!0,error:""},this.requestUpdate(),!e?.sendMessagePromise){this._drawer={...this._drawer,loading:!1,error:i("browseFailed")},this.requestUpdate();return}try{let s=await e.sendMessagePromise(n),o=(s?.children||[]).map(l=>({title:l.title||"",subtitle:te(l.media_class,this._hass?.language)||l.media_content_type||"",contentId:l.media_content_id||"",contentType:l.media_content_type||"",thumb:l.thumbnail||"",canPlay:!!l.can_play,canExpand:!!l.can_expand,cls:l.media_class||""}));if(this._drawer.mode!=="library")return;this._drawer={...this._drawer,loading:!1,items:o,title:a?.title||s?.title||i("library"),error:""}}catch(s){if(this._drawer.mode!=="library")return;this._drawer={...this._drawer,loading:!1,items:[],error:s?.message?`${i("browseFailed")} \xB7 ${String(s.message).slice(0,40)}`:i("browseFailed")}}this.requestUpdate()}_enterBrowseItem(t){if(!t.canExpand){t.canPlay&&this._playBrowseItem(t);return}let e=this._drawer.nodes.slice(0,this._drawer.cursor+1);e.push({contentId:t.contentId,contentType:t.contentType,title:t.title}),this._drawer={...this._drawer,nodes:e,cursor:e.length-1,title:t.title,items:[]},this.requestUpdate(),this._fetchBrowse()}_browseBack(){this._drawer.cursor<0||(this._drawer={...this._drawer,cursor:this._drawer.cursor-1,items:[]},this.requestUpdate(),this._fetchBrowse())}updated(){let t=this.renderRoot?.querySelector?.(".hm-card");if(!t)return;let e=this._artUrlFor();e!==this._artUrl&&(this._artUrl=e,this._crossFadeArt(t,e)),this._syncRangeValues(),this._syncPanelFlag(),this._installDock()}_isPanelContext(){if(this.closest?.("hui-panel-view"))return!0;let t=this.getRootNode?.();for(;t;){let e=t.host;if(!e)break;if(String(e.tagName||"").toLowerCase()==="hui-panel-view")return!0;t=e.getRootNode?.()}return!1}_syncPanelFlag(){let t=this._isPanelContext();t!==this._panel&&(this._panel=t,this.setAttribute("data-panel",String(t)),this.renderRoot?.querySelector?.(".hm-card")?.setAttribute("data-panel",String(t)))}_isPreviewContext(){let t=this.getRootNode?.();for(;t;){let e=t.host;if(!e)break;let i=String(e.tagName||"").toLowerCase();if(i==="hui-card-preview"||i==="hui-card-options"||i==="hui-dialog-edit-card"||i==="ha-dialog")return!0;t=e.getRootNode?.()}return!!this.closest?.("hui-card-preview, hui-card-options")}_installDock(){let t=T(this._config?.dock),e=Z(this._config?.dock_entities),i=this._eid?.()||this._config?.entity||(Array.isArray(this._config?.entities)?this._config.entities[0]:"");if(!t.length){let s=Rt();s&&(!i||Object.values(s.entities).includes(i))&&(Ze(),re());return}if(!this._hass||!this.isConnected||!i||this._isPreviewContext())return;let a={};for(let s of t){let o=e[s]||i;o&&(a[s]=o)}let n=Object.entries(a).map(([s,o])=>({mode:s,entity:o,hass:this._hass}));xt(n),Xe({modes:Object.keys(a),entities:a})}_artUrlFor(){let t=O(this._state());return q(this._hass,t.art)}_crossFadeArt(t,e){let i=t.querySelectorAll(".hm-bg-art");if(!i.length)return;let a=i.length>1?(this._artSlot+1)%2:0,n=i[a],s=i[this._artSlot];if(!e){i.forEach(l=>{l.classList.remove("on"),l.style.backgroundImage=""}),this._artSlot=0,this._maybePalette("");return}let o=new Image;o.decoding="async",o.onload=()=>{n.style.backgroundImage=`url("${e}")`,n.classList.add("on"),s?.classList.remove("on"),this._artSlot=a,this._maybePalette(e)},o.onerror=()=>{this._maybePalette("")},o.src=e}_maybePalette(t){let e=O(this._state()),i=t||`${e.title}|${e.artist}|${this._eid()}`;if(this._paletteKey!==i){if(this._paletteKey=i,!t){this._palette=null,this.requestUpdate();return}Be(t,i).then(a=>{this._paletteKey===i&&(this._palette=a,this.requestUpdate())})}}_syncRangeValues(){let t=this.renderRoot;if(!t)return;let e=t.querySelector?.('input.hm-range[data-role="seek"]'),i=t.querySelector?.('input.hm-range[data-role="volume"]'),a=O(this._state());if(e&&this._seekPreview===null){let n=a.duration||0,s=v(a.position,0,n||a.position);e.value=String(s),e.max=String(n||0),e.style.setProperty("--pct",`${n?v(s/n*100,0,100):0}%`)}if(i&&this._volumePreview===null){let n=this._volumeInfo(a);i.value=String(Math.round(n.level*100)),i.style.setProperty("--pct",`${n.level*100}%`),i.setAttribute("data-disabled",String(!n.supported))}}getCardSize(){let t=this._layoutKey();return t==="mini"?1:t==="compact"?3:6}render(){let t=this._hass,e=this._config||{},i=E(t?.language),a=this._layoutKey(),n=this._themeKey();if(!t)return c`
        <div class="hm-card" data-layout=${a} data-panel=${this._panel?"true":"false"} data-theme=${n} style=${P(this._themeVars())}>
          <div class="hm-body">
            <div class="hm-empty">${i("loading")}</div>
          </div>
        </div>
      `;let s=this._eid(),o=t.states?.[s];if(!o)return c`
        <div class="hm-card" data-layout=${a} data-panel=${this._panel?"true":"false"} data-theme=${n} style=${P(this._themeVars())}>
          <div class="hm-body">
            <div class="hm-empty">
              ${s?`\u5B9E\u4F53\u672A\u627E\u5230\uFF1A${s}`:"ha-music: entity \u672A\u914D\u7F6E"}
            </div>
          </div>
        </div>
      `;let l=O(o),h=ee(o,e.max_queue??40),d=o.state==="playing"||o.state==="buffering",u=Pi(o.state),b=i(u),y=l.album||l.series||l.appName||(u==="playing"?i("playing"):b),f=this._volumeInfo(l),N=e.show_volume!==!1&&f.supported,tt=x(o,_.SHUFFLE_SET),k=x(o,_.REPEAT_SET),$=x(o,_.PREVIOUS_TRACK),L=x(o,_.NEXT_TRACK),D=x(o,_.PLAY)||x(o,_.PAUSE),I=o.state==="off"||o.state==="standby",S=I?x(o,_.TURN_ON):x(o,_.TURN_OFF),et=x(o,_.BROWSE_MEDIA),it=this._maEnabled()&&this._isMaPlayer(s),yt=x(o,_.SEEK),M=Array.isArray(o.attributes?.source_list)?o.attributes.source_list:[],F=Array.isArray(o.attributes?.sound_mode_list)?o.attributes.sound_mode_list:[],at=e.show_source!==!1&&M.length>0&&x(o,_.SELECT_SOURCE),H=F.length>0&&x(o,_.SELECT_SOUND_MODE),Ot=l.groupMembers.filter(w=>w&&w!==s),ue=e.show_group!==!1&&l.groupMembers.length>1,ai=e.show_queue!==!1&&h.length>0,si=e.show_library!==!1&&et,qt=e.visualizer||"bars",ri=e.cover||"ambient",Y=l.duration,vt=this._seekPreview??l.position,ni=Y?v(vt/Y*100,0,100):0,Nt=Math.round(f.level*100),G=this._repeatValue(),wt=l.title||"",me=this._entities(),ge=q(t,l.art);return c`
      <div
        class="hm-card"
        data-theme=${n}
        data-layout=${a}
        data-panel=${this._panel?"true":"false"}
        data-playing=${d?"true":"false"}
        data-cover=${ri}
        style=${P(this._themeVars())}
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
              <span class="hm-status-text">${b}</span>
              <span class="hm-kicker-sep">·</span>
              <span class="hm-status-text hm-status-player">${e.name||Mt(t,s,s)}</span>
            </div>
            <div class="hm-top-actions">
              ${it?c`<button
                    class="hm-icon-btn hm-ma"
                    aria-label=${i("playlists")}
                    title=${i("playlists")}
                    @click=${()=>this._openPlaylists()}
                  >
                    ${g("playlist",16)}
                  </button>`:p}
              ${ai?c`<button
                    class="hm-icon-btn"
                    aria-label=${i("queue")}
                    title=${i("queue")}
                    @click=${()=>this._openQueue()}
                  >
                    ${g("queue",16)}
                  </button>`:p}
              ${si?c`<button
                    class="hm-icon-btn"
                    aria-label=${i("library")}
                    title=${i("library")}
                    @click=${()=>this._openLibrary()}
                  >
                    ${g("library",16)}
                  </button>`:p}
              ${S?c`<button
                    class="hm-icon-btn"
                    data-role="power"
                    aria-label=${i("power")}
                    title=${i("power")}
                    @click=${()=>this._power()}
                  >
                    ${g("power",16)}
                  </button>`:p}
              <button
                class="hm-icon-btn"
                data-role="more"
                aria-label=${i("more")}
                title=${i("more")}
                @click=${()=>this._moreInfo()}
              >
                ${g("more",16)}
              </button>
            </div>
          </header>

          ${me.length>1?c`
                <div class="hm-entities">
                  ${me.map(w=>{let Lt=t.states?.[w],st=q(t,Lt?.attributes?.entity_picture);return c`<button
                      class="hm-entity-chip"
                      data-active=${w===s?"true":"false"}
                      @click=${()=>this._switchEntity(w)}
                    >
                      <span
                        class="hm-entity-dot"
                        style=${st?`background-image:url("${st}")`:""}
                      ></span>
                      <span class="hm-entity-name">${Mt(t,w,w)}</span>
                    </button>`})}
                </div>`:p}

          <section class="hm-main">
            <div class="hm-cover-wrap">
              <button
                class="hm-cover"
                data-playing=${d?"true":"false"}
                aria-label=${i("more")}
                title=${wt||i("noMedia")}
                @click=${()=>this._moreInfo()}
              >
                ${ge?c`<img src=${ge} alt=${wt||""} />`:c`<span class="hm-cover-ph">${g("music",40)}</span>`}
              </button>
              <div class="hm-cover-halo"></div>
            </div>

            <div class="hm-meta">
              <div class="hm-kicker">
                ${y||i("noMedia")}
                ${l.track?c`<span class="hm-kicker-sep">·</span>
                      <span>${i("track")} ${l.track}</span>`:p}
              </div>
              <h2 class="hm-title ${wt?"":"placeholder"}">
                ${wt||i("noTitle")}
              </h2>
              <div class="hm-artist">
                ${l.artist||(l.album?l.album:b)}
              </div>
              ${at||H||ue?c`<div class="hm-tags">
                    ${at?c`<button
                          class="hm-chip interactive"
                          @click=${()=>{this._menu=this._menu==="source"?null:"source",this.requestUpdate()}}
                        >
                          <span class="hm-chip-label">${i("source")}</span>
                          <span class="hm-chip-value">${l.source||"\u2014"}</span>
                        </button>`:p}
                    ${H?c`<button
                          class="hm-chip interactive"
                          @click=${()=>{this._menu=this._menu==="sound"?null:"sound",this.requestUpdate()}}
                        >
                          <span class="hm-chip-label">${i("soundMode")}</span>
                          <span class="hm-chip-value">${l.soundMode||"\u2014"}</span>
                        </button>`:p}
                    ${ue?c`<span
                          class="hm-chip ${x(o,_.GROUPING)?"interactive":""}"
                          title=${x(o,_.GROUPING)?`${i("group")} \xB7 ${i("groupLeave")}`:i("group")}
                          @click=${()=>{x(o,_.GROUPING)&&this._leaveGroup()}}
                        >
                          ${g("group",13)}
                          <span class="hm-group">
                            ${Ot.slice(0,3).map(w=>{let Lt=t.states?.[w],st=q(t,Lt?.attributes?.entity_picture);return c`<span
                                class="hm-group-avatar"
                                title=${Mt(t,w,w)}
                                style=${st?`background-image:url("${st}")`:""}
                              ></span>`})}
                            ${Ot.length>3?c`<span class="hm-group-more">+${Ot.length-3}</span>`:p}
                          </span>
                        </span>`:p}
                  </div>`:p}
            </div>
          </section>

          ${qt!=="none"?c`<div
                class="hm-vis"
                data-playing=${d?"true":"false"}
                data-style=${qt}
              >
                ${this._renderVisualizer(qt,l)}
              </div>`:p}

          ${Y>0?c`<section class="hm-progress">
                <span class="hm-time">${gt(vt)}</span>
                <input
                  class="hm-range"
                  data-role="seek"
                  type="range"
                  min="0"
                  max=${Y}
                  step="0.5"
                  .value=${String(vt)}
                  data-disabled=${yt?"false":"true"}
                  style=${P({"--pct":`${ni}%`})}
                  @input=${this._onSeekInput}
                  @change=${this._onSeekCommit}
                  aria-label=${i("seek")}
                />
                <span
                  class="hm-time end hoverable"
                  title=${i("remaining")}
                  @click=${()=>{this._showRemaining=!this._showRemaining,this.requestUpdate()}}
                >
                  ${this._showRemaining?`-${gt(Math.max(Y-vt,0))}`:gt(Y)}
                </span>
              </section>`:p}

          <section class="hm-controls">
            <div class="hm-transport">
              ${tt?c`<button
                    class="hm-btn"
                    data-role="shuffle"
                    data-on=${l.shuffle?"true":"false"}
                    aria-label=${i("shuffle")}
                    title=${i("shuffle")}
                    @click=${()=>this._shuffle()}
                  >
                    ${g("shuffle",18)}
                  </button>`:p}
              ${$?c`<button
                    class="hm-btn"
                    data-role="previous"
                    aria-label=${i("previous")}
                    title=${i("previous")}
                    @click=${()=>this._guard(this._call("media_previous_track"))}
                  >
                    ${g("previous",18)}
                  </button>`:p}
              ${D?c`<button
                    class="hm-play ${d?"is-playing":""}"
                    aria-label=${i(d?"pause":"play")}
                    title=${i(d?"pause":"play")}
                    @click=${()=>this._togglePlay()}
                  >
                    ${d?g("pause",26):g("play",26)}
                  </button>`:p}
              ${L?c`<button
                    class="hm-btn"
                    aria-label=${i("next")}
                    title=${i("next")}
                    @click=${()=>this._guard(this._call("media_next_track"))}
                  >
                    ${g("next",18)}
                  </button>`:p}
              ${k?c`<button
                    class="hm-btn"
                    data-role="repeat"
                    data-on=${G!=="off"?"true":"false"}
                    aria-label=${i(G==="one"?"repeatOne":G==="all"?"repeatAll":"repeatOff")}
                    title=${i(G==="one"?"repeatOne":G==="all"?"repeatAll":"repeatOff")}
                    @click=${()=>this._repeat()}
                  >
                    ${g(G==="one"?"repeatOne":"repeat",18)}
                  </button>`:p}
            </div>

            ${N?c`<div class="hm-volume">
                  <button
                    class="hm-icon-btn"
                    aria-label=${f.muted?i("unmute"):i("mute")}
                    title=${f.muted?i("unmute"):i("mute")}
                    @click=${()=>this._toggleMute()}
                  >
                    ${g(f.muted?"mute":"volume",16)}
                  </button>
                  <input
                    class="hm-range"
                    data-role="volume"
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    .value=${String(Nt)}
                    style=${P({"--pct":`${Nt}%`})}
                    @input=${this._onVolumeInput}
                    @change=${this._onVolumeCommit}
                    aria-label=${i("volume")}
                  />
                  <span class="hm-vol-pct">${Nt}%</span>
                </div>`:p}
          </section>
        </div>

        ${this._menu?c`<div class="hm-menu">
              <div class="hm-menu-head">
                ${this._menu==="source"?i("source"):i("soundMode")}
              </div>
              ${(this._menu==="source"?M:F).map(w=>c`<button
                  class="hm-menu-item"
                  data-active=${(this._menu==="source"?l.source:l.soundMode)===w?"true":"false"}
                  @click=${()=>this._menu==="source"?this._selectSource(w):this._selectSoundMode(w)}
                >
                  <span>${w}</span>
                  <span class="hm-menu-check">${g("check",13)}</span>
                </button>`)}
            </div>`:p}

        ${this._renderDrawer()}

        <div class="hm-toast ${this._toast?"show":""}">${this._toast}</div>
      </div>
    `}_renderVisualizer(t,e){let i=He(e);if(t==="wave"){let n=7+i.energy*6+i.low*7,s=4.5+i.pulse*5.5,o=2.2+i.pulse*3.2,l=i.phase,h=`${(i.period*2.4).toFixed(2)}s`;return c`<div class="hm-wave-wrap">
        <svg
          viewBox="0 0 600 40"
          preserveAspectRatio="none"
          aria-hidden="true"
          style=${P({animationDuration:h})}
        >
          <path
            d=${oe(600,40,150,n,l)}
            fill="none"
            stroke="rgba(var(--hm-a1-rgb), 0.85)"
            stroke-width="1.4"
          ></path>
          <path
            d=${oe(600,40,150,s,l*1.35+1.9)}
            fill="none"
            stroke="rgba(var(--hm-a2-rgb), 0.6)"
            stroke-width="1.2"
          ></path>
          <path
            d=${oe(600,40,75,o,l*1.7+3.2)}
            fill="none"
            stroke="rgba(var(--hm-a1-rgb), 0.35)"
            stroke-width="0.9"
          ></path>
        </svg>
      </div>`}return t==="orbit"?c`<div class="hm-orbit-wrap">
        ${[1,.58,.34].map((s,o)=>{let l=o===0?i.low:i.pulse;return c`<span
            class="hm-orbit-ring"
            style=${P({"--react":String(s),"--drive":l.toFixed(3),animationDuration:`${(i.period*(1.8+o*.25)).toFixed(2)}s`,animationDelay:`${(o*i.period*.55).toFixed(2)}s`})}
          ></span>`})}
      </div>`:c`<div class="hm-bars">
      ${Array.from({length:36},(n,s)=>{let o=W(`${i.seed}#${s}`),l=.14+o%100/135,h=s<12?0:s<24?1:2,d=[1,.62,.34][h],u=h===0?i.low:i.pulse,b=h===0?1+.12*u:1,y=v(l*(.55+d*.55*u)*b,.08,1),f=.9+(o>>8)%100/90,N=-((o>>16)%100/45);return c`<span
          class="hm-bar"
          style=${P({"--h":y.toFixed(3),"--dur":`${f.toFixed(2)}s`,"--delay":`${N.toFixed(2)}s`})}
        ></span>`})}
    </div>`}_renderDrawer(){let t=this._drawer,e=E(this._hass?.language),i=t.mode==="library",a=t.mode==="playlists";return c`
      <div
        class="hm-drawer ${t.open?"open":""}"
        role="dialog"
        aria-hidden=${t.open?"false":"true"}
      >
        <div class="hm-drawer-head">
          ${i&&t.cursor>=0?c`<button
                class="hm-icon-btn"
                aria-label=${e("back")}
                title=${e("back")}
                @click=${()=>this._browseBack()}
              >
                ${g("chevronLeft",16)}
              </button>`:p}
          <div class="hm-drawer-title">${t.title||(i?e("library"):"")}</div>
          ${a&&t.maUrl?c`<button
                class="hm-icon-btn hm-ma"
                aria-label=${e("openAssistant")}
                title=${e("openAssistant")}
                @click=${()=>this._openAssistant()}
              >
                ${g("external",15)}
              </button>`:p}
          <button
            class="hm-icon-btn"
            aria-label=${e("close")}
            title=${e("close")}
            @click=${()=>this._closeDrawer()}
          >
            ${g("close",16)}
          </button>
        </div>
        <div class="hm-drawer-body">
          ${t.loading?c`<div class="hm-empty"><span class="hm-spinner"></span></div>`:t.error?c`<div class="hm-empty">${t.error}</div>`:t.items.length?this._renderDrawerItems(t.items,t.mode):c`<div class="hm-empty">
                    ${e(i?"browseFailed":a?"playlistsEmpty":"queueEmpty")}
                  </div>`}
        </div>
      </div>
    `}_renderDrawerItems(t,e){let i=E(this._hass?.language),a=e==="library",n=e==="playlists";return t.map(s=>{if(n){let l=q(this._hass,s.thumb);return c`<button
          class="hm-list-item"
          data-empty=${s.empty?"true":"false"}
          @click=${()=>this._playPlaylistItem(s)}
        >
          <span
            class="hm-list-thumb"
            style=${l?`background-image:url("${l}")`:""}
          >
            ${l?p:g("playlist",16)}
          </span>
          <span class="hm-list-text">
            <span class="hm-list-name">${s.title||"\u2014"}</span>
            <span class="hm-list-sub">${s.empty?i("playlistUnavailable"):s.subtitle}</span>
          </span>
          <span class="hm-list-tail">${g("play",14)}</span>
        </button>`}if(a){let l=q(this._hass,s.thumb);return c`<button
          class="hm-list-item"
          @click=${()=>this._enterBrowseItem(s)}
        >
          <span
            class="hm-list-thumb"
            style=${l?`background-image:url("${l}")`:""}
          >
            ${l?p:g(s.canExpand?"library":"music",16)}
          </span>
          <span class="hm-list-text">
            <span class="hm-list-name">${s.title||"\u2014"}</span>
            <span class="hm-list-sub">${s.subtitle}</span>
          </span>
          <span class="hm-list-tail">
            ${s.canExpand?g("chevronRight",14):p}
          </span>
        </button>`}let o=q(this._hass,s.art);return c`<button
        class="hm-list-item"
        data-active=${s.active?"true":"false"}
        @click=${()=>this._playQueueItem(s)}
      >
        <span
          class="hm-list-thumb"
          style=${o?`background-image:url("${o}")`:""}
        >
          ${o?p:g("music",16)}
        </span>
        <span class="hm-list-text">
          <span class="hm-list-name">${s.title||i("noTitle")}</span>
          <span class="hm-list-sub">${s.artist||s.album||""}</span>
        </span>
        <span class="hm-list-tail">${s.duration?gt(s.duration):""}</span>
      </button>`})}static getStubConfig(t){let e=t?.states||{};return{entity:Object.keys(e).find(a=>a.startsWith("media_player.")&&e[a]?.attributes?.supported_features!==void 0)||"",theme:Qt}}static getConfigElement(){return document.createElement("ha-music-editor")}};customElements.get("ha-music")||(customElements.define("ha-music",le),window.customCards=window.customCards||[],window.customCards.push({type:Ie,name:Fe,description:"\u73B0\u4EE3\u70AB\u9177\u914D\u8272\u7684\u5168\u529F\u80FD\u97F3\u4E50\u64AD\u653E\u5668\u5361\u7247\uFF1A\u5C01\u9762\u53D6\u8272\u3001\u9891\u8C31\u53EF\u89C6\u5316\u3001\u5A92\u4F53\u5E93\u6D4F\u89C8\u3001\u64AD\u653E\u961F\u5217\u3001\u591A\u8BBE\u5907\u5207\u6362\u3002",preview:!0,documentationURL:"https://github.com/RockJesus/ha-music"}),console.info(`%c HA-MUSIC %c v${De} `,"background:#2ee6c5;color:#04121a;font-weight:700;border-radius:4px 0 0 4px","background:#7b5cff;color:#fff;border-radius:0 4px 4px 0"));function Ti(r,t){r.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}var he=class extends A{static get properties(){return{hass:{attribute:!1},_config:{state:!0}}}static get styles(){return nt`
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
    `}constructor(){super(),this._config={},this._lang="en"}setConfig(t){this._config={...t},typeof t?.music_assistant=="string"&&(this._maUrlDraft=t.music_assistant)}get _zh(){return St(this._lang||this.hass?.language)}_update(t){let e={...this._config,...t};Object.keys(e).forEach(i=>{e[i]===void 0&&delete e[i]}),this._config=e,Ti(this,e)}_optionLabel(t){return this._zh?t.zh:t.en}_dockModes(){return T(this._config?.dock)}_dockEntities(){return Z(this._config?.dock_entities)}_mainEntity(){return this._entities()[0]||this._config?.entity||""}_toggleDock(t,e){let i=this._dockModes(),a=this._dockEntities(),n;e?(n=i.includes(t)?i:[...i,t],!a[t]&&this._mainEntity()&&(a[t]=this._mainEntity())):n=i.filter(s=>s!==t),this._update({dock:n.length?n:"none",dock_entities:a})}_setDockEntity(t,e){let i={...this._dockEntities(),[t]:e||""};i[t]||delete i[t],this._update({dock_entities:i})}_entities(){return Array.isArray(this._config.entities)&&this._config.entities.length?this._config.entities:[]}_setEntity(t,e){let i=this._entities();if(!i.length){this._update({entity:e||void 0});return}let a=[...i];a[t]=e,this._update({entities:a})}_addEntity(){let t=this._entities();if(t.length){this._update({entities:[...t,""]});return}let e=this._config.entity?[this._config.entity,""]:["",""];this._update({entities:e,entity:void 0})}_removeEntity(t){let e=this._entities().filter((i,a)=>a!==t);if(e.length<=1){this._update({entity:e[0]||void 0,entities:void 0});return}this._update({entities:e})}updated(){this._lang=this.hass?.language||this._lang}render(){let t=this._config||{},e=this._entities(),i=this._dockModes(),a=this._dockEntities(),n=(s,o,l)=>c`
      <ha-entity-picker
        .hass=${this.hass}
        .value=${s||""}
        .includeDomains=${["media_player"]}
        .allowCustomEntity=${!1}
        .label=${l}
        @value-changed=${h=>{h.stopPropagation(),this._setEntity(o,h.detail?.value??"")}}
      ></ha-entity-picker>
    `;return c`
      <div class="wrap">
        <div class="section">
          <div class="section-title">${this._zh?"\u64AD\u653E\u5668":"Player"}</div>
          ${e.length?e.map((s,o)=>c`
                  <div class="entity-row">
                    ${n(s,o,o===0?this._zh?"\u64AD\u653E\u5668":"Player":this._zh?"\u8BBE\u5907":"Player")}
                    <button
                      class="mini-btn"
                      @click=${()=>this._removeEntity(o)}
                      title=${this._zh?"\u79FB\u9664":"Remove"}
                    >
                      ${this._zh?"\u79FB\u9664":"Remove"}
                    </button>
                  </div>
                `):c`<div class="entity-row">
                ${n(t.entity||"",0,this._zh?"\u64AD\u653E\u5668":"Player")}
              </div>`}
          <button class="mini-btn add" @click=${()=>this._addEntity()}>
            ${this._zh?"\uFF0B \u6DFB\u52A0\u64AD\u653E\u5668":"\uFF0B Add player"}
          </button>
          ${e.length?c`<div class="hint">
                ${this._zh?"\u591A\u8BBE\u5907\u6A21\u5F0F\uFF1A\u5361\u7247\u9876\u90E8\u4F1A\u51FA\u73B0\u8BBE\u5907\u5207\u6362\u6807\u7B7E\u3002":"Multi-player mode adds switching chips on top of the card."}
              </div>`:p}
        </div>

        <div class="section">
          <div class="section-title">${this._zh?"\u5916\u89C2":"Appearance"}</div>
          <div class="grid2">
            <label class="field">
              <span class="label">${this._zh?"\u5E03\u5C40":"Layout"}</span>
              <select
                .value=${t.layout||"adaptive"}
                @change=${s=>this._update({layout:s.target.value})}
              >
                ${Object.keys(Jt).map(s=>c`<option value=${s} ?selected=${t.layout===s}>
                      ${this._optionLabel(Jt[s])}
                    </option>`)}
              </select>
            </label>
            <label class="field">
              <span class="label">${this._zh?"\u4E3B\u9898":"Theme"}</span>
              <select
                .value=${t.theme||"aurora"}
                @change=${s=>this._update({theme:s.target.value})}
              >
                ${Object.keys(X).map(s=>c`<option value=${s} ?selected=${t.theme===s}>
                      ${this._optionLabel(X[s].label)}
                    </option>`)}
              </select>
            </label>
            <label class="field">
              <span class="label">${this._zh?"\u80CC\u666F":"Background"}</span>
              <select
                .value=${t.cover||"ambient"}
                @change=${s=>this._update({cover:s.target.value})}
              >
                ${Object.keys(Xt).map(s=>c`<option value=${s} ?selected=${t.cover===s}>
                      ${this._optionLabel(Xt[s])}
                    </option>`)}
              </select>
            </label>
            <label class="field">
              <span class="label">${this._zh?"\u9891\u8C31\u52A8\u6548":"Visualizer"}</span>
              <select
                .value=${t.visualizer||"bars"}
                @change=${s=>this._update({visualizer:s.target.value})}
              >
                ${Object.keys(Zt).map(s=>c`<option value=${s} ?selected=${t.visualizer===s}>
                      ${this._optionLabel(Zt[s])}
                    </option>`)}
              </select>
            </label>
          </div>
          <label class="field">
            <span class="label">${this._zh?"\u6807\u9898\uFF08\u7559\u7A7A\u7528\u5B9E\u4F53\u540D\u79F0\uFF09":"Title (optional)"}</span>
            <input
              type="text"
              .value=${t.name||""}
              @input=${s=>this._update({name:s.target.value||void 0})}
            />
          </label>
          <label class="field">
            <span class="label">${this._zh?"\u5F3A\u8C03\u8272\u8986\u76D6\uFF08\u53EF\u9009\uFF09":"Accent override (optional)"}</span>
            <input
              type="color"
              .value=${t.accent||"#2ee6c5"}
              @input=${s=>this._update({accent:s.target.value})}
            />
          </label>
          <div class="check">
            <input
              type="checkbox"
              id="ha-music-palette"
              .checked=${t.palette!==!1}
              @change=${s=>this._update({palette:s.target.checked})}
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
              @change=${s=>this._update({volume_entity:s.target.value||void 0})}
            />
          </label>
          ${this._switch(this._zh?"\u663E\u793A\u97F3\u91CF\u6761":"Show volume",t.show_volume!==!1,s=>this._update({show_volume:s}))}
          ${this._switch(this._zh?"\u663E\u793A\u97F3\u6E90\u9009\u62E9":"Show source picker",t.show_source!==!1,s=>this._update({show_source:s}))}
          ${this._switch(this._zh?"\u663E\u793A\u64AD\u653E\u961F\u5217":"Show queue",t.show_queue!==!1,s=>this._update({show_queue:s}))}
          ${this._switch(this._zh?"\u663E\u793A\u5A92\u4F53\u5E93\u6D4F\u89C8":"Show media browser",t.show_library!==!1,s=>this._update({show_library:s}))}
          ${this._switch(this._zh?"\u663E\u793A\u5206\u7EC4\u4FE1\u606F":"Show group info",t.show_group!==!1,s=>this._update({show_group:s}))}
          ${this._switch(this._zh?"\u663E\u793A Music Assistant \u6B4C\u5355\u5165\u53E3":"Show Music Assistant playlists",t.music_assistant!==!1,s=>this._update({music_assistant:s?typeof t.music_assistant=="string"?t.music_assistant:this._maUrlDraft||!0:!1}))}
          <label class="field">
            <span class="label">
              ${this._zh?"MA \u9762\u677F\u5730\u5740\uFF08\u7559\u7A7A\u81EA\u52A8\uFF0C\u4EC5\u4F9B\u62BD\u5C49\u5185\u8DF3\u8F6C\uFF09":"MA panel URL (optional)"}
            </span>
            <input
              type="text"
              .value=${typeof t.music_assistant=="string"?t.music_assistant:""}
              placeholder="/music-assistant"
              @input=${s=>{this._maUrlDraft=s.target.value.trim()}}
              @change=${s=>this._update({music_assistant:s.target.value.trim()||!0})}
            />
            <span class="hint">
              ${this._zh?"\u7559\u7A7A\u81EA\u52A8\u8BFB\u53D6 HA \u9762\u677F\u8DEF\u5F84\uFF1B\u6B4C\u5355\u5165\u53E3\u672C\u8EAB\u4E0D\u4F9D\u8D56\u6B64\u9879":"Leave empty to auto-detect the HA panel path"}
            </span>
          </label>
          <div class="section-title">${this._zh?"\u5168\u5C40\u8FF7\u4F60\u64AD\u653E\u5668":"Global mini players"}</div>
          <div class="hint">
            ${this._zh?"\u4E09\u4E2A\u4F4D\u7F6E\u53EF\u4EE5\u540C\u65F6\u542F\u7528\uFF0C\u4E5F\u53EF\u4EE5\u5206\u522B\u9009\u62E9\u5404\u81EA\u7684\u64AD\u653E\u5668\u5B9E\u4F53\uFF1B\u4E0D\u8DF3\u8F6C\u9875\u9762\uFF0C\u76F4\u63A5\u63A7\u5236\u64AD\u653E\u3002":"Each position can be enabled independently with its own player entity; controls stay on the page."}
          </div>
          ${[["top",this._zh?"\u9876\u90E8\u64AD\u653E\u5668":"Top bar"],["sidebar",this._zh?"\u4FA7\u8FB9\u680F\u64AD\u653E\u5668":"Sidebar"],["fab",this._zh?"\u53F3\u4E0B\u89D2\u64AD\u653E\u5668":"Bottom-right"]].map(([s,o])=>{let l=i.includes(s),h=a[s]||this._mainEntity();return c`
              <div class="dock-row">
                <label class="check">
                  <input
                    type="checkbox"
                    .checked=${l}
                    @change=${d=>this._toggleDock(s,d.target.checked)}
                  />
                  <span>${o}</span>
                </label>
                <ha-entity-picker
                  .hass=${this.hass}
                  .value=${h||""}
                  .includeDomains=${["media_player"]}
                  .allowCustomEntity=${!1}
                  .label=${this._zh?"\u64AD\u653E\u5668\u5B9E\u4F53":"Player entity"}
                  @value-changed=${d=>{d.stopPropagation(),this._setDockEntity(s,d.detail?.value??"")}}
                ></ha-entity-picker>
              </div>
            `})}
        </div>
      </div>
    `}_switch(t,e,i){return c`<label class="switch-row">
      <span class="label">${t}</span>
      <input
        type="checkbox"
        .checked=${e}
        @change=${a=>i(a.target.checked)}
      />
    </label>`}};customElements.get("ha-music-editor")||customElements.define("ha-music-editor",he);var de=new URL(import.meta.url),ce=de.searchParams.get("dock"),ii=Rt(),Ut=ce?T(ce==="1"?"top":ce):ii?.modes||[],pe={...ii?.entities||{}},ti=de.searchParams.get("dock_entity");ti&&Ut[0]&&(pe[Ut[0]]=ti);for(let r of Ut){let t=de.searchParams.get(`dock_entity_${r}`);t&&(pe[r]=t)}var ei=Ut.map(r=>({mode:r,entity:pe[r]})).filter(r=>r.entity);ei.length&&xt(ei.map(r=>({...r,hass:Tt()})));
