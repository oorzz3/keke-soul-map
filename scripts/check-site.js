const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const expectedVersion = "0.7.1";
const expectedVersionLabel = "v0.7.1";
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
  const ok = fs.existsSync(fullPath) && fs.statSync(fullPath).isFile();
  addResult(ok ? "pass" : "fail", `必要檔案：${relativePath}`, ok ? "檢查通過。" : "檔案不存在。");
}

function checkFolderExists(relativePath) {
  const fullPath = sitePath(relativePath);
  const ok = fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory();
  addResult(ok ? "pass" : "fail", `必要資料夾：${relativePath}/`, ok ? "檢查通過。" : "資料夾不存在。");
}

function checkIncludes(fileLabel, content, checks, failMessage) {
  if (content === null) {
    addResult("fail", `${fileLabel} 無法讀取`, `${fileLabel} 無法用 UTF-8 讀取。`);
    return;
  }

  for (const check of checks) {
    const ok = content.includes(check.value);
    addResult(ok ? "pass" : "fail", `${fileLabel} 包含：${check.label}`, ok ? "檢查通過。" : failMessage);
  }
}

function checkRegex(fileLabel, content, checks, failMessage) {
  if (content === null) {
    addResult("fail", `${fileLabel} 無法讀取`, `${fileLabel} 無法用 UTF-8 讀取。`);
    return;
  }

  for (const check of checks) {
    const ok = check.pattern.test(content);
    addResult(ok ? "pass" : "fail", `${fileLabel} 符合：${check.label}`, ok ? "檢查通過。" : failMessage);
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
      if (entry.name !== ".git") {
        files.push(...walkFiles(toSitePath(fullPath)));
      }
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
    { label: `features/numerology-calculator.js?v=${expectedVersion}`, value: `features/numerology-calculator.js?v=${expectedVersion}` },
    { label: `data/numerology-meanings.js?v=${expectedVersion}`, value: `data/numerology-meanings.js?v=${expectedVersion}` },
    { label: `app.js?v=${expectedVersion}`, value: `app.js?v=${expectedVersion}` }
  ], "index.html 需要同步 v0.7.1 靜態資源快取參數。");

  checkIncludes("data/site-data.js", siteData, [
    { label: expectedVersionLabel, value: expectedVersionLabel },
    { label: "siteMeta.status", value: "姓名學 metadata 前置 × 第二核心候選鎖定" },
    { label: "versionPolicy", value: "versionPolicy" },
    { label: "productVersion", value: `productVersion: "${expectedVersionLabel}"` },
    { label: "cacheVersion", value: `cacheVersion: "${expectedVersionLabel}"` },
    { label: "dashboardLayout", value: "dashboardLayout" },
    { label: "core-input-schema-lock", value: "core-input-schema-lock" },
    { label: "dashboard-hero-band", value: "dashboard-hero-band" },
    { label: "dashboard-core-grid", value: "dashboard-core-grid" },
    { label: "dashboard-rhythm-row", value: "dashboard-rhythm-row" },
    { label: "dashboard-support-strip", value: "dashboard-support-strip" }
  ], "site-data.js 需要同步 v0.7.1 版本資料、版本策略與 dashboardLayout。");

  checkIncludes("app.js", app, [
    { label: "fallback v0.7.1", value: expectedVersionLabel },
    { label: "fallback status", value: "姓名學 metadata 前置 × 第二核心候選鎖定" }
  ], "app.js fallbackSiteMeta 需要更新到 v0.7.1。");

  checkIncludes("scripts/check-site.js", checkSite, [
    { label: "expectedVersion 0.7.1", value: `expectedVersion = "${expectedVersion}"` },
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
    "data/numerology-meanings.js",
    "features/router.js",
    "features/almanac-engine.js",
    "features/date-test-mode.js",
    "features/deity-matcher.js",
    "features/numerology-calculator.js",
    "vendor/lunar/lunar.js",
    "vendor/lunar/LICENSE",
    "vendor/lunar/README.md",
    "CORE_DETAIL_SCHEMA.md",
    "SUPPORT_MODULE_SCHEMA.md",
    "CORE_MODULE_TEMPLATE.md",
    "CORE_ALGORITHM_BOUNDARY.md",
    "README.md",
    "CHANGELOG.md",
    "PROJECT_MAP.md"
  ].forEach(checkFileExists);

  ["data", "assets", "assets/images", "assets/icons", "features", "vendor", "vendor/lunar"].forEach(checkFolderExists);
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
    { label: "dashboard-main-grid", value: "dashboard-main-grid" },
    { label: "dashboard-blueprint-layout", value: "dashboard-blueprint-layout" },
    { label: "dashboard-hero-band", value: "dashboard-hero-band" },
    { label: "dashboard-core-grid", value: "dashboard-core-grid" },
    { label: "dashboard-rhythm-row", value: "dashboard-rhythm-row" },
    { label: "dashboard-support-strip", value: "dashboard-support-strip" },
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
  addResult(moduleIndex >= 0 && almanacIndex >= 0 && moduleIndex < almanacIndex ? "pass" : "fail", "首頁順序：moduleCard 在 almanacCard 前", "命盤核心需早於輔助提醒。");
  addResult(treeIndex >= 0 && almanacIndex >= 0 && treeIndex < almanacIndex ? "pass" : "fail", "首頁順序：treeCard 在 almanacCard 前", "命樹需早於輔助提醒。");
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
    { label: "ziweiProfile", value: "ziweiProfile" },
    { label: "baziProfile", value: "baziProfile" },
    { label: "astrologyProfile", value: "astrologyProfile" },
    { label: "axisOverview", value: "axisOverview" },
    { label: "planetOverview", value: "planetOverview" },
    { label: "houseOverview", value: "houseOverview" },
    { label: "aspectOverview", value: "aspectOverview" },
    { label: "numerologyProfile", value: "numerologyProfile" },
    { label: "coreNumberOverview", value: "coreNumberOverview" },
    { label: "birthBreakdownDraft", value: "birthBreakdownDraft" },
    { label: "rhythmOverview", value: "rhythmOverview" },
    { label: "numberMeaningOverview", value: "numberMeaningOverview" },
    { label: "actionNotes", value: "actionNotes" },
    { label: "nameProfile", value: "nameProfile" },
    { label: "nameStructureOverview", value: "nameStructureOverview" },
    { label: "characterOverview", value: "characterOverview" },
    { label: "fiveGridOverview", value: "fiveGridOverview" },
    { label: "soundMeaningOverview", value: "soundMeaningOverview" },
    { label: "usageScenarioOverview", value: "usageScenarioOverview" },
    { label: "interpretationBlocks", value: "interpretationBlocks" },
    { label: "dataNotes", value: "dataNotes" },
    { label: "太陽", value: "太陽" },
    { label: "月亮", value: "月亮" },
    { label: "上升", value: "上升" },
    { label: "水星", value: "水星" },
    { label: "金星", value: "金星" },
    { label: "火星", value: "火星" },
    { label: "木星", value: "木星" },
    { label: "土星", value: "土星" },
    { label: "第一宮", value: "第一宮" },
    { label: "第二宮", value: "第二宮" },
    { label: "第三宮", value: "第三宮" },
    { label: "第四宮", value: "第四宮" },
    { label: "第五宮", value: "第五宮" },
    { label: "第六宮", value: "第六宮" },
    { label: "第七宮", value: "第七宮" },
    { label: "第八宮", value: "第八宮" },
    { label: "第九宮", value: "第九宮" },
    { label: "第十宮", value: "第十宮" },
    { label: "第十一宮", value: "第十一宮" },
    { label: "第十二宮", value: "第十二宮" },
    { label: "合相", value: "合相" },
    { label: "對分相", value: "對分相" },
    { label: "四分相", value: "四分相" },
    { label: "三分相", value: "三分相" },
    { label: "六分相", value: "六分相" },
    { label: "生命靈數", value: "生命靈數" },
    { label: "生日數", value: "生日數" },
    { label: "命運數", value: "命運數" },
    { label: "個人年", value: "個人年" },
    { label: "個人月", value: "個人月" },
    { label: "個人日", value: "個人日" },
    { label: "1", value: 'number: "1"' },
    { label: "2", value: 'number: "2"' },
    { label: "3", value: 'number: "3"' },
    { label: "4", value: 'number: "4"' },
    { label: "5", value: 'number: "5"' },
    { label: "6", value: 'number: "6"' },
    { label: "7", value: 'number: "7"' },
    { label: "8", value: 'number: "8"' },
    { label: "9", value: 'number: "9"' },
    { label: "探索", value: "探索" },
    { label: "開始", value: "開始" },
    { label: "合作", value: "合作" },
    { label: "表達", value: "表達" },
    { label: "穩定", value: "穩定" },
    { label: "變化", value: "變化" },
    { label: "照顧", value: "照顧" },
    { label: "力量", value: "力量" },
    { label: "完成", value: "完成" },
    { label: "姓名學", value: "姓名學" },
    { label: "科科", value: "科科" },
    { label: "姓氏", value: "姓氏" },
    { label: "名字", value: "名字" },
    { label: "暱稱", value: "暱稱" },
    { label: "科", value: "科" },
    { label: "天格", value: "天格" },
    { label: "人格", value: "人格" },
    { label: "地格", value: "地格" },
    { label: "外格", value: "外格" },
    { label: "總格", value: "總格" },
    { label: "字音", value: "字音" },
    { label: "字義", value: "字義" },
    { label: "字形", value: "字形" },
    { label: "語感", value: "語感" },
    { label: "正式文件", value: "正式文件" },
    { label: "日常稱呼", value: "日常稱呼" },
    { label: "社群品牌", value: "社群品牌" },
    { label: "不提供改名建議", value: "不提供改名建議" },
    { label: "luckProfile", value: "luckProfile" },
    { label: "annualCycleOverview", value: "annualCycleOverview" },
    { label: "nineLuckOverview", value: "nineLuckOverview" },
    { label: "timelineOverview", value: "timelineOverview" },
    { label: "themeIntegration", value: "themeIntegration" },
    { label: "流年 / 九運", value: "流年 / 九運" },
    { label: "2026", value: "2026" },
    { label: "九運", value: "九運" },
    { label: "離火運", value: "離火運" },
    { label: "2024–2043", value: "2024–2043" },
    { label: "年度節奏", value: "年度節奏" },
    { label: "九運週期", value: "九運週期" },
    { label: "時間軸", value: "時間軸" },
    { label: "主題整合", value: "主題整合" },
    { label: "行動提醒", value: "行動提醒" },
    { label: "不提供吉凶分數", value: "不提供吉凶分數" },
    { label: "不得作為投資、健康、感情、工作或重大決策依據", value: "不得作為投資、健康、感情、工作或重大決策依據" },
    { label: "mock", value: "mock" },
    { label: "planning", value: "planning" },
    ...routeIds.map((id) => ({ label: id, value: id }))
  ], "detail-pages-data.js 需要保留 9 個詳情頁與五大核心 mock / planning 詳情資料。");

  checkIncludes("app.js", app, [
    { label: "renderSpecialDetailContent", value: "renderSpecialDetailContent" },
    { label: "renderZiweiDetail", value: "renderZiweiDetail" },
    { label: "renderBaziDetail", value: "renderBaziDetail" },
    { label: "renderAstrologyDetail", value: "renderAstrologyDetail" },
    { label: "renderAstrologyProfile", value: "renderAstrologyProfile" },
    { label: "renderAstrologyAxisOverview", value: "renderAstrologyAxisOverview" },
    { label: "renderAstrologyPlanetOverview", value: "renderAstrologyPlanetOverview" },
    { label: "renderAstrologyHouseOverview", value: "renderAstrologyHouseOverview" },
    { label: "renderAstrologyAspectOverview", value: "renderAstrologyAspectOverview" },
    { label: "renderAstrologyInterpretation", value: "renderAstrologyInterpretation" },
    { label: "renderAstrologyDataNotes", value: "renderAstrologyDataNotes" },
    { label: "renderNumerologyDetail", value: "renderNumerologyDetail" },
    { label: "renderNumerologyProfile", value: "renderNumerologyProfile" },
    { label: "renderNumerologyCoreNumbers", value: "renderNumerologyCoreNumbers" },
    { label: "renderNumerologyBirthBreakdown", value: "renderNumerologyBirthBreakdown" },
    { label: "renderNumerologyRhythmOverview", value: "renderNumerologyRhythmOverview" },
    { label: "renderNumerologyNumberMeanings", value: "renderNumerologyNumberMeanings" },
    { label: "renderNumerologyActionNotes", value: "renderNumerologyActionNotes" },
    { label: "renderNumerologyInterpretation", value: "renderNumerologyInterpretation" },
    { label: "renderNumerologyDataNotes", value: "renderNumerologyDataNotes" },
    { label: "renderNameDetail", value: "renderNameDetail" },
    { label: "renderNameProfile", value: "renderNameProfile" },
    { label: "renderNameStructureOverview", value: "renderNameStructureOverview" },
    { label: "renderNameCharacterOverview", value: "renderNameCharacterOverview" },
    { label: "renderNameFiveGridOverview", value: "renderNameFiveGridOverview" },
    { label: "renderNameSoundMeaningOverview", value: "renderNameSoundMeaningOverview" },
    { label: "renderNameUsageScenarioOverview", value: "renderNameUsageScenarioOverview" },
    { label: "renderNameInterpretation", value: "renderNameInterpretation" },
    { label: "renderNameDataNotes", value: "renderNameDataNotes" },
    { label: "renderLuckDetail", value: "renderLuckDetail" },
    { label: "renderLuckProfile", value: "renderLuckProfile" },
    { label: "renderLuckAnnualCycleOverview", value: "renderLuckAnnualCycleOverview" },
    { label: "renderLuckNineLuckOverview", value: "renderLuckNineLuckOverview" },
    { label: "renderLuckTimelineOverview", value: "renderLuckTimelineOverview" },
    { label: "renderLuckThemeIntegration", value: "renderLuckThemeIntegration" },
    { label: "renderLuckActionNotes", value: "renderLuckActionNotes" },
    { label: "renderLuckInterpretation", value: "renderLuckInterpretation" },
    { label: "renderLuckDataNotes", value: "renderLuckDataNotes" },
    { label: "紫微不是正式命盤", value: "不是正式命盤；尚未接入正式紫微斗數排盤演算法" },
    { label: "八字不是正式命盤", value: "不是正式命盤；尚未接入正式八字四柱排盤演算法" },
    { label: "星盤不是正式星盤", value: "不是正式星盤；尚未接入正式西洋星盤計算" },
    { label: "靈數產品頁提示", value: "生命靈數目前已完成正式數字計算與靜態解讀資料層" },
    { label: "姓名學不是正式結果", value: "不是正式姓名學結果；尚未接入正式姓名學計算" },
    { label: "尚未接入正式姓名學計算", value: "尚未接入正式姓名學計算" },
    { label: "不提供改名建議", value: "不提供改名建議" },
    { label: "生命靈數不作重大決策依據", value: "不作重大決策依據" },
    { label: "尚未接入正式西洋星盤計算", value: "尚未接入正式西洋星盤計算" },
    { label: "尚未接入正式流年 / 九運計算", value: "尚未接入正式流年 / 九運計算" },
    { label: "不提供吉凶分數", value: "不提供吉凶分數" }
  ], "app.js 需要保留五大核心專屬 detail renderer 與通用詳情頁 fallback。");

  if (app !== null) {
    [
      "renderNumerologyCycles",
      "renderNumerologyMeanings"
    ].forEach((oldName) => {
      const ok = !app.includes(oldName);
      addResult(ok ? "pass" : "fail", `舊 renderer 名稱不可殘留：${oldName}`, ok ? "未發現舊名稱。" : "生命靈數 renderer 命名已收束，app.js 不應再使用舊名稱。");
    });
  }

  checkIncludes("style.css", style, [
    { label: "ziwei-detail", value: "ziwei-detail" },
    { label: "ziwei-profile-card", value: "ziwei-profile-card" },
    { label: "ziwei-palace-grid", value: "ziwei-palace-grid" },
    { label: "ziwei-data-notes", value: "ziwei-data-notes" },
    { label: "bazi-detail", value: "bazi-detail" },
    { label: "bazi-profile-card", value: "bazi-profile-card" },
    { label: "bazi-pillar-grid", value: "bazi-pillar-grid" },
    { label: "bazi-five-elements", value: "bazi-five-elements" },
    { label: "bazi-data-notes", value: "bazi-data-notes" },
    { label: "astrology-detail", value: "astrology-detail" },
    { label: "astrology-profile-card", value: "astrology-profile-card" },
    { label: "astrology-axis-grid", value: "astrology-axis-grid" },
    { label: "astrology-axis-card", value: "astrology-axis-card" },
    { label: "astrology-planet-grid", value: "astrology-planet-grid" },
    { label: "astrology-planet-card", value: "astrology-planet-card" },
    { label: "astrology-house-grid", value: "astrology-house-grid" },
    { label: "astrology-house-card", value: "astrology-house-card" },
    { label: "astrology-aspect-grid", value: "astrology-aspect-grid" },
    { label: "astrology-data-notes", value: "astrology-data-notes" },
    { label: "numerology-detail", value: "numerology-detail" },
    { label: "numerology-profile-card", value: "numerology-profile-card" },
    { label: "numerology-core-grid", value: "numerology-core-grid" },
    { label: "numerology-core-card", value: "numerology-core-card" },
    { label: "numerology-number-badge", value: "numerology-number-badge" },
    { label: "numerology-breakdown-grid", value: "numerology-breakdown-grid" },
    { label: "numerology-cycle-grid", value: "numerology-cycle-grid" },
    { label: "numerology-meaning-grid", value: "numerology-meaning-grid" },
    { label: "numerology-data-notes", value: "numerology-data-notes" },
    { label: "name-detail", value: "name-detail" },
    { label: "name-profile-card", value: "name-profile-card" },
    { label: "name-profile-grid", value: "name-profile-grid" },
    { label: "name-structure-grid", value: "name-structure-grid" },
    { label: "name-structure-card", value: "name-structure-card" },
    { label: "name-character-grid", value: "name-character-grid" },
    { label: "name-character-card", value: "name-character-card" },
    { label: "name-character-symbol", value: "name-character-symbol" },
    { label: "name-five-grid", value: "name-five-grid" },
    { label: "name-five-card", value: "name-five-card" },
    { label: "name-sound-grid", value: "name-sound-grid" },
    { label: "name-usage-grid", value: "name-usage-grid" },
    { label: "name-data-notes", value: "name-data-notes" },
    { label: "luck-detail", value: "luck-detail" },
    { label: "luck-profile-card", value: "luck-profile-card" },
    { label: "luck-profile-grid", value: "luck-profile-grid" },
    { label: "luck-annual-grid", value: "luck-annual-grid" },
    { label: "luck-annual-card", value: "luck-annual-card" },
    { label: "luck-nine-grid", value: "luck-nine-grid" },
    { label: "luck-nine-card", value: "luck-nine-card" },
    { label: "luck-timeline", value: "luck-timeline" },
    { label: "luck-timeline-card", value: "luck-timeline-card" },
    { label: "luck-theme-grid", value: "luck-theme-grid" },
    { label: "luck-action-grid", value: "luck-action-grid" },
    { label: "luck-data-notes", value: "luck-data-notes" },
    { label: "dashboard-blueprint-layout", value: "dashboard-blueprint-layout" },
    { label: "dashboard-main-grid", value: "dashboard-main-grid" },
    { label: "dashboard-hero-band", value: "dashboard-hero-band" },
    { label: "dashboard-core-grid", value: "dashboard-core-grid" },
    { label: "dashboard-rhythm-row", value: "dashboard-rhythm-row" },
    { label: "dashboard-support-strip", value: "dashboard-support-strip" },
    { label: "blueprint-hero-card", value: "blueprint-hero-card" },
    { label: "blueprint-core-card", value: "blueprint-core-card" },
    { label: "blueprint-medium-card", value: "blueprint-medium-card" },
    { label: "blueprint-support-card", value: "blueprint-support-card" },
    { label: "blueprint-short-card", value: "blueprint-short-card" },
    { label: "blueprint-summary-line", value: "blueprint-summary-line" },
    { label: "compact-note", value: "compact-note" }
  ], "style.css 需要保留五大核心詳情頁樣式、通用詳情頁樣式與 blueprint 視覺二修樣式。");

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
  const app = readText("app.js");
  const style = readText("style.css");
  const detailData = readText("data/detail-pages-data.js");

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
    { label: "almanacSupport", value: "almanacSupport" },
    { label: "#almanac-title", value: "#almanac-title" },
    { label: "dashboard support card", value: "dashboard support card" },
    { label: "dashboardLayout", value: "dashboardLayout" },
    { label: "首頁只顯示濃縮摘要", value: "首頁只顯示濃縮摘要" },
    { label: "experiment", value: "experiment" },
    { label: "lunar-javascript", value: "lunar-javascript" },
    { label: "暫不取代人工校對", value: "暫不取代人工校對" },
    { label: "deityMatcher", value: "deityMatcher" },
    { label: "dateTestMode", value: "dateTestMode" },
    { label: "testSeeds", value: "testSeeds" }
  ], "site-data.js 需要保留輔助提醒設定。");

  checkIncludes("app.js", app, [
    { label: "almanacCard", value: "almanacCard" },
    { label: "almanac-title", value: "almanac-title" },
    { label: "KekeAlmanacEngine", value: "KekeAlmanacEngine" },
    { label: "getTodayAlmanac", value: "getTodayAlmanac" },
    { label: "renderAlmanacSupportCard", value: "renderAlmanacSupportCard" },
    { label: "renderDeityDay", value: "renderDeityDay" },
    { label: "renderSoulTree", value: "renderSoulTree" },
    { label: "renderTools", value: "renderTools" },
    { label: "blueprint-short-card", value: "blueprint-short-card" },
    { label: "compact-note", value: "compact-note" },
    { label: "農民曆短提醒", value: "今日只作節奏參考" },
    { label: "experiment", value: "experiment" },
  ], "app.js 需要保留農民曆 support 短卡 renderer。");

  if (app !== null) {
    const ok = !app.includes("renderAlmanacSafetyLines(config.safetyLines)");
    addResult(ok ? "pass" : "fail", "農民曆前台不輸出大段安全線", ok ? "renderAlmanacSupportCard 未呼叫大段安全線列表。" : "農民曆卡片前台不應直接輸出 almanac-safety-list。");
  }

  checkIncludes("style.css", style, [
    { label: "almanac-card", value: "almanac-card" },
    { label: "support-card", value: "support-card" },
    { label: "almanac-support-card", value: "almanac-support-card" },
    { label: "blueprint-short-card", value: "blueprint-short-card" },
    { label: "compact-result", value: "compact-result" },
    { label: "compact-note", value: "compact-note" },
    { label: "almanac-date-grid", value: "almanac-date-grid" },
    { label: "almanac-safety-list", value: "almanac-safety-list" }
  ], "style.css 需要保留農民曆 support card 樣式。");

  if (siteData !== null && detailData !== null) {
    const routeScanTargets = [
      { label: "data/site-data.js", content: siteData },
      { label: "data/detail-pages-data.js", content: detailData }
    ];

    for (const target of routeScanTargets) {
      ["#/module/almanac", "#/module/deity"].forEach((route) => {
        const ok = !target.content.includes(route);
        addResult(ok ? "pass" : "fail", `${target.label} 未新增 route：${route}`, ok ? "未發現正式 route。" : "農民曆 / 神明生日本版不可新增 detail route。");
      });
    }

    [
      { label: 'id: "almanac"', value: 'id: "almanac"' },
      { label: 'id: "deity"', value: 'id: "deity"' }
    ].forEach((check) => {
      const ok = !detailData.includes(check.value);
      addResult(ok ? "pass" : "fail", `data/detail-pages-data.js 未新增：${check.label}`, ok ? "未發現 detail data id。" : "本版不可新增農民曆 / 神明生日 detail data。");
    });
  }
}

