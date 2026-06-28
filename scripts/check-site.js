const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const expectedVersion = "0.3.4";
const expectedVersionLabel = "v0.3.4";
const results = [];
let activeGroup = "general";

function addResult(level, title, detail) {
  results.push({
    group: activeGroup,
    level,
    title,
    detail
  });
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
    addResult("pass", `檔案存在：${relativePath}`, "檢查符合。");
    return true;
  }

  addResult("fail", `檔案缺少：${relativePath}`, "請確認必要檔案是否存在。");
  return false;
}

function checkFolderExists(relativePath) {
  const fullPath = sitePath(relativePath);

  if (fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory()) {
    addResult("pass", `資料夾存在：${relativePath}/`, "檢查符合。");
    return true;
  }

  addResult("fail", `資料夾缺少：${relativePath}/`, "請確認必要資料夾是否存在。");
  return false;
}

function checkIncludes(fileLabel, content, checks, failMessage) {
  if (content === null) {
    addResult("fail", `${fileLabel} 無法讀取`, `${fileLabel} 不存在或無法以 UTF-8 讀取。`);
    return;
  }

  for (const check of checks) {
    if (content.includes(check.value)) {
      addResult("pass", `${fileLabel} 包含：${check.label}`, "檢查符合。");
    } else {
      addResult("fail", `${fileLabel} 缺少：${check.label}`, failMessage);
    }
  }
}

function checkRegex(fileLabel, content, checks, failMessage) {
  if (content === null) {
    addResult("fail", `${fileLabel} 無法讀取`, `${fileLabel} 不存在或無法以 UTF-8 讀取。`);
    return;
  }

  for (const check of checks) {
    if (check.pattern.test(content)) {
      addResult("pass", `${fileLabel} 符合：${check.label}`, "檢查符合。");
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
  return new Set([
    ".html",
    ".css",
    ".js",
    ".json",
    ".md",
    ".txt",
    ".svg",
    ".xml",
    ".csv"
  ]).has(path.extname(filePath).toLowerCase());
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
  ], "index.html 需要同步 v0.3.4 靜態資源快取參數。");

  checkIncludes("data/site-data.js", siteData, [
    { label: expectedVersionLabel, value: expectedVersionLabel },
    { label: "cacheVersion v0.3.4", value: `cacheVersion: "${expectedVersionLabel}"` },
    { label: "versionPolicy", value: "versionPolicy" }
  ], "site-data.js 需要同步 v0.3.4 版本資料與版本策略。");

  checkIncludes("app.js", app, [
    { label: "fallback v0.3.4", value: expectedVersionLabel },
    { label: "fallback status", value: "小貓龍蝦檢查瘦身 × 版本策略收束" }
  ], "app.js fallbackSiteMeta 需要更新到 v0.3.4。");

  checkIncludes("scripts/check-site.js", checkSite, [
    { label: "expectedVersion 0.3.4", value: `expectedVersion = "${expectedVersion}"` },
    { label: "檢查標題版本標籤", value: "expectedVersionLabel" },
    { label: "檢查標題小貓龍蝦", value: "小貓龍蝦檢查" }
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
  ], "index.html 需要保留 GitHub Pages 靜態入口基本 meta。");

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
  ], "首頁三段式總控台結構不可被移除。");

  const moduleIndex = html ? html.indexOf("moduleCard") : -1;
  const treeIndex = html ? html.indexOf("treeCard") : -1;
  const almanacIndex = html ? html.indexOf("almanacCard") : -1;

  if (moduleIndex >= 0 && almanacIndex >= 0 && moduleIndex < almanacIndex) {
    addResult("pass", "首頁順序：moduleCard 在 almanacCard 前", "命盤核心仍優先於輔助提醒。");
  } else {
    addResult("fail", "首頁順序：moduleCard 在 almanacCard 前", "請維持命盤核心優先。");
  }

  if (treeIndex >= 0 && almanacIndex >= 0 && treeIndex < almanacIndex) {
    addResult("pass", "首頁順序：treeCard 在 almanacCard 前", "命樹仍早於農民曆輔助提醒。");
  } else {
    addResult("fail", "首頁順序：treeCard 在 almanacCard 前", "請維持命樹早於農民曆輔助提醒。");
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
    { label: "#/module/name", value: "#/module/name" }
  ], "site-data.js 需要保留命盤核心路由。");

  checkIncludes("app.js", app, [
    { label: "KekeRouter", value: "KekeRouter" },
    { label: "hashchange", value: "hashchange" },
    { label: "renderDashboardView", value: "renderDashboardView" },
    { label: "renderDetailView", value: "renderDetailView" }
  ], "app.js 需要保留首頁 / 詳情頁 route 切換。");
}

function checkDetailData() {
  const detailData = readText("data/detail-pages-data.js");
  const app = readText("app.js");
  const routeIds = [
    "ziwei",
    "bazi",
    "astrology",
    "numerology",
    "name",
    "luck",
    "yijing",
    "soul-tree",
    "database"
  ];

  checkIncludes("data/detail-pages-data.js", detailData, [
    { label: "KekeDetailPages", value: "KekeDetailPages" },
    { label: "dashboardPreview", value: "dashboardPreview" },
    { label: "dashboardResult", value: "dashboardResult" },
    { label: "mock", value: "mock" },
    { label: "planning", value: "planning" },
    ...routeIds.map((id) => ({ label: id, value: id }))
  ], "detail-pages-data.js 需要保留 9 個詳情頁 mock / planning 資料。");

  checkIncludes("app.js", app, [
    { label: "KekeDetailPages", value: "KekeDetailPages" },
    { label: "renderDetailPage", value: "renderDetailPage" },
    { label: "renderNotFoundDetail", value: "renderNotFoundDetail" },
    { label: "尚未接入正式命理演算法", value: "尚未接入正式命理演算法" },
    { label: "找不到這個命盤詳情頁", value: "找不到這個命盤詳情頁" }
  ], "app.js 需要保留詳情頁骨架與 route fallback。");

  if (detailData !== null && sitePathRoutesHaveDetailData(routeIds, detailData)) {
    addResult("pass", "module route 與 detail data 對應", "主要命盤 route 都有對應詳情頁資料。");
  }
}

