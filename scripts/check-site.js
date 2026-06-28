const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const expectedVersion = "0.3.6";
const expectedVersionLabel = "v0.3.6";
const results = [];
let activeGroup = "general";

function addResult(level, title, detail) {
  results.push({ group: activeGroup, level, title, detail });
}

function runGroup(name, checkFn) {
  activeGroup = name;
  checkFn();
}

function sitePath(relativePath) {
  return path.join(rootDir, relativePath);
}

function toSitePath(filePath) {
  return path.relative(rootDir, filePath).replace(/\\/g, "/");
}

function readText(relativePath) {
  try {
    return fs.readFileSync(sitePath(relativePath), "utf8");
  } catch (error) {
    return null;
  }
}

function pathExists(relativePath) {
  return fs.existsSync(sitePath(relativePath));
}

function checkFileExists(relativePath) {
  const fullPath = sitePath(relativePath);

  if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
    addResult("pass", `必要檔案存在：${relativePath}`, "檢查通過。");
    return true;
  }

  addResult("fail", `必要檔案缺少：${relativePath}`, "請確認檔案仍在專案根目錄內。");
  return false;
}

function checkFolderExists(relativePath) {
  const fullPath = sitePath(relativePath);

  if (fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory()) {
    addResult("pass", `必要資料夾存在：${relativePath}/`, "檢查通過。");
    return true;
  }

  addResult("fail", `必要資料夾缺少：${relativePath}/`, "請確認資料夾仍保留。");
  return false;
}

function checkIncludes(fileLabel, content, checks, failMessage) {
  if (content === null) {
    addResult("fail", `${fileLabel} 無法讀取`, `${fileLabel} 無法用 UTF-8 讀取。`);
    return;
  }

  for (const check of checks) {
    if (content.includes(check.value)) {
      addResult("pass", `${fileLabel} 包含：${check.label}`, "檢查通過。");
    } else {
      addResult("fail", `${fileLabel} 缺少：${check.label}`, failMessage);
    }
  }
}

function checkRegex(fileLabel, content, checks, failMessage) {
  if (content === null) {
    addResult("fail", `${fileLabel} 無法讀取`, `${fileLabel} 無法用 UTF-8 讀取。`);
    return;
  }

  for (const check of checks) {
    if (check.pattern.test(content)) {
      addResult("pass", `${fileLabel} 符合：${check.label}`, "檢查通過。");
    } else {
      addResult("fail", `${fileLabel} 不符合：${check.label}`, failMessage);
    }
  }
}

function walkFiles(startDir) {
  const files = [];
  const fullStart = sitePath(startDir);

  if (!fs.existsSync(fullStart)) {
    return files;
  }

  for (const entry of fs.readdirSync(fullStart, { withFileTypes: true })) {
    const fullPath = path.join(fullStart, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === ".git") {
        continue;
      }

      files.push(...walkFiles(toSitePath(fullPath)));
      continue;
    }

    files.push(fullPath);
  }

  return files;
}

function walkDirs(startDir) {
  const dirs = [];
  const fullStart = sitePath(startDir);

  if (!fs.existsSync(fullStart)) {
    return dirs;
  }

  for (const entry of fs.readdirSync(fullStart, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name === ".git") {
      continue;
    }

    const fullPath = path.join(fullStart, entry.name);
    dirs.push(fullPath);
    dirs.push(...walkDirs(toSitePath(fullPath)));
  }

  return dirs;
}

function isTextFile(filePath) {
  return new Set([".html", ".css", ".js", ".json", ".md", ".txt", ".svg", ".xml", ".csv"])
    .has(path.extname(filePath).toLowerCase());
}