function checkStaticCompatibility() {
  ["package.json", "node_modules", "build", "dist", "server.js", ".github/workflows"].forEach((forbiddenPath) => {
    const ok = !pathExists(forbiddenPath);
    addResult(ok ? "pass" : "fail", `禁止項目：${forbiddenPath}`, ok ? "未發現。" : "本版仍需維持 GitHub Pages 純靜態。");
  });
}

function checkNestedRepo() {
  const nestedRoot = sitePath("keke-soul-map");
  const nestedGitFolders = walkDirs(".")
    .filter((folderPath) => path.basename(folderPath) === ".git")
    .map((folderPath) => path.dirname(folderPath));

  addResult(fs.existsSync(nestedRoot) ? "fail" : "pass", "巢狀專案資料夾", fs.existsSync(nestedRoot) ? "存在 keke-soul-map/keke-soul-map。" : "未發現。");

  if (nestedGitFolders.length > 0) {
    for (const folderPath of nestedGitFolders) {
      addResult("fail", "子資料夾內發現 .git", `位置：${toSitePath(folderPath)}/.git`);
    }
  } else {
    addResult("pass", "子資料夾 .git", "未發現。");
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
    { keyword: "official", level: "high" },
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
    addResult("pass", "高風險關鍵字", "未發現。");
    return;
  }

  for (const hit of hits) {
    addResult(hit.level, hit.level === "warn" ? "提示關鍵字命中" : "高風險關鍵字命中", hit.level === "warn" ? `${hit.detail}；目前列為提醒。` : hit.detail);
  }
}

