const data = window.KekeSoulData || {};
const fallbackSiteMeta = {
  version: "v0.3.2.1",
  dataVersion: "v0.2",
  cacheVersion: "v0.3.2.1",
  status: "命盤核心卡片寬度修正 × 總控台視覺靠近"
};
const dashboardTitle = "科科命理宇宙站｜Soul Map 命盤總控台";

if (!window.KekeSoulData) {
  console.warn("KekeSoulData 尚未載入，畫面會使用安全 fallback。");
}

initApp();

function initApp() {
  renderDashboardView();
  handleRouteChange();

  if (typeof window.addEventListener === "function") {
    window.addEventListener("hashchange", handleRouteChange);
  }
}

function renderDashboardView() {
  renderSiteMeta(data.siteMeta || data.metadata || fallbackSiteMeta);
  renderProfile(data.profile);
  renderTodaySummary(data.todaySummary);
  renderNumerology(data.numerology);
  renderModules(data.modules);
  renderSoulTree(data.soulTree);
  renderAlmanac(data.almanac);
  renderDeityDay(data.deityDay);
  renderTools(data.tools);
  renderDesktopNav(data);
}

function renderNavigationState() {
  renderModules(data.modules);
  renderDesktopNav(data);
}

function handleRouteChange() {
  const route = getCurrentRouteSafe();

  renderNavigationState();

  if (route.type === "module") {
    renderDetailView(route.moduleId, route.hash);
    return;
  }

  if (route.type === "unknown") {
    renderNotFoundDetail(route.hash);
    return;
  }

  showDashboard();
  setDocumentTitle(dashboardTitle);
  scrollAnchorIfNeeded(route.hash);
}

function getCurrentRouteSafe() {
  if (window.KekeRouter && typeof window.KekeRouter.getCurrentRoute === "function") {
    return window.KekeRouter.getCurrentRoute();
  }

  const hash = window.location && typeof window.location.hash === "string"
    ? window.location.hash
    : "#/dashboard";

  return {
    type: hash.startsWith("#/module/") ? "module" : "dashboard",
    moduleId: hash.startsWith("#/module/") ? hash.slice("#/module/".length) : null,
    hash
  };
}

function showDashboard() {
  const dashboard = document.querySelector("#dashboardView");
  const detail = document.querySelector("#detailView");

  if (dashboard) {
    dashboard.hidden = false;
  }

  if (detail) {
    detail.hidden = true;
  }
}

