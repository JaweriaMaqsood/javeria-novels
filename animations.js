/* Javeria Urdu Novels - scroll animation add-on
   Adds: scroll-driven 3D book opening, falling petals, card tilt, reveal on scroll, nicer page turn.
   Does not touch the novel text. To remove: delete the <script src="/animations.js"> line from index.html. */
(function () {
  "use strict";
  if (window.__jvAnim) return;
  window.__jvAnim = 1;

  var home = document.getElementById("homeV");
  var hero = home && home.querySelector(".hero");
  if (!home || !hero) return;

  var RM = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);

  /* ---------- CSS ---------- */
  var css = [
    ".jvs{position:relative;height:430vh;background:#120911;color:#fff}",
    ".jvs.rm{height:auto}",
    ".jvs .stk{position:sticky;top:73px;height:calc(100vh - 73px);height:calc(100svh - 73px);overflow:hidden;display:flex;align-items:center;justify-content:center;perspective:1600px}",
    ".jvs.rm .stk{position:relative}",
    ".jvs .bg{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 38%,var(--c1,#4a2745),var(--c2,#120911) 72%)}",
    ".jvs .pt{position:absolute;inset:0;pointer-events:none;overflow:hidden}",
    ".jvs .pt i{position:absolute;top:-24px;border-radius:150% 0 150% 0;opacity:0;animation:jvfall linear infinite}",
    "@keyframes jvfall{0%{transform:translate3d(0,-30px,0) rotate(0);opacity:0}10%{opacity:.75}100%{transform:translate3d(var(--dx,40px),110vh,0) rotate(540deg);opacity:.1}}",

    ".jvb{--w:min(230px,52vw);--h:calc(var(--w)*1.333);position:relative;width:var(--w);height:var(--h);transform-style:preserve-3d;will-change:transform}",
    ".jvb .bk,.jvb .base{position:absolute;border-radius:4px 12px 12px 4px}",
    ".jvb .bk{inset:0;background:#1d0d1c;transform:translateZ(-4px);box-shadow:0 0 0 1px #d9b375 inset}",
    ".jvb .base{inset:2% 1.5% 2% 0;background:linear-gradient(90deg,#efdfc3 0,#fffaf0 9%,#fffaf0 100%);color:#3a2634;padding:14% 10% 10% 10%;display:flex;flex-direction:column;transform:translateZ(-1px)}",
    ".jvb .pgt{font-size:calc(var(--w)*.078);line-height:2.5;text-align:justify;direction:rtl}",
    ".jvb .pn{margin-top:auto;text-align:center;font-family:Lora,serif;font-size:calc(var(--w)*.06);color:#a58a6a}",

    ".jvc,.jvp{position:absolute;transform-origin:left center;transform-style:preserve-3d}",
    ".jvc{inset:0}",
    ".jvp{inset:2% 1.5% 2% 0}",
    ".jvc .f,.jvc .b,.jvp .f,.jvp .b{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden}",
    ".jvc .f{border-radius:4px 12px 12px 4px;background:linear-gradient(160deg,#7a1230,#2b0614);box-shadow:inset 0 0 0 7px #2b0614,inset 0 0 0 8px #d9b375;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;color:#f3d9a4;text-align:center;padding:10% 8%;overflow:hidden}",
    ".jvc .f:before{content:'';position:absolute;inset:0 auto 0 0;width:9%;background:linear-gradient(90deg,rgba(0,0,0,.5),rgba(255,255,255,.12) 65%,transparent)}",
    ".jvc .ct{font-size:calc(var(--w)*.115);line-height:2.1;font-weight:700;text-shadow:0 2px 6px #000}",
    ".jvc .cl{width:60%;height:1px;background:#d9b375;margin:4px 0}",
    ".jvc em{font-family:'Great Vibes',cursive;font-style:normal;font-size:calc(var(--w)*.1)}",
    ".jvc .cb{font-size:calc(var(--w)*.062);opacity:.85;line-height:2}",
    ".jvc .b{transform:rotateY(180deg);border-radius:12px 4px 4px 12px;background:linear-gradient(270deg,#efdfc3 0,#fffaf0 12%,#f6ead3 100%);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:#c9566f}",
    ".jvc .b span{font-size:calc(var(--w)*.2)}",
    ".jvc .b small{font-family:Lora,serif;font-size:calc(var(--w)*.062);color:#a58a6a;letter-spacing:.08em}",
    ".jvp .f{border-radius:2px 8px 8px 2px;background:linear-gradient(90deg,#efdfc3 0,#fffaf0 9%,#fffaf0 100%)}",
    ".jvp .b{transform:rotateY(180deg);border-radius:8px 2px 2px 8px;background:linear-gradient(270deg,#efdfc3 0,#fffaf0 9%,#fffaf0 100%)}",
    ".jvp .f:after,.jvp .b:after{content:'';position:absolute;inset:14% 12% 12% 12%;background:repeating-linear-gradient(transparent 0 15px,rgba(120,80,40,.16) 15px 16px)}",

    ".jvs .sh{position:absolute;left:50%;bottom:calc(50% - var(--hh,150px) - 26px);width:min(340px,70vw);height:26px;margin-left:calc(min(340px,70vw)/-2);background:radial-gradient(ellipse at center,rgba(0,0,0,.55),transparent 70%);filter:blur(4px)}",
    ".jvs .cap{position:absolute;left:0;right:0;bottom:6%;text-align:center;padding:0 20px;opacity:0;pointer-events:none;font-size:clamp(20px,3.4vw,32px);line-height:2.1;text-shadow:0 2px 14px rgba(0,0,0,.65);direction:rtl}",
    ".jvs .cap a{pointer-events:none}",
    ".jvs .cap.on a{pointer-events:auto}",
    ".jvs .cap .btn{margin-top:6px;font-size:15px;padding:8px 26px;direction:ltr}",
    ".jvs .cap small{display:block;font-family:Lora,serif;direction:ltr;font-size:14px;letter-spacing:.14em;color:#f3d9a4;opacity:.9}",
    ".jvs .hint{position:absolute;left:0;right:0;top:5%;text-align:center;font-family:Lora,serif;font-size:13px;letter-spacing:.2em;color:#f3d9a4;text-transform:uppercase;animation:jvbob 1.6s ease-in-out infinite}",
    "@keyframes jvbob{50%{transform:translateY(7px)}}",

    ".hero .jvd{position:absolute;left:0;right:0;bottom:10px;text-align:center;color:#f3d9a4;font-size:26px;line-height:1;animation:jvbob 1.6s ease-in-out infinite;pointer-events:none}",
    ".jvr{opacity:0;transform:translateY(26px);transition:opacity .7s ease,transform .7s ease}",
    ".jvr.jvin{opacity:1;transform:none}",

    "@keyframes fl{0%{opacity:.15;transform:perspective(1400px) rotateY(-16deg) translateX(-22px);filter:brightness(.82)}100%{opacity:1;transform:none;filter:none}}",
    ".flip,.spread.flip{animation:fl .5s cubic-bezier(.2,.7,.2,1)}",
    "@media(prefers-reduced-motion:reduce){.flip,.spread.flip{animation:none}.jvr{opacity:1;transform:none;transition:none}.jvs .hint,.hero .jvd,.jvs .pt i{animation:none}}"
  ].join("\n");
  var st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);

  /* ---------- HTML ---------- */
  var sec = document.createElement("section");
  sec.className = "jvs" + (RM ? " rm" : "");
  sec.setAttribute("aria-label", "Javeria Urdu Novels");
  sec.innerHTML =
    '<div class="stk" id="jvStk">' +
      '<div class="bg"></div><div class="pt" aria-hidden="true"></div>' +
      '<div class="hint">Scroll</div>' +
      '<div class="jvb" id="jvB">' +
        '<div class="bk"></div>' +
        '<div class="base"><div class="pgt ur">کچھ لوگ زندگی میں کبھی دستک نہیں دیتے۔ دروازے ان کے لیے خود کھل جاتے ہیں۔</div><div class="pn">1</div></div>' +
        '<div class="jvp" id="jvP1"><div class="f"></div><div class="b"></div></div>' +
        '<div class="jvp" id="jvP0"><div class="f"></div><div class="b"></div></div>' +
        '<div class="jvc" id="jvC">' +
          '<div class="f"><div class="ur ct">تُو ہی میری آخری محبت</div><div class="cl"></div><em>Javeria Panwar</em><div class="ur cb">جویریہ پنوار</div></div>' +
          '<div class="b"><span>&#9825;</span><small>JAVERIA URDU NOVELS</small></div>' +
        '</div>' +
      '</div>' +
      '<div class="sh"></div>' +
      '<div class="cap ur">ہر کہانی ایک دروازہ ہے…</div>' +
      '<div class="cap ur">جہاں سانس رکتی ہے، وہیں کہانی شروع ہوتی ہے</div>' +
      '<div class="cap ur">غازی زیان… اور ایک ایسی آواز، جو آدھی رات کے بعد آتی ہے</div>' +
      '<div class="cap ur cta"><small>NOW READING</small>تُو ہی میری آخری محبت<br><a class="btn r" href="#read-aakhri">Read Now</a></div>' +
    '</div>';
  hero.insertAdjacentElement("afterend", sec);

  /* scroll hint arrow inside the hero */
  var htxt = hero.querySelector(".txt");
  if (htxt) {
    var d = document.createElement("span");
    d.className = "jvd";
    d.setAttribute("aria-hidden", "true");
    d.innerHTML = "&#8964;";
    hero.appendChild(d);
  }

  /* petals */
  var pt = sec.querySelector(".pt");
  if (!RM) {
    var cols = ["#f4b3c4", "#c9566f", "#f3d9a4", "#ffe0d0"];
    for (var i = 0; i < 18; i++) {
      var s = document.createElement("i");
      var sz = 8 + Math.random() * 10;
      s.style.cssText =
        "left:" + (Math.random() * 100).toFixed(1) + "%;width:" + sz.toFixed(1) + "px;height:" + (sz * 1.3).toFixed(1) +
        "px;background:" + cols[i % cols.length] + ";animation-duration:" + (9 + Math.random() * 9).toFixed(1) +
        "s;animation-delay:-" + (Math.random() * 14).toFixed(1) + "s;--dx:" + ((Math.random() - 0.5) * 160).toFixed(0) + "px";
      pt.appendChild(s);
    }
  }

  /* ---------- scroll engine ---------- */
  var stk = document.getElementById("jvStk");
  var book = document.getElementById("jvB");
  var cov = document.getElementById("jvC");
  var p0 = document.getElementById("jvP0");
  var p1 = document.getElementById("jvP1");
  var caps = sec.querySelectorAll(".cap");
  var hint = sec.querySelector(".hint");
  var shadow = sec.querySelector(".sh");
  var WIN = [[0.01, 0.05, 0.16, 0.21], [0.22, 0.27, 0.44, 0.49], [0.5, 0.55, 0.78, 0.83], [0.84, 0.9, 1.01, 1.02]];
  var PAL = [[[46, 26, 43], [18, 9, 17]], [[96, 36, 72], [27, 13, 28]], [[140, 52, 76], [43, 6, 20]]];

  function clamp(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function ease(x) { return x * x * (3 - 2 * x); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function mix(a, b, t) { return [Math.round(lerp(a[0], b[0], t)), Math.round(lerp(a[1], b[1], t)), Math.round(lerp(a[2], b[2], t))]; }
  function rgb(c) { return "rgb(" + c[0] + "," + c[1] + "," + c[2] + ")"; }
  function trap(p, w) {
    if (p <= w[0] || p >= w[3]) return 0;
    if (p < w[1]) return (p - w[0]) / (w[1] - w[0]);
    if (p > w[2]) return 1 - (p - w[2]) / (w[3] - w[2]);
    return 1;
  }

  var raf = 0;
  function render() {
    raf = 0;
    if (sec.offsetParent === null) return; /* home view hidden (reading a novel) */
    var top = parseFloat(getComputedStyle(stk).top) || 0;
    var total = Math.max(sec.offsetHeight - stk.offsetHeight, 1);
    var p = RM ? 1 : clamp((top - sec.getBoundingClientRect().top) / total);

    var intro = ease(clamp(p / 0.14));
    var settle = ease(clamp((p - 0.08) / 0.34));
    var o = ease(clamp((p - 0.2) / 0.28));
    var q0 = ease(clamp((p - 0.5) / 0.16));
    var q1 = ease(clamp((p - 0.6) / 0.16));
    var fin = ease(clamp((p - 0.82) / 0.18));
    var w = book.offsetWidth;

    var tx = w * 0.5 * o;
    var ty = lerp(70, 0, intro);
    var rx = lerp(16, 8, settle);
    var ry = lerp(-34, -4, settle);
    var sc = lerp(0.72, 1, intro) * lerp(1, 1.1, fin);
    book.style.transform = "translate3d(" + tx.toFixed(1) + "px," + ty.toFixed(1) + "px,0) rotateX(" + rx.toFixed(2) + "deg) rotateY(" + ry.toFixed(2) + "deg) scale(" + sc.toFixed(3) + ")";

    cov.style.transform = "translateZ(" + lerp(6, 0, o).toFixed(2) + "px) rotateY(" + (-168 * o).toFixed(2) + "deg)";
    p0.style.transform = "translateZ(" + lerp(4, 2, q0).toFixed(2) + "px) rotateY(" + (-165 * q0).toFixed(2) + "deg)";
    p1.style.transform = "translateZ(" + lerp(2, 4, q1).toFixed(2) + "px) rotateY(" + (-162 * q1).toFixed(2) + "deg)";

    var seg = p < 0.5 ? mix(PAL[0][0], PAL[1][0], p / 0.5) : mix(PAL[1][0], PAL[2][0], (p - 0.5) / 0.5);
    var seg2 = p < 0.5 ? mix(PAL[0][1], PAL[1][1], p / 0.5) : mix(PAL[1][1], PAL[2][1], (p - 0.5) / 0.5);
    stk.style.setProperty("--c1", rgb(seg));
    stk.style.setProperty("--c2", rgb(seg2));
    stk.style.setProperty("--hh", (book.offsetHeight * sc / 2).toFixed(0) + "px");

    for (var i = 0; i < caps.length; i++) {
      var a = RM ? (i === caps.length - 1 ? 1 : 0) : trap(p, WIN[i]);
      caps[i].style.opacity = a.toFixed(3);
      caps[i].style.transform = "translateY(" + ((1 - a) * 16).toFixed(1) + "px)";
      caps[i].classList.toggle("on", a > 0.5);
    }
    hint.style.opacity = RM ? 0 : (1 - clamp(p / 0.04)).toFixed(3);
    shadow.style.opacity = (0.5 + 0.5 * intro).toFixed(3);
    shadow.style.transform = "scaleX(" + lerp(0.7, 1.25, o).toFixed(3) + ")";
  }
  function req() { if (!raf) raf = requestAnimationFrame(render); }
  window.addEventListener("scroll", req, { passive: true });
  window.addEventListener("resize", req);
  window.addEventListener("hashchange", function () { setTimeout(req, 60); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(req);
  render();

  /* ---------- reveal on scroll ---------- */
  var rev = home.querySelectorAll(".main1 .h, .main1 .homebook");
  if ("IntersectionObserver" in window && !RM) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("jvin"); io.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    Array.prototype.forEach.call(rev, function (el) { el.classList.add("jvr"); io.observe(el); });
  }

  /* ---------- 3D tilt on the shelf book (mouse devices) ---------- */
  var hb = home.querySelector(".homebook .b3d");
  if (hb && !RM && window.matchMedia && matchMedia("(hover:hover)").matches) {
    var host = hb.parentNode;
    host.addEventListener("mousemove", function (e) {
      var r = host.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      hb.style.transition = "transform .08s";
      hb.style.transform = "perspective(700px) rotateY(" + (x * 26).toFixed(1) + "deg) rotateX(" + (-y * 18).toFixed(1) + "deg) translateY(-6px)";
    });
    host.addEventListener("mouseleave", function () {
      hb.style.transition = "transform .4s";
      hb.style.transform = "";
    });
  }
})();