function checkDocs() {
  const readme = readText("README.md");
  const changelog = readText("CHANGELOG.md");
  const projectMap = readText("PROJECT_MAP.md");
  const coreSchema = readText("CORE_DETAIL_SCHEMA.md");
  const supportSchema = readText("SUPPORT_MODULE_SCHEMA.md");

  checkIncludes("README.md", readme, [
    { label: expectedVersionLabel, value: expectedVersionLabel },
    { label: "首頁 Blueprint 視覺二修", value: "首頁 Blueprint 視覺二修" },
    { label: "dashboard-hero-band", value: "dashboard-hero-band" },
    { label: "dashboard-core-grid", value: "dashboard-core-grid" },
    { label: "dashboard-rhythm-row", value: "dashboard-rhythm-row" },
    { label: "dashboard-support-strip", value: "dashboard-support-strip" },
    { label: "dashboardLayout", value: "dashboardLayout" },
    { label: "首頁卡片只顯示濃縮摘要", value: "首頁卡片只顯示濃縮摘要" },
    { label: "CORE_DETAIL_SCHEMA.md", value: "CORE_DETAIL_SCHEMA.md" },
    { label: "SUPPORT_MODULE_SCHEMA.md", value: "SUPPORT_MODULE_SCHEMA.md" },
    { label: "農民曆 support 區塊整理", value: "農民曆 support 區塊整理" },
    { label: "almanacSupport", value: "almanacSupport" },
    { label: "不新增 #/module/almanac", value: "不新增 `#/module/almanac`" },
    { label: "暫不取代人工校對", value: "暫不取代人工校對" },
    { label: "流年 / 九運 mock 詳情頁深化", value: "流年 / 九運 mock 詳情頁深化" },
    { label: "mock detail", value: "mock detail" },
    { label: "不提供吉凶分數", value: "不提供吉凶分數" },
    { label: "後半段模組 schema 文件化", value: "後半段模組 schema 文件化" },
    { label: "流年 / 九運", value: "流年 / 九運" },
    { label: "農民曆", value: "農民曆" },
    { label: "神明生日", value: "神明生日" },
    { label: "易經占問", value: "易經占問" },
    { label: "命樹", value: "命樹" },
    { label: "資料庫", value: "資料庫" },
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
  ], "README.md 需要補充 v0.4.2 後半段模組 schema 文件化內容。");

  checkIncludes("CHANGELOG.md", changelog, [
    { label: expectedVersionLabel, value: expectedVersionLabel },
    { label: "首頁 Blueprint 視覺二修", value: "首頁 Blueprint 視覺二修" },
    { label: "hero band", value: "hero band" },
    { label: "core grid", value: "core grid" },
    { label: "rhythm row", value: "rhythm row" },
    { label: "support strip", value: "support strip" },
    { label: "dashboardLayout", value: "dashboardLayout" },
    { label: "農民曆 support 區塊整理", value: "農民曆 support 區塊整理" },
    { label: "almanacSupport", value: "almanacSupport" },
    { label: "不新增農民曆 detail route", value: "不新增農民曆 detail route" },
    { label: "正式宜忌判定", value: "正式宜忌判定" },
    { label: "流年 / 九運 mock 詳情頁深化", value: "流年 / 九運 mock 詳情頁深化" },
    { label: "後半段模組 schema 文件化", value: "後半段模組 schema 文件化" },
    { label: "SUPPORT_MODULE_SCHEMA.md", value: "SUPPORT_MODULE_SCHEMA.md" },
    { label: "renderLuckDetail", value: "renderLuckDetail" },
    { label: "luck detail data", value: "luck detail data" },
    { label: "流年 / 九運", value: "流年 / 九運" },
    { label: "農民曆", value: "農民曆" },
    { label: "神明生日", value: "神明生日" },
    { label: "易經占問", value: "易經占問" },
    { label: "命樹", value: "命樹" },
    { label: "資料庫", value: "資料庫" },
    { label: "純 HTML / CSS / JS", value: "純 HTML / CSS / JS" }
  ], "CHANGELOG.md 需要記錄 v0.4.2。");

  checkIncludes("PROJECT_MAP.md", projectMap, [
    { label: expectedVersionLabel, value: expectedVersionLabel },
    { label: "首頁 Blueprint 視覺二修", value: "首頁 Blueprint 視覺二修" },
    { label: "dashboard-hero-band", value: "dashboard-hero-band" },
    { label: "dashboard-core-grid", value: "dashboard-core-grid" },
    { label: "dashboard-rhythm-row", value: "dashboard-rhythm-row" },
    { label: "dashboard-support-strip", value: "dashboard-support-strip" },
    { label: "dashboardLayout", value: "dashboardLayout" },
    { label: "dashboard-blueprint-layout", value: "dashboard-blueprint-layout" },
    { label: "濃縮摘要", value: "濃縮摘要" },
    { label: "CORE_DETAIL_SCHEMA.md", value: "CORE_DETAIL_SCHEMA.md" },
    { label: "SUPPORT_MODULE_SCHEMA.md", value: "SUPPORT_MODULE_SCHEMA.md" },
    { label: "農民曆 support 區塊整理", value: "農民曆 support 區塊整理" },
    { label: "almanacSupport", value: "almanacSupport" },
    { label: "renderAlmanacSupportCard", value: "renderAlmanacSupportCard" },
    { label: "almanac-support-card", value: "almanac-support-card" },
    { label: "禁止新增 almanac/deity route", value: "禁止新增 almanac/deity route" },
    { label: "流年 / 九運 mock 詳情頁深化", value: "流年 / 九運 mock 詳情頁深化" },
    { label: "luckProfile", value: "luckProfile" },
    { label: "renderLuckDetail", value: "renderLuckDetail" },
    { label: "後半段模組 schema 文件化", value: "後半段模組 schema 文件化" },
    { label: "後半段對照小表", value: "後半段對照小表" },
    { label: "流年 / 九運", value: "流年 / 九運" },
    { label: "農民曆", value: "農民曆" },
    { label: "神明生日", value: "神明生日" },
    { label: "易經占問", value: "易經占問" },
    { label: "命樹", value: "命樹" },
    { label: "資料庫", value: "資料庫" },
    { label: "純 HTML / CSS / JS", value: "純 HTML / CSS / JS" }
  ], "PROJECT_MAP.md 需要補充 v0.4.2 後半段模組 schema 文件與對照表。");

  checkIncludes("CORE_DETAIL_SCHEMA.md", coreSchema, [
    { label: "科科命理宇宙站", value: "科科命理宇宙站" },
    { label: "五大核心詳情頁 Schema 對照表", value: "五大核心詳情頁 Schema 對照表" },
    { label: "v0.4.1", value: "v0.4.1" },
    { label: "ziwei", value: "ziwei" },
    { label: "bazi", value: "bazi" },
    { label: "astrology", value: "astrology" },
    { label: "numerology", value: "numerology" },
    { label: "name", value: "name" },
    { label: "ziweiProfile", value: "ziweiProfile" },
    { label: "baziProfile", value: "baziProfile" },
    { label: "astrologyProfile", value: "astrologyProfile" },
    { label: "numerologyProfile", value: "numerologyProfile" },
    { label: "nameProfile", value: "nameProfile" },
    { label: "renderZiweiDetail", value: "renderZiweiDetail" },
    { label: "renderBaziDetail", value: "renderBaziDetail" },
    { label: "renderAstrologyDetail", value: "renderAstrologyDetail" },
    { label: "renderNumerologyDetail", value: "renderNumerologyDetail" },
    { label: "renderNameDetail", value: "renderNameDetail" },
    { label: "ziwei-detail", value: "ziwei-detail" },
    { label: "bazi-detail", value: "bazi-detail" },
    { label: "astrology-detail", value: "astrology-detail" },
    { label: "numerology-detail", value: "numerology-detail" },
    { label: "name-detail", value: "name-detail" },
    { label: "renderNumerologyRhythmOverview", value: "renderNumerologyRhythmOverview" },
    { label: "renderNumerologyNumberMeanings", value: "renderNumerologyNumberMeanings" },
    { label: "不提供改名建議", value: "不提供改名建議" },
    { label: "mock", value: "mock" },
    { label: "planning", value: "planning" },
    { label: "experiment", value: "experiment" },
    { label: "不接 API", value: "不接 API" },
    { label: "不接資料庫", value: "不接資料庫" },
    { label: "escapeHtml", value: "escapeHtml" }
  ], "CORE_DETAIL_SCHEMA.md 需要包含五大核心 route / data schema / renderer / CSS 與安全線對照。");

  checkIncludes("SUPPORT_MODULE_SCHEMA.md", supportSchema, [
    { label: "科科命理宇宙站", value: "科科命理宇宙站" },
    { label: "後半段模組 Schema 對照表", value: "後半段模組 Schema 對照表" },
    { label: "support boundary unchanged", value: "support boundary unchanged" },
    { label: "首頁 Blueprint 視覺二修", value: "首頁 Blueprint 視覺二修" },
    { label: "短卡化", value: "短卡化" },
    { label: "濃縮摘要", value: "濃縮摘要" },
    { label: "農民曆 support 區塊整理", value: "農民曆 support 區塊整理" },
    { label: "almanacSupport", value: "almanacSupport" },
    { label: "support整理", value: "support整理" },
    { label: "renderAlmanacSupportCard", value: "renderAlmanacSupportCard" },
    { label: "lunar-javascript", value: "lunar-javascript" },
    { label: "暫不取代人工校對", value: "暫不取代人工校對" },
    { label: "mock detail", value: "mock detail" },
    { label: "renderLuckDetail", value: "renderLuckDetail" },
    { label: "luckProfile", value: "luckProfile" },
    { label: "annualCycleOverview", value: "annualCycleOverview" },
    { label: "nineLuckOverview", value: "nineLuckOverview" },
    { label: "timelineOverview", value: "timelineOverview" },
    { label: "themeIntegration", value: "themeIntegration" },
    { label: "actionNotes", value: "actionNotes" },
    { label: "不提供吉凶分數", value: "不提供吉凶分數" },
    { label: "不新增 #/module/almanac", value: "不新增 #/module/almanac" },
    { label: "不新增 #/module/deity", value: "不新增 #/module/deity" },
    { label: "流年 / 九運", value: "流年 / 九運" },
    { label: "農民曆", value: "農民曆" },
    { label: "神明生日", value: "神明生日" },
    { label: "易經占問", value: "易經占問" },
    { label: "命樹", value: "命樹" },
    { label: "資料庫", value: "資料庫" },
    { label: "luck", value: "luck" },
    { label: "almanac", value: "almanac" },
    { label: "deity", value: "deity" },
    { label: "yijing", value: "yijing" },
    { label: "soul-tree", value: "soul-tree" },
    { label: "database", value: "database" },
    { label: "#/module/luck", value: "#/module/luck" },
    { label: "#almanac-title", value: "#almanac-title" },
    { label: "#deity-title", value: "#deity-title" },
    { label: "#/module/yijing", value: "#/module/yijing" },
    { label: "#/module/soul-tree", value: "#/module/soul-tree" },
    { label: "#/module/database", value: "#/module/database" },
    { label: "data/detail-pages-data.js", value: "data/detail-pages-data.js" },
    { label: "features/almanac-engine.js", value: "features/almanac-engine.js" },
    { label: "vendor/lunar/lunar.js", value: "vendor/lunar/lunar.js" },
    { label: "data/deity-birthdays.js", value: "data/deity-birthdays.js" },
    { label: "features/deity-matcher.js", value: "features/deity-matcher.js" },
    { label: "features/date-test-mode.js", value: "features/date-test-mode.js" },
    { label: "renderDetailPage", value: "renderDetailPage" },
    { label: "dashboard support card", value: "dashboard support card" },
    { label: "planning", value: "planning" },
    { label: "experiment", value: "experiment" },
    { label: "seed", value: "seed" },
    { label: "不接 API", value: "不接 API" },
    { label: "不接資料庫", value: "不接資料庫" },
    { label: "不提供正式命理判斷", value: "不提供正式命理判斷" },
    { label: "不做神諭式斷言", value: "不做神諭式斷言" },
    { label: "不儲存使用者個資", value: "不儲存使用者個資" }
  ], "SUPPORT_MODULE_SCHEMA.md 需要包含後半段 route / anchor / data source / feature 與安全線對照。");
}

