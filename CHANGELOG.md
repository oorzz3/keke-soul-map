# CHANGELOG

## v0.2.3｜神明生日資料表實驗版

- 新增 `data/deity-birthdays.js` 神明生日 seed 資料表。
- 新增 `features/deity-matcher.js`，依今日農曆月日比對神明生日資料表。
- 更新 `features/almanac-engine.js`，回傳 `lunarMonth`、`lunarDay`、`lunarMonthText`、`lunarDayText`。
- 今日神明生日卡保留原 mock 展示資料，並新增 seed 資料表實驗區。
- 靜態資源快取參數更新為 `v0.2.3`。
- 小貓龍蝦檢查腳本加入神明生日資料表與 matcher 檢查。

## v0.2.2｜lunar-javascript 農民曆引擎實驗版

- 新增 `vendor/lunar/lunar.js` 與 `vendor/lunar/LICENSE`。
- 新增 `features/almanac-engine.js`。
- 今日農民曆卡片新增 lunar 實驗資料區。
- 保留原 mock 展示資料。
- 小貓龍蝦檢查加入 lunar 與 vendor 檢查。

## v0.2.1｜版本號顯示 × 版本資料中心

- 新增網站畫面版本號。
- 新增 `siteMeta` 版本資料。
- 靜態資源快取參數更新為 `v0.2.1`。
- 小貓龍蝦檢查腳本加入版本檢查。

## v0.2.0.1

- 靜態資源快取修正版。
- 為 `style.css`、`data/site-data.js`、`app.js` 加上版本參數。
- 降低 GitHub Pages / 瀏覽器快取舊檔造成空卡片的機率。

## v0.2

- 資料模組化版。
- 把首頁 mock data 抽出到 `data/site-data.js`。
- 由 `app.js` 讀取 `window.KekeSoulData` 並渲染首頁卡片。
- 更新小貓龍蝦檢查腳本，加入 `data/site-data.js` 檢查。

## v0.1.1

- 新增小貓龍蝦檢查腳本。
- 新增可雙擊執行的 `run-check-site.bat`。
- 新增 `.gitattributes`，穩定文字檔換行設定。

## v0.1

- 建立手機優先首頁儀表板靜態版。
- 包含本命摘要、今日科科摘要、生命靈數、命理模組入口。
- 新增今日農民曆 mock 卡、今日神明生日 mock 卡、命樹卡與資料工具區。
- 建立 `data/`、`assets/`、`assets/images/`、`assets/icons/` 資料夾。

## v0.0.3

- 本機 clone / 小丸施工通道完成。

## v0.0.2

- GitHub Pages 上線。

## v0.0.1

- 建立 `index.html` 空殼頁。

## v0.0

- 建立 GitHub repo。
