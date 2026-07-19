export const dynamic = "force-static";

const html = `
<!DOCTYPE html>
<html lang="en" data-lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Dalbit.ai — California Market Entry for Korean Companies</title>
<meta name="description" content="Dalbit.ai is a California market-entry and cultural intelligence firm for Korean companies. Bilingual research, brand localization, and AI-assisted market intelligence.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&family=Noto+Sans+KR:wght@400;500;700;900&display=swap" rel="stylesheet">
<style>
:root{
  --white:#FAFAF8;
  --paper:#FFFFFF;
  --ink:#0A0A0A;
  --red:#E8380D;
  --gray:#6B6B68;
  --rule:#0A0A0A;
  --grotesk:'Archivo','Noto Sans KR',sans-serif;
}
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{
  background:var(--white);
  color:var(--ink);
  font-family:var(--grotesk);
  font-weight:400;
  line-height:1.6;
  -webkit-font-smoothing:antialiased;
}
::selection{background:var(--red);color:#fff}

[data-lang="en"] .kr{display:none}
[data-lang="kr"] .en{display:none}

.wrap{max-width:1240px;margin:0 auto;padding:0 28px}

/* ---------- display type ---------- */
.display{
  font-family:var(--grotesk);
  font-variation-settings:'wdth' 68;
  font-weight:900;
  text-transform:uppercase;
  letter-spacing:-.01em;
  line-height:.94;
}
html[data-lang="kr"] .display{
  font-family:'Noto Sans KR',sans-serif;
  font-variation-settings:normal;
  font-weight:900;
  line-height:1.08;
  letter-spacing:-.02em;
}

/* ---------- wall label ---------- */
.wall-label{
  font-size:.72rem;
  font-weight:600;
  letter-spacing:.18em;
  text-transform:uppercase;
  color:var(--ink);
}
.wall-label .num{color:var(--red)}

/* ---------- nav ---------- */
nav{
  position:fixed;top:0;left:0;right:0;z-index:50;
  background:var(--white);
  border-bottom:2px solid var(--ink);
}
.nav-inner{
  max-width:1240px;margin:0 auto;padding:0 28px;
  height:64px;
  display:flex;align-items:center;justify-content:space-between;
}
.wordmark{
  font-family:var(--grotesk);
  font-variation-settings:'wdth' 68;
  font-weight:900;font-size:1.5rem;text-transform:uppercase;
  color:var(--ink);text-decoration:none;letter-spacing:0;
  display:flex;align-items:baseline;gap:10px;
}
.wordmark .hangul{font-family:'Noto Sans KR',sans-serif;font-variation-settings:normal;font-size:1rem;font-weight:700;color:var(--red)}
.nav-right{display:flex;align-items:center;gap:26px}
.nav-links{display:flex;gap:26px}
.nav-links a{
  color:var(--ink);text-decoration:none;
  font-size:.78rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;
}
.nav-links a:hover,.nav-links a:focus-visible{color:var(--red)}
.lang-toggle{display:flex;border:2px solid var(--ink)}
.lang-toggle button{
  background:var(--white);border:none;color:var(--ink);
  font-family:var(--grotesk);font-size:.72rem;font-weight:700;letter-spacing:.1em;
  padding:6px 12px;cursor:pointer;
}
.lang-toggle button.active{background:var(--ink);color:var(--white)}
.lang-toggle button:focus-visible{outline:2px solid var(--red);outline-offset:-2px}

/* ---------- hero ---------- */
header{
  padding:170px 0 90px;
  border-bottom:2px solid var(--ink);
  background:var(--paper);
}
.hero-label{margin-bottom:36px;display:flex;gap:14px;align-items:center}
.hero-label::before{content:"";width:44px;height:2px;background:var(--red)}
h1.display{
  font-size:clamp(3.2rem,10.5vw,9.5rem);
  max-width:11em;
}
h1 .accent{color:var(--red)}
.hero-foot{
  margin-top:56px;
  display:grid;grid-template-columns:minmax(0,1fr) auto;gap:40px;align-items:end;
}
.hero-sub{
  max-width:36em;font-size:1.02rem;color:var(--gray);line-height:1.75;
}
.btn{
  display:inline-block;text-decoration:none;
  font-size:.8rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;
  padding:16px 34px;
  border:2px solid var(--ink);
  color:var(--ink);
  background:var(--white);
  transition:background .15s,color .15s;
  white-space:nowrap;
}
.btn:hover,.btn:focus-visible{background:var(--ink);color:var(--white)}
.btn-red{background:var(--red);border-color:var(--red);color:#fff}
.btn-red:hover,.btn-red:focus-visible{background:var(--ink);border-color:var(--ink)}

/* ---------- ticker ---------- */
.ticker{
  background:var(--ink);color:var(--white);
  overflow:hidden;white-space:nowrap;
  border-bottom:2px solid var(--ink);
  padding:12px 0;
}
.ticker-track{display:inline-block;animation:tick 28s linear infinite}
.ticker span{
  font-family:var(--grotesk);
  font-variation-settings:'wdth' 68;
  font-weight:900;font-size:.95rem;letter-spacing:.12em;text-transform:uppercase;
  margin-right:56px;
}
.ticker .dot{color:var(--red)}
@keyframes tick{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@media (prefers-reduced-motion:reduce){.ticker-track{animation:none}}

/* ---------- sections ---------- */
section{padding:100px 0;border-bottom:2px solid var(--ink)}
.sec-head{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:64px;gap:24px;flex-wrap:wrap}
h2.display{font-size:clamp(2.2rem,5.5vw,4.4rem)}
.sec-kicker{max-width:26em;color:var(--gray);font-size:.98rem}

/* galleries (services) */
.galleries{display:grid;grid-template-columns:repeat(3,1fr);border:2px solid var(--ink)}
.gallery{
  padding:36px 30px 44px;
  border-right:2px solid var(--ink);
  background:var(--paper);
}
.gallery:last-child{border-right:none}
.gallery .wall-label{margin-bottom:26px;display:block}
.gallery h3{
  font-family:var(--grotesk);
  font-variation-settings:'wdth' 68;
  font-weight:900;font-size:1.7rem;text-transform:uppercase;line-height:1.05;
  margin-bottom:8px;
}
html[data-lang="kr"] .gallery h3{font-family:'Noto Sans KR';font-variation-settings:normal;line-height:1.2}
.gallery .alt-name{font-size:.85rem;font-weight:500;color:var(--red);margin-bottom:28px}
.gallery ul{list-style:none}
.gallery li{
  font-size:.94rem;color:var(--ink);
  padding:12px 0;border-top:1px solid #D9D9D4;
}
.gallery li:first-child{border-top:2px solid var(--ink)}

/* why — exhibition text */
.exhibit{display:grid;grid-template-columns:repeat(2,1fr);gap:0;border:2px solid var(--ink)}
.exhibit-item{padding:40px 34px;border-right:2px solid var(--ink);border-bottom:2px solid var(--ink);background:var(--paper)}
.exhibit-item:nth-child(2n){border-right:none}
.exhibit-item:nth-last-child(-n+2){border-bottom:none}
.exhibit-item h3{
  font-family:var(--grotesk);
  font-variation-settings:'wdth' 68;
  font-weight:900;font-size:1.25rem;text-transform:uppercase;
  margin:14px 0 12px;
}
html[data-lang="kr"] .exhibit-item h3{font-family:'Noto Sans KR';font-variation-settings:normal}
.exhibit-item p{color:var(--gray);font-size:.94rem}

/* roadmap — now on view / upcoming */
.onview{display:grid;grid-template-columns:1fr 1fr;border:2px solid var(--ink)}
.show{padding:48px 40px;background:var(--paper)}
.show:first-child{border-right:2px solid var(--ink)}
.show-tag{
  display:inline-block;
  font-size:.7rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;
  padding:6px 12px;margin-bottom:26px;
  background:var(--ink);color:var(--white);
}
.show:last-child .show-tag{background:var(--red)}
.show h3{
  font-family:var(--grotesk);
  font-variation-settings:'wdth' 68;
  font-weight:900;font-size:2rem;text-transform:uppercase;line-height:1;
  margin-bottom:16px;
}
html[data-lang="kr"] .show h3{font-family:'Noto Sans KR';font-variation-settings:normal;line-height:1.2}
.show p{color:var(--gray);font-size:.95rem}

/* contact */
.contact{background:var(--red);color:#fff;border-bottom:none}
.contact .wall-label{color:#fff;opacity:.85}
.contact h2.display{color:#fff;max-width:9em;margin:22px 0 40px}
.contact .btn{
  background:#fff;border-color:#fff;color:var(--red);
}
.contact .btn:hover,.contact .btn:focus-visible{background:var(--ink);border-color:var(--ink);color:#fff}
.contact-note{margin-top:22px;font-size:.85rem;opacity:.85}

footer{
  background:var(--ink);color:var(--white);
  padding:30px 0;
}
.foot-inner{
  max-width:1240px;margin:0 auto;padding:0 28px;
  display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;
  font-size:.78rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;
}
.foot-inner .hangul{font-family:'Noto Sans KR';color:var(--red);text-transform:none;letter-spacing:0}

@media (max-width:900px){
  .galleries{grid-template-columns:1fr}
  .gallery{border-right:none;border-bottom:2px solid var(--ink)}
  .gallery:last-child{border-bottom:none}
  .exhibit{grid-template-columns:1fr}
  .exhibit-item{border-right:none !important;border-bottom:2px solid var(--ink) !important}
  .exhibit-item:last-child{border-bottom:none !important}
  .onview{grid-template-columns:1fr}
  .show:first-child{border-right:none;border-bottom:2px solid var(--ink)}
  .hero-foot{grid-template-columns:1fr}
  .nav-links{display:none}
}
</style>
</head>
<body>

<nav>
  <div class="nav-inner">
    <a class="wordmark" href="#top">Dalbit <span class="hangul">달빛</span></a>
    <div class="nav-right">
      <div class="nav-links">
        <a href="#services"><span class="en">Services</span><span class="kr">서비스</span></a>
        <a href="#why"><span class="en">Why Dalbit</span><span class="kr">왜 달빛</span></a>
        <a href="#roadmap"><span class="en">On View</span><span class="kr">로드맵</span></a>
        <a href="#contact"><span class="en">Contact</span><span class="kr">문의</span></a>
      </div>
      <div class="lang-toggle" role="group" aria-label="Language">
        <button id="btn-en" class="active" onclick="setLang('en')">EN</button>
        <button id="btn-kr" onclick="setLang('kr')">KR</button>
      </div>
    </div>
  </div>
</nav>

<header id="top">
  <div class="wrap">
    <p class="wall-label hero-label">
      <span class="en">California Market Entry — Cultural Intelligence</span>
      <span class="kr">캘리포니아 시장 진입 — 문화 인텔리전스</span>
    </p>
    <h1 class="display">
      <span class="en">Enter California with <span class="accent">clarity.</span></span>
      <span class="kr">명확하게 시작하는 <span class="accent">캘리포니아</span> 진출</span>
    </h1>
    <div class="hero-foot">
      <p class="hero-sub">
        <span class="en">Dalbit.ai is a California market-entry and cultural intelligence firm for Korean companies. Bilingual research, brand localization, and AI-assisted market intelligence — so you launch in the U.S. with evidence, not guesswork.</span>
        <span class="kr">달빛은 한국 기업의 캘리포니아 진출을 돕는 시장 진입 및 문화 인텔리전스 회사입니다. 이중언어 리서치, 브랜드 현지화, AI 기반 시장 인텔리전스로 추측이 아닌 근거를 가지고 미국 시장에 진입하세요.</span>
      </p>
      <a class="btn btn-red" href="#contact">
        <span class="en">Start a conversation</span><span class="kr">상담 시작하기</span>
      </a>
    </div>
  </div>
</header>

<div class="ticker" aria-hidden="true">
  <div class="ticker-track">
    <span>Seoul <span class="dot">→</span> California</span>
    <span>서울 <span class="dot">→</span> 캘리포니아</span>
    <span>Research before risk <span class="dot">·</span> 리스크보다 리서치 먼저</span>
    <span>Built bilingual from day one</span>
    <span>Seoul <span class="dot">→</span> California</span>
    <span>서울 <span class="dot">→</span> 캘리포니아</span>
    <span>Research before risk <span class="dot">·</span> 리스크보다 리서치 먼저</span>
    <span>Built bilingual from day one</span>
  </div>
</div>

<section id="services">
  <div class="wrap">
    <div class="sec-head">
      <h2 class="display">
        <span class="en">Services</span>
        <span class="kr">서비스</span>
      </h2>
      <p class="sec-kicker">
        <span class="en">Three practices, one goal: a U.S. launch grounded in evidence and fluent in both cultures.</span>
        <span class="kr">세 가지 프랙티스, 하나의 목표 — 근거에 기반하고 양쪽 문화에 능통한 미국 진출.</span>
      </p>
    </div>

    <div class="galleries">
      <div class="gallery">
        <span class="wall-label"><span class="num">A</span> — <span class="en">Gallery One</span><span class="kr">제1관</span></span>
        <h3><span class="en">Market Entry &amp; Research</span><span class="kr">시장 진입 &amp; 리서치</span></h3>
        <p class="alt-name"><span class="en">시장 진입 &amp; 리서치</span><span class="kr">Market Entry &amp; Research</span></p>
        <ul>
          <li><span class="en">California market-entry strategy</span><span class="kr">캘리포니아 시장 진입 전략</span></li>
          <li><span class="en">Competitive &amp; consumer research</span><span class="kr">경쟁사 &amp; 소비자 리서치</span></li>
          <li><span class="en">U.S. expansion risk assessment</span><span class="kr">미국 진출 리스크 평가</span></li>
        </ul>
      </div>
      <div class="gallery">
        <span class="wall-label"><span class="num">B</span> — <span class="en">Gallery Two</span><span class="kr">제2관</span></span>
        <h3><span class="en">Localization &amp; Launch</span><span class="kr">현지화 &amp; 론칭</span></h3>
        <p class="alt-name"><span class="en">현지화 &amp; 론칭</span><span class="kr">Localization &amp; Launch</span></p>
        <ul>
          <li><span class="en">Korean–English brand localization</span><span class="kr">한–영 브랜드 현지화</span></li>
          <li><span class="en">Bilingual launch support</span><span class="kr">이중언어 론칭 지원</span></li>
          <li><span class="en">Strategic partner identification</span><span class="kr">전략적 파트너 발굴</span></li>
        </ul>
      </div>
      <div class="gallery">
        <span class="wall-label"><span class="num">C</span> — <span class="en">Gallery Three</span><span class="kr">제3관</span></span>
        <h3><span class="en">AI Intelligence</span><span class="kr">AI 인텔리전스</span></h3>
        <p class="alt-name"><span class="en">AI 인텔리전스</span><span class="kr">AI Intelligence</span></p>
        <ul>
          <li><span class="en">AI-assisted market intelligence</span><span class="kr">AI 기반 시장 인텔리전스</span></li>
          <li><span class="en">Bilingual voice &amp; workflow agents</span><span class="kr">이중언어 보이스 &amp; 워크플로우 에이전트</span></li>
          <li><span class="en">Research automation</span><span class="kr">리서치 자동화</span></li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section id="why">
  <div class="wrap">
    <div class="sec-head">
      <h2 class="display">
        <span class="en">Why Dalbit</span>
        <span class="kr">왜 달빛인가</span>
      </h2>
      <p class="sec-kicker">
        <span class="en">An early-stage, founder-led practice. No layers, no hand-offs, no inflated claims.</span>
        <span class="kr">창업자가 직접 이끄는 초기 단계의 회사. 중간 단계도, 과장된 약속도 없습니다.</span>
      </p>
    </div>

    <div class="exhibit">
      <div class="exhibit-item">
        <span class="wall-label"><span class="num">01</span></span>
        <h3><span class="en">Strategy and language, together</span><span class="kr">전략과 언어를 하나로</span></h3>
        <p>
          <span class="en">Most market-entry advisors outsource the language. Most translation agencies skip the strategy. Dalbit does both in-house — the research, the positioning, and the words themselves.</span>
          <span class="kr">대부분의 시장 진입 컨설팅은 언어를 외주에 맡기고, 번역 회사는 전략을 다루지 않습니다. 달빛은 리서치, 포지셔닝, 언어까지 모두 직접 수행합니다.</span>
        </p>
      </div>
      <div class="exhibit-item">
        <span class="wall-label"><span class="num">02</span></span>
        <h3><span class="en">AI-native workflows</span><span class="kr">AI 네이티브 워크플로우</span></h3>
        <p>
          <span class="en">Research accelerated by AI-assisted intelligence workflows and bilingual voice agents — built on hands-on experience with multilingual AI testing and API-based automation.</span>
          <span class="kr">다국어 AI 테스트와 API 기반 자동화 경험을 바탕으로, AI 인텔리전스 워크플로우와 이중언어 보이스 에이전트가 리서치를 가속합니다.</span>
        </p>
      </div>
      <div class="exhibit-item">
        <span class="wall-label"><span class="num">03</span></span>
        <h3><span class="en">California-grounded</span><span class="kr">캘리포니아 현지 기반</span></h3>
        <p>
          <span class="en">Based in California, focused on California — the largest, most competitive entry point to the U.S. market, and the one where cultural fluency matters most.</span>
          <span class="kr">캘리포니아에 기반을 두고 캘리포니아에 집중합니다. 미국 시장에서 가장 크고 경쟁이 치열하며, 문화적 이해가 가장 중요한 관문입니다.</span>
        </p>
      </div>
      <div class="exhibit-item">
        <span class="wall-label"><span class="num">04</span></span>
        <h3><span class="en">Direct access</span><span class="kr">다이렉트 액세스</span></h3>
        <p>
          <span class="en">You work directly with the person doing the research and writing the words — in Korean or English, your choice.</span>
          <span class="kr">리서치를 수행하고 언어를 다루는 사람과 직접 일합니다 — 한국어든 영어든, 편한 언어로.</span>
        </p>
      </div>
    </div>
  </div>
</section>

<section id="roadmap">
  <div class="wrap">
    <div class="sec-head">
      <h2 class="display">
        <span class="en">On View</span>
        <span class="kr">로드맵</span>
      </h2>
      <p class="sec-kicker">
        <span class="en">Advisory today. The recurring problems we solve become the software we build next.</span>
        <span class="kr">오늘은 어드바이저리. 반복적으로 해결한 문제가 다음 소프트웨어가 됩니다.</span>
      </p>
    </div>

    <div class="onview">
      <div class="show">
        <span class="show-tag"><span class="en">Now on view</span><span class="kr">현재 진행 중</span></span>
        <h3><span class="en">Advisory</span><span class="kr">어드바이저리</span></h3>
        <p>
          <span class="en">Hands-on services: market-entry strategy, bilingual research, localization, and launch support for Korean companies entering California.</span>
          <span class="kr">캘리포니아에 진출하는 한국 기업을 위한 실무 서비스 — 시장 진입 전략, 이중언어 리서치, 현지화, 론칭 지원.</span>
        </p>
      </div>
      <div class="show">
        <span class="show-tag"><span class="en">Upcoming</span><span class="kr">예정</span></span>
        <h3><span class="en">Platform</span><span class="kr">플랫폼</span></h3>
        <p>
          <span class="en">A software platform for market readiness, risk monitoring, competitor research, and U.S. expansion management — shaped by real client work.</span>
          <span class="kr">시장 준비도 평가, 리스크 모니터링, 경쟁사 리서치, 미국 진출 관리를 위한 소프트웨어 플랫폼 — 실제 클라이언트 워크에서 출발합니다.</span>
        </p>
      </div>
    </div>
  </div>
</section>

<section id="contact" class="contact">
  <div class="wrap">
    <p class="wall-label">
      <span class="en">Contact — Admission free</span>
      <span class="kr">문의 — 상담은 무료입니다</span>
    </p>
    <h2 class="display">
      <span class="en">Planning a U.S. launch?</span>
      <span class="kr">미국 진출을 준비 중이신가요?</span>
    </h2>
    <a class="btn" href="mailto:hello@dalbit.ai">hello@dalbit.ai</a>
    <p class="contact-note">
      <span class="en">Consultations available in Korean and English.</span>
      <span class="kr">한국어와 영어로 상담 가능합니다.</span>
    </p>
  </div>
</section>

<footer>
  <div class="foot-inner">
    <span>Dalbit.ai <span class="hangul">달빛</span></span>
    <span><span class="en">California market entry for Korean companies</span><span class="kr">한국 기업의 캘리포니아 진출 파트너</span></span>
  </div>
</footer>

<script>
function setLang(l){
  document.documentElement.setAttribute('data-lang',l);
  document.documentElement.setAttribute('lang', l==='kr'?'ko':'en');
  document.getElementById('btn-en').classList.toggle('active', l==='en');
  document.getElementById('btn-kr').classList.toggle('active', l==='kr');
  try{localStorage.setItem('dalbit-lang',l)}catch(e){}
}
try{
  if(localStorage.getItem('dalbit-lang')==='kr')setLang('kr');
}catch(e){}
</script>
</body>
</html>
`;

export async function GET() {
  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
