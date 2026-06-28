# PROJECT_MAP

## 主要檔案

- `index.html`：靜態網站入口，保留 header、shell、main 容器與各卡片掛載點；首頁卡片順序以命盤核心為主，輔助提醒靠後，並載入帶版本參數的靜態資源。
- `style.css`：視覺風格、手機優先響應式、主卡 / 輔助卡視覺層級、卡片與實驗資料小面板樣式。
- `app.js`：讀取 `window.KekeSoulData`，渲染首頁卡片、版本號、lunar 實驗資料與神明生日資料表實驗區；農民曆與神明生日仍渲染，但語意改為輔助提醒；神明生日卡主摘要會依 matcher 結果渲染，mock 僅作固定展示範例。
- `features/almanac-engine.js`：農民曆實驗引擎包裝層，讀取 lunar-javascript 的 `Solar`，回傳今日農曆資料與農曆月日欄位。
- `features/date-test-mode.js`：讀取 URL query，提供測試農曆月日與測試連結產生工具；回今日模式連結應指向 `index.html#deity-title`。
- `features/deity-matcher.js`：神明生日資料表匹配層，優先使用測試農曆月日，否則使用今日農曆月日比對 `KekeDeityBirthdays`。

## 資料層

- `data/site-data.js`：首頁 mock data、`siteMeta` 版本資訊、`almanacEngine`、`deityMatcher`、`dateTestMode` 與 `testSeeds` 設定。
- `data/deity-birthdays.js`：神明生日 seed 資料表，欄位包含農曆月日、名稱、標題、分類、祈福方向、備註與 `sourceLevel`。
- `data/`：未來可放命理 mock data、農民曆資料表、神明生日資料表與其他資料層檔案。
- `assets/`：未來放圖片與 icons。
- `assets/images/`：未來放首頁與模組圖片。
- `assets/icons/`：未來放圖示素材。

## Vendor

- `vendor/lunar/lunar.js`：lunar-javascript 單檔版。
- `vendor/lunar/LICENSE`：MIT 授權文件。
- `vendor/lunar/README.md`：來源、授權與本專案使用方式說明。

## 檢查工具

- `scripts/check-site.js`：小貓龍蝦檢查腳本，只讀檔檢查必要檔案、必要資料夾、版本引用、lunar 接線、神明生日 seed 表、日期測試模式、matcher、靜態網站相容性、高風險關鍵字與 UTF-8 可讀性。
- `run-check-site.bat`：Windows 雙擊檢查入口，呼叫 `node scripts/check-site.js` 後暫停視窗。