function checkProductionPrototypeImport() {
  const html = readText("index.html");
  const app = readText("app.js");
  const style = readText("style.css");
  const siteData = readText("data/site-data.js");
  const detailData = readText("data/detail-pages-data.js");

  checkIncludes("index.html", html, [
    { label: "bottomInsightStrip", value: "bottomInsightStrip" },
    { label: "dashboard-bottom-strip", value: "dashboard-bottom-strip" },
    { label: "dashboard-hero-band", value: "dashboard-hero-band" },
    { label: "dashboard-core-grid", value: "dashboard-core-grid" },
    { label: "dashboard-rhythm-row", value: "dashboard-rhythm-row" },
    { label: "dashboard-support-strip", value: "dashboard-support-strip" }
  ], "index.html 需要保留 production prototype 首頁五段骨架。");

  checkIncludes("data/site-data.js", siteData, [
    { label: "姓名學 metadata 前置", value: "姓名學 metadata 前置" },
    { label: "core-input-schema-lock", value: "core-input-schema-lock" },
    { label: "bottomInsightStrip", value: "bottomInsightStrip" }
  ], "site-data.js 需要標記 v0.7.1 姓名學 metadata 前置，並保留首頁骨架 metadata。");

  checkIncludes("app.js", app, [
    { label: "renderHeroFocusStrip", value: "renderHeroFocusStrip" },
    { label: "renderBottomInsightStrip", value: "renderBottomInsightStrip" },
    { label: "renderSoulTreeVisual", value: "renderSoulTreeVisual" },
    { label: "renderCoreModuleVisual", value: "renderCoreModuleVisual" },
    { label: "ziwei-visual", value: "ziwei-visual" },
    { label: "bazi-visual", value: "bazi-visual" },
    { label: "astrology-visual", value: "astrology-visual" },
    { label: "numerology-visual", value: "numerology-visual" },
    { label: "name-visual", value: "name-visual" },
    { label: "production-support-short", value: "production-support-short" },
    { label: "bottomInsightStrip", value: "bottomInsightStrip" },
    { label: "今日未命中神明生日資料表", value: "今日未命中神明生日資料表" },
    { label: "農民曆小提醒", value: "農民曆小提醒" }
  ], "app.js 需要輸出 production prototype 首頁 render 與 support 短卡。");

  checkIncludes("style.css", style, [
    { label: "v0.6.3 core module template lock", value: "v0.6.3 core module template lock" },
    { label: "production-core-grid", value: "production-core-grid" },
    { label: "production-core-card", value: "production-core-card" },
    { label: "module-visual", value: "module-visual" },
    { label: "ziwei-visual", value: "ziwei-visual" },
    { label: "bazi-visual", value: "bazi-visual" },
    { label: "astrology-visual", value: "astrology-visual" },
    { label: "numerology-visual", value: "numerology-visual" },
    { label: "name-visual", value: "name-visual" },
    { label: "production-focus-strip", value: "production-focus-strip" },
    { label: "production-tree-visual", value: "production-tree-visual" },
    { label: "production-support-short", value: "production-support-short" },
    { label: "bottom-insight-grid", value: "bottom-insight-grid" },
    { label: "bottom-insight-card", value: "bottom-insight-card" }
  ], "style.css 需要包含 production prototype 視覺移植樣式。");

  if (app !== null) {
    const finalDeityStart = app.lastIndexOf("function renderDeityDay");
    const finalDeityEnd = app.indexOf("function renderTools", finalDeityStart);
    const finalDeity = finalDeityStart >= 0 && finalDeityEnd > finalDeityStart
      ? app.slice(finalDeityStart, finalDeityEnd)
      : "";
    addResult(!finalDeity.includes("test-link-row") ? "pass" : "fail", "神明生日首頁短卡不顯示測試入口", "最後生效的 renderDeityDay 不應輸出 test-link-row。");
    addResult(!finalDeity.includes("固定展示範例") && !finalDeity.includes("sample-note") ? "pass" : "fail", "神明生日首頁短卡不顯示固定 mock 範例", "最後生效的 renderDeityDay 不應輸出固定展示範例或 sample-note。");

    const finalAlmanacStart = app.lastIndexOf("function renderAlmanacSupportCard");
    const finalAlmanacEnd = app.indexOf("function renderDeityDay", finalAlmanacStart);
    const finalAlmanac = finalAlmanacStart >= 0 && finalAlmanacEnd > finalAlmanacStart
      ? app.slice(finalAlmanacStart, finalAlmanacEnd)
      : "";
    addResult(!finalAlmanac.includes("almanac-safety-list") ? "pass" : "fail", "農民曆首頁短卡不輸出安全線列表", "最後生效的 renderAlmanacSupportCard 不應輸出 almanac-safety-list。");

    const singletonRenderers = [
      "renderDashboardView",
      "renderProfile",
      "renderTodaySummary",
      "renderNumerology",
      "renderModules",
      "renderCoreModuleCard",
      "renderAlmanacSupportCard",
      "renderDeityDay",
      "renderSoulTree",
      "renderTools",
      "renderBottomInsightStrip",
      "renderDesktopNav"
    ];

    for (const rendererName of singletonRenderers) {
      const count = (app.match(new RegExp("function\\s+" + rendererName + "\\s*\\(", "g")) || []).length;
      addResult(count === 1 ? "pass" : "fail", "app.js 首頁 renderer 唯一宣告：" + rendererName, count === 1 ? "已收束為唯一一份。" : "目前宣告數：" + count + "，請清理重複 renderer。");
    }

    [
      "renderTestLinks",
      "renderDeityMatcherPanel",
      "renderMockDeitySample",
      "renderAlmanacSafetyLines",
      "renderAlmanacSourceNotes",
      "renderAlmanacEnginePanel"
    ].forEach((helperName) => {
      const ok = !app.includes("function " + helperName);
      addResult(ok ? "pass" : "fail", "app.js 不保留首頁舊 helper：" + helperName, ok ? "已清理。" : "仍有舊 helper 殘留，可能造成首頁 support 區塊語意混淆。");
    });
  }

  for (const target of [
    { label: "data/site-data.js", content: siteData },
    { label: "data/detail-pages-data.js", content: detailData }
  ]) {
    if (target.content === null) {
      continue;
    }

    ["#/module/almanac", "#/module/deity", 'id: "almanac"', 'id: "deity"'].forEach((forbidden) => {
      const ok = !target.content.includes(forbidden);
      addResult(ok ? "pass" : "fail", `${target.label} 不應包含 ${forbidden}`, ok ? "維持 support anchor，不新增輔助模組詳情頁。" : "不應新增農民曆或神明生日 detail route。");
    });
  }
}