function checkVersionSync() {
  const html = readText("index.html");
  const siteData = readText("data/site-data.js");
  const app = readText("app.js");
  const checkSite = readText("scripts/check-site.js");

  checkIncludes("index.html", html, [
    { label: `v=${expectedVersion}`, value: `v=${expectedVersion}` },
    { label: `style.css?v=${expectedVersion}`, value: `style.css?v=${expectedVersion}` },
    { label: `vendor/lunar/lunar.js?v=${expectedVersion}`, value: `vendor/lunar/lunar.js?v=${expectedVersion}` },
    { label: `features/almanac-engine.js?v=${expectedVersion}`, value: `features/almanac-engine.js?v=${expectedVersion}` },
    { label: `data/deity-birthdays.js?v=${expectedVersion}`, value: `data/deity-birthdays.js?v=${expectedVersion}` },
    { label: `features/date-test-mode.js?v=${expectedVersion}`, value: `features/date-test-mode.js?v=${expectedVersion}` },
    { label: `features/deity-matcher.js?v=${expectedVersion}`, value: `features/deity-matcher.js?v=${expectedVersion}` },
    { label: `data/detail-pages-data.js?v=${expectedVersion}`, value: `data/detail-pages-data.js?v=${expectedVersion}` },
    { label: `features/router.js?v=${expectedVersion}`, value: `features/router.js?v=${expectedVersion}` },
    { label: `data/site-data.js?v=${expectedVersion}`, value: `data/site-data.js?v=${expectedVersion}` },
    { label: `app.js?v=${expectedVersion}`, value: `app.js?v=${expectedVersion}` }
  ], "index.html 需要同步 v0.3.6 靜態資源快取參數。");

  checkIncludes("data/site-data.js", siteData, [
    { label: expectedVersionLabel, value: expectedVersionLabel },
    { label: "siteMeta.status", value: "八字四柱詳情頁 mock 深化" },
    { label: "versionPolicy", value: "versionPolicy" },
    { label: "productVersion", value: `productVersion: "${expectedVersionLabel}"` },
    { label: "cacheVersion", value: `cacheVersion: "${expectedVersionLabel}"` }
  ], "site-data.js 需要同步 v0.3.6 版本資料與版本策略。");

  checkIncludes("app.js", app, [
    { label: "fallback v0.3.6", value: expectedVersionLabel },
    { label: "fallback status", value: "八字四柱詳情頁 mock 深化" }
  ], "app.js fallbackSiteMeta 需要更新到 v0.3.6。");

  checkIncludes("scripts/check-site.js", checkSite, [
    { label: "expectedVersion 0.3.6", value: `expectedVersion = "${expectedVersion}"` },
    { label: "expectedVersionLabel", value: "expectedVersionLabel" },
    { label: "檢查標題", value: "小貓龍蝦檢查" }
  ], "check-site.js 自身標題與 expectedVersion 需要同步。");
}

function checkRequiredFilesAndFolders() {
  [
    "index.html",
    "style.css",
    "app.js",
    "data/site-data.js",
    "data/detail-pages-data.js",
    "data/deity-birthdays.js",
    "features/router.js",
    "features/almanac-engine.js",
    "features/date-test-mode.js",
    "features/deity-matcher.js",
    "vendor/lunar/lunar.js",
    "vendor/lunar/LICENSE",
    "vendor/lunar/README.md",
    "README.md",
    "CHANGELOG.md",
    "PROJECT_MAP.md"
  ].forEach(checkFileExists);

  [
    "data",
    "assets",
    "assets/images",
    "assets/icons",
    "features",
    "vendor",
    "vendor/lunar"
  ].forEach(checkFolderExists);
}