function sitePathRoutesHaveDetailData(routeIds, detailData) {
  let allMatched = true;

  for (const id of routeIds) {
    const hasDetail = detailData.includes(`id: "${id}"`) || detailData.includes(`"${id}":`);

    if (hasDetail) {
      addResult("pass", `detail data 存在：${id}`, "檢查符合。");
    } else {
      addResult("fail", `detail data 缺少：${id}`, "請補上對應命盤詳情頁資料。");
      allMatched = false;
    }
  }

  return allMatched;
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
  ], "lunar 農民曆實驗引擎不可刪除。");

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
  ], "index.html 需要保留 lunar 與神明生日資料載入。");

  checkIncludes("data/site-data.js", siteData, [
    { label: "almanacEngine", value: "almanacEngine" },
    { label: "deityMatcher", value: "deityMatcher" },
    { label: "dateTestMode", value: "dateTestMode" },
    { label: "testSeeds", value: "testSeeds" }
  ], "site-data.js 需要保留農民曆與神明生日實驗設定。");
}

function checkRisk() {
  checkStaticCompatibility();
  checkNestedRepo();
  checkKeywordRisk();
}

function checkStaticCompatibility() {
  [
    "package.json",
    "node_modules",
    "build",
    "dist",
    "server.js",
    ".github/workflows"
  ].forEach((forbiddenPath) => {
    if (pathExists(forbiddenPath)) {
      addResult("fail", `靜態網站不應存在：${forbiddenPath}`, "目前版本應保持 GitHub Pages 純靜態相容。");
    } else {
      addResult("pass", `未發現不允許項目：${forbiddenPath}`, "檢查符合。");
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
    addResult("pass", "巢狀專案資料夾檢查", "未發現 keke-soul-map/keke-soul-map。");
  }

  if (nestedGitFolders.length > 0) {
    for (const folderPath of nestedGitFolders) {
      addResult("fail", "子資料夾內出現 .git", `存在 ${toSitePath(folderPath)}/.git。`);
    }
  } else {
    addResult("pass", "子資料夾 .git 檢查", "未發現額外 .git。");
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
    addResult("pass", "高風險關鍵字檢查", "未發現禁止或觀察關鍵字。");
    return;
  }

  for (const hit of hits) {
    const title = hit.level === "warn"
      ? "觀察關鍵字命中"
      : "高風險關鍵字命中";
    const detail = hit.level === "warn"
      ? `${hit.detail}。本專案目前可能用於靜態模板或尚未正式開放功能，列為觀察。`
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
    { label: "工程整理版", value: "工程整理版" },
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
  ], "README.md 需要補充 v0.3.4 工程整理、檢查分組與版本策略。");

  checkIncludes("CHANGELOG.md", changelog, [
    { label: expectedVersionLabel, value: expectedVersionLabel },
    { label: "小貓龍蝦檢查瘦身", value: "小貓龍蝦檢查瘦身" },
    { label: "版本策略收束", value: "版本策略收束" }
  ], "CHANGELOG.md 需要記錄 v0.3.4。");

  checkIncludes("PROJECT_MAP.md", projectMap, [
    { label: expectedVersionLabel, value: expectedVersionLabel },
    { label: "scripts/check-site.js", value: "scripts/check-site.js" },
    { label: "多個 group", value: "多個 group" },
    { label: "versionPolicy", value: "versionPolicy" },
    { label: "純 HTML / CSS / JS", value: "純 HTML / CSS / JS" }
  ], "PROJECT_MAP.md 需要補充 v0.3.4 檢查腳本與版本策略。");
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
      addResult("pass", `UTF-8 可讀取：${file}`, "可用 UTF-8 讀取。");
    } else {
      addResult("fail", `UTF-8 讀取失敗：${file}`, "檔案不存在或無法以 UTF-8 讀取。");
    }
  });
}

function printResults() {
  const counts = results.reduce((summary, item) => {
    summary[item.level] += 1;
    return summary;
  }, { pass: 0, warn: 0, fail: 0, high: 0 });
  const labels = {
    pass: "PASS",
    warn: "WARN",
    fail: "FAIL",
    high: "HIGH"
  };
  const groups = [...new Set(results.map((item) => item.group))];

  console.log(`科科命理宇宙站 ${expectedVersionLabel} 小貓龍蝦檢查`);
  console.log("=".repeat(48));
  console.log(`通過數：${counts.pass}`);
  console.log(`警告數：${counts.warn}`);
  console.log(`失敗數：${counts.fail}`);
  console.log(`高風險數：${counts.high}`);
  console.log("");
  console.log("檢查摘要：");

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
runGroup("risk-checks", checkRisk);
runGroup("docs-checks", checkDocs);
runGroup("utf8-checks", checkUtf8Readable);
printResults();
