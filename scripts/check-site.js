const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const results = [];

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
    if (!entry.isDirectory()) {
      continue;
    }

    const fullPath = path.join(fullStart, entry.name);

    if (fullPath === path.join(rootDir, ".git")) {
      continue;
    }

    dirs.push(fullPath);
    dirs.push(...walkDirs(toSitePath(fullPath)));
  }

  return dirs;
}

function isTextFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const textExtensions = new Set([
    ".html",
    ".css",
    ".js",
    ".json",
    ".md",
    ".txt",
    ".svg",
    ".xml",
    ".csv"
  ]);

  return textExtensions.has(ext);
}

function checkRequiredFiles() {
  const requiredFiles = [
    "index.html",
    "style.css",
    "app.js",
    "data/site-data.js",
    "data/deity-birthdays.js",
    "vendor/lunar/lunar.js",
    "vendor/lunar/LICENSE",
    "vendor/lunar/README.md",
    "features/almanac-engine.js",
    "features/deity-matcher.js"
  ];

  for (const file of requiredFiles) {
    if (exists(file)) {
      addResult("pass", `必要檔案存在：${file}`, "已找到。");
    } else {
      addResult("fail", `必要檔案缺少：${file}`, "GitHub Pages 首頁可能無法正確載入。");
    }
  }
}

function checkRequiredFolders() {
  const requiredFolders = ["data", "assets", "assets/images", "assets/icons", "vendor", "vendor/lunar", "features"];

  for (const folder of requiredFolders) {
    if (isDirectory(folder)) {
      addResult("pass", `必要資料夾存在：${folder}/`, "已找到。");
    } else {
      addResult("fail", `必要資料夾缺少：${folder}/`, "請確認資料夾是否被移除。");
    }
  }
}

function addContentChecks(fileLabel, checks, missingDetail) {
  for (const item of checks) {
    if (item.ok) {
      addResult("pass", `${fileLabel} 包含：${item.label}`, "檢查通過。");
    } else {
      addResult("fail", `${fileLabel} 缺少：${item.label}`, missingDetail);
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
    { label: "今日科科摘要", ok: html.includes("今日科科摘要") || html.includes("todayCard") },
    { label: "生命靈數", ok: html.includes("生命靈數") },
    { label: "農民曆", ok: html.includes("農民曆") },
    { label: "神明生日", ok: html.includes("神明生日") },
    { label: "命樹", ok: html.includes("命樹") },
    { label: "style.css?v=0.2.3", ok: html.includes("style.css?v=0.2.3") },
    { label: "vendor/lunar/lunar.js?v=0.2.3", ok: html.includes("vendor/lunar/lunar.js?v=0.2.3") },
    { label: "features/almanac-engine.js?v=0.2.3", ok: html.includes("features/almanac-engine.js?v=0.2.3") },
    { label: "data/deity-birthdays.js?v=0.2.3", ok: html.includes("data/deity-birthdays.js?v=0.2.3") },
    { label: "features/deity-matcher.js?v=0.2.3", ok: html.includes("features/deity-matcher.js?v=0.2.3") },
    { label: "data/site-data.js?v=0.2.3", ok: html.includes("data/site-data.js?v=0.2.3") },
    { label: "app.js?v=0.2.3", ok: html.includes("app.js?v=0.2.3") },
    { label: "KekeSoulData", ok: html.includes("KekeSoulData") },
    { label: "v=0.2.3", ok: html.includes("v=0.2.3") }
  ], "首頁入口或靜態資源版本引用不完整。");
}

