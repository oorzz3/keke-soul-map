# CHANGELOG

## v0.4.1｜五大核心 schema 文件化 × 詳情頁對照表

- 新增 `CORE_DETAIL_SCHEMA.md`。
- 文件化五大核心詳情頁 route / data schema / renderer / CSS class 對照。
- 文件化紫微、八字、星盤、生命靈數、姓名學必要欄位。
- 文件化 mock / planning / experiment 安全線。
- 保留首頁總控台、hash router、lunar、神明生日與日期測試模式。
- 維持純 HTML / CSS / JS 靜態網站。

## v0.4.0｜五大核心詳情頁節奏整理 × renderer 命名收束

- 收束生命靈數 renderer 命名。
- 修正 `scripts/check-site.js` 過期檢查訊息。
- 強化五大核心詳情頁 mock / planning 標示檢查。
- 保留紫微、八字、西洋星盤、生命靈數、姓名學五大核心詳情頁。
- 保留首頁總控台、hash router、lunar、神明生日與日期測試模式。
- 維持純 HTML / CSS / JS 靜態網站。

## v0.3.9｜姓名學詳情頁 mock 深化

- 深化 `name` detail data。
- 新增姓名學摘要、姓名結構、單字筆畫與字義、五格規劃、音義語感、使用情境、解讀重點與資料狀態提醒。
- `app.js` 支援姓名學專屬詳情頁渲染。
- 保留紫微、八字、西洋星盤、生命靈數詳情頁。
- 保留首頁總控台、hash router、lunar、神明生日與日期測試模式。
- 本版尚未接入正式姓名學計算，也不提供改名建議。

## v0.3.8｜生命靈數詳情頁 mock 深化

- 深化 `numerology` detail data。
- 校正生命靈數 schema 欄位命名為 `birthBreakdownDraft`、`rhythmOverview`、`actionNotes`。
- 新增生命靈數摘要、核心數字、生日拆解、個人節奏、數字意義、行動節奏、解讀重點與資料狀態提醒。
- `app.js` 支援生命靈數專屬詳情頁渲染。
- 保留紫微、八字、西洋星盤詳情頁。
- 保留首頁總控台、hash router、lunar、神明生日與日期測試模式。
- 本版尚未接入正式生命靈數計算。

## v0.3.7｜西洋星盤詳情頁 mock 深化

- 深化 `astrology` detail data。
- 新增星盤摘要、三軸規劃、行星落點、十二宮位、相位關係、解讀重點與資料狀態提醒。
- `app.js` 支援西洋星盤專屬詳情頁渲染。
- 保留紫微與八字詳情頁。
- 保留首頁總控台、hash router、lunar、神明生日與日期測試模式。
- 本版尚未接入正式西洋星盤計算。

## v0.3.6｜八字四柱詳情頁 mock 深化

- 深化 `bazi` detail data。
- 新增八字命盤摘要、四柱規劃、五行分布、十神關係、解讀重點與資料狀態提醒。
- `app.js` 新增八字專屬詳情頁 renderer。
- 保留紫微詳情頁與其他命盤 mock / planning 詳情頁。
- 保留首頁總控台、hash router、lunar、神明生日與日期測試模式。
- 本版尚未接入正式八字排盤演算法。

## v0.3.5｜紫微斗數詳情頁 mock 深化

- 深化 `ziwei` detail data。
- 新增紫微命盤摘要、十二宮位規劃、解讀重點與資料狀態提醒。
- `app.js` 支援紫微專屬詳情頁渲染。
- 保留其他命盤頁 mock / planning。
- 保留首頁總控台、hash router、lunar、神明生日與日期測試模式。

## v0.3.4｜小貓龍蝦檢查瘦身 × 版本策略收束

- 精簡 `scripts/check-site.js` 檢查結構。
- 新增版本策略欄位與文件說明。
- 保留 dashboard、router、detail data、lunar、deity matcher 與日期測試模式檢查。

## v0.3.3｜首頁總控台版面重整版

- 首頁整理為 hero、rhythm、support 三段式 dashboard zone。
- 命盤核心、命樹與輔助提醒的視覺層級更清楚。
- 保留 hash router 與 detail pages。

## v0.3.2.2｜首頁資訊層級整理版

- 收斂首頁資訊層級。
- 農民曆與神明生日維持輔助提醒定位。

## v0.3.2.1｜命盤核心卡片寬度修正版

- 修正核心命盤卡片寬度，避免五張卡硬塞成牙籤卡。
- 桌機、中寬、手機版皆維持可讀卡片寬度。

## v0.3.2｜命盤核心卡片升級版

- 首頁命盤核心入口升級為小儀表板卡片。
- `dashboardPreview` 成為首頁模組摘要資料來源。

## v0.3.1｜路由與詳情頁體驗修正版

- 強化 hash router 輔助函式。
- 詳情頁新增上一個 / 下一個命盤導覽。
- 側欄與模組卡新增 active 狀態。
- route not found 頁面強化。

## v0.3.0｜hash router + 命盤詳情頁骨架 + 最小資料拆分

- 新增 `features/router.js`。
- 新增 `data/detail-pages-data.js`。
- 新增 `dashboardView` / `detailView` 切換。
- 命盤核心卡片可進入詳情頁。
- 詳情頁顯示 mock / planning 狀態。

## v0.2.5｜首頁主軸重排版

- 首頁視覺重心改為命盤核心。
- 命理模組與命樹提前。
- 農民曆與神明生日降為輔助提醒區。

## v0.2.4.1｜神明生日卡語意修正 × 回今日模式連結修正

- 神明生日卡主內容改為優先顯示資料表比對結果。
- 原 mock deityDay 改為固定展示範例。
- 修正本機 file:// 回今日模式跳到資料夾索引問題。

## v0.2.4｜日期測試模式

- 新增 `features/date-test-mode.js`。
- 支援 URL query 指定農曆月日測試神明生日資料表。
- 神明生日資料表實驗區新增今日模式 / 測試模式。

## v0.2.3｜神明生日資料表實驗版

- 新增 `data/deity-birthdays.js` seed 資料表。
- 新增 `features/deity-matcher.js`。

## v0.2.2｜lunar-javascript 農民曆引擎實驗版

- 新增 `vendor/lunar/lunar.js` 與 LICENSE。
- 新增 `features/almanac-engine.js`。
- 今日農民曆卡片新增 lunar 實驗資料區。

## v0.2.1｜版本號顯示 × 版本資料中心

- 新增網站畫面版本號。
- 新增 `siteMeta` 版本資料。

## v0.2.0.1｜靜態資源快取修正版

- 為主要 CSS / JS / data 資源加上版本參數。

## v0.2｜資料模組化版

- 首頁 mock data 抽出到 `data/site-data.js`。
- `app.js` 改由資料層渲染首頁卡片。

## v0.1.1｜小貓龍蝦檢查腳本

- 新增 `scripts/check-site.js`。
- 新增 `run-check-site.bat`。

## v0.1｜手機優先首頁儀表板靜態版

- 建立手機優先首頁儀表板。
- 包含本命摘要、今日摘要、生命靈數、命理模組入口、農民曆、神明生日、命樹與資料工具區。

## v0.0.3

- 本機 clone / 小丸施工通道完成。

## v0.0.2

- GitHub Pages 上線。

## v0.0.1

- 建立 `index.html` 空殼頁。

## v0.0

- 建立 GitHub repo。
