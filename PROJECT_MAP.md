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

- `scripts/check-site.js`：小貓龍蝦檢查腳本，檢查必要檔案、靜態網站相容、版本同步、route / detail、active UX、既有實驗功能與高風險關鍵字。
- `run-check-site.bat`：Windows 雙擊檢查入口，執行 `node scripts/check-site.js`。

## v0.3.2.1 版面修正

- `style.css`：修正 `.core-dashboard`、`.core-dashboard-grid`、`.core-module-card` 寬度規則，避免核心卡被壓成直排。
- `app.js`：保留命盤核心總控台渲染、整合與工具、輔助提醒分組。
- `scripts/check-site.js`：加入 v0.3.2.1 版本與核心卡寬度檢查。
