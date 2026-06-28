const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const results = [];
const expectedVersion = "0.3.0";
const expectedVersionLabel = "v0.3.0";

function addResult(level, title, detail) {
  results.push({ level, title, detail });
}

function toSitePath(filePath) {
  return path.relative(rootDir, filePath).replace(/\\/g, "/");
}

function exists(relativePath) {
  return fs.existsSync(path.join(rootDir, relativePath));
}

function isDirectory(relativePath) {
  const fullPath = path.join(rootDir, relativePath);
  return fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory();
}

function readUtf8(relativePath) {
  return fs.readFileSync(path.join(rootDir, relativePath), "utf8");
}

function walkFiles(startDir) {
  const files = [];
  const fullStart = path.join(rootDir, startDir);

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
  const fullStart = path.join(rootDir, startDir);

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
  const ext = path.extname(filePath).toLowerCase();
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
  ]).has(ext);
}

function addContentChecks(fileLabel, checks, missingDetail) {
  for (const item of checks) {
    if (item.ok) {
      addResult("pass", `${fileLabel} 通過：${item.label}`, "檢查符合。");
    } else {
      addResult("fail", `${fileLabel} 缺少：${item.label}`, missingDetail);
    }
  }
}

function checkRequiredFiles() {
  const requiredFiles = [
    "index.html",
    "style.css",
    "app.js",
    "data/site-data.js",
    "data/detail-pages-data.js",
    "data/deity-birthdays.js",
    "vendor/lunar/lunar.js",
    "vendor/lunar/LICENSE",
    "vendor/lunar/README.md",
    "features/router.js",
    "features/almanac-engine.js",
    "features/date-test-mode.js",
    "features/deity-matcher.js"
  ];

  for (const file of requiredFiles) {
    if (exists(file)) {
      addResult("pass", `必要檔案存在：${file}`, "檔案已找到。");
    } else {
      addResult("fail", `必要檔案缺少：${file}`, "請確認 v0.3.0 必要檔案是否建立。");
    }
  }
}

function checkRequiredFolders() {
  const requiredFolders = [
    "data",
    "assets",
    "assets/images",
    "assets/icons",
    "vendor",
    "vendor/lunar",
    "features"
  ];

  for (const folder of requiredFolders) {
    if (isDirectory(folder)) {
      addResult("pass", `必要資料夾存在：${folder}/`, "資料夾已找到。");
    } else {
      addResult("fail", `必要資料夾缺少：${folder}/`, "請確認靜態網站資料夾結構。");
    }
  }
}