function checkCoreInputSchema() {
  const siteData = readText("data/site-data.js");
  const app = readText("app.js");
  const style = readText("style.css");

  checkIncludes("data/site-data.js", siteData, [
    { label: "coreInputProfile", value: "coreInputProfile" },
    { label: "coreInputSchema", value: "coreInputSchema" },
    { label: "coreCalculationRequirements", value: "coreCalculationRequirements" },
    { label: "calculationReadiness", value: "calculationReadiness" },
    { label: "privacyMode", value: "privacyMode" },
    { label: "local-static", value: "local-static" },
    { label: "manual seed", value: "manual seed" },
    { label: "solarDate", value: "solarDate" },
    { label: "birthTimeRange", value: "birthTimeRange" },
    { label: "timezone", value: "timezone" },
    { label: "calendarType", value: "calendarType" },
    { label: "numerology", value: "numerology" },
    { label: "ziwei", value: "ziwei" },
    { label: "bazi", value: "bazi" },
    { label: "astrology", value: "astrology" },
    { label: "name", value: "name" },
    { label: "requiredFields", value: "requiredFields" },
    { label: "optionalFields", value: "optionalFields" },
    { label: "blockedBy", value: "blockedBy" },
    { label: "ready", value: "ready" },
    { label: "partial", value: "partial" },
    { label: "本版僅使用靜態 seed 資料", value: "本版僅使用靜態 seed 資料" },
    { label: "本版不儲存使用者個資", value: "本版不儲存使用者個資" }
  ], "site-data.js 需要包含五大核心輸入資料欄位、schema、需求與安全線。");

  checkIncludes("app.js", app, [
    { label: "getCoreInputProfile", value: "getCoreInputProfile" },
    { label: "getCoreCalculationRequirement", value: "getCoreCalculationRequirement" },
    { label: "getCoreReadinessLabel", value: "getCoreReadinessLabel" },
    { label: "renderCoreRequirementBadge", value: "renderCoreRequirementBadge" },
    { label: "readiness-chip", value: "readiness-chip" },
    { label: "input-status-chip", value: "input-status-chip" },
    { label: "五大核心資料已鎖定", value: "五大核心資料已鎖定" }
  ], "app.js 需要以輕量 chip 顯示五大核心輸入資料狀態。");

  checkIncludes("style.css", style, [
    { label: "input-status-chip", value: "input-status-chip" },
    { label: "input-status-row", value: "input-status-row" },
    { label: "readiness-chip", value: "readiness-chip" },
    { label: "is-ready", value: "is-ready" },
    { label: "is-partial", value: "is-partial" },
    { label: "is-missing", value: "is-missing" },
    { label: "is-future", value: "is-future" }
  ], "style.css 需要包含輸入資料狀態 chip 樣式。");

  [
    { label: "data/site-data.js", content: siteData },
    { label: "app.js", content: app }
  ].forEach((target) => {
    if (target.content === null) {
      return;
    }

    ["official", "正式演算法", "localStorage.setItem", "fetch("].forEach((forbidden) => {
      const ok = !target.content.includes(forbidden);
      addResult(ok ? "pass" : "fail", `${target.label} 不應包含 ${forbidden}`, ok ? "未發現本版禁止內容。" : "本版只鎖定輸入欄位，不應新增正式運算、fetch 或 localStorage 個資寫入。");
    });
  });
}

