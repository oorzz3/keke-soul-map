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

    if (entry.name !== ".git") {
      dirs.push(...walkDirs(toSitePath(fullPath)));
    }
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
  const requiredFiles = ["index.html", "style.css", "app.js", "data/site-data.js"];

  for (const file of requiredFiles) {
    if (exists(file)) {
      addResult("pass", `必要檔案存在：${file}`, "已找到。");
    } else {
      addResult("fail", `必要檔案缺失：${file}`, "GitHub Pages 首頁靜態檔案不完整。");
    }
  }
}

function checkRequiredFolders() {
  const requiredFolders = ["data", "assets", "assets/images", "assets/icons"];

  for (const folder of requiredFolders) {
    if (isDirectory(folder)) {
      addResult("pass", `必要資料夾存在：${folder}/`, "已找到。");
    } else {
      addResult("fail", `必要資料夾缺失：${folder}/`, "靜態資料或素材位置不完整。");
    }
  }
}

function checkIndexContent() {
  if (!exists("index.html")) {
    addResult("fail", "index.html 內容檢查", "index.html 不存在，無法檢查。");
    return;
  }

  const html = readUtf8("index.html");
  const requiredChecks = [
    { label: 'lang="zh-Hant"', ok: html.includes('lang="zh-Hant"') },
    { label: 'charset="UTF-8"', ok: /charset=["']UTF-8["']/i.test(html) },
    { label: "viewport", ok: /name=["']viewport["']/i.test(html) },
    { label: "科科命理宇宙站", ok: html.includes("科科命理宇宙站") },
    { label: "Soul Map", ok: html.includes("Soul Map") },
    { label: "今日科科摘要", ok: html.includes("今日科科摘要") || (html.includes("今日科科") && html.includes("today-card")) },
    { label: "生命靈數", ok: html.includes("生命靈數") },
    { label: "農民曆", ok: html.includes("農民曆") },
    { label: "神明生日", ok: html.includes("神明生日") },
    { label: "命樹", ok: html.includes("命樹") },
    { label: "style.css", ok: html.includes("style.css") },
    { label: "data/site-data.js", ok: html.includes("data/site-data.js") },
    { label: "KekeSoulData", ok: html.includes("KekeSoulData") },
    { label: "app.js", ok: html.includes("app.js") }
  ];

  for (const item of requiredChecks) {
    if (item.ok) {
      addResult("pass", `index.html 包含：${item.label}`, "已通過。");
    } else {
      addResult("fail", `index.html 缺少：${item.label}`, "首頁骨架可能偏離 v0.1 規格。");
    }
  }
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
      addResult("fail", `靜態相容風險：${forbiddenPath}`, "目前專案不應出現此路徑。");
    } else {
      addResult("pass", `未發現靜態相容風險：${forbiddenPath}`, "已通過。");
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
    ...walkFiles("data"),
    ...walkFiles("assets")
  ];
  const uniqueTargets = [...new Set(scanTargets)].filter((filePath) => fs.existsSync(filePath) && isTextFile(filePath));
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
    addResult("fail", "巢狀專案資料夾", "發現 keke-soul-map/keke-soul-map。");
  } else {
    addResult("pass", "巢狀專案資料夾", "未發現 keke-soul-map/keke-soul-map。");
  }

  if (nestedGitFolders.length > 0) {
    for (const folderPath of nestedGitFolders) {
      addResult("fail", "子資料夾 .git 檢查", `發現 ${toSitePath(folderPath)}/.git。`);
    }
  } else {
    addResult("pass", "子資料夾 .git 檢查", "未發現子資料夾內的 .git。");
  }
}

function checkUtf8Readable() {
  const mainFiles = ["index.html", "style.css", "app.js", "data/site-data.js"];

  for (const file of mainFiles) {
    if (!exists(file)) {
      addResult("fail", `UTF-8 讀取檢查：${file}`, "檔案不存在。");
      continue;
    }

    try {
      readUtf8(file);
      addResult("pass", `UTF-8 讀取檢查：${file}`, "可用 UTF-8 讀取。");
    } catch (error) {
      addResult("fail", `UTF-8 讀取檢查：${file}`, error.message);
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

  console.log("科科命理宇宙站 v0.2.0.1 小貓龍蝦檢查");
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
checkStaticCompatibility();
checkHighRiskKeywords();
checkNestedRepo();
checkUtf8Readable();
printResults();
