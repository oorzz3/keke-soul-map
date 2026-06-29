const data = window.KekeSoulData || {};
const fallbackSiteMeta = {
  version: "v0.4.0",
  dataVersion: "v0.2",
  cacheVersion: "v0.4.0",
  status: "五大核心詳情頁節奏整理 × renderer 命名收束"
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

function renderNumerologyDetail(page = {}) {
  return `
    <section class="numerology-detail" aria-label="生命靈數 mock 詳情">
      <div class="detail-note numerology-mock-note">目前是 mock 靈數骨架，不是正式計算結果；尚未接入正式生命靈數計算。</div>
      ${renderNumerologyProfile(page.numerologyProfile)}
      ${renderNumerologyCoreNumbers(page.coreNumberOverview)}
      ${renderNumerologyBirthBreakdown(page.birthBreakdownDraft)}
      ${renderNumerologyRhythmOverview(page.rhythmOverview)}
      ${renderNumerologyNumberMeanings(page.numberMeaningOverview)}
      ${renderNumerologyActionNotes(page.actionNotes)}
      ${renderNumerologyInterpretation(page.interpretationBlocks)}
      ${renderNumerologyDataNotes(page.dataNotes)}
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
          <article class="numerology-core-card ${item.value === "7" ? "is-featured" : ""}">
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
            <span class="detail-status is-mock">${escapeHtml(item.value || "待計算")}</span>
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
        <h3>目前階段的 mock / planning 解讀方向</h3>
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
    <div class="section-heading compact-heading">
      <p>小節奏</p>
      <h2 id="life-number-title">生命靈數節奏</h2>
    </div>
    <div class="number-rhythm">
      <span>生命靈數</span>
      <strong class="life-number is-small">${escapeHtml(numerology.lifeNumber)}</strong>
      <small>今日用來觀察行動節奏，不取代命盤核心。</small>
    </div>
    <div class="number-strip compact" aria-label="生命靈數節奏資料">
      <span><strong>${escapeHtml(numerology.personalYear)}</strong>個人年</span>
      <span><strong>${escapeHtml(numerology.personalMonth)}</strong>個人月</span>
      <span><strong>${escapeHtml(numerology.personalDay)}</strong>個人日</span>
    </div>
  `);
}