function checkNumerologyCalculation() {
  const html = readText("index.html");
  const siteData = readText("data/site-data.js");
  const app = readText("app.js");
  const style = readText("style.css");
  const calculator = readText("features/numerology-calculator.js");

  checkIncludes("index.html", html, [
    { label: "features/numerology-calculator.js", value: `features/numerology-calculator.js?v=${expectedVersion}` },
    { label: "data/numerology-meanings.js", value: `data/numerology-meanings.js?v=${expectedVersion}` },
    { label: "site-data before numerology calculator", value: `data/site-data.js?v=${expectedVersion}" data-source="KekeSoulData"></script>\n  <script src="./features/numerology-calculator.js?v=${expectedVersion}` },
    { label: "meanings after numerology calculator", value: `features/numerology-calculator.js?v=${expectedVersion}"></script>\n  <script src="./data/numerology-meanings.js?v=${expectedVersion}` },
    { label: "app.js after numerology meanings", value: `data/numerology-meanings.js?v=${expectedVersion}"></script>\n  <script src="./app.js?v=${expectedVersion}` }
  ], "index.html 需要在 site-data.js 後、app.js 前載入生命靈數計算器。");

  checkIncludes("features/numerology-calculator.js", calculator, [
    { label: "KekeNumerologyCalculator", value: "KekeNumerologyCalculator" },
    { label: "calculateFromProfile", value: "calculateFromProfile" },
    { label: "calculateLifePathNumber", value: "calculateLifePathNumber" },
    { label: "calculateBirthDayNumber", value: "calculateBirthDayNumber" },
    { label: "calculatePersonalYear", value: "calculatePersonalYear" },
    { label: "calculatePersonalMonth", value: "calculatePersonalMonth" },
    { label: "calculatePersonalDay", value: "calculatePersonalDay" },
    { label: "reduceNumber", value: "reduceNumber" },
    { label: "parseSolarDate", value: "parseSolarDate" },
    { label: "getTodayIsoDate", value: "getTodayIsoDate" },
    { label: "digit-reduction-1-to-9", value: "digit-reduction-1-to-9" },
    { label: "solarDate missing", value: "solarDate missing" },
    { label: "invalid solarDate", value: "invalid solarDate" }
  ], "numerology-calculator.js 需要提供 v0.6.0 生命靈數計算 API 與安全 fallback。");

  checkIncludes("data/site-data.js", siteData, [
    { label: "numerologyCalculation", value: "numerologyCalculation" },
    { label: "calculated", value: "calculated" },
    { label: "coreInputProfile", value: "coreInputProfile" },
    { label: "solarDate", value: "solarDate" },
    { label: "masterNumberMode", value: "masterNumberMode" },
    { label: "disabled", value: "disabled" },
    { label: "digit-reduction-1-to-9", value: "digit-reduction-1-to-9" },
    { label: "calculationStatus", value: "calculationStatus" }
  ], "site-data.js 需要記錄生命靈數計算設定與資料來源。");

  checkIncludes("app.js", app, [
    { label: "getNumerologyCalculation", value: "getNumerologyCalculation" },
    { label: "getNumerologyDisplayData", value: "getNumerologyDisplayData" },
    { label: "renderNumerologyCalculationBadge", value: "renderNumerologyCalculationBadge" },
    { label: "KekeNumerologyCalculator", value: "KekeNumerologyCalculator" },
    { label: "lifePathNumber", value: "lifePathNumber" },
    { label: "birthDayNumber", value: "birthDayNumber" },
    { label: "personalYear", value: "personalYear" },
    { label: "personalMonth", value: "personalMonth" },
    { label: "personalDay", value: "personalDay" },
    { label: "numerology-calculation-panel", value: "numerology-calculation-panel" },
    { label: "calculation-chip", value: "calculation-chip" }
  ], "app.js 需要將生命靈數計算結果同步到首頁與詳情頁。");

  checkIncludes("style.css", style, [
    { label: "calculation-chip", value: "calculation-chip" },
    { label: "calculation-chip.is-calculated", value: "calculation-chip.is-calculated" },
    { label: "numerology-calculation-panel", value: "numerology-calculation-panel" },
    { label: "numerology-result-grid", value: "numerology-result-grid" },
    { label: "numerology-result-card", value: "numerology-result-card" }
  ], "style.css 需要包含生命靈數計算結果的小型樣式。");

  [
    { label: "data/site-data.js", content: siteData },
    { label: "data/detail-pages-data.js", content: readText("data/detail-pages-data.js") },
    { label: "app.js", content: app }
  ].forEach((target) => {
    if (target.content === null) {
      return;
    }

    ["#/module/almanac", "#/module/deity", 'id: "almanac"', 'id: "deity"', "localStorage.setItem", "fetch("].forEach((forbidden) => {
      const ok = !target.content.includes(forbidden);
      addResult(ok ? "pass" : "fail", `${target.label} 不應包含 ${forbidden}`, ok ? "未發現。" : "v0.6.0 不應新增農民曆 / 神明生日 detail route、fetch 或 localStorage 個資寫入。");
    });
  });
}

function checkNumerologyInterpretation() {
  const html = readText("index.html");
  const siteData = readText("data/site-data.js");
  const app = readText("app.js");
  const style = readText("style.css");
  const meanings = readText("data/numerology-meanings.js");

  checkIncludes("index.html", html, [
    { label: `data/numerology-meanings.js?v=${expectedVersion}`, value: `data/numerology-meanings.js?v=${expectedVersion}` },
    { label: "calculator before meanings", value: `features/numerology-calculator.js?v=${expectedVersion}"></script>\n  <script src="./data/numerology-meanings.js?v=${expectedVersion}` },
    { label: "meanings before app", value: `data/numerology-meanings.js?v=${expectedVersion}"></script>\n  <script src="./app.js?v=${expectedVersion}` }
  ], "index.html 需要依序載入 numerology calculator、numerology meanings 與 app.js。");

  checkIncludes("data/numerology-meanings.js", meanings, [
    { label: `version ${expectedVersionLabel}`, value: `version: "${expectedVersionLabel}"` },
    { label: "KekeNumerologyMeanings", value: "KekeNumerologyMeanings" },
    { label: "lifePathMeanings", value: "lifePathMeanings" },
    { label: "birthDayMeanings", value: "birthDayMeanings" },
    { label: "personalYearMeanings", value: "personalYearMeanings" },
    { label: "personalMonthMeanings", value: "personalMonthMeanings" },
    { label: "personalDayMeanings", value: "personalDayMeanings" },
    { label: "safetyLines", value: "safetyLines" },
    { label: "static-interpretation", value: "static-interpretation" },
    { label: "digit-reduction-1-to-9", value: "digit-reduction-1-to-9" },
    { label: "1:", value: "1:" },
    { label: "7:", value: "7:" },
    { label: "9:", value: "9:" }
  ], "data/numerology-meanings.js 需要包含生命靈數 1-9 與個人節奏靜態解讀資料。");

  checkIncludes("data/site-data.js", siteData, [
    { label: expectedVersionLabel, value: expectedVersionLabel },
    { label: "姓名學 metadata 前置", value: "姓名學 metadata 前置" },
    { label: "numberRhythmCard", value: "numberRhythmCard" },
    { label: "今日數字節奏", value: "今日數字節奏" },
    { label: "personalYear", value: "personalYear" },
    { label: "personalMonth", value: "personalMonth" },
    { label: "personalDay", value: "personalDay" },
    { label: "numerologyInterpretation", value: "numerologyInterpretation" },
    { label: "static-interpretation", value: "static-interpretation" },
    { label: "data/numerology-meanings.js", value: "data/numerology-meanings.js" },
    { label: "numerologyCalculation", value: "numerologyCalculation" },
    { label: "calculated", value: "calculated" }
  ], "site-data.js 需要記錄 numerologyInterpretation metadata 並保留 calculated 計算設定。");

  checkIncludes("app.js", app, [
    { label: "v0.7.1 dashboard render flow", value: "v0.7.1 dashboard render flow" },
    { label: "number-rhythm-title", value: "number-rhythm-title" },
    { label: "今日數字節奏", value: "今日數字節奏" },
    { label: "今日焦點", value: "今日焦點" },
    { label: "個人日", value: "個人日" },
    { label: "personalYear", value: "personalYear" },
    { label: "personalMonth", value: "personalMonth" },
    { label: "personalDay", value: "personalDay" },
    { label: "getNumerologyMeanings", value: "getNumerologyMeanings" },
    { label: "getNumerologyMeaningFor", value: "getNumerologyMeaningFor" },
    { label: "getNumerologyInterpretationDisplay", value: "getNumerologyInterpretationDisplay" },
    { label: "renderNumerologyInterpretationPanel", value: "renderNumerologyInterpretationPanel" },
    { label: "renderNumerologySafetyLines", value: "renderNumerologySafetyLines" },
    { label: "numerology-interpretation-panel", value: "numerology-interpretation-panel" },
    { label: "static-interpretation", value: "static-interpretation" },
    { label: "生命靈數目前已完成正式數字計算與靜態解讀資料層", value: "生命靈數目前已完成正式數字計算與靜態解讀資料層" }
  ], "app.js 需要將 calculated 數字對應到 static interpretation 解讀資料層。");

  checkIncludes("style.css", style, [
    { label: "numerology-interpretation-panel", value: "numerology-interpretation-panel" },
    { label: "numerology-interpretation-grid", value: "numerology-interpretation-grid" },
    { label: "numerology-interpretation-card", value: "numerology-interpretation-card" },
    { label: "interpretation-chip", value: "interpretation-chip" },
    { label: "is-static", value: "is-static" },
    { label: "numerology-safety-lines", value: "numerology-safety-lines" }
  ], "style.css 需要包含生命靈數 static interpretation panel 樣式。");

  [
    { label: "data/numerology-meanings.js", content: meanings },
    { label: "data/site-data.js", content: siteData },
    { label: "app.js", content: app }
  ].forEach((target) => {
    if (target.content === null) {
      return;
    }

    ["package.json", "node_modules", "fetch(", "localStorage.setItem", "#/module/almanac", "#/module/deity"].forEach((forbidden) => {
      const ok = !target.content.includes(forbidden);
      addResult(ok ? "pass" : "fail", `${target.label} 不應包含 ${forbidden}`, ok ? "未發現。" : "v0.7.1 不應新增套件、fetch、localStorage 個資寫入或農民曆 / 神明生日 detail route。");
    });
  });
}