function showDetail() {
  const dashboard = document.querySelector("#dashboardView");
  const detail = document.querySelector("#detailView");

  if (dashboard) {
    dashboard.hidden = true;
  }

  if (detail) {
    detail.hidden = false;
  }

  if (typeof window.scrollTo === "function") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function scrollAnchorIfNeeded(hash) {
  if (!hash || hash.startsWith("#/")) {
    return;
  }

  const id = hash.slice(1);
  const target = document.getElementById(id);

  if (!target || typeof target.scrollIntoView !== "function") {
    return;
  }

  window.setTimeout(() => {
    target.scrollIntoView({ block: "start" });
  }, 0);
}

function setDocumentTitle(title) {
  if (typeof document !== "undefined" && typeof document.title === "string") {
    document.title = title;
  }
}

function getDetailPage(moduleId) {
  if (!window.KekeDetailPages || !moduleId) {
    return null;
  }

  return window.KekeDetailPages[moduleId] || null;
}

function getOrderedDetailPages() {
  if (!window.KekeDetailPages) {
    return [];
  }

  return Object.values(window.KekeDetailPages)
    .filter((page) => page && page.id)
    .sort((a, b) => (Number(a.order) || 999) - (Number(b.order) || 999));
}

function getDetailNeighbors(page) {
  const pages = getOrderedDetailPages();
  const currentIndex = pages.findIndex((item) => item.id === page.id);

  return {
    prev: currentIndex > 0 ? pages[currentIndex - 1] : null,
    next: currentIndex >= 0 && currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null
  };
}

function getModuleRoute(moduleId) {
  if (window.KekeRouter && typeof window.KekeRouter.buildModuleRoute === "function") {
    return window.KekeRouter.buildModuleRoute(moduleId);
  }

  return moduleId ? `#/module/${moduleId}` : "#/dashboard";
}

function getHomeRoute() {
  if (window.KekeRouter && typeof window.KekeRouter.getHomeRoute === "function") {
    return window.KekeRouter.getHomeRoute();
  }

  return "#/dashboard";
}

function getCurrentModuleId() {
  const route = getCurrentRouteSafe();
  return route.type === "module" ? route.moduleId : null;
}

function isActiveHref(href) {
  const route = getCurrentRouteSafe();

  if (route.type === "module") {
    return href === getModuleRoute(route.moduleId);
  }

  return href === getHomeRoute();
}

function renderDetailView(moduleId, routeHash) {
  const page = getDetailPage(moduleId);

  if (!page) {
    renderNotFoundDetail(routeHash || getModuleRoute(moduleId));
    return;
  }

  showDetail();
  setDocumentTitle(`${page.title}｜科科命理宇宙站`);
  setHtml("#detailView", renderDetailPage(page));
}

function renderDetailPage(page) {
  const sections = Array.isArray(page.sections) ? page.sections : [];
  const detailNav = renderDetailNav(page);

  return `
    <article class="detail-shell">
      <a class="detail-back" href="${escapeHtml(getHomeRoute())}">返回總控台</a>
      <header class="detail-hero">
        <div class="detail-meta-row">
          <span class="detail-icon" aria-hidden="true">${escapeHtml(page.icon || page.navLabel || page.title)}</span>
          <span class="detail-category">${escapeHtml(page.category || "命盤核心")}</span>
          <span class="detail-status is-${escapeHtml(page.status || "planning")}">${escapeHtml(page.status || "planning")}</span>
        </div>
        <p class="eyebrow">命盤詳情頁</p>
        <h2>${escapeHtml(page.title)}</h2>
        <p class="detail-subtitle">${escapeHtml(page.subtitle)}</p>
        <p>${escapeHtml(page.summary)}</p>
      </header>
      <div class="detail-grid">
        ${sections.map((section) => `
          <section class="detail-section">
            <h3>${escapeHtml(section.title)}</h3>
            <ul>
              ${(Array.isArray(section.items) ? section.items : []).map((item) => `
                <li>${escapeHtml(item)}</li>
              `).join("")}
            </ul>
          </section>
        `).join("")}
      </div>
      <p class="detail-note">目前為架構展示，尚未接入正式命理演算法。</p>
      ${detailNav}
    </article>
  `;
}

function renderDetailNav(page) {
  const { prev, next } = getDetailNeighbors(page);

  return `
    <nav class="detail-nav" aria-label="命盤詳情頁導覽">
      ${prev ? `
        <a class="detail-nav-link" href="${escapeHtml(getModuleRoute(prev.id))}">
          <span>上一個命盤</span>
          <strong>${escapeHtml(prev.title)}</strong>
        </a>
      ` : `
        <span class="detail-nav-link is-disabled" aria-disabled="true">
          <span>上一個命盤</span>
          <strong>已是第一個</strong>
        </span>
      `}
      <a class="detail-nav-link is-home" href="${escapeHtml(getHomeRoute())}">
        <span>返回總控台</span>
        <strong>首頁</strong>
      </a>
      ${next ? `
        <a class="detail-nav-link" href="${escapeHtml(getModuleRoute(next.id))}">
          <span>下一個命盤</span>
          <strong>${escapeHtml(next.title)}</strong>
        </a>
      ` : `
        <span class="detail-nav-link is-disabled" aria-disabled="true">
          <span>下一個命盤</span>
          <strong>已是最後一個</strong>
        </span>
      `}
    </nav>
  `;
}

function renderNotFoundDetail(routeHash) {
  showDetail();
  setDocumentTitle("找不到命盤詳情頁｜科科命理宇宙站");
  setHtml("#detailView", `
    <article class="detail-shell route-not-found">
      <a class="detail-back" href="${escapeHtml(getHomeRoute())}">返回總控台</a>
      <header class="detail-hero">
        <div class="detail-meta-row">
          <span class="detail-icon" aria-hidden="true">?</span>
          <span class="detail-category">route fallback</span>
          <span class="detail-status is-planning">unknown</span>
        </div>
        <p class="eyebrow">命盤詳情頁</p>
        <h2>找不到這個命盤詳情頁</h2>
        <p class="detail-subtitle">未知路由：${escapeHtml(routeHash || "未指定")}</p>
        <p>這個頁面沒有白掉，代表 router fallback 正常運作。</p>
      </header>
      <section class="detail-section">
        <h3>可能原因</h3>
        <ul>
          <li>這個模組尚未建立</li>
          <li>route id 拼字錯誤</li>
          <li>detail data 尚未補上</li>
        </ul>
      </section>
      ${renderAvailableDetailLinks()}
      <p class="detail-note">目前為架構展示，尚未接入正式命理演算法。</p>
    </article>
  `);
}

function renderAvailableDetailLinks() {
  const pages = getOrderedDetailPages();

  if (pages.length === 0) {
    return "";
  }

  return `
    <section class="detail-section">
      <h3>目前可用詳情頁入口</h3>
      <div class="route-hint-list">
        ${pages.map((page) => `
          <a href="${escapeHtml(getModuleRoute(page.id))}">
            <span>${escapeHtml(page.icon || page.navLabel)}</span>
            <strong>${escapeHtml(page.title)}</strong>
          </a>
        `).join("")}
      </div>
    </section>
  `;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setHtml(selector, html) {
  const target = document.querySelector(selector);

  if (!target) {
    return;
  }

  target.innerHTML = html;
}

function getSiteMeta() {
  return data?.siteMeta || data?.metadata || fallbackSiteMeta;
}

function renderSiteMeta(siteMeta = fallbackSiteMeta) {
  setHtml("#mobileVersionBadge", escapeHtml(siteMeta.version || fallbackSiteMeta.version));
}

function renderProfile(profile = {}) {
  setHtml("#profileCard", `
    <div class="cosmic-disc" aria-hidden="true">
      <span></span>
    </div>
    <div class="hero-copy">
      <p class="eyebrow">本命摘要</p>
      <h2 id="profile-title">${escapeHtml(profile.name)}</h2>
      <div class="profile-meta">
        <span>生日：${escapeHtml(profile.birthday)}</span>
        <span>星座：${escapeHtml(profile.zodiac)}</span>
        <span>出生時辰：${escapeHtml(profile.birthTime)}</span>
      </div>
      <p>${escapeHtml(profile.summary)}</p>
    </div>
  `);
}

function renderTodaySummary(summary = {}) {
  setHtml("#todayCard", `
    <div class="section-heading">
      <p>${escapeHtml(summary.label || summary.displayLabel || "今日科科摘要")}</p>
      <h2 id="today-title">${escapeHtml(summary.theme)}</h2>
    </div>
    <div class="today-grid">
      <article>
        <span>適合做</span>
        <p>${escapeHtml(summary.suitable)}</p>
      </article>
      <article>
        <span>不宜做</span>
        <p>${escapeHtml(summary.avoid)}</p>
      </article>
      <article>
        <span>要小心</span>
        <p>${escapeHtml(summary.caution)}</p>
      </article>
    </div>
    <blockquote>${escapeHtml(summary.quote)}</blockquote>
  `);
}

function renderNumerology(numerology = {}) {
  setHtml("#numerologyCard", `
    <div class="section-heading">
      <p>生命靈數</p>
      <h2 id="life-number-title">核心數字</h2>
    </div>
    <div class="life-number">${escapeHtml(numerology.lifeNumber)}</div>
    <div class="number-strip" aria-label="生命靈數摘要">
      <span><strong>${escapeHtml(numerology.personalYear)}</strong>個人年</span>
      <span><strong>${escapeHtml(numerology.personalMonth)}</strong>個人月</span>
      <span><strong>${escapeHtml(numerology.personalDay)}</strong>個人日</span>
    </div>
  `);
}

function renderModules(modules = []) {
  const currentModuleId = getCurrentModuleId();
  const coreModuleIds = ["ziwei", "bazi", "astrology", "numerology", "name"];
  const secondaryModuleIds = ["luck", "yijing", "soul-tree", "database"];
  const moduleGroups = modules.reduce((groups, item) => {
    const moduleId = window.KekeRouter && typeof window.KekeRouter.getRouteModuleId === "function"
      ? window.KekeRouter.getRouteModuleId(item.href)
      : null;

    if (coreModuleIds.includes(moduleId)) {
      groups.core.push({ item, moduleId });
    } else if (secondaryModuleIds.includes(moduleId)) {
      groups.secondary.push({ item, moduleId });
    } else {
      groups.support.push({ item, moduleId });
    }

    return groups;
  }, { core: [], secondary: [], support: [] });

  setHtml("#moduleCard", `
    <div class="section-heading inline-heading core-dashboard-head">
      <div>
        <p>命盤核心</p>
        <h2 id="module-title">命盤總控台</h2>
      </div>
      <span class="soft-tag">總覽入口</span>
    </div>
    <p class="module-intro">先從本命系統看見自己，再用每日提醒輔助行動。這一版是 mock / experiment / planning 首頁預覽，不代表正式排盤。</p>
    <div class="core-dashboard" id="moduleGrid">
      <div class="core-dashboard-grid">
        ${moduleGroups.core.map(({ item, moduleId }) => renderCoreModuleCard(item, moduleId, currentModuleId)).join("")}
      </div>
      <div class="module-side-groups">
        ${renderModuleLinkGroup("整合與工具", "module-secondary-list", moduleGroups.secondary, currentModuleId)}
        ${renderModuleLinkGroup("輔助提醒", "module-support-list", moduleGroups.support, currentModuleId)}
      </div>
    </div>
  `);
}

function renderCoreModuleCard(item = {}, moduleId, currentModuleId) {
  const detailPage = getDetailPage(moduleId) || {};
  const preview = detailPage.dashboardPreview || {};
  const isActive = currentModuleId && moduleId === currentModuleId;
  const status = detailPage.status || "planning";
  const tags = Array.isArray(preview.tags) && preview.tags.length > 0
    ? preview.tags
    : [detailPage.navLabel || item.title, status];

  return `
    <a class="core-module-card${isActive ? " is-active" : ""}" href="${escapeHtml(item.href)}"${isActive ? ' aria-current="page"' : ""}>
      <div class="core-module-head">
        <span class="module-icon" aria-hidden="true">${escapeHtml(detailPage.icon || item.icon)}</span>
        <span>
          <strong>${escapeHtml(item.title)}</strong>
          <small>${escapeHtml(preview.headline || item.note)}</small>
        </span>
        <span class="preview-status is-${escapeHtml(status)}">${escapeHtml(status)}</span>
      </div>
      <div class="core-module-value">
        <strong>${escapeHtml(preview.primaryValue || item.note)}</strong>
        <span>${escapeHtml(preview.secondaryValue || "點入詳情頁查看規劃")}</span>
      </div>
      <div class="core-module-tags">
        ${tags.map((tag) => `<span class="preview-tag">${escapeHtml(tag)}</span>`).join("")}
      </div>
      <p>${escapeHtml(preview.note || "目前為首頁預覽，詳細內容仍以 mock / planning 呈現。")}</p>
      <span class="module-enter">進入詳情頁</span>
    </a>
  `;
}

function renderModuleLinkGroup(title, className, entries, currentModuleId) {
  if (!Array.isArray(entries) || entries.length === 0) {
    return "";
  }

  return `
    <section class="${className}">
      <h3 class="module-group-title">${escapeHtml(title)}</h3>
      <div>
        ${entries.map(({ item, moduleId }) => renderCompactModuleLink(item, moduleId, currentModuleId)).join("")}
      </div>
    </section>
  `;
}

function renderCompactModuleLink(item = {}, moduleId, currentModuleId) {
  const detailPage = getDetailPage(moduleId) || {};
  const isActive = currentModuleId && moduleId && moduleId === currentModuleId;
  const className = [
    "module-item",
    moduleId ? "is-route" : "is-support",
    isActive ? "is-active" : ""
  ].filter(Boolean).join(" ");

  return `
    <a class="${className}" href="${escapeHtml(item.href)}"${isActive ? ' aria-current="page"' : ""}>
      <span class="module-icon" aria-hidden="true">${escapeHtml(detailPage.icon || item.icon)}</span>
      <span>
        <strong>${escapeHtml(item.title)}</strong>
        <small>${escapeHtml(item.note)}</small>
      </span>
      <span class="module-arrow" aria-hidden="true">&gt;</span>
    </a>
  `;
}

function renderAlmanac(almanac = {}) {
  const engineResult = getAlmanacEngineResult();
  setHtml("#almanacCard", `
    <div class="section-heading support-heading">
      <p>輔助提醒</p>
      <h2 id="almanac-title">今日時曆提醒</h2>
    </div>
    <p class="support-copy">農民曆輔助提醒，保留宜忌參考，不作為首頁主功能。</p>
    <div class="almanac-date">${escapeHtml(almanac.solarDate)}</div>
    <dl class="detail-list compact support-detail">
      <div>
        <dt>農曆</dt>
        <dd>${escapeHtml(almanac.lunarDate)}</dd>
      </div>
      <div>
        <dt>今日宜</dt>
        <dd>${escapeHtml(almanac.good)}</dd>
      </div>
      <div>
        <dt>今日忌</dt>
        <dd>${escapeHtml(almanac.avoid)}</dd>
      </div>
      <div>
        <dt>吉時</dt>
        <dd>${escapeHtml(almanac.luckyHours)}</dd>
      </div>
      <div>
        <dt>沖煞</dt>
        <dd>${escapeHtml(almanac.clash)}</dd>
      </div>
    </dl>
    ${renderAlmanacEnginePanel(engineResult)}
  `);
}

function getAlmanacEngineResult() {
  if (!window.KekeAlmanacEngine || typeof window.KekeAlmanacEngine.getTodayAlmanac !== "function") {
    return {
      source: "lunar-javascript",
      lunarText: "本次未取得",
      lunarMonth: null,
      lunarDay: null,
      lunarMonthText: "本次未取得",
      lunarDayText: "本次未取得",
      gzYear: "本次未取得",
      zodiac: "本次未取得",
      week: "本次未取得",
      yi: "本次未取得",
      ji: "本次未取得",
      status: "error",
      errorMessage: "KekeAlmanacEngine 尚未載入。"
    };
  }

  try {
    return window.KekeAlmanacEngine.getTodayAlmanac();
  } catch (error) {
    return {
      source: "lunar-javascript",
      lunarText: "本次未取得",
      lunarMonth: null,
      lunarDay: null,
      lunarMonthText: "本次未取得",
      lunarDayText: "本次未取得",
      gzYear: "本次未取得",
      zodiac: "本次未取得",
      week: "本次未取得",
      yi: "本次未取得",
      ji: "本次未取得",
      status: "error",
      errorMessage: error && error.message ? error.message : "lunar 實驗資料讀取失敗。"
    };
  }
}

function renderAlmanacEnginePanel(result = {}) {
  const isOk = result.status === "ok";

  if (!isOk) {
    return `
      <div class="engine-panel">
        <div class="engine-panel-head">
          <strong>lunar 實驗資料</strong>
          <span class="engine-status is-error">error</span>
        </div>
        <p class="engine-empty">lunar 實驗資料：本次未取得</p>
        <p class="engine-reason">原因：${escapeHtml(result.errorMessage || "本次未取得")}</p>
      </div>
    `;
  }

  return `
    <div class="engine-panel">
      <div class="engine-panel-head">
        <strong>lunar 實驗資料</strong>
        <span class="engine-status">ok</span>
      </div>
      <dl class="engine-list">
        <div>
          <dt>來源</dt>
          <dd><span class="source-tag">${escapeHtml(result.source)}</span></dd>
        </div>
        <div>
          <dt>今日農曆</dt>
          <dd>${escapeHtml(result.lunarText)}</dd>
        </div>
        <div>
          <dt>農曆月日</dt>
          <dd>${escapeHtml(result.lunarMonthText)}月 ${escapeHtml(result.lunarDayText)}</dd>
        </div>
        <div>
          <dt>干支 / 生肖</dt>
          <dd>${escapeHtml(result.gzYear)} / ${escapeHtml(result.zodiac)}</dd>
        </div>
        <div>
          <dt>星期</dt>
          <dd>${escapeHtml(result.week)}</dd>
        </div>
        <div>
          <dt>宜</dt>
          <dd>${escapeHtml(result.yi)}</dd>
        </div>
        <div>
          <dt>忌</dt>
          <dd>${escapeHtml(result.ji)}</dd>
        </div>
        <div>
          <dt>狀態</dt>
          <dd>${escapeHtml(result.status)}</dd>
        </div>
      </dl>
    </div>
  `;
}

function getDeityMatchesResult() {
  if (!window.KekeDeityMatcher || typeof window.KekeDeityMatcher.getTodayMatches !== "function") {
    return {
      status: "error",
      mode: "today",
      testMode: false,
      testMessage: "目前使用今日模式。",
      lunarMonth: null,
      lunarDay: null,
      lunarMonthText: "本次未取得",
      lunarDayText: "本次未取得",
      matches: [],
      message: "KekeDeityMatcher 尚未載入。"
    };
  }

  try {
    return window.KekeDeityMatcher.getTodayMatches();
  } catch (error) {
    return {
      status: "error",
      mode: "today",
      testMode: false,
      testMessage: "目前使用今日模式。",
      lunarMonth: null,
      lunarDay: null,
      lunarMonthText: "本次未取得",
      lunarDayText: "本次未取得",
      matches: [],
      message: error && error.message ? error.message : "神明生日資料表讀取失敗。"
    };
  }
}

function getTestLink(seed) {
  if (!seed || !seed.lunarMonth || !seed.lunarDay) {
    if (window.KekeDateTestMode && typeof window.KekeDateTestMode.clearTestUrl === "function") {
      return window.KekeDateTestMode.clearTestUrl();
    }

    return "index.html#deity-title";
  }

  if (window.KekeDateTestMode && typeof window.KekeDateTestMode.buildTestUrl === "function") {
    return window.KekeDateTestMode.buildTestUrl(seed.lunarMonth, seed.lunarDay);
  }

  return `index.html?testLunarMonth=${encodeURIComponent(seed.lunarMonth)}&testLunarDay=${encodeURIComponent(seed.lunarDay)}#deity-title`;
}

function getTestSeedLabel(seed) {
  if (!seed || !seed.lunarMonth || !seed.lunarDay) {
    return "今日模式";
  }

  if (String(seed.label).includes("觀音")) {
    return "觀音 2/19";
  }

  if (String(seed.label).includes("媽祖")) {
    return "媽祖 3/23";
  }

  if (String(seed.label).includes("關聖")) {
    return "關聖帝君 6/24";
  }

  return `${seed.label} ${seed.lunarMonth}/${seed.lunarDay}`;
}

function renderTestLinks() {
  const testSeeds = Array.isArray(data?.testSeeds) ? data.testSeeds : [
    { label: "觀音佛辰", lunarMonth: 2, lunarDay: 19 },
    { label: "媽祖聖誕", lunarMonth: 3, lunarDay: 23 },
    { label: "關聖帝君", lunarMonth: 6, lunarDay: 24 },
    { label: "今日模式", lunarMonth: null, lunarDay: null }
  ];

  return `
    <div class="test-mode-panel">
      <strong>測試入口</strong>
      <div class="test-link-row">
        ${testSeeds.map((seed) => `
          <a class="test-link" href="${escapeHtml(getTestLink(seed))}" title="${escapeHtml(seed.note || getTestSeedLabel(seed))}">
            ${escapeHtml(getTestSeedLabel(seed))}
          </a>
        `).join("")}
      </div>
    </div>
  `;
}

function renderDeityMatcherPanel(result = {}) {
  const status = result.status || "error";
  const statusClass = status === "ok" ? "" : ` is-${escapeHtml(status)}`;
  const isTestMode = result.testMode === true || result.mode === "test";
  const modeLabel = isTestMode ? "測試模式" : "今日模式";
  const modeClass = isTestMode ? "is-test" : "is-today";
  const lunarDate = result.lunarMonth && result.lunarDay
    ? `${isTestMode ? "測試 " : ""}${escapeHtml(result.lunarMonthText)}月 ${escapeHtml(result.lunarDayText)}`
    : "本次未取得";
  const seedNote = data?.deityMatcher?.note || "本版使用 seed 資料表做神明生日比對，資料表仍需人工校對與擴充。";
  const matchItems = Array.isArray(result.matches) ? result.matches : [];

  const matchHtml = matchItems.length > 0
    ? `
      <div class="deity-list">
        ${matchItems.map((item) => `
          <article>
            <strong>${escapeHtml(item.title)}</strong>
            <small>${escapeHtml(item.category)} / ${escapeHtml(item.sourceLevel)}</small>
            <p>${escapeHtml(item.blessing)}</p>
            <p>${escapeHtml(item.note)}</p>
          </article>
        `).join("")}
      </div>
    `
    : `<p class="engine-empty">${escapeHtml(result.message || "這個日期未命中 seed 資料表。")}</p>`;

  return `
    <div class="engine-panel deity-panel">
      <div class="engine-panel-head">
        <strong>神明生日資料表實驗</strong>
        <span class="engine-status deity-status${statusClass}">${escapeHtml(status)}</span>
      </div>
      <div class="test-mode-line">
        <span class="mode-tag ${modeClass}">${modeLabel}</span>
        <span>${escapeHtml(result.testMessage || (isTestMode ? "目前使用測試模式。" : "目前使用今日模式。"))}</span>
      </div>
      <dl class="engine-list">
        <div>
          <dt>比對農曆</dt>
          <dd>${lunarDate}</dd>
        </div>
        <div>
          <dt>比對結果</dt>
          <dd>${escapeHtml(result.message || "本次未取得")}</dd>
        </div>
      </dl>
      ${matchHtml}
      ${renderTestLinks()}
      <p class="seed-note">${escapeHtml(seedNote)}</p>
    </div>
  `;
}

function formatDeityLunarDate(result = {}) {
  const isTestMode = result.testMode === true || result.mode === "test";

  if (result.lunarMonth && result.lunarDay) {
    return `${isTestMode ? "測試" : "今日"} ${escapeHtml(result.lunarMonthText)}月 ${escapeHtml(result.lunarDayText)}`;
  }

  return "本次未取得";
}

function getDeitySummary(result = {}) {
  const isTestMode = result.testMode === true || result.mode === "test";
  const firstMatch = Array.isArray(result.matches) && result.matches.length > 0
    ? result.matches[0]
    : null;

  if (result.status === "ok" && firstMatch) {
    return {
      title: firstMatch.title,
      lunarDate: formatDeityLunarDate(result),
      blessing: firstMatch.blessing || "平安、慈悲、圓滿"
    };
  }

  if (result.status === "empty") {
    return {
      title: isTestMode ? "測試日期未命中神明生日資料表" : "今日未命中神明生日資料表",
      lunarDate: formatDeityLunarDate(result),
      blessing: "暫無命中，維持平常心。"
    };
  }

  return {
    title: "神明生日資料本次未取得",
    lunarDate: "本次未取得",
    blessing: "請檢查測試參數或資料載入狀態。"
  };
}

function renderMockDeitySample(deityDay = {}) {
  return `
    <div class="mock-sample">
      <strong>固定展示範例</strong>
      <dl class="detail-list compact">
        <div>
          <dt>範例名稱</dt>
          <dd>${escapeHtml(deityDay.title)}</dd>
        </div>
        <div>
          <dt>範例農曆</dt>
          <dd>${escapeHtml(deityDay.lunarDate)}</dd>
        </div>
        <div>
          <dt>範例祈福</dt>
          <dd>${escapeHtml(deityDay.blessing)}</dd>
        </div>
      </dl>
      <p class="sample-note">${escapeHtml(deityDay.mockNote)}</p>
    </div>
  `;
}

function renderDeityDay(deityDay = {}) {
  const deityMatchesResult = getDeityMatchesResult();
  const deitySummary = getDeitySummary(deityMatchesResult);

  setHtml("#deityCard", `
    <div class="section-heading">
      <p>今日神明生日</p>
      <h2 id="deity-title">${escapeHtml(deitySummary.title)}</h2>
    </div>
    <dl class="detail-list compact deity-summary">
      <div>
        <dt>比對農曆</dt>
        <dd>${deitySummary.lunarDate}</dd>
      </div>
      <div>
        <dt>祈福方向</dt>
        <dd>${escapeHtml(deitySummary.blessing)}</dd>
      </div>
    </dl>
    ${renderDeityMatcherPanel(deityMatchesResult)}
    ${renderMockDeitySample(deityDay)}
  `);
}

function renderSoulTree(soulTree = {}) {
  setHtml("#treeCard", `
    <div class="section-heading">
      <p>命樹</p>
      <h2 id="tree-title">${escapeHtml(soulTree.title)}</h2>
    </div>
    <div class="tree-map" aria-label="命樹概念">
      <span class="tree-node root">${escapeHtml(soulTree.root)}</span>
      <span class="tree-node trunk">${escapeHtml(soulTree.trunk)}</span>
      <span class="tree-node crown">${escapeHtml(soulTree.crown)}</span>
    </div>
    <p>${escapeHtml(soulTree.description)}</p>
  `);
}

function renderTools(tools = []) {
  const siteMeta = getSiteMeta();
  const buttons = tools.map((label) => `
    <button type="button">${escapeHtml(label)}</button>
  `).join("");

  setHtml("#toolsCard", `
    <div class="section-heading">
      <p>底部工具區</p>
      <h2 id="tool-title">資料工具</h2>
    </div>
    <div class="tool-row">${buttons}</div>
    <dl class="version-meta" aria-label="版本資訊">
      <div>
        <dt>目前版本</dt>
        <dd>${escapeHtml(siteMeta.version || fallbackSiteMeta.version)}</dd>
      </div>
      <div>
        <dt>資料層</dt>
        <dd>${escapeHtml(siteMeta.dataVersion || fallbackSiteMeta.dataVersion)}</dd>
      </div>
      <div>
        <dt>狀態</dt>
        <dd>${escapeHtml(siteMeta.status || fallbackSiteMeta.status)}</dd>
      </div>
    </dl>
  `);

  setHtml("#topbarActions", `
    <button type="button">今日總覽</button>
    <span class="version-badge">${escapeHtml(siteMeta.version || fallbackSiteMeta.version)}</span>
    <button type="button">${escapeHtml(tools[0] || "匯出 JSON")}</button>
    <button type="button" class="profile-button">${escapeHtml(data?.profile?.name || "科科")}</button>
  `);
}

function renderDesktopNav(siteData = {}) {
  const modules = Array.isArray(siteData.modules) ? siteData.modules : [];
  const navItems = [
    { title: "首頁總覽", icon: "首", href: getHomeRoute() },
    { title: "個人資料", icon: "人", href: "#profile-title" },
    ...modules.map((item) => ({
      title: item.title === "資料庫 / 備份" ? "資料庫" : item.title,
      icon: item.icon,
      href: item.href
    }))
  ];

  const links = navItems.map((item) => {
    const isActive = isActiveHref(item.href);

    return `
      <a class="${isActive ? "is-active" : ""}" href="${escapeHtml(item.href)}"${isActive ? ' aria-current="page"' : ""}>
        <span aria-hidden="true">${escapeHtml(item.icon)}</span>
        <span>${escapeHtml(item.title)}</span>
      </a>
    `;
  }).join("");

  setHtml("#desktopNav", links);
}