function renderModules(modules = []) {
  const currentModuleId = getCurrentModuleId();
  const coreModuleIds = ["ziwei", "bazi", "astrology", "numerology", "name"];
  const coreModules = modules.reduce((items, item) => {
    const moduleId = window.KekeRouter && typeof window.KekeRouter.getRouteModuleId === "function"
      ? window.KekeRouter.getRouteModuleId(item.href)
      : null;

    if (coreModuleIds.includes(moduleId)) {
      items.push({ item, moduleId });
    }

    return items;
  }, []);

  setHtml("#moduleCard", `
    <div class="section-heading inline-heading core-dashboard-head">
      <div>
        <p>命盤核心</p>
        <h2 id="module-title">命盤總控台</h2>
      </div>
      <span class="soft-tag">核心入口</span>
    </div>
    <p class="module-intro">先從本命系統看見自己；紫微、八字、星盤、生命靈數、姓名學是首頁主軸，其餘提醒放到下方輔助區。</p>
    <div class="core-dashboard" id="moduleGrid">
      <div class="core-dashboard-grid">
        ${coreModules.map(({ item, moduleId }) => renderCoreModuleCard(item, moduleId, currentModuleId)).join("")}
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

  const isIntegrationGroup = className.includes("module-secondary-list");
  const listClass = isIntegrationGroup ? "integration-result-list" : "";
  const itemsHtml = entries.map(({ item, moduleId }) => isIntegrationGroup
    ? renderIntegrationResultCard(item, moduleId, currentModuleId)
    : renderCompactModuleLink(item, moduleId, currentModuleId)).join("");

  return `
    <section class="${className}">
      <h3 class="module-group-title">${escapeHtml(title)}</h3>
      <div class="${listClass}">
        ${itemsHtml}
      </div>
    </section>
  `;
}

function renderIntegrationResultCard(item = {}, moduleId, currentModuleId) {
  const detailPage = getDetailPage(moduleId) || {};
  const result = detailPage.dashboardResult || {};
  const isActive = currentModuleId && moduleId && moduleId === currentModuleId;
  const className = [
    "integration-result-card",
    isActive ? "is-active" : ""
  ].filter(Boolean).join(" ");

  return `
    <a class="${className}" href="${escapeHtml(item.href)}"${isActive ? ' aria-current="page"' : ""}>
      <span class="module-icon" aria-hidden="true">${escapeHtml(detailPage.icon || item.icon)}</span>
      <span>
        <small class="integration-result-label">${escapeHtml(result.label || detailPage.status || "planning")}</small>
        <strong>${escapeHtml(item.title)}</strong>
        <em class="integration-result-value">${escapeHtml(result.value || detailPage.subtitle || item.note)}</em>
        <small>${escapeHtml(result.note || item.note || detailPage.summary)}</small>
      </span>
      <span class="module-arrow" aria-hidden="true">&gt;</span>
    </a>
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
    <div class="compact-reminder">
      <div class="section-heading support-heading compact-heading">
        <p>輔助提醒</p>
        <h2 id="almanac-title">今日時曆提醒</h2>
      </div>
      <p class="support-copy">農民曆作為每日提醒參考，主軸仍是命盤核心。</p>
      <div class="compact-reminder-grid">
        <div>
          <span>國曆</span>
          <strong>${escapeHtml(almanac.solarDate)}</strong>
        </div>
        <div>
          <span>農曆</span>
          <strong>${escapeHtml(almanac.lunarDate)}</strong>
        </div>
        <div>
          <span>今日宜</span>
          <strong>${escapeHtml(almanac.good)}</strong>
        </div>
        <div>
          <span>今日忌</span>
          <strong>${escapeHtml(almanac.avoid)}</strong>
        </div>
      </div>
      <dl class="detail-list compact support-detail is-muted">
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
    </div>
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
      <div class="engine-panel is-compact">
        <div class="engine-panel-head">
          <strong>lunar 實驗資料</strong>
          <span class="engine-status is-error">error</span>
        </div>
        <p class="engine-empty">本次未取得 lunar 實驗資料。</p>
        <p class="engine-reason">原因：${escapeHtml(result.errorMessage || "本次未取得")}</p>
      </div>
    `;
  }

  return `
    <div class="engine-panel is-compact">
      <div class="engine-panel-head">
        <strong>lunar 實驗資料</strong>
        <span class="engine-status">ok</span>
      </div>
      <dl class="engine-list compact-engine-list">
        <div>
          <dt>來源</dt>
          <dd><span class="source-tag">${escapeHtml(result.source)}</span></dd>
        </div>
        <div>
          <dt>農曆</dt>
          <dd>${escapeHtml(result.lunarText)}</dd>
        </div>
        <div>
          <dt>宜 / 忌</dt>
          <dd>${escapeHtml(result.yi)} / ${escapeHtml(result.ji)}</dd>
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
    <div class="test-mode-panel is-compact">
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
    ? `${isTestMode ? "測試 " : ""}${escapeHtml(result.lunarMonthText)}月${escapeHtml(result.lunarDayText)}`
    : "本次未取得";
  const seedNote = data?.deityMatcher?.note || "本版使用 seed 資料表測試命中，不代表資料表已完整。";
  const matchItems = Array.isArray(result.matches) ? result.matches : [];

  const matchHtml = matchItems.length > 0
    ? `
      <div class="deity-list compact-deity-list">
        ${matchItems.map((item) => `
          <article>
            <strong>${escapeHtml(item.title)}</strong>
            <small>${escapeHtml(item.category)} / ${escapeHtml(item.sourceLevel)}</small>
            <p>${escapeHtml(item.blessing)}</p>
          </article>
        `).join("")}
      </div>
    `
    : `<p class="engine-empty">${escapeHtml(result.message || "今日或測試日期未命中 seed 資料表。")}</p>`;

  return `
    <div class="engine-panel deity-panel is-compact">
      <div class="engine-panel-head">
        <strong>神明生日資料表</strong>
        <span class="engine-status deity-status${statusClass}">${escapeHtml(status)}</span>
      </div>
      <div class="test-mode-line">
        <span class="mode-tag ${modeClass}">${modeLabel}</span>
        <span>${escapeHtml(result.testMessage || (isTestMode ? "目前使用測試模式。" : "目前使用今日模式。"))}</span>
      </div>
      <dl class="engine-list compact-engine-list">
        <div>
          <dt>農曆</dt>
          <dd>${lunarDate}</dd>
        </div>
        <div>
          <dt>結果</dt>
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
    <div class="compact-reminder deity-compact-reminder">
      <div class="section-heading support-heading compact-heading">
        <p>輔助提醒</p>
        <h2 id="deity-title">${escapeHtml(deitySummary.title)}</h2>
      </div>
      <dl class="detail-list compact deity-summary">
        <div>
          <dt>農曆</dt>
          <dd>${deitySummary.lunarDate}</dd>
        </div>
        <div>
          <dt>祈福方向</dt>
          <dd>${escapeHtml(deitySummary.blessing)}</dd>
        </div>
      </dl>
      ${renderDeityMatcherPanel(deityMatchesResult)}
      ${renderMockDeitySample(deityDay)}
    </div>
  `);
}

function getIntegrationPages() {
  const integrationIds = ["luck", "yijing", "soul-tree", "database"];
  return integrationIds
    .map((id) => getDetailPage(id))
    .filter((page) => page && page.id);
}

function renderIntegrationSummary() {
  const currentModuleId = getCurrentModuleId();
  const pages = getIntegrationPages();

  if (pages.length === 0) {
    return "";
  }

  return `
    <section class="integration-summary" aria-label="整合與工具摘要">
      <div class="section-heading compact-heading">
        <p>整合與工具</p>
        <h3>目前結果摘要</h3>
      </div>
      <div class="integration-summary-grid">
        ${pages.map((page) => {
          const result = page.dashboardResult || {};
          const isActive = currentModuleId === page.id;
          return `
            <a class="integration-summary-item${isActive ? " is-active" : ""}" href="${escapeHtml(page.route || getModuleRoute(page.id))}"${isActive ? ' aria-current="page"' : ""}>
              <span class="module-icon" aria-hidden="true">${escapeHtml(page.icon || page.navLabel || "*")}</span>
              <span>
                <small>${escapeHtml(result.label || page.status || "planning")}</small>
                <strong>${escapeHtml(page.title)}</strong>
                <em>${escapeHtml(result.value || page.subtitle || page.summary)}</em>
              </span>
            </a>
          `;
        }).join("")}
      </div>
    </section>
  `;
}

function renderSoulTree(soulTree = {}) {
  setHtml("#treeCard", `
    <div class="section-heading">
      <p>命樹</p>
      <h2 id="tree-title">${escapeHtml(soulTree.title)}</h2>
    </div>
    <div class="tree-map" aria-label="命樹結構">
      <span class="tree-node root">${escapeHtml(soulTree.root)}</span>
      <span class="tree-node trunk">${escapeHtml(soulTree.trunk)}</span>
      <span class="tree-node crown">${escapeHtml(soulTree.crown)}</span>
    </div>
    <p>${escapeHtml(soulTree.description)}</p>
    ${renderIntegrationSummary()}
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