function checkNumberRhythmSemantics() {
  const html = readText("index.html");
  const app = readText("app.js");
  const siteData = readText("data/site-data.js");

  checkIncludes("index.html", html, [
    { label: 'aria-label="今日數字節奏"', value: 'aria-label="今日數字節奏"' },
    { label: 'aria-labelledby="number-rhythm-title"', value: 'aria-labelledby="number-rhythm-title"' }
  ], "index.html 的 numerologyCard 需要改成今日數字節奏語意。");

  checkIncludes("data/site-data.js", siteData, [
    { label: "numberRhythmCard", value: "numberRhythmCard" },
    { label: "homepage-copy-adjusted", value: "homepage-copy-adjusted" },
    { label: "KekeNumerologyCalculator", value: "KekeNumerologyCalculator" },
    { label: "personalYear", value: "personalYear" },
    { label: "personalMonth", value: "personalMonth" },
    { label: "personalDay", value: "personalDay" }
  ], "site-data.js 需要記錄首頁今日數字節奏卡 metadata。");

  checkIncludes("app.js", app, [
    { label: "number-rhythm-title", value: "number-rhythm-title" },
    { label: "今日數字節奏", value: "今日數字節奏" },
    { label: "今日焦點", value: "今日焦點" },
    { label: "個人日", value: "個人日" },
    { label: "personalYear", value: "personalYear" },
    { label: "personalMonth", value: "personalMonth" },
    { label: "personalDay", value: "personalDay" }
  ], "app.js renderNumerology 需要改成今日數字節奏，主視覺聚焦個人日。");

  if (app !== null) {
    const forbiddenHeading = '<h2 id="life-number-title">生命靈數節奏</h2>';
    const ok = !app.includes(forbiddenHeading);
    addResult(ok ? "pass" : "fail", "app.js 不應保留生命靈數節奏主標", ok ? "未發現舊主標。" : "首頁 rhythm row 小卡不可再用生命靈數節奏作為主標。");
  }

  if (html !== null) {
    const staleNumerologyAria = /id="numerologyCard"[^>]*aria-label="生命靈數"/.test(html);
    addResult(!staleNumerologyAria ? "pass" : "fail", "index.html numerologyCard aria-label", !staleNumerologyAria ? "已改為今日數字節奏。" : "numerologyCard 不應再使用 aria-label=\"生命靈數\"。");
  }
}

function checkCoreModuleTemplate() {
  const template = readText("CORE_MODULE_TEMPLATE.md");
  const siteData = readText("data/site-data.js");
  const readme = readText("README.md");
  const changelog = readText("CHANGELOG.md");
  const projectMap = readText("PROJECT_MAP.md");
  const coreSchema = readText("CORE_DETAIL_SCHEMA.md");
  const supportSchema = readText("SUPPORT_MODULE_SCHEMA.md");

  addResult(pathExists("CORE_MODULE_TEMPLATE.md") ? "pass" : "fail", "CORE_MODULE_TEMPLATE.md 存在", pathExists("CORE_MODULE_TEMPLATE.md") ? "檢查通過。" : "需要新增五大核心模組施工模板文件。");

  checkIncludes("CORE_MODULE_TEMPLATE.md", template, [
    { label: "五大核心模組施工模板", value: "五大核心模組施工模板" },
    { label: "input layer", value: "input layer" },
    { label: "calculator layer", value: "calculator layer" },
    { label: "meaning layer", value: "meaning layer" },
    { label: "homepage layer", value: "homepage layer" },
    { label: "detail layer", value: "detail layer" },
    { label: "safety layer", value: "safety layer" },
    { label: "check layer", value: "check layer" },
    { label: "calculated", value: "calculated" },
    { label: "static-interpretation", value: "static-interpretation" },
    { label: "planning", value: "planning" },
    { label: "features/numerology-calculator.js", value: "features/numerology-calculator.js" },
    { label: "data/numerology-meanings.js", value: "data/numerology-meanings.js" },
    { label: "renderNumerologyCalculationPanel", value: "renderNumerologyCalculationPanel" },
    { label: "renderNumerologyInterpretationPanel", value: "renderNumerologyInterpretationPanel" },
    { label: "renderNumerologySafetyLines", value: "renderNumerologySafetyLines" },
    { label: "number-rhythm-semantics", value: "number-rhythm-semantics" },
    { label: "姓名學", value: "姓名學" },
    { label: "八字", value: "八字" },
    { label: "紫微", value: "紫微" },
    { label: "西洋星盤", value: "西洋星盤" }
  ], "CORE_MODULE_TEMPLATE.md 需要包含五大核心七層模板、生命靈數完成範例與後續核心接入順序。");

  checkIncludes("data/site-data.js", siteData, [
    { label: "coreModuleTemplate", value: "coreModuleTemplate" },
    { label: "template-locked", value: "template-locked" },
    { label: "CORE_MODULE_TEMPLATE.md", value: "CORE_MODULE_TEMPLATE.md" },
    { label: "standardLayers", value: "standardLayers" },
    { label: "completedReference", value: "completedReference" },
    { label: "nextCoreCandidates", value: "nextCoreCandidates" },
    { label: "numerology", value: "numerology" },
    { label: "name", value: "name" },
    { label: "bazi", value: "bazi" },
    { label: "ziwei", value: "ziwei" },
    { label: "astrology", value: "astrology" }
  ], "data/site-data.js 需要新增 coreModuleTemplate metadata。");

  checkIncludes("README.md", readme, [
    { label: "v0.6.3", value: "v0.6.3" },
    { label: "生命靈數主線封章", value: "生命靈數主線封章" },
    { label: "五大核心模組施工模板", value: "五大核心模組施工模板" }
  ], "README.md 需要記錄 v0.6.3 模板封章。");

  checkIncludes("CHANGELOG.md", changelog, [
    { label: "v0.6.3", value: "v0.6.3" },
    { label: "CORE_MODULE_TEMPLATE.md", value: "CORE_MODULE_TEMPLATE.md" },
    { label: "template-locked", value: "template-locked" }
  ], "CHANGELOG.md 需要記錄 v0.6.3 模板封章。");

  checkIncludes("PROJECT_MAP.md", projectMap, [
    { label: "CORE_MODULE_TEMPLATE.md", value: "CORE_MODULE_TEMPLATE.md" },
    { label: "五大核心模組施工模板", value: "五大核心模組施工模板" }
  ], "PROJECT_MAP.md 需要記錄 CORE_MODULE_TEMPLATE.md 用途。");

  checkIncludes("CORE_DETAIL_SCHEMA.md", coreSchema, [
    { label: "calculated", value: "calculated" },
    { label: "static-interpretation", value: "static-interpretation" },
    { label: "planning", value: "planning" },
    { label: "input layer", value: "input layer" },
    { label: "calculator layer", value: "calculator layer" },
    { label: "meaning layer", value: "meaning layer" }
  ], "CORE_DETAIL_SCHEMA.md 需要補上五大核心模板分層語彙。");

  checkIncludes("SUPPORT_MODULE_SCHEMA.md", supportSchema, [
    { label: "輔助模組", value: "輔助模組" },
    { label: "不新增 #/module/almanac", value: "不新增 #/module/almanac" },
    { label: "不新增 #/module/deity", value: "不新增 #/module/deity" },
    { label: "不把農民曆", value: "不把農民曆" },
    { label: "升格成主功能", value: "升格成主功能" }
  ], "SUPPORT_MODULE_SCHEMA.md 需要保留核心 / 輔助模組邊界，不可把農民曆或神明生日升級成核心命盤。");
}