function checkDashboardStructure() {
  const html = readText("index.html");

  checkRegex("index.html", html, [
    { label: 'lang="zh-Hant"', pattern: /lang=["']zh-Hant["']/i },
    { label: 'charset="UTF-8"', pattern: /charset=["']UTF-8["']/i },
    { label: "viewport", pattern: /name=["']viewport["']/i }
  ], "index.html 需要保留 GitHub Pages 靜態站基本 meta。");

  checkIncludes("index.html", html, [
    { label: "科科命理宇宙站", value: "科科命理宇宙站" },
    { label: "Soul Map", value: "Soul Map" },
    { label: "dashboardView", value: "dashboardView" },
    { label: "detailView", value: "detailView" },
    { label: "dashboard-layout", value: "dashboard-layout" },
    { label: "dashboard-hero-zone", value: "dashboard-hero-zone" },
    { label: "dashboard-rhythm-zone", value: "dashboard-rhythm-zone" },
    { label: "dashboard-support-zone", value: "dashboard-support-zone" },
    { label: "profileCard", value: "profileCard" },
    { label: "moduleCard", value: "moduleCard" },
    { label: "todayCard", value: "todayCard" },
    { label: "numerologyCard", value: "numerologyCard" },
    { label: "treeCard", value: "treeCard" },
    { label: "almanacCard", value: "almanacCard" },
    { label: "deityCard", value: "deityCard" },
    { label: "toolsCard", value: "toolsCard" }
  ], "首頁總控台主要容器不可移除。");

  const moduleIndex = html ? html.indexOf("moduleCard") : -1;
  const treeIndex = html ? html.indexOf("treeCard") : -1;
  const almanacIndex = html ? html.indexOf("almanacCard") : -1;

  if (moduleIndex >= 0 && almanacIndex >= 0 && moduleIndex < almanacIndex) {
    addResult("pass", "首頁順序：moduleCard 在 almanacCard 前", "命盤核心仍早於輔助提醒。");
  } else {
    addResult("fail", "首頁順序：moduleCard 在 almanacCard 前", "請確認命盤核心仍是主軸。");
  }

  if (treeIndex >= 0 && almanacIndex >= 0 && treeIndex < almanacIndex) {
    addResult("pass", "首頁順序：treeCard 在 almanacCard 前", "命樹仍早於輔助提醒。");
  } else {
    addResult("fail", "首頁順序：treeCard 在 almanacCard 前", "請確認命樹仍在農民曆前。");
  }
}

function checkRouter() {
  const router = readText("features/router.js");
  const siteData = readText("data/site-data.js");
  const app = readText("app.js");

  checkIncludes("features/router.js", router, [
    { label: "KekeRouter", value: "KekeRouter" },
    { label: "getCurrentRoute", value: "getCurrentRoute" },
    { label: "normalizeRoute", value: "normalizeRoute" },
    { label: "buildModuleRoute", value: "buildModuleRoute" },
    { label: "getHomeRoute", value: "getHomeRoute" },
    { label: "isDashboardRoute", value: "isDashboardRoute" },
    { label: "#/dashboard", value: "#/dashboard" },
    { label: "#/module/", value: "#/module/" }
  ], "router.js 需要保留 hash router 輔助函式。");

  checkIncludes("data/site-data.js", siteData, [
    { label: "#/module/ziwei", value: "#/module/ziwei" },
    { label: "#/module/bazi", value: "#/module/bazi" },
    { label: "#/module/astrology", value: "#/module/astrology" },
    { label: "#/module/numerology", value: "#/module/numerology" },
    { label: "#/module/name", value: "#/module/name" },
    { label: "#/module/luck", value: "#/module/luck" },
    { label: "#/module/yijing", value: "#/module/yijing" },
    { label: "#/module/soul-tree", value: "#/module/soul-tree" },
    { label: "#/module/database", value: "#/module/database" }
  ], "site-data.js 需要保留命盤核心 route。");

  checkIncludes("app.js", app, [
    { label: "KekeRouter", value: "KekeRouter" },
    { label: "hashchange", value: "hashchange" },
    { label: "renderDashboardView", value: "renderDashboardView" },
    { label: "renderDetailView", value: "renderDetailView" },
    { label: "renderDetailPage", value: "renderDetailPage" },
    { label: "renderNotFoundDetail", value: "renderNotFoundDetail" }
  ], "app.js 需要保留 dashboard/detail route 切換。");
}

function checkDetailData() {
  const detailData = readText("data/detail-pages-data.js");
  const app = readText("app.js");
  const style = readText("style.css");
  const routeIds = ["ziwei", "bazi", "astrology", "numerology", "name", "luck", "yijing", "soul-tree", "database"];

  checkIncludes("data/detail-pages-data.js", detailData, [
    { label: "KekeDetailPages", value: "KekeDetailPages" },
    { label: "dashboardPreview", value: "dashboardPreview" },
    { label: "dashboardResult", value: "dashboardResult" },
    { label: "ziweiProfile", value: "ziweiProfile" },
    { label: "palaceOverview", value: "palaceOverview" },
    { label: "baziProfile", value: "baziProfile" },
    { label: "pillarOverview", value: "pillarOverview" },
    { label: "fiveElementOverview", value: "fiveElementOverview" },
    { label: "tenGodOverview", value: "tenGodOverview" },
    { label: "interpretationBlocks", value: "interpretationBlocks" },
    { label: "dataNotes", value: "dataNotes" },
    { label: "年柱", value: "年柱" },
    { label: "月柱", value: "月柱" },
    { label: "日柱", value: "日柱" },
    { label: "時柱", value: "時柱" },
    { label: "木", value: "木" },
    { label: "火", value: "火" },
    { label: "土", value: "土" },
    { label: "金", value: "金" },
    { label: "水", value: "水" },
    { label: "比肩", value: "比肩" },
    { label: "劫財", value: "劫財" },
    { label: "食神", value: "食神" },
    { label: "傷官", value: "傷官" },
    { label: "正財", value: "正財" },
    { label: "偏財", value: "偏財" },
    { label: "正官", value: "正官" },
    { label: "七殺", value: "七殺" },
    { label: "正印", value: "正印" },
    { label: "偏印", value: "偏印" },
    { label: "mock", value: "mock" },
    { label: "planning", value: "planning" },
    ...routeIds.map((id) => ({ label: id, value: id }))
  ], "detail-pages-data.js 需要保留 9 個詳情頁與八字 mock 深化資料。");

  checkIncludes("app.js", app, [
    { label: "KekeDetailPages", value: "KekeDetailPages" },
    { label: "renderSpecialDetailContent", value: "renderSpecialDetailContent" },
    { label: "renderZiweiDetail", value: "renderZiweiDetail" },
    { label: "renderBaziDetail", value: "renderBaziDetail" },
    { label: "renderBaziProfile", value: "renderBaziProfile" },
    { label: "renderBaziPillarOverview", value: "renderBaziPillarOverview" },
    { label: "renderBaziFiveElements", value: "renderBaziFiveElements" },
    { label: "renderBaziTenGodOverview", value: "renderBaziTenGodOverview" },
    { label: "renderBaziInterpretation", value: "renderBaziInterpretation" },
    { label: "renderBaziDataNotes", value: "renderBaziDataNotes" },
    { label: "尚未接入正式命理演算法", value: "尚未接入正式命理演算法" },
    { label: "尚未接入正式八字四柱排盤演算法", value: "尚未接入正式八字四柱排盤演算法" }
  ], "app.js 需要保留特殊詳情頁 renderer 與 mock 提示。");

  checkIncludes("style.css", style, [
    { label: "ziwei-detail", value: "ziwei-detail" },
    { label: "ziwei-profile-card", value: "ziwei-profile-card" },
    { label: "ziwei-palace-grid", value: "ziwei-palace-grid" },
    { label: "ziwei-data-notes", value: "ziwei-data-notes" },
    { label: "bazi-detail", value: "bazi-detail" },
    { label: "bazi-profile-card", value: "bazi-profile-card" },
    { label: "bazi-pillar-grid", value: "bazi-pillar-grid" },
    { label: "bazi-pillar-card", value: "bazi-pillar-card" },
    { label: "bazi-five-elements", value: "bazi-five-elements" },
    { label: "bazi-element-card", value: "bazi-element-card" },
    { label: "bazi-ten-god-grid", value: "bazi-ten-god-grid" },
    { label: "bazi-data-notes", value: "bazi-data-notes" }
  ], "style.css 需要保留紫微與八字詳情頁樣式。");

  if (detailData !== null) {
    for (const id of routeIds) {
      const hasDetail = detailData.includes(`id: "${id}"`) || detailData.includes(`${id}: {`);
      addResult(hasDetail ? "pass" : "fail", `detail data 對應：${id}`, hasDetail ? "檢查通過。" : "route id 需要有對應 detail data。");
    }
  }
}

function checkAlmanacAndDeity() {
  const engine = readText("features/almanac-engine.js");
  const matcher = readText("features/deity-matcher.js");
  const testMode = readText("features/date-test-mode.js");
  const deityData = readText("data/deity-birthdays.js");
  const html = readText("index.html");
  const siteData = readText("data/site-data.js");

  checkIncludes("features/almanac-engine.js", engine, [
    { label: "KekeAlmanacEngine", value: "KekeAlmanacEngine" },
    { label: "getTodayAlmanac", value: "getTodayAlmanac" },
    { label: "Solar", value: "Solar" }
  ], "lunar 農民曆引擎不可刪除。");

  checkIncludes("features/deity-matcher.js", matcher, [
    { label: "KekeDeityMatcher", value: "KekeDeityMatcher" },
    { label: "KekeDateTestMode", value: "KekeDateTestMode" },
    { label: "KekeDeityBirthdays", value: "KekeDeityBirthdays" },
    { label: "testMode", value: "testMode" }
  ], "神明生日 matcher 與日期測試模式不可刪除。");

  checkIncludes("features/date-test-mode.js", testMode, [
    { label: "KekeDateTestMode", value: "KekeDateTestMode" },
    { label: "testLunarMonth", value: "testLunarMonth" },
    { label: "testLunarDay", value: "testLunarDay" },
    { label: "index.html#deity-title", value: "index.html#deity-title" }
  ], "日期測試模式與回今日模式連結不可刪除。");

  checkIncludes("data/deity-birthdays.js", deityData, [
    { label: "KekeDeityBirthdays", value: "KekeDeityBirthdays" },
    { label: "lunarMonth", value: "lunarMonth" },
    { label: "lunarDay", value: "lunarDay" },
    { label: "seed", value: "seed" }
  ], "神明生日 seed 資料表不可刪除。");

  checkIncludes("index.html", html, [
    { label: "deity-birthdays.js", value: "deity-birthdays.js" },
    { label: "vendor/lunar/lunar.js", value: "vendor/lunar/lunar.js" }
  ], "index.html 需要載入 lunar 與神明生日資料。");

  checkIncludes("data/site-data.js", siteData, [
    { label: "almanacEngine", value: "almanacEngine" },
    { label: "deityMatcher", value: "deityMatcher" },
    { label: "dateTestMode", value: "dateTestMode" },
    { label: "testSeeds", value: "testSeeds" }
  ], "site-data.js 需要保留輔助提醒設定。");
}

function checkStaticCompatibility() {
  ["package.json", "node_modules", "build", "dist", "server.js", ".github/workflows"].forEach((forbiddenPath) => {
    if (pathExists(forbiddenPath)) {
      addResult("fail", `靜態網站不應存在：${forbiddenPath}`, "本版仍需維持 GitHub Pages 純靜態。");
    } else {
      addResult("pass", `未發現禁止項目：${forbiddenPath}`, "檢查通過。");
    }
  });
}

function checkNestedRepo() {
  const nestedRoot = sitePath("keke-soul-map");
  const nestedGitFolders = walkDirs(".")
    .filter((folderPath) => path.basename(folderPath) === ".git")
    .map((folderPath) => path.dirname(folderPath));

  if (fs.existsSync(nestedRoot)) {
    addResult("fail", "發現巢狀專案資料夾", "存在 keke-soul-map/keke-soul-map。");
  } else {
    addResult("pass", "未發現巢狀專案資料夾", "檢查通過。");
  }

  if (nestedGitFolders.length > 0) {
    for (const folderPath of nestedGitFolders) {
      addResult("fail", "子資料夾內發現 .git", `位置：${toSitePath(folderPath)}/.git`);
    }
  } else {
    addResult("pass", "未發現子資料夾 .git", "檢查通過。");
  }
}

function checkKeywordRisk() {
  const keywordRules = [
    { keyword: "升級會員", level: "high" },
    { keyword: "付款", level: "high" },
    { keyword: "訂閱", level: "high" },
    { keyword: "pricing", level: "high" },
    { keyword: "login", level: "high" },
    { keyword: "API key", level: "high" },
    { keyword: "apiKey", level: "high" },
    { keyword: "firebase", level: "high" },
    { keyword: "supabase", level: "high" },
    { keyword: "axios", level: "high" },
    { keyword: "fetch(", level: "high" },
    { keyword: "npm install", level: "high" },
    { keyword: "vite", level: "high" },
    { keyword: "import React", level: "high" },
    { keyword: "createApp", level: "high" },
    { keyword: "eval(", level: "high" },
    { keyword: "localStorage", level: "warn" },
    { keyword: "innerHTML", level: "warn" }
  ];
  const scanTargets = [
    sitePath("index.html"),
    sitePath("style.css"),
    sitePath("app.js"),
    ...walkFiles("features"),
    ...walkFiles("data"),
    ...walkFiles("assets")
  ];
  const uniqueTargets = [...new Set(scanTargets)]
    .filter((filePath) => fs.existsSync(filePath) && isTextFile(filePath));
  const hits = [];

  for (const filePath of uniqueTargets) {
    const content = fs.readFileSync(filePath, "utf8");
    const lowerContent = content.toLowerCase();

    for (const rule of keywordRules) {
      const found = /[A-Z]/.test(rule.keyword)
        ? lowerContent.includes(rule.keyword.toLowerCase())
        : content.includes(rule.keyword);

      if (found) {
        hits.push({ level: rule.level, detail: `${toSitePath(filePath)} -> ${rule.keyword}` });
      }
    }
  }

  if (hits.length === 0) {
    addResult("pass", "高風險關鍵字檢查通過", "未發現高風險關鍵字。");
    return;
  }

  for (const hit of hits) {
    const title = hit.level === "warn" ? "提示關鍵字命中" : "高風險關鍵字命中";
    const detail = hit.level === "warn"
      ? `${hit.detail}；目前為既有靜態渲染或設定保留，列為提醒。`
      : hit.detail;

    addResult(hit.level, title, detail);
  }
}

function checkDocs() {
  const readme = readText("README.md");
  const changelog = readText("CHANGELOG.md");
  const projectMap = readText("PROJECT_MAP.md");

  checkIncludes("README.md", readme, [
    { label: expectedVersionLabel, value: expectedVersionLabel },
    { label: "八字四柱詳情頁 mock 深化", value: "八字四柱詳情頁 mock 深化" },
    { label: "尚未接入正式八字排盤演算法", value: "尚未接入正式八字排盤演算法" },
    { label: "version-sync", value: "version-sync" },
    { label: "required-files", value: "required-files" },
    { label: "dashboard-structure", value: "dashboard-structure" },
    { label: "router-checks", value: "router-checks" },
    { label: "detail-data-checks", value: "detail-data-checks" },
    { label: "almanac-deity-checks", value: "almanac-deity-checks" },
    { label: "risk-checks", value: "risk-checks" },
    { label: "docs-checks", value: "docs-checks" },
    { label: "productVersion", value: "productVersion" },
    { label: "cacheVersion", value: "cacheVersion" },
    { label: "dataVersion", value: "dataVersion" }
  ], "README.md 需要補充 v0.3.6 八字詳情頁 mock 深化。");

  checkIncludes("CHANGELOG.md", changelog, [
    { label: expectedVersionLabel, value: expectedVersionLabel },
    { label: "八字四柱詳情頁 mock 深化", value: "八字四柱詳情頁 mock 深化" },
    { label: "五行分布", value: "五行分布" }
  ], "CHANGELOG.md 需要記錄 v0.3.6。");

  checkIncludes("PROJECT_MAP.md", projectMap, [
    { label: expectedVersionLabel, value: expectedVersionLabel },
    { label: "scripts/check-site.js", value: "scripts/check-site.js" },
    { label: "baziProfile", value: "baziProfile" },
    { label: "pillarOverview", value: "pillarOverview" },
    { label: "renderBaziDetail", value: "renderBaziDetail" },
    { label: "純 HTML / CSS / JS", value: "純 HTML / CSS / JS" }
  ], "PROJECT_MAP.md 需要補充 v0.3.6 八字詳情頁資料與 renderer。");
}

function checkUtf8Readable() {
  [
    "index.html",
    "style.css",
    "app.js",
    "data/site-data.js",
    "data/detail-pages-data.js",
    "data/deity-birthdays.js",
    "features/router.js",
    "features/almanac-engine.js",
    "features/date-test-mode.js",
    "features/deity-matcher.js",
    "scripts/check-site.js",
    "vendor/lunar/lunar.js",
    "vendor/lunar/README.md",
    "vendor/lunar/LICENSE",
    "README.md",
    "CHANGELOG.md",
    "PROJECT_MAP.md"
  ].forEach((file) => {
    if (readText(file) !== null) {
      addResult("pass", `UTF-8 可讀：${file}`, "檢查通過。");
    } else {
      addResult("fail", `UTF-8 讀取失敗：${file}`, "主要文字檔需可用 UTF-8 讀取。");
    }
  });
}

function printResults() {
  const counts = results.reduce((summary, item) => {
    summary[item.level] += 1;
    return summary;
  }, { pass: 0, warn: 0, fail: 0, high: 0 });
  const labels = { pass: "PASS", warn: "WARN", fail: "FAIL", high: "HIGH" };
  const groups = [...new Set(results.map((item) => item.group))];

  console.log(`科科命理宇宙站 ${expectedVersionLabel} 小貓龍蝦檢查`);
  console.log("=".repeat(48));
  console.log(`通過數：${counts.pass}`);
  console.log(`警告數：${counts.warn}`);
  console.log(`失敗數：${counts.fail}`);
  console.log(`高風險數：${counts.high}`);
  console.log("");
  console.log("每項檢查結果：");

  for (const group of groups) {
    const groupItems = results.filter((item) => item.group === group);
    const hasFail = groupItems.some((item) => item.level === "fail" || item.level === "high");
    const hasWarn = groupItems.some((item) => item.level === "warn");
    const status = hasFail ? "fail" : hasWarn ? "warning" : "pass";
    console.log(`- ${group}：${status}`);
  }

  for (const group of groups) {
    console.log("");
    console.log(`[${group}]`);

    for (const item of results.filter((result) => result.group === group)) {
      console.log(`[${labels[item.level]}] ${item.title}`);
      console.log(`  ${item.detail}`);
    }
  }

  if (counts.fail > 0 || counts.high > 0) {
    process.exitCode = 1;
  }
}

runGroup("version-sync", checkVersionSync);
runGroup("required-files", checkRequiredFilesAndFolders);
runGroup("dashboard-structure", checkDashboardStructure);
runGroup("router-checks", checkRouter);
runGroup("detail-data-checks", checkDetailData);
runGroup("almanac-deity-checks", checkAlmanacAndDeity);
runGroup("risk-checks", () => {
  checkStaticCompatibility();
  checkNestedRepo();
  checkKeywordRisk();
});
runGroup("docs-checks", checkDocs);
runGroup("utf8-checks", checkUtf8Readable);
printResults();
