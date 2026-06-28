# PROJECT_MAP

## 入口與畫面

- `index.html`：GitHub Pages 靜態入口，包含 `dashboardView` 與 `detailView` 容器，並以版本參數載入 CSS、vendor、features、data 與 app。
- `style.css`：深藍星夜視覺、手機優先響應式、主卡 / 輔助卡視覺層級、命盤核心預覽卡，以及詳情頁導覽、active 狀態與 route fallback 樣式。
- `app.js`：讀取 `KekeSoulData` 與 `KekeDetailPages`，渲染首頁總控台與命盤詳情頁；`renderModules` 會把命盤核心轉成總控台式預覽卡，並負責 active 狀態、詳情頁導覽與 route fallback。

## 路由與功能

- `features/router.js`：hash route 解析輔助，只處理 `#/` 開頭路由，提供 route 解析、首頁 route、module route 輔助。
- `features/almanac-engine.js`：農民曆實驗引擎包裝層，讀取 lunar-javascript 的 `Solar`。
- `features/date-test-mode.js`：讀取 URL query，提供測試農曆月日與回今日模式連結。
- `features/deity-matcher.js`：優先使用測試農曆月日，否則使用今日農曆月日，比對 `KekeDeityBirthdays`。

## 資料層

- `data/site-data.js`：首頁資料、`siteMeta`、`routeMeta`、`layoutMeta`、農民曆與神明生日實驗設定。
- `data/detail-pages-data.js`：命盤詳情頁 mock / experiment / planning 資料，包含 `order`、`navLabel`、`icon`、`category`，前五個命盤核心另有 `dashboardPreview` 首頁預覽資料。
- `data/deity-birthdays.js`：神明生日 seed 資料表，包含農曆月日、分類、祈福方向與資料等級。
- `data/`：未來放 mock data、命理資料表與資料版本管理。

## 靜態資源

- `assets/`：未來放圖片與 icons。
- `assets/images/`：未來放首頁或模組圖片。
- `assets/icons/`：未來放圖示資源。
- `vendor/lunar/lunar.js`：lunar-javascript 單檔版。
- `vendor/lunar/LICENSE`：MIT 授權文件。
- `vendor/lunar/README.md`：來源與使用說明。

## 檢查工具

- `scripts/check-site.js`：小貓龍蝦檢查腳本，v0.3.4 起分為多個 group，例如 `version-sync`、`required-files`、`dashboard-structure`、`router-checks`、`detail-data-checks`、`almanac-deity-checks`、`risk-checks`、`docs-checks`。它是驗收輔助，不是正式測試框架。
- `run-check-site.bat`：Windows 雙擊檢查入口，執行 `node scripts/check-site.js`。

## v0.3.4 工程整理

- `scripts/check-site.js`：整理為 helper + 多個 group，降低後續版本繼續堆疊零散字串檢查的負擔。
- `data/site-data.js`：`siteMeta` 與 `versionPolicy` 管理產品版本、快取版本與資料版本。
- 本專案仍維持純 HTML / CSS / JS 靜態網站，不新增 npm / API / 後端。

## v0.3.6 八字詳情頁 mock 深化

- `data/detail-pages-data.js`：`bazi` 新增 `baziProfile`、`pillarOverview`、`fiveElementOverview`、`tenGodOverview`、`interpretationBlocks`、`dataNotes`。
- `app.js`：新增 `renderBaziDetail`、`renderBaziProfile`、`renderBaziPillarOverview`、`renderBaziFiveElements`、`renderBaziTenGodOverview`、`renderBaziInterpretation`、`renderBaziDataNotes`。
- `style.css`：新增八字詳情頁樣式，包含四柱、五行、十神、解讀與資料提醒區塊。
- `scripts/check-site.js`：加入八字詳情頁資料與 renderer 檢查。
- 架構仍維持純 HTML / CSS / JS 靜態網站，不新增 npm / API / 後端。
## v0.3.5 紫微詳情頁 mock 深化

- `data/detail-pages-data.js`：`ziwei` 追加 `ziweiProfile`、`palaceOverview`、`interpretationBlocks`、`dataNotes`。
- `app.js`：新增 `renderSpecialDetailContent`、`renderZiweiDetail`、`renderZiweiProfile`、`renderZiweiPalaceOverview`、`renderZiweiInterpretation`、`renderZiweiDataNotes`。
- `style.css`：新增紫微詳情頁樣式，包含命盤摘要、十二宮位、解讀重點與資料狀態提醒。
- `scripts/check-site.js`：新增紫微詳情頁資料、renderer 與樣式檢查。
- 本專案仍維持純 HTML / CSS / JS 靜態網站，不新增 npm / API / 後端。

## v0.3.2.2 資訊層級整理

- `app.js`：整理首頁資訊層級，加入 compact 輔助提醒與整合結果卡渲染。
- `data/detail-pages-data.js`：luck / yijing / soul-tree / database 新增 dashboardResult 首頁結果摘要。
- `style.css`：新增 number-rhythm、integration-result、compact-reminder 與 is-compact 樣式。
- `scripts/check-site.js`：加入 v0.3.2.2 資訊層級與 compact 檢查。

## v0.3.2.1 版面修正

- `style.css`：修正 `.core-dashboard`、`.core-dashboard-grid`、`.core-module-card` 寬度規則，避免核心卡被壓成直排。
- `app.js`：保留命盤核心總控台渲染、整合與工具、輔助提醒分組。
- `scripts/check-site.js`：加入 v0.3.2.1 版本與核心卡寬度檢查。

## v0.3.3 首頁總控台版面

- `index.html`：dashboardView 內新增 dashboard-hero-zone、dashboard-rhythm-zone、dashboard-support-zone 三段式容器。
- `app.js`：renderModules 收斂為命盤核心；renderSoulTree 透過 renderIntegrationSummary 顯示整合摘要。
- `style.css`：新增 dashboard-layout、dashboard-zone 與 integration-summary 的總控台版面樣式。
- `scripts/check-site.js`：加入 v0.3.3 dashboard zone 與整合摘要檢查。