function checkCoreAlgorithmBoundary() {
  const boundary = readText("CORE_ALGORITHM_BOUNDARY.md");
  const siteData = readText("data/site-data.js");
  const readme = readText("README.md");
  const changelog = readText("CHANGELOG.md");
  const projectMap = readText("PROJECT_MAP.md");

  addResult(pathExists("CORE_ALGORITHM_BOUNDARY.md") ? "pass" : "fail", "CORE_ALGORITHM_BOUNDARY.md 存在", pathExists("CORE_ALGORITHM_BOUNDARY.md") ? "檢查通過。" : "需要新增命理運算總架構文件。");

  checkIncludes("CORE_ALGORITHM_BOUNDARY.md", boundary, [
    { label: expectedVersionLabel, value: expectedVersionLabel },
    { label: "生命靈數", value: "生命靈數" },
    { label: "姓名學", value: "姓名學" },
    { label: "八字四柱", value: "八字四柱" },
    { label: "紫微斗數", value: "紫微斗數" },
    { label: "西洋星盤", value: "西洋星盤" },
    { label: "input layer", value: "input layer" },
    { label: "calculator layer", value: "calculator layer" },
    { label: "meaning layer", value: "meaning layer" },
    { label: "homepage layer", value: "homepage layer" },
    { label: "detail layer", value: "detail layer" },
    { label: "safety layer", value: "safety layer" },
    { label: "check layer", value: "check layer" },
    { label: "requiredFields", value: "requiredFields" },
    { label: "optionalFields", value: "optionalFields" },
    { label: "blockedBy", value: "blockedBy" },
    { label: "test cases", value: "test cases" },
    { label: "planning", value: "planning" },
    { label: "partial", value: "partial" },
    { label: "calculated", value: "calculated" },
    { label: "not calculated", value: "not calculated" },
    { label: "features/numerology-calculator.js", value: "features/numerology-calculator.js" },
    { label: "data/numerology-meanings.js", value: "data/numerology-meanings.js" },
    { label: "strokeTable", value: "strokeTable" },
    { label: "solarTermEngine", value: "solarTermEngine" },
    { label: "lunarConversion", value: "lunarConversion" },
    { label: "ephemerisSource", value: "ephemerisSource" }
  ], "CORE_ALGORITHM_BOUNDARY.md 需要包含五大核心、七層標準、狀態定義、阻塞點與測試案例。");

  checkIncludes("data/site-data.js", siteData, [
    { label: expectedVersionLabel, value: expectedVersionLabel },
    { label: "CORE_ALGORITHM_BOUNDARY.md", value: "CORE_ALGORITHM_BOUNDARY.md" },
    { label: "姓名學 metadata 前置", value: "姓名學 metadata 前置" },
    { label: "nameCalculationBoundary", value: "nameCalculationBoundary" },
    { label: "生命靈數 calculated", value: 'calculationStatus: "calculated"' },
    { label: "name partial", value: "name: {" },
    { label: "bazi partial", value: "bazi: {" },
    { label: "ziwei partial", value: "ziwei: {" },
    { label: "astrology partial", value: "astrology: {" }
  ], "data/site-data.js 需要記錄 v0.7.1 運算邊界文件與第二核心前置狀態。");

  if (siteData !== null) {
    [
      { label: "姓名學不可 calculated", pattern: /nameCalculationBoundary:\s*{[\s\S]*?calculationStatus:\s*"calculated"/ },
      { label: "八字四柱不可 calculated", pattern: /baziCalculationBoundary:\s*{[\s\S]*?calculationStatus:\s*"calculated"/ },
      { label: "紫微斗數不可 calculated", pattern: /ziweiCalculationBoundary:\s*{[\s\S]*?calculationStatus:\s*"calculated"/ },
      { label: "西洋星盤不可 calculated", pattern: /astrologyCalculationBoundary:\s*{[\s\S]*?calculationStatus:\s*"calculated"/ }
    ].forEach((check) => {
      const ok = !check.pattern.test(siteData);
      addResult(ok ? "pass" : "fail", check.label, ok ? "未發現第二核心誤升級。" : "v0.7.1 不可將第二核心標示為 calculated。");
    });
  }

  [
    "features/name-calculator.js",
    "features/bazi-calculator.js",
    "features/ziwei-calculator.js",
    "features/astrology-calculator.js",
    "data/name-meanings.js",
    "data/bazi-meanings.js",
    "data/ziwei-meanings.js",
    "data/astrology-meanings.js"
  ].forEach((forbiddenPath) => {
    const ok = !pathExists(forbiddenPath);
    addResult(ok ? "pass" : "fail", `v0.7.1 不新增：${forbiddenPath}`, ok ? "未發現。" : "本版只做運算邊界文件，不可新增第二核心 calculator 或 meaning data。");
  });

  checkIncludes("README.md", readme, [
    { label: "CORE_ALGORITHM_BOUNDARY.md", value: "CORE_ALGORITHM_BOUNDARY.md" },
    { label: expectedVersionLabel, value: expectedVersionLabel },
    { label: "唯一 calculated core", value: "唯一 calculated core" },
    { label: "v0.7.1", value: "v0.7.1" }
  ], "README.md 需要記錄 v0.7.1 運算邊界文件與下一步方向。");

  checkIncludes("CHANGELOG.md", changelog, [
    { label: "CORE_ALGORITHM_BOUNDARY.md", value: "CORE_ALGORITHM_BOUNDARY.md" },
    { label: expectedVersionLabel, value: expectedVersionLabel },
    { label: "不新增第二核心 calculator", value: "不新增第二核心 calculator" },
    { label: "not calculated", value: "not calculated" }
  ], "CHANGELOG.md 需要記錄 v0.7.1 文件版。");

  checkIncludes("PROJECT_MAP.md", projectMap, [
    { label: "CORE_ALGORITHM_BOUNDARY.md", value: "CORE_ALGORITHM_BOUNDARY.md" },
    { label: "core-algorithm-boundary-checks", value: "core-algorithm-boundary-checks" },
    { label: "姓名學 metadata", value: "姓名學 metadata" }
  ], "PROJECT_MAP.md 需要記錄運算邊界文件與 check-site 檢查。");
}

function checkNameMetadataBoundary() {
  const siteData = readText("data/site-data.js");
  const boundary = readText("CORE_ALGORITHM_BOUNDARY.md");
  const app = readText("app.js");
  const index = readText("index.html");

  checkIncludes("data/site-data.js", siteData, [
    { label: "nameCalculationBoundary", value: "nameCalculationBoundary" },
    { label: 'moduleId: "name"', value: 'moduleId: "name"' },
    { label: "姓名學", value: "姓名學" },
    { label: "candidateOrder", value: "candidateOrder" },
    { label: 'status: "planning"', value: 'status: "planning"' },
    { label: 'calculationStatus: "not-calculated"', value: 'calculationStatus: "not-calculated"' },
    { label: "requiredFields", value: "requiredFields" },
    { label: "optionalFields", value: "optionalFields" },
    { label: "blockedBy", value: "blockedBy" },
    { label: "ruleDecisionsNeeded", value: "ruleDecisionsNeeded" },
    { label: "testCasePlan", value: "testCasePlan" },
    { label: "safetyLines", value: "safetyLines" },
    { label: "strokeTable", value: "strokeTable" },
    { label: "strokeSourceLicense", value: "strokeSourceLicense" },
    { label: "strokeRuleVersion", value: "strokeRuleVersion" },
    { label: "traditionalSimplifiedPolicy", value: "traditionalSimplifiedPolicy" },
    { label: "variantCharacterPolicy", value: "variantCharacterPolicy" },
    { label: "missingCharacterFallback", value: "missingCharacterFallback" },
    { label: "fiveGridAlgorithmVersion", value: "fiveGridAlgorithmVersion" },
    { label: "compoundSurnamePolicy", value: "compoundSurnamePolicy" },
    { label: "不提供改名建議", value: "不提供改名建議" },
    { label: "不宣稱姓名學資料已完整", value: "不宣稱姓名學資料已完整" }
  ], "data/site-data.js 需要鎖定姓名學 metadata 前置欄位與安全線。");

  checkIncludes("CORE_ALGORITHM_BOUNDARY.md", boundary, [
    { label: "姓名學 metadata 前置", value: "姓名學 metadata 前置" },
    { label: "nameCalculationBoundary", value: "nameCalculationBoundary" },
    { label: 'moduleId: "name"', value: 'moduleId: "name"' },
    { label: 'calculationStatus: "not-calculated"', value: 'calculationStatus: "not-calculated"' },
    { label: "features/name-calculator.js", value: "features/name-calculator.js" },
    { label: "data/name-meanings.js", value: "data/name-meanings.js" },
    { label: "不提供改名建議", value: "不提供改名建議" },
    { label: "不宣稱姓名學資料已完整", value: "不宣稱姓名學資料已完整" }
  ], "CORE_ALGORITHM_BOUNDARY.md 需要補充姓名學 metadata 前置邊界與禁止項。");

  [
    "features/name-calculator.js",
    "data/name-meanings.js"
  ].forEach((forbiddenPath) => {
    const ok = !pathExists(forbiddenPath);
    addResult(ok ? "pass" : "fail", `姓名學前置不可新增：${forbiddenPath}`, ok ? "未發現。" : "v0.7.1 只做 metadata，不可新增姓名學 calculator 或 meaning data。");
  });

  [
    { label: "index.html 不引用 name calculator", content: index, value: "features/name-calculator.js" },
    { label: "index.html 不引用 name meanings", content: index, value: "data/name-meanings.js" },
    { label: "app.js 不新增 name calculator 呼叫", content: app, value: "KekeNameCalculator" },
    { label: "app.js 不新增 name meanings 呼叫", content: app, value: "KekeNameMeanings" }
  ].forEach((check) => {
    if (check.content === null) {
      addResult("fail", check.label, "檔案無法讀取。");
      return;
    }

    const ok = !check.content.includes(check.value);
    addResult(ok ? "pass" : "fail", check.label, ok ? "未發現偷渡引用。" : "v0.7.1 不可接入姓名學 calculator / meaning data。");
  });
}

function checkVersionResidue() {
  const app = readText("app.js");
  const style = readText("style.css");
  const siteData = readText("data/site-data.js");

  [
    {
      label: "app.js 舊註解",
      content: app,
      value: "v0.6.0 core input schema lock"
    },
    {
      label: "style.css 舊註解",
      content: style,
      value: "v0.6.0 core five card visual pass"
    },
    {
      label: "routeMeta.note 舊開頭",
      content: siteData,
      value: 'note: "v0.6.0 保留'
    },
    {
      label: "dashboardLayout.note 舊開頭",
      content: siteData,
      value: 'note: "v0.6.0 保留'
    }
  ].forEach((check) => {
    if (check.content === null) {
      return;
    }

    const ok = !check.content.includes(check.value);
    addResult(ok ? "pass" : "warn", check.label, ok ? "未發現不該殘留的 v0.6.0 註記。" : "發現舊版註記；允許提到沿用 v0.6.0 計算規則，但不建議保留舊版施工註解。");
  });
}

function checkUtf8Readable() {
  [
    "index.html",
    "style.css",
    "app.js",
    "data/site-data.js",
    "data/detail-pages-data.js",
    "data/deity-birthdays.js",
    "data/numerology-meanings.js",
    "features/router.js",
    "features/almanac-engine.js",
    "features/date-test-mode.js",
    "features/deity-matcher.js",
    "features/numerology-calculator.js",
    "scripts/check-site.js",
    "vendor/lunar/lunar.js",
    "vendor/lunar/README.md",
    "vendor/lunar/LICENSE",
    "CORE_DETAIL_SCHEMA.md",
    "SUPPORT_MODULE_SCHEMA.md",
    "CORE_MODULE_TEMPLATE.md",
    "CORE_ALGORITHM_BOUNDARY.md",
    "README.md",
    "CHANGELOG.md",
    "PROJECT_MAP.md"
  ].forEach((file) => {
    addResult(readText(file) !== null ? "pass" : "fail", `UTF-8 可讀：${file}`, readText(file) !== null ? "檢查通過。" : "讀取失敗。");
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
    console.log(`- ${group}：${hasFail ? "fail" : hasWarn ? "warning" : "pass"}`);
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
runGroup("production-prototype-checks", checkProductionPrototypeImport);
runGroup("core-input-checks", checkCoreInputSchema);
runGroup("numerology-calculation-checks", checkNumerologyCalculation);
runGroup("numerology-interpretation-checks", checkNumerologyInterpretation);
runGroup("number-rhythm-semantics", checkNumberRhythmSemantics);
runGroup("core-module-template-checks", checkCoreModuleTemplate);
runGroup("core-algorithm-boundary-checks", checkCoreAlgorithmBoundary);
runGroup("name-metadata-boundary-checks", checkNameMetadataBoundary);
runGroup("version-residue-checks", checkVersionResidue);
runGroup("risk-checks", () => {
  checkStaticCompatibility();
  checkNestedRepo();
  checkKeywordRisk();
});
runGroup("docs-checks", checkDocs);
runGroup("utf8-checks", checkUtf8Readable);
printResults();
