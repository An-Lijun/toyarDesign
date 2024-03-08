import{_ as s,o as a,c as n,Q as p}from"./chunks/framework.73781e4e.js";const m=JSON.parse('{"title":"快速上手","description":"","frontmatter":{},"headers":[],"relativePath":"page/component/start/quick.md","filePath":"page/component/start/quick.md"}'),o={name:"page/component/start/quick.md"},l=p(`<h1 id="快速上手" tabindex="-1">快速上手 <a class="header-anchor" href="#快速上手" aria-label="Permalink to &quot;快速上手&quot;">​</a></h1><h2 id="引入-toyar" tabindex="-1">引入 Toyar <a class="header-anchor" href="#引入-toyar" aria-label="Permalink to &quot;引入 Toyar&quot;">​</a></h2><p>您可以直接引入整个Toyar或者是根据需要仅引入部分组件。</p><h3 id="全量引入" tabindex="-1">全量引入 <a class="header-anchor" href="#全量引入" aria-label="Permalink to &quot;全量引入&quot;">​</a></h3><div class="language-JavaScript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">JavaScript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { createApp } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> App </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./App.vue&#39;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> toyar </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;toyar-design/dist&#39;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;toyar-design/dist/style.css&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">createApp</span><span style="color:#E1E4E8;">(App).</span><span style="color:#B392F0;">use</span><span style="color:#E1E4E8;">(toyar).</span><span style="color:#B392F0;">mount</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;#app&#39;</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki light-plus vp-code-light"><code><span class="line"><span style="color:#AF00DB;">import</span><span style="color:#000000;"> { </span><span style="color:#001080;">createApp</span><span style="color:#000000;"> } </span><span style="color:#AF00DB;">from</span><span style="color:#000000;"> </span><span style="color:#A31515;">&#39;vue&#39;</span></span>
<span class="line"><span style="color:#AF00DB;">import</span><span style="color:#000000;"> </span><span style="color:#001080;">App</span><span style="color:#000000;"> </span><span style="color:#AF00DB;">from</span><span style="color:#000000;"> </span><span style="color:#A31515;">&#39;./App.vue&#39;</span></span>
<span class="line"><span style="color:#AF00DB;">import</span><span style="color:#000000;"> </span><span style="color:#001080;">toyar</span><span style="color:#000000;"> </span><span style="color:#AF00DB;">from</span><span style="color:#000000;"> </span><span style="color:#A31515;">&#39;toyar-design/dist&#39;</span></span>
<span class="line"><span style="color:#AF00DB;">import</span><span style="color:#000000;"> </span><span style="color:#A31515;">&#39;toyar-design/dist/style.css&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#795E26;">createApp</span><span style="color:#000000;">(</span><span style="color:#001080;">App</span><span style="color:#000000;">).</span><span style="color:#795E26;">use</span><span style="color:#000000;">(</span><span style="color:#001080;">toyar</span><span style="color:#000000;">).</span><span style="color:#795E26;">mount</span><span style="color:#000000;">(</span><span style="color:#A31515;">&#39;#app&#39;</span><span style="color:#000000;">)</span></span></code></pre></div><h3 id="按需引入" tabindex="-1">按需引入 <a class="header-anchor" href="#按需引入" aria-label="Permalink to &quot;按需引入&quot;">​</a></h3><div class="language-JavaScript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">JavaScript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { createApp } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;toyar-design/dist/style.css&#39;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> {TyButton} </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;toyar-design/dist&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">createApp</span><span style="color:#E1E4E8;">(App).</span><span style="color:#B392F0;">use</span><span style="color:#E1E4E8;">(TyButton).</span><span style="color:#B392F0;">mount</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;#app&#39;</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki light-plus vp-code-light"><code><span class="line"><span style="color:#AF00DB;">import</span><span style="color:#000000;"> { </span><span style="color:#001080;">createApp</span><span style="color:#000000;"> } </span><span style="color:#AF00DB;">from</span><span style="color:#000000;"> </span><span style="color:#A31515;">&#39;vue&#39;</span></span>
<span class="line"><span style="color:#AF00DB;">import</span><span style="color:#000000;"> </span><span style="color:#A31515;">&#39;toyar-design/dist/style.css&#39;</span></span>
<span class="line"><span style="color:#AF00DB;">import</span><span style="color:#000000;"> {</span><span style="color:#001080;">TyButton</span><span style="color:#000000;">} </span><span style="color:#AF00DB;">from</span><span style="color:#000000;"> </span><span style="color:#A31515;">&#39;toyar-design/dist&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#795E26;">createApp</span><span style="color:#000000;">(</span><span style="color:#001080;">App</span><span style="color:#000000;">).</span><span style="color:#795E26;">use</span><span style="color:#000000;">(</span><span style="color:#001080;">TyButton</span><span style="color:#000000;">).</span><span style="color:#795E26;">mount</span><span style="color:#000000;">(</span><span style="color:#A31515;">&#39;#app&#39;</span><span style="color:#000000;">)</span></span></code></pre></div>`,7),e=[l];function t(r,c,y,i,E,d){return a(),n("div",null,e)}const u=s(o,[["render",t]]);export{m as __pageData,u as default};