function checkDataVersionContent() {
  if (!exists("data/site-data.js")) {
    addResult("fail", "data/site-data.js 無法檢查", "data/site-data.js 不存在。");
    return;
  }

  const dataContent = readUtf8("data/site-data.js");
  addContentChecks("data/site-data.js", [
    { label: "siteMeta 或 metadata", ok: dataContent.includes("siteMeta") || dataContent.includes("metadata") },
    { label: "version", ok: dataContent.includes("version") },
    { label: "v0.2.3", ok: dataContent.includes("v0.2.3") },
    { label: "dataVersion", ok: dataContent.includes("dataVersion") },
    { label: "cacheVersion", ok: dataContent.includes("cacheVersion") },
    { label: "almanacEngine", ok: dataContent.includes("almanacEngine") },
    { label: "lunar-javascript", ok: dataContent.includes("lunar-javascript") },
    { label: "deityMatcher", ok: dataContent.includes("deityMatcher") },
    { label: "data/deity-birthdays.js", ok: dataContent.includes("data/deity-birthdays.js") }
  ], "資料中心版本或實驗設定不完整。");
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
    { label: "seed", ok: deityContent.includes("seed") },
    { label: "觀世音菩薩", ok: deityContent.includes("觀世音菩薩") },
    { label: "天上聖母", ok: deityContent.includes("天上聖母") },
    { label: "關聖帝君", ok: deityContent.includes("關聖帝君") }
  ], "神明生日 seed 資料表欄位或基本資料不完整。");
}

function checkAppRenderingContent() {
  if (!exists("app.js")) {
    addResult("fail", "app.js 無法檢查", "app.js 不存在。");
    return;
  }

  const appContent = readUtf8("app.js");
  addContentChecks("app.js", [
    { label: "讀取 siteMeta 或 metadata", ok: appContent.includes("siteMeta") || appContent.includes("metadata") },
    { label: "渲染版本號", ok: appContent.includes("version-badge") || appContent.includes("version-meta") },
    { label: "fallback v0.2.3", ok: appContent.includes("v0.2.3") },
    { label: "getDeityMatchesResult", ok: appContent.includes("getDeityMatchesResult") },
    { label: "renderDeityMatcherPanel", ok: appContent.includes("renderDeityMatcherPanel") },
    { label: "KekeDeityMatcher", ok: appContent.includes("KekeDeityMatcher") }
  ], "主程式渲染版本號或神明生日實驗區不完整。");
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
  ], "農民曆實驗引擎欄位不完整。");
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
    { label: "KekeDeityBirthdays", ok: matcherContent.includes("KekeDeityBirthdays") },
    { label: "status", ok: matcherContent.includes("status") },
    { label: "matches", ok: matcherContent.includes("matches") }
  ], "神明生日 matcher 包裝層不完整。");
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
      addResult("fail", `靜態網站不應存在：${forbiddenPath}`, "目前版本仍應維持 GitHub Pages 靜態網站。");
    } else {
      addResult("pass", `未發現靜態網站偏航項目：${forbiddenPath}`, "檢查通過。");
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
    addResult("pass", "偏航 / 高風險關鍵字檢查", "未發現高風險關鍵字。");
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
      addResult("fail", "子資料夾內有 .git", `存在 ${toSitePath(folderPath)}/.git。`);
    }
  } else {
    addResult("pass", "子資料夾 .git 檢查", "未發現子資料夾內的 .git。");
  }
}

function checkUtf8Readable() {
  const mainFiles = [
    "index.html",
    "style.css",
    "app.js",
    "data/site-data.js",
    "data/deity-birthdays.js",
    "features/almanac-engine.js",
    "features/deity-matcher.js",
    "scripts/check-site.js",
    "vendor/lunar/lunar.js",
    "vendor/lunar/README.md",
    "vendor/lunar/LICENSE"
  ];

  for (const file of mainFiles) {
    if (!exists(file)) {
      addResult("fail", `UTF-8 讀取檢查無法進行：${file}`, "檔案不存在。");
      continue;
    }

    try {
      readUtf8(file);
      addResult("pass", `UTF-8 讀取檢查：${file}`, "可用 UTF-8 讀取。");
    } catch (error) {
      addResult("fail", `UTF-8 讀取檢查失敗：${file}`, error.message);
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

  console.log("科科命理宇宙站 v0.2.3 小貓龍蝦檢查");
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
checkDataVersionContent();
checkDeityBirthdaysContent();
checkAppRenderingContent();
checkAlmanacEngineContent();
checkDeityMatcherContent();
checkStaticCompatibility();
checkHighRiskKeywords();
checkNestedRepo();
checkUtf8Readable();
printResults();
