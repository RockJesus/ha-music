var Qt=globalThis,Xt=Qt.ShadowRoot&&(Qt.ShadyCSS===void 0||Qt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ae=Symbol(),gi=new WeakMap,Mt=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==Ae)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(Xt&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=gi.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&gi.set(e,t))}return t}toString(){return this.cssText}},bi=r=>new Mt(typeof r=="string"?r:r+"",void 0,Ae),Pt=(r,...t)=>{let e=r.length===1?r[0]:t.reduce((i,s,a)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+r[a+1],r[0]);return new Mt(e,r,Ae)},_i=(r,t)=>{if(Xt)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),s=Qt.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,r.appendChild(i)}},Se=Xt?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return bi(e)})(r):r;var{is:Rs,defineProperty:zs,getOwnPropertyDescriptor:qs,getOwnPropertyNames:Ns,getOwnPropertySymbols:Ds,getPrototypeOf:Os}=Object,X=globalThis,yi=X.trustedTypes,Us=yi?yi.emptyScript:"",Is=X.reactiveElementPolyfillSupport,Et=(r,t)=>r,Me={toAttribute(r,t){switch(t){case Boolean:r=r?Us:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},vi=(r,t)=>!Rs(r,t),xi={attribute:!0,type:String,converter:Me,reflect:!1,useDefault:!1,hasChanged:vi};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),X.litPropertyMetadata??(X.litPropertyMetadata=new WeakMap);var V=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=xi){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&zs(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){let{get:s,set:a}=qs(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:s,set(n){let o=s?.call(this);a?.call(this,n),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??xi}static _$Ei(){if(this.hasOwnProperty(Et("elementProperties")))return;let t=Os(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Et("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Et("properties"))){let e=this.properties,i=[...Ns(e),...Ds(e)];for(let s of i)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let s of i)e.unshift(Se(s))}else t!==void 0&&e.push(Se(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return _i(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){let a=(i.converter?.toAttribute!==void 0?i.converter:Me).toAttribute(e,i.type);this._$Em=t,a==null?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(t,e){let i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let a=i.getPropertyOptions(s),n=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:Me;this._$Em=s;let o=n.fromAttribute(e,a.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,a){if(t!==void 0){let n=this.constructor;if(s===!1&&(a=this[t]),i??(i=n.getPropertyOptions(t)),!((i.hasChanged??vi)(a,e)||i.useDefault&&i.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:a},n){i&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,n??e??this[t]),a!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[s,a]of this._$Ep)this[s]=a;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,a]of i){let{wrapped:n}=a,o=this[s];n!==!0||this._$AL.has(s)||o===void 0||this.C(s,void 0,a,o)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};V.elementStyles=[],V.shadowRootOptions={mode:"open"},V[Et("elementProperties")]=new Map,V[Et("finalized")]=new Map,Is?.({ReactiveElement:V}),(X.reactiveElementVersions??(X.reactiveElementVersions=[])).push("2.1.2");var Tt=globalThis,wi=r=>r,Jt=Tt.trustedTypes,ki=Jt?Jt.createPolicy("lit-html",{createHTML:r=>r}):void 0,Ei="$lit$",J=`lit$${Math.random().toFixed(9).slice(2)}$`,Ci="?"+J,Fs=`<${Ci}>`,lt=document,Lt=()=>lt.createComment(""),Rt=r=>r===null||typeof r!="object"&&typeof r!="function",ze=Array.isArray,Bs=r=>ze(r)||typeof r?.[Symbol.iterator]=="function",Pe=`[ 	
\f\r]`,Ct=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,$i=/-->/g,Ai=/>/g,nt=RegExp(`>|${Pe}(?:([^\\s"'>=/]+)(${Pe}*=${Pe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Si=/'/g,Mi=/"/g,Ti=/^(?:script|style|textarea|title)$/i,qe=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),g=qe(1),A=qe(2),Br=qe(3),G=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),Pi=new WeakMap,ot=lt.createTreeWalker(lt,129);function Li(r,t){if(!ze(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return ki!==void 0?ki.createHTML(t):t}var Hs=(r,t)=>{let e=r.length-1,i=[],s,a=t===2?"<svg>":t===3?"<math>":"",n=Ct;for(let o=0;o<e;o++){let l=r[o],c,d,h=-1,u=0;for(;u<l.length&&(n.lastIndex=u,d=n.exec(l),d!==null);)u=n.lastIndex,n===Ct?d[1]==="!--"?n=$i:d[1]!==void 0?n=Ai:d[2]!==void 0?(Ti.test(d[2])&&(s=RegExp("</"+d[2],"g")),n=nt):d[3]!==void 0&&(n=nt):n===nt?d[0]===">"?(n=s??Ct,h=-1):d[1]===void 0?h=-2:(h=n.lastIndex-d[2].length,c=d[1],n=d[3]===void 0?nt:d[3]==='"'?Mi:Si):n===Mi||n===Si?n=nt:n===$i||n===Ai?n=Ct:(n=nt,s=void 0);let p=n===nt&&r[o+1].startsWith("/>")?" ":"";a+=n===Ct?l+Fs:h>=0?(i.push(c),l.slice(0,h)+Ei+l.slice(h)+J+p):l+J+(h===-2?o:p)}return[Li(r,a+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},zt=class r{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let a=0,n=0,o=t.length-1,l=this.parts,[c,d]=Hs(t,e);if(this.el=r.createElement(c,i),ot.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=ot.nextNode())!==null&&l.length<o;){if(s.nodeType===1){if(s.hasAttributes())for(let h of s.getAttributeNames())if(h.endsWith(Ei)){let u=d[n++],p=s.getAttribute(h).split(J),m=/([.?@])?(.*)/.exec(u);l.push({type:1,index:a,name:m[2],strings:p,ctor:m[1]==="."?Ce:m[1]==="?"?Te:m[1]==="@"?Le:gt}),s.removeAttribute(h)}else h.startsWith(J)&&(l.push({type:6,index:a}),s.removeAttribute(h));if(Ti.test(s.tagName)){let h=s.textContent.split(J),u=h.length-1;if(u>0){s.textContent=Jt?Jt.emptyScript:"";for(let p=0;p<u;p++)s.append(h[p],Lt()),ot.nextNode(),l.push({type:2,index:++a});s.append(h[u],Lt())}}}else if(s.nodeType===8)if(s.data===Ci)l.push({type:2,index:a});else{let h=-1;for(;(h=s.data.indexOf(J,h+1))!==-1;)l.push({type:7,index:a}),h+=J.length-1}a++}}static createElement(t,e){let i=lt.createElement("template");return i.innerHTML=t,i}};function ft(r,t,e=r,i){if(t===G)return t;let s=i!==void 0?e._$Co?.[i]:e._$Cl,a=Rt(t)?void 0:t._$litDirective$;return s?.constructor!==a&&(s?._$AO?.(!1),a===void 0?s=void 0:(s=new a(r),s._$AT(r,e,i)),i!==void 0?(e._$Co??(e._$Co=[]))[i]=s:e._$Cl=s),s!==void 0&&(t=ft(r,s._$AS(r,t.values),s,i)),t}var Ee=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??lt).importNode(e,!0);ot.currentNode=s;let a=ot.nextNode(),n=0,o=0,l=i[0];for(;l!==void 0;){if(n===l.index){let c;l.type===2?c=new qt(a,a.nextSibling,this,t):l.type===1?c=new l.ctor(a,l.name,l.strings,this,t):l.type===6&&(c=new Re(a,this,t)),this._$AV.push(c),l=i[++o]}n!==l?.index&&(a=ot.nextNode(),n++)}return ot.currentNode=lt,s}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},qt=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=ft(this,t,e),Rt(t)?t===b||t==null||t===""?(this._$AH!==b&&this._$AR(),this._$AH=b):t!==this._$AH&&t!==G&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Bs(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==b&&Rt(this._$AH)?this._$AA.nextSibling.data=t:this.T(lt.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=zt.createElement(Li(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{let a=new Ee(s,this),n=a.u(this.options);a.p(e),this.T(n),this._$AH=a}}_$AC(t){let e=Pi.get(t.strings);return e===void 0&&Pi.set(t.strings,e=new zt(t)),e}k(t){ze(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,s=0;for(let a of t)s===e.length?e.push(i=new r(this.O(Lt()),this.O(Lt()),this,this.options)):i=e[s],i._$AI(a),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=wi(t).nextSibling;wi(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},gt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,a){this.type=1,this._$AH=b,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=a,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=b}_$AI(t,e=this,i,s){let a=this.strings,n=!1;if(a===void 0)t=ft(this,t,e,0),n=!Rt(t)||t!==this._$AH&&t!==G,n&&(this._$AH=t);else{let o=t,l,c;for(t=a[0],l=0;l<a.length-1;l++)c=ft(this,o[i+l],e,l),c===G&&(c=this._$AH[l]),n||(n=!Rt(c)||c!==this._$AH[l]),c===b?t=b:t!==b&&(t+=(c??"")+a[l+1]),this._$AH[l]=c}n&&!s&&this.j(t)}j(t){t===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Ce=class extends gt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===b?void 0:t}},Te=class extends gt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==b)}},Le=class extends gt{constructor(t,e,i,s,a){super(t,e,i,s,a),this.type=5}_$AI(t,e=this){if((t=ft(this,t,e,0)??b)===G)return;let i=this._$AH,s=t===b&&i!==b||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==b&&(i===b||s);s&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Re=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){ft(this,t)}};var js=Tt.litHtmlPolyfillSupport;js?.(zt,qt),(Tt.litHtmlVersions??(Tt.litHtmlVersions=[])).push("3.3.3");var Ri=(r,t,e)=>{let i=e?.renderBefore??t,s=i._$litPart$;if(s===void 0){let a=e?.renderBefore??null;i._$litPart$=s=new qt(t.insertBefore(Lt(),a),a,void 0,e??{})}return s._$AI(r),s};var Nt=globalThis,B=class extends V{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ri(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return G}};B._$litElement$=!0,B.finalized=!0,Nt.litElementHydrateSupport?.({LitElement:B});var Ks=Nt.litElementPolyfillSupport;Ks?.({LitElement:B});(Nt.litElementVersions??(Nt.litElementVersions=[])).push("4.2.2");var zi={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},qi=r=>(...t)=>({_$litDirective$:r,values:t}),Zt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var Ni="important",Vs=" !"+Ni,Y=qi(class extends Zt{constructor(r){if(super(r),r.type!==zi.ATTRIBUTE||r.name!=="style"||r.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(r){return Object.keys(r).reduce((t,e)=>{let i=r[e];return i==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(r,[t]){let{style:e}=r.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let i of this.ft)t[i]==null&&(this.ft.delete(i),i.includes("-")?e.removeProperty(i):e[i]=null);for(let i in t){let s=t[i];if(s!=null){this.ft.add(i);let a=typeof s=="string"&&s.endsWith(Vs);i.includes("-")||a?e.setProperty(i,a?s.slice(0,-11):s,a?Ni:""):e[i]=s}}return G}});var Di=Pt`
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
    max-width: 100%;
    box-sizing: border-box;
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
`;var Gs={play:A`<path d="M8.2 5.4c0-.7.8-1.1 1.4-.7l9.1 5.8c.6.4.6 1.3 0 1.7l-9.1 6.1c-.6.4-1.4 0-1.4-.7V5.4z" fill="currentColor"/>`,pause:A`<rect x="7" y="5.6" width="3.6" height="12.8" rx="1.2" fill="currentColor"/><rect x="13.4" y="5.6" width="3.6" height="12.8" rx="1.2" fill="currentColor"/>`,previous:A`<path d="M7 6.2v11.6" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><path d="M17.6 6.6c0-.6-.7-1-1.2-.6l-7.1 5.2c-.5.4-.5 1.2 0 1.6l7.1 5.2c.5.4 1.2 0 1.2-.6V6.6z" fill="currentColor"/>`,next:A`<path d="M17 6.2v11.6" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><path d="M6.4 6.6c0-.6.7-1 1.2-.6l7.1 5.2c.5.4.5 1.2 0 1.6l-7.1 5.2c-.5.4-1.2 0-1.2-.6V6.6z" fill="currentColor"/>`,shuffle:A`<path d="M4.5 7.2h3.2c1 0 1.9.5 2.5 1.3l4 5.4c.6.8 1.5 1.3 2.5 1.3h3.1" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M4.5 16.8h3.2c1 0 1.9-.5 2.5-1.3l4-5.4c.6-.8 1.5-1.3 2.5-1.3h3.1" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M16.2 4.6l3 2.6-3 2.6M16.2 12.6l3 2.6-3 2.6" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/>`,repeat:A`<path d="M6.4 9.1V8.3c0-1.5 1.2-2.7 2.7-2.7h8.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M17.8 5.6l-2.3-2.2M17.8 5.6l-2.3 2.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M17.6 14.9v.8c0 1.5-1.2 2.7-2.7 2.7H6.7" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M6.2 18.4l2.3 2.2M6.2 18.4l2.3-2.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/>`,repeatOne:A`<path d="M6.4 9.1V8.3c0-1.5 1.2-2.7 2.7-2.7h8.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M17.8 5.6l-2.3-2.2M17.8 5.6l-2.3 2.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M17.6 14.9v.8c0 1.5-1.2 2.7-2.7 2.7H6.7" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M6.2 18.4l2.3 2.2M6.2 18.4l2.3-2.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M11.2 9.3l1.1-.8v6.1" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M10.6 14.6h3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>`,volume:A`<path d="M4.6 9.4h2.7l3.4-2.9c.5-.4 1.2 0 1.2.6v9.8c0 .6-.7 1-1.2.6L7.3 14.6H4.6c-.6 0-1-.4-1-1v-3.2c0-.6.4-1 1-1z" fill="currentColor"/><path d="M15.4 8.6c1.6 1 1.6 5.8 0 6.8" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M17.6 6.4c2.9 2 2.9 9.2 0 11.2" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/>`,mute:A`<path d="M4.6 9.4h2.7l3.4-2.9c.5-.4 1.2 0 1.2.6v9.8c0 .6-.7 1-1.2.6L7.3 14.6H4.6c-.6 0-1-.4-1-1v-3.2c0-.6.4-1 1-1z" fill="currentColor"/><path d="M15.2 9.6l4.6 4.8M19.8 9.6l-4.6 4.8" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/>`,power:A`<path d="M12 4.2v7" stroke="currentColor" stroke-width="1.9" fill="none" stroke-linecap="round"/><path d="M7.6 6.6a6.9 6.9 0 1 0 8.8 0" stroke="currentColor" stroke-width="1.9" fill="none" stroke-linecap="round"/>`,more:A`<circle cx="6.4" cy="12" r="1.55" fill="currentColor"/><circle cx="12" cy="12" r="1.55" fill="currentColor"/><circle cx="17.6" cy="12" r="1.55" fill="currentColor"/>`,library:A`<rect x="4.4" y="4.4" width="6.4" height="6.4" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.7"/><rect x="13.2" y="4.4" width="6.4" height="6.4" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.7"/><rect x="4.4" y="13.2" width="6.4" height="6.4" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.7"/><rect x="13.2" y="13.2" width="6.4" height="6.4" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.7"/>`,queue:A`<path d="M5 7.2h10M5 11.4h7.4M5 15.6h5.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M15.6 12.4c0-.5.5-.8.9-.5l4 2.3c.4.2.4.8 0 1l-4 2.6c-.4.3-.9 0-.9-.5v-5.4z" fill="currentColor"/>`,chevronLeft:A`<path d="M14.6 6l-5.4 6 5.4 6" stroke="currentColor" stroke-width="1.9" fill="none" stroke-linecap="round"/>`,close:A`<path d="M7 7l10 10M17 7L7 17" stroke="currentColor" stroke-width="1.9" fill="none" stroke-linecap="round"/>`,music:A`<path d="M14.5 5.2l4.6-1v9.1a3 3 0 1 1-1.8-2.7V7.1l-2.8.6v7.7a3 3 0 1 1-1.8-2.7V5.2z" fill="currentColor"/>`,group:A`<circle cx="9" cy="9.3" r="3.2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3.8 18.4c0-2.7 2.3-4.6 5.2-4.6s5.2 1.9 5.2 4.6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M16.2 6.4a3 3 0 0 1 0 5.9M18.6 18.4c0-2-1-3.6-2.6-4.3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>`,chevronRight:A`<path d="M9.4 6l5.4 6-5.4 6" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>`,playlist:A`<path d="M4 6.6h10.2M4 11h10.2M4 15.4h6.4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M16.4 11.8l4 2.35-4 2.35z" fill="currentColor"/>`,external:A`<path d="M13.2 5.4h5.4v5.4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M18.2 5.8l-7 7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M11 6.6H7.2c-1 0-1.8.8-1.8 1.8v8.4c0 1 .8 1.8 1.8 1.8h8.4c1 0 1.8-.8 1.8-1.8V14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>`,folder:A`<path d="M3.6 7.2c0-1 .8-1.8 1.8-1.8h3.4l1.8 2.2h9.8c1 0 1.8.8 1.8 1.8v7.4c0 1-.8 1.8-1.8 1.8H5.4c-1 0-1.8-.8-1.8-1.8V7.2z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>`,check:A`<path d="M6 12.6l4.2 4.2 7.8-9" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>`,lyrics:A`<path d="M4.5 6.4h8.4M4.5 10.2h6.2M4.5 14h7.2" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/><circle cx="16.2" cy="14.2" r="2.2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M18.4 14.2V7.1l2.4-.6v7.7" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>`};function k(r,t=18){let e=Gs[r];return e?A`<svg viewBox="0 0 24 24" width=${t} height=${t} aria-hidden="true" focusable="false">${e}</svg>`:b}var Ui="1.8.1",Ii="ha-music",Fi="HA Music",T={PAUSE:1,SEEK:2,VOLUME_SET:4,VOLUME_MUTE:8,PREVIOUS_TRACK:16,NEXT_TRACK:32,TURN_ON:128,TURN_OFF:256,PLAY_MEDIA:512,VOLUME_STEP:1024,SELECT_SOURCE:2048,STOP:4096,CLEAR_PLAYLIST:8192,PLAY:16384,SHUFFLE_SET:32768,SELECT_SOUND_MODE:65536,BROWSE_MEDIA:131072,REPEAT_SET:262144,GROUPING:524288,SELECT:1048576};var W="aurora";var Ne={auto:{en:"Auto (QQ \u2192 NetEase \u2192 LRCLIB \u2192 Lyrics.ovh)",zh:"\u81EA\u52A8\uFF08QQ/\u7F51\u6613\u4E91 \u2192 LRCLIB \u2192 Lyrics.ovh\uFF09"},qq:{en:"QQ Music",zh:"QQ \u97F3\u4E50"},wy:{en:"NetEase Cloud Music",zh:"\u7F51\u6613\u4E91\u97F3\u4E50"},lrclib:{en:"LRCLIB (online synced lyrics)",zh:"LRCLIB\uFF08\u5728\u7EBF\u540C\u6B65\u6B4C\u8BCD\uFF09"}},De="auto",Oe={adaptive:{en:"Adaptive",zh:"\u81EA\u9002\u5E94"},full:{en:"Full",zh:"\u5B8C\u6574"},compact:{en:"Compact",zh:"\u7D27\u51D1"},mini:{en:"Mini",zh:"\u8FF7\u4F60"}},Ue={ambient:{en:"Ambient blur",zh:"\u73AF\u5883\u6A21\u7CCA"},art:{en:"Cover fill",zh:"\u5C01\u9762\u94FA\u6EE1"},palette:{en:"Palette only",zh:"\u7EAF\u8272\u5F69"},none:{en:"Plain",zh:"\u65E0\u80CC\u666F"}},Ie={bars:{en:"Live spectrum",zh:"\u5B9E\u65F6\u9891\u8C31"},wave:{en:"Wave",zh:"\u6CE2\u5F62"},orbit:{en:"Orbit",zh:"\u5149\u73AF"},none:{en:"Off",zh:"\u5173\u95ED"}},z={aurora:{label:{en:"Aurora",zh:"\u6781\u5149"},accent:["#2ee6c5","#7b5cff"],base:"#050a12",glow:1,grid:!1},cyber:{label:{en:"Cyberpunk",zh:"\u8D5B\u535A\u670B\u514B"},accent:["#ff2fd0","#22e6ff"],base:"#08030f",glow:1.4,grid:!0},liquid:{label:{en:"Liquid Glass",zh:"\u6DB2\u6001\u73BB\u7483"},accent:["#a9d8ff","#cdb6ff"],base:"#090c16",glow:.8,grid:!1,glass:!0},velvet:{label:{en:"Velvet",zh:"\u5929\u9E45\u7ED2"},accent:["#ff7a9c","#a86bff"],base:"#0d050c",glow:1.15,grid:!1},mono:{label:{en:"Monochrome",zh:"\u9ED1\u767D"},accent:["#e9ecf5","#8d95a8"],base:"#08090c",glow:.4,grid:!1},sunset:{label:{en:"Sunset",zh:"\u65E5\u843D"},accent:["#ffa45c","#ff4d8d"],base:"#120806",glow:1.1,grid:!1},ocean:{label:{en:"Ocean",zh:"\u6D77\u6D0B"},accent:["#39d0ff","#2f7bff"],base:"#04101c",glow:.9,grid:!1}},Oi={play:"Play",pause:"Pause",playing:"Now playing",paused:"Paused",idle:"Standby",off:"Off",buffering:"Buffering",previous:"Previous track",next:"Next track",volume:"Volume",mute:"Mute",unmute:"Unmute",shuffle:"Shuffle",repeat:"Repeat",repeatAll:"Repeat all",repeatOne:"Repeat one",repeatOff:"Repeat off",source:"Source",soundMode:"Sound mode",queue:"Queue",library:"Library",assistant:"Music Assistant",playlists:"Playlists",playlistsEmpty:"No playlists found",playlistEmpty:"This playlist is empty or unavailable in Music Assistant",maPlayerRequired:"Playlists need a Music Assistant player",playlistUnavailable:"Unavailable",playingPlaylist:"Playing",openAssistant:"Open Music Assistant",more:"More info",power:"Power",group:"Group",groupLeave:"Leave group",loading:"Loading\u2026",queueEmpty:"Queue is empty",browseFailed:"Media library is unavailable",noMedia:"Nothing is playing",unknownArtist:"Unknown artist",noTitle:"No title",close:"Close",back:"Back",track:"Track",album:"Album",volumeEntityMissing:"Volume entity unavailable",seek:"Seek",remaining:"Toggle remaining time",lyrics:"Lyrics",lyricsLoading:"Matching lyrics\u2026",lyricsNone:"No lyrics found",lyricsError:"Lyrics unavailable",lyricsRetry:"Retry",lyricsOffset:"Lyric timing offset",lyricsInstrumental:"Instrumental \xB7 no lyrics"},Ys={play:"\u64AD\u653E",pause:"\u6682\u505C",playing:"\u6B63\u5728\u64AD\u653E",paused:"\u5DF2\u6682\u505C",idle:"\u5F85\u673A",off:"\u5DF2\u5173\u95ED",buffering:"\u7F13\u51B2\u4E2D",previous:"\u4E0A\u4E00\u9996",next:"\u4E0B\u4E00\u9996",volume:"\u97F3\u91CF",mute:"\u9759\u97F3",unmute:"\u53D6\u6D88\u9759\u97F3",shuffle:"\u968F\u673A\u64AD\u653E",repeat:"\u5FAA\u73AF",repeatAll:"\u5217\u8868\u5FAA\u73AF",repeatOne:"\u5355\u66F2\u5FAA\u73AF",repeatOff:"\u5173\u95ED\u5FAA\u73AF",source:"\u97F3\u6E90",soundMode:"\u58F0\u97F3\u6A21\u5F0F",queue:"\u64AD\u653E\u961F\u5217",library:"\u5A92\u4F53\u5E93",assistant:"Music Assistant",playlists:"\u64AD\u653E\u5217\u8868",playlistsEmpty:"\u6CA1\u6709\u627E\u5230\u64AD\u653E\u5217\u8868",playlistEmpty:"\u8BE5\u6B4C\u5355\u4E3A\u7A7A\u6216\u66F2\u76EE\u5728 Music Assistant \u4E2D\u4E0D\u53EF\u7528",maPlayerRequired:"\u5F53\u524D\u64AD\u653E\u5668\u4E0D\u662F Music Assistant \u64AD\u653E\u5668\uFF0C\u8BF7\u5148\u5207\u6362\u5230 MA \u64AD\u653E\u5668",playlistUnavailable:"\u4E0D\u53EF\u7528",playingPlaylist:"\u5F00\u59CB\u64AD\u653E",openAssistant:"\u6253\u5F00 Music Assistant",more:"\u66F4\u591A\u4FE1\u606F",power:"\u5F00\u5173",group:"\u5206\u7EC4",groupLeave:"\u9000\u51FA\u5206\u7EC4",loading:"\u52A0\u8F7D\u4E2D\u2026",queueEmpty:"\u64AD\u653E\u961F\u5217\u4E3A\u7A7A",browseFailed:"\u5A92\u4F53\u5E93\u6682\u4E0D\u53EF\u7528",noMedia:"\u5F53\u524D\u6CA1\u6709\u64AD\u653E\u5185\u5BB9",unknownArtist:"\u672A\u77E5\u827A\u672F\u5BB6",noTitle:"\u672A\u77E5\u66F2\u76EE",close:"\u5173\u95ED",back:"\u8FD4\u56DE",track:"\u66F2\u76EE",album:"\u4E13\u8F91",volumeEntityMissing:"\u97F3\u91CF\u5B9E\u4F53\u4E0D\u53EF\u7528",seek:"\u8FDB\u5EA6",remaining:"\u5207\u6362\u5269\u4F59\u65F6\u95F4",lyrics:"\u6B4C\u8BCD",lyricsLoading:"\u6B63\u5728\u5339\u914D\u6B4C\u8BCD\u2026",lyricsNone:"\u672A\u627E\u5230\u6B4C\u8BCD",lyricsError:"\u6B4C\u8BCD\u6682\u4E0D\u53EF\u7528",lyricsRetry:"\u91CD\u8BD5",lyricsOffset:"\u6B4C\u8BCD\u65F6\u95F4\u504F\u79FB",lyricsInstrumental:"\u7EAF\u97F3\u4E50 \xB7 \u65E0\u6B4C\u8BCD"};function te(r){return/^zh/i.test(r||"")}function N(r){let t=te(r)?Ys:Oi;return e=>t[e]??Oi[e]??e}var Ws={playlist:{en:"Playlist",zh:"\u64AD\u653E\u5217\u8868"},album:{en:"Album",zh:"\u4E13\u8F91"},artist:{en:"Artist",zh:"\u827A\u672F\u5BB6"},track:{en:"Track",zh:"\u66F2\u76EE"},music:{en:"Music",zh:"\u97F3\u4E50"},video:{en:"Video",zh:"\u89C6\u9891"},directory:{en:"Folder",zh:"\u6587\u4EF6\u5939"},image:{en:"Image",zh:"\u56FE\u7247"},url:{en:"Link",zh:"\u94FE\u63A5"},app:{en:"App",zh:"\u5E94\u7528"},genre:{en:"Genre",zh:"\u98CE\u683C"}};function Fe(r,t){if(!r)return"";let e=Ws[String(r).toLowerCase()];return e?te(t)?e.zh:e.en:r}var x=(r,t,e)=>Math.min(e,Math.max(t,r));function Dt(r,t="--:--"){if(!Number.isFinite(r)||r<0)return t;let e=Math.round(r),i=Math.floor(e/3600),s=Math.floor(e%3600/60),a=e%60;return i>0?`${i}:${String(s).padStart(2,"0")}:${String(a).padStart(2,"0")}`:`${s}:${String(a).padStart(2,"0")}`}function U(r){let t=String(r??""),e=2166136261;for(let i=0;i<t.length;i+=1)e^=t.charCodeAt(i),e=Math.imul(e,16777619);return e>>>0}function ie(r={}){let t=[r.title,r.artist,r.album].filter(Boolean).join("|")||"ha-music",e=U(t),i=1.7+(e>>>8)%90/100,s=e%360/360*Math.PI*2,a=Number.isFinite(r.position)&&r.position>0?r.position:0,n=a/i*Math.PI*2+s;return{seed:t,hash:e,period:i,phase:s,position:a,pulse:.5+.5*Math.sin(n),low:.5+.5*Math.sin(n+.55),energy:.55+(e>>>16)%100/220}}function Qs(r){return U(r)%360}var Xs=/^([a-z0-9-_.]+\.(stream\.qqmusic\.qq\.com|qqmusic\.qq\.com)|aqqmusic\.tc\.qq\.com|[a-z0-9-_.]+\.music\.126\.net)$/i;function Bi(r,t=""){if(!r)return!1;if(/^(data|blob):/i.test(r))return!0;try{let e=t||(typeof location<"u"?location.href:"http://local/"),i=new URL(e,"http://local/"),s=new URL(r,i.href);return s.protocol!=="http:"&&s.protocol!=="https:"||i.protocol==="https:"&&s.protocol==="http:"?!1:s.origin===i.origin?!0:Xs.test(s.hostname)}catch{return!1}}function ee(r){return String(r??"").normalize("NFKC").toLowerCase().replace(/\([^)]*\)|\[[^\]]*\]|【[^】]*】|（[^）]*）/g," ").replace(/\b(feat|ft|featuring)\b\.?/g," ").replace(/[^\p{L}\p{N}]+/gu," ").trim().replace(/\s+/g," ")}function He(r){return(Array.isArray(r)?r:r?.tracks||r?.audios||r?.songs||r?.list||[]).map(e=>{let i=e?.artist??e?.author??e?.singer??"",s=Array.isArray(i)?i.filter(Boolean).join(" "):i;return{mid:String(e?.mid||e?.songmid||e?.songMid||"").trim(),name:String(e?.name||e?.title||"").trim(),artist:String(s).trim(),url:String(e?.url||e?.src||"").trim(),duration:Number(e?.duration??0)||0,cover:String(e?.cover||e?.pic||e?.image||"").trim()}}).filter(e=>e.url)}function Js(r={}){let t=String(r.contentId||r.media_content_id||r.content_id||""),e=t.match(/track\/([0-9A-Za-z]+)/)||t.match(/id=([0-9A-Za-z]+)/);return e?e[1]:""}function Zs(r,t={}){if(!r?.url)return 0;let e=Js(t);if(e&&r.mid&&e===r.mid)return 1;let i=ee(t.title||t.media_title||""),s=ee(t.artist||t.media_artist||""),a=ee(r.name||r.title||""),n=ee(r.artist||"");if(!a)return 0;let o=0;if(i&&a===i)o=.9;else if(i&&(a.startsWith(i)||i.startsWith(a)))o=.78;else if(i){let l=i.split(" ").filter(Boolean),c=new Set(a.split(" ").filter(Boolean)),d=l.filter(u=>c.has(u)).length,h=l.length?d/l.length:0;h>=.8?o=.68:h>=.5&&(o=.5)}return s&&n&&(s===n?o+=.1:n.includes(s)||s.includes(n)?o+=.06:o-=.08),x(o,0,1)}function Hi(r,t={}){let e=Array.isArray(r)?r:He(r),i=null,s=0;for(let a of e){let n=Zs(a,t);n>s&&(i=a,s=n)}return s>=.66?i:null}function L(r,t){let e=Number(r?.attributes?.supported_features??0);return!Number.isFinite(e)||!t?!1:(e&t)===t}function tr(r,t){if(!(!r||!t))return r.states?r.states[t]:void 0}function er(r,t=[],e=""){let i=Array.isArray(t)?t.filter(Boolean):[];if(!i.length)return"";let s=i.includes(e),a=s?e:"",n=d=>{let h=r?.states?.[d]?.state;return h==="playing"?2:h==="buffering"?1:0};if(s&&n(a)===2)return a;let o=a||i[0],l=a?n(a):0,c=-1/0;for(let d of i){let h=n(d);if(h<=0)continue;let u=Date.parse(r?.states?.[d]?.attributes?.media_position_updated_at||""),p=Number.isFinite(u)?u:0;(h>l||h===l&&p>c)&&(o=d,l=h,c=p)}return l>0?o:a}function ji(r,t=[],e="",i=null){let s=Array.isArray(t)?t.filter(Boolean):[];if(s.length<2)return"";let a=er(r,s,e);if(!a||a===e)return"";let n=r?.states?.[a]?.state;return n!=="playing"&&n!=="buffering"||i&&i[a]===n?"":a}function se(r,t,e=""){return tr(r,t)?.attributes?.friendly_name||t||e}function bt(r){let t=r?.attributes??{},e=t.media_metadata??{},i=Number(t.media_duration??e.duration??0),s=Number(t.media_position??0),a=t.media_position_updated_at;if(r?.state==="playing"&&a){let n=(Date.now()-new Date(a).getTime())/1e3;Number.isFinite(n)&&n>0&&(s+=n)}return Number.isFinite(i)&&i>0?s=x(s,0,i):(!Number.isFinite(s)||s<0)&&(s=0),{title:t.media_title||e.title||"",artist:t.media_artist||e.artist||t.media_album_artist||e.album_artist||"",album:t.media_album_name||e.album_name||"",series:t.media_series_title||e.series_title||"",track:t.media_track??e.track_number??"",duration:Number.isFinite(i)?i:0,position:Number.isFinite(s)?s:0,art:e.entity_picture||e.image_url||t.entity_picture||t.media_image_url||"",appName:t.app_name||"",source:t.source||"",soundMode:t.sound_mode||"",shuffle:!!t.shuffle,repeat:t.repeat||"off",volume:Number.isFinite(Number(t.volume_level))?Number(t.volume_level):null,muted:!!t.is_volume_muted,groupMembers:Array.isArray(t.group_members)?t.group_members:[]}}function je(r,t=60){let e=r?.attributes?.queue;return Array.isArray(e)?e.slice(0,t).map((i,s)=>({index:s,title:i.title||i.name||i.media_title||"",artist:i.artist||i.subtitle||i.media_artist||"",album:i.album||i.album_name||"",duration:Number(i.duration??i.media_duration??0)||0,art:i.entity_picture||i.thumbnail||i.artwork||"",contentId:i.media_content_id||i.content_id||"",contentType:i.media_content_type||i.content_type||"",active:!!(i.active||i.is_active||i.current||i.playing)})):[]}function Z(r,t){return t?/^(https?:|data:|blob:)/.test(t)?t:r?.hassUrl?r.hassUrl(t):t:""}var Be=new Map;async function re(r,t,e){if(!t)return"";let i=/^http:\/\//i.test(t),s=typeof window<"u"&&window.location?.protocol==="https:";if(!i||!s||!e||!r?.fetchWithAuth)return Z(r,t);let a=`/api/media_player_proxy/${encodeURIComponent(e)}?v=${U(t)}`;if(Be.has(a))return Be.get(a);try{let n=await r.fetchWithAuth(a);if(!n?.ok)throw new Error(`cover proxy ${n?.status}`);let o=await n.blob(),l=URL.createObjectURL(o);return Be.set(a,l),l}catch{return""}}function ct(r,t,e){let i=t/100,s=e/100,a=(1-Math.abs(2*s-1))*i,n=(r%360+360)%360/60,o=a*(1-Math.abs(n%2-1)),l=[0,0,0];n<1?l=[a,o,0]:n<2?l=[o,a,0]:n<3?l=[0,a,o]:n<4?l=[0,o,a]:n<5?l=[o,0,a]:l=[a,0,o];let c=s-a/2;return l.map(d=>Math.round(x((d+c)*255,0,255)))}function Ki(r){let t=Qs(r),e=(t+42+U(r+"2")%40)%360,i=ct(t,72,58),s=ct(e,68,52);return{a1:`hsl(${t} 72% 58%)`,a2:`hsl(${e} 68% 52%)`,rgb1:i.join(","),rgb2:s.join(",")}}function Vi(r){let t=String(r).replace("#","").trim(),e=t.length===3?t.split("").map(i=>i+i).join(""):t;return/^[0-9a-f]{6}$/i.test(e)?[parseInt(e.slice(0,2),16),parseInt(e.slice(2,4),16),parseInt(e.slice(4,6),16)].join(","):null}function D(r,t="255,255,255"){let e=String(r||"").trim();if(/^#[0-9a-f]{3,8}$/i.test(e))return Vi(e.slice(0,7))||t;let i=e.match(/hsla?\(\s*([\d.]+)[,\s]+([\d.]+)%[,\s]+([\d.]+)%/i);if(i)return ct(Number(i[1]),Number(i[2]),Number(i[3])).join(",");let s=e.match(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/i);return s?`${s[1]},${s[2]},${s[3]}`:t}function Ke(r){let t=Vi(r);if(!t)return{h:0,s:0,l:50};let[e,i,s]=t.split(",").map(h=>Number(h)/255),a=Math.max(e,i,s),n=Math.min(e,i,s),o=(a+n)/2,l=a-n,c=0,d=0;return l!==0&&(d=l/(1-Math.abs(2*o-1)),a===e?c=(i-s)/l%6:a===i?c=(s-e)/l+2:c=(e-i)/l+4,c=(c*60+360)%360),{h:c,s:d*100,l:o*100}}function Ve(r,t,e=.5){let i=(t.h-r.h+540)%360-180,s=(r.h+i*e+360)%360,a=r.s+(t.s-r.s)*e,n=r.l+(t.l-r.l)*e;return{h:s,s:a,l:n,css:`hsl(${Math.round(s)} ${Math.round(x(a,25,92))}% ${Math.round(x(n,38,72))}%)`,rgb:ct(s,x(a,25,92),x(n,38,72)).join(",")}}var Ot=new Map,ir=40;function sr(r,t){let i=document.createElement("canvas");i.width=36,i.height=36;let s=i.getContext("2d",{willReadFrequently:!0});if(!s)return null;s.drawImage(r,0,0,36,36);let a=s.getImageData(0,0,36,36).data,n=new Map;for(let y=0;y<a.length;y+=4){if(a[y+3]<180)continue;let S=a[y],P=a[y+1],w=a[y+2],M=Math.max(S,P,w),E=Math.min(S,P,w),C=(M+E)/510,R=M===0?0:(M-E)/M;if(C<.12||C>.9||R<.14)continue;let q=0,O=M-E;O!==0&&(M===S?q=(P-w)/O%6:M===P?q=(w-S)/O+2:q=(S-P)/O+4,q=(q*60+360)%360);let rt=Math.floor(q/18),K=n.get(rt)||{count:0,sat:0,light:0};K.count+=1,K.sat+=R,K.light+=C,n.set(rt,K)}if(!n.size)return null;let o=[...n.entries()].map(([y,v])=>({hue:y*18+9,score:v.count*(.45+v.sat/v.count),sat:v.sat/v.count,light:v.light/v.count})).sort((y,v)=>v.score-y.score),l=o[0],c=o.find(y=>{let v=Math.abs(y.hue-l.hue);return Math.min(v,360-v)>28})||{hue:(l.hue+44)%360,sat:l.sat,light:l.light},d=y=>x(Math.round(y*100),42,88),h=Math.round(l.hue),u=Math.round(c.hue),p=d(l.sat+.08),m=d(c.sat+.05),f=x(Math.round(l.light*100)+12,46,66),_=x(Math.round(c.light*100)+8,40,60);return{a1:`hsl(${h} ${p}% ${f}%)`,a2:`hsl(${u} ${m}% ${_}%)`,rgb1:ct(h,p,f).join(","),rgb2:ct(u,m,_).join(","),h1:h,s1:p,l1:f,h2:u,s2:m,l2:_,seed:U(t||"")}}function Gi(r,t=""){if(!r)return Promise.resolve(null);if(Ot.has(r))return Ot.get(r);let e=new Promise(i=>{let s=new Image;s.crossOrigin="anonymous",s.decoding="async",s.onload=()=>{try{i(sr(s,t))}catch{i(null)}},s.onerror=()=>i(null),s.src=r});return Ot.size>ir&&Ot.clear(),Ot.set(r,e),e}var Yi=new WeakMap;function rr(){return typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches}function Qi(r){r.raf&&(window.cancelAnimationFrame(r.raf),r.raf=null),r.last=0}function Wi(r,t){if(t.raf)return;r.style.transition="none",r.style.willChange="transform",t.last=0;let e=i=>{if(!r.isConnected){t.raf=null;return}t.last||(t.last=i);let s=Math.min(.1,(i-t.last)/1e3);t.last=i,t.angle=(t.angle+s*360/(16e3/1e3))%360,r.style.transform=`rotate(${t.angle}deg)`,t.raf=window.requestAnimationFrame(e)};t.raf=window.requestAnimationFrame(e)}function ar(r,t){if(Qi(t),t.resetTimer&&(window.clearTimeout(t.resetTimer),t.resetTimer=null),!r.isConnected)return;if(!t.angle){r.style.transform="rotate(0deg)";return}let e=t.angle;r.style.transition="none",r.style.transform=`rotate(${e}deg)`,window.requestAnimationFrame(()=>{!r.isConnected||t.playing||(r.style.transition="transform 1.15s cubic-bezier(0.22, 1, 0.36, 1)",r.style.transform="rotate(0deg)",t.resetTimer=window.setTimeout(()=>{t.resetTimer=null,t.playing||(r.style.transition="none",r.style.willChange="auto",r.style.transform="rotate(0deg)")},1250))}),t.angle=0}function _t(r,t){if(!r)return;let e=Yi.get(r);if(e||(e={angle:0,playing:!1,raf:null,last:0,resetTimer:null},Yi.set(r,e)),rr()){Qi(e),r.style.transition="none",r.style.willChange="auto",r.style.transform="rotate(0deg)",e.playing=!1;return}let i=!!t;if(e.playing===i){i&&Wi(r,e);return}e.playing=i,i?(e.resetTimer&&(window.clearTimeout(e.resetTimer),e.resetTimer=null),Wi(r,e)):ar(r,e)}var ht=104,yt=36,ae=yt/2,xt=Math.min(2,typeof window>"u"?1:window.devicePixelRatio||1),dt=new WeakMap,ne=["#7b5cff","#2ee6c5"];function oe(r){let t=String(r||"").replace("#","");return t.length===3?[0,1,2].map(e=>parseInt(t[e]+t[e],16)):t.length===6?[0,2,4].map(e=>parseInt(t.slice(e,e+2),16)):[123,92,255]}function nr(r,t,e){let i=oe(r),s=oe(t);return i.map((a,n)=>Math.round(a+(s[n]-a)*e))}function Xi(r,t){let[e,i,s]=r;return`rgba(${e}, ${i}, ${s}, ${t})`}function or(r,t,e){let i=dt.get(r);if(!i?.ctx)return;let{ctx:s}=i;s.setTransform(xt,0,0,xt,0,0),s.clearRect(0,0,ht,ht);let a=ht/2,n=33.5,o=a-n-3,l=i.accent||ne;s.lineCap="round",s.shadowBlur=5+e*7;for(let c=0;c<yt;c+=1){let d=x(t[c]||0,0,1),h=c/yt*Math.PI*2-Math.PI/2,u=2.2+Math.pow(d,1.05)*o,p=Math.cos(h),m=Math.sin(h),f=Math.abs(c-ae)/ae,_=nr(l[0],l[1],f),y=.5+d*.48;s.strokeStyle=Xi(_,y),s.shadowColor=Xi(_,.12+e*.26),s.lineWidth=3,s.beginPath(),s.moveTo(a+p*n,a+m*n),s.lineTo(a+p*(n+u),a+m*(n+u)),s.stroke();let v=x((f-.3)/.45,0,1);v>.01&&(s.shadowBlur=0,s.strokeStyle=`rgba(255, 255, 255, ${((.05+d*.24)*v).toFixed(2)})`,s.lineWidth=1.1,s.stroke(),s.shadowBlur=5+e*7)}s.shadowBlur=0,s.shadowColor="transparent"}function Ji(r){let t=dt.get(r);t?.ctx&&(t.ctx.setTransform(xt,0,0,xt,0,0),t.ctx.clearRect(0,0,ht,ht))}function Ge(r,t,e,i){if(!r?.style)return;r.style.setProperty("--fab-beat",t.toFixed(4)),r.style.setProperty("--fab-beat-glow",e.toFixed(3));let s=r.querySelector?.(".fab-disc");if(s){let a=i||ne,[n,o,l]=oe(a[0]),[c,d,h]=oe(a[1]);s.style.boxShadow=["0 10px 26px rgba(2, 6, 18, 0.46)",`0 0 26px rgba(${n}, ${o}, ${l}, ${(e*.92).toFixed(3)})`,`0 0 52px rgba(${c}, ${d}, ${h}, ${(e*.55).toFixed(3)})`].join(", ")}}function Zi(r,t){let e=dt.get(r);if(!e||(e.raf=0,!e.playing||!e.visible))return;if(!r.isConnected){e.playing=!1;return}let i=e.position+Math.max(0,t-e.since)/1e3,s=i/e.period*Math.PI*2+e.phase,a=.5+.5*Math.sin(s),n=.5+.5*Math.sin(s+.55),o=Math.pow(.5+.5*Math.sin(s*2.15+e.phase*1.7),3),l=[];for(let h=0;h<ae;h+=1){let u=h/(ae-1),p=Math.pow(1-u,1.05),m=Math.sin(i*(4.6+e.hash%9*.25)+h*1.1+e.phase),f=Math.sin(i*(11.4+e.hash%5*.4)+h*2.3),_=(.16+.68*p)*(.62+.38*(.5+.5*m)),y=.18*o*Math.pow(1-u,2.2),v=x(_*(.55+.45*(.5+.5*f))+y+.04*e.energy,0,1);l[h]=v,l[yt-1-h]=v}for(let h=0;h<yt;h+=1){let u=e.smooth[h]||0,p=l[h]||0;e.smooth[h]=p>u?u+(p-u)*.72:u+(p-u)*.24}let c=Math.min(1,n*1.05+o*.4);or(r,e.smooth,c);let d=1+Math.min(.085,n*.05+o*.05);Ge(e.root,d,.16+Math.min(.46,n*.5+o*.26),e.accent),e.raf=requestAnimationFrame(h=>Zi(r,h))}function lr(r,{clearNow:t=!1}={}){let e=dt.get(r);if(e){if(e.raf&&(cancelAnimationFrame(e.raf),e.raf=0),Ge(e.root,1,0),e.smooth.fill(0),t){Ji(r);return}e.clearTimer=window.setTimeout(()=>{let i=dt.get(r);i&&!i.playing&&Ji(r)},460)}}function ts(r,t,e={}){if(!r||typeof r.getContext!="function")return;let i=dt.get(r);if(!i){let d=r.getContext("2d");if(!d)return;r.width=Math.round(ht*xt),r.height=Math.round(ht*xt),i={ctx:d,root:t,playing:!1,visible:!0,position:0,lastPosition:null,since:0,hash:0,period:2,phase:0,energy:.6,accent:ne,smooth:new Array(yt).fill(0),raf:0,clearTimer:0},dt.set(r,i)}let s=Array.isArray(e.accent)&&e.accent.length>=2?[e.accent[0],e.accent[1]]:ne;i.accent=s,i.root=t,i.clearTimer&&(window.clearTimeout(i.clearTimer),i.clearTimer=0),i.root=t||i.root;let a=!!e.playing,n=e.visible!==!1,o=i.playing,l=Number(e.position);Number.isFinite(l)&&l>=0&&((i.lastPosition==null||Math.abs(l-i.lastPosition)>.25||!o&&a)&&(i.position=l,i.since=performance.now()),i.lastPosition=l);let c=[e.title,e.artist,e.album].filter(Boolean).join("|")||"ha-music";if(i.hash=U(c),i.period=1.7+(i.hash>>>8)%90/100,i.phase=i.hash%360/360*Math.PI*2,i.energy=.55+(i.hash>>>16)%100/220,i.playing=a,i.visible=n,!a||!n){lr(r,{clearNow:!n});return}i.raf||(Ge(i.root,1,0),i.since=performance.now(),i.raf=requestAnimationFrame(d=>Zi(r,d)))}var ce="haMusicMiniPlayer",ds="haMusicMiniPositions",vt=new Set(["top","sidebar","fab"]),We="ha-music-dock-pref-changed";function wt(r){return typeof r=="string"&&z[r]?r:W}function j(r){if(!r||typeof r!="object"||Array.isArray(r))return{};let t={};for(let e of vt)z[r[e]]&&(t[e]=r[e]);return t}function cr(r,t){if(!r)return;let e=wt(t);if(r.dataset.theme===e&&r.dataset.hmThemeReady==="1")return;let i=z[e];r.dataset.theme=e,r.style.setProperty("--hm-accent",i.accent[0]),r.style.setProperty("--hm-accent-2",i.accent[1]),r.style.setProperty("--hm-accent-rgb",D(i.accent[0],"46,230,197")),r.style.setProperty("--hm-accent-2-rgb",D(i.accent[1],"123,92,255")),r.style.setProperty("--hm-base-rgb",D(i.base,"5,10,18")),r.style.setProperty("--hm-glow",String(i.glow??1)),r.dataset.hmThemeReady="1"}function Qe(){try{let r=window.localStorage.getItem(ds);if(!r)return{};let t=JSON.parse(r);return t&&typeof t=="object"&&!Array.isArray(t)?t:{}}catch{return{}}}function Ye(r,t,e){if(vt.has(r))try{let i=Qe();i[r]={x:Number(t.toFixed(4)),y:Number(e.toFixed(4))},window.localStorage.setItem(ds,JSON.stringify(i))}catch{}}var es='<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path d="M14.5 5.2l4.6-1v9.1a3 3 0 1 1-1.8-2.7V7.1l-2.8.6v7.7a3 3 0 1 1-1.8-2.7V5.2z" fill="currentColor"/></svg>',is='<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" fill="currentColor"/></svg>',ss='<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false"><path d="M16 6h2v12h-2zM6 6l8.5 6L6 18z" fill="currentColor"/></svg>',le='<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>',hr='<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false"><path d="M6 5h4v14H6zM14 5h4v14h-4z" fill="currentColor"/></svg>';var dr='<svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true" focusable="false"><path d="M6.7 9.3L12 14.6l5.3-5.3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';var us=new Set(["HA-SIDEBAR","ASIDE"]);function tt(r,t=1,e=1){return!!(r&&r.width>=t&&r.height>=e&&r.bottom>0&&r.right>0)}function ps(r,t,e,i=0){if(!r||i>8)return;let s=r.querySelectorAll?r.querySelectorAll("*"):[];for(let a of s){try{t(a)&&e.push(a)}catch{}a.shadowRoot&&ps(a.shadowRoot,t,e,i+1)}}function et(r){let t=[];return ps(document,r,t),t}function ur(r){let t=et(i=>r.has(i.tagName)),e=null;for(let i of t){let s=i.getBoundingClientRect();tt(s,24,24)&&(!e||s.width*s.height>e.width*e.height)&&(e={left:s.left,top:s.top,width:s.width,height:s.height,right:s.right,bottom:s.bottom})}return e}function Ut(){let r=et(i=>{if(i.tagName==="BODY"||i.tagName==="HTML")return!1;let s=i.getBoundingClientRect();return!tt(s,200,36)||s.top>8||s.height>150?!1:i.classList?.contains("top-app-bar")||i.classList?.contains("app-header")||i.tagName==="HA-TOP-APP-BAR"||i.tagName==="HA-TOP-APP-BAR-FIXED"}),t=null;for(let i of r){let s=i.getBoundingClientRect();s.height>150||(!t||s.width*s.height>t.width*t.height)&&(t={left:s.left,top:s.top,width:s.width,height:s.height,right:s.right,bottom:s.bottom})}if(t)return t;let e=et(i=>{if(i.tagName==="BODY"||i.tagName==="HTML")return!1;let s=i.getBoundingClientRect();if(!tt(s,240,36)||s.top>8||s.height>92)return!1;let a=`${i.tagName} ${i.id} ${i.className||""}`.toLowerCase();return/top-app-bar|app-header|navbar|\bheader\b/.test(a)});for(let i of e){let s=i.getBoundingClientRect();if(s.height<=92)return{left:s.left,top:s.top,width:s.width,height:s.height,right:s.right,bottom:s.bottom}}return null}function he(r){if(!r)return null;let t=et(i=>{if(i.tagName==="BODY"||i.tagName==="HTML"||typeof i.getBoundingClientRect!="function")return!1;let s=i.getBoundingClientRect();if(!tt(s,16,16)||s.width>88||s.height>64||s.left<r.left-2||s.right>r.right+2||s.top<r.top-4||s.bottom>r.bottom+4)return!1;let a=[i.getAttribute?.("aria-label"),i.getAttribute?.("title"),i.getAttribute?.("icon"),i.id,i.className].filter(Boolean).join(" ").toLowerCase();return/remove|delete|close|unpin|关闭|删除/.test(a)?!1:/(mdi:(plus|add)|plus|add|create|添加|新增|新建)/.test(a)}),e=null;for(let i of t){let s=i.getBoundingClientRect(),a=s.width*s.height;(!e||a>e.area||a===e.area&&s.right>e.rect.right)&&(e={rect:s,area:a})}return e?.rect||null}function pr(r){if(!r)return null;let t=et(i=>{if(i.tagName==="BODY"||i.tagName==="HTML"||typeof i.getBoundingClientRect!="function")return!1;let s=i.getBoundingClientRect();if(!tt(s,16,16)||s.height>72||s.width>r.width+2||s.left<r.left-2||s.right>r.right+2||s.top<r.top||s.bottom>r.bottom+2||s.top<r.top+r.height*.45)return!1;let a=[i.getAttribute?.("aria-label"),i.getAttribute?.("title"),i.getAttribute?.("icon"),i.id,i.className].filter(Boolean).join(" ").toLowerCase();return/remove|delete|close|关闭|删除/.test(a)?!1:/(settings|设置|cog|gear)/.test(a)}),e=null;for(let i of t){let s=i.getBoundingClientRect();(!e||s.top>e.top)&&(e={top:s.top,rect:s})}return e?.rect||null}function ms(){let r=ur(us);if(r)return r;let t=et(i=>{if(i.tagName==="BODY"||i.tagName==="HTML")return!1;let s=i.getBoundingClientRect();if(!tt(s,40,240)||s.left>8)return!1;let a=`${i.tagName} ${i.id} ${i.className||""}`.toLowerCase();return/sidebar|navigation|nav-drawer/.test(a)}),e=null;for(let i of t){let s=i.getBoundingClientRect();(!e||s.height>e.height)&&(e={left:s.left,top:s.top,width:s.width,height:s.height,right:s.right,bottom:s.bottom})}return e}function rs(){let r=et(e=>{if(e.tagName==="BODY"||e.tagName==="HTML")return!1;let i=e.getBoundingClientRect();return!tt(i,200,36)||i.top>8||i.height>150?!1:e.classList?.contains("top-app-bar")||e.classList?.contains("app-header")||e.tagName==="HA-TOP-APP-BAR"||e.tagName==="HA-TOP-APP-BAR-FIXED"}),t=null;for(let e of r){let i=e.getBoundingClientRect();i.height>150||(!t||i.width*i.height>t.area)&&(t={node:e,area:i.width*i.height})}return t?.node||null}function as(){let r=et(e=>us.has(e.tagName)),t=null;for(let e of r){let i=e.getBoundingClientRect();tt(i,24,120)&&(!t||i.height>t.height)&&(t={node:e,height:i.height})}return t?.node||null}function ns(r){let t=Math.round(window.innerWidth||0),e=Math.round(window.innerHeight||0);if(r==="top"){let i=Ut(),s=i?.height||56,a=i?.top||0;return{left:i?.left||0,top:a,width:i?.width||t,height:Math.max(40,Math.min(72,s)),right:(i?.left||0)+(i?.width||t),bottom:a+Math.max(40,Math.min(72,s))}}if(r==="sidebar"){let i=ms();if(i)return i;let s=Ut()?.height||56;return{left:0,top:s,width:256,height:Math.max(240,e-s),right:256,bottom:e}}return null}var de=12;function Xe(){let r=Math.round(window.innerWidth||0),t=Math.round(window.innerHeight||0),e=Ut(),i=ms(),s=i&&i.height>=t*.4?i.right+de:0,a=e&&e.width>=r*.5?e.bottom+de:0;return{vw:r,vh:t,minX:s,minY:a}}function os(r,t,e,i,s=Xe()){let{vw:a,vh:n,minX:o,minY:l}=s,c=Math.max(o,a-e-de),d=Math.max(l,n-i-de);return{x:I(r,o,c),y:I(t,l,d)}}function I(r,t,e){return e<t?t:Math.max(t,Math.min(e,r))}function ls(r){return r==="top"||r==="sidebar"?8:24}var cs=`
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
`;function F(r){return r===!0||r==="1"?["top"]:Array.isArray(r)?[...new Set(r.map(t=>String(t)).filter(t=>vt.has(t)))]:typeof r!="string"||!r||r==="none"?[]:r.includes(",")?[...new Set(r.split(",").map(t=>t.trim()).filter(t=>vt.has(t)))]:vt.has(r)?[r]:[]}function fs(r){return F(r)[0]||"none"}function It(r){return typeof r=="string"&&r.startsWith("media_player.")?r:""}function it(r){if(!r||typeof r!="object"||Array.isArray(r))return{};let t={};for(let e of vt){let i=It(r[e]);i&&(t[e]=i)}return t}function ut(){if(typeof document>"u")return null;let r=document.querySelector("home-assistant");if(r?.hass?.states)return r.hass;let t=r?.shadowRoot?.querySelector("home-assistant-main");if(t?.hass?.states)return t.hass;let e=document.querySelector("ha-music");return e?.hass?.states?e.hass:null}function H(){try{let r=window.localStorage.getItem(ce);if(!r)return null;let t=JSON.parse(r),e=F(t?.modes??t?.mode),i=it(t?.entities),s=j(t?.themes),a=Number(t?.updated)||0,n=t?.disabled===!0,o=It(t?.entity);o&&e[0]&&!i[e[0]]&&(i[e[0]]=o);let l=e.filter(c=>i[c]);return l.length?{modes:l,entities:i,themes:s,disabled:!1,updated:a}:n?{modes:[],entities:i,themes:s,disabled:!0,updated:a}:null}catch{return null}}function hs(r){let t=F(r?.modes??r?.mode),e=it(r?.entities),i=j(r?.themes),s={};for(let n of Object.keys(e).sort())s[n]=e[n];let a={};for(let n of Object.keys(i).sort())a[n]=i[n];return JSON.stringify({modes:t,entities:s,themes:a,disabled:r?.disabled===!0})}function mr(r){if(!(typeof window>"u"))try{window.dispatchEvent(new CustomEvent(We,{detail:r}))}catch{}}function ue(r={}){try{let t=F(r.modes??r.mode),e=it(r.entities),i=j(r.themes),s=Number(r.updated)||Date.now(),a=It(r.entity);a&&t[0]&&!e[t[0]]&&(e[t[0]]=a);let n=t.filter(d=>e[d]),o=n.length>0?{modes:n,entities:e,themes:i,disabled:!1,updated:s}:{modes:[],entities:e,themes:i,disabled:!0,updated:s},l=window.localStorage.getItem(ce),c=l?JSON.parse(l):null;if(c&&hs(c)===hs(o))return;window.localStorage.setItem(ce,JSON.stringify(o)),mr(o)}catch{}}function gs(r){if(typeof window>"u")return()=>{};let t=i=>{try{r(i.detail||H())}catch{}},e=i=>{if(i.key===ce)try{r(H())}catch{}};return window.addEventListener(We,t),window.addEventListener("storage",e),()=>{window.removeEventListener(We,t),window.removeEventListener("storage",e)}}function pe(r){if(typeof document>"u")return;let t=window.__haMusicDocks;if(t&&typeof t.get=="function"){if(r)t.get(r)?.remove(),t.delete(r);else{for(let e of t.values())e.remove();t.clear()}window.__haMusicDock=t.values().next().value||null;return}window.__haMusicDock?.remove(),window.__haMusicDock=null}function Ft(r=[]){if(typeof window>"u"||typeof document>"u")return[];let t=[];for(let s of Array.isArray(r)?r:[r]){let a=fs(s?.mode),n=It(s?.entity);a==="none"||!n||t.push({mode:a,entity:n,hass:s?.hass||null,theme:wt(s?.theme)})}if(!t.length)return pe(),[];if(!document.body)return document.addEventListener("DOMContentLoaded",()=>Ft(t),{once:!0}),[];let e=window.__haMusicDocks instanceof Map?window.__haMusicDocks:new Map,i=new Map(t.map(s=>[s.mode,s]));for(let[s,a]of e)i.has(s)||(a.remove(),e.delete(s));for(let[s,a]of i){let n=e.get(s);n?n.update(a):(n=document.createElement("ha-music-mini"),n.update(a),document.body.appendChild(n),e.set(s,n))}return window.__haMusicDocks=e,window.__haMusicDock=e.values().next().value||null,[...e.values()]}var Je=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this._mode="top",this._theme=W,this._open=!1,this._folded=!1,this._entity="",this._artSource="",this._artAppliedSource=null,this._artSeq=0,this._iconState="",this._disabledState=null,this._hass=null,this._poll=null,this._press=null,this._pressTimer=null,this._drag=null,this._dragging=!1,this._suppressClick=!1,this._clickTimer=null,this._onClick=t=>this._handleClick(t),this._onRoute=()=>this._sync(),this._onPointerDown=t=>this._handlePointerDown(t),this._onPointerMove=t=>this._handlePointerMove(t),this._onPointerUp=t=>this._handlePointerUp(t),this._onPointerCancel=t=>this._handlePointerCancel(t),this._onContextMenu=t=>this._handleContextMenu(t),this._onDragStart=t=>{t.preventDefault(),t.stopPropagation()},this._onResize=()=>{this._applySavedPosition(),this._watchDockBounds()},this._boundsObserver=null,this._boundsRaf=null,this._boundsNodes=0,this._sync=this._sync.bind(this)}update(t={}){let e=fs(t.mode),i=It(t.entity),s=wt(t.theme),a=e!==this._mode,n=a||i!==this._entity||s!==this._theme;this._mode=e,this._theme=s,a&&(this._open=!1,this._folded=!1),this._entity=i,t.hass?.states&&(this._hass=t.hass),n&&(this._artAppliedSource=null,this._iconState="",this._disabledState=null),(!this.shadowRoot.childElementCount||a)&&this._render(),this._sync(),n&&(this._applySavedPosition(),this._watchDockBounds())}connectedCallback(){this.shadowRoot.childElementCount||this._render(),this.shadowRoot.addEventListener("click",this._onClick),this.shadowRoot.addEventListener("pointerdown",this._onPointerDown),this.shadowRoot.addEventListener("pointermove",this._onPointerMove),this.shadowRoot.addEventListener("pointerup",this._onPointerUp),this.shadowRoot.addEventListener("pointercancel",this._onPointerCancel),this.shadowRoot.addEventListener("contextmenu",this._onContextMenu),this.shadowRoot.addEventListener("dragstart",this._onDragStart,!0),window.addEventListener("resize",this._onResize),window.addEventListener("location-changed",this._onRoute),this._startPolling(),this._sync(),window.requestAnimationFrame(()=>{this._applySavedPosition(),this._watchDockBounds()})}disconnectedCallback(){this.shadowRoot.removeEventListener("click",this._onClick),this.shadowRoot.removeEventListener("pointerdown",this._onPointerDown),this.shadowRoot.removeEventListener("pointermove",this._onPointerMove),this.shadowRoot.removeEventListener("pointerup",this._onPointerUp),this.shadowRoot.removeEventListener("pointercancel",this._onPointerCancel),this.shadowRoot.removeEventListener("contextmenu",this._onContextMenu),this.shadowRoot.removeEventListener("dragstart",this._onDragStart,!0),window.removeEventListener("resize",this._onResize),window.removeEventListener("location-changed",this._onRoute),this._boundsObserver&&(this._boundsObserver.disconnect(),this._boundsObserver=null),this._boundsRaf&&(cancelAnimationFrame(this._boundsRaf),this._boundsRaf=null),this._boundsNodes=0,this._poll&&clearInterval(this._poll),this._poll=null}_startPolling(){this._poll||(this._poll=window.setInterval(()=>{let t=ut()||this._hass;t?.states&&(this._hass=t,this._sync()),this._boundsNodes||this._watchDockBounds()},1e3))}_watchDockBounds(){if(typeof ResizeObserver>"u")return;let t=[];if(this._mode==="top"?t=[rs()].filter(Boolean):this._mode==="sidebar"?t=[as()].filter(Boolean):this._mode==="fab"&&(t=[rs(),as()].filter(Boolean)),!t.length){this._boundsNodes=0;return}this._boundsObserver&&this._boundsObserver.disconnect(),this._boundsNodes=t.length,this._boundsObserver=new ResizeObserver(()=>{this._dragging||this._boundsRaf||(this._boundsRaf=window.requestAnimationFrame(()=>{this._boundsRaf=null,this._applySavedPosition()}))});for(let e of t)this._boundsObserver.observe(e)}_render(){if(this._eq=null,this._mode==="fab")return this._renderFab();this.shadowRoot.innerHTML=`
      <style>${cs}</style>
      <div class="mini" data-mode="${this._mode}" role="region" aria-label="HA Music \u8FF7\u4F60\u64AD\u653E\u5668">
        <div class="art">
          <img alt="" draggable="false" />
          <span class="fallback">${es}</span>
        </div>
        <div class="meta">
          <div class="title">\u9009\u62E9\u64AD\u653E\u5668</div>
          <div class="sub">\u5728\u5361\u7247\u7F16\u8F91\u5668\u4E2D\u9009\u62E9\u4F4D\u7F6E</div>
        </div>
        <div class="controls">
          <button data-act="prev" type="button" aria-label="\u4E0A\u4E00\u9996">${is}</button>
          <button class="toggle" data-act="toggle" type="button" aria-label="\u64AD\u653E">${le}</button>
          <button data-act="next" type="button" aria-label="\u4E0B\u4E00\u9996">${ss}</button>
        </div>
        <div class="progress"><span></span></div>
      </div>
    `,this._mini=this.shadowRoot.querySelector(".mini"),this._art=this.shadowRoot.querySelector(".art img"),this._fallback=this.shadowRoot.querySelector(".fallback"),this._title=this.shadowRoot.querySelector(".title"),this._sub=this.shadowRoot.querySelector(".sub"),this._toggle=this.shadowRoot.querySelector(".toggle"),this._prev=this.shadowRoot.querySelector('[data-act="prev"]'),this._next=this.shadowRoot.querySelector('[data-act="next"]'),this._progress=this.shadowRoot.querySelector(".progress span"),this._disc=null,this._quick=null,this._art.addEventListener("error",()=>{this._art.removeAttribute("src"),this._fallback&&(this._fallback.style.display="grid"),this._mini?.style.removeProperty("--fab-cover")})}_renderFab(){this.shadowRoot.innerHTML=`
      <style>${cs}</style>
      <div class="mini mini-fab" data-mode="fab" data-open="${this._open?"true":"false"}" role="region" aria-label="HA Music \u60AC\u6D6E\u64AD\u653E\u5668">
        <div class="fab-orb">
          <button class="fab-disc" type="button" aria-label="\u5C55\u5F00\u64AD\u653E\u5668" aria-expanded="${this._open?"true":"false"}">
            <div class="art">
              <img alt="" draggable="false" />
              <span class="fallback">${es}</span>
            </div>
            <span class="fab-glow"></span>
          </button>
          <canvas class="fab-eq" aria-hidden="true"></canvas>
          <button class="fab-quick" data-act="toggle" type="button" aria-label="\u64AD\u653E">${le}</button>
        </div>
        <div class="fab-panel">
          <div class="fab-head">
            <div class="meta">
              <div class="title">\u9009\u62E9\u64AD\u653E\u5668</div>
              <div class="sub">\u5728\u5361\u7247\u7F16\u8F91\u5668\u4E2D\u9009\u62E9\u4F4D\u7F6E</div>
            </div>
            <button class="fab-collapse" data-act="collapse" type="button" aria-label="\u6536\u8D77\u64AD\u653E\u5668">${dr}</button>
          </div>
          <div class="progress"><span></span></div>
          <div class="controls">
            <button data-act="prev" type="button" aria-label="\u4E0A\u4E00\u9996">${is}</button>
            <button class="toggle" data-act="toggle" type="button" aria-label="\u64AD\u653E">${le}</button>
            <button data-act="next" type="button" aria-label="\u4E0B\u4E00\u9996">${ss}</button>
          </div>
        </div>
      </div>
    `,this._mini=this.shadowRoot.querySelector(".mini"),this._art=this.shadowRoot.querySelector(".art img"),this._fallback=this.shadowRoot.querySelector(".fallback"),this._title=this.shadowRoot.querySelector(".title"),this._sub=this.shadowRoot.querySelector(".sub"),this._toggle=this.shadowRoot.querySelector(".fab-panel .toggle"),this._prev=this.shadowRoot.querySelector('.fab-panel [data-act="prev"]'),this._next=this.shadowRoot.querySelector('.fab-panel [data-act="next"]'),this._progress=this.shadowRoot.querySelector(".fab-panel .progress span"),this._disc=this.shadowRoot.querySelector(".fab-disc"),this._quick=this.shadowRoot.querySelector(".fab-quick"),this._collapse=this.shadowRoot.querySelector(".fab-collapse"),this._eq=this.shadowRoot.querySelector(".fab-eq"),this._art.addEventListener("error",()=>{this._art.removeAttribute("src"),this._fallback&&(this._fallback.style.display="grid"),this._mini?.style.removeProperty("--fab-cover")})}_stateLabel(t){let e=!this._hass?.language||String(this._hass.language).startsWith("zh");return{playing:e?"\u64AD\u653E\u4E2D":"Playing",paused:e?"\u5DF2\u6682\u505C":"Paused",idle:e?"\u7A7A\u95F2":"Idle",off:e?"\u5DF2\u5173\u95ED":"Off",unavailable:e?"\u4E0D\u53EF\u7528":"Unavailable",unknown:e?"\u672A\u77E5":"Unknown"}[t]||t}_clearDockInlineStyles(){if(this._mini){for(let t of["left","top","right","bottom","width","height","max-height"])this._mini.style.removeProperty(t);this._mini.style.removeProperty("--hm-sidebar-compact-size"),delete this._mini.dataset.compact}}_applySavedPosition(){if(!this._mini||!this._mini.isConnected||this._dragging)return;if(this._mode==="fab"){let f=this._mini,_=f.getBoundingClientRect(),y=_.width||64,v=_.height||64,S=Xe(),w=Qe().fab,M=S.vw-y-24,E=S.vh/2-v/2,C=os(w&&Number.isFinite(w.x)?w.x*window.innerWidth:M,w&&Number.isFinite(w.y)?w.y*window.innerHeight:E,y,v,S);f.style.left=`${Math.round(C.x)}px`,f.style.top=`${Math.round(C.y)}px`,f.style.right="auto",f.style.bottom="auto";return}let t=ns(this._mode);if(!t)return;let i=Qe()[this._mode],s=ls(this._mode),a=this._mini;if(this._mode==="top"){if(this._folded){let w=Math.round(Math.min(44,Math.max(36,t.height-8)));a.style.width=`${w}px`,a.style.height=`${w}px`,a.style.removeProperty("max-height"),delete a.dataset.compact;let M=he(t),E=M?M.left-8-w:t.right-w-80,C=I(i&&Number.isFinite(i.x)?i.x*window.innerWidth:E,t.left+s,t.right-w-s);a.style.left=`${Math.round(C)}px`,a.style.top=`${Math.round(t.top+Math.max(2,(t.height-w)/2))}px`,a.style.right="auto",a.style.bottom="auto";return}let f=Math.round(Math.min(44,Math.max(38,t.height-8))),_=Math.max(150,t.width-s*2),y=Math.round(Math.min(300,Math.max(200,t.width-140),_));a.style.width=`${y}px`,a.style.height=`${f}px`,a.style.removeProperty("max-height"),delete a.dataset.compact;let v=he(t),S=v?v.left-8-y:t.right-y-80,P=I(i&&Number.isFinite(i.x)?i.x*window.innerWidth:S,t.left+s,t.right-y-s);a.style.left=`${Math.round(P)}px`,a.style.top=`${Math.round(t.top+Math.max(2,(t.height-f)/2))}px`,a.style.right="auto",a.style.bottom="auto";return}let n=Math.round(Math.max(56,Math.min(236,t.width-16))),o=n<170,l=Math.round(Math.max(40,Math.min(56,t.width-4))),c=o?l:56;this._folded?(a.style.width=`${c}px`,a.style.height=`${c}px`,delete a.dataset.compact):o?(a.style.setProperty("--hm-sidebar-compact-size",`${l}px`),a.style.width=`${l}px`,a.style.height=`${l}px`,a.dataset.compact="true"):(a.style.removeProperty("--hm-sidebar-compact-size"),a.style.width=`${n}px`,a.style.height="auto",a.dataset.compact="false"),a.style.maxHeight=this._folded?`${c}px`:`${Math.max(56,t.height-16)}px`;let d=Math.round(t.left+(o?4:s));a.style.left=`${d}px`,a.style.right="auto",a.style.bottom="auto";let h=this._folded?c:a.getBoundingClientRect().height||58,u=pr(t),p=u?u.top-8-h:t.bottom-h-148,m=I(i&&Number.isFinite(i.y)?i.y*window.innerHeight:p,t.top+s,t.bottom-h-s);a.style.top=`${Math.round(m)}px`}_saveCurrentPosition(){if(!this._mini)return;let t=this._mini.getBoundingClientRect();if(this._mode==="fab"){Ye("fab",I(t.left/Math.max(1,window.innerWidth),0,1),I(t.top/Math.max(1,window.innerHeight),0,1));return}if(this._mode==="top"){Ye(this._mode,I(t.left/Math.max(1,window.innerWidth),0,1),0);return}Ye(this._mode,0,I(t.top/Math.max(1,window.innerHeight),0,1))}_handlePointerDown(t){!this._mini||t.button!==0||t.isPrimary===!1||(this._clearPress(),this._press={pointerId:t.pointerId,x:t.clientX,y:t.clientY,long:!1,moved:!1},this._dragging=!1,this._suppressClick=!1,this._pressTimer=window.setTimeout(()=>{this._pressTimer=null,this._press&&this._beginDrag()},360))}_beginDrag(){if(!this._press||!this._mini)return;this._press.long=!0,this._dragging=!0;let t=this._mini.getBoundingClientRect();this._drag={left:t.left,top:t.top,width:t.width,height:t.height,x:this._press.x,y:this._press.y,bounds:this._mode==="fab"?Xe():ns(this._mode)},this._mini.dataset.dragging="true",this._mini.style.left=`${t.left}px`,this._mini.style.top=`${t.top}px`,this._mini.style.right="auto",this._mini.style.bottom="auto";try{this._mini.setPointerCapture(this._press.pointerId)}catch{}}_handlePointerMove(t){if(!this._press)return;let e=t.clientX-this._press.x,i=t.clientY-this._press.y;if(!this._dragging){Math.hypot(e,i)>8&&(this._press.moved=!0,this._pressTimer&&(window.clearTimeout(this._pressTimer),this._pressTimer=null));return}t.preventDefault();let s=this._drag.bounds;if(!s)return;let a=ls(this._mode),n=this._drag.left,o=this._drag.top;if(this._mode==="top")n=I(this._drag.left+e,s.left+a,s.right-this._drag.width-a);else if(this._mode==="sidebar")o=I(this._drag.top+i,s.top+a,s.bottom-this._drag.height-a);else if(this._mode==="fab"){let l=os(this._drag.left+e,this._drag.top+i,this._drag.width,this._drag.height,s);n=l.x,o=l.y}this._mini.style.left=`${Math.round(n)}px`,this._mini.style.top=`${Math.round(o)}px`,this._mini.style.right="auto",this._mini.style.bottom="auto"}_handlePointerUp(){if(!this._press)return;let t=this._press.long,e=this._press.moved;this._pressTimer&&(window.clearTimeout(this._pressTimer),this._pressTimer=null),this._dragging&&(this._saveCurrentPosition(),this._releasePointer()),(this._dragging||t||e)&&(this._suppressClick=!0,window.setTimeout(()=>{this._suppressClick=!1},560)),this._dragging=!1,this._press=null,this._mini&&delete this._mini.dataset.dragging}_handlePointerCancel(){this._releasePointer(),this._clearPress(),this._dragging=!1,this._mini&&delete this._mini.dataset.dragging}_clearPress(){this._pressTimer&&(window.clearTimeout(this._pressTimer),this._pressTimer=null),this._press=null}_releasePointer(){let t=this._press?.pointerId;if(!(t===void 0||!this._mini))try{this._mini.releasePointerCapture(t)}catch{}}_handleContextMenu(t){(this._press||this._dragging)&&t.preventDefault()}_sync(){if(!this._mini)return;cr(this._mini,this._theme),this._mini.dataset.mode!==this._mode&&(this._mini.dataset.mode=this._mode);let t=this._mode!=="fab"&&this._folded?"true":"false";if(this._mini.dataset.folded!==t&&(this._mini.dataset.folded=t),this._mode==="fab"){let _=this._open?"true":"false";this._mini.dataset.open!==_&&(this._mini.dataset.open=_)}if(!this._entity){this._mini.dataset.playing!=="false"&&(this._mini.dataset.playing="false"),this._title.textContent!=="\u9009\u62E9\u64AD\u653E\u5668"&&(this._title.textContent="\u9009\u62E9\u64AD\u653E\u5668"),this._sub.textContent!=="\u5728\u5361\u7247\u7F16\u8F91\u5668\u4E2D\u9009\u62E9\u4F4D\u7F6E"&&(this._sub.textContent="\u5728\u5361\u7247\u7F16\u8F91\u5668\u4E2D\u9009\u62E9\u4F4D\u7F6E"),this._setDisabled(!0),this._progress.style.width="0%",this._setArt(null),_t(this._art,!1),this._syncFabEq(!1,{},0);return}let e=ut()||this._hass;e?.states&&(this._hass=e);let i=this._hass?.states?.[this._entity];if(!i||i.state==="unavailable"||i.state==="unknown"){let _=i?.attributes?.friendly_name||this._entity;this._mini.dataset.playing!=="false"&&(this._mini.dataset.playing="false"),this._title.textContent!==_&&(this._title.textContent=_),this._sub.textContent!=="\u5B9E\u4F53\u4E0D\u53EF\u7528"&&(this._sub.textContent="\u5B9E\u4F53\u4E0D\u53EF\u7528"),this._setDisabled(!0),this._progress.style.width="0%",this._setArt(null),_t(this._art,!1),this._syncFabEq(!1,{},0);return}let a=i.attributes||{},n=a.media_title||a.friendly_name||this._entity;this._title.textContent!==n&&(this._title.textContent=n);let o=a.media_artist||a.media_album_name||"";o===n&&(o="");let l=this._stateLabel(i.state),c=o?`${o} \xB7 ${l}`:l;this._sub.textContent!==c&&(this._sub.textContent=c),this._setDisabled(!1);let d=i.state==="playing",h=d?"true":"false";this._mini.dataset.playing!==h&&(this._mini.dataset.playing=h);let u=d?"pause":"play";if(this._iconState!==u){this._iconState=u;let _=d?hr:le;this._toggle.innerHTML=_,this._toggle.setAttribute("aria-label",d?"\u6682\u505C":"\u64AD\u653E"),this._quick&&(this._quick.innerHTML=_,this._quick.setAttribute("aria-label",d?"\u6682\u505C":"\u64AD\u653E"))}if(this._disc){let _=this._open?"true":"false";this._disc.getAttribute("aria-expanded")!==_&&(this._disc.setAttribute("aria-label",this._open?"\u6536\u8D77\u64AD\u653E\u5668":"\u5C55\u5F00\u64AD\u653E\u5668"),this._disc.setAttribute("aria-expanded",_))}this._setArt(a.entity_picture),_t(this._art,d);let p=Number(a.media_duration||0),m=Number(a.media_position||0);this._syncFabEq(d,a,m);let f=p>0?Math.min(100,Math.max(0,m/p*100)):0;this._progress.style.width=`${f}%`}_syncFabEq(t,e={},i=0){this._eq&&ts(this._eq,this._mini,{playing:t,visible:!this._open,position:i,title:e.media_title,artist:e.media_artist,album:e.media_album_name,accent:z[this._theme]?.accent})}_setArt(t){if(!this._art)return;let e=t||"";if(this._artAppliedSource===e)return;this._artAppliedSource=e;let i=++this._artSeq;if(this._artSource=e,!e){this._clearArt();return}re(this._hass,e,this._entity).then(s=>{if(!(i!==this._artSeq||this._artSource!==e)){if(!s){this._clearArt();return}try{let a=new URL(s,window.location.href).href;this._art.getAttribute("src")!==a&&(this._art.src=a),this._fallback&&(this._fallback.style.display="none"),this._mini?.style.setProperty("--fab-cover",`url(${JSON.stringify(a)})`)}catch{this._clearArt()}}})}_clearArt(){this._art?.removeAttribute("src"),this._fallback&&(this._fallback.style.display="grid"),this._mini?.style.removeProperty("--fab-cover")}_setDisabled(t){if(this._disabledState!==t){this._disabledState=t;for(let e of[this._prev,this._toggle,this._next,this._quick])e&&(e.disabled=t)}}_toggleOpen(){this._mode!=="fab"||!this._mini||(this._open=!this._open,this._mini.dataset.open=this._open?"true":"false",this._sync(),this._disc&&(this._disc.setAttribute("aria-label",this._open?"\u6536\u8D77\u64AD\u653E\u5668":"\u5C55\u5F00\u64AD\u653E\u5668"),this._disc.setAttribute("aria-expanded",this._open?"true":"false")),window.setTimeout(()=>this._applySavedPosition(),340))}_toggleFold(){if(this._mode==="fab"){this._toggleOpen();return}this._folded=!this._folded,this._sync(),window.setTimeout(()=>this._applySavedPosition(),340)}_handleClick(t){let e=t.target.closest?.("button[data-act]");if(e){if(e.disabled)return;t.preventDefault(),t.stopPropagation();let i=e.dataset.act;i==="collapse"?this._toggleOpen():i==="toggle"?this._call("media_play_pause"):i==="prev"?this._call("media_previous_track"):i==="next"&&this._call("media_next_track");return}if(this._suppressClick){this._suppressClick=!1;return}if(t.preventDefault(),this._clickTimer){window.clearTimeout(this._clickTimer),this._clickTimer=null,this._toggleFold();return}this._clickTimer=window.setTimeout(()=>{this._clickTimer=null,this._call("media_play_pause")},280)}_call(t){if(!this._hass||!this._entity)return;let e=this._hass.callService("media_player",t,{entity_id:this._entity});e?.catch&&e.catch(i=>console.warn("ha-music mini player:",i))}};customElements.get("ha-music-mini")||customElements.define("ha-music-mini",Je);var fr=/^\[(ar|ti|al|by|offset|re|ve):.*\]$/i,me=/\[(\d{1,3}):(\d{1,2})(?:[.:](\d{1,3}))?\]/g;function gr(r){if(!r)return 0;let t=Number(r);return Number.isFinite(t)?r.length===1?t/10:r.length===2?t/100:t/1e3:0}function kt(r){if(!r)return{lines:[],plain:[],instrumental:!1};let t=String(r).replace(/\r\n?/g,`
`),e=[],i=[],s=!1;for(let n of t.split(`
`)){let o=n.trim();if(!o||fr.test(o))continue;if(/^\[instrumental\]$/i.test(o)){s=!0;continue}let l=[];me.lastIndex=0;let c=me.exec(o);for(;c;){let h=Number(c[1]),u=Number(c[2]),p=gr(c[3]),m=h*60+u+p;Number.isFinite(m)&&l.push(m),c=me.exec(o)}let d=o.replace(me,"").trim();if(d)if(l.length)for(let h of l)e.push({time:h,text:d});else i.push(d)}return e.sort((n,o)=>n.time-o.time),{lines:e.filter((n,o)=>!o||n.time!==e[o-1].time||n.text!==e[o-1].text),plain:i,instrumental:s}}function Bt(r,t){if(!Array.isArray(r)||!r.length)return-1;let e=Math.max(0,Number(t)||0)+.001,i=0,s=r.length-1,a=-1;for(;i<=s;){let n=i+s>>1;r[n].time<=e?(a=n,i=n+1):s=n-1}return a}function $t(r){return String(r||"").replace(/\([^)]*\)|\[[^\]]*\]|（[^）]*）|【[^】]*】/g," ").replace(/[\s\-_~～|/]+/g," ").trim()}function bs(r,t,e){let i=Bt(r,t);if(i<0)return{index:-1,progress:0};let s=Number(r[i].time)||0,a=r[i+1]?.time,n=Number.isFinite(a)?a:Number(e)>s?Number(e):s+4,o=Math.max(.05,n-s);return{index:i,progress:Math.max(0,Math.min(1,(Math.max(0,Number(t)||0)-s)/o))}}function fe(r){return $t(r).toLowerCase().replace(/[^\p{L}\p{N}]+/gu,"")}function ge(r,t={}){if(!Array.isArray(r)||!r.length)return null;let e=fe(t.title),i=fe(t.artist),s=Number(t.duration)||0,a=null,n=-1/0;for(let o of r){if(!o)continue;let l=o.syncedLyrics||o.plainLyrics;if(typeof l!="string"||!l.trim())continue;let c=fe(o.trackName),d=fe(o.artistName),h=0;e&&(c===e?h+=120:c&&(c.includes(e)||e.includes(c))?h+=60:h-=35),i&&d&&(d===i?h+=45:d.includes(i)||i.includes(d)?h+=32:h-=8);let u=Number(o.duration)||0;if(s&&u){let p=Math.abs(u-s);p<=2?h+=80:p<=5?h+=35:p<=15?h+=10:h-=Math.min(45,p)}o.syncedLyrics&&(h+=30),h>n&&(n=h,a=o)}return a&&e&&n<40?null:a}var br="/api/netease_lyrics/lyrics",_s="https://lrclib.net/api",_r="https://api.lyrics.ovh/v1",yr=4500,Ht=new Map,Ze=new Map;function st(r){return String(r||"").trim()}function xr(r){let t=new Set;return r.filter(e=>{if(!e?.title)return!1;let i=`${e.title}|${e.artist||""}`.toLowerCase();return t.has(i)?!1:(t.add(i),!0)})}function vr(r={}){let t=st(r.title),e=st(r.artist),i=$t(t),s=$t(e);return xr([{title:i||t,artist:s||e,rawTitle:t,rawArtist:e},{title:i||t,artist:"",rawTitle:t,rawArtist:e},{title:t,artist:e,rawTitle:t,rawArtist:e},{title:t,artist:s,rawTitle:t,rawArtist:e}])}function ys(r,t){let e=t?.attributes||{};return[r,e.media_title||"",e.media_artist||"",e.media_album_name||"",e.media_duration||0,e.media_content_id||""].map(i=>String(i)).join("|")}function wr(r,t,e){if(!bt(r).title)return-1/0;let s=r.attributes||{},a=r.state,n=0;if(a==="playing")n+=1e3;else if(a==="buffering")n+=650;else if(a==="paused")n+=180;else if(a==="idle")n+=40;else return-1/0;t===e&&(n+=300),(s.mass_player_type||s.active_queue||/music\s*assistant/i.test(s.source||""))&&(n+=35),(s.media_class==="music"||s.media_content_type==="music")&&(n+=12);let o=Date.parse(s.media_position_updated_at||"");return Number.isFinite(o)&&(n+=Math.min(20,Math.max(0,(o-16e11)/1e12))),n}function xs(r,t=""){let e=r?.states||{},i="",s=-1/0;for(let[a,n]of Object.entries(e)){if(!a.startsWith("media_player.")||!n||["unavailable","unknown","off"].includes(n.state))continue;let o=wr(n,a,t);o>s&&(i=a,s=o)}return i||(t&&e[t]&&bt(e[t]).title?t:"")}function kr(r){let t=new AbortController,e=setTimeout(()=>t.abort(),yr),i=()=>t.abort();return r&&(r.aborted?t.abort():r.addEventListener("abort",i,{once:!0})),{signal:t.signal,cleanup(){clearTimeout(e),r&&r.removeEventListener("abort",i)}}}async function be(r,{signal:t,headers:e}={}){let i=kr(t);try{let s=await fetch(r,{signal:i.signal,mode:"cors",headers:{Accept:"application/json",...e||{}}});if(s.status===404)return null;if(!s.ok)throw new Error(`lyrics HTTP ${s.status}`);return s.json()}finally{i.cleanup()}}function _e(r){if(!r||typeof r!="string")return null;let t=kt(r);return!t.lines.length&&!t.plain.length&&!t.instrumental?null:t}async function $r(r,t,{hass:e,source:i,signal:s}){let a=e?.auth?.data?.access_token;if(!a)return null;let n=new URL(br,window.location.origin);n.searchParams.set("title",t.title),n.searchParams.set("artist",t.artist||""),i!=="auto"&&n.searchParams.set("source",i);let o=await be(n.toString(),{signal:s,headers:{Authorization:`Bearer ${a}`}}),l=_e(o?.lyrics);if(!l)return null;let c=o?.source==="qq"?"QQ\u97F3\u4E50":o?.source==="netease"?"\u7F51\u6613\u4E91":"\u6B4C\u8BCD\u63A5\u53E3";return{parsed:l,source:c}}async function Ar(r,t,e){let i=st(t.rawTitle||r.title),s=st(t.rawArtist||r.artist),a=$t(i)||i,n=$t(s),o=Math.round(Number(r.duration)||0),l=[{track_name:a,artist_name:n,album_name:r.album,duration:o},{track_name:i,artist_name:s,album_name:r.album,duration:o},{q:[i,n||s].filter(Boolean).join(" ")}].filter(c=>c.track_name||c.q);for(let c of l)try{let d=new URL(`${_s}/search`);for(let[m,f]of Object.entries(c))f!=null&&String(f).trim()&&d.searchParams.set(m,String(f));let h=await be(d.toString(),{signal:e});if(!Array.isArray(h))continue;let u=ge(h,{title:a,artist:n||s,duration:r.duration});if(!u)continue;let p=_e(u.syncedLyrics||u.plainLyrics);if(p)return{parsed:p,source:"LRCLIB"}}catch(d){if(d?.name==="AbortError")throw d}if(o&&s)try{let c=new URL(`${_s}/get`);c.searchParams.set("track_name",a||i),c.searchParams.set("artist_name",n||s),r.album&&c.searchParams.set("album_name",r.album),c.searchParams.set("duration",String(o));let d=await be(c.toString(),{signal:e}),h=_e(d?.syncedLyrics||d?.plainLyrics);if(h)return{parsed:h,source:"LRCLIB"};if(d?.instrumental)return{parsed:{lines:[],plain:[],instrumental:!0},source:"LRCLIB"}}catch(c){if(c?.name==="AbortError")throw c}return null}async function Sr(r,t,e){let i=st(t.artist||r.artist),s=st(t.title||r.title);if(!i||!s)return null;let a=`${_r}/${encodeURIComponent(i)}/${encodeURIComponent(s)}`,n=await be(a,{signal:e}),o=_e(n?.lyrics);return o?{parsed:o,source:"Lyrics.ovh"}:null}function jt(r,t="\u6B4C\u8BCD\u63A5\u53E3"){return{status:r,lines:[],plain:[],instrumental:!1,source:t}}async function Mr(r,t){let{hass:e,source:i="auto",signal:s}=t||{};if(!st(r.title))return jt("none");let a=vr(r),n=a[0];if(!n)return jt("none");if(i!=="lrclib")try{let o=await $r(r,n,{hass:e,source:i,signal:s});if(o)return{status:"ready",lines:o.parsed.lines||[],plain:o.parsed.plain||[],instrumental:!!o.parsed.instrumental,source:o.source}}catch(o){if(o?.name==="AbortError")throw o}try{for(let o of a.slice(0,2)){let l=await Ar(r,o,s);if(l)return{status:"ready",lines:l.parsed.lines||[],plain:l.parsed.plain||[],instrumental:!!l.parsed.instrumental,source:l.source}}}catch(o){if(o?.name==="AbortError")throw o}if(i!=="lrclib")try{let o=await Sr(r,n,s);if(o)return{status:"ready",lines:o.parsed.lines||[],plain:o.parsed.plain||[],instrumental:!!o.parsed.instrumental,source:o.source}}catch(o){if(o?.name==="AbortError")throw o}return jt("none")}function vs(r,t={}){let e=bt(r);if(!st(e.title))return Promise.resolve(jt("none"));let i=[e.title,e.artist,e.album,e.duration,t.source||"auto"].join("|").toLowerCase(),s=Ht.get(i);if(s)return Promise.resolve(s);let a=Ze.get(i);if(a)return a;let n=Mr(e,t).then(o=>(Ht.set(i,o),Ht.size>40&&Ht.delete(Ht.keys().next().value),o)).catch(o=>{if(o?.name==="AbortError")throw o;return jt("error")}).finally(()=>{Ze.delete(i)});return Ze.set(i,n),n}var ti="haMusicLyricDock",ws="haMusicLyricDockPos",Pr=360;function Q(r,t,e){return e<t?t:Math.min(e,Math.max(t,r))}function ks(){try{let r=window.localStorage.getItem(ws);if(!r)return{};let t=JSON.parse(r);return t&&typeof t=="object"&&!Array.isArray(t)?t:{}}catch{return{}}}function Er(r,t){try{let e=ks();e.lyric={x:Number(Q(r,0,1).toFixed(4)),y:Number(Q(t,0,1).toFixed(4))},window.localStorage.setItem(ws,JSON.stringify(e))}catch{}}function ye(){try{let r=window.localStorage.getItem(ti);if(!r)return null;let t=JSON.parse(r);return!t||typeof t!="object"||Array.isArray(t)?null:{enabled:t.enabled===!0,entity:typeof t.entity=="string"?t.entity:"",updated:Number(t.updated)||0}}catch{return null}}function ii(r={}){try{let t=JSON.stringify({enabled:r.enabled===!0,entity:typeof r.entity=="string"?r.entity:"",updated:Number(r.updated)||Date.now()});if(window.localStorage.getItem(ti)===t)return;window.localStorage.setItem(ti,t)}catch{}}function xe(){typeof document>"u"||(window.__haMusicLyricDock?.remove(),window.__haMusicLyricDock=null)}function Kt(r={}){if(typeof window>"u"||typeof document>"u")return null;if(r.enabled===!1)return xe(),null;if(!document.body)return document.addEventListener("DOMContentLoaded",()=>Kt(r),{once:!0}),null;let t=window.__haMusicLyricDock;return(!t||!t.isConnected)&&(t=document.createElement("ha-music-lyric"),document.body.appendChild(t),window.__haMusicLyricDock=t),t.update(r),t}var Cr=`
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
`,ei=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this._theme=W,this._entity="",this._preferred="",this._auto=!0,this._source="auto",this._status="idle",this._hass=null,this._lines=[],this._plain=[],this._linesKey="",this._requestKey="",this._requestController=null,this._offset=0,this._clock=null,this._poll=null,this._press=null,this._pressTimer=null,this._drag=null,this._dragging=!1,this._onPointerDown=t=>this._handlePointerDown(t),this._onPointerMove=t=>this._handlePointerMove(t),this._onPointerUp=()=>this._handlePointerUp(),this._onPointerCancel=()=>this._handlePointerCancel(),this._onContextMenu=t=>{(this._press||this._dragging)&&t.preventDefault()},this._onResize=()=>this._applyPosition(),this.shadowRoot.innerHTML=`
      <style>${Cr}</style>
      <div class="lyric" data-empty="true" role="region" aria-label="\u5F53\u524D\u6B4C\u8BCD">
        <span class="text"></span>
      </div>
    `,this._pill=this.shadowRoot.querySelector(".lyric"),this._text=this.shadowRoot.querySelector(".text"),this.shadowRoot.addEventListener("pointerdown",this._onPointerDown),this.shadowRoot.addEventListener("pointermove",this._onPointerMove),this.shadowRoot.addEventListener("pointerup",this._onPointerUp),this.shadowRoot.addEventListener("pointercancel",this._onPointerCancel),this.shadowRoot.addEventListener("contextmenu",this._onContextMenu),this.shadowRoot.addEventListener("dragstart",t=>t.preventDefault())}update(t={}){if(t.enabled===!1){this.remove();return}t.auto!==void 0&&(this._auto=t.auto!==!1),t.source&&(this._source=String(t.source)),t.entity&&(this._preferred=t.entity,(!this._entity||!this._auto)&&(this._entity=t.entity)),Array.isArray(t.lines)&&(!this._auto||!t.entity||t.entity===this._entity)&&this._setLines(t.lines,t.trackKey,t.status,t.plain),t.status&&(!t.entity||t.entity===this._entity)&&(this._status=t.status),t.offset!==void 0&&(this._offset=Number(t.offset)||0),t.hass?.states&&(this._hass=t.hass);let e=wt(t.theme);e!==this._theme&&(this._theme=e,this._applyTheme()),this._applyTheme(),this._sync(),this._dragging||this._applyPosition()}_setLines(t,e,i,s){Array.isArray(t)&&(this._lines=t),Array.isArray(s)&&(this._plain=s),e!==void 0&&(this._linesKey=String(e||"")),i&&(this._status=i)}connectedCallback(){window.addEventListener("resize",this._onResize),this._startPolling(),this._applyTheme(),this._sync(),window.requestAnimationFrame(()=>this._applyPosition())}disconnectedCallback(){window.removeEventListener("resize",this._onResize),this._poll&&clearInterval(this._poll),this._poll=null}_startPolling(){this._poll||(this._poll=window.setInterval(()=>this._sync(),500))}_applyTheme(){let t=wt(this._theme),e=z[t]||z[W];this._theme=t,this.style.setProperty("--hm-accent",e.accent[0]),this.style.setProperty("--hm-accent-2",e.accent[1]),this.style.setProperty("--hm-accent-rgb",D(e.accent[0],"46,230,197")),this.style.setProperty("--hm-accent-2-rgb",D(e.accent[1],"123,92,255")),this.style.setProperty("--hm-base-rgb",D(e.base,"5,10,18")),this.style.setProperty("--hm-glow",String(e.glow??1)),this._pill.dataset.theme=t}_sync(){if(!this._pill)return;let t=ut()||this._hass;t?.states&&(this._hass=t);let e=this._preferred||this._entity;if(this._auto){let u=xs(t,e);u&&u!==this._entity&&this._selectEntity(u)}if(!this._entity){this._setText("");return}let i=this._hass?.states?.[this._entity];if(!i){this._setText("");return}let s=i.attributes||{},a=ys(this._entity,i);a!==this._linesKey&&(this._status!=="loading"||a!==this._requestKey)&&this._ensureLyrics(i,a);let n=s.media_position_updated_at||"",o=Number(s.media_position)||0,l=Date.now();(!this._clock||this._clock.key!==a||this._clock.state!==i.state||this._clock.stamp!==n)&&(this._clock={key:a,state:i.state,stamp:n,base:o,at:l});let c=this._clock.base;i.state==="playing"&&(c+=Math.max(0,l-this._clock.at)/1e3);let d=Number(s.media_duration)||0;d>0&&(c=Math.min(d,Math.max(0,c))),c+=this._offset;let h="";if(this._linesKey&&a===this._linesKey)if(this._lines.length){let u=Bt(this._lines,c);h=this._lines[Math.max(0,u)]?.text||""}else this._plain.length&&(h=this._plain[0]||"");this._setText(h)}_selectEntity(t){!t||t===this._entity||(this._abortRequest(),this._entity=t,this._lines=[],this._plain=[],this._linesKey="",this._requestKey="",this._status="idle",this._clock=null)}_abortRequest(){this._requestController&&this._requestController.abort(),this._requestController=null}_ensureLyrics(t,e){if(!t||this._requestKey===e&&this._status==="loading")return;this._abortRequest(),this._requestKey=e,this._status="loading",this._lines=[],this._plain=[],this._linesKey="";let i=this._entity,s=new AbortController;this._requestController=s,vs(t,{hass:this._hass,source:this._source,signal:s.signal}).then(a=>{s.signal.aborted||this._entity!==i||this._requestKey!==e||this._linesKey===e&&(this._lines.length||this._plain.length)||(this._lines=Array.isArray(a.lines)?a.lines:[],this._plain=Array.isArray(a.plain)?a.plain:[],this._linesKey=e,this._status=a.status||"none",this._source=a.source||this._source,this._sync())}).catch(()=>{s.signal.aborted||this._entity!==i||this._requestKey!==e||(this._lines=[],this._plain=[],this._linesKey=e,this._status="error",this._sync())}).finally(()=>{this._requestController===s&&(this._requestController=null)})}_setText(t){let e=String(t||"").trim();if(!this._pill)return;let i=!e;this._pill.dataset.empty=i?"true":"false",this._text.textContent!==e&&(this._text.textContent=e,!i&&!this._dragging&&window.requestAnimationFrame(()=>this._applyPosition()))}_applyPosition(){if(!this._pill?.isConnected||this._dragging)return;let t=this._pill.getBoundingClientRect(),e=t.width||240,i=t.height||42,s=ks(),a=s.lyric&&Number.isFinite(s.lyric.x)&&Number.isFinite(s.lyric.y)?s.lyric:Number.isFinite(s.x)&&Number.isFinite(s.y)?s:null,n=window.innerWidth||1,o=window.innerHeight||1,l=Ut(),c,d;if(l){let p=he(l);c=p?p.left-e-8:l.left+(l.width-e)/2,d=l.top+(l.height-i)/2}else c=n-e-16,d=16;let h,u;a&&Number.isFinite(a.x)&&Number.isFinite(a.y)?(h=Q(a.x*n,8,Math.max(8,n-e-8)),u=Q(a.y*o,8,Math.max(8,o-i-8))):l?(h=Q(c,l.left+8,Math.max(l.left+8,l.right-e-8)),u=Q(d,l.top+2,Math.max(l.top+2,l.bottom-i-2))):(h=Q(c,8,Math.max(8,n-e-8)),u=16),this._pill.style.left=`${Math.round(h)}px`,this._pill.style.top=`${Math.round(u)}px`}_savePosition(){if(!this._pill)return;let t=this._pill.getBoundingClientRect();Er(t.left/Math.max(1,window.innerWidth),t.top/Math.max(1,window.innerHeight))}_handlePointerDown(t){!this._pill||t.button!==0||t.isPrimary===!1||(this._clearPress(),this._press={pointerId:t.pointerId,x:t.clientX,y:t.clientY,long:!1,moved:!1},this._dragging=!1,this._pressTimer=window.setTimeout(()=>{this._pressTimer=null,this._press&&this._beginDrag()},Pr))}_beginDrag(){if(!this._press||!this._pill)return;this._press.long=!0,this._dragging=!0;let t=this._pill.getBoundingClientRect();this._drag={left:t.left,top:t.top,width:t.width,height:t.height,x:this._press.x,y:this._press.y},this._pill.dataset.dragging="true",this._pill.style.left=`${t.left}px`,this._pill.style.top=`${t.top}px`;try{this._pill.setPointerCapture(this._press.pointerId)}catch{}}_handlePointerMove(t){if(!this._press)return;let e=t.clientX-this._press.x,i=t.clientY-this._press.y;if(!this._dragging){Math.hypot(e,i)>8&&(this._press.moved=!0,this._clearPress());return}t.preventDefault();let s=window.innerWidth||1,a=window.innerHeight||1,n=Q(this._drag.left+e,8,Math.max(8,s-this._drag.width-8)),o=Q(this._drag.top+i,8,Math.max(8,a-this._drag.height-8));this._pill.style.left=`${Math.round(n)}px`,this._pill.style.top=`${Math.round(o)}px`}_handlePointerUp(){this._press&&(this._pressTimer&&(clearTimeout(this._pressTimer),this._pressTimer=null),this._dragging&&(this._savePosition(),this._releasePointer()),this._dragging=!1,this._press=null,this._pill&&delete this._pill.dataset.dragging)}_handlePointerCancel(){this._releasePointer(),this._clearPress(),this._dragging=!1,this._pill&&delete this._pill.dataset.dragging}_clearPress(){this._pressTimer&&(clearTimeout(this._pressTimer),this._pressTimer=null),this._press=null}_releasePointer(){let t=this._press?.pointerId;if(!(t===void 0||!this._pill))try{this._pill.releasePointerCapture(t)}catch{}}};typeof customElements<"u"&&!customElements.get("ha-music-lyric")&&customElements.define("ha-music-lyric",ei);var Tr="/api/netease_lyrics/lyrics",Lr="https://lrclib.net/api",$s="(pointer: coarse) and (max-width: 600px), (pointer: coarse) and (max-height: 500px)";function Rr(){return typeof window>"u"||typeof window.matchMedia!="function"?!1:!!window.matchMedia($s).matches}var si=["off","all","one"],zr=260;function qr(r,t,e){let i=new CustomEvent(t,{bubbles:!0,composed:!0,cancelable:!1,detail:e});return r.dispatchEvent(i),i}function ri(r,t,e,i,s){let a=[];for(let n=0;n<=r;n+=4){let o=t/2+Math.sin(n/e*Math.PI*2+s)*i+Math.sin(n/(e/2)*Math.PI*2+s*1.7)*(i*.32);a.push(`${n.toFixed(1)},${o.toFixed(2)}`)}return`M${a.join(" L")}`}function Nr(r){switch(r){case"playing":return"playing";case"buffering":return"buffering";case"paused":return"paused";case"idle":return"idle";case"off":return"off";default:return"idle"}}var ai=class extends B{static get styles(){return Di}static get properties(){return{_config:{state:!0},_width:{state:!1},preview:{type:Boolean,attribute:!1},editMode:{type:Boolean,attribute:!1}}}constructor(){super(),this._config={},this._hass=void 0,this._activeEntity="",this._sig="",this._width=0,this._height=0,this._panel=!1,this._autoPrevStates=null,this._manualSwitchAt=0,this._fitPanelRaf=null,this._panelHeight=0,this._tickTimer=null,this._toast="",this._toastTimer=null,this._menu=null,this._seekPreview=null,this._seekPending=null,this._volumePreview=null,this._showRemaining=!1,this._drawer=this._emptyDrawer(),this._artUrl="",this._artSource="",this._artApplied="",this._artFailedSource="",this._artSeq=0,this._artSlot=0,this._dockOwner=!1,this._unsubscribeDockPref=null,this._lyricDockOwner=!1,this._palette=null,this._paletteKey="",this._resizeObserver=null,this._thumbPreview=!1,this.preview=!1,this.editMode=!1,this._lyricsOpen=!1,this._lyricsKey="",this._lyrics={status:"idle",lines:[],plain:[],instrumental:!1,source:""},this._lyricsActive=-1,this._lyricsScrolled=-2,this._lyricsAbort=null,this._lyricsOffset=this._loadLyricsOffset(),this._lyricsCache=this._loadLyricsCache(),this._lyricsBackendMissingAt=0,this._coverPress=null,this._coverGesture="",this._coverGestureTimer=null,this._coverSuppressClick=!1,this._coverSuppressTimer=null,this._spectrumRaf=null,this._spectrumBars=[],this._spectrumLevels=[],this._spectrumLast=0,this._spectrumKey="",this._spectrumAudioUrl="",this._spectrumPlaylistUrl="",this._spectrumPlaylist=null,this._spectrumPlaylistAt=0,this._spectrumPlaylistLoading=!1,this._spectrumPlaylistAbort=null,this._spectrumPlaylistErrorAt=0,this._spectrumResolvedUrl="",this._spectrumTrack=null,this._audioShape=null,this._audioEl=null,this._audioCtx=null,this._audioAnalyser=null,this._audioSource=null,this._audioMute=null,this._audioBins=null,this._audioFailedUrl="",this._audioZeroFrames=0,this._audioPeak=0,this._audioStartedAt=0,this._audioGestureArmed=!1,this._positionClock=null,this._maAnalysis=null,this._maAnalysisKey="",this._maAnalysisLoadingKey="",this._maAnalysisFailedKey="",this._maAnalysisFailedAt=0,this._maAnalysisAt=0}set hass(t){let e=this._hass;if(this._hass=t,!t)return;this._autoSwitchToPlaying(t);let i=this._eid(),s=t.states?.[i],a=s?.attributes||{},n=this._trackKey(s),o=this._positionClock,l=!!(o&&o.trackKey!==n),c=l?0:Number(a.media_position)||0,d=a.media_position_updated_at||"";(!o||l||o.entityId!==i||o.state!==s?.state||o.base!==c||o.stamp!==d)&&(this._positionClock={entityId:i,state:s?.state,trackKey:n,base:c,stamp:d,at:Date.now()}),this._settleSeekPending(s,a,l)&&this.requestUpdate();let h=this._computeSig(t);(h!==this._sig||e===void 0)&&(this._sig=h,this.requestUpdate()),this._syncTimer()}get hass(){return this._hass}setConfig(t){if(!t)throw new Error("ha-music: \u914D\u7F6E\u4E0D\u80FD\u4E3A\u7A7A");let e=Array.isArray(t.entities)&&t.entities.length?t.entities.filter(Boolean):t.entity?[t.entity]:[];if(!e.length)throw new Error("ha-music: \u9700\u8981\u914D\u7F6E entity\uFF08media_player.*\uFF09\u6216 entities \u5217\u8868");this._config={...t};let i=typeof t.spectrum_audio_url=="string"?t.spectrum_audio_url.trim():"",s=typeof t.spectrum_playlist_url=="string"?t.spectrum_playlist_url.trim():"";(i!==this._spectrumAudioUrl||s!==this._spectrumPlaylistUrl)&&(this._spectrumAudioUrl=i,this._spectrumPlaylistUrl=s,this._spectrumPlaylist=null,this._spectrumPlaylistAt=0,this._spectrumPlaylistErrorAt=0,this._spectrumPlaylistAbort?.abort?.(),this._spectrumPlaylistAbort=null,this._spectrumResolvedUrl="",this._spectrumTrack=null,this._audioFailedUrl="",this._resetAudioShape(),this._teardownAudioSpectrum()),e.includes(this._activeEntity)||(this._activeEntity=e[0],this._palette=null,this._paletteKey="",this._artUrl="",this._artSource="",this._artFailedSource="",this._resetLyrics()),this._config.show_lyrics===!1&&(this._lyricsOpen=!1),this._sig="",this._hass&&(this._sig=this._computeSig(this._hass)),this._syncTimer(),this.requestUpdate()}connectedCallback(){super.connectedCallback(),this._thumbPreview=this._isThumbnailPreview(),this._onKeyDown=t=>{t.key==="Escape"&&(this._drawer.open?this._closeDrawer():this._menu&&(this._menu=null,this.requestUpdate()))},window.addEventListener("keydown",this._onKeyDown),this._mobileMq=typeof window.matchMedia=="function"?window.matchMedia($s):null,this._onMobileChange=()=>{this._installDock(),this._installLyricDock()},this._mobileMq?.addEventListener?this._mobileMq.addEventListener("change",this._onMobileChange):this._mobileMq?.addListener?.(this._onMobileChange),this._onSpectrumGesture=()=>{this._spectrumPlaying()&&(this._config?.visualizer||"bars")==="bars"&&this._primeAudioSpectrum()},this.addEventListener("pointerdown",this._onSpectrumGesture,{passive:!0}),this._unsubscribeDockPref?.(),this._unsubscribeDockPref=gs(()=>{this._dockOwner=!1,this._installDock(),this.requestUpdate()}),this._onViewportResize=()=>this._queuePanelFit(),window.addEventListener("resize",this._onViewportResize),window.visualViewport?.addEventListener("resize",this._onViewportResize),typeof ResizeObserver<"u"&&(this._resizeObserver=new ResizeObserver(t=>{let e=t[0]?.contentRect?.width||0,i=t[0]?.contentRect?.height||0,s=Math.abs(e-this._width)>=1,a=Math.abs(i-this._height)>=1;this._width=e,this._height=i;let n=this._config?.layout||"adaptive";s||a&&n==="adaptive"?n==="adaptive"?this.requestUpdate():this._queuePanelFit():a&&this._queuePanelFit()}),this._resizeObserver.observe(this))}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribeDockPref?.(),this._unsubscribeDockPref=null,this._onMobileChange&&(this._mobileMq?.removeEventListener?this._mobileMq.removeEventListener("change",this._onMobileChange):this._mobileMq?.removeListener?.(this._onMobileChange),this._onMobileChange=null,this._mobileMq=null),this._onKeyDown&&(window.removeEventListener("keydown",this._onKeyDown),this._onKeyDown=null),this._onViewportResize&&(window.removeEventListener("resize",this._onViewportResize),window.visualViewport?.removeEventListener("resize",this._onViewportResize),this._onViewportResize=null),this._onSpectrumGesture&&(this.removeEventListener("pointerdown",this._onSpectrumGesture),this._onSpectrumGesture=null),this._stopTimer(),this._coverGestureTimer&&clearTimeout(this._coverGestureTimer),this._coverSuppressTimer&&clearTimeout(this._coverSuppressTimer),this._stopSpectrum(),this._teardownAudioSpectrum(),this._coverGestureTimer=null,this._coverSuppressTimer=null,this._coverPress=null,this._resizeObserver?.disconnect(),this._resizeObserver=null,this._fitPanelRaf&&cancelAnimationFrame(this._fitPanelRaf),this._fitPanelRaf=null,this._toastTimer&&clearTimeout(this._toastTimer),this._lyricsAbort&&(this._lyricsAbort.abort(),this._lyricsAbort=null)}_entities(){let t=this._config||{};return(Array.isArray(t.entities)&&t.entities.length?t.entities:t.entity?[t.entity]:[]).filter(Boolean)}_eid(){let t=this._entities();return this._activeEntity||t[0]||""}_state(t=this._eid()){return this._hass?.states?.[t]}_trackKey(t){let e=t?.attributes||{};return[this._eid(),e.media_title||"",e.media_artist||"",e.media_album_name||"",e.media_duration||0,e.media_content_id||""].map(i=>String(i)).join("|")}_readMedia(){let t=this._state(),e=bt(t);if(t?.state==="playing"){let i=this._positionClock;if(i&&i.entityId===this._eid()){let s=Math.max(0,(Date.now()-i.at)/1e3),a=i.base+s;e.position=e.duration?x(a,0,e.duration):Math.max(0,a)}}return e}_computeSig(t){let e=this._eid(),i=t.states?.[e],s=i?.attributes||{},a=["media_title","media_artist","media_album_name","media_series_title","entity_picture","media_duration","media_position","media_position_updated_at","media_metadata","media_content_id","volume_level","is_volume_muted","shuffle","repeat","source","source_list","sound_mode","sound_mode_list","supported_features","group_members","app_name","queue","media_track"],n={};for(let d of a)d in s&&(n[d]=s[d]);let o=this._config?.volume_entity,l=o?t.states?.[o]?.state:null,c=this._entities().map(d=>{let h=t.states?.[d];return[d,h?.state,h?.attributes?.entity_picture]});return JSON.stringify([e,i?.state,n,l,c,t.language,this._config,this._menu,this._drawer.open,this._drawer.mode,this._drawer.cursor,this._drawer.items.length,this._drawer.loading,this._drawer.error,this._showRemaining,this._layoutKey()])}_syncTimer(){let t=this._state()?.state,e=t==="playing"||t==="buffering";e&&!this._tickTimer?this._tickTimer=setInterval(()=>this.requestUpdate(),500):e||this._stopTimer()}_stopTimer(){this._tickTimer&&(clearInterval(this._tickTimer),this._tickTimer=null)}_lyricsEnabled(){return this._config?.show_lyrics!==!1}_resetLyrics(){this._lyricsAbort&&(this._lyricsAbort.abort(),this._lyricsAbort=null),this._lyricsKey="",this._lyricsOpen=!1,this._lyricsActive=-1,this._lyricsScrolled=-2,this._lyrics={status:"idle",lines:[],plain:[],instrumental:!1,source:""}}_loadLyricsOffset(){try{let t=localStorage.getItem("ha-music-lyrics-offset"),e=Number(t);return Number.isFinite(e)?x(e,-5,5):0}catch{return 0}}_saveLyricsOffset(){try{localStorage.setItem("ha-music-lyrics-offset",String(Number(this._lyricsOffset.toFixed(1))))}catch{}}_bumpLyricsOffset(t){this._lyricsOffset=x(Math.round((this._lyricsOffset+t)*10)/10,-5,5),this._saveLyricsOffset(),this._lyricsScrolled=-2,this.requestUpdate()}_loadLyricsCache(){let t=new Map;try{localStorage.removeItem("ha-music-lyrics-cache-v3"),localStorage.removeItem("ha-music-lyrics-cache-v4");let e=JSON.parse(localStorage.getItem("ha-music-lyrics-cache-v5")||"[]");if(!Array.isArray(e))return t;for(let i of e){if(!Array.isArray(i)||i.length!==2)continue;let[s,a]=i;typeof s!="string"||!a||a.status!=="ready"||t.set(s,{status:"ready",lines:Array.isArray(a.lines)?a.lines:[],plain:Array.isArray(a.plain)?a.plain:[],instrumental:!!a.instrumental,source:String(a.source||"\u6B4C\u8BCD\u63A5\u53E3")})}}catch{return t}return t}_saveLyricsCache(){try{let t=[...this._lyricsCache.entries()].slice(-24);localStorage.setItem("ha-music-lyrics-cache-v5",JSON.stringify(t))}catch{}}_lyricsPosition(t){return Math.max(0,(Number(t)||0)+this._lyricsOffset)}_cleanLyricsQuery(t){return String(t||"").replace(/\(.*?\)|\[.*?\]|（.*?）/g,"").replace(/[\s\-_～〜]+/g," ").trim()}_lyricsSource(){let t=this._config?.lyrics_source;return t==="qq"||t==="wy"||t==="lrclib"?t:"auto"}_lyricsQueries(t){let e=Array.isArray(t.title)?t.title[0]||"":t.title||"",i=Array.isArray(t.artist)?t.artist[0]||"":t.artist||"",s=this._cleanLyricsQuery(e),a=this._cleanLyricsQuery(i),n=[{title:s||e,artist:a},{title:s||e,artist:""},{title:e,artist:i}],o=new Set;return n.filter(l=>{if(!l.title)return!1;let c=`${l.title}|${l.artist}`.toLowerCase();return o.has(c)?!1:(o.add(c),!0)})}async _refreshLyricsToken(){let t=this._hass?.auth;if(typeof t?.refreshAccessToken=="function")try{await t.refreshAccessToken()}catch{}}async _requestNeteaseLyrics(t,e){let i=null;for(let s=0;s<3;s+=1)try{let a=this._hass?.auth?.data?.access_token;if(!a)throw new Error("\u6B4C\u8BCD\u63A5\u53E3\u672A\u8BA4\u8BC1");let n=new URL(Tr,window.location.origin);n.searchParams.set("title",t.title),n.searchParams.set("artist",t.artist||"");let o=this._lyricsSource();o!=="auto"&&n.searchParams.set("source",o);let l=await fetch(n.toString(),{signal:e,headers:{Accept:"application/json",Authorization:`Bearer ${a}`,"Content-Type":"application/json"},credentials:"same-origin"});if(l.status===401&&s<2){await this._refreshLyricsToken(),await new Promise(p=>setTimeout(p,500));continue}if(l.status===404)return this._lyricsBackendMissingAt=Date.now(),null;if(!l.ok){if(i=new Error(`lyrics HTTP ${l.status}`),s<2){await new Promise(p=>setTimeout(p,500));continue}break}let c=await l.json(),d=c?.lyrics;if(!d||typeof d!="string")return null;let h=kt(d);if(!h.lines.length&&!h.plain.length&&!h.instrumental)return null;let u=c?.source==="qq"?"QQ\u97F3\u4E50":c?.source==="netease"?"\u7F51\u6613\u4E91":"\u6B4C\u8BCD\u63A5\u53E3";return{parsed:h,source:u}}catch(a){if(a?.name==="AbortError")throw a;i=a,s<2&&await new Promise(n=>setTimeout(n,500))}throw i||new Error("\u6B4C\u8BCD\u63A5\u53E3\u8BF7\u6C42\u5931\u8D25")}async _lrclibJson(t,e,i){let s=new URL(`${Lr}/${t}`);for(let[l,c]of Object.entries(e))c!=null&&String(c).trim()&&s.searchParams.set(l,String(c));let a=new AbortController,n=()=>a.abort();if(i){if(i.aborted)throw new DOMException("Aborted","AbortError");i.addEventListener("abort",n,{once:!0})}let o=setTimeout(()=>a.abort(),3e3);try{let l=await fetch(s.toString(),{signal:a.signal,mode:"cors",headers:{Accept:"application/json"}});if(l.status===404)return null;if(!l.ok)throw new Error(`lrclib HTTP ${l.status}`);return l.json()}catch(l){if(l?.name==="AbortError"){if(i?.aborted)throw l;return null}throw l}finally{clearTimeout(o),i&&i.removeEventListener("abort",n)}}async _requestLrclibLyrics(t,e,i){let s=Array.isArray(t.title)?t.title[0]||"":t.title||"",a=Array.isArray(t.artist)?t.artist[0]||"":t.artist||"",n=this._cleanLyricsQuery(s)||s,o=this._cleanLyricsQuery(a)||a,l=Math.round(Number(t.duration)||0),c=[];l&&o&&(c.push({track_name:n,artist_name:o,...t.album?{album_name:t.album}:{},duration:l}),a!==o&&c.push({track_name:s,artist_name:a,...t.album?{album_name:t.album}:{},duration:l}));let d=[];e.title&&d.push({track_name:e.title,artist_name:e.artist||o}),d.push({q:[s,o||a].filter(Boolean).join(" ")});let h=null;for(let u of d)try{let p=await this._lrclibJson("search",u,i),m=ge(p,{title:e.title||s,artist:e.artist||a,duration:t.duration});if(!m)continue;let f=this._lrclibParsed(m);if(f)return{parsed:f,source:"LRCLIB"}}catch(p){if(p?.name==="AbortError")throw p;h=p}for(let u of c)try{let p=await this._lrclibJson("get",u,i);if(!p)continue;let m=this._lrclibParsed(p);if(m)return{parsed:m,source:"LRCLIB"}}catch(p){if(p?.name==="AbortError")throw p;h=p}if(h)throw h;return null}async _requestLyricsOvh(t,e,i){let s=Array.isArray(t.title)?t.title[0]||"":t.title||"",a=Array.isArray(t.artist)?t.artist[0]||"":t.artist||"",n=this._cleanLyricsQuery(e?.artist||a)||a,o=this._cleanLyricsQuery(e?.title||s)||s;if(!n||!o)return null;let l=new AbortController,c=()=>l.abort();if(i){if(i.aborted)throw new DOMException("Aborted","AbortError");i.addEventListener("abort",c,{once:!0})}let d=setTimeout(()=>l.abort(),4500);try{let h=await fetch(`https://api.lyrics.ovh/v1/${encodeURIComponent(n)}/${encodeURIComponent(o)}`,{signal:l.signal,mode:"cors",headers:{Accept:"application/json"}});if(h.status===404)return null;if(!h.ok)throw new Error(`lyrics.ovh HTTP ${h.status}`);let u=await h.json(),p=kt(u?.lyrics||"");return!p.lines.length&&!p.plain.length?null:{parsed:p,source:"Lyrics.ovh"}}catch(h){if(h?.name==="AbortError"){if(i?.aborted)throw h;return null}throw h}finally{clearTimeout(d),i&&i.removeEventListener("abort",c)}}_lrclibParsed(t){if(!t)return null;if(t.instrumental&&!t.syncedLyrics&&!t.plainLyrics)return{lines:[],plain:[],instrumental:!0};let e=t.syncedLyrics||t.plainLyrics;if(typeof e!="string"||!e.trim())return null;let i=kt(e);return!i.lines.length&&!i.plain.length&&!i.instrumental?null:i}_lyricsKeyFor(t){return[this._cleanLyricsQuery(Array.isArray(t.title)?t.title[0]:t.title),this._cleanLyricsQuery(Array.isArray(t.artist)?t.artist[0]:t.artist),this._lyricsSource()].join("|").toLowerCase()}_setLyrics(t,e,i){t===this._lyricsKey&&(this._lyrics={status:"ready",lines:e.lines||[],plain:e.plain||[],instrumental:!!e.instrumental,source:i},this._lyricsCache.size>32&&this._lyricsCache.delete(this._lyricsCache.keys().next().value),this._lyricsCache.set(t,this._lyrics),this._saveLyricsCache(),this.requestUpdate())}_maybeLoadLyrics(){if(!this._lyricsEnabled()||this._thumbMode())return;let t=this._readMedia();if(!t.title){this._lyrics.status!=="idle"&&(this._lyrics={status:"idle",lines:[],plain:[],instrumental:!1,source:""},this._lyricsKey="",this.requestUpdate());return}let e=this._lyricsKeyFor(t);if(e===this._lyricsKey)return;this._lyricsAbort&&(this._lyricsAbort.abort(),this._lyricsAbort=null),this._lyricsKey=e;let i=this._lyricsCache.get(e);if(i){this._lyrics={...i},this.requestUpdate();return}this._lyrics={status:"loading",lines:[],plain:[],instrumental:!1,source:"\u6B4C\u8BCD\u63A5\u53E3"},this.requestUpdate(),this._fetchLyrics(t,e)}async _fetchLyrics(t,e){let i=new AbortController;this._lyricsAbort=i;let s=setTimeout(()=>i.abort(),2e4),a=null;try{let n=this._lyricsSource(),o=this._lyricsBackendMissingAt&&Date.now()-this._lyricsBackendMissingAt<10*60*1e3;if(n!=="lrclib"&&!o)for(let c of this._lyricsQueries(t)){if(i.signal.aborted||e!==this._lyricsKey)return;try{let d=await this._requestNeteaseLyrics(c,i.signal);if(i.signal.aborted||e!==this._lyricsKey)return;if(d){this._setLyrics(e,d.parsed,d.source);return}if(this._lyricsBackendMissingAt)break}catch(d){if(d?.name==="AbortError")throw d;a=d}}let l=this._lyricsQueries(t)[0];if(l)try{let c=await this._requestLrclibLyrics(t,l,i.signal);if(i.signal.aborted||e!==this._lyricsKey)return;if(c){this._setLyrics(e,c.parsed,c.source);return}}catch(c){if(c?.name==="AbortError")throw c;a=c}if(n==="auto"||n==="")try{let c=await this._requestLyricsOvh(t,l,i.signal);if(i.signal.aborted||e!==this._lyricsKey)return;if(c){this._setLyrics(e,c.parsed,c.source);return}}catch(c){if(c?.name==="AbortError")throw c;a=c}if(e!==this._lyricsKey)return;this._lyrics={status:a?"error":"none",lines:[],plain:[],instrumental:!1,source:"\u6B4C\u8BCD\u63A5\u53E3"},this.requestUpdate()}catch(n){if(e!==this._lyricsKey)return;if(n?.name==="AbortError"){this._lyrics={status:"error",lines:[],plain:[],instrumental:!1,source:"\u6B4C\u8BCD\u63A5\u53E3"},this.requestUpdate();return}this._lyrics={status:"error",lines:[],plain:[],instrumental:!1,source:"\u6B4C\u8BCD\u63A5\u53E3"},this.requestUpdate()}finally{clearTimeout(s),this._lyricsAbort===i&&(this._lyricsAbort=null)}}_sideLyricsVisible(){return!this._lyricsEnabled()||this._thumbMode()||this._lyricsOpen||this._layoutKey()!=="full"?!1:(this._width||0)>=640&&(this._height||0)>=480}_toggleLyrics(){this._lyricsOpen=!this._lyricsOpen,this._lyricsScrolled=-2,this._lyricsOpen&&(this._lyricsActive=-1,this._maybeLoadLyrics()),this.requestUpdate()}_retryLyrics(){this._lyricsKey="",this._lyricsAbort?.abort(),this._lyricsAbort=null,this._lyricsOpen=!0,this._maybeLoadLyrics(),this.requestUpdate()}_layoutKey(){if(this._thumbMode()||this._panel)return"full";let t=this._config?.layout||"adaptive";if(t==="adaptive"){let e=this._width,i=this._height;return!e||e>=240&&i>=520&&e<520?"full":e<340&&(!i||i<190)?"mini":e<460||i&&i<300?"compact":"full"}return["full","compact","mini"].includes(t)?t:"full"}_coverPx(t){let e=this._height||0;if(this._thumbMode()){let i=this._thumbTier();if(i==="lg")return Math.round(Math.min(260,Math.max(160,e*.34)));if(i==="md"){let s=this._width||0;return Math.round(Math.min(180,s?s*.45:180,Math.max(96,e*.32)))}return Math.round(Math.min(120,Math.max(64,e*.3)))}return t==="mini"?44:Math.round(t==="compact"?Math.min(88,Math.max(52,e*.26)):Math.min(178,Math.max(76,e*.22)))}_tight(){return this._thumbMode()?!1:this._layoutKey()==="compact"&&(this._height||0)<270}_styleVars(){return{...this._themeVars(),"--hm-cover-size":`${this._coverPx(this._layoutKey())}px`}}_themeKey(){let t=this._config?.theme;return t&&z[t]?t:W}_themeVars(){let t=z[this._themeKey()],e=this._paletteKey||this._eid()||"ha-music",i=Ki(e),s=this._palette,a=this._config?.accent,n=this._config?.palette!==!1,o=t.accent[0],l=t.accent[1],c=D(o),d=D(l),h=c,u=Ke(t.accent[1]),p=Ke(i.a2);if(n){if(s){let m=Ve(u,{h:s.h2,s:s.s2,l:s.l2},.5);l=m.css,d=m.rgb,h=s.rgb1}else if(p){let m=Ve(u,p,.35);l=m.css,d=m.rgb}}return a&&(o=a,c=D(a,c),n||(h=c)),{"--hm-base":t.base,"--hm-a1":o,"--hm-a2":l,"--hm-a1-rgb":c,"--hm-a2-rgb":d,"--hm-glow-rgb":h}}_volumeInfo(t){let e=this._config?.volume_entity,i=e?this._hass?.states?.[e]:void 0;if(i){let n=i.entity_id;if(n.startsWith("media_player."))return{domain:"media_player",entityId:n,level:Number(i.attributes?.volume_level??0),muted:!!i.attributes?.is_volume_muted,supported:!0,external:!0};if(n.startsWith("number.")){let o=Number(i.state);if(Number.isFinite(o))return{domain:"number",entityId:n,level:x(o/(i.attributes?.max||100),0,1),muted:!1,supported:!0,external:!0}}if(n.startsWith("input_number.")){let o=Number(i.state);if(Number.isFinite(o))return{domain:"input_number",entityId:n,level:x(o/(i.attributes?.max||100),0,1),muted:!1,supported:!0,external:!0}}}let s=this._state(),a=Number.isFinite(t.volume)||L(s,T.VOLUME_SET)||L(s,T.VOLUME_MUTE);return{domain:"media_player",entityId:this._eid(),level:Number.isFinite(t.volume)?t.volume:0,muted:t.muted,supported:a,external:!1}}_repeatValue(){let t=this._state()?.attributes?.repeat;return["off","all","one"].includes(t)?t:"off"}_call(t,e,i="media_player",s){let a=this._hass;if(!a?.callService)return Promise.resolve();let n=s??this._eid();try{let o=a.callService(i,t,{entity_id:n,...e});return Promise.resolve(o)}catch(o){return this._notify(o?.message||String(o)),Promise.reject(o)}}_guard(t){Promise.resolve(t).catch(e=>{let i=e?.message||String(e);this._notify(i.length>60?i.slice(0,60):i)})}_notify(t){this._toast=t||"",this.requestUpdate(),this._toastTimer&&clearTimeout(this._toastTimer),t&&(this._toastTimer=setTimeout(()=>{this._toast="",this.requestUpdate()},3600))}_togglePlay(){let t=this._state()?.state,e=t==="playing"||t==="buffering";e?this._pauseAudioSpectrum():this._primeAudioSpectrum(),this._guard(this._call(e?"media_pause":"media_play"))}_skip(t){this._primeAudioSpectrum(),this._guard(this._call(t==="next"?"media_next_track":"media_previous_track"))}_coverCue(t){this._coverGesture=t,this._coverGestureTimer&&clearTimeout(this._coverGestureTimer),this._coverGestureTimer=setTimeout(()=>{this._coverGesture===t&&(this._coverGesture="",this.requestUpdate())},420),this.requestUpdate()}_coverSwipe(t){this._coverCue(t),this._skip(t)}_onCoverPointerDown(t){this._thumbMode()||t.pointerType==="mouse"&&t.button!==0||(this._coverSuppressClick=!1,this._coverSuppressTimer&&clearTimeout(this._coverSuppressTimer),this._coverPress={id:t.pointerId,x:t.clientX,y:t.clientY,at:Date.now(),moved:!1,captured:!1})}_onCoverPointerMove(t){let e=this._coverPress;if(!e||e.id!==t.pointerId)return;let i=t.clientX-e.x,s=t.clientY-e.y;if(Math.abs(i)>10&&Math.abs(i)>Math.abs(s)*1.2){if(e.moved=!0,!e.captured){e.captured=!0;try{t.currentTarget.setPointerCapture(t.pointerId)}catch{}}t.cancelable&&t.preventDefault()}}_onCoverPointerUp(t){let e=this._coverPress;if(!e||e.id!==t.pointerId)return;this._coverPress=null;let i=t.clientX-e.x,s=t.clientY-e.y;if(Math.abs(i)>=48&&Math.abs(i)>Math.abs(s)*1.25){this._coverSuppressClick=!0,this._coverSuppressTimer&&clearTimeout(this._coverSuppressTimer),this._coverSuppressTimer=setTimeout(()=>{this._coverSuppressClick=!1},450),this._coverSwipe(i<0?"next":"prev");return}(e.moved||Math.hypot(i,s)>12)&&(this._coverSuppressClick=!0,this._coverSuppressTimer&&clearTimeout(this._coverSuppressTimer),this._coverSuppressTimer=setTimeout(()=>{this._coverSuppressClick=!1},450))}_onCoverPointerCancel(){this._coverPress=null}_onCoverClick(){if(!this._thumbMode()){if(this._coverSuppressClick){this._coverSuppressClick=!1;return}this._coverCue("tap"),this._togglePlay()}}_power(){let t=this._state()?.state,e=t==="off"||t==="standby";this._guard(this._call(e?"turn_on":"turn_off"))}_shuffle(){let t=!!this._state()?.attributes?.shuffle;this._guard(this._call("shuffle_set",{shuffle:!t}))}_repeat(){let t=this._repeatValue(),e=si.indexOf(t),i=si[(e+1)%si.length];this._guard(this._call("repeat_set",{repeat:i}))}_seekTo(t){if(!Number.isFinite(t))return Promise.resolve(!1);let e=this._call("media_seek",{seek_position:t});return this._guard(e),e}_settleSeekPending(t,e,i){let s=this._seekPending;if(!s)return!1;let a=Number(e?.media_position),n=String(e?.media_position_updated_at||"")!==s.stamp,o=Number.isFinite(a)&&Math.abs(a-s.from)>1,l=Number.isFinite(a)&&Math.abs(a-s.value)<=2,c=Date.now()-s.at>8e3;return!t||i||c||l&&(n||o)?(this._seekPending=null,this._seekPreview=null,!0):!1}_onSeekInput(t){if(!L(this._state(),T.SEEK))return;let e=t.target,i=Number(e.value);this._seekPreview=i;let s=this._readMedia().duration;e.style.setProperty("--pct",`${s?x(i/s*100,0,100):0}%`)}_onSeekCommit(t){if(!L(this._state(),T.SEEK)){this.requestUpdate();return}let e=Number(t.target.value),i=this._state(),s=i?.attributes||{};this._seekPreview=e,this._seekPending={value:e,from:Number(s.media_position)||0,stamp:String(s.media_position_updated_at||""),trackKey:this._trackKey(i),at:Date.now()};let a=this._seekPending;this._seekTo(e).catch(()=>{this._seekPending===a&&(this._seekPending=null,this._seekPreview=null,this.requestUpdate())}),this.requestUpdate()}_onVolumeInput(t){let e=Number(t.target.value)/100;this._volumePreview=e,t.target.style.setProperty("--pct",`${e*100}%`)}_onVolumeCommit(t){let e=x(Number(t.target.value)/100,0,1);this._volumePreview=null;let i=this._volumeInfo(this._readMedia());if(i.domain==="media_player")this._guard(this._call("volume_set",{volume_level:e},"media_player",i.entityId));else{let s=this._hass?.states?.[i.entityId],a=Number(s?.attributes?.max??100),n=Number(s?.attributes?.min??0);this._guard(this._call("set_value",{value:Math.round(n+e*(a-n))},i.domain,i.entityId))}this.requestUpdate()}_toggleMute(){let t=this._readMedia(),e=this._volumeInfo(t);if(e.external){e.domain==="media_player"?this._guard(this._call("volume_mute",{is_volume_muted:!e.muted},"media_player",e.entityId)):this._notify(N(this._hass?.language)("volumeEntityMissing"));return}this._guard(this._call("volume_mute",{is_volume_muted:!t.muted}))}_selectSource(t){this._menu=null,this._guard(this._call("select_source",{source:t})),this.requestUpdate()}_selectSoundMode(t){this._menu=null,this._guard(this._call("select_sound_mode",{sound_mode:t})),this.requestUpdate()}_leaveGroup(){this._guard(this._call("unjoin"))}_playQueueItem(t){if(!t?.contentId){this._notify(N(this._hass?.language)("queueEmpty"));return}this._guard(this._call("play_media",{media_content_id:t.contentId,media_content_type:t.contentType||"music"}))}_playBrowseItem(t){t?.contentId&&this._guard(this._call("play_media",{media_content_id:t.contentId,media_content_type:t.contentType||"music"}))}_autoSwitchToPlaying(t){let e=this._entities();if(e.length<2)return;let i=!this._autoPrevStates,s={};for(let n of e)s[n]=t?.states?.[n]?.state||"";let a=ji(t,e,this._eid(),this._autoPrevStates);this._autoPrevStates=s,a&&(!i&&Date.now()-this._manualSwitchAt<15e3||this._switchEntity(a,!1))}_switchEntity(t,e=!1){t!==this._activeEntity&&(e&&(this._manualSwitchAt=Date.now()),this._activeEntity=t,this._palette=null,this._paletteKey="",this._artUrl="",this._artSource="",this._artFailedSource="",this._menu=null,this._seekPreview=null,this._seekPending=null,this._resetLyrics(),this._syncTimer(),this._sig=this._computeSig(this._hass),this.requestUpdate())}_moreInfo(){qr(this,"hass-more-info",{entityId:this._eid()})}_maEnabled(){let t=this._config?.music_assistant;if(t===!1)return!1;if(t===!0||typeof t=="string"&&t.trim()||this._hass?.services?.music_assistant?.play_media||this._entities().some(s=>{let a=this._hass?.states?.[s]?.attributes||{};return Object.keys(a).some(n=>n.startsWith("mass_"))}))return!0;let i=this._hass?.panels||{};return Object.keys(i).some(s=>{let a=i[s]||{};return a.component_name==="music_assistant"||/music[-_ ]?assistant/i.test(a.url_path||s)||/music\s*assistant/i.test(a.title||"")})}_isMaPlayer(t=this._eid()){let e=this._state(t)?.attributes||{};return Object.keys(e).some(i=>i.startsWith("mass_"))}_maUrl(){let t=this._config?.music_assistant;if(t===!1)return"";if(typeof t=="string"&&t.trim())return t.trim();let e=this._hass?.panels||{};for(let s of Object.keys(e)){let a=e[s]||{},n=a.url_path||s;if(a.component_name==="music_assistant"||/music[-_ ]?assistant/i.test(n)||/music\s*assistant/i.test(a.title||""))return`/${n}`}return this._entities().some(s=>{let a=this._hass?.states?.[s]?.attributes||{};return Object.keys(a).some(n=>n.startsWith("mass_"))})||t===!0?"/music-assistant":""}_openAssistant(){this._drawer?.open&&this._closeDrawer();let t=this._maUrl();if(!t)return;if(/^(https?:)?\/\//i.test(t)){window.open(t,"_blank","noopener");return}let e=t.startsWith("/")?t:`/${t}`;try{window.history.pushState(null,"",e),window.dispatchEvent(new Event("location-changed",{bubbles:!0,composed:!0}))}catch{window.location.href=e}}_onCardClick(t){if(!this._menu)return;(t.composedPath?.()||[]).some(s=>s?.classList?.contains?.("hm-menu")||s?.classList?.contains?.("hm-chip"))||(this._menu=null,this.requestUpdate())}_emptyDrawer(){return{open:!1,mode:null,nodes:[],cursor:-1,items:[],title:"",loading:!1,error:""}}_openQueue(){let t=N(this._hass?.language),e=je(this._state(),this._config?.max_queue??40);this._drawer={open:!0,mode:"queue",nodes:[],cursor:-1,items:e,title:t("queue"),loading:!1,error:""},this.requestUpdate()}_openLibrary(){let t=N(this._hass?.language);this._drawer={open:!0,mode:"library",nodes:[],cursor:-1,items:[],title:t("library"),loading:!0,error:"",t},this.requestUpdate(),this._fetchBrowse()}_openPlaylists(){let t=N(this._hass?.language);if(!this._isMaPlayer()){if(this._maUrl()){this._openAssistant();return}this._notify(t("maPlayerRequired"));return}this._drawer={open:!0,mode:"playlists",nodes:[],cursor:-1,items:[],title:t("playlists"),loading:!0,error:"",maUrl:this._maUrl()},this.requestUpdate(),this._fetchPlaylists()}async _browseMedia(t,e){let i=this._hass?.connection;if(!i?.sendMessagePromise)throw new Error("unsupported");let s={type:"media_player/browse_media",entity_id:this._eid()};return t&&(s.media_content_id=t,e&&(s.media_content_type=e)),i.sendMessagePromise(s)}async _fetchPlaylists(){let t=N(this._hass?.language);try{let i=(await this._browseMedia())?.children||[],s=i.find(o=>o.can_expand&&(/playlist/i.test(o.media_class||"")||/playlist/i.test(o.media_content_type||"")||/播放列表|playlists?/i.test(o.title||""))||!1),a=[];s&&(a=(await this._browseMedia(s.media_content_id,s.media_content_type))?.children||[]),a.length||(a=i.filter(o=>/playlist/i.test(o.media_class||"")));let n=a.map(o=>({title:o.title||"",subtitle:(()=>{let l=Fe(o.media_class,this._hass?.language);return l&&l!==t("playlists")?l:""})(),contentId:o.media_content_id||"",contentType:o.media_content_type||"playlist",thumb:o.thumbnail||""})).filter(o=>o.contentId);if(this._drawer.mode!=="playlists")return;this._drawer={...this._drawer,loading:!1,items:n,error:""}}catch(e){if(this._drawer.mode!=="playlists")return;this._drawer={...this._drawer,loading:!1,items:[],error:e?.message?`${t("browseFailed")} \xB7 ${String(e.message).slice(0,40)}`:t("browseFailed")}}this.requestUpdate()}async _playPlaylistItem(t){if(!t?.contentId)return;let e=N(this._hass?.language),i=this._eid();if(!this._isMaPlayer(i)){this._notify(e("maPlayerRequired"));return}let s=t.contentType||"playlist",a=()=>{this._notify(`${e("playingPlaylist")} \xB7 ${t.title||""}`),this._closeDrawer()},n=!!this._hass?.services?.music_assistant?.play_media,o=l=>{let c=l?.message||String(l);return/nothing to play here/i.test(c)?e("playlistEmpty"):c.length>60?c.slice(0,60):c};if(n)try{await this._hass.callService("music_assistant","play_media",{entity_id:i,media_id:t.contentId,media_type:"playlist",enqueue:"play"}),a();return}catch(l){let c=l?.message||String(l);if(/nothing to play here/i.test(c)){this._markPlaylistEmpty(t),this._notify(o(l));return}if(!/match|target|not a valid|does not support|unsupported/i.test(c)){this._notify(o(l));return}}try{await this._call("play_media",{media_content_id:t.contentId,media_content_type:s}),a()}catch(l){/nothing to play here/i.test(l?.message||"")&&this._markPlaylistEmpty(t),this._notify(o(l)||e("browseFailed"))}}_markPlaylistEmpty(t){this._drawer.mode==="playlists"&&(this._drawer={...this._drawer,items:this._drawer.items.map(e=>e.contentId===t.contentId?{...e,empty:!0}:e)},this.requestUpdate())}_closeDrawer(){this._drawer={...this._drawer,open:!1},this.requestUpdate(),setTimeout(()=>{this._drawer.open||(this._drawer=this._emptyDrawer(),this.requestUpdate())},zr)}async _fetchBrowse(){let t=this._hass,e=t?.connection,i=N(t?.language),s=this._drawer.cursor>=0?this._drawer.nodes[this._drawer.cursor]:null,a={type:"media_player/browse_media",entity_id:this._eid()};if(s&&(a.media_content_id=s.contentId,s.contentType&&(a.media_content_type=s.contentType)),this._drawer={...this._drawer,loading:!0,error:""},this.requestUpdate(),!e?.sendMessagePromise){this._drawer={...this._drawer,loading:!1,error:i("browseFailed")},this.requestUpdate();return}try{let n=await e.sendMessagePromise(a),o=(n?.children||[]).map(l=>({title:l.title||"",subtitle:Fe(l.media_class,this._hass?.language)||l.media_content_type||"",contentId:l.media_content_id||"",contentType:l.media_content_type||"",thumb:l.thumbnail||"",canPlay:!!l.can_play,canExpand:!!l.can_expand,cls:l.media_class||""}));if(this._drawer.mode!=="library")return;this._drawer={...this._drawer,loading:!1,items:o,title:s?.title||n?.title||i("library"),error:""}}catch(n){if(this._drawer.mode!=="library")return;this._drawer={...this._drawer,loading:!1,items:[],error:n?.message?`${i("browseFailed")} \xB7 ${String(n.message).slice(0,40)}`:i("browseFailed")}}this.requestUpdate()}_enterBrowseItem(t){if(!t.canExpand){t.canPlay&&this._playBrowseItem(t);return}let e=this._drawer.nodes.slice(0,this._drawer.cursor+1);e.push({contentId:t.contentId,contentType:t.contentType,title:t.title}),this._drawer={...this._drawer,nodes:e,cursor:e.length-1,title:t.title,items:[]},this.requestUpdate(),this._fetchBrowse()}_browseBack(){this._drawer.cursor<0||(this._drawer={...this._drawer,cursor:this._drawer.cursor-1,items:[]},this.requestUpdate(),this._fetchBrowse())}updated(){let t=this.renderRoot?.querySelector?.(".hm-card");if(!t)return;let e=this._readMedia(),i=this._state(),a=!i||i.state==="unavailable"||i.state==="unknown"?"":e.art||"",n=this._eid();if(a!==this._artSource){this._artSource=a,this._artFailedSource="";let o=++this._artSeq;re(this._hass,a,n).then(l=>{o!==this._artSeq||l===this._artUrl||(this._artUrl=l,this.requestUpdate())})}this._artUrl!==this._artApplied&&(this._artApplied=this._artUrl,this._crossFadeArt(t,this._artUrl)),this._syncRangeValues(),this._syncPanelFlag(),this._queuePanelFit(),this._installDock(),this._installLyricDock(),_t(this.renderRoot?.querySelector?.(".hm-cover img"),this._state()?.state==="playing"),this._maybeLoadLyrics(),(this._lyricsOpen||this._sideLyricsVisible())&&this._lyricsActive!==this._lyricsScrolled&&(this._lyricsScrolled=this._lyricsActive,typeof requestAnimationFrame<"u"&&requestAnimationFrame(()=>{let o=this.renderRoot?.querySelector?.(".hm-lyrics-scroll"),l=this.renderRoot?.querySelector?.('.hm-lyrics-line[data-active="true"]');if(!o||!l)return;let c=o.getBoundingClientRect(),d=l.getBoundingClientRect(),h=o.scrollTop+d.top-c.top-c.height/2+d.height/2;o.scrollTo({top:Math.max(0,h),behavior:"smooth"})})),this._syncSpectrum()}_queuePanelFit(){if(this._fitPanelRaf&&cancelAnimationFrame(this._fitPanelRaf),typeof requestAnimationFrame>"u"){this._fitPanel();return}this._fitPanelRaf=requestAnimationFrame(()=>{this._fitPanelRaf=null,this._fitPanel()})}_fitPanel(){if(!this._panel){this.style.removeProperty("--hm-panel-cover"),this.style.removeProperty("--hm-panel-height"),this._panelHeight=0;return}let t=this.renderRoot?.querySelector?.(".hm-card");if(!t)return;let e=Math.round(window.visualViewport?.height||window.innerHeight||0);if(e<240)return;let i=t.getBoundingClientRect(),s=Math.max(240,Math.min(e,Math.floor(e-Math.max(0,i.top))));s!==this._panelHeight&&(this._panelHeight=s,this.style.setProperty("--hm-panel-height",`${s}px`));let a=this.renderRoot?.querySelector?.(".hm-main");if(!a)return;let n=Math.round(a.clientHeight||0),o=Math.round(a.clientWidth||0);if(n<80||o<80)return;let l=t.clientWidth<820,c=Math.round(t.clientHeight||0),d;if(l){let h=o<560,u=h?.58:.68,p=c*(h?.3:.45);d=Math.max(120,Math.min(o*u,p))}else d=Math.max(120,Math.min(n,o*.34));this.style.setProperty("--hm-panel-cover",`${Math.round(d)}px`)}_isPanelContext(){if(this.closest?.("hui-panel-view"))return!0;let t=this.getRootNode?.();for(;t;){let e=t.host;if(!e)break;if(String(e.tagName||"").toLowerCase()==="hui-panel-view")return!0;t=e.getRootNode?.()}return!1}_syncPanelFlag(){let t=this._isPanelContext();t!==this._panel&&(this._panel=t,this.setAttribute("data-panel",String(t)),this.renderRoot?.querySelector?.(".hm-card")?.setAttribute("data-panel",String(t)))}_isThumbnailPreview(){let t=this.getRootNode?.();for(;t;){let e=t.host;if(!e)break;let i=String(e.tagName||"").toLowerCase();if(i==="hui-card-preview"||i==="hui-suggestion-card"||i==="hui-card"&&e.preview===!0)return!0;t=e.getRootNode?.()}return!!this.closest?.("hui-card-preview, hui-suggestion-card")}_thumbMode(){return this.preview===!0||this.editMode===!0||this._thumbPreview}_thumbTier(){let t=this._width||0,e=this._height||0;return t>=700&&e>=500?"lg":t>=440||e>=520?"md":"sm"}_isPreviewContext(){let t=this.getRootNode?.();for(;t;){let e=t.host;if(!e)break;let i=String(e.tagName||"").toLowerCase();if(i==="hui-card-preview"||i==="hui-card-options"||i==="hui-dialog-edit-card"||i==="ha-dialog")return!0;t=e.getRootNode?.()}return!!this.closest?.("hui-card-preview, hui-card-options")}_isMobileUi(){return this._mobileMq?!!this._mobileMq.matches:Rr()}_installDock(){if(this._isPreviewContext())return;if(this._isMobileUi()&&this._config?.mobile_hide_dock!==!1){pe(),this._dockOwner=!1;return}let t=this._config?.dock,e=it(this._config?.dock_entities),i=j(this._config?.dock_themes),s=H(),a=s?s.modes:F(t),n=s?s.entities:e,o=s?s.themes:i,l=this._eid?.()||this._config?.entity||(Array.isArray(this._config?.entities)?this._config.entities[0]:"");if(!a.length){s&&!this._isPreviewContext()&&(pe(),this._dockOwner=!1);return}if(!this._hass||!this.isConnected||!l)return;let c={};for(let h of a){let u=n[h]||l;u&&(c[h]=u)}let d=Object.entries(c).map(([h,u])=>({mode:h,entity:u,hass:this._hass,theme:o[h]||this._themeKey()}));Ft(d),s||ue({modes:Object.keys(c),entities:c,themes:Object.fromEntries(Object.keys(c).map(h=>[h,o[h]||this._themeKey()]))}),this._dockOwner=!0}_installLyricDock(){if(this._isPreviewContext())return;if(this._isMobileUi()&&this._config?.mobile_hide_lyrics!==!1){xe(),this._lyricDockOwner=!1;return}let t=this._config?.floating_lyrics!==!1,e=Number(this._config?.floating_lyrics_edited)||0,i=ye(),s=e>0&&e>=(i?.updated||0),a=s?t:i?i.enabled:t,n=this._eid?.()||this._config?.entity||(Array.isArray(this._config?.entities)?this._config.entities[0]:"");if(!a){!this._isPreviewContext()&&(s||this._lyricDockOwner)&&(ii({enabled:!1,entity:n,updated:e||Date.now()}),xe(),this._lyricDockOwner=!1);return}if(!this._hass||!this.isConnected||!n||this._isPreviewContext())return;let o=this._state(n),l=this._trackKeyFor(n,o),c=this._lyrics.status==="ready"?this._lyrics.lines:[];Kt({enabled:!0,entity:n,preferredEntity:n,auto:this._config?.floating_lyrics_auto!==!1,source:this._lyricsSource(),theme:this._themeKey(),hass:this._hass,lines:c,plain:this._lyrics.plain,trackKey:l,status:this._lyrics.status,offset:this._lyricsOffset}),ii({enabled:!0,entity:n,updated:e||i?.updated||Date.now()}),this._lyricDockOwner=!0}_trackKeyFor(t,e){let i=e?.attributes||{};return[t,i.media_title||"",i.media_artist||"",i.media_album_name||"",i.media_duration||0,i.media_content_id||""].map(s=>String(s)).join("|")}_artUrlFor(){let t=this._readMedia();return Z(this._hass,t.art)}_onArtError(){if(!this._artSource)return;this._artFailedSource=this._artSource,this._artUrl="",this._artApplied="",(this.renderRoot?.querySelector?.(".hm-card")?.querySelectorAll?.(".hm-bg-art")||[]).forEach(i=>{i.classList.remove("on"),i.style.backgroundImage=""}),this._artSlot=0,this._maybePalette(""),this.requestUpdate()}_crossFadeArt(t,e){let i=t.querySelectorAll(".hm-bg-art");if(!i.length)return;let s=i.length>1?(this._artSlot+1)%2:0,a=i[s],n=i[this._artSlot];if(!e){i.forEach(l=>{l.classList.remove("on"),l.style.backgroundImage=""}),this._artSlot=0,this._maybePalette("");return}let o=new Image;o.decoding="async",o.onload=()=>{a.style.backgroundImage=`url("${e}")`,a.classList.add("on"),n?.classList.remove("on"),this._artSlot=s,this._maybePalette(e)},o.onerror=()=>{this._onArtError()},o.src=e}_maybePalette(t){let e=this._readMedia(),i=t||`${e.title}|${e.artist}|${this._eid()}`;if(this._paletteKey!==i){if(this._paletteKey=i,!t){this._palette=null,this.requestUpdate();return}Gi(t,i).then(s=>{this._paletteKey===i&&(this._palette=s,this.requestUpdate())})}}_syncRangeValues(){let t=this.renderRoot;if(!t)return;let e=t.querySelector?.('input.hm-range[data-role="seek"]'),i=t.querySelector?.('input.hm-range[data-role="volume"]'),s=this._readMedia();if(e&&this._seekPreview===null){let a=s.duration||0,n=x(s.position,0,a||s.position);e.value=String(n),e.max=String(a||0),e.style.setProperty("--pct",`${a?x(n/a*100,0,100):0}%`)}if(i&&this._volumePreview===null){let a=this._volumeInfo(s);i.value=String(Math.round(a.level*100)),i.style.setProperty("--pct",`${a.level*100}%`),i.setAttribute("data-disabled",String(!a.supported))}}getCardSize(){let t=this._layoutKey();return t==="mini"?1:t==="compact"?3:6}getGridOptions(){let t=this.getCardSize();return{columns:this._panel?"full":12,rows:this._panel?Math.max(6,t):t,min_columns:this._panel?12:4,min_rows:this._panel?4:2,max_columns:24,max_rows:24}}getLayoutOptions(){let t=this.getGridOptions();return{grid_columns:t.columns==="full"?12:t.columns,grid_rows:t.rows,grid_min_columns:t.min_columns,grid_max_columns:t.max_columns,grid_min_rows:t.min_rows,grid_max_rows:t.max_rows}}_renderLyrics(t,e,i=!1){let s=N(this._hass?.language),a=this._lyrics,n=a.lines.length>0,o=a.plain||[],l=this._lyricsPosition(e),c=n?bs(a.lines,l,t.duration):{index:-1,progress:0},d=n?Math.max(0,c.index):-1,h=d>=0?c.progress:0;this._lyricsActive=d;let u=L(this._state(),T.SEEK),p=`${this._lyricsOffset>0?"+":""}${this._lyricsOffset.toFixed(1)}s`,m=b;return a.status==="loading"?m=b:a.status==="none"?m=g`<div class="hm-lyrics-empty">${s("lyricsNone")}</div>`:a.status==="error"?m=g`<div class="hm-lyrics-empty hm-lyrics-error">
        <span>${s("lyricsError")}</span>
        <button
          class="hm-lyrics-retry"
          @click=${f=>{f.stopPropagation(),this._retryLyrics()}}
        >
          ${s("lyricsRetry")}
        </button>
      </div>`:a.instrumental?m=g`<div class="hm-lyrics-empty">${s("lyricsInstrumental")}</div>`:n?m=a.lines.map((f,_)=>g`<button
          class="hm-lyrics-line"
          data-active=${_===d?"true":"false"}
          data-time=${f.time}
          style=${`--hm-line-progress:${_===d?Math.round(h*100):0}%`}
          @click=${()=>{u&&this._seekTo(Math.max(0,f.time-this._lyricsOffset))}}
        >
          <span class="hm-lyrics-text">${f.text}</span>
        </button>`):o.length?m=o.map(f=>g`<div class="hm-lyrics-line" data-static="true">${f}</div>`):m=g`<div class="hm-lyrics-empty">${s("lyricsNone")}</div>`,g`<section class="hm-lyrics ${i?"hm-lyrics-inline":""}" data-status=${a.status}>
      <div class="hm-lyrics-head">
        <span class="hm-lyrics-title">${s("lyrics")}</span>
        ${a.source?g`<span class="hm-lyrics-source">${a.source}</span>`:b}
        <div class="hm-lyrics-offset" title=${s("lyricsOffset")}>
          <button
            type="button"
            aria-label="-0.5s"
            @click=${f=>{f.stopPropagation(),this._bumpLyricsOffset(-.5)}}
          >−</button>
          <span>${p}</span>
          <button
            type="button"
            aria-label="+0.5s"
            @click=${f=>{f.stopPropagation(),this._bumpLyricsOffset(.5)}}
          >+</button>
        </div>
        ${i?b:g`<button
              class="hm-lyrics-close"
              aria-label=${s("close")}
              title=${s("close")}
              @click=${f=>{f.stopPropagation(),this._toggleLyrics()}}
            >
              ${k("close",14)}
            </button>`}
      </div>
      <div class="hm-lyrics-scroll">${m}</div>
    </section>`}render(){let t=this._hass,e=this._config||{},i=N(t?.language),s=this._layoutKey(),a=this._themeKey();if(!t)return g`
        <div class="hm-card" data-layout=${s} data-panel=${this._panel?"true":"false"} data-thumb=${this._thumbMode()?this._thumbTier():"false"} data-theme=${a} style=${Y(this._styleVars())}>
          <div class="hm-body">
            <div class="hm-empty">${i("loading")}</div>
          </div>
        </div>
      `;let n=this._eid(),o=t.states?.[n];if(!o)return g`
        <div class="hm-card" data-layout=${s} data-panel=${this._panel?"true":"false"} data-thumb=${this._thumbMode()?this._thumbTier():"false"} data-theme=${a} style=${Y(this._styleVars())}>
          <div class="hm-body">
            <div class="hm-empty">
              ${n?`\u5B9E\u4F53\u672A\u627E\u5230\uFF1A${n}`:"ha-music: entity \u672A\u914D\u7F6E"}
            </div>
          </div>
        </div>
      `;let l=this._readMedia(),c=je(o,e.max_queue??40),d=o.state==="playing"||o.state==="buffering",h=Nr(o.state),u=i(h),p=l.album||l.series||l.appName||(h==="playing"?i("playing"):u),m=this._volumeInfo(l),f=e.show_volume!==!1&&m.supported,_=L(o,T.SHUFFLE_SET),y=L(o,T.REPEAT_SET),v=L(o,T.PREVIOUS_TRACK),S=L(o,T.NEXT_TRACK),P=L(o,T.PLAY)||L(o,T.PAUSE),w=o.state==="off"||o.state==="standby",M=w?L(o,T.TURN_ON):L(o,T.TURN_OFF),E=L(o,T.BROWSE_MEDIA),C=this._isMaPlayer(n),R=this._maEnabled(),q=L(o,T.SEEK),O=Array.isArray(o.attributes?.source_list)?o.attributes.source_list:[],rt=Array.isArray(o.attributes?.sound_mode_list)?o.attributes.sound_mode_list:[],K=e.show_source!==!1&&O.length>0&&L(o,T.SELECT_SOURCE),Gt=rt.length>0&&L(o,T.SELECT_SOUND_MODE),ve=l.groupMembers.filter($=>$&&$!==n),di=e.show_group!==!1&&l.groupMembers.length>1,Es=e.show_queue!==!1&&c.length>0,Cs=e.show_library!==!1&&E,we=e.visualizer||"bars",Ts=e.cover||"ambient",pt=l.duration,at=this._seekPreview??l.position,Ls=pt?x(at/pt*100,0,100):0,ke=Math.round(m.level*100),mt=this._repeatValue(),Yt=l.title||"",ui=this._entities(),pi=this._lyricsEnabled()&&!this._thumbMode()&&s!=="mini"&&(this._lyrics.status==="ready"||this._lyrics.status==="loading"||this._lyrics.status==="error"||this._lyricsOpen),Wt=pi&&!this._lyricsOpen&&this._lyrics.status==="ready"&&this._sideLyricsVisible(),mi=this._lyrics.status==="ready"&&this._lyrics.lines.length&&this._lyrics.lines[Math.max(0,Bt(this._lyrics.lines,this._lyricsPosition(at)))]?.text||"",fi=o.state==="unavailable"||o.state==="unknown"?"":this._artUrl;return g`
      <div
        class="hm-card"
        data-theme=${a}
        data-layout=${s}
        data-panel=${this._panel?"true":"false"}
        data-thumb=${this._thumbMode()?this._thumbTier():"false"}
        data-playing=${d?"true":"false"}
        data-cover=${Ts}
        data-tight=${this._tight()?"true":"false"}
        style=${Y(this._styleVars())}
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
              <span class="hm-status-text hm-status-player">${e.name||se(t,n,n)}</span>
            </div>
            <div class="hm-top-actions">
              ${pi?g`<button
                    class="hm-icon-btn hm-lyrics-btn"
                    data-role="lyrics"
                    data-active=${this._lyricsOpen||Wt?"true":"false"}
                    aria-label=${i("lyrics")}
                    title=${i("lyrics")}
                    @click=${()=>this._toggleLyrics()}
                  >
                    ${k("lyrics",16)}
                  </button>`:b}
              ${R?g`<button
                    class="hm-icon-btn hm-ma"
                    aria-label=${i(C?"playlists":"openAssistant")}
                    title=${i(C?"playlists":"openAssistant")}
                    @click=${()=>this._openPlaylists()}
                  >
                    ${k(C?"playlist":"external",16)}
                  </button>`:b}
              ${Es?g`<button
                    class="hm-icon-btn"
                    aria-label=${i("queue")}
                    title=${i("queue")}
                    @click=${()=>this._openQueue()}
                  >
                    ${k("queue",16)}
                  </button>`:b}
              ${Cs?g`<button
                    class="hm-icon-btn"
                    aria-label=${i("library")}
                    title=${i("library")}
                    @click=${()=>this._openLibrary()}
                  >
                    ${k("library",16)}
                  </button>`:b}
              ${M?g`<button
                    class="hm-icon-btn"
                    data-role="power"
                    aria-label=${i("power")}
                    title=${i("power")}
                    @click=${()=>this._power()}
                  >
                    ${k("power",16)}
                  </button>`:b}
              <button
                class="hm-icon-btn"
                data-role="more"
                aria-label=${i("more")}
                title=${i("more")}
                @click=${()=>this._moreInfo()}
              >
                ${k("more",16)}
              </button>
            </div>
          </header>

          ${ui.length>1?g`
                <div class="hm-entities">
                  ${ui.map($=>{let $e=t.states?.[$],St=Z(t,$e?.attributes?.entity_picture);return g`<button
                      class="hm-entity-chip"
                      data-active=${$===n?"true":"false"}
                      @click=${()=>this._switchEntity($,!0)}
                    >
                      <span
                        class="hm-entity-dot"
                        style=${St?`background-image:url("${St}")`:""}
                      ></span>
                      <span class="hm-entity-name">${se(t,$,$)}</span>
                    </button>`})}
                </div>`:b}

          ${this._lyricsOpen?this._renderLyrics(l,at):g`<section class="hm-main">
            <div class="hm-cover-wrap">
              <button
                class="hm-cover"
                data-playing=${d?"true":"false"}
                data-gesture=${this._coverGesture||""}
                aria-label=${i(d?"pause":"play")}
                title=${Yt||i("noMedia")}
                @pointerdown=${$=>this._onCoverPointerDown($)}
                @pointermove=${$=>this._onCoverPointerMove($)}
                @pointerup=${$=>this._onCoverPointerUp($)}
                @pointercancel=${()=>this._onCoverPointerCancel()}
                @dragstart=${$=>$.preventDefault()}
                @click=${()=>this._onCoverClick()}
              >
                ${fi?g`<img
                      src=${fi}
                      alt=${Yt||""}
                      draggable="false"
                      @error=${()=>this._onArtError()}
                    />`:g`<span class="hm-cover-ph">${k("music",40)}</span>`}
              </button>
              <div class="hm-cover-halo"></div>
            </div>

            <div class="hm-info" data-side-lyrics=${Wt?"true":"false"}>
            <div class="hm-meta">
              <div class="hm-kicker">
                ${p||i("noMedia")}
                ${l.track?g`<span class="hm-kicker-sep">·</span>
                      <span>${i("track")} ${l.track}</span>`:b}
              </div>
              <h2 class="hm-title ${Yt?"":"placeholder"}">
                ${Yt||i("noTitle")}
              </h2>
              <div class="hm-artist">
                ${l.artist||(l.album?l.album:u)}
              </div>
              ${K||Gt||di?g`<div class="hm-tags">
                    ${K?g`<button
                          class="hm-chip interactive"
                          @click=${()=>{this._menu=this._menu==="source"?null:"source",this.requestUpdate()}}
                        >
                          <span class="hm-chip-label">${i("source")}</span>
                          <span class="hm-chip-value">${l.source||"\u2014"}</span>
                        </button>`:b}
                    ${Gt?g`<button
                          class="hm-chip interactive"
                          @click=${()=>{this._menu=this._menu==="sound"?null:"sound",this.requestUpdate()}}
                        >
                          <span class="hm-chip-label">${i("soundMode")}</span>
                          <span class="hm-chip-value">${l.soundMode||"\u2014"}</span>
                        </button>`:b}
                    ${di?g`<span
                          class="hm-chip ${L(o,T.GROUPING)?"interactive":""}"
                          title=${L(o,T.GROUPING)?`${i("group")} \xB7 ${i("groupLeave")}`:i("group")}
                          @click=${()=>{L(o,T.GROUPING)&&this._leaveGroup()}}
                        >
                          ${k("group",13)}
                          <span class="hm-group">
                            ${ve.slice(0,3).map($=>{let $e=t.states?.[$],St=Z(t,$e?.attributes?.entity_picture);return g`<span
                                class="hm-group-avatar"
                                title=${se(t,$,$)}
                                style=${St?`background-image:url("${St}")`:""}
                              ></span>`})}
                            ${ve.length>3?g`<span class="hm-group-more">+${ve.length-3}</span>`:b}
                          </span>
                        </span>`:b}
                  </div>`:b}
              ${mi&&!Wt&&s==="full"&&!this._thumbMode()&&(this._panel||this._height>=360)?g`<div class="hm-now-lyric">
                    <span class="hm-now-lyric-mark">${k("lyrics",12)}</span>
                    <span>${mi}</span>
                  </div>`:b}
            </div>
            ${Wt?this._renderLyrics(l,at,!0):b}
            </div>
          </section>`}

          ${we!=="none"&&!this._lyricsOpen?g`<div
                class="hm-vis"
                data-playing=${d?"true":"false"}
                data-style=${we}
              >
                ${this._renderVisualizer(we,l)}
              </div>`:b}

          ${pt>0?g`<section class="hm-progress">
                <span class="hm-time">${Dt(at)}</span>
                <input
                  class="hm-range"
                  data-role="seek"
                  type="range"
                  min="0"
                  max=${pt}
                  step="0.5"
                  .value=${String(at)}
                  data-disabled=${q?"false":"true"}
                  style=${Y({"--pct":`${Ls}%`})}
                  @input=${this._onSeekInput}
                  @change=${this._onSeekCommit}
                  aria-label=${i("seek")}
                />
                <span
                  class="hm-time end hoverable"
                  title=${i("remaining")}
                  @click=${()=>{this._showRemaining=!this._showRemaining,this.requestUpdate()}}
                >
                  ${this._showRemaining?`-${Dt(Math.max(pt-at,0))}`:Dt(pt)}
                </span>
              </section>`:b}

          <section class="hm-controls">
            <div class="hm-transport">
              ${_?g`<button
                    class="hm-btn"
                    data-role="shuffle"
                    data-on=${l.shuffle?"true":"false"}
                    aria-label=${i("shuffle")}
                    title=${i("shuffle")}
                    @click=${()=>this._shuffle()}
                  >
                    ${k("shuffle",18)}
                  </button>`:b}
              ${v?g`<button
                    class="hm-btn"
                    data-role="previous"
                    aria-label=${i("previous")}
                    title=${i("previous")}
                    @click=${()=>this._skip("prev")}
                  >
                    ${k("previous",18)}
                  </button>`:b}
              ${P?g`<button
                    class="hm-play ${d?"is-playing":""}"
                    aria-label=${i(d?"pause":"play")}
                    title=${i(d?"pause":"play")}
                    @click=${()=>this._togglePlay()}
                  >
                    ${d?k("pause",26):k("play",26)}
                  </button>`:b}
              ${S?g`<button
                    class="hm-btn"
                    aria-label=${i("next")}
                    title=${i("next")}
                    @click=${()=>this._skip("next")}
                  >
                    ${k("next",18)}
                  </button>`:b}
              ${y?g`<button
                    class="hm-btn"
                    data-role="repeat"
                    data-on=${mt!=="off"?"true":"false"}
                    aria-label=${i(mt==="one"?"repeatOne":mt==="all"?"repeatAll":"repeatOff")}
                    title=${i(mt==="one"?"repeatOne":mt==="all"?"repeatAll":"repeatOff")}
                    @click=${()=>this._repeat()}
                  >
                    ${k(mt==="one"?"repeatOne":"repeat",18)}
                  </button>`:b}
            </div>

            ${f?g`<div class="hm-volume">
                  <button
                    class="hm-icon-btn"
                    aria-label=${m.muted?i("unmute"):i("mute")}
                    title=${m.muted?i("unmute"):i("mute")}
                    @click=${()=>this._toggleMute()}
                  >
                    ${k(m.muted?"mute":"volume",16)}
                  </button>
                  <input
                    class="hm-range"
                    data-role="volume"
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    .value=${String(ke)}
                    style=${Y({"--pct":`${ke}%`})}
                    @input=${this._onVolumeInput}
                    @change=${this._onVolumeCommit}
                    aria-label=${i("volume")}
                  />
                  <span class="hm-vol-pct">${ke}%</span>
                </div>`:b}
          </section>
        </div>

        ${this._menu?g`<div class="hm-menu">
              <div class="hm-menu-head">
                ${this._menu==="source"?i("source"):i("soundMode")}
              </div>
              ${(this._menu==="source"?O:rt).map($=>g`<button
                  class="hm-menu-item"
                  data-active=${(this._menu==="source"?l.source:l.soundMode)===$?"true":"false"}
                  @click=${()=>this._menu==="source"?this._selectSource($):this._selectSoundMode($)}
                >
                  <span>${$}</span>
                  <span class="hm-menu-check">${k("check",13)}</span>
                </button>`)}
            </div>`:b}

        ${this._renderDrawer()}

        <div class="hm-toast ${this._toast?"show":""}">${this._toast}</div>
      </div>
    `}_renderVisualizer(t,e){let i=ie(e);if(t==="wave"){let a=7+i.energy*6+i.low*7,n=4.5+i.pulse*5.5,o=2.2+i.pulse*3.2,l=i.phase,c=`${(i.period*2.4).toFixed(2)}s`;return g`<div class="hm-wave-wrap">
        <svg
          viewBox="0 0 600 40"
          preserveAspectRatio="none"
          aria-hidden="true"
          style=${Y({animationDuration:c})}
        >
          <path
            d=${ri(600,40,150,a,l)}
            fill="none"
            stroke="rgba(var(--hm-a1-rgb), 0.85)"
            stroke-width="1.4"
          ></path>
          <path
            d=${ri(600,40,150,n,l*1.35+1.9)}
            fill="none"
            stroke="rgba(var(--hm-a2-rgb), 0.6)"
            stroke-width="1.2"
          ></path>
          <path
            d=${ri(600,40,75,o,l*1.7+3.2)}
            fill="none"
            stroke="rgba(var(--hm-a1-rgb), 0.35)"
            stroke-width="0.9"
          ></path>
        </svg>
      </div>`}return t==="orbit"?g`<div class="hm-orbit-wrap">
        ${[1,.58,.34].map((n,o)=>{let l=o===0?i.low:i.pulse;return g`<span
            class="hm-orbit-ring"
            style=${Y({"--react":String(n),"--drive":l.toFixed(3),animationDuration:`${(i.period*(1.8+o*.25)).toFixed(2)}s`,animationDelay:`${(o*i.period*.55).toFixed(2)}s`})}
          ></span>`})}
      </div>`:g`<div class="hm-bars">
      ${Array.from({length:36},(a,n)=>{let o=U(`${i.seed}#${n}`),l=.14+o%100/135,c=n<12?0:n<24?1:2,d=[1,.62,.34][c],h=c===0?i.low:i.pulse,u=c===0?1+.12*h:1,p=x(l*(.55+d*.55*h)*u,.08,1),m=.9+(o>>8)%100/90,f=-((o>>16)%100/45);return g`<span
          class="hm-bar"
          style=${Y({"--h":p.toFixed(3),"--dur":`${m.toFixed(2)}s`,"--delay":`${f.toFixed(2)}s`})}
        ></span>`})}
    </div>`}_stopSpectrum(){this._spectrumRaf&&cancelAnimationFrame(this._spectrumRaf),this._spectrumRaf=null,this._spectrumLast=0}_spectrumPlaying(){let t=this._state()?.state;return t==="playing"||t==="buffering"}_resetAudioShape(){this._audioShape={bars:[],mean:[],prev:[],peak:0,lowFast:0,lowSlow:0,fluxMean:.02,beatEnv:0,punch:0,low:0}}_ensureAudioShape(t){this._audioShape||this._resetAudioShape();let e=this._audioShape;return e.mean.length!==t&&(e.mean=new Array(t).fill(0),e.prev=new Array(t).fill(0),e.bars=new Array(t).fill(0),e.peak=0,e.lowFast=0,e.lowSlow=0,e.fluxMean=.02,e.beatEnv=0),e}_ensureSpectrumPlaylist(){let t=this._spectrumPlaylistUrl;if(!t||this._spectrumPlaylistLoading)return;let e=Date.now();if(this._spectrumPlaylist&&e-this._spectrumPlaylistAt<10*60*1e3||!this._spectrumPlaylist&&this._spectrumPlaylistErrorAt&&e-this._spectrumPlaylistErrorAt<60*1e3)return;this._spectrumPlaylistLoading=!0;let i=typeof AbortController<"u"?new AbortController:null;this._spectrumPlaylistAbort=i,fetch(t,{cache:"no-store",signal:i?.signal}).then(s=>{if(!s.ok)throw new Error(String(s.status));return s.json()}).then(s=>{let a=He(s);if(!a.length)throw new Error("empty playlist");this._spectrumPlaylist=a,this._spectrumPlaylistAt=Date.now(),this._spectrumPlaylistErrorAt=0,this._spectrumResolvedUrl="",this._spectrumTrack=null,this._syncSpectrumTrack(this._readMedia()),this._syncSpectrum()}).catch(s=>{s?.name!=="AbortError"&&(this._spectrumPlaylistErrorAt=Date.now())}).finally(()=>{this._spectrumPlaylistAbort===i&&(this._spectrumPlaylistAbort=null),this._spectrumPlaylistLoading=!1})}_syncSpectrumTrack(t=this._readMedia()){let e=this._spectrumAudioUrl,i=null;if(this._spectrumPlaylistUrl&&(this._ensureSpectrumPlaylist(),this._spectrumPlaylist&&(i=Hi(this._spectrumPlaylist,t),i?.url&&(e=i.url))),e===this._spectrumResolvedUrl&&i===this._spectrumTrack)return e;this._spectrumResolvedUrl=e||"",this._spectrumTrack=i,this._audioFailedUrl="";let s=this._audioGestureArmed;return this._resetAudioShape(),this._teardownAudioSpectrum(),s&&this._spectrumResolvedUrl&&(this._audioGestureArmed=!0,this._ensureAudioSpectrum(),this._startAudioElement()),this._spectrumResolvedUrl}_primeAudioSpectrum(){(this._config?.visualizer||"bars")==="bars"&&(this._audioGestureArmed=!0,this._audioFailedUrl="",this._audioZeroFrames=0,this._spectrumResolvedUrl||this._syncSpectrumTrack(this._readMedia()),this._spectrumResolvedUrl&&(this._ensureAudioSpectrum(),this._resumeAudioContext(),this._startAudioElement()))}_ensureAudioSpectrum(){let t=this._spectrumResolvedUrl;if(!t||this._audioFailedUrl===t)return null;if(this._audioEl&&this._audioAnalyser&&this._audioBins)return this._audioAnalyser;this._audioEl&&this._teardownAudioSpectrum();try{let e=window.AudioContext||window.webkitAudioContext;if(!e)return this._failAudioSpectrum(),null;if(!Bi(t,typeof location<"u"?location.href:""))return this._audioFailedUrl=t,null;let i=new Audio;i.crossOrigin="anonymous",i.preload="auto",i.setAttribute("playsinline",""),i.addEventListener("error",()=>this._failAudioSpectrum()),i.src=t,i.load();let s=new e,a=s.createMediaElementSource(i),n=s.createAnalyser();n.fftSize=2048,n.smoothingTimeConstant=.55,n.minDecibels=-84,n.maxDecibels=-30,a.connect(n);let o=s.createGain();return o.gain.value=0,n.connect(o),o.connect(s.destination),this._audioEl=i,this._audioCtx=s,this._audioSource=a,this._audioAnalyser=n,this._audioMute=o,this._audioBins=new Uint8Array(n.frequencyBinCount),this._resetAudioShape(),n}catch{return this._failAudioSpectrum(),null}}_resumeAudioContext(){this._audioCtx?.state==="suspended"&&this._audioCtx.resume().catch(()=>{})}_startAudioElement(){let t=this._audioEl;if(!t||!this._audioGestureArmed)return;this._resumeAudioContext();let e=t.play();e?.catch&&e.catch(()=>{}),this._audioStartedAt=performance.now()}_pauseAudioSpectrum(){this._audioEl?.pause()}_teardownAudioSpectrum(){let t=this._audioEl;if(t)try{t.pause(),t.removeAttribute("src"),t.load()}catch{}try{this._audioSource?.disconnect(),this._audioAnalyser?.disconnect(),this._audioMute?.disconnect()}catch{}this._audioCtx&&this._audioCtx.close().catch(()=>{}),this._audioEl=null,this._audioCtx=null,this._audioSource=null,this._audioAnalyser=null,this._audioMute=null,this._audioBins=null,this._audioZeroFrames=0,this._audioPeak=0,this._audioStartedAt=0,this._audioGestureArmed=!1,this._resetAudioShape()}_failAudioSpectrum(){this._spectrumResolvedUrl&&(this._audioFailedUrl=this._spectrumResolvedUrl,this._teardownAudioSpectrum())}_syncAudioPlayback(t,e){let i=this._audioEl;if(!i)return;if(!t){i.pause();return}this._audioGestureArmed&&i.paused&&this._startAudioElement();let s=i.duration,a=Number(e.duration),n=Number.isFinite(s)&&s>0&&Number.isFinite(a)&&a>0&&Math.abs(s-a)<5,o=!n&&!a&&Number.isFinite(s)&&s>0&&Number.isFinite(e.position)&&e.position>0&&e.position<s-1;if((n||o)&&i.readyState>=1&&Number.isFinite(i.currentTime)&&Number.isFinite(e.position)&&Math.abs(i.currentTime-e.position)>2.5)try{i.currentTime=e.position}catch{}}_audioSpectrumReady(){return!!(this._audioEl&&!this._audioEl.paused&&this._audioEl.readyState>=2&&this._audioAnalyser&&this._audioBins&&this._audioCtx?.state==="running"&&this._audioFailedUrl!==this._spectrumResolvedUrl)}_readAudioLevels(t){let e=this._audioAnalyser,i=this._audioBins,s=this._audioCtx;if(!e||!i||!s)return null;e.getByteFrequencyData(i);let a=s.sampleRate/2,n=100,o=Math.min(6500,a),l=s.sampleRate/e.fftSize,c=Math.max(1,Math.floor(n/l)),d=Math.min(i.length-1,Math.max(c+1,Math.ceil(o/l))),h=d/c,u=new Array(t),p=0;for(let m=0;m<t;m+=1){let f=t>1?m/(t-1):0,_=t>1?(m+1)/(t-1):1,y=x(Math.floor(c*Math.pow(h,Math.pow(f,.6))),c,d),v=x(Math.max(y+1,Math.ceil(c*Math.pow(h,Math.pow(_,.6)))),y,d),S=0,P=0,w=0;for(let C=y;C<=v;C+=1){let R=i[C]||0;R>w&&(w=R),S+=R,P+=1}let M=P?S/P:0,E=.7+3.5*Math.pow(t>1?m/(t-1):0,1.15);u[m]=x(M/255*E,0,1.6),w>p&&(p=w)}return this._audioPeak=p,u}_shapeAudioBars(t){let e=t.length,i=this._ensureAudioShape(e),s=0,a=0,n=0;for(let p=0;p<e;p+=1){let m=t[p]||0;m>s&&(s=m),p<Math.max(3,Math.floor(e/12))&&(a+=m,n+=1)}let o=Math.max(s,i.peak*.978,.05);i.peak=o;let l=n?a/n:0;i.lowFast+=(l-i.lowFast)*.42,i.lowSlow+=(l-i.lowSlow)*.052;let c=i.lowSlow>.001?(i.lowFast-i.lowSlow)/i.lowSlow:0;c=x(c,0,1.6);let d=0;for(let p=0;p<e;p+=1){let m=t[p]-(i.prev[p]||0);m>0&&(d+=m),i.prev[p]=t[p]||0}i.fluxMean+=(d-i.fluxMean)*.04;let h=i.fluxMean>.004?d/(i.fluxMean*2.6)-.4:0;h=x(h,0,1),i.beatEnv=h>i.beatEnv?h:i.beatEnv*.86;let u=new Array(e);for(let p=0;p<e;p+=1){let m=t[p]||0,f=e>1?p/(e-1):0,_=Math.min(.6,m/o),y=i.mean[p]||(m>0?m:.02),v=m/Math.max(.015,y);i.mean[p]=y+(m-y)*.035;let S=Math.pow(f,.6),P=.12+(1.45-.12)*S,w=.94+(.45-.94)*S,M=x((v-w)/P,0,1),E=.72+.22*f,C=_*(1-E)+M*E,R=1.35+.42*(1-f),q=Math.pow(1-f,2),O=C*(1-.28*q*(1-i.beatEnv))+.65*i.beatEnv*q;u[p]=x(O*R*(1+.12*c),0,1)}return i.punch=c,i.low=x((u[0]+u[1]+u[2])/3,0,1),{bars:u,punch:c,low:i.low}}_syncSpectrum(){let t=Array.from(this.renderRoot?.querySelectorAll?.(".hm-bar")||[]);if(!t.length||this._thumbPreview||(this._config?.visualizer||"bars")!=="bars"){this._spectrumBars=[],this._stopSpectrum(),this._teardownAudioSpectrum();return}this._spectrumBars=t;let e=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches;if(!this._spectrumPlaying()||e){this._stopSpectrum(),this._syncAudioPlayback(!1,this._readMedia()),this._applySpectrumIdle();return}let i=this._readMedia();this._syncSpectrumTrack(i),this._ensureAudioSpectrum(),this._syncAudioPlayback(!0,i),!this._spectrumRaf&&(this._spectrumLast=0,this._spectrumRaf=requestAnimationFrame(s=>this._spectrumTick(s)))}_applySpectrumIdle(){let t=ie(this._readMedia()),e=this._spectrumBars.length;for(let i=0;i<e;i+=1){let s=i<12?0:i<24?1:2,a=.12+[.1,.06,.03][s],n=Math.min(.24,a+t.energy*.04);this._spectrumBars[i]?.style.setProperty("--h",n.toFixed(3))}}_maAnalysisAvailable(){let t=this._hass?.services;return!!(t?.ha_music_analysis?.get_track_analysis||t?.ha_music_analysis?.get_track_analysis)}_ensureMaAnalysis(t,e){if(!this._maAnalysisAvailable()||!e||!this._eid()||this._maAnalysis?.key===e||this._maAnalysisLoadingKey===e||this._maAnalysisFailedKey===e&&Date.now()-this._maAnalysisFailedAt<60*1e3)return;this._maAnalysisLoadingKey=e;let i=this._eid(),s;try{s=this._hass.callService("ha_music_analysis","get_track_analysis",{entity_id:i},void 0,!1,!0)}catch{this._maAnalysisLoadingKey="",this._maAnalysisFailedKey=e,this._maAnalysisFailedAt=Date.now();return}Promise.resolve(s).then(a=>{let n=a?.service_response??a?.response??a,o=n?.[i]??n,l=Array.isArray(o?.waveform)?o.waveform:Array.isArray(o)?o:null;if(!l?.length){this._maAnalysisFailedKey=e,this._maAnalysisFailedAt=Date.now();return}this._maAnalysis={key:e,waveform:l,bpm:Number(o?.bpm)||0,energy:Number(o?.energy)||0,duration:Number(o?.duration)||Number(t.duration)||0,title:o?.title||"",artist:o?.artist||"",source:o?.bpm_source||""},this._maAnalysisKey=e,this._maAnalysisAt=Date.now(),this._maAnalysisFailedKey="",this._maAnalysisFailedAt=0,this._resetAudioShape()}).catch(()=>{this._maAnalysisFailedKey=e,this._maAnalysisFailedAt=Date.now()}).finally(()=>{this._maAnalysisLoadingKey===e&&(this._maAnalysisLoadingKey="")})}_maSpectrumShaped(t,e){let i=this._maAnalysis;if(!i||i.key!==this._spectrumKey||!i.waveform?.length)return null;let s=i.waveform,a=i.duration||Number(e.duration)||0,n=Number(e.position)||0,l=(a>0?x(n/a,0,.999):0)*(s.length-1),c=a>0?s.length/Math.max(1,a):s.length/180,d=x(Math.round(c*2.8),8,Math.min(s.length,240)),h=Math.max(1,d/Math.max(1,t-1)),u=Math.max(1,Math.round(c*.14)),p=new Array(t),m=Number(i.bpm)||0,f=m>20?60/m:0;for(let _=0;_<t;_+=1){let y=t>1?_/(t-1):0,v=x(Math.round(l-(t-1-_)*h),0,s.length-1),S=x(v-u,0,s.length-1),P=Number(s[v])||0,w=Number(s[S])||0,M=Math.max(0,P-w),E=1-.52*Math.pow(y,.85),C=Math.pow(1-y,2),R=x(M*4.2,0,1);if(f>0){let q=(n%f+f)%f/f;R=Math.max(R,Math.exp(-q*5.2))}p[_]=x(P*(1.42*E+.2)+R*.56*C,0,1.6)}return this._shapeAudioBars(p)}_spectrumTick(t){if(!this._spectrumBars.length){this._stopSpectrum();return}if(!this._spectrumPlaying()){this._applySpectrumIdle(),this._syncAudioPlayback(!1,this._readMedia()),this._stopSpectrum();return}let e=this._spectrumLast?Math.min(.05,Math.max(.001,(t-this._spectrumLast)/1e3)):.016;this._spectrumLast=t;let i=this._readMedia(),s=ie(i),a=this._trackKey(this._state());a!==this._spectrumKey&&(this._spectrumKey=a,this._spectrumLevels=this._spectrumBars.map(()=>.12),this._syncSpectrumTrack(i)),this._ensureMaAnalysis(i,a);let n=t/1e3,o=this._spectrumLevels,l=this._spectrumBars.length,c=this._audioSpectrumReady(),d=c?this._readAudioLevels(l):null,u=(d?this._shapeAudioBars(d):null)?.bars||null,m=(u?null:this._maSpectrumShaped(l,i))?.bars||null;c&&(!this._audioPeak&&t-this._audioStartedAt>1500?(this._audioZeroFrames+=1,this._audioZeroFrames>90&&this._failAudioSpectrum()):this._audioPeak&&(this._audioZeroFrames=0));for(let f=0;f<l;f+=1){let _;if(u)_=u[f];else if(m)_=m[f];else{let w=f<12?0:f<24?1:2,M=U(`${s.seed}#${f}`),E=M%360/360*Math.PI*2,R=1.02-f/Math.max(1,l-1)*.5+Math.sin(f*1.7+E)*.1,q=.5+.5*Math.sin(n*2.35+E+f*.28),O=.5+.5*Math.sin(n*7.6+E*1.7+f*.62),rt=.5+.5*Math.sin(i.position/(1.65+s.hash%45/100)*Math.PI*2+E),K=w===0?s.low:w===1?s.pulse:.45,Gt=Math.sin(n*3.3+M*7e-4)>.88?1.16:1;_=x(R*(.52+q*.54)*(.76+O*.34)*(.8+rt*.4)*(.86+K*.24)*Gt,.1,1)}let y=Number.isFinite(o[f])?o[f]:.12,v=u||m,S=_>y?v?.72:.52:v?.22:.24,P=y+(_-y)*(1-Math.exp(-S*e*60));o[f]=P,this._spectrumBars[f]?.style.setProperty("--h",P.toFixed(3))}this._spectrumRaf=requestAnimationFrame(f=>this._spectrumTick(f))}_renderDrawer(){let t=this._drawer,e=N(this._hass?.language),i=t.mode==="library",s=t.mode==="playlists";return g`
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
                ${k("chevronLeft",16)}
              </button>`:b}
          <div class="hm-drawer-title">${t.title||(i?e("library"):"")}</div>
          ${s&&t.maUrl?g`<button
                class="hm-icon-btn hm-ma"
                aria-label=${e("openAssistant")}
                title=${e("openAssistant")}
                @click=${()=>this._openAssistant()}
              >
                ${k("external",15)}
              </button>`:b}
          <button
            class="hm-icon-btn"
            aria-label=${e("close")}
            title=${e("close")}
            @click=${()=>this._closeDrawer()}
          >
            ${k("close",16)}
          </button>
        </div>
        <div class="hm-drawer-body">
          ${t.loading?g`<div class="hm-empty"><span class="hm-spinner"></span></div>`:t.error?g`<div class="hm-empty">${t.error}</div>`:t.items.length?this._renderDrawerItems(t.items,t.mode):g`<div class="hm-empty">
                    ${e(i?"browseFailed":s?"playlistsEmpty":"queueEmpty")}
                  </div>`}
        </div>
      </div>
    `}_renderDrawerItems(t,e){let i=N(this._hass?.language),s=e==="library",a=e==="playlists";return t.map(n=>{if(a){let l=Z(this._hass,n.thumb);return g`<button
          class="hm-list-item"
          data-empty=${n.empty?"true":"false"}
          @click=${()=>this._playPlaylistItem(n)}
        >
          <span
            class="hm-list-thumb"
            style=${l?`background-image:url("${l}")`:""}
          >
            ${l?b:k("playlist",16)}
          </span>
          <span class="hm-list-text">
            <span class="hm-list-name">${n.title||"\u2014"}</span>
            <span class="hm-list-sub">${n.empty?i("playlistUnavailable"):n.subtitle}</span>
          </span>
          <span class="hm-list-tail">${k("play",14)}</span>
        </button>`}if(s){let l=Z(this._hass,n.thumb);return g`<button
          class="hm-list-item"
          @click=${()=>this._enterBrowseItem(n)}
        >
          <span
            class="hm-list-thumb"
            style=${l?`background-image:url("${l}")`:""}
          >
            ${l?b:k(n.canExpand?"library":"music",16)}
          </span>
          <span class="hm-list-text">
            <span class="hm-list-name">${n.title||"\u2014"}</span>
            <span class="hm-list-sub">${n.subtitle}</span>
          </span>
          <span class="hm-list-tail">
            ${n.canExpand?k("chevronRight",14):b}
          </span>
        </button>`}let o=Z(this._hass,n.art);return g`<button
        class="hm-list-item"
        data-active=${n.active?"true":"false"}
        @click=${()=>this._playQueueItem(n)}
      >
        <span
          class="hm-list-thumb"
          style=${o?`background-image:url("${o}")`:""}
        >
          ${o?b:k("music",16)}
        </span>
        <span class="hm-list-text">
          <span class="hm-list-name">${n.title||i("noTitle")}</span>
          <span class="hm-list-sub">${n.artist||n.album||""}</span>
        </span>
        <span class="hm-list-tail">${n.duration?Dt(n.duration):""}</span>
      </button>`})}static getStubConfig(t){let e=t?.states||{};return{entity:Object.keys(e).find(s=>s.startsWith("media_player.")&&e[s]?.attributes?.supported_features!==void 0)||"",theme:W}}static getConfigElement(){return document.createElement("ha-music-editor")}};customElements.get("ha-music")||(customElements.define("ha-music",ai),window.customCards=window.customCards||[],window.customCards.push({type:Ii,name:Fi,description:"\u73B0\u4EE3\u70AB\u9177\u914D\u8272\u7684\u5168\u529F\u80FD\u97F3\u4E50\u64AD\u653E\u5668\u5361\u7247\uFF1A\u5C01\u9762\u53D6\u8272\u3001\u9891\u8C31\u53EF\u89C6\u5316\u3001\u5A92\u4F53\u5E93\u6D4F\u89C8\u3001\u64AD\u653E\u961F\u5217\u3001\u591A\u8BBE\u5907\u5207\u6362\u3002",preview:!0,documentationURL:"https://github.com/RockJesus/ha-music"}),console.info(`%c HA-MUSIC %c v${Ui} `,"background:#2ee6c5;color:#04121a;font-weight:700;border-radius:4px 0 0 4px","background:#7b5cff;color:#fff;border-radius:0 4px 4px 0"));function Dr(r,t){r.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}var ni=class extends B{static get properties(){return{hass:{attribute:!1},_config:{state:!0}}}static get styles(){return Pt`
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
    `}constructor(){super(),this._config={},this._lang="en",this._pendingEntity=!1}setConfig(t){let e=Array.isArray(t?.entities)?t.entities.filter(i=>typeof i=="string"&&i.trim()):void 0;this._config={...t,...e?{entities:e}:{}}}willUpdate(){let t=this.hass?.language||this._lang;t!==this._lang&&(this._lang=t)}get _zh(){return te(this._lang||this.hass?.language)}_update(t){let e={...this._config,...t};Object.keys(e).forEach(i=>{e[i]===void 0&&delete e[i]}),this._config=e,Dr(this,e)}_optionLabel(t){return this._zh?t.zh:t.en}_dockModes(){let t=H();return t?t.modes:F(this._config?.dock)}_dockEntities(){let t=H();return t?t.entities:it(this._config?.dock_entities)}_dockThemes(){let t=H();return t?t.themes:j(this._config?.dock_themes)}_syncDockGlobal(t={}){let e=F(t.dock??this._dockModes()),i=it(t.dock_entities??this._dockEntities()),s=j(t.dock_themes??this._dockThemes());ue({modes:e,entities:i,themes:s})}_setDockTheme(t,e){let i={...this._dockThemes()};e?i[t]=e:delete i[t],this._update({dock_themes:i,dock_edited:Date.now()}),this._syncDockGlobal({dock_themes:i})}_mainEntity(){return this._entities()[0]||this._config?.entity||""}_toggleDock(t,e){let i=this._dockModes(),s=this._dockEntities(),a;e?(a=i.includes(t)?i:[...i,t],!s[t]&&this._mainEntity()&&(s[t]=this._mainEntity())):a=i.filter(n=>n!==t),this._update({dock:a.length?a:"none",dock_entities:s,dock_edited:Date.now()}),this._syncDockGlobal({dock:a.length?a:"none",dock_entities:s})}_setDockEntity(t,e){let i={...this._dockEntities(),[t]:e||""},s=this._dockModes();!i[t]&&s.includes(t)&&this._mainEntity()&&(i[t]=this._mainEntity()),i[t]||delete i[t],this._update({dock_entities:i,dock_edited:Date.now()}),this._syncDockGlobal({dock_entities:i})}_entities(){return Array.isArray(this._config.entities)&&this._config.entities.length?this._config.entities:[]}_setEntity(t,e){let i=this._entities();if(!i.length){this._update({entity:e||void 0});return}let s=[...i];s[t]=e,this._update({entities:s})}_addEntity(){this._pendingEntity||(this._pendingEntity=!0,this.requestUpdate())}_commitPendingEntity(t){let e=String(t||"").trim();if(this._pendingEntity=!1,!e){this.requestUpdate();return}let i=this._entities();if(i.length){this._update({entities:[...i,e]});return}let s=String(this._config?.entity||"").trim();this._update({entity:void 0,entities:s?[s,e]:[e]})}_cancelPendingEntity(){this._pendingEntity=!1,this.requestUpdate()}_removeEntity(t){let e=this._entities().filter((i,s)=>s!==t);if(e.length<=1){this._update({entity:e[0]||void 0,entities:void 0});return}this._update({entities:e})}render(){let t=this._config||{},e=this._entities(),i=this._dockModes(),s=this._dockEntities(),a=(n,o,l)=>g`
      <ha-entity-picker
        .hass=${this.hass}
        .value=${n||""}
        .includeDomains=${["media_player"]}
        .allowCustomEntity=${!1}
        .label=${l}
        @value-changed=${c=>{c.stopPropagation(),o(c.detail?.value??"")}}
      ></ha-entity-picker>
    `;return g`
      <div class="wrap">
        <div class="section">
          <div class="section-title">${this._zh?"\u64AD\u653E\u5668":"Player"}</div>
          ${e.length?e.map((n,o)=>g`
                  <div class="entity-row">
                    ${a(n,l=>this._setEntity(o,l),o===0?this._zh?"\u64AD\u653E\u5668":"Player":this._zh?"\u8BBE\u5907":"Player")}
                    <button
                      class="mini-btn"
                      @click=${()=>this._removeEntity(o)}
                      title=${this._zh?"\u79FB\u9664":"Remove"}
                    >
                      ${this._zh?"\u79FB\u9664":"Remove"}
                    </button>
                  </div>
                `):g`<div class="entity-row">
                ${a(t.entity||"",n=>this._setEntity(0,n),this._zh?"\u64AD\u653E\u5668":"Player")}
              </div>`}
          ${this._pendingEntity?g`<div class="entity-row">
                ${a("",n=>this._commitPendingEntity(n),this._zh?"\u9009\u62E9\u8981\u6DFB\u52A0\u7684\u64AD\u653E\u5668":"Pick a player to add")}
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
                @change=${n=>this._update({layout:n.target.value})}
              >
                ${Object.keys(Oe).map(n=>g`<option value=${n} ?selected=${t.layout===n}>
                      ${this._optionLabel(Oe[n])}
                    </option>`)}
              </select>
            </label>
            <label class="field">
              <span class="label">${this._zh?"\u4E3B\u9898":"Theme"}</span>
              <select
                .value=${t.theme||"aurora"}
                @change=${n=>this._update({theme:n.target.value})}
              >
                ${Object.keys(z).map(n=>g`<option value=${n} ?selected=${t.theme===n}>
                      ${this._optionLabel(z[n].label)}
                    </option>`)}
              </select>
            </label>
            <label class="field">
              <span class="label">${this._zh?"\u80CC\u666F":"Background"}</span>
              <select
                .value=${t.cover||"ambient"}
                @change=${n=>this._update({cover:n.target.value})}
              >
                ${Object.keys(Ue).map(n=>g`<option value=${n} ?selected=${t.cover===n}>
                      ${this._optionLabel(Ue[n])}
                    </option>`)}
              </select>
            </label>
            <label class="field">
              <span class="label">${this._zh?"\u9891\u8C31\u52A8\u6548":"Visualizer"}</span>
              <select
                .value=${t.visualizer||"bars"}
                @change=${n=>this._update({visualizer:n.target.value})}
              >
                ${Object.keys(Ie).map(n=>g`<option value=${n} ?selected=${t.visualizer===n}>
                      ${this._optionLabel(Ie[n])}
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
              @change=${n=>this._update({spectrum_playlist_url:n.target.value.trim()||void 0})}
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
              @change=${n=>this._update({spectrum_audio_url:n.target.value.trim()||void 0})}
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
              .value=${t.lyrics_source||De}
              @change=${n=>this._update({lyrics_source:n.target.value})}
            >
              ${Object.keys(Ne).map(n=>g`<option value=${n} ?selected=${(t.lyrics_source||De)===n}>
                    ${this._optionLabel(Ne[n])}
                  </option>`)}
            </select>
            <span class="hint">
              ${this._zh?"\u81EA\u52A8\uFF1AQQ/\u7F51\u6613\u4E91\u540E\u7AEF\u53EF\u7528\u65F6\u4F18\u5148\uFF0C\u540E\u7AEF\u7F3A\u5931\u6216\u672A\u5339\u914D\u65F6\u81EA\u52A8\u56DE\u9000 LRCLIB \u540C\u6B65\u6B4C\u8BCD\uFF0C\u6700\u540E\u7528 Lyrics.ovh \u7EAF\u6587\u672C\u515C\u5E95\u3002":"Auto: prefer the QQ/NetEase backend when available, then LRCLIB synced lyrics, then Lyrics.ovh plain-text fallback."}
            </span>
          </label>
          ${this._switch(this._zh?"\u5168\u5C40\u6B4C\u8BCD\u60AC\u6D6E\u7A97\uFF08\u5355\u884C / \u957F\u6309\u62D6\u52A8\uFF09":"Global floating lyric (one line, long-press drag)",t.floating_lyrics!==!1,n=>this._update({floating_lyrics:n,floating_lyrics_edited:Date.now()}))}
          ${this._switch(this._zh?"\u6B4C\u8BCD\u81EA\u52A8\u8DDF\u968F\u6B63\u5728\u64AD\u653E\u7684\u64AD\u653E\u5668":"Auto-follow the playing player",t.floating_lyrics_auto!==!1,n=>this._update({floating_lyrics_auto:n}))}
          ${this._switch(this._zh?"\u79FB\u52A8\u7AEF\u81EA\u52A8\u9690\u85CF\u60AC\u6D6E\u64AD\u653E\u5668":"Hide floating player on mobile",t.mobile_hide_dock!==!1,n=>this._update({mobile_hide_dock:n}))}
          ${this._switch(this._zh?"\u79FB\u52A8\u7AEF\u81EA\u52A8\u9690\u85CF\u60AC\u6D6E\u6B4C\u8BCD":"Hide floating lyrics on mobile",t.mobile_hide_lyrics!==!1,n=>this._update({mobile_hide_lyrics:n}))}
          <span class="hint">
            ${this._zh?"\u4EC5\u624B\u673A\uFF08\u7C97\u6307\u9488\u7A84\u5C4F / \u6A2A\u5C4F\u77EE\u5C4F\uFF09\u751F\u6548\uFF1B\u684C\u9762\u548C\u5E73\u677F\u4E0D\u53D7\u5F71\u54CD\u3002":"Phone only (coarse pointer narrow screen / short landscape); desktop and tablet are unaffected."}
          </span>
          ${this._switch(this._zh?"\u663E\u793A\u5206\u7EC4\u4FE1\u606F":"Show group info",t.show_group!==!1,n=>this._update({show_group:n}))}
          ${this._switch(this._zh?"\u663E\u793A Music Assistant \u6B4C\u5355\u5165\u53E3":"Show Music Assistant playlists",t.music_assistant!==!1,n=>this._update({music_assistant:n?typeof t.music_assistant=="string"?t.music_assistant:!0:!1}))}
          <label class="field">
            <span class="label">
              ${this._zh?"MA \u9762\u677F\u5730\u5740\uFF08\u7559\u7A7A\u81EA\u52A8\uFF0C\u4EC5\u4F9B\u62BD\u5C49\u5185\u8DF3\u8F6C\uFF09":"MA panel URL (optional)"}
            </span>
            <input
              type="text"
              .value=${typeof t.music_assistant=="string"?t.music_assistant:""}
              .disabled=${t.music_assistant===!1}
              placeholder="/music-assistant"
              @input=${n=>this._update({music_assistant:n.target.value.trim()||!0})}
            />
            <span class="hint">
              ${this._zh?"\u7559\u7A7A\u81EA\u52A8\u8BFB\u53D6 HA \u9762\u677F\u8DEF\u5F84\uFF1B\u6B4C\u5355\u5165\u53E3\u672C\u8EAB\u4E0D\u4F9D\u8D56\u6B64\u9879":"Leave empty to auto-detect the HA panel path"}
            </span>
          </label>
          <div class="section-title">${this._zh?"\u5168\u5C40\u8FF7\u4F60\u64AD\u653E\u5668":"Global mini players"}</div>
          <div class="hint">
            ${this._zh?"\u4E09\u4E2A\u4F4D\u7F6E\u53EF\u4EE5\u540C\u65F6\u542F\u7528\uFF0C\u4E5F\u53EF\u4EE5\u5206\u522B\u9009\u62E9\u5404\u81EA\u7684\u64AD\u653E\u5668\u5B9E\u4F53\uFF1B\u5355\u51FB\u64AD\u653E/\u6682\u505C\uFF0C\u53CC\u51FB\u6298\u53E0\u6216\u5C55\u5F00\u3002\u9876\u90E8\u53EA\u53EF\u5DE6\u53F3\u79FB\u52A8\u3001\u4FA7\u8FB9\u680F\u53EA\u53EF\u4E0A\u4E0B\u79FB\u52A8\uFF1B\u53F3\u4E0B\u89D2\u957F\u6309\u540E\u53EF\u4EFB\u610F\u62D6\u52A8\uFF0C\u4F46\u4E0D\u80FD\u8FDB\u5165\u4FA7\u8FB9\u680F\u548C\u9876\u680F\u3002":"Each position can use its own entity; click to play/pause, double-click to fold, long-press to drag."}
          </div>
          ${(()=>{let n=this._dockThemes();return[["top",this._zh?"\u9876\u90E8\u64AD\u653E\u5668":"Top bar"],["sidebar",this._zh?"\u4FA7\u8FB9\u680F\u64AD\u653E\u5668":"Sidebar"],["fab",this._zh?"\u53F3\u4E0B\u89D2\u64AD\u653E\u5668":"Bottom-right"]].map(([o,l])=>{let c=i.includes(o),d=s[o]||this._mainEntity(),h=n[o]||this._config.theme||"aurora";return g`
              <div class="dock-row">
                <label class="check">
                  <input
                    type="checkbox"
                    .checked=${c}
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
                  ${c?g`<select
                        class="dock-theme"
                        .value=${h}
                        @change=${u=>this._setDockTheme(o,u.target.value)}
                        title=${this._zh?"\u64AD\u653E\u5668\u4E3B\u9898":"Player theme"}
                      >
                        ${Object.keys(z).map(u=>g`<option value=${u} ?selected=${h===u}>
                              ${this._optionLabel(z[u].label)}
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
    </label>`}};customElements.get("ha-music-editor")||customElements.define("ha-music-editor",ni);var Vt=new URL(import.meta.url),oi=Vt.searchParams.get("dock"),li=H(),At=oi?F(oi==="1"?"top":oi):li?.modes||[],ci={...li?.entities||{}},hi=j(li?.themes),As=Vt.searchParams.get("dock_entity");As&&At[0]&&(ci[At[0]]=As);var Ss=Vt.searchParams.get("dock_theme");Ss&&At[0]&&(hi[At[0]]=Ss);for(let r of At){let t=Vt.searchParams.get(`dock_entity_${r}`);t&&(ci[r]=t);let e=Vt.searchParams.get(`dock_theme_${r}`);e&&(hi[r]=e)}var Ms=At.map(r=>({mode:r,entity:ci[r],theme:hi[r]})).filter(r=>r.entity);Ms.length&&Ft(Ms.map(r=>({...r,hass:ut()})));function Ps(){let r=ye();r?.enabled!==!1&&Kt({enabled:!0,entity:r?.entity||"",preferredEntity:r?.entity||"",auto:!0,source:"auto",theme:"aurora",hass:ut(),lines:[],trackKey:"",status:"idle"})}typeof document<"u"&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ps,{once:!0}):window.setTimeout(Ps,0));
