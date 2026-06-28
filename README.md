# 科科命理宇宙站 / keke-soul-map

GitHub Pages: https://oorzz3.github.io/keke-soul-map/

科科命理宇宙站是一個手機優先的命理宇宙站靜態首頁儀表板，用純 HTML / CSS / JavaScript 在 GitHub Pages 上運作。

目前版本：
- 網站版本：v0.2.3
- 網站資料層版本：v0.2
- 靜態資源快取版本：v0.2.3

## 專案定位

這個專案先建立命盤首頁骨架，逐步把 mock data、農民曆實驗資料、神明生日 seed 資料表拆到獨立資料層與功能包裝層。

目前仍是實驗階段，不提供正式命理計算結果，也不取代人工校對資料。

## 已完成功能

- 本命摘要
- 今日科科摘要
- 生命靈數卡
- 命理模組入口
- 今日農民曆 mock 卡
- lunar-javascript 農民曆引擎實驗資料
- 今日神明生日 mock 卡
- 神明生日 seed 資料表實驗
- 命樹卡
- 資料工具區
- 網站版本號顯示
- 小貓龍蝦檢查腳本

## v0.2.3 重點

v0.2.3 新增神明生日資料表實驗：

- `data/deity-birthdays.js`：保存神明生日 seed 資料表。
- `features/deity-matcher.js`：依今日農曆月日比對 seed 資料表。
- `features/almanac-engine.js`：新增 `lunarMonth`、`lunarDay`、`lunarMonthText`、`lunarDayText`，供神明生日比對使用。
- 今日神明生日卡保留原本 mock 展示資料，並新增「神明生日資料表實驗」小區塊。

注意：seed 資料表只作為接線驗證，不代表完整宗教資料庫，也不代表真實當日資料。

## lunar-javascript 實驗

v0.2.2 起以單檔 vendor 方式導入 `lunar-javascript`：

- `vendor/lunar/lunar.js`：官方單檔版。
- `vendor/lunar/LICENSE`：MIT License。
- `features/almanac-engine.js`：本專案自己的農民曆實驗包裝層。

本專案不使用 npm、CDN、API、後端或資料庫。lunar 實驗資料只作為前端接線測試，暫不取代人工校對資料。

## 本機檢查方式

可雙擊：

```bat
run-check-site.bat
```

或在專案根目錄執行：

```bat
node scripts/check-site.js
```

## 快取提醒

GitHub Pages 更新後如果看到舊畫面，可以先使用 Ctrl + F5 強制重新整理。v0.2.3 已將 `style.css`、`vendor/lunar/lunar.js`、`features/almanac-engine.js`、`data/deity-birthdays.js`、`features/deity-matcher.js`、`data/site-data.js`、`app.js` 的資源引用更新為 `v=0.2.3`。

## 目前限制

- 全部首頁資料仍以 mock / seed 展示資料為主。
- 尚未做完整命理演算法。
- 尚未建立完整神明生日資料庫。
- 尚未接後端、資料庫、API 或真實帳號。
- 按鈕目前是靜態入口。

## 協作規則

- 小科寫規格。
- 小丸施工。
- 科科驗收。
- 科科手動 commit / push。

## 下一步建議

v0.2.4 可擴充神明生日 seed 表校對欄位，或先建立資料來源備註格式。v0.3 再評估是否把農民曆與神明生日資料做成更清楚的資料表版本管理。
