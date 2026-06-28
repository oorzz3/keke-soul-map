# CHANGELOG

## v0.3.1｜路由與詳情頁體驗修正版

- 強化 hash router 輔助函式
- 詳情頁新增上一個 / 下一個命盤導覽
- 側欄與模組卡新增 active 狀態
- route not found 頁面強化
- 保留首頁總控台、lunar、神明生日與日期測試模式

## v0.3.0｜hash router + 命盤詳情頁骨架 + 最小資料拆分

- 新增 `features/router.js`
- 新增 `data/detail-pages-data.js`
- 新增 `dashboardView` / `detailView` 切換
- 命盤核心卡片可進入詳情頁
- 詳情頁顯示 mock / experiment / planning 狀態
- 保留首頁總控台、lunar、神明生日與日期測試模式
- 小貓龍蝦檢查加入 route / detail 檢查

## v0.2.5｜首頁主軸重排版

- 首頁視覺重心改為命盤核心
- 命理模組與命樹提前
- 農民曆與神明生日降為輔助提醒區
- 保留 lunar 實驗、神明生日資料表與日期測試模式
- 小貓龍蝦檢查加入主軸重排檢查

## v0.2.4.1｜神明生日卡語意修正 × 回今日模式連結修正

- 神明生日卡主內容改為優先顯示資料表比對結果
- 原 mock deityDay 改為固定展示範例
- 修正本機 file:// 回今日模式跳到資料夾索引問題
- 靜態資源快取參數更新為 v0.2.4.1

## v0.2.4｜日期測試模式

- 新增 `features/date-test-mode.js`
- 支援 URL query 指定農曆月日測試神明生日資料表
- 神明生日資料表實驗區新增今日模式 / 測試模式
- 新增觀音、媽祖、關聖帝君測試入口
- 小貓龍蝦檢查加入日期測試模式檢查

## v0.2.3｜神明生日資料表實驗版

- 新增 `data/deity-birthdays.js` 神明生日 seed 資料表
- 新增 `features/deity-matcher.js`
- 讓神明生日卡可比對今日農曆與 seed 資料

## v0.2.2｜lunar-javascript 農民曆引擎實驗版

- 新增 `vendor/lunar/lunar.js` 與 LICENSE
- 新增 `features/almanac-engine.js`
- 今日農民曆卡片新增 lunar 實驗資料區
- 保留原 mock 展示資料

## v0.2.1｜版本號顯示 × 版本資料中心

- 新增網站畫面版本號
- 新增 `siteMeta` 版本資料
- 靜態資源快取參數更新為 v0.2.1
- 小貓龍蝦檢查腳本加入版本檢查

## v0.2.0.1

- 為 `style.css`、`data/site-data.js`、`app.js` 加上版本參數
- 降低 GitHub Pages / 瀏覽器快取舊檔造成空卡片的機率

## v0.2

- 資料模組化
- 將首頁 mock data 抽出到 `data/site-data.js`
- 由 `app.js` 讀取 `window.KekeSoulData` 並渲染首頁卡片

## v0.1.1

- 新增小貓龍蝦檢查腳本
- 新增可雙擊執行的 `run-check-site.bat`
- 新增 `.gitattributes`

## v0.1

- 手機優先首頁儀表板靜態版
- 建立本命摘要、今日摘要、生命靈數、命理模組入口、農民曆、神明生日、命樹與資料工具區

## v0.0.3

- 本機 clone / 小丸施工通道完成

## v0.0.2

- GitHub Pages 上線

## v0.0.1

- 建立 `index.html` 空殼頁

## v0.0

- 建立 GitHub repo
