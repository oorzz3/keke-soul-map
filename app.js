const data = window.KekeSoulData || {};
const fallbackSiteMeta = {
  version: "v0.7.0",
  dataVersion: "v0.2",
  cacheVersion: "v0.7.0",
  status: "命理運算總架構文件版 × 第二核心前置憲法"
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
      ${renderSpecialDetailContent(page)}
      <p class="detail-note">目前為架構展示，尚未接入正式命理演算法。</p>
      ${detailNav}
    </article>
  `;
}

function renderSpecialDetailContent(page = {}) {
  if (page.id === "ziwei" && page.ziweiProfile) {
    return renderZiweiDetail(page);
  }

  if (page.id === "bazi" && page.baziProfile) {
    return renderBaziDetail(page);
  }

  if (page.id === "astrology" && page.astrologyProfile) {
    return renderAstrologyDetail(page);
  }

  if (page.id === "numerology" && page.numerologyProfile) {
    return renderNumerologyDetail(page);
  }

  if (page.id === "name" && page.nameProfile) {
    return renderNameDetail(page);
  }

  if (page.id === "luck" && page.luckProfile) {
    return renderLuckDetail(page);
  }

  return "";
}

function renderZiweiDetail(page = {}) {
  return `
    <section class="ziwei-detail" aria-label="紫微斗數 mock 詳情">
      <div class="detail-note ziwei-mock-note">目前是 mock 命盤骨架，不是正式命盤；尚未接入正式紫微斗數排盤演算法。</div>
      ${renderZiweiProfile(page.ziweiProfile)}
      ${renderZiweiPalaceOverview(page.palaceOverview)}
      ${renderZiweiInterpretation(page.interpretationBlocks)}
      ${renderZiweiDataNotes(page.dataNotes)}
    </section>
  `;
}

function renderZiweiProfile(profile = {}) {
  const mainStars = Array.isArray(profile.mainStars) ? profile.mainStars : [];

  return `
    <section class="ziwei-profile-card">
      <div class="section-heading compact-heading">
        <p>紫微命盤摘要</p>
        <h3>${escapeHtml(profile.chartType || "紫微斗數命盤骨架")}</h3>
      </div>
      <div class="ziwei-profile-grid">
        <div>
          <span>狀態</span>
          <strong>${escapeHtml(profile.chartStatus || "mock")}</strong>
        </div>
        <div>
          <span>焦點宮位</span>
          <strong>${escapeHtml(profile.palaceFocus || "命宮")}</strong>
        </div>
        <div>
          <span>身宮</span>
          <strong>${escapeHtml(profile.bodyPalace || "身宮待定")}</strong>
        </div>
      </div>
      <div class="ziwei-star-list" aria-label="主星組合">
        ${mainStars.map((star) => `<span>${escapeHtml(star)}</span>`).join("")}
      </div>
      <p>${escapeHtml(profile.summary || "目前為 mock 命盤骨架。")}</p>
    </section>
  `;
}

function renderZiweiPalaceOverview(palaces = []) {
  if (!Array.isArray(palaces) || palaces.length === 0) {
    return "";
  }

  return `
    <section>
      <div class="section-heading compact-heading">
        <p>十二宮位規劃</p>
        <h3>宮位、主題與 mock 星曜</h3>
      </div>
      <div class="ziwei-palace-grid">
        ${palaces.map((palace) => {
          const stars = Array.isArray(palace.mockStars) ? palace.mockStars : [];
          return `
            <article class="ziwei-palace-card">
              <div>
                <strong>${escapeHtml(palace.palace)}</strong>
                <span>${escapeHtml(palace.category || "宮位規劃")}</span>
              </div>
              <p>${escapeHtml(palace.theme)}</p>
              <div class="ziwei-palace-stars">
                ${stars.map((star) => `<span>${escapeHtml(star)}</span>`).join("")}
              </div>
              <small>${escapeHtml(palace.note)}</small>
            </article>
          `;
        }).join("")}
      </div>
    </section>
  `;
}

function renderZiweiInterpretation(blocks = []) {
  if (!Array.isArray(blocks) || blocks.length === 0) {
    return "";
  }

  return `
    <section>
      <div class="section-heading compact-heading">
        <p>解讀重點</p>
        <h3>目前先放 mock / planning 方向</h3>
      </div>
      <div class="ziwei-interpretation-list">
        ${blocks.map((block) => `
          <article class="ziwei-interpretation-card">
            <span class="detail-status is-${escapeHtml(block.level || "planning")}">${escapeHtml(block.level || "planning")}</span>
            <strong>${escapeHtml(block.title)}</strong>
            <p>${escapeHtml(block.content)}</p>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderZiweiDataNotes(notes = []) {
  if (!Array.isArray(notes) || notes.length === 0) {
    return "";
  }

  return `
    <section class="ziwei-data-notes">
      <h3>資料狀態提醒</h3>
      <ul>
        ${notes.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}
      </ul>
    </section>
  `;
}

function renderBaziDetail(page = {}) {
  return `
    <section class="bazi-detail" aria-label="八字四柱 mock 詳情">
      <div class="detail-note bazi-mock-note">本頁是 mock 八字骨架，不是正式命盤；尚未接入正式八字四柱排盤演算法。</div>
      ${renderBaziProfile(page.baziProfile)}
      ${renderBaziPillarOverview(page.pillarOverview)}
      ${renderBaziFiveElements(page.fiveElementOverview)}
      ${renderBaziTenGodOverview(page.tenGodOverview)}
      ${renderBaziInterpretation(page.interpretationBlocks)}
      ${renderBaziDataNotes(page.dataNotes)}
    </section>
  `;
}

function renderBaziProfile(profile = {}) {
  return `
    <section class="bazi-profile-card">
      <div class="section-heading compact-heading">
        <p>八字命盤摘要</p>
        <h3>${escapeHtml(profile.chartType || "八字四柱命盤骨架")}</h3>
      </div>
      <div class="bazi-profile-grid">
        <div>
          <span>狀態</span>
          <strong>${escapeHtml(profile.chartStatus || "mock")}</strong>
        </div>
        <div>
          <span>日主</span>
          <strong>${escapeHtml(profile.dayMaster || "日主待定")}</strong>
        </div>
        <div>
          <span>月令</span>
          <strong>${escapeHtml(profile.monthCommand || "月令待定")}</strong>
        </div>
        <div>
          <span>觀察重點</span>
          <strong>${escapeHtml(profile.structureFocus || "四柱與五行分布")}</strong>
        </div>
      </div>
      <p>${escapeHtml(profile.summary || "目前為 mock 八字骨架。")}</p>
    </section>
  `;
}

function renderBaziPillarOverview(pillars = []) {
  if (!Array.isArray(pillars) || pillars.length === 0) {
    return "";
  }

  return `
    <section>
      <div class="section-heading compact-heading">
        <p>四柱規劃</p>
        <h3>年 / 月 / 日 / 時的資料骨架</h3>
      </div>
      <div class="bazi-pillar-grid">
        ${pillars.map((pillar) => `
          <article class="bazi-pillar-card">
            <div class="bazi-card-head">
              <strong>${escapeHtml(pillar.pillar)}</strong>
              <span>${escapeHtml(pillar.role || "角色待定")}</span>
            </div>
            <p>${escapeHtml(pillar.theme)}</p>
            <dl>
              <div>
                <dt>干支</dt>
                <dd>${escapeHtml(pillar.stemBranch || "待建立")}</dd>
              </div>
              <div>
                <dt>十神</dt>
                <dd>${escapeHtml(pillar.tenGod || "待建立")}</dd>
              </div>
            </dl>
            <small>${escapeHtml(pillar.note)}</small>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderBaziFiveElements(elements = []) {
  if (!Array.isArray(elements) || elements.length === 0) {
    return "";
  }

  return `
    <section>
      <div class="section-heading compact-heading">
        <p>五行分布 mock</p>
        <h3>木 / 火 / 土 / 金 / 水觀察欄位</h3>
      </div>
      <div class="bazi-five-elements">
        ${elements.map((item) => `
          <article class="bazi-element-card">
            <div class="bazi-element-symbol">${escapeHtml(item.element)}</div>
            <strong>${escapeHtml(item.status || "待計算")}</strong>
            <p>${escapeHtml(item.meaning)}</p>
            <small>${escapeHtml(item.note)}</small>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderBaziTenGodOverview(tenGods = []) {
  if (!Array.isArray(tenGods) || tenGods.length === 0) {
    return "";
  }

  return `
    <section>
      <div class="section-heading compact-heading">
        <p>十神關係規劃</p>
        <h3>比劫、食傷、財星、官殺、印星</h3>
      </div>
      <div class="bazi-ten-god-grid">
        ${tenGods.map((god) => `
          <article class="bazi-ten-god-card">
            <span class="detail-status is-${escapeHtml(god.status || "planning")}">${escapeHtml(god.status || "planning")}</span>
            <strong>${escapeHtml(god.name)}</strong>
            <p>${escapeHtml(god.theme)}</p>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderBaziInterpretation(blocks = []) {
  if (!Array.isArray(blocks) || blocks.length === 0) {
    return "";
  }

  return `
    <section>
      <div class="section-heading compact-heading">
        <p>解讀重點</p>
        <h3>目前只做 mock / planning 提示</h3>
      </div>
      <div class="bazi-interpretation-list">
        ${blocks.map((block) => `
          <article class="bazi-interpretation-card">
            <span class="detail-status is-${escapeHtml(block.level || "planning")}">${escapeHtml(block.level || "planning")}</span>
            <strong>${escapeHtml(block.title)}</strong>
            <p>${escapeHtml(block.content)}</p>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderBaziDataNotes(notes = []) {
  if (!Array.isArray(notes) || notes.length === 0) {
    return "";
  }

  return `
    <section class="bazi-data-notes">
      <h3>資料狀態提醒</h3>
      <ul>
        ${notes.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}
      </ul>
    </section>
  `;
}

function renderAstrologyDetail(page = {}) {
  return `
    <section class="astrology-detail" aria-label="西洋星盤 mock 詳情">
      <div class="detail-note astrology-mock-note">目前是 mock 星盤骨架，不是正式星盤；尚未接入正式西洋星盤計算。</div>
      ${renderAstrologyProfile(page.astrologyProfile)}
      ${renderAstrologyAxisOverview(page.axisOverview)}
      ${renderAstrologyPlanetOverview(page.planetOverview)}
      ${renderAstrologyHouseOverview(page.houseOverview)}
      ${renderAstrologyAspectOverview(page.aspectOverview)}
      ${renderAstrologyInterpretation(page.interpretationBlocks)}
      ${renderAstrologyDataNotes(page.dataNotes)}
    </section>
  `;
}

function renderAstrologyProfile(profile = {}) {
  return `
    <section class="astrology-profile-card">
      <div class="section-heading compact-heading">
        <p>星盤命盤摘要</p>
        <h3>${escapeHtml(profile.chartType || "西洋星盤命盤骨架")}</h3>
      </div>
      <div class="astrology-profile-grid">
        <div>
          <span>狀態</span>
          <strong>${escapeHtml(profile.chartStatus || "mock")}</strong>
        </div>
        <div>
          <span>觀察焦點</span>
          <strong>${escapeHtml(profile.chartFocus || "太陽 / 月亮 / 上升三軸")}</strong>
        </div>
        <div>
          <span>宮位制</span>
          <strong>${escapeHtml(profile.houseSystem || "宮位制待定")}</strong>
        </div>
        <div>
          <span>出生地</span>
          <strong>${escapeHtml(profile.birthLocation || "出生地待定")}</strong>
        </div>
      </div>
      <p>${escapeHtml(profile.summary || "目前為 mock 星盤骨架。")}</p>
    </section>
  `;
}

function renderAstrologyAxisOverview(axisOverview = []) {
  if (!Array.isArray(axisOverview) || axisOverview.length === 0) {
    return "";
  }

  return `
    <section>
      <div class="section-heading compact-heading">
        <p>三軸規劃</p>
        <h3>太陽 / 月亮 / 上升</h3>
      </div>
      <div class="astrology-axis-grid">
        ${axisOverview.map((axis) => `
          <article class="astrology-axis-card">
            <div class="astrology-card-head">
              <strong>${escapeHtml(axis.axis)}</strong>
              <span>${escapeHtml(axis.sign || "待建立")}</span>
            </div>
            <p>${escapeHtml(axis.theme)}</p>
            <dl>
              <div>
                <dt>星座</dt>
                <dd>${escapeHtml(axis.sign || "待建立")}</dd>
              </div>
              <div>
                <dt>宮位</dt>
                <dd>${escapeHtml(axis.house || "待建立")}</dd>
              </div>
            </dl>
            <small>${escapeHtml(axis.note)}</small>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderAstrologyPlanetOverview(planets = []) {
  if (!Array.isArray(planets) || planets.length === 0) {
    return "";
  }

  return `
    <section>
      <div class="section-heading compact-heading">
        <p>行星落點規劃</p>
        <h3>水星、金星、火星、木星、土星</h3>
      </div>
      <div class="astrology-planet-grid">
        ${planets.map((planet) => `
          <article class="astrology-planet-card">
            <span class="detail-status is-${escapeHtml(planet.status || "planning")}">${escapeHtml(planet.status || "planning")}</span>
            <strong>${escapeHtml(planet.planet)}</strong>
            <p>${escapeHtml(planet.theme)}</p>
            <dl>
              <div>
                <dt>星座</dt>
                <dd>${escapeHtml(planet.sign || "待建立")}</dd>
              </div>
              <div>
                <dt>宮位</dt>
                <dd>${escapeHtml(planet.house || "待建立")}</dd>
              </div>
            </dl>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderAstrologyHouseOverview(houses = []) {
  if (!Array.isArray(houses) || houses.length === 0) {
    return "";
  }

  return `
    <section>
      <div class="section-heading compact-heading">
        <p>十二宮位規劃</p>
        <h3>人生場域與事件主題</h3>
      </div>
      <div class="astrology-house-grid">
        ${houses.map((house) => `
          <article class="astrology-house-card">
            <span class="detail-status is-${escapeHtml(house.status || "planning")}">${escapeHtml(house.status || "planning")}</span>
            <strong>${escapeHtml(house.house)}</strong>
            <p>${escapeHtml(house.theme)}</p>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderAstrologyAspectOverview(aspects = []) {
  if (!Array.isArray(aspects) || aspects.length === 0) {
    return "";
  }

  return `
    <section>
      <div class="section-heading compact-heading">
        <p>相位關係規劃</p>
        <h3>能量流動、張力與協調</h3>
      </div>
      <div class="astrology-aspect-grid">
        ${aspects.map((aspect) => `
          <article class="astrology-aspect-card">
            <div class="astrology-aspect-angle">${escapeHtml(aspect.angle)}</div>
            <strong>${escapeHtml(aspect.aspect)}</strong>
            <p>${escapeHtml(aspect.theme)}</p>
            <span class="detail-status is-${escapeHtml(aspect.status || "planning")}">${escapeHtml(aspect.status || "planning")}</span>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderAstrologyInterpretation(blocks = []) {
  if (!Array.isArray(blocks) || blocks.length === 0) {
    return "";
  }

  return `
    <section>
      <div class="section-heading compact-heading">
        <p>解讀重點</p>
        <h3>目前只做 mock / planning 提示</h3>
      </div>
      <div class="astrology-interpretation-list">
        ${blocks.map((block) => `
          <article class="astrology-interpretation-card">
            <span class="detail-status is-${escapeHtml(block.level || "planning")}">${escapeHtml(block.level || "planning")}</span>
            <strong>${escapeHtml(block.title)}</strong>
            <p>${escapeHtml(block.content)}</p>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderAstrologyDataNotes(notes = []) {
  if (!Array.isArray(notes) || notes.length === 0) {
    return "";
  }

  return `
    <section class="astrology-data-notes">
      <h3>資料狀態提醒</h3>
      <ul>
        ${notes.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}
      </ul>
    </section>
  `;
}

function getCalculatedNumerologyCoreNumbers(coreNumbers = [], display = {}) {
  if (!Array.isArray(coreNumbers)) {
    return [];
  }

  return coreNumbers.map((item) => {
    if (item.label === "生命靈數") {
      return {
        ...item,
        value: display.lifePathNumber || item.value,
        status: display.status === "calculated" ? "calculated" : item.status,
        note: display.status === "calculated"
          ? `來源：${display.source}；方法：${display.method}。`
          : item.note
      };
    }

    if (item.label === "生日數") {
      return {
        ...item,
        value: display.birthDayNumber || item.value,
        status: display.status === "calculated" ? "calculated" : item.status,
        note: display.status === "calculated"
          ? "已依生日日期化簡計算。"
          : item.note
      };
    }

    return item;
  });
}

function getCalculatedNumerologyRhythm(rhythmOverview = [], display = {}) {
  if (!Array.isArray(rhythmOverview)) {
    return [];
  }

  const valueMap = {
    個人年: display.personalYear,
    個人月: display.personalMonth,
    個人日: display.personalDay
  };

  return rhythmOverview.map((item) => ({
    ...item,
    value: valueMap[item.cycle] || item.value,
    status: display.status === "calculated" ? "calculated" : item.status,
    note: display.status === "calculated"
      ? `targetDate：${display.targetDate || "本次未取得"}；本數字僅作節奏觀察，不作重大決策依據。`
      : item.note
  }));
}

function renderNumerologyCalculationPanel(display = {}) {
  const ok = display.status === "calculated";

  return `
    <section class="numerology-calculation-panel" aria-label="生命靈數正式計算結果">
      <div class="section-heading compact-heading">
        <p>正式計算接入</p>
        <h3>${ok ? "生命靈數計算結果" : "生命靈數本次未取得"}</h3>
        ${renderNumerologyCalculationBadge(display)}
      </div>
      <div class="numerology-result-grid">
        <article class="numerology-result-card is-featured">
          <span>生命靈數</span>
          <strong>${escapeHtml(display.lifePathNumber || "本次未取得")}</strong>
          <small>${escapeHtml(display.summary?.lifePathLabel || "lifePathNumber")}</small>
        </article>
        <article class="numerology-result-card">
          <span>生日數</span>
          <strong>${escapeHtml(display.birthDayNumber || "本次未取得")}</strong>
          <small>birthDayNumber</small>
        </article>
        <article class="numerology-result-card">
          <span>個人年</span>
          <strong>${escapeHtml(display.personalYear || "本次未取得")}</strong>
          <small>personalYear</small>
        </article>
        <article class="numerology-result-card">
          <span>個人月</span>
          <strong>${escapeHtml(display.personalMonth || "本次未取得")}</strong>
          <small>personalMonth</small>
        </article>
        <article class="numerology-result-card">
          <span>個人日</span>
          <strong>${escapeHtml(display.personalDay || "本次未取得")}</strong>
          <small>personalDay</small>
        </article>
      </div>
      <p class="compact-note">來源：${escapeHtml(display.source || "coreInputProfile.birth.solarDate")}；生日：${escapeHtml(display.solarDate || "本次未取得")}；目標日期：${escapeHtml(display.targetDate || "本次未取得")}；方法：${escapeHtml(display.method || "digit-reduction-1-to-9")}。</p>
      <p class="detail-note">本頁生命靈數已接入正式 1～9 化簡規則，但仍只作自我觀察與節奏提醒，不作重大決策依據。</p>
    </section>
  `;
}

function renderNumerologyDetail(page = {}) {
  const display = getNumerologyDisplayData();
  const coreNumbers = getCalculatedNumerologyCoreNumbers(page.coreNumberOverview, display);
  const rhythmOverview = getCalculatedNumerologyRhythm(page.rhythmOverview, display);

  return `
    <section class="numerology-detail" aria-label="生命靈數正式計算詳情">
      <div class="detail-note numerology-mock-note">生命靈數目前已完成正式數字計算與靜態解讀資料層。本頁將計算結果、解讀資料與未來延伸架構分層呈現。</div>
      ${renderNumerologyCalculationPanel(display)}
      ${renderNumerologyInterpretationPanel(display)}
      ${renderNumerologyProfile(page.numerologyProfile)}
      ${renderNumerologyCoreNumbers(coreNumbers)}
      ${renderNumerologyBirthBreakdown(page.birthBreakdownDraft)}
      ${renderNumerologyRhythmOverview(rhythmOverview)}
      ${renderNumerologyNumberMeanings(page.numberMeaningOverview)}
      ${renderNumerologyActionNotes(page.actionNotes)}
      ${renderNumerologyInterpretation(page.interpretationBlocks)}
      ${renderNumerologyDataNotes(page.dataNotes)}
      ${renderNumerologySafetyLines()}
    </section>
  `;
}

function renderNumerologyProfile(profile = {}) {
  return `
    <section class="numerology-profile-card">
      <div class="section-heading compact-heading">
        <p>靈數命盤摘要</p>
        <h3>${escapeHtml(profile.chartType || "生命靈數命盤骨架")}</h3>
      </div>
      <div class="numerology-profile-grid">
        <div>
          <span>狀態</span>
          <strong>${escapeHtml(profile.chartStatus || "mock")}</strong>
        </div>
        <div>
          <span>核心數字</span>
          <strong>${escapeHtml(profile.coreNumber || "待建立")}</strong>
        </div>
        <div>
          <span>節奏焦點</span>
          <strong>${escapeHtml(profile.rhythmFocus || "個人年 / 個人月 / 個人日")}</strong>
        </div>
        <div>
          <span>生日來源</span>
          <strong>${escapeHtml(profile.birthDateSource || "生日資料待正式校對")}</strong>
        </div>
      </div>
      <p>${escapeHtml(profile.summary || "目前為 mock 靈數骨架。")}</p>
    </section>
  `;
}

function renderNumerologyCoreNumbers(coreNumbers = []) {
  if (!Array.isArray(coreNumbers) || coreNumbers.length === 0) {
    return "";
  }

  return `
    <section>
      <div class="section-heading compact-heading">
        <p>核心數字</p>
        <h3>生命靈數 / 生日數 / 命運數</h3>
      </div>
      <div class="numerology-core-grid">
        ${coreNumbers.map((item) => `
          <article class="numerology-core-card ${String(item.value) === "7" ? "is-featured" : ""}">
            <span class="detail-status is-${escapeHtml(item.status || "planning")}">${escapeHtml(item.status || "planning")}</span>
            <div class="numerology-number-badge">${escapeHtml(item.value || "待建立")}</div>
            <strong>${escapeHtml(item.label)}</strong>
            <p>${escapeHtml(item.theme)}</p>
            <small>${escapeHtml(item.note)}</small>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderNumerologyBirthBreakdown(breakdown = []) {
  if (!Array.isArray(breakdown) || breakdown.length === 0) {
    return "";
  }

  return `
    <section>
      <div class="section-heading compact-heading">
        <p>生日數字拆解規劃</p>
        <h3>年份 / 月份 / 日期 / 總和</h3>
      </div>
      <div class="numerology-breakdown-grid">
        ${breakdown.map((item) => `
          <article class="numerology-breakdown-card">
            <span class="detail-status is-${escapeHtml(item.status || "planning")}">${escapeHtml(item.status || "planning")}</span>
            <strong>${escapeHtml(item.part)}</strong>
            <div>${escapeHtml(item.value || "待建立")}</div>
            <p>${escapeHtml(item.meaning)}</p>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderNumerologyRhythmOverview(cycles = []) {
  if (!Array.isArray(cycles) || cycles.length === 0) {
    return "";
  }

  return `
    <section>
      <div class="section-heading compact-heading">
        <p>個人節奏</p>
        <h3>個人年 / 個人月 / 個人日</h3>
      </div>
      <div class="numerology-cycle-grid">
        ${cycles.map((item) => `
          <article class="numerology-cycle-card">
            <span class="detail-status is-${escapeHtml(item.status || "mock")}">${escapeHtml(item.value || "待計算")}</span>
            <strong>${escapeHtml(item.cycle)}</strong>
            <p>${escapeHtml(item.theme)}</p>
            <small>${escapeHtml(item.note)}</small>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderNumerologyNumberMeanings(meanings = []) {
  if (!Array.isArray(meanings) || meanings.length === 0) {
    return "";
  }

  return `
    <section>
      <div class="section-heading compact-heading">
        <p>數字 1～9 意義對照</p>
        <h3>九個數字的主題語彙</h3>
      </div>
      <div class="numerology-meaning-grid">
        ${meanings.map((item) => `
          <article class="numerology-meaning-card ${item.number === "7" ? "is-featured" : ""}">
            <span class="detail-status is-${escapeHtml(item.status || "planning")}">${escapeHtml(item.status || "planning")}</span>
            <div class="numerology-number-badge">${escapeHtml(item.number)}</div>
            <strong>${escapeHtml(item.keyword)}</strong>
            <p>${escapeHtml(item.theme)}</p>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderNumerologyActionNotes(actionNotes = []) {
  if (!Array.isArray(actionNotes) || actionNotes.length === 0) {
    return "";
  }

  return `
    <section>
      <div class="section-heading compact-heading">
        <p>行動節奏提示</p>
        <h3>把數字轉成可執行提醒</h3>
      </div>
      <div class="numerology-action-list">
        ${actionNotes.map((item) => `
          <article class="numerology-action-card">
            <span class="detail-status is-${escapeHtml(item.level || "planning")}">${escapeHtml(item.level || "planning")}</span>
            <strong>${escapeHtml(item.title)}</strong>
            <p>${escapeHtml(item.content)}</p>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderNumerologyInterpretation(blocks = []) {
  if (!Array.isArray(blocks) || blocks.length === 0) {
    return "";
  }

  return `
    <section>
      <div class="section-heading compact-heading">
        <p>解讀重點</p>
        <h3>後續解讀架構</h3>
      </div>
      <div class="numerology-interpretation-list">
        ${blocks.map((block) => `
          <article class="numerology-interpretation-card">
            <span class="detail-status is-${escapeHtml(block.level || "planning")}">${escapeHtml(block.level || "planning")}</span>
            <strong>${escapeHtml(block.title)}</strong>
            <p>${escapeHtml(block.content)}</p>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderNumerologyDataNotes(notes = []) {
  if (!Array.isArray(notes) || notes.length === 0) {
    return "";
  }

  return `
    <section class="numerology-data-notes">
      <h3>資料狀態提醒</h3>
      <ul>
        ${notes.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}
      </ul>
    </section>
  `;
}

function renderNameDetail(page = {}) {
  return `
    <section class="name-detail" aria-label="姓名學 mock 詳情">
      <div class="detail-note name-mock-note">目前是 mock / planning 姓名學骨架，不是正式姓名學結果；尚未接入正式姓名學計算，也不提供改名建議。</div>
      ${renderNameProfile(page.nameProfile)}
      ${renderNameStructureOverview(page.nameStructureOverview)}
      ${renderNameCharacterOverview(page.characterOverview)}
      ${renderNameFiveGridOverview(page.fiveGridOverview)}
      ${renderNameSoundMeaningOverview(page.soundMeaningOverview)}
      ${renderNameUsageScenarioOverview(page.usageScenarioOverview)}
      ${renderNameInterpretation(page.interpretationBlocks)}
      ${renderNameDataNotes(page.dataNotes)}
    </section>
  `;
}

function renderNameProfile(profile = {}) {
  return `
    <section class="name-profile-card">
      <div class="section-heading compact-heading">
        <p>姓名學摘要</p>
        <h3>${escapeHtml(profile.chartType || "姓名學命盤骨架")}</h3>
      </div>
      <div class="name-profile-grid">
        <div>
          <span>狀態</span>
          <strong>${escapeHtml(profile.chartStatus || "mock")}</strong>
        </div>
        <div>
          <span>顯示名稱</span>
          <strong>${escapeHtml(profile.displayName || "待建立")}</strong>
        </div>
        <div>
          <span>分析焦點</span>
          <strong>${escapeHtml(profile.analysisFocus || "字形 / 筆畫 / 五格 / 音義")}</strong>
        </div>
        <div>
          <span>筆畫狀態</span>
          <strong>${escapeHtml(profile.strokeStatus || "筆畫資料待正式校對")}</strong>
        </div>
      </div>
      <p>${escapeHtml(profile.summary || "目前為 mock 姓名學骨架。")}</p>
    </section>
  `;
}

function renderNameStructureOverview(items = []) {
  if (!Array.isArray(items) || items.length === 0) {
    return "";
  }

  return `
    <section>
      <div class="section-heading compact-heading">
        <p>姓名結構規劃</p>
        <h3>姓氏 / 名字 / 暱稱稱呼</h3>
      </div>
      <div class="name-structure-grid">
        ${items.map((item) => `
          <article class="name-structure-card">
            <span class="detail-status is-${escapeHtml(item.status || "planning")}">${escapeHtml(item.status || "planning")}</span>
            <strong>${escapeHtml(item.part)}</strong>
            <div>${escapeHtml(item.value || "待建立")}</div>
            <p>${escapeHtml(item.theme)}</p>
            <small>${escapeHtml(item.note)}</small>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderNameCharacterOverview(characters = []) {
  if (!Array.isArray(characters) || characters.length === 0) {
    return "";
  }

  return `
    <section>
      <div class="section-heading compact-heading">
        <p>單字筆畫與字義草稿</p>
        <h3>字形、筆畫與語意欄位</h3>
      </div>
      <div class="name-character-grid">
        ${characters.map((item) => `
          <article class="name-character-card">
            <div class="name-character-symbol">${escapeHtml(item.character || "名")}</div>
            <div>
              <span class="detail-status is-${escapeHtml(item.status || "planning")}">${escapeHtml(item.status || "planning")}</span>
              <strong>${escapeHtml(item.position)}</strong>
              <dl>
                <div>
                  <dt>筆畫</dt>
                  <dd>${escapeHtml(item.strokes || "待校對")}</dd>
                </div>
                <div>
                  <dt>五行</dt>
                  <dd>${escapeHtml(item.elementHint || "五行待定")}</dd>
                </div>
              </dl>
              <p>${escapeHtml(item.meaning)}</p>
              <small>${escapeHtml(item.note)}</small>
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderNameFiveGridOverview(grids = []) {
  if (!Array.isArray(grids) || grids.length === 0) {
    return "";
  }

  return `
    <section>
      <div class="section-heading compact-heading">
        <p>五格規劃</p>
        <h3>天格 / 人格 / 地格 / 外格 / 總格</h3>
      </div>
      <div class="name-five-grid">
        ${grids.map((item) => `
          <article class="name-five-card">
            <span class="detail-status is-${escapeHtml(item.status || "planning")}">${escapeHtml(item.status || "planning")}</span>
            <strong>${escapeHtml(item.grid)}</strong>
            <div>${escapeHtml(item.value || "待建立")}</div>
            <p>${escapeHtml(item.theme)}</p>
            <small>${escapeHtml(item.note)}</small>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderNameSoundMeaningOverview(items = []) {
  if (!Array.isArray(items) || items.length === 0) {
    return "";
  }

  return `
    <section>
      <div class="section-heading compact-heading">
        <p>音義與語感觀察</p>
        <h3>字音、字義、字形與語感</h3>
      </div>
      <div class="name-sound-grid">
        ${items.map((item) => `
          <article class="name-sound-card">
            <span class="detail-status is-${escapeHtml(item.status || "planning")}">${escapeHtml(item.status || "planning")}</span>
            <strong>${escapeHtml(item.item)}</strong>
            <p>${escapeHtml(item.theme)}</p>
            <small>${escapeHtml(item.note)}</small>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderNameUsageScenarioOverview(items = []) {
  if (!Array.isArray(items) || items.length === 0) {
    return "";
  }

  return `
    <section>
      <div class="section-heading compact-heading">
        <p>使用情境觀察</p>
        <h3>正式身分、日常互動與社群識別</h3>
      </div>
      <div class="name-usage-grid">
        ${items.map((item) => `
          <article class="name-usage-card">
            <span class="detail-status is-${escapeHtml(item.status || "planning")}">${escapeHtml(item.status || "planning")}</span>
            <strong>${escapeHtml(item.scenario)}</strong>
            <div>${escapeHtml(item.nameForm || "待建立")}</div>
            <p>${escapeHtml(item.theme)}</p>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderNameInterpretation(blocks = []) {
  if (!Array.isArray(blocks) || blocks.length === 0) {
    return "";
  }

  return `
    <section>
      <div class="section-heading compact-heading">
        <p>解讀重點</p>
        <h3>目前階段的 mock / planning 解讀方向</h3>
      </div>
      <div class="name-interpretation-list">
        ${blocks.map((block) => `
          <article class="name-interpretation-card">
            <span class="detail-status is-${escapeHtml(block.level || "planning")}">${escapeHtml(block.level || "planning")}</span>
            <strong>${escapeHtml(block.title)}</strong>
            <p>${escapeHtml(block.content)}</p>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderNameDataNotes(notes = []) {
  if (!Array.isArray(notes) || notes.length === 0) {
    return "";
  }

  return `
    <section class="name-data-notes">
      <h3>資料狀態提醒</h3>
      <ul>
        ${notes.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}
      </ul>
    </section>
  `;
}

function renderLuckDetail(page = {}) {
  return `
    <section class="luck-detail" aria-label="流年 / 九運 mock 詳情">
      <div class="detail-note luck-mock-note">目前是 mock / planning 流年與九運骨架，不是正式運勢判斷；尚未接入正式流年 / 九運計算，也不提供吉凶分數。</div>
      ${renderLuckProfile(page.luckProfile)}
      ${renderLuckAnnualCycleOverview(page.annualCycleOverview)}
      ${renderLuckNineLuckOverview(page.nineLuckOverview)}
      ${renderLuckTimelineOverview(page.timelineOverview)}
      ${renderLuckThemeIntegration(page.themeIntegration)}
      ${renderLuckActionNotes(page.actionNotes)}
      ${renderLuckInterpretation(page.interpretationBlocks)}
      ${renderLuckDataNotes(page.dataNotes)}
    </section>
  `;
}

function renderLuckProfile(profile = {}) {
  return `
    <section class="luck-profile-card">
      <div class="section-heading compact-heading">
        <p>流年 / 九運摘要</p>
        <h3>${escapeHtml(profile.chartType || "流年 / 九運節奏骨架")}</h3>
      </div>
      <div class="luck-profile-grid">
        <div>
          <span>狀態</span>
          <strong>${escapeHtml(profile.chartStatus || "mock")}</strong>
        </div>
        <div>
          <span>年度</span>
          <strong>${escapeHtml(profile.currentYear || "待建立")}</strong>
        </div>
        <div>
          <span>九運週期</span>
          <strong>${escapeHtml(profile.currentCycle || "待建立")}</strong>
        </div>
        <div>
          <span>週期範圍</span>
          <strong>${escapeHtml(profile.cycleRange || "待建立")}</strong>
        </div>
        <div class="is-wide">
          <span>分析焦點</span>
          <strong>${escapeHtml(profile.analysisFocus || "年度節奏 / 九運週期")}</strong>
        </div>
      </div>
      <p>${escapeHtml(profile.summary || "目前為 mock 流年與九運骨架。")}</p>
    </section>
  `;
}

function renderLuckAnnualCycleOverview(items = []) {
  if (!Array.isArray(items) || items.length === 0) {
    return "";
  }

  return `
    <section>
      <div class="section-heading compact-heading">
        <p>年度節奏規劃</p>
        <h3>年度主題、關鍵字與提醒</h3>
      </div>
      <div class="luck-annual-grid">
        ${items.map((item) => `
          <article class="luck-annual-card">
            <span class="detail-status is-${escapeHtml(item.status || "planning")}">${escapeHtml(item.status || "planning")}</span>
            <small>${escapeHtml(item.label)}</small>
            <strong>${escapeHtml(item.value)}</strong>
            <p>${escapeHtml(item.theme)}</p>
            <em>${escapeHtml(item.note)}</em>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderLuckNineLuckOverview(items = []) {
  if (!Array.isArray(items) || items.length === 0) {
    return "";
  }

  return `
    <section>
      <div class="section-heading compact-heading">
        <p>九運週期規劃</p>
        <h3>2024–2043 長週期觀察</h3>
      </div>
      <div class="luck-nine-grid">
        ${items.map((item) => `
          <article class="luck-nine-card">
            <span class="detail-status is-${escapeHtml(item.status || "planning")}">${escapeHtml(item.status || "planning")}</span>
            <small>${escapeHtml(item.label)}</small>
            <strong>${escapeHtml(item.value)}</strong>
            <div>${escapeHtml(item.range || "待建立")}</div>
            <p>${escapeHtml(item.theme)}</p>
            <em>${escapeHtml(item.note)}</em>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderLuckTimelineOverview(items = []) {
  if (!Array.isArray(items) || items.length === 0) {
    return "";
  }

  return `
    <section>
      <div class="section-heading compact-heading">
        <p>年度時間軸</p>
        <h3>從九運開場到後段整合</h3>
      </div>
      <div class="luck-timeline">
        ${items.map((item) => `
          <article class="luck-timeline-card">
            <span>${escapeHtml(item.period)}</span>
            <strong>${escapeHtml(item.title)}</strong>
            <p>${escapeHtml(item.theme)}</p>
            <small class="detail-status is-${escapeHtml(item.status || "planning")}">${escapeHtml(item.status || "planning")}</small>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderLuckThemeIntegration(items = []) {
  if (!Array.isArray(items) || items.length === 0) {
    return "";
  }

  return `
    <section>
      <div class="section-heading compact-heading">
        <p>主題整合</p>
        <h3>年度、九運與個人節奏的分層觀察</h3>
      </div>
      <div class="luck-theme-grid">
        ${items.map((item) => `
          <article class="luck-theme-card">
            <span class="detail-status is-${escapeHtml(item.level || "planning")}">${escapeHtml(item.level || "planning")}</span>
            <strong>${escapeHtml(item.title)}</strong>
            <p>${escapeHtml(item.content)}</p>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderLuckActionNotes(items = []) {
  if (!Array.isArray(items) || items.length === 0) {
    return "";
  }

  return `
    <section>
      <div class="section-heading compact-heading">
        <p>行動提醒</p>
        <h3>把時間節奏轉成可觀察的提醒</h3>
      </div>
      <div class="luck-action-grid">
        ${items.map((item) => `
          <article class="luck-action-card">
            <span class="detail-status is-${escapeHtml(item.level || "planning")}">${escapeHtml(item.level || "planning")}</span>
            <strong>${escapeHtml(item.title)}</strong>
            <p>${escapeHtml(item.content)}</p>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderLuckInterpretation(blocks = []) {
  if (!Array.isArray(blocks) || blocks.length === 0) {
    return "";
  }

  return `
    <section>
      <div class="section-heading compact-heading">
        <p>解讀重點</p>
        <h3>目前階段的 mock / planning 解讀方向</h3>
      </div>
      <div class="luck-interpretation-list">
        ${blocks.map((block) => `
          <article class="luck-interpretation-card">
            <span class="detail-status is-${escapeHtml(block.level || "planning")}">${escapeHtml(block.level || "planning")}</span>
            <strong>${escapeHtml(block.title)}</strong>
            <p>${escapeHtml(block.content)}</p>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderLuckDataNotes(notes = []) {
  if (!Array.isArray(notes) || notes.length === 0) {
    return "";
  }

  return `
    <section class="luck-data-notes">
      <h3>資料狀態提醒</h3>
      <ul>
        ${notes.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}
      </ul>
    </section>
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

function renderAlmanac(almanac = {}, supportConfig = {}) {
  const engineResult = getAlmanacEngineResult();
  setHtml("#almanacCard", renderAlmanacSupportCard(almanac, engineResult, supportConfig));
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

/* v0.7.0 dashboard render flow. */
function renderDashboardView() {
  renderSiteMeta(data.siteMeta || data.metadata || fallbackSiteMeta);
  renderProfile(data.profile);
  renderModules(data.modules);
  renderTodaySummary(data.todaySummary);
  renderNumerology(data.numerology);
  renderSoulTree(data.soulTree);
  renderAlmanac(data.almanac, data.almanacSupport);
  renderDeityDay(data.deityDay);
  renderTools(data.tools);
  renderBottomInsightStrip();
  renderDesktopNav(data);
}

function getCoreInputProfile() {
  return data?.coreInputProfile || {};
}

function getCoreCalculationRequirement(moduleId) {
  if (!moduleId || !data?.coreCalculationRequirements) {
    return null;
  }

  return data.coreCalculationRequirements[moduleId] || null;
}

function getCoreReadinessLabel(status) {
  const labels = {
    ready: "ready",
    partial: "partial",
    missing: "missing",
    future: "future"
  };

  return labels[status] || "missing";
}

function renderCoreRequirementBadge(moduleId) {
  const requirement = getCoreCalculationRequirement(moduleId);
  const status = requirement?.status || getCoreInputProfile()?.calculationReadiness?.[moduleId] || "";

  if (!status) {
    return "";
  }

  const label = getCoreReadinessLabel(status);

  return `<span class="readiness-chip is-${escapeHtml(label)}">${escapeHtml(label)}</span>`;
}

function getNumerologyCalculation() {
  const calculator = window.KekeNumerologyCalculator;

  if (!calculator || typeof calculator.calculateFromProfile !== "function") {
    console.warn("KekeNumerologyCalculator missing; numerology falls back to seed data.");
    return {
      status: "missing",
      source: "coreInputProfile.birth.solarDate",
      method: "digit-reduction-1-to-9",
      reason: "calculator missing",
      lifePathNumber: null
    };
  }

  return calculator.calculateFromProfile(getCoreInputProfile());
}

function getNumerologyDisplayData() {
  const calculation = getNumerologyCalculation();
  const fallback = data?.numerology || {};
  const config = data?.numerologyCalculation || {};

  if (calculation.status === "ok") {
    return {
      ...calculation,
      status: "calculated",
      version: config.version || "v0.7.0",
      lifeNumber: calculation.lifePathNumber,
      rhythmLabel: calculation.summary?.rhythmLabel || "",
      note: calculation.summary?.note || "本版依生日數字化簡規則計算。"
    };
  }

  return {
    status: calculation.status || "missing",
    version: config.version || "v0.7.0",
    source: calculation.source || "coreInputProfile.birth.solarDate",
    method: calculation.method || config.method || "digit-reduction-1-to-9",
    reason: calculation.reason || "本次未取得",
    solarDate: calculation.solarDate || getCoreInputProfile()?.birth?.solarDate || "",
    targetDate: calculation.targetDate || "",
    lifePathNumber: fallback.lifeNumber || null,
    lifeNumber: fallback.lifeNumber || "本次未取得",
    birthDayNumber: null,
    personalYear: fallback.personalYear || "本次未取得",
    personalMonth: fallback.personalMonth || "本次未取得",
    personalDay: fallback.personalDay || "本次未取得",
    rhythmLabel: "本次未取得",
    note: "生命靈數計算本次未取得，暫以 seed 顯示。"
  };
}

function getNumerologyMeanings() {
  const meanings = window.KekeNumerologyMeanings;

  if (!meanings || typeof meanings !== "object") {
    console.warn("KekeNumerologyMeanings missing; numerology interpretation falls back to a short note.");
    return null;
  }

  return meanings;
}

function getNumerologyMeaningFor(type, number) {
  const meanings = getNumerologyMeanings();
  const key = Number(number);

  if (!meanings || !Number.isInteger(key) || key < 1 || key > 9) {
    return null;
  }

  const mapByType = {
    lifePathNumber: meanings.lifePathMeanings,
    birthDayNumber: meanings.birthDayMeanings,
    personalYear: meanings.personalYearMeanings,
    personalMonth: meanings.personalMonthMeanings,
    personalDay: meanings.personalDayMeanings
  };

  return mapByType[type]?.[key] || null;
}

function getNumerologyInterpretationDisplay(display = {}) {
  const meanings = getNumerologyMeanings();
  const cards = [
    {
      type: "lifePathNumber",
      className: "is-life-path",
      label: "生命靈數",
      number: display.lifePathNumber,
      meaning: getNumerologyMeaningFor("lifePathNumber", display.lifePathNumber),
      fields: ["keyword", "theme", "light", "shadow", "action"]
    },
    {
      type: "birthDayNumber",
      className: "is-birth-day",
      label: "生日數",
      number: display.birthDayNumber,
      meaning: getNumerologyMeaningFor("birthDayNumber", display.birthDayNumber),
      fields: ["focus", "gift", "reminder"]
    },
    {
      type: "personalYear",
      className: "is-personal-year",
      label: "個人年",
      number: display.personalYear,
      meaning: getNumerologyMeaningFor("personalYear", display.personalYear),
      fields: ["yearlyTheme", "goodFor", "watchOut", "action"]
    },
    {
      type: "personalMonth",
      className: "is-personal-month",
      label: "個人月",
      number: display.personalMonth,
      meaning: getNumerologyMeaningFor("personalMonth", display.personalMonth),
      fields: ["monthlyTone", "goodFor", "watchOut"]
    },
    {
      type: "personalDay",
      className: "is-personal-day",
      label: "個人日",
      number: display.personalDay,
      meaning: getNumerologyMeaningFor("personalDay", display.personalDay),
      fields: ["dailyHint", "goodFor", "watchOut"]
    }
  ];

  return {
    status: meanings?.meta?.status || "missing",
    version: meanings?.meta?.version || data?.numerologyInterpretation?.version || "v0.7.0",
    note: meanings?.meta?.note || "生命靈數解讀資料本次未載入，先保留計算結果。",
    cards
  };
}

function renderNumerologyInterpretationPanel(display = {}) {
  const interpretation = getNumerologyInterpretationDisplay(display);
  const hasMeanings = interpretation.status === "static-interpretation";

  return `
    <section class="numerology-interpretation-panel" aria-label="生命靈數解讀資料">
      <div class="section-heading compact-heading">
        <p>static-interpretation</p>
        <h3>生命靈數解讀資料</h3>
        <span class="interpretation-chip is-static">${escapeHtml(interpretation.version)}</span>
      </div>
      <p class="compact-note">${escapeHtml(interpretation.note)}</p>
      ${hasMeanings ? `
        <div class="numerology-interpretation-grid">
          ${interpretation.cards.map((card) => renderNumerologyInterpretationCard(card)).join("")}
        </div>
      ` : `
        <p class="detail-note">KekeNumerologyMeanings 本次未載入；頁面保留計算結果，不中斷詳情頁。</p>
      `}
    </section>
  `;
}

function renderNumerologyInterpretationCard(card = {}) {
  const meaning = card.meaning || {};

  return `
    <article class="numerology-interpretation-card ${escapeHtml(card.className || "")}">
      <div class="numerology-card-kicker">
        <span>${escapeHtml(card.label || "")}</span>
        <strong>${escapeHtml(card.number || "未取得")}</strong>
      </div>
      <dl>
        ${card.fields.map((field) => meaning[field] ? `
          <div>
            <dt>${escapeHtml(getNumerologyFieldLabel(field))}</dt>
            <dd>${escapeHtml(meaning[field])}</dd>
          </div>
        ` : "").join("")}
      </dl>
    </article>
  `;
}

function getNumerologyFieldLabel(field) {
  const labels = {
    keyword: "關鍵字",
    theme: "主題",
    light: "順光",
    shadow: "提醒",
    action: "行動",
    focus: "焦點",
    gift: "天賦",
    reminder: "提醒",
    yearlyTheme: "年度主題",
    goodFor: "適合",
    watchOut: "留意",
    monthlyTone: "月節奏",
    dailyHint: "日提醒"
  };

  return labels[field] || field;
}

function renderNumerologySafetyLines() {
  const meanings = getNumerologyMeanings();
  const lines = Array.isArray(meanings?.safetyLines) ? meanings.safetyLines : [
    "生命靈數資料只作自我觀察與節奏提醒。",
    "本頁不作重大決策依據。"
  ];

  return `
    <section class="numerology-safety-lines" aria-label="生命靈數安全提醒">
      <h3>安全線</h3>
      <ul>
        ${lines.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}
      </ul>
    </section>
  `;
}

function getCoreDisplayValue(moduleId, fallbackValue) {
  if (moduleId !== "numerology") {
    return fallbackValue;
  }

  const numerologyDisplay = getNumerologyDisplayData();
  return numerologyDisplay.lifePathNumber || fallbackValue;
}

function renderNumerologyCalculationBadge(displayData) {
  const calculation = displayData || getNumerologyDisplayData();
  const status = calculation.status === "calculated" ? "calculated" : "missing";
  const label = status === "calculated" ? `calculated ${calculation.version || "v0.7.0"}` : "calculation fallback";

  return `<span class="calculation-chip is-${escapeHtml(status)}">${escapeHtml(label)}</span>`;
}

function renderProfile(profile = {}) {
  const summary = data?.todaySummary || {};
  const inputProfile = getCoreInputProfile();
  const name = profile.name || data?.profile?.name || "科科";
  const birthday = profile.birthday || "1990/06/09";
  const zodiac = profile.zodiac || "雙子座";
  const birthTime = profile.birthTime || "午時 11:00-13:00";
  const dataStatus = inputProfile.dataStatus || "seed";
  const privacyMode = inputProfile.privacyMode || "local-static";

  setHtml("#profileCard", `
    <div class="prototype-hero-profile">
      <div class="cosmic-disc production-disc" aria-hidden="true"><span></span></div>
      <div class="hero-copy production-hero-copy">
        <p class="eyebrow">本命摘要</p>
        <h2 id="profile-title">${escapeHtml(name)} <span class="version-pill">本命檔案</span></h2>
        <div class="profile-meta blueprint-chip-row">
          <span>生日：${escapeHtml(birthday)}</span>
          <span>星座：${escapeHtml(zodiac)}</span>
          <span>出生時辰：${escapeHtml(birthTime)}</span>
        </div>
        <div class="input-status-row" aria-label="五大核心輸入資料狀態">
          <span class="input-status-chip">${escapeHtml(dataStatus)}</span>
          <span class="input-status-chip">${escapeHtml(privacyMode)}</span>
          <span class="input-status-chip">五大核心資料已鎖定</span>
        </div>
        <p>${escapeHtml(profile.summary || "靈動好奇、思維敏捷，擅長連結與學習，生命課題在於專注與深化。")}</p>
      </div>
    </div>
    ${renderHeroFocusStrip(summary)}
  `);
}

function renderHeroFocusStrip(summary = {}) {
  return `
    <div class="hero-focus-strip production-focus-strip" aria-label="首頁快速洞察">
      <article>
        <span>本命主題</span>
        <strong>學習 × 連結</strong>
        <small>以知識連結世界，以清楚創造理解。</small>
      </article>
      <article>
        <span>年度焦點</span>
        <strong>深化專長</strong>
        <small>專注主軸，累積深度與價值。</small>
      </article>
      <article>
        <span>今日提醒</span>
        <strong>${escapeHtml(summary.theme || "專注與收斂")}</strong>
        <small>${escapeHtml(summary.quote || "先完成最重要的一件事，比什麼都強。")}</small>
      </article>
    </div>
  `;
}

function renderModules(modules = []) {
  const currentModuleId = getCurrentModuleId();
  const primaryIds = ["ziwei", "bazi", "astrology", "numerology", "name"];
  const secondaryIds = ["luck", "yijing", "database"];
  const routeModules = modules.reduce((items, item) => {
    const moduleId = window.KekeRouter && typeof window.KekeRouter.getRouteModuleId === "function"
      ? window.KekeRouter.getRouteModuleId(item.href)
      : null;

    if (primaryIds.includes(moduleId) || secondaryIds.includes(moduleId)) {
      items.push({ item, moduleId, isPrimary: primaryIds.includes(moduleId) });
    }

    return items;
  }, []);

  setHtml("#moduleCard", `
    <div class="section-heading inline-heading core-dashboard-head production-core-head">
      <div>
        <p>命盤核心</p>
        <h2 id="module-title">命盤總控台</h2>
      </div>
      <span class="soft-tag">核心入口</span>
    </div>
    <p class="module-intro blueprint-summary-line">先從五大本命系統看見自己；輔助提醒放到下方，讓首頁保持命盤總控台節奏。</p>
    <div class="core-dashboard production-core-dashboard" id="moduleGrid">
      <div class="core-dashboard-grid production-core-grid">
        ${routeModules.map(({ item, moduleId, isPrimary }) => renderCoreModuleCard(item, moduleId, currentModuleId, isPrimary)).join("")}
      </div>
    </div>
  `);
}

function renderCoreModuleCard(item = {}, moduleId, currentModuleId, isPrimary = true) {
  const detailPage = getDetailPage(moduleId) || {};
  const preview = detailPage.dashboardPreview || {};
  const isActive = currentModuleId && moduleId === currentModuleId;
  const status = detailPage.status || "planning";
  const summary = preview.secondaryValue || preview.headline || item.note || "目前為 mock / planning 詳情頁。";
  const moduleClass = isPrimary && moduleId ? ` is-module-${escapeHtml(moduleId)}` : "";
  const visual = isPrimary ? renderCoreModuleVisual(moduleId, item, detailPage, preview) : "";
  const readiness = isPrimary ? renderCoreRequirementBadge(moduleId) : "";

  return `
    <a class="core-module-card blueprint-core-card production-core-card ${isPrimary ? "is-primary-core" : "is-secondary-core"}${moduleClass}${isActive ? " is-active" : ""}" href="${escapeHtml(item.href)}"${isActive ? ' aria-current="page"' : ""}>
      <span class="module-icon" aria-hidden="true">${escapeHtml(detailPage.icon || item.icon || "✦")}</span>
      <span class="core-card-copy">
        <small>${escapeHtml(preview.label || detailPage.category || (isPrimary ? "命盤主軸" : "延伸系統"))}</small>
        <strong>${escapeHtml(item.title || detailPage.title)}</strong>
        <em>${escapeHtml(summary)}</em>
        ${readiness}
      </span>
      <span class="preview-status is-${escapeHtml(status)}">${escapeHtml(status)}</span>
      ${visual}
      <span class="module-enter">進入詳情頁</span>
    </a>
  `;
}

function renderCoreModuleVisual(moduleId, item = {}, detailPage = {}, preview = {}) {
  if (moduleId === "ziwei") {
    const palaceLabels = ["命", "兄", "夫", "子", "科", "財", "疾", "遷", "福"];

    return `
      <span class="module-visual ziwei-visual" aria-label="紫微斗數 mini 宮位示意">
        <span class="ziwei-palace-mini" aria-hidden="true">
          ${palaceLabels.map((label) => `<i>${escapeHtml(label)}</i>`).join("")}
        </span>
        <span class="module-visual-copy">
          <strong>${escapeHtml(preview.primaryValue || "命宮 / 主星")}</strong>
          <small>宮位與主題</small>
        </span>
      </span>
    `;
  }

  if (moduleId === "bazi") {
    const pillars = ["年", "月", "日", "時"];

    return `
      <span class="module-visual bazi-visual" aria-label="八字四柱 mini 四柱示意">
        <span class="bazi-pillar-mini" aria-hidden="true">
          ${pillars.map((pillar) => `
            <i>
              <small>${escapeHtml(pillar)}</small>
              <strong>${pillar === "日" ? "主" : "柱"}</strong>
            </i>
          `).join("")}
        </span>
        <span class="module-visual-copy">
          <strong>${escapeHtml(preview.primaryValue || "年 / 月 / 日 / 時")}</strong>
          <small>五行分布</small>
        </span>
      </span>
    `;
  }

  if (moduleId === "astrology") {
    return `
      <span class="module-visual astrology-visual" aria-label="西洋星盤 mini 軸線示意">
        <span class="astrology-orbit-mini" aria-hidden="true">
          <i class="orbit-ring"></i>
          <b class="orbit-dot is-sun">太</b>
          <b class="orbit-dot is-moon">月</b>
          <b class="orbit-dot is-rise">升</b>
        </span>
        <span class="module-visual-copy">
          <strong>${escapeHtml(preview.primaryValue || "太陽 / 月亮 / 上升")}</strong>
          <small>行星相位</small>
        </span>
      </span>
    `;
  }

  if (moduleId === "numerology") {
    const numerologyDisplay = getNumerologyDisplayData();
    const mainNumber = numerologyDisplay.lifePathNumber || preview.primaryValue || "7";
    const rhythmCopy = numerologyDisplay.status === "calculated"
      ? `年${numerologyDisplay.personalYear} / 月${numerologyDisplay.personalMonth} / 日${numerologyDisplay.personalDay}`
      : "節奏與主題";

    return `
      <span class="module-visual numerology-visual" aria-label="生命靈數 mini 數字示意">
        <span class="numerology-main-number" aria-hidden="true">${escapeHtml(mainNumber)}</span>
        <span class="numerology-mini-strip" aria-hidden="true">
          <i>年</i>
          <i>月</i>
          <i>日</i>
        </span>
        <span class="module-visual-copy">
          <strong>${escapeHtml(preview.secondaryValue || item.title || "生命靈數")}</strong>
          <small>${escapeHtml(rhythmCopy)}</small>
        </span>
      </span>
    `;
  }

  if (moduleId === "name") {
    const nameText = (detailPage.title || item.title || "科科").replace(/\s/g, "").slice(0, 4) || "科科";

    return `
      <span class="module-visual name-visual" aria-label="姓名學 mini 字形示意">
        <span class="name-glyph-grid" aria-hidden="true">
          ${Array.from(nameText).map((glyph) => `<i>${escapeHtml(glyph)}</i>`).join("")}
        </span>
        <span class="name-mini-tags" aria-hidden="true">
          <i>字音</i>
          <i>氣質</i>
          <i>字形</i>
        </span>
        <span class="module-visual-copy">
          <strong>${escapeHtml(preview.primaryValue || "字義與語感")}</strong>
          <small>姓名氣質</small>
        </span>
      </span>
    `;
  }

  return "";
}

function renderTodaySummary(summary = {}) {
  setHtml("#todayCard", `
    <div class="section-heading compact-heading">
      <p>${escapeHtml(summary.label || summary.displayLabel || "今日科科摘要")}</p>
      <h2 id="today-title">${escapeHtml(summary.theme || "專注與收斂")}</h2>
    </div>
    <div class="today-short-lines">
      <p><span>適合</span>${escapeHtml(summary.suitable || "整理資料、學習研究、寫筆記、靜心祈福")}</p>
      <p><span>小心</span>${escapeHtml(summary.caution || "分心、晚睡、想很多但沒有落地")}</p>
    </div>
    <p class="blueprint-summary-line">${escapeHtml(summary.quote || "先完成最重要的一件事，比什麼都強。")}</p>
  `);
}

function renderNumerology(numerology = {}) {
  const display = getNumerologyDisplayData();
  const rhythmMeta = data?.numberRhythmCard || {};
  const personalYear = display.personalYear || numerology.personalYear || 7;
  const personalMonth = display.personalMonth || numerology.personalMonth || 4;
  const personalDay = display.personalDay || numerology.personalDay || 2;

  setHtml("#numerologyCard", `
    <div class="section-heading compact-heading">
      <p>今日節奏</p>
      <h2 id="number-rhythm-title">${escapeHtml(rhythmMeta.displayName || "今日數字節奏")}</h2>
      ${renderNumerologyCalculationBadge(display)}
    </div>
    <div class="number-rhythm blueprint-number-focus production-number-focus">
      <span>今日焦點</span>
      <strong class="life-number is-small">${escapeHtml(personalDay)}</strong>
      <small>個人日：今日行動節奏；個人年 ${escapeHtml(personalYear)} / 個人月 ${escapeHtml(personalMonth)}</small>
    </div>
    <div class="number-strip compact blueprint-chip-row" aria-label="今日數字節奏">
      <span><strong>${escapeHtml(personalYear)}</strong>個人年</span>
      <span><strong>${escapeHtml(personalMonth)}</strong>個人月</span>
      <span><strong>${escapeHtml(personalDay)}</strong>個人日</span>
    </div>
  `);
}

function renderSoulTree(soulTree = {}) {
  setHtml("#treeCard", `
    <div class="soul-tree-card-shell">
      ${renderSoulTreeVisual()}
      <div class="soul-tree-copy">
        <div class="section-heading">
          <p>命樹</p>
          <h2 id="tree-title">${escapeHtml(soulTree.title || "多系統整合")}</h2>
        </div>
        <p class="compact-note">${escapeHtml(soulTree.description || "多元命理系統整合成一棵屬於科科的命理之樹，看見全貌，找到方向。")}</p>
        <div class="blueprint-chip-row">
          <a href="#/module/ziwei">紫微</a>
          <a href="#/module/astrology">星盤</a>
          <a href="#/module/numerology">生命靈數</a>
          <a href="#/module/soul-tree">命樹</a>
        </div>
      </div>
    </div>
  `);
}

function renderSoulTreeVisual() {
  return `
    <div class="soul-tree-visual production-tree-visual" aria-label="命樹整合視覺">
      <span class="tree-orbit is-root">根：八字</span>
      <span class="tree-orbit is-ziwei">紫微</span>
      <span class="tree-orbit is-star">星盤</span>
      <span class="tree-orbit is-number">靈數</span>
      <strong>日主<br>本命</strong>
    </div>
  `;
}

function renderAlmanacSupportCard(almanac = {}, engineResult = {}, supportConfig = {}) {
  const engineOk = engineResult.status === "ok";
  const solarDate = engineOk ? engineResult.solarDate : almanac.solarDate;
  const lunarText = engineOk ? engineResult.lunarText : almanac.lunarDate;
  const yi = engineOk ? engineResult.yi : almanac.good;
  const shortLine = yi && yi !== "本次未取得" ? `今日宜：${yi}` : "今日只作節奏參考。";

  return `
    <div class="compact-reminder almanac-support-card blueprint-short-card production-support-short">
      <div class="support-card-head">
        <span class="source-tag">${escapeHtml(supportConfig.statusLabel || "experiment")}</span>
        <p>輔助提醒</p>
      </div>
      <h2 id="almanac-title">農民曆小提醒</h2>
      <p class="support-main">${escapeHtml(solarDate || "本次未取得")}｜${escapeHtml(lunarText || "本次未取得")}</p>
      <p class="compact-note">${escapeHtml(shortLine)}</p>
    </div>
  `;
}

function renderDeityDay(deityDay = {}) {
  const result = getDeityMatchesResult();
  const summary = getDeitySummary(result);
  const isTestMode = result.testMode === true || result.mode === "test";
  const status = result.status || "error";
  const title = status === "ok"
    ? summary.title
    : isTestMode
      ? "測試日期未命中神明生日資料表"
      : "今日未命中神明生日資料表";

  setHtml("#deityCard", `
    <div class="compact-reminder deity-compact-reminder blueprint-short-card production-support-short">
      <div class="support-card-head">
        <span class="source-tag">${escapeHtml(status)}</span>
        <p>${escapeHtml(isTestMode ? "測試模式" : "今日模式")}</p>
      </div>
      <h2 id="deity-title">${escapeHtml(title)}</h2>
      <p class="support-main">${summary.lunarDate}</p>
      <p class="compact-note">${escapeHtml(summary.blessing || deityDay.blessing || "暫無命中，維持平常心。")}</p>
    </div>
  `);
}

function renderTools(tools = []) {
  const siteMeta = getSiteMeta();
  const buttons = tools.map((label) => `
    <button type="button">${escapeHtml(label)}</button>
  `).join("");

  setHtml("#toolsCard", `
    <div class="support-card-head">
      <span>底部工具區</span>
      <p>${escapeHtml(siteMeta.version || fallbackSiteMeta.version)}</p>
    </div>
    <h2 id="tool-title">資料工具</h2>
    <div class="tool-row">${buttons}</div>
    <p class="support-main">目前版本 ${escapeHtml(siteMeta.version || fallbackSiteMeta.version)}｜資料層 ${escapeHtml(siteMeta.dataVersion || fallbackSiteMeta.dataVersion)}</p>
    <p class="compact-note">${escapeHtml(siteMeta.status || fallbackSiteMeta.status)}</p>
  `);

  setHtml("#topbarActions", `
    <button type="button">今日總覽</button>
    <span class="version-badge">${escapeHtml(siteMeta.version || fallbackSiteMeta.version)}</span>
    <button type="button">${escapeHtml(tools[0] || "匯出 JSON")}</button>
    <button type="button" class="profile-button">${escapeHtml(data?.profile?.name || "科科")}</button>
  `);
}

function renderBottomInsightStrip() {
  setHtml("#bottomInsightStrip", `
    <section class="bottom-insight-grid" aria-label="今日靈性儀表板">
      <article id="blessingCard" class="bottom-insight-card">
        <span class="insight-icon" aria-hidden="true">鈴</span>
        <div>
          <strong>今日提醒</strong>
          <p>少即是多，先完成最重要的一件事。</p>
        </div>
      </article>
      <article id="weeklyThemeCard" class="bottom-insight-card">
        <span class="insight-icon" aria-hidden="true">星</span>
        <div>
          <strong>本週主題</strong>
          <p>建立穩定作息，累積長期價值。</p>
        </div>
      </article>
      <article id="prayerNoteCard" class="bottom-insight-card">
        <span class="insight-icon" aria-hidden="true">筆</span>
        <div>
          <strong>祈福筆記</strong>
          <p>記錄今天的願望與新的理解。</p>
        </div>
      </article>
    </section>
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
