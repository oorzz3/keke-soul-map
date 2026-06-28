const data = window.KekeSoulData;
const fallbackSiteMeta = {
  version: "v0.2.1",
  dataVersion: "v0.2",
  cacheVersion: "v0.2.1",
  status: "資料模組化 × 版本顯示"
};

if (!data) {
  console.warn("KekeSoulData 未載入，首頁資料暫時無法渲染。");
} else {
  renderSiteMeta(data.siteMeta || data.metadata || fallbackSiteMeta);
  renderProfile(data.profile);
  renderTodaySummary(data.todaySummary);
  renderNumerology(data.numerology);
  renderModules(data.modules);
  renderAlmanac(data.almanac);
  renderDeityDay(data.deityDay);
  renderSoulTree(data.soulTree);
  renderTools(data.tools);
  renderDesktopNav(data);
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
      <p class="eyebrow">本命檔案</p>
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
      <p>${escapeHtml(summary.displayLabel || "今日科科")}</p>
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
    <div class="number-strip" aria-label="生命靈數明細">
      <span><strong>${escapeHtml(numerology.personalYear)}</strong>個人年</span>
      <span><strong>${escapeHtml(numerology.personalMonth)}</strong>個人月</span>
      <span><strong>${escapeHtml(numerology.personalDay)}</strong>個人日</span>
    </div>
  `);
}

function renderModules(modules = []) {
  const moduleItems = modules.map((item) => `
    <a class="module-item" href="${escapeHtml(item.href)}">
      <span class="module-icon" aria-hidden="true">${escapeHtml(item.icon)}</span>
      <span>
        <strong>${escapeHtml(item.title)}</strong>
        <small>${escapeHtml(item.note)}</small>
      </span>
      <span class="module-arrow" aria-hidden="true">›</span>
    </a>
  `).join("");

  setHtml("#moduleCard", `
    <div class="section-heading inline-heading">
      <div>
        <p>命理模組</p>
        <h2 id="module-title">入口卡</h2>
      </div>
      <span class="soft-tag">v0.2 資料層</span>
    </div>
    <div class="module-grid" id="moduleGrid">${moduleItems}</div>
  `);
}

function renderAlmanac(almanac = {}) {
  setHtml("#almanacCard", `
    <div class="section-heading">
      <p>今日農民曆</p>
      <h2 id="almanac-title">${escapeHtml(almanac.solarDate)}</h2>
    </div>
    <dl class="detail-list">
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
  `);
}

function renderDeityDay(deityDay = {}) {
  setHtml("#deityCard", `
    <div class="section-heading">
      <p>今日神明生日</p>
      <h2 id="deity-title">${escapeHtml(deityDay.title)}</h2>
    </div>
    <dl class="detail-list compact">
      <div>
        <dt>農曆</dt>
        <dd>${escapeHtml(deityDay.lunarDate)}</dd>
      </div>
      <div>
        <dt>祈福方向</dt>
        <dd>${escapeHtml(deityDay.blessing)}</dd>
      </div>
    </dl>
    <p class="mock-note">${escapeHtml(deityDay.mockNote)}</p>
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

  setHtml("#topbarActions", tools.slice(0, 1).map((label) => `
    <button type="button">今日總覽</button>
    <span class="version-badge">${escapeHtml(siteMeta.version || fallbackSiteMeta.version)}</span>
    <button type="button">${escapeHtml(label)}</button>
    <button type="button" class="profile-button">${escapeHtml(data.profile.name)}</button>
  `).join(""));
}

function renderDesktopNav(siteData) {
  const navItems = [
    { title: "首頁總覽", icon: "首", href: "#top" },
    { title: "個人資料", icon: "人", href: "#profile-title" },
    ...siteData.modules.map((item) => ({
      title: item.title === "資料庫 / 備份" ? "資料庫" : item.title,
      icon: item.icon,
      href: item.href
    }))
  ];

  const links = navItems.map((item) => `
    <a href="${escapeHtml(item.href)}">
      <span aria-hidden="true">${escapeHtml(item.icon)}</span>
      <span>${escapeHtml(item.title)}</span>
    </a>
  `).join("");

  setHtml("#desktopNav", links);
}