function checkIndexContent() {
  if (!exists("index.html")) {
    addResult("fail", "index.html 無法檢查", "index.html 不存在。");
    return;
  }

  const html = readUtf8("index.html");
  addContentChecks("index.html", [
    { label: 'lang="zh-Hant"', ok: html.includes('lang="zh-Hant"') },
    { label: 'charset="UTF-8"', ok: /charset=["']UTF-8["']/i.test(html) },
    { label: "viewport", ok: /name=[\"']viewport[\"']/i.test(html) },
    { label: "科科命理宇宙站", ok: html.includes("科科命理宇宙站") },
    { label: "Soul Map", ok: html.includes("Soul Map") },
    { label: "dashboardView", ok: html.includes("dashboardView") },
    { label: "detailView", ok: html.includes("detailView") },
    { label: `style.css?v=${expectedVersion}`, ok: html.includes(`style.css?v=${expectedVersion}`) },
    { label: `vendor/lunar/lunar.js?v=${expectedVersion}`, ok: html.includes(`vendor/lunar/lunar.js?v=${expectedVersion}`) },
    { label: `features/almanac-engine.js?v=${expectedVersion}`, ok: html.includes(`features/almanac-engine.js?v=${expectedVersion}`) },
    { label: `data/deity-birthdays.js?v=${expectedVersion}`, ok: html.includes(`data/deity-birthdays.js?v=${expectedVersion}`) },
    { label: `features/date-test-mode.js?v=${expectedVersion}`, ok: html.includes(`features/date-test-mode.js?v=${expectedVersion}`) },
    { label: `features/deity-matcher.js?v=${expectedVersion}`, ok: html.includes(`features/deity-matcher.js?v=${expectedVersion}`) },
    { label: `data/detail-pages-data.js?v=${expectedVersion}`, ok: html.includes(`data/detail-pages-data.js?v=${expectedVersion}`) },
    { label: `features/router.js?v=${expectedVersion}`, ok: html.includes(`features/router.js?v=${expectedVersion}`) },
    { label: `data/site-data.js?v=${expectedVersion}`, ok: html.includes(`data/site-data.js?v=${expectedVersion}`) },
    { label: `app.js?v=${expectedVersion}`, ok: html.includes(`app.js?v=${expectedVersion}`) },
    { label: `v=${expectedVersion}`, ok: html.includes(`v=${expectedVersion}`) },
    { label: "moduleCard", ok: html.includes("moduleCard") },
    { label: "almanacCard", ok: html.includes("almanacCard") },
    { label: "treeCard", ok: html.includes("treeCard") }
  ], "index.html 需要保留首頁容器、詳情頁容器與 v0.3.0 靜態資源引用。");
}

function checkSiteDataContent() {
  if (!exists("data/site-data.js")) {
    addResult("fail", "data/site-data.js 無法檢查", "data/site-data.js 不存在。");
    return;
  }

  const dataContent = readUtf8("data/site-data.js");
  addContentChecks("data/site-data.js", [
    { label: expectedVersionLabel, ok: dataContent.includes(expectedVersionLabel) },
    { label: "siteMeta 或 metadata", ok: dataContent.includes("siteMeta") || dataContent.includes("metadata") },
    { label: "version", ok: dataContent.includes("version") },
    { label: "cacheVersion", ok: dataContent.includes("cacheVersion") },
    { label: "routeMeta", ok: dataContent.includes("routeMeta") },
    { label: "#/module/ziwei", ok: dataContent.includes("#/module/ziwei") },
    { label: "#/module/bazi", ok: dataContent.includes("#/module/bazi") },
    { label: "#/module/astrology", ok: dataContent.includes("#/module/astrology") },
    { label: "#/module/numerology", ok: dataContent.includes("#/module/numerology") },
    { label: "#/module/name", ok: dataContent.includes("#/module/name") },
    { label: "#/module/luck", ok: dataContent.includes("#/module/luck") },
    { label: "#/module/yijing", ok: dataContent.includes("#/module/yijing") },
    { label: "#/module/soul-tree", ok: dataContent.includes("#/module/soul-tree") },
    { label: "#/module/database", ok: dataContent.includes("#/module/database") },
    { label: "#almanac-title", ok: dataContent.includes("#almanac-title") },
    { label: "#deity-title", ok: dataContent.includes("#deity-title") },
    { label: "layoutMeta", ok: dataContent.includes("layoutMeta") },
    { label: "命盤核心", ok: dataContent.includes("命盤核心") },
    { label: "每日輔助提醒", ok: dataContent.includes("每日輔助提醒") },
    { label: "dateTestMode", ok: dataContent.includes("dateTestMode") },
    { label: "testSeeds", ok: dataContent.includes("testSeeds") },
    { label: "testLunarMonth", ok: dataContent.includes("testLunarMonth") },
    { label: "testLunarDay", ok: dataContent.includes("testLunarDay") }
  ], "data/site-data.js 需要包含 v0.3.0 版本資訊、routeMeta 與模組路由。");
}

function checkDetailPagesDataContent() {
  if (!exists("data/detail-pages-data.js")) {
    addResult("fail", "data/detail-pages-data.js 無法檢查", "data/detail-pages-data.js 不存在。");
    return;
  }

  const content = readUtf8("data/detail-pages-data.js");
  addContentChecks("data/detail-pages-data.js", [
    { label: "KekeDetailPages", ok: content.includes("KekeDetailPages") },
    { label: "ziwei", ok: content.includes("ziwei") },
    { label: "bazi", ok: content.includes("bazi") },
    { label: "astrology", ok: content.includes("astrology") },
    { label: "numerology", ok: content.includes("numerology") },
    { label: "name", ok: content.includes("name") },
    { label: "luck", ok: content.includes("luck") },
    { label: "yijing", ok: content.includes("yijing") },
    { label: "soul-tree", ok: content.includes("soul-tree") },
    { label: "database", ok: content.includes("database") },
    { label: "mock", ok: content.includes("mock") },
    { label: "planning", ok: content.includes("planning") },
    { label: "sections", ok: content.includes("sections") }
  ], "detail-pages-data.js 需要包含所有 v0.3.0 命盤詳情頁 mock / planning 資料。");
}

function checkRouterContent() {
  if (!exists("features/router.js")) {
    addResult("fail", "features/router.js 無法檢查", "features/router.js 不存在。");
    return;
  }

  const content = readUtf8("features/router.js");
  addContentChecks("features/router.js", [
    { label: "KekeRouter", ok: content.includes("KekeRouter") },
    { label: "getCurrentRoute", ok: content.includes("getCurrentRoute") },
    { label: "isAppRoute", ok: content.includes("isAppRoute") },
    { label: "getRouteModuleId", ok: content.includes("getRouteModuleId") },
    { label: "navigateHome", ok: content.includes("navigateHome") },
    { label: "#/dashboard", ok: content.includes("#/dashboard") },
    { label: "#/module/", ok: content.includes("#/module/") }
  ], "router.js 需要提供 hash route 解析與回首頁 fallback。");
}

function checkAppRenderingContent() {
  if (!exists("app.js")) {
    addResult("fail", "app.js 無法檢查", "app.js 不存在。");
    return;
  }

  const appContent = readUtf8("app.js");
  addContentChecks("app.js", [
    { label: "renderDashboardView", ok: appContent.includes("renderDashboardView") },
    { label: "renderDetailView", ok: appContent.includes("renderDetailView") },
    { label: "renderDetailPage", ok: appContent.includes("renderDetailPage") },
    { label: "renderNotFoundDetail", ok: appContent.includes("renderNotFoundDetail") },
    { label: "hashchange", ok: appContent.includes("hashchange") },
    { label: "KekeDetailPages", ok: appContent.includes("KekeDetailPages") },
    { label: "KekeRouter", ok: appContent.includes("KekeRouter") },
    { label: "返回總控台", ok: appContent.includes("返回總控台") },
    { label: "尚未接入正式命理演算法", ok: appContent.includes("尚未接入正式命理演算法") },
    { label: "mock / planning 狀態", ok: appContent.includes("mock") && appContent.includes("planning") },
    { label: "testLunarMonth", ok: appContent.includes("testLunarMonth") },
    { label: "testLunarDay", ok: appContent.includes("testLunarDay") },
    { label: "今日模式", ok: appContent.includes("今日模式") },
    { label: "測試模式", ok: appContent.includes("測試模式") },
    { label: "testSeeds", ok: appContent.includes("testSeeds") },
    { label: "index.html#deity-title", ok: appContent.includes("index.html#deity-title") }
  ], "app.js 需要同時保留首頁渲染、詳情頁渲染與日期測試模式 UI。");
}

function checkRouteConsistency() {
  if (!exists("data/site-data.js") || !exists("data/detail-pages-data.js")) {
    addResult("fail", "route 對應資料無法檢查", "site-data 或 detail-pages-data 不存在。");
    return;
  }

  const siteContent = readUtf8("data/site-data.js");
  const detailContent = readUtf8("data/detail-pages-data.js");
  const routeMatches = [...siteContent.matchAll(/href:\s*"#!?\/module\/([^"]+)"/g)];
  const normalMatches = [...siteContent.matchAll(/href:\s*"#\/module\/([^"]+)"/g)];
  const moduleIds = normalMatches.map((match) => match[1]);

  if (routeMatches.length !== normalMatches.length) {
    addResult("fail", "module href 格式檢查", "命盤模組 href 應使用 #/module/...。");
  } else {
    addResult("pass", "module href 格式檢查", "命盤模組 href 使用 #/module/...。");
  }

  for (const moduleId of moduleIds) {
    const hasDetailData = detailContent.includes(`${moduleId}:`) || detailContent.includes(`"${moduleId}":`);

    if (hasDetailData) {
      addResult("pass", `route 有對應 detail data：${moduleId}`, "路由與詳情頁資料已對上。");
    } else {
      addResult("fail", `route 缺少 detail data：${moduleId}`, "請在 data/detail-pages-data.js 補上對應 id。");
    }
  }
}

function checkLayoutOrder() {
  const html = exists("index.html") ? readUtf8("index.html") : "";
  const moduleIndex = html.indexOf("moduleCard");
  const treeIndex = html.indexOf("treeCard");
  const almanacIndex = html.indexOf("almanacCard");

  addContentChecks("首頁主軸", [
    { label: "moduleCard 在 almanacCard 前", ok: moduleIndex >= 0 && almanacIndex >= 0 && moduleIndex < almanacIndex },
    { label: "treeCard 在 almanacCard 前", ok: treeIndex >= 0 && almanacIndex >= 0 && treeIndex < almanacIndex }
  ], "首頁仍應維持命盤核心優先，農民曆為輔助提醒。");
}

function checkDateTestModeContent() {
  if (!exists("features/date-test-mode.js")) {
    addResult("fail", "features/date-test-mode.js 無法檢查", "features/date-test-mode.js 不存在。");
    return;
  }

  const content = readUtf8("features/date-test-mode.js");
  addContentChecks("features/date-test-mode.js", [
    { label: "KekeDateTestMode", ok: content.includes("KekeDateTestMode") },
    { label: "getTestLunarDate", ok: content.includes("getTestLunarDate") },
    { label: "buildTestUrl", ok: content.includes("buildTestUrl") },
    { label: "clearTestUrl", ok: content.includes("clearTestUrl") },
    { label: "URLSearchParams", ok: content.includes("URLSearchParams") },
    { label: "testLunarMonth", ok: content.includes("testLunarMonth") },
    { label: "testLunarDay", ok: content.includes("testLunarDay") },
    { label: "index.html#deity-title", ok: content.includes("index.html#deity-title") }
  ], "日期測試模式需要保留 query 測試與回今日模式連結。");
}

function checkDeityBirthdaysContent() {
  if (!exists("data/deity-birthdays.js")) {
    addResult("fail", "data/deity-birthdays.js 無法檢查", "data/deity-birthdays.js 不存在。");
    return;
  }

  const deityContent = readUtf8("data/deity-birthdays.js");
  addContentChecks("data/deity-birthdays.js", [
    { label: "KekeDeityBirthdays", ok: deityContent.includes("KekeDeityBirthdays") },
    { label: "lunarMonth", ok: deityContent.includes("lunarMonth") },
    { label: "lunarDay", ok: deityContent.includes("lunarDay") },
    { label: "sourceLevel", ok: deityContent.includes("sourceLevel") },
    { label: "seed", ok: deityContent.includes("seed") }
  ], "神明生日 seed 資料表不可刪除。");
}

function checkAlmanacEngineContent() {
  if (!exists("features/almanac-engine.js")) {
    addResult("fail", "features/almanac-engine.js 無法檢查", "features/almanac-engine.js 不存在。");
    return;
  }

  const engineContent = readUtf8("features/almanac-engine.js");
  addContentChecks("features/almanac-engine.js", [
    { label: "KekeAlmanacEngine", ok: engineContent.includes("KekeAlmanacEngine") },
    { label: "getTodayAlmanac", ok: engineContent.includes("getTodayAlmanac") },
    { label: "Solar", ok: engineContent.includes("Solar") },
    { label: "status", ok: engineContent.includes("status") },
    { label: "errorMessage", ok: engineContent.includes("errorMessage") },
    { label: "lunarMonth", ok: engineContent.includes("lunarMonth") },
    { label: "lunarDay", ok: engineContent.includes("lunarDay") }
  ], "lunar 農民曆實驗引擎不可刪除。");
}

function checkDeityMatcherContent() {
  if (!exists("features/deity-matcher.js")) {
    addResult("fail", "features/deity-matcher.js 無法檢查", "features/deity-matcher.js 不存在。");
    return;
  }

  const matcherContent = readUtf8("features/deity-matcher.js");
  addContentChecks("features/deity-matcher.js", [
    { label: "KekeDeityMatcher", ok: matcherContent.includes("KekeDeityMatcher") },
    { label: "findByLunarDate", ok: matcherContent.includes("findByLunarDate") },
    { label: "getTodayMatches", ok: matcherContent.includes("getTodayMatches") },
    { label: "KekeAlmanacEngine", ok: matcherContent.includes("KekeAlmanacEngine") },
    { label: "KekeDateTestMode", ok: matcherContent.includes("KekeDateTestMode") },
    { label: "KekeDeityBirthdays", ok: matcherContent.includes("KekeDeityBirthdays") },
    { label: "status", ok: matcherContent.includes("status") },
    { label: "matches", ok: matcherContent.includes("matches") },
    { label: "testMode", ok: matcherContent.includes("testMode") },
    { label: "mode", ok: matcherContent.includes("mode") },
    { label: "today", ok: matcherContent.includes("today") },
    { label: "test", ok: matcherContent.includes("test") }
  ], "神明生日 matcher 與日期測試模式不可刪除。");
}

function checkFeatureRetentionContent() {
  const engineContent = exists("features/almanac-engine.js") ? readUtf8("features/almanac-engine.js") : "";
  const matcherContent = exists("features/deity-matcher.js") ? readUtf8("features/deity-matcher.js") : "";
  const testModeContent = exists("features/date-test-mode.js") ? readUtf8("features/date-test-mode.js") : "";
  const deityDataContent = exists("data/deity-birthdays.js") ? readUtf8("data/deity-birthdays.js") : "";

  addContentChecks("既有實驗功能保留", [
    { label: "KekeAlmanacEngine", ok: engineContent.includes("KekeAlmanacEngine") },
    { label: "KekeDeityMatcher", ok: matcherContent.includes("KekeDeityMatcher") },
    { label: "KekeDateTestMode", ok: testModeContent.includes("KekeDateTestMode") },
    { label: "KekeDeityBirthdays", ok: deityDataContent.includes("KekeDeityBirthdays") }
  ], "v0.3.0 不應刪除 lunar、deity matcher 或 date test mode。");
}

function checkStaticCompatibility() {
  const forbiddenPaths = [
    "package.json",
    "node_modules",
    "build",
    "dist",
    "server.js",
    ".github/workflows"
  ];

  for (const forbiddenPath of forbiddenPaths) {
    if (exists(forbiddenPath)) {
      addResult("fail", `靜態網站不應存在：${forbiddenPath}`, "目前版本應保持 GitHub Pages 純靜態相容。");
    } else {
      addResult("pass", `未發現不允許項目：${forbiddenPath}`, "檢查符合。");
    }
  }
}

function checkHighRiskKeywords() {
  const keywords = [
    "升級會員",
    "付款",
    "訂閱",
    "pricing",
    "login",
    "API key",
    "firebase",
    "supabase",
    "axios",
    "fetch(",
    "npm install",
    "vite",
    "react",
    "vue"
  ];
  const scanTargets = [
    path.join(rootDir, "index.html"),
    path.join(rootDir, "style.css"),
    path.join(rootDir, "app.js"),
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

    for (const keyword of keywords) {
      const found = /[A-Z]/.test(keyword)
        ? lowerContent.includes(keyword.toLowerCase())
        : content.includes(keyword);

      if (found) {
        hits.push(`${toSitePath(filePath)} -> ${keyword}`);
      }
    }
  }

  if (hits.length === 0) {
    addResult("pass", "偏航 / 高風險關鍵字檢查", "未發現禁止關鍵字。");
    return;
  }

  for (const hit of hits) {
    addResult("high", "偏航 / 高風險關鍵字命中", hit);
  }
}

function checkNestedRepo() {
  const nestedRoot = path.join(rootDir, "keke-soul-map");
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

function checkUtf8Readable() {
  const mainFiles = [
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
    "vendor/lunar/LICENSE"
  ];

  for (const file of mainFiles) {
    if (!exists(file)) {
      addResult("fail", `UTF-8 讀取檢查無法執行：${file}`, "檔案不存在。");
      continue;
    }

    try {
      readUtf8(file);
      addResult("pass", `UTF-8 可讀取：${file}`, "可用 UTF-8 讀取。");
    } catch (error) {
      addResult("fail", `UTF-8 讀取失敗：${file}`, error.message);
    }
  }
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

  console.log("科科命理宇宙站 v0.3.0 小貓龍蝦檢查");
  console.log("=".repeat(44));
  console.log(`通過數：${counts.pass}`);
  console.log(`警告數：${counts.warn}`);
  console.log(`失敗數：${counts.fail}`);
  console.log(`高風險數：${counts.high}`);
  console.log("");

  for (const item of results) {
    console.log(`[${labels[item.level]}] ${item.title}`);
    console.log(`  ${item.detail}`);
  }

  if (counts.fail > 0 || counts.high > 0) {
    process.exitCode = 1;
  }
}

checkRequiredFiles();
checkRequiredFolders();
checkIndexContent();
checkSiteDataContent();
checkDetailPagesDataContent();
checkRouterContent();
checkAppRenderingContent();
checkRouteConsistency();
checkLayoutOrder();
checkDateTestModeContent();
checkDeityBirthdaysContent();
checkAlmanacEngineContent();
checkDeityMatcherContent();
checkFeatureRetentionContent();
checkStaticCompatibility();
checkHighRiskKeywords();
checkNestedRepo();
checkUtf8Readable();
printResults();
