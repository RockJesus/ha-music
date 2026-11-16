var Ft=globalThis,Bt=Ft.ShadowRoot&&(Ft.ShadyCSS===void 0||Ft.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ne=Symbol(),Je=new WeakMap,wt=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==ne)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(Bt&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=Je.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&Je.set(e,t))}return t}toString(){return this.cssText}},Ze=a=>new wt(typeof a=="string"?a:a+"",void 0,ne),kt=(a,...t)=>{let e=a.length===1?a[0]:t.reduce((i,s,r)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+a[r+1],a[0]);return new wt(e,a,ne)},ti=(a,t)=>{if(Bt)a.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),s=Ft.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,a.appendChild(i)}},oe=Bt?a=>a:a=>a instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return Ze(e)})(a):a;var{is:ls,defineProperty:hs,getOwnPropertyDescriptor:cs,getOwnPropertyNames:ds,getOwnPropertySymbols:ps,getPrototypeOf:us}=Object,K=globalThis,ei=K.trustedTypes,ms=ei?ei.emptyScript:"",gs=K.reactiveElementPolyfillSupport,$t=(a,t)=>a,le={toAttribute(a,t){switch(t){case Boolean:a=a?ms:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,t){let e=a;switch(t){case Boolean:e=a!==null;break;case Number:e=a===null?null:Number(a);break;case Object:case Array:try{e=JSON.parse(a)}catch{e=null}}return e}},si=(a,t)=>!ls(a,t),ii={attribute:!0,type:String,converter:le,reflect:!1,useDefault:!1,hasChanged:si};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),K.litPropertyMetadata??(K.litPropertyMetadata=new WeakMap);var I=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=ii){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&hs(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){let{get:s,set:r}=cs(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:s,set(n){let o=s?.call(this);r?.call(this,n),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ii}static _$Ei(){if(this.hasOwnProperty($t("elementProperties")))return;let t=us(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty($t("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($t("properties"))){let e=this.properties,i=[...ds(e),...ps(e)];for(let s of i)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let s of i)e.unshift(oe(s))}else t!==void 0&&e.push(oe(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ti(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){let r=(i.converter?.toAttribute!==void 0?i.converter:le).toAttribute(e,i.type);this._$Em=t,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){let i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let r=i.getPropertyOptions(s),n=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:le;this._$Em=s;let o=n.fromAttribute(e,r.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(t!==void 0){let n=this.constructor;if(s===!1&&(r=this[t]),i??(i=n.getPropertyOptions(t)),!((i.hasChanged??si)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},n){i&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,n??e??this[t]),r!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[s,r]of this._$Ep)this[s]=r;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,r]of i){let{wrapped:n}=r,o=this[s];n!==!0||this._$AL.has(s)||o===void 0||this.C(s,void 0,r,o)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};I.elementStyles=[],I.shadowRootOptions={mode:"open"},I[$t("elementProperties")]=new Map,I[$t("finalized")]=new Map,gs?.({ReactiveElement:I}),(K.reactiveElementVersions??(K.reactiveElementVersions=[])).push("2.1.2");var At=globalThis,ai=a=>a,Ht=At.trustedTypes,ri=Ht?Ht.createPolicy("lit-html",{createHTML:a=>a}):void 0,di="$lit$",V=`lit$${Math.random().toFixed(9).slice(2)}$`,pi="?"+V,fs=`<${pi}>`,st=document,St=()=>st.createComment(""),Pt=a=>a===null||typeof a!="object"&&typeof a!="function",ge=Array.isArray,bs=a=>ge(a)||typeof a?.[Symbol.iterator]=="function",he=`[ 	
\f\r]`,Mt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ni=/-->/g,oi=/>/g,et=RegExp(`>|${he}(?:([^\\s"'>=/]+)(${he}*=${he}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),li=/'/g,hi=/"/g,ui=/^(?:script|style|textarea|title)$/i,fe=a=>(t,...e)=>({_$litType$:a,strings:t,values:e}),p=fe(1),$=fe(2),Js=fe(3),F=Symbol.for("lit-noChange"),g=Symbol.for("lit-nothing"),ci=new WeakMap,it=st.createTreeWalker(st,129);function mi(a,t){if(!ge(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return ri!==void 0?ri.createHTML(t):t}var _s=(a,t)=>{let e=a.length-1,i=[],s,r=t===2?"<svg>":t===3?"<math>":"",n=Mt;for(let o=0;o<e;o++){let l=a[o],h,d,c=-1,u=0;for(;u<l.length&&(n.lastIndex=u,d=n.exec(l),d!==null);)u=n.lastIndex,n===Mt?d[1]==="!--"?n=ni:d[1]!==void 0?n=oi:d[2]!==void 0?(ui.test(d[2])&&(s=RegExp("</"+d[2],"g")),n=et):d[3]!==void 0&&(n=et):n===et?d[0]===">"?(n=s??Mt,c=-1):d[1]===void 0?c=-2:(c=n.lastIndex-d[2].length,h=d[1],n=d[3]===void 0?et:d[3]==='"'?hi:li):n===hi||n===li?n=et:n===ni||n===oi?n=Mt:(n=et,s=void 0);let f=n===et&&a[o+1].startsWith("/>")?" ":"";r+=n===Mt?l+fs:c>=0?(i.push(h),l.slice(0,c)+di+l.slice(c)+V+f):l+V+(c===-2?o:f)}return[mi(a,r+(a[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},Et=class a{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,n=0,o=t.length-1,l=this.parts,[h,d]=_s(t,e);if(this.el=a.createElement(h,i),it.currentNode=this.el.content,e===2||e===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(s=it.nextNode())!==null&&l.length<o;){if(s.nodeType===1){if(s.hasAttributes())for(let c of s.getAttributeNames())if(c.endsWith(di)){let u=d[n++],f=s.getAttribute(c).split(V),m=/([.?@])?(.*)/.exec(u);l.push({type:1,index:r,name:m[2],strings:f,ctor:m[1]==="."?de:m[1]==="?"?pe:m[1]==="@"?ue:dt}),s.removeAttribute(c)}else c.startsWith(V)&&(l.push({type:6,index:r}),s.removeAttribute(c));if(ui.test(s.tagName)){let c=s.textContent.split(V),u=c.length-1;if(u>0){s.textContent=Ht?Ht.emptyScript:"";for(let f=0;f<u;f++)s.append(c[f],St()),it.nextNode(),l.push({type:2,index:++r});s.append(c[u],St())}}}else if(s.nodeType===8)if(s.data===pi)l.push({type:2,index:r});else{let c=-1;for(;(c=s.data.indexOf(V,c+1))!==-1;)l.push({type:7,index:r}),c+=V.length-1}r++}}static createElement(t,e){let i=st.createElement("template");return i.innerHTML=t,i}};function ct(a,t,e=a,i){if(t===F)return t;let s=i!==void 0?e._$Co?.[i]:e._$Cl,r=Pt(t)?void 0:t._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),r===void 0?s=void 0:(s=new r(a),s._$AT(a,e,i)),i!==void 0?(e._$Co??(e._$Co=[]))[i]=s:e._$Cl=s),s!==void 0&&(t=ct(a,s._$AS(a,t.values),s,i)),t}var ce=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??st).importNode(e,!0);it.currentNode=s;let r=it.nextNode(),n=0,o=0,l=i[0];for(;l!==void 0;){if(n===l.index){let h;l.type===2?h=new Ct(r,r.nextSibling,this,t):l.type===1?h=new l.ctor(r,l.name,l.strings,this,t):l.type===6&&(h=new me(r,this,t)),this._$AV.push(h),l=i[++o]}n!==l?.index&&(r=it.nextNode(),n++)}return it.currentNode=st,s}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},Ct=class a{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=g,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=ct(this,t,e),Pt(t)?t===g||t==null||t===""?(this._$AH!==g&&this._$AR(),this._$AH=g):t!==this._$AH&&t!==F&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):bs(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==g&&Pt(this._$AH)?this._$AA.nextSibling.data=t:this.T(st.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=Et.createElement(mi(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{let r=new ce(s,this),n=r.u(this.options);r.p(e),this.T(n),this._$AH=r}}_$AC(t){let e=ci.get(t.strings);return e===void 0&&ci.set(t.strings,e=new Et(t)),e}k(t){ge(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,s=0;for(let r of t)s===e.length?e.push(i=new a(this.O(St()),this.O(St()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=ai(t).nextSibling;ai(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},dt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=g,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=g}_$AI(t,e=this,i,s){let r=this.strings,n=!1;if(r===void 0)t=ct(this,t,e,0),n=!Pt(t)||t!==this._$AH&&t!==F,n&&(this._$AH=t);else{let o=t,l,h;for(t=r[0],l=0;l<r.length-1;l++)h=ct(this,o[i+l],e,l),h===F&&(h=this._$AH[l]),n||(n=!Pt(h)||h!==this._$AH[l]),h===g?t=g:t!==g&&(t+=(h??"")+r[l+1]),this._$AH[l]=h}n&&!s&&this.j(t)}j(t){t===g?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},de=class extends dt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===g?void 0:t}},pe=class extends dt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==g)}},ue=class extends dt{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=ct(this,t,e,0)??g)===F)return;let i=this._$AH,s=t===g&&i!==g||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==g&&(i===g||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},me=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){ct(this,t)}};var ys=At.litHtmlPolyfillSupport;ys?.(Et,Ct),(At.litHtmlVersions??(At.litHtmlVersions=[])).push("3.3.3");var gi=(a,t,e)=>{let i=e?.renderBefore??t,s=i._$litPart$;if(s===void 0){let r=e?.renderBefore??null;i._$litPart$=s=new Ct(t.insertBefore(St(),r),r,void 0,e??{})}return s._$AI(a),s};var Tt=globalThis,N=class extends I{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=gi(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}};N._$litElement$=!0,N.finalized=!0,Tt.litElementHydrateSupport?.({LitElement:N});var xs=Tt.litElementPolyfillSupport;xs?.({LitElement:N});(Tt.litElementVersions??(Tt.litElementVersions=[])).push("4.2.2");var fi={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},bi=a=>(...t)=>({_$litDirective$:a,values:t}),jt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var _i="important",vs=" !"+_i,B=bi(class extends jt{constructor(a){if(super(a),a.type!==fi.ATTRIBUTE||a.name!=="style"||a.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(a){return Object.keys(a).reduce((t,e)=>{let i=a[e];return i==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(a,[t]){let{style:e}=a.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let i of this.ft)t[i]==null&&(this.ft.delete(i),i.includes("-")?e.removeProperty(i):e[i]=null);for(let i in t){let s=t[i];if(s!=null){this.ft.add(i);let r=typeof s=="string"&&s.endsWith(vs);i.includes("-")||r?e.setProperty(i,r?s.slice(0,-11):s,r?_i:""):e[i]=s}}return F}});var yi=kt`
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

  .hm-bars {
    display: flex;
    align-items: flex-end;
    gap: 3px;
    height: 100%;
  }

  .hm-bar {
    flex: 1 1 0;
    min-width: 2.5px;
    height: 100%;
    border-radius: 2px 2px 1px 1px;
    background: linear-gradient(
      180deg,
      rgba(var(--hm-a1-rgb), 0.95),
      rgba(var(--hm-a2-rgb), 0.45)
    );
    opacity: calc(0.55 + var(--h) * 0.45);
    transform: scaleY(var(--h));
    transform-origin: bottom center;
    transition: transform 0.07s linear, opacity 0.07s linear;
    will-change: transform, opacity;
    box-shadow: 0 0 10px -2px rgba(var(--hm-a1-rgb), 0.55);
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
    flex: 0 1 220px;
    min-width: 0;
    padding: 4px 12px 4px 4px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.07);
    background: rgba(255, 255, 255, 0.045);
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
      flex: 1 1 auto;
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

    .hm-volume {
      gap: 8px;
      flex: 0 1 230px;
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
    --hm-panel-cover: calc(100dvh - 440px);
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

  @container (max-width: 520px) {
    .hm-card[data-panel="true"] .hm-controls {
      flex-direction: column;
      align-items: stretch;
      gap: 8px;
    }

    .hm-card[data-panel="true"] .hm-transport {
      justify-content: center;
    }

    .hm-card[data-panel="true"] .hm-volume {
      flex: 1 1 auto;
      width: min(100%, 300px);
      max-width: none;
      margin: 0 auto;
    }

    .hm-card[data-panel="true"] .hm-btn {
      width: 42px;
      height: 42px;
    }

    .hm-card[data-panel="true"] .hm-play {
      width: 56px;
      height: 56px;
      min-width: 56px;
      min-height: 56px;
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
    border-radius: 18px;
    box-shadow:
      0 22px 46px -18px rgba(0, 0, 0, 0.9),
      inset 0 1px 0 rgba(255, 255, 255, 0.24);
  }

  .hm-card[data-thumb="sm"] .hm-cover {
    border-radius: 12px;
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
    flex: 0 1 140px;
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
    .hm-icon-btn,
    .hm-bar {
      transition: none;
    }

    .hm-cover[data-gesture] {
      animation: none !important;
    }
  }
`;var ws={play:$`<path d="M8.2 5.4c0-.7.8-1.1 1.4-.7l9.1 5.8c.6.4.6 1.3 0 1.7l-9.1 6.1c-.6.4-1.4 0-1.4-.7V5.4z" fill="currentColor"/>`,pause:$`<rect x="7" y="5.6" width="3.6" height="12.8" rx="1.2" fill="currentColor"/><rect x="13.4" y="5.6" width="3.6" height="12.8" rx="1.2" fill="currentColor"/>`,previous:$`<path d="M7 6.2v11.6" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><path d="M17.6 6.6c0-.6-.7-1-1.2-.6l-7.1 5.2c-.5.4-.5 1.2 0 1.6l7.1 5.2c.5.4 1.2 0 1.2-.6V6.6z" fill="currentColor"/>`,next:$`<path d="M17 6.2v11.6" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><path d="M6.4 6.6c0-.6.7-1 1.2-.6l7.1 5.2c.5.4.5 1.2 0 1.6l-7.1 5.2c-.5.4-1.2 0-1.2-.6V6.6z" fill="currentColor"/>`,shuffle:$`<path d="M4.5 7.2h3.2c1 0 1.9.5 2.5 1.3l4 5.4c.6.8 1.5 1.3 2.5 1.3h3.1" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M4.5 16.8h3.2c1 0 1.9-.5 2.5-1.3l4-5.4c.6-.8 1.5-1.3 2.5-1.3h3.1" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M16.2 4.6l3 2.6-3 2.6M16.2 12.6l3 2.6-3 2.6" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/>`,repeat:$`<path d="M6.4 9.1V8.3c0-1.5 1.2-2.7 2.7-2.7h8.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M17.8 5.6l-2.3-2.2M17.8 5.6l-2.3 2.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M17.6 14.9v.8c0 1.5-1.2 2.7-2.7 2.7H6.7" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M6.2 18.4l2.3 2.2M6.2 18.4l2.3-2.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/>`,repeatOne:$`<path d="M6.4 9.1V8.3c0-1.5 1.2-2.7 2.7-2.7h8.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M17.8 5.6l-2.3-2.2M17.8 5.6l-2.3 2.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M17.6 14.9v.8c0 1.5-1.2 2.7-2.7 2.7H6.7" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M6.2 18.4l2.3 2.2M6.2 18.4l2.3-2.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M11.2 9.3l1.1-.8v6.1" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M10.6 14.6h3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>`,volume:$`<path d="M4.6 9.4h2.7l3.4-2.9c.5-.4 1.2 0 1.2.6v9.8c0 .6-.7 1-1.2.6L7.3 14.6H4.6c-.6 0-1-.4-1-1v-3.2c0-.6.4-1 1-1z" fill="currentColor"/><path d="M15.4 8.6c1.6 1 1.6 5.8 0 6.8" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M17.6 6.4c2.9 2 2.9 9.2 0 11.2" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/>`,mute:$`<path d="M4.6 9.4h2.7l3.4-2.9c.5-.4 1.2 0 1.2.6v9.8c0 .6-.7 1-1.2.6L7.3 14.6H4.6c-.6 0-1-.4-1-1v-3.2c0-.6.4-1 1-1z" fill="currentColor"/><path d="M15.2 9.6l4.6 4.8M19.8 9.6l-4.6 4.8" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/>`,power:$`<path d="M12 4.2v7" stroke="currentColor" stroke-width="1.9" fill="none" stroke-linecap="round"/><path d="M7.6 6.6a6.9 6.9 0 1 0 8.8 0" stroke="currentColor" stroke-width="1.9" fill="none" stroke-linecap="round"/>`,more:$`<circle cx="6.4" cy="12" r="1.55" fill="currentColor"/><circle cx="12" cy="12" r="1.55" fill="currentColor"/><circle cx="17.6" cy="12" r="1.55" fill="currentColor"/>`,library:$`<rect x="4.4" y="4.4" width="6.4" height="6.4" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.7"/><rect x="13.2" y="4.4" width="6.4" height="6.4" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.7"/><rect x="4.4" y="13.2" width="6.4" height="6.4" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.7"/><rect x="13.2" y="13.2" width="6.4" height="6.4" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.7"/>`,queue:$`<path d="M5 7.2h10M5 11.4h7.4M5 15.6h5.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M15.6 12.4c0-.5.5-.8.9-.5l4 2.3c.4.2.4.8 0 1l-4 2.6c-.4.3-.9 0-.9-.5v-5.4z" fill="currentColor"/>`,chevronLeft:$`<path d="M14.6 6l-5.4 6 5.4 6" stroke="currentColor" stroke-width="1.9" fill="none" stroke-linecap="round"/>`,close:$`<path d="M7 7l10 10M17 7L7 17" stroke="currentColor" stroke-width="1.9" fill="none" stroke-linecap="round"/>`,music:$`<path d="M14.5 5.2l4.6-1v9.1a3 3 0 1 1-1.8-2.7V7.1l-2.8.6v7.7a3 3 0 1 1-1.8-2.7V5.2z" fill="currentColor"/>`,group:$`<circle cx="9" cy="9.3" r="3.2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3.8 18.4c0-2.7 2.3-4.6 5.2-4.6s5.2 1.9 5.2 4.6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M16.2 6.4a3 3 0 0 1 0 5.9M18.6 18.4c0-2-1-3.6-2.6-4.3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>`,chevronRight:$`<path d="M9.4 6l5.4 6-5.4 6" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>`,playlist:$`<path d="M4 6.6h10.2M4 11h10.2M4 15.4h6.4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M16.4 11.8l4 2.35-4 2.35z" fill="currentColor"/>`,external:$`<path d="M13.2 5.4h5.4v5.4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M18.2 5.8l-7 7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M11 6.6H7.2c-1 0-1.8.8-1.8 1.8v8.4c0 1 .8 1.8 1.8 1.8h8.4c1 0 1.8-.8 1.8-1.8V14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>`,folder:$`<path d="M3.6 7.2c0-1 .8-1.8 1.8-1.8h3.4l1.8 2.2h9.8c1 0 1.8.8 1.8 1.8v7.4c0 1-.8 1.8-1.8 1.8H5.4c-1 0-1.8-.8-1.8-1.8V7.2z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>`,check:$`<path d="M6 12.6l4.2 4.2 7.8-9" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>`,lyrics:$`<path d="M4.5 6.4h8.4M4.5 10.2h6.2M4.5 14h7.2" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/><circle cx="16.2" cy="14.2" r="2.2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M18.4 14.2V7.1l2.4-.6v7.7" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>`};function w(a,t=18){let e=ws[a];return e?$`<svg viewBox="0 0 24 24" width=${t} height=${t} aria-hidden="true" focusable="false">${e}</svg>`:g}var vi="1.5.8",wi="ha-music",ki="HA Music",M={PAUSE:1,SEEK:2,VOLUME_SET:4,VOLUME_MUTE:8,PREVIOUS_TRACK:16,NEXT_TRACK:32,TURN_ON:128,TURN_OFF:256,PLAY_MEDIA:512,VOLUME_STEP:1024,SELECT_SOURCE:2048,STOP:4096,CLEAR_PLAYLIST:8192,PLAY:16384,SHUFFLE_SET:32768,SELECT_SOUND_MODE:65536,BROWSE_MEDIA:131072,REPEAT_SET:262144,GROUPING:524288,SELECT:1048576};var H="aurora";var be={auto:{en:"Auto (QQ \u2192 NetEase)",zh:"\u81EA\u52A8\uFF08QQ \u4F18\u5148\uFF0C\u7F51\u6613\u4E91\u515C\u5E95\uFF09"},qq:{en:"QQ Music",zh:"QQ \u97F3\u4E50"},wy:{en:"NetEase Cloud Music",zh:"\u7F51\u6613\u4E91\u97F3\u4E50"}},_e="auto",ye={adaptive:{en:"Adaptive",zh:"\u81EA\u9002\u5E94"},full:{en:"Full",zh:"\u5B8C\u6574"},compact:{en:"Compact",zh:"\u7D27\u51D1"},mini:{en:"Mini",zh:"\u8FF7\u4F60"}},xe={ambient:{en:"Ambient blur",zh:"\u73AF\u5883\u6A21\u7CCA"},art:{en:"Cover fill",zh:"\u5C01\u9762\u94FA\u6EE1"},palette:{en:"Palette only",zh:"\u7EAF\u8272\u5F69"},none:{en:"Plain",zh:"\u65E0\u80CC\u666F"}},ve={bars:{en:"Live spectrum",zh:"\u5B9E\u65F6\u9891\u8C31"},wave:{en:"Wave",zh:"\u6CE2\u5F62"},orbit:{en:"Orbit",zh:"\u5149\u73AF"},none:{en:"Off",zh:"\u5173\u95ED"}},E={aurora:{label:{en:"Aurora",zh:"\u6781\u5149"},accent:["#2ee6c5","#7b5cff"],base:"#050a12",glow:1,grid:!1},cyber:{label:{en:"Cyberpunk",zh:"\u8D5B\u535A\u670B\u514B"},accent:["#ff2fd0","#22e6ff"],base:"#08030f",glow:1.4,grid:!0},liquid:{label:{en:"Liquid Glass",zh:"\u6DB2\u6001\u73BB\u7483"},accent:["#a9d8ff","#cdb6ff"],base:"#090c16",glow:.8,grid:!1,glass:!0},velvet:{label:{en:"Velvet",zh:"\u5929\u9E45\u7ED2"},accent:["#ff7a9c","#a86bff"],base:"#0d050c",glow:1.15,grid:!1},mono:{label:{en:"Monochrome",zh:"\u9ED1\u767D"},accent:["#e9ecf5","#8d95a8"],base:"#08090c",glow:.4,grid:!1},sunset:{label:{en:"Sunset",zh:"\u65E5\u843D"},accent:["#ffa45c","#ff4d8d"],base:"#120806",glow:1.1,grid:!1},ocean:{label:{en:"Ocean",zh:"\u6D77\u6D0B"},accent:["#39d0ff","#2f7bff"],base:"#04101c",glow:.9,grid:!1}},xi={play:"Play",pause:"Pause",playing:"Now playing",paused:"Paused",idle:"Standby",off:"Off",buffering:"Buffering",previous:"Previous track",next:"Next track",volume:"Volume",mute:"Mute",unmute:"Unmute",shuffle:"Shuffle",repeat:"Repeat",repeatAll:"Repeat all",repeatOne:"Repeat one",repeatOff:"Repeat off",source:"Source",soundMode:"Sound mode",queue:"Queue",library:"Library",assistant:"Music Assistant",playlists:"Playlists",playlistsEmpty:"No playlists found",playlistEmpty:"This playlist is empty or unavailable in Music Assistant",maPlayerRequired:"Playlists need a Music Assistant player",playlistUnavailable:"Unavailable",playingPlaylist:"Playing",openAssistant:"Open Music Assistant",more:"More info",power:"Power",group:"Group",groupLeave:"Leave group",loading:"Loading\u2026",queueEmpty:"Queue is empty",browseFailed:"Media library is unavailable",noMedia:"Nothing is playing",unknownArtist:"Unknown artist",noTitle:"No title",close:"Close",back:"Back",track:"Track",album:"Album",volumeEntityMissing:"Volume entity unavailable",seek:"Seek",remaining:"Toggle remaining time",lyrics:"Lyrics",lyricsLoading:"Matching lyrics\u2026",lyricsNone:"No lyrics found",lyricsError:"Lyrics unavailable",lyricsRetry:"Retry",lyricsOffset:"Lyric timing offset",lyricsInstrumental:"Instrumental \xB7 no lyrics"},ks={play:"\u64AD\u653E",pause:"\u6682\u505C",playing:"\u6B63\u5728\u64AD\u653E",paused:"\u5DF2\u6682\u505C",idle:"\u5F85\u673A",off:"\u5DF2\u5173\u95ED",buffering:"\u7F13\u51B2\u4E2D",previous:"\u4E0A\u4E00\u9996",next:"\u4E0B\u4E00\u9996",volume:"\u97F3\u91CF",mute:"\u9759\u97F3",unmute:"\u53D6\u6D88\u9759\u97F3",shuffle:"\u968F\u673A\u64AD\u653E",repeat:"\u5FAA\u73AF",repeatAll:"\u5217\u8868\u5FAA\u73AF",repeatOne:"\u5355\u66F2\u5FAA\u73AF",repeatOff:"\u5173\u95ED\u5FAA\u73AF",source:"\u97F3\u6E90",soundMode:"\u58F0\u97F3\u6A21\u5F0F",queue:"\u64AD\u653E\u961F\u5217",library:"\u5A92\u4F53\u5E93",assistant:"Music Assistant",playlists:"\u64AD\u653E\u5217\u8868",playlistsEmpty:"\u6CA1\u6709\u627E\u5230\u64AD\u653E\u5217\u8868",playlistEmpty:"\u8BE5\u6B4C\u5355\u4E3A\u7A7A\u6216\u66F2\u76EE\u5728 Music Assistant \u4E2D\u4E0D\u53EF\u7528",maPlayerRequired:"\u5F53\u524D\u64AD\u653E\u5668\u4E0D\u662F Music Assistant \u64AD\u653E\u5668\uFF0C\u8BF7\u5148\u5207\u6362\u5230 MA \u64AD\u653E\u5668",playlistUnavailable:"\u4E0D\u53EF\u7528",playingPlaylist:"\u5F00\u59CB\u64AD\u653E",openAssistant:"\u6253\u5F00 Music Assistant",more:"\u66F4\u591A\u4FE1\u606F",power:"\u5F00\u5173",group:"\u5206\u7EC4",groupLeave:"\u9000\u51FA\u5206\u7EC4",loading:"\u52A0\u8F7D\u4E2D\u2026",queueEmpty:"\u64AD\u653E\u961F\u5217\u4E3A\u7A7A",browseFailed:"\u5A92\u4F53\u5E93\u6682\u4E0D\u53EF\u7528",noMedia:"\u5F53\u524D\u6CA1\u6709\u64AD\u653E\u5185\u5BB9",unknownArtist:"\u672A\u77E5\u827A\u672F\u5BB6",noTitle:"\u672A\u77E5\u66F2\u76EE",close:"\u5173\u95ED",back:"\u8FD4\u56DE",track:"\u66F2\u76EE",album:"\u4E13\u8F91",volumeEntityMissing:"\u97F3\u91CF\u5B9E\u4F53\u4E0D\u53EF\u7528",seek:"\u8FDB\u5EA6",remaining:"\u5207\u6362\u5269\u4F59\u65F6\u95F4",lyrics:"\u6B4C\u8BCD",lyricsLoading:"\u6B63\u5728\u5339\u914D\u6B4C\u8BCD\u2026",lyricsNone:"\u672A\u627E\u5230\u6B4C\u8BCD",lyricsError:"\u6B4C\u8BCD\u6682\u4E0D\u53EF\u7528",lyricsRetry:"\u91CD\u8BD5",lyricsOffset:"\u6B4C\u8BCD\u65F6\u95F4\u504F\u79FB",lyricsInstrumental:"\u7EAF\u97F3\u4E50 \xB7 \u65E0\u6B4C\u8BCD"};function Kt(a){return/^zh/i.test(a||"")}function R(a){let t=Kt(a)?ks:xi;return e=>t[e]??xi[e]??e}var $s={playlist:{en:"Playlist",zh:"\u64AD\u653E\u5217\u8868"},album:{en:"Album",zh:"\u4E13\u8F91"},artist:{en:"Artist",zh:"\u827A\u672F\u5BB6"},track:{en:"Track",zh:"\u66F2\u76EE"},music:{en:"Music",zh:"\u97F3\u4E50"},video:{en:"Video",zh:"\u89C6\u9891"},directory:{en:"Folder",zh:"\u6587\u4EF6\u5939"},image:{en:"Image",zh:"\u56FE\u7247"},url:{en:"Link",zh:"\u94FE\u63A5"},app:{en:"App",zh:"\u5E94\u7528"},genre:{en:"Genre",zh:"\u98CE\u683C"}};function we(a,t){if(!a)return"";let e=$s[String(a).toLowerCase()];return e?Kt(t)?e.zh:e.en:a}var v=(a,t,e)=>Math.min(e,Math.max(t,a));function zt(a,t="--:--"){if(!Number.isFinite(a)||a<0)return t;let e=Math.round(a),i=Math.floor(e/3600),s=Math.floor(e%3600/60),r=e%60;return i>0?`${i}:${String(s).padStart(2,"0")}:${String(r).padStart(2,"0")}`:`${s}:${String(r).padStart(2,"0")}`}function O(a){let t=String(a??""),e=2166136261;for(let i=0;i<t.length;i+=1)e^=t.charCodeAt(i),e=Math.imul(e,16777619);return e>>>0}function Vt(a={}){let t=[a.title,a.artist,a.album].filter(Boolean).join("|")||"ha-music",e=O(t),i=1.7+(e>>>8)%90/100,s=e%360/360*Math.PI*2,r=Number.isFinite(a.position)&&a.position>0?a.position:0,n=r/i*Math.PI*2+s;return{seed:t,hash:e,period:i,phase:s,position:r,pulse:.5+.5*Math.sin(n),low:.5+.5*Math.sin(n+.55),energy:.55+(e>>>16)%100/220}}function Ms(a){return O(a)%360}function A(a,t){let e=Number(a?.attributes?.supported_features??0);return!Number.isFinite(e)||!t?!1:(e&t)===t}function As(a,t){if(!(!a||!t))return a.states?a.states[t]:void 0}function Yt(a,t,e=""){return As(a,t)?.attributes?.friendly_name||t||e}function $i(a){let t=a?.attributes??{},e=t.media_metadata??{},i=Number(t.media_duration??e.duration??0),s=Number(t.media_position??0),r=t.media_position_updated_at;if(a?.state==="playing"&&r){let n=(Date.now()-new Date(r).getTime())/1e3;Number.isFinite(n)&&n>0&&(s+=n)}return Number.isFinite(i)&&i>0?s=v(s,0,i):(!Number.isFinite(s)||s<0)&&(s=0),{title:t.media_title||e.title||"",artist:t.media_artist||e.artist||t.media_album_artist||e.album_artist||"",album:t.media_album_name||e.album_name||"",series:t.media_series_title||e.series_title||"",track:t.media_track??e.track_number??"",duration:Number.isFinite(i)?i:0,position:Number.isFinite(s)?s:0,art:e.entity_picture||e.image_url||t.entity_picture||t.media_image_url||"",appName:t.app_name||"",source:t.source||"",soundMode:t.sound_mode||"",shuffle:!!t.shuffle,repeat:t.repeat||"off",volume:Number.isFinite(Number(t.volume_level))?Number(t.volume_level):null,muted:!!t.is_volume_muted,groupMembers:Array.isArray(t.group_members)?t.group_members:[]}}function ke(a,t=60){let e=a?.attributes?.queue;return Array.isArray(e)?e.slice(0,t).map((i,s)=>({index:s,title:i.title||i.name||i.media_title||"",artist:i.artist||i.subtitle||i.media_artist||"",album:i.album||i.album_name||"",duration:Number(i.duration??i.media_duration??0)||0,art:i.entity_picture||i.thumbnail||i.artwork||"",contentId:i.media_content_id||i.content_id||"",contentType:i.media_content_type||i.content_type||"",active:!!(i.active||i.is_active||i.current||i.playing)})):[]}function Y(a,t){return t?/^(https?:|data:|blob:)/.test(t)?t:a?.hassUrl?a.hassUrl(t):t:""}function at(a,t,e){let i=t/100,s=e/100,r=(1-Math.abs(2*s-1))*i,n=(a%360+360)%360/60,o=r*(1-Math.abs(n%2-1)),l=[0,0,0];n<1?l=[r,o,0]:n<2?l=[o,r,0]:n<3?l=[0,r,o]:n<4?l=[0,o,r]:n<5?l=[o,0,r]:l=[r,0,o];let h=s-r/2;return l.map(d=>Math.round(v((d+h)*255,0,255)))}function Mi(a){let t=Ms(a),e=(t+42+O(a+"2")%40)%360,i=at(t,72,58),s=at(e,68,52);return{a1:`hsl(${t} 72% 58%)`,a2:`hsl(${e} 68% 52%)`,rgb1:i.join(","),rgb2:s.join(",")}}function Ai(a){let t=String(a).replace("#","").trim(),e=t.length===3?t.split("").map(i=>i+i).join(""):t;return/^[0-9a-f]{6}$/i.test(e)?[parseInt(e.slice(0,2),16),parseInt(e.slice(2,4),16),parseInt(e.slice(4,6),16)].join(","):null}function L(a,t="255,255,255"){let e=String(a||"").trim();if(/^#[0-9a-f]{3,8}$/i.test(e))return Ai(e.slice(0,7))||t;let i=e.match(/hsla?\(\s*([\d.]+)[,\s]+([\d.]+)%[,\s]+([\d.]+)%/i);if(i)return at(Number(i[1]),Number(i[2]),Number(i[3])).join(",");let s=e.match(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/i);return s?`${s[1]},${s[2]},${s[3]}`:t}function $e(a){let t=Ai(a);if(!t)return{h:0,s:0,l:50};let[e,i,s]=t.split(",").map(c=>Number(c)/255),r=Math.max(e,i,s),n=Math.min(e,i,s),o=(r+n)/2,l=r-n,h=0,d=0;return l!==0&&(d=l/(1-Math.abs(2*o-1)),r===e?h=(i-s)/l%6:r===i?h=(s-e)/l+2:h=(e-i)/l+4,h=(h*60+360)%360),{h,s:d*100,l:o*100}}function Me(a,t,e=.5){let i=(t.h-a.h+540)%360-180,s=(a.h+i*e+360)%360,r=a.s+(t.s-a.s)*e,n=a.l+(t.l-a.l)*e;return{h:s,s:r,l:n,css:`hsl(${Math.round(s)} ${Math.round(v(r,25,92))}% ${Math.round(v(n,38,72))}%)`,rgb:at(s,v(r,25,92),v(n,38,72)).join(",")}}var Rt=new Map,Ss=40;function Ps(a,t){let i=document.createElement("canvas");i.width=36,i.height=36;let s=i.getContext("2d",{willReadFrequently:!0});if(!s)return null;s.drawImage(a,0,0,36,36);let r=s.getImageData(0,0,36,36).data,n=new Map;for(let y=0;y<r.length;y+=4){if(r[y+3]<180)continue;let T=r[y],S=r[y+1],z=r[y+2],P=Math.max(T,S,z),C=Math.min(T,S,z),Q=(P+C)/510,ot=P===0?0:(P-C)/P;if(Q<.12||Q>.9||ot<.14)continue;let U=0,J=P-C;J!==0&&(P===T?U=(S-z)/J%6:P===S?U=(z-T)/J+2:U=(T-S)/J+4,U=(U*60+360)%360);let xt=Math.floor(U/18),Z=n.get(xt)||{count:0,sat:0,light:0};Z.count+=1,Z.sat+=ot,Z.light+=Q,n.set(xt,Z)}if(!n.size)return null;let o=[...n.entries()].map(([y,_])=>({hue:y*18+9,score:_.count*(.45+_.sat/_.count),sat:_.sat/_.count,light:_.light/_.count})).sort((y,_)=>_.score-y.score),l=o[0],h=o.find(y=>{let _=Math.abs(y.hue-l.hue);return Math.min(_,360-_)>28})||{hue:(l.hue+44)%360,sat:l.sat,light:l.light},d=y=>v(Math.round(y*100),42,88),c=Math.round(l.hue),u=Math.round(h.hue),f=d(l.sat+.08),m=d(h.sat+.05),b=v(Math.round(l.light*100)+12,46,66),x=v(Math.round(h.light*100)+8,40,60);return{a1:`hsl(${c} ${f}% ${b}%)`,a2:`hsl(${u} ${m}% ${x}%)`,rgb1:at(c,f,b).join(","),rgb2:at(u,m,x).join(","),h1:c,s1:f,l1:b,h2:u,s2:m,l2:x,seed:O(t||"")}}function Si(a,t=""){if(!a)return Promise.resolve(null);if(Rt.has(a))return Rt.get(a);let e=new Promise(i=>{let s=new Image;s.crossOrigin="anonymous",s.decoding="async",s.onload=()=>{try{i(Ps(s,t))}catch{i(null)}},s.onerror=()=>i(null),s.src=a});return Rt.size>Ss&&Rt.clear(),Rt.set(a,e),e}var Pi=new WeakMap;function Es(){return typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches}function Ci(a){a.raf&&(window.cancelAnimationFrame(a.raf),a.raf=null),a.last=0}function Ei(a,t){if(t.raf)return;a.style.transition="none",a.style.willChange="transform",t.last=0;let e=i=>{if(!a.isConnected){t.raf=null;return}t.last||(t.last=i);let s=Math.min(.1,(i-t.last)/1e3);t.last=i,t.angle=(t.angle+s*360/(16e3/1e3))%360,a.style.transform=`rotate(${t.angle}deg)`,t.raf=window.requestAnimationFrame(e)};t.raf=window.requestAnimationFrame(e)}function Cs(a,t){if(Ci(t),t.resetTimer&&(window.clearTimeout(t.resetTimer),t.resetTimer=null),!a.isConnected)return;if(!t.angle){a.style.transform="rotate(0deg)";return}let e=t.angle;a.style.transition="none",a.style.transform=`rotate(${e}deg)`,window.requestAnimationFrame(()=>{!a.isConnected||t.playing||(a.style.transition="transform 1.15s cubic-bezier(0.22, 1, 0.36, 1)",a.style.transform="rotate(0deg)",t.resetTimer=window.setTimeout(()=>{t.resetTimer=null,t.playing||(a.style.transition="none",a.style.willChange="auto",a.style.transform="rotate(0deg)")},1250))}),t.angle=0}function pt(a,t){if(!a)return;let e=Pi.get(a);if(e||(e={angle:0,playing:!1,raf:null,last:0,resetTimer:null},Pi.set(a,e)),Es()){Ci(e),a.style.transition="none",a.style.willChange="auto",a.style.transform="rotate(0deg)",e.playing=!1;return}let i=!!t;if(e.playing===i){i&&Ei(a,e);return}e.playing=i,i?(e.resetTimer&&(window.clearTimeout(e.resetTimer),e.resetTimer=null),Ei(a,e)):Cs(a,e)}var rt=104,ut=36,Wt=ut/2,mt=Math.min(2,typeof window>"u"?1:window.devicePixelRatio||1),nt=new WeakMap,Gt=["#7b5cff","#2ee6c5"];function Xt(a){let t=String(a||"").replace("#","");return t.length===3?[0,1,2].map(e=>parseInt(t[e]+t[e],16)):t.length===6?[0,2,4].map(e=>parseInt(t.slice(e,e+2),16)):[123,92,255]}function Ts(a,t,e){let i=Xt(a),s=Xt(t);return i.map((r,n)=>Math.round(r+(s[n]-r)*e))}function Ti(a,t){let[e,i,s]=a;return`rgba(${e}, ${i}, ${s}, ${t})`}function zs(a,t,e){let i=nt.get(a);if(!i?.ctx)return;let{ctx:s}=i;s.setTransform(mt,0,0,mt,0,0),s.clearRect(0,0,rt,rt);let r=rt/2,n=33.5,o=r-n-3,l=i.accent||Gt;s.lineCap="round",s.shadowBlur=5+e*7;for(let h=0;h<ut;h+=1){let d=v(t[h]||0,0,1),c=h/ut*Math.PI*2-Math.PI/2,u=2.2+Math.pow(d,1.05)*o,f=Math.cos(c),m=Math.sin(c),b=Math.abs(h-Wt)/Wt,x=Ts(l[0],l[1],b),y=.5+d*.48;s.strokeStyle=Ti(x,y),s.shadowColor=Ti(x,.12+e*.26),s.lineWidth=3,s.beginPath(),s.moveTo(r+f*n,r+m*n),s.lineTo(r+f*(n+u),r+m*(n+u)),s.stroke();let _=v((b-.3)/.45,0,1);_>.01&&(s.shadowBlur=0,s.strokeStyle=`rgba(255, 255, 255, ${((.05+d*.24)*_).toFixed(2)})`,s.lineWidth=1.1,s.stroke(),s.shadowBlur=5+e*7)}s.shadowBlur=0,s.shadowColor="transparent"}function zi(a){let t=nt.get(a);t?.ctx&&(t.ctx.setTransform(mt,0,0,mt,0,0),t.ctx.clearRect(0,0,rt,rt))}function Ae(a,t,e,i){if(!a?.style)return;a.style.setProperty("--fab-beat",t.toFixed(4)),a.style.setProperty("--fab-beat-glow",e.toFixed(3));let s=a.querySelector?.(".fab-disc");if(s){let r=i||Gt,[n,o,l]=Xt(r[0]),[h,d,c]=Xt(r[1]);s.style.boxShadow=["0 10px 26px rgba(2, 6, 18, 0.46)",`0 0 26px rgba(${n}, ${o}, ${l}, ${(e*.92).toFixed(3)})`,`0 0 52px rgba(${h}, ${d}, ${c}, ${(e*.55).toFixed(3)})`].join(", ")}}function Ri(a,t){let e=nt.get(a);if(!e||(e.raf=0,!e.playing||!e.visible))return;if(!a.isConnected){e.playing=!1;return}let i=e.position+Math.max(0,t-e.since)/1e3,s=i/e.period*Math.PI*2+e.phase,r=.5+.5*Math.sin(s),n=.5+.5*Math.sin(s+.55),o=Math.pow(.5+.5*Math.sin(s*2.15+e.phase*1.7),3),l=[];for(let c=0;c<Wt;c+=1){let u=c/(Wt-1),f=Math.pow(1-u,1.05),m=Math.sin(i*(4.6+e.hash%9*.25)+c*1.1+e.phase),b=Math.sin(i*(11.4+e.hash%5*.4)+c*2.3),x=(.16+.68*f)*(.62+.38*(.5+.5*m)),y=.18*o*Math.pow(1-u,2.2),_=v(x*(.55+.45*(.5+.5*b))+y+.04*e.energy,0,1);l[c]=_,l[ut-1-c]=_}for(let c=0;c<ut;c+=1){let u=e.smooth[c]||0,f=l[c]||0;e.smooth[c]=f>u?u+(f-u)*.72:u+(f-u)*.24}let h=Math.min(1,n*1.05+o*.4);zs(a,e.smooth,h);let d=1+Math.min(.085,n*.05+o*.05);Ae(e.root,d,.16+Math.min(.46,n*.5+o*.26),e.accent),e.raf=requestAnimationFrame(c=>Ri(a,c))}function Rs(a,{clearNow:t=!1}={}){let e=nt.get(a);if(e){if(e.raf&&(cancelAnimationFrame(e.raf),e.raf=0),Ae(e.root,1,0),e.smooth.fill(0),t){zi(a);return}e.clearTimer=window.setTimeout(()=>{let i=nt.get(a);i&&!i.playing&&zi(a)},460)}}function Li(a,t,e={}){if(!a||typeof a.getContext!="function")return;let i=nt.get(a);if(!i){let d=a.getContext("2d");if(!d)return;a.width=Math.round(rt*mt),a.height=Math.round(rt*mt),i={ctx:d,root:t,playing:!1,visible:!0,position:0,lastPosition:null,since:0,hash:0,period:2,phase:0,energy:.6,accent:Gt,smooth:new Array(ut).fill(0),raf:0,clearTimer:0},nt.set(a,i)}let s=Array.isArray(e.accent)&&e.accent.length>=2?[e.accent[0],e.accent[1]]:Gt;i.accent=s,i.root=t,i.clearTimer&&(window.clearTimeout(i.clearTimer),i.clearTimer=0),i.root=t||i.root;let r=!!e.playing,n=e.visible!==!1,o=i.playing,l=Number(e.position);Number.isFinite(l)&&l>=0&&((i.lastPosition==null||Math.abs(l-i.lastPosition)>.25||!o&&r)&&(i.position=l,i.since=performance.now()),i.lastPosition=l);let h=[e.title,e.artist,e.album].filter(Boolean).join("|")||"ha-music";if(i.hash=O(h),i.period=1.7+(i.hash>>>8)%90/100,i.phase=i.hash%360/360*Math.PI*2,i.energy=.55+(i.hash>>>16)%100/220,i.playing=r,i.visible=n,!r||!n){Rs(a,{clearNow:!n});return}i.raf||(Ae(i.root,1,0),i.since=performance.now(),i.raf=requestAnimationFrame(d=>Ri(a,d)))}var Jt="haMusicMiniPlayer",Ki="haMusicMiniPositions",gt=new Set(["top","sidebar","fab"]);function bt(a){return typeof a=="string"&&E[a]?a:H}function X(a){if(!a||typeof a!="object"||Array.isArray(a))return{};let t={};for(let e of gt)E[a[e]]&&(t[e]=a[e]);return t}function Ls(a,t){if(!a)return;let e=bt(t),i=E[e];a.dataset.theme=e,a.style.setProperty("--hm-accent",i.accent[0]),a.style.setProperty("--hm-accent-2",i.accent[1]),a.style.setProperty("--hm-accent-rgb",L(i.accent[0],"46,230,197")),a.style.setProperty("--hm-accent-2-rgb",L(i.accent[1],"123,92,255")),a.style.setProperty("--hm-base-rgb",L(i.base,"5,10,18")),a.style.setProperty("--hm-glow",String(i.glow??1))}function Pe(){try{let a=window.localStorage.getItem(Ki);if(!a)return{};let t=JSON.parse(a);return t&&typeof t=="object"&&!Array.isArray(t)?t:{}}catch{return{}}}function Se(a,t,e){if(gt.has(a))try{let i=Pe();i[a]={x:Number(t.toFixed(4)),y:Number(e.toFixed(4))},window.localStorage.setItem(Ki,JSON.stringify(i))}catch{}}var Ni='<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path d="M14.5 5.2l4.6-1v9.1a3 3 0 1 1-1.8-2.7V7.1l-2.8.6v7.7a3 3 0 1 1-1.8-2.7V5.2z" fill="currentColor"/></svg>',Oi='<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" fill="currentColor"/></svg>',qi='<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false"><path d="M16 6h2v12h-2zM6 6l8.5 6L6 18z" fill="currentColor"/></svg>',Qt='<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>',Ns='<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false"><path d="M6 5h4v14H6zM14 5h4v14h-4z" fill="currentColor"/></svg>';var Di='<svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true" focusable="false"><path d="M6.7 9.3L12 14.6l5.3-5.3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';var Vi=new Set(["HA-SIDEBAR","ASIDE"]);function W(a,t=1,e=1){return!!(a&&a.width>=t&&a.height>=e&&a.bottom>0&&a.right>0)}function Yi(a,t,e,i=0){if(!a||i>8)return;let s=a.querySelectorAll?a.querySelectorAll("*"):[];for(let r of s){try{t(r)&&e.push(r)}catch{}r.shadowRoot&&Yi(r.shadowRoot,t,e,i+1)}}function G(a){let t=[];return Yi(document,a,t),t}function Os(a){let t=G(i=>a.has(i.tagName)),e=null;for(let i of t){let s=i.getBoundingClientRect();W(s,24,24)&&(!e||s.width*s.height>e.width*e.height)&&(e={left:s.left,top:s.top,width:s.width,height:s.height,right:s.right,bottom:s.bottom})}return e}function Lt(){let a=G(i=>{if(i.tagName==="BODY"||i.tagName==="HTML")return!1;let s=i.getBoundingClientRect();return!W(s,200,36)||s.top>8||s.height>150?!1:i.classList?.contains("top-app-bar")||i.classList?.contains("app-header")||i.tagName==="HA-TOP-APP-BAR"||i.tagName==="HA-TOP-APP-BAR-FIXED"}),t=null;for(let i of a){let s=i.getBoundingClientRect();s.height>150||(!t||s.width*s.height>t.width*t.height)&&(t={left:s.left,top:s.top,width:s.width,height:s.height,right:s.right,bottom:s.bottom})}if(t)return t;let e=G(i=>{if(i.tagName==="BODY"||i.tagName==="HTML")return!1;let s=i.getBoundingClientRect();if(!W(s,240,36)||s.top>8||s.height>92)return!1;let r=`${i.tagName} ${i.id} ${i.className||""}`.toLowerCase();return/top-app-bar|app-header|navbar|\bheader\b/.test(r)});for(let i of e){let s=i.getBoundingClientRect();if(s.height<=92)return{left:s.left,top:s.top,width:s.width,height:s.height,right:s.right,bottom:s.bottom}}return null}function Te(a){if(!a)return null;let t=G(i=>{if(i.tagName==="BODY"||i.tagName==="HTML"||typeof i.getBoundingClientRect!="function")return!1;let s=i.getBoundingClientRect();if(!W(s,16,16)||s.width>88||s.height>64||s.left<a.left-2||s.right>a.right+2||s.top<a.top-4||s.bottom>a.bottom+4)return!1;let r=[i.getAttribute?.("aria-label"),i.getAttribute?.("title"),i.getAttribute?.("icon"),i.id,i.className].filter(Boolean).join(" ").toLowerCase();return/remove|delete|close|unpin|关闭|删除/.test(r)?!1:/(mdi:(plus|add)|plus|add|create|添加|新增|新建)/.test(r)}),e=null;for(let i of t){let s=i.getBoundingClientRect(),r=s.width*s.height;(!e||r>e.area||r===e.area&&s.right>e.rect.right)&&(e={rect:s,area:r})}return e?.rect||null}function qs(a){if(!a)return null;let t=G(i=>{if(i.tagName==="BODY"||i.tagName==="HTML"||typeof i.getBoundingClientRect!="function")return!1;let s=i.getBoundingClientRect();if(!W(s,16,16)||s.height>72||s.width>a.width+2||s.left<a.left-2||s.right>a.right+2||s.top<a.top||s.bottom>a.bottom+2||s.top<a.top+a.height*.45)return!1;let r=[i.getAttribute?.("aria-label"),i.getAttribute?.("title"),i.getAttribute?.("icon"),i.id,i.className].filter(Boolean).join(" ").toLowerCase();return/remove|delete|close|关闭|删除/.test(r)?!1:/(settings|设置|cog|gear)/.test(r)}),e=null;for(let i of t){let s=i.getBoundingClientRect();(!e||s.top>e.top)&&(e={top:s.top,rect:s})}return e?.rect||null}function Wi(){let a=Os(Vi);if(a)return a;let t=G(i=>{if(i.tagName==="BODY"||i.tagName==="HTML")return!1;let s=i.getBoundingClientRect();if(!W(s,40,240)||s.left>8)return!1;let r=`${i.tagName} ${i.id} ${i.className||""}`.toLowerCase();return/sidebar|navigation|nav-drawer/.test(r)}),e=null;for(let i of t){let s=i.getBoundingClientRect();(!e||s.height>e.height)&&(e={left:s.left,top:s.top,width:s.width,height:s.height,right:s.right,bottom:s.bottom})}return e}function Ui(){let a=G(e=>{if(e.tagName==="BODY"||e.tagName==="HTML")return!1;let i=e.getBoundingClientRect();return!W(i,200,36)||i.top>8||i.height>150?!1:e.classList?.contains("top-app-bar")||e.classList?.contains("app-header")||e.tagName==="HA-TOP-APP-BAR"||e.tagName==="HA-TOP-APP-BAR-FIXED"}),t=null;for(let e of a){let i=e.getBoundingClientRect();i.height>150||(!t||i.width*i.height>t.area)&&(t={node:e,area:i.width*i.height})}return t?.node||null}function Ii(){let a=G(e=>Vi.has(e.tagName)),t=null;for(let e of a){let i=e.getBoundingClientRect();W(i,24,120)&&(!t||i.height>t.height)&&(t={node:e,height:i.height})}return t?.node||null}function Fi(a){let t=Math.round(window.innerWidth||0),e=Math.round(window.innerHeight||0);if(a==="top"){let i=Lt(),s=i?.height||56,r=i?.top||0;return{left:i?.left||0,top:r,width:i?.width||t,height:Math.max(40,Math.min(72,s)),right:(i?.left||0)+(i?.width||t),bottom:r+Math.max(40,Math.min(72,s))}}if(a==="sidebar"){let i=Wi();if(i)return i;let s=Lt()?.height||56;return{left:0,top:s,width:256,height:Math.max(240,e-s),right:256,bottom:e}}return null}var Zt=12;function Ee(){let a=Math.round(window.innerWidth||0),t=Math.round(window.innerHeight||0),e=Lt(),i=Wi(),s=i&&i.height>=t*.4?i.right+Zt:0,r=e&&e.width>=a*.5?e.bottom+Zt:0;return{vw:a,vh:t,minX:s,minY:r}}function Bi(a,t,e,i,s=Ee()){let{vw:r,vh:n,minX:o,minY:l}=s,h=Math.max(o,r-e-Zt),d=Math.max(l,n-i-Zt);return{x:q(a,o,h),y:q(t,l,d)}}function q(a,t,e){return e<t?t:Math.max(t,Math.min(e,a))}function Hi(a){return a==="top"||a==="sidebar"?8:24}var ji=`
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
`;function D(a){return a===!0||a==="1"?["top"]:Array.isArray(a)?[...new Set(a.map(t=>String(t)).filter(t=>gt.has(t)))]:typeof a!="string"||!a||a==="none"?[]:a.includes(",")?[...new Set(a.split(",").map(t=>t.trim()).filter(t=>gt.has(t)))]:gt.has(a)?[a]:[]}function Gi(a){return D(a)[0]||"none"}function Nt(a){return typeof a=="string"&&a.startsWith("media_player.")?a:""}function _t(a){if(!a||typeof a!="object"||Array.isArray(a))return{};let t={};for(let e of gt){let i=Nt(a[e]);i&&(t[e]=i)}return t}function ft(){if(typeof document>"u")return null;let a=document.querySelector("home-assistant");if(a?.hass?.states)return a.hass;let t=a?.shadowRoot?.querySelector("home-assistant-main");if(t?.hass?.states)return t.hass;let e=document.querySelector("ha-music");return e?.hass?.states?e.hass:null}function te(){try{let a=window.localStorage.getItem(Jt);if(!a)return null;let t=JSON.parse(a),e=D(t?.modes??t?.mode),i=_t(t?.entities),s=X(t?.themes),r=Number(t?.updated)||0,n=t?.disabled===!0,o=Nt(t?.entity);o&&e[0]&&!i[e[0]]&&(i[e[0]]=o);let l=e.filter(h=>i[h]);return l.length?{modes:l,entities:i,themes:s,disabled:!1,updated:r}:n?{modes:[],entities:i,themes:s,disabled:!0,updated:r}:null}catch{return null}}function ze(a={}){try{let t=D(a.modes??a.mode),e=_t(a.entities),i=X(a.themes),s=Number(a.updated)||Date.now(),r=Nt(a.entity);r&&t[0]&&!e[t[0]]&&(e[t[0]]=r);let n=t.filter(h=>e[h]);if(!n.length){let h=JSON.stringify({modes:[],entities:e,themes:i,disabled:!0,updated:s});window.localStorage.setItem(Jt,h);return}let o=JSON.stringify({modes:n,entities:e,themes:i,disabled:!1,updated:s});if(window.localStorage.getItem(Jt)===o)return;window.localStorage.setItem(Jt,o)}catch{}}function Re(a){if(typeof document>"u")return;let t=window.__haMusicDocks;if(t&&typeof t.get=="function"){if(a)t.get(a)?.remove(),t.delete(a);else{for(let e of t.values())e.remove();t.clear()}window.__haMusicDock=t.values().next().value||null;return}window.__haMusicDock?.remove(),window.__haMusicDock=null}function Ot(a=[]){if(typeof window>"u"||typeof document>"u")return[];let t=[];for(let s of Array.isArray(a)?a:[a]){let r=Gi(s?.mode),n=Nt(s?.entity);r==="none"||!n||t.push({mode:r,entity:n,hass:s?.hass||null,theme:bt(s?.theme)})}if(!t.length)return Re(),[];if(!document.body)return document.addEventListener("DOMContentLoaded",()=>Ot(t),{once:!0}),[];let e=window.__haMusicDocks instanceof Map?window.__haMusicDocks:new Map,i=new Map(t.map(s=>[s.mode,s]));for(let[s,r]of e)i.has(s)||(r.remove(),e.delete(s));for(let[s,r]of i){let n=e.get(s);n?n.update(r):(n=document.createElement("ha-music-mini"),n.update(r),document.body.appendChild(n),e.set(s,n))}return window.__haMusicDocks=e,window.__haMusicDock=e.values().next().value||null,[...e.values()]}var Ce=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this._mode="top",this._theme=H,this._open=!1,this._folded=!1,this._entity="",this._hass=null,this._poll=null,this._press=null,this._pressTimer=null,this._drag=null,this._dragging=!1,this._suppressClick=!1,this._clickTimer=null,this._onClick=t=>this._handleClick(t),this._onRoute=()=>this._sync(),this._onPointerDown=t=>this._handlePointerDown(t),this._onPointerMove=t=>this._handlePointerMove(t),this._onPointerUp=t=>this._handlePointerUp(t),this._onPointerCancel=t=>this._handlePointerCancel(t),this._onContextMenu=t=>this._handleContextMenu(t),this._onDragStart=t=>{t.preventDefault(),t.stopPropagation()},this._onResize=()=>{this._applySavedPosition(),this._watchDockBounds()},this._boundsObserver=null,this._boundsRaf=null,this._boundsNodes=0,this._sync=this._sync.bind(this)}update(t={}){let e=Gi(t.mode),i=Nt(t.entity),s=bt(t.theme),r=e!==this._mode;this._mode=e,this._theme=s,r&&(this._open=!1,this._folded=!1),this._entity=i,t.hass?.states&&(this._hass=t.hass),(!this.shadowRoot.childElementCount||r)&&this._render(),this._sync(),this._applySavedPosition(),this._watchDockBounds()}connectedCallback(){this.shadowRoot.childElementCount||this._render(),this.shadowRoot.addEventListener("click",this._onClick),this.shadowRoot.addEventListener("pointerdown",this._onPointerDown),this.shadowRoot.addEventListener("pointermove",this._onPointerMove),this.shadowRoot.addEventListener("pointerup",this._onPointerUp),this.shadowRoot.addEventListener("pointercancel",this._onPointerCancel),this.shadowRoot.addEventListener("contextmenu",this._onContextMenu),this.shadowRoot.addEventListener("dragstart",this._onDragStart,!0),window.addEventListener("resize",this._onResize),window.addEventListener("location-changed",this._onRoute),this._startPolling(),this._sync(),window.requestAnimationFrame(()=>{this._applySavedPosition(),this._watchDockBounds()})}disconnectedCallback(){this.shadowRoot.removeEventListener("click",this._onClick),this.shadowRoot.removeEventListener("pointerdown",this._onPointerDown),this.shadowRoot.removeEventListener("pointermove",this._onPointerMove),this.shadowRoot.removeEventListener("pointerup",this._onPointerUp),this.shadowRoot.removeEventListener("pointercancel",this._onPointerCancel),this.shadowRoot.removeEventListener("contextmenu",this._onContextMenu),this.shadowRoot.removeEventListener("dragstart",this._onDragStart,!0),window.removeEventListener("resize",this._onResize),window.removeEventListener("location-changed",this._onRoute),this._boundsObserver&&(this._boundsObserver.disconnect(),this._boundsObserver=null),this._boundsRaf&&(cancelAnimationFrame(this._boundsRaf),this._boundsRaf=null),this._boundsNodes=0,this._poll&&clearInterval(this._poll),this._poll=null}_startPolling(){this._poll||(this._poll=window.setInterval(()=>{let t=ft()||this._hass;t?.states&&(this._hass=t,this._sync()),this._boundsNodes||this._watchDockBounds()},1e3))}_watchDockBounds(){if(typeof ResizeObserver>"u")return;let t=[];if(this._mode==="top"?t=[Ui()].filter(Boolean):this._mode==="sidebar"?t=[Ii()].filter(Boolean):this._mode==="fab"&&(t=[Ui(),Ii()].filter(Boolean)),!t.length){this._boundsNodes=0;return}this._boundsObserver&&this._boundsObserver.disconnect(),this._boundsNodes=t.length,this._boundsObserver=new ResizeObserver(()=>{this._dragging||this._boundsRaf||(this._boundsRaf=window.requestAnimationFrame(()=>{this._boundsRaf=null,this._applySavedPosition()}))});for(let e of t)this._boundsObserver.observe(e)}_render(){if(this._eq=null,this._mode==="fab")return this._renderFab();this.shadowRoot.innerHTML=`
      <style>${ji}</style>
      <div class="mini" data-mode="${this._mode}" role="region" aria-label="HA Music \u8FF7\u4F60\u64AD\u653E\u5668">
        <div class="art">
          <img alt="" draggable="false" />
          <span class="fallback">${Ni}</span>
        </div>
        <div class="meta">
          <div class="title">\u9009\u62E9\u64AD\u653E\u5668</div>
          <div class="sub">\u5728\u5361\u7247\u7F16\u8F91\u5668\u4E2D\u9009\u62E9\u4F4D\u7F6E</div>
        </div>
        <div class="controls">
          <button data-act="prev" type="button" aria-label="\u4E0A\u4E00\u9996">${Oi}</button>
          <button class="toggle" data-act="toggle" type="button" aria-label="\u64AD\u653E">${Qt}</button>
          <button data-act="next" type="button" aria-label="\u4E0B\u4E00\u9996">${qi}</button>
        </div>
        <div class="progress"><span></span></div>
      </div>
    `,this._mini=this.shadowRoot.querySelector(".mini"),this._art=this.shadowRoot.querySelector(".art img"),this._fallback=this.shadowRoot.querySelector(".fallback"),this._title=this.shadowRoot.querySelector(".title"),this._sub=this.shadowRoot.querySelector(".sub"),this._toggle=this.shadowRoot.querySelector(".toggle"),this._prev=this.shadowRoot.querySelector('[data-act="prev"]'),this._next=this.shadowRoot.querySelector('[data-act="next"]'),this._progress=this.shadowRoot.querySelector(".progress span"),this._disc=null,this._quick=null,this._art.addEventListener("error",()=>{this._art.removeAttribute("src"),this._fallback.style.display="grid"})}_renderFab(){this.shadowRoot.innerHTML=`
      <style>${ji}</style>
      <div class="mini mini-fab" data-mode="fab" data-open="${this._open?"true":"false"}" role="region" aria-label="HA Music \u60AC\u6D6E\u64AD\u653E\u5668">
        <div class="fab-orb">
          <button class="fab-disc" type="button" aria-label="\u5C55\u5F00\u64AD\u653E\u5668" aria-expanded="${this._open?"true":"false"}">
            <div class="art">
              <img alt="" draggable="false" />
              <span class="fallback">${Ni}</span>
            </div>
            <span class="fab-glow"></span>
          </button>
          <canvas class="fab-eq" aria-hidden="true"></canvas>
          <button class="fab-quick" data-act="toggle" type="button" aria-label="\u64AD\u653E">${Qt}</button>
        </div>
        <div class="fab-panel">
          <div class="fab-head">
            <div class="meta">
              <div class="title">\u9009\u62E9\u64AD\u653E\u5668</div>
              <div class="sub">\u5728\u5361\u7247\u7F16\u8F91\u5668\u4E2D\u9009\u62E9\u4F4D\u7F6E</div>
            </div>
            <button class="fab-collapse" data-act="collapse" type="button" aria-label="\u6536\u8D77\u64AD\u653E\u5668">${Di}</button>
          </div>
          <div class="progress"><span></span></div>
          <div class="controls">
            <button data-act="prev" type="button" aria-label="\u4E0A\u4E00\u9996">${Oi}</button>
            <button class="toggle" data-act="toggle" type="button" aria-label="\u64AD\u653E">${Qt}</button>
            <button data-act="next" type="button" aria-label="\u4E0B\u4E00\u9996">${qi}</button>
          </div>
        </div>
      </div>
    `,this._mini=this.shadowRoot.querySelector(".mini"),this._art=this.shadowRoot.querySelector(".art img"),this._fallback=this.shadowRoot.querySelector(".fallback"),this._title=this.shadowRoot.querySelector(".title"),this._sub=this.shadowRoot.querySelector(".sub"),this._toggle=this.shadowRoot.querySelector(".fab-panel .toggle"),this._prev=this.shadowRoot.querySelector('.fab-panel [data-act="prev"]'),this._next=this.shadowRoot.querySelector('.fab-panel [data-act="next"]'),this._progress=this.shadowRoot.querySelector(".fab-panel .progress span"),this._disc=this.shadowRoot.querySelector(".fab-disc"),this._quick=this.shadowRoot.querySelector(".fab-quick"),this._collapse=this.shadowRoot.querySelector(".fab-collapse"),this._eq=this.shadowRoot.querySelector(".fab-eq"),this._art.addEventListener("error",()=>{this._art.removeAttribute("src"),this._fallback.style.display="grid"})}_stateLabel(t){let e=!this._hass?.language||String(this._hass.language).startsWith("zh");return{playing:e?"\u64AD\u653E\u4E2D":"Playing",paused:e?"\u5DF2\u6682\u505C":"Paused",idle:e?"\u7A7A\u95F2":"Idle",off:e?"\u5DF2\u5173\u95ED":"Off",unavailable:e?"\u4E0D\u53EF\u7528":"Unavailable",unknown:e?"\u672A\u77E5":"Unknown"}[t]||t}_clearDockInlineStyles(){if(this._mini){for(let t of["left","top","right","bottom","width","height","max-height"])this._mini.style.removeProperty(t);this._mini.style.removeProperty("--hm-sidebar-compact-size"),delete this._mini.dataset.compact}}_applySavedPosition(){if(!this._mini||!this._mini.isConnected||this._dragging)return;if(this._mode==="fab"){let m=this._mini,b=m.getBoundingClientRect(),x=b.width||64,y=b.height||64,_=Ee(),S=Pe().fab,z=_.vw-x-24,P=_.vh/2-y/2,C=Bi(S&&Number.isFinite(S.x)?S.x*window.innerWidth:z,S&&Number.isFinite(S.y)?S.y*window.innerHeight:P,x,y,_);m.style.left=`${Math.round(C.x)}px`,m.style.top=`${Math.round(C.y)}px`,m.style.right="auto",m.style.bottom="auto";return}let t=Fi(this._mode);if(!t)return;let i=Pe()[this._mode],s=Hi(this._mode),r=this._mini;if(this._mode==="top"){let m=Math.round(Math.min(44,Math.max(38,t.height-8))),b=Math.max(150,t.width-s*2),x=Math.round(Math.min(300,Math.max(200,t.width-140),b));r.style.width=`${x}px`,r.style.height=`${m}px`,r.style.removeProperty("max-height"),delete r.dataset.compact;let y=Te(t),_=y?y.left-8-x:t.right-x-80,T=q(i&&Number.isFinite(i.x)?i.x*window.innerWidth:_,t.left+s,t.right-x-s);r.style.left=`${Math.round(T)}px`,r.style.top=`${Math.round(t.top+Math.max(2,(t.height-m)/2))}px`,r.style.right="auto",r.style.bottom="auto";return}let n=Math.round(Math.max(56,Math.min(236,t.width-16))),o=n<170,l=Math.round(Math.max(40,Math.min(56,t.width-4)));o?(r.style.setProperty("--hm-sidebar-compact-size",`${l}px`),r.style.width=`${l}px`,r.style.height=`${l}px`,r.dataset.compact="true"):(r.style.removeProperty("--hm-sidebar-compact-size"),r.style.width=`${n}px`,r.style.height="auto",r.dataset.compact="false"),r.style.maxHeight=`${Math.max(56,t.height-16)}px`;let h=Math.round(t.left+(o?4:s));r.style.left=`${h}px`,r.style.right="auto",r.style.bottom="auto";let d=r.getBoundingClientRect().height||58,c=qs(t),u=c?c.top-8-d:t.bottom-d-148,f=q(i&&Number.isFinite(i.y)?i.y*window.innerHeight:u,t.top+s,t.bottom-d-s);r.style.top=`${Math.round(f)}px`}_saveCurrentPosition(){if(!this._mini)return;let t=this._mini.getBoundingClientRect();if(this._mode==="fab"){Se("fab",q(t.left/Math.max(1,window.innerWidth),0,1),q(t.top/Math.max(1,window.innerHeight),0,1));return}if(this._mode==="top"){Se(this._mode,q(t.left/Math.max(1,window.innerWidth),0,1),0);return}Se(this._mode,0,q(t.top/Math.max(1,window.innerHeight),0,1))}_handlePointerDown(t){!this._mini||t.button!==0||t.isPrimary===!1||(this._clearPress(),this._press={pointerId:t.pointerId,x:t.clientX,y:t.clientY,long:!1,moved:!1},this._dragging=!1,this._suppressClick=!1,this._pressTimer=window.setTimeout(()=>{this._pressTimer=null,this._press&&this._beginDrag()},360))}_beginDrag(){if(!this._press||!this._mini)return;this._press.long=!0,this._dragging=!0;let t=this._mini.getBoundingClientRect();this._drag={left:t.left,top:t.top,width:t.width,height:t.height,x:this._press.x,y:this._press.y,bounds:this._mode==="fab"?Ee():Fi(this._mode)},this._mini.dataset.dragging="true",this._mini.style.left=`${t.left}px`,this._mini.style.top=`${t.top}px`,this._mini.style.right="auto",this._mini.style.bottom="auto";try{this._mini.setPointerCapture(this._press.pointerId)}catch{}}_handlePointerMove(t){if(!this._press)return;let e=t.clientX-this._press.x,i=t.clientY-this._press.y;if(!this._dragging){Math.hypot(e,i)>8&&(this._press.moved=!0,this._pressTimer&&(window.clearTimeout(this._pressTimer),this._pressTimer=null));return}t.preventDefault();let s=this._drag.bounds;if(!s)return;let r=Hi(this._mode),n=this._drag.left,o=this._drag.top;if(this._mode==="top")n=q(this._drag.left+e,s.left+r,s.right-this._drag.width-r);else if(this._mode==="sidebar")o=q(this._drag.top+i,s.top+r,s.bottom-this._drag.height-r);else if(this._mode==="fab"){let l=Bi(this._drag.left+e,this._drag.top+i,this._drag.width,this._drag.height,s);n=l.x,o=l.y}this._mini.style.left=`${Math.round(n)}px`,this._mini.style.top=`${Math.round(o)}px`,this._mini.style.right="auto",this._mini.style.bottom="auto"}_handlePointerUp(){if(!this._press)return;let t=this._press.long,e=this._press.moved;this._pressTimer&&(window.clearTimeout(this._pressTimer),this._pressTimer=null),this._dragging&&(this._saveCurrentPosition(),this._releasePointer()),(this._dragging||t||e)&&(this._suppressClick=!0,window.setTimeout(()=>{this._suppressClick=!1},560)),this._dragging=!1,this._press=null,this._mini&&delete this._mini.dataset.dragging}_handlePointerCancel(){this._releasePointer(),this._clearPress(),this._dragging=!1,this._mini&&delete this._mini.dataset.dragging}_clearPress(){this._pressTimer&&(window.clearTimeout(this._pressTimer),this._pressTimer=null),this._press=null}_releasePointer(){let t=this._press?.pointerId;if(!(t===void 0||!this._mini))try{this._mini.releasePointerCapture(t)}catch{}}_handleContextMenu(t){(this._press||this._dragging)&&t.preventDefault()}_sync(){if(!this._mini)return;if(Ls(this._mini,this._theme),this._mini.dataset.mode=this._mode,this._mini.dataset.folded=this._mode!=="fab"&&this._folded?"true":"false",this._mode==="fab"&&(this._mini.dataset.open=this._open?"true":"false"),this._mini.dataset.playing="false",!this._entity){this._title.textContent="\u9009\u62E9\u64AD\u653E\u5668",this._sub.textContent="\u5728\u5361\u7247\u7F16\u8F91\u5668\u4E2D\u9009\u62E9\u4F4D\u7F6E",this._setDisabled(!0),this._progress.style.width="0%",this._setArt(null),pt(this._art,!1),this._syncFabEq(!1,{},0);return}let t=ft()||this._hass;t?.states&&(this._hass=t);let e=this._hass?.states?.[this._entity];if(!e){this._title.textContent=this._entity,this._sub.textContent="\u5B9E\u4F53\u4E0D\u53EF\u7528",this._setDisabled(!0),this._progress.style.width="0%",this._setArt(null),pt(this._art,!1),this._syncFabEq(!1,{},0);return}let i=e.attributes||{},s=i.media_title||i.friendly_name||this._entity;this._title.textContent=s;let r=i.media_artist||i.media_album_name||"";r===s&&(r="");let n=this._stateLabel(e.state);this._sub.textContent=r?`${r} \xB7 ${n}`:n,this._setDisabled(!1);let o=e.state==="playing";this._mini.dataset.playing=o?"true":"false";let l=o?Ns:Qt;this._toggle.innerHTML=l,this._toggle.setAttribute("aria-label",o?"\u6682\u505C":"\u64AD\u653E"),this._quick&&(this._quick.innerHTML=l,this._quick.setAttribute("aria-label",o?"\u6682\u505C":"\u64AD\u653E")),this._disc&&(this._disc.setAttribute("aria-label",this._open?"\u6536\u8D77\u64AD\u653E\u5668":"\u5C55\u5F00\u64AD\u653E\u5668"),this._disc.setAttribute("aria-expanded",this._open?"true":"false")),this._collapse&&(this._collapse.innerHTML=Di),this._setArt(i.entity_picture),pt(this._art,o);let h=Number(i.media_duration||0),d=Number(i.media_position||0);this._syncFabEq(o,i,d);let c=h>0?Math.min(100,Math.max(0,d/h*100)):0;this._progress.style.width=`${c}%`}_syncFabEq(t,e={},i=0){this._eq&&Li(this._eq,this._mini,{playing:t,visible:!this._open,position:i,title:e.media_title,artist:e.media_artist,album:e.media_album_name,accent:E[this._theme]?.accent})}_setArt(t){if(this._art)if(t)try{let e=new URL(t,window.location.href).href;this._art.getAttribute("src")!==e&&(this._art.src=e),this._fallback.style.display="none",this._mini?.style.setProperty("--fab-cover",`url(${JSON.stringify(e)})`)}catch{this._art.removeAttribute("src"),this._fallback.style.display="grid",this._mini?.style.removeProperty("--fab-cover")}else this._art.removeAttribute("src"),this._fallback.style.display="grid",this._mini?.style.removeProperty("--fab-cover")}_setDisabled(t){for(let e of[this._prev,this._toggle,this._next,this._quick])e&&(e.disabled=t)}_toggleOpen(){this._mode!=="fab"||!this._mini||(this._open=!this._open,this._mini.dataset.open=this._open?"true":"false",this._sync(),this._disc&&(this._disc.setAttribute("aria-label",this._open?"\u6536\u8D77\u64AD\u653E\u5668":"\u5C55\u5F00\u64AD\u653E\u5668"),this._disc.setAttribute("aria-expanded",this._open?"true":"false")),window.setTimeout(()=>this._applySavedPosition(),340))}_toggleFold(){if(this._mode==="fab"){this._toggleOpen();return}this._folded=!this._folded,this._sync(),window.setTimeout(()=>this._applySavedPosition(),340)}_handleClick(t){let e=t.target.closest?.("button[data-act]");if(e){if(e.disabled)return;t.preventDefault(),t.stopPropagation();let i=e.dataset.act;i==="collapse"?this._toggleOpen():i==="toggle"?this._call("media_play_pause"):i==="prev"?this._call("media_previous_track"):i==="next"&&this._call("media_next_track");return}if(this._suppressClick){this._suppressClick=!1;return}if(t.preventDefault(),this._clickTimer){window.clearTimeout(this._clickTimer),this._clickTimer=null,this._toggleFold();return}this._clickTimer=window.setTimeout(()=>{this._clickTimer=null,this._call("media_play_pause")},280)}_call(t){if(!this._hass||!this._entity)return;let e=this._hass.callService("media_player",t,{entity_id:this._entity});e?.catch&&e.catch(i=>console.warn("ha-music mini player:",i))}};customElements.get("ha-music-mini")||customElements.define("ha-music-mini",Ce);var Ds=/^\[(ar|ti|al|by|offset|re|ve):.*\]$/i,ee=/\[(\d{1,3}):(\d{1,2})(?:[.:](\d{1,3}))?\]/g;function Us(a){if(!a)return 0;let t=Number(a);return Number.isFinite(t)?a.length===1?t/10:a.length===2?t/100:t/1e3:0}function Xi(a){if(!a)return{lines:[],plain:[],instrumental:!1};let t=String(a).replace(/\r\n?/g,`
`),e=[],i=[],s=!1;for(let n of t.split(`
`)){let o=n.trim();if(!o||Ds.test(o))continue;if(/^\[instrumental\]$/i.test(o)){s=!0;continue}let l=[];ee.lastIndex=0;let h=ee.exec(o);for(;h;){let c=Number(h[1]),u=Number(h[2]),f=Us(h[3]),m=c*60+u+f;Number.isFinite(m)&&l.push(m),h=ee.exec(o)}let d=o.replace(ee,"").trim();if(d)if(l.length)for(let c of l)e.push({time:c,text:d});else i.push(d)}return e.sort((n,o)=>n.time-o.time),{lines:e.filter((n,o)=>!o||n.time!==e[o-1].time||n.text!==e[o-1].text),plain:i,instrumental:s}}function qt(a,t){if(!Array.isArray(a)||!a.length)return-1;let e=Math.max(0,Number(t)||0)+.001,i=0,s=a.length-1,r=-1;for(;i<=s;){let n=i+s>>1;a[n].time<=e?(r=n,i=n+1):s=n-1}return r}function Qi(a,t,e){let i=qt(a,t);if(i<0)return{index:-1,progress:0};let s=Number(a[i].time)||0,r=a[i+1]?.time,n=Number.isFinite(r)?r:Number(e)>s?Number(e):s+4,o=Math.max(.05,n-s);return{index:i,progress:Math.max(0,Math.min(1,(Math.max(0,Number(t)||0)-s)/o))}}var Le="haMusicLyricDock",Ji="haMusicLyricDockPos",Is=360;function j(a,t,e){return e<t?t:Math.min(e,Math.max(t,a))}function Zi(){try{let a=window.localStorage.getItem(Ji);if(!a)return{};let t=JSON.parse(a);return t&&typeof t=="object"&&!Array.isArray(t)?t:{}}catch{return{}}}function Fs(a,t){try{let e=Zi();e.lyric={x:Number(j(a,0,1).toFixed(4)),y:Number(j(t,0,1).toFixed(4))},window.localStorage.setItem(Ji,JSON.stringify(e))}catch{}}function ts(){try{let a=window.localStorage.getItem(Le);if(!a)return null;let t=JSON.parse(a);return!t||typeof t!="object"||Array.isArray(t)?null:{enabled:t.enabled===!0,entity:typeof t.entity=="string"?t.entity:"",updated:Number(t.updated)||0}}catch{return null}}function Oe(a={}){try{let t=JSON.stringify({enabled:a.enabled===!0,entity:typeof a.entity=="string"?a.entity:"",updated:Number(a.updated)||Date.now()});if(window.localStorage.getItem(Le)===t)return;window.localStorage.setItem(Le,t)}catch{}}function qe(){typeof document>"u"||(window.__haMusicLyricDock?.remove(),window.__haMusicLyricDock=null)}function De(a={}){if(typeof window>"u"||typeof document>"u")return null;if(a.enabled===!1)return qe(),null;if(!document.body)return document.addEventListener("DOMContentLoaded",()=>De(a),{once:!0}),null;let t=window.__haMusicLyricDock;return(!t||!t.isConnected)&&(t=document.createElement("ha-music-lyric"),document.body.appendChild(t),window.__haMusicLyricDock=t),t.update(a),t}var Bs=`
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
  @media (max-width: 520px) {
    .lyric {
      max-width: calc(100vw - 24px);
      font-size: 13px;
    }
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
`,Ne=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this._theme=H,this._entity="",this._hass=null,this._lines=[],this._linesKey="",this._offset=0,this._clock=null,this._poll=null,this._press=null,this._pressTimer=null,this._drag=null,this._dragging=!1,this._onPointerDown=t=>this._handlePointerDown(t),this._onPointerMove=t=>this._handlePointerMove(t),this._onPointerUp=()=>this._handlePointerUp(),this._onPointerCancel=()=>this._handlePointerCancel(),this._onContextMenu=t=>{(this._press||this._dragging)&&t.preventDefault()},this._onResize=()=>this._applyPosition(),this.shadowRoot.innerHTML=`
      <style>${Bs}</style>
      <div class="lyric" data-empty="true" role="region" aria-label="\u5F53\u524D\u6B4C\u8BCD">
        <span class="text"></span>
      </div>
    `,this._pill=this.shadowRoot.querySelector(".lyric"),this._text=this.shadowRoot.querySelector(".text"),this.shadowRoot.addEventListener("pointerdown",this._onPointerDown),this.shadowRoot.addEventListener("pointermove",this._onPointerMove),this.shadowRoot.addEventListener("pointerup",this._onPointerUp),this.shadowRoot.addEventListener("pointercancel",this._onPointerCancel),this.shadowRoot.addEventListener("contextmenu",this._onContextMenu),this.shadowRoot.addEventListener("dragstart",t=>t.preventDefault())}update(t={}){if(t.enabled===!1){this.remove();return}Array.isArray(t.lines)&&(this._lines=t.lines),t.trackKey!==void 0&&(this._linesKey=String(t.trackKey||"")),t.offset!==void 0&&(this._offset=Number(t.offset)||0),t.entity&&(this._entity=t.entity),t.hass?.states&&(this._hass=t.hass);let e=bt(t.theme);e!==this._theme&&(this._theme=e,this._applyTheme()),this._applyTheme(),this._sync(),this._dragging||this._applyPosition()}connectedCallback(){window.addEventListener("resize",this._onResize),this._startPolling(),this._applyTheme(),this._sync(),window.requestAnimationFrame(()=>this._applyPosition())}disconnectedCallback(){window.removeEventListener("resize",this._onResize),this._poll&&clearInterval(this._poll),this._poll=null}_startPolling(){this._poll||(this._poll=window.setInterval(()=>this._sync(),500))}_applyTheme(){let t=bt(this._theme),e=E[t]||E[H];this._theme=t,this.style.setProperty("--hm-accent",e.accent[0]),this.style.setProperty("--hm-accent-2",e.accent[1]),this.style.setProperty("--hm-accent-rgb",L(e.accent[0],"46,230,197")),this.style.setProperty("--hm-accent-2-rgb",L(e.accent[1],"123,92,255")),this.style.setProperty("--hm-base-rgb",L(e.base,"5,10,18")),this.style.setProperty("--hm-glow",String(e.glow??1)),this._pill.dataset.theme=t}_trackKey(t){let e=t?.attributes||{};return[this._entity,e.media_title||"",e.media_artist||"",e.media_album_name||"",e.media_duration||0,e.media_content_id||""].map(i=>String(i)).join("|")}_sync(){if(!this._pill)return;let t=ft()||this._hass;if(t?.states&&(this._hass=t),!this._entity){this._setText("");return}let e=this._hass?.states?.[this._entity];if(!e){this._setText("");return}let i=e.attributes||{},s=this._trackKey(e),r=i.media_position_updated_at||"",n=Number(i.media_position)||0,o=Date.now();(!this._clock||this._clock.key!==s||this._clock.state!==e.state||this._clock.stamp!==r)&&(this._clock={key:s,state:e.state,stamp:r,base:n,at:o});let l=this._clock.base;e.state==="playing"&&(l+=Math.max(0,o-this._clock.at)/1e3);let h=Number(i.media_duration)||0;h>0&&(l=Math.min(h,Math.max(0,l))),l+=this._offset;let d="";if(this._linesKey&&s!==this._linesKey)d="";else if(this._lines.length){let c=qt(this._lines,l);d=this._lines[Math.max(0,c)]?.text||""}this._setText(d)}_setText(t){let e=String(t||"").trim();if(!this._pill)return;let i=!e;this._pill.dataset.empty=i?"true":"false",this._text.textContent!==e&&(this._text.textContent=e,!i&&!this._dragging&&window.requestAnimationFrame(()=>this._applyPosition()))}_applyPosition(){if(!this._pill?.isConnected||this._dragging)return;let t=this._pill.getBoundingClientRect(),e=t.width||240,i=t.height||42,s=Zi(),r=s.lyric&&Number.isFinite(s.lyric.x)&&Number.isFinite(s.lyric.y)?s.lyric:Number.isFinite(s.x)&&Number.isFinite(s.y)?s:null,n=window.innerWidth||1,o=window.innerHeight||1,l=Lt(),h,d;if(l){let f=Te(l);h=f?f.left-e-8:l.left+(l.width-e)/2,d=l.top+(l.height-i)/2}else h=n-e-16,d=16;let c,u;r&&Number.isFinite(r.x)&&Number.isFinite(r.y)?(c=j(r.x*n,8,Math.max(8,n-e-8)),u=j(r.y*o,8,Math.max(8,o-i-8))):l?(c=j(h,l.left+8,Math.max(l.left+8,l.right-e-8)),u=j(d,l.top+2,Math.max(l.top+2,l.bottom-i-2))):(c=j(h,8,Math.max(8,n-e-8)),u=16),this._pill.style.left=`${Math.round(c)}px`,this._pill.style.top=`${Math.round(u)}px`}_savePosition(){if(!this._pill)return;let t=this._pill.getBoundingClientRect();Fs(t.left/Math.max(1,window.innerWidth),t.top/Math.max(1,window.innerHeight))}_handlePointerDown(t){!this._pill||t.button!==0||t.isPrimary===!1||(this._clearPress(),this._press={pointerId:t.pointerId,x:t.clientX,y:t.clientY,long:!1,moved:!1},this._dragging=!1,this._pressTimer=window.setTimeout(()=>{this._pressTimer=null,this._press&&this._beginDrag()},Is))}_beginDrag(){if(!this._press||!this._pill)return;this._press.long=!0,this._dragging=!0;let t=this._pill.getBoundingClientRect();this._drag={left:t.left,top:t.top,width:t.width,height:t.height,x:this._press.x,y:this._press.y},this._pill.dataset.dragging="true",this._pill.style.left=`${t.left}px`,this._pill.style.top=`${t.top}px`;try{this._pill.setPointerCapture(this._press.pointerId)}catch{}}_handlePointerMove(t){if(!this._press)return;let e=t.clientX-this._press.x,i=t.clientY-this._press.y;if(!this._dragging){Math.hypot(e,i)>8&&(this._press.moved=!0,this._clearPress());return}t.preventDefault();let s=window.innerWidth||1,r=window.innerHeight||1,n=j(this._drag.left+e,8,Math.max(8,s-this._drag.width-8)),o=j(this._drag.top+i,8,Math.max(8,r-this._drag.height-8));this._pill.style.left=`${Math.round(n)}px`,this._pill.style.top=`${Math.round(o)}px`}_handlePointerUp(){this._press&&(this._pressTimer&&(clearTimeout(this._pressTimer),this._pressTimer=null),this._dragging&&(this._savePosition(),this._releasePointer()),this._dragging=!1,this._press=null,this._pill&&delete this._pill.dataset.dragging)}_handlePointerCancel(){this._releasePointer(),this._clearPress(),this._dragging=!1,this._pill&&delete this._pill.dataset.dragging}_clearPress(){this._pressTimer&&(clearTimeout(this._pressTimer),this._pressTimer=null),this._press=null}_releasePointer(){let t=this._press?.pointerId;if(!(t===void 0||!this._pill))try{this._pill.releasePointerCapture(t)}catch{}}};typeof customElements<"u"&&!customElements.get("ha-music-lyric")&&customElements.define("ha-music-lyric",Ne);var Hs="/api/netease_lyrics/lyrics",Ue=["off","all","one"],js=260;function Ks(a,t,e){let i=new CustomEvent(t,{bubbles:!0,composed:!0,cancelable:!1,detail:e});return a.dispatchEvent(i),i}function Ie(a,t,e,i,s){let r=[];for(let n=0;n<=a;n+=4){let o=t/2+Math.sin(n/e*Math.PI*2+s)*i+Math.sin(n/(e/2)*Math.PI*2+s*1.7)*(i*.32);r.push(`${n.toFixed(1)},${o.toFixed(2)}`)}return`M${r.join(" L")}`}function Vs(a){switch(a){case"playing":return"playing";case"buffering":return"buffering";case"paused":return"paused";case"idle":return"idle";case"off":return"off";default:return"idle"}}var Fe=class extends N{static get styles(){return yi}static get properties(){return{_config:{state:!0},_width:{state:!1},preview:{type:Boolean,attribute:!1},editMode:{type:Boolean,attribute:!1}}}constructor(){super(),this._config={},this._hass=void 0,this._activeEntity="",this._sig="",this._width=0,this._height=0,this._panel=!1,this._fitPanelRaf=null,this._panelHeight=0,this._tickTimer=null,this._toast="",this._toastTimer=null,this._menu=null,this._seekPreview=null,this._seekPending=null,this._volumePreview=null,this._showRemaining=!1,this._drawer=this._emptyDrawer(),this._artUrl="",this._artSlot=0,this._dockOwner=!1,this._lyricDockOwner=!1,this._palette=null,this._paletteKey="",this._resizeObserver=null,this._thumbPreview=!1,this.preview=!1,this.editMode=!1,this._lyricsOpen=!1,this._lyricsKey="",this._lyrics={status:"idle",lines:[],plain:[],instrumental:!1,source:""},this._lyricsActive=-1,this._lyricsScrolled=-2,this._lyricsAbort=null,this._lyricsOffset=this._loadLyricsOffset(),this._lyricsCache=this._loadLyricsCache(),this._coverPress=null,this._coverGesture="",this._coverGestureTimer=null,this._coverSuppressClick=!1,this._coverSuppressTimer=null,this._spectrumRaf=null,this._spectrumBars=[],this._spectrumLevels=[],this._spectrumLast=0,this._spectrumKey="",this._spectrumAudioUrl="",this._audioEl=null,this._audioCtx=null,this._audioAnalyser=null,this._audioSource=null,this._audioMute=null,this._audioBins=null,this._audioFailedUrl="",this._audioZeroFrames=0,this._audioPeak=0,this._audioStartedAt=0,this._audioGestureArmed=!1,this._positionClock=null}set hass(t){let e=this._hass;if(this._hass=t,!t)return;let i=this._eid(),s=t.states?.[i],r=s?.attributes||{},n=this._trackKey(s),o=this._positionClock,l=!!(o&&o.trackKey!==n),h=l?0:Number(r.media_position)||0,d=r.media_position_updated_at||"";(!o||l||o.entityId!==i||o.state!==s?.state||o.base!==h||o.stamp!==d)&&(this._positionClock={entityId:i,state:s?.state,trackKey:n,base:h,stamp:d,at:Date.now()}),this._settleSeekPending(s,r,l)&&this.requestUpdate();let c=this._computeSig(t);(c!==this._sig||e===void 0)&&(this._sig=c,this.requestUpdate()),this._syncTimer()}get hass(){return this._hass}setConfig(t){if(!t)throw new Error("ha-music: \u914D\u7F6E\u4E0D\u80FD\u4E3A\u7A7A");let e=Array.isArray(t.entities)&&t.entities.length?t.entities.filter(Boolean):t.entity?[t.entity]:[];if(!e.length)throw new Error("ha-music: \u9700\u8981\u914D\u7F6E entity\uFF08media_player.*\uFF09\u6216 entities \u5217\u8868");this._config={...t};let i=typeof t.spectrum_audio_url=="string"?t.spectrum_audio_url.trim():"";i!==this._spectrumAudioUrl&&(this._spectrumAudioUrl=i,this._audioFailedUrl="",this._teardownAudioSpectrum()),e.includes(this._activeEntity)||(this._activeEntity=e[0],this._palette=null,this._paletteKey="",this._artUrl="",this._resetLyrics()),this._config.show_lyrics===!1&&(this._lyricsOpen=!1),this._sig="",this._hass&&(this._sig=this._computeSig(this._hass)),this._syncTimer(),this.requestUpdate()}connectedCallback(){super.connectedCallback(),this._thumbPreview=this._isThumbnailPreview(),this._onKeyDown=t=>{t.key==="Escape"&&(this._drawer.open?this._closeDrawer():this._menu&&(this._menu=null,this.requestUpdate()))},window.addEventListener("keydown",this._onKeyDown),this._onViewportResize=()=>this._queuePanelFit(),window.addEventListener("resize",this._onViewportResize),window.visualViewport?.addEventListener("resize",this._onViewportResize),typeof ResizeObserver<"u"&&(this._resizeObserver=new ResizeObserver(t=>{let e=t[0]?.contentRect?.width||0,i=t[0]?.contentRect?.height||0,s=Math.abs(e-this._width)>=1,r=Math.abs(i-this._height)>=1;this._width=e,this._height=i;let n=this._config?.layout||"adaptive";s||r&&n==="adaptive"?n==="adaptive"?this.requestUpdate():this._queuePanelFit():r&&this._queuePanelFit()}),this._resizeObserver.observe(this))}disconnectedCallback(){super.disconnectedCallback(),this._onKeyDown&&(window.removeEventListener("keydown",this._onKeyDown),this._onKeyDown=null),this._onViewportResize&&(window.removeEventListener("resize",this._onViewportResize),window.visualViewport?.removeEventListener("resize",this._onViewportResize),this._onViewportResize=null),this._stopTimer(),this._coverGestureTimer&&clearTimeout(this._coverGestureTimer),this._coverSuppressTimer&&clearTimeout(this._coverSuppressTimer),this._stopSpectrum(),this._teardownAudioSpectrum(),this._coverGestureTimer=null,this._coverSuppressTimer=null,this._coverPress=null,this._resizeObserver?.disconnect(),this._resizeObserver=null,this._fitPanelRaf&&cancelAnimationFrame(this._fitPanelRaf),this._fitPanelRaf=null,this._toastTimer&&clearTimeout(this._toastTimer),this._lyricsAbort&&(this._lyricsAbort.abort(),this._lyricsAbort=null)}_entities(){let t=this._config||{};return(Array.isArray(t.entities)&&t.entities.length?t.entities:t.entity?[t.entity]:[]).filter(Boolean)}_eid(){let t=this._entities();return this._activeEntity||t[0]||""}_state(t=this._eid()){return this._hass?.states?.[t]}_trackKey(t){let e=t?.attributes||{};return[this._eid(),e.media_title||"",e.media_artist||"",e.media_album_name||"",e.media_duration||0,e.media_content_id||""].map(i=>String(i)).join("|")}_readMedia(){let t=this._state(),e=$i(t);if(t?.state==="playing"){let i=this._positionClock;if(i&&i.entityId===this._eid()){let s=Math.max(0,(Date.now()-i.at)/1e3),r=i.base+s;e.position=e.duration?v(r,0,e.duration):Math.max(0,r)}}return e}_computeSig(t){let e=this._eid(),i=t.states?.[e],s=i?.attributes||{},r=["media_title","media_artist","media_album_name","media_series_title","entity_picture","media_duration","media_position","media_position_updated_at","media_metadata","media_content_id","volume_level","is_volume_muted","shuffle","repeat","source","source_list","sound_mode","sound_mode_list","supported_features","group_members","app_name","queue","media_track"],n={};for(let d of r)d in s&&(n[d]=s[d]);let o=this._config?.volume_entity,l=o?t.states?.[o]?.state:null,h=this._entities().map(d=>{let c=t.states?.[d];return[d,c?.state,c?.attributes?.entity_picture]});return JSON.stringify([e,i?.state,n,l,h,t.language,this._config,this._menu,this._drawer.open,this._drawer.mode,this._drawer.cursor,this._drawer.items.length,this._drawer.loading,this._drawer.error,this._showRemaining,this._layoutKey()])}_syncTimer(){let t=this._state()?.state,e=t==="playing"||t==="buffering";e&&!this._tickTimer?this._tickTimer=setInterval(()=>this.requestUpdate(),500):e||this._stopTimer()}_stopTimer(){this._tickTimer&&(clearInterval(this._tickTimer),this._tickTimer=null)}_lyricsEnabled(){return this._config?.show_lyrics!==!1}_resetLyrics(){this._lyricsAbort&&(this._lyricsAbort.abort(),this._lyricsAbort=null),this._lyricsKey="",this._lyricsOpen=!1,this._lyricsActive=-1,this._lyricsScrolled=-2,this._lyrics={status:"idle",lines:[],plain:[],instrumental:!1,source:""}}_loadLyricsOffset(){try{let t=localStorage.getItem("ha-music-lyrics-offset"),e=Number(t);return Number.isFinite(e)?v(e,-5,5):0}catch{return 0}}_saveLyricsOffset(){try{localStorage.setItem("ha-music-lyrics-offset",String(Number(this._lyricsOffset.toFixed(1))))}catch{}}_bumpLyricsOffset(t){this._lyricsOffset=v(Math.round((this._lyricsOffset+t)*10)/10,-5,5),this._saveLyricsOffset(),this._lyricsScrolled=-2,this.requestUpdate()}_loadLyricsCache(){let t=new Map;try{localStorage.removeItem("ha-music-lyrics-cache-v3");let e=JSON.parse(localStorage.getItem("ha-music-lyrics-cache-v4")||"[]");if(!Array.isArray(e))return t;for(let i of e){if(!Array.isArray(i)||i.length!==2)continue;let[s,r]=i;typeof s!="string"||!r||r.status!=="ready"||t.set(s,{status:"ready",lines:Array.isArray(r.lines)?r.lines:[],plain:Array.isArray(r.plain)?r.plain:[],instrumental:!!r.instrumental,source:String(r.source||"\u6B4C\u8BCD\u63A5\u53E3")})}}catch{return t}return t}_saveLyricsCache(){try{let t=[...this._lyricsCache.entries()].slice(-24);localStorage.setItem("ha-music-lyrics-cache-v4",JSON.stringify(t))}catch{}}_lyricsPosition(t){return Math.max(0,(Number(t)||0)+this._lyricsOffset)}_cleanLyricsQuery(t){return String(t||"").replace(/\(.*?\)|\[.*?\]|（.*?）/g,"").replace(/[\s\-_～〜]+/g," ").trim()}_lyricsSource(){let t=this._config?.lyrics_source;return t==="qq"||t==="wy"?t:"auto"}_lyricsQueries(t){let e=Array.isArray(t.title)?t.title[0]||"":t.title||"",i=Array.isArray(t.artist)?t.artist[0]||"":t.artist||"",s=this._cleanLyricsQuery(e),r=this._cleanLyricsQuery(i),n=[{title:s||e,artist:r},{title:s||e,artist:""},{title:e,artist:i}],o=new Set;return n.filter(l=>{if(!l.title)return!1;let h=`${l.title}|${l.artist}`.toLowerCase();return o.has(h)?!1:(o.add(h),!0)})}async _refreshLyricsToken(){let t=this._hass?.auth;if(typeof t?.refreshAccessToken=="function")try{await t.refreshAccessToken()}catch{}}async _requestNeteaseLyrics(t,e){let i=null;for(let s=0;s<3;s+=1)try{let r=this._hass?.auth?.data?.access_token;if(!r)throw new Error("\u6B4C\u8BCD\u63A5\u53E3\u672A\u8BA4\u8BC1");let n=new URL(Hs,window.location.origin);n.searchParams.set("title",t.title),n.searchParams.set("artist",t.artist||"");let o=this._lyricsSource();o!=="auto"&&n.searchParams.set("source",o);let l=await fetch(n.toString(),{signal:e,headers:{Accept:"application/json",Authorization:`Bearer ${r}`,"Content-Type":"application/json"},credentials:"same-origin"});if(l.status===401&&s<2){await this._refreshLyricsToken(),await new Promise(f=>setTimeout(f,500));continue}if(!l.ok){if(i=new Error(`lyrics HTTP ${l.status}`),s<2){await new Promise(f=>setTimeout(f,500));continue}break}let h=await l.json(),d=h?.lyrics;if(!d||typeof d!="string")return null;let c=Xi(d);if(!c.lines.length&&!c.plain.length&&!c.instrumental)return null;let u=h?.source==="qq"?"QQ\u97F3\u4E50":h?.source==="netease"?"\u7F51\u6613\u4E91":"\u6B4C\u8BCD\u63A5\u53E3";return{parsed:c,source:u}}catch(r){if(r?.name==="AbortError")throw r;i=r,s<2&&await new Promise(n=>setTimeout(n,500))}throw i||new Error("\u6B4C\u8BCD\u63A5\u53E3\u8BF7\u6C42\u5931\u8D25")}_lyricsKeyFor(t){return[this._cleanLyricsQuery(Array.isArray(t.title)?t.title[0]:t.title),this._cleanLyricsQuery(Array.isArray(t.artist)?t.artist[0]:t.artist),this._lyricsSource()].join("|").toLowerCase()}_setLyrics(t,e,i){t===this._lyricsKey&&(this._lyrics={status:"ready",lines:e.lines||[],plain:e.plain||[],instrumental:!!e.instrumental,source:i},this._lyricsCache.size>32&&this._lyricsCache.delete(this._lyricsCache.keys().next().value),this._lyricsCache.set(t,this._lyrics),this._saveLyricsCache(),this.requestUpdate())}_maybeLoadLyrics(){if(!this._lyricsEnabled()||this._thumbMode())return;let t=this._readMedia();if(!t.title){this._lyrics.status!=="idle"&&(this._lyrics={status:"idle",lines:[],plain:[],instrumental:!1,source:""},this._lyricsKey="",this.requestUpdate());return}let e=this._lyricsKeyFor(t);if(e===this._lyricsKey)return;this._lyricsAbort&&(this._lyricsAbort.abort(),this._lyricsAbort=null),this._lyricsKey=e;let i=this._lyricsCache.get(e);if(i){this._lyrics={...i},this.requestUpdate();return}this._lyrics={status:"loading",lines:[],plain:[],instrumental:!1,source:"\u6B4C\u8BCD\u63A5\u53E3"},this.requestUpdate(),this._fetchLyrics(t,e)}async _fetchLyrics(t,e){let i=new AbortController;this._lyricsAbort=i;let s=setTimeout(()=>i.abort(),12e3),r=null;try{for(let n of this._lyricsQueries(t)){if(i.signal.aborted||e!==this._lyricsKey)return;try{let o=await this._requestNeteaseLyrics(n,i.signal);if(i.signal.aborted||e!==this._lyricsKey)return;if(o){this._setLyrics(e,o.parsed,o.source);return}}catch(o){if(o?.name==="AbortError")throw o;r=o}}if(e!==this._lyricsKey)return;this._lyrics={status:r?"error":"none",lines:[],plain:[],instrumental:!1,source:"\u6B4C\u8BCD\u63A5\u53E3"},this.requestUpdate()}catch(n){if(e!==this._lyricsKey)return;if(n?.name==="AbortError"){this._lyrics={status:"error",lines:[],plain:[],instrumental:!1,source:"\u6B4C\u8BCD\u63A5\u53E3"},this.requestUpdate();return}this._lyrics={status:"error",lines:[],plain:[],instrumental:!1,source:"\u6B4C\u8BCD\u63A5\u53E3"},this.requestUpdate()}finally{clearTimeout(s),this._lyricsAbort===i&&(this._lyricsAbort=null)}}_sideLyricsVisible(){return!this._lyricsEnabled()||this._thumbMode()||this._lyricsOpen||this._layoutKey()!=="full"?!1:(this._width||0)>=640&&(this._height||0)>=480}_toggleLyrics(){this._lyricsOpen=!this._lyricsOpen,this._lyricsScrolled=-2,this._lyricsOpen&&(this._lyricsActive=-1,this._maybeLoadLyrics()),this.requestUpdate()}_retryLyrics(){this._lyricsKey="",this._lyricsAbort?.abort(),this._lyricsAbort=null,this._lyricsOpen=!0,this._maybeLoadLyrics(),this.requestUpdate()}_layoutKey(){if(this._thumbMode()||this._panel)return"full";let t=this._config?.layout||"adaptive";if(t==="adaptive"){let e=this._width,i=this._height;return e?e<340||i&&i<190?"mini":e<460||i&&i<280?"compact":"full":"full"}return["full","compact","mini"].includes(t)?t:"full"}_coverPx(t){let e=this._height||0;if(this._thumbMode()){let i=this._thumbTier();if(i==="lg")return Math.round(Math.min(260,Math.max(160,e*.34)));if(i==="md"){let s=this._width||0;return Math.round(Math.min(180,s?s*.45:180,Math.max(96,e*.32)))}return Math.round(Math.min(120,Math.max(64,e*.3)))}return t==="mini"?44:Math.round(t==="compact"?Math.min(88,Math.max(52,e*.26)):Math.min(178,Math.max(76,e*.22)))}_tight(){return this._thumbMode()?!1:this._layoutKey()==="compact"&&(this._height||0)<270}_styleVars(){return{...this._themeVars(),"--hm-cover-size":`${this._coverPx(this._layoutKey())}px`}}_themeKey(){let t=this._config?.theme;return t&&E[t]?t:H}_themeVars(){let t=E[this._themeKey()],e=this._paletteKey||this._eid()||"ha-music",i=Mi(e),s=this._palette,r=this._config?.accent,n=this._config?.palette!==!1,o=t.accent[0],l=t.accent[1],h=L(o),d=L(l),c=h,u=$e(t.accent[1]),f=$e(i.a2);if(n){if(s){let m=Me(u,{h:s.h2,s:s.s2,l:s.l2},.5);l=m.css,d=m.rgb,c=s.rgb1}else if(f){let m=Me(u,f,.35);l=m.css,d=m.rgb}}return r&&(o=r,h=L(r,h),n||(c=h)),{"--hm-base":t.base,"--hm-a1":o,"--hm-a2":l,"--hm-a1-rgb":h,"--hm-a2-rgb":d,"--hm-glow-rgb":c}}_volumeInfo(t){let e=this._config?.volume_entity,i=e?this._hass?.states?.[e]:void 0;if(i){let n=i.entity_id;if(n.startsWith("media_player."))return{domain:"media_player",entityId:n,level:Number(i.attributes?.volume_level??0),muted:!!i.attributes?.is_volume_muted,supported:!0,external:!0};if(n.startsWith("number.")){let o=Number(i.state);if(Number.isFinite(o))return{domain:"number",entityId:n,level:v(o/(i.attributes?.max||100),0,1),muted:!1,supported:!0,external:!0}}if(n.startsWith("input_number.")){let o=Number(i.state);if(Number.isFinite(o))return{domain:"input_number",entityId:n,level:v(o/(i.attributes?.max||100),0,1),muted:!1,supported:!0,external:!0}}}let s=this._state(),r=Number.isFinite(t.volume)||A(s,M.VOLUME_SET)||A(s,M.VOLUME_MUTE);return{domain:"media_player",entityId:this._eid(),level:Number.isFinite(t.volume)?t.volume:0,muted:t.muted,supported:r,external:!1}}_repeatValue(){let t=this._state()?.attributes?.repeat;return["off","all","one"].includes(t)?t:"off"}_call(t,e,i="media_player",s){let r=this._hass;if(!r?.callService)return Promise.resolve();let n=s??this._eid();try{let o=r.callService(i,t,{entity_id:n,...e});return Promise.resolve(o)}catch(o){return this._notify(o?.message||String(o)),Promise.reject(o)}}_guard(t){Promise.resolve(t).catch(e=>{let i=e?.message||String(e);this._notify(i.length>60?i.slice(0,60):i)})}_notify(t){this._toast=t||"",this.requestUpdate(),this._toastTimer&&clearTimeout(this._toastTimer),t&&(this._toastTimer=setTimeout(()=>{this._toast="",this.requestUpdate()},3600))}_togglePlay(){let t=this._state()?.state,e=t==="playing"||t==="buffering";e?this._pauseAudioSpectrum():this._primeAudioSpectrum(),this._guard(this._call(e?"media_pause":"media_play"))}_skip(t){this._primeAudioSpectrum(),this._guard(this._call(t==="next"?"media_next_track":"media_previous_track"))}_coverCue(t){this._coverGesture=t,this._coverGestureTimer&&clearTimeout(this._coverGestureTimer),this._coverGestureTimer=setTimeout(()=>{this._coverGesture===t&&(this._coverGesture="",this.requestUpdate())},420),this.requestUpdate()}_coverSwipe(t){this._coverCue(t),this._skip(t)}_onCoverPointerDown(t){this._thumbMode()||t.pointerType==="mouse"&&t.button!==0||(this._coverSuppressClick=!1,this._coverSuppressTimer&&clearTimeout(this._coverSuppressTimer),this._coverPress={id:t.pointerId,x:t.clientX,y:t.clientY,at:Date.now(),moved:!1,captured:!1})}_onCoverPointerMove(t){let e=this._coverPress;if(!e||e.id!==t.pointerId)return;let i=t.clientX-e.x,s=t.clientY-e.y;if(Math.abs(i)>10&&Math.abs(i)>Math.abs(s)*1.2){if(e.moved=!0,!e.captured){e.captured=!0;try{t.currentTarget.setPointerCapture(t.pointerId)}catch{}}t.cancelable&&t.preventDefault()}}_onCoverPointerUp(t){let e=this._coverPress;if(!e||e.id!==t.pointerId)return;this._coverPress=null;let i=t.clientX-e.x,s=t.clientY-e.y;if(Math.abs(i)>=48&&Math.abs(i)>Math.abs(s)*1.25){this._coverSuppressClick=!0,this._coverSuppressTimer&&clearTimeout(this._coverSuppressTimer),this._coverSuppressTimer=setTimeout(()=>{this._coverSuppressClick=!1},450),this._coverSwipe(i<0?"next":"prev");return}(e.moved||Math.hypot(i,s)>12)&&(this._coverSuppressClick=!0,this._coverSuppressTimer&&clearTimeout(this._coverSuppressTimer),this._coverSuppressTimer=setTimeout(()=>{this._coverSuppressClick=!1},450))}_onCoverPointerCancel(){this._coverPress=null}_onCoverClick(){if(!this._thumbMode()){if(this._coverSuppressClick){this._coverSuppressClick=!1;return}this._coverCue("tap"),this._togglePlay()}}_power(){let t=this._state()?.state,e=t==="off"||t==="standby";this._guard(this._call(e?"turn_on":"turn_off"))}_shuffle(){let t=!!this._state()?.attributes?.shuffle;this._guard(this._call("shuffle_set",{shuffle:!t}))}_repeat(){let t=this._repeatValue(),e=Ue.indexOf(t),i=Ue[(e+1)%Ue.length];this._guard(this._call("repeat_set",{repeat:i}))}_seekTo(t){if(!Number.isFinite(t))return Promise.resolve(!1);let e=this._call("media_seek",{seek_position:t});return this._guard(e),e}_settleSeekPending(t,e,i){let s=this._seekPending;if(!s)return!1;let r=Number(e?.media_position),n=String(e?.media_position_updated_at||"")!==s.stamp,o=Number.isFinite(r)&&Math.abs(r-s.from)>1,l=Number.isFinite(r)&&Math.abs(r-s.value)<=2,h=Date.now()-s.at>8e3;return!t||i||h||l&&(n||o)?(this._seekPending=null,this._seekPreview=null,!0):!1}_onSeekInput(t){if(!A(this._state(),M.SEEK))return;let e=t.target,i=Number(e.value);this._seekPreview=i;let s=this._readMedia().duration;e.style.setProperty("--pct",`${s?v(i/s*100,0,100):0}%`)}_onSeekCommit(t){if(!A(this._state(),M.SEEK)){this.requestUpdate();return}let e=Number(t.target.value),i=this._state(),s=i?.attributes||{};this._seekPreview=e,this._seekPending={value:e,from:Number(s.media_position)||0,stamp:String(s.media_position_updated_at||""),trackKey:this._trackKey(i),at:Date.now()};let r=this._seekPending;this._seekTo(e).catch(()=>{this._seekPending===r&&(this._seekPending=null,this._seekPreview=null,this.requestUpdate())}),this.requestUpdate()}_onVolumeInput(t){let e=Number(t.target.value)/100;this._volumePreview=e,t.target.style.setProperty("--pct",`${e*100}%`)}_onVolumeCommit(t){let e=v(Number(t.target.value)/100,0,1);this._volumePreview=null;let i=this._volumeInfo(this._readMedia());if(i.domain==="media_player")this._guard(this._call("volume_set",{volume_level:e},"media_player",i.entityId));else{let s=this._hass?.states?.[i.entityId],r=Number(s?.attributes?.max??100),n=Number(s?.attributes?.min??0);this._guard(this._call("set_value",{value:Math.round(n+e*(r-n))},i.domain,i.entityId))}this.requestUpdate()}_toggleMute(){let t=this._readMedia(),e=this._volumeInfo(t);if(e.external){e.domain==="media_player"?this._guard(this._call("volume_mute",{is_volume_muted:!e.muted},"media_player",e.entityId)):this._notify(R(this._hass?.language)("volumeEntityMissing"));return}this._guard(this._call("volume_mute",{is_volume_muted:!t.muted}))}_selectSource(t){this._menu=null,this._guard(this._call("select_source",{source:t})),this.requestUpdate()}_selectSoundMode(t){this._menu=null,this._guard(this._call("select_sound_mode",{sound_mode:t})),this.requestUpdate()}_leaveGroup(){this._guard(this._call("unjoin"))}_playQueueItem(t){if(!t?.contentId){this._notify(R(this._hass?.language)("queueEmpty"));return}this._guard(this._call("play_media",{media_content_id:t.contentId,media_content_type:t.contentType||"music"}))}_playBrowseItem(t){t?.contentId&&this._guard(this._call("play_media",{media_content_id:t.contentId,media_content_type:t.contentType||"music"}))}_switchEntity(t){t!==this._activeEntity&&(this._activeEntity=t,this._palette=null,this._paletteKey="",this._artUrl="",this._menu=null,this._seekPreview=null,this._seekPending=null,this._resetLyrics(),this._syncTimer(),this._sig=this._computeSig(this._hass),this.requestUpdate())}_moreInfo(){Ks(this,"hass-more-info",{entityId:this._eid()})}_maEnabled(){let t=this._config?.music_assistant;if(t===!1)return!1;if(t===!0||typeof t=="string"&&t.trim()||this._hass?.services?.music_assistant?.play_media||this._entities().some(s=>{let r=this._hass?.states?.[s]?.attributes||{};return Object.keys(r).some(n=>n.startsWith("mass_"))}))return!0;let i=this._hass?.panels||{};return Object.keys(i).some(s=>{let r=i[s]||{};return r.component_name==="music_assistant"||/music[-_ ]?assistant/i.test(r.url_path||s)||/music\s*assistant/i.test(r.title||"")})}_isMaPlayer(t=this._eid()){let e=this._state(t)?.attributes||{};return Object.keys(e).some(i=>i.startsWith("mass_"))}_maUrl(){let t=this._config?.music_assistant;if(t===!1)return"";if(typeof t=="string"&&t.trim())return t.trim();let e=this._hass?.panels||{};for(let s of Object.keys(e)){let r=e[s]||{},n=r.url_path||s;if(r.component_name==="music_assistant"||/music[-_ ]?assistant/i.test(n)||/music\s*assistant/i.test(r.title||""))return`/${n}`}return this._entities().some(s=>{let r=this._hass?.states?.[s]?.attributes||{};return Object.keys(r).some(n=>n.startsWith("mass_"))})||t===!0?"/music-assistant":""}_openAssistant(){this._drawer?.open&&this._closeDrawer();let t=this._maUrl();if(!t)return;if(/^(https?:)?\/\//i.test(t)){window.open(t,"_blank","noopener");return}let e=t.startsWith("/")?t:`/${t}`;try{window.history.pushState(null,"",e),window.dispatchEvent(new Event("location-changed",{bubbles:!0,composed:!0}))}catch{window.location.href=e}}_onCardClick(t){if(!this._menu)return;(t.composedPath?.()||[]).some(s=>s?.classList?.contains?.("hm-menu")||s?.classList?.contains?.("hm-chip"))||(this._menu=null,this.requestUpdate())}_emptyDrawer(){return{open:!1,mode:null,nodes:[],cursor:-1,items:[],title:"",loading:!1,error:""}}_openQueue(){let t=R(this._hass?.language),e=ke(this._state(),this._config?.max_queue??40);this._drawer={open:!0,mode:"queue",nodes:[],cursor:-1,items:e,title:t("queue"),loading:!1,error:""},this.requestUpdate()}_openLibrary(){let t=R(this._hass?.language);this._drawer={open:!0,mode:"library",nodes:[],cursor:-1,items:[],title:t("library"),loading:!0,error:"",t},this.requestUpdate(),this._fetchBrowse()}_openPlaylists(){let t=R(this._hass?.language);if(!this._isMaPlayer()){this._notify(t("maPlayerRequired"));return}this._drawer={open:!0,mode:"playlists",nodes:[],cursor:-1,items:[],title:t("playlists"),loading:!0,error:"",maUrl:this._maUrl()},this.requestUpdate(),this._fetchPlaylists()}async _browseMedia(t,e){let i=this._hass?.connection;if(!i?.sendMessagePromise)throw new Error("unsupported");let s={type:"media_player/browse_media",entity_id:this._eid()};return t&&(s.media_content_id=t,e&&(s.media_content_type=e)),i.sendMessagePromise(s)}async _fetchPlaylists(){let t=R(this._hass?.language);try{let i=(await this._browseMedia())?.children||[],s=i.find(o=>o.can_expand&&(/playlist/i.test(o.media_class||"")||/playlist/i.test(o.media_content_type||"")||/播放列表|playlists?/i.test(o.title||""))||!1),r=[];s&&(r=(await this._browseMedia(s.media_content_id,s.media_content_type))?.children||[]),r.length||(r=i.filter(o=>/playlist/i.test(o.media_class||"")));let n=r.map(o=>({title:o.title||"",subtitle:(()=>{let l=we(o.media_class,this._hass?.language);return l&&l!==t("playlists")?l:""})(),contentId:o.media_content_id||"",contentType:o.media_content_type||"playlist",thumb:o.thumbnail||""})).filter(o=>o.contentId);if(this._drawer.mode!=="playlists")return;this._drawer={...this._drawer,loading:!1,items:n,error:""}}catch(e){if(this._drawer.mode!=="playlists")return;this._drawer={...this._drawer,loading:!1,items:[],error:e?.message?`${t("browseFailed")} \xB7 ${String(e.message).slice(0,40)}`:t("browseFailed")}}this.requestUpdate()}async _playPlaylistItem(t){if(!t?.contentId)return;let e=R(this._hass?.language),i=this._eid();if(!this._isMaPlayer(i)){this._notify(e("maPlayerRequired"));return}let s=t.contentType||"playlist",r=()=>{this._notify(`${e("playingPlaylist")} \xB7 ${t.title||""}`),this._closeDrawer()},n=!!this._hass?.services?.music_assistant?.play_media,o=l=>{let h=l?.message||String(l);return/nothing to play here/i.test(h)?e("playlistEmpty"):h.length>60?h.slice(0,60):h};if(n)try{await this._hass.callService("music_assistant","play_media",{entity_id:i,media_id:t.contentId,media_type:"playlist",enqueue:"play"}),r();return}catch(l){let h=l?.message||String(l);if(/nothing to play here/i.test(h)){this._markPlaylistEmpty(t),this._notify(o(l));return}if(!/match|target|not a valid|does not support|unsupported/i.test(h)){this._notify(o(l));return}}try{await this._call("play_media",{media_content_id:t.contentId,media_content_type:s}),r()}catch(l){/nothing to play here/i.test(l?.message||"")&&this._markPlaylistEmpty(t),this._notify(o(l)||e("browseFailed"))}}_markPlaylistEmpty(t){this._drawer.mode==="playlists"&&(this._drawer={...this._drawer,items:this._drawer.items.map(e=>e.contentId===t.contentId?{...e,empty:!0}:e)},this.requestUpdate())}_closeDrawer(){this._drawer={...this._drawer,open:!1},this.requestUpdate(),setTimeout(()=>{this._drawer.open||(this._drawer=this._emptyDrawer(),this.requestUpdate())},js)}async _fetchBrowse(){let t=this._hass,e=t?.connection,i=R(t?.language),s=this._drawer.cursor>=0?this._drawer.nodes[this._drawer.cursor]:null,r={type:"media_player/browse_media",entity_id:this._eid()};if(s&&(r.media_content_id=s.contentId,s.contentType&&(r.media_content_type=s.contentType)),this._drawer={...this._drawer,loading:!0,error:""},this.requestUpdate(),!e?.sendMessagePromise){this._drawer={...this._drawer,loading:!1,error:i("browseFailed")},this.requestUpdate();return}try{let n=await e.sendMessagePromise(r),o=(n?.children||[]).map(l=>({title:l.title||"",subtitle:we(l.media_class,this._hass?.language)||l.media_content_type||"",contentId:l.media_content_id||"",contentType:l.media_content_type||"",thumb:l.thumbnail||"",canPlay:!!l.can_play,canExpand:!!l.can_expand,cls:l.media_class||""}));if(this._drawer.mode!=="library")return;this._drawer={...this._drawer,loading:!1,items:o,title:s?.title||n?.title||i("library"),error:""}}catch(n){if(this._drawer.mode!=="library")return;this._drawer={...this._drawer,loading:!1,items:[],error:n?.message?`${i("browseFailed")} \xB7 ${String(n.message).slice(0,40)}`:i("browseFailed")}}this.requestUpdate()}_enterBrowseItem(t){if(!t.canExpand){t.canPlay&&this._playBrowseItem(t);return}let e=this._drawer.nodes.slice(0,this._drawer.cursor+1);e.push({contentId:t.contentId,contentType:t.contentType,title:t.title}),this._drawer={...this._drawer,nodes:e,cursor:e.length-1,title:t.title,items:[]},this.requestUpdate(),this._fetchBrowse()}_browseBack(){this._drawer.cursor<0||(this._drawer={...this._drawer,cursor:this._drawer.cursor-1,items:[]},this.requestUpdate(),this._fetchBrowse())}updated(){let t=this.renderRoot?.querySelector?.(".hm-card");if(!t)return;let e=this._artUrlFor();e!==this._artUrl&&(this._artUrl=e,this._crossFadeArt(t,e)),this._syncRangeValues(),this._syncPanelFlag(),this._queuePanelFit(),this._installDock(),this._installLyricDock(),pt(this.renderRoot?.querySelector?.(".hm-cover img"),this._state()?.state==="playing"),this._maybeLoadLyrics(),(this._lyricsOpen||this._sideLyricsVisible())&&this._lyricsActive!==this._lyricsScrolled&&(this._lyricsScrolled=this._lyricsActive,typeof requestAnimationFrame<"u"&&requestAnimationFrame(()=>{let i=this.renderRoot?.querySelector?.(".hm-lyrics-scroll"),s=this.renderRoot?.querySelector?.('.hm-lyrics-line[data-active="true"]');if(!i||!s)return;let r=i.getBoundingClientRect(),n=s.getBoundingClientRect(),o=i.scrollTop+n.top-r.top-r.height/2+n.height/2;i.scrollTo({top:Math.max(0,o),behavior:"smooth"})})),this._syncSpectrum()}_queuePanelFit(){if(this._fitPanelRaf&&cancelAnimationFrame(this._fitPanelRaf),typeof requestAnimationFrame>"u"){this._fitPanel();return}this._fitPanelRaf=requestAnimationFrame(()=>{this._fitPanelRaf=null,this._fitPanel()})}_fitPanel(){if(!this._panel){this.style.removeProperty("--hm-panel-cover"),this.style.removeProperty("--hm-panel-height"),this._panelHeight=0;return}let t=this.renderRoot?.querySelector?.(".hm-card");if(!t)return;let e=Math.round(window.visualViewport?.height||window.innerHeight||0);if(e<240)return;let i=t.getBoundingClientRect(),s=Math.max(240,Math.min(e,Math.floor(e-Math.max(0,i.top))));s!==this._panelHeight&&(this._panelHeight=s,this.style.setProperty("--hm-panel-height",`${s}px`));let r=this.renderRoot?.querySelector?.(".hm-main");if(!r)return;let n=Math.round(r.clientHeight||0),o=Math.round(r.clientWidth||0);if(n<80||o<80)return;let l=t.clientWidth<820,h;if(l){let d=Math.min(180,Math.max(96,n*.3));h=Math.max(120,Math.min(o*.88,n-d))}else h=Math.max(120,Math.min(n,o*.34));this.style.setProperty("--hm-panel-cover",`${Math.round(h)}px`)}_isPanelContext(){if(this.closest?.("hui-panel-view"))return!0;let t=this.getRootNode?.();for(;t;){let e=t.host;if(!e)break;if(String(e.tagName||"").toLowerCase()==="hui-panel-view")return!0;t=e.getRootNode?.()}return!1}_syncPanelFlag(){let t=this._isPanelContext();t!==this._panel&&(this._panel=t,this.setAttribute("data-panel",String(t)),this.renderRoot?.querySelector?.(".hm-card")?.setAttribute("data-panel",String(t)))}_isThumbnailPreview(){let t=this.getRootNode?.();for(;t;){let e=t.host;if(!e)break;let i=String(e.tagName||"").toLowerCase();if(i==="hui-card-preview"||i==="hui-suggestion-card"||i==="hui-card"&&e.preview===!0)return!0;t=e.getRootNode?.()}return!!this.closest?.("hui-card-preview, hui-suggestion-card")}_thumbMode(){return this.preview===!0||this.editMode===!0||this._thumbPreview}_thumbTier(){let t=this._width||0,e=this._height||0;return t>=700&&e>=500?"lg":t>=440||e>=520?"md":"sm"}_isPreviewContext(){let t=this.getRootNode?.();for(;t;){let e=t.host;if(!e)break;let i=String(e.tagName||"").toLowerCase();if(i==="hui-card-preview"||i==="hui-card-options"||i==="hui-dialog-edit-card"||i==="ha-dialog")return!0;t=e.getRootNode?.()}return!!this.closest?.("hui-card-preview, hui-card-options")}_installDock(){let t=this._config?.dock,e=_t(this._config?.dock_entities),i=X(this._config?.dock_themes),s=Number(this._config?.dock_edited)||0,r=te(),n=s>0&&s>=(r?.updated||0),o=n?D(t):r?r.modes:D(t),l=n?e:r?r.entities:e,h=n?i:r?r.themes:i,d=this._eid?.()||this._config?.entity||(Array.isArray(this._config?.entities)?this._config.entities[0]:"");if(!o.length){!this._isPreviewContext()&&(n||this._dockOwner)&&(ze({modes:[],entities:l,themes:h,updated:s||Date.now()}),Re(),this._dockOwner=!1);return}if(!this._hass||!this.isConnected||!d||this._isPreviewContext())return;let c={};for(let f of o){let m=l[f]||d;m&&(c[f]=m)}let u=Object.entries(c).map(([f,m])=>({mode:f,entity:m,hass:this._hass,theme:h[f]||this._themeKey()}));Ot(u),ze({modes:Object.keys(c),entities:c,themes:Object.fromEntries(Object.keys(c).map(f=>[f,h[f]||this._themeKey()])),updated:s||r?.updated}),this._dockOwner=!0}_installLyricDock(){let t=this._config?.floating_lyrics!==!1,e=Number(this._config?.floating_lyrics_edited)||0,i=ts(),s=e>0&&e>=(i?.updated||0),r=s?t:i?i.enabled:t,n=this._eid?.()||this._config?.entity||(Array.isArray(this._config?.entities)?this._config.entities[0]:"");if(!r){!this._isPreviewContext()&&(s||this._lyricDockOwner)&&(Oe({enabled:!1,entity:n,updated:e||Date.now()}),qe(),this._lyricDockOwner=!1);return}if(!this._hass||!this.isConnected||!n||this._isPreviewContext())return;let o=this._state(n),l=this._trackKeyFor(n,o),h=this._lyrics.status==="ready"?this._lyrics.lines:[];De({enabled:!0,entity:n,theme:this._themeKey(),hass:this._hass,lines:h,trackKey:l,offset:this._lyricsOffset}),Oe({enabled:!0,entity:n,updated:e||i?.updated||Date.now()}),this._lyricDockOwner=!0}_trackKeyFor(t,e){let i=e?.attributes||{};return[t,i.media_title||"",i.media_artist||"",i.media_album_name||"",i.media_duration||0,i.media_content_id||""].map(s=>String(s)).join("|")}_artUrlFor(){let t=this._readMedia();return Y(this._hass,t.art)}_crossFadeArt(t,e){let i=t.querySelectorAll(".hm-bg-art");if(!i.length)return;let s=i.length>1?(this._artSlot+1)%2:0,r=i[s],n=i[this._artSlot];if(!e){i.forEach(l=>{l.classList.remove("on"),l.style.backgroundImage=""}),this._artSlot=0,this._maybePalette("");return}let o=new Image;o.decoding="async",o.onload=()=>{r.style.backgroundImage=`url("${e}")`,r.classList.add("on"),n?.classList.remove("on"),this._artSlot=s,this._maybePalette(e)},o.onerror=()=>{this._maybePalette("")},o.src=e}_maybePalette(t){let e=this._readMedia(),i=t||`${e.title}|${e.artist}|${this._eid()}`;if(this._paletteKey!==i){if(this._paletteKey=i,!t){this._palette=null,this.requestUpdate();return}Si(t,i).then(s=>{this._paletteKey===i&&(this._palette=s,this.requestUpdate())})}}_syncRangeValues(){let t=this.renderRoot;if(!t)return;let e=t.querySelector?.('input.hm-range[data-role="seek"]'),i=t.querySelector?.('input.hm-range[data-role="volume"]'),s=this._readMedia();if(e&&this._seekPreview===null){let r=s.duration||0,n=v(s.position,0,r||s.position);e.value=String(n),e.max=String(r||0),e.style.setProperty("--pct",`${r?v(n/r*100,0,100):0}%`)}if(i&&this._volumePreview===null){let r=this._volumeInfo(s);i.value=String(Math.round(r.level*100)),i.style.setProperty("--pct",`${r.level*100}%`),i.setAttribute("data-disabled",String(!r.supported))}}getCardSize(){let t=this._layoutKey();return t==="mini"?1:t==="compact"?3:6}getGridOptions(){let t=this.getCardSize();return{columns:this._panel?"full":12,rows:this._panel?Math.max(6,t):t,min_columns:this._panel?12:4,min_rows:this._panel?4:2,max_columns:24,max_rows:24}}getLayoutOptions(){let t=this.getGridOptions();return{grid_columns:t.columns==="full"?12:t.columns,grid_rows:t.rows,grid_min_columns:t.min_columns,grid_max_columns:t.max_columns,grid_min_rows:t.min_rows,grid_max_rows:t.max_rows}}_renderLyrics(t,e,i=!1){let s=R(this._hass?.language),r=this._lyrics,n=r.lines.length>0,o=r.plain||[],l=this._lyricsPosition(e),h=n?Qi(r.lines,l,t.duration):{index:-1,progress:0},d=n?Math.max(0,h.index):-1,c=d>=0?h.progress:0;this._lyricsActive=d;let u=A(this._state(),M.SEEK),f=`${this._lyricsOffset>0?"+":""}${this._lyricsOffset.toFixed(1)}s`,m=g;return r.status==="loading"?m=g:r.status==="none"?m=p`<div class="hm-lyrics-empty">${s("lyricsNone")}</div>`:r.status==="error"?m=p`<div class="hm-lyrics-empty hm-lyrics-error">
        <span>${s("lyricsError")}</span>
        <button
          class="hm-lyrics-retry"
          @click=${b=>{b.stopPropagation(),this._retryLyrics()}}
        >
          ${s("lyricsRetry")}
        </button>
      </div>`:r.instrumental?m=p`<div class="hm-lyrics-empty">${s("lyricsInstrumental")}</div>`:n?m=r.lines.map((b,x)=>p`<button
          class="hm-lyrics-line"
          data-active=${x===d?"true":"false"}
          data-time=${b.time}
          style=${`--hm-line-progress:${x===d?Math.round(c*100):0}%`}
          @click=${()=>{u&&this._seekTo(Math.max(0,b.time-this._lyricsOffset))}}
        >
          <span class="hm-lyrics-text">${b.text}</span>
        </button>`):o.length?m=o.map(b=>p`<div class="hm-lyrics-line" data-static="true">${b}</div>`):m=p`<div class="hm-lyrics-empty">${s("lyricsNone")}</div>`,p`<section class="hm-lyrics ${i?"hm-lyrics-inline":""}" data-status=${r.status}>
      <div class="hm-lyrics-head">
        <span class="hm-lyrics-title">${s("lyrics")}</span>
        ${r.source?p`<span class="hm-lyrics-source">${r.source}</span>`:g}
        <div class="hm-lyrics-offset" title=${s("lyricsOffset")}>
          <button
            type="button"
            aria-label="-0.5s"
            @click=${b=>{b.stopPropagation(),this._bumpLyricsOffset(-.5)}}
          >−</button>
          <span>${f}</span>
          <button
            type="button"
            aria-label="+0.5s"
            @click=${b=>{b.stopPropagation(),this._bumpLyricsOffset(.5)}}
          >+</button>
        </div>
        ${i?g:p`<button
              class="hm-lyrics-close"
              aria-label=${s("close")}
              title=${s("close")}
              @click=${b=>{b.stopPropagation(),this._toggleLyrics()}}
            >
              ${w("close",14)}
            </button>`}
      </div>
      <div class="hm-lyrics-scroll">${m}</div>
    </section>`}render(){let t=this._hass,e=this._config||{},i=R(t?.language),s=this._layoutKey(),r=this._themeKey();if(!t)return p`
        <div class="hm-card" data-layout=${s} data-panel=${this._panel?"true":"false"} data-thumb=${this._thumbMode()?this._thumbTier():"false"} data-theme=${r} style=${B(this._styleVars())}>
          <div class="hm-body">
            <div class="hm-empty">${i("loading")}</div>
          </div>
        </div>
      `;let n=this._eid(),o=t.states?.[n];if(!o)return p`
        <div class="hm-card" data-layout=${s} data-panel=${this._panel?"true":"false"} data-thumb=${this._thumbMode()?this._thumbTier():"false"} data-theme=${r} style=${B(this._styleVars())}>
          <div class="hm-body">
            <div class="hm-empty">
              ${n?`\u5B9E\u4F53\u672A\u627E\u5230\uFF1A${n}`:"ha-music: entity \u672A\u914D\u7F6E"}
            </div>
          </div>
        </div>
      `;let l=this._readMedia(),h=ke(o,e.max_queue??40),d=o.state==="playing"||o.state==="buffering",c=Vs(o.state),u=i(c),f=l.album||l.series||l.appName||(c==="playing"?i("playing"):u),m=this._volumeInfo(l),b=e.show_volume!==!1&&m.supported,x=A(o,M.SHUFFLE_SET),y=A(o,M.REPEAT_SET),_=A(o,M.PREVIOUS_TRACK),T=A(o,M.NEXT_TRACK),S=A(o,M.PLAY)||A(o,M.PAUSE),z=o.state==="off"||o.state==="standby",P=z?A(o,M.TURN_ON):A(o,M.TURN_OFF),C=A(o,M.BROWSE_MEDIA),Q=this._maEnabled()&&this._isMaPlayer(n),ot=A(o,M.SEEK),U=Array.isArray(o.attributes?.source_list)?o.attributes.source_list:[],J=Array.isArray(o.attributes?.sound_mode_list)?o.attributes.sound_mode_list:[],xt=e.show_source!==!1&&U.length>0&&A(o,M.SELECT_SOURCE),Z=J.length>0&&A(o,M.SELECT_SOUND_MODE),ie=l.groupMembers.filter(k=>k&&k!==n),Ye=e.show_group!==!1&&l.groupMembers.length>1,as=e.show_queue!==!1&&h.length>0,rs=e.show_library!==!1&&C,se=e.visualizer||"bars",ns=e.cover||"ambient",lt=l.duration,tt=this._seekPreview??l.position,os=lt?v(tt/lt*100,0,100):0,ae=Math.round(m.level*100),ht=this._repeatValue(),Ut=l.title||"",We=this._entities(),Ge=this._lyricsEnabled()&&!this._thumbMode()&&s!=="mini"&&(this._lyrics.status==="ready"||this._lyrics.status==="loading"||this._lyrics.status==="error"||this._lyricsOpen),It=Ge&&!this._lyricsOpen&&this._lyrics.status==="ready"&&this._sideLyricsVisible(),Xe=this._lyrics.status==="ready"&&this._lyrics.lines.length&&this._lyrics.lines[Math.max(0,qt(this._lyrics.lines,this._lyricsPosition(tt)))]?.text||"",Qe=Y(t,l.art);return p`
      <div
        class="hm-card"
        data-theme=${r}
        data-layout=${s}
        data-panel=${this._panel?"true":"false"}
        data-thumb=${this._thumbMode()?this._thumbTier():"false"}
        data-playing=${d?"true":"false"}
        data-cover=${ns}
        data-tight=${this._tight()?"true":"false"}
        style=${B(this._styleVars())}
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
              <span class="hm-status-text">${u}</span>
              <span class="hm-kicker-sep">·</span>
              <span class="hm-status-text hm-status-player">${e.name||Yt(t,n,n)}</span>
            </div>
            <div class="hm-top-actions">
              ${Ge?p`<button
                    class="hm-icon-btn hm-lyrics-btn"
                    data-role="lyrics"
                    data-active=${this._lyricsOpen||It?"true":"false"}
                    aria-label=${i("lyrics")}
                    title=${i("lyrics")}
                    @click=${()=>this._toggleLyrics()}
                  >
                    ${w("lyrics",16)}
                  </button>`:g}
              ${Q?p`<button
                    class="hm-icon-btn hm-ma"
                    aria-label=${i("playlists")}
                    title=${i("playlists")}
                    @click=${()=>this._openPlaylists()}
                  >
                    ${w("playlist",16)}
                  </button>`:g}
              ${as?p`<button
                    class="hm-icon-btn"
                    aria-label=${i("queue")}
                    title=${i("queue")}
                    @click=${()=>this._openQueue()}
                  >
                    ${w("queue",16)}
                  </button>`:g}
              ${rs?p`<button
                    class="hm-icon-btn"
                    aria-label=${i("library")}
                    title=${i("library")}
                    @click=${()=>this._openLibrary()}
                  >
                    ${w("library",16)}
                  </button>`:g}
              ${P?p`<button
                    class="hm-icon-btn"
                    data-role="power"
                    aria-label=${i("power")}
                    title=${i("power")}
                    @click=${()=>this._power()}
                  >
                    ${w("power",16)}
                  </button>`:g}
              <button
                class="hm-icon-btn"
                data-role="more"
                aria-label=${i("more")}
                title=${i("more")}
                @click=${()=>this._moreInfo()}
              >
                ${w("more",16)}
              </button>
            </div>
          </header>

          ${We.length>1?p`
                <div class="hm-entities">
                  ${We.map(k=>{let re=t.states?.[k],vt=Y(t,re?.attributes?.entity_picture);return p`<button
                      class="hm-entity-chip"
                      data-active=${k===n?"true":"false"}
                      @click=${()=>this._switchEntity(k)}
                    >
                      <span
                        class="hm-entity-dot"
                        style=${vt?`background-image:url("${vt}")`:""}
                      ></span>
                      <span class="hm-entity-name">${Yt(t,k,k)}</span>
                    </button>`})}
                </div>`:g}

          ${this._lyricsOpen?this._renderLyrics(l,tt):p`<section class="hm-main">
            <div class="hm-cover-wrap">
              <button
                class="hm-cover"
                data-playing=${d?"true":"false"}
                data-gesture=${this._coverGesture||""}
                aria-label=${i(d?"pause":"play")}
                title=${Ut||i("noMedia")}
                @pointerdown=${k=>this._onCoverPointerDown(k)}
                @pointermove=${k=>this._onCoverPointerMove(k)}
                @pointerup=${k=>this._onCoverPointerUp(k)}
                @pointercancel=${()=>this._onCoverPointerCancel()}
                @dragstart=${k=>k.preventDefault()}
                @click=${()=>this._onCoverClick()}
              >
                ${Qe?p`<img src=${Qe} alt=${Ut||""} draggable="false" />`:p`<span class="hm-cover-ph">${w("music",40)}</span>`}
              </button>
              <div class="hm-cover-halo"></div>
            </div>

            <div class="hm-info" data-side-lyrics=${It?"true":"false"}>
            <div class="hm-meta">
              <div class="hm-kicker">
                ${f||i("noMedia")}
                ${l.track?p`<span class="hm-kicker-sep">·</span>
                      <span>${i("track")} ${l.track}</span>`:g}
              </div>
              <h2 class="hm-title ${Ut?"":"placeholder"}">
                ${Ut||i("noTitle")}
              </h2>
              <div class="hm-artist">
                ${l.artist||(l.album?l.album:u)}
              </div>
              ${xt||Z||Ye?p`<div class="hm-tags">
                    ${xt?p`<button
                          class="hm-chip interactive"
                          @click=${()=>{this._menu=this._menu==="source"?null:"source",this.requestUpdate()}}
                        >
                          <span class="hm-chip-label">${i("source")}</span>
                          <span class="hm-chip-value">${l.source||"\u2014"}</span>
                        </button>`:g}
                    ${Z?p`<button
                          class="hm-chip interactive"
                          @click=${()=>{this._menu=this._menu==="sound"?null:"sound",this.requestUpdate()}}
                        >
                          <span class="hm-chip-label">${i("soundMode")}</span>
                          <span class="hm-chip-value">${l.soundMode||"\u2014"}</span>
                        </button>`:g}
                    ${Ye?p`<span
                          class="hm-chip ${A(o,M.GROUPING)?"interactive":""}"
                          title=${A(o,M.GROUPING)?`${i("group")} \xB7 ${i("groupLeave")}`:i("group")}
                          @click=${()=>{A(o,M.GROUPING)&&this._leaveGroup()}}
                        >
                          ${w("group",13)}
                          <span class="hm-group">
                            ${ie.slice(0,3).map(k=>{let re=t.states?.[k],vt=Y(t,re?.attributes?.entity_picture);return p`<span
                                class="hm-group-avatar"
                                title=${Yt(t,k,k)}
                                style=${vt?`background-image:url("${vt}")`:""}
                              ></span>`})}
                            ${ie.length>3?p`<span class="hm-group-more">+${ie.length-3}</span>`:g}
                          </span>
                        </span>`:g}
                  </div>`:g}
              ${Xe&&!It&&s==="full"&&!this._thumbMode()&&(this._panel||this._height>=360)?p`<div class="hm-now-lyric">
                    <span class="hm-now-lyric-mark">${w("lyrics",12)}</span>
                    <span>${Xe}</span>
                  </div>`:g}
            </div>
            ${It?this._renderLyrics(l,tt,!0):g}
            </div>
          </section>`}

          ${se!=="none"&&!this._lyricsOpen?p`<div
                class="hm-vis"
                data-playing=${d?"true":"false"}
                data-style=${se}
              >
                ${this._renderVisualizer(se,l)}
              </div>`:g}

          ${lt>0?p`<section class="hm-progress">
                <span class="hm-time">${zt(tt)}</span>
                <input
                  class="hm-range"
                  data-role="seek"
                  type="range"
                  min="0"
                  max=${lt}
                  step="0.5"
                  .value=${String(tt)}
                  data-disabled=${ot?"false":"true"}
                  style=${B({"--pct":`${os}%`})}
                  @input=${this._onSeekInput}
                  @change=${this._onSeekCommit}
                  aria-label=${i("seek")}
                />
                <span
                  class="hm-time end hoverable"
                  title=${i("remaining")}
                  @click=${()=>{this._showRemaining=!this._showRemaining,this.requestUpdate()}}
                >
                  ${this._showRemaining?`-${zt(Math.max(lt-tt,0))}`:zt(lt)}
                </span>
              </section>`:g}

          <section class="hm-controls">
            <div class="hm-transport">
              ${x?p`<button
                    class="hm-btn"
                    data-role="shuffle"
                    data-on=${l.shuffle?"true":"false"}
                    aria-label=${i("shuffle")}
                    title=${i("shuffle")}
                    @click=${()=>this._shuffle()}
                  >
                    ${w("shuffle",18)}
                  </button>`:g}
              ${_?p`<button
                    class="hm-btn"
                    data-role="previous"
                    aria-label=${i("previous")}
                    title=${i("previous")}
                    @click=${()=>this._skip("prev")}
                  >
                    ${w("previous",18)}
                  </button>`:g}
              ${S?p`<button
                    class="hm-play ${d?"is-playing":""}"
                    aria-label=${i(d?"pause":"play")}
                    title=${i(d?"pause":"play")}
                    @click=${()=>this._togglePlay()}
                  >
                    ${d?w("pause",26):w("play",26)}
                  </button>`:g}
              ${T?p`<button
                    class="hm-btn"
                    aria-label=${i("next")}
                    title=${i("next")}
                    @click=${()=>this._skip("next")}
                  >
                    ${w("next",18)}
                  </button>`:g}
              ${y?p`<button
                    class="hm-btn"
                    data-role="repeat"
                    data-on=${ht!=="off"?"true":"false"}
                    aria-label=${i(ht==="one"?"repeatOne":ht==="all"?"repeatAll":"repeatOff")}
                    title=${i(ht==="one"?"repeatOne":ht==="all"?"repeatAll":"repeatOff")}
                    @click=${()=>this._repeat()}
                  >
                    ${w(ht==="one"?"repeatOne":"repeat",18)}
                  </button>`:g}
            </div>

            ${b?p`<div class="hm-volume">
                  <button
                    class="hm-icon-btn"
                    aria-label=${m.muted?i("unmute"):i("mute")}
                    title=${m.muted?i("unmute"):i("mute")}
                    @click=${()=>this._toggleMute()}
                  >
                    ${w(m.muted?"mute":"volume",16)}
                  </button>
                  <input
                    class="hm-range"
                    data-role="volume"
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    .value=${String(ae)}
                    style=${B({"--pct":`${ae}%`})}
                    @input=${this._onVolumeInput}
                    @change=${this._onVolumeCommit}
                    aria-label=${i("volume")}
                  />
                  <span class="hm-vol-pct">${ae}%</span>
                </div>`:g}
          </section>
        </div>

        ${this._menu?p`<div class="hm-menu">
              <div class="hm-menu-head">
                ${this._menu==="source"?i("source"):i("soundMode")}
              </div>
              ${(this._menu==="source"?U:J).map(k=>p`<button
                  class="hm-menu-item"
                  data-active=${(this._menu==="source"?l.source:l.soundMode)===k?"true":"false"}
                  @click=${()=>this._menu==="source"?this._selectSource(k):this._selectSoundMode(k)}
                >
                  <span>${k}</span>
                  <span class="hm-menu-check">${w("check",13)}</span>
                </button>`)}
            </div>`:g}

        ${this._renderDrawer()}

        <div class="hm-toast ${this._toast?"show":""}">${this._toast}</div>
      </div>
    `}_renderVisualizer(t,e){let i=Vt(e);if(t==="wave"){let r=7+i.energy*6+i.low*7,n=4.5+i.pulse*5.5,o=2.2+i.pulse*3.2,l=i.phase,h=`${(i.period*2.4).toFixed(2)}s`;return p`<div class="hm-wave-wrap">
        <svg
          viewBox="0 0 600 40"
          preserveAspectRatio="none"
          aria-hidden="true"
          style=${B({animationDuration:h})}
        >
          <path
            d=${Ie(600,40,150,r,l)}
            fill="none"
            stroke="rgba(var(--hm-a1-rgb), 0.85)"
            stroke-width="1.4"
          ></path>
          <path
            d=${Ie(600,40,150,n,l*1.35+1.9)}
            fill="none"
            stroke="rgba(var(--hm-a2-rgb), 0.6)"
            stroke-width="1.2"
          ></path>
          <path
            d=${Ie(600,40,75,o,l*1.7+3.2)}
            fill="none"
            stroke="rgba(var(--hm-a1-rgb), 0.35)"
            stroke-width="0.9"
          ></path>
        </svg>
      </div>`}return t==="orbit"?p`<div class="hm-orbit-wrap">
        ${[1,.58,.34].map((n,o)=>{let l=o===0?i.low:i.pulse;return p`<span
            class="hm-orbit-ring"
            style=${B({"--react":String(n),"--drive":l.toFixed(3),animationDuration:`${(i.period*(1.8+o*.25)).toFixed(2)}s`,animationDelay:`${(o*i.period*.55).toFixed(2)}s`})}
          ></span>`})}
      </div>`:p`<div class="hm-bars">
      ${Array.from({length:36},(r,n)=>{let o=O(`${i.seed}#${n}`),l=.14+o%100/135,h=n<12?0:n<24?1:2,d=[1,.62,.34][h],c=h===0?i.low:i.pulse,u=h===0?1+.12*c:1,f=v(l*(.55+d*.55*c)*u,.08,1),m=.9+(o>>8)%100/90,b=-((o>>16)%100/45);return p`<span
          class="hm-bar"
          style=${B({"--h":f.toFixed(3),"--dur":`${m.toFixed(2)}s`,"--delay":`${b.toFixed(2)}s`})}
        ></span>`})}
    </div>`}_stopSpectrum(){this._spectrumRaf&&cancelAnimationFrame(this._spectrumRaf),this._spectrumRaf=null,this._spectrumLast=0}_spectrumPlaying(){let t=this._state()?.state;return t==="playing"||t==="buffering"}_primeAudioSpectrum(){!this._spectrumAudioUrl||(this._config?.visualizer||"bars")!=="bars"||(this._audioFailedUrl="",this._audioZeroFrames=0,this._audioGestureArmed=!0,this._ensureAudioSpectrum(),this._resumeAudioContext(),this._startAudioElement())}_ensureAudioSpectrum(){if(!this._spectrumAudioUrl||this._audioFailedUrl===this._spectrumAudioUrl)return null;if(this._audioEl&&this._audioAnalyser&&this._audioBins)return this._audioAnalyser;this._audioEl&&this._teardownAudioSpectrum();try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return this._failAudioSpectrum(),null;let e=new Audio;e.crossOrigin="anonymous",e.preload="auto",e.setAttribute("playsinline",""),e.addEventListener("error",()=>this._failAudioSpectrum()),e.src=this._spectrumAudioUrl,e.load();let i=new t,s=i.createMediaElementSource(e),r=i.createAnalyser();r.fftSize=1024,r.smoothingTimeConstant=.78,r.minDecibels=-90,r.maxDecibels=-10,s.connect(r);let n=i.createGain();return n.gain.value=0,r.connect(n),n.connect(i.destination),this._audioEl=e,this._audioCtx=i,this._audioSource=s,this._audioAnalyser=r,this._audioMute=n,this._audioBins=new Uint8Array(r.frequencyBinCount),r}catch{return this._failAudioSpectrum(),null}}_resumeAudioContext(){this._audioCtx?.state==="suspended"&&this._audioCtx.resume().catch(()=>{})}_startAudioElement(){let t=this._audioEl;if(!t||!this._audioGestureArmed)return;this._resumeAudioContext();let e=t.play();e?.catch&&e.catch(()=>{}),this._audioStartedAt=performance.now()}_pauseAudioSpectrum(){this._audioEl?.pause()}_teardownAudioSpectrum(){let t=this._audioEl;if(t)try{t.pause(),t.removeAttribute("src"),t.load()}catch{}try{this._audioSource?.disconnect(),this._audioAnalyser?.disconnect(),this._audioMute?.disconnect()}catch{}this._audioCtx&&this._audioCtx.close().catch(()=>{}),this._audioEl=null,this._audioCtx=null,this._audioSource=null,this._audioAnalyser=null,this._audioMute=null,this._audioBins=null,this._audioZeroFrames=0,this._audioPeak=0,this._audioStartedAt=0,this._audioGestureArmed=!1}_failAudioSpectrum(){this._spectrumAudioUrl&&(this._audioFailedUrl=this._spectrumAudioUrl,this._teardownAudioSpectrum())}_syncAudioPlayback(t,e){let i=this._audioEl;if(!i)return;if(!t){i.pause();return}this._audioGestureArmed&&i.paused&&this._startAudioElement();let s=i.duration,r=Number(e.duration);if(Number.isFinite(s)&&s>0&&Number.isFinite(r)&&r>0&&Math.abs(s-r)<5&&i.readyState>=1&&Number.isFinite(i.currentTime)&&Number.isFinite(e.position)&&Math.abs(i.currentTime-e.position)>2.5)try{i.currentTime=e.position}catch{}}_audioSpectrumReady(){return!!(this._audioEl&&!this._audioEl.paused&&this._audioEl.readyState>=2&&this._audioAnalyser&&this._audioBins&&this._audioCtx?.state==="running"&&this._audioFailedUrl!==this._spectrumAudioUrl)}_readAudioLevels(t){let e=this._audioAnalyser,i=this._audioBins,s=this._audioCtx;if(!e||!i||!s)return null;e.getByteFrequencyData(i);let r=s.sampleRate/2,n=30,l=Math.min(16e3,r)/n,h=new Array(t),d=0;for(let c=0;c<t;c+=1){let u=n*Math.pow(l,c/t),f=n*Math.pow(l,(c+1)/t),m=v(Math.floor(u/r*i.length),0,i.length-1),b=v(Math.ceil(f/r*i.length)-1,m,i.length-1),x=0,y=0,_=0;for(let P=m;P<=b;P+=1){let C=i[P]||0;C>x&&(x=C),y+=C,_+=1}let T=_?y/_:0,S=(x*.72+T*.28)/255,z=v(Math.pow(S,.88)*1.5,.04,1);h[c]=z,x>d&&(d=x)}return this._audioPeak=d,h}_syncSpectrum(){let t=Array.from(this.renderRoot?.querySelectorAll?.(".hm-bar")||[]);if(!t.length||this._thumbPreview||(this._config?.visualizer||"bars")!=="bars"){this._spectrumBars=[],this._stopSpectrum(),this._teardownAudioSpectrum();return}this._spectrumBars=t;let e=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches;if(!this._spectrumPlaying()||e){this._stopSpectrum(),this._syncAudioPlayback(!1,this._readMedia()),this._applySpectrumIdle();return}let i=this._readMedia();this._ensureAudioSpectrum(),this._syncAudioPlayback(!0,i),!this._spectrumRaf&&(this._spectrumLast=0,this._spectrumRaf=requestAnimationFrame(s=>this._spectrumTick(s)))}_applySpectrumIdle(){let t=Vt(this._readMedia()),e=this._spectrumBars.length;for(let i=0;i<e;i+=1){let s=i<12?0:i<24?1:2,r=.12+[.1,.06,.03][s],n=Math.min(.24,r+t.energy*.04);this._spectrumBars[i]?.style.setProperty("--h",n.toFixed(3))}}_spectrumTick(t){if(!this._spectrumBars.length){this._stopSpectrum();return}if(!this._spectrumPlaying()){this._applySpectrumIdle(),this._syncAudioPlayback(!1,this._readMedia()),this._stopSpectrum();return}let e=this._spectrumLast?Math.min(.05,Math.max(.001,(t-this._spectrumLast)/1e3)):.016;this._spectrumLast=t;let i=this._readMedia(),s=Vt(i),r=this._trackKey(this._state());r!==this._spectrumKey&&(this._spectrumKey=r,this._spectrumLevels=this._spectrumBars.map(()=>.12));let n=t/1e3,o=this._spectrumLevels,l=this._spectrumBars.length,h=this._audioSpectrumReady(),d=h?this._readAudioLevels(l):null;h&&(!this._audioPeak&&t-this._audioStartedAt>1500?(this._audioZeroFrames+=1,this._audioZeroFrames>90&&this._failAudioSpectrum()):this._audioPeak&&(this._audioZeroFrames=0));for(let c=0;c<l;c+=1){let u;if(d)u=d[c];else{let x=c<12?0:c<24?1:2,y=O(`${s.seed}#${c}`),_=y%360/360*Math.PI*2,S=1.02-c/Math.max(1,l-1)*.5+Math.sin(c*1.7+_)*.1,z=.5+.5*Math.sin(n*2.35+_+c*.28),P=.5+.5*Math.sin(n*7.6+_*1.7+c*.62),C=.5+.5*Math.sin(i.position/(1.65+s.hash%45/100)*Math.PI*2+_),Q=x===0?s.low:x===1?s.pulse:.45,ot=Math.sin(n*3.3+y*7e-4)>.88?1.16:1;u=v(S*(.52+z*.54)*(.76+P*.34)*(.8+C*.4)*(.86+Q*.24)*ot,.1,1)}let f=Number.isFinite(o[c])?o[c]:.12,m=u>f?d?.72:.52:d?.22:.24,b=f+(u-f)*(1-Math.exp(-m*e*60));o[c]=b,this._spectrumBars[c]?.style.setProperty("--h",b.toFixed(3))}this._spectrumRaf=requestAnimationFrame(c=>this._spectrumTick(c))}_renderDrawer(){let t=this._drawer,e=R(this._hass?.language),i=t.mode==="library",s=t.mode==="playlists";return p`
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
                ${w("chevronLeft",16)}
              </button>`:g}
          <div class="hm-drawer-title">${t.title||(i?e("library"):"")}</div>
          ${s&&t.maUrl?p`<button
                class="hm-icon-btn hm-ma"
                aria-label=${e("openAssistant")}
                title=${e("openAssistant")}
                @click=${()=>this._openAssistant()}
              >
                ${w("external",15)}
              </button>`:g}
          <button
            class="hm-icon-btn"
            aria-label=${e("close")}
            title=${e("close")}
            @click=${()=>this._closeDrawer()}
          >
            ${w("close",16)}
          </button>
        </div>
        <div class="hm-drawer-body">
          ${t.loading?p`<div class="hm-empty"><span class="hm-spinner"></span></div>`:t.error?p`<div class="hm-empty">${t.error}</div>`:t.items.length?this._renderDrawerItems(t.items,t.mode):p`<div class="hm-empty">
                    ${e(i?"browseFailed":s?"playlistsEmpty":"queueEmpty")}
                  </div>`}
        </div>
      </div>
    `}_renderDrawerItems(t,e){let i=R(this._hass?.language),s=e==="library",r=e==="playlists";return t.map(n=>{if(r){let l=Y(this._hass,n.thumb);return p`<button
          class="hm-list-item"
          data-empty=${n.empty?"true":"false"}
          @click=${()=>this._playPlaylistItem(n)}
        >
          <span
            class="hm-list-thumb"
            style=${l?`background-image:url("${l}")`:""}
          >
            ${l?g:w("playlist",16)}
          </span>
          <span class="hm-list-text">
            <span class="hm-list-name">${n.title||"\u2014"}</span>
            <span class="hm-list-sub">${n.empty?i("playlistUnavailable"):n.subtitle}</span>
          </span>
          <span class="hm-list-tail">${w("play",14)}</span>
        </button>`}if(s){let l=Y(this._hass,n.thumb);return p`<button
          class="hm-list-item"
          @click=${()=>this._enterBrowseItem(n)}
        >
          <span
            class="hm-list-thumb"
            style=${l?`background-image:url("${l}")`:""}
          >
            ${l?g:w(n.canExpand?"library":"music",16)}
          </span>
          <span class="hm-list-text">
            <span class="hm-list-name">${n.title||"\u2014"}</span>
            <span class="hm-list-sub">${n.subtitle}</span>
          </span>
          <span class="hm-list-tail">
            ${n.canExpand?w("chevronRight",14):g}
          </span>
        </button>`}let o=Y(this._hass,n.art);return p`<button
        class="hm-list-item"
        data-active=${n.active?"true":"false"}
        @click=${()=>this._playQueueItem(n)}
      >
        <span
          class="hm-list-thumb"
          style=${o?`background-image:url("${o}")`:""}
        >
          ${o?g:w("music",16)}
        </span>
        <span class="hm-list-text">
          <span class="hm-list-name">${n.title||i("noTitle")}</span>
          <span class="hm-list-sub">${n.artist||n.album||""}</span>
        </span>
        <span class="hm-list-tail">${n.duration?zt(n.duration):""}</span>
      </button>`})}static getStubConfig(t){let e=t?.states||{};return{entity:Object.keys(e).find(s=>s.startsWith("media_player.")&&e[s]?.attributes?.supported_features!==void 0)||"",theme:H}}static getConfigElement(){return document.createElement("ha-music-editor")}};customElements.get("ha-music")||(customElements.define("ha-music",Fe),window.customCards=window.customCards||[],window.customCards.push({type:wi,name:ki,description:"\u73B0\u4EE3\u70AB\u9177\u914D\u8272\u7684\u5168\u529F\u80FD\u97F3\u4E50\u64AD\u653E\u5668\u5361\u7247\uFF1A\u5C01\u9762\u53D6\u8272\u3001\u9891\u8C31\u53EF\u89C6\u5316\u3001\u5A92\u4F53\u5E93\u6D4F\u89C8\u3001\u64AD\u653E\u961F\u5217\u3001\u591A\u8BBE\u5907\u5207\u6362\u3002",preview:!0,documentationURL:"https://github.com/RockJesus/ha-music"}),console.info(`%c HA-MUSIC %c v${vi} `,"background:#2ee6c5;color:#04121a;font-weight:700;border-radius:4px 0 0 4px","background:#7b5cff;color:#fff;border-radius:0 4px 4px 0"));function Ys(a,t){a.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}var Be=class extends N{static get properties(){return{hass:{attribute:!1},_config:{state:!0}}}static get styles(){return kt`
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
    `}constructor(){super(),this._config={},this._lang="en"}setConfig(t){this._config={...t},typeof t?.music_assistant=="string"&&(this._maUrlDraft=t.music_assistant)}get _zh(){return Kt(this._lang||this.hass?.language)}_update(t){let e={...this._config,...t};Object.keys(e).forEach(i=>{e[i]===void 0&&delete e[i]}),this._config=e,Ys(this,e)}_optionLabel(t){return this._zh?t.zh:t.en}_dockModes(){return D(this._config?.dock)}_dockEntities(){return _t(this._config?.dock_entities)}_dockThemes(){return X(this._config?.dock_themes)}_setDockTheme(t,e){let i={...this._dockThemes()};e?i[t]=e:delete i[t],this._update({dock_themes:i,dock_edited:Date.now()})}_mainEntity(){return this._entities()[0]||this._config?.entity||""}_toggleDock(t,e){let i=this._dockModes(),s=this._dockEntities(),r;e?(r=i.includes(t)?i:[...i,t],!s[t]&&this._mainEntity()&&(s[t]=this._mainEntity())):r=i.filter(n=>n!==t),this._update({dock:r.length?r:"none",dock_entities:s,dock_edited:Date.now()})}_setDockEntity(t,e){let i={...this._dockEntities(),[t]:e||""};i[t]||delete i[t],this._update({dock_entities:i,dock_edited:Date.now()})}_entities(){return Array.isArray(this._config.entities)&&this._config.entities.length?this._config.entities:[]}_setEntity(t,e){let i=this._entities();if(!i.length){this._update({entity:e||void 0});return}let s=[...i];s[t]=e,this._update({entities:s})}_addEntity(){let t=this._entities();if(t.length){this._update({entities:[...t,""]});return}let e=this._config.entity?[this._config.entity,""]:["",""];this._update({entities:e,entity:void 0})}_removeEntity(t){let e=this._entities().filter((i,s)=>s!==t);if(e.length<=1){this._update({entity:e[0]||void 0,entities:void 0});return}this._update({entities:e})}updated(){this._lang=this.hass?.language||this._lang}render(){let t=this._config||{},e=this._entities(),i=this._dockModes(),s=this._dockEntities(),r=(n,o,l)=>p`
      <ha-entity-picker
        .hass=${this.hass}
        .value=${n||""}
        .includeDomains=${["media_player"]}
        .allowCustomEntity=${!1}
        .label=${l}
        @value-changed=${h=>{h.stopPropagation(),this._setEntity(o,h.detail?.value??"")}}
      ></ha-entity-picker>
    `;return p`
      <div class="wrap">
        <div class="section">
          <div class="section-title">${this._zh?"\u64AD\u653E\u5668":"Player"}</div>
          ${e.length?e.map((n,o)=>p`
                  <div class="entity-row">
                    ${r(n,o,o===0?this._zh?"\u64AD\u653E\u5668":"Player":this._zh?"\u8BBE\u5907":"Player")}
                    <button
                      class="mini-btn"
                      @click=${()=>this._removeEntity(o)}
                      title=${this._zh?"\u79FB\u9664":"Remove"}
                    >
                      ${this._zh?"\u79FB\u9664":"Remove"}
                    </button>
                  </div>
                `):p`<div class="entity-row">
                ${r(t.entity||"",0,this._zh?"\u64AD\u653E\u5668":"Player")}
              </div>`}
          <button class="mini-btn add" @click=${()=>this._addEntity()}>
            ${this._zh?"\uFF0B \u6DFB\u52A0\u64AD\u653E\u5668":"\uFF0B Add player"}
          </button>
          ${e.length?p`<div class="hint">
                ${this._zh?"\u591A\u8BBE\u5907\u6A21\u5F0F\uFF1A\u5361\u7247\u9876\u90E8\u4F1A\u51FA\u73B0\u8BBE\u5907\u5207\u6362\u6807\u7B7E\u3002":"Multi-player mode adds switching chips on top of the card."}
              </div>`:g}
        </div>

        <div class="section">
          <div class="section-title">${this._zh?"\u5916\u89C2":"Appearance"}</div>
          <div class="grid2">
            <label class="field">
              <span class="label">${this._zh?"\u5E03\u5C40":"Layout"}</span>
              <select
                .value=${t.layout||"adaptive"}
                @change=${n=>this._update({layout:n.target.value})}
              >
                ${Object.keys(ye).map(n=>p`<option value=${n} ?selected=${t.layout===n}>
                      ${this._optionLabel(ye[n])}
                    </option>`)}
              </select>
            </label>
            <label class="field">
              <span class="label">${this._zh?"\u4E3B\u9898":"Theme"}</span>
              <select
                .value=${t.theme||"aurora"}
                @change=${n=>this._update({theme:n.target.value})}
              >
                ${Object.keys(E).map(n=>p`<option value=${n} ?selected=${t.theme===n}>
                      ${this._optionLabel(E[n].label)}
                    </option>`)}
              </select>
            </label>
            <label class="field">
              <span class="label">${this._zh?"\u80CC\u666F":"Background"}</span>
              <select
                .value=${t.cover||"ambient"}
                @change=${n=>this._update({cover:n.target.value})}
              >
                ${Object.keys(xe).map(n=>p`<option value=${n} ?selected=${t.cover===n}>
                      ${this._optionLabel(xe[n])}
                    </option>`)}
              </select>
            </label>
            <label class="field">
              <span class="label">${this._zh?"\u9891\u8C31\u52A8\u6548":"Visualizer"}</span>
              <select
                .value=${t.visualizer||"bars"}
                @change=${n=>this._update({visualizer:n.target.value})}
              >
                ${Object.keys(ve).map(n=>p`<option value=${n} ?selected=${t.visualizer===n}>
                      ${this._optionLabel(ve[n])}
                    </option>`)}
              </select>
            </label>
          </div>
          <label class="field">
            <span class="label">
              ${this._zh?"\u9891\u8C31\u97F3\u9891\u6E90\uFF08\u53EF\u9009\uFF09":"Spectrum audio URL (optional)"}
            </span>
            <input
              type="url"
              .value=${t.spectrum_audio_url||""}
              placeholder="https://…/track.mp3"
              @change=${n=>this._update({spectrum_audio_url:n.target.value.trim()||void 0})}
            />
          </label>
          <div class="hint">
            ${this._zh?"\u586B\u5199\u53EF\u76F4\u63A5\u8BBF\u95EE\u4E14\u5141\u8BB8\u8DE8\u57DF\u7684\u97F3\u9891\u76F4\u94FE\u540E\uFF0C\u5361\u7247\u7528 Web Audio \u8BFB\u53D6\u771F\u5B9E\u9891\u8C31\uFF1B\u7559\u7A7A\u6216\u52A0\u8F7D\u5931\u8D25\u65F6\u81EA\u52A8\u56DE\u9000\u5230\u9010\u5E27\u5F8B\u52A8\u3002":"Add a CORS-enabled audio URL for true Web Audio FFT. Leave empty or on failure, the card falls back to the procedural live motion."}
          </div>
          <label class="field">
            <span class="label">${this._zh?"\u6807\u9898\uFF08\u7559\u7A7A\u7528\u5B9E\u4F53\u540D\u79F0\uFF09":"Title (optional)"}</span>
            <input
              type="text"
              .value=${t.name||""}
              @input=${n=>this._update({name:n.target.value||void 0})}
            />
          </label>
          <label class="field">
            <span class="label">${this._zh?"\u5F3A\u8C03\u8272\u8986\u76D6\uFF08\u53EF\u9009\uFF09":"Accent override (optional)"}</span>
            <input
              type="color"
              .value=${t.accent||"#2ee6c5"}
              @input=${n=>this._update({accent:n.target.value})}
            />
          </label>
          <div class="check">
            <input
              type="checkbox"
              id="ha-music-palette"
              .checked=${t.palette!==!1}
              @change=${n=>this._update({palette:n.target.checked})}
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
              @change=${n=>this._update({volume_entity:n.target.value||void 0})}
            />
          </label>
          ${this._switch(this._zh?"\u663E\u793A\u97F3\u91CF\u6761":"Show volume",t.show_volume!==!1,n=>this._update({show_volume:n}))}
          ${this._switch(this._zh?"\u663E\u793A\u97F3\u6E90\u9009\u62E9":"Show source picker",t.show_source!==!1,n=>this._update({show_source:n}))}
          ${this._switch(this._zh?"\u663E\u793A\u64AD\u653E\u961F\u5217":"Show queue",t.show_queue!==!1,n=>this._update({show_queue:n}))}
          ${this._switch(this._zh?"\u663E\u793A\u5A92\u4F53\u5E93\u6D4F\u89C8":"Show media browser",t.show_library!==!1,n=>this._update({show_library:n}))}
          ${this._switch(this._zh?"\u81EA\u52A8\u8BC6\u522B\u6B4C\u8BCD":"Auto lyrics",t.show_lyrics!==!1,n=>this._update({show_lyrics:n}))}
          <label class="field">
            <span class="label">${this._zh?"\u6B4C\u8BCD\u6E90":"Lyrics source"}</span>
            <select
              .value=${t.lyrics_source||_e}
              @change=${n=>this._update({lyrics_source:n.target.value})}
            >
              ${Object.keys(be).map(n=>p`<option value=${n} ?selected=${(t.lyrics_source||_e)===n}>
                    ${this._optionLabel(be[n])}
                  </option>`)}
            </select>
            <span class="hint">
              ${this._zh?"\u9ED8\u8BA4\u81EA\u52A8\uFF1A\u5148\u7528 QQ \u97F3\u4E50\u5339\u914D\uFF0C\u5931\u8D25\u518D\u56DE\u9000\u7F51\u6613\u4E91\u3002":"Auto: try QQ Music first, then fall back to NetEase."}
            </span>
          </label>
          ${this._switch(this._zh?"\u5168\u5C40\u6B4C\u8BCD\u60AC\u6D6E\u7A97\uFF08\u5355\u884C / \u957F\u6309\u62D6\u52A8\uFF09":"Global floating lyric (one line, long-press drag)",t.floating_lyrics!==!1,n=>this._update({floating_lyrics:n,floating_lyrics_edited:Date.now()}))}
          ${this._switch(this._zh?"\u663E\u793A\u5206\u7EC4\u4FE1\u606F":"Show group info",t.show_group!==!1,n=>this._update({show_group:n}))}
          ${this._switch(this._zh?"\u663E\u793A Music Assistant \u6B4C\u5355\u5165\u53E3":"Show Music Assistant playlists",t.music_assistant!==!1,n=>this._update({music_assistant:n?typeof t.music_assistant=="string"?t.music_assistant:this._maUrlDraft||!0:!1}))}
          <label class="field">
            <span class="label">
              ${this._zh?"MA \u9762\u677F\u5730\u5740\uFF08\u7559\u7A7A\u81EA\u52A8\uFF0C\u4EC5\u4F9B\u62BD\u5C49\u5185\u8DF3\u8F6C\uFF09":"MA panel URL (optional)"}
            </span>
            <input
              type="text"
              .value=${typeof t.music_assistant=="string"?t.music_assistant:""}
              placeholder="/music-assistant"
              @input=${n=>{this._maUrlDraft=n.target.value.trim()}}
              @change=${n=>this._update({music_assistant:n.target.value.trim()||!0})}
            />
            <span class="hint">
              ${this._zh?"\u7559\u7A7A\u81EA\u52A8\u8BFB\u53D6 HA \u9762\u677F\u8DEF\u5F84\uFF1B\u6B4C\u5355\u5165\u53E3\u672C\u8EAB\u4E0D\u4F9D\u8D56\u6B64\u9879":"Leave empty to auto-detect the HA panel path"}
            </span>
          </label>
          <div class="section-title">${this._zh?"\u5168\u5C40\u8FF7\u4F60\u64AD\u653E\u5668":"Global mini players"}</div>
          <div class="hint">
            ${this._zh?"\u4E09\u4E2A\u4F4D\u7F6E\u53EF\u4EE5\u540C\u65F6\u542F\u7528\uFF0C\u4E5F\u53EF\u4EE5\u5206\u522B\u9009\u62E9\u5404\u81EA\u7684\u64AD\u653E\u5668\u5B9E\u4F53\uFF1B\u5355\u51FB\u64AD\u653E/\u6682\u505C\uFF0C\u53CC\u51FB\u6298\u53E0\u6216\u5C55\u5F00\u3002\u9876\u90E8\u53EA\u53EF\u5DE6\u53F3\u79FB\u52A8\u3001\u4FA7\u8FB9\u680F\u53EA\u53EF\u4E0A\u4E0B\u79FB\u52A8\uFF1B\u53F3\u4E0B\u89D2\u957F\u6309\u540E\u53EF\u4EFB\u610F\u62D6\u52A8\uFF0C\u4F46\u4E0D\u80FD\u8FDB\u5165\u4FA7\u8FB9\u680F\u548C\u9876\u680F\u3002":"Each position can use its own entity; click to play/pause, double-click to fold, long-press to drag."}
          </div>
          ${(()=>{let n=this._dockThemes();return[["top",this._zh?"\u9876\u90E8\u64AD\u653E\u5668":"Top bar"],["sidebar",this._zh?"\u4FA7\u8FB9\u680F\u64AD\u653E\u5668":"Sidebar"],["fab",this._zh?"\u53F3\u4E0B\u89D2\u64AD\u653E\u5668":"Bottom-right"]].map(([o,l])=>{let h=i.includes(o),d=s[o]||this._mainEntity(),c=n[o]||this._config.theme||"aurora";return p`
              <div class="dock-row">
                <label class="check">
                  <input
                    type="checkbox"
                    .checked=${h}
                    @change=${u=>this._toggleDock(o,u.target.checked)}
                  />
                  <span>${l}</span>
                </label>
                <div class="dock-right">
                  <ha-entity-picker
                    .hass=${this.hass}
                    .value=${d||""}
                    .includeDomains=${["media_player"]}
                    .allowCustomEntity=${!1}
                    .label=${this._zh?"\u64AD\u653E\u5668\u5B9E\u4F53":"Player entity"}
                    @value-changed=${u=>{u.stopPropagation(),this._setDockEntity(o,u.detail?.value??"")}}
                  ></ha-entity-picker>
                  ${h?p`<select
                        class="dock-theme"
                        .value=${c}
                        @change=${u=>this._setDockTheme(o,u.target.value)}
                        title=${this._zh?"\u64AD\u653E\u5668\u4E3B\u9898":"Player theme"}
                      >
                        ${Object.keys(E).map(u=>p`<option value=${u} ?selected=${c===u}>
                              ${this._optionLabel(E[u].label)}
                            </option>`)}
                      </select>`:g}
                </div>
              </div>
            `})})()}
        </div>
      </div>
    `}_switch(t,e,i){return p`<label class="switch-row">
      <span class="label">${t}</span>
      <input
        type="checkbox"
        .checked=${e}
        @change=${s=>i(s.target.checked)}
      />
    </label>`}};customElements.get("ha-music-editor")||customElements.define("ha-music-editor",Be);var Dt=new URL(import.meta.url),He=Dt.searchParams.get("dock"),je=te(),yt=He?D(He==="1"?"top":He):je?.modes||[],Ke={...je?.entities||{}},Ve=X(je?.themes),es=Dt.searchParams.get("dock_entity");es&&yt[0]&&(Ke[yt[0]]=es);var is=Dt.searchParams.get("dock_theme");is&&yt[0]&&(Ve[yt[0]]=is);for(let a of yt){let t=Dt.searchParams.get(`dock_entity_${a}`);t&&(Ke[a]=t);let e=Dt.searchParams.get(`dock_theme_${a}`);e&&(Ve[a]=e)}var ss=yt.map(a=>({mode:a,entity:Ke[a],theme:Ve[a]})).filter(a=>a.entity);ss.length&&Ot(ss.map(a=>({...a,hass:ft()})));
